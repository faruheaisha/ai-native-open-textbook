---
title: "🧭 扣子罗盘前端"
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/README.zh-CN.md"
sourceRel: "frontend/README.zh-CN.md"
rawUrl: "/raw/04-work/coze-loop/frontend/README.zh-CN.md"
sourceSha256: "2a3e808af0b1d17a3dad887c1ab825d4a2e520b6fa817ca9ce3d829b7be0dcdb"
pageSha256: "2a3e808af0b1d17a3dad887c1ab825d4a2e520b6fa817ca9ce3d829b7be0dcdb"
contentMode: "local-full"
zh: ""
---

# 🧭 扣子罗盘前端

[English](/lib/04-work/coze-loop/frontend) | 简体中文

仓库由 [Rush.js](https://rushjs.io/) 管理。

## 🚀 快速开始

```
_____________________________________
< Getting Started >
-------------------------------------
       \   ^__^
        \  (oo)\_______
           (__)\       )\/\
               ||----w |
               ||     ||
```

环境要求:

* Node.js 24+ (推荐 lts/krypton 版本)
* pnpm 10.27.0
* Rush 5.172.1

### 1. 安装 Node.js 18+

``` bash
nvm install lts/krypton
nvm alias default lts/krypton # 设置默认 Node 版本
nvm use lts/krypton
```

### 2. 检出 Git 仓库并切换到 `frontend` 目录

```bash
# 克隆仓库
git clone git@github.com:coze-dev/coze-loop.git

# 切换目录
cd frontend
```

### 3. 安装全局依赖

```bash
npm i -g pnpm@10.27.0 @microsoft/rush@5.172.1
```

### 4. 安装/更新项目依赖

```bash
rush update
```

## 🔨 开发

### 1. 运行

> 提示: 使用 `rushx` 而不是 `pnpm run` 或 `npm run`

扣子罗盘项目位于 `apps/cozeloop` 目录，是一个 React 应用。启动命令：

```bash
cd apps/cozeloop

rushx dev
```

在浏览器中打开 [http://localhost:8090/](http://localhost:8090/) 以查看页面。

### 2. 构建

扣子罗盘项目由 [Rsbuild](https://rsbuild.dev/) 构建，配置文件是 [apps/cozeloop/rsbuild.config.ts](https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/apps/cozeloop/rsbuild.config.ts)。

```bash
cd apps/cozeloop

rushx build
```

### 3. workspace 依赖

如你所见，[apps/cozeloop/package.json](https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/apps/cozeloop/package.json) 中有许多依赖是 `workspace:*` 版本，这意味着它们是在此仓库内维护。

扣子罗盘项目依赖这些项目的源代码而非构建产物，修改这些 workspace 依赖的源代码，变更会立刻生效（有时候需要重新运行）。

### 4. 更新前端 api 类型

运行下面的命令，idl 相关文件将生成在[packages/cozeloop/api-schema](https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/frontend/packages/cozeloop/api-schema/README.md)。

```bash
rush update-api
```

## 📄 许可证

* [Apache License, Version 2.0](https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/LICENSE/README.md)
