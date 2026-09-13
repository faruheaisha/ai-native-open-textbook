---
title: "Setup CI/CD Pipeline"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/README.md"
zh: ""
---

# Setup CI/CD Pipeline

Implement comprehensive DevOps quality gates adapted to project type:

1. **Analyze project**: Detect language(s), framework, build system, and existing tooling
2. **Configure pre-commit hooks** with language-specific tools:
   - Formatting: Prettier/Black/gofmt/rustfmt/etc.
   - Linting: ESLint/Ruff/golangci-lint/Clippy/etc.
   - Security: Bandit/gosec/cargo-audit/npm audit/etc.
   - Type checking: TypeScript/mypy/flow (if applicable)
   - Tests: Run relevant test suites
3. **Create GitHub Actions workflows** (.github/workflows/):
   - Mirror pre-commit checks on push/PR
   - Multi-version/platform matrix (if applicable)
   - Build and test verification
   - Deployment steps (if needed)
4. **Verify pipeline**: Test locally, create test PR, confirm all checks pass

Use free/open-source tools. Respect existing configs. Keep execution fast.

---
**Last Updated**: August 4, 2026
**Claude Code Version**: 2.1.220
**Sources**:
- https://code.claude.com/docs/en/commands
**Compatible Models**: Claude Fable 5, Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Opus 4.8, Claude Haiku 4.5
