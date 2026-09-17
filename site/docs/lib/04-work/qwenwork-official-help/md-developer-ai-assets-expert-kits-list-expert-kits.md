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
sourceRel: "md/developer-ai-assets-expert-kits-list-expert-kits.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-ai-assets-expert-kits-list-expert-kits.md"
sourceSha256: "19059db429cd8d274518dc4588dea8ed18aef1022470d6f8d92638c104bb1ead"
pageSha256: "19059db429cd8d274518dc4588dea8ed18aef1022470d6f8d92638c104bb1ead"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

查询企业市场中的专家套件资源，按关键词、状态、来源和分类筛选。返回资源标识、展示信息和修订号，可用于定位需要维护的专家套件。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>专家套件读取（读取）</td> <td>expert-suites</td> <td>admin.v1.expert-suites.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/expert-suites
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>keyword</td> <td>query</td> <td>string</td> <td>否</td> <td>用于筛选此列表的搜索关键词。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>status</td> <td>query</td> <td>string</td> <td>否</td> <td>只返回此状态的记录；不填写时不按状态筛选。</td> <td>"draft"</td> </tr> <tr> <td>origin</td> <td>query</td> <td>string</td> <td>否</td> <td>资源来源筛选条件；默认 all，查询全部来源。 默认值："all"。</td> <td>"all"</td> </tr> <tr> <td>category_id</td> <td>query</td> <td>string · uuid</td> <td>否</td> <td>只查询此分类下的资源，填写分类列表返回的标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>page</td> <td>query</td> <td>integer · int64</td> <td>否</td> <td>请求的页码，从 1 开始。 默认值：1。 最小值：1。</td> <td>1</td> </tr> <tr> <td>page_size</td> <td>query</td> <td>integer · int64</td> <td>否</td> <td>每页返回的记录数量。 默认值：20。 最小值：1。 最大值：100。</td> <td>20</td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request GET \
  --url '<BASE_URL>/api/openapi/v1/expert-suites?keyword=<keyword>&status=<status>&origin=all&category_id=<category_id>&page=1&page_size=20' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>items</td> <td>array \| null</td> <td>是</td> <td>符合查询条件的当前页记录列表。</td> <td>\[\{"clients":\["\&lt;string\&gt;"\],"command_count":0,"connector_count":0,"connector_refs":\[\{"connector_id":"\&lt;string\&gt;","connector_origin":"\&lt;string\&gt;","required":false\}\],"created_at":"2026-08-27T10:00:00Z","created_by":"\&lt;string\&gt;","created_by_email":"\&lt;string\&gt;","created_by_name":"\&lt;string\&gt;","description":"\&lt;string\&gt;","description_cn":"\&lt;string\&gt;","display_name":"\&lt;string\&gt;","display_name_cn":"\&lt;string\&gt;","has_package":false,"icon_url":"\&lt;string\&gt;","id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","origin":"\&lt;string\&gt;","revision":0,"skill_count":0,"source_type":"official","status":"\&lt;string\&gt;","updated_at":"2026-08-27T10:00:00Z","updated_by":"\&lt;string\&gt;","updated_by_email":"\&lt;string\&gt;","updated_by_name":"\&lt;string\&gt;","version":"\&lt;string\&gt;"\}\]</td> </tr> <tr> <td>items\[\].clients</td> <td>array \| null</td> <td>是</td> <td>可使用此资源的客户端类型列表。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>items\[\].command_count</td> <td>integer · int64</td> <td>是</td> <td>专家套件包含的命令数量。</td> <td>0</td> </tr> <tr> <td>items\[\].connector_count</td> <td>integer · int64</td> <td>是</td> <td>专家套件引用的连接器数量。</td> <td>0</td> </tr> <tr> <td>items\[\].connector_refs</td> <td>array \| null</td> <td>是</td> <td>专家套件引用的连接器及其要求。</td> <td>\[\{"connector_id":"\&lt;string\&gt;","connector_origin":"\&lt;string\&gt;","required":false\}\]</td> </tr> <tr> <td>items\[\].connector_refs\[\].connector_id</td> <td>string</td> <td>是</td> <td>被引用连接器的标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].connector_refs\[\].connector_origin</td> <td>string</td> <td>是</td> <td>被引用连接器的来源。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].connector_refs\[\].required</td> <td>boolean</td> <td>是</td> <td>该连接器是否为专家套件必需的依赖。</td> <td>false</td> </tr> <tr> <td>items\[\].created_at</td> <td>string · date-time</td> <td>否</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].created_by</td> <td>string</td> <td>否</td> <td>创建者的用户标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].created_by_email</td> <td>string</td> <td>否</td> <td>创建者的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].created_by_name</td> <td>string</td> <td>否</td> <td>创建者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].description</td> <td>string</td> <td>是</td> <td>此对象的说明，用于补充名称之外的信息。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].description_cn</td> <td>string</td> <td>否</td> <td>资源的中文说明。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].display_name</td> <td>string</td> <td>否</td> <td>资源对外展示的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].display_name_cn</td> <td>string</td> <td>否</td> <td>资源对外展示的中文名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].has_package</td> <td>boolean</td> <td>是</td> <td>该资源是否包含可用的资源包。</td> <td>false</td> </tr> <tr> <td>items\[\].icon_url</td> <td>string</td> <td>否</td> <td>资源图标的访问地址。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].id</td> <td>string</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].name</td> <td>string</td> <td>是</td> <td>用于识别此对象的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].origin</td> <td>string</td> <td>是</td> <td>资源的来源类型，用于区分资源归属。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].revision</td> <td>integer · int64</td> <td>是</td> <td>当前记录的修订号，后续更新时用于校验并发修改。</td> <td>0</td> </tr> <tr> <td>items\[\].skill_count</td> <td>integer · int64</td> <td>是</td> <td>专家套件包含的技能数量。</td> <td>0</td> </tr> <tr> <td>items\[\].source_type</td> <td>string</td> <td>否</td> <td>资源来源的具体类型。 可选值：official。</td> <td>"official"</td> </tr> <tr> <td>items\[\].status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].updated_at</td> <td>string · date-time</td> <td>否</td> <td>此记录最后一次更新的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>items\[\].updated_by</td> <td>string</td> <td>否</td> <td>最后修改者的用户标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].updated_by_email</td> <td>string</td> <td>否</td> <td>最后修改者的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].updated_by_name</td> <td>string</td> <td>否</td> <td>最后修改者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>items\[\].version</td> <td>string</td> <td>否</td> <td>资源包的版本标识。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>next_cursor</td> <td>string</td> <td>否</td> <td>继续读取下一批结果时使用的游标；没有后续结果时为空。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>page</td> <td>integer · int64</td> <td>是</td> <td>当前结果页的页码，从 1 开始。</td> <td>0</td> </tr> <tr> <td>page_size</td> <td>integer · int64</td> <td>是</td> <td>每页返回的记录数。</td> <td>0</td> </tr> <tr> <td>total_pages</td> <td>integer · int64</td> <td>是</td> <td>按当前每页数量计算的总页数。</td> <td>0</td> </tr> <tr> <td>total_rows</td> <td>integer · int64</td> <td>是</td> <td>符合查询条件的记录总数。</td> <td>0</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "items": [
    {
      "clients": [
        "<string>"
      ],
      "command_count": 0,
      "connector_count": 0,
      "connector_refs": [
        {
          "connector_id": "<string>",
          "connector_origin": "<string>",
          "required": false
        }
      ],
      "created_at": "2026-08-27T10:00:00Z",
      "created_by": "<string>",
      "created_by_email": "<string>",
      "created_by_name": "<string>",
      "description": "<string>",
      "description_cn": "<string>",
      "display_name": "<string>",
      "display_name_cn": "<string>",
      "has_package": false,
      "icon_url": "<string>",
      "id": "<string>",
      "name": "<string>",
      "origin": "<string>",
      "revision": 0,
      "skill_count": 0,
      "source_type": "official",
      "status": "<string>",
      "updated_at": "2026-08-27T10:00:00Z",
      "updated_by": "<string>",
      "updated_by_email": "<string>",
      "updated_by_name": "<string>",
      "version": "<string>"
    }
  ],
  "next_cursor": "<string>",
  "page": 0,
  "page_size": 0,
  "total_pages": 0,
  "total_rows": 0
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
