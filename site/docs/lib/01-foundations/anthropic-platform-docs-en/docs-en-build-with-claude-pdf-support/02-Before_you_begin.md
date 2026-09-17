---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/build-with-claude/pdf-support.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/pdf-support.md"
sourceSha256: "fe526a04464d0e005159bbfd23cd748c9d6adf569e0af73ac4ade018cf411ec7"
pageSha256: "3914e0185421a0b463cab0a236d374c37392a1d30a619d9778020a443707d7b2"
contentMode: "local-full"
zh: ""
---

## Before you begin

### Check PDF requirements

Claude works with any standard PDF. Ensure your request size meets these requirements:

| Requirement               | Limit                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| Maximum request size      | 32 MB ([varies by platform](https://platform.claude.com/docs/en/api/overview#request-size-limits)) |
| Maximum pages per request | 600 (100 when the request's context window is under 1M tokens)                                     |
| Format                    | Standard PDF (no passwords/encryption)                                                             |

Both limits are on the entire request payload, including any other content sent alongside PDFs. For large PDFs, consider uploading with the [Files API](https://platform.claude.com/docs/en/build-with-claude/files) and referencing by `file_id` to keep request payloads small.

  Dense PDFs (many small-font pages, complex tables, or heavy graphics) can fill the context window before reaching the page limit. Requests with large PDFs can also fail before reaching the page limit, even when using the Files API. Try splitting the document into sections; for large files, because each page is processed as an image, downsampling embedded images can also help.

Because PDF support relies on Claude's vision capabilities, it is subject to the same [limitations and considerations](https://platform.claude.com/docs/en/build-with-claude/vision#limitations) as other vision tasks.

### Supported platforms and models

All [active models](https://platform.claude.com/docs/en/models/overview) support PDF processing. For PDF support through Amazon Bedrock's Converse API, see [Amazon Bedrock PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support#amazon-bedrock-pdf-support).

### Amazon Bedrock PDF support

When using PDF support through the Converse API, part of [Claude on Amazon Bedrock (Opus 4.6 and earlier)](https://platform.claude.com/docs/en/build-with-claude/claude-on-amazon-bedrock-legacy), there are two distinct document processing modes:

  **Important:** To access Claude's full visual PDF understanding capabilities in the Converse API, you must enable citations. Without citations enabled, the API falls back to basic text extraction only. Learn more about [working with citations](https://platform.claude.com/docs/en/build-with-claude/citations).

#### Document processing modes

1. **Converse Document Chat** (Original mode - Text extraction only)

   * Provides basic text extraction from PDFs
   * Cannot analyze images, charts, or visual layouts within PDFs
   * Uses approximately 1,000 tokens for a 3-page PDF
   * Automatically used when citations are not enabled

2. **Claude PDF Chat** (New mode - Full visual understanding)

   * Provides complete visual analysis of PDFs
   * Can understand and analyze charts, graphs, images, and visual layouts
   * Processes each page as both text and image for comprehensive understanding
   * Uses approximately 7,000 tokens for a 3-page PDF
   * **Requires citations to be enabled** in the Converse API

#### Key limitations

* **Converse API:** Visual PDF analysis requires citations to be enabled. There is currently no option to use visual analysis without citations (unlike the InvokeModel API).
* **InvokeModel API:** Provides full control over PDF processing without forced citations.

#### Common issues

If Claude isn't seeing images or charts in your PDFs when using the Converse API, you likely need to enable the citations flag. Without it, Converse falls back to basic text extraction only.

  This is a known constraint with the Converse API. For applications that require visual PDF analysis without citations, consider using the InvokeModel API instead.

  Plain text files such as .txt, .csv, or .md can be used directly in document blocks: upload them to the Files API with MIME type `text/plain` and reference them by `file_id`. Binary formats such as .xlsx or .docx are not supported in document blocks and must be converted to text or PDF first. See [Working with other file formats](https://platform.claude.com/docs/en/build-with-claude/files#working-with-other-file-formats).
