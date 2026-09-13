---
title: "Streaming responses from Google Gemini models"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# Streaming responses from Google Gemini models

This example demonstrates how to stream the response of a [Google Gemini](https://gemini.google.com/) model with JavaScript. Instead of waiting for the complete answer, the script prints each fragment as the model produces it and reports the time to first token.

## Requirements

* [Node.js](https://nodejs.org/) 18+
* A [Google API key](https://aistudio.google.com/)

## Steps for running this example in the shell

1.  Install dependencies:
```bash
npm install
```

2. Export your API key as an environment variable:
```bash
export GOOGLE_API_KEY="..." # Windows cmd: set GOOGLE_API_KEY="..." # Windows PowerShell: $env:GOOGLE_API_KEY="..."
```

3. Run the script:
```bash
npm start
```

## Output

When you run the script, it sends a user prompt to a Gemini model (`gemini-2.5-flash`) and prints the answer as it is generated. Once the stream ends, it prints the time to first token, the total latency, and the token counts. This example uses the current `@google/genai` SDK. Each streamed chunk can carry usage metadata, so the script keeps the last one it sees and reports it after the stream ends.
