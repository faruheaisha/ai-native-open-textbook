---
title: "Research & Documentation Skill Evaluations"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/notion-research-documentation/evaluations/README.md"
sourceRel: "skills/.curated/notion-research-documentation/evaluations/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/notion-research-documentation/evaluations/README.md"
sourceSha256: "3b4e26d61cf17f9357e5a80f90da662f3d858294f69cad5e94c620bf1ce29455"
pageSha256: "3b4e26d61cf17f9357e5a80f90da662f3d858294f69cad5e94c620bf1ce29455"
contentMode: "local-full"
zh: ""
---

# Research & Documentation Skill Evaluations

Evaluation scenarios for testing the Research & Documentation skill across different Codex models.

## Purpose

These evaluations ensure the Research & Documentation skill:
- Searches across Notion workspace effectively
- Synthesizes information from multiple sources
- Selects appropriate research report format
- Creates comprehensive documentation with proper citations
- Works consistently across Haiku, Sonnet, and Opus

## Evaluation Files

### basic-research.json
Tests basic research workflow with synthesis across multiple Notion pages.

**Scenario**: Research Q4 product roadmap and create summary  
**Key Behaviors**:
- Searches Notion for roadmap-related pages
- Fetches multiple relevant pages (roadmap, product docs, meeting notes)
- Synthesizes information from different sources
- Selects appropriate format (Research Summary)
- Includes citations linking back to source pages
- Creates structured document with clear sections

### research-to-database.json
Tests creating research documentation in a Notion database with properties.

**Scenario**: Research competitor landscape and save to Research database  
**Key Behaviors**:
- Searches for existing competitive intelligence in Notion
- Identifies Research database as target
- Fetches database schema to understand properties
- Creates page with correct property values (Research Type, Status, Date, etc.)
- Structures content with comparison format
- Includes source citations for both Notion pages and external research

## Running Evaluations

1. Enable the `research-documentation` skill
2. Submit the query from the evaluation file
3. Verify the skill searches Notion workspace comprehensively
4. Check that multiple source pages are fetched and synthesized
5. Verify appropriate format is selected (Research Summary, Comprehensive Report, Quick Brief, Comparison)
6. Confirm citations link back to sources
7. Test with Haiku, Sonnet, and Opus

## Expected Skill Behaviors

Research & Documentation evaluations should verify:

### Notion Search & Synthesis
- Searches workspace with relevant queries
- Fetches multiple source pages (3-5+)
- Synthesizes information across sources
- Identifies patterns and insights
- Handles conflicting information appropriately

### Format Selection
- Chooses correct format based on scope and depth:
  - **Research Summary**: Quick overview with key findings
  - **Comprehensive Report**: Deep analysis with multiple sections
  - **Quick Brief**: Fast facts and takeaways
  - **Comparison**: Side-by-side analysis
- Applies format structure consistently
- Uses appropriate sections and headings
