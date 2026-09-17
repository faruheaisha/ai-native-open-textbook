---
title: "Sections"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/composition-patterns/rules/_sections.md"
sourceRel: "skills/composition-patterns/rules/_sections.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/composition-patterns/rules/_sections.md"
sourceSha256: "79d352741327df9292cb0de0336d204ecd4c3bcabbdf84aa1fa26638a396cc8b"
pageSha256: "79d352741327df9292cb0de0336d204ecd4c3bcabbdf84aa1fa26638a396cc8b"
contentMode: "local-full"
zh: ""
---

# Sections

This file defines all sections, their ordering, impact levels, and descriptions.
The section ID (in parentheses) is the filename prefix used to group rules.

---

## 1. Component Architecture (architecture)

**Impact:** HIGH
**Description:** Fundamental patterns for structuring components to avoid prop
proliferation and enable flexible composition.

## 2. State Management (state)

**Impact:** MEDIUM
**Description:** Patterns for lifting state and managing shared context across
composed components.

## 3. Implementation Patterns (patterns)

**Impact:** MEDIUM
**Description:** Specific techniques for implementing compound components and
context providers.

## 4. React 19 APIs (react19)

**Impact:** MEDIUM
**Description:** React 19+ only. Don't use `forwardRef`; use `use()` instead of `useContext()`.
