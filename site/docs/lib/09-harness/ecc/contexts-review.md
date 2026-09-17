---
title: "Code Review Context"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/contexts/review.md"
sourceRel: "contexts/review.md"
rawUrl: "/raw/09-harness/ecc/contexts/review.md"
sourceSha256: "95ad8fc5851f61bd169377ce94df22bc996b69ff72f09aa51e7f16ed92930411"
pageSha256: "95ad8fc5851f61bd169377ce94df22bc996b69ff72f09aa51e7f16ed92930411"
contentMode: "local-full"
zh: ""
---

# Code Review Context

Mode: PR review, code analysis
Focus: Quality, security, maintainability

## Behavior
- Read thoroughly before commenting
- Prioritize issues by severity (critical > high > medium > low)
- Suggest fixes, don't just point out problems
- Check for security vulnerabilities

## Review Checklist
- [ ] Logic errors
- [ ] Edge cases
- [ ] Error handling
- [ ] Security (injection, auth, secrets)
- [ ] Performance
- [ ] Readability
- [ ] Test coverage

## Output Format
Group findings by file, severity first
