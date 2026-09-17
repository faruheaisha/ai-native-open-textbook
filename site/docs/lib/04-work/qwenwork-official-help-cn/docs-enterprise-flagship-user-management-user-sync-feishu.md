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
sourceRel: "docs/enterprise/flagship/user-management/user-sync/feishu.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/user-management/user-sync/feishu.md"
sourceSha256: "3020bde0cd1fc93850f1eb36dc2c0808bfa33017c38a01f87ec1f14dd3378bf3"
pageSha256: "3020bde0cd1fc93850f1eb36dc2c0808bfa33017c38a01f87ec1f14dd3378bf3"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 用户管理 用户同步 飞书用户同步
 通用官方知识库
飞书用户同步
飞书用户同步读取企业自建应用有权访问的通讯录，把部门、成员资料和部门关系写入千问办公。配置前先检查应用发布状态和数据访问范围，这两项经常决定哪些成员能够被读取。
一次性申请清单
在「权限管理」中开通以下应用身份读取权限，并设置可访问的数据范围。下表按部门、成员及当前映射字段拆分，便于一次提交申请。
权限名称权限代码何时需要
获取通讯录基本信息contact:contact.base:readonly读取通讯录基础信息
获取部门基础信息contact:department.base:readonly部门标识和名称
获取部门组织架构信息contact:department.organize:readonly部门层级与上级关系
获取用户基本信息contact:user.base:readonly用户标识和姓名
获取用户组织架构信息contact:user.department:readonly成员所属部门
获取用户邮箱信息contact:user.email:readonly需要将邮箱同步到千问办公时申请
获取用户手机号contact:user.phone:readonly需要将手机号同步到千问办公时申请
获取用户受雇信息contact:user.employee:readonly需要将工号或在职状态同步到千问办公时申请
获取用户 user IDcontact:user.employee_id:readonly需要使用飞书 user_id 作为千问办公的三方 ID 等身份字段时申请

请一次准备好以下信息：
- 企业与应用：企业名称、应用名称、App ID、App Secret。
- 权限与发布：权限开通结果、已发布的应用版本。
- 访问范围：通讯录数据访问范围、应用可用范围。
- 测试资料：测试部门 ID、测试成员 union_id，以及预期同步的成员资料。
若同一应用还用于 SSO，请同时核对飞书登录清单中的重定向配置和登录授权。
权限、可访问数据范围和应用版本须同时生效。先同步一个包含上级部门和普通成员的测试范围，核对 ID 类型、部门层级及每个选用字段。不要把「应用可用」等同于「所有通讯录可读」。
准备飞书应用
- 进入飞书开放平台的【开发者后台】，创建或打开企业自建应用。
- 打开「权限管理」，按权限代码搜索并申请：contact:contact.base:readonly、contact:department.base:readonly、contact:department.organize:readonly、contact:user.base:readonly、contact:user.department:readonly。对应名称见上方清单。
- 若需要将飞书成员的邮箱同步到千问办公，则申请 获取用户邮箱信息（contact:user.email:readonly）。
- 若需要将飞书成员的手机号同步到千问办公，则申请 获取用户手机号（contact:user.phone:readonly）。
- 若需要将飞书成员的工号或在职状态同步到千问办公，则申请 获取用户受雇信息（contact:user.employee:readonly）。
- 若需要使用飞书 user_id 作为千问办公的三方 ID 等身份字段，则申请 获取用户 user ID（contact:user.employee_id:readonly）。使用 union_id 时无需为此申请该项权限。
- 在权限列表的「可访问的数据范围」中配置通讯录范围。首次可限制在测试部门；应用可用范围也要包含测试成员。
- 在「凭证与基础信息」记录 App ID 和 App Secret。
- 在 版本管理与发布 → 版本管理 创建版本并发布。新增权限后，确认本次发布已包含这些权限。
千问办公从飞书读取通讯录。完成上述读取权限申请即可，无需申请通讯录写入权限。
建立飞书数据源
- 在千问办公进入 用户与体验 → 用户管理 → 用户同步，点击【新增数据源】。
- 选择「飞书」，点击【开始配置】，填写 App ID 和 App Secret。
- 点击【测试连接】。若连接失败，先检查应用是否发布、密钥是否属于该应用及权限是否生效。
- 点击【测试并下一步】。
【截图：管理后台飞书数据源的 App ID、App Secret 和测试入口 · sync-feishu.png】
图 1：这里填写飞书企业自建应用凭证，随后进入字段映射和同步策略。
核对飞书 ID 和部门关系
核对飞书字段及 ID 类型后保存。三方 ID、工号、账号的来源可以选择；姓名、邮箱、手机号、部门关系与状态，以及部门映射的左侧来源和右侧目标字段均固定。删除可选行后，可在【添加映射】下拉重新选择目标，恢复对应的飞书预设字段。
配置页预设的来源字段用途
union_id默认对应第三方用户 ID；应与飞书 SSO 的身份关联保持一致
name、email、mobile对应用户姓名、邮箱、手机号
employee_no、open_id默认对应工号、账号，按企业实际资料检查
department_id成员所属部门的第三方部门 ID
部门 open_department_id、parent_department_id部门唯一标识和上级部门标识

检查成员返回的部门 ID 与部门列表使用的 ID 类型相同。飞书同时存在多种用户和部门 ID，不应仅因为字段名称相似就互换。
必填映射确认后点击【下一步】。如果成员没有邮箱，先确认是否因权限导致；不要立即把空值当成成员未填写。
设置同步方式并核验结果
- 在「同步范围」选择全部组织或指定部门，并设置「默认授予席位」。
- 首次使用「手动同步」；稳定运行后可改为「定时同步」，周期可选每天或每 6 小时。
- 在「删除处理」中选择仅停用、停用并回收席位，或删除并回收席位。设置告警阈值与邮箱后保存。
- 在数据源列表启用飞书，点击【立即同步】。
- 打开这次同步记录的【详情】，检查用户数量、部门层级和席位变化，再到「用户」页面抽查一个跨部门成员。
- 在飞书修改一名测试成员的部门后再同步，确认更新的是原用户，没有新增重复账号。
维护与排障
- 只有部分部门导入： 对比飞书的通讯录数据范围、应用可用范围以及千问办公选择的范围。
- 部门关系错误： 检查 department_id 与 open_department_id 的实际值是否对应，补齐上级部门。
- 应用发布后仍缺字段： 检查新版本包含的权限，以及相关权限的数据范围。
- 离职处理数量异常： 停用数据源并查看同步详情，先排除权限收缩或字段缺失，再继续同步。
更新 App Secret 时，编辑原数据源、重新测试并保存。同步开关只控制数据同步；飞书登录在飞书 SSO单独配置。
与已有用户衔接
同步前，先核对来源中的三方 ID 与已有用户一致。
- 匹配用户： 只通过三方 ID 查找。账号、邮箱、手机号和工号用于冲突校验；三方 ID 未命中，但其中任一值已被占用时，本条同步失败。
- 更新成功： 保留原 QID，并将当前维护来源设为这份数据源。
- 锁定资料： 来源开启期间，该来源用户的姓名、邮箱、账号、手机号、三方 ID、工号均不可手动修改；部门和状态按映射锁定。
- 恢复用户： 删除记录只能由已开启、且来源 ID 与记录一致的同步任务恢复。账号、邮箱、手机号或工号已被复用时，先修正来源数据，再重新同步。
修改映射、切换来源和恢复的完整规则见用户同步。
