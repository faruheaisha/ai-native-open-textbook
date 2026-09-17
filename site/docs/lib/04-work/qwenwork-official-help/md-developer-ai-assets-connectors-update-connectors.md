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
sourceRel: "md/developer-ai-assets-connectors-update-connectors.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-ai-assets-connectors-update-connectors.md"
sourceSha256: "2f9a872a2825a52074eca4168f91195bbe911744ee9fd681d7be562b90e168a0"
pageSha256: "2f9a872a2825a52074eca4168f91195bbe911744ee9fd681d7be562b90e168a0"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

修改连接器的展示名称、说明、图标、客户端范围、状态或市场分类。当前请求模型不接受服务 URL、启动命令或认证凭据；资源和市场条目分别使用对应的预期修订号。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>连接器管理（管理）</td> <td>connectors</td> <td>admin.v1.connectors.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
PATCH /api/openapi/v1/connectors/{resourceId}
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>resourceId</td> <td>path</td> <td>string · uuid</td> <td>必填</td> <td>需要操作的资源标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>category_id</td> <td>body</td> <td>string</td> <td>否</td> <td>资源所属分类的标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>clear_category</td> <td>body</td> <td>boolean</td> <td>否</td> <td>是否清除资源当前的分类归属。</td> <td>false</td> </tr> <tr> <td>clients</td> <td>body</td> <td>array \| null</td> <td>否</td> <td>可使用此资源的客户端类型列表。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>description</td> <td>body</td> <td>string</td> <td>否</td> <td>此对象的说明，用于补充名称之外的信息。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>description_cn</td> <td>body</td> <td>string</td> <td>否</td> <td>资源的中文说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>display_name</td> <td>body</td> <td>string</td> <td>否</td> <td>资源对外展示的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>display_name_cn</td> <td>body</td> <td>string</td> <td>否</td> <td>资源对外展示的中文名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>expected_market_item_revision</td> <td>body</td> <td>integer · int64</td> <td>否</td> <td>企业市场条目的预期修订号，用于校验分类等市场信息的并发修改。</td> <td>0</td> </tr> <tr> <td>expected_revision</td> <td>body</td> <td>integer · int64</td> <td>否</td> <td>上次读取该对象时取得的修订号，用于防止覆盖其他调用方的修改。</td> <td>0</td> </tr> <tr> <td>icon_upload_id</td> <td>body</td> <td>string</td> <td>否</td> <td>已上传图标文件的标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>icon_url</td> <td>body</td> <td>string</td> <td>否</td> <td>资源图标的访问地址。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>status</td> <td>body</td> <td>string</td> <td>否</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request PATCH \
  --url '<BASE_URL>/api/openapi/v1/connectors/<resourceId>' \
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
  "display_name": "<string>",
  "display_name_cn": "<string>",
  "expected_market_item_revision": 0,
  "expected_revision": 0,
  "icon_upload_id": "<string>",
  "icon_url": "<string>",
  "status": "<string>"
}'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>api_key</td> <td>OpenapifacadeConnectorAPIKeyConfig</td> <td>否</td> <td>连接器 API Key 的传递格式配置，不包含密钥本身。</td> <td>\{"header_name":"\&lt;string\&gt;","value_prefix":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>api_key.header_name</td> <td>string</td> <td>是</td> <td>发送连接器 API Key 时使用的请求头名称。 最少字符数：1。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>api_key.value_prefix</td> <td>string</td> <td>否</td> <td>放在连接器 API Key 前的请求头值前缀。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>auth_type</td> <td>string</td> <td>是</td> <td>连接器使用的认证方式。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>clients</td> <td>array \| null</td> <td>是</td> <td>可使用此资源的客户端类型列表。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>command</td> <td>string</td> <td>否</td> <td>启动连接器服务的命令。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>description</td> <td>string</td> <td>否</td> <td>此对象的说明，用于补充名称之外的信息。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>description_cn</td> <td>string</td> <td>否</td> <td>资源的中文说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>display_name</td> <td>string</td> <td>否</td> <td>资源对外展示的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>display_name_cn</td> <td>string</td> <td>否</td> <td>资源对外展示的中文名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>icon_url</td> <td>string</td> <td>否</td> <td>资源图标的访问地址。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>oauth_client_registration</td> <td>string</td> <td>否</td> <td>连接器 OAuth 客户端的注册方式。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>oauth_scopes</td> <td>string</td> <td>否</td> <td>连接器 OAuth 认证申请的权限范围。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>origin</td> <td>string</td> <td>是</td> <td>资源的来源类型，用于区分资源归属。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>revision</td> <td>integer · int64</td> <td>是</td> <td>当前记录的修订号，后续更新时用于校验并发修改。</td> <td>0</td> </tr> <tr> <td>server_key</td> <td>string</td> <td>是</td> <td>用于识别连接器服务的键。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>source_type</td> <td>string</td> <td>否</td> <td>资源来源的具体类型。 可选值：official。</td> <td>"official"</td> </tr> <tr> <td>status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>transport</td> <td>string</td> <td>是</td> <td>连接器使用的传输方式。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>updated_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>url</td> <td>string</td> <td>否</td> <td>连接器服务的访问地址。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>version</td> <td>string</td> <td>否</td> <td>资源包的版本标识。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "api_key": {
    "header_name": "<string>",
    "value_prefix": "<string>"
  },
  "auth_type": "<string>",
  "clients": [
    "<string>"
  ],
  "command": "<string>",
  "created_at": "2026-08-27T10:00:00Z",
  "description": "<string>",
  "description_cn": "<string>",
  "display_name": "<string>",
  "display_name_cn": "<string>",
  "icon_url": "<string>",
  "id": "<string>",
  "oauth_client_registration": "<string>",
  "oauth_scopes": "<string>",
  "origin": "<string>",
  "revision": 0,
  "server_key": "<string>",
  "source_type": "official",
  "status": "<string>",
  "transport": "<string>",
  "updated_at": "2026-08-27T10:00:00Z",
  "url": "<string>",
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
