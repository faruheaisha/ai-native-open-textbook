---
title: "References"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/references/README.md"
sourceRel: "references/README.md"
rawUrl: "/raw/09-harness/better-harness/references/README.md"
sourceSha256: "958b7b096d4d68d77157bb004f309fa2ea0cef0807710c3312f12ee0e025d52b"
pageSha256: "958b7b096d4d68d77157bb004f309fa2ea0cef0807710c3312f12ee0e025d52b"
contentMode: "local-full"
zh: "on"
---

# References

Human-readable guidance lives here when it does not need fixtures, schemas, or
runtime binding.

<div class="tb-zh"><p>当某项指引不需要 fixture、schema 或运行时绑定时，面向人阅读的指引就放在这里。</p></div>

## Switchboard

- `session-evidence/`: bounded session collection, Task Episode diagnostics,
  reader-facing session insights, and usage-efficiency evidence.
- `project-harness/`: static project evidence, core-change inspection,
  observability, design contracts, acceptance controls, and recovery safeguards.
- `agent-customize/`: agent instructions, Skills, MCP, Memory, Hooks, Custom
  Agents, Plugins, and platform-specific asset guidance. Start with
  `agent-customize/routing.md`.
- `bootstrap/`: the 0 -> 1 move for a project with no coding-agent harness yet:
  the specification structure contract and stack-specific spec examples. Load
  this when a requirement is not yet complete enough to implement against.
- `loop-engineering/`: repeated-work and schedule-ready owner selection. Load
  this when a task may become a Skill, automation, hook, command, script,
  custom agent, MCP-backed loop, or rule.
- `tool-runtimes/`: support contracts for runtime discovery and execution
  boundaries. These are not practice domains.

<div class="tb-zh"><p>本目录下的领域划分：session-evidence/ 负责有界的会话采集、Task Episode 诊断、面向读者的会话洞察与使用效率证据；project-harness/ 负责静态项目证据、核心改动检查、可观测性、设计契约、验收控制与恢复保障；agent-customize/ 负责 agent 指令、Skills、MCP、Memory、Hooks、Custom Agents、Plugins 以及各平台专属资产的指引，请从 agent-customize/routing.md 入手；bootstrap/ 负责尚无 coding-agent harness 的项目从 0 到 1 的推进——specification 结构契约与各技术栈的 spec 示例，当需求还不够完整、无法据此实现时加载它；loop-engineering/ 负责重复性工作与可调度工作的所有者选择，当一个任务可能演化为 Skill、自动化、hook、命令、脚本、custom agent、由 MCP 支撑的循环或规则时加载它；tool-runtimes/ 提供运行时发现与执行边界的支持契约，它们不属于实践领域。</p></div>

Detector and signal guidance stays with its owning model, executable
capability, or skill-local contract. Promote shared prose only when two visible
workflow consumers need the same owner; do not recreate a generic detector
bucket.

<div class="tb-zh"><p>检测器与信号相关的指引留在其所属的模型、可执行能力或 skill 本地契约中。只有当两个可见的工作流消费者确实需要同一个所有者时，才把共享散文提升出来；不要重建一个通用的检测器桶。</p></div>

## Historical Paths

- `references/coding-agent-practices/` was split by evidence owner. Use
  `session-evidence/`, `project-harness/`, or `agent-customize/`.
- `references/reliable-delivery/`, `references/ai-friendly/`,
  `references/coding-agent-observability/`, and
  `references/ai-friendly-engineering/` were folded into `project-harness/`.
- `references/coding-agent-practises/` was the historical misspelled path. Do
  not recreate it; route the document to its current evidence owner.
- `references/harness-practises/` was the historical misspelled harness path.
  Do not recreate it; use `references/project-harness/`.
- `references/harness-engineering/` was the former broad project domain. Do
  not recreate it; use
  `references/project-harness/`.

<div class="tb-zh"><p>历史路径的归并说明：references/coding-agent-practices/ 已按证据所有者拆分，请改用 session-evidence/、project-harness/ 或 agent-customize/；references/reliable-delivery/、references/ai-friendly/、references/coding-agent-observability/ 和 references/ai-friendly-engineering/ 已并入 project-harness/；references/coding-agent-practises/ 是历史上拼错的路径，不要再创建它，请把文档路由到它当前的证据所有者；references/harness-practises/ 是历史上拼错的 harness 路径，不要再创建它，请使用 references/project-harness/；references/harness-engineering/ 是原先宽泛的项目域，不要再创建它，请使用 references/project-harness/。</p></div>
