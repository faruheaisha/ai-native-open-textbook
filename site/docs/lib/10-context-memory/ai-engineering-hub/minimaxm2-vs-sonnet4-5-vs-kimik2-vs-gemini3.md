---
title: "Claude Sonnet 4.5 vs Minimax M2 vs Kimi K2 vs Gemini 3.0 on code generation using Opik"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/minimaxm2-vs-sonnet4-5-vs-kimik2-vs-gemini3/README.md"
sourceRel: "minimaxm2-vs-sonnet4-5-vs-kimik2-vs-gemini3/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/minimaxm2-vs-sonnet4-5-vs-kimik2-vs-gemini3/README.md"
sourceSha256: "8349210bc4ed571033ef1d0fb55adafaac09aaed5aa832e503481910b4c3a8b1"
pageSha256: "8349210bc4ed571033ef1d0fb55adafaac09aaed5aa832e503481910b4c3a8b1"
contentMode: "local-full"
zh: ""
---

# Claude Sonnet 4.5 vs Minimax M2 vs Kimi K2 vs Gemini 3.0 on code generation using Opik

This application compares the code generation capabilities of different frontier models (MiniMax-M2, Kimi-K2, Claude Sonnet 4.5, and Gemini 3.0) that you can select from the dropdown menu, using Opik metrics. The app allows users to ingest code from a GitHub repository as context and generate new code based on that context. Both models run in parallel side by side, giving a fair comparison of their capabilities. Finally, it evaluates both models on custom code metrics and provides a detailed performance comparison with neat and clean visuals.

## Tech Stack

- **[LiteLLM](https://github.com/BerriAI/litellm)** - For orchestration and model management
- **[Opik by Comet](https://www.comet.com/)** - To build the evaluation pipeline using G-Eval
- **[OpenRouter](https://openrouter.ai/)** - To access cutting-edge models like MiniMax-M2, Gemini 3.0, Kimi-K2, and Claude Sonnet 4.5
- **[Gitingest](https://gitingest.com/)** - For ingesting code from GitHub repositories
- **[Streamlit](https://streamlit.io/)** - For the intuitive UI

## Supported Models

This application supports comparison of various frontier models accessible via OpenRouter:

- **MiniMax-M2**: Features 200k context window (128k max output tokens) with ~100 TPS throughput. Offers the best intelligence-to-cost ratio, enabling practical large-scale use cases. Currently free for developers worldwide for a limited time.
- **Kimi-K2**: High-performance model for code generation from Moonshot AI
- **Claude Sonnet 4.5**: Advanced model from Anthropic
- **Gemini 3.0**: Newest and advanced model from Google expert in code, reasoning, etc.

You'll also learn about **G-Eval** and building custom evaluation metrics through this project.

---

## Setup and Installation

Ensure you have Python 3.12 or later installed on your system.

Install dependencies:

```bash
uv sync
```

Copy `.env.example` to `.env` and configure the following environment variables:

```
OPENAI_API_KEY=your_openai_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**Note**: 
- OpenRouter API key is needed to access models like MiniMax-M2, Gemini 3.0, Kimi-K2, and Claude Sonnet 4.5
- OpenAI API key is required as the judge LLM in G-Eval for evaluation metrics

Look for the `.opik.config` file in the root directory and set your respective credentials for Opik.

Run the Streamlit app:

```bash
streamlit run app.py
```

## Workflow

![Application workflow diagram of step-by-step code generation and evaluation pr](/mirror/d3/d3dd7953391f6934765da63871425398cb37c721.gif)

Here's how the application works step by step:

### 0️⃣ Load API Keys

Access models like MiniMax-M2, Gemini 3.0, Kimi-K2, and Claude Sonnet 4.5 via OpenRouter. MiniMax-M2 offers ~100 TPS throughput and is scalable for enterprise use. Store your OpenRouter and OpenAI keys in the `.env` file.

![](/mirror/15/155bd37fb4c84ba6d7a23118b1e662a934d97f27.png)

### 1️⃣ Ingest GitHub Repository

Use GitIngest to convert a user-specified GitHub repository into straightforward, LLM-ready text data. LLMs will utilize this data as context to generate code in response to the user's query. MiniMax-M2's 200k context window makes it particularly well-suited for large repository understanding.

![](/mirror/2d/2d9f689ae8f396dc5bf20e6b62ba8b0f2784011a.png)

### 2️⃣ Code Correctness Metric

Create evaluation metrics using Opik's G-Eval. The code correctness metric assesses the quality and correctness of generated code by comparing it to reference ground truth code.

![](/mirror/54/548e2dde7bba1ea02b58d3a50f1202bd57185c81.png)

### 3️⃣ Code Readability Metric

This metric ensures that code adheres to proper formatting and consistent naming conventions. It also evaluates the quality of comments and docstrings, which make code easy to understand.

![](/mirror/dd/dd15266b5d6c3827049fea1293db2b02b3909eb6.png)

### 4️⃣ Best Practices Metric

This metric ensures code is modular, efficient, and implements proper error handling.

![](/mirror/6d/6dca35da5879783cfa684158ebf9c1db532baa60.png)

### 5️⃣ Generate Model Response

Generate responses using selected models by providing the ingested codebase as context. Results are streamed in parallel for both models, allowing for side-by-side comparison. MiniMax-M2 offers the best intelligence-to-cost ratio, enabling practical large-scale use cases.

![](/mirror/9a/9a0d19964b0a3fa3b825f2232d6ca0bfb4b74c88.png)

### 6️⃣ Evaluate Generated Code

Evaluate the responses generated by models using the metrics mentioned above, providing detailed reasoning for each metric.

![](/mirror/3f/3f23b75c430772845783b469becfaa72fd2c7dd7.png)

### 7️⃣ Streamlit UI

The intuitive Streamlit UI simplifies comparing and evaluating models within a single interface.

![](/mirror/e0/e0bc1b43f47291335ba315b0e825d5558e8214e9.png)

## Quick Start Usage

1. Select the models you want to compare from the dropdown menu
2. Enter a GitHub repository URL in the sidebar
3. Click "Ingest Repository" to load the repository context
4. Enter your code generation prompt in the chat
5. View the generated code from both models side by side
6. Click on "Evaluate Code" to evaluate code using Opik
7. View the evaluation metrics comparing both models' performance

## Evaluation Metrics

The app evaluates generated code using three comprehensive metrics powered by Opik's G-Eval:

- **Code Correctness**: Evaluates the functional correctness of the generated code

- **Code Readability**: Measures how easy the code is to understand and maintain

- **Best Practices**: Assesses adherence to coding standards and coding best practices

Each metric is scored on a scale of 0-10, with the following general interpretation:

- 0-2: Major issues or non-functional code
- 3-5: Basic implementation with significant gaps
- 6-8: Good implementation with minor issues
- 9-10: Excellent implementation meeting all criteria

The overall score is calculated as an average of these three metrics.

## Test Results

Here are some example evaluations comparing different models:

### Query 1: Build an MCP Server for GitHub

**Task**: Build an MCP server that lets AI agents and chatbots read code, manage issues/PRs, analyze repos, and automate workflows on GitHub.

**Results** (across three metrics: Correctness, Readability, and Best Practices):
- **MiniMax-M2**: 8.33
- **Kimi-K2**: 9.00

![](/mirror/f0/f00eadd3c757564832fdb24486b8a7d2fdd8e7f4.png)

### Query 2: Build an MCP Server for Notion

**Task**: The MCP Server connects to Notion's API, enabling AI to manage notes, to-do lists, and databases for enhanced productivity and organization.

**Results**:
- **MiniMax-M2**: 8.67
- **Claude Sonnet 4.5**: 8.42

![](/mirror/86/86f4666d4fda7e43961cca9f81c22ca116e9c69a.png)

### Extended Evaluation Results

Based on 10+ evaluations using Opik on building MCP servers:

**MiniMax-M2 vs Claude Sonnet 4.5**:
- MiniMax-M2 won in 3 cases
- Claude Sonnet 4.5 won in the remaining 7 cases

![](/mirror/c7/c7d3039c8f28874bcd0a9c399c402471adfb36a9.png)

**MiniMax-M2 vs Kimi-K2**:
- MiniMax-M2 won in 3 cases
- Kimi-K2 won in the remaining 7 cases

![](/mirror/9b/9b039c1a726762cbbc9cb9906ebffe84b776bf9c.png)

**Overall**: All models perform exceptionally well, with Kimi-K2 and Claude Sonnet 4.5 marginally outperforming in these evaluations. However, MiniMax-M2 offers significant advantages in cost-effectiveness and throughput, making it ideal for production use cases.

**Key Insight**: MiniMax-M2 is twice as fast and just 8% of Claude's price, setting a new efficiency standard. It's free for developers worldwide for a limited time—give it a try! 🚀

---

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
