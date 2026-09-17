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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-engineering-pitfalls.md"
sourceRel: "publish-pdf/staging/07-engineering-pitfalls.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/07-engineering-pitfalls.md"
sourceSha256: "7be5d79d7f9b134845ed49bebe8aa81acea85d81cc9c8aa99f6133ad085da81e"
pageSha256: "c6154200d1d9df2cec88e24e9a179c037b1f43b0cf00dba4622268cabaaff914"
contentMode: "local-full"
zh: ""
---

## Q：Claude Code 用久了感觉响应越来越慢，这是什么原因？怎么解决？

> 来源：字节TikTok AI应用开发一面

**新手答**：”上下文太长了，清空一下就好。”

**高手答**：
“用久了变慢”是上下文膨胀的典型症状，但根因不只是”上下文长”，还有几个容易被忽视的层次：

**根因分析**：

1. **上下文窗口累积**：每轮对话都把完整历史附加进去，随着对话轮数增加，每次 API 调用的 token 数线性增长，推理时间也随之增长（注意力机制是 O(n^2)）
2. **工具调用结果堆积**：Claude Code 每次读文件、运行命令的输出都会附在上下文里，长任务后上下文中可能有几十次工具调用的完整结果
3. **Prompt Cache Miss**：Anthropic 的 Prompt Caching 对 system prompt 前缀做缓存，但如果每轮消息的前缀都在变化（比如动态插入时间戳），缓存命中率下降，实际计费 token 增多
4. **并发请求排队**：高负载时段 API 端侧本身有排队延迟，跟本地上下文无关

**解决方案**：

1. **主动 `/clear` 或分段任务**：长任务拆成多个独立 session，每个 session 只传必要上下文
2. **利用 `CLAUDE.md` 做持久化**：把跨 session 的关键约束、项目背景写入 `CLAUDE.md`，而不是每次在对话里重复说明——这样可以利用 system prompt 前缀缓存
3. **精简工具调用输出**：对大文件读取结果做截断，只保留关键段落，避免整个文件内容堆在上下文里
4. **区分模型**：快速的迭代性任务（改一行代码、解释报错）用 Haiku/Sonnet，复杂规划任务才用 Opus——响应速度差异在 3-10x
5. **本地缓存复用**：重复查询相同文件的场景，可以在 session 开头一次性读取并引用，避免多次触发工具调用

**差距在哪**：面试官考的不只是”怎么解决变慢”，而是你对 Claude Code 运行机制的理解——上下文管理、Prompt Caching、工具调用成本。高手会把”变慢”拆解成几个独立的根因，而不是只给一个”清空上下文”的答案。
