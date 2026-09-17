---
title: "Zorost AI Fieldwork: Notes (collected from zorost.com/ai-lab/fieldwork, Aug 2026)"
sourceId: "01-foundations/ai-engineering-lab"
sourceTitle: "AI Engineering Lab（24 周自学课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "01-foundations"
sourceUrl: "https://github.com/zorost/AI-Engineering-Lab"
entryUrl: "https://github.com/zorost/AI-Engineering-Lab/blob/cdd8dbdf559f72211a7c068e8877918441531e52/reference/knowledge-base/research/08-zorost-fieldwork-notes.md"
sourceRel: "reference/knowledge-base/research/08-zorost-fieldwork-notes.md"
rawUrl: "/raw/01-foundations/ai-engineering-lab/reference/knowledge-base/research/08-zorost-fieldwork-notes.md"
sourceSha256: "22ae1d92861813a65b24759bd9ad1e7e3baba371b54d560da877f227ea01c769"
pageSha256: "22ae1d92861813a65b24759bd9ad1e7e3baba371b54d560da877f227ea01c769"
contentMode: "local-full"
zh: ""
---

# Zorost AI Fieldwork: Notes (collected from zorost.com/ai-lab/fieldwork, Aug 2026)

> Used for branding and methodology references in the AI Engineering Lab curriculum.

## What it is
"AI Fieldwork is where Zorost evaluates models, agents, and tools on real work,
and builds working experiments to probe what the technology can and cannot do yet.
Each study is dated, evidence-led, and honest about its limits."

- Open source: github.com/zorost/zorost-ai-fieldwork (license per project: Apache-2.0 or proprietary)
- Cadence: numbered in sequence, dated on publication.

## The mandate (P0 tracks)
1. **Models**: test language/domain models on real tasks; record exact version and
   window; report reliability, grounding, and failure modes, not just wins.
2. **Agents**: probe tool use, permission boundaries, recovery, injection resistance.
   "Autonomy is interesting only when it is safe under supervision."
3. **Tools**: put AI tools through real work; write where they help, slow us down,
   and quietly break.
4. **Experiments**: build working concepts that push a technique to its edge;
   publish source + honest engineering account.

## How Zorost reports (adopt this in the program's eval culture)
- **Bounded questions, not leaderboards**: every study states what is tested, who it
  is for, what counts as success / partial success / failure.
- **Evidence you can re-run**: versions, configuration, dates, sample sizes, rubrics.
- **Method references, not certification**: NIST AI RMF, OWASP GenAI guidance,
  UK AISI Inspect, HELM used to structure testing.
- **Honest by default**: failures named as clearly as wins; never call a system
  safe/compliant/best on a single test.
- Motto: "We publish the method, the measurements, and the misses."

## Published work (examples)
- **Aerolex (FW-07, Field Report + Experiment)**: hangar encyclopedia of 265 aircraft
  types: ICAO designators, published overall size, generated models, class essays.
  Field register pattern: What is a type? / What can you inspect? / Where is the line?
- **Generative Flow Engine (FE-04)**: a team of AI agents with separated roles
  (architects, builders, adversarial auditor, verifier) turned classical physics and
  math into a browser instrument; report records what each role carried.
- **yt2textbook (OT-05)**: open tool: prints any YouTube video/playlist as an
  illustrated textbook (chapters, screenshots, comprehension checks, glossary,
  Word export); runs locally with your own key.
- **The Pupil (FE-06)**: scroll-through-deep-time experiment; AI beside unsolved
  problems, not only solved ones.
- Others on the field index: River Strike, Shadow Blade Duel, Defy the Vector.

## Uses in the AI Engineering Lab curriculum
- Weeks 11 (evals) & 17 (agent ops): cite the Fieldwork reporting standard as the
  house style for every artifact's "method, measurements, and misses".
- Week 16 (multi-agent): reference the Generative Flow Engine role split
  (architect / builder / adversarial auditor / verifier) as a real-world pattern.
- Week 13 (external loop): the "bounded question" pattern for user testing.
