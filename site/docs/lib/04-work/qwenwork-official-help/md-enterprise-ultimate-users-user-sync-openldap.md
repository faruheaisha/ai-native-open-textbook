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
sourceRel: "md/enterprise-ultimate-users-user-sync-openldap.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-users-user-sync-openldap.md"
sourceSha256: "52bf02a8be313820b746018bee91c4dd10a30b7a77ace8785e22511a9ef77592"
pageSha256: "52bf02a8be313820b746018bee91c4dd10a30b7a77ace8785e22511a9ef77592"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

OpenLDAP 可以使用不同的用户和组织对象结构。千问办公提供连接和字段映射配置；管理员需要核对目录属性与页面预设关系，尤其是唯一标识、部门关联和账号状态。

## 先确认目录结构
请目录管理员提供一个用户条目和一个部门条目的脱敏示例，以及下列连接信息。
<table> <thead> <tr> <td>信息</td> <td>示例与检查点</td> </tr> </thead> <tbody> <tr> <td>Server URL</td> <td>ldaps://ldap.example.com:636，必须能从同步服务访问</td> </tr> <tr> <td>Base DN</td> <td>ou=people,dc=example,dc=com，确认搜索范围同时覆盖需要的资料</td> </tr> <tr> <td>Bind DN</td> <td>cn=qwenwork-sync,ou=services,dc=example,dc=com，使用具备读取权限的服务账号</td> </tr> <tr> <td>密码与 TLS</td> <td>确认服务账号有效，目录端的加密与证书配置正确</td> </tr> </tbody> </table>

如果用户位于 ou=people，部门位于另一个目录分支，应先确认搜索范围能覆盖二者。不要仅因连接测试通过就认为目录结构完整。

## 新建 OpenLDAP 数据源
1. 在千问办公进入 用户与体验 → 用户管理 → 用户同步。
2. 点击【新增数据源】，选择「OpenLDAP」，点击【开始配置】。
3. 填写 Server URL、Base DN、Bind DN 和密码，设置 TLS。
4. 点击【测试连接】，正常后点击【测试并下一步】。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-dec7a497edc55847.png)

*OpenLDAP 连接参数采用目录实际的 DN；不要照抄 Windows AD 的组织路径。*

## 核对目录 Schema 与映射
Schema 指目录中对象允许使用的属性和结构。三方 ID、账号、工号可选择来源属性，其他成员字段及部门字段按页面预设固定。下表列出需要由目录提供的属性。
<table> <thead> <tr> <td>OpenLDAP 属性</td> <td>对应内容</td> </tr> </thead> <tbody> <tr> <td>entryUUID</td> <td>第三方用户 ID；应在改名或移动条目后仍稳定</td> </tr> <tr> <td>cn、mail、mobile</td> <td>用户姓名、邮箱、手机号</td> </tr> <tr> <td>employeeNumber</td> <td>工号</td> </tr> <tr> <td>departmentNumber</td> <td>用户所属部门的对应值</td> </tr> <tr> <td>accountStatus</td> <td>用户状态；需核实目录是否实际定义该属性</td> </tr> <tr> <td>部门 entryUUID、ou</td> <td>第三方部门 ID、部门名称</td> </tr> </tbody> </table>

检查成员的部门字段值能否对应到部门唯一标识。仅有同名字符串并不足以确认关系正确。用户状态固定读取 accountStatus；目录使用其他停用属性时，需要在来源侧提供对应属性和取值。

添加可选映射时，从【添加映射】下拉选择千问办公目标，系统带入对应预设属性。右侧目标字段加入后固定，已有目标不会重复出现，必填行不可删除。

## 选择同步与离职策略
1. 完成映射后点击【下一步】，选择需要同步的组织范围。
2. 设置默认授予席位，首次选择「手动同步」。后续可切换为每天或每 6 小时同步。
3. 选择离职后的处理方式。需要保留用户记录时选择停用；选择删除前确认企业的数据保留要求。
4. 设置删除告警阈值和邮箱，保存配置并启用 OpenLDAP 数据源。
5. 点击【立即同步】，在任务详情检查成功与失败对象。

## 检查同步结果
在「用户」页找到测试成员，对比姓名、邮箱、工号、部门和账号状态。再对测试条目做一次改名或移动，执行同步后确认仍更新原用户。最后验证目录中的停用标记能产生预期账号和席位变化。

如果同步数量突然减少，先检查 Base DN、读取权限和目录属性变更。出现缺失属性时，应在目录或映射中解决，不要反复创建新数据源；否则难以确认既有用户与来源的关系。

连接失败则依次检查服务地址、证书、Bind DN 和账号密码。修改连接凭据后重新测试，确认正常再恢复同步。

## 与已有用户衔接
同步前，先核对来源中的三方 ID 与已有用户一致。

* **匹配用户：** 只通过三方 ID 查找。账号、邮箱、手机号和工号用于冲突校验；三方 ID 未命中，但其中任一值已被占用时，本条同步失败。
* **更新成功：** 保留原 QID，并将当前维护来源设为这份数据源。
* **锁定资料：** 来源开启期间，该来源用户的姓名、邮箱、账号、手机号、三方 ID、工号均不可手动修改；部门和状态按映射锁定。
* **恢复用户：** 删除记录只能由已开启、且来源 ID 与记录一致的同步任务恢复。账号、邮箱、手机号或工号已被复用时，先修正来源数据，再重新同步。

修改映射、切换来源和恢复的完整规则见[用户同步](https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync)。
