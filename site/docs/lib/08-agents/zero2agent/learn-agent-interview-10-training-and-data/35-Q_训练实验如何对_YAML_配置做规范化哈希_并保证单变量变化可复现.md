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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/10-training-and-data/index.md"
sourceRel: "learn-agent-interview/10-training-and-data/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/10-training-and-data/index.md"
sourceSha256: "60b85a3adcd582f7bde8a1650b86f319915c75ffe2c989d6ec17686177cb35ee"
pageSha256: "b3d5c28943c78e0c61ea14cdb46f7adee99f9d78015b186e48fc6ebb97771794"
contentMode: "local-full"
zh: ""
---

## Q：训练实验如何对 YAML 配置做规范化哈希，并保证单变量变化可复现？

> 来源：[大方云图研发实习一面](https://www.nowcoder.com/feed/main/detail/a9a40feb4e1e4d0ca7c3f8c3ba67d487)（2026-08-24）

**新手答**：“对 YAML 文件做 SHA-256；每次只改一个字段并保存 Git commit。”

**高手答**：

不能直接哈希原始文本：键顺序、注释、空白、`1` 与 `1.0`、环境变量和默认值都可能造成假差异或漏差异。正确流程是先用安全解析器读成 typed object，展开继承与默认值，解析环境变量和路径，按 Schema 规范化类型与单位，递归排序 key，再用稳定序列化生成 canonical bytes 并计算 SHA-256。运行时间、输出目录等非语义字段应明确排除，但排除清单也要版本化。

实验身份不能只有配置哈希，还应绑定代码 commit 与 dirty diff、数据集清单/切分哈希、容器或依赖 lock、基座权重与 Tokenizer 摘要、随机种子和硬件/算子确定性设置。启动器输出一份不可变的 resolved config，训练日志、checkpoint 和指标都记录同一 experiment ID。

“单变量”由机器校验：基准实验与候选实验对规范化对象做结构化 diff，除声明的实验因子外必须零差异；多 seed 重复并报告均值和方差。复跑时从 resolved config 重建环境，并校验所有摘要。即便如此，GPU 非确定性算子仍可能导致细微差异，因此要声明可复现等级：位级一致、指标容差一致，或仅统计结论一致。

**差距在哪**：新手哈希文件字节，高手哈希解析后的实验语义，并把配置、代码、数据、环境和随机性一起纳入可追溯实验身份。
