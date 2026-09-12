---
title: "把网站发到网上（简单方式）：Vercel/Zeabur/CloudBase 一键发布"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/README.md"
zh: ""
---

# 把网站发到网上（简单方式）：Vercel/Zeabur/CloudBase 一键发布

> 💡 **什么叫"把网站发到网上"？** 也叫"上线"或"部署发布"。你在本地电脑写好的网站，只有你自己能打开；**"发到网上"就是把它放到一台 24 小时开机的服务器上，让任何一个人在浏览器里输入网址就能访问到**——就像你写了一篇 Word 文档只有自己电脑能看，发到公众号/博客后所有人都能看一样，只不过这次发上去的是一个完整的网站。

在本教程中，我们会介绍最简单的发站方式——**不需要买服务器，不需要懂运维**，连一下 GitHub 仓库点几下按钮就能把网站发到网上。我们会介绍三个常用平台：**腾讯云 CloudBase**、**Vercel** 和 **Zeabur**。

# 为什么用平台一键发布，而不自己搭服务器？

你可能想问：既然最终都要"放到服务器上"，为什么不自己买一台服务器来部署？答案是：**平台帮你把麻烦事全包了**。

如果手动部署，一个项目往往需要好几个步骤，每一步都可能踩坑。常见关键步骤包括：

1. **服务器准备**：你需要先购买云服务器（比如阿里云、腾讯云、或 AWS EC2），选择服务器所在地区（如上海、新加坡）、配置（CPU、内存、磁盘大小等），还要学会如何远程连接服务器（例如通过 SSH 工具登录）。
   ![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-2/backend/zeabur-deployment/images/image2.png)
2. **环境配置**：Web 应用需要在特定"环境"中才能运行——例如运行 Node.js 项目必须先安装 Node.js；运行 Python 项目必须安装 Python 以及对应的第三方库。如果环境版本不匹配，程序就可能报错、无法启动。
3. **上传资源**：你需要把本地的代码和资源上传到服务器上，常用的方法包括 FTP 或 Git。如果项目体积比较大（比如包含视频文件），中途一旦断线，有时需要重新上传。

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-2/backend/zeabur-deployment/images/image3.png)

4. **启动服务并测试**：上传完成后，你还需要在服务器上执行命令启动应用，并测试"分配的网络地址是否能访问"。如果访问不了，有可能是服务器防火墙没有放行对应端口（比如你的应用监听 3000 端口，但该端口被防火墙拦截），也可能是程序本身有 Bug，这时就需要查看服务器日志进行排查。
   > 💡 可以把端口理解为区分同一台设备上不同应用的"房间号"，而 IP 则是这台设备的"门牌号"。IP 和端口合在一起（IP:port），就可以精确定位到某一个网络服务。
5. **维护与更新**：后续每次你修改代码，都要重新上传并重启服务。如果服务器宕机（例如断电、网络故障），还需要手动重启应用，有时还要额外配置"进程守护工具"，让程序在异常退出后自动拉起。

像 CloudBase、Vercel、Zeabur 这样的"低代码部署平台"，就是为了解决上述复杂问题而诞生的。它们会帮你自动完成"买服务器、配环境、上传代码、启动服务、监控运行"等步骤。你只需要把自己的代码仓库（比如 GitHub 或 GitLab）连接到平台，或者直接上传代码，它就会自动拉取代码、识别应用类型、配置对应的运行时环境，最后给你一个可以被任何人访问的公网地址。它甚至可以一键绑定你自己的域名。

![](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/easy-vibe/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/zh-cn/stage-2/backend/zeabur-deployment/images/image4.png)

接下来，我们会分别介绍这三个平台的特点和使用方法，帮助你选择最适合自己的部署方案。

---

# 部署平台对比

| 平台 | 特点 | 适用场景 | 免费额度 |
|------|------|----------|----------|
| **腾讯云 CloudBase** | 国内访问速度快，与微信生态深度整合 | 国内用户为主、需要微信小程序支持的项目 | 有免费额度 |
| **Vercel** | 前端框架支持好，与 GitHub 集成紧密 | React/Vue/Next.js 等现代前端项目 | 有免费额度 |
| **Netlify** | 功能全面，支持表单处理和身份验证，与 Git 集成好 | 需要表单处理、身份验证等高级功能的静态网站 | 有免费额度 |
| **Zeabur** | 支持多种语言和服务模板，配置灵活 | 需要部署多种服务（如 Dify、n8n）的复杂项目 | 每月约 5 美元免费额度 |

---

# 1. 腾讯云 CloudBase

腾讯云 CloudBase（云开发）是腾讯云提供的一站式后端云服务，特别适合国内开发者使用。它的优势在于：

- **国内访问速度快**：服务器位于国内，访问延迟低
- **微信生态整合**：可以方便地对接微信小程序、公众号
- **一站式解决方案**：提供静态网站托管、云函数、数据库、存储等全套服务
- **免费额度充足**：个人开发者有充足的免费资源额度

## 使用 CloudBase 部署 Web 应用

### 步骤 1：注册并登录

访问 [腾讯云 CloudBase 控制台](https://console.cloud.tencent.com/tcb)，使用微信或 QQ 登录。

### 步骤 2：创建环境

点击"新建环境"，选择一个环境名称（如 `my-web-app`）。

> ⚠️ **注意**：CloudBase 的免费体验版需要兑换码才能开通。你需要关注腾讯云 CloudBase 公众号，在公众号中输入"领取兑换码"获取免费体验版的兑换码，然后在创建环境时填写兑换码即可开通免费环境（免费试用期为 6 个月）。

### 步骤 3：开通静态网站托管

在环境管理页面，找到"静态网站托管"功能并开通。开通后你会获得一个默认的访问域名。

CloudBase 的静态网站托管提供多种部署方式，与 Zeabur 类似：

- **本地项目上传**：直接从本地上传构建好的静态文件（HTML、CSS、JS 等）
- **模板部署**：使用预设模板快速创建项目，如 React Web 应用模板、Vue Web 应用模板
- **Git 仓库部署**：支持从 GitHub 等代码仓库自动拉取代码并部署

### 步骤 4：部署代码

在静态网站托管页面，CloudBase 提供三种部署方式：

**方式一：本地项目部署（本地项目上传）**
- 在控制台选择"本地项目部署"
- 直接上传构建好的静态文件（HTML、CSS、JS 等）
- 选择你本地构建好的项目文件夹（如 `dist` 或 `build` 目录）
- 等待上传完成即可访问

**方式二：模板部署**
- 使用预设模板快速创建项目
- 支持 React Web 应用模板、Vue Web 应用模板等
- 基于模板自动构建并部署

**方式三：Git 仓库部署**
- **Git 个人仓库部署**：绑定你的 GitHub 等个人代码仓库
- **公开仓库部署**：支持从公开的 Git 仓库拉取代码
- 配置自动构建命令（如 `npm run build`）
- 每次推送代码会自动重新部署

> 💡 **提示**：你也可以使用 CLI 工具进行部署：
> ```bash
> # 安装 CloudBase CLI
> npm install -g @cloudbase/cli
> # 登录
> tcb login
> # 部署
> tcb hosting deploy ./dist -e your-env-id
> ```

### 步骤 5：配置自定义域名（可选）

在静态网站托管设置中，可以绑定你自己的域名，并申请免费的 HTTPS 证书。

---

# 2. Vercel

Vercel 是全球最流行的前端部署平台之一，特别适合部署 React、Vue、Next.js 等现代前端框架项目。它的特点包括：

- **与 GitHub 深度集成**：推送代码即自动部署
- **自动预览**：每个 Pull Request 都会生成独立的预览链接
- **全球 CDN**：网站自动分发到全球节点，访问速度快
- **Serverless 函数**：支持在项目中编写后端 API

> ⚠️ **注意**：Vercel 在部分网络环境下访问可能不太稳定，国内用户建议优先考虑 CloudBase。

## 使用 Vercel 部署 Web 应用

### 步骤 1：注册账号

访问 [Vercel 官网](https://vercel.com)，使用 GitHub 账号登录。

### 步骤 2：导入项目

1. 点击 "Add New Project"
2. 选择你要部署的 GitHub 仓库
3. 如果没有看到想要的仓库，点击 "Adjust GitHub App Permissions" 授权访问

### 步骤 3：配置构建设置

Vercel 会自动识别项目类型并配置构建命令：

| 框架 | 构建命令 | 输出目录 |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
| Next.js | `next build` | - |
| 纯 HTML | - | 项目根目录 |

如果自动识别不正确，可以手动修改：
- **Build Command**: 构建命令，如 `npm run build`
- **Output Directory**: 构建输出目录，如 `dist` 或 `build`
- **Install Command**: 依赖安装命令，通常是 `npm install`

### 步骤 4：部署

点击 "Deploy" 按钮，等待构建完成。构建成功后，你会获得一个 `xxx.vercel.app` 的域名。

### 步骤 5：自定义域名（可选）

在项目设置中的 "Domains" 页面，可以添加你自己的域名。Vercel 会自动配置 HTTPS。

---

# 3. Netlify

Netlify 是另一个非常流行的前端部署平台，与 Vercel 类似，特别适合部署静态网站和单页应用（SPA）。它的特点包括：

- **功能全面**：除了静态网站托管，还支持表单处理、身份验证、边缘函数等高级功能
- **与 Git 深度集成**：支持 GitHub、GitLab、Bitbucket，推送代码自动部署
- **分支预览**：每个分支都会自动生成独立的预览链接
- **全球 CDN**：网站自动分发到全球节点，访问速度快
- **表单处理**：无需后端代码即可处理网站表单提交
- **身份验证**：内置用户身份验证功能，可快速实现登录/注册

> ⚠️ **注意**：Netlify 的国内访问速度可能不如 CloudBase，建议主要面向海外用户的项目使用。

## 使用 Netlify 部署 Web 应用

### 步骤 1：注册账号

访问 [Netlify 官网](https://www.netlify.com)，点击 "Sign up" 注册。你可以使用 GitHub、GitLab、Bitbucket 或邮箱注册。

### 步骤 2：导入项目

1. 登录后点击 "Add new site" → "Import an existing project"
2. 选择你的代码托管平台（如 GitHub）
3. 授权 Netlify 访问你的仓库
4. 从列表中选择你要部署的仓库

### 步骤 3：配置构建设置

Netlify 会自动识别常见的前端框架并配置构建设置：

| 框架 | 构建命令 | 发布目录 |
|------|----------|----------|
| React | `npm run build` | `build` |
| Vue | `npm run build` | `dist` |
