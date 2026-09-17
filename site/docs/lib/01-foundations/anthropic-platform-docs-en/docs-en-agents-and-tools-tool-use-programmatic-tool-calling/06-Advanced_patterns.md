---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
sourceSha256: "5256f453318138b7eb03910688ec74c8df7cbe541509c6528bbd721e702f7df1"
pageSha256: "1aea1bdfc6d70261a2b91674696522992cb0b221dcb400aa6f9773d207f4f2c9"
contentMode: "local-full"
zh: ""
---

## Advanced patterns

### Batch processing with loops

Claude can write code that processes multiple items efficiently:

```python
regions = ["West", "East", "Central", "North", "South"]
results = {}
for region in regions:
    rows = json.loads(await query_database({"sql": f"<sql for {region}>"}))
    results[region] = sum(row["revenue"] for row in rows)

# Process results programmatically
top_region = max(results.items(), key=lambda x: x[1])
print(f"Top region: {top_region[0]} with ${top_region[1]:,} in revenue")
```

This pattern:

* Reduces model round-trips from N (one per region) to 1
* Processes large result sets programmatically before returning to Claude
* Saves tokens by only returning aggregated conclusions instead of raw data

### Early termination

Claude can stop processing as soon as success criteria are met:

```python
endpoints = ["us-east", "eu-west", "apac"]
for endpoint in endpoints:
    status = await check_health({"endpoint": endpoint})
    if status == "healthy":
        print(f"Found healthy endpoint: {endpoint}")
        break  # Stop early, don't check remaining
```

### Conditional tool selection

```python
path = "/tmp/example.txt"
file_info = json.loads(await get_file_info({"path": path}))
if file_info["size"] < 10000:
    content = await read_full_file({"path": path})
else:
    content = await read_file_summary({"path": path})
print(content)
```

### Data filtering

```python
server_id = "srv-01"
log_text = await fetch_logs({"server_id": server_id})
errors = [line for line in log_text.splitlines() if "ERROR" in line]
print(f"Found {len(errors)} errors")
for error in errors[-10:]:  # Only return last 10 errors
    print(error)
```
