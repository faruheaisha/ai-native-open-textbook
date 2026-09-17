---
title: "阶段 8：生成式 AI"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/README.md"
sourceRel: "phases/08-generative-ai/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/08-generative-ai/README.md"
sourceSha256: "44d24fcb0f524bf0221eba82b117d7d35d3773c42ef7a65e39e5eef1e1c47443"
pageSha256: "44d24fcb0f524bf0221eba82b117d7d35d3773c42ef7a65e39e5eef1e1c47443"
contentMode: "local-full"
zh: ""
---

# 阶段 8：生成式 AI

> 创作图像、视频、音频、3D 等内容。

## 在 GitHub 上开始本阶段

**前置要求：** 阶段 2“机器学习基础”、阶段 3“深度学习核心”以及阶段 7 第 14 课“从零构建 Transformer”。

**第一课：** [生成模型的分类与历史](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/01-generative-models-taxonomy-history/README.md)

从仓库根目录运行：

```bash
python3 phases/08-generative-ai/01-generative-models-taxonomy-history/code/main.py
```

记录命令、退出码、密度估计、生成的样本，以及一句解释：隐式生成器无法回答有关 `p(x)` 的什么问题。

**下一步：** 改变随机种子，比较密度估计，然后继续学习[自编码器与 VAE](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/02-autoencoders-vae/README.md)。

浏览[阶段 8 的完整课程列表](/lib/07-coding/ai-engineering-from-scratch-zh/overview#phase-8)或[跨阶段路线图](/lib/07-coding/ai-engineering-from-scratch-zh/ROADMAP)。

共 15 课，约 15 小时。每节课都提供详细文档、可运行的 Python 演示、图表，以及供 agent 使用的具名 skill。

| # | 课程 | 时间 |
|---|--------|------|
| 01 | [生成模型：分类与历史](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/01-generative-models-taxonomy-history/README.md) | 约 45 分钟 |
| 02 | [自编码器与 VAE](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/02-autoencoders-vae/README.md) | 约 75 分钟 |
| 03 | [GAN：生成器与判别器](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/03-gans-generator-discriminator/README.md) | 约 75 分钟 |
| 04 | [条件 GAN 与 Pix2Pix](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/04-conditional-gans-pix2pix/README.md) | 约 75 分钟 |
| 05 | [StyleGAN](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/05-stylegan/README.md) | 约 45 分钟 |
| 06 | [扩散模型：从零实现 DDPM](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/06-diffusion-ddpm-from-scratch/README.md) | 约 75 分钟 |
| 07 | [潜在扩散与 Stable Diffusion](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/07-latent-diffusion-stable-diffusion/README.md) | 约 75 分钟 |
| 08 | [ControlNet、LoRA 与条件控制](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/08-controlnet-lora-conditioning/README.md) | 约 75 分钟 |
| 09 | [局部重绘、外扩绘制与编辑](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/09-inpainting-outpainting-editing/README.md) | 约 75 分钟 |
| 10 | [视频生成](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/10-video-generation/README.md) | 约 45 分钟 |
| 11 | [音频生成](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/11-audio-generation/README.md) | 约 45 分钟 |
| 12 | [3D 生成](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/12-3d-generation/README.md) | 约 45 分钟 |
| 13 | [流匹配与校正流](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/13-flow-matching-rectified-flows/README.md) | 约 45 分钟 |
| 14 | [评估：FID、CLIP Score 与人工偏好](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/14-evaluation-fid-clip-score/README.md) | 约 45 分钟 |
| 19 | [视觉自回归建模](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/08-generative-ai/19-visual-autoregressive-var/README.md) | 约 60 分钟 |
