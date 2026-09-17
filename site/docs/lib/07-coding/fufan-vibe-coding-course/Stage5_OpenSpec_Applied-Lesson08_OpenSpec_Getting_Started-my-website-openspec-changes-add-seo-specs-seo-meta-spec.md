---
title: "Vibe Coding：AI 编程实战课"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage5_OpenSpec_Applied/Lesson08_OpenSpec_Getting_Started/my-website/openspec/changes/add-seo/specs/seo-meta/spec.md"
sourceRel: "Stage5_OpenSpec_Applied/Lesson08_OpenSpec_Getting_Started/my-website/openspec/changes/add-seo/specs/seo-meta/spec.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage5_OpenSpec_Applied/Lesson08_OpenSpec_Getting_Started/my-website/openspec/changes/add-seo/specs/seo-meta/spec.md"
sourceSha256: "d480238524970577e92c9504399818043e10864c9b40623268e7433642f6c8b8"
pageSha256: "d480238524970577e92c9504399818043e10864c9b40623268e7433642f6c8b8"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## ADDED Requirements

### Requirement: HTML Meta Tags
页面必须（SHALL）在 `<head>` 中包含有意义的 `<title>` 和 `<meta name="description">`。

#### Scenario: 搜索引擎读取标题和描述
- **GIVEN** 搜索引擎爬虫访问页面
- **WHEN** 解析 HTML `<head>`
- **THEN** 获取到包含站主姓名和职业的 `<title>`，以及不超过 160 字符的 `<meta name="description">`

#### Scenario: title 为空或默认值（边界）
- **GIVEN** 开发者忘记修改 title
- **WHEN** 页面上线
- **THEN** 不得出现默认的 `my-website` 或空 title

### Requirement: Open Graph Tags
页面必须（SHALL）包含基础 Open Graph meta tags，用于社交平台分享预览。

#### Scenario: 社交分享显示预览
- **GIVEN** 用户在社交平台分享页面链接
- **WHEN** 平台抓取 OG tags
- **THEN** 显示正确的标题（`og:title`）、描述（`og:description`）和类型（`og:type`）

#### Scenario: og:url 与实际部署地址一致（边界）
- **GIVEN** 站点部署在 GitHub Pages
- **WHEN** 平台读取 `og:url`
- **THEN** URL 与实际访问地址一致（含 base path `/my-website/`）

### Requirement: HTML 语义化
页面必须（SHALL）使用正确的语义化 HTML 标签，确保合理的文档大纲层级。

#### Scenario: 页面包含 main 元素
- **GIVEN** 页面加载完成
- **WHEN** 检查 DOM 结构
- **THEN** 主体内容被 `` 元素包裹，全页仅一个 ``

#### Scenario: 标题层级正确
- **GIVEN** 页面加载完成
- **WHEN** 检查标题层级
- **THEN** 全页仅一个 `<h1>`（Hero 中的姓名），各 Section 标题为 `<h2>`，子标题为 `<h3>`，层级不跳跃

#### Scenario: html lang 属性正确（边界）
- **GIVEN** 页面以简体中文为主
- **WHEN** 检查 `<html>` 标签
- **THEN** `lang` 属性为 `zh-CN`

### Requirement: robots.txt
站点根目录必须（SHALL）存在 `robots.txt` 文件，允许搜索引擎爬虫索引。

#### Scenario: 爬虫可以索引
- **GIVEN** Google 爬虫访问 `/robots.txt`
- **WHEN** 解析文件内容
- **THEN** 允许所有爬虫访问所有路径（`User-agent: * Allow: /`）

#### Scenario: robots.txt 不存在（边界）
- **GIVEN** 构建产物中缺少 robots.txt
- **WHEN** 爬虫请求 `/robots.txt`
- **THEN** 返回 404，爬虫默认可索引但体验不佳——需确保文件存在于 `public/` 目录
