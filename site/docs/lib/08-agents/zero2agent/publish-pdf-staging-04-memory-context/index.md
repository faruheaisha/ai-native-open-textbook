---
title: "记忆与上下文：长对话不丢信息的实战方案"
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
pageSha256: "938c5badaa9c0ed8d9c5104c6f4c25b278f166e7cadaebb88f49138805f5789d"
contentMode: "local-full"
zh: ""
---

# 记忆与上下文：长对话不丢信息的实战方案

记忆和上下文管理是 Agent 面试中“看起来简单但很容易答浅”的维度。面试官不想听你说“用向量数据库”——他想知道的是**存什么、怎么查、怎么融合**，以及面对模糊输入时 Agent 怎么利用记忆给出好体验。

---

## 本篇目录

- [上下文管理基础](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-上下文管理基础.md)
- [记忆架构与优先级](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-记忆架构与优先级.md)
- [记忆系统工程](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-记忆系统工程.md)
- [记忆检索与维护](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/04-记忆检索与维护.md)
- [上下文工程进阶](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-上下文工程进阶.md)
- [会话记忆与前沿](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-会话记忆与前沿.md)
- [Q：压缩过程中会丢失工具调用历史，导致模型重复调用工具，怎么解决？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-Q_压缩过程中会丢失工具调用历史_导致模型重复调用工具_怎么解决.md)
- [Q：记忆冲突怎么解决？比如用户前后说了不同的过敏信息](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-Q_记忆冲突怎么解决_比如用户前后说了不同的过敏信息.md)
- [Q：短期记忆压缩后，过了很长时间又需要当时完整信息怎么办？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-Q_短期记忆压缩后_过了很长时间又需要当时完整信息怎么办.md)
- [Prompt 长度 vs 内容对决策的影响](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-Prompt_长度_vs_内容对决策的影响.md)
- [Q：已进行 10 轮并做了总结，第 11 轮开始时，总结怎么处理？是重算前 11 轮还是叠加？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/11-Q_已进行_10_轮并做了总结_第_11_轮开始时_总结怎么处理_是重算前_11.md)
- [Q：前 10 轮都变成了总结，之前的原始上下文就不需要了吗？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/12-Q_前_10_轮都变成了总结_之前的原始上下文就不需要了吗.md)
- [Q：当用户对话零碎、跨轮次且意图发生跳跃时，如何结合上下文准确判断当前意图？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/13-Q_当用户对话零碎_跨轮次且意图发生跳跃时_如何结合上下文准确判断当前意图.md)
- [Q：session 里的临时文件存主服务还是 skill 进程服务，要不要删，什么时候删？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/14-Q_session_里的临时文件存主服务还是_skill_进程服务_要不要删_什.md)
- [Q：Agent 做上下文压缩后，如何验证没有破坏当前任务？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/15-Q_Agent_做上下文压缩后_如何验证没有破坏当前任务.md)
- [Q：大体积工具结果落盘后，为什么还要返回预览？预览内容应该如何选择？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/16-Q_大体积工具结果落盘后_为什么还要返回预览_预览内容应该如何选择.md)
- [Q：跨会话记忆如何从对话中提取？哪些信息值得写入长期记忆？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/17-Q_跨会话记忆如何从对话中提取_哪些信息值得写入长期记忆.md)
- [Q：如何用 Prompt 提取用户风格偏好？风格偏好应包含哪些内容？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/18-Q_如何用_Prompt_提取用户风格偏好_风格偏好应包含哪些内容.md)
- [Q：大模型生成会话摘要时，如何避免摘要内容污染用户偏好？新结论推翻旧结论时怎么保留？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/19-Q_大模型生成会话摘要时_如何避免摘要内容污染用户偏好_新结论推翻旧结论时怎么保.md)
- [Q：金融 Agent 执行股价提醒等定时任务时，应该携带哪些历史上下文？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/20-Q_金融_Agent_执行股价提醒等定时任务时_应该携带哪些历史上下文.md)
- [Q：上下文预算不足时，如何按任务依赖压缩，而不是按时间删除旧消息？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/21-Q_上下文预算不足时_如何按任务依赖压缩_而不是按时间删除旧消息.md)
- [Q：云端 Coding Agent 的容器迁移或重启时，如何恢复会话上下文、工作区和进行中的任务？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/22-Q_云端_Coding_Agent_的容器迁移或重启时_如何恢复会话上下文_工作.md)
- [Q：按大纲分章节生成长文时，如何维持跨章节连续性与事实一致性？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/23-Q_按大纲分章节生成长文时_如何维持跨章节连续性与事实一致性.md)
- [这类题的答题模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/24-这类题的答题模式.md)
