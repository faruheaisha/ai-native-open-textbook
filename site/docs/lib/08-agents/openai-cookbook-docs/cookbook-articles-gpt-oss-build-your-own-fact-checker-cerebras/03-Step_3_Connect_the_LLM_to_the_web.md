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
pageSha256: "dee496907e0faf8b7e0a3501c70746aaf3eb580e930ca55877a1d53d12b82d3c"
contentMode: "local-full"
zh: ""
---

### **Step 3: Connect the LLM to the web**

To fact-check a claim, the model needs to find evidence online, and this step builds the function that connects the LLM to the web.

Notice a few fields:

- `objective` field: Bold text Natural language intent rather than keywords.

- `one-shot` mode: For simplicity and speed, this guide stick to a one-shot setup, which gives high-quality excerpts in a single call.

```python
def search_web(query: str, num: int = 5, mode: str = "one-shot"):
    """
    Search the web using Parallel's Search API.

    Returns a list of dicts with:
      - url
      - title
      - publish_date
      - excerpts (list of strings)
    """

    # Instruct the LLM find quality sources.
    objective = (
        f"Find high-quality, up-to-date sources that answer the question:\n\n{query}\n\n"
        "Prefer authoritative sites (e.g., .gov, .edu, major news, or official org websites)."
    )

    # Initiatiate the LLM for web search
    search = parallel_client.beta.search(
        objective=objective,
        search_queries=[query],
        mode=mode,
        max_results=num,
        excerpts={
            "max_chars_per_result": 8000,
        },
    )

    results = []
    # Process the search results and extract information like URL, title, and excerpts.
    for r in search.results:
        results.append(
            {
                "url": r.url,
                "title": getattr(r, "title", None),
                "publish_date": getattr(r, "publish_date", None),
                "excerpts": list(r.excerpts or []),
            }
        )
    return results
```
