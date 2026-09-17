---
title: "qwenwork-official-help-cn"
sourceId: "04-work/qwenwork-official-help-cn"
sourceTitle: "qwenwork-official-help-cn"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.cn/docs"
entryUrl: "https://qwenwork.cn/docs"
sourceRel: "docs/desktop/hooks.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/desktop/hooks.md"
sourceSha256: "25ca91921707aee493f817509ae78f053f154510f97c1cb7ba210f2846e850c7"
pageSha256: "25ca91921707aee493f817509ae78f053f154510f97c1cb7ba210f2846e850c7"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 核心能力 桌面端核心功能 Hooks
 桌面端官方知识库
Hooks
本文介绍千问办公企业 Hook 的配置格式、HTTP 调用约定，以及各类事件的请求和响应。企业 Hook 由桌面客户端调用企业提供的 HTTP 服务。
当前支持的 Hooks 事件
当前千问办公对企业开放以下 6 个事件：
事件触发时机典型用途可以阻止操作
SessionStart会话启动、恢复、清空或压缩后重新进入会话时记录会话、注入企业规范不建议用于阻断
UserPromptSubmit用户提交内容后、内容进入 Agent 前敏感信息检查、提示词合规检查可以
PreToolUseAgent 调用工具前命令管控、文件操作管控、权限审批可以
PostToolUse工具执行完成后操作审计、结果检查工具已经执行，无法撤销
StopAgent 准备结束当前响应时完整性检查、要求 Agent 继续处理可以阻止 Agent 停止
NotificationAgent 产生通知时通知转发、安全审计不建议用于阻断

Hook 配置
Hook 配置格式
在企业管理后台【安全管控】→【Hooks 规则】中选择事件，填写该事件的 JSON 配置数组。数组中的每一项是一个 Hook 组，matcher 决定何时匹配，hooks 指定匹配后调用的服务。
下面的配置用于在 Bash 工具执行前调用检查服务，应填写在 PreToolUse 事件中：
[
 \{
 "matcher": "^Bash$",
 "hooks": [
 \{
 "type": "http",
 "url": "https://hooks.example.com/pre-tool-use",
 "timeout": 30,
 "headers": \{
 "Authorization": "Bearer ..."
 \}
 \}
 ]
 \}
]
将 URL 和凭据替换为实际值。不需要认证时可省略 headers。配置为空数组 [] 时，该事件不调用企业 Hook。
字段说明
Hook 组字段：
matcher 在 PreToolUse、PostToolUse 中用于匹配工具名了；在 SessionStart 中匹配 source；在 Notification 中匹配通知类型；UserPromptSubmit 和 Stop 不需要配置该字段。
字段类型必填说明
matcherstring否JavaScript 正则表达式，大小写敏感；省略或"*"表示匹配全部
hooksarray是HTTP Hook 列表，至少包含 1 项

matcher 匹配规则
写法含义示例
不填或 "*"匹配所有所有工具都触发
精确值精确匹配"Bash" 只匹配 Bash 工具
| 分隔匹配多个值"Write|Edit" 匹配 Write 或 Edit
正则表达式正则匹配"mcp__.*" 匹配所有 MCP 工具

HTTP Hook 字段:
字段类型必填说明
typestring是固定为 http。其他类型会被客户端拒收，不会执行
urlstring是接收事件的完整 HTTP 或 HTTPS 地址
timeoutnumber否超时时间，单位为秒，必须大于 0；默认 600，建议显式配置，例如 5
headersobject&lt;string, string>否自定义请求头，键和值均为字符串。显式配置 headers.Accept 会覆盖默认值。

同一事件命中多个 Hook 时，默认并行执行，相同 URL 会去重。不依赖数组顺序；需要按顺序处理时，在同一个服务端点内编排。
HTTP 调用约定
- 请求方法：POST，正文为当前事件的 JSON 对象。
- 请求头：默认包含 Content-Type: application/json 和 Accept: application/json，并附加配置中的 headers。
- 超时：超过 timeout 后结束该次调用，当前不自动重试。
- 推荐返回 HTTP 200 和 JSON 对象；不改变流程时返回 \{\}。
HTTP 状态码响应体客户端行为
2xx空不改变原流程
2xx合法 JSON 对象按当前事件支持的响应字段处理
2xx纯文本SessionStart、UserPromptSubmit 将文本作为上下文；PreToolUse 将其解释为允许，不建议使用
2xxJSON 语法错误或字段校验失败PreToolUse 拒绝本次工具调用；其他事件记录错误后继续
非 2xx任意记录调用错误，继续原流程
连接失败或超时—记录调用错误，继续原流程

Hook 输入和输出
请求体通用字段
每个事件都包含以下通用信息：
\{
 "event": "PreToolUse",
 "hook_event_name": "PreToolUse",
 "session_id": "session-xxxx",
 "transcript_path": "/path/to/transcript",
 "cwd": "/workspace"
\}
字段类型说明
eventstringHTTP 事件名，与 hook_event_name 一致
hook_event_namestring当前事件名称，可用于服务端分发
session_idstring当前会话 ID
transcript_pathstring客户端会话记录的本地路径
cwdstring客户端当前工作目录
permission_modestring，可能缺省当前权限模式
agent_idstring，可能缺省智能体 ID
agent_typestring，可能缺省智能体类型
modelstring，可能缺省模型标识，当前可在 SessionStart 中提供

响应体通用字段
- 纯文本：仅适用于 SessionStart、UserPromptSubmit作为补充上下文。
- JSON 对象：用于返回 decision、reason、hookSpecificOutput 等控制字段。
以下字段均可选，不需要改变流程时直接返回 \{\}。
\{
 "decision": "block",
 "reason": "企业策略要求阻断本次处理。"
\}
字段类型说明
continuebooleanfalse 请求停止当前执行；省略时不主动停止
stopReasonstring与 continue: false 配套的停止原因
decisionstring业务决定，阻断为block；具体含义见各事件
reasonstring业务决定的原因
hookSpecificOutputobject当前事件的专用响应字段

hookSpecificOutput 一旦出现，必须包含 hookEventName，并应填写当前事件名。顶层 decision 不接受 ask，工具确认应使用 permissionDecision。
continue: false 用于 UserPromptSubmit、PreToolUse、PostToolUse 和 Stop 的执行控制。SessionStart 用于补充上下文；Notification 不通过响应控制流程。不要用 async: true 表达企业 HTTP 回调的异步处理。
Hook 事件
以下请求示例展示事件名和专用字段；实际请求还包含上文列出的通用字段。各事件的 HTTP 调用失败行为统一按「HTTP 调用约定」处理。
SessionStart
会话开始或恢复时触发，用于提供业务背景、项目约束等上下文。
请求体：
\{
 "hook_event_name": "SessionStart",
 "source": "startup"
\}
字段类型说明
sourcestring会话来源：startup（新建）、resume（恢复）、clear（清空后开始）、compact（压缩后恢复）等

响应体：
\{
 "hookSpecificOutput": \{
 "hookEventName": "SessionStart",
 "additionalContext": "请在交付报告时注明数据来源和统计周期。"
 \}
\}
专用响应字段类型说明
additionalContextstring附加给模型的会话上下文

也可以直接返回纯文本作为上下文。没有附加内容时返回 \{\}；此事件不用于设置操作系统环境变量。
UserPromptSubmit
用户提交提示词后、模型处理前触发，用于检查输入或补充上下文。matcher 不筛选提示词内容。
请求体：
\{
 "hook_event_name": "UserPromptSubmit",
 "prompt": "请汇总本季度客户反馈。"
\}
字段类型说明
promptstring本次用户提示词

拒绝本次输入时返回：
\{
 "decision": "block",
 "reason": "请移除输入中的敏感凭据后重试。"
\}
补充上下文时返回：
\{
 "hookSpecificOutput": \{
 "hookEventName": "UserPromptSubmit",
 "additionalContext": "按产品线分类，使用本年度统一的反馈口径。"
 \}
\}
响应字段类型说明
decisionstringblock 阻断本次提示词进入模型；无决定时省略
reasonstring拒绝原因，界面不保证逐字展示
hookSpecificOutput.additionalContextstring附加给本次请求的上下文

没有附加行为时返回 \{\}。本事件也支持纯文本上下文；不要通过返回 prompt 替换用户输入。
PreToolUse
工具实际执行前触发，用于校验或修改参数，以及允许、拒绝或请求用户确认。matcher 匹配 tool_name（如 Bash、Write、Edit、Read、Glob、Grep，MCP 工具名如 mcp__server__tool）
请求体：
\{
 "hook_event_name": "PreToolUse",
 "tool_use_id": "tool-demo-001",
 "tool_name": "Bash",
 "tool_input": \{...\}
\}
字段类型说明
tool_use_idstring本次工具调用 ID
tool_namestring工具名称
tool_inputobject工具输入参数
mcp_contextobject，可选MCP 服务信息，包括 server_name、tool_name，以及可选的 url、command、args、cwd、tcp
original_request_namestring，可选工具名称解析或别名转换前的请求名

响应示例：将命令参数调整为只读检查，并请求用户确认。
\{
 "hookSpecificOutput": \{
 "hookEventName": "PreToolUse",
 "permissionDecision": "ask",
 "permissionDecisionReason": "请确认是否执行项目状态检查。",
 "updatedInput": \{
 "command": "git status --short"
 \},
 "additionalContext": "命令已调整为只读状态检查。"
 \}
\}
专用响应字段类型说明
permissionDecisionstringallow：明确允许；deny：拒绝；ask：请求确认
permissionDecisionReasonstring权限决定的原因
updatedInputobject完整替换工具参数，不是局部合并；替换后会重新校验参数
additionalContextstring附加给模型的说明

无权限决定时返回 \{\}，不要用 allow 代替「没有意见」。多个 Hook 的决定按 deny > ask > allow 聚合；允许仍受工具权限规则约束。
deny 只拒绝本次工具调用；需要停止当前执行时，使用 continue: false。
PostToolUse
工具成功执行后触发，用于检查结果、补充上下文或替换输出。matcher 匹配 tool_name。
请求体：
\{
 "hook_event_name": "PostToolUse",
 "tool_use_id": "tool-demo-001",
 "tool_name": "Bash",
 "tool_input": \{...\},
 "tool_response": \{
 \}
\}
工具相关字段与 PreToolUse 相同，另外包含：
字段类型说明
tool_responseobject工具执行结果，内部结构因工具而异；示例不代表固定返回结构

阻断工具结果：
\{
 "decision": "block",
 "reason": "工具输出包含不允许继续传递的内容。"
\}
补充或替换工具结果：
\{
 "hookSpecificOutput": \{
 "hookEventName": "PostToolUse",
 "updatedToolOutput": "xxxxxxx",
 "additionalContext": "请根据当前分支状态继续处理任务。"
 \}
\}
响应字段类型说明
decisionstring返回 decision: "block" 时，向后续处理提供 Hook 错误反馈；不保证屏蔽原始工具结果，也不会撤销已经执行的操作。
reasonstring阻断结果的原因
hookSpecificOutput.additionalContextstring附加给模型的说明
hookSpecificOutput.updatedToolOutputstring替换工具输出文本，支持所有工具
hookSpecificOutput.updatedMCPToolOutputstring仅用于 MCP 的兼容替换字段；优先使用 updatedToolOutput

替换字段应返回非空字符串；两种替换字段同时出现时，updatedToolOutput 优先。多个 Hook 不应同时修改同一份输入或输出。
本事件发生时工具已经执行，拒绝或替换结果都不会撤销文件修改、命令执行或外部调用。 要阻止操作发生，应使用 PreToolUse。
Stop
智能体准备结束当前轮次时触发，用于检查是否满足交付条件。返回 block 的含义是「暂不结束，继续工作」。
请求体：
\{
 "hook_event_name": "Stop",
 "stop_hook_active": false,
 "last_assistant_message": "季度报告已生成。"
\}
字段类型说明
stop_hook_activeboolean是否已经因 Stop Hook 的要求继续过；再次准备结束时为 true
last_assistant_messagestring，可选本轮累计的智能体文本输出

要求继续补充时返回：
\{
 "decision": "block",
 "reason": "请补充报告的数据来源和统计周期，再给出最终答复。"
\}
响应字段类型说明
decisionstringblock 阻止正常结束，并要求智能体继续；返回 \{\} 允许结束
reasonstring需要智能体继续完成的具体工作

continue: false 表示停止，不是要求继续。服务端应检查 stop_hook_active，设置终止条件。例如，已经要求继续过一次时返回 \{\}，避免反复触发。
Notification
出现权限确认、MCP 征询等通知时触发。matcher 匹配 notification_type，不是工具名。
请求体：
\{
 "hook_event_name": "Notification",
 "notification_type": "permission_prompt",
 "message": "Tool requires confirmation",
 "details": \{\}
\}
字段类型说明
notification_typestring通知类型，具体枚举值见下表
messagestring通知正文
detailsobject通知详情，结构随通知类型变化

notification_type通知类型：
值含义
permission_prompt请求权限确认
elicitation_dialogMCP 征询开始
elicitation_response收到 MCP 征询响应
elicitation_completeMCP 征询完成

接收成功后返回 \{\}。此事件的响应不会批准、拒绝或改变原操作；部分路径仍会等待 HTTP 返回，服务应快速响应。具体客户端不一定产生全部通知类型，也不保证每次任务完成都发送 idle_prompt。
