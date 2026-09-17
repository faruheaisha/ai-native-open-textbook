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
sourceRel: "md/developer-users-user-update-department.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-users-user-update-department.md"
sourceSha256: "4ba9ab985f3e53a98b346816c3c98a3a19303731e49297b72c0d0a2faf43ce36"
pageSha256: "4ba9ab985f3e53a98b346816c3c98a3a19303731e49297b72c0d0a2faf43ce36"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

修改指定部门的名称、上级部门或外部标识。此接口只更新传入的字段；调整上级部门时，由目录服务校验新的组织层级。

## 所需权限
<table> <thead> <tr> <td><p>所需权限</p></td> <td><p>资源</p></td> <td><p>Scope</p></td> <td><p>资源服务</p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>用户与部门管理（管理）</p></td> <td><p>user-directory</p></td> <td><p>admin.v1.user-directory.manage</p></td> <td><p>qwenwork-biz-service</p></td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
PATCH /api/openapi/v1/departments/{departmentId}
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td><p>名称</p></td> <td><p>位置</p></td> <td><p>类型</p></td> <td><p>必填</p></td> <td><p>说明</p></td> <td><p>示例</p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>Authorization</p></td> <td><p>header</p></td> <td><p>string</p></td> <td><p>是</p></td> <td><p>应用 API Key，使用 Bearer 方式传递。</p></td> <td><p>Bearer qwk_\*\*\*</p></td> </tr> <tr> <td><p>X-Request-Id</p></td> <td><p>header</p></td> <td><p>string</p></td> <td><p>否</p></td> <td><p>可选的调用追踪标识；未传入时由服务端生成。</p></td> <td><p>req-20260831-001</p></td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td><p>名称</p></td> <td><p>位置</p></td> <td><p>类型</p></td> <td><p>必填</p></td> <td><p>说明</p></td> <td><p>示例</p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>departmentId</p></td> <td><p>path</p></td> <td><p>string · uuid</p></td> <td><p>必填</p></td> <td><p>需要操作的部门标识。</p></td> <td><p>"\&lt;uuid\&gt;"</p></td> </tr> <tr> <td><p>Idempotency-Key</p></td> <td><p>header</p></td> <td><p>string</p></td> <td><p>必填</p></td> <td><p>本次写操作的幂等键。同一操作重试时复用相同键和请求内容，避免重复处理。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>external_id</p></td> <td><p>body</p></td> <td><p>string</p></td> <td><p>否</p></td> <td><p>来源系统中的标识，用于关联外部对象。 最多字符数：512。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>name</p></td> <td><p>body</p></td> <td><p>string</p></td> <td><p>否</p></td> <td><p>部门的名称。 最多字符数：255。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>parent_id</p></td> <td><p>body</p></td> <td><p>string · uuid</p></td> <td><p>否</p></td> <td><p>上级部门的标识。</p></td> <td><p>"\&lt;uuid\&gt;"</p></td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request PATCH \
  --url '<BASE_URL>/api/openapi/v1/departments/<departmentId>' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Idempotency-Key: <UNIQUE_REQUEST_ID>' \
  --header 'Content-Type: application/json' \
  --data '{
  "external_id": "<string>",
  "name": "<string>",
  "parent_id": "<uuid>"
}'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td><p>名称</p></td> <td><p>类型</p></td> <td><p>必填</p></td> <td><p>说明</p></td> <td><p>示例</p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>department_id</p></td> <td><p>string · uuid</p></td> <td><p>是</p></td> <td><p>相关部门的标识。</p></td> <td><p>"\&lt;uuid\&gt;"</p></td> </tr> <tr> <td><p>external_id</p></td> <td><p>string</p></td> <td><p>否</p></td> <td><p>来源系统中的标识，用于关联外部对象。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>name</p></td> <td><p>string</p></td> <td><p>是</p></td> <td><p>部门的名称。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>order</p></td> <td><p>integer · int64</p></td> <td><p>是</p></td> <td><p>对象在列表中的排序值。</p></td> <td><p>0</p></td> </tr> <tr> <td><p>parent_id</p></td> <td><p>string \| null</p></td> <td><p>是</p></td> <td><p>上级部门的标识。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "department_id": "<uuid>",
  "external_id": "<string>",
  "name": "<string>",
  "order": 0,
  "parent_id": "<string>"
}
```

### default 请求失败，返回错误码和错误详情。

<table> <thead> <tr> <td><p>名称</p></td> <td><p>类型</p></td> <td><p>必填</p></td> <td><p>说明</p></td> <td><p>示例</p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>code</p></td> <td><p>string</p></td> <td><p>否</p></td> <td><p>用于程序判断错误原因的稳定业务错误码。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>detail</p></td> <td><p>string</p></td> <td><p>是</p></td> <td><p>便于阅读的错误说明。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>details</p></td> <td><p>OpenapiErrorDetails</p></td> <td><p>否</p></td> <td><p>字段校验失败时的详细信息。</p></td> <td><p>\{"field":"\&lt;string\&gt;","reason":"\&lt;string\&gt;","suggestion":"\&lt;string\&gt;"\}</p></td> </tr> <tr> <td><p>details.field</p></td> <td><p>string</p></td> <td><p>否</p></td> <td><p>未通过校验的请求字段。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>details.reason</p></td> <td><p>string</p></td> <td><p>否</p></td> <td><p>稳定的校验失败原因，用于判断字段为何不合法。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>details.suggestion</p></td> <td><p>string</p></td> <td><p>否</p></td> <td><p>建议采用的规范化字段值。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> <tr> <td><p>error</p></td> <td><p>string</p></td> <td><p>是</p></td> <td><p>稳定的 HTTP 错误类型。</p></td> <td><p>"\&lt;string\&gt;"</p></td> </tr> </tbody> </table>

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
