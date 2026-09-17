---
title: "第 20 章：Agent Teams——对等组队与跨会话安全"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/docs/20-agent-teams.md"
sourceRel: "docs/20-agent-teams.md"
rawUrl: "/raw/09-harness/how-claude-code-works/docs/20-agent-teams.md"
sourceSha256: "0f4ba24e0fdfd1bbe922db17e89f3935e644d21e174db1de6591cfb69bdaf1e6"
pageSha256: "0f4ba24e0fdfd1bbe922db17e89f3935e644d21e174db1de6591cfb69bdaf1e6"
contentMode: "local-full"
zh: ""
---

# 第 20 章：Agent Teams——对等组队与跨会话安全

> 第 8 章讲的多 Agent——主 Agent 派子 Agent、协调器分派 worker、Swarm 铺开一批 worker——形态各异，骨子里是同一种关系：有一个主体在上面决定派谁、何时收，被派出去的 subagent 是叶子，干完把结果交回就退场。第 19 章的 dynamic workflow 把那个"当协调器的模型"换成脚本，但脚本铺开的仍是一批叶子 worker。这一章讲的是另一种关系：一个 team 里仍有一个固定的 lead 会话在牵头，但除它之外的成员不再是干完就把结果回传、彼此不通气的叶子——他们能用一个叫 SendMessage 的工具互相直接说话、共享一份任务列表和一份团队记忆，成员甚至可能分属不同会话、不同机器。这就是 Agent Teams。一旦消息能在平级成员、乃至不同会话之间横向流动，就冒出主从的叶子模型里根本不存在的问题——别的会话飘来的一句话，算不算你的用户在指挥你？这一章的重头，是 Claude Code 给这个问题的回答（不算），以及它为此在权限系统里加的几道闸。
>
> 证据分两头。团队的内核——TeamCreate 和 SendMessage 两个工具、Team 与任务列表的对应、跨机发消息那道守卫——在 ~v2.1.6x 那份快照源码里能逐行读到；这套能力跟 Opus 4.6 在 v2.1.34 同期开闸，落在快照的时间窗内。而这一章真正的主角，那条"别的会话不携带用户权威"的规则，连同团队 artifact 共享的一批新料，没随快照泄露，是从 2.1.202 客户端二进制里抽出来的——快照里 `grep` 一个都搜不到。两头拼起来，能落到源码行号，也能落到抽自当前二进制的规则文本；拿不到的是服务端那半截，末尾会讲清楚在哪儿断的。

## 20.1 主从与对等：多 Agent 的两种关系

先接[第 8 章](/lib/09-harness/how-claude-code-works/docs-07-multi-agent)。那一章的三种编排——子 Agent、协调器、Swarm——形态各异，骨子里是同一种关系：有一个主体在上面决定"现在派谁、拿到结果怎么综合"，被派出去的 subagent 是叶子，干完把结果交回就退场，彼此之间不通气。[第 19 章](/lib/09-harness/how-claude-code-works/docs-19-dynamic-workflows)的 dynamic workflow 更进一步，把当协调器的模型换成一段脚本，但被脚本铺开的仍是叶子——第 19 章特意点过，subagent 的工具集里连 Agent、Workflow 这些能再往下派的工具都被摘掉了，它只能干活，不能组队。

Agent Teams 换的是这层关系本身。一个 team 里有一个固定的 lead 会话牵头协调、分派、汇总，但除它之外的成员不再是只能等着被派、干完就回传的叶子 worker：每个成员都能主动给别人发消息，都能认领共享任务列表里的任务，都读得到同一份团队记忆。更远一点，成员甚至不必在同一个会话里——可以是你同一台机器上另开的一个 Claude Code 会话，也可以是通过 Remote Control 桥到另一台机器上的会话。把"对等"和"跨会话"这两件事叠在一起，就有了一个主从编排里从不出现的问题：一条消息从另一个会话进来，长得跟你的用户敲进来的一模一样，你该把它当成用户的指令，还是当成一个平级同事的请求？两者的权限天差地别——用户能授权你做危险的事，一个平级同事不能。这一章后半程的所有安全设计，都是在回答这一个问题。

换个角度看，第 19 章和这一章正好划出一条"谁编排谁"的边界。workflow 是一段脚本自上而下编排一批叶子 worker，worker 之间不通气，只对脚本负责。teams 是一个 lead 会话带着几个 teammate，成员之间还能横向互发——没有第 19 章那种脚本在上面逐轮调度，协调靠 lead 分派加成员彼此发消息、靠抢共享任务列表里的活。前者的风险在"脚本会不会把 worker 用错"，是个正确性问题；后者的风险在"一个会话能不能替另一个越权"，是个安全问题。这一章几乎所有篇幅都压在后一个问题上并非偶然——消息一旦能横向跨了会话和机器流动，边界就从"谁指挥谁"变成了"谁有权授权谁"。

## 20.2 一个 team 就是一个共享任务列表

一个 team 是什么？先看快照那版的入口 TeamCreate——它的描述在快照源码里是一份 6.9KB 的全文，把话讲得很直白：建一个 team，就是建一个任务列表，teams 跟任务列表一一对应，Team 就等于 TaskList。（这个显式的 TeamCreate 是快照那版的用法；当前版本换了入口，等这一节讲完机制再交代。）落到磁盘上是两样东西：一个团队配置文件 `~/.claude/teams/\{team-name\}/config.json`，和一个任务列表目录 `~/.claude/tasks/\{team-name\}/`。前者记成员名册，后者放这个团队的所有任务。

描述里给了一套七步用法，把组队干活讲成一条流水线。先用 TeamCreate 建队——同一步就把任务列表建出来了。再用 Task 工具往里加任务，任务自动进这个队的列表。然后是关键一步：用 Agent 工具派一个 teammate，带上 `team_name` 和一个 `name`，这个 agent 就加入了团队。接着用 TaskUpdate 把任务的 `owner` 指给某个空闲的 teammate，teammate 干完再 TaskUpdate 把它标成 completed。回合之间，闲下来的 teammate 会自动进 idle 状态并发一条通知——描述里专门叮嘱一句"对 idle 的队友要有耐心"。全部干完，用 SendMessage 发一个 `shutdown_request` 优雅关队。

这套显式建队的用法，到当前的 2.1.202 已经简化了。这一版里 `TeamCreate`/`TeamDelete` 不再作为常规工具摆出来，取而代之的是每个会话默认自带一支 implicit team——本会话拿到的 Agent 工具描述就把 `team_name` 参数明标成 "Deprecated; ignored. The session has a single implicit team"，注释还补一句它"carries the session-derived team name and will be removed in a future release"。换句话说，组队从"先显式建一个队、再往里塞人"变成了"每个会话天然就是一支队，直接用 Agent 工具带一个 `name` 派 teammate 进来"。这层变化只动了建队的入口；下面要讲的寻址、共享记忆、跨会话安全规则都不受影响，机制照旧。

这套描述里还嵌着几条像是踩过坑总结出来的规矩。一条是派谁干什么要看 agent 类型：只读类型的 agent（Explore、Plan 这种）只配去做调研、搜索、规划，别指望它改文件；要动文件的活，得派 general-purpose 那种全权 agent。一条是怎么认队友——读 `config.json` 里的 `members` 数组，每个成员有 `name`、`agentId`、`agentType`，而通信永远认名字，不认 UUID。还有一条是怎么不打架地领活：任务列表是共享的，一个 teammate 干完手头的，就去查 TaskList、按任务 ID 的顺序认领还没人领的任务，卡住了就通知 team lead。最后一条关乎可见性：队友之间可以私下发消息（peer DM），但这些私聊的摘要会进到给 team lead 的 idle 通知里——team lead 看得到"他俩在协作"，但读不到私聊的全文。

值得留意的是，团队没有为协作另造一套底座。Team 就是 TaskList，意味着它直接复用了已有的任务列表——共享任务、`owner` 字段、认领和标记完成，都是任务系统本就有的原语，团队只给它们套了个多成员的壳。派 teammate 走的还是 Agent 工具，队友消息的投递沿用"作为新一轮出现"那套主循环机制。真正新增的，主要是一层寻址（下一节那四种 `to`）和一层跨会话的记忆同步。把协作叠在既有原语上，好处是团队的每一步——建了哪个队、谁领了哪个任务、谁标了完成——都自动落进任务系统那套可追溯的记录里。

## 20.3 SendMessage：普通输出别人看不见，必须显式发

队友之间怎么说话？靠一个叫 SendMessage 的工具，它的描述短到一句——给另一个 agent 发消息。这里有一条容易被忽略但很要紧的机制，描述里用了强调：你打印出来的普通文本，别的 agent 是看不见的；要让别人收到，你必须调这个工具。反过来，队友发给你的消息会自动送达，你不用去查收件箱。称呼队友一律用名字，不用 UUID。

发给谁，由 `to` 决定，它有四种写法，一路从最近发到最远。最近的是队友的名字，比如 `"researcher"`，点对点发给同队一个成员。写 `"*"` 是广播给全队——描述里明说这个贵，开销随团队规模线性增长，只有真的人人都要知道时才用。再往外，`"uds:/path/to.sock"` 发给同一台机器上另一个 Claude 会话，走 Unix domain socket，藏在 `UDS_INBOX` 这个 feature flag 后面，对方地址用 `ListPeers` 发现。最远的是 `"bridge:session_..."`，发给通过 Remote Control 桥接的、可能在另一台机器上的会话，同样用 `ListPeers` 找。四种写法对应四层距离——同队、同队广播、同机跨会话、跨机——而距离越远，下一节会看到，闸门越紧。
