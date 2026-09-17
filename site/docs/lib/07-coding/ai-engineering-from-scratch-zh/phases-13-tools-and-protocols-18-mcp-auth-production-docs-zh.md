---
title: "生产环境中的 MCP Auth：与 issuer 绑定的入册与 token"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/13-tools-and-protocols/18-mcp-auth-production/docs/zh.md"
sourceRel: "phases/13-tools-and-protocols/18-mcp-auth-production/docs/zh.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/13-tools-and-protocols/18-mcp-auth-production/docs/zh.md"
sourceSha256: "a87d28e52b8040fd2947992e0b92db751600839da81e9726328af2033115a91c"
pageSha256: "a87d28e52b8040fd2947992e0b92db751600839da81e9726328af2033115a91c"
contentMode: "local-full"
zh: ""
---

# 生产环境中的 MCP Auth：与 issuer 绑定的入册与 token

> 第 16 课构建了 OAuth 2.1 状态机。本课为 MCP 2026-07-28 加固生产边界：优先使用 Client ID Metadata Document，已废弃的动态注册只保留兼容用途，校验授权响应 issuer，按 issuer 存储 client 凭据，刷新 JWKS，并在每次无状态请求中使用受众钉定的 token。
>
> **规范说明（2026-07-28）：** Dynamic Client Registration 已由 Client ID Metadata Document 取代而废弃。DCR 保留为兼容机制。使用它时，client 必须声明正确的 `application_type`。client 会校验存在的 RFC 9207 `iss` 值，且绝不跨 authorization-server issuer 复用凭据。

**类型：** Build
**语言：** Python (stdlib)
**前置要求：** Phase 13 · 16（OAuth 2.1 状态机），Phase 13 · 17（网关）
**预计时间：** 约 90 分钟

## 学习目标

- 通过 RFC 8414 元数据发现 authorization server，并验证其契约。
- 通过 Client ID Metadata Document 入册，并将已废弃的 DCR 隔离为兜底方案。
- 校验 RFC 9207 `iss`，按 authorization-server issuer 存储注册信息，并按 issuer 加 resource 存储与资源绑定的 token。
- 定期缓存和刷新 JWKS 密钥，让签名验证能够跨越密钥轮换。
- 用 RFC 8707 resource indicator 把 token 钉到单个 MCP resource 上，拒绝 confused-deputy 复用。
- 在 JWT 校验和 token introspection 之间做选择，定义撤销时效，并在身份依赖不可用时安全失败。
- 分离 authorization server、resource server 和 client，使每一方只执行自己负责的检查。
- 按部署检查清单审计 authorization server，并拒绝不安全的入册或 token 重用。

## 问题背景

第 16 课的模拟器在内存里跑 OAuth 2.1。生产有三个纯内存模拟器看不到的运维缺口。

第一个缺口是入册与凭据隔离。真实组织可能运行数百个 MCP server 和数千个 MCP client。2026-07-28 修订版优先采用 **Client ID Metadata Document**：client 使用自己控制的、带路径的 HTTPS URL 作为标识符，authorization server 拉取元数据。RFC 7591 动态注册只保留为已废弃的兼容路径。DCR 无法避免时，请求必须声明正确的 `application_type`。client 将注册信息存于 authorization-server issuer 下，将 access token 存于 `(issuer, resource)` 键下。issuer 变化意味着需要重新入册；resource 不同则需要单独获取受众绑定的 token。

第二个缺口是密钥轮换。JWT 校验依赖 authorization server 的签名密钥，以一个 JSON Web Key Set（JWKS）发布。authorization server 按计划轮换它们（常常每小时，事件响应时有时更快）。一个在启动时取一次 JWKS 的 MCP server，在轮换窗口之前都校验正常——然后每个请求都失败，直到重启。生产把 JWKS 串成一个带缓存的值，配一个刷新作业，在上一批密钥过期前覆盖缓存，外加一个缓存未命中时的兜底拉取，应对一个由比缓存更新的密钥签名的 token 到来的情况。

第三个缺口是受众绑定。第 16 课引入了 RFC 8707 resource indicator。在生产里，那个 indicator 变成每个请求上的一道硬性 claim 检查。MCP server 把 `token.aud` 和自己的规范 resource URL 对比，不匹配就用 HTTP 401 拒绝。这是唯一一道防御，挡住一个上游 MCP server（或一个持有本属于某 server 的 token 的恶意 client）把那个 token 重放给同一信任网格里另一个 server。

本课把这每一个缺口都映射到表面的一块具体东西上。元数据文档是一个 HTTP 端点。JWKS 缓存刷新是一个计划作业加一个键值缓存。JWT 校验是 resource server 在分发任何工具之前跑的一个例程。把三个角色分开，每个角色就只执行属于它的那些检查：authorization server 签发并轮换密钥，resource server 缓存并校验，client 做 discovery 和入册。

## 范围：第 16 课之后的生产强制执行

[第 16 课：使用 OAuth 2.1 保护 MCP](/lib/07-coding/ai-engineering-from-scratch-zh/phases-13-tools-and-protocols-16-mcp-security-oauth-2-1-docs-zh) 负责 authorization-code 状态机、PKCE、protected-resource discovery、resource indicator 和 scope 决策。本课不定义第二条 OAuth flow。它从这些契约已具备之后开始，讨论已部署的 resource server 如何在密钥轮换、opaque-token 校验、撤销、依赖失败、发布和事故响应期间持续执行这些契约。

生产边界更窄，也更偏运行：

- JWT 路径在每个请求上验证被钉定的 issuer、算法、签名密钥、受众、时间 claim 和 scope，同时安全地刷新 JWKS。
- opaque-token 路径调用 issuer 的已认证 introspection endpoint，并校验返回的 active 状态、受众或 resource、过期时间、主体和 scope。
- 撤销策略定义凭据必须在多快时间内停止工作，以及哪个缓存可能延后这一事实。
- 失败策略决定 discovery、JWKS、introspection 或撤销基础设施不可用时的行为。
- 证据记录驱动结果的 issuer 元数据、密钥集或 introspection 响应、token claim、策略版本和拒绝原因，但不存储 token。

这种区分让课程可组合。第 16 课证明 flow 正确。本课证明 token 到达真实 MCP 请求路径后仍可信，或者会被拒绝。

## 核心概念

### RFC 8414——OAuth Authorization Server Metadata

`/.well-known/oauth-authorization-server` 上的一份文档描述了 client 需要的一切：

```json
{
  "issuer": "https://auth.example.com",
  "authorization_endpoint": "https://auth.example.com/authorize",
  "token_endpoint": "https://auth.example.com/token",
  "jwks_uri": "https://auth.example.com/.well-known/jwks.json",
  "client_id_metadata_document_supported": true,
  "registration_endpoint": "https://auth.example.com/register",
  "authorization_response_iss_parameter_supported": true,
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "refresh_token"],
  "code_challenge_methods_supported": ["S256"],
  "scopes_supported": ["mcp:tools.read", "mcp:tools.invoke"],
  "token_endpoint_auth_methods_supported": ["none", "private_key_jwt"]
}
```

拿到一个 MCP resource URL 的 client 会把 discovery 串起来：RFC 9728 里的 `oauth-protected-resource`（resource server 的文档）给出 issuer，然后 `oauth-authorization-server`（也就是本 RFC）给出每一个端点。client 从不硬编码 authorization URL。

对于带路径的 resource identifier，应在该路径之前插入 well-known 段。例如，`https://mcp.example.com/team/server` 的 protected-resource metadata 位于 `https://mcp.example.com/.well-known/oauth-protected-resource/team/server`。在 resource path 之后追加 `/.well-known/...` 是错误的。

在信任某个 IdP 跑 MCP 之前，你要核实的契约：

- `code_challenge_methods_supported` 里包含 `S256`（即 RFC 7636 的 PKCE）。规范说得很明确：如果这个字段 **缺失**，authorization server 就不支持 PKCE，client **必须** 拒绝继续。
- `grant_types_supported` 里包含 `authorization_code`，并且拒绝 `password` 和 `implicit`。
- 至少存在一条入册路径：`client_id_metadata_document_supported: true`（首选 CIMD）、预注册 client，或 `registration_endpoint`（已废弃的 RFC 7591 兼容方案）。
- 如果 `authorization_response_iss_parameter_supported` 为 true，client 要求返回 RFC 9207 `iss`，并将其与重定向前记录的 issuer 精确比较。
- 对 OAuth 2.1 来说，`response_types_supported` 恰好是 `["code"]`。

如果 `S256` 缺失，MCP server 就拒绝在这个 IdP 上部署——PKCE 没有降级模式。如果 *两条* 入册路径都没广告，而你又没有预注册的 `client_id`，那你也没法入册；这时是部署清单写错了，不是代码错了。

### RFC 9728（回顾）——Protected Resource Metadata

第 16 课讲过 RFC 9728。在生产里的差异是：这份文档是 client 唯一会去查的地方，用来找出 *这个* MCP server 信任的 authorization server。一个 MCP server 可能接受来自多个 IdP 的 token（一个给员工，一个给合作伙伴）。RFC 9728 声明这个集合；RFC 8414 记录每个 IdP 支持什么。

```json
{
  "resource": "https://notes.example.com",
  "authorization_servers": ["https://auth.example.com", "https://partners.example.com"],
  "scopes_supported": ["mcp:tools.invoke"],
  "bearer_methods_supported": ["header"],
  "resource_documentation": "https://notes.example.com/docs"
}
```

### Client ID Metadata Documents（推荐的默认做法）

CIMD 把注册从 *推送* 反转成了 *拉取*。client 不再请求 authorization server 铸一个 `client_id`，而是用一个它自己掌控的 HTTPS URL **作为** 它的 `client_id`。这个 URL 解析到一份 JSON 元数据文档；authorization server 在 OAuth 流程中按需拉取它。信任以 DNS 为根：如果 server 运营方信任 `app.example.com`，它就信任从 `https://app.example.com/client.json` 提供的那个 client。没有注册往返，没有会被耗尽的 `client_id` 命名空间，也没有要逐 server 保持同步的状态。

client 托管的元数据文档：

```json
{
  "client_id": "https://app.example.com/oauth/client.json",
  "client_name": "Example MCP Client",
  "client_uri": "https://app.example.com",
  "application_type": "native",
  "redirect_uris": ["http://127.0.0.1:7333/callback", "http://localhost:7333/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none"
}
```

文档里的 `client_id` 值 **必须** 等于它被提供出来的那个 URL（authorization server 会校验这点；不匹配就拒绝）。authorization server 在它的 RFC 8414 元数据里用 `client_id_metadata_document_supported: true` 来广告支持。

当前 CIMD 契约要求 `client_id`、`client_name` 和非空的 `redirect_uris` 数组。client identifier 是带路径的绝对 HTTPS URL。可以包含 `application_type`，但它不是 CIMD 的必填字段。不要将 DCR 对 `application_type` 的要求照搬到首选 CIMD 路径。

规范对两个安全事实直言不讳：

- **SSRF。** authorization server 会去拉取一个攻击者提供的 URL。它必须防御 server-side request forgery（不要拉取内部/管理端点）。
- **localhost 冒充。** 单凭 CIMD 拦不住一个本地攻击者宣称一个合法 client 的元数据 URL、再绑定任意 `localhost` redirect。authorization server **必须** 在 consent 阶段清楚地展示 redirect URI 的主机名，并 **应当** 对只用 `localhost` 的 redirect 发出警告。

因为 CIMD 不需要 server 端状态，所以没有像 DCR 那样要立起来的注册器。client 端是只读的：从一个静态 HTTPS 端点提供你的元数据文档，让 authorization server 来拉取就行。

如果 authorization server operator 已经预配了 client identifier，应先使用这个按 issuer 范围划分的注册信息，再尝试自动入册。否则优先使用 CIMD。只有 issuer 既不能预注册也不能使用 CIMD 时，才使用已废弃的 DCR。

### RFC 7591：已废弃的兼容入册方案

DCR 已在 2026-07-28 修订版中废弃。仅为不能消费 CIMD 且预注册不现实的 authorization server 保留它。兼容 client 会发送：

```json
POST /register
Content-Type: application/json

{
  "application_type": "native",
  "redirect_uris": ["http://127.0.0.1:7333/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none",
  "scope": "mcp:tools.invoke",
  "client_name": "Cursor",
  "software_id": "com.cursor.cursor",
  "software_version": "0.42.0"
}
```

server 回应一个 `client_id` 和一个供后续更新用的 `registration_access_token`：

```json
{
  "client_id": "c_3e7f1a",
  "client_id_issued_at": 1769472000,
  "redirect_uris": ["http://127.0.0.1:7333/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "registration_access_token": "regt_b2...",
  "registration_client_uri": "https://auth.example.com/register/c_3e7f1a"
}
```

`application_type` 不是装饰字段。loopback desktop client 声明 `native`；由 server 托管的 client 声明 `web` 并使用 HTTPS redirect URI。`token_endpoint_auth_method: none` 是 public native client 的正确默认值。它只有 `client_id`，由 PKCE 提供 proof-of-possession。

三个生产坑：

- 注册端点必须按来源 IP 做限流。没有这个，一个敌对方就能脚本化几百万次假注册，把 `client_id` 命名空间耗尽。在注册器处理请求之前先跑一道限流检查。
- 有些企业 IdP 要求 `software_statement`（一个为 client 背书的已签名 JWT）。本课的 mock 跳过了它；生产要串一个校验步骤，拒绝任何非 localhost redirect URI 的未签名注册。
- `registration_access_token` 必须以哈希形式存储，而不是明文。这个 token 被偷意味着攻击者能改写 client 的 redirect URI。

### RFC 8707（回顾）——Resource Indicators
