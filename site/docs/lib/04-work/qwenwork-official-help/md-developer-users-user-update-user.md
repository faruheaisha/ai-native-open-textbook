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
sourceRel: "md/developer-users-user-update-user.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-users-user-update-user.md"
sourceSha256: "7e035ae59b5a26fc530c0749f0272b9f14b974edacd89180e12b388fd28e8a3e"
pageSha256: "7e035ae59b5a26fc530c0749f0272b9f14b974edacd89180e12b388fd28e8a3e"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

修改指定用户的姓名、联系方式、工号、账号或部门归属。只更新传入的字段，至少提供一项；部门列表整体替换，空列表归入根部门。此接口的请求字段不包含账号状态和席位状态。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>用户与部门管理（管理）</td> <td>user-directory</td> <td>admin.v1.user-directory.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
PATCH /api/openapi/v1/users/{userId}
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>userId</td> <td>path</td> <td>string · uuid</td> <td>必填</td> <td>用户列表返回的 qid，指定要修改或删除的用户。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>Idempotency-Key</td> <td>header</td> <td>string</td> <td>否</td> <td>本次写操作的幂等键。同一操作重试时复用相同键和请求内容，避免重复处理。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>account</td> <td>body</td> <td>string</td> <td>否</td> <td>用户的登录账号。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>department_ids</td> <td>body</td> <td>array \| null</td> <td>否</td> <td>用户所属部门的标识列表。 最多项数：50。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>email</td> <td>body</td> <td>string</td> <td>否</td> <td>用户的邮箱地址。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>job_number</td> <td>body</td> <td>string</td> <td>否</td> <td>企业为用户分配的工号。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name</td> <td>body</td> <td>string</td> <td>否</td> <td>用户的姓名。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>phone</td> <td>body</td> <td>string</td> <td>否</td> <td>用户的电话号码。 最多字符数：20。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request PATCH \
  --url '<BASE_URL>/api/openapi/v1/users/<userId>' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Idempotency-Key: <UNIQUE_REQUEST_ID>' \
  --header 'Content-Type: application/json' \
  --data '{
  "account": "<string>",
  "department_ids": [
    "<string>"
  ],
  "email": "<string>",
  "job_number": "<string>",
  "name": "<string>",
  "phone": "<string>"
}'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>account</td> <td>string</td> <td>否</td> <td>用户的登录账号。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>department_ids</td> <td>array \| null</td> <td>是</td> <td>用户所属部门的标识列表。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>email</td> <td>string</td> <td>否</td> <td>用户的邮箱地址。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>job_number</td> <td>string</td> <td>否</td> <td>企业为用户分配的工号。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name</td> <td>string</td> <td>是</td> <td>用户的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>phone</td> <td>string</td> <td>否</td> <td>用户的电话号码。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>qid</td> <td>string · uuid</td> <td>是</td> <td>用户在千问办公中的唯一标识，用户更新和删除接口使用此值。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>seat_status</td> <td>string</td> <td>是</td> <td>用户的席位状态：assigned 为已分配，unassigned 为未分配。</td> <td>"assigned"</td> </tr> <tr> <td>source</td> <td>string</td> <td>是</td> <td>用户来源：manual 为手动管理，directory-sync 为通讯录同步。</td> <td>"manual"</td> </tr> <tr> <td>status</td> <td>string</td> <td>是</td> <td>账号状态：pending 为待激活，active 为已激活，disabled 为已禁用。</td> <td>"pending"</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "account": "<string>",
  "department_ids": [
    "<string>"
  ],
  "email": "<string>",
  "job_number": "<string>",
  "name": "<string>",
  "phone": "<string>",
  "qid": "<uuid>",
  "seat_status": "assigned",
  "source": "manual",
  "status": "pending",
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
