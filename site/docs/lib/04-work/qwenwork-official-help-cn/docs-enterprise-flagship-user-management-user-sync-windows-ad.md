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
sourceRel: "docs/enterprise/flagship/user-management/user-sync/windows-ad.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/user-management/user-sync/windows-ad.md"
sourceSha256: "f27c9706afedfbacff580b8706590f44ed75f007e3b70bd62e3ad625ddc7b924"
pageSha256: "f27c9706afedfbacff580b8706590f44ed75f007e3b70bd62e3ad625ddc7b924"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 用户管理 用户同步 Windows AD 用户同步
 通用官方知识库
Windows AD 用户同步
Windows AD 数据源通过 LDAP（轻量目录访问协议）读取域中的用户和组织信息。开始前需要确认目录服务可达，并准备能够读取目标目录的服务账号。
准备目录连接信息
请企业域管理员提供下列信息，先核对目录树，再填写连接参数。
参数含义与示例
Server URL域控制器的目录服务地址，例如 ldaps://ad.example.com:636
Base DN开始搜索的目录位置，例如 OU=Employees,DC=example,DC=com
Bind DN连接目录的服务账号完整路径，例如 CN=qwenwork-sync,OU=Service Accounts,DC=example,DC=com
密码上述服务账号的密码
TLS连接加密设置，应与目录服务实际配置一致

DN 是目录中对象的完整名称。Base DN 表示搜索范围，Bind DN 表示登录账号，两者用途不同。建议采用 LDAPS，并确认服务器证书有效、名称匹配且受同步服务信任。
服务账号应能读取目标用户、部门和父级关系。无需为了只读同步授予域管理员权限。同步服务与域控制器之间须具备网络连通性。
在千问办公连接目录
- 进入 用户与体验 → 用户管理 → 用户同步，点击【新增数据源】。
- 选择「Windows AD」，点击【开始配置】。
- 填写 Server URL、Base DN、Bind DN 和密码，核对 TLS 开关。
- 点击【测试连接】。连接正常后，点击【测试并下一步】。
【截图：管理后台 Windows AD 数据源的服务器、Base DN、Bind DN 和 TLS 设置 · sync-windows-ad.png】
图 1：Base DN 限定搜索目录，Bind DN 指定读取目录的账号；示例值需替换为企业实际配置。
核对 AD 属性
配置页预设的来源字段千问办公字段
用户 objectGUID第三方用户 ID，用于持续识别同一对象
displayName、mail、telephoneNumber用户姓名、邮箱、手机号
employeeID、department、userAccountControl工号、所属部门字段、用户状态
部门 objectGUID、name第三方部门 ID、部门名称

先用一名测试成员检查属性实际值。AD 的 department 可能存放部门名称，而页面需要能对应部门的标识；不能直接认定默认字段就能建立正确层级。userAccountControl 也包含多种账号标志，应核对启用和停用账号的结果。
三方 ID、账号、工号允许选择 AD 属性，其他成员来源字段和全部部门来源字段固定。账号可按企业登录约定选择，不应直接把 objectGUID 的显示形式当成人工输入的登录名。
在【添加映射】下拉中选择尚未映射的目标，系统带入对应的 AD 预设属性；行内目标不可修改。必填的唯一标识、姓名和部门关系不能删除，可选项删除后可重新添加。
设置策略并验证入职、调岗、离职
- 进入下一步，选择同步部门范围，设置是否默认授予席位。
- 首次使用手动同步，离职处理先选择符合企业账号保留要求的停用方式，再配置删除告警。
- 保存后启用 Windows AD 数据源，点击【立即同步】。
- 在同步详情核对用户和部门创建结果，特别检查搜索根目录下的层级是否完整。
- 对测试用户分别验证资料更新、移动组织位置和禁用账号。每次同步后检查原用户的身份是否保持不变，以及席位是否按策略回收。
连接与数据故障
- 连接超时： 检查 DNS、路由、防火墙和目录端口。
- 证书错误： 检查 LDAPS 证书链、证书有效期与 Server URL 主机名，修复证书后重新测试。
- 绑定失败： 检查 Bind DN 路径、密码、服务账号锁定或过期状态。
- 查不到用户： 检查 Base DN 是否指向正确组织单位，以及服务账号是否有读取权限。
- 停用判断异常： 先停止同步，核对用户状态属性和离职策略，再重试。
服务账号密码变更后，在原数据源中更新密码并测试。缩小 Base DN 或部门范围之前，先检查哪些已有用户会被排除。
与已有用户衔接
同步前，先核对来源中的三方 ID 与已有用户一致。
- 匹配用户： 只通过三方 ID 查找。账号、邮箱、手机号和工号用于冲突校验；三方 ID 未命中，但其中任一值已被占用时，本条同步失败。
- 更新成功： 保留原 QID，并将当前维护来源设为这份数据源。
- 锁定资料： 来源开启期间，该来源用户的姓名、邮箱、账号、手机号、三方 ID、工号均不可手动修改；部门和状态按映射锁定。
- 恢复用户： 删除记录只能由已开启、且来源 ID 与记录一致的同步任务恢复。账号、邮箱、手机号或工号已被复用时，先修正来源数据，再重新同步。
修改映射、切换来源和恢复的完整规则见用户同步。
