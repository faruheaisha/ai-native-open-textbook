---
title: "Context Engineering Intro"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/README.md"
zh: "on"
---

# Context Engineering Intro

### Example usage of the Anthropic API for Claude (model and API key are both environment variables)

const response = await fetch('https://api.anthropic.com/v1/messages', {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
    'x-api-key': this.apiKey,
    'anthropic-version': '2023-06-01'
},
body: JSON.stringify({
    model: this.model,
    max_tokens: 3000,
    messages: [{
    role: 'user',
    content: this.buildPRPParsingPrompt(prpContent, projectContext, config)
    }]
})
});

<div class="tb-zh"><p>这段代码用 fetch 向 https://api.anthropic.com/v1/messages 发起 POST 请求：请求头包含 Content-Type: application/json、x-api-key（取自 this.apiKey）和 anthropic-version: 2023-06-01；请求体经 JSON.stringify 序列化，包含 model（取自 this.model）、max_tokens: 3000，以及一条 role 为 user 的消息，其 content 由 this.buildPRPParsingPrompt(prpContent, projectContext, config) 生成。</p></div>

if (!response.ok) {
throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
}

<div class="tb-zh"><p>如果响应失败（!response.ok），就抛出错误：Anthropic API error: 加上响应的状态码与状态文本。</p></div>

const result = await response.json();
const content = (result as any).content[0].text;

<div class="tb-zh"><p>等待响应解析为 JSON，然后取出 result.content[0].text 作为内容。</p></div>

// Parse the JSON response
const aiTasks = JSON.parse(content);

<div class="tb-zh"><p>把这段内容按 JSON 解析，得到 aiTasks。</p></div>
