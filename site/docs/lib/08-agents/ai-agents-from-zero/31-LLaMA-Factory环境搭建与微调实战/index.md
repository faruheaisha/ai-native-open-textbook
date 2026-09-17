---
title: "31 - LLaMA-Factory 环境搭建与微调实战"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/31-LLaMA-Factory环境搭建与微调实战.md"
sourceRel: "31-LLaMA-Factory环境搭建与微调实战.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/31-LLaMA-Factory环境搭建与微调实战.md"
sourceSha256: "fb7c606e81c3a2011020e8667dc25b7a5fb114073c0b86961126921812b5684f"
pageSha256: "ac9b0ca15f5c67ed56d0438eccb92b02d95f2f6d765bd97641888323b33d9e98"
contentMode: "local-full"
zh: ""
---

# 31 - LLaMA-Factory 环境搭建与微调实战

---

**本章课程目标：**

- 能按顺序完成环境准备、页面连接、数据登记、参数配置、训练启动与结果保存，分清本机和远端的职责。
- 能检查 GPU 实际计算、数据预览与模型模板配置，判断是否具备启动训练的条件。
- 能把 WebUI 设置对应到 YAML 和日志，解释独立验证集、批次与训练方式等关键设置。
- 能观察训练进度，区分页面连接故障与训练中断，并根据日志和状态选择检查点。
- 能整理 Adapter、配置、数据版本与实验记录，检查备份完整性，分清推理加载与完整续训所需材料。

**学习建议：** 按正文顺序完成“准备环境 → 连接页面 → 登记并预览数据 → 配置训练 → 启动并观察 → 保存结果”。每一步先说明正在操作本机还是远端，再核对完成标志；例如看见 GPU 后还要运行 Python 计算检查，上传数据后还要预览。先用主线题复述正常流程，再处理连接、检查点与恢复问题，最后填写第 9.5 节实验记录。

---

## 本篇目录

- [1、实验任务与环境](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/01-1_实验任务与环境.md)
- [2、AutoDL 实例配置](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/02-2_AutoDL_实例配置.md)
- [3、LLaMA-Factory 安装](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/03-3_LLaMA-Factory_安装.md)
- [4、WebUI 启动与连接](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/04-4_WebUI_启动与连接.md)
- [5、模型与对话模板配置](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/05-5_模型与对话模板配置.md)
- [6、数据上传与登记](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/06-6_数据上传与登记.md)
- [7、LoRA 训练参数配置](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/07-7_LoRA_训练参数配置.md)
- [8、训练启动与日志检查](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/08-8_训练启动与日志检查.md)
- [9、训练结果与备份](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/09-9_训练结果与备份.md)
