---
title: "第13章节 高级自动化工作流（Cron / Tasks / Task Flow / Hooks / Standing Orders）"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/04-practical-cases/13-advanced-automation.md"
sourceRel: "docs/04-practical-cases/13-advanced-automation.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-tutorial/docs/04-practical-cases/13-advanced-automation.md"
sourceSha256: "350b240583565633aa3e0f72d432b310ac5dce7dd28dea58f674d9bb84cebd1c"
pageSha256: "350b240583565633aa3e0f72d432b310ac5dce7dd28dea58f674d9bb84cebd1c"
contentMode: "local-full"
zh: ""
---

# 第13章节 高级自动化工作流（Cron / Tasks / Task Flow / Hooks / Standing Orders）

> 本章目标：建立一套符合 OpenClaw 当前官方设计的自动化观念，不再混淆 cron、heartbeat、tasks、Task Flow、hooks 和 standing orders 的职责边界。

---

## 版本基线

- **当前稳定版**：`v2026.9.3`（2026-09-08 发布）
- 自动化章节默认按 `v2026.9.3` 稳定版行为说明；升级后先 `openclaw doctor --fix`

---

## 先给小白的阅读说明

### 这章最重要的不是命令，而是顺序

很多人一上来就学 `Task Flow`，最后反而越学越乱。更适合小白的顺序是：

1. 先学 `cron`
2. 再学怎么看 `tasks`
3. 最后再上 `Task Flow`、`hooks`、`standing orders`

### 如果你只想先做一个能用的自动化

请先完成这一条最小路径：

- 用 `cron` 建一个每天早上跑的任务
- 用 `tasks list` 看它有没有进入后台账本
- 用 `tasks show` 看一次任务详情

如果这 3 步你都能完成，再往后看多步骤编排。

### 这章适合谁

- 已经能稳定使用 OpenClaw，但想把重复工作交给它
- 想把“提醒、报表、扫描、汇总”变成固定流程
- 想接外部触发，但还分不清 `hooks` 和 `webhooks`

---

## 13.1 先把 6 个概念分清楚

| 机制 | 适合什么 | 什么时候用 |
|------|----------|------------|
| `cron` | 精确时间触发 | 每天、每周、一次性提醒、定时报表 |
| `heartbeat` | 近似定期检查 | 需要持续“巡检主会话”而不是严格时刻 |
| `tasks` | 记录后台工作 | 看 detached work 跑了什么、卡在哪 |
| `Task Flow` | 多步骤可恢复编排 | A→B→C 这类 durable 流程 |
| `hooks` | 外部轻量触发 | 外部系统来一个事件，叫醒主会话或跑 isolated job |
| `standing orders` | 长期授权规则 | 把“你拥有哪些固定职责”写进 `AGENTS.md` |

官方文档的核心观点非常一致：

- `cron` 是调度器
- `tasks` 是后台工作账本
- `Task Flow` 是位于 tasks 之上的耐久编排层
- `standing orders` 是 agent 的长期运营授权，不是调度器本身

---

## 13.2 `cron`：时间驱动自动化的第一选择

### 13.2.1 一次性提醒

这是最适合新手先练手的例子，因为它结构最简单：到了某个时间点，发一次提醒，然后结束。

```bash
openclaw cron add   --name "Reminder"   --at "2026-05-01T16:00:00Z"   --session main   --system-event "Reminder: review the launch checklist"   --wake now   --delete-after-run
```

### 13.2.2 每日定时报表

```bash
openclaw cron add   --name "Morning brief"   --cron "0 7 * * *"   --tz "Asia/Shanghai"   --session isolated   --message "Summarize overnight updates, key tasks, and calendar priorities."   --announce
```

### 13.2.3 运维常用命令

#### 看到什么算 `cron` 已经跑通

你至少要会检查这 3 件事：

- `openclaw cron list` 里能看到你刚创建的任务
