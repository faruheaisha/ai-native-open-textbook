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
zh: ""
---

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

if (!response.ok) {
throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
}

const result = await response.json();
const content = (result as any).content[0].text;

// Parse the JSON response
const aiTasks = JSON.parse(content);
