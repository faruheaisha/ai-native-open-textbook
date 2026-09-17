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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/.claude/skills/classify-interview-questions/question-index.md"
sourceRel: ".claude/skills/classify-interview-questions/question-index.md"
rawUrl: "/raw/08-agents/zero2agent/.claude/skills/classify-interview-questions/question-index.md"
sourceSha256: "8c0501b7d449991c01fe556083296af4f2a174f68accc5bd27df904bb334a33d"
pageSha256: "92366f31d94782727590b7defdceccecea9ffa3bb51719ba4a62521bc8ebdc89"
contentMode: "local-full"
zh: ""
---

## 17-ai-infra（30题）

1. 如何用 Roofline 和算术强度指导 CUDA 算子优化？ — 美团/拼多多/小鹏/快手等 AI Infra 面经（新增）【[华为 - 大模型算法岗（AI Infra / 训练优化）](https://www.nowcoder.com/discuss/926272625410674688)追问：如何用 Roofline 模型判断带宽瓶颈 vs 计算瓶颈？】【[昆仑芯 0903 一面（ai 高性能开发）](https://www.nowcoder.com/feed/main/detail/65b9990e774a4331bb603f0cf1ca4a88)追问：介绍一下 Roofline 模型和算术强度。】【[0907 百度一面 （AI Infra）](https://www.nowcoder.com/feed/main/detail/91f5187146864de5878349a2ecf497ce)追问：大矩阵 GEMM 在 DCU 上如何切分和实现？】
2. KV Cache 占用如何计算，为什么不能只按请求数做容量规划？ — [抖音搜推 AI Infra 一面](https://www.nowcoder.com/feed/main/detail/e5f1a15d50414c86a0e64f2dbc13a02f)、[百度 AI Infra 一面](https://www.nowcoder.com/feed/main/detail/05c5fe23173245a4ab39b3dddf2b95bb)、[字节 App Infra Agent 一面](https://www.nowcoder.com/feed/main/detail/0bec32fbb3344ff98f16b97f47c7b857)、[字节社招一面](https://www.nowcoder.com/feed/main/detail/a385d6cc457d47c99c03cb8ea752ab89)【阿里 Agent Infra 一面题库追问：KV Cache 原理】【[华为 - 大模型算法岗（AI Infra / 训练优化）](https://www.nowcoder.com/discuss/926272625410674688)追问：Transformer 推理中 KV Cache 显存估算及 batch 增大瓶颈？】
3. 如何估算 All-Reduce/All-to-All 通信量并实现计算通信重叠？ — 阶跃星辰/快手/字节/爱奇艺等 AI Infra 面经（新增）【[华为 - 大模型算法岗（AI Infra / 训练优化）](https://www.nowcoder.com/discuss/926272625410674688)追问：如何优化分布式推理中的 AllReduce 通信？】【[阿里巴巴（阿里云）- Agent Infra](https://www.nowcoder.com/discuss/926273487512113152)追问：如何优化分布式 AllReduce 通信？；如何平衡多机多卡推理中的通信与计算？】
4. CUDA 的 Thread、Warp、Block、Grid 和 SM 如何映射？SIMT、同步与 Warp 分歧如何影响性能？ — 小马智行/OPPO/蔚来/沐曦 AI Infra 面经（新增）【[0907 百度一面 （AI Infra）](https://www.nowcoder.com/feed/main/detail/91f5187146864de5878349a2ecf497ce)追问：SIMT 的特点是什么？遇到分支时会发生什么？】
5. FlashAttention 为什么更快？Online Softmax、Tiling、重计算和不同版本分别解决什么瓶颈？ — 阿里国际/快手/美团等 AI Infra 面经（新增）【[华为 - 大模型算法岗（AI Infra / 训练优化）](https://www.nowcoder.com/discuss/926272625410674688)追问：FlashAttention 如何减少 HBM 访问？】【[阶跃星辰（Stepfun）- 大模型算法岗（Post-train）](https://www.nowcoder.com/discuss/926273007276814336)追问：FlashAttention 加速原理？】
6. 量化后为什么不一定更快？量化 Matmul、反量化、Prefill 和 Decode 的瓶颈如何判断？ — 美团/拼多多/混元/爱奇艺 AI Infra 面经（新增）【[昆仑芯 0903 一面（ai 高性能开发）](https://www.nowcoder.com/feed/main/detail/65b9990e774a4331bb603f0cf1ca4a88)追问：怎么判断一个算子是带宽瓶颈还是计算瓶颈？】
7. 如何从模型结构估算参数量、FLOPs、训练显存、推理访存与 MFU？ — 美团/混元/讯飞/字节等 AI Infra 面经（新增）
8. Prefill 与 Decode 的算子形态和瓶颈为何不同？ — 小马智行/阿里云/腾讯/爱奇艺 AI Infra 面经（新增）
9. MoE 的 Expert Parallel 如何做 Dispatch/Combine、负载均衡和通信优化？ — 阿里/美团/快手/字节等 AI Infra 面经（新增）
10. CPU、GPU 与 NPU 的体系结构和优化目标有什么差异？ — 蔚来/美团/讯飞/小鹏等 AI Infra 面经（新增）
11. FP8、NVFP4、INT8 与 W4A16 的数值格式、缩放粒度和硬件执行路径有何不同？ — 混元/讯飞/智谱/摩尔线程等 AI Infra 面经（新增）
12. GPU 内存层次如何使用？Pinned Memory、Shared Memory、Bank Conflict 与异步 H2D/D2H 分别解决什么问题？ — 阿里国际/阶跃星辰/快手等 AI Infra 面经（新增）
13. 流水线并行的 Bubble 从哪里来？1F1B、Zero-Bubble 与 DualPipe 如何调度？ — 快手/百度/美团 AI Infra 面经（新增）
14. CUDA、Triton、CUTE 与 MLIR 分别位于什么抽象层？ — 拼多多/小马智行/飞腾 AI Infra 面经（新增）
15. Stride、View/Contiguous 与 NHWC/NCHW 如何影响张量算子的正确性和性能？ — 字节/荣耀/OPPO AI Infra 面经（新增）
16. Attention 与 FFN 的计算量和参数量谁更大？ — 阿里云/百度 AI Infra 一面
17. 如何设计大模型在线推理服务？ — 百度/智象未来 AI Infra 一面
18. 模型版本升级如何做到可观测、可灰度、可回滚？ — 模型发布与稳定性高频题【[Momenta 大模型算法工程师一面](https://www.nowcoder.com/feed/main/detail/f7518c865e07491cb1518d288698813c)追问：离线效果更好为何仍保留旧模型】【[百度 - Agent 研发岗（架构方向）](https://www.nowcoder.com/discuss/926273622006665216)追问：模型能力下降时如何快速回滚与隔离？】
19. CUDA Graph 为什么能降低推理开销？为什么可能额外占显存，Prefill 与 Decode 哪个阶段更适合？ — 小马智行/爱奇艺 AI Infra 面经（新增）
20. vLLM/SGLang 的请求调度与 Continuous Batching 如何工作？请求被抢占后如何恢复？ — 阿里国际/爱奇艺等 AI Infra 面经（新增）
21. 投机采样中 Draft 与 Target 模型如何交互？什么时候会加速，什么时候反而变慢？ — AI Infra 小厂/爱奇艺面经（新增）
22. 大模型训练吞吐低时，如何用 MFU、Profiler、通信和流水线空泡定位瓶颈？ — 阶跃星辰/快手等 AI Infra 面经（新增）
23. PD 分离解决什么问题，Prefill 与 Decode 资源比例怎么定？ — 百度 AI Infra 一面
24. 分布式训练为什么容易失败，如何恢复？ — 摩尔线程 AI Infra 一面
25. AIOps 如何结合告警、Metrics、Logs、Trace 和服务拓扑完成证据驱动的 RCA，并安全执行自动处置？ — 阿里 Agent Infra 一面题库（新增）
26. SpMV 和 GEMM 的计算、访存特征有什么不同？优化方向如何选择？ — [沐曦 AI 工程师一面](https://www.nowcoder.com/feed/main/detail/af4c228ca96f4f05b415f816d36a718c)（新增）
27. AI Infra 和 Agent Infra 有什么区别？ — AI 平台边界高频题
28. 如果让你设计一个生产级 AI Infra 平台，你会怎么拆？ — AI 平台系统设计高频题
29. GPU 利用率很低，但请求延迟很高，怎么排查？ — [小鹏 AI Infra 一面题面线索](https://www.nowcoder.com/discuss/920776068619829248)（付费题库汇总线索，不计频次）
30. GPU 调度和普通 CPU 调度有什么不同？ — GPU Scheduler 高频题
