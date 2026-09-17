---
title: "Azure AI Services"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/SKILL.md"
sourceSha256: "d445410cfbeb391a1eaf95fbf951ba08a017b66f9404cd434c534d54f64329b5"
pageSha256: "d445410cfbeb391a1eaf95fbf951ba08a017b66f9404cd434c534d54f64329b5"
contentMode: "local-full"
zh: ""
---

# Azure AI Services

## Services

| Service | Use When | MCP Tools | CLI |
|---------|----------|-----------|-----|
| AI Search | Full-text, vector, hybrid search | `azure__search` | `az search` |
| Speech | Speech-to-text, text-to-speech | `azure__speech` | - |
| OpenAI | GPT models, embeddings, DALL-E | - | `az cognitiveservices` |
| Document Intelligence | Form extraction, OCR | - | - |

## MCP Server (Preferred)

When Azure MCP is enabled:

### AI Search
- `azure__search` with command `search_index_list` - List search indexes
- `azure__search` with command `search_index_get` - Get index details
- `azure__search` with command `search_query` - Query search index

### Speech
- `azure__speech` with command `speech_transcribe` - Speech to text
- `azure__speech` with command `speech_synthesize` - Text to speech

**If Azure MCP is not enabled:** Run `/azure:setup` or enable via `/mcp`.

## AI Search Capabilities

| Feature | Description |
|---------|-------------|
| Full-text search | Linguistic analysis, stemming |
| Vector search | Semantic similarity with embeddings |
| Hybrid search | Combined keyword + vector |
| AI enrichment | Entity extraction, OCR, sentiment |

## Speech Capabilities

| Feature | Description |
|---------|-------------|
| Speech-to-text | Real-time and batch transcription |
| Text-to-speech | Neural voices, SSML support |
| Speaker diarization | Identify who spoke when |
| Custom models | Domain-specific vocabulary |

## SDK Quick References

For programmatic access to these services, see the condensed SDK guides:

- **AI Search**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-search-documents-py) | [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-search-documents-ts) | [.NET](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-search-documents-dotnet)
- **OpenAI**: [.NET](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-openai-dotnet)
- **Vision**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-vision-imageanalysis-py) | [Java](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-vision-imageanalysis-java)
- **Transcription**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-transcription-py)
- **Translation**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-translation-text-py) | [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-translation-ts)
- **Document Intelligence**: [.NET](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-document-intelligence-dotnet) | [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-document-intelligence-ts)
- **Content Safety**: [Python](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-contentsafety-py) | [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-contentsafety-ts) | [Java](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-sdk-azure-ai-contentsafety-java)

## Service Details

For deep documentation on specific services:

- AI Search indexing and queries -> [Azure AI Search documentation](https://learn.microsoft.com/azure/search/search-what-is-azure-search)
- Speech transcription patterns -> [Azure AI Speech documentation](https://learn.microsoft.com/azure/ai-services/speech-service/overview)
