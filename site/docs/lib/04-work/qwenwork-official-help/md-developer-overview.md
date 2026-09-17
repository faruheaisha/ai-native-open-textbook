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
sourceRel: "md/developer-overview.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/developer-overview.md"
sourceSha256: "908f8f5cb47a0cefcd5ac50ac9a82fb3150b55a8170996c354e7bd8e0218d394"
pageSha256: "908f8f5cb47a0cefcd5ac50ac9a82fb3150b55a8170996c354e7bd8e0218d394"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

按应用权限项授权后，调用单接口页面中的 Method、Path 与请求示例完成基础配置。
<table> <thead> <tr> <td>独立 Scope</td> <td>接口操作</td> <td>权限动作</td> </tr> </thead> <tbody> <tr> <td>41</td> <td>103</td> <td>read / manage / execute</td> </tr> </tbody> </table>

## 开始调用
1. **创建应用**：在开放平台创建或选择应用。
2. **授权权限项**：按用途独立勾选需要的读取、管理或执行权限项。
3. **创建 API Key**：凭据只在创建成功时完整展示，请立即安全保存。
4. **构造请求**：按接口文档构造请求，并使用请求 ID 排查问题。

## 认证方式
服务端应用使用开放平台创建的 API Key 调用接口。API Key 代表应用身份，服务端据此确定可信组织和应用已获授权的 Scope。

### 认证与请求头

所有接口共享以下请求头；单接口页面会按 Method 和请求体列出当前接口实际需要的请求头。
<table> <thead> <tr> <td>名称</td> <td>位置</td> <td>类型</td> <td>必填</td> <td>说明</td> <td>示例</td> </tr> </thead> <tbody> <tr> <td>Authorization</td> <td>header</td> <td>string</td> <td>是</td> <td>应用 API Key，使用 Bearer 方式传递。</td> <td>Bearer \&lt;API_KEY\&gt;</td> </tr> <tr> <td>X-Request-Id</td> <td>header</td> <td>string</td> <td>否</td> <td>可选的调用追踪标识；未传入时由服务端生成。</td> <td>req-20260831-001</td> </tr> <tr> <td>Content-Type</td> <td>header</td> <td>string</td> <td>有 JSON 请求体时</td> <td>请求体媒体类型，固定为 application/json。</td> <td>application/json</td> </tr> <tr> <td>Idempotency-Key</td> <td>header</td> <td>string</td> <td>按单接口文档</td> <td>部分写接口要求的幂等键，长度为 1--128 个可打印 ASCII 字符；相同输入重试时复用原值。</td> <td>idem-20260831-001</td> </tr> </tbody> </table>

API Key 和其他密钥只能保存在服务端密钥系统中，不得写入浏览器代码、日志、文档或截图。

### 应用身份与组织隔离

请求中的用户或组织标识不作为认证依据。服务端通过 API Key → App 推导可信 org_id，并按应用授权范围执行。

## 错误处理
先按 HTTP 状态和稳定业务错误码判断认证、授权、参数、资源或依赖服务问题。

### 错误码

业务服务错误响应使用统一的 error、detail、code 和可选 details 字段。请求追踪标识通过响应头 X-Request-Id 返回，不在响应正文中。下表只列出当前代码已明确实现的公共或代表性错误码。
<table> <thead> <tr> <td>HTTP</td> <td>错误类型</td> <td>错误码</td> <td>说明</td> <td>可重试</td> </tr> </thead> <tbody> <tr> <td>400</td> <td>BadRequest</td> <td>request_validation_failed</td> <td>Content-Type、JSON、revision 等请求格式无效。</td> <td>否</td> </tr> <tr> <td>401</td> <td>Unauthorized</td> <td>openapi_invalid_api_key</td> <td>API Key 缺失或无效。</td> <td>否</td> </tr> <tr> <td>403</td> <td>Forbidden</td> <td>openapi_scope_denied</td> <td>API Key 未获得当前接口要求的独立 Scope。</td> <td>否</td> </tr> <tr> <td>404</td> <td>NotFound</td> <td>authn_openapi_not_enabled</td> <td>OpenAPI 接口未启用或未在网关目录注册。</td> <td>否</td> </tr> <tr> <td>404</td> <td>NotFound</td> <td>department_not_found</td> <td>指定部门不存在；这是当前部门接口已实现的资源错误码示例。</td> <td>否</td> </tr> <tr> <td>422</td> <td>UnprocessableEntity</td> <td>request_validation_failed</td> <td>UUID、分页、字段或 Idempotency-Key 等语义校验失败。</td> <td>否</td> </tr> <tr> <td>503</td> <td>ServiceUnavailable</td> <td>iam_openapi_execution_unavailable</td> <td>IAM 内部执行链路或相关 OpenAPI 能力暂时不可用。</td> <td>是</td> </tr> </tbody> </table>

### 错误响应示例

```
HELPCODEESCAPE-json
{
  "error": "UnprocessableEntity",
  "detail": "Idempotency-Key is required.",
  "code": "request_validation_failed"
}
```

### 排查与重试顺序

先校验请求格式和 API Key，再核对接口 Scope，随后确认资源状态。仅在 503 或明确可重试的网关错误下退避重试；写接口必须复用原 Idempotency-Key 和完全相同的请求内容。使用响应头 X-Request-Id 关联日志和排查调用链。

## 当前可用接口
按功能查看各接口的用途、参数和响应说明。

### 组织管理 / 管理员角色

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>读取菜单权限目录接口</td> <td>GET</td> <td>/api/openapi/v1/admin-menu-permissions</td> <td>openAPIListAdminMenuPermissions</td> </tr> <tr> <td>查询管理员角色接口</td> <td>GET</td> <td>/api/openapi/v1/admin-roles</td> <td>openAPIListAdminRoles</td> </tr> <tr> <td>创建管理员角色接口</td> <td>POST</td> <td>/api/openapi/v1/admin-roles</td> <td>openAPICreateAdminRole</td> </tr> <tr> <td>删除管理员角色接口</td> <td>DELETE</td> <td>/api/openapi/v1/admin-roles/\{roleId\}</td> <td>openAPIDeleteAdminRole</td> </tr> <tr> <td>更新管理员角色接口</td> <td>PATCH</td> <td>/api/openapi/v1/admin-roles/\{roleId\}</td> <td>openAPIUpdateAdminRole</td> </tr> </tbody> </table>

### AI 资产管理 / 连接器

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>读取连接器访问策略接口</td> <td>GET</td> <td>/api/openapi/v1/connector-access-policy</td> <td>openAPIGetConnectorAccessPolicy</td> </tr> <tr> <td>更新连接器访问策略接口</td> <td>PATCH</td> <td>/api/openapi/v1/connector-access-policy</td> <td>openAPIUpdateConnectorAccessPolicy</td> </tr> <tr> <td>查询连接器分类接口</td> <td>GET</td> <td>/api/openapi/v1/connector-categories</td> <td>openAPIListConnectorCategories</td> </tr> <tr> <td>创建连接器分类接口</td> <td>POST</td> <td>/api/openapi/v1/connector-categories</td> <td>openAPICreateConnectorCategory</td> </tr> <tr> <td>删除连接器分类接口</td> <td>DELETE</td> <td>/api/openapi/v1/connector-categories/\{categoryId\}</td> <td>openAPIDeleteConnectorCategory</td> </tr> <tr> <td>更新连接器分类接口</td> <td>PATCH</td> <td>/api/openapi/v1/connector-categories/\{categoryId\}</td> <td>openAPIUpdateConnectorCategory</td> </tr> <tr> <td>查询连接器开放策略接口</td> <td>GET</td> <td>/api/openapi/v1/connector-policies</td> <td>openAPIListConnectorPolicies</td> </tr> <tr> <td>创建连接器开放策略接口</td> <td>POST</td> <td>/api/openapi/v1/connector-policies</td> <td>openAPICreateConnectorPolicy</td> </tr> <tr> <td>删除连接器开放策略接口</td> <td>DELETE</td> <td>/api/openapi/v1/connector-policies/\{policyId\}</td> <td>openAPIDeleteConnectorPolicy</td> </tr> <tr> <td>更新连接器开放策略接口</td> <td>PATCH</td> <td>/api/openapi/v1/connector-policies/\{policyId\}</td> <td>openAPIUpdateConnectorPolicy</td> </tr> <tr> <td>查询连接器接口</td> <td>GET</td> <td>/api/openapi/v1/connectors</td> <td>openAPIListConnectors</td> </tr> <tr> <td>删除连接器接口</td> <td>DELETE</td> <td>/api/openapi/v1/connectors/\{resourceId\}</td> <td>openAPIDeleteConnector</td> </tr> <tr> <td>更新连接器接口</td> <td>PATCH</td> <td>/api/openapi/v1/connectors/\{resourceId\}</td> <td>openAPIUpdateConnector</td> </tr> </tbody> </table>

### 用户管理 / 用户

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询部门列表接口</td> <td>GET</td> <td>/api/openapi/v1/departments</td> <td>openAPIListDepartments</td> </tr> <tr> <td>创建部门接口</td> <td>POST</td> <td>/api/openapi/v1/departments</td> <td>openAPICreateDepartment</td> </tr> <tr> <td>删除部门接口</td> <td>DELETE</td> <td>/api/openapi/v1/departments/\{departmentId\}</td> <td>openAPIDeleteDepartment</td> </tr> <tr> <td>更新部门接口</td> <td>PATCH</td> <td>/api/openapi/v1/departments/\{departmentId\}</td> <td>openAPIUpdateDepartment</td> </tr> <tr> <td>查询用户加入申请接口</td> <td>GET</td> <td>/api/openapi/v1/join-requests</td> <td>openAPIListJoinRequests</td> </tr> <tr> <td>处理用户加入申请接口</td> <td>POST</td> <td>/api/openapi/v1/join-requests/\{requestId\}/decision</td> <td>openAPIDecideJoinRequest</td> </tr> <tr> <td>查询席位申请接口</td> <td>GET</td> <td>/api/openapi/v1/seat-requests</td> <td>openAPIListSeatRequests</td> </tr> <tr> <td>处理席位申请接口</td> <td>POST</td> <td>/api/openapi/v1/seat-requests/\{requestId\}/decision</td> <td>openAPIDecideSeatRequest</td> </tr> <tr> <td>查询席位容量与分配接口</td> <td>GET</td> <td>/api/openapi/v1/seats</td> <td>openAPIListSeats</td> </tr> <tr> <td>查询用户列表接口</td> <td>GET</td> <td>/api/openapi/v1/users</td> <td>openAPIListUsers</td> </tr> <tr> <td>创建用户接口</td> <td>POST</td> <td>/api/openapi/v1/users</td> <td>openAPICreateUser</td> </tr> <tr> <td>删除用户接口</td> <td>DELETE</td> <td>/api/openapi/v1/users/\{userId\}</td> <td>openAPIDeleteUser</td> </tr> <tr> <td>更新用户接口</td> <td>PATCH</td> <td>/api/openapi/v1/users/\{userId\}</td> <td>openAPIUpdateUser</td> </tr> </tbody> </table>

### 用户管理 / 用户同步

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>启动用户同步接口</td> <td>POST</td> <td>/api/openapi/v1/directory-sync/runs</td> <td>openAPIRunDirectorySync</td> </tr> <tr> <td>查询同步任务状态接口</td> <td>GET</td> <td>/api/openapi/v1/directory-sync/runs/\{runId\}</td> <td>openAPIGetDirectorySyncRun</td> </tr> <tr> <td>查询目录数据源配置接口</td> <td>GET</td> <td>/api/openapi/v1/directory-sync/sources</td> <td>openAPIListDirectorySyncSources</td> </tr> <tr> <td>删除目录数据源配置接口</td> <td>DELETE</td> <td>/api/openapi/v1/directory-sync/sources/\{sourceId\}</td> <td>openAPIDeleteDirectorySyncSource</td> </tr> <tr> <td>保存目录数据源配置接口</td> <td>PUT</td> <td>/api/openapi/v1/directory-sync/sources/\{sourceId\}</td> <td>openAPIPutDirectorySyncSource</td> </tr> </tbody> </table>

### AI 资产管理 / 专家套件

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询专家套件分类接口</td> <td>GET</td> <td>/api/openapi/v1/expert-suite-categories</td> <td>openAPIListExpertSuiteCategories</td> </tr> <tr> <td>创建专家套件分类接口</td> <td>POST</td> <td>/api/openapi/v1/expert-suite-categories</td> <td>openAPICreateExpertSuiteCategory</td> </tr> <tr> <td>删除专家套件分类接口</td> <td>DELETE</td> <td>/api/openapi/v1/expert-suite-categories/\{categoryId\}</td> <td>openAPIDeleteExpertSuiteCategory</td> </tr> <tr> <td>更新专家套件分类接口</td> <td>PATCH</td> <td>/api/openapi/v1/expert-suite-categories/\{categoryId\}</td> <td>openAPIUpdateExpertSuiteCategory</td> </tr> <tr> <td>查询专家套件开放策略接口</td> <td>GET</td> <td>/api/openapi/v1/expert-suite-policies</td> <td>openAPIListExpertSuitePolicies</td> </tr> <tr> <td>创建专家套件开放策略接口</td> <td>POST</td> <td>/api/openapi/v1/expert-suite-policies</td> <td>openAPICreateExpertSuitePolicy</td> </tr> <tr> <td>删除专家套件开放策略接口</td> <td>DELETE</td> <td>/api/openapi/v1/expert-suite-policies/\{policyId\}</td> <td>openAPIDeleteExpertSuitePolicy</td> </tr> <tr> <td>更新专家套件开放策略接口</td> <td>PATCH</td> <td>/api/openapi/v1/expert-suite-policies/\{policyId\}</td> <td>openAPIUpdateExpertSuitePolicy</td> </tr> <tr> <td>查询专家套件上架申请接口</td> <td>GET</td> <td>/api/openapi/v1/expert-suite-upload-reviews</td> <td>openAPIListExpertSuiteUploadReviews</td> </tr> <tr> <td>处理专家套件上架申请接口</td> <td>POST</td> <td>/api/openapi/v1/expert-suite-upload-reviews/\{reviewId\}/decision</td> <td>openAPIDecideExpertSuiteUploadReview</td> </tr> <tr> <td>查询专家套件接口</td> <td>GET</td> <td>/api/openapi/v1/expert-suites</td> <td>openAPIListExpertSuites</td> </tr> <tr> <td>删除专家套件接口</td> <td>DELETE</td> <td>/api/openapi/v1/expert-suites/\{resourceId\}</td> <td>openAPIDeleteExpertSuite</td> </tr> <tr> <td>更新专家套件接口</td> <td>PATCH</td> <td>/api/openapi/v1/expert-suites/\{resourceId\}</td> <td>openAPIUpdateExpertSuite</td> </tr> </tbody> </table>

### 安全管控 / 可信设备

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询强制下线任务接口</td> <td>GET</td> <td>/api/openapi/v1/force-logout-tasks</td> <td>openAPIListForceLogoutTasks</td> </tr> <tr> <td>创建强制下线任务接口</td> <td>POST</td> <td>/api/openapi/v1/force-logout-tasks</td> <td>openAPICreateForceLogoutTask</td> </tr> <tr> <td>更新待执行下线任务接口</td> <td>PATCH</td> <td>/api/openapi/v1/force-logout-tasks/\{taskId\}</td> <td>openAPIUpdateForceLogoutTask</td> </tr> <tr> <td>取消待执行下线任务接口</td> <td>POST</td> <td>/api/openapi/v1/force-logout-tasks/\{taskId\}/cancellations</td> <td>openAPICancelForceLogoutTask</td> </tr> <tr> <td>查询可信设备策略接口</td> <td>GET</td> <td>/api/openapi/v1/trusted-device-policies</td> <td>openAPIListTrustedDevicePolicies</td> </tr> <tr> <td>创建可信设备策略接口</td> <td>POST</td> <td>/api/openapi/v1/trusted-device-policies</td> <td>openAPICreateTrustedDevicePolicy</td> </tr> <tr> <td>删除可信设备策略接口</td> <td>DELETE</td> <td>/api/openapi/v1/trusted-device-policies/\{policyId\}</td> <td>openAPIDeleteTrustedDevicePolicy</td> </tr> <tr> <td>更新可信设备策略接口</td> <td>PATCH</td> <td>/api/openapi/v1/trusted-device-policies/\{policyId\}</td> <td>openAPIUpdateTrustedDevicePolicy</td> </tr> </tbody> </table>

### 安全管控 / Hooks 规则

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询 Hooks 规则接口</td> <td>GET</td> <td>/api/openapi/v1/hook-policies</td> <td>openAPIListHookPolicies</td> </tr> <tr> <td>创建 Hooks 规则接口</td> <td>POST</td> <td>/api/openapi/v1/hook-policies</td> <td>openAPICreateHookPolicy</td> </tr> <tr> <td>删除 Hooks 规则接口</td> <td>DELETE</td> <td>/api/openapi/v1/hook-policies/\{policyId\}</td> <td>openAPIDeleteHookPolicy</td> </tr> <tr> <td>更新 Hooks 规则接口</td> <td>PATCH</td> <td>/api/openapi/v1/hook-policies/\{policyId\}</td> <td>openAPIUpdateHookPolicy</td> </tr> </tbody> </table>

### 安全管控 / IM 频道

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询 IM 频道接口</td> <td>GET</td> <td>/api/openapi/v1/im-channels</td> <td>openAPIListIMChannels</td> </tr> <tr> <td>更新 IM 频道接口</td> <td>PATCH</td> <td>/api/openapi/v1/im-channels/\{channelId\}</td> <td>openAPIUpdateIMChannel</td> </tr> </tbody> </table>

### 订阅与用量 / 限额管理

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>读取计量设置接口</td> <td>GET</td> <td>/api/openapi/v1/metering-policy</td> <td>openAPIGetMeteringPolicy</td> </tr> <tr> <td>更新计量设置接口</td> <td>PATCH</td> <td>/api/openapi/v1/metering-policy</td> <td>openAPIUpdateMeteringPolicy</td> </tr> <tr> <td>读取企业额度接口</td> <td>GET</td> <td>/api/openapi/v1/quota-balance</td> <td>openAPIGetQuotaBalance</td> </tr> <tr> <td>查询限额策略接口</td> <td>GET</td> <td>/api/openapi/v1/quota-policies</td> <td>openAPIListQuotaPolicies</td> </tr> <tr> <td>创建限额策略接口</td> <td>POST</td> <td>/api/openapi/v1/quota-policies</td> <td>openAPICreateQuotaPolicy</td> </tr> <tr> <td>删除限额策略接口</td> <td>DELETE</td> <td>/api/openapi/v1/quota-policies/\{policyId\}</td> <td>openAPIDeleteQuotaPolicy</td> </tr> <tr> <td>更新限额策略接口</td> <td>PATCH</td> <td>/api/openapi/v1/quota-policies/\{policyId\}</td> <td>openAPIUpdateQuotaPolicy</td> </tr> </tbody> </table>

### 模型管理 / 模型策略组

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询模型策略接口</td> <td>GET</td> <td>/api/openapi/v1/model-policies</td> <td>openAPIListModelPolicies</td> </tr> <tr> <td>创建模型策略接口</td> <td>POST</td> <td>/api/openapi/v1/model-policies</td> <td>openAPICreateModelPolicy</td> </tr> <tr> <td>删除模型策略接口</td> <td>DELETE</td> <td>/api/openapi/v1/model-policies/\{policyId\}</td> <td>openAPIDeleteModelPolicy</td> </tr> <tr> <td>更新模型策略接口</td> <td>PATCH</td> <td>/api/openapi/v1/model-policies/\{policyId\}</td> <td>openAPIUpdateModelPolicy</td> </tr> </tbody> </table>

### 安全管控 / 可信网络

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询可信网段接口</td> <td>GET</td> <td>/api/openapi/v1/network-ranges</td> <td>openAPIListNetworkRanges</td> </tr> <tr> <td>创建可信网段接口</td> <td>POST</td> <td>/api/openapi/v1/network-ranges</td> <td>openAPICreateNetworkRange</td> </tr> <tr> <td>删除可信网段接口</td> <td>DELETE</td> <td>/api/openapi/v1/network-ranges/\{rangeId\}</td> <td>openAPIDeleteNetworkRange</td> </tr> <tr> <td>更新可信网段接口</td> <td>PATCH</td> <td>/api/openapi/v1/network-ranges/\{rangeId\}</td> <td>openAPIUpdateNetworkRange</td> </tr> </tbody> </table>

### 开放平台 / 应用授权

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询应用接口</td> <td>GET</td> <td>/api/openapi/v1/open-platform/apps</td> <td>openAPIListOpenPlatformApps</td> </tr> </tbody> </table>

### 组织管理 / 组织信息

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>读取组织信息接口</td> <td>GET</td> <td>/api/openapi/v1/organization</td> <td>openAPIGetOrganization</td> </tr> <tr> <td>更新组织信息接口</td> <td>PATCH</td> <td>/api/openapi/v1/organization</td> <td>openAPIUpdateOrganization</td> </tr> <tr> <td>读取管理员登录地址配置接口</td> <td>GET</td> <td>/api/openapi/v1/organization/access-domain</td> <td>openAPIGetOrganizationAccessDomain</td> </tr> </tbody> </table>

### 安全管控 / 敏感词

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询敏感词库接口</td> <td>GET</td> <td>/api/openapi/v1/sensitive-word-libraries</td> <td>openAPIListSensitiveWordLibraries</td> </tr> <tr> <td>创建敏感词库接口</td> <td>POST</td> <td>/api/openapi/v1/sensitive-word-libraries</td> <td>openAPICreateSensitiveWordLibrary</td> </tr> <tr> <td>删除敏感词库接口</td> <td>DELETE</td> <td>/api/openapi/v1/sensitive-word-libraries/\{libraryId\}</td> <td>openAPIDeleteSensitiveWordLibrary</td> </tr> <tr> <td>更新敏感词库接口</td> <td>PATCH</td> <td>/api/openapi/v1/sensitive-word-libraries/\{libraryId\}</td> <td>openAPIUpdateSensitiveWordLibrary</td> </tr> </tbody> </table>

### AI 资产管理 / 技能

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询技能分类接口</td> <td>GET</td> <td>/api/openapi/v1/skill-categories</td> <td>openAPIListSkillCategories</td> </tr> <tr> <td>创建技能分类接口</td> <td>POST</td> <td>/api/openapi/v1/skill-categories</td> <td>openAPICreateSkillCategory</td> </tr> <tr> <td>删除技能分类接口</td> <td>DELETE</td> <td>/api/openapi/v1/skill-categories/\{categoryId\}</td> <td>openAPIDeleteSkillCategory</td> </tr> <tr> <td>更新技能分类接口</td> <td>PATCH</td> <td>/api/openapi/v1/skill-categories/\{categoryId\}</td> <td>openAPIUpdateSkillCategory</td> </tr> <tr> <td>查询技能开放策略接口</td> <td>GET</td> <td>/api/openapi/v1/skill-policies</td> <td>openAPIListSkillPolicies</td> </tr> <tr> <td>创建技能开放策略接口</td> <td>POST</td> <td>/api/openapi/v1/skill-policies</td> <td>openAPICreateSkillPolicy</td> </tr> <tr> <td>删除技能开放策略接口</td> <td>DELETE</td> <td>/api/openapi/v1/skill-policies/\{policyId\}</td> <td>openAPIDeleteSkillPolicy</td> </tr> <tr> <td>更新技能开放策略接口</td> <td>PATCH</td> <td>/api/openapi/v1/skill-policies/\{policyId\}</td> <td>openAPIUpdateSkillPolicy</td> </tr> <tr> <td>查询技能上架申请接口</td> <td>GET</td> <td>/api/openapi/v1/skill-upload-reviews</td> <td>openAPIListSkillUploadReviews</td> </tr> <tr> <td>处理技能上架申请接口</td> <td>POST</td> <td>/api/openapi/v1/skill-upload-reviews/\{reviewId\}/decision</td> <td>openAPIDecideSkillUploadReview</td> </tr> <tr> <td>查询技能接口</td> <td>GET</td> <td>/api/openapi/v1/skills</td> <td>openAPIListSkills</td> </tr> <tr> <td>删除技能接口</td> <td>DELETE</td> <td>/api/openapi/v1/skills/\{resourceId\}</td> <td>openAPIDeleteSkill</td> </tr> <tr> <td>更新技能接口</td> <td>PATCH</td> <td>/api/openapi/v1/skills/\{resourceId\}</td> <td>openAPIUpdateSkill</td> </tr> </tbody> </table>

### 用户管理 / 用户组

<table> <thead> <tr> <td>名称</td> <td>Method</td> <td>Path</td> <td>operationId</td> </tr> </thead> <tbody> <tr> <td>查询用户组接口</td> <td>GET</td> <td>/api/openapi/v1/user-groups</td> <td>openAPIListUserGroups</td> </tr> <tr> <td>创建用户组接口</td> <td>POST</td> <td>/api/openapi/v1/user-groups</td> <td>openAPICreateUserGroup</td> </tr> <tr> <td>删除用户组接口</td> <td>DELETE</td> <td>/api/openapi/v1/user-groups/\{groupId\}</td> <td>openAPIDeleteUserGroup</td> </tr> <tr> <td>更新用户组接口</td> <td>PATCH</td> <td>/api/openapi/v1/user-groups/\{groupId\}</td> <td>openAPIUpdateUserGroup</td> </tr> </tbody> </table>
