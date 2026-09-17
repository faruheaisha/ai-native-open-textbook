---
title: "开局一个浏览器，代码环境全搞定"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/Advanced/web-ide.md"
sourceRel: "docs/Advanced/web-ide.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/Advanced/web-ide.md"
sourceSha256: "4a1d66363037bb22a798854df1afbfecb9223859bfbd135dfcd736cbba568762"
pageSha256: "4a1d66363037bb22a798854df1afbfecb9223859bfbd135dfcd736cbba568762"
contentMode: "local-full"
zh: ""
---

# 开局一个浏览器，代码环境全搞定

你是否厌倦了：

- 配置开发环境要花好几天？
- 电脑配置不够，Docker 跑不动？
- GitHub 下载慢，clone 一个仓库要半小时？

别折腾了！**打开浏览器就能写代码**，环境自动配置好，所有依赖装好就能用。

> 理论上任何能安装浏览器的设备都能 VibeCoding，甚至是冰箱、电话手表。

## 预装开发环境

本项目基于 [Eyre@VibeVibe.cn](https://www.hangkangfu.cn) 构建并发布的镜像，开箱即用：

- **AI 编程**: Claude Code、OpenAI Codex、Gemini Code Assist
- **运行时**: Node.js 24.x、Python 3.11+、Docker
- **开发工具**: Git、GitHub CLI、VS Code (53 个扩展)
- **运维面板**: 1Panel (端口 34246，用户名 `cnb`，密码 `IloveCNB.`)

详细配置参考 [default-dev-env](https://cnb.cool/nfeyre/default-dev-env)。

## 基础概念

| 概念 | 说明 |
|-----|------|
| **仓库 (Repository)** | 存放代码的地方，相当于一个项目的文件夹 |
| **组织 (Organization)** | 用来管理多个仓库和团队成员的命名空间 |
| **Fork** | 复制别人的仓库到自己账户下，可以自由修改而不影响原仓库 |
| **Clone** | 将远程仓库下载到本地进行开发 |
| **分支 (Branch)** | 代码的独立版本线，用于并行开发不同功能 |

## 1. 注册与登录

打开腾讯云 [cnb.cool](https://cnb.cool)，右上角使用微信扫码登陆注册。

![扫码登录](/mirror/3d/3d9bcae2226a1f6ea0c2166e86bbe5946f960e83.jpg)

![注册页面](/mirror/1f/1f13bbff7555bf50a4ceccd1865c28c651444fcd.png)

### 实名认证（必须）

注册后需要完成实名认证才能使用 CNB 服务。

![实名认证](/mirror/03/03973b0d6c83221f9ef89191521f58451e1a9a9f.png)

完成认证后进入 [认证页面](https://cnb.cool/profile/auth)：

![认证页面](/mirror/1e/1e68fe7d581b07e2ba5814bf8901348d20be13c3.png)

![填写信息](/mirror/02/027606535d8ae1de26c850a1d4c616e2a7c888b5.png)

## 2. 创建组织

CNB 的仓库必须在组织下管理。点击右上角的 `＋`，选择`创建组织`，填写组织名称及相关描述后，单击`创建`即可完成组织创建。

- [创建组织页面](https://cnb.cool/new/groups)

![创建组织](/mirror/c1/c14688341c77be030372d92c3e72b1282ef1d2af.png)

![填入组织名](/mirror/c8/c8fe295ffdf0908b9c47d21f02928ffa8a061553.png)

组织是团队管理成员和资源的命名空间。在创建仓库资源前，需创建组织以管理成员及仓库等资源。

## 3. 创建开发环境

### Fork 仓库

点击打开 [vibestudio-default-dev](https://cnb.cool/vibevibe/vibestudio-default-dev) 仓库，点击 Fork：

![Fork 仓库](/mirror/a2/a2296cb6ce81838fd73ba57d47497e2526390dcb.png)

### 启动云原生开发

Fork 到自己的仓库之后，点击"云原生开发"按钮，稍等片刻，等待开发环境创建：

![启动开发环境](/mirror/60/606cd59e5cfb857034bbd9dc7d7e15a171f8a583.png)

### 连接开发环境

工作空间创建成功后，可以：

- 直接打开 WebIDE 在线编辑
- 通过 SSH 登陆命令，使用安装了 Remote SSH 的 IDE 进行连接

![连接方式](/mirror/26/2628b1822b84d5f1a413dac82347a024566178b5.png)

::: danger
**重要提醒：**

在云端 IDE 修改的代码**必须提交 Git 并推送！**

云原生开发环境会在闲置后自动回收，如果代码没有推送到远程仓库，环境回收后代码将会丢失。
:::

## 4. 配置 Claude Code

环境自动安装了开发必要的依赖，打开时会提示配置 GLM KEY 以使用 Claude Code。

| 配置密钥 | 剪贴板权限 |
|----------|-----------|
| ![配置密钥](/mirror/ce/ceeb8f4ea12ad03a0bee4ea71ac11a884846200c.png) | ![剪贴板权限](/mirror/9f/9fd21048373825aed72c0192d14ca85a102b8cee.png) |

粘贴密钥时会提示调用电脑的剪贴板，同意即可。

一键配置 GLM 编码套餐专属 MCP：

| 配置 MCP | 配置完成 |
|----------|----------|
| ![配置 MCP](/mirror/ff/ffbddbc763eb785ee08d3a7233c2c60af77c8442.png) | ![MCP 配置完成](/mirror/2a/2a98a018d15ab169469d8ea94e73291e54e06152.png) |

配置完成后输入 `claude` 即可开启编程之旅：

![启动 Claude](/mirror/9e/9ee27ff6eb9ce8ac51f3727352d41d9d3a008c8f.png)

## 5. 本地连接 CNB 仓库

### 获取访问令牌

登录后进入 [访问令牌](https://cnb.cool/profile/token) 页面，创建令牌。

### Clone 仓库

```bash
git clone https://cnb.cool/你的组织名/仓库名.git
# 用户名: cnb
# 密码: 你创建的访问令牌
```

更多用法参考 [CNB 官方文档 - 访问令牌](https://docs.cnb.cool/zh/develops/token)。

## 附录

### 1. 设置中文界面

点击侧边栏插件按钮，安装中文插件：

![插件按钮](/mirror/49/49327a296a80dc6d7d69fb39f706cb5318a508cb.png)

按下 `Ctrl+Shift+P` 组合键显示"命令面板"，然后键入 `display` 筛选并显示"Configure Display Language"命令，按 `Enter`：

![命令面板](/mirror/9a/9a377bca39d38f1986971bcb8906c5647753c7ff.png)

选择"语言"以切换 UI 语言：

![选择语言](/mirror/74/746b1514632eb41ac0a8c3a2987aac93d44f8e49.png)

选择中文并确认，自动重启后界面变为中文：

![中文界面](/mirror/40/40231c0b891b61205d07b0cd47074ad53e0d6511.png)

### 2. 迁移本地已有项目

如果你本地已有项目，可以一键迁移到 CNB：

```bash
cnb-init-from https://你的仓库地址.git
```

### 3. 访问令牌是什么？

访问令牌相当于你的"数字钥匙"，用于：

- 从远程仓库 Clone 代码
- Push 代码到仓库
- 访问制品库

获取方式：登录后进入 [访问令牌](https://cnb.cool/profile/token) 页面创建。

---

更多内容参考：[CNB 官方文档](https://docs.cnb.cool/zh/)
