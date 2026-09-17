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
sourceRel: "docs/en/build-with-claude/citations.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/citations.md"
sourceSha256: "e4a8ad0dce824af1bfe9ae8b04d0633d6fcc33360fe8503b50430b8c1e514d88"
pageSha256: "c7c9a522fef694c62d095e6ae4411e0dedfed783a9ba955a7385282dbf5bbb62"
contentMode: "local-full"
zh: ""
---

## How citations work

Integrate citations with Claude in these steps:

    * Include documents in any of the supported formats: [PDFs](https://platform.claude.com/docs/en/build-with-claude/citations#pdf-documents), [plain text](https://platform.claude.com/docs/en/build-with-claude/citations#plain-text-documents), or [custom content](https://platform.claude.com/docs/en/build-with-claude/citations#custom-content-documents) documents.
    * Set `citations.enabled=true` on each of your documents. Currently, citations must be enabled on all or none of the documents within a request.
    * Only text citations are currently supported. Image citations are not yet possible.

    * Document contents are "chunked" to define the minimum granularity of possible citations. For example, sentence chunking lets Claude cite a single sentence or chain together multiple consecutive sentences to cite a paragraph or longer passage.

      * **For PDFs:** Text is extracted as described in [PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support) and content is chunked into sentences. Citing images from PDFs is not currently supported.
      * **For plain text documents:** Content is chunked into sentences that can be cited from.
      * **For custom content documents:** Your provided content blocks are used as-is and no further chunking is done.

    * Responses may now include multiple text blocks where each text block can contain a claim that Claude is making and a list of citations that support the claim.

    * Citations reference specific locations in source documents. The format of these citations is dependent on the type of document being cited from.

      * **For PDFs:** Citations include the page number range (1-indexed).
      * **For plain text documents:** Citations include the character index range (0-indexed).
      * **For custom content documents:** Citations include the content block index range (0-indexed) corresponding to the original content list provided.

    * Document indices are provided to indicate the reference source and are 0-indexed according to the list of all documents in your original request.

  **Automatic chunking vs custom content**

  By default, plain text and PDF documents are automatically chunked into sentences. If you need more control over citation granularity (for example, for bullet points or transcripts), use custom content documents instead. See [Document types](https://platform.claude.com/docs/en/build-with-claude/citations#document-types) for more details.

  For example, if you want Claude to be able to cite specific sentences from your RAG chunks, you should put each RAG chunk into a plain text document. Otherwise, if you do not want any further chunking to be done, or if you want to customize any additional chunking, you can put RAG chunks into custom content document(s).

### Citable versus non-citable content

* Text found within a document's `source` content can be cited from.
* `title` and `context` are optional fields that are passed to the model but not used toward cited content.
* `title` is limited in length, so the `context` field is useful for storing document metadata as text or stringified JSON.
