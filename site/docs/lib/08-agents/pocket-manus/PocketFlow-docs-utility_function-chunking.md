---
title: "Text Chunking"
sourceId: "08-agents/pocket-manus"
sourceTitle: "Open Manus with PocketFlow Integration"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/Osly-AI/PocketManus"
entryUrl: "https://github.com/Osly-AI/PocketManus/blob/8ab0ec5f2d5dc17ff58b060af7afcda08a9f57fd/PocketFlow/docs/utility_function/chunking.md"
sourceRel: "PocketFlow/docs/utility_function/chunking.md"
rawUrl: "/raw/08-agents/pocket-manus/PocketFlow/docs/utility_function/chunking.md"
sourceSha256: "cdc6142ad0443b3ca5692347298740b0fd5b0da3b1a8bb28ce489ec17554a565"
pageSha256: "cdc6142ad0443b3ca5692347298740b0fd5b0da3b1a8bb28ce489ec17554a565"
contentMode: "local-full"
zh: ""
---

# Text Chunking

We recommend some implementations of commonly used text chunking approaches.

> Text Chunking is more a micro optimization, compared to the Flow Design.
> 
> It's recommended to start with the Naive Chunking and optimize later.

---

## Example Python Code Samples

### 1. Naive (Fixed-Size) Chunking
Splits text by a fixed number of words, ignoring sentence or semantic boundaries.

```python
def fixed_size_chunk(text, chunk_size=100):
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunks.append(text[i : i + chunk_size])
    return chunks
```

However, sentences are often cut awkwardly, losing coherence.

### 2. Sentence-Based Chunking

```python
import nltk

def sentence_based_chunk(text, max_sentences=2):
    sentences = nltk.sent_tokenize(text)
    chunks = []
    for i in range(0, len(sentences), max_sentences):
        chunks.append(" ".join(sentences[i : i + max_sentences]))
    return chunks
```

However, might not handle very long sentences or paragraphs well.

### 3. Other Chunking

- **Paragraph-Based**: Split text by paragraphs (e.g., newlines). Large paragraphs can create big chunks.
- **Semantic**: Use embeddings or topic modeling to chunk by semantic boundaries.
- **Agentic**: Use an LLM to decide chunk boundaries based on context or meaning.
