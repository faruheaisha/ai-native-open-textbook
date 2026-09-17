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
pageSha256: "44a5994df9f7470309539fe27008e80e65fe511703d6d48adcd6a25a2be17dc2"
contentMode: "local-full"
zh: ""
---

## Linux本地部署

> 🐧 **Linux用户**：适合开发布者，配置灵活。

### 系统要求

**推荐发布行版**：
- Ubuntu 20.04+
- Debian 11+
- CentOS 8+

### 安装步骤

#### 第一步：安装Node.js

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
```

#### 第二步：安装 OpenClaw

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

#### 第三步：验证安装

```bash
openclaw --version
```

#### 第四步：初始化配置

```bash
openclaw onboard
```
