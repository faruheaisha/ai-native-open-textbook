---
title: "提交并推送全部内容"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/01-slash-commands/push-all.md"
sourceRel: "zh/01-slash-commands/push-all.md"
rawUrl: "/raw/09-harness/claude-howto/zh/01-slash-commands/push-all.md"
sourceSha256: "8c19c2e8e081f37469d2dd6e3461aa07fe7b40d329f41f90ea3a12ceb32610fe"
pageSha256: "8c19c2e8e081f37469d2dd6e3461aa07fe7b40d329f41f90ea3a12ceb32610fe"
contentMode: "local-full"
zh: ""
---

# 提交并推送全部内容

⚠️ **注意**：将所有变更都暂存、提交并推送到远程。只有在你确认所有改动都应该放在一起时才使用。

## 工作流

### 1. 分析变更
并行运行：
- `git status` - 显示已修改/已添加/已删除/未跟踪文件
- `git diff --stat` - 显示变更统计
- `git log -1 --oneline` - 查看最近一次提交，便于统一提交信息风格

### 2. 安全检查

**❌ 如果发现以下内容，立即停止并警告：**
- Secrets：`.env*`、`*.key`、`*.pem`、`credentials.json`、`secrets.yaml`、`id_rsa`、`*.p12`、`*.pfx`、`*.cer`
- API Keys：任何 `*_API_KEY`、`*_SECRET`、`*_TOKEN` 变量包含真实值，而不是占位符，如 `your-api-key`、`xxx`、`placeholder`
- 大文件：`>10MB` 且未使用 Git LFS
- 构建产物：`node_modules/`、`dist/`、`build/`、`__pycache__/`、`*.pyc`、`.venv/`
- 临时文件：`.DS_Store`、`thumbs.db`、`*.swp`、`*.tmp`

**API Key 校验：**
检查修改文件中是否存在以下模式：
```bash
OPENAI_API_KEY=sk-proj-xxxxx  # ❌ 检测到真实密钥！
AWS_SECRET_KEY=AKIA...         # ❌ 检测到真实密钥！
STRIPE_API_KEY=sk_live_...    # ❌ 检测到真实密钥！

# ✅ 可接受的占位符：
API_KEY=your-api-key-here
SECRET_KEY=placeholder
TOKEN=xxx
