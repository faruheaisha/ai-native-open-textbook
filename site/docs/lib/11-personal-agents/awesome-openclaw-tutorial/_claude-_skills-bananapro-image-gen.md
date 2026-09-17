---
title: "Banana Pro Image Generation Skill"
sourceId: "11-personal-agents/awesome-openclaw-tutorial"
sourceTitle: "Awesome OpenClaw Tutorial（中文）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "11-personal-agents"
sourceUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial"
entryUrl: "https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/.claude/.skills/bananapro-image-gen/README.md"
sourceRel: ".claude/.skills/bananapro-image-gen/README.md"
rawUrl: "/raw/11-personal-agents/awesome-openclaw-tutorial/.claude/.skills/bananapro-image-gen/README.md"
sourceSha256: "cfe13de067542c67f68748df84a6ff3d6433695ac107f8893cedfd07a5242da8"
pageSha256: "cfe13de067542c67f68748df84a6ff3d6433695ac107f8893cedfd07a5242da8"
contentMode: "local-full"
zh: ""
---

# Banana Pro Image Generation Skill

> 使用 Gemini 3 Pro Image 生成图片的 AI Skill，支持白板图、Logo设计、社交媒体配图等多种场景。

## ✨ 特性

- 🎨 **文生图**：根据文字描述生成各种风格的图片
- 📝 **白板图**：生成手写风格的概念图、流程图
- 🖼️ **Logo设计**：创建简约现代的Logo和图标
- 📱 **社交媒体配图**：生成适合各平台的配图
- 🌏 **中文支持**：完美支持中文提示词
- ⚡ **快速响应**：10-30秒生成
- 💰 **成本低廉**：$0.04-0.16/张

## 🚀 快速开始

### 安装

```bash
# 通过 npx（推荐）
npx skills add xianyu110/awesome-openclaw-tutorial@bananapro-image-gen

# 或手动克隆
git clone https://github.com/xianyu110/awesome-openclaw-tutorial.git
cd .claude/.skills/bananapro-image-gen
pip install -r requirements.txt
```

### 配置

```bash
# 设置 API Key
export NEXTAI_API_KEY="your-api-key-here"
```

### 使用

```bash
# 生成图片
python scripts/generate_image.py \
  --prompt "画一只可爱的橙色猫咪" \
  --filename "cat.png"

# 生成白板图
python scripts/generate_image.py \
  --prompt "生成一张白板图片，展示OpenClaw核心架构，手写字体风格" \
  --filename "whiteboard.png"

# 生成高清Logo
python scripts/generate_image.py \
  --prompt "设计一个AI助手Logo，蓝色渐变，现代简约" \
  --filename "logo.png" \
  --resolution 2K
```

## 📖 使用场景

### 1. 教程配图

```bash
python scripts/generate_image.py \
  --prompt "生成一张白板图片，手写字体风格，总结OpenClaw核心要点" \
  --filename "tutorial.png"
```

### 2. Logo设计

```bash
python scripts/generate_image.py \
  --prompt "设计一个超级个体Logo，蓝色和橙色，现代科技感" \
  --filename "logo.png" \
  --resolution 2K
```

### 3. 社交媒体配图

```bash
python scripts/generate_image.py \
  --prompt "生成小红书配图，主题是AI效率提升，9:16竖版" \
  --filename "social.png" \
  --resolution 2K
```

## 📝 提示词技巧

### 白板图模板

```
生成一张白板图片，手写字体风格，内容包含：
- 标题：[主题]
- 要点1：[内容]
- 要点2：[内容]
使用箭头、框图等手绘元素
```

### Logo设计模板

```
设计一个[主题]Logo，要求：
- 形状：[圆形/方形]
- 颜色：[主色调]
- 风格：[现代/简约]
- 用途：[社交媒体/网站]
```

## 🛠️ 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--prompt` | 图片描述（必需） | - |
| `--filename` | 输出文件名 | 自动生成 |
| `--resolution` | 分辨率（1K/2K/4K） | 1K |
| `--api-key` | API密钥 | 环境变量 |

## 💰 成本参考

- 1K 分辨率：~$0.04/张
- 2K 分辨率：~$0.08/张
- 4K 分辨率：~$0.16/张

## 📚 文档

- [完整文档](/lib/11-personal-agents/awesome-openclaw-tutorial/_claude-_skills-bananapro-image-gen-SKILL) - 详细的使用指南和示例
- [教程](https://github.com/xianyu110/awesome-openclaw-tutorial) - OpenClaw 超级个体实战指南

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/0b0943dc41725e80d64f7f8d745d185e7752be4d/.claude/.skills/bananapro-image-gen/LICENSE/README.md)

## 👤 作者

- GitHub: [@xianyu110](https://github.com/xianyu110)
- 项目: [OpenClaw 超级个体实战指南](https://github.com/xianyu110/awesome-openclaw-tutorial)
