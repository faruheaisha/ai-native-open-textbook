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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/04-memory-context/index.md"
sourceRel: "learn-agent-interview/04-memory-context/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/04-memory-context/index.md"
sourceSha256: "a4b675e45f2a978a8587cbf3322b6bf968fb5dc972a390f232490f9b0ce03666"
pageSha256: "de171e31e84bcc28c1f45c1d242235e4171f08e4eace1438c87988056dc23bf3"
contentMode: "local-full"
zh: ""
---

## Q：云端 Coding Agent 的容器迁移或重启时，如何恢复会话上下文、工作区和进行中的任务？

> 来源：[腾讯 WXG 微信读书一面](https://www.nowcoder.com/feed/main/detail/3ffc762437274543b6a8f5e2ea6fb535)（2026-08-24）【[小米 - AI Agent 开发（三面综合）](https://www.nowcoder.com/discuss/925163737139429376)追问：如何设计 Agent 的状态持久化？容器重启后如何恢复会话？】【[拼多多 - AI Agent 开发（工程化 + 数据库方向）](https://www.nowcoder.com/discuss/925527160763187200)追问：长流程任务的“断点恢复”能力你是怎么做的？服务重启后如何加载未完成状态？】【[字节跳动 - AI Agent 开发岗（工程方向）](https://www.nowcoder.com/discuss/926273296180547584)追问：如何设计断点续传，使服务重启后能够恢复任务？】【[阿里巴巴（阿里云）- Agent Infra](https://www.nowcoder.com/discuss/926273487512113152)追问：如何实现状态持久化，使容器重启后会话恢复？】

**新手答**：“把聊天记录和代码目录挂载到持久卷，容器启动后继续运行。”

**高手答**：不能把容器当状态源，也不能把“恢复”简化为重新加载聊天记录。需要把三类状态分开持久化：会话层保存目标、约束、计划和关键证据；工作区层保存基线 commit、已应用 patch、未跟踪文件清单和依赖锁；执行层保存步骤状态、工具调用幂等键、进程/测试结果和副作用记录。大文件进对象存储，元数据和事件日志进入外部控制面，容器本地盘只作为可丢弃缓存。

每个安全步骤结束后写 checkpoint，并用单调递增的事件序号或版本号把三类状态关联起来。迁移时先将旧实例置为 draining，停止领取新步骤，等待当前原子操作完成或标记为状态未知，再刷新工作区快照并释放租约。新实例通过 fencing token 获取唯一执行权，按“恢复工作区 → 校验版本与依赖 → 加载结构化任务状态 → 查询未知副作用终态 → 继续未完成步骤”的顺序恢复，避免两个容器同时执行。

恢复后必须校验仓库 HEAD、文件哈希、模型/Prompt/工具 schema 版本和密钥权限。对于写文件、提交代码、创建 PR 等操作，使用幂等键和结果查询；不能看到上次没有成功响应就盲目重放。无法安全续跑的 shell 进程应终止并从最近可验证节点重建，同时向用户说明丢失的瞬时状态。

**差距在哪**：新手只有“持久卷 + 聊天记录”。高手区分会话、工作区和执行状态，用 checkpoint、租约、fencing、幂等和恢复校验保证一致性。面试官考的是有状态 Agent 在无状态容器基础设施上如何做到可恢复且不重复产生副作用。
