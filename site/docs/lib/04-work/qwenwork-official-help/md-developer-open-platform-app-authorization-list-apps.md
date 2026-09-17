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
sourceRel: "md/developer-open-platform-app-authorization-list-apps.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-open-platform-app-authorization-list-apps.md"
sourceSha256: "07e66d6741b50e64811b9239a7159db5f5136e05d4dc74f79552a8cb8db41111"
pageSha256: "07e66d6741b50e64811b9239a7159db5f5136e05d4dc74f79552a8cb8db41111"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

读取当前组织的开放平台应用，查看应用名称、已授予的 API Scope 和人员访问范围。用于核对应用授权配置，响应不包含 API Key 明文。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>应用读取（读取）</td> <td>apps</td> <td>admin.v1.apps.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/open-platform/apps
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
此接口没有额外请求参数。

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request GET \
  --url '<BASE_URL>/api/openapi/v1/open-platform/apps' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>items</td> <td>array \| null</td> <td>是</td> <td>符合查询条件的当前页记录列表。</td> <td>\[\{"api_scopes":\["\&lt;string\&gt;"\],"created_at":"2026-08-27T10:00:00Z","created_by_name":"\&lt;string\&gt;","description":"\&lt;string\&gt;","id":"\&lt;string\&gt;","modified_at":"2026-08-27T10:00:00Z","modified_by_name":"\&lt;string\&gt;","name":"\&lt;string\&gt;","status":"\&lt;string\&gt;","subject_scope":"\&lt;string\&gt;"\}\]</td> </tr> <tr> <td>items\[\].api_scopes</td> <td>array \| null</td> <td>是</td> <td>应用获授的 API Scope 编码列表。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>items\[\].created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].created_by_name</td> <td>string</td> <td>是</td> <td>创建者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].description</td> <td>string</td> <td>是</td> <td>此对象的说明，用于补充名称之外的信息。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].modified_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次修改的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].modified_by_name</td> <td>string</td> <td>是</td> <td>最后修改者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].name</td> <td>string</td> <td>是</td> <td>用于识别此对象的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].subject_scope</td> <td>any</td> <td>是</td> <td>应用允许访问的用户范围配置。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "items": [
    {
      "api_scopes": [
        "<string>"
      ],
      "created_at": "2026-08-27T10:00:00Z",
      "created_by_name": "<string>",
      "description": "<string>",
      "id": "<string>",
      "modified_at": "2026-08-27T10:00:00Z",
      "modified_by_name": "<string>",
      "name": "<string>",
      "status": "<string>",
      "subject_scope": "<string>"
    }
  ]
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
