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
sourceRel: "md/developer-organization-admin-roles-get-menu-permissions.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-organization-admin-roles-get-menu-permissions.md"
sourceSha256: "4cd52ed2e535a3b943bdec0dca3358fc15edee992921c34bff1ca5c19f03b129"
pageSha256: "4cd52ed2e535a3b943bdec0dca3358fc15edee992921c34bff1ca5c19f03b129"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

读取管理后台菜单及其权限编码目录。创建或更新管理员角色前，可用此接口确认 permissions 可填写的权限及其所属菜单。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>管理员角色读取（读取）</td> <td>admin-roles</td> <td>admin.v1.admin-roles.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/admin-menu-permissions
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
  --url '<BASE_URL>/api/openapi/v1/admin-menu-permissions' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>menus</td> <td>array \| null</td> <td>是</td> <td>管理后台的菜单目录。</td> <td>\[\{"code":"\&lt;string\&gt;","display_order":0,"parent_code":"\&lt;string\&gt;"\}\]</td> </tr> <tr> <td>menus\[\].code</td> <td>string</td> <td>是</td> <td>权限或菜单的稳定编码。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>menus\[\].display_order</td> <td>integer · int64</td> <td>是</td> <td>展示顺序的排序值。</td> <td>0</td> </tr> <tr> <td>menus\[\].parent_code</td> <td>string</td> <td>否</td> <td>上级菜单的编码，用于还原目录层级。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>permissions</td> <td>array \| null</td> <td>是</td> <td>可用于管理员角色授权的权限目录。</td> <td>\[\{"action":"\&lt;string\&gt;","code":"\&lt;string\&gt;","description":"\&lt;string\&gt;","menu_code":"\&lt;string\&gt;","resource":"\&lt;string\&gt;"\}\]</td> </tr> <tr> <td>permissions\[\].action</td> <td>string</td> <td>是</td> <td>该权限允许执行的操作。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>permissions\[\].code</td> <td>string</td> <td>是</td> <td>权限或菜单的稳定编码。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>permissions\[\].description</td> <td>string</td> <td>是</td> <td>此对象的说明，用于补充名称之外的信息。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>permissions\[\].menu_code</td> <td>string</td> <td>是</td> <td>权限所属菜单的编码。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>permissions\[\].resource</td> <td>string</td> <td>是</td> <td>该权限控制的资源类型。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "menus": [
    {
      "code": "<string>",
      "display_order": 0,
      "parent_code": "<string>"
    }
  ],
  "permissions": [
    {
      "action": "<string>",
      "code": "<string>",
      "description": "<string>",
      "menu_code": "<string>",
      "resource": "<string>"
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
