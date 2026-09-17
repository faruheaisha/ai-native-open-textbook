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
sourceRel: "md/developer-security-trusted-devices-list-forced-logout-tasks.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-security-trusted-devices-list-forced-logout-tasks.md"
sourceSha256: "278c95ef28fb0416bc10e756eb589573e59972e51b7a31bd99ecfaca9df5fbff"
pageSha256: "278c95ef28fb0416bc10e756eb589573e59972e51b7a31bd99ecfaca9df5fbff"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

查询强制下线任务，按关键词、状态和创建时间范围筛选。返回任务涉及的人员范围、计划或执行时间，以及用于修改或取消的版本号。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>强制下线任务读取（读取）</td> <td>force-logout-tasks</td> <td>admin.v1.force-logout-tasks.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/force-logout-tasks
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>keyword</td> <td>query</td> <td>string</td> <td>否</td> <td>用于筛选此列表的搜索关键词。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>status</td> <td>query</td> <td>string</td> <td>否</td> <td>只返回此状态的记录；不填写时不按状态筛选。</td> <td>"pending"</td> </tr> <tr> <td>created_from</td> <td>query</td> <td>string · date-time</td> <td>否</td> <td>任务创建时间范围的起点，使用带时区的 RFC 3339 时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>created_to</td> <td>query</td> <td>string · date-time</td> <td>否</td> <td>任务创建时间范围的终点，使用带时区的 RFC 3339 时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>page</td> <td>query</td> <td>integer · int64</td> <td>否</td> <td>请求的页码，从 1 开始。 默认值：1。 最小值：1。</td> <td>1</td> </tr> <tr> <td>page_size</td> <td>query</td> <td>integer · int64</td> <td>否</td> <td>每页返回的记录数量。 默认值：20。 最小值：1。 最大值：100。</td> <td>20</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request GET \
  --url '<BASE_URL>/api/openapi/v1/force-logout-tasks?keyword=<keyword>&status=<status>&created_from=<created_from>&created_to=<created_to>&page=1&page_size=20' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>items</td> <td>array\&lt;OpenapifacadeForceLogoutTaskResponse\&gt;</td> <td>是</td> <td>符合查询条件的当前页记录列表。</td> <td>\[\{"created_at":"2026-08-27T10:00:00Z","created_by":"\&lt;uuid\&gt;","created_by_email":"\&lt;string\&gt;","created_by_name":"\&lt;string\&gt;","executed_at":"2026-08-27T10:00:00Z","execution_mode":"immediate","expires_at":"2026-08-27T10:00:00Z","id":"\&lt;uuid\&gt;","prompt":"\&lt;string\&gt;","reason":"\&lt;string\&gt;","scheduled_at":"2026-08-27T10:00:00Z","scope_type":"all","status":"pending","subjects":\[\{"id":"\&lt;uuid\&gt;","name":"\&lt;string\&gt;","type":"department"\}\],"target_client":"pc","updated_at":"2026-08-27T10:00:00Z","updated_by":"\&lt;uuid\&gt;","updated_by_email":"\&lt;string\&gt;","updated_by_name":"\&lt;string\&gt;","version":0\}\]</td> </tr> <tr> <td>items\[\].created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].created_by</td> <td>string \\</td> <td>null · uuid</td> <td>否</td> <td>创建者的用户标识。 \| "\&lt;uuid\&gt;"</td> </tr> <tr> <td>items\[\].created_by_email</td> <td>string</td> <td>否</td> <td>创建者的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].created_by_name</td> <td>string</td> <td>否</td> <td>创建者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].executed_at</td> <td>string \\</td> <td>null · date-time</td> <td>是</td> <td>任务实际执行的时间。 \| "2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].execution_mode</td> <td>string</td> <td>是</td> <td>任务的执行方式：立即执行或定时执行。 可选值：immediate、scheduled。</td> <td>"immediate"</td> </tr> <tr> <td>items\[\].expires_at</td> <td>string \\</td> <td>null · date-time</td> <td>是</td> <td>任务的失效时间。 \| "2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].id</td> <td>string · uuid</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>items\[\].prompt</td> <td>string</td> <td>是</td> <td>任务向受影响用户提供的提示内容。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].reason</td> <td>string</td> <td>是</td> <td>执行本次操作的原因说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].scheduled_at</td> <td>string \\</td> <td>null · date-time</td> <td>是</td> <td>定时执行任务的计划时间。 \| "2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].scope_type</td> <td>string</td> <td>是</td> <td>人员范围：all 为所有用户，specified 为 subjects 指定的对象。</td> <td>"all"</td> </tr> <tr> <td>items\[\].status</td> <td>string</td> <td>是</td> <td>任务状态：pending 为待执行，executed 为已执行。</td> <td>"pending"</td> </tr> <tr> <td>items\[\].subjects</td> <td>array\&lt;OpenapifacadeScopeSubject\&gt;</td> <td>是</td> <td>策略或任务选择的范围对象列表。</td> <td>\[\{"id":"\&lt;uuid\&gt;","name":"\&lt;string\&gt;","type":"department"\}\]</td> </tr> <tr> <td>items\[\].subjects\[\].id</td> <td>string · uuid</td> <td>是</td> <td>所选人员范围对象的标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>items\[\].subjects\[\].name</td> <td>string</td> <td>是</td> <td>所选人员范围对象的显示名称。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].subjects\[\].type</td> <td>string</td> <td>是</td> <td>人员范围对象的类型。 可选值：department、user_group、user。</td> <td>"department"</td> </tr> <tr> <td>items\[\].target_client</td> <td>string</td> <td>是</td> <td>需要强制下线的客户端，当前只支持 pc（桌面客户端）。</td> <td>"pc"</td> </tr> <tr> <td>items\[\].updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].updated_by</td> <td>string \\</td> <td>null · uuid</td> <td>否</td> <td>最后修改者的用户标识。 \| "\&lt;uuid\&gt;"</td> </tr> <tr> <td>items\[\].updated_by_email</td> <td>string</td> <td>否</td> <td>最后修改者的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].updated_by_name</td> <td>string</td> <td>否</td> <td>最后修改者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].version</td> <td>integer · int64</td> <td>是</td> <td>当前记录的版本号，修改或取消时提交最新读取的值以校验并发变更。</td> <td>0</td> </tr> <tr> <td>page</td> <td>integer · int64</td> <td>是</td> <td>当前结果页的页码，从 1 开始。</td> <td>0</td> </tr> <tr> <td>page_size</td> <td>integer · int64</td> <td>是</td> <td>每页返回的记录数。</td> <td>0</td> </tr> <tr> <td>total</td> <td>integer · int64</td> <td>是</td> <td>符合查询条件的记录总数。</td> <td>0</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "items": [
    {
      "created_at": "2026-08-27T10:00:00Z",
      "created_by": "<uuid>",
      "created_by_email": "<string>",
      "created_by_name": "<string>",
      "executed_at": "2026-08-27T10:00:00Z",
      "execution_mode": "immediate",
      "expires_at": "2026-08-27T10:00:00Z",
      "id": "<uuid>",
      "prompt": "<string>",
      "reason": "<string>",
      "scheduled_at": "2026-08-27T10:00:00Z",
      "scope_type": "all",
      "status": "pending",
      "subjects": [
        {
          "id": "<uuid>",
          "name": "<string>",
          "type": "department"
        }
      ],
      "target_client": "pc",
      "updated_at": "2026-08-27T10:00:00Z",
      "updated_by": "<uuid>",
      "updated_by_email": "<string>",
      "updated_by_name": "<string>",
      "version": 0
    }
  ],
  "page": 0,
  "page_size": 0,
  "total": 0
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
