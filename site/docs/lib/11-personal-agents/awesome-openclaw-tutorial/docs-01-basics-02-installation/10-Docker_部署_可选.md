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
pageSha256: "09a9c2074fead1dea95fd491f5f62e4fb4b7d5e1862ff8783687c7b1bc0def44"
contentMode: "local-full"
zh: ""
---

## Docker 部署（可选）

> 🐳 **开发布者选项**：Docker 部署适合需要环境隔离的场景。

### 为什么选择 Docker？

Docker 部署提供环境隔离和便捷管理，如表 2-5 所示。

**表 2-5 Docker 部署优势**

| 优势 | 说明 |
|------|------|
| 🔒 **环境隔离** | 不影响系统环境，干净整洁 |
| 📦 **一键部署** | 无需配置依赖，开箱即用 |
| 🔄 **易于更新** | 一条命令完成更新 |
| 🌐 **跨平台** | Windows/macOS/Linux 统一方案 |
| 🚀 **快速启动** | 5分钟完成部署 |

### 前置要求

**安装 Docker**：

**macOS**：
```bash
# 下载 Docker Desktop
# 访问：https://www.docker.com/products/docker-desktop

# 或使用 Homebrew
brew install --cask docker
```

**Windows**：
```bash
# 下载 Docker Desktop
# 访问：https://www.docker.com/products/docker-desktop

# 安装 WSL2（如果还没安装）
wsl --install
```

**Linux (Ubuntu)**：
```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 添加当前用户到 docker 组
sudo usermod -aG docker $USER
```

**验证安装**：
```bash
docker --version
# 应显示：Docker version 24.x.x
```

### 快速开始

#### 方式一：一键脚本部署（推荐新手）

最简单的方式，一条命令搞定所有配置！

```bash
curl -fsSL https://clawd.org.cn/install.sh | bash
```

**这个脚本会自动：**
- ✅ 检查 Docker 环境
- ✅ 下载镜像（使用国内镜像：`jiulingyun803/openclaw-cn:latest`）
- ✅ 配置环境变量
- ✅ 启动内容器
- ✅ 运行配置向导
- ✅ 生成网关令牌

完成后，在浏览器打开 `http://127.0.0.1:18789/` 即可使用。

**脚本后续操作**：
- 按照提示输入渠道信息（可选）
- 将生成的令牌复制到 Web UI 登录

#### 方式二：手动 Docker Compose 部署（适合进阶用户）

如果一键脚本不适用，或需要自定义配置，按以下步骤操作。

**步骤 1：创建工作目附录**

```bash
mkdir -p ~/openclaw-docker
cd ~/openclaw-docker
```

**步骤 2：创建 `.env` 环境文件**

```bash
cat > .env << 'EOF'
# 镜像配置（使用国内镜像）
OPENCLAW_IMAGE=jiulingyun803/openclaw-cn:latest

# 数据目附录
OPENCLAW_CONFIG_DIR=./data/.openclaw
OPENCLAW_WORKSPACE_DIR=./data/clawd

# 网关配置
OPENCLAW_GATEWAY_PORT=18789
OPENCLAW_BRIDGE_PORT=18790
OPENCLAW_GATEWAY_BIND=lan
OPENCLAW_GATEWAY_TOKEN=your-secure-token-here

# Claude 集成（可选）
CLAUDE_AI_SESSION_KEY=
CLAUDE_WEB_SESSION_KEY=
CLAUDE_WEB_COOKIE=
EOF
```

**步骤 3：创建 `docker-compose.yml` 文件**

```yaml
services:
  openclaw-cn-gateway:
    image: ${OPENCLAW_IMAGE:-jiulingyun803/openclaw-cn:latest}
    user: node:node
    environment:
      HOME: /home/node
      TERM: xterm-256color
      OPENCLAW_GATEWAY_TOKEN: ${OPENCLAW_GATEWAY_TOKEN}
      CLAUDE_AI_SESSION_KEY: ${CLAUDE_AI_SESSION_KEY}
      CLAUDE_WEB_SESSION_KEY: ${CLAUDE_WEB_SESSION_KEY}
      CLAUDE_WEB_COOKIE: ${CLAUDE_WEB_COOKIE}
    volumes:
      - ${OPENCLAW_CONFIG_DIR:-./data/.openclaw}:/home/node/.openclaw
      - ${OPENCLAW_WORKSPACE_DIR:-./data/clawd}:/home/node/clawd
    ports:
      - "${OPENCLAW_GATEWAY_PORT:-18789}:18789"
      - "${OPENCLAW_BRIDGE_PORT:-18790}:18790"
    init: true
    restart: unless-stopped
    command:
      [
        "node",
        "dist/index.js",
        "gateway",
        "--bind",
        "${OPENCLAW_GATEWAY_BIND:-lan}",
        "--port",
        "${OPENCLAW_GATEWAY_PORT:-18789}"
      ]

  openclaw-cn-cli:
    image: ${OPENCLAW_IMAGE:-jiulingyun803/openclaw-cn:latest}
    user: node:node
    environment:
      HOME: /home/node
      TERM: xterm-256color
      BROWSER: echo
      CLAUDE_AI_SESSION_KEY: ${CLAUDE_AI_SESSION_KEY}
      CLAUDE_WEB_SESSION_KEY: ${CLAUDE_WEB_SESSION_KEY}
      CLAUDE_WEB_COOKIE: ${CLAUDE_WEB_COOKIE}
    volumes:
      - ${OPENCLAW_CONFIG_DIR:-./data/.openclaw}:/home/node/.openclaw
      - ${OPENCLAW_WORKSPACE_DIR:-./data/clawd}:/home/node/clawd
    stdin_open: true
    tty: true
    init: true
    entrypoint: ["node", "dist/index.js"]
```

**步骤 4：启动内容器**

```bash
# 拉取最新镜像
docker compose pull

# 启动网关（后台运行）
docker compose up -d openclaw-cn-gateway

# 查看日志（可选）
docker compose logs -f openclaw-cn-gateway
```

**步骤 5：运行配置向导**

```bash
docker compose run --rm openclaw-cn-cli onboard
```
配置向导会提示你：
- 选择网关后端（Claude、Gemini 等）
- 配置 Feishu、Telegram 等渠道
- 生成和保存配置

**步骤 6：访问 Web UI**

打开浏览器访问：`http://127.0.0.1:18789/`

将配置向导生成的令牌复制到登录页面即可。

### 环境变量详解

| 变量 | 含义 | 默认值 | 必需 | 说明 |
|------|------|--------|------|------|
| OPENCLAW_IMAGE | Docker 镜像名称 | jiulingyun803/openclaw-cn:latest | ❌ | 使用国内镜像，也可指定版本号 |
| OPENCLAW_CONFIG_DIR | 配置文件目附录 | ./data/.openclaw | ❌ | OpenClaw 配置和凭证存储位置 |
| OPENCLAW_WORKSPACE_DIR | 工作空间目附录 | ./data/clawd | ❌ | 代理工作文件存储位置 |
| OPENCLAW_GATEWAY_PORT | 网关端口号 | 18789 | ❌ | 访问 Web UI 的端口 |
| OPENCLAW_BRIDGE_PORT | 桥接端口号 | 18790 | ❌ | 用于客户端连接的端口 |
| OPENCLAW_GATEWAY_BIND | 网关绑定地址 | lan | ❌ | localhost（仅本机）/ lan（局域网）/ 0.0.0.0（公网，⚠️ 谨慎使用） |
| OPENCLAW_GATEWAY_TOKEN | 网关认证令牌 | 自动生成 | ❌ | Web UI 登录令牌（可自定义或留空自动生成） |
| CLAUDE_AI_SESSION_KEY | Claude.ai 会话密钥 | 空 | ❌ | ⚠️ 仅使用 Claude AI 作为后端时填写 |
| CLAUDE_WEB_SESSION_KEY | Claude Web 会话密钥 | 空 | ❌ | ⚠️ 仅使用 Claude Web 版时填写 |
| CLAUDE_WEB_COOKIE | Claude Web Cookie | 空 | ❌ | ⚠️ 仅使用 Claude Web 版时填写 |

**环境变量设置方式**：

**方式 A：编辑 `.env` 文件（推荐）**
```bash
# 编辑 .env 文件
nano .env

# docker compose 会自动读取
docker compose up -d
```

**方式 B：命令行设置**
```bash
export OPENCLAW_GATEWAY_PORT=18789
docker compose up -d
```

**方式 C：命令行临时覆盖**
```bash
docker compose -e OPENCLAW_GATEWAY_PORT=8080 up -d
```

### 常用操作

#### 查看网关状态

```bash
# 检查内容器是否运行
docker compose ps

# 查看网关日志
docker compose logs openclaw-cn-gateway

# 实时查看日志（支持续跟踪）
docker compose logs -f openclaw-cn-gateway
```

#### 配置渠道

通过 CLI 内容器配置各类渠道：

**Telegram（需要机器人令牌）**：
```bash
docker compose run --rm openclaw-cn-cli channels add \
  --channel telegram \
  --token "YOUR_BOT_TOKEN"
```

**Discord（需要机器人令牌）**：
```bash
docker compose run --rm openclaw-cn-cli channels add \
  --channel discord \
  --token "YOUR_BOT_TOKEN"
```

**WhatsApp（QR 扫码）**：
```bash
docker compose run --rm openclaw-cn-cli channels login
```

**Feishu（需要 App ID 和 Secret）**：
```bash
docker compose run --rm openclaw-cn-cli onboard
# 按提示输入信息
```

#### 重新配置

```bash
# 重新运行配置向导
docker compose run --rm openclaw-cn-cli onboard

# 查看当前配置
docker compose run --rm openclaw-cn-cli config get
```

#### 重启网关

```bash
# 重启网关内容器
docker compose restart openclaw-cn-gateway

# 停止网关
docker compose down

# 重新启动
docker compose up -d openclaw-cn-gateway
```

#### 更新到最新版本

```bash
# 拉取最新镜像
docker compose pull

# 重启内容器（自动使用新镜像）
docker compose up -d openclaw-cn-gateway
```

#### 清理数据（谨慎操作）

```bash
# 停止并删除内容器
docker compose down

# 删除本地数据目附录
rm -rf ./data/

# 删除本地镜像（可选）
docker rmi jiulingyun803/openclaw-cn:latest
```

### 数据支持久化

Docker 内容器的数据存储在工作目附录的 `data` 文件夹：

```bash
~/openclaw-docker/data/
├── .openclaw/         # 配置文件
│   ├── openclaw.json  # 主配置
│   └── logs/          # 日志文件件
└── clawd/             # 工作空间
    └── workspace/     # 代理工作文件
```

**备份数据**：
```bash
# 备份配置和数据
tar -czf openclaw-backup-$(date +%Y%m%d).tar.gz ./data

# 恢复数据
tar -xzf openclaw-backup-20260210.tar.gz
```

### Docker 部署常见访问题

#### 访问题 1：内容器无法启动

**症状**：`docker compose up` 后内容器立即退出

**解决方案**：
```bash
# 查看详细错误日志
docker compose logs openclaw-cn-gateway

# 检查端口是否被占用
sudo netstat -ltnp | grep 18789
# macOS 使用：lsof -i :18789

# 如果被占用，修改 OPENCLAW_GATEWAY_PORT
# 编辑 .env，将端口改为其他（如 18790）
nano .env
```

#### 访问题 2：权限拒绝（Permission Denied）

**症状**：`Error: EACCES: permission denied, mkdir ...`

**解决方案**：
```bash
# 确保数据目附录存在且权限正确
mkdir -p ./data/.openclaw ./data/clawd
chmod 755 ./data/.openclaw ./data/clawd

# 如果使用了宿主机路径，确保目附录可写
chmod 777 ./data
```

#### 访问题 3：无法访问 Web UI

**症状**：浏览器访问 `http://127.0.0.1:18789` 无响应

**解决方案**：
```bash
# 检查内容器是否运行
docker compose ps

# 检查网关日志
docker compose logs openclaw-cn-gateway

# 验证端口是否正确
# 如果 OPENCLAW_GATEWAY_PORT=18789，则访问 :18789
# 如果改了端口，访问对应的新端口

# 检查防火墙设置
# macOS
sudo pfctl -d  # 临时关闭防火墙测试

# Linux
sudo ufw status
sudo ufw allow 18789
```

#### 访问题 4：配置向导卡住

**症状**：`docker compose run --rm openclaw-cn-cli onboard` 无反应

**解决方案**：
```bash
# 按 Ctrl+C 中断

# 检查网关是否运行
docker compose logs openclaw-cn-gateway

# 重新启动网关并重试
docker compose restart openclaw-cn-gateway
docker compose run --rm openclaw-cn-cli onboard
```

#### 访问题 5：镜像拉取失败（403 错误）

**症状**：`docker pull openclaw/openclaw:latest` 返回 403 错误

**解决方案**：
```bash
# 使用国内镜像（推荐）
docker pull jiulingyun803/openclaw-cn:latest

# 或在 .env 文件中指定国内镜像
echo "OPENCLAW_IMAGE=jiulingyun803/openclaw-cn:latest" >> .env

# 重新拉取
docker compose pull
```

#### 访问题 6：网络超时

**症状**：拉取镜像或访问 API 时网络超时

**解决方案**：
```bash
# 配置 Docker 镜像加速（国内用户）
# 编辑 Docker 配置
sudo nano /etc/docker/daemon.json

# 添加镜像加速器
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}

# 重启 Docker
sudo systemctl restart docker

# macOS 用户在 Docker Desktop 设置中添加镜像加速器
```

#### 访问题 7：数据丢失

**症状**：重启内容器后配置和数据丢失

**解决方案**：
```bash
# 确保使用了数据卷挂载
# 检查 docker-compose.yml 中的 volumes 配置

# 查看数据是否存在
ls -la ./data/.openclaw
ls -la ./data/clawd

# 如果数据丢失，从备份恢复
tar -xzf openclaw-backup-20260210.tar.gz
```

#### 访问题 8：性能访问题

**症状**：内容器运行缓慢或占用资源过高

**解决方案**：
```bash
# 限制资源使用（编辑 docker-compose.yml）
services:
  openclaw-cn-gateway:
    # ... 其他配置
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G

# 重启内容器
docker compose up -d openclaw-cn-gateway
```

### 从一键脚本迁移到手动配置

如果想从一键脚本切换到手动配置（或反之）：

```bash
# 停止现有内容器
docker compose down

# 备份现有配置
cp -r ~/.openclaw ~/.openclaw.backup

# 更新 .env 和 docker-compose.yml

# 重新启动
docker compose up -d openclaw-cn-gateway
```
配置会自动保留在数据目附录中，无需重新设置。

### Docker 部署优势总结

✅ **环境隔离**：不影响系统环境  
✅ **快速部署**：5分钟完成  
✅ **易于管理**：一条命令更新  
✅ **跨平台**：统一部署方案  
✅ **可扩展**：支持多实例部署  
✅ **国内优化**：使用国内镜像，下载速度快

**推荐使用场景**：
- 开发布者本地测试
- 服务器部署
- 多环境隔离
- 快速体验 OpenClaw

**下一步**：
- 配置 API 模型（见下文"API配置指南"）
- 配置通讯渠道（见[第9章节：多平台集成](/lib/11-personal-agents/awesome-openclaw-tutorial/docs-03-advanced-09-multi-platform-integration/index)）
- 安装 Skills（见[第8章节：Skills扩展](/lib/11-personal-agents/awesome-openclaw-tutorial/docs-03-advanced-08-skills-extension)）
