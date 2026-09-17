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
sourceRel: "md/developer-organization-admin-roles-list-admin-roles.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-organization-admin-roles-list-admin-roles.md"
sourceSha256: "02ed9ef6531462b238001d1953782569f99d22562b51673e8cda268d1e10d54f"
pageSha256: "02ed9ef6531462b238001d1953782569f99d22562b51673e8cda268d1e10d54f"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

查询管理员角色，返回角色名称、系统角色标记及成员数量。可用角色标识定位需要调整权限或成员的角色。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>管理员角色读取（读取）</td> <td>admin-roles</td> <td>admin.v1.admin-roles.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/admin-roles
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>keyword</td> <td>query</td> <td>string</td> <td>否</td> <td>用于筛选此列表的搜索关键词。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>page</td> <td>query</td> <td>integer · int64</td> <td>否</td> <td>请求的页码，从 1 开始。 默认值：1。 最小值：1。</td> <td>1</td> </tr> <tr> <td>page_size</td> <td>query</td> <td>integer · int64</td> <td>否</td> <td>每页返回的记录数量。 默认值：20。 最小值：1。 最大值：100。</td> <td>20</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request GET \
  --url '<BASE_URL>/api/openapi/v1/admin-roles?keyword=<keyword>&page=1&page_size=20' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>items</td> <td>array \| null</td> <td>是</td> <td>符合查询条件的当前页记录列表。</td> <td>\[\{"created_at":"2026-08-27T10:00:00Z","description":"\&lt;string\&gt;","id":"\&lt;string\&gt;","member_count":0,"name":"\&lt;string\&gt;","permission_count":0,"system":false,"updated_at":"2026-08-27T10:00:00Z"\}\]</td> </tr> <tr> <td>items\[\].created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].description</td> <td>string</td> <td>是</td> <td>管理员角色的用途说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].member_count</td> <td>integer · int64</td> <td>是</td> <td>此角色中的管理员数量。</td> <td>0</td> </tr> <tr> <td>items\[\].name</td> <td>string</td> <td>是</td> <td>管理员角色的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].permission_count</td> <td>integer · int64</td> <td>是</td> <td>此角色授予的权限数量。</td> <td>0</td> </tr> <tr> <td>items\[\].system</td> <td>boolean</td> <td>是</td> <td>是否为系统内置角色。</td> <td>false</td> </tr> <tr> <td>items\[\].updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>page</td> <td>integer · int64</td> <td>是</td> <td>当前结果页的页码，从 1 开始。</td> <td>0</td> </tr> <tr> <td>page_size</td> <td>integer · int64</td> <td>是</td> <td>每页返回的记录数。</td> <td>0</td> </tr> <tr> <td>total_items</td> <td>integer · int64</td> <td>是</td> <td>符合查询条件的记录总数。</td> <td>0</td> </tr> <tr> <td>total_pages</td> <td>integer · int64</td> <td>是</td> <td>按当前每页数量计算的总页数。</td> <td>0</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "items": [
    {
      "created_at": "2026-08-27T10:00:00Z",
      "description": "<string>",
      "id": "<string>",
      "member_count": 0,
      "name": "<string>",
      "permission_count": 0,
      "system": false,
      "updated_at": "2026-08-27T10:00:00Z"
    }
  ],
  "page": 0,
  "page_size": 0,
  "total_items": 0,
  "total_pages": 0
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
