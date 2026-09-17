---
title: "Chapter 17b: Prompt Injection Defense — From Unicode Sanitization to Defense in Depth"
sourceId: "09-harness/harness-engineering-from-cc-to-ai-coding"
sourceTitle: "驾驭工程：从 Claude Code 源码到 AI 编码最佳实践"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding"
entryUrl: "https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding/blob/e40e0feec02b90e308ccbfc7a8911d64118ccca0/book-en/src/part5/ch17b.md"
sourceRel: "book-en/src/part5/ch17b.md"
rawUrl: "/raw/09-harness/harness-engineering-from-cc-to-ai-coding/book-en/src/part5/ch17b.md"
sourceSha256: "1f60956e36ce5cca6b33e28112601c6a72ab019a28e1a88eada9bb5896ffa172"
pageSha256: "1f60956e36ce5cca6b33e28112601c6a72ab019a28e1a88eada9bb5896ffa172"
contentMode: "local-full"
zh: ""
---

# Chapter 17b: Prompt Injection Defense — From Unicode Sanitization to Defense in Depth

> **Positioning**: This chapter analyzes how Claude Code defends against prompt injection attacks — the most unique security threat facing AI Agents. Prerequisites: Chapter 16 (Permission System), Chapter 17 (YOLO Classifier).
> Applicable scenario: You are building an AI Agent that receives external input (MCP tools, user files, network data) and need to understand how to prevent malicious input from hijacking Agent behavior.

## Why This Matters

Traditional web applications face SQL injection; AI Agents face prompt injection. But the danger levels are fundamentally different: SQL injection at most compromises a database, while prompt injection can cause an Agent to **execute arbitrary code**.

When an Agent can read and write files, run shell commands, and call external APIs, prompt injection is no longer "outputting incorrect text" — it's "the Agent being hijacked as the attacker's proxy." A carefully crafted MCP tool return value could cause the Agent to send sensitive file contents to an external server, or plant a backdoor in your codebase.

Claude Code's response to this isn't a single technique but a **Defense in Depth** system — seven layers, from character-level sanitization to architecture-level trust boundaries, each targeting different attack vectors. The design philosophy behind this system is: **no single layer is perfect, but with seven layers stacked together, an attacker must bypass all of them simultaneously to succeed**.

Chapter 16 analyzed the safety of "what commands the Agent executes" (output side), and Chapter 17 analyzed the authorization model of "who is allowed to do what." This chapter completes the final piece of the puzzle: **the trust model for "what the Agent is being fed as input."**

## Source Code Analysis

### 17b.1 A Real Vulnerability: HackerOne #3086545 and the Unicode Stealth Attack

The file comment in `sanitization.ts` directly references a real security report:

```typescript
// restored-src/src/utils/sanitization.ts:8-12
// The vulnerability was demonstrated in HackerOne report #3086545 targeting
// Claude Desktop's MCP implementation, where attackers could inject hidden
// instructions using Unicode Tag characters that would be executed by Claude
// but remain invisible to users.
```

The attack principle: The Unicode standard contains multiple character categories (Tag characters U+E0000-U+E007F, format control characters U+200B-U+200F, directionality characters U+202A-U+202E, etc.) that are completely invisible to the human eye but are processed by LLM tokenizers. Attackers can embed malicious instructions encoded in these invisible characters within MCP tool return values — what users see in the terminal is normal text, but what the model "sees" are hidden control instructions.

This vulnerability is particularly dangerous because MCP is Claude Code's largest **external data entry point**. Every MCP server a user connects to could potentially return tool results containing hidden characters, and users cannot detect this content through visual inspection.

Reference: https://embracethered.com/blog/posts/2024/hiding-and-finding-text-with-unicode-tags/

### 17b.2 First Line of Defense: Unicode Sanitization

`sanitization.ts` is the most explicit anti-injection module in Claude Code — 92 lines of code implementing a triple defense:

```typescript
// restored-src/src/utils/sanitization.ts:25-65
export function partiallySanitizeUnicode(prompt: string): string {
  let current = prompt
  let previous = ''
  let iterations = 0
  const MAX_ITERATIONS = 10

  while (current !== previous && iterations < MAX_ITERATIONS) {
    previous = current

    // Layer 1: NFKC normalization
    current = current.normalize('NFKC')

    // Layer 2: Unicode property class removal
    current = current.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu, '')

    // Layer 3: Explicit character ranges (fallback for environments without \p{} support)
    current = current
      .replace(/[\u200B-\u200F]/g, '')  // Zero-width spaces, LTR/RTL marks
      .replace(/[\u202A-\u202E]/g, '')  // Directional formatting characters
      .replace(/[\u2066-\u2069]/g, '')  // Directional isolates
      .replace(/[\uFEFF]/g, '')          // Byte order mark
      .replace(/[\uE000-\uF8FF]/g, '')  // BMP Private Use Area

    iterations++
  }
  // ...
}
```

**Why is a triple defense necessary?**

The first layer (NFKC normalization) handles "combining characters" — certain Unicode sequences can produce new characters through combination. NFKC normalizes them to equivalent single characters, preventing bypass of subsequent character class checks through combining sequences.

The second layer (Unicode property classes) is the primary defense. `\p\{Cf\}` (format control, e.g., zero-width joiners), `\p\{Co\}` (Private Use Area), `\p\{Cn\}` (unassigned code points) — these three categories cover the vast majority of invisible characters. The source code comment notes this is "a scheme widely used in open-source libraries."

The third layer (explicit character ranges) is a compatibility fallback. Some JavaScript runtimes don't fully support `\p\{\}` Unicode property classes, so explicitly listing specific ranges ensures effectiveness in those environments.

**Why is iterative sanitization needed?**

```typescript
while (current !== previous && iterations < MAX_ITERATIONS) {
```

A single pass may not be sufficient. NFKC normalization might convert certain character sequences into new dangerous characters — for example, a combining sequence that becomes a format control character after normalization. The loop iterates until the output stabilizes (`current === previous`), with a maximum of 10 rounds. The `MAX_ITERATIONS` safety cap prevents infinite loops caused by maliciously crafted deeply-nested Unicode strings.

**Recursive sanitization of nested structures:**

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

Note `recursivelySanitizeUnicode(key)` — it sanitizes not just values but also **key names**. Attackers could embed invisible characters in JSON key names; sanitizing only values would miss this vector.

**Call sites reveal trust boundaries:**

| Call Site | Sanitization Target | Trust Boundary |
|-----------|-------------------|----------------|
| `mcp/client.ts:1758` | MCP tool list | External MCP server -> CC internals |
| `mcp/client.ts:2051` | MCP prompt templates | External MCP server -> CC internals |
| `parseDeepLink.ts:141` | `claude://` deep link queries | External application -> CC internals |
| `tag.tsx:82` | Tag names | User input -> internal storage |

All calls occur at **trust boundaries** — entry points where external data enters the internal system. Data passing between CC internal components does not undergo Unicode sanitization, because once data passes through entry sanitization, internal propagation paths are trusted.

### 17b.3 Structural Defense: XML Escaping and Source Tags
