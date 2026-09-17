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
sourceRel: "docs/enterprise/flagship/user-management/identity-authentication/saml2.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/user-management/identity-authentication/saml2.md"
sourceSha256: "76a8250804e209859931a1f6081ca4d54fd7920fd78a0f02d490ffc7d87908df"
pageSha256: "76a8250804e209859931a1f6081ca4d54fd7920fd78a0f02d490ffc7d87908df"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 用户管理 身份认证 SAML 2.0 SSO
 通用官方知识库
SAML 2.0 SSO
企业身份系统支持 SAML 2.0 时，可以通过「SAML2」认证源接入。身份系统作为 IdP（身份提供方）发送签名断言，千问办公作为 SP（服务提供方）验证签名、接收用户身份并完成关联。
向身份系统准备材料
准备 IdP 的元数据 XML 文件、元数据 URL，或下表中的独立字段。还需确认请求绑定方式、签名要求、NameID 格式，以及姓名和邮箱的属性名称。
材料用途
IdP Metadata包含签发者标识、登录地址和签名证书
IDP Issuer URI标识签发断言的身份系统，通常取自 EntityID
IDP 登录地址千问办公发起 SAML 登录时跳转的地址
IDP 验签证书验证身份系统返回的 SAML 响应或断言签名

创建认证源并登记 SP
- 进入 用户与体验 → 用户管理 → 身份认证 → SSO 登录，点击【新增认证源】，选择「SAML2」。
- 填写 认证源名称。
- 在「QwenWork SP 信息」中下载【Metadata 元数据】，交给身份系统的应用管理员导入。
- 如果身份系统要求手动配置，分别复制 Assertion Consumer Service URL 和 Audience URI，填入其接收断言地址和受众字段。需要验证千问办公发出的签名请求时，再下载【签名证书】导入。
不要把 IdP 登录地址填成断言接收地址：前者接收登录请求，后者接收登录结果。
选择 IdP 凭证获取方式
上传 Metadata 文件
在 凭证获取方式 中选择「上传 Metadata 文件」，选择身份系统导出的 XML 文件。文件大小须在 20 KB 以内。上传后核对解析出的签发者、登录地址与证书。
解析 Metadata URL
选择「解析 Metadata URL」，填写身份系统提供的 HTTPS 元数据地址，点击【解析】。确认返回的信息来自预期 IdP，而非另一个测试租户。
手动输入
选择「手动输入」，分别填写 IDP Issuer URI、IDP 登录地址 和 IDP 验签证书。证书内容保留完整起止标记，不要粘贴私钥，也不要误用 SP 证书。
【截图：管理后台 SAML2 的元数据获取方式与签名设置 · sso-saml2.png】
图 1：先导入 IdP 元数据，再检查请求绑定、签名、响应验签和 NameID 格式。
对齐协议与身份字段
千问办公字段如何选择
SAML 请求协议绑定与 IdP 支持的 HTTP-POST 或 HTTP-Redirect 一致
SAML 请求签名根据 IdP 对签名请求的要求选择 Signed 或 Unsigned
SAML 响应签名算法与 IdP 实际使用的算法一致，优先采用 RSA-SHA256
SAML 响应验签按 IdP 签署 Response、Assertion 或两者的实际方式设置
NameIDFormat与 IdP 为该应用签发的 NameID 格式一致

按以下步骤核对「关联规则」：
- 默认使用 user.NameID 作为「第三方用户 ID」。确认 NameID 能稳定标识同一用户。
- 核对 IdP 返回的属性。姓名和邮箱固定读取 user.username、user.email；只有三方 ID、账号、工号可选择左侧来源，其他来源固定。
- 添加可选项时，从【添加映射】下拉选择目标。页面带入预设来源，右侧目标固定；已有目标不会重复出现。
- 启用「自动创建用户」时，选择默认加入部门并检查席位设置。
测试登录
- 确认身份系统已保存 SP 配置，并允许测试成员访问应用。
- 在千问办公点击【测试认证】，确认页面提示「测试通过」。
- 测试通过后【保存配置】，开启该认证源，再在「登录方式」中开启 SSO。
- 从千问办公企业入口发起登录，检查成员身份、企业归属及自动创建结果。
排查 SAML 错误
现象重点检查
登录后回不到千问办公IdP 中的断言接收地址是否为当前 Assertion Consumer Service URL
受众或签发者不匹配Audience URI、IdP EntityID 和 IDP Issuer URI 是否分别填在正确位置
签名验证失败验签证书是否过期、IdP 是否轮换证书、签名算法及响应验签方式是否一致
找不到用户或重复创建NameID 是否稳定、属性是否为空、关联字段是否与已有用户一致

证书轮换时先取得新元数据，重新导入、测试并保存。动态认证源需先停用再删除；删除前确认其他登录方式可用。
已有用户与删除记录
SSO 只通过三方 ID 匹配用户，匹配后的处理如下：
匹配结果处理方式
命中未删除用户，其他身份字段无冲突完成登录，保留已有资料和同步来源
返回的账号、邮箱、手机号或工号与其他用户冲突拒绝本次登录，管理员处理冲突后再试
未命中用户按「自动创建用户」设置处理
命中已删除用户拒绝登录；须由符合来源条件的同步任务恢复后，再登录

完整规则见身份认证。
