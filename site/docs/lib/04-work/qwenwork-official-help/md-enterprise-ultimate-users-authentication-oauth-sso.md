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
sourceRel: "md/enterprise-ultimate-users-authentication-oauth-sso.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-users-authentication-oauth-sso.md"
sourceSha256: "f6ab7781072407ae93959797aa4be9db6c682b6b06f2e5a8bc11fa37bd23620c"
pageSha256: "f6ab7781072407ae93959797aa4be9db6c682b6b06f2e5a8bc11fa37bd23620c"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

企业身份系统提供 OAuth 2.0 授权接口和用户信息接口时，可以通过通用 OAuth2 认证源接入千问办公。此方式需要分别配置授权、Token（访问令牌）和用户信息三个端点，并明确令牌如何传递。

## 向身份系统取得接入信息
在企业身份系统中注册一个供千问办公使用的应用，启用授权码方式，并取得下列信息。具体菜单由身份系统决定，不能用 OIDC 的发现地址代替这些接口。
<table> <thead> <tr> <td>准备项</td> <td>需要确认的内容</td> </tr> </thead> <tbody> <tr> <td>Client ID、Client Secret</td> <td>同一应用的客户端标识和密钥</td> </tr> <tr> <td>认证授权端点 URL</td> <td>浏览器跳转后由成员完成身份验证的地址</td> </tr> <tr> <td>Token 端点 URL</td> <td>使用授权码交换访问令牌的地址</td> </tr> <tr> <td>用户信息端点 URL</td> <td>使用访问令牌读取当前用户资料的地址</td> </tr> <tr> <td>Scopes 授权范围</td> <td>读取所需身份字段的权限范围，多个值按页面要求分隔</td> </tr> <tr> <td>Token 端点认证方式</td> <td>身份系统要求 Basic Auth 还是 Form Post</td> </tr> <tr> <td>UserInfo 令牌携带方式</td> <td>请求头、URI 请求参数或表单编码</td> </tr> </tbody> </table>

另外，请身份系统提供一份脱敏的用户信息响应，确定唯一标识、姓名和邮箱的字段路径。

## 配置认证安全
在「认证安全」中，按身份平台要求选择 Token 端点认证方式：Basic Auth 将应用凭据放在认证头中，Form Post 将应用凭据放在表单中。PKCE（授权码交换保护）可选择 S256 或关闭；修改后需重新测试认证并保存。

Token 端点认证与 UserInfo 请求携带访问令牌的方式是两项配置，请分别按身份平台要求填写。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-3b2db83f08159eeb.png)

*按身份提供商要求选择 Basic Auth 或 Form Post，以及 PKCE 的 S256 或关闭。*

## 创建通用 OAuth2 认证源
1. 进入 用户与体验 → 用户管理 → 身份认证 → SSO 登录。
2. 点击【新增认证源】，选择「通用 OAuth2 / OIDC」。
3. 填写 **认证源名称** ，将 **协议类型** 切换为「OAuth2」。
4. 填写 **Client ID** 、**Client Secret** 和 **Scopes 授权范围**。
5. 点击【复制回调链接】，在企业身份系统的应用设置中登记为允许的回调地址，并保存。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-312c1929e2fa5aad.png)

*协议选择 OAuth2 后，页面显示 OAuth2 所需的令牌认证和传递方式。*

## 填写三个端点
1. 在「Endpoint 设置」中，按身份系统要求选择 **检验 Token 身份验证方式**。Basic Auth 在请求头中传递应用凭证；Form Post 在表单中传递。两端必须使用同一种方式。
2. 选择 **UserInfo 接口 Token 携带方式**。这控制访问令牌如何发往用户信息接口，与上一步的应用凭证认证不同。
3. 分别填写 **认证授权端点 URL** 、**Token 端点 URL** 、**用户信息端点 URL**。检查均为身份系统提供的 HTTPS 地址。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-72864d4ad2d221a4.png)

*三个端点分别承担发起授权、交换令牌和读取用户资料的职责。*

## 配置关联规则并验证
1. 在「关联规则」中，选择能稳定标识同一个人的来源字段，对应「第三方用户 ID」。不要使用会随个人资料变化的显示名称作为唯一标识。
2. 姓名固定读取 user.name，邮箱与手机号分别读取 user.email、user.phone_number，请让 UserInfo 返回这些字段。需要补充资料时，从【添加映射】下拉选择目标，选中后添加一行，右侧目标字段固定；只有三方 ID、账号、工号的来源可以选择。必填行不可删除，可选行删除后可重新添加。
3. 决定是否开启「自动创建用户」。开启后选择默认部门；需要自动授予席位时再开启对应选项。
4. 点击【测试认证】。页面提示「测试通过」后，点击【保存配置】，再启用该认证源。
5. 在「登录方式」中开启 SSO，并请测试成员从企业入口完成登录，核对其企业、用户身份和席位。

## 排查接口与映射错误
<table> <thead> <tr> <td>错误发生位置</td> <td>检查内容</td> </tr> </thead> <tbody> <tr> <td>授权页面打不开</td> <td>授权端点、应用状态、允许的回调地址及成员访问范围</td> </tr> <tr> <td>交换 Token 失败</td> <td>Client ID/Secret、Basic Auth/Form Post、授权码回调地址是否一致</td> </tr> <tr> <td>Token 已取得但用户信息失败</td> <td>UserInfo 端点、令牌携带方式、Scopes 是否包含资料读取权限</td> </tr> <tr> <td>用户无法关联</td> <td>三方 ID 的实际字段路径与空值，以及账号、邮箱是否被其他用户占用</td> </tr> </tbody> </table>

修改端点、密钥或字段关联后，重新执行测试。删除动态认证源前先停用；如果它承担企业登录，先验证替代方式可用。

## 已有用户与删除记录
SSO **只通过三方 ID 匹配用户**，匹配后的处理如下：
<table> <thead> <tr> <td>匹配结果</td> <td>处理方式</td> </tr> </thead> <tbody> <tr> <td>命中未删除用户，其他身份字段无冲突</td> <td>完成登录，保留已有资料和同步来源</td> </tr> <tr> <td>返回的账号、邮箱、手机号或工号与其他用户冲突</td> <td>拒绝本次登录，管理员处理冲突后再试</td> </tr> <tr> <td>未命中用户</td> <td>按「自动创建用户」设置处理</td> </tr> <tr> <td>命中已删除用户</td> <td>拒绝登录；须由符合来源条件的同步任务恢复后，再登录</td> </tr> </tbody> </table>

完整规则见[身份认证](https://docs.qwenwork.cn/enterprise-ultimate/users/authentication)。
