---
title: "Hello Agents（Datawhale 智能体教程）"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter14/Chapter14-Automated-Deep-Research-Agent.md"
sourceRel: "docs/chapter14/Chapter14-Automated-Deep-Research-Agent.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter14/Chapter14-Automated-Deep-Research-Agent.md"
sourceSha256: "69c66a8daee49bc3f6055be8ecb7cc9df07ae8e7ad146179085d62bb19d7d4f9"
pageSha256: "262015e07cf0e522c70b04af2ee49f64342a60ddbb4de9ae6d76e740d184eadf"
contentMode: "local-full"
zh: ""
---

## References

### Task 1: What is a Multimodal Model
- https://example.com/multimodal-model-definition
...

### Task 2: What are the Latest Multimodal Models
- https://example.com/gpt4v
...
...

### 14.5.3 Report Generation Service

`ReportingService` is responsible for calling the report generation Agent to integrate the summaries of all subtasks. This is the last step of the research process, generating the final research report.

Its responsibilities are:

1. **Format subtask summaries**: Format all subtask summaries into a unified format
2. **Build report Prompt**: Build Prompt based on research topic and subtask summaries
3. **Call report Agent**: Call Report Writer Agent to generate final report
4. **Organize citations**: Organize all source citations into the references section

**Core Code Implementation**:

```python
from typing import List, Callable, Optional, Tuple

from hello_agents import HelloAgentsLLM
from hello_agents import ToolAwareSimpleAgent
from models import TodoItem
from prompts import report_writer_instructions

class ReportingService:
    """Report generation service"""

    def __init__(
        self,
        llm: HelloAgentsLLM,
        tool_call_listener: Optional[Callable] = None
    ):
        self._llm = llm
        self._tool_call_listener = tool_call_listener

        # Create report Agent
        self._agent = ToolAwareSimpleAgent(
            name="Report Writer",
            system_prompt="You are a report writing expert, skilled at integrating information and generating structured reports.",
            llm=llm,
            tool_call_listener=tool_call_listener
        )

    def generate_report(
        self,
        research_topic: str,
        task_summaries: List[Tuple[TodoItem, str, List[str]]]
    ) -> str:
        """Generate final report

        Args:
            research_topic: Research topic
            task_summaries: Subtask summary list, each element is (task, summary, source URL list)

        Returns:
            Final report (Markdown format)
        """
        # Format subtask summaries
        formatted_summaries = self._format_summaries(task_summaries)

        # Build Prompt
        prompt = report_writer_instructions.format(
            research_topic=research_topic,
            task_summaries=formatted_summaries,
        )

        # Call Agent
        report = self._agent.run(prompt)

        return report

    def _format_summaries(
        self,
        task_summaries: List[Tuple[TodoItem, str, List[str]]]
    ) -> str:
        """Format subtask summaries

        Format all subtask summaries into a unified format, including:
        - Task serial number
        - Task title
        - Task intent
        - Summary content
        - Source URLs
        """
        formatted = []
        for idx, (task, summary, source_urls) in enumerate(task_summaries, start=1):
            formatted.append(
                f"## Task {idx}: {task.title}\n\n"
                f"**Intent**: {task.intent}\n\n"
                f"{summary}\n\n"
                f"**Sources**:\n"
            )
            for url in source_urls:
                formatted.append(f"- {url}\n")
            formatted.append("\n")

        return "".join(formatted)
```

### 14.5.4 Search Scheduling Service

`SearchService` is responsible for scheduling search engines, executing searches, and returning results. This is the bridge connecting Agents and SearchTool. Here we did not adopt the usual form of having SimpleAgent directly call tools, but instead return the execution results of SearchTool to the Agent through an intermediate layer, which makes the Agent more focused on processing the obtained information.

Its responsibilities are:

1. **Schedule search engine**: Select search engine based on configuration
2. **Execute search**: Call SearchTool to execute search
3. **Process results**: Deduplicate, limit tokens, format
4. **Error handling**: Handle search failure situations

Core code:

```python
from typing import List, Optional
import logging

from hello_agents.tools import SearchTool
from config import Configuration

logger = logging.getLogger(__name__)

class SearchService:
    """Search scheduling service"""

    def __init__(self, config: Configuration):
        self.config = config

        # Create SearchTool
        self.search_tool = SearchTool(backend="hybrid")

    def search(
        self,
        query: str,
        max_results: int = 5
    ) -> List[dict]:
        """Execute search

        Args:
            query: Search query
            max_results: Maximum number of results

        Returns:
            Search results list
        """
        try:
            # Call SearchTool
            raw_response = self.search_tool.run({
                "input": query,
                "backend": self.config.search_api.value,
                "mode": "structured",
                "max_results": max_results
            })

            # Extract results
            results = raw_response.get("results", [])

            # Process results
            results = self._deduplicate_sources(results)
            results = self._limit_source_tokens(results)

            logger.info(f"Search successful: {query}, returned {len(results)} results")

            return results

        except Exception as e:
            logger.error(f"Search failed: {query}, error: {e}")
            return []

    def _deduplicate_sources(self, sources: List[dict]) -> List[dict]:
        """Remove duplicate URLs"""
        seen_urls = set()
        unique_sources = []

        for source in sources:
            url = source.get("url", "")
            if url and url not in seen_urls:
                seen_urls.add(url)
                unique_sources.append(source)

        return unique_sources

    def _limit_source_tokens(
        self,
        sources: List[dict],
        max_tokens_per_source: int = 2000
    ) -> List[dict]:
        """Limit the number of tokens per source"""
        limited_sources = []

        for source in sources:
            snippet = source.get("snippet", "")

            # Simple token estimation: 1 token is approximately 4 characters
            max_chars = max_tokens_per_source * 4

            if len(snippet) > max_chars:
                snippet = snippet[:max_chars] + "..."

            limited_sources.append({
                **source,
                "snippet": snippet
            })

        return limited_sources
```

Select search engine based on configuration, as shown in Figure 14.8:

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/Hello-Agents/main/docs/images/14-figures/14-8.png" alt="" width="85%"/>
  <p>Figure 14.8 Search Engine Scheduling Process</p>

**Scheduling Logic**:

1. **Read configuration**: Read `SEARCH_API` configuration from `.env` file
2. **Select engine**: Select search engine based on configuration (tavily, duckduckgo, perplexity, etc.)
3. **Execute search**: Call SearchTool to execute search
4. **Process results**: Deduplicate, limit tokens, format
5. **Return results**: Return processed search results

To improve efficiency and reduce costs, we can add search result caching:

```python
import hashlib
import json
from pathlib import Path

class SearchService:
    def __init__(self, config: Configuration):
        self.config = config
        self.search_tool = SearchTool(backend="hybrid")

        # Cache directory
        self.cache_dir = Path("./cache/search")
        self.cache_dir.mkdir(parents=True, exist_ok=True)

    def search(
        self,
        query: str,
        max_results: int = 5,
        use_cache: bool = True
    ) -> List[dict]:
        """Execute search (with cache)"""
        # Generate cache key
        cache_key = self._generate_cache_key(query, max_results)
        cache_file = self.cache_dir / f"{cache_key}.json"

        # Try to read from cache
        if use_cache and cache_file.exists():
            logger.info(f"Reading search results from cache: {query}")
            with open(cache_file, "r", encoding="utf-8") as f:
                return json.load(f)

        # Execute search
        results = self._execute_search(query, max_results)

        # Save to cache
        if use_cache and results:
            with open(cache_file, "w", encoding="utf-8") as f:
                json.dump(results, f, ensure_ascii=False, indent=2)

        return results

    def _generate_cache_key(self, query: str, max_results: int) -> str:
        """Generate cache key"""
        # Generate MD5 hash using query and max results
        content = f"{query}_{max_results}_{self.config.search_api.value}"
        return hashlib.md5(content.encode()).hexdigest()
```

Through four core services (PlanningService, SummarizationService, ReportingService, SearchService), we built a complete research process. These services each perform their duties and collaborate through clear interfaces, achieving an automated process from research topic to final report.
