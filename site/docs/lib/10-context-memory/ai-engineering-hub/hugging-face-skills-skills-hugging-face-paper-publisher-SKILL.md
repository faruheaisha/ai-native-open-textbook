---
title: "Overview"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/hugging-face-paper-publisher/SKILL.md"
sourceRel: "hugging-face-skills/skills/hugging-face-paper-publisher/SKILL.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/skills/hugging-face-paper-publisher/SKILL.md"
sourceSha256: "7d853c4521ef898c857d6a9eedec264987ba865360896db8fd9bdbbc35ef1579"
pageSha256: "7d853c4521ef898c857d6a9eedec264987ba865360896db8fd9bdbbc35ef1579"
contentMode: "local-full"
zh: ""
---

# Overview
This skill provides comprehensive tools for AI engineers and researchers to publish, manage, and link research papers on the Hugging Face Hub. It streamlines the workflow from paper creation to publication, including integration with arXiv, model/dataset linking, and authorship management.

## Integration with HF Ecosystem
- **Paper Pages**: Index and discover papers on Hugging Face Hub
- **arXiv Integration**: Automatic paper indexing from arXiv IDs
- **Model/Dataset Linking**: Connect papers to relevant artifacts through metadata
- **Authorship Verification**: Claim and verify paper authorship
- **Research Article Template**: Generate professional, modern scientific papers

# Version
1.0.0

# Dependencies
- huggingface_hub>=0.26.0
- pyyaml>=6.0.3
- requests>=2.32.5
- markdown>=3.5.0
- python-dotenv>=1.2.1

# Core Capabilities

## 1. Paper Page Management
- **Index Papers**: Add papers to Hugging Face from arXiv
- **Claim Authorship**: Verify and claim authorship on published papers
- **Manage Visibility**: Control which papers appear on your profile
- **Paper Discovery**: Find and explore papers in the HF ecosystem

## 2. Link Papers to Artifacts
- **Model Cards**: Add paper citations to model metadata
- **Dataset Cards**: Link papers to datasets via README
- **Automatic Tagging**: Hub auto-generates arxiv:&lt;PAPER_ID> tags
- **Citation Management**: Maintain proper attribution and references

## 3. Research Article Creation
- **Markdown Templates**: Generate professional paper formatting
- **Modern Design**: Clean, readable research article layouts
- **Dynamic TOC**: Automatic table of contents generation
- **Section Structure**: Standard scientific paper organization
- **LaTeX Math**: Support for equations and technical notation

## 4. Metadata Management
- **YAML Frontmatter**: Proper model/dataset card metadata
- **Citation Tracking**: Maintain paper references across repositories
- **Version Control**: Track paper updates and revisions
- **Multi-Paper Support**: Link multiple papers to single artifacts

# Usage Instructions

The skill includes Python scripts in `scripts/` for paper publishing operations.

### Prerequisites
- Install dependencies: `uv add huggingface_hub pyyaml requests markdown python-dotenv`
- Set `HF_TOKEN` environment variable with Write-access token
- Activate virtual environment: `source .venv/bin/activate`

### Method 1: Index Paper from arXiv

Add a paper to Hugging Face Paper Pages from arXiv.

**Basic Usage:**
```bash
python scripts/paper_manager.py index \
  --arxiv-id "2301.12345"
```

**Check If Paper Exists:**
```bash
python scripts/paper_manager.py check \
  --arxiv-id "2301.12345"
```

**Direct URL Access:**
You can also visit `https://huggingface.co/papers/\{arxiv-id\}` directly to index a paper.

### Method 2: Link Paper to Model/Dataset

Add paper references to model or dataset README with proper YAML metadata.

**Add to Model Card:**
```bash
python scripts/paper_manager.py link \
  --repo-id "username/model-name" \
  --repo-type "model" \
  --arxiv-id "2301.12345"
```

**Add to Dataset Card:**
```bash
python scripts/paper_manager.py link \
  --repo-id "username/dataset-name" \
  --repo-type "dataset" \
  --arxiv-id "2301.12345"
```

**Add Multiple Papers:**
```bash
python scripts/paper_manager.py link \
  --repo-id "username/model-name" \
  --repo-type "model" \
  --arxiv-ids "2301.12345,2302.67890,2303.11111"
```

**With Custom Citation:**
```bash
python scripts/paper_manager.py link \
  --repo-id "username/model-name" \
  --repo-type "model" \
  --arxiv-id "2301.12345" \
  --citation "$(cat citation.txt)"
```

#### How Linking Works

When you add an arXiv paper link to a model or dataset README:
1. The Hub extracts the arXiv ID from the link
2. A tag `arxiv:<PAPER_ID>` is automatically added to the repository
3. Users can click the tag to view the Paper Page
4. The Paper Page shows all models/datasets citing this paper
5. Papers are discoverable through filters and search

### Method 3: Claim Authorship

Verify your authorship on papers published on Hugging Face.

**Start Claim Process:**
```bash
python scripts/paper_manager.py claim \
  --arxiv-id "2301.12345" \
  --email "your.email@institution.edu"
```

**Manual Process:**
1. Navigate to your paper's page: `https://huggingface.co/papers/\{arxiv-id\}`
2. Find your name in the author list
3. Click your name and select "Claim authorship"
4. Wait for admin team verification

**Check Authorship Status:**
```bash
python scripts/paper_manager.py check-authorship \
  --arxiv-id "2301.12345"
```

### Method 4: Manage Paper Visibility

Control which verified papers appear on your public profile.

**List Your Papers:**
```bash
python scripts/paper_manager.py list-my-papers
```

**Toggle Visibility:**
```bash
python scripts/paper_manager.py toggle-visibility \
  --arxiv-id "2301.12345" \
  --show true
```

**Manage in Settings:**
Navigate to your account settings → Papers section to toggle "Show on profile" for each paper.

### Method 5: Create Research Article

Generate a professional markdown-based research paper using modern templates.

**Create from Template:**
```bash
python scripts/paper_manager.py create \
  --template "standard" \
  --title "Your Paper Title" \
  --output "paper.md"
```

**Available Templates:**
- `standard` - Traditional scientific paper structure
- `modern` - Clean, web-friendly format inspired by Distill
- `arxiv` - arXiv-style formatting
- `ml-report` - Machine learning experiment report

**Generate Complete Paper:**
```bash
python scripts/paper_manager.py create \
  --template "modern" \
  --title "Fine-Tuning Large Language Models with LoRA" \
  --authors "Jane Doe, John Smith" \
  --abstract "$(cat abstract.txt)" \
  --output "paper.md"
```

**Convert to HTML:**
```bash
python scripts/paper_manager.py convert \
  --input "paper.md" \
  --output "paper.html" \
  --style "modern"
```

### Paper Template Structure

**Standard Research Paper Sections:**
```markdown
---
title: Your Paper Title
authors: Jane Doe, John Smith
affiliations: University X, Lab Y
date: 2025-01-15
arxiv: 2301.12345
tags: [machine-learning, nlp, fine-tuning]
---

# Abstract
Brief summary of the paper...

# 1. Introduction
Background and motivation...

# 2. Related Work
Previous research and context...

# 3. Methodology
Approach and implementation...

# 4. Experiments
Setup, datasets, and procedures...

# 5. Results
Findings and analysis...

# 6. Discussion
Interpretation and implications...

# 7. Conclusion
Summary and future work...

# References
```

**Modern Template Features:**
- Dynamic table of contents
- Responsive design for web viewing
- Code syntax highlighting
- Interactive figures and charts
- Math equation rendering (LaTeX)
- Citation management
- Author affiliation linking

### Commands Reference

**Index Paper:**
```bash
python scripts/paper_manager.py index --arxiv-id "2301.12345"
```

**Link to Repository:**
```bash
python scripts/paper_manager.py link \
  --repo-id "username/repo-name" \
  --repo-type "model|dataset|space" \
  --arxiv-id "2301.12345" \
  [--citation "Full citation text"] \
  [--create-pr]
```

**Claim Authorship:**
```bash
python scripts/paper_manager.py claim \
  --arxiv-id "2301.12345" \
  --email "your.email@edu"
```

**Manage Visibility:**
```bash
python scripts/paper_manager.py toggle-visibility \
  --arxiv-id "2301.12345" \
  --show true|false
```

**Create Research Article:**
```bash
python scripts/paper_manager.py create \
  --template "standard|modern|arxiv|ml-report" \
  --title "Paper Title" \
  [--authors "Author1, Author2"] \
  [--abstract "Abstract text"] \
  [--output "filename.md"]
```

**Convert Markdown to HTML:**
```bash
python scripts/paper_manager.py convert \
  --input "paper.md" \
  --output "paper.html" \
  [--style "modern|classic"]
```

**Check Paper Status:**
```bash
python scripts/paper_manager.py check --arxiv-id "2301.12345"
```

**List Your Papers:**
```bash
python scripts/paper_manager.py list-my-papers
```

**Search Papers:**
```bash
python scripts/paper_manager.py search --query "transformer attention"
```

### YAML Metadata Format

When linking papers to models or datasets, proper YAML frontmatter is required:

**Model Card Example:**
```yaml
---
language:
  - en
license: apache-2.0
tags:
  - text-generation
  - transformers
  - llm
library_name: transformers
---

# Model Name

This model is based on the approach described in [Our Paper](https://arxiv.org/abs/2301.12345).
