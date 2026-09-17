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
sourceRel: "md/enterprise-ultimate-users-authentication.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-users-authentication.md"
sourceSha256: "05ded83e433c4ec9280c36412acc70d2ac36d77f5893ceacfb45610b1d901101"
pageSha256: "05ded83e433c4ec9280c36412acc70d2ac36d77f5893ceacfb45610b1d901101"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

身份认证决定成员如何登录企业环境。进入 用户与体验 → 用户管理 → 身份认证，可在「登录方式」「可信邮箱域名」「SSO 登录」三个页签中配置。

## 配置登录方式
1. 在「登录方式」中选择需要开放的方式：账号加密码、邮箱加验证码或 SSO。
2. 打开「账号 + 密码」开关，在确认弹窗中查看检查结果。检查覆盖全部未删除用户，包括管理员和停用用户；登录字段固定为账号。
3. 如果有用户缺少账号或可用密码，点击【下载缺失用户 Excel】，补齐后通过用户管理的【导入更新】处理。前往导入更新会关闭弹窗，此时登录开关保持原状态。
4. 点击【确认开启】后立即生效。存在缺失信息也可以开启，但缺失用户补齐后才能使用账号密码登录。点击【取消】不修改开关；企业至少保留一种可用登录方式。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-7bc0502f21005fd3.png)

*通过开关启停登录方式；开启账号密码时会检查全部用户的账号和密码。*

已填写可信邮箱的成员可通过邮箱加验证码登录。启用 SSO 前，需要先配置、测试并启用一条认证源。仅开启 SSO 时，成员直接进入企业身份验证；同时开放其他方式时，成员在登录页选择。

## 检查账号
点击「账号 + 密码」卡片上的【检查账号】，可随时检查全部未删除用户，包括管理员和停用用户。检查页会说明哪些用户缺少账号或密码，支持下载缺失用户 Excel，并通过【前往导入更新】补齐。检查和导出不改变登录开关。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-0a7de53351058f9a.png)

*检查页显示全部用户的校验结果；存在缺失项时，可下载清单并前往导入更新。*

## 维护可信邮箱域名
1. 切换到「可信邮箱域名」，点击【添加可信邮箱域名】。
2. 填写企业邮箱域名，例如 example.com，不要填写邮箱账号、@、协议或网页路径。
3. 点击【保存】，回到列表检查域名及状态。需要调整时使用该行【编辑】。
4. 确认企业用户填写的邮箱都属于允许的域名。成员在客户端的「旗舰版登录配置」中通过邮箱域名验证后，可以获取对应的企业服务地址。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-fef1547570c5c1cd.png)

*这里维护邮箱域名；它与 SSO 回调域名、模型服务域名用途不同。*

## 按企业身份平台配置 SSO
SSO（Single Sign-On，单点登录）由企业身份平台验证身份，再将结果返回千问办公。每种方式的应用、凭据和关联字段不同，请按实际平台选择教程。

设置「关联规则」时：

1. 在【添加映射】下拉中选择目标字段，页面添加一行并带入预设来源。
2. 核对左侧来源。只有三方 ID、账号、工号可选择来源；姓名、邮箱、手机号的来源固定，右侧目标字段均固定。
3. 保留必填的三方 ID 和姓名映射。可选项可以删除后重新添加。
4. 修改映射后，重新测试认证并保存。

<table> <thead> <tr> <td>企业使用的认证源</td> <td>独立配置教程</td> </tr> </thead> <tbody> <tr> <td>钉钉企业内部应用</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/authentication/dingtalk-sso">钉钉 SSO</a></td> </tr> <tr> <td>飞书企业自建应用</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/authentication/feishu-sso">飞书 SSO</a></td> </tr> <tr> <td>企业微信自建应用</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/authentication/wecom-sso">企业微信 SSO</a></td> </tr> <tr> <td>提供 OAuth2 授权与用户信息接口的平台</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/authentication/oauth-sso">OAuth2</a></td> </tr> <tr> <td>提供 OIDC 协议的身份平台</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/authentication/oidc-sso">OIDC</a></td> </tr> <tr> <td>Microsoft Entra ID 企业应用</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/authentication/entra-id-sso">Azure AD / Entra ID</a></td> </tr> <tr> <td>提供 SAML 元数据或断言的身份平台</td> <td><a href="https://docs.qwenwork.cn/enterprise-ultimate/users/authentication/saml-sso">SAML2</a></td> </tr> </tbody> </table>

按以下顺序完成接入：

1. 准备身份平台应用，交换应用凭据和回调信息。
2. 设置用户关联，测试并保存配置。
3. 启用认证源，再开启「SSO 登录」方式。
4. 使用普通成员完成一次实际登录。

**警告**

企业同一时间只使用一个生效的 SSO 认证源。切换时请核对确认提示中的来源。

开启「自动创建用户」时，认证成功、三方 ID 未命中且账号、邮箱、手机号、工号均无冲突的成员可以创建。必须指定默认部门，并决定是否自动授予席位；随后可通过【自动创建用户记录】核对。

SSO **只通过三方 ID 查找用户**，处理规则如下：
<table> <thead> <tr> <td>情况</td> <td>处理结果</td> </tr> </thead> <tbody> <tr> <td>命中已有用户，其他身份字段无冲突</td> <td>完成登录，保留现有资料和同步来源</td> </tr> <tr> <td>账号、邮箱、手机号或工号指向其他用户</td> <td>本次登录失败</td> </tr> <tr> <td>创建新用户</td> <td>不设置持续同步来源；以后被同步接管时，才按同步规则锁定字段</td> </tr> <tr> <td>命中已删除用户</td> <td>拒绝登录，只能在符合来源条件时由<a href="https://docs.qwenwork.cn/enterprise-ultimate/users/user-sync">同步任务恢复</a></td> </tr> </tbody> </table>

## 新用户首次创建密码
用户同时满足以下条件时，需要在首次认证后创建自己的密码：

* 企业已开启账号密码登录。
* 用户已发放初始密码，且仍处于初始密码状态。
* 用户从未完成登录。

即使本次使用邮箱验证码或 SSO 认证，符合上述条件时也需要创建密码。  
**说明**

同步或 SSO 创建用户资料不会自动发放初始密码；未发放本地密码的用户不能使用账号密码登录。已完成登录的成员，不会因企业后来开启密码登录而被要求重新创建。

管理员可将以下步骤告知新成员：

1. 使用企业允许的登录方式完成身份认证。
2. 在「创建登录密码」页面输入新密码和确认密码。密码至少 8 个字符，包含字母、数字和特殊字符。
3. 点击【创建密码并进入千问办公】，完成后进入工作区。

如果成员退出创建密码页面，或密码不符合要求、两次输入不一致，系统不会建立登录会话。管理员可检查用户的最近登录时间，判断是否已完成首次登录。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-f5c9e59befe0e5de.png)

*完成身份认证后，符合条件的新用户还需要设置自己的密码。*

## 登录失败时从哪里查
先核对用户状态与席位，再查登录方式和当前启用的认证源。SSO 失败时，对照对应教程检查回调、证书、权限和关联字段；同时记录发生时间与用户标识，查询[用户日志](https://docs.qwenwork.cn/enterprise-ultimate/audit-logs/user-logs)。
