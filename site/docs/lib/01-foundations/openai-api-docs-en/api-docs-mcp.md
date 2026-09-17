---
title: "Building MCP servers for plugins and API integrations"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/mcp.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/mcp.md"
sourceSha256: "0f7bb303c228c5dcb4382571242e98cfe1cffec60c516df94713db354b1445a3"
pageSha256: "0f7bb303c228c5dcb4382571242e98cfe1cffec60c516df94713db354b1445a3"
contentMode: "local-full"
zh: ""
---

# Building MCP servers for plugins and API integrations

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

[Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) is an open protocol that's becoming the industry standard for extending AI models with additional tools and knowledge. Remote MCP servers can be used to connect models over the Internet to new data sources and capabilities.

In this guide, we'll cover how to build a remote MCP server that reads data from a private data source (a [vector store](https://developers.openai.com/api/docs/guides/retrieval)) and makes it available through a plugin in ChatGPT and Codex, through ChatGPT deep research and company knowledge, and [through the API](https://developers.openai.com/api/docs/guides/deep-research).

**Note**: To build a plugin with an MCP server, start with the plugin docs: [Quickstart](https://developers.openai.com/plugins/quickstart), [Build your MCP server](https://developers.openai.com/plugins/build/mcp-server), [Connect and test your plugin](https://developers.openai.com/plugins/deploy/connect-chatgpt), and [Authentication](https://developers.openai.com/plugins/build/auth). If your MCP server doesn't need UI, you can expose tools without UI resources.

## Configure a data source

You can use data from any source to power a remote MCP server, but for simplicity, we will use [vector stores](https://developers.openai.com/api/docs/guides/retrieval) in the OpenAI API. Begin by uploading a PDF document to a new vector store - [you can use this public domain 19th century book about cats](https://cdn.openai.com/API/docs/cats.pdf) for an example.

You can upload files and create a vector store [in the dashboard here](https://platform.openai.com/storage/vector_stores), or you can create vector stores and upload files via API. [Follow the vector store guide](https://developers.openai.com/api/docs/guides/retrieval) to set up a vector store and upload a file to it.

Make a note of the vector store's unique ID to use in the example to follow.

![vector store configuration](https://cdn.openai.com/API/docs/images/vector_store.png)

## Create an MCP server

Next, let's create a remote MCP server that will do search queries against our vector store, and be able to return document content for files with a given ID.

In this example, we are going to build our MCP server using Python and [FastMCP](https://github.com/jlowin/fastmcp). A full implementation of the server appears at the end of this section, along with instructions for running it in a [browser-based development environment](https://replit.com/).

Note that there are a number of other MCP server frameworks you can use in a variety of programming languages. Whichever framework you use though, the tool definitions in your server will need to conform to the shape described here.

To work with ChatGPT deep research and company knowledge, your MCP server
should implement two read-only tools: `search` and `fetch`, using the
compatibility schema in [Company knowledge compatibility](https://developers.openai.com/plugins/build/mcp-server#company-knowledge-compatibility).
The same interface is useful for research workflows via API.

Declare an output schema for each tool so clients can validate the result shape.
In FastMCP, typed return models can generate this schema automatically; the
example below passes `output_schema` explicitly from the same models.

### `search` tool

The `search` tool is responsible for returning a list of relevant search results from your MCP server's data source, given a user's query.

_Arguments:_

A single query string.

_Returns:_

An object with a single key, `results`, whose value is an array of result objects. Each result object should include:

- `id` - a unique ID for the document or search result item
- `title` - human-readable title.
- `url` - canonical URL for citation.

In MCP, return this object as `structuredContent` and include the same value as
a JSON-encoded string in the [content array](https://modelcontextprotocol.io/docs/learn/architecture#understanding-the-tool-execution-response)
for compatibility.

The final tool response should look like:

```json
{
  "structuredContent": {
    "results": [{ "id": "doc-1", "title": "...", "url": "..." }]
  },
  "content": [
    {
      "type": "text",
      "text": "{\"results\":[{\"id\":\"doc-1\",\"title\":\"...\",\"url\":\"...\"}]}"
    }
  ]
}
```

### `fetch` tool

The fetch tool is used to retrieve the full contents of a search result document or item.

_Arguments:_

A string which is a unique identifier for the search document.

_Returns:_

A single object with the following properties:

- `id` - a unique ID for the document or search result item
- `title` - a string title for the search result item
- `text` - The full text of the document or item
- `url` - a URL to the document or search result item. Useful for citing
  specific resources in research.
- `metadata` - an optional key/value pairing of data about the result

In MCP, return this object as `structuredContent` and include the same value as
a JSON-encoded string in the content array for compatibility.

The final tool response should look like:

```json
{
  "structuredContent": {
    "id": "doc-1",
    "title": "...",
    "text": "full text...",
    "url": "https://example.com/doc",
    "metadata": { "source": "vector_store" }
  },
  "content": [
    {
      "type": "text",
      "text": "{\"id\":\"doc-1\",\"title\":\"...\",\"text\":\"full text...\",\"url\":\"https://example.com/doc\",\"metadata\":{\"source\":\"vector_store\"}}"
    }
  ]
}
```
