---
title: "私有化部署指南"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/deployment/index.md"
sourceRel: "docs/deployment/index.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/deployment/index.md"
sourceSha256: "26043eaa80f2d0edd294f9f939ffb564c5b2f45b988a6bab9ee12a9f78fda57a"
pageSha256: "26043eaa80f2d0edd294f9f939ffb564c5b2f45b988a6bab9ee12a9f78fda57a"
contentMode: "local-full"
zh: ""
---

# 私有化部署指南

::: warning 快速更新中
本教程正处于**快速更新期**，部署后可能很快有新版本发布。建议定期拉取最新代码并重新构建以获取最新内容。
:::

本指南介绍如何在企业内部网络环境中私有化部署 VibeVibe 教程网站。

## 项目概述

VibeVibe 是基于 **VitePress** 构建的静态网站，完全独立运行，无需外部 API 调用。这意味着私有化部署非常简单——只需要将构建产物部署到您内部的服务器即可。

### 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| VitePress | 1.6.4 | 静态网站生成器 |
| Vue | 3.5.25 | 前端框架 |
| Node.js | 推荐 24 LTS | 构建环境 |

## 部署方式

### 方式一：直接部署静态文件（推荐）

这是最简单的方式，适合大多数场景。

```bash
# 1. 克隆项目
git clone https://github.com/datawhalechina/vibe-vibe.git
cd vibe-vibe

# 2. 安装依赖
pnpm install

# 3. 构建静态网站
pnpm build

# 4. 构建产物位于 docs/.vitepress/dist 目录
# 将整个 dist 文件夹复制到您的 Web 服务器即可
```

构建完成后，`docs/.vitepress/dist` 目录包含所有静态文件，您可以将其部署到：

- **Nginx**：直接指向 dist 目录
- **Apache**：配置 DocumentRoot
- **IIS**：将 dist 目录设为网站根目录
- **对象存储**：上传到 OSS/S3 并配置静态网站托管
- **任何静态文件托管服务**

### 方式二：使用 Docker（推荐）

Docker 方式最简单——容器内已集成 Nginx，一条命令即可启动：

```dockerfile
# Dockerfile
FROM node:24-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 lock 文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制项目文件
COPY . .

# 构建
RUN pnpm build

# 使用 Nginx 提供静态文件服务
FROM nginx:alpine
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
# 构建镜像
docker build -t vibevibe-docs .

# 运行容器（访问 http://localhost:8080）
docker run -d -p 8080:80 vibevibe-docs
```

**优势**：容器内已集成 Nginx，无需额外配置，一条命令启动服务。

### 方式三：使用 EdgeOne Pages（腾讯云）

如果您使用腾讯云 EdgeOne Pages，可以一键部署：

1. 在 EdgeOne 控制台创建静态网站
2. 配置 GitHub 仓库自动同步
3. 每次推送代码自动重新构建

### 方式四：本地预览

构建后可以在本地预览：

```bash
pnpm preview
# 访问 http://localhost:4173
```

## 离线环境注意事项

由于是静态网站，私有化部署后**完全离线运行**，不需要互联网连接。

### 可能需要处理的离线资源

1. **Giscus 评论系统**（如使用）：
   - 需要互联网连接才能加载
   - 建议：在私有环境部署时禁用或自建评论系统

2. **图片资源**：
   - 当前使用 GitHub raw 链接
   - 建议：将图片下载到本地 `docs/public/` 目录

3. **外部 CDN**：
   - 当前可能使用了 CDN 资源
   - 建议：构建时将资源内联或使用内部镜像

## 离线构建步骤

完全离线环境下的构建步骤：

```bash
# 1. 在有网络的机器上下载项目
git clone https://github.com/datawhalechina/vibe-vibe.git

# 2. 打包项目（包含 node_modules）
tar czf vibe-vibe.tar.gz vibe-vibe/

# 3. 传输到离线服务器并解压
tar xzf vibe-vibe.tar.gz

# 4. 如果 node_modules 不完整，需要重新安装
cd vibe-vibe
# 使用本地 npm 源或离线安装包
```

## 常见问题

### Q: 需要数据库吗？

不需要。VibeVibe 是纯静态网站，所有内容都是 Markdown 文件预渲染生成的。

### Q: 需要配置域名吗？

不需要。您可以使用内网 IP 地址访问，如 `http://192.168.1.100:8080`。

### Q: 支持搜索功能吗？

支持。VitePress 内置的客户端搜索功能完全离线可用。

### Q: 如何更新内容？

```bash
# 1. 拉取最新代码
git pull

# 2. 重新构建
pnpm build

# 3. 替换 dist 目录即可
```

### Q: 构建失败怎么办？

```bash
# 清理缓存重新构建
rm -rf node_modules docs/.vitepress/cache
pnpm install
pnpm build
```

## 私有化部署建议

### 安全加固

1. **移除评论功能**：在配置中禁用 Giscus
2. **内网部署**：仅在公司内网访问，不暴露到公网
3. **访问控制**：配置 Nginx 基本认证或集成公司 SSO

### 内容定制

如果需要定制教程内容（如添加公司内部案例），可以直接修改 Markdown 文件后重新构建。

## 联系支持

如遇到部署问题，请：

1. 查看本文档的常见问题部分
2. 在 GitHub 提 Issue：[datawhalechina/vibe-vibe](https://github.com/datawhalechina/vibe-vibe/issues)
