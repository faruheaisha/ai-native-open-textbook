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
sourceRel: "md/developer-ai-assets-skills-update-skills.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-ai-assets-skills-update-skills.md"
sourceSha256: "365392bc62535c70a68bc0e8f378592bcd443c841327eb805157ee04901590c0"
pageSha256: "365392bc62535c70a68bc0e8f378592bcd443c841327eb805157ee04901590c0"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

修改技能的名称、说明、版本、图标、客户端范围、状态或市场分类。更新资源包使用已上传文件的 upload_id；expected_revision 与 expected_market_item_revision 分别用于资源和市场条目的并发检查。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>技能管理（管理）</td> <td>skills</td> <td>admin.v1.skills.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
PATCH /api/openapi/v1/skills/{resourceId}
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>resourceId</td> <td>path</td> <td>string · uuid</td> <td>必填</td> <td>需要操作的资源标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>category_id</td> <td>body</td> <td>string</td> <td>否</td> <td>资源所属分类的标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>clear_category</td> <td>body</td> <td>boolean</td> <td>否</td> <td>是否清除资源当前的分类归属。</td> <td>false</td> </tr> <tr> <td>clients</td> <td>body</td> <td>array \| null</td> <td>否</td> <td>可使用此资源的客户端类型列表。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>description</td> <td>body</td> <td>string</td> <td>否</td> <td>此对象的说明，用于补充名称之外的信息。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>description_cn</td> <td>body</td> <td>string</td> <td>否</td> <td>资源的中文说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>expected_market_item_revision</td> <td>body</td> <td>integer · int64</td> <td>否</td> <td>企业市场条目的预期修订号，用于校验分类等市场信息的并发修改。</td> <td>0</td> </tr> <tr> <td>expected_revision</td> <td>body</td> <td>integer · int64</td> <td>否</td> <td>上次读取该对象时取得的修订号，用于防止覆盖其他调用方的修改。</td> <td>0</td> </tr> <tr> <td>icon_upload_id</td> <td>body</td> <td>string</td> <td>否</td> <td>已上传图标文件的标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>icon_url</td> <td>body</td> <td>string</td> <td>否</td> <td>资源图标的访问地址。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name_cn</td> <td>body</td> <td>string</td> <td>否</td> <td>资源的中文名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name_en</td> <td>body</td> <td>string</td> <td>否</td> <td>资源的英文名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>status</td> <td>body</td> <td>string</td> <td>否</td> <td>此记录当前所处的状态。 可选值：draft、pending、active、inactive、rejected、deleting。</td> <td>"draft"</td> </tr> <tr> <td>upload_id</td> <td>body</td> <td>string</td> <td>否</td> <td>已上传资源包的标识，用于更新资源内容。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>version</td> <td>body</td> <td>string</td> <td>否</td> <td>资源包的版本标识。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request PATCH \
  --url '<BASE_URL>/api/openapi/v1/skills/<resourceId>' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
  "category_id": "<string>",
  "clear_category": false,
  "clients": [
    "<string>"
  ],
  "description": "<string>",
  "description_cn": "<string>",
  "expected_market_item_revision": 0,
  "expected_revision": 0,
  "icon_upload_id": "<string>",
  "icon_url": "<string>",
  "name_cn": "<string>",
  "name_en": "<string>",
  "status": "draft",
  "upload_id": "<string>",
  "version": "<string>"
}'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>clients</td> <td>array \| null</td> <td>是</td> <td>可使用此资源的客户端类型列表。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>description</td> <td>string</td> <td>是</td> <td>此对象的说明，用于补充名称之外的信息。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>description_cn</td> <td>string</td> <td>否</td> <td>资源的中文说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>has_package</td> <td>boolean</td> <td>是</td> <td>该资源是否包含可用的资源包。</td> <td>false</td> </tr> <tr> <td>icon_url</td> <td>string</td> <td>否</td> <td>资源图标的访问地址。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name</td> <td>string</td> <td>是</td> <td>用于识别此对象的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name_cn</td> <td>string</td> <td>否</td> <td>资源的中文名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name_en</td> <td>string</td> <td>否</td> <td>资源的英文名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>origin</td> <td>string</td> <td>是</td> <td>资源的来源类型，用于区分资源归属。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>readme_content</td> <td>string</td> <td>否</td> <td>资源包中的使用说明正文。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>revision</td> <td>integer · int64</td> <td>是</td> <td>当前记录的修订号，后续更新时用于校验并发修改。</td> <td>0</td> </tr> <tr> <td>source_type</td> <td>string</td> <td>否</td> <td>资源来源的具体类型。 可选值：official。</td> <td>"official"</td> </tr> <tr> <td>status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>version</td> <td>string</td> <td>否</td> <td>资源包的版本标识。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "clients": [
    "<string>"
  ],
  "created_at": "2026-08-27T10:00:00Z",
  "description": "<string>",
  "description_cn": "<string>",
  "has_package": false,
  "icon_url": "<string>",
  "id": "<string>",
  "name": "<string>",
  "name_cn": "<string>",
  "name_en": "<string>",
  "origin": "<string>",
  "readme_content": "<string>",
  "revision": 0,
  "source_type": "official",
  "status": "<string>",
  "updated_at": "2026-08-27T10:00:00Z",
  "version": "<string>"
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
