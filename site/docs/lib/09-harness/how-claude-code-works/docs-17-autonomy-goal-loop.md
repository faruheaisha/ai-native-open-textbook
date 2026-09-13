---
title: "第 17 章：自治与续跑——/goal 与 /loop"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/README.md"
zh: ""
---

# 第 17 章：自治与续跑——`/goal` 与 `/loop`

> 从这一章起，进入一个新模块：泄露快照之后的新功能。
>
> 前十六章读的是那份 3 月底流出的源码快照，但 `/goal`、`/loop`、dynamic workflow、auto mode 这些能力全在快照之后，没有源码可看。搞清楚它们只能换个办法：装上最新版真的去用，把它发出的网络请求抓下来，再对照官方文档，三头对上。所以下面凡是引号里的原文，都是这么抓出来的；凡是讲到“它内部大概怎么调度”，那是从行为反推的，讲到时会说明。这一章说清楚 `/goal` 和 `/loop` 怎么让 Claude 自己接着干，用到的办法写在文末，照着你也能自己去抓下一个功能。

## 17.1 两种“让它接着干”的范式

到 2026 年，Claude Code 早已不只是“一问一答”。它有一整族能力，让 agent 跨 turn、跨时间、跨会话地自己接着干。这一族里最外层、你最常碰到的两个入口，是 `/goal` 和 `/loop`——而它俩恰好是两种相反的思路。

`/goal` 是“盯着一个条件、不达成不罢休”。你给它一句完成条件，它就一轮一轮干下去，每轮结束由一个独立的裁判判一次“达成没有”，没达成就带着裁判给的理由再来一轮，达成了才停。它是被动的：什么时候停，交给裁判说了算。

`/loop` 是“定个闹钟、反复来”。你给它一个间隔（或者让它自己定节奏），它就按点反复跑同一件事。它是主动的：什么时候再来，由调度决定，跟“有没有干成”无关。

一个靠“守门人”决定何时收手，一个靠“闹钟”决定何时再来——抓住这条区别，也就抓住了 Claude Code 自治的两条主线。下面分别拆。

## 17.2 `/goal`：一个守门的裁判

### 它其实是 Stop hook 的语法糖

官方文档一句话点明了机制：`/goal` 是对一个会话级 Stop hook 的封装。每当一个 turn 结束，系统就把“你设的条件 + 到目前为止的对话”发给一个评估器模型（官方称“小快模型”、默认 Haiku；一次抓包看到的实际模型见下），它回一个“是 / 否 + 一句理由”；“否”就让 Claude 带着这句理由再干一轮，“是”就清掉目标、并在会话记录里记一笔达成。

抓包印证了这套流程。你设目标那一刻，主模型收到的消息里有这么一段，几乎是把机制写在了明面上（下引为关键片段，末尾省略）：

> A session-scoped Stop hook is now active with condition: "<你的条件>". Briefly acknowledge the goal, then immediately start (or continue) working toward it — treat the condition itself as your directive and do not pause to ask the user what to do. The hook will block stopping until the condition holds. It auto-clears once the condition is met…

“设目标即启动一轮，把条件本身当指令。”这就是为什么你不用再单独发一句提示。

### 裁判的判决：三种结果，一道死循环刹车

真正有意思的是那个裁判。把它发出的真实请求抓下来，它的系统提示词逐字就是下面这段——不长，值得整段读一遍，因为一个自治循环的全部分寸都压在这几行里：

> You are evaluating a stop-condition hook in Claude Code. Read the conversation transcript carefully, then judge whether the user-provided condition is satisfied.
>
> Your response must be a JSON object with one of these shapes:
> - `{"ok": true, "reason": "<quote evidence from the transcript that satisfies the condition>"}`
> - `{"ok": false, "reason": "<quote what is missing or what blocks the condition>"}`
> - `{"ok": false, "impossible": true, "reason": "<explain why the condition can never be satisfied>"}`
>
> Always include a "reason" field, quoting specific text from the transcript whenever possible. If the transcript does not contain clear evidence that the condition is satisfied, return `{"ok": false, "reason": "insufficient evidence in transcript"}`.
>
> Only use `{"ok": false, "impossible": true}` when the condition is genuinely unachievable in this session — for example: the condition is self-contradictory, it depends on a resource or capability that is unavailable, or the assistant has explicitly tried, exhausted reasonable approaches, and stated it cannot be done. Apply your own judgment when deciding this — the assistant claiming the goal is impossible is evidence, not proof; independently confirm the condition is genuinely unachievable rather than deferring to the assistant's self-assessment. Do not use it just because the goal has not been reached yet or because progress is slow. When in doubt, return `{"ok": false}` without "impossible".

三种结果——达成、没达成、判定不可能——就是这段里的三个 JSON 形状。前两种直白；关键在第三种。`impossible` 是一道精心设计的死循环刹车，而整整一段都在提防同一件事：别让主 agent 把裁判忽悠着提前认输。“主 agent 说干不成，只算证据、不算铁证；裁判得自己独立确认，拿不准就返回 `{"ok": false}`、别加 `impossible`。”一个自治循环最怕的就两头——要么停不下来，要么被内部说服着草草收场，这段提示词正是同时冲着这两头写的。它甚至连“进度慢”都点名排除：慢不等于不可能。

### 三个抓包才看得到的工程细节

把裁判的真实请求整个拆开，还能看到官方文档没提的三件事。

第一，判决是 API 层强制的，不只是提示词请求。这条请求带了一个 `output_config`，用 JSON schema 把输出死死约束成 `{ok, reason, impossible}` 这个形状（`ok` 和 `reason` 必填、不许有别的字段）。提示词只是说明，schema 才是护栏——就算模型想自由发挥，也发挥不出这个形状之外。

第二，裁判不给工具、只让它看对话。请求里的 `tools` 是空的。这印证了官方那句“裁判不调用工具，只能判断已经出现在对话里的内容”：它虽然被塞了一个 transcript 路径，却没有任何工具去读那个文件。

第三，裁判跑在高推理档。请求里 `effort: "high"`。判“到底达没达成”这件事，系统舍得花算力。

关于用哪个模型，有一处得说老实话：官方文档说裁判用“你配置的小快模型，默认 Haiku”，但我这台机器抓到的实际是 `claude-fable-5`——因为本机把小快模型配成了它。所以别把一次抓包看到的模型名当成默认值。还要澄清一点：是客户端的 hook 运行时在本地组装并发出这条请求，模型推理仍在 Anthropic 那边跑，不是你本地在跑模型。

### 它在追踪里长什么样

`/goal` 每一轮的进度都会落进会话记录：一条 `goal_status`，带着条件、迭代了几轮、耗时、烧了多少 token、达成没。所以“一个目标跨多少 turn、每轮什么状态”是完全可回放的——这正是上一章讲的那份“默认就在”的追踪的一个活例子，详见[第 16 章](/lib/09-harness/how-claude-code-works/docs-16-observability)。

## 17.3 `/loop`：一个自己排程的闹钟

`/loop` 和 `/goal` 骨子里不一样。它不是一个被动 hook，而是一大段由主模型执行的编排提示词。你敲 `/loop …`，系统注入一段以 `# /loop — schedule a recurring or self-paced prompt` 开头的指令，让主模型自己去解析、选调度方式、调用通用的调度工具。换句话说，`/loop` 的“聪明”写在提示词里，不是一个硬编码的调度器——不过要补一句，真正的执行、生命周期和保护栏仍然硬编码在运行时，这点后面会看到。

### 它怎么解析你输入的

抓到的这段编排提示词，把解析规则逐字写死了——直接看原文，比我转述清楚：

> \# /loop — schedule a recurring or self-paced prompt
>
> \#\# Parsing (in priority order)
>
> 1. **Leading token**: if the first whitespace-delimited token matches `^\d+[smhd]$` (e.g. `5m`, `2h`), that's the interval; the rest is the prompt.
