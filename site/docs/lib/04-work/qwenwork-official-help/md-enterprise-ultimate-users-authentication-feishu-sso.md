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
sourceRel: "md/enterprise-ultimate-users-authentication-feishu-sso.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-users-authentication-feishu-sso.md"
sourceSha256: "c65c72622d1715ecb5a4d61ad00ad851d923c1e87a78aac21814b8237b2753f9"
pageSha256: "c65c72622d1715ecb5a4d61ad00ad851d923c1e87a78aac21814b8237b2753f9"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

飞书 SSO 让企业成员使用飞书账号完成千问办公的身份验证。接入时要同时检查应用权限、可用范围和发布状态：只取得 App ID 和 App Secret，还不能保证成员能够登录。

## 一次性申请清单
请应用管理员在「权限管理」中核对下表。登录读取的是当前授权成员；同一应用承担用户同步时，还需合并申请[飞书同步权限](https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync/feishu)。
<table> <thead> <tr> <td>权限或配置</td> <td>是否需要</td> <td>用途与检查方法</td> </tr> </thead> <tbody> <tr> <td>应用登录授权</td> <td>必需</td> <td>完成成员授权，取得基础身份信息；登录用户信息接口不要求另开通讯录基础读取权限</td> </tr> <tr> <td>获取用户邮箱信息（contact:user.email:readonly）</td> <td>需要在 SSO 创建用户时写入邮箱，则申请</td> <td>读取 email；成员资料本身也须有值</td> </tr> <tr> <td>获取用户手机号（contact:user.phone:readonly）</td> <td>需要在 SSO 创建用户时写入手机号，则申请</td> <td>读取 mobile</td> </tr> <tr> <td>获取用户 user ID（contact:user.employee_id:readonly）</td> <td>需要使用飞书 user_id 作为千问办公身份字段，则申请</td> <td>不要与「通过手机号或邮箱获取用户 ID」权限混淆</td> </tr> <tr> <td>获取用户受雇信息（contact:user.employee:readonly）</td> <td>需要读取企业邮箱或工号等受雇资料，则申请</td> <td>读取 enterprise_email 等资料；核对实际登录接口返回值</td> </tr> <tr> <td>重定向 URL、应用可用范围、应用版本</td> <td>必需</td> <td>回调完整匹配；版本包含本次权限；范围覆盖拟登录成员</td> </tr> </tbody> </table>

请一次准备好以下信息：

* 企业与应用：企业名称、应用名称、App ID、App Secret。
* 登录与权限：重定向 URL、已开通权限、通讯录数据访问范围、应用可用范围。
* 发布与环境：已发布的应用版本；使用私有化环境时，还需提供域名。
* 测试资料：普通测试成员及其 union_id。

应用可用范围与通讯录数据访问范围需要分别核对。

授权后，请普通成员完成一次登录，核对三方 ID、姓名和选用资料。email 与 enterprise_email 是不同字段；需要企业邮箱时，请一并申请受雇信息权限，并核对最终写入千问办公的邮箱。若工号等资料未由登录接口返回，请通过用户同步维护，不要仅凭权限申请成功判断字段可用。

## 准备飞书企业自建应用
1. 登录[飞书开放平台](https://open.feishu.cn/)，进入【开发者后台】，确认所在企业。
2. 在「企业自建应用」中点击【创建企业自建应用】，填写名称、描述和图标。图标是应用发布所需材料。
3. 打开 开发配置 → 权限管理。若需要在 SSO 创建千问办公用户时写入飞书邮箱，则申请 **获取用户邮箱信息**（contact:user.email:readonly）。
4. 若需要在 SSO 创建用户时写入飞书企业邮箱，则同时申请 **获取用户受雇信息**（contact:user.employee:readonly）。
5. 若需要在 SSO 创建千问办公用户时写入飞书手机号，则申请 **获取用户手机号**（contact:user.phone:readonly）。
6. 若需要使用飞书 user_id 作为千问办公的三方 ID 等身份字段，则申请 **获取用户 user ID**（contact:user.employee_id:readonly）。仅使用基础身份信息时，无需为登录接口额外申请通讯录基础读取权限。
7. 检查权限对应的可访问数据范围，将测试成员包含在内。应用可见范围与通讯录可读取范围都需要覆盖测试成员。
8. 进入「凭证与基础信息」，取得 **App ID** 和 **App Secret**。

如果这套应用还承担部门与成员同步，继续按[飞书用户同步](https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync/feishu)申请通讯录读取权限；不要把同步权限清单直接当成登录的必需权限。

## 交换回调地址与应用凭证
1. 在千问办公管理后台进入 用户与体验 → 用户管理 → 身份认证 → SSO 登录。
2. 找到「飞书」行，点击【配置】，填写飞书的 **App ID** 和 **App Secret**。
3. 点击【复制回调链接】，回到飞书应用的「安全设置」，在「重定向 URL」中添加完整地址并保存。
4. 回到飞书的 版本管理与发布 → 版本管理，创建并发布应用版本，确认测试成员在应用可用范围内。权限或范围调整后，也要检查是否需要重新发布。
5. 回到千问办公。只有接入飞书私有化环境时，才填写 **私有化域名地址**；普通飞书应用可留空。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-8ced314071c4d25e.png)

*填写飞书凭证后，复制回调链接到飞书的重定向 URL 设置；私有化域名按企业环境填写。*

## 设置用户关联
1. 在「关联规则」中，将 user.union_id 对应「第三方用户 ID」，将 user.name 对应「用户姓名」。
2. 需要其他资料时，从【添加映射】下拉选择目标。加入后，右侧目标字段固定。
3. 核对来源字段。只有三方 ID、账号、工号允许选择来源；姓名、邮箱、手机号分别固定读取 user.name、user.email、user.mobile。
4. 可选映射可以删除后重新添加。

union_id 表示同一用户在同一应用开发主体下的身份。不要把应用内的 open_id、user_id 与 union_id 混用；若用户已经通过通讯录同步加入千问办公，先检查两种接入方式的身份字段是否能够关联同一人。

开启「自动创建用户」后，尚不存在的用户可以在认证通过后被创建。此时必须选择 **默认加入部门**，并按需要设置「自动授予席位」。如果企业要求先审核再开通账号，保持自动创建关闭，先完成用户导入。

## 验证登录并投入使用
1. 点击【测试认证】，确认页面提示「测试通过」。
2. 测试通过后点击【保存配置】，再开启列表中的飞书认证源。
3. 在「登录方式」中开启「SSO 登录」。
4. 请测试成员从企业入口登录，核对授权的飞书企业、最终加入的千问办公企业以及用户姓名和邮箱。
5. 如果开启了自动创建，查看【自动创建用户记录】，确认只创建了一条正确用户记录，再扩大飞书应用可用范围。

## 排查飞书登录失败
<table> <thead> <tr> <td>现象</td> <td>处理方法</td> </tr> </thead> <tbody> <tr> <td>应用仅创建者可用</td> <td>检查应用版本是否发布、目标成员是否在可用范围内</td> </tr> <tr> <td>返回重定向地址错误</td> <td>将千问办公的回调链接重新复制到飞书「安全设置」，不要使用应用主页地址替代</td> </tr> <tr> <td>能认证但没有邮箱</td> <td>检查邮箱读取权限、权限生效版本和成员在飞书中的邮箱资料</td> </tr> <tr> <td>出现重复用户</td> <td>检查三方 ID 映射与账号、邮箱冲突，避免同步使用一种 ID、登录又改用另一种 ID</td> </tr> </tbody> </table>

更新 App Secret 后，在千问办公编辑同一认证源，填写新密钥、重新测试并保存。固定的飞书认证源可停用，重新使用前再次测试。

## 已有用户与删除记录
SSO **只通过三方 ID 匹配用户**，匹配后的处理如下：
<table> <thead> <tr> <td>匹配结果</td> <td>处理方式</td> </tr> </thead> <tbody> <tr> <td>命中未删除用户，其他身份字段无冲突</td> <td>完成登录，保留已有资料和同步来源</td> </tr> <tr> <td>返回的账号、邮箱、手机号或工号与其他用户冲突</td> <td>拒绝本次登录，管理员处理冲突后再试</td> </tr> <tr> <td>未命中用户</td> <td>按「自动创建用户」设置处理</td> </tr> <tr> <td>命中已删除用户</td> <td>拒绝登录；须由符合来源条件的同步任务恢复后，再登录</td> </tr> </tbody> </table>

完整规则见[身份认证](https://docs.qwenwork.cn/enterprise-ultimate/users/authentication)。
