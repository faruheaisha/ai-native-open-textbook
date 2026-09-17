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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/04-memory-context.md"
sourceRel: "publish-pdf/staging/04-memory-context.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/04-memory-context.md"
sourceSha256: "43858ca210726142490f09bdab387095f1a915a8149dd7f6cf17164ff2f7e735"
pageSha256: "3374767f7fe8d2bdeefb98f3b79b9f94148a31604c2bef379a238d3fa76cf962"
contentMode: "local-full"
zh: ""
---

## Q：云端 Coding Agent 的容器迁移或重启时，如何恢复会话上下文、工作区和进行中的任务？

> 来源：腾讯 WXG 微信读书一面（2026-08-24）

**新手答**：“把聊天记录和代码目录挂载到持久卷，容器启动后继续运行。”

**高手答**：不能把容器当状态源，也不能把“恢复”简化为重新加载聊天记录。需要把三类状态分开持久化：会话层保存目标、约束、计划和关键证据；工作区层保存基线 commit、已应用 patch、未跟踪文件清单和依赖锁；执行层保存步骤状态、工具调用幂等键、进程/测试结果和副作用记录。大文件进对象存储，元数据和事件日志进入外部控制面，容器本地盘只作为可丢弃缓存。

每个安全步骤结束后写 checkpoint，并用单调递增的事件序号或版本号把三类状态关联起来。迁移时先将旧实例置为 draining，停止领取新步骤，等待当前原子操作完成或标记为状态未知，再刷新工作区快照并释放租约。新实例通过 fencing token 获取唯一执行权，按“恢复工作区 → 校验版本与依赖 → 加载结构化任务状态 → 查询未知副作用终态 → 继续未完成步骤”的顺序恢复，避免两个容器同时执行。

恢复后必须校验仓库 HEAD、文件哈希、模型/Prompt/工具 schema 版本和密钥权限。对于写文件、提交代码、创建 PR 等操作，使用幂等键和结果查询；不能看到上次没有成功响应就盲目重放。无法安全续跑的 shell 进程应终止并从最近可验证节点重建，同时向用户说明丢失的瞬时状态。

**差距在哪**：新手只有“持久卷 + 聊天记录”。高手区分会话、工作区和执行状态，用 checkpoint、租约、fencing、幂等和恢复校验保证一致性。面试官考的是有状态 Agent 在无状态容器基础设施上如何做到可恢复且不重复产生副作用。
