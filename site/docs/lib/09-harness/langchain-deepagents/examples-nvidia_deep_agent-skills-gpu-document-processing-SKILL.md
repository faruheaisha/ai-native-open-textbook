---
title: "GPU Document Processing Skill"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/nvidia_deep_agent/skills/gpu-document-processing/SKILL.md"
sourceRel: "examples/nvidia_deep_agent/skills/gpu-document-processing/SKILL.md"
rawUrl: "/raw/09-harness/langchain-deepagents/examples/nvidia_deep_agent/skills/gpu-document-processing/SKILL.md"
sourceSha256: "80fad4867bc9ec5950bfc29a964f06e6bbc3c97f4d43e6c62611584c91954324"
pageSha256: "80fad4867bc9ec5950bfc29a964f06e6bbc3c97f4d43e6c62611584c91954324"
contentMode: "local-full"
zh: ""
---

# GPU Document Processing Skill

Process large documents and document collections using GPU-accelerated tools. This skill uses the sandbox-as-tool pattern: the agent runs on CPU for reasoning, and sends document processing work to a GPU-equipped environment.

## When to Use This Skill

Use this skill when:
- Processing large PDF files (50+ pages)
- Analyzing collections of documents (10+ files)
- Extracting structured data from unstructured documents
- Performing bulk text extraction and chunking
- Generating embeddings for large document sets
- The user uploads or references large documents for analysis

## Architecture: Sandbox as Tool

This skill follows the **sandbox-as-tool pattern** for GPU execution:

1. **Agent reasons on CPU** - planning, synthesis, report writing
2. **Processing sent to GPU sandbox** - document parsing, embedding, extraction
3. **Results returned to agent** - structured output for further analysis

This separation ensures:
- API keys stay outside the sandbox (security)
- Agent state persists independently of processing jobs
- Processing can be parallelized across documents
- Cost-efficient: GPU used only during processing, not during reasoning

## Capabilities

### PDF Text Extraction
Extract text content from PDF documents with layout preservation:
- Headers, paragraphs, lists, and tables detected separately
- Page numbers and section boundaries preserved
- Multi-column layout handling

### Tabular Data Extraction
Extract tables from documents into structured formats:
- PDF tables to CSV/DataFrames using GPU-accelerated parsing
- Automatic column type detection
- Handles merged cells and multi-row headers

### Document Chunking
Split large documents into meaningful chunks for analysis:
- Semantic chunking (by topic/section boundaries)
- Fixed-size chunking with overlap for embedding
- Configurable chunk sizes (default: 512 tokens)

### Embedding Generation
Generate vector embeddings for document chunks:
- Uses NVIDIA NeMo Retriever NIM for GPU-accelerated embedding
- Supports batch processing for large document sets
- Compatible with standard vector stores (Milvus, ChromaDB)

## Workflow

1. **Receive document reference** from the orchestrator
2. **Determine processing type** (extraction, analysis, embedding)
3. **Send to GPU sandbox** for processing
4. **Collect structured results** (text, tables, embeddings)
5. **Write findings** to /shared/ for the orchestrator to synthesize

## Processing Large Document Collections

For multiple documents:
1. Process documents in parallel batches (3-5 concurrent)
2. Extract key metadata first (title, date, author, page count)
3. Generate per-document summaries
4. Cross-reference findings across documents
5. Write consolidated findings with per-document citations

## Output Format

When reporting document processing results:
- Include document metadata (filename, pages, size)
- Structure extracted content by section/chapter
- Format tables as markdown tables
- Include page references for all extracted content
- Note any extraction quality issues (scanned images, corrupted pages)

## Integration with NVIDIA NIM

For production deployments, GPU document processing can leverage:
- **NVIDIA NeMo Retriever**: GPU-accelerated embedding and retrieval
- **NVIDIA RAPIDS cuDF**: Tabular data processing from extracted tables
- **NVIDIA Triton**: Scalable inference for document classification models

See NVIDIA's NIM documentation for self-hosted deployment options.
