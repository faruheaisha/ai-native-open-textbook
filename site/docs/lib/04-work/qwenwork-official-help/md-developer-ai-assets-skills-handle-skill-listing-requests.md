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
sourceRel: "md/developer-ai-assets-skills-handle-skill-listing-requests.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-ai-assets-skills-handle-skill-listing-requests.md"
sourceSha256: "3cc3ebc613993f06490c6179355e1a12c1bbbc3db39ac161d4d0f6b132d9c1fa"
pageSha256: "3cc3ebc613993f06490c6179355e1a12c1bbbc3db39ac161d4d0f6b132d9c1fa"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

通过或拒绝一条技能上架申请。通过时可指定或清除市场分类，拒绝时必须填写 reason；只处理属于技能队列的申请。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>技能上传审批执行（执行）</td> <td>skills-upload-reviews</td> <td>admin.v1.skills-upload-reviews.execute</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
POST /api/openapi/v1/skill-upload-reviews/{reviewId}/decision
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>reviewId</td> <td>path</td> <td>string · uuid</td> <td>必填</td> <td>需要操作的上架申请标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>Idempotency-Key</td> <td>header</td> <td>string</td> <td>必填</td> <td>本次写操作的幂等键。同一操作重试时复用相同键和请求内容，避免重复处理。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>category_id</td> <td>body</td> <td>string · uuid</td> <td>否</td> <td>资源所属分类的标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>clear_category</td> <td>body</td> <td>boolean</td> <td>否</td> <td>是否清除资源当前的分类归属。</td> <td>false</td> </tr> <tr> <td>decision</td> <td>body</td> <td>string</td> <td>必填</td> <td>资源上架审批决定：approve 为通过，reject 为拒绝。</td> <td>"approve"</td> </tr> <tr> <td>reason</td> <td>body</td> <td>string</td> <td>否</td> <td>拒绝上架时提供的原因。 最多字符数：2000。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request POST \
  --url '<BASE_URL>/api/openapi/v1/skill-upload-reviews/<reviewId>/decision' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Idempotency-Key: <UNIQUE_REQUEST_ID>' \
  --header 'Content-Type: application/json' \
  --data '{
  "category_id": "<uuid>",
  "clear_category": false,
  "decision": "approve",
  "reason": "<string>"
}'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>reject_reason</td> <td>string</td> <td>否</td> <td>审批被拒绝时记录的原因。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>resource_id</td> <td>string</td> <td>否</td> <td>审批关联的资源标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>resource_identity</td> <td>string</td> <td>是</td> <td>审批中用于识别提交资源的身份值。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>resource_type</td> <td>string</td> <td>是</td> <td>此次记录涉及的资源类型。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>reviewed_at</td> <td>string · date-time</td> <td>否</td> <td>完成审批的时间；尚未审批时为空。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>reviewer_email</td> <td>string</td> <td>否</td> <td>审批人的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>reviewer_id</td> <td>string</td> <td>否</td> <td>审批人的用户标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>reviewer_name</td> <td>string</td> <td>否</td> <td>审批人的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>snapshot</td> <td>any</td> <td>是</td> <td>提交审批时保存的资源信息快照。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>submitted_by</td> <td>string</td> <td>是</td> <td>提交人的用户标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>submitted_by_email</td> <td>string</td> <td>否</td> <td>提交人的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>submitted_by_name</td> <td>string</td> <td>否</td> <td>提交人的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "created_at": "2026-08-27T10:00:00Z",
  "id": "<string>",
  "reject_reason": "<string>",
  "resource_id": "<string>",
  "resource_identity": "<string>",
  "resource_type": "<string>",
  "reviewed_at": "2026-08-27T10:00:00Z",
  "reviewer_email": "<string>",
  "reviewer_id": "<string>",
  "reviewer_name": "<string>",
  "snapshot": "<string>",
  "status": "<string>",
  "submitted_by": "<string>",
  "submitted_by_email": "<string>",
  "submitted_by_name": "<string>",
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
