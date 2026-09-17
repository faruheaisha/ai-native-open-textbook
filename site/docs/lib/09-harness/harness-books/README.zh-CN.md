---
title: "Harness Books / 驾驭工程"
sourceId: "09-harness/harness-books"
sourceTitle: "Harness Books"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/wquguru/harness-books"
entryUrl: "https://github.com/wquguru/harness-books/blob/fbf2b43e352443eea00eb9e4a32709a9f2c11a76/README.zh-CN.md"
sourceRel: "README.zh-CN.md"
rawUrl: "/raw/09-harness/harness-books/README.zh-CN.md"
sourceSha256: "ef355ab255dcd711793b10709c7a09a5ca578a97afcdc4bb17635aa9f20bcc6b"
pageSha256: "ef355ab255dcd711793b10709c7a09a5ca578a97afcdc4bb17635aa9f20bcc6b"
contentMode: "local-full"
zh: ""
---

# Harness Books / 驾驭工程

[English README](/lib/09-harness/harness-books/overview)

两本关于 Harness Engineering 的书。它们追问同一个工程问题：一个会写代码的模型进了终端、仓库、权限系统和团队流程，系统凭什么还能保持边界、连续性和后果控制。

<table>
  <tr>
    <td align="center" valign="top" width="50%">
        <img src="https://gh-proxy.com/https://raw.githubusercontent.com/wquguru/harness-books/fbf2b43e352443eea00eb9e4a32709a9f2c11a76/book1-claude-code/assets/cover-wxb.svg" alt="Harness Engineering：Claude Code 设计指南" width="280">
      <br>
      <strong>Harness Engineering：Claude Code 设计指南</strong>
      <br>
      <a href="https://harness-books.agentway.dev/book1-claude-code/">在线阅读</a> ·
[PDF 下载](https://harness-books.agentway.dev/book1-claude-code/exported/book1-claude-code.pdf)
    </td>
    <td align="center" valign="top" width="50%">
        <img src="https://gh-proxy.com/https://raw.githubusercontent.com/wquguru/harness-books/fbf2b43e352443eea00eb9e4a32709a9f2c11a76/book2-comparing/assets/cover-wxb.svg" alt="Claude Code 和 Codex 的 Harness 设计哲学" width="280">
      <br>
      <strong>Claude Code 和 Codex 的 Harness 设计哲学</strong>
      <br>
      <a href="https://harness-books.agentway.dev/book2-comparing/">在线阅读</a> ·
[PDF 下载](https://harness-books.agentway.dev/book2-comparing/exported/book2-comparing.pdf)
    </td>
  </tr>
</table>

这两本书不打算把源码拆成零件逐条讲解。它们关心的是 harness 怎样组织约束与执行，怎样把一个本质上不稳定的模型，收束进可持续运行的工程秩序里。Prompt 分层、Query Loop、权限判定、上下文治理、失败恢复、多 agent 验证、本地规则和团队制度，合在一起才构成 harness 的器官系统。工程里最怕的事，不是模型偶尔犯傻，而是系统对后果毫无准备。

## 核心判断

- Harness Engineering 讨论的是约束结构怎样组织执行。
- 一个会写代码的模型进入真实工程环境以后，主要问题不再是回答质量，而是行为后果。
- Prompt、工具、权限、状态、恢复、验证和制度，不是外围配件，而是同一套控制结构的不同器官。
- 比较不同 agent 系统，重点不该是功能表，而该是秩序被安放在哪一层。
- 一个团队如果不能把个人经验沉淀成可复用制度，就很难把 agent 变成稳定系统。

## 两本书，各自关注的核心问题

### 第一本：Claude Code 设计指南

第一本书拿 Claude Code 当观察对象，重点放在运行时骨架上。它关心的是，一套系统为什么最终必须长出控制面、Query Loop、工具权限、上下文治理、恢复路径、多 agent 验证和团队制度这些结构。

如果你更关心这些问题，建议先读第一本：

- 为什么 Harness Engineering 不是 Prompt Engineering 的放大版
- Prompt 为什么本质上是控制面，而不是聊天输入框
- 模型犯错为什么应该被视为运行时常态，而不是异常事件
- 多 Agent 和验证机制为什么不能混成一团
- 团队怎么把个人经验固化成可复用的工程制度

### 第二本：Claude Code 与 Codex 比较书

第二本书把 Claude Code 和 Codex 放在一起，关注的是两套 harness 各自把秩序安放在哪一层。有人更从运行时纪律出发，有人更从结构化控制层出发；系统都能运转，权力分配方式却并不一样。

如果你更关心选型、架构判断或自己做系统时该学谁，建议读第二本：

- Claude Code 和 Codex 在控制面设计上最大的分歧是什么
- Query Loop、Thread、Rollout、State 的职责边界怎么对齐来看
- 权限、沙箱、策略语言各自承担什么治理角色
- 技能、Hook、本地规则怎样把“组织习惯”写进系统
- 如果要自己做 harness，应该先学谁、先学哪一层

## 建议阅读路径

- 想先建立完整框架 → 先读第一本，再读第二本。
- 已经熟悉 agent coding 工具，想直接看架构分歧 → 先读第二本。
- 只关心结论 → 第一本“第 9 章 十条原则” + 第二本“第 7 章 殊途同归，还是各表一枝”。

<details>
<summary><strong>完整目录</strong></summary>

### Book 1 — Harness Engineering：Claude Code 设计指南

- [导读](/lib/09-harness/harness-books/book1-claude-code)
- [序言 Harness、终端与工程约束](/lib/09-harness/harness-books/book1-claude-code-preface)
- [第 1 章 为什么需要 Harness Engineering](/lib/09-harness/harness-books/book1-claude-code-chapter-01-why-harness-engineering)
- [第 2 章 Prompt 不是人格，Prompt 是控制平面](/lib/09-harness/harness-books/book1-claude-code-chapter-02-prompt-is-control-plane)
- [第 3 章 Query Loop：代理系统的心跳](/lib/09-harness/harness-books/book1-claude-code-chapter-03-query-loop-heartbeat)
- [第 4 章 工具、权限与中断：为什么代理不能直接碰世界](/lib/09-harness/harness-books/book1-claude-code-chapter-04-tools-permissions-interrupts)
- [第 5 章 上下文治理：Memory、CLAUDE.md 与 Compact 是预算制度](/lib/09-harness/harness-books/book1-claude-code-chapter-05-context-memory-compact)
- [第 6 章 错误与恢复：出错后仍能继续工作的代理系统](/lib/09-harness/harness-books/book1-claude-code-chapter-06-errors-and-recovery)
- [第 7 章 多代理与验证：用分工和验证管理不稳定性](/lib/09-harness/harness-books/book1-claude-code-chapter-07-multi-agent-and-verification)
- [第 8 章 团队落地：把一个聪明工具变成可复用制度](/lib/09-harness/harness-books/book1-claude-code-chapter-08-team-landing-practices)
- [第 9 章 Harness Engineering 十条原则](/lib/09-harness/harness-books/book1-claude-code-chapter-09-ten-principles)
- [附录 A 检查清单：把原则落成能执行的约束](/lib/09-harness/harness-books/book1-claude-code-appendix-a-checklists)
- [附录 B 图示：把运行时骨架画出来](/lib/09-harness/harness-books/book1-claude-code-appendix-b-diagram-notes)
- [附录 C 源码地图：本书各章主要依据哪些文件](/lib/09-harness/harness-books/book1-claude-code-appendix-c-source-map)

### Book 2 — Claude Code 和 Codex 的 Harness 设计哲学

- [导读](/lib/09-harness/harness-books/book2-comparing)
- [阅读地图：如何理解第一本书与这本比较书](/lib/09-harness/harness-books/book2-comparing-chapter-00-reading-map)
- [序言 两套 Harness，不必假装是同一匹马的附件](/lib/09-harness/harness-books/book2-comparing-preface)
- [第 1 章 为什么要把 Claude Code 和 Codex 放在一起看](/lib/09-harness/harness-books/book2-comparing-chapter-01-why-this-comparison)
- [第 2 章 两种控制面：Prompt 拼装与 Instruction Fragment](/lib/09-harness/harness-books/book2-comparing-chapter-02-two-control-planes)
- [第 3 章 心跳放在哪：Query Loop 对照 Thread、Rollout 与 State](/lib/09-harness/harness-books/book2-comparing-chapter-03-loop-thread-and-rollout)
- [第 4 章 工具、沙箱与策略语言：谁来阻止模型动手太快](/lib/09-harness/harness-books/book2-comparing-chapter-04-tools-sandbox-and-exec-policy)
- [第 5 章 技能、Hook 与本地规则：系统如何学会守乡约](/lib/09-harness/harness-books/book2-comparing-chapter-05-skills-hooks-and-local-governance)
- [第 6 章 委派、验证与持久状态：谁来防止系统自己给自己打高分](/lib/09-harness/harness-books/book2-comparing-chapter-06-delegation-verification-and-state)
- [第 7 章 殊途同归，还是各表一枝](/lib/09-harness/harness-books/book2-comparing-chapter-07-convergence-and-divergence)
- [第 8 章 如果你要自己做：该向谁学，先学什么](/lib/09-harness/harness-books/book2-comparing-chapter-08-how-to-choose-or-build)
- [附录 A 源码地图：这套比较主要依据哪些文件](/lib/09-harness/harness-books/book2-comparing-appendix-a-source-map)
- [附录 B 检查清单：如何判断你的 Harness 更像 Claude Code、Codex，还是半成品](/lib/09-harness/harness-books/book2-comparing-appendix-b-checklists)

</details>

## 想继续实践？试试 AgentWay

<table>
<tr>
<td width="180" align="center" valign="middle">
    <img src="https://gh-proxy.com/https://raw.githubusercontent.com/wquguru/harness-books/fbf2b43e352443eea00eb9e4a32709a9f2c11a76/assets/agentway-logo.svg" alt="AgentWay" width="150">
</td>
<td valign="middle">
  <b><a href="https://agentway.dev/">AgentWay</a></b> 是和本书主题相关、但彼此独立的实践平台。Harness Books 负责把控制结构、判断方式和架构分歧讲清楚；AgentWay 更偏向把这些方法继续落到训练路径、练习、项目演练和 agent PoC 上。如果你不想停留在“已经看懂”，而是想继续动手实践，可以单独了解它。
</td>
</tr>
</table>

## 本地构建

分别构建两个 Honkit 站点，再组装为统一的 Pages 静态站点：

```bash
cd book1-claude-code && npx --yes honkit build . _book && cd ..
cd book2-comparing && npx --yes honkit build . _book && cd ..
python3 tools/book-kit/build_pages_site.py
```

最终输出目录为 `dist/`。

---

<sub>Keywords: Harness Engineering, Claude Code guide, Claude Code vs Codex, AI coding agent, control plane, query loop, agent recovery, agent verification, local governance, approval policy · 驾驭工程, Claude Code 指南, Claude Code 与 Codex 对比, AI 编程代理, 控制面, 查询循环, Agent 恢复, Agent 验证, 本地治理, 审批策略</sub>
