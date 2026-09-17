---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/05-eval-and-vision/index.md"
sourceRel: "learn-agent-interview/05-eval-and-vision/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/05-eval-and-vision/index.md"
sourceSha256: "17c863430bb6ecbc29d9475eb7480d07c54a45774e643f928d23fd755ef5d444"
pageSha256: "5262e3327aae0a884e28cef2c54760e7d06e2b7121512fb6aab9e72736a96b49"
contentMode: "local-full"
zh: ""
---

## Q：如何实现基于 VLM 的 Benchmark 系统，并避免评测模型自说自话？

> 来源：[深信服 Agent 开发一面](https://www.nowcoder.com/feed/main/detail/83326f3bcc5546b2b556373ad29a6d71)

**新手答**：“准备图片和标准答案，让 VLM 打分，再统计准确率。”

**高手答**：先按任务定义 Oracle。OCR、定位、图表问答、页面操作和开放描述需要不同标注：文本 Exact Match、框坐标与 IoU、结构化字段、可执行动作结果，以及成对偏好不能混成一个总分。每条样本保存原始资产哈希、标注版本、允许答案集合和评分器版本，并按来源对象切分 train/dev/test，避免同一页面或视频相邻帧泄漏。

确定性指标优先由程序计算；只有语义等价、视觉质量等难规则化维度才使用 VLM Judge。Judge 输入必须限制为任务、候选、参考证据和量表，输出结构化分项、证据区域和置信度。再用人工双标样本校准一致率、偏置和阈值，并做位置互换、去模型名、对抗提示、图片遮挡与无答案测试。Judge 与被测模型尽量使用不同模型族，关键结论保留人工复核。

报告除平均分外，还要按分辨率、语言、图像质量、长图、遮挡和任务难度切片，并给置信区间。评测资产、推理参数、解析器和评分代码全部版本化；模型升级后重跑冻结集与新增回归集，防止 Benchmark 被反复调参污染。

**差距在哪**：新手把 VLM 同时当答题者和裁判，高手先固定任务 Oracle，再校准 Judge 偏差、数据泄漏和版本可复现性。
