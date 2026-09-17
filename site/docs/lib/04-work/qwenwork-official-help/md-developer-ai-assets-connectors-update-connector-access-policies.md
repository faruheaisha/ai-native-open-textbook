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
sourceRel: "md/developer-ai-assets-connectors-update-connector-access-policies.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-ai-assets-connectors-update-connector-access-policies.md"
sourceSha256: "d33138dd356e7189733bac8780ea75180a33bd1ea54ca468c267c148eaf997a4"
pageSha256: "d33138dd356e7189733bac8780ea75180a33bd1ea54ca468c267c148eaf997a4"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

修改组织的连接器执行模式和规则集合。rules 提交更新后保留的全部规则，expected_revision 填写上次读取的 revision，以防覆盖并发修改。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>连接器管理（管理）</td> <td>connectors</td> <td>admin.v1.connectors.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
PATCH /api/openapi/v1/connector-access-policy
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>expected_revision</td> <td>body</td> <td>integer · int64</td> <td>必填</td> <td>上次读取该对象时取得的修订号，用于防止覆盖其他调用方的修改。</td> <td>0</td> </tr> <tr> <td>mode</td> <td>body</td> <td>string</td> <td>必填</td> <td>连接器执行控制模式：allow-all 为全部允许，rule-based 为按规则匹配，deny-all 为全部禁止。</td> <td>"allow-all"</td> </tr> <tr> <td>rules</td> <td>body</td> <td>array \| null</td> <td>必填</td> <td>按顺序配置的连接器服务地址或命令匹配规则。 最多项数：1000。</td> <td>\[\{"enabled":false,"expression":"\&lt;string\&gt;","match_object":"endpoint-url","rule_id":"\&lt;uuid\&gt;"\}\]</td> </tr> <tr> <td>rules\[\].enabled</td> <td>body</td> <td>boolean</td> <td>必填</td> <td>是否启用这项配置。</td> <td>false</td> </tr> <tr> <td>rules\[\].expression</td> <td>body</td> <td>string</td> <td>必填</td> <td>用于匹配所选对象的规则表达式。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>rules\[\].match_object</td> <td>body</td> <td>string</td> <td>必填</td> <td>匹配对象：endpoint-url 为服务地址，command 为启动命令。</td> <td>"endpoint-url"</td> </tr> <tr> <td>rules\[\].rule_id</td> <td>body</td> <td>string · uuid</td> <td>否</td> <td>访问规则的唯一标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request PATCH \
  --url '<BASE_URL>/api/openapi/v1/connector-access-policy' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "expected_revision": 0,
  "mode": "allow-all",
  "rules": [
    {
      "enabled": false,
      "expression": "<string>",
      "match_object": "endpoint-url",
      "rule_id": "<uuid>"
    }
  ]
}'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>mode</td> <td>string</td> <td>是</td> <td>连接器执行控制模式：allow-all 为全部允许，rule-based 为按规则匹配，deny-all 为全部禁止。</td> <td>"allow-all"</td> </tr> <tr> <td>revision</td> <td>integer · int64</td> <td>是</td> <td>当前记录的修订号，后续更新时用于校验并发修改。</td> <td>0</td> </tr> <tr> <td>rules</td> <td>array\&lt;OpenapifacadeConnectorAccessPolicyRule\&gt;</td> <td>是</td> <td>按顺序配置的连接器服务地址或命令匹配规则。</td> <td>\[\{"enabled":false,"expression":"\&lt;string\&gt;","match_object":"endpoint-url","rule_id":"\&lt;uuid\&gt;"\}\]</td> </tr> <tr> <td>rules\[\].enabled</td> <td>boolean</td> <td>是</td> <td>是否启用这项配置。</td> <td>false</td> </tr> <tr> <td>rules\[\].expression</td> <td>string</td> <td>是</td> <td>用于匹配所选对象的规则表达式。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>rules\[\].match_object</td> <td>string</td> <td>是</td> <td>匹配对象：endpoint-url 为服务地址，command 为启动命令。</td> <td>"endpoint-url"</td> </tr> <tr> <td>rules\[\].rule_id</td> <td>string · uuid</td> <td>是</td> <td>访问规则的唯一标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "mode": "allow-all",
  "revision": 0,
  "rules": [
    {
      "enabled": false,
      "expression": "<string>",
      "match_object": "endpoint-url",
      "rule_id": "<uuid>"
    }
  ],
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
