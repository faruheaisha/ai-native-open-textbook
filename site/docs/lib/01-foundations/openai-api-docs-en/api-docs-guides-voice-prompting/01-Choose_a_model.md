---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/voice-prompting.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/voice-prompting.md"
sourceSha256: "5f08b8a5661181c66582baad274d7700e4aba37b4fd02cc2e4b41265a24ea075"
pageSha256: "fb4df8a2c4cb520f7209828b8755077d065f8b071a3b78766a6ff56a59875f09"
contentMode: "local-full"
zh: ""
---

## Choose a model

<table>
  <thead>
    <tr>
      <th>Model</th>
      <th>Use when</th>
      <th>Prompting focus</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      &lt;td style=&#123;&#123; whiteSpace: "nowrap" &#125;&#125;>
        [`gpt-realtime-2`](https://developers.openai.com/api/docs/models/gpt-realtime-2)
      
      <td>
        You need the strongest realtime reasoning, tool use, and instruction
        following.
      </td>
      <td>
        Tune reasoning effort, preambles, tool policies, exact entity capture,
        and long-session state.
      </td>
    </tr>
    <tr>
      &lt;td style=&#123;&#123; whiteSpace: "nowrap" &#125;&#125;>
        [`gpt-realtime-1.5`](https://developers.openai.com/api/docs/models/gpt-realtime-1.5)
      
      <td>You need a fast, reliable non-reasoning speech-to-speech model.</td>
      <td>
        Follow the core realtime prompt structure and test for latency-sensitive
        behavior.
      </td>
    </tr>
  </tbody>
</table>
