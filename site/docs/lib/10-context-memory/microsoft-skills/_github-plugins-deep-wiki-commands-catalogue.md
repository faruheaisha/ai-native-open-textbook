---
title: "Deep Wiki: Catalogue Generation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/commands/catalogue.md"
sourceRel: ".github/plugins/deep-wiki/commands/catalogue.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/deep-wiki/commands/catalogue.md"
sourceSha256: "bb1eb90015b59cbbc091a34425887874063bb0017e2447779f315b1079cb78c9"
pageSha256: "bb1eb90015b59cbbc091a34425887874063bb0017e2447779f315b1079cb78c9"
contentMode: "local-full"
zh: ""
---

# Deep Wiki: Catalogue Generation

Analyze this repository and generate a hierarchical JSON documentation structure.

## Source Repository Resolution (MUST DO FIRST)

Before any analysis, resolve the source repository context:

1. **Check for git remote**: Run `git remote get-url origin`
2. **Ask the user**: _"Is this a local-only repository, or do you have a source repository URL?"_
   - Remote URL → store as `REPO_URL`, use linked citations: `[file:line](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/deep-wiki/commands/REPO_URL/blob/BRANCH/file/README.md#Lline)`
   - Local → use `(file_path:line_number)`
3. **Determine default branch**: Run `git rev-parse --abbrev-ref HEAD`
4. **Do NOT proceed** until resolved

## Analysis Phase

1. Read the repository file tree and README
2. Detect project type, language composition, frameworks
3. Identify architectural layers and module boundaries
4. Map key components, services, controllers, and their relationships

## Output Requirements

Generate a JSON structure following this schema:

```json
{
  "items": [
    {
      "title": "getting-started",
      "name": "[Derived from project]",
      "prompt": "[Generation instruction]",
      "children": [
        {
          "title": "[auto-derived]",
          "name": "[Section Name]",
          "prompt": "[1-3 sentence instruction with file citations]",
          "children": []
        }
      ]
    },
    {
      "title": "deep-dive",
      "name": "[Derived from project]",
      "prompt": "[Generation instruction]",
      "children": []
    }
  ]
}
```

### Rules

- Max nesting depth: 4; ≤8 children per section
- Cite real files using the resolved citation format (linked or local) in every prompt
- Getting Started: overview, setup, basic usage, quick reference
- Deep Dive layers: Architecture → Subsystems → Components → Key methods/interfaces
- Component analysis: classes, services, controllers; dependencies; design patterns (Repository, Factory, Strategy, Observer)
- Small repo mode (≤10 files): Getting Started only, 1-2 children, skip Deep Dive

$ARGUMENTS
