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
sourceRel: "md/developer-ai-assets-skills-list-skill-listing-requests.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-ai-assets-skills-list-skill-listing-requests.md"
sourceSha256: "3904d17e15482124f048c06a38b6e2cb64c9b32dfdf8bf84a9ef5c112cf375d4"
pageSha256: "3904d17e15482124f048c06a38b6e2cb64c9b32dfdf8bf84a9ef5c112cf375d4"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

查询成员提交的技能上架申请，查看提交时的资源快照、审批状态及提交人信息。取得 reviewId 后可调用对应的审批接口。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>技能上传审批读取（读取）</td> <td>skills-upload-reviews</td> <td>admin.v1.skills-upload-reviews.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/skill-upload-reviews
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>page</td> <td>query</td> <td>integer · int64</td> <td>否</td> <td>请求的页码，从 1 开始。 默认值：1。 最小值：1。</td> <td>1</td> </tr> <tr> <td>page_size</td> <td>query</td> <td>integer · int64</td> <td>否</td> <td>每页返回的记录数量。 默认值：20。 最小值：1。 最大值：100。</td> <td>20</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request GET \
  --url '<BASE_URL>/api/openapi/v1/skill-upload-reviews?page=1&page_size=20' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>items</td> <td>array \| null</td> <td>是</td> <td>符合查询条件的当前页记录列表。</td> <td>\[\{"created_at":"2026-08-27T10:00:00Z","id":"\&lt;string\&gt;","reject_reason":"\&lt;string\&gt;","resource_id":"\&lt;string\&gt;","resource_identity":"\&lt;string\&gt;","resource_type":"\&lt;string\&gt;","reviewed_at":"2026-08-27T10:00:00Z","reviewer_email":"\&lt;string\&gt;","reviewer_id":"\&lt;string\&gt;","reviewer_name":"\&lt;string\&gt;","snapshot":"\&lt;string\&gt;","status":"\&lt;string\&gt;","submitted_by":"\&lt;string\&gt;","submitted_by_email":"\&lt;string\&gt;","submitted_by_name":"\&lt;string\&gt;","updated_at":"2026-08-27T10:00:00Z"\}\]</td> </tr> <tr> <td>items\[\].created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].reject_reason</td> <td>string</td> <td>否</td> <td>审批被拒绝时记录的原因。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].resource_id</td> <td>string</td> <td>否</td> <td>审批关联的资源标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].resource_identity</td> <td>string</td> <td>是</td> <td>审批中用于识别提交资源的身份值。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].resource_type</td> <td>string</td> <td>是</td> <td>此次记录涉及的资源类型。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].reviewed_at</td> <td>string · date-time</td> <td>否</td> <td>完成审批的时间；尚未审批时为空。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].reviewer_email</td> <td>string</td> <td>否</td> <td>审批人的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].reviewer_id</td> <td>string</td> <td>否</td> <td>审批人的用户标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].reviewer_name</td> <td>string</td> <td>否</td> <td>审批人的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].snapshot</td> <td>any</td> <td>是</td> <td>提交审批时保存的资源信息快照。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].submitted_by</td> <td>string</td> <td>是</td> <td>提交人的用户标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].submitted_by_email</td> <td>string</td> <td>否</td> <td>提交人的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].submitted_by_name</td> <td>string</td> <td>否</td> <td>提交人的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>next_cursor</td> <td>string</td> <td>否</td> <td>继续读取下一批结果时使用的游标；没有后续结果时为空。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>total_rows</td> <td>integer · int64</td> <td>是</td> <td>符合查询条件的记录总数。</td> <td>0</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "items": [
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
  ],
  "next_cursor": "<string>",
  "total_rows": 0
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
