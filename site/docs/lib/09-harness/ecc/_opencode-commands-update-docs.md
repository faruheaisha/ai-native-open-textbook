---
title: "Update Docs Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/update-docs.md"
sourceRel: ".opencode/commands/update-docs.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/update-docs.md"
sourceSha256: "2a036d2ed5b6e3d2afdfc47c3a38362b62c88087ac55c038096e3c601e183e5f"
pageSha256: "2a036d2ed5b6e3d2afdfc47c3a38362b62c88087ac55c038096e3c601e183e5f"
contentMode: "local-full"
zh: ""
---

# Update Docs Command

Update documentation to reflect recent changes: $ARGUMENTS

## Your Task

1. **Identify changed code** - `git diff --name-only`
2. **Find related docs** - README, API docs, guides
3. **Update documentation** - Keep in sync with code
4. **Verify accuracy** - Docs match implementation

## Documentation Types

### README.md
- Installation instructions
- Quick start guide
- Feature overview
- Configuration options

### API Documentation
- Endpoint descriptions
- Request/response formats
- Authentication details
- Error codes

### Code Comments
- JSDoc for public APIs
- Complex logic explanations
- TODO/FIXME cleanup

### Guides
- How-to tutorials
- Architecture decisions (ADRs)
- Troubleshooting guides

## Update Checklist

- [ ] README reflects current features
- [ ] API docs match endpoints
- [ ] JSDoc updated for changed functions
- [ ] Examples are working
- [ ] Links are valid
- [ ] Version numbers updated

## Documentation Quality

### Good Documentation
- Accurate and up-to-date
- Clear and concise
- Has working examples
- Covers edge cases

### Avoid
- Outdated information
- Missing parameters
- Broken examples
- Ambiguous language

---

**IMPORTANT**: Documentation should be updated alongside code changes, not as an afterthought.
