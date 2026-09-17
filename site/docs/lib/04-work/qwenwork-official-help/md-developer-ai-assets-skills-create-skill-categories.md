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
sourceRel: "md/developer-ai-assets-skills-create-skill-categories.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-ai-assets-skills-create-skill-categories.md"
sourceSha256: "5c5044b14329861892f73eec711ff9f1177b33d5c80b14ba530280f9e0e6b947"
pageSha256: "5c5044b14329861892f73eec711ff9f1177b33d5c80b14ba530280f9e0e6b947"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

在企业市场中新建供技能使用的分类，设置名称和排序值。此操作创建分类，不会向其中新增资源。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>技能管理（管理）</td> <td>skills</td> <td>admin.v1.skills.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
POST /api/openapi/v1/skill-categories
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Idempotency-Key</td> <td>header</td> <td>string</td> <td>必填</td> <td>本次写操作的幂等键。同一操作重试时复用相同键和请求内容，避免重复处理。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name</td> <td>body</td> <td>string</td> <td>必填</td> <td>资源分类的名称。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>order</td> <td>body</td> <td>integer · int64</td> <td>否</td> <td>对象在列表中的排序值。</td> <td>0</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request POST \
  --url '<BASE_URL>/api/openapi/v1/skill-categories' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Idempotency-Key: <UNIQUE_REQUEST_ID>' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "<string>",
  "order": 0
}'
```

## 响应
### 201 创建成功，返回新建的记录。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>category_id</td> <td>string · uuid</td> <td>是</td> <td>资源所属分类的标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>name</td> <td>string</td> <td>是</td> <td>资源分类的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>order</td> <td>integer · int64</td> <td>是</td> <td>对象在列表中的排序值。</td> <td>0</td> </tr> <tr> <td>revision</td> <td>integer · int64</td> <td>是</td> <td>当前记录的修订号，后续更新时用于校验并发修改。 最小值：1。</td> <td>1</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "category_id": "<uuid>",
  "name": "<string>",
  "order": 0,
  "revision": 1
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
