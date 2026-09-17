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
sourceRel: "md/developer-subscription-quota-create-quota-policies.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-subscription-quota-create-quota-policies.md"
sourceSha256: "06329459fa0c0dd8310379e80dd081567dffb2c670c636d5a82bf670f3b5dcb2"
pageSha256: "06329459fa0c0dd8310379e80dd081567dffb2c670c636d5a82bf670f3b5dcb2"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

新增用户限额策略，为指定用户、部门或用户组设置每个周期的积分上限。自定义策略优先级为 0--99，数值越小越先匹配；每人限额至少为 500 积分。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>限额与计量管理（管理）</td> <td>quota</td> <td>admin.v1.quota.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
POST /api/openapi/v1/quota-policies
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>description</td> <td>body</td> <td>string</td> <td>否</td> <td>限额策略的用途说明。 最多字符数：512。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name</td> <td>body</td> <td>string</td> <td>必填</td> <td>限额策略的名称。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>per_user_limit</td> <td>body</td> <td>integer · int64</td> <td>必填</td> <td>每位用户在一个周期内的积分上限；当前服务要求至少 500 积分。 最小值：500。</td> <td>500</td> </tr> <tr> <td>priority</td> <td>body</td> <td>integer · int64</td> <td>必填</td> <td>策略匹配的优先级，数值越小越先匹配。 最小值：0。 最大值：99。</td> <td>0</td> </tr> <tr> <td>scopes</td> <td>body</td> <td>array \| null</td> <td>否</td> <td>此限额策略适用的用户、部门和用户组。</td> <td>\[\{"id":"\&lt;string\&gt;","type":"user"\}\]</td> </tr> <tr> <td>scopes\[\].id</td> <td>body</td> <td>string</td> <td>必填</td> <td>与 type 对应的用户、部门或用户组标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>scopes\[\].type</td> <td>body</td> <td>string</td> <td>必填</td> <td>范围类型：user 为用户，dept 为部门，user_group 为用户组。</td> <td>"user"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request POST \
  --url '<BASE_URL>/api/openapi/v1/quota-policies' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "description": "<string>",
  "name": "<string>",
  "per_user_limit": 500,
  "priority": 0,
  "scopes": [
    {
      "id": "<string>",
      "type": "user"
    }
  ]
}'
```

## 响应
### 201 创建成功，返回新建的记录。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>description</td> <td>string</td> <td>否</td> <td>限额策略的用途说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>id</td> <td>integer · int64</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>0</td> </tr> <tr> <td>is_default</td> <td>boolean</td> <td>是</td> <td>是否为默认策略。</td> <td>false</td> </tr> <tr> <td>name</td> <td>string</td> <td>是</td> <td>限额策略的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>per_user_limit</td> <td>integer · int64</td> <td>是</td> <td>每位用户在一个周期内的积分上限；当前服务要求至少 500 积分。</td> <td>0</td> </tr> <tr> <td>priority</td> <td>integer · int64</td> <td>是</td> <td>策略匹配的优先级，数值越小越先匹配。</td> <td>0</td> </tr> <tr> <td>scopes</td> <td>array \| null</td> <td>是</td> <td>此限额策略适用的用户、部门和用户组。</td> <td>\[\{"id":"\&lt;string\&gt;","type":"user"\}\]</td> </tr> <tr> <td>scopes\[\].id</td> <td>string</td> <td>是</td> <td>与 type 对应的用户、部门或用户组标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>scopes\[\].type</td> <td>string</td> <td>是</td> <td>范围类型：user 为用户，dept 为部门，user_group 为用户组。</td> <td>"user"</td> </tr> <tr> <td>status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。 可选值：enabled、disabled。</td> <td>"enabled"</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "created_at": "2026-08-27T10:00:00Z",
  "description": "<string>",
  "id": 0,
  "is_default": false,
  "name": "<string>",
  "per_user_limit": 0,
  "priority": 0,
  "scopes": [
    {
      "id": "<string>",
      "type": "user"
    }
  ],
  "status": "enabled",
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
