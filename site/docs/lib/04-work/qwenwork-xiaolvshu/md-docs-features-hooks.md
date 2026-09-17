---
title: "Hooks 自动化钩子 (/docs/features/hooks)"
sourceId: "04-work/qwenwork-xiaolvshu"
sourceTitle: "qwenwork-xiaolvshu"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.org"
entryUrl: "https://qwenwork.org"
sourceRel: "md/docs/features/hooks.md"
rawUrl: "/raw/04-work/qwenwork-xiaolvshu/md/docs/features/hooks.md"
sourceSha256: "a5df704a17f272d66bd2717eb7eb670f0f939a767de513d40f774959d527238c"
pageSha256: "a5df704a17f272d66bd2717eb7eb670f0f939a767de513d40f774959d527238c"
contentMode: "local-full"
zh: ""
---

# Hooks 自动化钩子 (/docs/features/hooks)

Hooks 允许桌面 Agent 在特定生命周期事件发生时运行本地命令。它适合强制执行确定性检查，例如工具调用前拦截高风险操作、写文件后运行 Lint，或任务结束时发送本地通知。

  Hook 命令会以当前用户权限执行，并可能读取 stdin 中的任务、工具和路径信息。只运行自己审查过的脚本，不要直接复制不可信来源的命令。

## 配置位置与结构 [#配置位置与结构]

当前文档把用户级配置写为：

```text
~/.qwenwork/settings.json
```

并明确当前版本不支持热加载，修改后需要重启千问办公。不同客户端版本若显示其他配置位置，应以当前产品入口为准，不要同时维护多份未知优先级的配置。

配置骨架如下：

```json
{
  "hooks": {
    "事件名": [
      {
        "matcher": "匹配条件",
        "hooks": [
          {
            "type": "command",
            "command": "要执行的命令",
            "timeout": 60
          }
        ]
      }
    ]
  }
}
```

`type` 当前固定为 `command`；`timeout` 默认 60 秒。`matcher` 可以省略或使用 `*` 匹配全部，也可以使用精确值、以 `|` 分隔的多个值或正则表达式。先从精确匹配开始，避免把高成本脚本挂到全部工具。

## 事件总览 [#事件总览]

| 事件                               | 触发时机                    | 常见用途               |
| -------------------------------- | ----------------------- | ------------------ |
| `SessionStart` / `SessionEnd`    | 会话开始或结束                 | 初始化、清理、会话审计        |
| `UserPromptSubmit`               | 用户提交 Prompt 后、Agent 处理前 | 输入检查与审计            |
| `PreToolUse`                     | 工具执行前                   | 阻止危险命令或未允许路径       |
| `PostToolUse`                    | 工具成功后                   | 写文件后运行格式化、Lint 或测试 |
| `PostToolUseFailure`             | 工具失败后                   | 收集失败上下文或本地通知       |
| `Stop`                           | 主 Agent 准备结束            | 验证交付条件，必要时要求继续     |
| `SubagentStart` / `SubagentStop` | 子 Agent 启动或结束           | 子任务审计与验收           |
| `PreCompact`                     | 上下文压缩前                  | 保存必要的任务状态          |
| `Notification`                   | 权限请求或结果通知               | 系统提醒               |
| `PermissionRequest`              | 工具需要授权时                 | 自定义审批提醒或记录         |

事件可匹配的字段不同。例如 `PreToolUse` 和 `PostToolUse` 按工具名匹配，`SessionStart` 可以区分新建、恢复和压缩后继续。配置前按当前文档核对对应事件的输入字段。

## 输入与退出码 [#输入与退出码]

Hook 从 stdin 接收 JSON。所有事件都包含 `session_id`、`cwd` 和 `hook_event_name`，具体事件还会附加工具名、工具输入、失败信息或触发原因。当前文档明确不会为 Hook 自动注入额外环境变量。

| 结果      | 行为                               |
| ------- | -------------------------------- |
| 退出码 `0` | 成功；部分事件会继续解析 stdout JSON         |
| 退出码 `2` | 对支持阻止的事件生效，stderr 会作为信息返回给 Agent |
| 其他非零退出码 | 记录为非阻塞错误，stdout 不再解析             |

只有确实需要强制阻止的检查才使用退出码 `2`。普通 Lint 失败是否应阻止后续步骤，应由项目流程明确决定，不能默认所有警告都中断任务。

## 推荐落地顺序 [#推荐落地顺序]

    ### 先定义一条规则 [#先定义一条规则]

    明确要保护的事件、工具和路径，以及允许与拒绝条件。

    ### 让脚本只读开始 [#让脚本只读开始]

    先记录输入或发送通知，不在第一版中修改文件、结束进程或调用外部服务。

    ### 用最小 matcher [#用最小-matcher]

    只匹配需要检查的工具或事件，设置合理超时，并对空值和异常 JSON 安全失败。

    ### 在隔离目录验证 [#在隔离目录验证]

    测试允许、拒绝、脚本崩溃、超时和重启后的行为，再应用到真实项目。

## 安全与维护 [#安全与维护]

* 配置和脚本纳入版本记录，但密钥和个人路径不要提交到仓库；
* 脚本读取 JSON 时处理缺失字段，所有路径都要明确限定；
* 不让 Hook 自动执行删除、提权、支付或外部发布；
* 避免递归：Hook 触发的命令不应再次制造无限事件链；
* 为阻止规则保留清晰错误信息和人工恢复方法；
* 客户端更新后重新验证事件名、输入结构、配置路径和退出码。

## 相关指南 [#相关指南]
