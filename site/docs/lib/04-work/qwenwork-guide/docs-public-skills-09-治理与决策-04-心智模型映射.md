---
title: "Mental Model Mapper"
sourceId: "04-work/qwenwork-guide"
sourceTitle: "千问办公绿皮书（QwenWorkGuide）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/wangxiaoshuai1998/QwenWorkGuide"
entryUrl: "https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/09-治理与决策/04-心智模型映射.md"
sourceRel: "docs/public/skills/09-治理与决策/04-心智模型映射.md"
rawUrl: "/raw/04-work/qwenwork-guide/docs/public/skills/09-治理与决策/04-心智模型映射.md"
sourceSha256: "6b0234c7866f8ee0464c0c1bb2e84766d05cbff39e14f131ae484f8a0b24a63f"
pageSha256: "6b0234c7866f8ee0464c0c1bb2e84766d05cbff39e14f131ae484f8a0b24a63f"
contentMode: "local-full"
zh: ""
---

# Mental Model Mapper

## What This Skill Does

Surfaces the beliefs, assumptions, stories, values, identities, fears, and definitions of success that shape a system. A mental model is not merely an opinion. It is a way of interpreting reality that influences what people notice, what they treat as normal, what they design for, and what they consider possible.

This skill is useful after an iceberg, inside an aspirational iceberg, during conflict reflection, when redesigning curriculum, or when examining culture. It helps students and adults say: "What are we assuming? What story is operating here? What structures does that story keep alive? What alternative model might be more compassionate, systemic, or regenerative?"

## Evidence Foundation

Senge identifies mental models as deeply held assumptions that shape organisational behaviour. Argyris and Schön distinguish between espoused theories (what people say guides them) and theories-in-use (what their actions reveal). Meadows identifies paradigms and goals as deep leverage points in systems. Bang, Medin and Atran show that mental models of nature differ across cultural communities and shape ecological reasoning, making this tool especially important for place-based and regenerative work.

## Input Schema

Required:
- **System focus:** The issue, aspiration, conflict, curriculum area, or place-based system.
- **Context:** Where this is happening and who is involved.

Optional:
- **Visible evidence:** Language, routines, artefacts, decisions, student work, interactions, or observations.
- **Stakeholders:** Whose models may need mapping.
- **Purpose:** Reflection, redesign, conflict repair, curriculum planning, or action.

## Prompt

```text
You are mapping mental models in a compassionate systems-aware way. Your task is to surface possible beliefs and assumptions shaping a system without accusing people of holding them.

Inputs:
System focus: {{system_focus}}
Context: {{context}}
Visible evidence: {{visible_evidence}}
Stakeholders: {{stakeholders}}
Purpose: {{purpose}}

Rules:
1. Treat every mental model as a hypothesis, not a verdict.
2. Distinguish espoused models from models-in-use:
   - Espoused model: what people say they believe.
   - Model-in-use: what routines, decisions, incentives, or artefacts imply.
3. Include multiple stakeholders. Different groups may hold different models for good reasons.
4. Link each mental model to visible structures or patterns. Do not list abstract beliefs without consequences.
5. Name possible protective functions. Some limiting models may have developed to protect safety, efficiency, identity, status, or belonging.
6. Propose alternative models that are believable, not just virtuous slogans.
7. Use careful language: "A possible model is..." / "The system may be acting as if..." / "One story that might be present..."

Return exactly:

## Mental Model Map: [System Focus]

**Context:** [brief]
**Purpose:** [reflection/redesign/repair/action]
**Stance:** Mental models are hypotheses to test through evidence and dialogue.

### Visible Clues
- **Language clues:** [phrases, labels, metaphors]
- **Routine clues:** [what keeps happening]
- **Artefact clues:** [policies, displays, tools, forms, spaces]
- **Decision clues:** [what gets prioritised]

### Current Mental Models That May Be Operating
For each:
**Model [N]: [short name]**
- **Possible belief/story:** [belief]
- **May be held by:** [stakeholder/s or "the system as a whole"]
- **Evidence suggesting it:** [visible clues]
- **Structures it sustains:** [rules, routines, roles, incentives, artefacts]
- **Patterns it produces:** [repeated behaviours]
- **Protective function:** [what this model might be trying to protect]
- **Risk or harm:** [what it may constrain or damage]
- **Evidence needed before concluding:** [what to ask/observe]

### Aspirational or Alternative Mental Models
For each:
**Alternative model:** [belief/story]
- **Why it may be more compassionate/systemic/regenerative:** [reason]
- **What structures would make it credible:** [routines, roles, artefacts, experiences]
- **First practice that could embody it:** [small action]

### Dialogue Prompts
- [Question that invites reflection without blame]
- [Question that helps students/adults test evidence]
- [Question that opens alternative possibilities]

### Safer Language Guide
Instead of: "People believe..."
Say: "The system may be acting as if..."
Instead of: "Students don't care..."
Say: "One possible story is that students have learned their contribution does not change anything. What evidence would test that?"

Self-check: Do not claim to know what people believe. Do not moralise mental models. Link models to structures and patterns. Include alternative models plus the structures needed to make them real.
```

## Common Pitfalls

1. **Mind-reading.** We infer mental models from evidence; we do not declare what someone secretly believes.
2. **Moralising.** Mental models are not sins. They are often adaptive responses to lived conditions.
3. **Only mapping negative models.** Aspirational models need mapping too.
4. **Ignoring culture.** Mental models may be culturally situated; do not universalise one worldview.
5. **Changing language without changing structures.** A new story needs routines and artefacts that make it believable.

## Known Limitations

1. **Cannot confirm what people actually believe.** All mental models are inferences from visible evidence — language, routines, artefacts, decisions. The skill produces hypotheses, not confirmed beliefs. Do not present outputs as psychological assessments of named individuals.
2. **Degrades without visible evidence.** When there is limited observable evidence of the system in action, the mapper cannot generate credible hypotheses. It needs clues to work from.
3. **Does not surface power dynamics automatically.** Some mental models are enforced by people with institutional authority, not just held individually. This distinction matters for action design and must be named explicitly by the teacher.
4. **Not suitable as a live classroom exercise without careful facilitation planning.** When students are present and could recognise themselves or peers in the mental model map, psychological safety planning is required before use.

## Verification Checklist

- [ ] Mental models are labelled as hypotheses.
- [ ] Each model links to visible evidence.
- [ ] Each model links to structures and patterns.
- [ ] Protective functions are considered.
- [ ] Alternative models include enabling structures.
- [ ] Dialogue prompts are safe enough for classroom or staff use.
