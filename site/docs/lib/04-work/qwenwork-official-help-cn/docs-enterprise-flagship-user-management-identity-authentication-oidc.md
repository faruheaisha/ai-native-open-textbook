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
sourceRel: "docs/enterprise/flagship/user-management/identity-authentication/oidc.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/user-management/identity-authentication/oidc.md"
sourceSha256: "fe88111c999ba3442d6f6ef5bebff931806daf956a47d71675aeac3c72879b5e"
pageSha256: "fe88111c999ba3442d6f6ef5bebff931806daf956a47d71675aeac3c72879b5e"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 用户管理 身份认证 OIDC SSO
 通用官方知识库
OIDC SSO
OIDC（OpenID Connect，开放身份连接）在 OAuth 2.0 的基础上提供身份声明。千问办公通过 ID Token 确认用户身份，并使用签名公钥验证令牌；因此除了应用凭证，还需要正确的 Issuer 和签名公钥端点。
在身份系统注册应用
注册一个采用「授权码」方式的 OIDC 应用，准备 Client ID、Client Secret 和发现配置地址。申请的范围必须包含 openid；按实际资料需求增加 profile、email 或 phone。
请确认身份系统支持 RS256 签名，并明确用户唯一标识 sub、姓名及邮箱的返回方式。千问办公的回调链接需要在下一节复制后登记到此应用。
配置认证安全
在「认证安全」中，按身份平台要求选择 Token 端点认证方式：Basic Auth 将应用凭据放在认证头中，Form Post 将应用凭据放在表单中。PKCE（授权码交换保护）可选择 S256 或关闭；修改后需重新测试认证并保存。
Token 端点认证与 UserInfo 请求携带访问令牌的方式是两项配置，请分别按身份平台要求填写。
【截图：Token 端点身份验证方式与 PKCE 选项 · sso-security-oidc.png】
按身份提供商要求选择 Basic Auth 或 Form Post，以及 PKCE 的 S256 或关闭。
创建 OIDC 认证源
- 进入 用户与体验 → 用户管理 → 身份认证 → SSO 登录，点击【新增认证源】。
- 选择「通用 OAuth2 / OIDC」，填写可识别的认证源名称，保持 协议类型 为「OIDC」。
- 填写 Client ID 和 Client Secret，在 Scopes 授权范围 中设置 openid 及所需范围。
- 检查 ID Token 签名算法 为「RS256」。
- 点击【复制回调链接】，回到身份系统的 OIDC 应用中登记完整地址。
【截图：管理后台 OIDC 认证源的授权码模式、应用凭证与端点设置方式 · sso-oidc.png】
图 1：OIDC 使用授权码模式；端点可通过发现接口取得，也可手动填写。
选择端点配置方式
解析 Well-Known 接口
- 将 设置方式 选择为「解析 Well-Known」。
- 在 Well-Known 接口 填入身份系统提供的发现文档地址，通常以 /.well-known/openid-configuration 结尾。
- 点击【解析】，核对返回的 Issuer、认证端点、Token 端点和签名公钥端点。不要根据域名自行拼接这些端点。
解析 Issuer
- 将 设置方式 选择为「解析 Issuer」。
- 填写身份系统公布的 Issuer，即身份签发者标识，点击【解析】。
- 核对返回的端点。Issuer 必须与身份系统签发的 ID Token 中的 iss 一致，包括路径和末尾斜杠。
手动输入
- 将 设置方式 选择为「手动输入」。
- 从身份系统的发现文档分别复制 Issuer、认证端点 URL、Token 端点 URL 和 签名公钥端点 URL。
- 需要从 UserInfo 读取资料时，再填写 用户信息端点 URL。
- 设置 Max Clock Skew，即允许的时钟偏差，可填写 30–300 秒。
【截图：管理后台 OIDC 解析后的 Issuer 和端点字段 · sso-oidc-endpoints.png】
图 2：解析后逐项检查端点；手动配置时也要提供同样的必要信息。
设置身份关联并启用
- 在「关联规则」中，将 user.sub 对应「第三方用户 ID」。姓名、邮箱固定读取 user.name、user.email。
- 需要补充资料时，从【添加映射】下拉选择手机号、工号、账号等目标，系统带入对应来源。右侧目标固定；只有三方 ID、账号、工号可以选择来源，手机号固定读取 user.phone_number。
- 核对必填项。必填映射不能删除，可选映射可删除后重新添加。
- 需要在登录时创建用户的，开启「自动创建用户」并选择默认部门；已有用户导入流程时，可保持关闭。
- 点击【测试认证】。提示「测试通过」后，点击【保存配置】，开启列表中的认证源。
- 切换到「登录方式」，开启 SSO，请测试成员从企业登录入口完成一次登录。
常见问题
现象检查内容
发现接口解析失败是否为 HTTPS、接口能否访问、返回内容是否为 OIDC 发现文档
Issuer 不匹配发现文档、手动输入值和 ID Token 的 iss 是否完全一致
签名校验失败算法是否为 RS256、签名公钥端点能否访问、身份系统是否刚轮换签名密钥
提示令牌时间错误两端系统时间、令牌有效期与允许的时钟偏差
登录后缺少姓名或邮箱Scopes、实际声明与关联字段是否一致

修改发现地址、密钥或关联规则后需要重新测试。切换为另一个认证源前，先用测试成员确认新配置可用。
已有用户与删除记录
SSO 只通过三方 ID 匹配用户，匹配后的处理如下：
匹配结果处理方式
命中未删除用户，其他身份字段无冲突完成登录，保留已有资料和同步来源
返回的账号、邮箱、手机号或工号与其他用户冲突拒绝本次登录，管理员处理冲突后再试
未命中用户按「自动创建用户」设置处理
命中已删除用户拒绝登录；须由符合来源条件的同步任务恢复后，再登录

完整规则见身份认证。
