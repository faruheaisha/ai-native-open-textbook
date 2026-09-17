---
title: "3.9 - Dify 案例：商品评论分析"
sourceId: "08-agents/ai-agents-from-zero"
sourceTitle: "从零构建 AI Agent（didilili）"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/didilili/ai-agents-from-zero"
entryUrl: "https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/3.9-商品评论分析-Dify.md"
sourceRel: "案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/3.9-商品评论分析-Dify.md"
rawUrl: "/raw/08-agents/ai-agents-from-zero/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/3.9-商品评论分析-Dify.md"
sourceSha256: "dbeb76c4f8944bf4ec979c64519330132298f1bb5af489289d14773e62b4a8b0"
pageSha256: "ff1d2de91a2a918cbb2c6c4290de9cf4ad87735eb609f1fa004a5c1ade723cb5"
contentMode: "local-full"
zh: ""
---

# 3.9 - Dify 案例：商品评论分析

---

## 本案例概要

## 本篇目录

- [使用的节点](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/01-使用的节点.md)
- [技术要点](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/02-技术要点.md)
- [工作流程概览](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/03-工作流程概览.md)
- [1.1 对比工作流与对话流](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/04-1.1_对比工作流与对话流.md)
- [1.2 创建 chatflow](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/05-1.2_创建_chatflow.md)
- [1.3 开始](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/06-1.3_开始.md)
- [1.4 文档提取器](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/07-1.4_文档提取器.md)
- [1.5 提取文本](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/08-1.5_提取文本.md)
- [1.6 切分元数据](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/09-1.6_切分元数据.md)
- [1.7 提取元数据](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/10-1.7_提取元数据.md)
- [1.8 分析和建议](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/11-1.8_分析和建议.md)
- [1.9 正在分析提示](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/12-1.9_正在分析提示.md)
- [1.10 汇总生成结果](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/13-1.10_汇总生成结果.md)
- [1.11 整理输出](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/14-1.11_整理输出.md)
- [1.12 输出最终结果](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/15-1.12_输出最终结果.md)
- [2.1 配置输入](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/16-2.1_配置输入.md)
- [2.2 查看工作流详情及调试](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/17-2.2_查看工作流详情及调试.md)
- [2.3 最终输出](https://github.com/didilili/ai-agents-from-zero/blob/ea7f28ffe0b2c2650e3936f3bb591560225702b3/案例与源码-1-Coze&Dify工作流智能体/3.9-Dify案例：商品评论分析/18-2.3_最终输出.md)
