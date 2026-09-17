---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "f5ca194b681825df89cd8011611043f0d5d34505a1b2f00b255ea74bdb7a60bf"
contentMode: "local-full"
zh: ""
---

## Extended Thinking

Extended thinking allows Claude to spend more time reasoning about complex problems before providing a solution.

### What is Extended Thinking?

Extended thinking is a deliberate, step-by-step reasoning process where Claude:
- Breaks down complex problems
- Considers multiple approaches
- Evaluates trade-offs
- Reasons through edge cases

### Activating Extended Thinking

**Keyboard shortcut**:
- `Option + T` (macOS) / `Alt + T` (Windows/Linux) - Toggle extended thinking

**Automatic activation**:
- Enabled by default for all models (Opus 5, Opus 4.8, Opus 4.7, Sonnet 4.6, Haiku 4.5)
- Opus 5 / Opus 4.8: Adaptive reasoning with effort levels: `low` (○), `medium` (◐), `high` (●), `xhigh`, `max`. The default is `high` on Opus 5 (v2.1.219), Opus 4.8 (v2.1.154), Opus 4.6, and Sonnet 4.6, and `xhigh` on Opus 4.7. `xhigh` is available on Opus 5, Opus 4.8, and Opus 4.7 (it falls back to `high` on Opus 4.6 / Sonnet 4.6). `max` works on Opus 5 and Opus 4.8/4.7/4.6 and Sonnet 4.6 (session-only). Haiku 4.5 has no effort levels. Opus 5, Opus 4.8, and Opus 4.7 have a 1M-token native context window (1M context fix landed in v2.1.117 — before that, `/context` miscounted Opus 4.7 against a 200K window and triggered premature autocompact). Since v2.1.129, `/context` shows its visualization in-UI only; the ASCII viz no longer leaks into the conversation context (~1.6k tokens saved per call), so `/context` is safe to invoke freely.
- Pro/Max subscribers on Opus 4.6 / Sonnet 4.6: default effort was raised from `medium` to `high` in v2.1.117.
- Other models: Fixed budget up to 31,999 tokens

**Configuration methods**:
- Toggle: `Alt+T` / `Option+T`, or via `/config`
- View reasoning: `Ctrl+O` (verbose mode)
- Set effort: `/effort` command or `--effort` flag

**Custom budget**:
```bash
export MAX_THINKING_TOKENS=1024
```

**Effort level** (supported on Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, and Sonnet 4.6 — not Haiku 4.5):
```bash
export CLAUDE_CODE_EFFORT_LEVEL=high   # low (○), medium (◐), high (●), xhigh (Opus 5/4.8/4.7), or max — default is high on Opus 5 and Opus 4.8
```

**CLI flag**:
```bash
claude --effort high "complex architectural review"
```

**Slash command**:
```
/effort high
```

> **Note:** The keyword "ultrathink" in prompts activates deep reasoning mode. Effort levels `low`, `medium`, `high`, and `max` are supported on Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, and Sonnet 4.6 (Haiku 4.5 has none). `xhigh` is available on Opus 5, Opus 4.8, and Opus 4.7. The default effort is `high` on Opus 5, Opus 4.8 (and Opus 4.6 / Sonnet 4.6) and `xhigh` on Opus 4.7. Unlike Opus 4.8 and Opus 4.7, which pin their default effort on first run, Opus 5 has no such hold — a level you previously set carries over. The `/effort` menu also offers `ultracode`, which is **not** a model effort level — it sends `xhigh` and has Claude orchestrate dynamic workflows (session-only).

### Safety-Classifier Fallback on Opus 5

Separate from the [`fallbackModel` setting](#fallback-models-fallbackmodel) (which handles overload and unavailability), Claude Code applies a **category-based fallback** when a safety classifier flags a request. It requires Claude Code v2.1.219 or later.

- **Opus 5**: cybersecurity-flagged requests re-run on Opus 4.8. Biology-flagged requests end with a refusal instead, because Opus 5 runs its own biology classifiers with no fallback model. You get those refusals from the first flagged request.
- Workloads in offensive security or biology — penetration testing, Capture the Flag (CTF) exercises, and biology-adjacent codebases — trigger fallback frequently, often on the first request.

Why this matters here: if you run [security-review subagents](/lib/09-harness/claude-howto/04-subagents) or CTF/pentest work on Opus 5, expect silent re-runs on Opus 4.8 (different effort ceiling and context window) for cybersecurity prompts, and outright refusals for biology-adjacent ones. Pin a different model explicitly if that behavior gets in the way.

**Controlling the switch** — the `switchModelsOnFlag` setting (v2.1.170+, default `true`) decides whether the fallback happens silently. Set it to `false` and Claude Code pauses instead, letting you choose between switching models and editing the prompt. It appears in `/config` as **Switch models when a message is flagged**.

```json
{
  "switchModelsOnFlag": false
}
```

### Benefits of Extended Thinking

- **Deep reasoning**: Spend more time thinking about complex problems
- **Better architectural decisions**: Make informed choices with comprehensive evaluation
- **Consideration of edge cases**: Think through potential issues and scenarios
- **Thorough analysis**: Structured approach to complex problem-solving

### Example: Architectural Decision

```
User: ultrathink Should we use microservices or a monolith for our e-commerce platform?

Claude: Let me think through this architectural decision carefully...

<extended_thinking>
## Context Analysis
- Team size: 5 developers
- Expected traffic: 10k daily users initially
- Need to scale to 100k+ users
- Limited DevOps resources
- 6-month timeline to MVP

## Approach 1: Microservices
Pros:
+ Independent scaling
+ Technology flexibility
+ Team independence
+ Fault isolation

Cons:
- Operational complexity
- Network overhead
- Distributed tracing needed
- Requires DevOps expertise
- Slower initial development

## Approach 2: Monolith
Pros:
+ Simpler deployment
+ Faster initial development
+ Easier debugging
+ Lower operational overhead
+ Single codebase

Cons:
- Scaling challenges later
- All-or-nothing deployments
- Technology lock-in
- Potential for tight coupling

## Decision Factors
1. Team size (5 devs) → Favors monolith
2. DevOps resources (limited) → Favors monolith
3. Timeline (6 months) → Favors monolith
4. Future scale (100k users) → Achievable with monolith + caching
5. Complexity budget → Limited

## Recommendation
Start with a **modular monolith**:
- Single deployment unit
- Clear module boundaries
- Clean interfaces between modules
- Prepare for future extraction to microservices if needed

This gives you:
✓ Fast initial development
✓ Low operational complexity
✓ Option to extract services later
✓ Clear architecture

Migration path: When you reach 50k+ users or specific modules need independent scaling, extract those modules into microservices.
</extended_thinking>

**Recommendation**: Implement a modular monolith with clean module boundaries.

This approach balances your current constraints (team size, timeline, DevOps resources) with future scalability needs. You can migrate specific modules to microservices later when there's a clear business need.
```

### Extended Thinking Configuration

Extended thinking is controlled via environment variables, keyboard shortcuts, and CLI flags:

```bash
# Set thinking token budget
export MAX_THINKING_TOKENS=16000

# Set effort level (Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 4.6): low (○), medium (◐), high (●), xhigh (Opus 5/4.8/4.7), or max — default is high on Opus 5 and Opus 4.8
export CLAUDE_CODE_EFFORT_LEVEL=high
```

Toggle during a session with `Alt+T` / `Option+T`, set effort with `/effort`, or configure via `/config`.

> **Lean system prompt (v2.1.154):** The lean system prompt is now the **default** for all models except Haiku, Sonnet, and Opus 4.7-and-earlier, reducing baseline token overhead on Opus 5 and Opus 4.8.
