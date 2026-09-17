---
title: "Awesome OpenClaw Tutorial（中文）"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/docs/01-basics/02-installation.md"
sourceRel: "docs/01-basics/02-installation.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-tutorial/docs/01-basics/02-installation.md"
sourceSha256: "ad38987b0e0a4f1aa9ff89c15af14b56823a0c189f58e461da221a3dd919f40b"
pageSha256: "669d095203d3c654a76410ef69fac242f51b58f6b28871027523ea87e9176665"
contentMode: "local-full"
zh: ""
---

## Cloudflare Workers 部署（进阶）

> ☁️ **全球 CDN 加速**：使用 Cloudflare Workers 部署 OpenClaw，分享受全球边缘网络加速。

### 为什么选择 Cloudflare Workers？

Cloudflare Workers 提供全球边缘网络部署能力，如表 2-4 所示。

**表 2-4 Cloudflare Workers 优势**

| 优势 | 说明 |
|------|------|
| 🌍 **全球加速** | 部署在 Cloudflare 全球边缘网络 |
| 💰 **成本可控** | 5美元/月起步，24小时在线 |
| 🔒 **安全可靠** | 内置 Zero Trust 安全认证 |
| ⚡ **快速部署** | 一键部署，10分钟完成 |
| 📦 **无需服务器** | Serverless 架构，无需维护 |

### 前置要求

**必需条件**：
- Cloudflare 账号
- Workers Paid 计划（5美元/月）
- 信用卡（用于订阅付费计划）

**成本说明**：
- 基础费用：5美元/月（起步价）
- 高频使用可能产生额外费用
- 作为 24 小时在线的 AI 服务，月成本在可接受范围内

> 💡 **成本参考**：详见 [GitHub 讨论：What's the cost running it 24/7 for a month](https://github.com/cloudflare/moltworker/issues/76)

### 部署流程

#### 第一步：一键部署 Moltworker

1. **点击部署按钮**：
   ```
   https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/moltworker
   ```

2. **配置 Gateway Token**：
   - 务必修改并妥善保存 `MOLTBOT_GATEWAY_TOKEN`
   - 这是后续进入管理后台的唯一凭证
   - 建议使用强密码生成器

![Cloudflare Workers 部署](https://upload.maynor1024.live/file/1770956993044_webp)

#### 第二步：等待构建

- 部署过程约需 10 分钟
- 可点击「继续处理项目」跳过等待页面
- 构建完成后会自动跳转到项目页面

![构建过程](https://upload.maynor1024.live/file/1770956995188_webp-20260213122951843)

#### 第三步：配置 Access（Zero Trust）

访问网页界面需要配置 `CF_ACCESS_AUD` 和 `CF_ACCESS_TEAM_DOMAIN` 两个变量。

**1. 创建应用**：
- 进入 Zero Trust → Access → Applications
- 添加一个 Self-hosted 应用

![创建应用](https://upload.maynor1024.live/file/1770957006656_1770956995941_webp-20260213122946760)

**2. 设置域名**：
- 子域默认为 `moltbot-sandbox`
- 域名可使用 Cloudflare 分配的 Worker 域名或自定义域名
- Session Duration（会话时间）建议设置长一些，避免频繁登录

**3. 配置策略**：
- 系统会自动创建 `moltbot-sandbox - Production` 策略
- 默认通过邮箱验证码登录

**4. 获取配置变量**：

**CF_ACCESS_AUD**：
- 保存应用后，点击右侧「⋮」编辑
- 在应用程序受众（AUD）标签页找到 Application Audience (AUD)

**CF_ACCESS_TEAM_DOMAIN**：
- 进入 Zero Trust → Settings
- 团队域名格式：`xxxxxx.cloudflareaccess.com`

#### 第四步：配置 R2 对象存储

OpenClaw 需要 R2 来存储状态，需配置以下三个变量：
- `CF_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`

**操作步骤**：

**1. 获取 Account ID**：
- 在 Cloudflare 侧边栏进入 R2 → Overview
- 右侧 Account Details 中的 Account ID 即为 `CF_ACCOUNT_ID`

![获取 Account ID](https://upload.maynor1024.live/file/1770957013012_webp-20260213123002670)

**2. 创建 API 令牌**：
- 点击 Manage R2 API Tokens
- 选择 Create API Token

**3. 设置权限**：
- 权限选择 Object Read & Write
- 建议范围通过 Specific Bucket 限制在 `moltbot-data`

![设置权限](https://upload.maynor1024.live/file/1770957013719_webp-20260213123006410)

**4. 保存密钥**：
- 创建成功后，记附录 Access Key ID 和 Secret Access Key

![保存密钥](https://upload.maynor1024.live/file/1770957016450_webp-20260213123010373)

> ⚠️ **重要提示**：修改 Token 时请务必核对变量名称。如果不慎修改了 Build Token，会导致 Worker 构建失败。

#### 第五步：注入变量并重启

1. **进入设置**：
   - Workers → Settings → Variables and Secrets

2. **填入变量**：
   - `MOLTBOT_GATEWAY_TOKEN`（第一步设置的）
   - `CF_ACCESS_AUD`（第三步获取的）
   - `CF_ACCESS_TEAM_DOMAIN`（第三步获取的）
   - `CF_ACCOUNT_ID`（第四步获取的）
   - `R2_ACCESS_KEY_ID`（第四步获取的）
   - `R2_SECRET_ACCESS_KEY`（第四步获取的）

3. **重新部署**：
   - 点击 Deploy 重新部署
   - 等待部署完成

![注入变量](https://upload.maynor1024.live/file/1770957030499_webp-20260213123020335)

### 访问与管理

部署完成后，可通过以下地址访问：

**访问 Worker**（需要 token）：
```
https://moltbot-sandbox.xxxxxxxx.workers.dev?token=MOLTBOT_GATEWAY_TOKEN
```

**管理后台**（需要邮箱验证）：

```
https://moltbot-sandbox.xxxxxxxx.workers.dev/_admin/
```
通过 Cloudflare Access 的邮箱验证码验证后，即可进入管理后台并接受 Pairing Requests。

![管理后台](https://upload.maynor1024.live/file/1770957055794_webp-20260213123047239)

### 基础使用

#### 查看或切换模型

```bash
# 查看当前模型
/model

# 切换模型
/model minimax/MiniMax-M2.1
```

#### 设置开机自启命令

为了避免 Worker 重启后模型被重置，建议设置开机自启命令：

```bash
set model minimax/MiniMax-M2.1
```

#### 远程终端连接

```bash
# 登录到 Gateway
openclaw gateway login --url https://moltbot-sandbox.xxxxxxxx.workers.dev

# 配置 Skills
openclaw configure --section skills
```

### 避坑指南

**访问题 1：模型配置报错**

**症状**：通过配置文件修改默认模型后报错

**原因**：国内 AI 服务商通常区分国内与海外端点，Cloudflare Workers 环境下配置文件修改内容易出错

**解决方案**：
- 直接通过开机命令强制指定模型
- 不要依赖配置文件或后台 UI
- 使用 `set model` 命令设置开机自启

**访问题 2：Worker 构建失败**

**症状**：部署后 Worker 无法启动

**原因**：不慎修改了 Build Token

**解决方案**：
- 检查所有变量名称是否正确
- 确保没有修改 Build Token
- 重新部署

**访问题 3：无法访问管理后台**

**症状**：访问 `/_admin/` 时无法登录

**原因**：Zero Trust 配置不正确

**解决方案**：
- 检查 `CF_ACCESS_AUD` 和 `CF_ACCESS_TEAM_DOMAIN` 是否正确
- 确认邮箱验证码是否正确
- 检查 Session Duration 设置

### 成本估算

| 项目 | 费用 | 说明 |
|------|------|------|
| Workers Paid 计划 | 5美元/月 | 基础费用 |
| 额外请求费用 | 按量计费 | 高频使用时产生 |
| R2 存储 | 免费额度内 | 通常不会超出 |
| 总计 | 5-10美元/月 | 取决于使用频率 |

### 适用场景

**推荐使用**：
- ✅ 想低成本尝试 OpenClaw
- ✅ 已有 Cloudflare 付费订阅
- ✅ 需要全球 CDN 加速
- ✅ 不想维护服务器

**不推荐使用**：
- ❌ 期望开箱即用
- ❌ 没有技术背景
- ❌ 需要复杂的自动化流程
- ❌ 预算非常有限

### 总结

Cloudflare Workers + OpenClaw 是一个低成本的尝鲜方案，适合：
- 未体验过 Agent 自动化，想低成本试手
- 已有 Cloudflare 付费订阅，资源闲置
- 需要全球 CDN 加速的场景

但需要注意：
- OpenClaw 目前还不是一个能「即刻提升效率」的工具
- 更像是一个为 AI 自动化搭建的系统底座
- 如果没有明确的、可标准化的长流程需求，可能只会带来维护成本

**下一步**：
- 配置 AI 模型（见下文"API配置指南"）
- 配置通讯渠道（见[第9章节：多平台集成](/lib/11-personal-agents/awesome-openclaw-tutorial/docs-03-advanced-09-multi-platform-integration/index)）
- 安装 Skills（见[第8章节：Skills扩展](/lib/11-personal-agents/awesome-openclaw-tutorial/docs-03-advanced-08-skills-extension)）
