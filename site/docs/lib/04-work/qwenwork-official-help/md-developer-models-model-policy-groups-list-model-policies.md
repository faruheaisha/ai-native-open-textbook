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
sourceRel: "md/developer-models-model-policy-groups-list-model-policies.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-models-model-policy-groups-list-model-policies.md"
sourceSha256: "817f621e19c1b1684953ebc5536886bda24aa3b801eed4ea90acb9c1c8962de4"
pageSha256: "817f621e19c1b1684953ebc5536886bda24aa3b801eed4ea90acb9c1c8962de4"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

查询模型策略组，查看允许或限制模式、人员范围、资源范围及启用状态。返回组标识和范围数量，用于核对已有授权配置。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>模型策略读取（读取）</td> <td>model-policies</td> <td>admin.v1.model-policies.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/model-policies
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
  --url '<BASE_URL>/api/openapi/v1/model-policies?keyword=<keyword>&page=1&page_size=20' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>items</td> <td>array \| null</td> <td>是</td> <td>符合查询条件的当前页记录列表。</td> <td>\[\{"created_at":"2026-08-27T10:00:00Z","default":false,"description":"\&lt;string\&gt;","id":"\&lt;string\&gt;","mode":"\&lt;string\&gt;","name":"\&lt;string\&gt;","policy_type":"\&lt;string\&gt;","resource_count":0,"resource_scope":"\&lt;string\&gt;","status":"\&lt;string\&gt;","subject_count":0,"subject_counts":\{\},"subject_scope":"\&lt;string\&gt;","surfaces":\["\&lt;string\&gt;"\],"updated_at":"2026-08-27T10:00:00Z"\}\]</td> </tr> <tr> <td>items\[\].created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].default</td> <td>boolean</td> <td>是</td> <td>是否为默认策略组。</td> <td>false</td> </tr> <tr> <td>items\[\].description</td> <td>string</td> <td>是</td> <td>资源策略组的用途说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].mode</td> <td>string</td> <td>是</td> <td>策略模式：allowlist 为允许所选资源，denylist 为限制所选资源。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].name</td> <td>string</td> <td>是</td> <td>资源策略组的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].policy_type</td> <td>string</td> <td>是</td> <td>策略组管理的资源类型。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].resource_count</td> <td>integer · int64</td> <td>是</td> <td>策略所选资源的数量。</td> <td>0</td> </tr> <tr> <td>items\[\].resource_scope</td> <td>string</td> <td>是</td> <td>资源范围：all 为全部资源，selected 为指定资源。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].subject_count</td> <td>integer · int64</td> <td>是</td> <td>策略所选范围对象的数量。</td> <td>0</td> </tr> <tr> <td>items\[\].subject_counts</td> <td>object</td> <td>是</td> <td>按对象类型统计的策略范围对象数量。</td> <td>\{\}</td> </tr> <tr> <td>items\[\].subject_scope</td> <td>string</td> <td>是</td> <td>用户范围：all_users 为所有用户，selected 为指定对象。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].surfaces</td> <td>array \| null</td> <td>是</td> <td>策略适用的入口，当前仅支持 qwenwork_pc；未填写时使用该入口。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>items\[\].updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>page</td> <td>integer · int64</td> <td>是</td> <td>当前结果页的页码，从 1 开始。</td> <td>0</td> </tr> <tr> <td>page_size</td> <td>integer · int64</td> <td>是</td> <td>每页返回的记录数。</td> <td>0</td> </tr> <tr> <td>total_items</td> <td>integer · int64</td> <td>是</td> <td>符合查询条件的记录总数。</td> <td>0</td> </tr> <tr> <td>total_pages</td> <td>integer · int64</td> <td>是</td> <td>按当前每页数量计算的总页数。</td> <td>0</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "items": [
    {
      "created_at": "2026-08-27T10:00:00Z",
      "default": false,
      "description": "<string>",
      "id": "<string>",
      "mode": "<string>",
      "name": "<string>",
      "policy_type": "<string>",
      "resource_count": 0,
      "resource_scope": "<string>",
      "status": "<string>",
      "subject_count": 0,
      "subject_counts": {},
      "subject_scope": "<string>",
      "surfaces": [
        "<string>"
      ],
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
