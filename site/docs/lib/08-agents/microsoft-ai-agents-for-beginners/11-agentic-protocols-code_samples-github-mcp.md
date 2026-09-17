---
title: "Github MCP Server Example"
sourceId: "08-agents/microsoft-ai-agents-for-beginners"
sourceTitle: "AI Agents for Beginners（微软官方入门课）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/ai-agents-for-beginners"
entryUrl: "https://github.com/microsoft/ai-agents-for-beginners/blob/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/11-agentic-protocols/code_samples/github-mcp/README.md"
sourceRel: "11-agentic-protocols/code_samples/github-mcp/README.md"
rawUrl: "/raw/08-agents/microsoft-ai-agents-for-beginners/11-agentic-protocols/code_samples/github-mcp/README.md"
sourceSha256: "ebb3dc244dcd1042bc945c98de370d4491ad544cd7042fc52807a18a6146c264"
pageSha256: "ebb3dc244dcd1042bc945c98de370d4491ad544cd7042fc52807a18a6146c264"
contentMode: "local-full"
zh: ""
---

# Github MCP Server Example

## Description

This was a demo created for the AI Agents Hackathon hosted through the Microsoft Reactor.

The tools is used to recommend hackathon projects based on a user's Github repos.
This is done by:

1. **Github Agent** - Using the Github MCP Server to retrieve repos and information about those repos.
2. **Hackathon Agent** - Takes the data from the Github Agent and comes up with creative hackathon project ideas based on the projects, languages used by the user and the project tracks for the AI Agents hackathon.
3. **Events Agent** - Based on the hackathon agents suggestion, the events agent will recommend relevant events from the AI Agent Hackathon series.
## Running the code 

### Environment Variables

This demo uses Microsoft Agent Framework, Azure OpenAI Service, the Github MCP Server and Azure AI Search.

Make sure that you have the proper environment variables set to use these tools:

```python
AZURE_AI_PROJECT_ENDPOINT=""
AZURE_AI_MODEL_DEPLOYMENT_NAME=""
AZURE_SEARCH_SERVICE_ENDPOINT=""
AZURE_SEARCH_API_KEY=""
``` 

## Running the Chainlit Server

To connect to the MCP server, this demo use Chainlit as a chat interface. 

To run the server, use the following command in your terminal:

```bash
chainlit run app.py -w
```

This should start your Chainlit server on `localhost:8000` as well as populate your Azure AI Search Index with the `event-descriptions.md` content. 

## Connecting to the MCP Server

To connect to the Github MCP Server, select the "plug" icon underneath the "Type your message here.." chat box:

![MCP Connect](https://gh-proxy.com/https://raw.githubusercontent.com/microsoft/ai-agents-for-beginners/25b7985f3b2dc37a84f4a7387ccd3c9f0e5b1595/11-agentic-protocols/code_samples/github-mcp/images/mcp-chainlit-1.png)

From there you can click on the "Connect an MCP" to add the command to connect to the Github MCP Server:

```bash
npx -y @modelcontextprotocol/server-github --env GITHUB_PERSONAL_ACCESS_TOKEN=[YOUR PERSONAL ACCESS TOKEN]
```

Replace "[YOUR PERSONAL ACCESS TOKEN]" with your actual Personal Access Token. 

After connecting, you should see a (1) next to the plug icon to confirm that its connected. If not, try restarting the chainlit server with `chainlit run app.py -w`.

## Using the Demo 

To start the agent workflow of recommending hackathon projects, you can type a message like: 

"Recommend hackathon projects for the Github user koreyspace"

The Router Agent will analyze your request and determine which combination of agents (GitHub, Hackathon, and Events) is best suited to handle your query. The agents work together to provide comprehensive recommendations based on GitHub repository analysis, project ideation, and relevant tech events.
