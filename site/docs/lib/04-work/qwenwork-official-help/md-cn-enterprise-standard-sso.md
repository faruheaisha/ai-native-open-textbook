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
sourceRel: "md/cn-enterprise-standard-sso.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/cn-enterprise-standard-sso.md"
sourceSha256: "cc908b4f0d96c1ce6f83756767923e19475779171cad363face9bd16bdee7902"
pageSha256: "cc908b4f0d96c1ce6f83756767923e19475779171cad363face9bd16bdee7902"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

**说明**

**适用角色：** 企业超级管理员、身份系统管理员（IdP 管理员）

**适用提供商：** 飞书、钉钉、企业微信、Microsoft Entra ID（原 Azure AD）、通用 OAuth2/OIDC（含 BUC）

本文说明：

* 千问办公后台的每个配置项是什么、该填什么；

* 对应信息应从哪里获取；

* 身份提供商侧需要登记哪些回调地址；

* 配置创建、审核、生效和验证的完整流程；

* 当前版本的限制和容易填错的字段。

身份提供商控制台的菜单名称可能随版本调整。菜单名称不一致时，可按本文给出的关键词搜索，例如"应用凭证""重定向 URI""回调地址""用户授权""JWKS"。

## 一、完成路径
1. 确认千问办公对外访问域名。

2. 在身份提供商侧创建或选择一个企业应用。

3. 在身份提供商应用中登记回调地址并开通所需权限。

4. 收集 Client ID、Client Secret、企业标识和端点等信息。

5. 进入千问办公管理后台创建 SSO 连接。

6. 提交审核，等待审核通过。

7. 使用普通成员账号完成登录验证。

**警告**

"创建成功"只代表草稿已保存。只有审核通过后的配置才会进入线上登录链路。

## 二、配置前准备
### 2.1 管理员与坐席要求

* 必须使用企业超级管理员账号。当前管理后台只向超级管理员显示"单点登录"菜单，相关操作也要求企业超级管理员权限。

* 组织席位数必须达到后台实时显示的最低要求。当前版本至少需要 `1` 个席位，具体以页面提示为准。

* 建议由企业超级管理员和 IdP 管理员共同操作：前者负责千问办公后台，后者负责飞书、钉钉、企业微信、Entra ID 或企业身份系统。

进入路径：

```
HELPCODEESCAPE-plaintext
千问办公 → 管理后台 → 设置 → 单点登录
```

### 2.2 确认"千问办公访问域名"

"千问办公访问域名"是成员实际访问千问办公时使用的公网域名，不是内部服务地址，也不包含页面路径。

例如，管理后台地址为：

```
HELPCODEESCAPE-plaintext
https://qwenwork.cn/admin
```

则访问域名为：

```
HELPCODEESCAPE-plaintext
work.example.com
```

获取位置：

1. 优先从生产环境千问办公页面的浏览器地址栏获取。

2. 如果使用独立部署域名，向负责域名、Ingress 或网关的运维人员确认公网域名。

3. 如果部署侧配置了 `SSO_CALLBACK_URL` 覆盖值，应向运维人员索取最终回调地址，不要自行按域名拼接。

### 2.3 在 IdP 侧登记回调地址

在身份提供商应用的"回调地址""重定向 URI"或"Redirect URI"位置登记以下地址：

```
HELPCODEESCAPE-plaintext
https://qwenwork.cn/biz/user/v1/sso/callback
```

注意事项：

* 必须使用 HTTPS。

* 协议、域名、端口、路径和末尾斜杠必须与登记值完全一致。

* 通用 OIDC 的 `/biz/signin/` 末尾包含 `/`，不要省略。

* 不要把身份提供商自己的授权地址填成千问办公回调地址。

* 桌面客户端回调只在确实使用桌面 SSO 时添加。

## 三、先理解所有通用字段
下列字段会出现在多个提供商中。
<table> <thead> <tr> <td><p><b>千问办公字段</b></p></td> <td><p><b>是否必填</b></p></td> <td><p><b>字段说明</b></p></td> <td><p><b>填写规则</b></p></td> <td><p><b>从哪里获取</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>提供商类型</p></td> <td><p>是</p></td> <td><p>决定千问办公使用哪一种身份协议适配器</p></td> <td><p>按实际 IdP 选择；创建后当前界面不可修改</p></td> <td><p>根据企业实际使用的身份系统判断</p></td> </tr> <tr> <td><p>协议</p></td> <td><p>仅通用类型必填</p></td> <td><p>在 OAuth2 和 OIDC 之间选择</p></td> <td><p>IdP 返回 <code>id_token</code> 并提供 OIDC 元数据时通常选 OIDC；仅授权码、Access Token 和 UserInfo 时选 OAuth2</p></td> <td><p>查看 IdP 接入文档或向 IdP 管理员确认</p></td> </tr> <tr> <td><p>连接名称</p></td> <td><p>是</p></td> <td><p>仅用于管理员识别，不参与认证</p></td> <td><p>建议使用"公司/系统 + 环境"，如"示例公司 Entra ID - 生产"</p></td> <td><p>企业自行命名</p></td> </tr> <tr> <td><p>Scopes</p></td> <td><p>视提供商而定</p></td> <td><p>请求 IdP 授予的身份信息范围</p></td> <td><p>多个 Scope 使用空格分隔，不要使用中文逗号</p></td> <td><p>IdP 应用的权限/用户授权页面及 IdP 文档</p></td> </tr> <tr> <td><p>邮箱域名白名单</p></td> <td><p>实际使用时必须</p></td> <td><p>成员在 SSO 登录页输入邮箱后，系统用邮箱后缀查找连接</p></td> <td><p>只填 <code>example.com</code>，不要填 <code>@example.com</code>；多个域名用英文逗号分隔</p></td> <td><p>企业邮箱地址后缀、邮件系统管理员或域名管理员</p></td> </tr> <tr> <td><p>启用 SSO</p></td> <td><p>是</p></td> <td><p>控制审核通过的连接能否被成员发现和使用</p></td> <td><p>上线时开启；创建时开启也不会绕过审核</p></td> <td><p>千问办公后台开关</p></td> </tr> <tr> <td><p>扫码登录</p></td> <td><p>企业微信可见</p></td> <td><p>允许 PC 浏览器显示企业微信扫码登录</p></td> <td><p>按需开启</p></td> <td><p>千问办公后台开关；无需从 IdP 获取值</p></td> </tr> </tbody> </table>

### 3.1 邮箱域名白名单特别说明

示例：成员邮箱是 `zhangsan@example.com`，应填写：

```
HELPCODEESCAPE-plaintext
example.com
```

多个域名示例：

```
HELPCODEESCAPE-plaintext
example.com, example.cn
```

域名白名单的作用：

1. 成员输入邮箱后，千问办公取 `@` 后面的域名查找已审核连接。

2. 只有审核快照中的域名会参与登录路由；草稿中的域名不会抢占线上登录。

3. 同一域名不能同时被其他组织的已审核 SSO 配置使用。

4. 公共邮箱域名及系统保留域名不能登记，例如 `gmail.com`、`outlook.com`、`qq.com`、`163.com`、`dingtalk.local` 等。

5. 当前首次登录自动创建成员的实现也要求至少存在一个已审核域名，因此不要留空。

## 四、按提供商填写配置
### 4.1 飞书

#### 需要提前在飞书侧完成

1. 登录飞书开放平台，进入开发者后台。

2. 创建或选择企业自建应用。

3. 在应用的"凭证与基础信息"中获取 App ID 和 App Secret。

4. 在应用的"安全设置""重定向 URL"或同类页面登记千问办公回调地址。

5. 在权限管理中开通用户身份信息所需权限，并确保应用对测试成员可用。

#### 千问办公字段

<table> <thead> <tr> <td><p><b>字段</b></p></td> <td><p><b>是否必填</b></p></td> <td><p><b>填什么</b></p></td> <td><p><b>从哪里获取</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>连接名称</p></td> <td><p>是</p></td> <td><p>自定义名称，例如"示例公司飞书 SSO"</p></td> <td><p>企业自行命名</p></td> </tr> <tr> <td><p>App ID</p></td> <td><p>是</p></td> <td><p>飞书应用唯一标识</p></td> <td><p>飞书开放平台 → 应用 → 凭证与基础信息</p></td> </tr> <tr> <td><p>App Secret</p></td> <td><p>是</p></td> <td><p>飞书应用密钥</p></td> <td><p>与 App ID 同一页面；只复制密钥值，不要公开传播</p></td> </tr> <tr> <td><p>Scopes</p></td> <td><p>否</p></td> <td><p>按飞书应用已开通的用户授权范围填写，空格分隔；当前界面默认留空</p></td> <td><p>飞书开放平台 → 应用 → 权限管理/用户授权范围</p></td> </tr> <tr> <td><p>邮箱域名白名单</p></td> <td><p>是</p></td> <td><p>企业邮箱后缀，例如 <code>example.com</code></p></td> <td><p>企业邮箱系统或域名管理员</p></td> </tr> <tr> <td><p>启用 SSO</p></td> <td><p>是</p></td> <td><p>上线时开启</p></td> <td><p>千问办公后台</p></td> </tr> </tbody> </table>

当前版本行为说明：

* 当前管理后台固定使用中国区飞书配置；系统虽然支持 Lark 国际区，但管理后台暂未提供区域选择。

* 飞书适配器优先使用 `union_id` 作为稳定身份标识，缺失时回退到 `open_id`。

* Scopes 为空时，适配器不会主动向授权 URL 添加 `scope` 参数。

### 4.2 钉钉

#### 需要提前在钉钉侧完成

1. 登录钉钉开放平台，进入应用开发/应用管理。

2. 创建或选择企业内部应用。

3. 在应用凭证页面获取 AppKey 和 AppSecret。

4. 配置 OAuth 回调地址。

5. 开通读取当前登录用户信息的权限。千问办公会调用钉钉 `contact/users/me` 接口，需确保应用权限和成员授权范围允许访问。

6. 如果要从钉钉工作台进入千问办公，稍后把千问办公生成的"登录 URL"配置为应用主页地址。

#### 千问办公字段

<table> <thead> <tr> <td><p><b>字段</b></p></td> <td><p><b>是否必填</b></p></td> <td><p><b>填什么</b></p></td> <td><p><b>从哪里获取</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>连接名称</p></td> <td><p>是</p></td> <td><p>自定义名称，例如"示例公司钉钉 SSO"</p></td> <td><p>企业自行命名</p></td> </tr> <tr> <td><p>Corp ID（可选）</p></td> <td><p>否</p></td> <td><p>当前企业的钉钉组织 Corp ID，通常以 <code>ding</code> 开头</p></td> <td><p>钉钉管理后台/开放平台的企业信息或组织信息页面</p></td> </tr> <tr> <td><p>AppKey（Client ID）</p></td> <td><p>是</p></td> <td><p>钉钉应用 AppKey</p></td> <td><p>钉钉开放平台 → 应用 → 应用凭证</p></td> </tr> <tr> <td><p>AppSecret</p></td> <td><p>是</p></td> <td><p>钉钉应用 AppSecret</p></td> <td><p>与 AppKey 同一凭证页面</p></td> </tr> <tr> <td><p>Scopes</p></td> <td><p>建议保留</p></td> <td><p>默认 <code>openid corpid</code></p></td> <td><p>千问办公会自动带出；额外范围按钉钉应用权限和接入文档确认</p></td> </tr> <tr> <td><p>邮箱域名白名单</p></td> <td><p>是</p></td> <td><p>企业邮箱后缀</p></td> <td><p>企业邮箱系统或域名管理员</p></td> </tr> <tr> <td><p>启用 SSO</p></td> <td><p>是</p></td> <td><p>上线时开启</p></td> <td><p>千问办公后台</p></td> </tr> </tbody> </table>

当前版本行为说明：

* 登录身份使用钉钉返回的 `unionId`。

* `Corp ID` 在当前配置中为可选元数据；AppKey 和 AppSecret 才是完成 OAuth 交换的核心凭据。

* 系统支持钉钉 QR 登录，但当前管理后台没有展示钉钉"扫码登录"开关。

### 4.3 企业微信

#### 需要提前在企业微信侧完成

1. 登录企业微信管理后台。

2. 在"我的企业/企业信息"中获取企业 ID（Corp ID）。

3. 进入"应用管理"，创建或选择自建应用。

4. 在应用详情中获取 AgentId 和 Secret。

5. 在应用的网页授权、OAuth、可信域名或回调域名设置中登记千问办公回调地址和域名。

6. 确认应用可见范围包含测试成员。

#### 千问办公字段

<table> <thead> <tr> <td><p><b>字段</b></p></td> <td><p><b>是否必填</b></p></td> <td><p><b>填什么</b></p></td> <td><p><b>从哪里获取</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>连接名称</p></td> <td><p>是</p></td> <td><p>自定义名称，例如"示例公司企业微信 SSO"</p></td> <td><p>企业自行命名</p></td> </tr> <tr> <td><p>企业 Corp ID</p></td> <td><p>是</p></td> <td><p>企业级 Corp ID，通常以 <code>ww</code> 开头</p></td> <td><p>企业微信管理后台 → 我的企业/企业信息 → 企业 ID</p></td> </tr> <tr> <td><p>身份凭据区域的 <code>Corp ID</code></p></td> <td><p>是</p></td> <td><p><b>实际应填写应用 AgentId</b>，不是企业 Corp ID</p></td> <td><p>企业微信管理后台 → 应用管理 → 自建应用 → AgentId</p></td> </tr> <tr> <td><p>Agent Secret</p></td> <td><p>是</p></td> <td><p>自建应用的 Secret</p></td> <td><p>同一自建应用详情页</p></td> </tr> <tr> <td><p>Scopes</p></td> <td><p>建议保留</p></td> <td><p>默认 <code>snsapi_base</code>；需要用户详细资料时可与企业微信管理员评估 <code>snsapi_privateinfo</code></p></td> <td><p>企业微信网页授权文档及应用权限设置</p></td> </tr> <tr> <td><p>邮箱域名白名单</p></td> <td><p>是</p></td> <td><p>企业邮箱后缀</p></td> <td><p>企业邮箱系统或域名管理员</p></td> </tr> <tr> <td><p>启用 SSO</p></td> <td><p>是</p></td> <td><p>上线时开启</p></td> <td><p>千问办公后台</p></td> </tr> <tr> <td><p>扫码登录</p></td> <td><p>否</p></td> <td><p>PC 浏览器需要扫码登录时开启</p></td> <td><p>千问办公后台</p></td> </tr> </tbody> </table>  
**警告**

**最容易填错：** 当前界面在"身份凭据"区域把 AgentId 显示为 `Corp ID`。系统实际将该值作为应用 `AgentId` 使用；上方"企业 Corp ID"字段才填写企业 ID。

当前版本行为说明：

* `snsapi_base` 可取得企业成员 `userid`，适合基础登录。

* `snsapi_privateinfo` 可能返回 `user_ticket`，千问办公会进一步尝试获取姓名、手机号和企业邮箱等敏感字段。

* 企业微信应用级 Token 由千问办公服务端使用企业 Corp ID 与 Agent Secret 获取并缓存，无需管理员手工填写 Token。

### 4.4 Microsoft Entra ID（原 Azure AD）

#### 需要提前在 Microsoft 侧完成

1. 登录 Microsoft Entra 管理中心。

2. 进入"应用注册（App registrations）"，创建或选择应用。

3. 在"概述（Overview）"获取 Application (client) ID 和 Directory (tenant) ID。

4. 在"身份验证（Authentication）"中添加 Web 平台 Redirect URI。

5. 在"证书和密码（Certificates \& secrets）"中创建客户端密码。

6. 在"API 权限（API permissions）"中确认 OpenID 基础权限可用。

#### 千问办公字段

<table> <thead> <tr> <td><p><b>字段</b></p></td> <td><p><b>是否必填</b></p></td> <td><p><b>填什么</b></p></td> <td><p><b>从哪里获取</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>连接名称</p></td> <td><p>是</p></td> <td><p>自定义名称，例如"示例公司 Entra ID - 生产"</p></td> <td><p>企业自行命名</p></td> </tr> <tr> <td><p>Azure Tenant</p></td> <td><p>是</p></td> <td><p><code>organizations</code>、<code>common</code>、租户 GUID 或已验证租户域名</p></td> <td><p>Entra 管理中心 → 应用注册 → 概述 → Directory (tenant) ID；单租户建议填 GUID</p></td> </tr> <tr> <td><p>Application (client) ID</p></td> <td><p>是</p></td> <td><p>应用的 Client ID</p></td> <td><p>Entra 管理中心 → 应用注册 → 概述</p></td> </tr> <tr> <td><p>Client Secret</p></td> <td><p>是</p></td> <td><p>客户端密码的 <b>Value/值</b>，不是 Secret ID</p></td> <td><p>Entra 管理中心 → 应用注册 → 证书和密码；创建后立即复制</p></td> </tr> <tr> <td><p>Scopes</p></td> <td><p>建议保留</p></td> <td><p>默认 <code>openid profile email offline_access</code></p></td> <td><p>千问办公自动带出；如需调整，依据 Entra 应用权限策略</p></td> </tr> <tr> <td><p>邮箱域名白名单</p></td> <td><p>是</p></td> <td><p>企业登录邮箱后缀</p></td> <td><p>Microsoft 365/企业邮箱管理员</p></td> </tr> <tr> <td><p>启用 SSO</p></td> <td><p>是</p></td> <td><p>上线时开启</p></td> <td><p>千问办公后台</p></td> </tr> </tbody> </table>

Tenant 选择建议：

* `organizations`：允许任意 Microsoft 工作或学校账号，适用于多租户企业应用。

* `common`：范围更宽，可能包含个人 Microsoft 账号；企业内部 SSO 通常不优先使用。

* 租户 GUID：只允许指定租户，单企业接入最清晰。

* 租户域名：例如 `contoso.onmicrosoft.com`，需确保是该租户已验证域名。

当前版本行为说明：

* Entra 的授权、Token 和 JWKS 地址由千问办公根据 Tenant 自动生成，无需手工填写。

* 千问办公用 `oid`，缺失时用 `sub`，作为稳定用户标识。

* Client Secret 到期后会出现 `invalid client` 一类错误，应在 Entra 侧新建密码并在千问办公中轮换。

### 4.5 通用 OAuth2

通用 OAuth2 适用于 Authing、Okta、Auth0、自建身份平台、部分 BUC 接入等支持标准授权码流程的 IdP。

#### 千问办公字段

<table> <thead> <tr> <td><p><b>字段</b></p></td> <td><p><b>是否必填</b></p></td> <td><p><b>填什么</b></p></td> <td><p><b>从哪里获取</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>协议</p></td> <td><p>是</p></td> <td><p>选择 <code>OAuth2</code></p></td> <td><p>IdP 接入文档</p></td> </tr> <tr> <td><p>连接名称</p></td> <td><p>是</p></td> <td><p>自定义名称</p></td> <td><p>企业自行命名</p></td> </tr> <tr> <td><p>Client ID</p></td> <td><p>是</p></td> <td><p>IdP 为千问办公应用分配的客户端 ID</p></td> <td><p>IdP 管理控制台 → 应用/客户端 → 凭证</p></td> </tr> <tr> <td><p>Client Secret</p></td> <td><p>是</p></td> <td><p>对应客户端密钥</p></td> <td><p>与 Client ID 同一应用凭证页面</p></td> </tr> <tr> <td><p>授权 URL</p></td> <td><p>是</p></td> <td><p>用户浏览器进入的授权端点，例如 <code>https://idp.example.com/oauth2/authorize</code></p></td> <td><p>IdP OAuth2 文档、应用接入信息或 OIDC Discovery 文档中的 <code>authorization_endpoint</code></p></td> </tr> <tr> <td><p>Token URL</p></td> <td><p>是</p></td> <td><p>用授权码换 Token 的端点</p></td> <td><p>IdP 文档或 Discovery 中的 <code>token_endpoint</code></p></td> </tr> <tr> <td><p>UserInfo URL</p></td> <td><p>是</p></td> <td><p>使用 Access Token 获取用户信息的端点</p></td> <td><p>IdP 文档或 Discovery 中的 <code>userinfo_endpoint</code></p></td> </tr> <tr> <td><p>唯一 ID 字段</p></td> <td><p>是</p></td> <td><p>用户信息响应中长期稳定且不可复用的字段名；默认 <code>sub</code></p></td> <td><p>查看 IdP 的 UserInfo 示例响应或实际测试响应</p></td> </tr> <tr> <td><p>登录名字段</p></td> <td><p>否</p></td> <td><p>用户账号字段名；一般可留空；BUC 建议 <code>account</code></p></td> <td><p>IdP UserInfo 响应字段说明</p></td> </tr> <tr> <td><p>Scopes</p></td> <td><p>建议保留默认</p></td> <td><p>至少覆盖唯一标识及登录所需用户信息；默认 <code>openid profile email</code></p></td> <td><p>IdP 应用权限页面和 OAuth2 文档</p></td> </tr> <tr> <td><p>邮箱域名白名单</p></td> <td><p>是</p></td> <td><p>企业邮箱后缀</p></td> <td><p>企业邮箱系统或域名管理员</p></td> </tr> <tr> <td><p>启用 SSO</p></td> <td><p>是</p></td> <td><p>上线时开启</p></td> <td><p>千问办公后台</p></td> </tr> </tbody> </table>

#### BUC 建议值

```
HELPCODEESCAPE-plaintext
唯一 ID 字段：account_id
登录名字段：account
```

"唯一 ID 字段"用于绑定同一名员工，必须选择不会因姓名、邮箱或部门变化而改变的字段。不要使用显示名称作为唯一 ID。

### 4.6 通用 OIDC

通用 OIDC 适用于能够签发 `id_token` 并提供验签密钥的标准 OIDC IdP。

#### 千问办公字段

<table> <thead> <tr> <td><p><b>字段</b></p></td> <td><p><b>是否必填</b></p></td> <td><p><b>填什么</b></p></td> <td><p><b>从哪里获取</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>协议</p></td> <td><p>是</p></td> <td><p>选择 <code>OIDC</code></p></td> <td><p>IdP 接入文档</p></td> </tr> <tr> <td><p>连接名称</p></td> <td><p>是</p></td> <td><p>自定义名称</p></td> <td><p>企业自行命名</p></td> </tr> <tr> <td><p>Client ID</p></td> <td><p>是</p></td> <td><p>OIDC 客户端 ID</p></td> <td><p>IdP 管理控制台 → 应用/客户端 → 凭证</p></td> </tr> <tr> <td><p>授权 URL</p></td> <td><p>是</p></td> <td><p>OIDC 授权端点</p></td> <td><p>IdP 的 <code>/.well-known/openid-configuration</code> 中的 <code>authorization_endpoint</code></p></td> </tr> <tr> <td><p>唯一 ID 字段</p></td> <td><p>是</p></td> <td><p><code>id_token</code> 或 UserInfo 中的稳定标识，通常为 <code>sub</code></p></td> <td><p>解码测试 <code>id_token</code> 或查看 IdP Claim 文档</p></td> </tr> <tr> <td><p>登录名字段</p></td> <td><p>否</p></td> <td><p>登录账号 Claim；BUC 建议 <code>account</code></p></td> <td><p>IdP Claim 文档或测试 Token</p></td> </tr> <tr> <td><p>Scopes</p></td> <td><p>建议保留默认</p></td> <td><p>默认 <code>openid profile email</code>；要完成 OIDC 登录必须包含 <code>openid</code></p></td> <td><p>IdP 应用权限和 OIDC 文档</p></td> </tr> <tr> <td><p>邮箱域名白名单</p></td> <td><p>是</p></td> <td><p>企业邮箱后缀</p></td> <td><p>企业邮箱系统或域名管理员</p></td> </tr> <tr> <td><p>JWKS URL</p></td> <td><p>与公钥二选一</p></td> <td><p>IdP 公钥集合地址，例如 <code>https://idp.example.com/.well-known/jwks.json</code></p></td> <td><p>Discovery 文档中的 <code>jwks_uri</code></p></td> </tr> <tr> <td><p>签名公钥</p></td> <td><p>与 JWKS 二选一</p></td> <td><p>PEM 格式签名公钥，包含完整 BEGIN/END 行</p></td> <td><p>IdP 管理员提供的签名证书/公钥；适用于没有 JWKS 地址的 IdP</p></td> </tr> <tr> <td><p>启用 SSO</p></td> <td><p>是</p></td> <td><p>上线时开启</p></td> <td><p>千问办公后台</p></td> </tr> </tbody> </table>

PEM 公钥格式示例：

```
HELPCODEESCAPE-pem
-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----
```

当前版本注意事项：

* 当前管理后台的通用 OIDC 使用 `id_token` 流程，不显示 Client Secret 输入框。

* 当前管理后台不提供签名算法选择，系统默认按 `RS256` 校验。因此 IdP 应配置为 RS256，并提供 JWKS URL 或 PEM 公钥。

* JWKS URL 与签名公钥至少填写一个；两者都留空会被后端拒绝。

* 当前管理后台不显示 Issuer、Token Endpoint Auth Method 等高级字段。需要这些能力时，应先确认当前版本是否支持相应 IdP，不要用错误字段代替。

## 五、创建连接
1. 打开"管理后台 → 单点登录"。

2. 首次配置时点击"配置 SSO"。

3. 选择提供商；通用类型还要选择 OAuth2 或 OIDC。

4. 填写连接名称、身份凭据、端点、字段映射、Scopes 和邮箱域名白名单。

5. 按需要打开"启用 SSO"和"扫码登录"。

6. 复核后点击"创建"。

创建后状态为"草稿"。当前界面不允许修改已创建连接的提供商类型或协议；选错时应删除并重新创建。

### 5.1 创建前字段核对

* Client ID 是否来自正确的生产应用，而不是测试应用。

* Client Secret 是否复制的是密钥值，而不是密钥名称或 ID。

* 企业微信的企业 Corp ID 与 AgentId 是否填在正确位置。

* Entra Client Secret 是否为创建时显示的 Value。

* 回调地址是否已登记，且末尾斜杠完全一致。

* OAuth2 三个端点是否各自对应授权、Token、UserInfo。

* OIDC 是否配置了可访问的 JWKS URL 或完整 PEM 公钥。

* 唯一 ID Claim 是否稳定，并能在真实 Token/UserInfo 中取得。

* 邮箱域名是否不含 `@`，多个域名是否用英文逗号分隔。

## 六、提交审核并等待生效
创建连接后，点击页面右上角"提交审核"。
<table> <thead> <tr> <td><p><b>状态</b></p></td> <td><p><b>含义</b></p></td> <td><p><b>建议操作</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>草稿</p></td> <td><p>已保存，尚未提交；或编辑后退回草稿</p></td> <td><p>复核后提交审核</p></td> </tr> <tr> <td><p>审核中</p></td> <td><p>已提交，线上仍未采用新版本</p></td> <td><p>等待审核，不要重复提交</p></td> </tr> <tr> <td><p>审核通过</p></td> <td><p>当前审核快照已进入线上登录链路</p></td> <td><p>使用普通成员账号验证</p></td> </tr> <tr> <td><p>已驳回</p></td> <td><p>审核未通过，页面会显示原因</p></td> <td><p>按原因修改后重新提交</p></td> </tr> </tbody> </table>

如果连接以前已有审核通过的配置：

* 后续编辑会产生新草稿；

* 新草稿审核期间，上一版已审核配置继续提供登录服务；

* 新版审核通过后才替换线上配置。

## 七、验证成员登录
### 7.1 推荐测试方法

1. 准备 1--2 个普通成员 IdP 账号，不要使用企业超级管理员会话直接测试。

2. 使用浏览器无痕窗口打开千问办公登录页。

3. 选择"SSO 登录"。

4. 输入邮箱域名白名单下的完整企业邮箱。

5. 点击登录，确认页面跳转到正确的 IdP。

6. 完成 IdP 登录与授权。

7. 确认返回千问办公聊天页，并能正常进入企业空间。

### 7.2 首次登录行为

当前版本默认开启自动创建成员：

* 首次成功登录时按 IdP 稳定唯一 ID 查找成员；

* 找不到成员时自动加入创建连接时所在团队；

* 默认角色为普通成员；

* 通用 IdP 的"登录名字段"仅在配置后用于生成内部不可投递的标识邮箱；真正的身份关联以唯一 ID 为准。

## 八、配置工作台入口
飞书、钉钉、企业微信连接创建后，详情页会出现"工作台"页签。

1. 打开 SSO 连接详情。

2. 进入"工作台"。

3. 复制"登录 URL"。

4. 将该 URL 配置为对应企业应用的主页地址、工作台地址或 H5 首页。

登录 URL 由千问办公生成，包含连接 ID 和返回地址，不需要在 IdP 侧自行拼接。

## 九、修改、密钥轮换与删除
### 9.1 修改配置

* 编辑任意有效配置后，状态会回到草稿。

* 保存后需要重新提交审核。

* 审核完成前，上一版已审核快照继续生效。

### 9.2 轮换 Client Secret

1. 先在 IdP 侧创建新 Secret，不要立即删除旧 Secret。

2. 在千问办公中编辑连接，输入新 Secret。

3. 保存并重新提交审核。

4. 新配置审核通过并验证成功后，再在 IdP 侧撤销旧 Secret。

编辑时 Secret 留空表示保留当前密钥。详情页只显示掩码和末尾少量字符，不会显示完整 Secret。

### 9.3 删除连接

删除后成员将无法继续通过该连接发起 SSO 登录。删除前应：

* 提前通知成员；

* 准备备用登录方式；

* 确认没有仍依赖该工作台入口的用户；

* 记录必要的 IdP 应用信息，以便恢复时重新配置。

## 十、常见问题
<table> <thead> <tr> <td><p><b>现象</b></p></td> <td><p><b>优先检查</b></p></td> </tr> </thead> <colgroup></colgroup> <colgroup></colgroup> <tbody> <tr> <td><p>看不到"单点登录"菜单</p></td> <td><p>当前账号是否为企业超级管理员</p></td> </tr> <tr> <td><p>"配置 SSO"或"提交审核"不可用</p></td> <td><p>坐席数是否达到页面要求；条件检查失败时点击"重试"</p></td> </tr> <tr> <td><p>提示邮箱域名未配置 SSO</p></td> <td><p>域名是否正确、配置是否审核通过、"启用 SSO"是否开启</p></td> </tr> <tr> <td><p>提示域名已被占用</p></td> <td><p>同一邮箱域名是否已被其他组织的已审核配置使用</p></td> </tr> <tr> <td><p>提示域名不允许登记</p></td> <td><p>是否使用了 Gmail、Outlook、QQ、163 等公共邮箱或系统保留域名</p></td> </tr> <tr> <td><p>IdP 提示 <code>redirect_uri</code> 不匹配</p></td> <td><p>HTTPS、域名、端口、路径、末尾斜杠是否与 IdP 登记值完全一致</p></td> </tr> <tr> <td><p>提示 <code>invalid client</code></p></td> <td><p>Client ID、Client Secret、Tenant、AppKey、Corp ID、AgentId 是否正确；Secret 是否过期</p></td> </tr> <tr> <td><p>企业微信 Token 获取失败</p></td> <td><p>企业 Corp ID、AgentId、Agent Secret 是否混填；应用是否启用</p></td> </tr> <tr> <td><p>钉钉登录后无法读取用户</p></td> <td><p>应用是否有读取当前用户信息权限；成员是否在应用可见范围内</p></td> </tr> <tr> <td><p>OIDC 提示无签名密钥</p></td> <td><p>是否填写 JWKS URL 或完整 PEM 公钥；IdP 是否使用 RS256</p></td> </tr> <tr> <td><p>OIDC 提示 Audience 不匹配</p></td> <td><p><code>id_token</code> 的 <code>aud</code> 是否等于所填 Client ID</p></td> </tr> <tr> <td><p>唯一 ID 缺失</p></td> <td><p>唯一 ID 字段名是否与 Token/UserInfo 实际 Claim 完全一致</p></td> </tr> <tr> <td><p>审核被驳回</p></td> <td><p>查看驳回原因，修改配置并重新提交</p></td> </tr> <tr> <td><p>修改后仍使用旧配置</p></td> <td><p>新草稿尚未审核通过；旧审核快照会继续服务</p></td> </tr> </tbody> </table>
