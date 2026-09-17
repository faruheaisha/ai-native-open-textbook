---
title: "阶段 18：伦理、安全与对齐"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/README.md"
sourceRel: "phases/18-ethics-safety-alignment/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/README.md"
sourceSha256: "4dd6cfeaf4556cde46134be41c7e8a5fbd8e7c1f7b9dfede177671082e291723"
pageSha256: "4dd6cfeaf4556cde46134be41c7e8a5fbd8e7c1f7b9dfede177671082e291723"
contentMode: "local-full"
zh: ""
---

# 阶段 18：伦理、安全与对齐

> 构建帮助人类的 AI。这不是可选项。

## 在 GitHub 上开始本阶段

**前置要求：** 阶段 10 的第 06、07、08 课，分别涉及 SFT、RLHF 和 DPO。

**第一课：** [把遵循指令作为对齐信号](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/01-instruction-following-alignment-signal/README.md)

从仓库根目录运行：

```bash
python3 phases/18-ethics-safety-alignment/01-instruction-following-alignment-signal/code/main.py
```

记录命令、退出码、使用与不使用 KL 惩罚的策略、奖励和 KL 轨迹，以及一句指出你观察到的代理目标失效。

**下一步：** 改变 KL 系数，预测策略漂移，然后继续学习[奖励黑客与古德哈特定律](https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/02-reward-hacking-goodhart/README.md)。

浏览[阶段 18 的完整课程列表](/lib/07-coding/ai-engineering-from-scratch-zh/overview#phase-18)或[跨阶段路线图](/lib/07-coding/ai-engineering-from-scratch-zh/ROADMAP)。
