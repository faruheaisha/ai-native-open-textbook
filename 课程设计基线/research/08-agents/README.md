# 卷 08 研究工作区：AI Agents & Agentic Workflows

状态：首章证据样板已建立；上游课程快照与迁移映射已建立  
最后核验：2026-09-10

本目录不是卷 08 正文，而是正文之前的证据层。首个试点章节选择“AI 智能体导论”，用于检验多源课程能否经过来源核验、分歧保留和编辑综合，稳定地产出可教、可测、可维护的章节。

## 当前产物

- [CEP-08-01-AI智能体导论.md](./CEP-08-01-AI智能体导论.md)：完整 Chapter Evidence Packet。
- [卷08-Knowledge-Matrix.md](./卷08-Knowledge-Matrix.md)：全卷能力结果、概念、章节、来源、框架、案例与跨卷边界。
- [卷08-章节证据包队列.md](./卷08-章节证据包队列.md)：其余章节、Source Record 和 Case Asset Pack 的研究顺序。
- [主张-证据账本.md](./主张-证据账本.md)：正文主张的证据、强度、限制和处理状态。
 - [上游课程迁移映射.md](./上游课程迁移映射.md)：四门上游课程的单元到章节映射、复用模式、许可红线与自建缺口。
- [sources](./sources/)：首章课程与官方来源、五篇关键研究论文（ReAct、Reflexion、AgentBench、tau-bench、MRKL），以及四门上游开放课程（HF、Hello-Agents、Microsoft、Anthropic），共十二份 Source Record。
- [cases/CASE-08-01-CALENDAR.md](./cases/CASE-08-01-CALENDAR.md)：活动选择与日历写入的设计级 Case Asset Pack。

## 本轮已经回答的问题

- Agent 与 LLM、Workflow、Automation、Agentic System 的关系。
- 多个高质量来源的共同部分与定义分歧。
- 首章应该教什么、如何验证学习、哪些内容不应过早展开。
- 哪些资料可以改编，哪些只能链接、短引和转述。

## 尚未进入正文的原因

目前已完成“可写作”的证据门槛，并建立了设计级 Case Asset Pack；但还没有完成“可发布”的案例门槛。下一步要把合成工具、确定性 Workflow baseline 与可注入模型的 Agent runner 真正跑起来，将预期轨迹替换为原始运行 trace，并把案例从 EVL-1 升到 EVL-5。
