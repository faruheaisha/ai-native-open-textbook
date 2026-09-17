---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/evals.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/evals.md"
sourceSha256: "8f940ae3c16748ec2321b258d8d2330f315132b3e34fb7b04a9a359d56c9590e"
pageSha256: "d500cd8dd8ec9621edfe38c48279626fe729b1b7c2a50bf9ce81799b78784867"
contentMode: "local-full"
zh: ""
---

### Example

```http
curl https://api.openai.com/v1/evals/eval_67abd54d9b0081909a86353f6fb9317a/runs/evalrun_67abd54d60ec8190832b46859da808f7/output_items/outputitem_67abd55eb6548190bb580745d5644a33 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json"
```

#### Response

```json
{
  "object": "eval.run.output_item",
  "id": "outputitem_67e5796c28e081909917bf79f6e6214d",
  "created_at": 1743092076,
  "run_id": "evalrun_67abd54d60ec8190832b46859da808f7",
  "eval_id": "eval_67abd54d9b0081909a86353f6fb9317a",
  "status": "pass",
  "datasource_item_id": 5,
  "datasource_item": {
    "input": "Stock Markets Rally After Positive Economic Data Released",
    "ground_truth": "Markets"
  },
  "results": [
    {
      "name": "String check-a2486074-d803-4445-b431-ad2262e85d47",
      "sample": null,
      "passed": true,
      "score": 1.0
    }
  ],
  "sample": {
    "input": [
      {
        "role": "developer",
        "content": "Categorize a given news headline into one of the following topics: Technology, Markets, World, Business, or Sports.\n\n# Steps\n\n1. Analyze the content of the news headline to understand its primary focus.\n2. Extract the subject matter, identifying any key indicators or keywords.\n3. Use the identified indicators to determine the most suitable category out of the five options: Technology, Markets, World, Business, or Sports.\n4. Ensure only one category is selected per headline.\n\n# Output Format\n\nRespond with the chosen category as a single word. For instance: \"Technology\", \"Markets\", \"World\", \"Business\", or \"Sports\".\n\n# Examples\n\n**Input**: \"Apple Unveils New iPhone Model, Featuring Advanced AI Features\"  \n**Output**: \"Technology\"\n\n**Input**: \"Global Stocks Mixed as Investors Await Central Bank Decisions\"  \n**Output**: \"Markets\"\n\n**Input**: \"War in Ukraine: Latest Updates on Negotiation Status\"  \n**Output**: \"World\"\n\n**Input**: \"Microsoft in Talks to Acquire Gaming Company for $2 Billion\"  \n**Output**: \"Business\"\n\n**Input**: \"Manchester United Secures Win in Premier League Football Match\"  \n**Output**: \"Sports\" \n\n# Notes\n\n- If the headline appears to fit into more than one category, choose the most dominant theme.\n- Keywords or phrases such as \"stocks\", \"company acquisition\", \"match\", or technological brands can be good indicators for classification.\n",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      },
      {
        "role": "user",
        "content": "Stock Markets Rally After Positive Economic Data Released",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      }
    ],
    "output": [
      {
        "role": "assistant",
        "content": "Markets",
        "tool_call_id": null,
        "tool_calls": null,
        "function_call": null
      }
    ],
    "finish_reason": "stop",
    "model": "gpt-6-astra",
    "usage": {
      "total_tokens": 325,
      "completion_tokens": 2,
      "prompt_tokens": 323,
      "cached_tokens": 0
    },
    "error": null,
    "temperature": 1.0,
    "max_completion_tokens": 2048,
    "top_p": 1.0,
    "seed": 42
  }
}
```

## Domain Types
