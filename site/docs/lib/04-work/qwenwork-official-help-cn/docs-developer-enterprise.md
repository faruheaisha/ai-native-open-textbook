---
title: "qwenwork-official-help-cn"
sourceId: "04-work/qwenwork-official-help-cn"
sourceTitle: "qwenwork-official-help-cn"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.cn/docs"
entryUrl: "https://qwenwork.cn/docs"
sourceRel: "docs/developer/enterprise.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/developer/enterprise.md"
sourceSha256: "5aecce6606f6c962536a96fd4f65db9da2c399a543566dbab0698d84455aa7ec"
pageSha256: "5aecce6606f6c962536a96fd4f65db9da2c399a543566dbab0698d84455aa7ec"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 开发者文档 企业旗舰版开发者文档 接入概览
 通用官方知识库
接入概览
通过 API 配置 QwenWork 管理后台
 建议管理后台服务端 API

按应用权限项授权后，调用单接口页面中的 Method、Path 与请求示例完成基础配置。
独立 Scope接口操作权限动作
41103read / manage / execute

开始调用
- 创建应用：在开放平台创建或选择应用。
- 授权权限项：按用途独立勾选需要的读取、管理或执行权限项。
- 创建 API Key：凭据只在创建成功时完整展示，请立即安全保存。
- 构造请求：按接口文档构造请求，并使用请求 ID 排查问题。
认证方式
服务端应用使用开放平台创建的 API Key 调用接口。API Key 代表应用身份，服务端据此确定可信组织和应用已获授权的 Scope。
认证与请求头
所有接口共享以下请求头；单接口页面会按 Method 和请求体列出当前接口实际需要的请求头。
名称位置类型必填说明示例
Authorizationheaderstring是应用 API Key，使用 Bearer 方式传递。Bearer &lt;API_KEY>
X-Request-Idheaderstring否可选的调用追踪标识；未传入时由服务端生成。req-20260831-001
Content-Typeheaderstring有 JSON 请求体时请求体媒体类型，固定为 application/json。application/json
Idempotency-Keyheaderstring按单接口文档部分写接口要求的幂等键，长度为 1–128 个可打印 ASCII 字符；相同输入重试时复用原值。idem-20260831-001

API Key 和其他密钥只能保存在服务端密钥系统中，不得写入浏览器代码、日志、文档或截图。
应用身份与组织隔离
请求中的用户或组织标识不作为认证依据。服务端通过 API Key → App 推导可信 org_id，并按应用授权范围执行。
错误处理
先按 HTTP 状态和稳定业务错误码判断认证、授权、参数、资源或依赖服务问题。
错误码
业务服务错误响应使用统一的 error、detail、code 和可选 details 字段。请求追踪标识通过响应头 X-Request-Id 返回，不在响应正文中。下表只列出当前代码已明确实现的公共或代表性错误码。
HTTP错误类型错误码说明可重试
400BadRequestrequest_validation_failedContent-Type、JSON、revision 等请求格式无效。否
401Unauthorizedopenapi_invalid_api_keyAPI Key 缺失或无效。否
403Forbiddenopenapi_scope_deniedAPI Key 未获得当前接口要求的独立 Scope。否
404NotFoundauthn_openapi_not_enabledOpenAPI 接口未启用或未在网关目录注册。否
404NotFounddepartment_not_found指定部门不存在；这是当前部门接口已实现的资源错误码示例。否
422UnprocessableEntityrequest_validation_failedUUID、分页、字段或 Idempotency-Key 等语义校验失败。否
503ServiceUnavailableiam_openapi_execution_unavailableIAM 内部执行链路或相关 OpenAPI 能力暂时不可用。是

错误响应示例
\{
 "error": "UnprocessableEntity",
 "detail": "Idempotency-Key is required.",
 "code": "request_validation_failed"
\}
排查与重试顺序
先校验请求格式和 API Key，再核对接口 Scope，随后确认资源状态。仅在 503 或明确可重试的网关错误下退避重试；写接口必须复用原 Idempotency-Key 和完全相同的请求内容。使用响应头 X-Request-Id 关联日志和排查调用链。
当前可用接口
按功能查看各接口的用途、参数和响应说明。
组织管理 / 管理员角色
名称MethodPathoperationId
读取菜单权限目录接口GET/api/openapi/v1/admin-menu-permissionsopenAPIListAdminMenuPermissions
查询管理员角色接口GET/api/openapi/v1/admin-rolesopenAPIListAdminRoles
创建管理员角色接口POST/api/openapi/v1/admin-rolesopenAPICreateAdminRole
删除管理员角色接口DELETE/api/openapi/v1/admin-roles/\{roleId\}openAPIDeleteAdminRole
更新管理员角色接口PATCH/api/openapi/v1/admin-roles/\{roleId\}openAPIUpdateAdminRole

AI 资产管理 / 连接器
名称MethodPathoperationId
读取连接器访问策略接口GET/api/openapi/v1/connector-access-policyopenAPIGetConnectorAccessPolicy
更新连接器访问策略接口PATCH/api/openapi/v1/connector-access-policyopenAPIUpdateConnectorAccessPolicy
查询连接器分类接口GET/api/openapi/v1/connector-categoriesopenAPIListConnectorCategories
创建连接器分类接口POST/api/openapi/v1/connector-categoriesopenAPICreateConnectorCategory
删除连接器分类接口DELETE/api/openapi/v1/connector-categories/\{categoryId\}openAPIDeleteConnectorCategory
更新连接器分类接口PATCH/api/openapi/v1/connector-categories/\{categoryId\}openAPIUpdateConnectorCategory
查询连接器开放策略接口GET/api/openapi/v1/connector-policiesopenAPIListConnectorPolicies
创建连接器开放策略接口POST/api/openapi/v1/connector-policiesopenAPICreateConnectorPolicy
删除连接器开放策略接口DELETE/api/openapi/v1/connector-policies/\{policyId\}openAPIDeleteConnectorPolicy
更新连接器开放策略接口PATCH/api/openapi/v1/connector-policies/\{policyId\}openAPIUpdateConnectorPolicy
查询连接器接口GET/api/openapi/v1/connectorsopenAPIListConnectors
删除连接器接口DELETE/api/openapi/v1/connectors/\{resourceId\}openAPIDeleteConnector
更新连接器接口PATCH/api/openapi/v1/connectors/\{resourceId\}openAPIUpdateConnector

用户管理 / 用户
名称MethodPathoperationId
查询部门列表接口GET/api/openapi/v1/departmentsopenAPIListDepartments
创建部门接口POST/api/openapi/v1/departmentsopenAPICreateDepartment
删除部门接口DELETE/api/openapi/v1/departments/\{departmentId\}openAPIDeleteDepartment
更新部门接口PATCH/api/openapi/v1/departments/\{departmentId\}openAPIUpdateDepartment
查询用户加入申请接口GET/api/openapi/v1/join-requestsopenAPIListJoinRequests
处理用户加入申请接口POST/api/openapi/v1/join-requests/\{requestId\}/decisionopenAPIDecideJoinRequest
查询席位申请接口GET/api/openapi/v1/seat-requestsopenAPIListSeatRequests
处理席位申请接口POST/api/openapi/v1/seat-requests/\{requestId\}/decisionopenAPIDecideSeatRequest
查询席位容量与分配接口GET/api/openapi/v1/seatsopenAPIListSeats
查询用户列表接口GET/api/openapi/v1/usersopenAPIListUsers
创建用户接口POST/api/openapi/v1/usersopenAPICreateUser
删除用户接口DELETE/api/openapi/v1/users/\{userId\}openAPIDeleteUser
更新用户接口PATCH/api/openapi/v1/users/\{userId\}openAPIUpdateUser

用户管理 / 用户同步
名称MethodPathoperationId
启动用户同步接口POST/api/openapi/v1/directory-sync/runsopenAPIRunDirectorySync
查询同步任务状态接口GET/api/openapi/v1/directory-sync/runs/\{runId\}openAPIGetDirectorySyncRun
查询目录数据源配置接口GET/api/openapi/v1/directory-sync/sourcesopenAPIListDirectorySyncSources
删除目录数据源配置接口DELETE/api/openapi/v1/directory-sync/sources/\{sourceId\}openAPIDeleteDirectorySyncSource
保存目录数据源配置接口PUT/api/openapi/v1/directory-sync/sources/\{sourceId\}openAPIPutDirectorySyncSource

AI 资产管理 / 专家套件
名称MethodPathoperationId
查询专家套件分类接口GET/api/openapi/v1/expert-suite-categoriesopenAPIListExpertSuiteCategories
创建专家套件分类接口POST/api/openapi/v1/expert-suite-categoriesopenAPICreateExpertSuiteCategory
删除专家套件分类接口DELETE/api/openapi/v1/expert-suite-categories/\{categoryId\}openAPIDeleteExpertSuiteCategory
更新专家套件分类接口PATCH/api/openapi/v1/expert-suite-categories/\{categoryId\}openAPIUpdateExpertSuiteCategory
查询专家套件开放策略接口GET/api/openapi/v1/expert-suite-policiesopenAPIListExpertSuitePolicies
创建专家套件开放策略接口POST/api/openapi/v1/expert-suite-policiesopenAPICreateExpertSuitePolicy
删除专家套件开放策略接口DELETE/api/openapi/v1/expert-suite-policies/\{policyId\}openAPIDeleteExpertSuitePolicy
更新专家套件开放策略接口PATCH/api/openapi/v1/expert-suite-policies/\{policyId\}openAPIUpdateExpertSuitePolicy
查询专家套件上架申请接口GET/api/openapi/v1/expert-suite-upload-reviewsopenAPIListExpertSuiteUploadReviews
处理专家套件上架申请接口POST/api/openapi/v1/expert-suite-upload-reviews/\{reviewId\}/decisionopenAPIDecideExpertSuiteUploadReview
查询专家套件接口GET/api/openapi/v1/expert-suitesopenAPIListExpertSuites
删除专家套件接口DELETE/api/openapi/v1/expert-suites/\{resourceId\}openAPIDeleteExpertSuite
更新专家套件接口PATCH/api/openapi/v1/expert-suites/\{resourceId\}openAPIUpdateExpertSuite

安全管控 / 可信设备
名称MethodPathoperationId
查询强制下线任务接口GET/api/openapi/v1/force-logout-tasksopenAPIListForceLogoutTasks
创建强制下线任务接口POST/api/openapi/v1/force-logout-tasksopenAPICreateForceLogoutTask
更新待执行下线任务接口PATCH/api/openapi/v1/force-logout-tasks/\{taskId\}openAPIUpdateForceLogoutTask
取消待执行下线任务接口POST/api/openapi/v1/force-logout-tasks/\{taskId\}/cancellationsopenAPICancelForceLogoutTask
查询可信设备策略接口GET/api/openapi/v1/trusted-device-policiesopenAPIListTrustedDevicePolicies
创建可信设备策略接口POST/api/openapi/v1/trusted-device-policiesopenAPICreateTrustedDevicePolicy
删除可信设备策略接口DELETE/api/openapi/v1/trusted-device-policies/\{policyId\}openAPIDeleteTrustedDevicePolicy
更新可信设备策略接口PATCH/api/openapi/v1/trusted-device-policies/\{policyId\}openAPIUpdateTrustedDevicePolicy

安全管控 / Hooks 规则
名称MethodPathoperationId
查询 Hooks 规则接口GET/api/openapi/v1/hook-policiesopenAPIListHookPolicies
创建 Hooks 规则接口POST/api/openapi/v1/hook-policiesopenAPICreateHookPolicy
删除 Hooks 规则接口DELETE/api/openapi/v1/hook-policies/\{policyId\}openAPIDeleteHookPolicy
更新 Hooks 规则接口PATCH/api/openapi/v1/hook-policies/\{policyId\}openAPIUpdateHookPolicy

安全管控 / IM 频道
名称MethodPathoperationId
查询 IM 频道接口GET/api/openapi/v1/im-channelsopenAPIListIMChannels
更新 IM 频道接口PATCH/api/openapi/v1/im-channels/\{channelId\}openAPIUpdateIMChannel

订阅与用量 / 限额管理
名称MethodPathoperationId
读取计量设置接口GET/api/openapi/v1/metering-policyopenAPIGetMeteringPolicy
更新计量设置接口PATCH/api/openapi/v1/metering-policyopenAPIUpdateMeteringPolicy
读取企业额度接口GET/api/openapi/v1/quota-balanceopenAPIGetQuotaBalance
查询限额策略接口GET/api/openapi/v1/quota-policiesopenAPIListQuotaPolicies
创建限额策略接口POST/api/openapi/v1/quota-policiesopenAPICreateQuotaPolicy
删除限额策略接口DELETE/api/openapi/v1/quota-policies/\{policyId\}openAPIDeleteQuotaPolicy
更新限额策略接口PATCH/api/openapi/v1/quota-policies/\{policyId\}openAPIUpdateQuotaPolicy

模型管理 / 模型策略组
名称MethodPathoperationId
查询模型策略接口GET/api/openapi/v1/model-policiesopenAPIListModelPolicies
创建模型策略接口POST/api/openapi/v1/model-policiesopenAPICreateModelPolicy
删除模型策略接口DELETE/api/openapi/v1/model-policies/\{policyId\}openAPIDeleteModelPolicy
更新模型策略接口PATCH/api/openapi/v1/model-policies/\{policyId\}openAPIUpdateModelPolicy

安全管控 / 可信网络
名称MethodPathoperationId
查询可信网段接口GET/api/openapi/v1/network-rangesopenAPIListNetworkRanges
创建可信网段接口POST/api/openapi/v1/network-rangesopenAPICreateNetworkRange
删除可信网段接口DELETE/api/openapi/v1/network-ranges/\{rangeId\}openAPIDeleteNetworkRange
更新可信网段接口PATCH/api/openapi/v1/network-ranges/\{rangeId\}openAPIUpdateNetworkRange

开放平台 / 应用授权
名称MethodPathoperationId
查询应用接口GET/api/openapi/v1/open-platform/appsopenAPIListOpenPlatformApps

组织管理 / 组织信息
名称MethodPathoperationId
读取组织信息接口GET/api/openapi/v1/organizationopenAPIGetOrganization
更新组织信息接口PATCH/api/openapi/v1/organizationopenAPIUpdateOrganization
读取管理员登录地址配置接口GET/api/openapi/v1/organization/access-domainopenAPIGetOrganizationAccessDomain

安全管控 / 敏感词
名称MethodPathoperationId
查询敏感词库接口GET/api/openapi/v1/sensitive-word-librariesopenAPIListSensitiveWordLibraries
创建敏感词库接口POST/api/openapi/v1/sensitive-word-librariesopenAPICreateSensitiveWordLibrary
删除敏感词库接口DELETE/api/openapi/v1/sensitive-word-libraries/\{libraryId\}openAPIDeleteSensitiveWordLibrary
更新敏感词库接口PATCH/api/openapi/v1/sensitive-word-libraries/\{libraryId\}openAPIUpdateSensitiveWordLibrary

AI 资产管理 / 技能
名称MethodPathoperationId
查询技能分类接口GET/api/openapi/v1/skill-categoriesopenAPIListSkillCategories
创建技能分类接口POST/api/openapi/v1/skill-categoriesopenAPICreateSkillCategory
删除技能分类接口DELETE/api/openapi/v1/skill-categories/\{categoryId\}openAPIDeleteSkillCategory
更新技能分类接口PATCH/api/openapi/v1/skill-categories/\{categoryId\}openAPIUpdateSkillCategory
查询技能开放策略接口GET/api/openapi/v1/skill-policiesopenAPIListSkillPolicies
创建技能开放策略接口POST/api/openapi/v1/skill-policiesopenAPICreateSkillPolicy
删除技能开放策略接口DELETE/api/openapi/v1/skill-policies/\{policyId\}openAPIDeleteSkillPolicy
更新技能开放策略接口PATCH/api/openapi/v1/skill-policies/\{policyId\}openAPIUpdateSkillPolicy
查询技能上架申请接口GET/api/openapi/v1/skill-upload-reviewsopenAPIListSkillUploadReviews
处理技能上架申请接口POST/api/openapi/v1/skill-upload-reviews/\{reviewId\}/decisionopenAPIDecideSkillUploadReview
查询技能接口GET/api/openapi/v1/skillsopenAPIListSkills
删除技能接口DELETE/api/openapi/v1/skills/\{resourceId\}openAPIDeleteSkill
更新技能接口PATCH/api/openapi/v1/skills/\{resourceId\}openAPIUpdateSkill

用户管理 / 用户组
名称MethodPathoperationId
查询用户组接口GET/api/openapi/v1/user-groupsopenAPIListUserGroups
创建用户组接口POST/api/openapi/v1/user-groupsopenAPICreateUserGroup
删除用户组接口DELETE/api/openapi/v1/user-groups/\{groupId\}openAPIDeleteUserGroup
更新用户组接口PATCH/api/openapi/v1/user-groups/\{groupId\}openAPIUpdateUserGroup
