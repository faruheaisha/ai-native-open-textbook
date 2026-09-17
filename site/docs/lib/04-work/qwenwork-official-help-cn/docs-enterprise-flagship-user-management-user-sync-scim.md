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
sourceRel: "docs/enterprise/flagship/user-management/user-sync/scim.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/user-management/user-sync/scim.md"
sourceSha256: "a247b03778bf9aed1792216233d127f6466e2a62bbe2e42cb23c62ca1a7abddc"
pageSha256: "a247b03778bf9aed1792216233d127f6466e2a62bbe2e42cb23c62ca1a7abddc"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 用户管理 用户同步 SCIM 用户同步
 通用官方知识库
SCIM 用户同步
SCIM（跨域身份管理系统）通过标准接口推送用户和组。使用这条接入方式时，企业身份平台主动向千问办公发送请求；千问办公提供 Base URL 和 Bearer Token，按请求及生命周期策略处理账号。
创建 SCIM 数据源
- 进入 用户与体验 → 用户管理 → 用户同步，点击【新增数据源】。
- 选择「SCIM」，点击【开始配置】。
- 填写 来源名称，便于在列表中识别；填写 SCIM Client，便于在请求记录中识别调用方。
- 点击 SCIM Base URL 旁的【复制】，在企业身份平台的 SCIM 配置中作为服务地址。
- 点击【生成 Token】，保存一次性显示的完整令牌，并填入身份平台的 Bearer Token 或 Secret Token 字段。
【截图：管理后台 SCIM 数据源的 Base URL、Token 和生命周期策略 · sync-scim.png】
图 1：SCIM 的地址由千问办公提供，外部身份平台使用该地址和令牌推送变更。
⚠️ 注意： Token 明文只显示一次，请及时保存。sourceId 由系统生成，用于识别该数据源及它所维护的用户，不与 externalId 拼接成匹配键。
设置账号生命周期
在保存前完成「生命周期策略」：
- 默认授予席位： 决定新增 User 是否自动获得席位。
- 离职处理： 决定收到停用信息时，仅停用账号、停用并回收席位，还是删除并回收席位。
- 删除告警： 配置人数阈值和告警邮箱，用于核查集中删除或停用的异常情况。
点击【保存配置】，返回列表启用 SCIM。企业同时只启用一个数据源；切换时核对原数据源，原配置和历史记录会保留。
在身份平台设置推送
- 在身份平台中打开千问办公应用的用户预配或 SCIM 配置。
- 填入千问办公复制的 Base URL 和完整 Bearer Token，执行平台提供的连接测试。
- 配置用户映射：必须提供非空且全局唯一的 externalId 表示外部身份，userName 表示账号，displayName 表示姓名，emails 表示邮箱，active 表示账号启用状态。
- 如果需要同步组，配置 Groups 及其 members 关系。成员关系应使用 SCIM 返回的用户资源 ID，避免把显示名称或外部 ID 当成千问办公资源 ID。
- 先分配一个测试用户和一个测试组，再运行按需预配或推送。
千问办公提供 ServiceProviderConfig、Schemas、ResourceTypes、Users、Groups，以及分页、PATCH、Filter 和 ETag 能力。接入方应先读取服务能力和 Schema，再决定请求字段及更新方式。
验证四种变更
测试动作在千问办公检查的结果
新建测试用户用户只新增一次，姓名、账号、邮箱和席位正确
更新姓名或邮箱更新原用户，资源 ID 保持一致
添加或移除组成员用户部门关系按本次请求变化
将 active 设为 false账号及席位按离职策略变化

每次请求后，在「同步记录」按数据源或 SCIM Client 筛选，点击【详情】检查用户、部门、关系、席位与错误信息。再到「用户」页面核对最终状态。
接口排障与令牌轮换
现象检查方法
401 或令牌无效检查 Bearer 前缀、完整 Token、令牌是否被吊销
请求被拒绝确认 SCIM 数据源已启用、Base URL 的来源路径正确
重复创建用户检查稳定 externalId、资源查找和更新逻辑，避免每次推送都发创建请求
ETag 冲突重新读取最新资源和 ETag，再基于最新内容提交更新
字段校验失败按 Schemas 和错误响应检查字段类型、必填项和多值属性结构

已有 Token 时，点击【轮换 Token】会立即使旧 Token 失效。请安排好切换时间，复制新 Token 后立即更新身份平台并测试连接。
【吊销】会使当前 Token 失效并停用该数据源；仅在停止接入时使用。
与已有用户衔接
同步前，先核对来源中的三方 ID 与已有用户一致。
- 匹配用户： 只通过三方 ID 查找。账号、邮箱、手机号和工号用于冲突校验；三方 ID 未命中，但其中任一值已被占用时，本条同步失败。
- 更新成功： 保留原 QID，并将当前维护来源设为这份数据源。
- 锁定资料： 来源开启期间，该来源用户的姓名、邮箱、账号、手机号、三方 ID、工号均不可手动修改；部门和状态按映射锁定。
- 恢复用户： 删除记录只能由已开启、且来源 ID 与记录一致的同步任务恢复。账号、邮箱、手机号或工号已被复用时，先修正来源数据，再重新同步。
修改映射、切换来源和恢复的完整规则见用户同步。
