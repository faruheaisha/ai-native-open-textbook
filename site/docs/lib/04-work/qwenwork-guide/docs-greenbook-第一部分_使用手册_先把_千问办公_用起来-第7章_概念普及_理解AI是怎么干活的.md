---
title: "第7章 概念普及：理解AI是怎么干活的"
sourceId: "04-work/qwenwork-guide"
sourceTitle: "千问办公绿皮书（QwenWorkGuide）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/wangxiaoshuai1998/QwenWorkGuide"
entryUrl: "https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/greenbook/第一部分%20使用手册：先把%20千问办公%20用起来/第7章%20概念普及：理解AI是怎么干活的/index.md"
sourceRel: "docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第7章 概念普及：理解AI是怎么干活的/index.md"
rawUrl: "/raw/04-work/qwenwork-guide/docs/greenbook/第一部分 使用手册：先把 千问办公 用起来/第7章 概念普及：理解AI是怎么干活的/index.md"
sourceSha256: "e9e423c5f1adeac3a15937a93ec6b764a9f340a55d4c6130c402bff2d8ce236f"
pageSha256: "e9e423c5f1adeac3a15937a93ec6b764a9f340a55d4c6130c402bff2d8ce236f"
contentMode: "local-full"
zh: ""
---

# **第7章 概念普及：理解AI是怎么干活的**

## **一、什么是LLM**

![result_00 (1).png](https://gh-proxy.com/https://raw.githubusercontent.com/wangxiaoshuai1998/QwenWorkGuide/002f698a68b69d3635acf6be0d6e27db69069071/README.md).png)

## **二、Token与Tokenizer**

![result_00 (2).png](https://gh-proxy.com/https://raw.githubusercontent.com/wangxiaoshuai1998/QwenWorkGuide/002f698a68b69d3635acf6be0d6e27db69069071/README.md).png)

## **三、Prompt与Prompt工程**

![result_00 (3).png](https://gh-proxy.com/https://raw.githubusercontent.com/wangxiaoshuai1998/QwenWorkGuide/002f698a68b69d3635acf6be0d6e27db69069071/README.md).png)

## **四、知识库、RAG、记忆/意识**

![result_00 (8).png](https://gh-proxy.com/https://raw.githubusercontent.com/wangxiaoshuai1998/QwenWorkGuide/002f698a68b69d3635acf6be0d6e27db69069071/README.md).png)

## **五、Agent、MCP、SKill**

![result_00 (5).png](https://gh-proxy.com/https://raw.githubusercontent.com/wangxiaoshuai1998/QwenWorkGuide/002f698a68b69d3635acf6be0d6e27db69069071/README.md).png)

## **六、API与CLI**

![result_00 (7).png](https://gh-proxy.com/https://raw.githubusercontent.com/wangxiaoshuai1998/QwenWorkGuide/002f698a68b69d3635acf6be0d6e27db69069071/README.md).png)

## **七、Harness架构是怎么工作的？**

![result_00 (9).png](https://gh-proxy.com/https://raw.githubusercontent.com/wangxiaoshuai1998/QwenWorkGuide/002f698a68b69d3635acf6be0d6e27db69069071/README.md).png)

## **八、一张图讲解清楚Agent是怎么工作的**

![result_00 (6).png](https://gh-proxy.com/https://raw.githubusercontent.com/wangxiaoshuai1998/QwenWorkGuide/002f698a68b69d3635acf6be0d6e27db69069071/README.md).png)

## **🎨 ✏️ 一句话总结**

AI的本质是一个"**预测下一个词**"的引擎（LLM），通过最小单元（**Token**）处理信息，在有限的记忆空间（**Context**）里，根据你的指令（**Prompt/Harness**），借助外部能力（**Tool/MCP**），自主完成任务（Agent/Skill）。

## **用一张表总结一下**

| 概念 | 一句话定义 | 生活类比 |
|------|---------------|------------|
| LLM | AI的核心引擎 | 大脑——负责思考和生成 |
| Token | 数据处理的最小单元 | 乐高积木的最小颗粒 |
| Context | 大模型的临时记忆 | RAM内存——关机就清空 |
| Prompt | 给大模型的指令 | 领导交给你的任务书 |
| Harness | Prompt的进化版，AI的完整工作手册 | SOP手册体系——定义整套工作模式 |
| Tool | 感知外部世界的函数 | 手机上的APP——大脑没有的功能靠它补 |
| MCP | 统一的工具接入标准 | Type-C接口——统一标准，一次开发全平台通用 |
| Agent | 自主规划\+调用工具的系统 | 私人助理——你说需求，他自己规划步骤去执行 |
| Agent Skill | Agent的说明书 | SOP操作手册——不用每次都教，写好它自己看 |
