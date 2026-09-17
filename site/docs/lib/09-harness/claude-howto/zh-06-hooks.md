---
title: "Hooks 参考"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/06-hooks/README.md"
sourceRel: "zh/06-hooks/README.md"
rawUrl: "/raw/09-harness/claude-howto/zh/06-hooks/README.md"
sourceSha256: "e2c1d8ca71d947c8b04b9df6cd0aafdbb9245b9e7cc8f647dde546a59d78b675"
pageSha256: "e2c1d8ca71d947c8b04b9df6cd0aafdbb9245b9e7cc8f647dde546a59d78b675"
contentMode: "local-full"
zh: ""
---

# Hooks 参考

Hooks 是在 Claude Code 事件发生时自动执行的 shell 命令，用来做格式化、校验、通知、审计等自动化工作。

## 概览

Hooks 是事件驱动的自动化机制。它们会在 Claude Code 发生某些动作时自动运行，不需要你手动触发。

常见用途：

- 写文件前自动格式化
- 提交前运行测试
- 扫描安全问题
- 记录 bash 命令
- 校验用户提示词
- 发送团队通知

## Hook 类型

Claude Code 支持 33 个 hook 事件，按用途分为以下 4 组。事件的 handler 类型共 5 种：`command`、`http`、`mcp_tool`、`prompt`、`agent`。

- **Tool Hooks**：`PreToolUse`、`PostToolUse`、`PostToolUseFailure`、`PostToolBatch`、`PermissionRequest`、`PermissionDenied`
- **Session Hooks**：`SessionStart`、`Setup`、`SessionEnd`、`Stop`、`StopFailure`、`SubagentStart`、`SubagentStop`
- **Task Hooks**：`UserPromptSubmit`、`UserPromptExpansion`、`MessageDisplay`、`TaskCompleted`、`TaskCreated`、`TeammateIdle`（`TaskCompleted` 和 `TaskCreated` 仅在启用 todo 工具时触发 —— 在 Opus 4.8、Sonnet 5、Fable 5、Mythos 5 及更新模型上默认关闭；`CLAUDE_CODE_ENABLE_TODO_TOOLS=1` 可恢复）
- **Lifecycle Hooks**：`ConfigChange`、`CwdChanged`、`DirectoryAdded`、`FileChanged`、`PreCompact`、`PostCompact`、`PreModelSwitch`、`PostModelSwitch`、`WorktreeCreate`、`WorktreeRemove`、`Notification`、`InstructionsLoaded`、`Elicitation`、`ElicitationResult`

## 安装

```bash
mkdir -p ~/.claude/hooks
cp 06-hooks/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh
```

然后在 `~/.claude/settings.json` 里配置：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/format-code.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/security-scan.sh"
          }
        ]
      }
    ]
  }
}
```

## 使用方法

Hooks 会在匹配到事件时自动执行。你可以把它理解成 Claude Code 的事件回调。

## 常见示例

- `format-code.sh` - 写入前自动格式化
- `pre-commit.sh` - 提交前跑测试
- `security-scan.sh` - 做安全扫描
- `log-bash.sh` - 记录 bash 命令
- `validate-prompt.sh` - 校验输入
- `notify-team.sh` - 发通知

## 最佳实践

- 把 hooks 保持短小明确
- 只做单一职责
- 先在本地测试
- 不要在 hook 里放复杂业务逻辑
- 对副作用保持谨慎

## 故障排查

- 检查文件路径和权限
- 确认脚本可执行
- 检查 settings.json 语法
- 查看 Claude Code 版本兼容性

## 相关概念

- [Checkpoints and Rewind](/lib/09-harness/claude-howto/zh-08-checkpoints)
- [Slash Commands](/lib/09-harness/claude-howto/zh-01-slash-commands)
- [Skills](/lib/09-harness/claude-howto/zh-03-skills)
- [Subagents](/lib/09-harness/claude-howto/zh-04-subagents)
- [Plugins](/lib/09-harness/claude-howto/zh-07-plugins)
- [Advanced Features](/lib/09-harness/claude-howto/zh-09-advanced-features)

## 更多资源

- [Memory Guide](/lib/09-harness/claude-howto/zh-02-memory)
- [Official Hooks Documentation](https://code.claude.com/docs/en/hooks)
- [CLI Reference](https://code.claude.com/docs/en/cli-reference)

---

**最后更新**: 2026 年 9 月 2 日
**Claude Code 版本**: 2.1.257
**来源**:
- https://code.claude.com/docs/en/hooks
