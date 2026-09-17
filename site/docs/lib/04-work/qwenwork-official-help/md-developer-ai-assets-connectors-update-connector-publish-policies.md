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
sourceRel: "md/developer-ai-assets-connectors-update-connector-publish-policies.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-ai-assets-connectors-update-connector-publish-policies.md"
sourceSha256: "8ebffd2a1a0c7a27071e1d4516e45b1ca82969fd0ace9ab07e45e0a356c20fe3"
pageSha256: "8ebffd2a1a0c7a27071e1d4516e45b1ca82969fd0ace9ab07e45e0a356c20fe3"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

替换连接器策略组的配置，包含模式、人员范围、资源范围、有效时间和状态，集合字段提交完整保留值。默认组的名称、模式、人员范围类型和状态固定，不能通过更新改变。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>连接器管理（管理）</td> <td>connectors</td> <td>admin.v1.connectors.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
PATCH /api/openapi/v1/connector-policies/{policyId}
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>policyId</td> <td>path</td> <td>string · uuid</td> <td>必填</td> <td>需要操作的策略标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>description</td> <td>body</td> <td>string</td> <td>否</td> <td>资源策略组的用途说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>display_order</td> <td>body</td> <td>integer · int64</td> <td>否</td> <td>展示顺序的排序值。</td> <td>0</td> </tr> <tr> <td>mode</td> <td>body</td> <td>string</td> <td>必填</td> <td>策略模式：allowlist 为允许所选资源，denylist 为限制所选资源。</td> <td>"allowlist"</td> </tr> <tr> <td>name</td> <td>body</td> <td>string</td> <td>必填</td> <td>资源策略组的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>resource_ids</td> <td>body</td> <td>array \| null</td> <td>必填</td> <td>策略作用的资源标识列表。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>resource_scope</td> <td>body</td> <td>string</td> <td>必填</td> <td>资源范围：all 为全部资源，selected 为指定资源。</td> <td>"all"</td> </tr> <tr> <td>status</td> <td>body</td> <td>string</td> <td>否</td> <td>此记录当前所处的状态。 可选值：enabled、disabled。</td> <td>"enabled"</td> </tr> <tr> <td>subject_scope</td> <td>body</td> <td>string</td> <td>必填</td> <td>用户范围：all_users 为所有用户，selected 为指定对象。</td> <td>"all_users"</td> </tr> <tr> <td>subjects</td> <td>body</td> <td>array \| null</td> <td>必填</td> <td>策略或任务选择的范围对象列表。</td> <td>\[\{"include_descendants":false,"subject_id":"\&lt;string\&gt;","subject_type":"user"\}\]</td> </tr> <tr> <td>subjects\[\].include_descendants</td> <td>body</td> <td>boolean</td> <td>否</td> <td>选择部门时，是否同时包含该部门的下级部门。</td> <td>false</td> </tr> <tr> <td>subjects\[\].subject_id</td> <td>body</td> <td>string</td> <td>必填</td> <td>所选用户、部门或用户组的标识，与 subject_type 配合使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>subjects\[\].subject_type</td> <td>body</td> <td>string</td> <td>必填</td> <td>范围对象类型：user 为用户，org_unit 为部门，user_group 为用户组。</td> <td>"user"</td> </tr> <tr> <td>surfaces</td> <td>body</td> <td>array \| null</td> <td>必填</td> <td>策略适用的入口，当前仅支持 qwenwork_pc；未填写时使用该入口。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>valid_from</td> <td>body</td> <td>string · date-time</td> <td>否</td> <td>策略有效时间范围的起点。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>valid_to</td> <td>body</td> <td>string · date-time</td> <td>否</td> <td>策略有效时间范围的终点。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request PATCH \
  --url '<BASE_URL>/api/openapi/v1/connector-policies/<policyId>' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "description": "<string>",
  "display_order": 0,
  "mode": "allowlist",
  "name": "<string>",
  "resource_ids": [
    "<string>"
  ],
  "resource_scope": "all",
  "status": "enabled",
  "subject_scope": "all_users",
  "subjects": [
    {
      "include_descendants": false,
      "subject_id": "<string>",
      "subject_type": "user"
    }
  ],
  "surfaces": [
    "<string>"
  ],
  "valid_from": "2026-08-27T10:00:00Z",
  "valid_to": "2026-08-27T10:00:00Z"
}'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>default</td> <td>boolean</td> <td>是</td> <td>是否为默认策略组。</td> <td>false</td> </tr> <tr> <td>description</td> <td>string</td> <td>是</td> <td>资源策略组的用途说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>mode</td> <td>string</td> <td>是</td> <td>策略模式：allowlist 为允许所选资源，denylist 为限制所选资源。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name</td> <td>string</td> <td>是</td> <td>资源策略组的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>policy_type</td> <td>string</td> <td>是</td> <td>策略组管理的资源类型。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>resource_count</td> <td>integer · int64</td> <td>是</td> <td>策略所选资源的数量。</td> <td>0</td> </tr> <tr> <td>resource_scope</td> <td>string</td> <td>是</td> <td>资源范围：all 为全部资源，selected 为指定资源。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>subject_count</td> <td>integer · int64</td> <td>是</td> <td>策略所选范围对象的数量。</td> <td>0</td> </tr> <tr> <td>subject_counts</td> <td>object</td> <td>是</td> <td>按对象类型统计的策略范围对象数量。</td> <td>\{\}</td> </tr> <tr> <td>subject_scope</td> <td>string</td> <td>是</td> <td>用户范围：all_users 为所有用户，selected 为指定对象。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>surfaces</td> <td>array \| null</td> <td>是</td> <td>策略适用的入口，当前仅支持 qwenwork_pc；未填写时使用该入口。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
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
