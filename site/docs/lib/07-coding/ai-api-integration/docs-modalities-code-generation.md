---
title: "代码生成 / 编程类模型"
sourceId: "07-coding/ai-api-integration"
sourceTitle: "AI API 接入实战（OpenAI 兼容协议）"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/CCCpan/ai-api-integration"
entryUrl: "https://github.com/CCCpan/ai-api-integration/blob/95cd8c6f48e58dfe96703a37b6c8fccb583bea74/README.md"
zh: ""
---

# 代码生成 / 编程类模型

> 专精代码生成、补全、重构的大模型——GPT-5-Codex、Claude Code、Codex 5.3。

## 模型清单

| 模型 ID | 厂商 | 强项 |
|---------|------|------|
| `claude-opus-4-7` | Anthropic | 大型重构、多文件理解 |
| `claude-sonnet-4-6` | Anthropic | 平衡型编程 |
| `gpt-5-codex` | OpenAI | 算法、数据结构 |
| `codex-5.3` | OpenAI | 速度优化 |
| `deepseek-coder-v3` | DeepSeek | 中文注释、性价比 |

## 适用场景

| 场景 | 推荐模型 |
|------|---------|
| 大型重构 / 多文件改动 | `claude-opus-4-7` |
| 单函数实现 | `claude-sonnet-4-6` 或 `gpt-5-codex` |
| 算法题、Leetcode | `gpt-5-codex` 或 `o3-pro` |
| Tab 补全（要求快） | `gpt-5-mini` 或 `claude-haiku-4-5` |
| 注释 / 文档生成 | `deepseek-coder-v3` |

## 调用示例

```python
from openai import OpenAI

client = OpenAI(api_key="sk-xxx", base_url="http://xdhdancer.top/v1")

resp = client.chat.completions.create(
    model="claude-opus-4-7",
    messages=[
        {"role": "system", "content": "You are an expert Python developer. Output only code, no explanations."},
        {"role": "user", "content": "Write a function that finds the longest palindromic substring."},
    ],
    temperature=0.1,   # 代码任务建议温度低
)
print(resp.choices[0].message.content)
```

## 配合编程工具

- 在 [Cursor](/lib/07-coding/ai-api-integration/docs-tools-cursor-setup) / [Cline](/lib/07-coding/ai-api-integration/docs-tools-cline-setup) / [Continue](/lib/07-coding/ai-api-integration/docs-tools-continue-setup) 里直接配置这些模型 ID
- [Claude Code CLI](/lib/07-coding/ai-api-integration/docs-tools-claude-code-setup) 用 `--model claude-opus-4-7`
