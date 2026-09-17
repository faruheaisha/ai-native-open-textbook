---
title: "Markdown to DOCX 转换脚本"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/scripts/README-md2docx.md"
sourceRel: "scripts/README-md2docx.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-tutorial/scripts/README-md2docx.md"
sourceSha256: "d29ca71be581a7694498a95b19db644fce6c3961e23a71b35ac6dff2b9f1e854"
pageSha256: "d29ca71be581a7694498a95b19db644fce6c3961e23a71b35ac6dff2b9f1e854"
contentMode: "local-full"
zh: ""
---

# Markdown to DOCX 转换脚本

## 安装依赖

首先需要安装 pandoc：

```bash
brew install pandoc
```

## 使用方法

### 方式一：分别转换（保留目录结构）

将每个 Markdown 文件转换为独立的 DOCX 文件，保留原有目录结构（从第6章开始）：

```bash
./scripts/md2docx.sh
```

输出目录：`output/docx/`

### 方式二：合并为单个文档

将所有 Markdown 文件合并为一个 DOCX 文档（从第6章开始）：

```bash
./scripts/md2docx-single.sh
```

输出文件：`output/awesome-openclaw-tutorial.docx`

## 功能特性

- ✅ 从第6章开始转换（跳过第1-5章）
- ✅ 自动递归处理所有子目录
- ✅ 自动跳过 images 目录
- ✅ 保留目录结构（分别转换模式）
- ✅ 自动生成目录（TOC）
- ✅ 代码高亮支持
- ✅ 转换进度显示
- ✅ 错误处理和统计

## 输出示例

分别转换模式：
```
output/docx/
├── 01-basics/
│   ├── 01-introduction.docx
│   ├── 02-installation.docx
│   └── ...
├── 02-core-features/
│   └── ...
└── ...
```

合并模式：
```
output/
└── awesome-openclaw-tutorial.docx
```

## 注意事项

- 图片路径需要是相对路径或绝对路径才能正确显示
- 某些复杂的 Markdown 语法可能需要调整
- 建议在转换前备份原始文件
