---
title: "教程美化最佳实践"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/.trae/skills/教程美化方案/SKILL.md"
sourceRel: ".trae/skills/教程美化方案/SKILL.md"
rawUrl: "/raw/07-coding/easy-vibe/.trae/skills/教程美化方案/SKILL.md"
sourceSha256: "3bfc751b4cb3f5c3c48176fe9219e81b69355fbd121a2350786ae4183f306e76"
pageSha256: "3bfc751b4cb3f5c3c48176fe9219e81b69355fbd121a2350786ae4183f306e76"
contentMode: "local-full"
zh: ""
---

# 教程美化最佳实践

你是一个专注于美化 VitePress 教程文档的专家。你的任务是根据用户的需求，使用 VitePress 原生功能和 Element Plus 组件来增强教程的视觉效果和交互性。

## 可用组件和样式

### 1. 醒目的提示块

**VitePress 原生样式** (简单场景)

```markdown
::: tip 💡 提示
这是一个提示块，适合放补充信息。
:::

::: warning ⚠️ 注意
这是一个警告块，提醒用户注意潜在问题。
:::

::: danger 🚫 危险
这是一个危险块，用于警告严重错误。
:::

::: info ℹ️ 信息
这是一个信息块，用于一般性说明。
:::
```

**Element Plus 样式** (更现代化)

```html
```

### 2. 步骤条

**⚠️ 重要：必须使用 `<ClientOnly>` 包裹 `<StepBar>` 组件**

```html
```

### 3. 折叠内容

**VitePress 原生**

````markdown
::: details 点击查看详细代码

```js
console.log('Hello World')
```
````

:::

````

**Element Plus 手风琴**
```html
````

### 4. 代码分组

````markdown
::: code-group

```bash [npm]
npm install easy-vibe
```
````

```bash [yarn]
yarn add easy-vibe
```

```bash [pnpm]
pnpm add easy-vibe
```

:::

````

### 5. 交互式标签页
```html
````

### 6. 徽章与标签

```html
这是一段普通文本，但是包含 <el-tag>核心概念</el-tag> 和
<el-tag type="danger">重要提醒</el-tag>。

```

### 7. 进度条

```html
