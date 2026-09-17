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
sourceRel: "md/enterprise-ultimate-users-authentication-entra-id-sso.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-users-authentication-entra-id-sso.md"
sourceSha256: "36fc70a3035114c24fe1af2db9163f275cde4ecc8b40fa2c5055b472b832bfe3"
pageSha256: "36fc70a3035114c24fe1af2db9163f275cde4ecc8b40fa2c5055b472b832bfe3"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

Microsoft Entra ID 原名 Azure AD。本页通过企业应用的 SAML 单点登录接入；千问办公新增认证源时，对应的类型仍显示为「Azure AD」。这与使用 Client Secret 读取通讯录的 Entra ID 用户同步是两套配置。

## 准备企业应用
需要 Microsoft Entra 企业应用配置权限，以及千问办公身份认证配置权限。确认企业使用的是微软全球服务还是由世纪互联运营的中国服务，并进入相应租户。

1. 打开 [Microsoft Entra 管理中心](https://entra.microsoft.com/)，进入 Entra ID → 企业应用。
2. 点击【新建应用程序】，为千问办公创建企业应用；使用已有专用应用时直接打开它。
3. 进入该应用的「单一登录」，选择「SAML」。
4. 暂时保留页面，下一节取得千问办公的 SP 信息后，再填写「基本 SAML 配置」。SP 指接收身份验证结果的服务提供方，此处是千问办公。

## 填写千问办公的 SP 信息
1. 在千问办公进入 用户与体验 → 用户管理 → 身份认证 → SSO 登录，点击【新增认证源】，选择「Azure AD」。
2. 填写 **认证源名称** ，在「QwenWork SP 信息」中复制 **Identifier (Entity ID)** 和 **Reply URL**。
3. 返回 Entra 企业应用的「基本 SAML 配置」，把两项分别填写到「标识符（实体 ID）」和「回复 URL（断言使用者服务 URL）」并保存。
4. 如企业应用要求验证签名请求，在千问办公下载【签名证书】，按 Entra 应用的签名验证设置导入。不要把 IdP 签名证书与千问办公的 SP 签名证书混用。

## 导入 Entra 元数据
1. 在 Entra 应用的「SAML 证书」区域找到 **应用联合元数据 URL（App Federation Metadata URL）**，复制完整地址。
2. 回到千问办公，将其填入 **Metadata URL**，点击【解析】。
3. 检查解析出的「Microsoft Entra 标识符」「登录 URL」和「签名证书」是否对应正确租户。中国服务使用其实际提供的地址，不要将全球服务域名手动替换后使用。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-2c9c6e1cbc9ede0c.png)

*从 Entra 企业应用取得 Metadata URL；下方 SP 信息需要反向填写到同一个企业应用中。*

## 配置声明、分配用户并测试
1. 在 Entra 企业应用的「属性和声明」中，核对用户唯一标识、姓名和邮箱。千问办公默认关联项包含 objectidentifier、name 和 emailaddress。
2. 在千问办公「关联规则」中核对「第三方用户 ID」「用户姓名」和「邮箱」。姓名和邮箱固定读取 name、emailaddress 声明；若 name 应显示中文姓名，在 Entra 侧调整该声明的值。三方 ID、账号、工号可选择来源，其他来源字段固定。新增时从【添加映射】下拉选择目标，加入后右侧目标字段固定；可选映射可删除后重新添加。
3. 在 Entra 的「用户和组」中，把测试成员分配到该企业应用。即使 SAML 配置正确，未获得应用访问权的成员也可能无法登录。
4. 根据开通方式选择是否「自动创建用户」；开启时选择默认加入部门，并确认是否授予席位。
5. 点击【测试认证】，通过后【保存配置】并启用认证源，再在「登录方式」中开启 SSO。
6. 请测试成员从千问办公企业入口完成登录，核对身份和企业归属；同时查看 Entra 的登录日志，确认使用了预期应用。

需要初始化手机号时，在【添加映射】中选择「手机号」，并让 Entra 返回 MobilePhone 声明。该声明的来源固定。

## 证书更新与排障
<table> <thead> <tr> <td>问题</td> <td>处理方法</td> </tr> </thead> <tbody> <tr> <td>回复 URL 不匹配</td> <td>对比 Entra 保存的 Reply URL 与千问办公当前显示值</td> </tr> <tr> <td>提示用户未分配应用</td> <td>在 Entra「用户和组」中分配该成员，并检查租户是否正确</td> </tr> <tr> <td>解析成功但验签失败</td> <td>核对签名证书有效期、启用状态和新旧证书切换时间</td> </tr> <tr> <td>姓名或邮箱不正确</td> <td>对比 SAML 声明与千问办公关联规则，不要只改用户显示名</td> </tr> </tbody> </table>

Entra 更新签名证书后，重新解析 Metadata、测试并保存配置。提前安排轮换，避免证书过期时才处理。

## 已有用户与删除记录
SSO **只通过三方 ID 匹配用户**，匹配后的处理如下：
<table> <thead> <tr> <td>匹配结果</td> <td>处理方式</td> </tr> </thead> <tbody> <tr> <td>命中未删除用户，其他身份字段无冲突</td> <td>完成登录，保留已有资料和同步来源</td> </tr> <tr> <td>返回的账号、邮箱、手机号或工号与其他用户冲突</td> <td>拒绝本次登录，管理员处理冲突后再试</td> </tr> <tr> <td>未命中用户</td> <td>按「自动创建用户」设置处理</td> </tr> <tr> <td>命中已删除用户</td> <td>拒绝登录；须由符合来源条件的同步任务恢复后，再登录</td> </tr> </tbody> </table>

完整规则见[身份认证](https://docs.qwenwork.cn/enterprise-ultimate/users/authentication)。
