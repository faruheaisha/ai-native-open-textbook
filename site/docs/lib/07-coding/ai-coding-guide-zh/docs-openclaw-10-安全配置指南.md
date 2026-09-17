---
title: "10. 安全配置指南"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/openclaw/10-安全配置指南.md"
sourceRel: "docs/openclaw/10-安全配置指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/openclaw/10-安全配置指南.md"
sourceSha256: "6aaac48e1cbacda2188a00877584db4c740250ec54267418f1ec345fa6d1b0dd"
pageSha256: "6aaac48e1cbacda2188a00877584db4c740250ec54267418f1ec345fa6d1b0dd"
contentMode: "local-full"
zh: ""
---

# 10. 安全配置指南

> **课程信息**
>
> - **作者**：老金
> - **GitHub**：https://github.com/KimYx0207
> - **公众号**：老金带你玩AI
> - **X（Twitter）**：老金带你玩AI
> - **个人博客**：https://aiking.dev
> - **难度等级**：🔴 高级
> - **阅读时间**：30 分钟
> - **前置知识**：已完成基本配置（[03-快速开始指南](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-03-快速开始指南)）
>
> **本篇你将学会：** 保护你的 AI 助手不被未授权访问、配置沙箱隔离、管理用户权限
>
> **谁需要看这篇？** 如果你只是在自己电脑上用、不对外暴露，默认安全配置已经够了。如果你要把 OpenClaw 暴露到公网、或者给多人使用，这篇必看
>
> **小白速通：** 只看"DM Pairing 配对系统"和"最小安全清单"两节就够了

## 为什么安全是第一优先级？

老金我把安全课写得重，是因为助手一旦连上消息、文件和命令，风险就不再是理论问题。

> **2026-06-18 安全口径**：v2026.6.6 以后 transcript、sandbox、MCP、browser、channel 和 exec approval 边界更强调 fail-closed；v2026.6.8 继续补强 SecretRef、bounded model browsing、key-free search provider 显式 opt-in、managed plugin installs 和 Hono 安全更新。企业部署时把“谁能启用搜索、谁能装插件、谁能改 provider 密钥、谁能触发执行”写进登记表。

OpenClaw 不是一个普通的聊天机器人。它是一个能读写文件、执行 Shell 命令、调用 API、发送消息的 AI Agent。换句话说，它拥有你赋予它的一切权限。

如果配置不当，后果可能很严重：

- 你的 API Key 被泄露，别人拿你的额度跑模型
- 恶意消息触发 Agent 执行危险命令（比如 `rm -rf /`）
- 文件系统被暴露，敏感数据被读取
- 未授权用户通过消息平台控制你的 Agent
- 提示词注入攻击让 AI 绕过安全限制

OpenClaw 在 2026 年初曾爆出 CVE 安全漏洞，社区对安全问题高度重视。从 v2026.2.1 开始，多项安全特性被设为强制启用。

这篇指南会从架构层面到具体配置，帮你把 OpenClaw 的安全做到位。

---

> ⏭️ **小白可跳过** — 这部分面向安全专家和企业用户

## OpenClaw 安全架构概述

### 安全分层模型

OpenClaw 的安全设计采用纵深防御（Defense in Depth）策略，分为五个层次：

```
┌─────────────────────────────────────────────┐
│           第 1 层：网络边界安全               │
│     TLS 1.3 / 防火墙 / IP 白名单            │
├─────────────────────────────────────────────┤
│           第 2 层：认证与授权                 │
│     Gateway Token / 配对系统 / 用户权限      │
├─────────────────────────────────────────────┤
│           第 3 层：输入验证与过滤             │
│     提示词护栏 / 消息过滤 / 长度限制         │
├─────────────────────────────────────────────┤
│           第 4 层：执行隔离                   │
│     Docker 沙箱 / 文件系统隔离 / 资源限制    │
├─────────────────────────────────────────────┤
│           第 5 层：审计与监控                 │
│     操作日志 / 异常检测 / 告警通知           │
└─────────────────────────────────────────────┘
```

每一层都是独立的防线。即使某一层被突破，下一层仍然能提供保护。不要只依赖单一安全措施。

### 安全组件关系

```
用户消息 → [消息平台] → [Webhook 验证] → [Gateway Token 认证]
                                              ↓
                                        [配对系统检查]
                                              ↓
                                        [提示词护栏过滤]
                                              ↓
                                        [Agent 权限检查]
                                              ↓
                                        [沙箱内执行工具]
                                              ↓
                                        [审计日志记录]
                                              ↓
                                        返回结果给用户
```

### 零信任原则

OpenClaw 的安全设计遵循零信任原则：

- **不信任任何输入** — 所有用户消息都经过过滤和验证
- **不信任任何网络** — 即使在内网也使用 TLS（传输层安全协议，保护网络通信不被窃听）加密
- **不信任任何执行** — 所有工具调用都在沙箱（Sandbox，限制 AI 执行危险操作的隔离环境）中隔离运行
- **最小权限** — Agent 只拥有完成任务所需的最少权限
- **持续验证** — 每次操作都重新检查权限，不依赖缓存的认证状态

---

## API Key 安全管理

API Key 是 OpenClaw 最敏感的资产。一旦泄露，攻击者可以用你的额度调用模型，甚至访问你的账户数据。

### 基本原则：永远不要硬编码

```bash
# 错误做法：Key 写在配置文件里
# openclaw.json
# { "providers": { "openai": { "apiKey": "sk-proj-xxxxx" } } }

# 正确做法：使用环境变量
export OPENAI_API_KEY="sk-proj-xxxxx"
export ANTHROPIC_API_KEY="sk-ant-xxxxx"
export GEMINI_API_KEY="AIzaSy-xxxxx"
```

### 环境变量管理

#### 方法一：系统环境变量（推荐用于服务器）

```bash
# 写入 shell 配置文件
echo 'export OPENAI_API_KEY="sk-proj-xxxxx"' >> ~/.bashrc
source ~/.bashrc

# 验证是否生效
echo $OPENAI_API_KEY
```

#### 方法二：.env 文件（推荐用于开发）

```bash
# 创建 .env 文件
cat > ~/.openclaw/.env << 'EOF'
OPENAI_API_KEY=sk-proj-xxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxx
GEMINI_API_KEY=AIzaSy-xxxxx
EOF

# 设置严格的文件权限
chmod 600 ~/.openclaw/.env
```

OpenClaw 启动时会自动读取 `~/.openclaw/.env` 文件。

#### 方法三：密钥管理服务（推荐用于团队/企业）

```bash
# 使用 HashiCorp Vault
export OPENAI_API_KEY=$(vault kv get -field=api_key secret/openclaw/openai)

# 使用 AWS Secrets Manager
export OPENAI_API_KEY=$(aws secretsmanager get-secret-value \
  --secret-id openclaw/openai-key \
  --query SecretString --output text)

# 使用 1Password CLI
export OPENAI_API_KEY=$(op read "op://Private/OpenAI/api-key")
```

> **v2026.6.8 安全更新**：`models status` 会保留 SecretRef-backed custom provider 的 `apiKey` 标记，避免把解析后的明文 secret 写回 `models.json`。`doctor` 也会提示明文 secret-bearing config fields。v2026.6.x 继续强化 fail-closed approval boundaries、corrupt shell snapshot、suspicious gateway startup config、unsafe exec precheck env、oversized audit responses、插件 disabled snapshot、managed plugin installs 和 invalid pending-agent SQLite scaffold 等边界。团队配置里优先使用 SecretRef、环境变量或外部密钥服务，不要把 provider API key 和敏感 headers 写成普通 JSON 字段。

推荐排查顺序：

1. `openclaw doctor` 看是否提示 plaintext secret。
2. 检查 `~/.openclaw/openclaw.json` 是否含真实 key。
3. 检查 shell history 和日志里是否打印过 key。
4. 迁移到 SecretRef / 环境变量后重启 Gateway。

示例文档里如果必须出现占位符，使用 secret-scanner-safe placeholder，例如 `YOUR_OPENAI_API_KEY`，不要写看起来像真实 token 的长字符串。配置 include path 也要使用明确文件名和最小目录范围；新版会加强 include-path validation，路径过宽时应当改成显式白名单。

### 密钥轮换策略

定期更换 API Key 是安全最佳实践。建议每 90 天轮换一次。

```bash
# 步骤 1：在 AI 提供商后台生成新 Key

# 步骤 2：更新环境变量
export OPENAI_API_KEY="sk-proj-new-key-xxxxx"

# 步骤 3：重启 OpenClaw 使新 Key 生效
openclaw gateway restart

# 步骤 4：确认新 Key 工作正常
openclaw health

# 步骤 5：在提供商后台撤销旧 Key
```

### 密钥泄露检测

```bash
# 检查配置文件中是否有明文 Key
grep -rn "sk-proj-\|sk-ant-\|AIzaSy" ~/.openclaw/

# 检查 git 历史中是否有 Key 泄露
git log -p --all -S "sk-proj-" -- "*.json" "*.yaml" "*.yml" "*.env"

# 检查 shell 历史中是否有 Key
grep -n "sk-proj-\|sk-ant-\|AIzaSy" ~/.bash_history ~/.zsh_history 2>/dev/null
```

### 密钥泄露应急处理

如果你发现 Key 已经泄露：

1. **立即撤销** — 去提供商后台撤销泄露的 Key
2. **生成新 Key** — 创建新的 API Key
3. **更新配置** — 用新 Key 替换所有引用
4. **检查用量** — 查看是否有异常 API 调用
5. **清理历史** — 从 git 历史、日志文件中清除泄露的 Key
6. **复盘原因** — 找出泄露的根本原因，防止再次发生

---

## 沙箱系统详解

沙箱是 OpenClaw 安全架构中最关键的一环。它确保 Agent 执行的代码和命令被隔离在受控环境中，不会影响宿主机。

### 为什么需要沙箱？

想象一下这个场景：有人给你的 Agent 发了一条消息："帮我整理一下文件"，但消息中嵌入了恶意指令，让 Agent 执行 `rm -rf /` 或者读取 `/etc/passwd`。没有沙箱的话，这些命令会直接在你的机器上执行。

### 沙箱模式配置

OpenClaw 使用 `mode` 字段控制沙箱行为，而非简单的 `enabled` 开关。最常用的模式是 `"non-main"`，表示非主会话在 Docker 沙箱中运行，主会话保持正常执行：

```json5
// ~/.openclaw/openclaw.json
{
  "agents": {
    "defaults": {
      "sandbox": {
        // "non-main" — 非主会话在 Docker 沙箱中运行（推荐）
        // "all"      — 所有会话都在沙箱中运行
        // "off"      — 禁用沙箱（不推荐用于生产）
        "mode": "non-main",
      }
    }
  }
}
```

| `mode` 值 | 说明 | 适用场景 |
|-----------|------|----------|
| `"non-main"` | 非主会话在 Docker 沙箱中运行 | 生产环境推荐默认值 |
| `"all"` | 所有会话都在沙箱中运行 | 高安全要求场景 |
| `"off"` | 禁用沙箱 | 仅限开发/调试 |

### 工具 Allow 与 Deny

沙箱内可用的工具通过 `tools.allow`/`tools.deny` 控制（注意：不是 `toolAllowlist`/`toolDenylist`）：
