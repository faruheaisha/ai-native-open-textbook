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
sourceRel: "api/reference/resources/responses/methods/create.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/responses/methods/create.md"
sourceSha256: "711abcd1b51022b909a6ab8d80506580cfd72a3beedb95d2fc57fc93465a8a52"
pageSha256: "eb1641e25bf62441cda7468929a8761f4b697a695490131f16066e6de5a435ae"
contentMode: "local-full"
zh: ""
---

#### Response

```json
{
  "id": "resp_686eef60237881a2bd1180bb8b13de430e34c516d176ff86",
  "object": "response",
  "created_at": 1752100704,
  "status": "completed",
  "completed_at": 1752100705,
  "background": false,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "max_output_tokens": null,
  "max_tool_calls": null,
  "model": "gpt-6-astra",
  "output": [
    {
      "id": "msg_686eef60d3e081a29283bdcbc4322fd90e34c516d176ff86",
      "type": "message",
      "status": "completed",
      "content": [
        {
          "type": "output_text",
          "annotations": [],
          "logprobs": [],
          "text": "The file seems to contain excerpts from a letter to the shareholders of Berkshire Hathaway Inc., likely written by Warren Buffett. It covers several topics:\n\n1. **Communication Philosophy**: Buffett emphasizes the importance of transparency and candidness in reporting mistakes and successes to shareholders.\n\n2. **Mistakes and Learnings**: The letter acknowledges past mistakes in business assessments and management hires, highlighting the importance of correcting errors promptly.\n\n3. **CEO Succession**: Mention of Greg Abel stepping in as the new CEO and continuing the tradition of honest communication.\n\n4. **Pete Liegl Story**: A detailed account of acquiring Forest River and the relationship with its founder, highlighting trust and effective business decisions.\n\n5. **2024 Performance**: Overview of business performance, particularly in insurance and investment activities, with a focus on GEICO's improvement.\n\n6. **Tax Contributions**: Discussion of significant tax payments to the U.S. Treasury, credited to shareholders' reinvestments.\n\n7. **Investment Strategy**: A breakdown of Berkshire\u2019s investments in both controlled subsidiaries and marketable equities, along with a focus on long-term holding strategies.\n\n8. **American Capitalism**: Reflections on America\u2019s economic development and Berkshire\u2019s role within it.\n\n9. **Property-Casualty Insurance**: Insights into the P/C insurance business model and its challenges and benefits.\n\n10. **Japanese Investments**: Information about Berkshire\u2019s investments in Japanese companies and future plans.\n\n11. **Annual Meeting**: Details about the upcoming annual gathering in Omaha, including schedule changes and new book releases.\n\n12. **Personal Anecdotes**: Light-hearted stories about family and interactions, conveying Buffett's personable approach.\n\n13. **Financial Performance Data**: Tables comparing Berkshire\u2019s annual performance to the S&P 500, showing impressive long-term gains.\n\nOverall, the letter reinforces Berkshire Hathaway's commitment to transparency, investment in both its businesses and the wider economy, and emphasizes strong leadership and prudent financial management."
        }
      ],
      "role": "assistant"
    }
  ],
  "parallel_tool_calls": true,
  "previous_response_id": null,
  "reasoning": {
    "effort": null,
    "summary": null
  },
  "service_tier": "default",
  "store": true,
  "temperature": 1.0,
  "text": {
    "format": {
      "type": "text"
    }
  },
  "tool_choice": "auto",
  "tools": [],
  "top_logprobs": 0,
  "top_p": 1.0,
  "truncation": "disabled",
  "usage": {
    "input_tokens": 8438,
    "input_tokens_details": {
      "cached_tokens": 0,
      "cache_write_tokens": 0
    },
    "output_tokens": 398,
    "output_tokens_details": {
      "reasoning_tokens": 0
    },
    "total_tokens": 8836
  },
  "user": null,
  "metadata": {}
}
```

### File search

```http
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-6-astra",
    "tools": [{
      "type": "file_search",
      "vector_store_ids": ["vs_1234567890"],
      "max_num_results": 20
    }],
    "input": "What are the attributes of an ancient brown dragon?"
  }'
```
