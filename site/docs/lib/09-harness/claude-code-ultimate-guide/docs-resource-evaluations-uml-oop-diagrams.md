---
title: "Évaluation: UML Diagrams for OOP Codebases"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/uml-oop-diagrams.md"
sourceRel: "docs/resource-evaluations/uml-oop-diagrams.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/docs/resource-evaluations/uml-oop-diagrams.md"
sourceSha256: "96d1a5c2f37858d9c9a6628699df5fa329baaabce18779ed0506d34018437e62"
pageSha256: "96d1a5c2f37858d9c9a6628699df5fa329baaabce18779ed0506d34018437e62"
contentMode: "local-full"
zh: ""
---

# Évaluation: UML Diagrams for OOP Codebases

**Date**: 2026-01-25
**Source**: LinkedIn Post - Dennis Piskovatskov
**URL**: https://www.linkedin.com/posts/tigraff_uml-claude-wibecoding-activity-7420595633826258944-gGO5
**Score**: 3/5 (Pertinent - Complément utile)

## Résumé

Pattern suggéré : utiliser des diagrammes d'architecture (UML/Mermaid) comme contexte additionnel pour les codebases OOP complexes, afin de compenser les limitations des LLMs dans le raisonnement sur la polymorphie et les dépendances.

## Validations

### ✅ Problème OOP confirmé

**ACM 2024 Research**: [LLMs Still Can't Avoid Instanceof](https://dl.acm.org/doi/10.1145/3639474.3640052)
- Confirme que les LLMs ont des difficultés avec le raisonnement polymorphique
- Le chunking de fichiers perd les relations structurelles (hiérarchies de classes, implémentations d'interfaces, dépendances cross-module)

### ✅ MCP Tools vérifiés

**Archy MCP** (phxdev1, April 2025):
- URL: https://www.pulsemcp.com/servers/phxdev1-archy
- Auto-génère Mermaid depuis GitHub repos ou descriptions textuelles
- Supporte: flowcharts, class diagrams, sequence diagrams

**Mermaid MCP** (hustcc):
- 61.4K utilisateurs
- Thèmes personnalisés, couleurs de fond, rendu temps réel

**Blueprint MCP** (ArcadeAI):
- Descriptions textuelles → diagrammes techniques
- Gestion de jobs asynchrones

### ⚠️ Source originale non vérifiable

**WibeCoding**: Mentionné dans le post LinkedIn mais non trouvé publiquement
**Contexte**: Pattern reporté sur un projet Java/Spring
**Limitation**: Non validé à grande échelle

## Intégration

### Approches identifiées

| Approche | Maintenance | Coût Token | Meilleur pour |
|----------|-------------|------------|---------------|
| **Archy MCP** | Zéro (auto-gen) | À la demande | GitHub repos avec hiérarchies de classes |
| **Inline Mermaid** | Manuel | 200-500 tokens | Vues architecturales personnalisées |
| **PlantUML ref** | Manuel | Minimal | Intégration entreprise/IDE |

### Workflow recommandé

1. **Essayer Serena d'abord**: `get_symbols_overview` + `find_symbol` (zéro maintenance)
2. **Si insuffisant**: Utiliser **Archy MCP** pour auto-générer des class diagrams
3. **Dernier recours**: Mermaid manuel inline pour vues personnalisées

### Cas d'usage

- Codebases OOP >20 modules avec héritage complexe
- Projets Java/Spring avec polymorphisme profond
- Quand l'overview de symboles Serena est insuffisant

## Key Insight

> "Context structure matters more than context size" — Les relations explicites améliorent le raisonnement LLM sur les architectures OOP.

## Trade-offs

**Avantages**:
- ✅ MCP tools auto-génération (zéro maintenance avec Archy)
- ✅ Validation académique du problème (ACM 2024)
- ✅ Alternative Serena disponible (zéro maintenance également)

**Limitations**:
- ⚠️ Source originale (WibeCoding) non trouvée publiquement
- ⚠️ Pattern non validé à grande échelle
- ⚠️ Coût token pour inline Mermaid (200-500 tokens)

## Conclusion

**Décision**: Intégration avec nuances
- Section ajoutée dans `guide/ecosystem/ai-ecosystem.md` (Context Packing Tools)
- Warning clair sur validation limitée
- Recommandation de workflow: Serena → Archy → Manual
- Référencement des MCP tools vérifiés publiquement

**Raison du score 3/5**: Pattern utile pour cas spécifiques (OOP complexe), mais pas une solution universelle. L'alternative Serena + grepai peut atteindre des résultats similaires avec zéro maintenance.
