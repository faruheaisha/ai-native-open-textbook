---
title: "千问办公官方帮助中心（阿里云）"
sourceId: "04-work/qwenwork-official-help"
sourceTitle: "千问办公官方帮助中心（阿里云）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "md/enterprise-ultimate-security-hooks-rules.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-security-hooks-rules.md"
sourceSha256: "d9a855f317000cb4d9baf6623e3c1d1026939b6985113d3ea4a7e34108777878"
pageSha256: "d9a855f317000cb4d9baf6623e3c1d1026939b6985113d3ea4a7e34108777878"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

HTTP Hook 是任务执行过程中的回调：千问办公在指定事件发生时，向企业提供的 HTTP 地址发送 JSON 请求，企业服务返回处理结果。您可以用它记录审计信息、补充上下文，或在工具执行前阻止不符合要求的操作。

接入分为两部分：先编写并运行处理请求的服务，再在管理后台配置事件和服务地址。本页提供可运行示例，以及每个事件的请求与响应要点。

## 选择合适的触发事件
<table> <thead> <tr> <td>事件</td> <td>何时调用</td> <td>常见用途与限制</td> </tr> </thead> <tbody> <tr> <td>SessionStart</td> <td>会话启动、恢复、清空或压缩后</td> <td>注入企业工作说明；不建议用于阻断登录或会话初始化</td> </tr> <tr> <td>UserPromptSubmit</td> <td>用户提交消息后、任务开始处理前</td> <td>检查本次输入，拒绝不符合业务要求的请求</td> </tr> <tr> <td>PreToolUse</td> <td>工具执行前</td> <td>审批或校验工具参数；需要阻止操作时优先使用此事件</td> </tr> <tr> <td>PostToolUse</td> <td>工具执行后</td> <td>记录结果、检查输出或补充上下文；不能撤销已完成的操作</td> </tr> <tr> <td>Stop</td> <td>任务准备结束时</td> <td>检查交付是否满足要求；阻止结束会让任务继续，必须防止循环</td> </tr> <tr> <td>Notification</td> <td>产生通知时</td> <td>转发消息或记录通知</td> </tr> </tbody> </table>

例如，要求"写入企业系统前检查工单编号"，应在 PreToolUse 检查参数。只在 PostToolUse 返回拒绝，无法阻止已经发生的写入。

## 接入前准备
准备一个可接收 HTTP POST 的服务地址，并确认**实际运行千问办公客户端的设备**能访问该地址。企业部署宜使用 HTTPS；HTTP 可用于受控联调环境。

服务需要接收 JSON，并在正常处理时返回 2xx 状态码和合法 JSON 对象。业务拒绝也通过成功的 HTTP 响应表达，例如返回 \{"decision":"block","reason":"缺少工单编号"\}；500 表示服务异常，不能代替明确的业务判断。  
**警告**

127.0.0.1 指每一台客户端设备自身。只在管理员电脑启动服务，其他成员无法通过这个地址连接。面向企业成员使用前，应部署为各客户端可访问的地址。

## 在管理后台配置策略组
1. 进入 组织与安全 → 安全管控 → Hooks 规则，点击【新增策略组】。
2. 填写策略组名称和策略说明，例如「工具执行前业务检查」。
3. 在「触发时机」选择 PreToolUse（工具执行前）。
4. 在「JSON 配置」粘贴下一节的 Hook 组数组，替换服务地址与鉴权信息。
5. 检查「保存后启用」。准备联调时可先关闭，服务验证完成后再开启。
6. 点击【保存策略组】，回到列表核对触发事件、URL 和启用状态。

每个策略组选择一个触发事件；配置多个事件时分别建立策略组。已启用的策略组默认适用于所有用户，发布前应确认服务容量与可达性。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-8c329dffb0ca269a.png)

*每个策略组对应一个事件；按名称、事件或 URL 搜索可以定位需要修改的配置。*

## JSON 配置
后台编辑器填写**当前事件的 Hook 组数组**。以下内容可用于 PreToolUse，数组最外层是 \[ 和 \]：

```
HELPCODEESCAPE-json
[
  {
    "matcher": ".*",
    "hooks": [
      {
        "type": "http",
        "url": "https://hooks.example.com/agent/hooks",
        "timeout": 5,
        "headers": {
          "Authorization": "Bearer ${QWENWORK_HOOK_TOKEN}"
        }
      }
    ]
  }
]
```

<table> <thead> <tr> <td>配置字段</td> <td>填写方法</td> </tr> </thead> <tbody> <tr> <td>type</td> <td>HTTP 回调固定填写 http</td> </tr> <tr> <td>url</td> <td>实际接收 POST 请求的完整地址，包含路径</td> </tr> <tr> <td>timeout</td> <td>超时时间，单位为秒，填写正数；应大于正常处理耗时</td> </tr> <tr> <td>headers</td> <td>服务要求的请求头，可设置 Authorization 等鉴权信息</td> </tr> <tr> <td>matcher</td> <td>工具事件的工具名称正则表达式，不是命令内容或文件路径</td> </tr> </tbody> </table>

联调时可使用 .\* 接收所有工具名，记录 tool_name 后再收窄匹配范围。例如实际工具名称确实为 Bash、Edit、Write 时，可以使用 \^(?:Bash\|Edit\|Write)$。不要根据界面上的中文动作名称猜测工具名。

对于 SessionStart、UserPromptSubmit、Stop 和 Notification，通常省略 matcher，在服务中检查相应事件字段。PreToolUse 和 PostToolUse 则可按工具名设置匹配条件。

${QWENWORK_HOOK_TOKEN\} 表示从运行环境展开变量。配置时请检查：

* **启动客户端的进程**能够取得该变量。在终端执行 export，不一定会影响从桌面打开的应用。
* 服务返回 401 时，核对实际请求头与客户端进程环境。
* 排障日志中不记录密钥原文。

### 完整配置对象与后台数组的区别

完整 HTTP Hooks 配置以 hooks 为根键，下方按事件分组。它适合查看各事件的整体结构；在后台选择某个事件后，只粘贴该事件对应的数组。

```
HELPCODEESCAPE-json
{
  "hooks": {
    "SessionStart": [
      {"hooks": [{"type": "http", "url": "https://hooks.example.com/agent/hooks", "timeout": 5}]}
    ],
    "UserPromptSubmit": [
      {"hooks": [{"type": "http", "url": "https://hooks.example.com/agent/hooks", "timeout": 5}]}
    ],
    "PreToolUse": [
      {"matcher": ".*", "hooks": [{"type": "http", "url": "https://hooks.example.com/agent/hooks", "timeout": 5}]}
    ],
    "PostToolUse": [
      {"matcher": ".*", "hooks": [{"type": "http", "url": "https://hooks.example.com/agent/hooks", "timeout": 5}]}
    ],
    "Stop": [
      {"hooks": [{"type": "http", "url": "https://hooks.example.com/agent/hooks", "timeout": 5}]}
    ],
    "Notification": [
      {"hooks": [{"type": "http", "url": "https://hooks.example.com/agent/hooks", "timeout": 5}]}
    ]
  }
}
```

上例省略鉴权头以便看清事件结构；正式接入时，为每个 HTTP 配置加入服务所需鉴权信息。后台中的「JSON 配置」不能直接粘贴整个对象。

## 编写 HTTP Hook 服务
### 接收请求

客户端发送 Content-Type: application/json 的 POST 请求。用 hook_event_name 判断事件类型，不要改成 event。
<table> <thead> <tr> <td>公共字段</td> <td>含义</td> </tr> </thead> <tbody> <tr> <td>hook_event_name</td> <td>本次触发的事件名</td> </tr> <tr> <td>session_id</td> <td>会话标识，可用于关联审计记录</td> </tr> <tr> <td>transcript_path</td> <td>客户端本地会话记录路径，远程服务不能直接读取这个路径</td> </tr> <tr> <td>cwd</td> <td>客户端当前工作目录，也不是服务自身的目录</td> </tr> <tr> <td>model</td> <td>当前模型信息，按实际请求处理</td> </tr> <tr> <td>permission_mode</td> <td>权限模式，可能不出现</td> </tr> </tbody> </table>

接收程序应容忍新增字段，并对可选字段设置默认值。下列请求示例用于说明请求结构，实际工具名与参数以客户端发出的内容为准：

```
HELPCODEESCAPE-json
{
  "hook_event_name": "PreToolUse",
  "session_id": "session-example-001",
  "transcript_path": "/Users/example/task/transcript.jsonl",
  "cwd": "/Users/example/task",
  "tool_name": "Bash",
  "tool_input": {"command": "npm test"},
  "tool_use_id": "tool-example-001"
}
```

### 一个可运行的 Node.js 示例

把下面内容保存为 hook-server.mjs，使用支持 ES 模块的 Node.js 运行。示例只做三件事：验证请求头、记录事件标识、根据联调标记返回拒绝。**联调标记用于测试响应是否生效，不能作为生产环境的命令安全检查。**

```
HELPCODEESCAPE-text
import http from 'node:http';
import { timingSafeEqual } from 'node:crypto';

const token = process.env.QWENWORK_HOOK_TOKEN;
if (!token) throw new Error('请设置 QWENWORK_HOOK_TOKEN');
const expected = Buffer.from(`Bearer ${token}`);
const maxBytes = 1024 * 1024;

function authorized(value = '') {
  const actual = Buffer.from(value);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}
function decide(body) {
  switch (body.hook_event_name) {
    case 'SessionStart':
      return { hookSpecificOutput: {
        hookEventName: 'SessionStart',
        additionalContext: '涉及企业工单时，请在交付说明中列出工单编号。'
      } };
    case 'UserPromptSubmit':
      if (String(body.prompt ?? '').includes('QW_HOOK_BLOCK_TEST')) {
        return { decision: 'block', reason: '已命中输入联调标记。' };
      }
      return {};
    case 'PreToolUse':
      if (String(body.tool_input?.command ?? '').includes('QW_HOOK_BLOCK_TEST')) {
        return { decision: 'block', reason: '已命中工具调用联调标记。' };
      }
      return {};
    case 'PostToolUse':
      // 如需保存执行结果，在这里写入企业审计系统。
      return {};
    case 'Stop':
      if (body.stop_hook_active) return {};
      // 只在确实需要补充工作时返回 decision: 'block'。
      return {};
    case 'Notification':
      // 在此按企业需求记录或转发通知。
      return {};
    default:
      return {};
  }
}

const server = http.createServer(async (req, res) => {
  if (req.url !== '/agent/hooks') return send(res, 404, { error: 'not_found' });
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' });
  if (!authorized(req.headers.authorization)) return send(res, 401, { error: 'unauthorized' });
  try {
    let size = 0;
    const chunks = [];
    for await (const chunk of req) {
      size += chunk.length;
      if (size > maxBytes) return send(res, 413, { error: 'payload_too_large' });
      chunks.push(chunk);
    }
    let body;
    try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
    catch { return send(res, 400, { error: 'invalid_json' }); }
    if (!body || Array.isArray(body) || typeof body !== 'object') {
      return send(res, 400, { error: 'object_required' });
    }
    if (typeof body.hook_event_name !== 'string') {
      return send(res, 400, { error: 'event_required' });
    }
    console.log(JSON.stringify({
      event: body.hook_event_name,
      session: body.session_id,
      tool: body.tool_name
    }));
    return send(res, 200, decide(body));
  } catch {
    if (!res.writableEnded) send(res, 500, { error: 'internal_error' });
  }
});
server.requestTimeout = 10000;
server.listen(8787, '127.0.0.1', () => console.log('Hook 服务已启动：8787'));
```

在本机联调终端启动：

```
HELPCODEESCAPE-text
export QWENWORK_HOOK_TOKEN='replace-with-a-long-random-test-token'
node hook-server.mjs
```

示例监听本机地址。企业部署时由运维提供可达的 HTTPS 入口、密钥管理和监控；处理超时、不可达或异常响应时的客户端行为，应在实际环境中专门测试。

### 用 curl 检查服务

在另一个终端设置同样的测试变量，再发送工具执行前事件：

```
HELPCODEESCAPE-text
export QWENWORK_HOOK_TOKEN='replace-with-a-long-random-test-token'
curl -i http://127.0.0.1:8787/agent/hooks \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer ${QWENWORK_HOOK_TOKEN}" \
  --data '{"hook_event_name":"PreToolUse","session_id":"hook-test","tool_name":"Bash","tool_input":{"command":"QW_HOOK_BLOCK_TEST"}}'
```

依次验证以下三种结果：
<table> <thead> <tr> <td>测试请求</td> <td>预期结果</td> </tr> </thead> <tbody> <tr> <td>使用上述联调标记</td> <td>HTTP 200，返回 decision: block</td> </tr> <tr> <td>将 command 改为 npm test</td> <td>返回 \{\}</td> </tr> <tr> <td>去掉鉴权头</td> <td>返回 HTTP 401</td> </tr> </tbody> </table>

以上仅验证接收服务。还需在客户端触发实际事件，才能确认后台配置、网络和响应处理完整可用。

## 各事件的处理方式
### 事件请求与响应示例

#### SessionStart：补充会话上下文

请求的 source 标明触发原因，可为 startup、resume、clear 或 compact。如果需要注入企业约定，返回：

```
HELPCODEESCAPE-json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "涉及客户数据时，先确认本次处理的授权范围。"
  }
}
```

会话恢复或压缩也可能触发该事件。注入内容应简短、可重复读取，不要每次追加大段相同资料。

#### UserPromptSubmit：检查用户输入

请求中用 prompt 读取本次输入。符合规则时返回 \{\}，需要拒绝本次输入时返回：

```
HELPCODEESCAPE-json
{"decision":"block","reason":"请补充本次处理对应的工单编号。"}
```

reason 是处理原因，不能保证逐字显示给成员。若流程必须通知申请人，应在业务系统中提供明确的通知或查询方式。

#### PreToolUse：在执行前检查或修正参数

检查 tool_name、tool_input 和 tool_use_id。业务不允许本次调用时使用 decision: block；放行时通常返回 \{\}。

确需明确允许并修正输入时，使用该事件专用输出：

```
HELPCODEESCAPE-json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "使用企业规定的测试参数。",
    "updatedInput": {"command": "npm test -- --runInBand"}
  }
}
```

updatedInput 必须符合被调用工具的参数结构，不能把所有工具都按 command 字段处理。先从真实请求确认结构，再编写修改逻辑。

#### PostToolUse：记录已执行结果

除了工具名与输入，请求还包含 tool_response。该字段可能是字符串、数组或对象，处理程序不能假定它总是文本。可以记录结果摘要，或通过 hookSpecificOutput.additionalContext 补充后续处理所需信息，并将 hookEventName 设置为 PostToolUse。  
**警告**

PostToolUse 触发时，工具操作已经发生。需要阻止写入、发送或删除时，应在 PreToolUse 检查。

#### Stop：检查是否可以结束任务

请求包含 last_assistant_message 和 stop_hook_active。在 Stop 中返回 decision: block 表示**阻止本次结束，让任务继续**，不是终止任务。

```
HELPCODEESCAPE-text
if (body.stop_hook_active) return {};
if (needsMoreWork(body.last_assistant_message)) {
  return { decision: 'block', reason: '请补充未完成事项后再结束。' };
}
return {};
```

needsMoreWork 由企业实现。必须先检查 stop_hook_active，避免任务因结束检查反复继续。如果没有明确且可满足的交付条件，应先只记录结果，不阻止结束。

#### Notification：转发任务通知

按 notification_type 区分通知，读取 title、message 及可能出现的 details。服务端可按会话和通知类型聚合展示；是否合并通知，由企业自己的通知处理逻辑决定。完成后返回 \{\}。

## 响应格式速查
<table> <thead> <tr> <td>响应</td> <td>用途</td> </tr> </thead> <tbody> <tr> <td>\{\}</td> <td>正常完成，不附加指令</td> </tr> <tr> <td>decision: block 与 reason</td> <td>按事件语义拒绝输入、阻止工具，或在 Stop 中阻止结束</td> </tr> <tr> <td>hookSpecificOutput.additionalContext</td> <td>为对应事件追加上下文，hookEventName 要与本次事件一致</td> </tr> <tr> <td>permissionDecision 与 updatedInput</td> <td>PreToolUse 专用的权限判断及参数修改</td> </tr> <tr> <td>continue: false 与 stopReason</td> <td>更强的终止控制；仅在明确需要停止时使用，与 Stop 的 block 含义不同</td> </tr> </tbody> </table>

不要依赖 reason 或 stopReason 一定作为成员界面提示展示。也不要在返回体中写入密钥、个人敏感信息或整个审计记录。

## 联调、启用与排查
1. 用 curl 验证正常请求、业务拒绝、鉴权失败和非法 JSON。
2. 从实际客户端设备测试服务地址可达，并确认鉴权变量能够被客户端进程读取。
3. 在后台为一个事件保存配置并启用，触发对应动作，在服务日志中核对事件与会话标识。
4. 验证应允许与应拒绝的情况；测试 Stop 时确认任务可以正常结束，测试 PostToolUse 时不要把已执行动作误认为可回滚。
5. 再测试超时、服务不可达与异常响应，确认企业能接受实际客户端处理结果后，投入日常使用。

<table> <thead> <tr> <td>现象</td> <td>优先检查</td> </tr> </thead> <tbody> <tr> <td>服务完全收不到请求</td> <td>策略是否启用、事件是否触发、工具名是否匹配、客户端是否能访问 URL</td> </tr> <tr> <td>返回 401</td> <td>请求头名称、Bearer 前缀、客户端进程环境变量与服务密钥是否一致</td> </tr> <tr> <td>请求成功但未出现预期行为</td> <td>事件名、输出结构和当前事件是否支持该响应</td> </tr> <tr> <td>工具已经执行后才收到拒绝</td> <td>是否误用了 PostToolUse；改在执行前检查</td> </tr> <tr> <td>任务一直无法结束</td> <td>Stop 是否重复返回 block，是否处理 stop_hook_active</td> </tr> <tr> <td>只在管理员电脑正常</td> <td>是否填写 localhost，其他成员设备是否能访问服务</td> </tr> </tbody> </table>

需要暂停时，在 Hooks 列表关闭对应策略组。更新 URL、密钥或判断逻辑后，重新执行该事件的允许与拒绝测试，再启用。
