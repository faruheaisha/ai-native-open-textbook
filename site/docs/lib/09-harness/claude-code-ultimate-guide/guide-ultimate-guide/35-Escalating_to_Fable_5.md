---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "31403bb1e0b704e6e61147129aea4c1808ff939192829dd8724357b424a78ea6"
contentMode: "local-full"
zh: ""
---

#### Escalating to Fable 5

Claude Fable 5 (`claude-fable-5`, Mythos-class, available from Claude Code v2.1.170) exceeds the capabilities of any previously GA Anthropic model. In practice, use it when Opus 4.8 at `max` effort is not meeting your quality bar.

Decision trigger: you ran the task on Opus with `max` effort and the output is not good enough for a critical or irreversible decision. Fable 5 is not a default. Cost is unpublished; check [anthropic.com/pricing](https://www.anthropic.com/pricing). Reserve it for tasks where output quality matters more than budget.

Practical scenarios: production security audits where errors are unacceptable, architecture decisions with lasting consequences, or multi-step agentic work where Opus alone has fallen short.

**Access**: `/model claude-fable-5` (v2.1.170+). [Announcement](https://www.anthropic.com/news/claude-fable-5-mythos-5)

---

### Effort Levels

The `effort` parameter (Opus 4.6+ API) controls the model's overall computational budget: not just thinking tokens, but tool calls, verbosity, and analysis depth. Low effort = fewer tool calls, no preamble. High effort = more explanations, detailed analysis.

**Calibrated gradient: one real prompt per level:**

- **`low`**: Mechanical, no design decisions needed
  > `"Rename getUserById to findUserById across src/"`: Find-replace scope, zero reasoning required.

- **`medium`**: Clear pattern, defined scope, one concern
  > `"Convert fetchUser() in api/users.ts from callbacks to async/await"`: Pattern is known, scope bounded.

- **`high`**: Design decisions, edge cases, multiple concerns
  > `"Redesign error handling in the payment module: add retry logic, partial failure recovery, and idempotency guarantees"`: Architectural choices, not just pattern application.

- **`xhigh`** _(Opus 4.8+, v2.1.114+)_: extra-high effort between `high` and `max`, introduced with Opus 4.8 (which defaults to `high` effort in Claude Code, all plans)
  > `"Debug this race condition in the distributed job queue with concurrent writes and partial reads"`, more reasoning depth than `high`, faster than `max`.

- **`max`** _(Opus 4.7+ only, returns error on other models)_: Cross-system reasoning, irreversible decisions
  > `"Analyze the microservices event pipeline for race conditions across order-service, inventory-service, and notification-service"`: Multi-service hypothesis testing, adversarial thinking.

---

### Per-Skill Effort Allocation (v2.1.80+)

Skills can declare their own effort level in frontmatter. The skill's value overrides the session setting for the duration of that skill's execution, then reverts. This eliminates the need to manually toggle effort between mechanical and analytical tasks.

```yaml
# Mechanical skill — always fast, never wastes reasoning budget
---
name: release
description: Bump version, update CHANGELOG, commit, push
effort: low
---

# Analytical skill — always deep, regardless of session setting
---
name: architecture-review
description: Full architectural analysis with trade-off evaluation
effort: high
---
```

**Decision table for common skill types:**

| Skill type | Recommended effort | Reasoning |
|------------|--------------------|-----------|
| Commit, push, sync | `low` | Sequential steps, no design decisions |
| Changelog, release notes | `low` | Reads git + formats, mécanique |
| Scaffolding, boilerplate | `low` | Template instantiation |
| Code review (single PR) | `medium` | Pattern recognition, bounded scope |
| Issue triage, backlog | `medium` | Categorization + some analysis |
| Security audit | `high` | Threat modeling, adversarial thinking |
| Architecture review | `high` | Design decisions, cross-component reasoning |
| Multi-agent orchestration | `high` | Coordination + planning |

> **Cost model**: `low` effort means fewer tool calls, no preamble, direct output. `high` effort means more tool calls with explanations, detailed summaries, deeper exploration. Match effort to where analysis adds value, not to "effort = quality" uniformly.

---

### Model per Agent Patterns

Assign models to agents based on **role**, not importance:

**Planner** (`examples/agents/planner.md`): Strategy, read-only exploration

```yaml
---
name: planner
description: Strategic planning agent — read-only. Use before implementation.
model: opus
tools: Read, Grep, Glob
---
```

**Implementer** (`examples/agents/implementer.md`): Mechanical execution, bounded scope

```yaml
---
name: implementer
description: Mechanical execution agent. Scope must be defined explicitly in the task.
model: haiku
tools: Write, Edit, Bash, Read, Grep, Glob
---
```

> **Note**: Haiku is for mechanical tasks only. If the implementation requires design decisions or complex business logic, use Sonnet, and state this in the task prompt.

**Architecture Reviewer** (`examples/agents/architecture-reviewer.md`): Critical design review

```yaml
---
name: architecture-reviewer
description: Architecture and design review — read-only. Never modifies code.
model: opus
tools: Read, Grep, Glob
---
```

> **Pro tip**: Add a model reminder to your CLAUDE.md:
> ```
> # Model reminder
> Default: Sonnet. Haiku for mechanical tasks. Opus for architecture and security audits.
> ```

---

### When Thinking Helps vs. Wastes Tokens

| Scenario | Thinking | Reason |
|----------|----------|--------|
| Rename 50 files | OFF | Zero reasoning, pure mechanics |
| Bug spanning 3+ services | ON (high) | Multi-layer hypothesis testing |
| Boilerplate / test generation | OFF | Repetitive pattern, no decisions |
| Architecture migration | ON (max) | Irreversible decisions |
| Direct factual questions | OFF (low) | Immediate answer sufficient |
| Security code review | ON (high) | Adversarial reasoning needed |

Toggle: `Alt+T` (current session) · `/config` (permanent)

---

## 2.6 Mental Model

Understanding how Claude Code "thinks" makes you more effective.

### Claude's View of Your Project

```
┌─────────────────────────────────────────────────────────┐
│                   YOUR PROJECT                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────┐    ┌─────────────┐    ┌───────────┐   │
│   │   Files     │    │   Git       │    │  Config   │   │
│   │   (.ts,.py) │    │   History   │    │  Files    │   │
│   └─────────────┘    └─────────────┘    └───────────┘   │
│          │                  │                  │        │
│          ▼                  ▼                  ▼        │
│   ┌─────────────────────────────────────────────────┐   │
│   │              Claude's Understanding             │   │
│   │   - File structure & relationships              │   │
│   │   - Code patterns & conventions                 │   │
│   │   - Recent changes (from git)                   │   │
│   │   - Project rules (from CLAUDE.md)              │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### What Claude Knows

1. **File Structure**: Claude can navigate and search your files
2. **Code Content**: Claude can read and understand code
3. **Git State**: Claude sees branches, commits, changes
4. **Project Rules**: Claude reads CLAUDE.md for conventions

### What Claude Doesn't Know

1. **Runtime State**: Claude can't see running processes
2. **External Services**: Claude can't access your databases directly
3. **Your Intent**: Claude needs clear instructions
4. **Hidden Files**: Claude respects .gitignore by default

> **⚠️ Pattern Amplification**: Claude mirrors the patterns it finds. In well-structured codebases, it produces consistent, idiomatic code. In messy codebases without clear abstractions, it perpetuates the mess. If your code lacks good patterns, provide them explicitly in CLAUDE.md or use semantic anchors (Section 2.9).

### You Are the Main Thread

Think of yourself as a CPU scheduler. Claude Code instances are worker threads. You don't write the code, you **orchestrate** the work.

```
┌─────────────────────────────────────────┐
│          YOU (Main Thread)              │
│  ┌────────────────────────────────────┐ │
│  │  Responsibilities:                 │ │
│  │  • Define tasks and priorities     │ │
│  │  • Allocate context budgets        │ │
│  │  • Review outputs                  │ │
│  │  • Make architectural decisions    │ │
│  │  • Handle exceptions/escalations   │ │
│  └────────────────────────────────────┘ │
│         │          │          │         │
│    ┌────▼───┐ ┌────▼───┐ ┌────▼───┐    │
│    │Worker 1│ │Worker 2│ │Worker 3│    │
│    │(Claude)│ │(Claude)│ │(Claude)│    │
│    │Feature │ │Tests   │ │Review  │    │
│    └────────┘ └────────┘ └────────┘    │
└─────────────────────────────────────────┘
```

**Implications**:
- **Don't write code** when Claude can. Your time is for decisions, not keystrokes.
- **Don't micromanage**. Give clear instructions, then review results.
- **Context-switch deliberately**. Like a scheduler, batch similar tasks.
- **Escalate to yourself**. When Claude is stuck, step in, then hand back.

This mental model scales: one developer can orchestrate 2-5 Claude instances on independent tasks (see [§9.17 Scaling Patterns](#917-scaling-patterns-multi-instance-workflows)).

### From Chatbot to Context System

The most common mistake is treating Claude Code like a chatbot: typing ad-hoc requests and hoping for good output. What separates casual usage from production workflows is a shift in thinking:

> **Chatbot mode**: You write good prompts. **Context system**: You build structured context that makes every prompt better.
>
> *"Stop treating it like a chatbot. Give it structured context. CLAUDE.md, hooks, skills, project memory. Changes everything."*
> [Robin Lorenz](https://www.linkedin.com/in/robin-lorenz-54055412a/), AI Engineer ([comment](https://www.linkedin.com/feed/update/urn:li:activity:7426936437746352128?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7426936437746352128%2C7426941635306987520%29))

Claude Code has four layers of persistent context that compound over time:

| Layer | What It Does | Section | When to Set Up |
|-------|-------------|---------|----------------|
| **CLAUDE.md** | Persistent rules, conventions, project knowledge | [§3.1](#31-memory-files-claudemd) | Week 1 |
| **Skills** | Reusable knowledge modules for consistent workflows | [§5](#5-skills) | Week 2 |
| **Hooks** | Automated guardrails (lint, security, formatting) | [§7](#7-hooks) | Week 2-3 |
| **Project memory** | Cross-session decisions and architectural context | [§3.1](#31-memory-files-claudemd) | Ongoing |

These are not independent features. They are layers of the same system:

- **CLAUDE.md** teaches Claude *what* your project needs (conventions, stack, patterns)
- **Skills** teach Claude *how* to perform specific workflows (review, deploy, test)
- **Hooks** enforce *guardrails* automatically (block secrets, auto-format, run linting)
- **Memory** preserves *decisions* across sessions (architectural choices, resolved tradeoffs)

**Before** (chatbot mode):
> "Use pnpm, not npm. And remember our naming convention is..."
> *(Every session. Every time. Copy-pasting context.)*

**After** (context system):
> CLAUDE.md loads conventions automatically. Skills ensure consistent workflows.
> Hooks enforce quality with zero manual effort. Memory carries decisions forward.

The shift is not about prompting better. It is about building a system where Claude starts every session already knowing what you need.

> **See also**: [§9.10 Continuous Improvement Mindset](#910-continuous-improvement-mindset) for evolving this system over time. Ready to choose the right mechanism? [Memory Loading Comparison](#memory-loading-comparison) maps all seven mechanisms with a decision tree.

### Communicating Effectively

**Good prompt**:
```
The login function in src/auth/login.ts isn't validating email addresses properly.
Plus signs should be allowed but they're being rejected.
```

**Weak prompt**:
```
Login is broken
```

The more context you provide, the better Claude can help.

## 2.8 Structured Prompting with XML Tags

XML-structured prompts provide **semantic organization** for complex requests, helping Claude distinguish between different aspects of your task for clearer understanding and better results.

### What Are XML-Structured Prompts?

XML tags act as **labeled containers** that explicitly separate instruction types, context, examples, constraints, and expected output format.

**Basic syntax**:

```xml
<instruction>
  Your main task description here
</instruction>

<context>
  Background information, project details, or relevant state
</context>

<code_example>
  Reference code or examples to follow
</code_example>

<constraints>
  - Limitation 1
  - Limitation 2
  - Requirement 3
</constraints>

<output>
  Expected format or structure of the response
</output>
```

### Why Use XML Tags?

| Benefit | Description |
|---------|-------------|
| **Separation of concerns** | Different aspects of the task are clearly delineated |
| **Reduced ambiguity** | Claude knows which information serves what purpose |
| **Better context handling** | Helps Claude prioritize main instructions over background info |
| **Consistent formatting** | Easier to template complex requests |
| **Multi-faceted requests** | Complex tasks with multiple requirements stay organized |

### Common Tags and Their Uses

**Core Instruction Tags**:

```xml
<instruction>Main task</instruction>          
<task>Specific subtask</task>                 
<question>What should I do about X?</question> 
<goal>Achieve state Y</goal>                  
```

**Context and Information Tags**:

```xml
<context>Project uses Next.js 14</context>            
<problem>Users report slow page loads</problem>       
<background>Migration from Pages Router</background>  
<state>Currently on feature-branch</state>            
```

**Code and Example Tags**:

```xml
<code_example>
  // Existing pattern to follow
  const user = await getUser(id);
</code_example>

<current_code>
  // Code that needs modification
</current_code>

<expected_output>
  // What the result should look like
</expected_output>
```

**Constraint and Rule Tags**:

```xml
<constraints>
  - Must maintain backward compatibility
  - No breaking changes to public API
  - Maximum 100ms response time
</constraints>

<requirements>
  - TypeScript strict mode
  - 100% test coverage
  - Accessible (WCAG 2.1 AA)
</requirements>

<avoid>
  - Don't use any for types
  - Don't modify the database schema
</avoid>
```

### Practical Examples

**Example 1: Code Review with Context**

```xml
<instruction>
Review this authentication middleware for security vulnerabilities
</instruction>

<context>
This middleware is used in a financial application handling sensitive user data.
We follow OWASP Top 10 guidelines and need PCI DSS compliance.
</context>

<code_example>
async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
}
</code_example>

<constraints>
- Point out any security risks
- Suggest PCI DSS compliant alternatives
- Consider timing attacks and token leakage
</constraints>

<output>
Provide:
1. List of security issues found
2. Severity rating for each (Critical/High/Medium/Low)
3. Specific code fixes with examples
4. Additional security hardening recommendations
</output>
```

**Example 2: Feature Implementation with Examples**

```xml
<instruction>
Add a rate limiting system to our API endpoints
</instruction>

<context>
Current stack: Express.js + Redis
No rate limiting currently exists
Experiencing API abuse from specific IPs
</context>

<requirements>
- 100 requests per minute per IP for authenticated users
- 20 requests per minute per IP for unauthenticated
- Custom limits for premium users (stored in database)
- Return 429 status with Retry-After header
</requirements>

<code_example>
// Existing middleware pattern we use
app.use(authenticate);
app.use(authorize(['admin', 'user']));
</code_example>

<constraints>
- Must not impact existing API performance
- Redis connection should be reused
- Handle Redis connection failures gracefully
</constraints>

<output>
Provide:
1. Rate limiter middleware implementation
2. Redis configuration
3. Unit tests
4. Documentation for the team
</output>
```

**Example 3: Bug Investigation with State**

```xml
<task>
Investigate why user sessions are expiring prematurely
</task>

<problem>
Users report being logged out after 5-10 minutes of activity,
but session timeout is configured for 24 hours.
</problem>

<context>
- Next.js 14 App Router with next-auth
- PostgreSQL session store
- Load balanced across 3 servers
- Issue started after deploying v2.3.0 last week
</context>

<state>
Git diff between v2.2.0 (working) and v2.3.0 (broken) shows changes to:
- middleware.ts (session refresh logic)
- auth.config.ts (session strategy)
- database.ts (connection pooling)
</state>

<constraints>
- Don't suggest reverting the deploy
- Production issue, needs quick resolution
- Must maintain session security
</constraints>

<output>
Provide:
1. Root cause hypothesis
2. Files to investigate (in priority order)
3. Debugging commands to run
4. Potential fixes with trade-offs
</output>
```

### Advanced Patterns

**Nested Tags for Complex Hierarchy**:

```xml
<task>
Refactor authentication system
  <subtask priority="high">
    Update user model
    <constraints>
      - Preserve existing user IDs
      - Add migration for email verification
    </constraints>
  </subtask>

  <subtask priority="medium">
    Implement OAuth providers
    <requirements>
      - Google and GitHub OAuth
      - Reuse existing session logic
    </requirements>
  </subtask>
</task>
```

**Multiple Examples with Labels**:

```xml
<code_example label="current_implementation">
  // Old approach with callback hell
  getUser(id, (user) => {
    getOrders(user.id, (orders) => {
      res.json({ user, orders });
    });
  });
</code_example>

<code_example label="desired_pattern">
  // New async/await pattern
  const user = await getUser(id);
  const orders = await getOrders(user.id);
  res.json({ user, orders });
</code_example>
```

**Conditional Instructions**:

```xml
<instruction>
Optimize database query performance
</instruction>

<context>
Query currently takes 2.5 seconds for 10,000 records
</context>

<constraints>
  <if condition="PostgreSQL">
    - Use EXPLAIN ANALYZE
    - Consider materialized views
  </if>

  <if condition="MySQL">
    - Use EXPLAIN with query plan analysis
    - Consider query cache
  </if>
</constraints>
```

### When to Use XML-Structured Prompts

| Scenario | Recommended? | Why |
|----------|--------------|-----|
| Simple one-liner requests | ❌ No | Overhead outweighs benefit |
| Multi-step feature implementation | ✅ Yes | Separates goals, constraints, examples |
| Bug investigation with context | ✅ Yes | Distinguishes symptoms from environment |
| Code review with specific criteria | ✅ Yes | Clear separation of code, context, requirements |
| Architecture planning | ✅ Yes | Organizes goals, constraints, trade-offs |
| Quick typo fix | ❌ No | Unnecessary complexity |

### Best Practices

**Do's**:
- ✅ Use descriptive tag names that clarify purpose
- ✅ Keep tags consistent across similar requests
- ✅ Combine with CLAUDE.md for project-specific tag conventions
- ✅ Nest tags logically when representing hierarchy
- ✅ Use tags to separate "what" from "why" from "how"

**Don'ts**:
- ❌ Over-structure simple requests (adds noise)
- ❌ Mix tag purposes (e.g., constraints inside code examples)
- ❌ Use generic tags (`<tag>`, `<content>`) without clear meaning
- ❌ Nest too deeply (>3 levels becomes hard to read)

### Integration with CLAUDE.md

You can standardize XML tag usage in your project's CLAUDE.md:

```markdown
# XML Prompt Conventions

When making complex requests, use this structure:

<instruction>Main task</instruction>

<context>
  Project context and state
</context>

<code_example>
  Reference implementations
</code_example>

<constraints>
  Technical and business requirements
</constraints>

<output>
  Expected deliverables
</output>

## Project-Specific Tags

- `<api_design>` - API endpoint design specifications
- `<accessibility>` - WCAG requirements and ARIA considerations
- `<performance>` - Performance budgets and optimization goals
```

### Combining with Other Features

**XML + Plan Mode**:

```xml
<instruction>Plan the migration from REST to GraphQL</instruction>

<context>
Currently 47 REST endpoints serving mobile and web clients
</context>

<constraints>
- Must maintain REST endpoints during transition (6-month overlap)
- Mobile app can't be force-updated immediately
</constraints>

<output>
Multi-phase migration plan with rollback strategy
</output>
```

Then use `/plan` to explore read-only before implementation.

**XML + Cost Awareness**:

For large requests, structure with XML to help Claude understand scope and estimate token usage:

```xml
<instruction>Analyze all TypeScript files for unused imports</instruction>

<scope>
  src/ directory (~200 files)
</scope>

<output_format>
  Summary report only (don't list every file)
</output_format>
```

This helps Claude optimize the analysis approach and reduce token consumption.

### Example Template Library

Create reusable templates in `claudedocs/templates/`:

**`claudedocs/templates/code-review.xml`**:

```xml
<instruction>
Review the following code for quality and best practices
</instruction>

<context>
[Describe the component's purpose and architecture context]
</context>

<code_example>
[Paste code here]
</code_example>

<focus_areas>
- Security vulnerabilities
- Performance bottlenecks
- Maintainability issues
- Test coverage gaps
</focus_areas>

<output>
1. Issues found (categorized by severity)
2. Specific recommendations with code examples
3. Priority order for fixes
</output>
```

**Usage**:

```bash
cat claudedocs/templates/code-review.xml | \
  sed 's/\[Paste code here\]/'"$(cat src/auth.ts)"'/' | \
  claude -p "Process this review request"
```

### Limitations and Considerations

**Token overhead**: XML tags consume tokens. For simple requests, natural language is more efficient.

**Not required**: Claude understands natural language perfectly well. Use XML when structure genuinely helps.

**Consistency matters**: If you use XML tags, be consistent. Mixing styles within a session can confuse context.

**Learning curve**: Team members need to understand the tag system. Document your conventions in CLAUDE.md.

> **💡 Pro tip**: Start with natural language prompts. Introduce XML structure when:
> - Requests have 3+ distinct aspects (instruction + context + constraints)
> - Ambiguity causes Claude to misunderstand your intent
> - Creating reusable prompt templates
> - Working with junior developers who need structured communication patterns

> **Source**: [DeepTo Claude Code Guide - XML-Structured Prompts](https://cc.deeptoai.com/docs/en/best-practices/claude-code-comprehensive-guide)

### 2.8.1 Prompting as Provocation

The Claude Code team internally treats prompts as **challenges to a peer**, not instructions to an assistant. This subtle shift produces higher-quality outputs because it forces Claude to prove its reasoning rather than simply comply.

**Three challenge patterns from the team**:

**1. The Gatekeeper**: Force Claude to defend its work before shipping:

```
"Grill me on these changes and don't make a PR until I pass your test"
```

Claude reviews your diff, asks pointed questions about edge cases, and only proceeds when satisfied. This catches issues that passive review misses.

**2. The Proof Demand**: Require evidence, not assertions:

```
"Prove to me this works — show me the diff in behavior between main and this branch"
```

Claude runs both branches, compares outputs, and presents concrete evidence. Eliminates the "trust me, it works" failure mode.

**3. The Reset**: After a mediocre first attempt, invoke full-context rewrite:

```
"Knowing everything you know now, scrap this and implement the elegant solution"
```

This forces a substantive second attempt with accumulated context rather than incremental patches on a weak foundation. The key insight: Claude's second attempt with full context consistently outperforms iterative fixes.

**Why this works**: Provocation triggers deeper reasoning paths than polite requests. When Claude must *convince* rather than *comply*, it activates more thorough analysis and catches its own shortcuts.

> **Source**: [10 Tips from Inside the Claude Code Team](https://paddo.dev/blog/claude-code-team-tips/) (Boris Cherny thread, Feb 2026)

## 2.9 Semantic Anchors

LLMs are statistical pattern matchers trained on massive text corpora. Using **precise technical vocabulary** helps Claude activate the right patterns in its training data, leading to higher-quality outputs.

### Why Precision Matters

When you say "clean code", Claude might generate any of dozens of interpretations. But when you say "SOLID principles with dependency injection following Clean Architecture layers", you anchor Claude to a specific, well-documented pattern from its training.

**Key insight**: Technical terms act as GPS coordinates into Claude's knowledge. The more precise, the better the navigation.

### Common Anchors for Claude Code

| Vague Term | Semantic Anchor | Why It Helps |
|------------|-----------------|--------------|
| "error handling" | "Railway Oriented Programming with Either/Result monad" | Activates functional error patterns |
| "clean code" | "SOLID principles, especially SRP and DIP" | Targets specific design principles |
| "good tests" | "TDD London School with outside-in approach" | Specifies test methodology |
| "good architecture" | "Hexagonal Architecture (Ports & Adapters)" | Names a concrete pattern |
| "readable code" | "Screaming Architecture with intention-revealing names" | Triggers specific naming conventions |
| "scalable design" | "CQRS with Event Sourcing" | Activates distributed patterns |
| "documentation" | "arc42 template structure" | Specifies documentation framework |
| "requirements" | "EARS syntax for requirements (Easy Approach to Requirements)" | Targets requirement format |
| "API design" | "REST Level 3 with HATEOAS" | Specifies maturity level |
| "security" | "OWASP Top 10 mitigations" | Activates security knowledge |

### How to Use in CLAUDE.md

Add semantic anchors to your project instructions:

```markdown
# Architecture Principles

Follow these patterns:
- **Architecture**: Hexagonal Architecture (Ports & Adapters) with clear domain boundaries
- **Error handling**: Railway Oriented Programming - never throw, return Result<T, E>
- **Testing**: TDD London School - mock collaborators, test behaviors not implementations
- **Documentation**: ADR (Architecture Decision Records) for significant choices
```

### Combining with XML Tags

Semantic anchors work powerfully with XML-structured prompts (Section 2.8):

```xml
<instruction>
  Refactor the user service following Domain-Driven Design (Evans)
</instruction>

<constraints>
  - Apply Hexagonal Architecture (Ports & Adapters)
  - Use Repository pattern for persistence
  - Implement Railway Oriented Programming for error handling
  - Follow CQRS for read/write separation
</constraints>

<quality_criteria>
  - Screaming Architecture: package structure reveals intent
  - Single Responsibility Principle per class
  - Dependency Inversion: depend on abstractions
</quality_criteria>
```

### Semantic Anchors by Domain

**Testing**:
- TDD London School (mockist) vs Chicago School (classicist)
- Property-Based Testing (QuickCheck-style)
- Mutation Testing (PIT, Stryker)
- BDD Gherkin syntax (Given/When/Then)

**Architecture**:
- Hexagonal Architecture (Ports & Adapters)
- Clean Architecture (Onion layers)
- CQRS + Event Sourcing
- C4 Model (Context, Container, Component, Code)

**Design Patterns**:
- Gang of Four patterns (specify: Strategy, Factory, Observer...)
- Domain-Driven Design tactical patterns (Aggregate, Repository, Domain Event)
- Functional patterns (Monad, Functor, Railway)

**Requirements**:
- EARS (Easy Approach to Requirements Syntax)
- User Story Mapping (Jeff Patton)
- Jobs-to-be-Done framework
- BDD scenarios

> **💡 Pro tip**: When Claude produces generic code, try adding more specific anchors. "Use clean code" → "Apply Martin Fowler's Refactoring catalog, specifically Extract Method and Replace Conditional with Polymorphism."

> **Full catalog**: See [examples/semantic-anchors/anchor-catalog.md](/lib/09-harness/claude-code-ultimate-guide/examples-semantic-anchors-anchor-catalog) for a comprehensive reference organized by domain.

> **Source**: Concept by Alexandre Soyer. Original catalog: [github.com/LLM-Coding/Semantic-Anchors](https://github.com/LLM-Coding/Semantic-Anchors) (Apache-2.0)

## 2.10 Prompt Engineering Patterns

Two prompt-level techniques that close the gap between well-structured prompts and reliably accurate outputs: few-shot examples for calibrating format and style, and validation retry loops for catching and correcting extraction failures.

---

### Few-Shot Prompting

Few-shot examples show the model what correct output looks like before it processes the actual input. They are most effective for establishing output format, tone calibration, and input-specific processing style. They cannot enforce business rules or guarantee compliance; use schema validation for that.

**Optimal count:** 2-4 examples. Below 2, the pattern is too weak to anchor behavior. Above 4, the examples consume context budget without proportional improvement, and the model may pattern-match too literally on superficial features.

**Message-pair format for tool use:**

When the task involves tool calls, examples must include the full exchange, not just user inputs and final text outputs:

```python
messages = [
    # Example 1
    {"role": "user", "content": "Invoice: Acme Corp, 15 Jan 2025, $4,200.00"},
    {"role": "assistant", "content": [
        {
            "type": "tool_use",
            "id": "toolu_01",
            "name": "extract_invoice",
            "input": {
                "vendor": "Acme Corp",
                "date": "2025-01-15",
                "amount": 4200.00
            }
        }
    ]},
    {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "toolu_01", "content": "OK"}]},
    # Example 2 (null handling)
    {"role": "user", "content": "Invoice: no vendor listed, 22 Feb 2025, €892"},
    {"role": "assistant", "content": [
        {
            "type": "tool_use",
            "id": "toolu_02",
            "name": "extract_invoice",
            "input": {
                "vendor": null,
                "date": "2025-02-22",
                "amount": 892.00
            }
        }
    ]},
    {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "toolu_02", "content": "OK"}]},
    # Actual task
    {"role": "user", "content": f"Invoice: {actual_invoice_text}"}
]
```

The second example above demonstrates null handling explicitly. Without it, the model may invent a vendor name rather than returning null for an ambiguous field.

**Calibrating false positive rates:**

In CI-style review tasks (security scanning, code quality checks, compliance checks), false positives destroy trust faster than false negatives. A few-shot example set that includes a near-miss that should NOT trigger an alert teaches the boundary explicitly:

```python
# In the system prompt or early in the conversation:
CALIBRATION_EXAMPLES = """
Examples of what triggers a HIGH severity flag vs what does not:

Example 1 (HIGH, triggers):
Input: SELECT * FROM users WHERE id = ' + user_input + '
Reason: Direct string concatenation in SQL, classic injection vector.

Example 2 (NOT flagged, near-miss):
Input: query = f"SELECT * FROM users WHERE id = {user_id}"
Reason: f-string with a typed integer variable. No injection risk if user_id is
validated upstream. Untyped string concatenation = flag; typed variable
interpolation = safe.

Example 3 (HIGH, triggers):
Input: os.system(request.GET['cmd'])
Reason: Direct shell execution from unsanitized request parameter.
"""
```

Near-miss examples reduce false positive rates by teaching the model where the actual boundary sits, not just what a clear violation looks like.

**Limits of few-shot:**

Few-shot examples teach style and format. They cannot enforce schema constraints (use `strict: true` for that), guarantee business rule compliance (use a programmatic validator), or replace explicit instructions. If the rule needs to hold without exception, state it as a rule, not just as an example.

---

### Validation Retry Loop

The validation retry loop catches structured extraction failures programmatically and feeds specific error feedback back to the model for regeneration, rather than silently discarding bad output or failing the whole task.

**Three-attempt budget:**

```python
from dataclasses import dataclass

@dataclass
class ExtractionResult:
    success: bool
    data: dict | None
    error: str | None
    attempts: int

def extract_with_retry(
    client,
    document: str,
    schema_validator,
    max_attempts: int = 3
) -> ExtractionResult:
    messages = [{"role": "user", "content": f"Extract fields from:\n\n{document}"}]

    for attempt in range(1, max_attempts + 1):
        response = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=1024,
            tools=[EXTRACTION_TOOL],
            tool_choice={"type": "tool", "name": "extract_fields"},
            messages=messages
        )

        raw_output = response.content[0].input
        errors = schema_validator.validate(raw_output)

        if not errors:
            return ExtractionResult(
                success=True, data=raw_output, error=None, attempts=attempt
            )

        if attempt == max_attempts:
            break

        # Feed specific errors back, not a generic "try again"
        error_feedback = format_errors(errors, raw_output)
        messages.extend([
            {"role": "assistant", "content": response.content},
            {
                "role": "user",
                "content": (
                    f"The extraction has {len(errors)} validation error(s):\n\n"
                    f"{error_feedback}\n\n"
                    f"Please correct these specific issues and re-extract."
                )
            }
        ])

    return ExtractionResult(
        success=False, data=None,
        error=f"Failed after {max_attempts} attempts: {errors}",
        attempts=max_attempts
    )

def format_errors(errors, raw_output):
    lines = []
    for err in errors:
        lines.append(f"- Field `{err.field}`: {err.message}")
        if err.field in raw_output:
            lines.append(f"  Got: {raw_output[err.field]!r}")
    return "\n".join(lines)
```

**The feedback triple matters.** Effective retry feedback includes (1) the original document excerpt where the issue occurred, (2) the failed JSON the model produced, and (3) a specific error list per field. Vague feedback ("please try again, there were errors") degrades into random variation. Specific feedback ("field `date` expected ISO 8601, got '15th January'") almost always resolves on the second attempt.

**When source data is absent:**

If the document genuinely does not contain the required field, a retry loop will not help. The model will keep hallucinating or oscillating between null and invented values. Exit condition: if the same field fails twice with different invented values, mark it as `absent_from_source` and move on. Do not burn the full 3-attempt budget on a field that isn't there.

```python
def is_hallucination_cycle(error_history: list[dict], field: str) -> bool:
    values = [h.get(field) for h in error_history if h.get(field) is not None]
    # Two different non-null values for the same field across attempts = hallucination
    return len(set(str(v) for v in values)) > 1
```

**Graceful degradation with human review routing:**

When the retry budget is exhausted, route to human review rather than silently dropping the document:

```python
result = extract_with_retry(client, document, validator)

if not result.success:
    human_review_queue.append({
        "document_id": doc_id,
        "document": document,
        "last_attempt": result.error,
        "attempts": result.attempts,
        "requires_human": True
    })
    metrics.increment("extraction.failed", tags={"reason": "max_retries"})
```

---

### Self-Review Contamination

Asking the same model instance that generated an output to review its own output produces results with a 15-30% self-preference bias: the model tends to agree with itself, finding the generated content "correct" at rates above what independent reviewers would. The context window shared between generation and review is the contamination vector.

**Mitigation: independent review instance**

```python
# Generation pass
generation_response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=2048,
    messages=[
        {"role": "user", "content": f"Analyze this contract:\n\n{contract_text}"}
    ]
)
analysis = generation_response.content[0].text

# Review pass: fresh conversation, no generation context
review_response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=1024,
    system="You are a critical reviewer. Identify gaps, errors, and unsupported claims.",
    messages=[
        {
            "role": "user",
            "content": (
                f"Review this contract analysis for accuracy:\n\n"
                f"CONTRACT:\n{contract_text}\n\n"
                f"ANALYSIS TO REVIEW:\n{analysis}\n\n"
                f"Identify any errors, gaps, or claims not supported by the contract text."
            )
        }
    ]
)
```

The review instance receives the source document and the generated analysis but has no memory of generating it. This eliminates the self-preference bias almost entirely. Use it for high-stakes extraction (legal, financial, medical), customer-facing content where errors damage trust, and any task where undetected hallucination is not acceptable.

---

### Inline Reasoning for Triage

For borderline classifications, a `reasoning` field in the output schema surfaces the evidence chain that produced the classification. This is not chain-of-thought prompting; it is a structured output field that forces the model to articulate the key evidence before committing to a label.

```json
{
    "classification": {"type": "string", "enum": ["urgent", "standard", "low"]},
    "reasoning": {
        "type": "string",
        "description": "The specific evidence from the input that determined this classification"
    },
    "confidence": {"type": "number"}
}
```

When `classification: "urgent"` and `reasoning: "customer explicitly states production outage affecting 10,000 users"`, a downstream filter can verify the classification in one read. When `reasoning` is vague or circular ("classified as urgent because it seems urgent"), that is a reliable signal to escalate for human review regardless of the confidence score.

---

## 2.11 Structured Outputs & Schema Design

Schema design determines how much of the extraction burden falls on the model versus on downstream validation. Good schemas express what the model genuinely knows; bad schemas force the model to invent values for fields it cannot find.

---

### Confidence Calibration

A confidence score of 0.9 means nothing without a labeled validation set showing that fields labeled 0.9 by this model are actually correct 90% of the time. Uncalibrated confidence scores create a false sense of accuracy.

**Building a calibration baseline:**

```python
from collections import defaultdict

def calibrate_confidence(
    model_outputs: list[dict],
    ground_truth: list[dict],
    field: str,
    bucket_size: float = 0.1
) -> dict:
    buckets = defaultdict(lambda: {"correct": 0, "total": 0})

    for output, truth in zip(model_outputs, ground_truth):
        conf = output.get("confidence", 0.5)
        bucket = round(conf / bucket_size) * bucket_size
        buckets[bucket]["total"] += 1
        if output.get(field) == truth.get(field):
            buckets[bucket]["correct"] += 1

    return {
        bucket: {
            "accuracy": data["correct"] / data["total"] if data["total"] > 0 else 0,
            "samples": data["total"]
        }
        for bucket, data in sorted(buckets.items())
    }

# Example output:
# {0.9: {"accuracy": 0.91, "samples": 234}}  <- well-calibrated
# {0.9: {"accuracy": 0.63, "samples": 234}}  <- overconfident, needs adjustment
```

**Per-field thresholds:**

Different fields have different error costs. A wrong vendor name on an invoice is annoying; a wrong total amount is a financial error. Set per-field confidence thresholds that route to human review when not met:

```python
REVIEW_THRESHOLDS = {
    "vendor_name": 0.70,
    "invoice_date": 0.80,
    "total_amount": 0.95,  # high bar: financial field
    "line_items": 0.85
}

def needs_review(extraction: dict, confidence_scores: dict) -> list[str]:
    return [
        field
        for field, threshold in REVIEW_THRESHOLDS.items()
        if confidence_scores.get(field, 0) < threshold
    ]
```

**Accuracy vs confidence plots:**

Plot model confidence on the x-axis against actual accuracy on the y-axis. A perfectly calibrated model follows the diagonal. Systematic overconfidence shows up as a curve below the diagonal; systematic underconfidence shows as a curve above it. Both can be corrected with temperature adjustment or post-hoc calibration (Platt scaling).

Calibrate on at least 200 labeled examples per field to get statistically meaningful buckets. Below 100 examples, bucket accuracy estimates are too noisy to act on.

---

## 2.12 Data Flow & Privacy

> **Important**: Everything you share with Claude Code is sent to Anthropic servers. Understanding this data flow is critical for protecting sensitive information.

### What Gets Sent to Anthropic

When you use Claude Code, the following data leaves your machine:

| Data Type | Example | Risk Level |
|-----------|---------|------------|
| Your prompts | "Fix the login bug" | Low |
| Files Claude reads | `.env`, `src/app.ts` | **High** if contains secrets |
| MCP query results | SQL query results with user data | **High** if production data |
| Command outputs | `env \| grep API` output | Medium |
| Error messages | Stack traces with file paths | Low |

### Retention Policies

| Configuration | Retention | How to Enable |
|---------------|-----------|---------------|
| **Default** | 5 years | (default state - training enabled) |
| **Opt-out** | 30 days | [claude.ai/settings](https://claude.ai/settings/data-privacy-controls) |
| **Enterprise (ZDR)** | 0 days | Enterprise contract |

**Immediate action**: [Disable training data usage](https://claude.ai/settings/data-privacy-controls) to reduce retention from 5 years to 30 days.

### Protecting Sensitive Data

**1. Block access to sensitive files** in `.claude/settings.json`:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env*)",
      "Edit(./.env*)",
      "Write(./.env*)",
      "Bash(cat .env*)",
      "Bash(head .env*)",
      "Read(./secrets/**)",
      "Read(./**/*.pem)",
      "Read(./**/*.key)",
      "Read(./**/credentials*)"
    ]
  }
}
```

> **Warning**: `permissions.deny` has known limitations. See [Security Hardening Guide](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index#known-limitations-of-permissionsdeny) for details.

**2. Never connect production databases** to MCP servers. Use dev/staging with anonymized data.

**3. Use security hooks** to block reading of sensitive files (see [Section 7.4](#74-hooks-automating-workflows)).

> **Full guide**: For complete privacy documentation including known risks, community incidents, and enterprise considerations, see [Data Privacy & Retention Guide](/lib/09-harness/claude-code-ultimate-guide/guide-security-data-privacy).

## 2.13 Under the Hood

> **Reading time**: 5 minutes
> **Goal**: Understand the core architecture that powers Claude Code

This section provides a summary of Claude Code's internal mechanisms. For the complete technical deep-dive with diagrams and source citations, see the [Architecture & Internals Guide](/lib/09-harness/claude-code-ultimate-guide/guide-core-architecture/index).

### The Master Loop

Claude Code runs on a simple `while` loop:

```
┌─────────────────────────────────────────────────────────────┐
│                    MASTER LOOP (simplified)                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Your Prompt                                               │
│       │                                                     │
│       ▼                                                     │
│   ┌────────────────────────────────────────────────────┐    │
│   │   Claude Reasons (no classifier, no router)        │    │
│   └───────────────────────┬────────────────────────────┘    │
│                           │                                 │
│              Tool needed? │                                 │
│                     ┌─────┴─────┐                           │
│                    YES         NO                           │
│                     │           │                           │
│                     ▼           ▼                           │
│              Execute Tool    Text Response (done)           │
│                     │                                       │
│                     └──────── Feed result back to Claude    │
│                                        │                    │
│                               (loop continues)              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Source**: [Anthropic Engineering Blog](https://www.anthropic.com/engineering/claude-code-best-practices)

There is no:
- Intent classifier or task router
- RAG/embedding pipeline
- DAG orchestrator
- Planner/executor split

The model itself decides when to call tools, which tools to call, and when it's done.

### The Tool Arsenal

Claude Code has 8 core tools:

| Tool | Purpose |
|------|---------|
| `Bash` | Execute shell commands (universal adapter) |
| `Read` | Read file contents (max 2000 lines) |
| `Edit` | Modify existing files (diff-based) |
| `Write` | Create/overwrite files |
| `Grep` | Search file contents (ripgrep-based) |
| `Glob` | Find files by pattern |
| `Task` | Spawn sub-agents (isolated context) |
| `TodoWrite` | Track progress (legacy, see below) |

**How tool execution works**: Claude Code can start executing tools marked as concurrency-safe (read-only operations like `Read`, `Grep`, `Glob`) while the model is still generating its response, reducing total turn time. Non-concurrent tools (writes, bash commands) wait for the response to complete and run serially. When multiple read-only tools appear in a single response, they run in parallel, up to 10 concurrent by default.

### Task Management System

**Version**: Claude Code v2.1.16+ introduced a new task management system

Claude Code provides two task management approaches:

| Feature | TodoWrite (Legacy) | Tasks API (v2.1.16+) |
|---------|-------------------|---------------------|
| **Persistence** | Session memory only | Disk storage (`~/.claude/tasks/`) |
| **Multi-session** | ❌ Lost on session end | ✅ Survives across sessions |
| **Dependencies** | ❌ Manual ordering | ✅ Task blocking (A blocks B) |
| **Coordination** | Single agent | ✅ Multi-agent broadcast |
| **Status tracking** | pending/in_progress/completed | pending/in_progress/completed/failed |
| **Description visibility** | ✅ Always visible | ⚠️ TaskGet only (not in TaskList) |
| **Metadata visibility** | N/A | ❌ Never visible in outputs |
| **Multi-call overhead** | None | ⚠️ 1 + N calls for N full tasks |
| **Enabled by** | Always available | Default since v2.1.19 |
