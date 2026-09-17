---
title: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-3/core-skills/agent-teams/index.md"
sourceRel: "docs/en/stage-3/core-skills/agent-teams/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-3/core-skills/agent-teams/index.md"
sourceSha256: "c7d999b48926ec64f7271877a026f0bd8daa20fee13b9dea6f6ed971cbee78b4"
pageSha256: "bed6c55508774af0640e8db33889b93296864c3cbfa8ca59ecd92a108c5bff46"
contentMode: "local-full"
zh: ""
---

## Cost and performance

Using Agent Teams increases cost, but it can also produce significant efficiency gains. Understanding this tradeoff helps you make informed decisions.

### Cost analysis

**Token consumption and team size**

The token consumption of Agent Teams is roughly **linear** with team size:

| Team size | Relative cost | Suitable scenario |
|---------|---------|---------|
| 1 person (single instance) | 1x | Simple tasks |
| 2-person team | 2-2.5x | Medium complexity |
| 3-person team | 3-4x | Complex tasks |
| 5+ person team | 5-6x+ | Large projects |

**Why it is not perfectly linear**:

- **Startup cost**: each member must receive initial context when it starts
- **Coordination cost**: communication between members through the messaging system also consumes tokens
- **Team Lead cost**: Team Lead usually uses Opus, which is more expensive

**Concrete example numbers** (Claude 4.5 Sonnet):

- Input: $3 per million tokens
- Output: $15 per million tokens

Suppose a task requires:
- Team Lead (Opus): 50K input + 20K output ≈ $2.25
- 3 Teammates (Sonnet): each 30K input + 15K output ≈ $2.7 × 3 = $8.1
- **Total**: about $10.35

The same task on a single Sonnet instance:
- 100K input + 50K output ≈ $1.05

**Cost multiplier**: about 10x

**But time saved**: potentially reduced from 3 hours to 1 hour

### Efficiency gains

**Anthropic internal testing data**:

- Large project refactors: around **50%** improvement in efficiency
- Parallel multi-module development: around **60-70%** improvement
- Documentation generation tasks: around **80%** improvement

**Real case**:

Anthropic's engineering team once used **16 parallel agents** to build a C compiler in about 2 weeks that could compile the Linux 6.9 kernel, around 100,000 lines of Rust code, and it passed 99% of GCC tests.

### Cost optimization strategies

**Strategy 1: mix models**

```
Team Lead: Opus (strong reasoning needed)
Teammates: Sonnet (high value for cost)
Simple tasks: Haiku (cheapest)
```

**Strategy 2: adjust team size dynamically**

```
Analysis phase: 5-person team (multi-angle analysis)
Implementation phase: 3-person team (parallel coding)
Testing phase: 2-person team (testing and fixing)
```

**Strategy 3: use Agent Teams only in selected phases**

Do not use Agent Teams for the entire project. Use it only in the most complex phases:

```
Phase 1 (requirements analysis): single instance
Phase 2 (architecture design): Agent Teams (multiple plans explored in parallel)
Phase 3 (coding): single instance
Phase 4 (code review): Agent Teams (multi-angle review)
Phase 5 (documentation): Agent Teams (parallel writing)
```

### When it is worth it

**Worth it when**:

- The project timeline is tight, and the value of efficiency gains exceeds the token cost
- The task is highly complex, and a single instance is likely to miss details
- You need multi-angle analysis and validation

**Not worth it when**:

- The task is simple, and the overhead of starting a team is too high
- Cost is highly sensitive and the token budget is limited
- The task is highly serial and offers no space for parallelism
