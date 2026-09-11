---
title: "配置文件 config.toml"
sourceId: "09-harness/codex-guide-freestylefly"
sourceTitle: "Codex 实践指南（CodexGuide）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/freestylefly/CodexGuide"
entryUrl: "https://github.com/freestylefly/CodexGuide/blob/f93c14ba1239178f63210c7e2e6e6965ebf59e79/README.md"
zh: ""
---

# 配置文件 config.toml

`config.toml` 用来保存 Codex CLI 的本地默认行为。你可以把它理解为“个人驾驶舱”：模型、审批、沙盒、profiles、MCP 服务等偏好都可以在这里集中管理。

## 配置文件放在哪里

通常位于：

```text
~/.codex/config.toml
```

项目长期规则建议写到仓库内的 `AGENTS.md`，个人偏好放到本机 `config.toml`。这样团队成员能共享项目规则，又能保留自己的 CLI 使用习惯。

## `.env` 和 `config.toml` 不要混用

`config.toml` 保存 Codex 的持久配置，例如模型、沙盒、审批、profiles 和 MCP server。`~/.codex/.env` 更适合放 Desktop app 或 IDE extension 启动时需要读取的环境变量，例如 provider 需要的区域变量，或排障时临时验证过的代理变量。

OpenAI [Amazon Bedrock provider 文档](https://developers.openai.com/codex/amazon-bedrock)提醒：Desktop app 和 VS Code extension 可能不会继承当前 shell 里的环境变量；如果这些入口需要某些变量，可以把值放进 `~/.codex/.env`，然后重启 app 或 extension。

写入前先确认两件事：

- 变量确实是当前入口需要的，不要把所有 shell 变量都复制进去。
- 文件里可能包含 secret，截图、发 issue 或提交仓库前必须脱敏。

例如代理排障时，不要先猜端口。先用系统代理设置和 `curl -x` 确认端口可用，再写：

```bash
export HTTP_PROXY="http://127.0.0.1:<PORT>"
export HTTPS_PROXY="http://127.0.0.1:<PORT>"
export NO_PROXY="localhost,127.0.0.1,::1,*.local"
```

::: info 截图占位
请补充本机 `~/.codex/config.toml` 文件位置截图，注意遮挡敏感路径和 token。建议文件：`docs/.vuepress/public/screenshots/config/02-config-location.png`。
:::

## 最小配置示例

下面是一个学习用示例，实际字段请以官方 config reference 和当前 CLI 版本为准：

```toml
model = "gpt-5.1-codex-max"
approval_policy = "on-request"
sandbox_mode = "workspace-write"

[profiles.readonly]
approval_policy = "on-request"
sandbox_mode = "read-only"

[profiles.build]
approval_policy = "on-request"
sandbox_mode = "workspace-write"
```

这个示例表达三件事：

- 默认允许在当前工作区写文件。
- 高风险命令仍需要审批。
- 额外保留一个只读 profile，适合新仓库分析。

## 常见配置项按用途理解

| 用途 | 你要决定什么 | 建议 |
| --- | --- | --- |
| 模型 | 速度、成本、推理深度的取舍 | 用默认配置起步，复杂任务再临时调整 |
| 沙盒 | Codex 能读写哪些位置 | 新手先只读或工作区写入 |
| 审批 | 哪些命令需要你确认 | 涉及网络、删除、安装、发布时保留审批 |
| profiles | 不同任务使用不同组合 | 准备 readonly、coding、review 三类 profile |
| MCP | 接入外部工具和知识源 | 只接可信服务，明确权限范围 |
| 环境 | 传递必要变量或隔离敏感变量 | 凭据用最小权限，避免写进教程截图 |

## 推荐 profiles

### 只读学习

适合打开陌生仓库、生成项目地图、梳理测试命令。

```toml
[profiles.readonly]
sandbox_mode = "read-only"
approval_policy = "on-request"
```

任务示例：

```bash
codex --profile readonly
```

```text
请只读分析当前仓库。不要修改文件，不要运行会写入文件的命令。
```

### 日常编码

适合修测试、补文档、小范围实现。

```toml
[profiles.coding]
sandbox_mode = "workspace-write"
approval_policy = "on-request"
```

任务示例：

```text
请修复这个失败测试。修改范围限制在 `src/parser` 和对应测试文件，修复后运行 `pnpm test parser`。
```

### 审查与发布前检查

适合 PR review、发布前风险扫描、diff 总结。

```toml
[profiles.review]
sandbox_mode = "read-only"
approval_policy = "on-request"
```

任务示例：

```text
请 review 当前 diff，优先指出 bug、回归风险和缺失测试。不要修改文件。
```

## 配置变更的验证方法

每次改完配置，不要直接上复杂任务。用一个短任务验证：

```text
请告诉我当前工作区、审批策略和你准备采用的验证方式。不要修改文件。
```

再检查：

- Codex 是否能正确读取当前目录。
- 是否会在执行命令前解释意图。
- 是否遵守只读或工作区写入边界。
- 是否按预期触发审批。

::: info 截图占位
请补充切换 profile 后的状态截图。建议文件：`docs/.vuepress/public/screenshots/config/03-profile-status.png`。
:::

## 切换 provider 后历史会话不可见怎么办

有些用户在修改根级 `model_provider` 后，会发现旧会话在 Codex Desktop 或 CLI 的 `/resume` 里突然不可见。常见原因不是会话文件丢失，而是 `~/.codex` 里的会话 metadata、SQLite 状态和项目路径缓存仍停留在旧 provider。

::: warning 第三方社区工具
下面介绍的是社区项目 [Dailin521/codex-provider-sync](https://github.com/Dailin521/codex-provider-sync)，不是 OpenAI 官方工具。社区资料最后核对日期：2026-05-29。使用前请先备份 `~/.codex`，并确认你理解它会修改本机 Codex 状态文件。
:::

这个工具主要同步这些位置里的 provider / 可见性 metadata：

- `~/.codex/sessions`
- `~/.codex/archived_sessions`
- `~/.codex/state_5.sqlite`
- `.codex-global-state.json` 中的项目根路径缓存

先做两个判断：

- 如果 CLI `/resume` 能看到旧会话，但 Desktop 项目侧仍为空，可能是 Codex Desktop 最近 50 条会话的首屏显示限制，不一定是 provider metadata 问题。
- 如果最近刚切换过 `model_provider`，并且多个入口都找不到旧会话，再考虑使用同步工具。

### Windows GUI 流程

Windows 用户可以优先使用上游 Release 里的图形界面版本：

1. 打开 [codex-provider-sync Releases](https://github.com/Dailin521/codex-provider-sync/releases)，下载 `CodexProviderSync.exe`。
2. 双击运行后，先确认顶部 `Codex Home` 路径指向你的 `.codex` 目录。
3. 点击 `Refresh`，查看当前 provider、rollout、SQLite 和项目可见性诊断。
4. 在 provider 列表里选择目标 Provider。
5. 如果希望同时改写 `config.toml` 根级 `model_provider`，再勾选右侧对应选项。
6. 点击 `Execute` 执行同步。
7. 如果结果不符合预期，用 `Restore Backup` 从工具生成的备份目录恢复。

GUI 会默认保留最近几份由本工具创建的备份。若 `state_5.sqlite` 被占用，先关闭 Codex、Codex App 或 app-server 后再重试。

### macOS 或 CLI 流程

CLI 版本需要 Node.js `24+`。如果你使用 Node 20/22，可能会遇到 `node:sqlite` 不存在的问题。

```bash
npm install -g git+https://github.com/Dailin521/codex-provider-sync.git
codex-provider status
```

建议先只运行 `status`，确认它看到的 provider、rollout、SQLite 和项目可见性诊断符合预期。确认后再选择操作：

```bash
codex-provider sync
codex-provider sync --provider openai
