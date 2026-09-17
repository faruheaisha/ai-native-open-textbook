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
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch04/java/function_calling/README.md"
sourceRel: "ch04/java/function_calling/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch04/java/function_calling/README.md"
sourceSha256: "5def71686db428208447f8028c769d8e264195cff87f01b829ce7ac7a67b205d"
pageSha256: "5def71686db428208447f8028c769d8e264195cff87f01b829ce7ac7a67b205d"
contentMode: "local-full"
zh: ""
---

# Function calling

This example demonstrates the *function-calling* pattern using an [OpenAI](https://openai.com/) GPT model in Java. In this pattern, the model can call external functions to get information. The loop is in the smallest useful form: the model decides when it needs external data, calls a function, and then uses the function result to answer.

## Requirements

* [Java](https://www.oracle.com/java/technologies/downloads/) 21+
* [Maven](https://maven.apache.org/) 3.9+
* An [OpenAI API key](https://platform.openai.com/api-keys)

## Steps for running this example in the shell

1.  Install dependencies:
```bash
mvn -q compile
```

2. Export your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY="sk-..." # Windows cmd: set OPENAI_API_KEY="sk-..." # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."
```

3. Run the script:
```bash
mvn -q exec:java
```

## Output

When you run the script, it will send a fixed user prompt (`What is the weather in San Francisco?`) to a GPT model (`gpt-4o-mini`). The model will determine that it needs to call the `GetWeather` function to answer the question, and it will do so with the requested location. The application will execute the function and then send the result back to the model. Finally, the model will produce a user-facing answer grounded in the tool result.

```
User: What is the weather in San Francisco?
	Tool requested: GetWeather({"location":"San Francisco"})
Assistant: The current weather in San Francisco is sunny with a temperature of 18°C and a humidity level of 63%.
```
