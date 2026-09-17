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
sourceRel: "md/developer-users-user-sync-list-directory-source.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-users-user-sync-list-directory-source.md"
sourceSha256: "6c297825548b1239b3489e68cd0b60c9c818079982e6d8794947efce0073dea3"
pageSha256: "6c297825548b1239b3489e68cd0b60c9c818079982e6d8794947efce0073dea3"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

读取组织已配置的通讯录数据源，查看来源类型、连接状态、同步计划和配置修订号。响应提供凭据是否已配置的标记，不返回连接密钥。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>用户同步配置读取（读取）</td> <td>directory-sync-config</td> <td>admin.v1.directory-sync-config.read</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
GET /api/openapi/v1/directory-sync/sources
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
  --url '<BASE_URL>/api/openapi/v1/directory-sync/sources' \
  --header 'Authorization: Bearer <API_KEY>'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>sources</td> <td>array\&lt;OpenapifacadeDirectorySource\&gt;</td> <td>是</td> <td>当前组织的数据源配置列表。</td> <td>\[\{"config_revision":0,"connection_status":"\&lt;string\&gt;","created_at":"2026-08-27T10:00:00Z","created_by_email":"\&lt;string\&gt;","created_by_name":"\&lt;string\&gt;","credential_configured":false,"default_seat":false,"deletion_alert_email":"\&lt;string\&gt;","deletion_alert_enabled":false,"deletion_alert_threshold":0,"deletion_policy":"\&lt;string\&gt;","external_id_field":"\&lt;string\&gt;","external_id_field_locked":false,"id":"\&lt;uuid\&gt;","last_activity_at":"2026-08-27T10:00:00Z","last_connected_at":"2026-08-27T10:00:00Z","last_connection_error_code":"\&lt;string\&gt;","modified_at":"2026-08-27T10:00:00Z","name":"\&lt;string\&gt;","next_run_at":"2026-08-27T10:00:00Z","schedule":"\&lt;string\&gt;","schedule_anchor_at":"2026-08-27T10:00:00Z","settings":\{"connection":\{"client_name":"\&lt;string\&gt;","tls_enabled":false,"url":"\&lt;string\&gt;"\},"department_mapping":\{"external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","order":"\&lt;string\&gt;","parent_external_id":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\},"mapping":\{"account":"\&lt;string\&gt;","department_external_id":"\&lt;string\&gt;","email":"\&lt;string\&gt;","employee_no":"\&lt;string\&gt;","external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","phone":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\},"scope":\{"base_dn":"\&lt;string\&gt;","mode":"all","org_unit_external_ids":\["\&lt;string\&gt;"\],"org_unit_filter":"\&lt;string\&gt;","user_filter":"\&lt;string\&gt;"&#125;&#125;,"source_type":"\&lt;string\&gt;","status":"\&lt;string\&gt;","updated_by_email":"\&lt;string\&gt;","updated_by_name":"\&lt;string\&gt;"\}\]</td> </tr> <tr> <td>sources\[\].config_revision</td> <td>integer · int64</td> <td>是</td> <td>数据源配置修订号，用于检查并发修改。</td> <td>0</td> </tr> <tr> <td>sources\[\].connection_status</td> <td>string</td> <td>是</td> <td>数据源连接的当前状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>sources\[\].created_by_email</td> <td>string</td> <td>否</td> <td>创建者的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].created_by_name</td> <td>string</td> <td>否</td> <td>创建者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].credential_configured</td> <td>boolean</td> <td>是</td> <td>是否已为此数据源配置连接凭据。</td> <td>false</td> </tr> <tr> <td>sources\[\].default_seat</td> <td>boolean</td> <td>是</td> <td>是否默认向新同步的用户分配席位。</td> <td>false</td> </tr> <tr> <td>sources\[\].deletion_alert_email</td> <td>string</td> <td>否</td> <td>接收删除告警的邮箱地址。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].deletion_alert_enabled</td> <td>boolean</td> <td>是</td> <td>是否对同步中的删除情况启用告警。</td> <td>false</td> </tr> <tr> <td>sources\[\].deletion_alert_threshold</td> <td>integer · int64</td> <td>是</td> <td>触发删除告警的人数阈值。</td> <td>0</td> </tr> <tr> <td>sources\[\].deletion_policy</td> <td>string</td> <td>是</td> <td>来源用户被删除或停用时的处理策略。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].external_id_field</td> <td>string</td> <td>是</td> <td>当前选作外部用户唯一标识的来源字段。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].external_id_field_locked</td> <td>boolean</td> <td>是</td> <td>外部用户标识字段是否已锁定。</td> <td>false</td> </tr> <tr> <td>sources\[\].id</td> <td>string · uuid</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>sources\[\].last_activity_at</td> <td>string · date-time</td> <td>否</td> <td>此数据源最近一次活动的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>sources\[\].last_connected_at</td> <td>string · date-time</td> <td>否</td> <td>最近一次成功连接来源系统的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>sources\[\].last_connection_error_code</td> <td>string</td> <td>否</td> <td>最近一次连接失败的错误码。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].modified_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次修改的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>sources\[\].name</td> <td>string</td> <td>是</td> <td>通讯录数据源的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].next_run_at</td> <td>string · date-time</td> <td>否</td> <td>下一次计划执行同步的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>sources\[\].schedule</td> <td>string</td> <td>是</td> <td>同步计划：manual 为手动，daily 为每天，every_6_hours 为每 6 小时。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].schedule_anchor_at</td> <td>string · date-time</td> <td>否</td> <td>计算定时同步计划时使用的起始时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>sources\[\].settings</td> <td>OpenapifacadeDirectorySourceSettings</td> <td>是</td> <td>数据源的连接、字段映射和同步范围配置。</td> <td>\{"connection":\{"client_name":"\&lt;string\&gt;","tls_enabled":false,"url":"\&lt;string\&gt;"\},"department_mapping":\{"external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","order":"\&lt;string\&gt;","parent_external_id":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\},"mapping":\{"account":"\&lt;string\&gt;","department_external_id":"\&lt;string\&gt;","email":"\&lt;string\&gt;","employee_no":"\&lt;string\&gt;","external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","phone":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\},"scope":\{"base_dn":"\&lt;string\&gt;","mode":"all","org_unit_external_ids":\["\&lt;string\&gt;"\],"org_unit_filter":"\&lt;string\&gt;","user_filter":"\&lt;string\&gt;"&#125;&#125;</td> </tr> <tr> <td>sources\[\].settings.connection</td> <td>OpenapifacadeDirectorySourceConnection</td> <td>是</td> <td>数据源的服务连接设置。</td> <td>\{"client_name":"\&lt;string\&gt;","tls_enabled":false,"url":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>sources\[\].settings.connection.client_name</td> <td>string</td> <td>否</td> <td>SCIM 调用方的名称。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.connection.tls_enabled</td> <td>boolean</td> <td>否</td> <td>是否为目录连接启用 TLS 加密。</td> <td>false</td> </tr> <tr> <td>sources\[\].settings.connection.url</td> <td>string</td> <td>否</td> <td>LDAP 等来源服务的连接地址。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.department_mapping</td> <td>OpenapifacadeDirectorySourceDepartmentMapping</td> <td>是</td> <td>来源部门属性到千问办公部门字段的映射。</td> <td>\{"external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","order":"\&lt;string\&gt;","parent_external_id":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>sources\[\].settings.department_mapping.external_id</td> <td>string</td> <td>是</td> <td>来源数据中用于映射外部唯一标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.department_mapping.name</td> <td>string</td> <td>是</td> <td>来源数据中用于映射名称的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.department_mapping.order</td> <td>string</td> <td>否</td> <td>来源数据中用于映射排序值的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.department_mapping.parent_external_id</td> <td>string</td> <td>否</td> <td>来源数据中用于映射上级部门外部标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.department_mapping.status</td> <td>string</td> <td>否</td> <td>来源数据中用于映射状态的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.mapping</td> <td>OpenapifacadeDirectorySourceFieldMapping</td> <td>是</td> <td>成员属性到千问办公用户字段的映射。</td> <td>\{"account":"\&lt;string\&gt;","department_external_id":"\&lt;string\&gt;","email":"\&lt;string\&gt;","employee_no":"\&lt;string\&gt;","external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","phone":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>sources\[\].settings.mapping.account</td> <td>string</td> <td>否</td> <td>来源数据中用于映射账号的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.mapping.department_external_id</td> <td>string</td> <td>否</td> <td>来源数据中用于映射所属部门外部标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.mapping.email</td> <td>string</td> <td>否</td> <td>来源数据中用于映射邮箱的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.mapping.employee_no</td> <td>string</td> <td>否</td> <td>来源数据中用于映射工号的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.mapping.external_id</td> <td>string</td> <td>是</td> <td>来源数据中用于映射外部唯一标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.mapping.name</td> <td>string</td> <td>是</td> <td>来源数据中用于映射名称的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.mapping.phone</td> <td>string</td> <td>否</td> <td>来源数据中用于映射手机号的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.mapping.status</td> <td>string</td> <td>否</td> <td>来源数据中用于映射状态的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.scope</td> <td>OpenapifacadeDirectorySourceScope</td> <td>是</td> <td>需要从来源目录读取的组织或搜索范围。</td> <td>\{"base_dn":"\&lt;string\&gt;","mode":"all","org_unit_external_ids":\["\&lt;string\&gt;"\],"org_unit_filter":"\&lt;string\&gt;","user_filter":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>sources\[\].settings.scope.base_dn</td> <td>string</td> <td>否</td> <td>LDAP 搜索的根 DN，用于限定读取范围。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.scope.mode</td> <td>string</td> <td>是</td> <td>同步范围：all 为全部，departments 为指定部门，base_dn 为 LDAP 搜索根，administrative_units 为管理单元。</td> <td>"all"</td> </tr> <tr> <td>sources\[\].settings.scope.org_unit_external_ids</td> <td>array \| null</td> <td>否</td> <td>需要同步的来源部门或管理单元标识列表。 最多项数：200。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>sources\[\].settings.scope.org_unit_filter</td> <td>string</td> <td>否</td> <td>筛选来源部门的目录查询条件。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].settings.scope.user_filter</td> <td>string</td> <td>否</td> <td>筛选来源用户的目录查询条件。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].source_type</td> <td>string</td> <td>是</td> <td>通讯录来源类型，用于选择钉钉、飞书、企业微信、AD、LDAP、Entra ID 或 SCIM 的接入方式。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].status</td> <td>string</td> <td>是</td> <td>此记录当前所处的状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].updated_by_email</td> <td>string</td> <td>否</td> <td>最后修改者的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>sources\[\].updated_by_name</td> <td>string</td> <td>否</td> <td>最后修改者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
{
  "sources": [
    {
      "config_revision": 0,
      "connection_status": "<string>",
      "created_at": "2026-08-27T10:00:00Z",
      "created_by_email": "<string>",
      "created_by_name": "<string>",
      "credential_configured": false,
      "default_seat": false,
      "deletion_alert_email": "<string>",
      "deletion_alert_enabled": false,
      "deletion_alert_threshold": 0,
      "deletion_policy": "<string>",
      "external_id_field": "<string>",
      "external_id_field_locked": false,
      "id": "<uuid>",
      "last_activity_at": "2026-08-27T10:00:00Z",
      "last_connected_at": "2026-08-27T10:00:00Z",
      "last_connection_error_code": "<string>",
      "modified_at": "2026-08-27T10:00:00Z",
      "name": "<string>",
      "next_run_at": "2026-08-27T10:00:00Z",
      "schedule": "<string>",
      "schedule_anchor_at": "2026-08-27T10:00:00Z",
      "settings": {
        "connection": {
          "client_name": "<string>",
          "tls_enabled": false,
          "url": "<string>"
        },
        "department_mapping": {
          "external_id": "<string>",
          "name": "<string>",
          "order": "<string>",
          "parent_external_id": "<string>",
          "status": "<string>"
        },
        "mapping": {
          "account": "<string>",
          "department_external_id": "<string>",
          "email": "<string>",
          "employee_no": "<string>",
          "external_id": "<string>",
          "name": "<string>",
          "phone": "<string>",
          "status": "<string>"
        },
        "scope": {
          "base_dn": "<string>",
          "mode": "all",
          "org_unit_external_ids": [
            null
          ],
          "org_unit_filter": "<string>",
          "user_filter": "<string>"
        }
      },
      "source_type": "<string>",
      "status": "<string>",
      "updated_by_email": "<string>",
      "updated_by_name": "<string>"
    }
  ]
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
