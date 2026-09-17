---
title: "快速开始 - 品牌资源"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/resources/QUICK-START.md"
sourceRel: "zh/resources/QUICK-START.md"
rawUrl: "/raw/09-harness/claude-howto/zh/resources/QUICK-START.md"
sourceSha256: "24a8a5b4cfc5a7e2c463c64eccb3336c8a3157b0cd4a67b6e4a98f088fa60ff0"
pageSha256: "24a8a5b4cfc5a7e2c463c64eccb3336c8a3157b0cd4a67b6e4a98f088fa60ff0"
contentMode: "local-full"
zh: ""
---

# 快速开始 - 品牌资源

## 复制资源到你的项目

```bash
# 将所有资源复制到你的 Web 项目中
cp -r resources/ /path/to/your/website/

# 或者只复制网页所需的 favicon
cp resources/favicons/* /path/to/your/website/public/
```

## 添加到 HTML（直接复制粘贴）

```html

<link rel="icon" type="image/svg+xml" href="/resources/favicons/favicon-32.svg" sizes="32x32">
<link rel="icon" type="image/svg+xml" href="/resources/favicons/favicon-16.svg" sizes="16x16">
<link rel="apple-touch-icon" href="/resources/favicons/favicon-128.svg">
<link rel="icon" type="image/svg+xml" href="/resources/favicons/favicon-256.svg" sizes="256x256">
<meta name="theme-color" content="#000000">
```

## 在 Markdown/文档中使用

```markdown
# Claude How To

![Claude How To Logo](resources/logos/claude-howto-logo.svg)

![Icon](resources/icons/claude-howto-icon.svg)
```

## 推荐尺寸

| 用途 | 尺寸 | 文件 |
|---------|------|------|
| 网站页眉 | 520×120 | `logos/claude-howto-logo.svg` |
| 应用图标 | 256×256 | `icons/claude-howto-icon.svg` |
| 浏览器标签页 | 32×32 | `favicons/favicon-32.svg` |
| 移动端桌面图标 | 128×128 | `favicons/favicon-128.svg` |
| 桌面应用 | 256×256 | `favicons/favicon-256.svg` |
| 小头像 | 64×64 | `favicons/favicon-64.svg` |

## 颜色值

```css
/* 在 CSS 中使用这些值 */
--color-primary: #000000;
--color-secondary: #6B7280;
--color-accent: #22C55E;
--color-bg-light: #FFFFFF;
--color-bg-dark: #0A0A0A;
```

## 图标含义

**指南针 + 代码括号**：
- 指南针环 = 导航、结构化学习路径
- 绿色北针 = 方向、进展、引导
- 黑色南针 = 基础、根基
- `>` 括号 = 终端提示符、代码、CLI 场景
- 刻度线 = 精准、结构化步骤

这象征着“在清晰引导下穿行于代码世界”。

## 在哪里用什么

### 网站
- **页眉**：Logo（`logos/claude-howto-logo.svg`）
- **Favicon**：32px（`favicons/favicon-32.svg`）
- **社交预览**：图标（`icons/claude-howto-icon.svg`）

### GitHub
- **README 徽章**：图标（`icons/claude-howto-icon.svg`），建议 64-128px
- **仓库头像**：图标（`icons/claude-howto-icon.svg`）

### 社交媒体
- **头像**：图标（`icons/claude-howto-icon.svg`）
- **横幅**：Logo（`logos/claude-howto-logo.svg`）
- **缩略图**：256×256px 图标

### 文档
- **章节标题**：Logo 或图标（按需缩放）
- **导航图标**：Favicon（32-64px）

---

完整文档见 [README.md](/lib/09-harness/claude-howto/zh-resources-2)。
