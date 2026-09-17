---
title: "Function calling"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/javascript/function_calling/README.md"
sourceRel: "ch04/javascript/function_calling/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch04/javascript/function_calling/README.md"
sourceSha256: "3a6025e2e0922f0308062f6fff0ef1773285c635ce2e5118789b7687346d167d"
pageSha256: "3a6025e2e0922f0308062f6fff0ef1773285c635ce2e5118789b7687346d167d"
contentMode: "local-full"
zh: ""
---

# Function calling

This example demonstrates the *function-calling* pattern using an [OpenAI](https://openai.com/) GPT model in JavaScript. In this pattern, the model can call external functions to get information. The loop is in the smallest useful form: the model decides when it needs external data, calls a function, and then uses the function result to answer.

## Requirements

* [Node.js](https://nodejs.org/) 18+
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

When you run the script, it will send a fixed user prompt (`What is the weather in San Francisco?`) to a GPT model (`gpt-4o-mini`). The model will determine that it needs to call the `get_weather` function to answer the question, and it will do so with the requested location. The application will execute the function, get the weather, and inject it back into the conversation as a `function_call_output` item. Finally, the model will produce a user-facing answer grounded in the tool result.

```
User: What is the weather in San Francisco?
        Tool requested: get_weather({"location":"San Francisco"})
Assistant: The current weather in San Francisco is sunny with a temperature of 18°C and a humidity level of 63%.
```
