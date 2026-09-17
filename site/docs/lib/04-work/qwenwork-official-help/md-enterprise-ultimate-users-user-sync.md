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
sourceRel: "md/enterprise-ultimate-users-user-sync.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-users-user-sync.md"
sourceSha256: "b0dfb7bbee1d4155ec7ca92565c68844b46dc04d6973c537ee57e0818b8bbb48"
pageSha256: "b0dfb7bbee1d4155ec7ca92565c68844b46dc04d6973c537ee57e0818b8bbb48"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

用户同步从企业通讯录维护千问办公的部门、成员与关系。同步通过三方 ID 查找用户，成功写入后由该来源维护用户资料；入职、调岗和离职按来源策略更新到千问办公。它不决定成员的登录方式；企业 SSO 需要在身份认证中配置。

## 选择同步方式
进入 用户与体验 → 用户管理 → 用户同步，点击【新增数据源】，选择实际来源。每种方式都有独立教程：
<table> <thead> <tr> <td>来源</td> <td>适用情况</td> <td>教程</td> </tr> </thead> <tbody> <tr> <td>钉钉</td> <td>从钉钉企业通讯录读取成员和部门</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync/dingtalk">配置钉钉同步</a></td> </tr> <tr> <td>飞书</td> <td>从飞书企业通讯录读取组织架构</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync/feishu">配置飞书同步</a></td> </tr> <tr> <td>企业微信</td> <td>从企业微信通讯录读取成员</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync/wecom">配置企业微信同步</a></td> </tr> <tr> <td>Windows AD</td> <td>从 Windows 域目录读取用户和部门</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync/windows-ad">配置 Windows AD</a></td> </tr> <tr> <td>OpenLDAP</td> <td>从 LDAP 目录按字段映射读取条目</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync/openldap">配置 OpenLDAP</a></td> </tr> <tr> <td>Microsoft Entra ID</td> <td>使用企业租户应用读取目录</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync/entra-id">配置 Entra ID</a></td> </tr> <tr> <td>SCIM</td> <td>由身份平台主动向千问办公推送成员变化</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync/scim">配置 SCIM</a></td> </tr> </tbody> </table>

## 配置前先决定三件事
配置前，请先确定：

1. **同步范围：** 哪些部门和成员需要进入千问办公。
2. **身份标识：** 用哪个稳定字段持续识别同一用户。
3. **离职处理：** 成员离职后，停用还是删除账号。

先用小范围成员核对字段，再扩大同步范围。  
**警告**

企业同一时间只启用一个同步来源。切换前须核对原有成员的身份关联。

除 SCIM 外，配置窗口依次为「应用凭证」「设置字段映射」「设置同步策略」。凭证测试验证连接；映射决定每个来源字段写到哪里；策略决定范围、频率和删除处理。SCIM 则由外部身份平台调用本企业的 Base URL。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-11c1e66343ee5057.png)

*上方维护数据源，下方查询每次执行的成员、部门变更与结果。*

## 执行后核对结果
1. 保存数据源配置并确认启用状态。读取型数据源可手动执行同步，也可按配置周期运行。
2. 在同步记录中按数据源、触发方式、结果和日期筛选，打开【详情】。
3. 分别核对用户、部门、成员关系和席位变化。出现「部分成功」时，查看失败对象与原因，修正后再执行。
4. 进入「用户」页，检查一名新增成员、一名调岗成员及一名离职成员，确认部门、状态和席位符合预期。

## 修改范围与离职处理
编辑已有数据源时点击【修改配置】，重新检查字段映射和删除处理后保存。缩小范围可能使原先同步的成员离开同步范围，因此不要只修改部门勾选而忽略离职策略。  
**警告**

变更数量超过阈值时，删除告警会发送邮件提醒管理员检查结果。**同步不会因此等待人工审批**，仍按已配置的删除处理规则执行。

## 已有用户如何接入同步
同步只用非空的三方 ID 查找用户，不以账号、邮箱、手机号或工号认领已有用户。三方 ID 全局唯一，不与同步源的来源 ID 拼成匹配条件。账号、邮箱、手机号、工号在未删除用户中分别唯一，停用用户仍占用这些值。
<table> <thead> <tr> <td>情况</td> <td>处理结果</td> </tr> </thead> <tbody> <tr> <td>三方 ID 命中未删除用户</td> <td>更新该 QID 的映射字段，成功后将当前维护来源切换为本次同步源</td> </tr> <tr> <td>三方 ID 未命中，账号、邮箱、手机号、工号也无冲突</td> <td>通过公共校验后新增用户</td> </tr> <tr> <td>三方 ID 未命中，但账号、邮箱、手机号或工号已被占用</td> <td>本条失败；管理员在原用户上补齐或修正三方 ID 后重试</td> </tr> <tr> <td>三方 ID 命中，但账号、邮箱、手机号或工号属于另一用户</td> <td>本条失败，原资料、来源和席位均不改变</td> </tr> </tbody> </table>

对于先手动新增或导入的用户，先在原用户上维护正确三方 ID，再执行同步。不要新建一条同邮箱用户来代替已有成员。

## 哪些字段由同步维护
用户的维护来源与**当前已开启的同步来源一致**时，按下表锁定字段。其他来源用户可按权限编辑。
<table> <thead> <tr> <td>字段</td> <td>后台、导入更新和通用 API 的修改规则</td> </tr> </thead> <tbody> <tr> <td>姓名、邮箱、账号、手机号、三方 ID、工号</td> <td>均由来源维护，不可修改；移除映射也不会解锁</td> </tr> <tr> <td>部门、状态</td> <td>配置了映射时锁定；移除映射后恢复编辑</td> </tr> </tbody> </table>  
**警告**

开启用户同步期间，整个组织禁止手动新增、邀请、导入新增和删除用户。导入更新仍可使用，但必须遵守字段锁定规则。

### 添加或调整映射

1. 在对应映射区域打开【添加映射】，选择尚未映射的千问办公字段。
2. 页面添加一行，并带入预设来源。右侧目标字段固定；成员映射中，只有三方 ID、账号、工号可选择左侧来源，其他成员字段及部门字段的来源固定。
3. 核对必填映射。必填行不可删除，可选行可以删除后重新添加；打开配置不会自动改写已有保存值。
4. 保存配置后，重新执行同步，并核对目标用户的 QID 和字段值。

保存后的影响：

* 新增映射后，目标字段立即由同步维护；移除部门或状态映射后，这两项恢复编辑。
* 移除映射不会清空已有值，也不会解锁六项基本资料。
* 修改三方 ID 映射可能命中另一用户或创建新 QID，须由管理员确认对应关系。
* 尚未提交的旧版本任务会失败，需要重新执行。

## 删除、恢复与换源
删除用户后，账号、邮箱、手机号和工号可被新用户复用，三方 ID 仍保留给原 QID。仅同步任务可以恢复，且执行时须同时满足：

* 当前同步源已开启；
* 三方 ID 命中删除记录；
* 删除记录保存的来源 ID 非空，且与当前同步源一致；
* 恢复后的账号、邮箱、手机号、工号及其他资料通过校验。

恢复成功后，**QID 保持不变**。恢复前还需核对以下情况：

* 账号、邮箱、手机号或工号已被其他用户使用时，先修改来源数据或映射，再重试；系统不会覆盖占用者。
* 未映射的字段会保留原值。仅移除冲突字段的映射不能解决冲突，需要提供新的无冲突值，或按允许的规则清空。
* SSO 不恢复用户，也不会替换删除记录另建用户。
* 手动、导入、API 或 SSO 创建后被同步接管的用户，按当前保存的来源判断恢复资格。

### 从来源 A 切换到 B

<table> <thead> <tr> <td>用户状态</td> <td>换源方式</td> </tr> </thead> <tbody> <tr> <td>未删除</td> <td>B 用相同三方 ID 更新成功后，保留原 QID，维护来源改为 B</td> </tr> <tr> <td>已删除，仍归属 A</td> <td>先启用 A 并恢复，再切换到 B；不能直接由 B 恢复</td> </tr> </tbody> </table>  
**说明**

删除后重新创建的数据源会获得新的来源 ID，不等同于原来源。

## 处理失败记录
一名用户出现冲突时，其资料、来源和关系整条不写入；其他独立有效用户可以成功。同步记录显示失败对象和字段。上游读取失败、范围不完整或同批身份冲突时，不会把无法确认的缺失用户作为离职对象。修正来源资料后重新执行，并回到用户列表核对 QID 和最终字段。
