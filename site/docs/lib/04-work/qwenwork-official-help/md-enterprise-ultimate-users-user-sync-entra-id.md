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
sourceRel: "md/enterprise-ultimate-users-user-sync-entra-id.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-users-user-sync-entra-id.md"
sourceSha256: "c6de139394919d8fd6b406ee4ef6b41bdd822b8fa2f5544e2009c978254c368b"
pageSha256: "c6de139394919d8fd6b406ee4ef6b41bdd822b8fa2f5544e2009c978254c368b"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

Entra ID 用户同步使用应用凭证读取目录资料，把用户和组织关系同步到千问办公。这里需要 Tenant ID、Client ID 和 Client Secret；SAML 登录使用的 Metadata URL 不能用于通讯录同步。

## 在 Entra ID 注册目录读取应用
1. 登录 [Microsoft Entra 管理中心](https://entra.microsoft.com/)，先切换到要同步的企业租户。
2. 进入 Entra ID → 应用注册，新建应用或打开已有专用应用。
3. 在应用「概述」复制 **目录（租户）ID** 和 **应用程序（客户端）ID**，分别对应 Tenant ID 和 Client ID。
4. 进入「证书和密码」，创建客户端密码，记录有效期，并保存刚生成的 **值（Value）**。Secret ID 是标识符，不能替代密钥值。
5. 在「API 权限」中添加 Microsoft Graph 的目录读取应用权限，并由有权限的管理员授予租户管理员同意。读取用户资料需 User.Read.All；读取组及成员关系时，根据所需字段配置相应的 Group.Read.All 或 GroupMember.Read.All。
6. 确认权限状态显示已获得管理员同意。仅把权限加入列表，还不表示已生效。

千问办公从目录读取用户和部门，申请所需的读取权限即可，无需申请目录写入权限。

## 填写千问办公连接信息
1. 进入 用户与体验 → 用户管理 → 用户同步，点击【新增数据源】。
2. 选择「Microsoft Entra ID」，点击【开始配置】。
3. 填写 Tenant ID、Client ID 和 Client Secret，确认三者属于同一租户和应用。
4. 点击【测试连接】，正常后点击【测试并下一步】。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-0a9c931f4503f937.png)

*Tenant ID 指定企业租户；Client ID 和 Client Secret 指定读取目录的应用。*

## 检查目录字段
三方 ID、账号、工号可选择来源属性；displayName、mail、mobilePhone、部门和状态字段固定。新增可选映射时，从【添加映射】下拉选择未使用的目标，页面带入 Entra ID 对应属性。目标加入后固定，部门映射的左侧来源和右侧目标字段均不可修改。
<table> <thead> <tr> <td>Entra ID 字段</td> <td>千问办公字段</td> </tr> </thead> <tbody> <tr> <td>用户 id</td> <td>第三方用户 ID</td> </tr> <tr> <td>displayName</td> <td>用户姓名</td> </tr> <tr> <td>mail、mobilePhone、employeeId</td> <td>邮箱、手机号、工号</td> </tr> <tr> <td>department、accountEnabled</td> <td>部门对应值、用户状态</td> </tr> </tbody> </table>

有些成员的 mail 为空，或与 userPrincipalName 不同。首次同步前检查测试成员的实际资料；不要默认把登录名当成邮箱。Entra 组、部门名称和企业的组织层级也不一定一一对应，应核对成员归属和父级关系。

## 启用并验证同步
1. 完成字段映射，点击【下一步】，选择组织范围和默认授予席位设置。
2. 首次选择手动同步，设置离职处理、删除告警阈值和邮箱。
3. 保存配置，启用 Entra ID 数据源，点击【立即同步】。
4. 在同步记录详情检查读取结果及失败对象，到「用户」页核对邮箱、部门与启用状态。
5. 选一名测试用户修改资料，再同步一次，确认更新原记录；验证禁用账号时，检查席位是否按设置回收。
6. 核对完成后，可将同步周期改为每天或每 6 小时。

## 密钥轮换与排障
<table> <thead> <tr> <td>现象</td> <td>检查内容</td> </tr> </thead> <tbody> <tr> <td>无法取得访问令牌</td> <td>Tenant ID、Client ID 是否正确，密钥是否过期，是否误填 Secret ID</td> </tr> <tr> <td>连接成功但目录读取被拒绝</td> <td>Microsoft Graph 应用权限及管理员同意状态</td> </tr> <tr> <td>用户邮箱为空</td> <td>源目录 mail 是否有值，映射是否选错字段</td> </tr> <tr> <td>部门结构不符合预期</td> <td>源目录是否提供所需层级，部门字段与组关系是否被混淆</td> </tr> </tbody> </table>

在密钥到期前创建新密钥，更新千问办公数据源并测试、保存。确认新密钥工作正常后，再按企业流程撤销旧密钥。

## 与已有用户衔接
同步前，先核对来源中的三方 ID 与已有用户一致。

* **匹配用户：** 只通过三方 ID 查找。账号、邮箱、手机号和工号用于冲突校验；三方 ID 未命中，但其中任一值已被占用时，本条同步失败。
* **更新成功：** 保留原 QID，并将当前维护来源设为这份数据源。
* **锁定资料：** 来源开启期间，该来源用户的姓名、邮箱、账号、手机号、三方 ID、工号均不可手动修改；部门和状态按映射锁定。
* **恢复用户：** 删除记录只能由已开启、且来源 ID 与记录一致的同步任务恢复。账号、邮箱、手机号或工号已被复用时，先修正来源数据，再重新同步。

修改映射、切换来源和恢复的完整规则见[用户同步](https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync)。
