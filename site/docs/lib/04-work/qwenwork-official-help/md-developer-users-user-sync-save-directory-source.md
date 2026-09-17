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
sourceRel: "md/developer-users-user-sync-save-directory-source.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-users-user-sync-save-directory-source.md"
sourceSha256: "1fe9af7322758558a6c925e8b67486002d6bf64fe342735519fd68e4fc031677"
pageSha256: "1fe9af7322758558a6c925e8b67486002d6bf64fe342735519fd68e4fc031677"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

在指定 sourceId 下创建或替换通讯录数据源配置，包含连接参数、字段映射、同步范围和计划。创建时 config_revision 为 0；更新时填写最新修订号，且不能改变 source_type。修改连接参数时，非 SCIM 数据源会先进行连接检查。

## 所需权限
<table> <thead> <tr> <td>所需权限</td> <td>资源</td> <td>Scope</td> <td>资源服务</td> </tr> </thead> <tbody> <tr> <td>用户同步配置管理（管理）</td> <td>directory-sync-config</td> <td>admin.v1.directory-sync-config.manage</td> <td>qwenwork-biz-service</td> </tr> </tbody> </table>

```
HELPCODEESCAPE-http
PUT /api/openapi/v1/directory-sync/sources/{sourceId}
```

## 认证与请求头
使用应用 API Key 调用。当前接口校验上方独立 Scope；读取、管理与执行权限互不包含。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer qwk_\*\*\*</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> </tbody> </table>

## 请求参数
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>sourceId</td> <td>path</td> <td>string · uuid</td> <td>必填</td> <td>数据源的稳定 UUID。创建时由调用方指定，更新时使用已有数据源的标识。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>Idempotency-Key</td> <td>header</td> <td>string</td> <td>必填</td> <td>本次写操作的幂等键。同一操作重试时复用相同键和请求内容，避免重复处理。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>config_revision</td> <td>body</td> <td>integer · int64</td> <td>否</td> <td>创建新数据源时为 0；更新已有数据源时填写最新读取的 config_revision。 最小值：1。</td> <td>1</td> </tr> <tr> <td>credentials</td> <td>body</td> <td>OpenapifacadeDirectorySourceCredentials</td> <td>否</td> <td>连接来源系统的应用凭据或目录密码；仅接受写入，不在响应中返回。</td> <td>\{"agent_id":"\&lt;string\&gt;","app_id":"\&lt;string\&gt;","app_secret":"\&lt;string\&gt;","bind_dn":"\&lt;string\&gt;","bind_password":"\&lt;string\&gt;","client_id":"\&lt;string\&gt;","client_secret":"\&lt;string\&gt;","corp_id":"\&lt;string\&gt;","secret":"\&lt;string\&gt;","tenant_id":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>credentials.agent_id</td> <td>body</td> <td>string</td> <td>否</td> <td>企业微信自建应用的 Agent ID。 最多字符数：512。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credentials.app_id</td> <td>body</td> <td>string</td> <td>否</td> <td>来源系统提供的应用标识。 最多字符数：512。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credentials.app_secret</td> <td>body</td> <td>string</td> <td>否</td> <td>与 App ID 对应的应用密钥。 最多字符数：4096。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credentials.bind_dn</td> <td>body</td> <td>string</td> <td>否</td> <td>用于绑定 LDAP 目录的服务账号 DN。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credentials.bind_password</td> <td>body</td> <td>string</td> <td>否</td> <td>LDAP 绑定账号的密码。 最多字符数：4096。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credentials.client_id</td> <td>body</td> <td>string</td> <td>否</td> <td>来源系统应用的客户端标识。 最多字符数：512。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credentials.client_secret</td> <td>body</td> <td>string</td> <td>否</td> <td>与 Client ID 对应的客户端密钥。 最多字符数：4096。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credentials.corp_id</td> <td>body</td> <td>string</td> <td>否</td> <td>企业微信的企业标识。 最多字符数：512。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credentials.secret</td> <td>body</td> <td>string</td> <td>否</td> <td>企业微信应用的 Secret。 最多字符数：4096。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credentials.tenant_id</td> <td>body</td> <td>string</td> <td>否</td> <td>Microsoft Entra ID 的租户标识。 最多字符数：512。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>default_seat</td> <td>body</td> <td>boolean</td> <td>必填</td> <td>是否默认向新同步的用户分配席位。</td> <td>false</td> </tr> <tr> <td>deletion_alert_email</td> <td>body</td> <td>string</td> <td>否</td> <td>接收删除告警的邮箱地址。 最多字符数：320。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>deletion_alert_enabled</td> <td>body</td> <td>boolean</td> <td>必填</td> <td>是否对同步中的删除情况启用告警。</td> <td>false</td> </tr> <tr> <td>deletion_alert_threshold</td> <td>body</td> <td>integer · int64</td> <td>必填</td> <td>触发删除告警的人数阈值。 最小值：0。</td> <td>0</td> </tr> <tr> <td>deletion_policy</td> <td>body</td> <td>string</td> <td>必填</td> <td>来源用户被删除或停用时的处理策略。 可选值：delete_user、deactivate_only、deactivate_and_reclaim_seat。</td> <td>"delete_user"</td> </tr> <tr> <td>initial_scim_token</td> <td>body</td> <td>string</td> <td>否</td> <td>首次配置 SCIM 接入使用的令牌，只作为输入。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>name</td> <td>body</td> <td>string</td> <td>必填</td> <td>通讯录数据源的名称。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>schedule</td> <td>body</td> <td>string</td> <td>必填</td> <td>同步计划：manual 为手动，daily 为每天，every_6_hours 为每 6 小时。</td> <td>"manual"</td> </tr> <tr> <td>schedule_anchor_at</td> <td>body</td> <td>string · date-time</td> <td>否</td> <td>计算定时同步计划时使用的起始时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>settings</td> <td>body</td> <td>OpenapifacadeDirectorySourceSettings</td> <td>必填</td> <td>数据源的连接、字段映射和同步范围配置。</td> <td>\{"connection":\{"client_name":"\&lt;string\&gt;","tls_enabled":false,"url":"\&lt;string\&gt;"\},"department_mapping":\{"external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","order":"\&lt;string\&gt;","parent_external_id":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\},"mapping":\{"account":"\&lt;string\&gt;","department_external_id":"\&lt;string\&gt;","email":"\&lt;string\&gt;","employee_no":"\&lt;string\&gt;","external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","phone":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\},"scope":\{"base_dn":"\&lt;string\&gt;","mode":"all","org_unit_external_ids":\["\&lt;string\&gt;"\],"org_unit_filter":"\&lt;string\&gt;","user_filter":"\&lt;string\&gt;"&#125;&#125;</td> </tr> <tr> <td>settings.connection</td> <td>body</td> <td>OpenapifacadeDirectorySourceConnection</td> <td>必填</td> <td>数据源的服务连接设置。</td> <td>\{"client_name":"\&lt;string\&gt;","tls_enabled":false,"url":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>settings.connection.client_name</td> <td>body</td> <td>string</td> <td>否</td> <td>SCIM 调用方的名称。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.connection.tls_enabled</td> <td>body</td> <td>boolean</td> <td>否</td> <td>是否为目录连接启用 TLS 加密。</td> <td>false</td> </tr> <tr> <td>settings.connection.url</td> <td>body</td> <td>string</td> <td>否</td> <td>LDAP 等来源服务的连接地址。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping</td> <td>body</td> <td>OpenapifacadeDirectorySourceDepartmentMapping</td> <td>必填</td> <td>来源部门属性到千问办公部门字段的映射。</td> <td>\{"external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","order":"\&lt;string\&gt;","parent_external_id":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>settings.department_mapping.external_id</td> <td>body</td> <td>string</td> <td>必填</td> <td>来源数据中用于映射外部唯一标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping.name</td> <td>body</td> <td>string</td> <td>必填</td> <td>来源数据中用于映射名称的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping.order</td> <td>body</td> <td>string</td> <td>否</td> <td>来源数据中用于映射排序值的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping.parent_external_id</td> <td>body</td> <td>string</td> <td>否</td> <td>来源数据中用于映射上级部门外部标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping.status</td> <td>body</td> <td>string</td> <td>否</td> <td>来源数据中用于映射状态的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping</td> <td>body</td> <td>OpenapifacadeDirectorySourceFieldMapping</td> <td>必填</td> <td>成员属性到千问办公用户字段的映射。</td> <td>\{"account":"\&lt;string\&gt;","department_external_id":"\&lt;string\&gt;","email":"\&lt;string\&gt;","employee_no":"\&lt;string\&gt;","external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","phone":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>settings.mapping.account</td> <td>body</td> <td>string</td> <td>否</td> <td>来源数据中用于映射账号的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.department_external_id</td> <td>body</td> <td>string</td> <td>否</td> <td>来源数据中用于映射所属部门外部标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.email</td> <td>body</td> <td>string</td> <td>否</td> <td>来源数据中用于映射邮箱的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.employee_no</td> <td>body</td> <td>string</td> <td>否</td> <td>来源数据中用于映射工号的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.external_id</td> <td>body</td> <td>string</td> <td>必填</td> <td>来源数据中用于映射外部唯一标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.name</td> <td>body</td> <td>string</td> <td>必填</td> <td>来源数据中用于映射名称的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.phone</td> <td>\&lt;div data-cangjie-key="1523" data-cangjie-leaf-block="true" data-t\[Truncated\]</td> <td></td> <td></td> <td></td> <td></td> </tr> </tbody> </table>

## 请求示例
将 \&lt;BASE_URL\> 替换为企业部署的千问办公 API 服务地址，并填写实际参数。示例中的占位值不能直接用于请求。

```
HELPCODEESCAPE-text
curl --request PUT \
  --url '<BASE_URL>/api/openapi/v1/directory-sync/sources/<sourceId>' \
  --header 'Authorization: Bearer <API_KEY>' \
  --header 'Idempotency-Key: <UNIQUE_REQUEST_ID>' \
  --header 'Content-Type: application/json' \
  --data '{
  "config_revision": 1,
  "credentials": {
    "agent_id": "<string>",
    "app_id": "<string>",
    "app_secret": "<string>",
    "bind_dn": "<string>",
    "bind_password": "<string>",
    "client_id": "<string>",
    "client_secret": "<string>",
    "corp_id": "<string>",
    "secret": "<string>",
    "tenant_id": "<string>"
  },
  "default_seat": false,
  "deletion_alert_email": "<string>",
  "deletion_alert_enabled": false,
  "deletion_alert_threshold": 0,
  "deletion_policy": "delete_user",
  "initial_scim_token": "<string>",
  "name": "<string>",
  "schedule": "manual",
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
        "<string>"
      ],
      "org_unit_filter": "<string>",
      "user_filter": "<string>"
    }
  },
  "source_type": "dingtalk"
}'
```

## 响应
### 200 请求成功，返回当前或更新后的数据。

<table> <thead> <tr> <td>名称</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>config_revision</td> <td>integer · int64</td> <td>是</td> <td>数据源配置修订号，用于检查并发修改。</td> <td>0</td> </tr> <tr> <td>connection_status</td> <td>string</td> <td>是</td> <td>数据源连接的当前状态。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>created_at</td> <td>string · date-time</td> <td>是</td> <td>此记录的创建时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>created_by_email</td> <td>string</td> <td>否</td> <td>创建者的邮箱。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>created_by_name</td> <td>string</td> <td>否</td> <td>创建者的姓名。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>credential_configured</td> <td>boolean</td> <td>是</td> <td>是否已为此数据源配置连接凭据。</td> <td>false</td> </tr> <tr> <td>default_seat</td> <td>boolean</td> <td>是</td> <td>是否默认向新同步的用户分配席位。</td> <td>false</td> </tr> <tr> <td>deletion_alert_email</td> <td>string</td> <td>否</td> <td>接收删除告警的邮箱地址。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>deletion_alert_enabled</td> <td>boolean</td> <td>是</td> <td>是否对同步中的删除情况启用告警。</td> <td>false</td> </tr> <tr> <td>deletion_alert_threshold</td> <td>integer · int64</td> <td>是</td> <td>触发删除告警的人数阈值。</td> <td>0</td> </tr> <tr> <td>deletion_policy</td> <td>string</td> <td>是</td> <td>来源用户被删除或停用时的处理策略。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>external_id_field</td> <td>string</td> <td>是</td> <td>当前选作外部用户唯一标识的来源字段。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>external_id_field_locked</td> <td>boolean</td> <td>是</td> <td>外部用户标识字段是否已锁定。</td> <td>false</td> </tr> <tr> <td>id</td> <td>string · uuid</td> <td>是</td> <td>此记录的唯一标识，查询、更新或删除对应记录时使用。</td> <td>"\&lt;uuid\&gt;"</td> </tr> <tr> <td>last_activity_at</td> <td>string · date-time</td> <td>否</td> <td>此数据源最近一次活动的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>last_connected_at</td> <td>string · date-time</td> <td>否</td> <td>最近一次成功连接来源系统的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>last_connection_error_code</td> <td>string</td> <td>否</td> <td>最近一次连接失败的错误码。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>modified_at</td> <td>string · date-time</td> <td>是</td> <td>此记录最后一次修改的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>name</td> <td>string</td> <td>是</td> <td>通讯录数据源的名称。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>next_run_at</td> <td>string · date-time</td> <td>否</td> <td>下一次计划执行同步的时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>schedule</td> <td>string</td> <td>是</td> <td>同步计划：manual 为手动，daily 为每天，every_6_hours 为每 6 小时。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>schedule_anchor_at</td> <td>string · date-time</td> <td>否</td> <td>计算定时同步计划时使用的起始时间。</td> <td>"2026-08-27T10:00:00Z"</td> </tr> <tr> <td>settings</td> <td>OpenapifacadeDirectorySourceSettings</td> <td>是</td> <td>数据源的连接、字段映射和同步范围配置。</td> <td>\{"connection":\{"client_name":"\&lt;string\&gt;","tls_enabled":false,"url":"\&lt;string\&gt;"\},"department_mapping":\{"external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","order":"\&lt;string\&gt;","parent_external_id":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\},"mapping":\{"account":"\&lt;string\&gt;","department_external_id":"\&lt;string\&gt;","email":"\&lt;string\&gt;","employee_no":"\&lt;string\&gt;","external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","phone":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\},"scope":\{"base_dn":"\&lt;string\&gt;","mode":"all","org_unit_external_ids":\["\&lt;string\&gt;"\],"org_unit_filter":"\&lt;string\&gt;","user_filter":"\&lt;string\&gt;"&#125;&#125;</td> </tr> <tr> <td>settings.connection</td> <td>OpenapifacadeDirectorySourceConnection</td> <td>是</td> <td>数据源的服务连接设置。</td> <td>\{"client_name":"\&lt;string\&gt;","tls_enabled":false,"url":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>settings.connection.client_name</td> <td>string</td> <td>否</td> <td>SCIM 调用方的名称。 最多字符数：255。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.connection.tls_enabled</td> <td>boolean</td> <td>否</td> <td>是否为目录连接启用 TLS 加密。</td> <td>false</td> </tr> <tr> <td>settings.connection.url</td> <td>string</td> <td>否</td> <td>LDAP 等来源服务的连接地址。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping</td> <td>OpenapifacadeDirectorySourceDepartmentMapping</td> <td>是</td> <td>来源部门属性到千问办公部门字段的映射。</td> <td>\{"external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","order":"\&lt;string\&gt;","parent_external_id":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>settings.department_mapping.external_id</td> <td>string</td> <td>是</td> <td>来源数据中用于映射外部唯一标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping.name</td> <td>string</td> <td>是</td> <td>来源数据中用于映射名称的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping.order</td> <td>string</td> <td>否</td> <td>来源数据中用于映射排序值的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping.parent_external_id</td> <td>string</td> <td>否</td> <td>来源数据中用于映射上级部门外部标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.department_mapping.status</td> <td>string</td> <td>否</td> <td>来源数据中用于映射状态的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping</td> <td>OpenapifacadeDirectorySourceFieldMapping</td> <td>是</td> <td>成员属性到千问办公用户字段的映射。</td> <td>\{"account":"\&lt;string\&gt;","department_external_id":"\&lt;string\&gt;","email":"\&lt;string\&gt;","employee_no":"\&lt;string\&gt;","external_id":"\&lt;string\&gt;","name":"\&lt;string\&gt;","phone":"\&lt;string\&gt;","status":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>settings.mapping.account</td> <td>string</td> <td>否</td> <td>来源数据中用于映射账号的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.department_external_id</td> <td>string</td> <td>否</td> <td>来源数据中用于映射所属部门外部标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.email</td> <td>string</td> <td>否</td> <td>来源数据中用于映射邮箱的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.employee_no</td> <td>string</td> <td>否</td> <td>来源数据中用于映射工号的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.external_id</td> <td>string</td> <td>是</td> <td>来源数据中用于映射外部唯一标识的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.name</td> <td>string</td> <td>是</td> <td>来源数据中用于映射名称的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.phone</td> <td>string</td> <td>否</td> <td>来源数据中用于映射手机号的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.mapping.status</td> <td>string</td> <td>否</td> <td>来源数据中用于映射状态的属性名称；填写字段名，不是某个成员或部门的实际值。 最多字符数：128。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.scope</td> <td>OpenapifacadeDirectorySourceScope</td> <td>是</td> <td>需要从来源目录读取的组织或搜索范围。</td> <td>\{"base_dn":"\&lt;string\&gt;","mode":"all","org_unit_external_ids":\["\&lt;string\&gt;"\],"org_unit_filter":"\&lt;string\&gt;","user_filter":"\&lt;string\&gt;"\}</td> </tr> <tr> <td>settings.scope.base_dn</td> <td>string</td> <td>否</td> <td>LDAP 搜索的根 DN，用于限定读取范围。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.scope.mode</td> <td>string</td> <td>是</td> <td>同步范围：all 为全部，departments 为指定部门，base_dn 为 LDAP 搜索根，administrative_units 为管理单元。</td> <td>"all"</td> </tr> <tr> <td>settings.scope.org_unit_external_ids</td> <td>array \| null</td> <td>否</td> <td>需要同步的来源部门或管理单元标识列表。 最多项数：200。</td> <td>\["\&lt;string\&gt;"\]</td> </tr> <tr> <td>settings.scope.org_unit_filter</td> <td>string</td> <td>否</td> <td>筛选来源部门的目录查询条件。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>settings.scope.user_filter</td> <td>string</td> <td>否</td> <td>筛选来源用户的目录查询条件。 最多字符数：2048。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>source_type</td> <td>string</td> <td>是</td> <td>通讯录来源类型，用于选择钉钉、飞书、企业微信、AD、LDAP、Entra ID 或 SCIM 的接入方式。</td> <td>"\&lt;string\&gt;"</td> </tr> <tr> <td>status</td> <td>\&lt;div data-cangjie-key="3425" data-cangjie-leaf-block="true" data-type="paragraph" dir="auto\[Truncated\]</td> <td></td> <td></td> <td></td> </tr> </tbody> </table>

```
HELPCODEESCAPE-json
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
        "<string>"
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
