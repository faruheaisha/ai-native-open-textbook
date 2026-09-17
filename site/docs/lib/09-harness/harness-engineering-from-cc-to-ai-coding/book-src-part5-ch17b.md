---
title: "第17b章：提示注入防御 — 从 Unicode 清洗到纵深防御"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book/src/part5/ch17b.md"
sourceRel: "book/src/part5/ch17b.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book/src/part5/ch17b.md"
sourceSha256: "0e9bf8553dc11a42766f37a43f5f12fd955174b5b48a73a19bcb68c9583a14d9"
pageSha256: "0e9bf8553dc11a42766f37a43f5f12fd955174b5b48a73a19bcb68c9583a14d9"
contentMode: "local-full"
zh: ""
---

# 第17b章：提示注入防御 — 从 Unicode 清洗到纵深防御

> **定位**：本章分析 Claude Code 如何防御提示注入（Prompt Injection）攻击——AI Agent 面临的最独特安全威胁。前置依赖：第 16 章（权限系统）、第 17 章（YOLO 分类器）。
> 适用场景：你在构建接收外部输入（MCP 工具、用户文件、网络数据）的 AI Agent，需要理解如何防止恶意输入劫持 Agent 行为。

## 为什么这很重要

传统 Web 应用面临 SQL 注入，AI Agent 面临提示注入。但两者的危险等级截然不同：SQL 注入最多破坏数据库，提示注入可以让 Agent **执行任意代码**。

当一个 Agent 能读写文件、运行 shell 命令、调用外部 API 时，提示注入不再是"输出了错误的文本"——它是"Agent 被劫持为攻击者的代理"。一条精心构造的 MCP 工具返回值，可能让 Agent 将敏感文件内容发送到外部服务器，或者在你的代码库中植入后门。

Claude Code 对此的应对不是单一技术，而是一套**纵深防御**（Defense in Depth）体系——七个层级，从字符级清洗到架构级信任边界，每一层针对不同的攻击向量。这套体系的设计哲学是：**没有任何一层是完美的，但七层叠加后，攻击者需要同时绕过所有层才能成功**。

第 16 章分析了"Agent 执行什么命令"的安全性（输出端），第 17 章分析了"谁被允许做什么"的授权模型。本章补全最后一块拼图：**"Agent 被输入了什么"的信任模型**。

## 源码分析

### 17b.1 真实漏洞：HackerOne #3086545 与 Unicode 隐形攻击

`sanitization.ts` 的文件注释直接引用了一个真实的安全报告：

```typescript
// restored-src/src/utils/sanitization.ts:8-12
// The vulnerability was demonstrated in HackerOne report #3086545 targeting
// Claude Desktop's MCP implementation, where attackers could inject hidden
// instructions using Unicode Tag characters that would be executed by Claude
// but remain invisible to users.
```

攻击原理：Unicode 标准中存在多个字符类别（Tag 字符 U+E0000-U+E007F、格式控制字符 U+200B-U+200F、方向性字符 U+202A-U+202E 等），这些字符对人眼完全不可见，但 LLM 的 tokenizer 会处理它们。攻击者可以在 MCP 工具的返回值中嵌入这些不可见字符编码的恶意指令——用户在终端中看到的是正常文本，但模型"看到"的是隐藏的控制指令。

这个漏洞之所以特别危险，是因为 MCP 是 Claude Code 最大的**外部数据入口**。用户连接的每一个 MCP 服务器都可能返回包含隐藏字符的工具结果，而用户无法通过肉眼审查发现这些内容。

参考资料：https://embracethered.com/blog/posts/2024/hiding-and-finding-text-with-unicode-tags/

### 17b.2 第一道防线：Unicode 清洗

`sanitization.ts` 是 Claude Code 中最显式的防注入模块，92 行代码实现了三重防御：

```typescript
// restored-src/src/utils/sanitization.ts:25-65
export function partiallySanitizeUnicode(prompt: string): string {
  let current = prompt
  let previous = ''
  let iterations = 0
  const MAX_ITERATIONS = 10

  while (current !== previous && iterations < MAX_ITERATIONS) {
    previous = current

    // 第一重：NFKC 规范化
    current = current.normalize('NFKC')

    // 第二重：Unicode 属性类移除
    current = current.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu, '')

    // 第三重：显式字符范围（兼容不支持 \p{} 的环境）
    current = current
      .replace(/[\u200B-\u200F]/g, '')  // 零宽空格、LTR/RTL 标记
      .replace(/[\u202A-\u202E]/g, '')  // 方向性格式化字符
      .replace(/[\u2066-\u2069]/g, '')  // 方向性隔离符
      .replace(/[\uFEFF]/g, '')          // 字节序标记
      .replace(/[\uE000-\uF8FF]/g, '')  // BMP 私用区

    iterations++
  }
  // ...
}
```

**为什么需要三重防御？**

第一重（NFKC 规范化）处理的是"组合字符"——某些 Unicode 序列可以通过组合产生新字符，NFKC 将它们规范化为等价的单一字符，防止通过组合序列绕过后续的字符类检查。

第二重（Unicode 属性类）是主防御。`\p\{Cf\}`（格式控制，如零宽连接符）、`\p\{Co\}`（私用区）、`\p\{Cn\}`（未分配码点）——这三个类别覆盖了绝大多数隐形字符。源码注释指出这是"广泛使用于开源库的方案"。

第三重（显式字符范围）是兼容性后备。某些 JavaScript 运行时不完整支持 `\p\{\}` Unicode 属性类，显式列出具体范围确保在这些环境中仍然有效。

**为什么需要迭代清洗？**

```typescript
while (current !== previous && iterations < MAX_ITERATIONS) {
```

一轮清洗可能不够。NFKC 规范化可能将某些字符序列转换为新的危险字符——例如，一个组合序列被规范化后变成了格式控制字符。迭代直到输出稳定（`current === previous`），最多 10 轮。`MAX_ITERATIONS` 的安全上限防止了恶意构造的深度嵌套 Unicode 字符串导致的无限循环。

**递归清洗嵌套结构：**

```typescript
// restored-src/src/utils/sanitization.ts:67-91
export function recursivelySanitizeUnicode(value: unknown): unknown {
  if (typeof value === 'string') {
    return partiallySanitizeUnicode(value)
  }
  if (Array.isArray(value)) {
    return value.map(recursivelySanitizeUnicode)
  }
  if (value !== null && typeof value === 'object') {
    const sanitized: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(value)) {
      sanitized[recursivelySanitizeUnicode(key)] =
        recursivelySanitizeUnicode(val)
    }
    return sanitized
  }
  return value
}
```

注意 `recursivelySanitizeUnicode(key)` ——不仅清洗值，还清洗**键名**。攻击者可能在 JSON 的键名中嵌入隐形字符，如果只清洗值就会遗漏这个向量。

**调用点揭示了信任边界：**

| 调用位置 | 清洗对象 | 信任边界 |
|---------|---------|---------|
| `mcp/client.ts:1758` | MCP 工具列表 | 外部 MCP 服务器 → CC 内部 |
| `mcp/client.ts:2051` | MCP 提示模板 | 外部 MCP 服务器 → CC 内部 |
| `parseDeepLink.ts:141` | `claude://` deep link 查询 | 外部应用 → CC 内部 |
| `tag.tsx:82` | 标签名称 | 用户输入 → 内部存储 |

所有调用都发生在**信任边界**上——外部数据进入内部系统的入口。CC 内部组件之间的数据传递不做 Unicode 清洗，因为一旦数据通过了入口清洗，内部传播路径是可信的。

### 17b.3 结构防御：XML 转义与来源标签
