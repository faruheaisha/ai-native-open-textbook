---
title: "SE-CoVe: Chain-of-Verification"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/plugins/se-cove.md"
sourceRel: "examples/plugins/se-cove.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/plugins/se-cove.md"
sourceSha256: "1907342f45b88ddbf022fa8b15264c1186e0d3832903fba83df6b3f464b2e711"
pageSha256: "1907342f45b88ddbf022fa8b15264c1186e0d3832903fba83df6b3f464b2e711"
contentMode: "local-full"
zh: ""
---

# SE-CoVe: Chain-of-Verification

Software Engineering adaptation of Meta's Chain-of-Verification methodology for Claude Code.

## Research Foundation

**Paper**: "Chain-of-Verification Reduces Hallucination in Large Language Models"
**Authors**: Dhuliawala et al. (Meta AI)
**Published**: ACL 2024 Findings
**Sources**: [arXiv:2309.11495](https://arxiv.org/abs/2309.11495) | [ACL Anthology](https://aclanthology.org/2024.findings-acl.212/)

## How It Works

5-stage pipeline ensuring independent verification:

1. **Baseline**: Generate initial solution
2. **Planner**: Create verification questions from solution claims
3. **Executor**: Answer questions independently (never sees baseline)
4. **Synthesizer**: Compare findings, identify discrepancies
5. **Output**: Produce verified solution

**Critical innovation**: Verifier operates without access to draft code, preventing confirmation bias.

## Performance Metrics

Results from Meta's research paper (Llama 65B model):

| Task Type | Metric | Improvement | Computational Cost |
|-----------|--------|-------------|-------------------|
| Biography generation | FACTSCORE | +28% (55.9→71.4) | -26% output volume (16.6→12.3 facts) |
| Closed-book QA | F1 Score | +23% (0.39→0.48) | ~2x token consumption |
| List-based questions | Precision | +112% (0.17→0.36) | Fewer total answers |

**Source**: Dhuliawala et al., ACL 2024 Findings (Table 1, Section 4.3)

**Key insight**: Higher accuracy comes at cost of increased computation and reduced output volume.

## When to Use

### ✅ Recommended

- **Critical code review**: Architectural decisions, security-sensitive code
- **Complex debugging**: Multi-component failure analysis
- **API/library integration**: When correctness > speed
- **Acceptable 2x cost**: Token budget allows for quality premium

### ❌ Not Recommended

- **Trivial changes**: Simple fixes, formatting, typos
- **Exploratory coding**: Rapid prototyping, experimentation
- **Tight token budgets**: When cost is primary constraint
- **Need comprehensive output**: When you need all facts, not just accurate subset

## Installation

```bash
# Add plugin marketplace
/plugin marketplace add vertti/se-cove-claude-plugin

# Install plugin (in separate command)
/plugin install chain-of-verification
```

**Note**: Commands must be pasted separately (Claude Code marketplace limitation).

## Usage

```bash
# Invoke verification
/chain-of-verification:verify <your question>

# Autocomplete available
/ver<Tab>
```

## Limitations

From the research paper (Section 6):

1. **Not a silver bullet**: Reduces hallucinations but does not eliminate them
2. **Computational cost**: ~2x token usage vs baseline generation (estimated from implementation)
3. **Output volume trade-off**: Generates fewer but more accurate results
4. **Model-specific**: Tested on Llama 65B; generalization to GPT-4/Claude/Sonnet unverified
5. **Task dependency**: Performance varies significantly by task type (23-112%)
6. **Factual hallucinations only**: Does not address incorrect reasoning steps or opinions

## Source Code

- **GitHub**: [vertti/se-cove-claude-plugin](https://github.com/vertti/se-cove-claude-plugin)
- **Version**: 1.1.1 (2026-01-23)
- **License**: MIT
- **Author**: Janne Sinivirta

## Related

- Main guide section: [Plugin System](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#85-plugin-system)
- Methodology: [Multi-Agent Orchestration](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#multi-agent-orchestration-pattern)
- Verification Loops: [Autonomous Iteration](/lib/09-harness/claude-code-ultimate-guide/guide-core-methodologies#tier-5-implementation)
