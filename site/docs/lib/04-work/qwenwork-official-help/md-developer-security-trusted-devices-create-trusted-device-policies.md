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
sourceRel: "md/developer-security-trusted-devices-create-trusted-device-policies.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-security-trusted-devices-create-trusted-device-policies.md"
sourceSha256: "e55eef611a9538f4c1c015b104e2d3e6aab96cf6494ef5ed62f8c52fead36fff"
pageSha256: "e55eef611a9538f4c1c015b104e2d3e6aab96cf6494ef5ed62f8c52fead36fff"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

新增可信设备策略，为所选人员设置设备可信校验和首台设备自动信任规则。通过 priority 指定匹配顺序，通过 scope_type 和 subjects 指定人员范围。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>可信设备策略管理（管理）</td> <td>trusted-device-policies</td> <td>admin.v1.trusted-device-policies.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
POST /api/openapi/v1/trusted-device-policies
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Idempotency-Key</td> <td>header</td> <td>string</td> <td>必填</td> <td>本次写操作的幂等键。同一操作重试时复用相同键和请求内容，避免重复处理。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>description</td> <td>body</td> <td>string</td> <td>否</td> <td>可信设备策略的用途说明。 最多字符数：120。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>first_device_auto_trust</td> <td>body</td> <td>boolean</td> <td>必填</td> <td>是否将用户的首台登录设备自动标记为可信。</td> <td>false</td> </tr> <tr> <td>name</td> <td>body</td> <td>string</td> <td>必填</td> <td>可信设备策略的名称。 最多字符数：40。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>priority</td> <td>body</td> <td>integer · int64</td> <td>必填</td> <td>策略匹配的优先级，数值越小越先匹配。 最小值：1。</td> <td>1</td> </tr> <tr> <td>scope_type</td> <td>body</td> <td>string</td> <td>必填</td> <td>人员范围：all 为所有用户，specified 为 subjects 指定的对象。</td> <td>"all"</td> </tr> <tr> <td>subjects</td> <td>body</td> <td>array \| null</td> <td>必填</td> <td>策略或任务选择的范围对象列表。 最多项数：1000。</td> <td>\[\{"id":"\&lt;uuid\&gt;","name":"\&lt;string\&gt;","type":"department"\}\]</td> </tr> <tr> <td>subjects\[\].id</td> <td>body</td> <td>string · uuid</td> <td>必填</td> <td>所选人员范围对象的标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>subjects\[\].name</td> <td>body</td> <td>string</td> <td>必填</td> <td>所选人员范围对象的显示名称。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>subjects\[\].type</td> <td>body</td> <td>string</td> <td>必填</td> <td>人员范围对象的类型。 可选值：department、user_group、user。</td> <td>"department"</td> </tr> <tr> <td>validation_enabled</td> <td>body</td> <td>boolean</td> <td>必填</td> <td>是否检查用户登录设备的可信状态。</td> <td>false</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request POST \
  --url '<BASE_URL>/api/openapi/v1/trusted-device-policies' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Idempotency-Key: <UNIQUE_REQUEST_ID>' \
  --header 'Content-Type: application/json' \
  --data '{
  "description": "<string>",
  "first_device_auto_trust": false,
  "name": "<string>",
  "priority": 1,
  "scope_type": "all",
  "subjects": [
    {
      "id": "<uuid>",
      "name": "<string>",
      "type": "department"
    }
  ],
  "validation_enabled": false
}'
```

## 响应
### 201 创建成功，返回新建的记录。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>created_at</td> <td>string \\</td> <td>null · date-time</td> <td>是</td> <td>此记录的创建时间。 \| "2026-08-27T10:00:00Z"</td> </tr> <tr> <td>created_by</td> <td>string \\</td> <td>null · uuid</td> <td>否</td> <td>创建者的用户标识。 \| "\&lt;uuid\&gt;"</td> </tr> <tr> <td>created_by_email</td> <td>string</td> <td>否</td> <td>创建者的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>created_by_name</td> <td>string</td> <td>否</td> <td>创建者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>description</td> <td>string</td> <td>是</td> <td>可信设备策略的用途说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>first_device_auto_trust</td> <td>boolean</td> <td>是</td> <td>是否将用户的首台登录设备自动标记为可信。</td> <td>false</td> </tr> <tr> <td>id</td> <td>string · uuid</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>is_default</td> <td>boolean</td> <td>是</td> <td>是否为默认策略。</td> <td>false</td> </tr> <tr> <td>name</td> <td>string</td> <td>是</td> <td>可信设备策略的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>priority</td> <td>integer \\</td> <td>null · int64</td> <td>是</td> <td>策略匹配的优先级，数值越小越先匹配。 \| 0</td> </tr> <tr> <td>scope_type</td> <td>string</td> <td>是</td> <td>人员范围：all 为所有用户，specified 为 subjects 指定的对象。</td> <td>"all"</td> </tr> <tr> <td>subjects</td> <td>array\&lt;OpenapifacadeScopeSubject\&gt;</td> <td>是</td> <td>策略或任务选择的范围对象列表。</td> <td>\[\{"id":"\&lt;uuid\&gt;","name":"\&lt;string\&gt;","type":"department"\}\]</td> </tr> <tr> <td>subjects\[\].id</td> <td>string · uuid</td> <td>是</td> <td>所选人员范围对象的标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>subjects\[\].name</td> <td>string</td> <td>是</td> <td>所选人员范围对象的显示名称。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>subjects\[\].type</td> <td>string</td> <td>是</td> <td>人员范围对象的类型。 可选值：department、user_group、user。</td> <td>"department"</td> </tr> <tr> <td>updated_at</td> <td>string \\</td> <td>null · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。 \| "2026-08-27T10:00:00Z"</td> </tr> <tr> <td>updated_by</td> <td>string \\</td> <td>null · uuid</td> <td>否</td> <td>最后修改者的用户标识。 \| "\&lt;uuid\&gt;"</td> </tr> <tr> <td>updated_by_email</td> <td>string</td> <td>否</td> <td>最后修改者的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>updated_by_name</td> <td>string</td> <td>否</td> <td>最后修改者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>validation_enabled</td> <td>boolean</td> <td>是</td> <td>是否检查用户登录设备的可信状态。</td> <td>false</td> </tr> <tr> <td>version</td> <td>integer · int64</td> <td>是</td> <td>当前记录的版本号，修改或取消时提交最新读取的值以校验并发变更。</td> <td>0</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "created_at": "2026-08-27T10:00:00Z",
  "created_by": "<uuid>",
  "created_by_email": "<string>",
  "created_by_name": "<string>",
  "description": "<string>",
  "first_device_auto_trust": false,
  "id": "<uuid>",
  "is_default": false,
  "name": "<string>",
  "priority": 0,
  "scope_type": "all",
  "subjects": [
    {
      "id": "<uuid>",
      "name": "<string>",
      "type": "department"
    }
  ],
  "updated_at": "2026-08-27T10:00:00Z",
  "updated_by": "<uuid>",
  "updated_by_email": "<string>",
  "updated_by_name": "<string>",
  "validation_enabled": false,
  "version": 0
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
