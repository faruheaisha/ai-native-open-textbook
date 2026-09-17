---
title: "EPUB 构建脚本"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/scripts/README.md"
sourceRel: "zh/scripts/README.md"
rawUrl: "/raw/09-harness/claude-howto/zh/scripts/README.md"
sourceSha256: "7e9a1154749a16ade3bff8fac1b585f8e837725512984b178221b2ae8cf4cfae"
pageSha256: "7e9a1154749a16ade3bff8fac1b585f8e837725512984b178221b2ae8cf4cfae"
contentMode: "local-full"
zh: ""
---

# EPUB 构建脚本

## 功能

这个脚本会把整份指南构建成 EPUB 电子书，方便离线阅读。

## 需求

- Python 环境
- `uv`
- 相关依赖

## 快速开始

最简单的方式是直接让 `uv` 帮你处理依赖：

```bash
uv run scripts/build_epub.py
```

## 开发环境

如果你要修改脚本本身，可以先创建虚拟环境，再安装开发依赖。

```bash
# 创建虚拟环境

# 激活并安装依赖

# 运行测试

# 运行脚本
```

## 命令行选项

常见选项包括：

- 指定输出路径
- 打开详细日志
- 限制并发请求

## 示例

```bash
# 带详细输出构建

# 指定输出位置

# 限制并发数（遇到限流时）
```

## 输出

脚本会生成 EPUB 文件，里面包含所有内容和渲染后的图表。

## 运行测试

你可以用虚拟环境或直接通过 `uv` 运行测试。

## 依赖

脚本依赖的包会在项目的开发依赖里列出。

## 故障排查

- 检查 `uv` 是否可用
- 检查 Python 版本
- 检查依赖是否安装完整
