---
title: "Prompt 工程与框架原理：模板构建、Skills 机制"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-prompt-engineering.md"
sourceRel: "publish-pdf/staging/08-prompt-engineering.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/08-prompt-engineering.md"
sourceSha256: "d712b57348415001dc95647a70207bec02aaff7ce2fa002468a87ac72874651a"
pageSha256: "8ab7a1ef78b8425cee4d44c11d0fe32cbaf4bf48197151144ed5cce5cb8bc650"
contentMode: "local-full"
zh: ""
---

# Prompt 工程与框架原理：模板构建、Skills 机制

Prompt 工程不是“写提示词”，是一个**分层组装系统**。面试官问这个方向时，考的是你能不能把 Prompt 从“拼字符串”做成“模板工程”，以及你对 Agent 框架内部机制的理解深度。

---

## 本篇目录

- [Prompt 模板方法](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-Prompt_模板方法.md)
- [Skill 与框架原理](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/02-Skill_与框架原理.md)
- [Prompt 标准与 Skill 体系](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-Prompt_标准与_Skill_体系.md)
- [Prompt 结构化设计](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/04-Prompt_结构化设计.md)
- [Q：用户的某个需求，你会沉淀为 Skill 还是长期记忆？判断标准是什么？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-Q_用户的某个需求_你会沉淀为_Skill_还是长期记忆_判断标准是什么.md)
- [Q：DSPy 是什么？它在 Agent 提示词优化和流程构建上有什么优势？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/06-Q_DSPy_是什么_它在_Agent_提示词优化和流程构建上有什么优势.md)
- [Q：团队里的 Skill 数量持续膨胀，如何治理重复能力、路由冲突和上下文占用？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-Q_团队里的_Skill_数量持续膨胀_如何治理重复能力_路由冲突和上下文占用.md)
- [Q：OpenSpec/Spec 驱动开发与普通开发流程有什么区别？如何治理 Spec 过期？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-Q_OpenSpec_Spec_驱动开发与普通开发流程有什么区别_如何治理_Sp.md)
- [Q：Skill 分层体系怎么设计？为什么这么分层？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-Q_Skill_分层体系怎么设计_为什么这么分层.md)
- [Q：动态 Prompt 和静态 Prompt 有什么区别？各自在什么场景下用？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-Q_动态_Prompt_和静态_Prompt_有什么区别_各自在什么场景下用.md)
- [Q：如果让你设计一个代码审查的 Skill，你会如何设计？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/11-Q_如果让你设计一个代码审查的_Skill_你会如何设计.md)
- [Q：如果 Agent 挂 100 个 Skill，如何提升召回率、准确度、F1 综合值？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/12-Q_如果_Agent_挂_100_个_Skill_如何提升召回率_准确度_F1_.md)
- [Q：如何给 Agent 工具系统设计动态 Skill，而不让版本升级破坏历史任务？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/13-Q_如何给_Agent_工具系统设计动态_Skill_而不让版本升级破坏历史任务.md)
- [Q：Skill 和 Agent 的关系，为什么不用 Skill 而用子 Agent？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/14-Q_Skill_和_Agent_的关系_为什么不用_Skill_而用子_Agen.md)
- [Q：Skill 的 Prompt 配置上线后出错，如何快速止损和修复？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/15-Q_Skill_的_Prompt_配置上线后出错_如何快速止损和修复.md)
- [Q：为什么 Coding Agent 的 Skills 通常放在 System 上下文，而不是用户 Query 中？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/16-Q_为什么_Coding_Agent_的_Skills_通常放在_System_.md)
- [Q：如何让 Agent 自动沉淀 Skill，同时保证生成的 Skill 准确、无害且不会无限膨胀？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/17-Q_如何让_Agent_自动沉淀_Skill_同时保证生成的_Skill_准确_.md)
- [Q：为什么一个很短的 Skill 也可能有效？如何验证效果来自哪里？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/18-Q_为什么一个很短的_Skill_也可能有效_如何验证效果来自哪里.md)
- [Q：可演进能力为什么应封装为 Skill，而不是不断塞进 Prompt？Skill 的知识进化流水线如何治理？](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/19-Q_可演进能力为什么应封装为_Skill_而不是不断塞进_Prompt_Skil.md)
- [这类题的答题模式](https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/20-这类题的答题模式.md)
