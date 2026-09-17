---
title: "百度AI Infra提前批一面面经"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/.claude/skills/scrape-nowcoder/nowcoder-agent-excellent-full/2026-08-13-百度AI-Infra提前批一面面经.md"
sourceRel: ".claude/skills/scrape-nowcoder/nowcoder-agent-excellent-full/2026-08-13-百度AI-Infra提前批一面面经.md"
rawUrl: "/raw/08-agents/zero2agent/.claude/skills/scrape-nowcoder/nowcoder-agent-excellent-full/2026-08-13-百度AI-Infra提前批一面面经.md"
sourceSha256: "5de12a23a8ce2f0115d350138f88fc0d6ffc7c3804e1a6a0f90452e89c2a1de6"
pageSha256: "5de12a23a8ce2f0115d350138f88fc0d6ffc7c3804e1a6a0f90452e89c2a1de6"
contentMode: "local-full"
zh: ""
---

# 百度AI Infra提前批一面面经

> 发布日期：2026-08-13
> 来源：https://www.nowcoder.com/feed/main/detail/09c161adbf1f459f8e2799d908321420

归档说明：保留原帖完整面试流程，并保持原有顺序；已移除账号、学校、作者所在地、个人结果、互动区和相关推荐，未补充答案或改写问题。

---

昨天面的，下面是面试问题：

1.简单介绍一下自己的背景和经历。

2.Transformer整体架构是怎样的？其中Attention模块主要解决什么问题？

3.Attention计算过程中Q、K、V分别代表什么？如果只保留QK或者KV矩阵，是否可行？为什么？

4.Transformer中的FFN模块作用是什么？常见激活函数有哪些？不同激活函数有什么区别？

5.在Transformer模型中，Attention和FFN哪个部分参数量通常更大？为什么？

6.了解投机解码（Speculative Decoding）吗？它的基本原理是什么？

7.了解DFlash相关技术吗？它主要解决什么问题？

8.DeepSeek系列模型中是如何处理Token之间关系的？相关机制有什么特点？

9.MTP（Multi-Token Prediction）是否属于并行预测Token？它如何在保持自回归生成的情况下提升效率？

10.DeepSeek中的半自回归生成机制是如何理解的？相比传统自回归有什么区别？

11.是否阅读过DeepSeek相关论文？如果看过，能介绍一下核心思想吗？

12.什么是PD分离（Prefill和Decode分离）？为什么大模型推理系统需要进行PD分离？

13.在实际部署中，如何调整Prefill和Decode资源比例？比例设置会受到哪些因素影响？

14.大模型推理过程中，除了降低PP（Pipeline Parallel）延迟，还有哪些优化方向？

15.是否做过算子融合相关优化？算子融合为什么能够提升推理性能？

16.了解GQA、MLA、Hybrid架构吗？分别有什么作用？

17.Mamba中的状态（State）机制是什么？它保存的信息是否可逆？

18.是否了解SSM相关的Replay机制？它主要解决什么问题？

19.大模型推理优化相关工作是否有实践经验？比如模型部署、性能调优等。

20.模型部署完成后，通常还需要哪些上线流程？

21.NPU和GPU的本质区别是什么？可以从硬件架构和编程模型两个角度分析。

22.什么是Paged Attention？它主要解决大模型推理中的什么问题？

23.操作系统中，MP和read有什么区别？

24.进程之间有哪些常见通信方式？

25.算法题：给定一个数组，求最长无重复元素子数组长度。
