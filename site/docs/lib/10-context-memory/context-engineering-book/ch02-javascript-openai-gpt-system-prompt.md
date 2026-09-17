---
title: "System prompt with OpenAI GPT models"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch02/javascript/openai-gpt-system-prompt/README.md"
sourceRel: "ch02/javascript/openai-gpt-system-prompt/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch02/javascript/openai-gpt-system-prompt/README.md"
sourceSha256: "b18d187a5f694565cfa89539d242c2323a33ef5d1486e19b46ee468031f3abab"
pageSha256: "b18d187a5f694565cfa89539d242c2323a33ef5d1486e19b46ee468031f3abab"
contentMode: "local-full"
zh: ""
---

# System prompt with OpenAI GPT models

This example demonstrates how to set up an [OpenAI](https://openai.com/) GPT model and send a system prompt with JavaScript.

## Requirements

* [Node.js](https://nodejs.org/)
* An [OpenAI API key](https://platform.openai.com/api-keys)

## Steps for running this example in the shell

1.  Install dependencies:
```bash
npm install
```

2. Export your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY="sk-..." # Windows cmd: set OPENAI_API_KEY="sk-..." # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."
```

3. Run the script:
```bash
npm start
```

## Output

When you run the script, it will send a system prompt and a user prompt to the model, which should provide a response:

```
=== With system prompt ===
User: Explain me what is context engineering in simple words
AI: Explain to me what context engineering is in simple words.

=== With only user prompt ===
User: Explain me what is context engineering in simple words
AI: Context engineering is the process of designing and organizing information or systems in a way that makes it easier for people to understand and use them in specific situations. It involves considering the environment, needs, and goals of users to create a more relevant and effective experience.

For example, if you're creating a website, context engineering would mean thinking about who will use the site, what they are looking for, and how to present the information in a way that makes sense for them. This helps ensure that users can find what they need quickly and easily, leading to a better overall experience.
```
