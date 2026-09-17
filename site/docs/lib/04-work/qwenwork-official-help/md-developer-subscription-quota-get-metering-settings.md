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
sourceRel: "md/developer-subscription-quota-get-metering-settings.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-subscription-quota-get-metering-settings.md"
sourceSha256: "059be8a57b5f84766776234a53abd1a6653a38db6914d86bd08f1c8d3d9b3cde"
pageSha256: "059be8a57b5f84766776234a53abd1a6653a38db6914d86bd08f1c8d3d9b3cde"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

读取当前组织的计量周期模式和下次用量重置时间。当前按订阅周期计量，返回值同时包含数据状态及对应时间。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>限额与计量读取（读取）</td> <td>quota</td> <td>admin.v1.quota.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/metering-policy
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
  --url '<BASE_URL>/api/openapi/v1/metering-policy' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>cycle_mode</td> <td>string</td> <td>是</td> <td>计量周期模式，当前为 subscription-cycle，即按订阅周期计量。</td> <td>"subscription-cycle"</td> </tr> <tr> <td>data_as_of</td> <td>string · date-time</td> <td>是</td> <td>本次数据对应的时间，用于判断数据的新鲜程度。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>data_status</td> <td>string</td> <td>是</td> <td>数据状态：fresh 为新鲜数据，stale 表示返回了旧数据。</td> <td>"fresh"</td> </tr> <tr> <td>next_reset_at</td> <td>string · date-time</td> <td>是</td> <td>下次重置周期用量的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "cycle_mode": "subscription-cycle",
  "data_as_of": "2026-08-27T10:00:00Z",
  "data_status": "fresh",
  "next_reset_at": "2026-08-27T10:00:00Z",
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
