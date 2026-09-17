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
sourceRel: "md/developer-security-hooks-rules-update-hooks-rules.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-security-hooks-rules-update-hooks-rules.md"
sourceSha256: "04cd76478154c5e1eab7d55f4da9eee2e13bedf7d9e7a2a4c46fb2a68f5d41e0"
pageSha256: "04cd76478154c5e1eab7d55f4da9eee2e13bedf7d9e7a2a4c46fb2a68f5d41e0"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

完整替换指定 Hook 的名称、说明、触发事件、配置数组和启用状态。即使只调整启用状态，也需按此接口的请求模型提交完整配置。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>Hooks 规则管理（管理）</td> <td>hooks</td> <td>admin.v1.hooks.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
PATCH /api/openapi/v1/hook-policies/{policyId}
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>policyId</td> <td>path</td> <td>string · uuid</td> <td>必填</td> <td>需要操作的策略标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>config</td> <td>body</td> <td>any</td> <td>必填</td> <td>该事件的 Hook 配置，必须是 JSON 数组。服务端保存数组原文，只校验 JSON 语法和顶层数组结构，不校验数组内的脚本或命令能否执行。</td> <td>\[\]</td> </tr> <tr> <td>description</td> <td>body</td> <td>string</td> <td>必填</td> <td>Hook 配置的用途说明。 最多字符数：500。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>enabled</td> <td>body</td> <td>boolean \| null</td> <td>必填</td> <td>是否启用这项配置。</td> <td>false</td> </tr> <tr> <td>event_name</td> <td>body</td> <td>string</td> <td>必填</td> <td>触发事件：SessionStart（会话开始）、UserPromptSubmit（提交用户输入）、PreToolUse（工具调用前）、PostToolUse（工具调用后）、Stop（停止）或 Notification（通知）。</td> <td>"SessionStart"</td> </tr> <tr> <td>name</td> <td>body</td> <td>string</td> <td>必填</td> <td>Hook 配置的名称。 最多字符数：80。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request PATCH \
  --url '<BASE_URL>/api/openapi/v1/hook-policies/<policyId>' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "config": [],
  "description": "<string>",
  "enabled": false,
  "event_name": "SessionStart",
  "name": "<string>"
}'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>config</td> <td>any</td> <td>是</td> <td>该事件的 Hook 配置，必须是 JSON 数组。服务端保存数组原文，只校验 JSON 语法和顶层数组结构，不校验数组内的脚本或命令能否执行。</td> <td>\[\]</td> </tr> <tr> <td>created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>description</td> <td>string</td> <td>是</td> <td>Hook 配置的用途说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>enabled</td> <td>boolean</td> <td>是</td> <td>是否启用这项配置。</td> <td>false</td> </tr> <tr> <td>event_name</td> <td>string</td> <td>是</td> <td>触发事件：SessionStart（会话开始）、UserPromptSubmit（提交用户输入）、PreToolUse（工具调用前）、PostToolUse（工具调用后）、Stop（停止）或 Notification（通知）。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name</td> <td>string</td> <td>是</td> <td>Hook 配置的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "config": [],
  "created_at": "2026-08-27T10:00:00Z",
  "description": "<string>",
  "enabled": false,
  "event_name": "<string>",
  "id": "<string>",
  "name": "<string>",
  "updated_at": "2026-08-27T10:00:00Z"
}
```

### default 请求失败，返回错误码和错误详情。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>code</td> <td>string</td> <td>否</td> <td>用于程序判断错误原因的稳定业务错误码。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>detail</td> <td>string</td> <td>是</td> <td>便于阅读的错误说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>details</td> <td>OpenapiErrorDetails</td> <td>否</td> <td>字段校验失败时的详细信息。</td> <td>\{"field":"\&lt;string\&gt;","reason":"\&lt;string\&gt;","suggestion":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>details.field</td> <td>string</td> <td>否</td> <td>未通过校验的请求字段。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>details.reason</td> <td>string</td> <td>否</td> <td>稳定的校验失败原因，用于判断字段为何不合法。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>details.suggestion</td> <td>string</td> <td>否</td> <td>建议采用的规范化字段值。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>error</td> <td>string</td> <td>是</td> <td>稳定的 HTTP 错误类型。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "code": "<string>",
  "detail": "<string>",
  "details": {
    "field": "<string>",
    "reason": "<string>",
    "suggestion": "<string>"
  },
  "error": "<string>"
}
```
