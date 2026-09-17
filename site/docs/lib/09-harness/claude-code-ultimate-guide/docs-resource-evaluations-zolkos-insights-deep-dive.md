---
title: "Evaluation: Rob Zolkos - Deep Dive: How Claude Code's /insights Command Works"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/zolkos-insights-deep-dive.md"
sourceRel: "docs/resource-evaluations/zolkos-insights-deep-dive.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/docs/resource-evaluations/zolkos-insights-deep-dive.md"
sourceSha256: "4b2f08c7a38e85f19e4294b2a38d239361dc8ca011460e0ba8576952bc188c84"
pageSha256: "4b2f08c7a38e85f19e4294b2a38d239361dc8ca011460e0ba8576952bc188c84"
contentMode: "local-full"
zh: ""
---

# Evaluation: Rob Zolkos - Deep Dive: How Claude Code's /insights Command Works

**Resource Type**: Blog Article (Technical Deep Dive)
**Author**: Rob Zolkos (@zolkos)
**Date**: 2026-02-04
**URL**: https://www.zolkos.com/2026/02/04/deep-dive-how-claude-codes-insights-command-works.html
**Evaluation Date**: 2026-02-06
**Evaluator**: Claude Sonnet 4.5

---

## 1. Content Summary

Technical deep dive documenting the architecture and implementation of Claude Code's `/insights` command. Comprehensive coverage of the analysis pipeline, facets classification system, and technical specifications.

**Key Content**:
- **7-stage analysis pipeline** (session filtering → transcript summarization → facet extraction → aggregated analysis → executive summary → report generation)
- **Facets classification system** (13 goal types, 6 satisfaction levels, 4 outcome states, 12 friction types, 5 helpfulness scale, 5 session types, 7 success categories)
- **Technical specifications** (Claude Haiku, 8,192 max tokens, 50 sessions per run, caching system, storage locations)
- **Analysis features** (repeated instructions detection, pattern identification, feature recommendations)
- **Privacy & performance** (local analysis, facet caching, code pattern focus vs content)

**Depth**: ~1,500 words, technical specification level (not user tutorial)

---

## 2. Initial Scoring: 4/5 (High Value)

| Score | Signification | Action |
|-------|---------------|--------|
| 5 | Critical - Must integrate immediately | < 24h |
| **4** | **High Value - Major improvement** | **< 1 week** |
| 3 | Moderate - Useful addition | When time available |
| 2 | Marginal - Secondary info | Minimal mention or skip |
| 1 | Low - Reject | - |

### Justification

**Points forts**:
- ✅ **Comprehensive technical architecture** - 7-stage pipeline fully documented
- ✅ **Facets system detailed** - All classification categories enumerated (13 goals, 12 friction types, 7 success categories)
- ✅ **Actionable specifications** - Storage paths, model details, token limits, caching behavior
- ✅ **Implementation depth** - Explains chunking (25K chars), filtering rules (min 2 messages, 1 min duration), caching strategy
- ✅ **Fills major guide gap** - `/insights` was completely undocumented before this
- ✅ **Source credibility** - Technical deep dive, not marketing content

**Comparaison avec post Kajan**:
- Post Kajan (2/5): "ça existe, teste-le" = 0% technique
- Deep dive Zolkos (4/5): Pipeline + facets + specs + caching = 95% technique

**Pourquoi 4/5 et pas 5/5**:
- ❌ Pas de screenshots du rapport HTML (décrit mais pas montré)
- ❌ Pas d'exemples de prompts utilisés pour l'analyse
- ❌ Pas de guidance utilisateur (comment interpréter le rapport, quelles actions prendre)
- ❌ Aucune mention de limitations ou edge cases
- ⚠️ Discrepancy: Says "max 4,096 output tokens" in Stage 3 but "8,192 max tokens" in specs (need to verify which is correct)

**Score 4/5** = High value technical resource qui mérite intégration rapide, mais pas critique (5/5) car manque guidance utilisateur et exemples visuels.

---

## 3. Comparative Analysis

### Comparison avec notre guide (v3.23.1, post-documentation)

| Aspect | Deep dive Zolkos | Notre guide (après doc /insights) |
|--------|------------------|-----------------------------------|
| **Pipeline architecture** | ✅ 7 étapes détaillées | ⚠️ Mentionné génériquement (pas détaillé) |
| **Facets system** | ✅ 13 goals, 12 friction types, 7 success, 6 satisfaction | ❌ Non documenté |
| **Technical specs** | ✅ Haiku, 8192 tokens, 50 sessions, storage paths | ✅ Documenté (basé sur usage réel) |
