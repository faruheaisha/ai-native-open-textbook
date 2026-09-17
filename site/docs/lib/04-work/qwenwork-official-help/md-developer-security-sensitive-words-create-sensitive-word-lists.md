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
sourceRel: "md/developer-security-sensitive-words-create-sensitive-word-lists.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-security-sensitive-words-create-sensitive-word-lists.md"
sourceSha256: "15dad29088001541f0c80c6423e061c0638d5de43e80b520fcbf2695ae1546f7"
pageSha256: "15dad29088001541f0c80c6423e061c0638d5de43e80b520fcbf2695ae1546f7"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

创建敏感词库，提交名称、说明、词条列表和可选的启用状态。keywords 是词库内容，当前请求最多接受 1000 个词条。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>敏感词库管理（管理）</td> <td>sensitive-words</td> <td>admin.v1.sensitive-words.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
POST /api/openapi/v1/sensitive-word-libraries
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Idempotency-Key</td> <td>header</td> <td>string</td> <td>必填</td> <td>本次写操作的幂等键。同一操作重试时复用相同键和请求内容，避免重复处理。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>description</td> <td>body</td> <td>string</td> <td>否</td> <td>敏感词库的用途说明。 最多字符数：512。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>enabled</td> <td>body</td> <td>boolean</td> <td>否</td> <td>是否启用这项配置。</td> <td>false</td> </tr> <tr> <td>keywords</td> <td>body</td> <td>array \| null</td> <td>必填</td> <td>敏感词库中的词条列表。 最少项数：1。 最多项数：1000。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>name</td> <td>body</td> <td>string</td> <td>必填</td> <td>敏感词库的名称。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request POST \
  --url '<BASE_URL>/api/openapi/v1/sensitive-word-libraries' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Idempotency-Key: <UNIQUE_REQUEST_ID>' \
  --header 'Content-Type: application/json' \
  --data '{
  "description": "<string>",
  "enabled": false,
  "keywords": [
    "<string>"
  ],
  "name": "<string>"
}'
```

## 响应
### 201 创建成功，返回新建的记录。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>description</td> <td>string</td> <td>是</td> <td>敏感词库的用途说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>enabled</td> <td>boolean</td> <td>是</td> <td>是否启用这项配置。</td> <td>false</td> </tr> <tr> <td>id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>keywords</td> <td>array \| null</td> <td>是</td> <td>敏感词库中的词条列表。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>name</td> <td>string</td> <td>是</td> <td>敏感词库的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "created_at": "2026-08-27T10:00:00Z",
  "description": "<string>",
  "enabled": false,
  "id": "<string>",
  "keywords": [
    "<string>"
  ],
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
