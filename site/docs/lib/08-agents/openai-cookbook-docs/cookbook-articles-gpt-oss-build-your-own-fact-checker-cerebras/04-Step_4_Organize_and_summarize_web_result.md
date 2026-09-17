---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/articles/gpt-oss/build-your-own-fact-checker-cerebras.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/articles/gpt-oss/build-your-own-fact-checker-cerebras.md"
sourceSha256: "c23ee72ef44cd43583465f3b05986ec7af53affda1156cc299c50330f84b3efc"
pageSha256: "fd51bde7efaf745a4e0e9494c41cce548f4fe01469d18023a30b735ae31dc38a"
contentMode: "local-full"
zh: ""
---

### **Step 4 – Organize and summarize web results**

After retrieving information from the web, organize it into a clean, readable format. This step takes the search results and compiles the key excerpts into a simple summary for evaluation.

```python
import textwrap
from typing import List, Dict, Any

def build_evidence_context(results: List[Dict[str, Any]], max_chars: int = 8000) -> str:

    blocks = []
    for idx, r in enumerate(results):
        excerpts_text = "\n\n".join(r["excerpts"][:2])
        block = textwrap.dedent(f"""
        [Source {idx+1}]
        Title: {r['title'] or r['url']}
        URL: {r['url']}
        Publish date: {r['publish_date']}

        Excerpts:
        {excerpts_text}
        """).strip()
        blocks.append(block)

    context = "\n\n".join(blocks)

    if len(context) > max_chars:
        context = context[:max_chars] + "\n\n[Context truncated for length]"
    return context
```
