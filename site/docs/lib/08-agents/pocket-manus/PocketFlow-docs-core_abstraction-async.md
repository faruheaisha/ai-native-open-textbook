---
title: "(Advanced) Async"
sourceId: "08-agents/pocket-manus"
sourceTitle: "Open Manus with PocketFlow Integration"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/Osly-AI/PocketManus"
entryUrl: "https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/docs/core_abstraction/async.md"
sourceRel: "PocketFlow/docs/core_abstraction/async.md"
rawUrl: "/raw/08-agents/pocket-manus/PocketFlow/docs/core_abstraction/async.md"
sourceSha256: "d4b34d6db3253e893e97ba5d3c34be2c790a227ba3f9fdcbe3775f4ea3d9f994"
pageSha256: "d4b34d6db3253e893e97ba5d3c34be2c790a227ba3f9fdcbe3775f4ea3d9f994"
contentMode: "local-full"
zh: ""
---

# (Advanced) Async

**Async** Nodes implement `prep_async()`, `exec_async()`, `exec_fallback_async()`, and/or `post_async()`. This is useful for:

1. **prep_async()**: For *fetching/reading data (files, APIs, DB)* in an I/O-friendly way.
2. **exec_async()**: Typically used for async LLM calls.
3. **post_async()**: For *awaiting user feedback*, *coordinating across multi-agents* or any additional async steps after `exec_async()`.

**Note**: `AsyncNode` must be wrapped in `AsyncFlow`. `AsyncFlow` can also include regular (sync) nodes.

### Example

```python
class SummarizeThenVerify(AsyncNode):
    async def prep_async(self, shared):
        # Example: read a file asynchronously
        doc_text = await read_file_async(shared["doc_path"])
        return doc_text

    async def exec_async(self, prep_res):
        # Example: async LLM call
        summary = await call_llm_async(f"Summarize: {prep_res}")
        return summary

    async def post_async(self, shared, prep_res, exec_res):
        # Example: wait for user feedback
        decision = await gather_user_feedback(exec_res)
        if decision == "approve":
            shared["summary"] = exec_res
            return "approve"
        return "deny"

summarize_node = SummarizeThenVerify()
final_node = Finalize()

# Define transitions
summarize_node - "approve" >> final_node
summarize_node - "deny"    >> summarize_node  # retry

flow = AsyncFlow(start=summarize_node)

async def main():
    shared = {"doc_path": "document.txt"}
    await flow.run_async(shared)
    print("Final Summary:", shared.get("summary"))

asyncio.run(main())
```
