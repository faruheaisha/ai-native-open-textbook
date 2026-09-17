---
title: "Claude Code Harness"
landing: true
tier: 3
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# Claude Code Harness

Claude Code Harness (CCH) is a development plugin for delegating planning,
implementation, validation, and review to Claude Code or Codex. Provide the
intended outcome and completion criteria; the assigned agents inspect the
existing code and organize the work.

## 课时

- **Model roles and your choices**
  - [full role table](/lib/09-harness/claude-code-harness-chachamaru/docs-model-routing-policy.md)
- **The safety layer**
  - [safety differences between hosts](/lib/09-harness/claude-code-harness-chachamaru/docs-hardening-parity.md)
- **Install by tool**
  - [scripts/setup-codex.sh --user](/lib/09-harness/claude-code-harness-chachamaru/docs-reports.md)
  - [notes](/lib/09-harness/claude-code-harness-chachamaru/docs-CURSOR_INTEGRATION.md)
- **Documentation**
  - [Tool-first onboarding](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding.md)
  - [Install routes](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-install.md)
  - [Migration check](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-migration.md)
  - [Skill trigger gate](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-skill-trigger-acceptance.md)
  - [Capability matrix](/lib/09-harness/claude-code-harness-chachamaru/docs-tool-capability-matrix.md)
  - [Distribution scope](/lib/09-harness/claude-code-harness-chachamaru/docs-distribution-scope.md)
  - [Work All evidence pack](/lib/09-harness/claude-code-harness-chachamaru/docs-evidence-work-all.md)
  - [Task requests and handoffs](/lib/09-harness/claude-code-harness-chachamaru/docs-prompt-calibration.md)
  - [Language / i18n](/lib/09-harness/claude-code-harness-chachamaru/docs-i18n.md)
- [Implementation Guide](/lib/09-harness/claude-code-harness-chachamaru/IMPLEMENTATION_GUIDE.md)
- [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/README_ja.md)
- **agents**
  - [Advisor Agent](/lib/09-harness/claude-code-harness-chachamaru/agents-advisor.md)
  - [livemsg-gate](/lib/09-harness/claude-code-harness-chachamaru/agents-livemsg-gate.md)
  - [Reviewer Agent](/lib/09-harness/claude-code-harness-chachamaru/agents-reviewer.md)
  - [Test-Wiring Auditor Agent](/lib/09-harness/claude-code-harness-chachamaru/agents-test-wiring-auditor.md)
  - [Worker Agent](/lib/09-harness/claude-code-harness-chachamaru/agents-worker.md)
- **文档**
  - [Advisor Strategy](/lib/09-harness/claude-code-harness-chachamaru/docs-advisor-strategy.md)
  - [Agent Frontmatter Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-agent-frontmatter-policy.md)
  - [Agent View (claude agents) Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-agent-view-policy.md)
  - [Claude harness Architecture](/lib/09-harness/claude-code-harness-chachamaru/docs-ARCHITECTURE.md)
  - [Benchmark Rubric](/lib/09-harness/claude-code-harness-chachamaru/docs-benchmark-rubric.md)
  - [Bootstrap Routing Contract](/lib/09-harness/claude-code-harness-chachamaru/docs-bootstrap-routing-contract.md)
  - [Branch Alignment Ledger](/lib/09-harness/claude-code-harness-chachamaru/docs-branch-alignment-ledger.md)
  - [Claude Code 2.1.99 → 2.1.110 — Harness 影響分類](/lib/09-harness/claude-code-harness-chachamaru/docs-cc-2.1.99-2.1.110-impact.md)
  - [Claude Code 2.1.99-2.1.111 影響整理](/lib/09-harness/claude-code-harness-chachamaru/docs-cc-2.1.99-2.1.111-impact.md)
  - [Claims Audit](/lib/09-harness/claude-code-harness-chachamaru/docs-claims-audit.md)
  - [Claude Code Compatibility](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE_CODE_COMPATIBILITY.md)
  - [Claude Code Setup: MCP, Telemetry, Provider Guidance](/lib/09-harness/claude-code-harness-chachamaru/docs-claude-code-setup-mcp-telemetry-provider.md)
  - [主要コマンド一覧](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-commands.md)
  - [Claude Code / Codex Feature Table（upstream snapshot 完全版）](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/index.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/01-機能一覧.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/02-Phase_44_追補.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/03-Phase_51_追補.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/04-Phase_52_追補.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/05-Phase_53_追補.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/06-Phase_69_追補_Claude_Code_2.1.133-2.1.142.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/07-Phase_133.6_追補_subagent_depth_concurrenc.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/08-機能詳細.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/09-Claude_Code_2.1.76_新機能.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/10-v2.1.99-v2.1.110_Opus_4.7_詳細_Phase_44.11.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/11-Opus_4.7_詳細_Phase_44.11.1.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/12-Phase_65_cognitive-load_3_surface_2026-0.md)
  - [Claude Code Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/13-関連.md)
  - [Claude host livemsg delivery (Mode 2)](/lib/09-harness/claude-code-harness-chachamaru/docs-claude-livemsg-delivery.md)
  - [CLAUDE.md 構造監査 — Phase 47.1.1 調査レポート](/lib/09-harness/claude-code-harness-chachamaru/docs-claude-md-structure-audit.md)
  - [スキルカタログ](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-skill-catalog.md)
  - [Codex MCP Diagnostics And Plugin Loading](/lib/09-harness/claude-code-harness-chachamaru/docs-codex-mcp-diagnostics.md)
  - [Codex Permission Profiles Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-codex-permission-profiles-policy.md)
  - [Codex Plugin Workflows Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-codex-plugin-workflows-policy.md)
  - [Codex Provider Setup Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-codex-provider-setup-policy.md)
  - [Codex Sandbox And Execution Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-codex-sandbox-execution-policy.md)
  - [認知負荷を下げる 3 つの HTML 画面 (Phase 65)](/lib/09-harness/claude-code-harness-chachamaru/docs-cognitive-load-surfaces.md)
  - [Content Layout](/lib/09-harness/claude-code-harness-chachamaru/docs-content-layout.md)
  - [cross-project-group.v1 Schema](/lib/09-harness/claude-code-harness-chachamaru/docs-cross-project-groups-schema.md)
  - [プロジェクトをまたいで検索するときの 3 層防御 (Phase 65.3)](/lib/09-harness/claude-code-harness-chachamaru/docs-cross-project-safety.md)
  - [Effort Level Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-effort-level-policy.md)
  - [Flat Review 2026-07-05 — Findings Closeout Ledger](/lib/09-harness/claude-code-harness-chachamaru/docs-flat-review-2026-07-05-closeout.md)
  - [GitHub Harness Plugin Benchmark](/lib/09-harness/claude-code-harness-chachamaru/docs-github-harness-plugin-benchmark.md)
  - [harness-mem Managed Companion Contract](/lib/09-harness/claude-code-harness-chachamaru/docs-harness-mem-companion-contract.md)
  - [harness-review operating model](/lib/09-harness/claude-code-harness-chachamaru/docs-harness-review-operating-model.md)
  - [Hokage Spin-Off Readiness](/lib/09-harness/claude-code-harness-chachamaru/docs-hokage-spin-off-readiness.md)
  - [Hooks type: "mcptool" 採用判断 (Phase 62.1.3)](/lib/09-harness/claude-code-harness-chachamaru/docs-hooks-mcp-tool-evaluation.md)
  - [I18n Language Contract](/lib/09-harness/claude-code-harness-chachamaru/docs-i18n-language-contract.md)
  - [Issue 105 Response Draft](/lib/09-harness/claude-code-harness-chachamaru/docs-issue-105-response-draft.md)
  - [Judgment Ledger v1](/lib/09-harness/claude-code-harness-chachamaru/docs-judgment-ledger.md)
  - [Known Limitations](/lib/09-harness/claude-code-harness-chachamaru/docs-known-limitations.md)
  - [Local dogfood / release alignment snapshot - 2026-06-22](/lib/09-harness/claude-code-harness-chachamaru/docs-local-dogfood-release-alignment-2026-06-22.md)
  - [Local Harness Environment Cleanup](/lib/09-harness/claude-code-harness-chachamaru/docs-local-harness-environment-cleanup.md)
  - [長時間タスク実行ガイド](/lib/09-harness/claude-code-harness-chachamaru/docs-long-running-harness.md)
  - [Memory Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-MEMORY_POLICY.md)
  - [MessageDisplay Hook Policy (Claude Code 2.1.152+)](/lib/09-harness/claude-code-harness-chachamaru/docs-message-display-policy.md)
  - [Migration Guide: v3 → v4.0 "Hokage"](/lib/09-harness/claude-code-harness-chachamaru/docs-MIGRATION-v4.md)
  - [Opus 4.7 影響整理](/lib/09-harness/claude-code-harness-chachamaru/docs-opus-4-7-impact.md)
  - [Opus 4.7 Vision 使用ガイド](/lib/09-harness/claude-code-harness-chachamaru/docs-opus-4-7-vision-usage.md)
  - [Output Governance Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-output-governance.md)
  - [Plans.md Archive Pattern](/lib/09-harness/claude-code-harness-chachamaru/docs-plans-archive-pattern.md)
  - [Plans Maintenance](/lib/09-harness/claude-code-harness-chachamaru/docs-plans-maintenance.md)
  - [Plugin and Managed Settings Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-plugin-managed-settings-policy.md)
  - [Positioning Notes](/lib/09-harness/claude-code-harness-chachamaru/docs-positioning-notes.md)
  - [Public Claims Contract](/lib/09-harness/claude-code-harness-chachamaru/docs-public-claims-contract.md)
  - [Phase 21 Release Checklist](/lib/09-harness/claude-code-harness-chachamaru/docs-release-checklist-phase21.md)
  - [Phase 21 Release Copy Drafts](/lib/09-harness/claude-code-harness-chachamaru/docs-release-copy-phase21.md)
  - [Release Preflight](/lib/09-harness/claude-code-harness-chachamaru/docs-release-preflight.md)
  - [Runtime Floor Secret-Read Allowlist](/lib/09-harness/claude-code-harness-chachamaru/docs-runtime-floor-secret-allowlist.md)
  - [Sandbagging-Aware Weak-Supervision Harness](/lib/09-harness/claude-code-harness-chachamaru/docs-sandbagging-aware-weak-supervision.md)
  - [Sandbox Allowlist Recipe (Firecrawl / Web Scraping 用)](/lib/09-harness/claude-code-harness-chachamaru/docs-sandbox-allowlist-recipe.md)
  - [Session ID Env Policy (Phase 62.2.4)](/lib/09-harness/claude-code-harness-chachamaru/docs-session-id-env-policy.md)
  - [Skill Orchestration Design Contract](/lib/09-harness/claude-code-harness-chachamaru/docs-skill-orchestration-design-contract.md)
  - [Skill Overrides Policy (Phase 62.2.5)](/lib/09-harness/claude-code-harness-chachamaru/docs-skill-overrides-policy.md)
  - [Skill Telemetry Policy (Phase 62.2.3)](/lib/09-harness/claude-code-harness-chachamaru/docs-skill-telemetry-policy.md)
  - [Skills Audit 2026-04-20](/lib/09-harness/claude-code-harness-chachamaru/docs-skills-audit-2026-04-20.md)
  - [Smoke Test — v4.2.0-arcana (Phase 44 Release)](/lib/09-harness/claude-code-harness-chachamaru/docs-smoke-test-v4.2.0.md)
  - [Task Budgets (Public Beta) 調査メモ](/lib/09-harness/claude-code-harness-chachamaru/docs-task-budgets-research.md)
  - [Team Composition](/lib/09-harness/claude-code-harness-chachamaru/docs-team-composition.md)
  - [/ultrareview と /harness-review の連携方針](/lib/09-harness/claude-code-harness-chachamaru/docs-ultrareview-policy.md)
  - [Phase 80 Upstream Adoption Plan - 2026-05-27](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-adoption-plan-2026-05-27.md)
  - [Phase 58 Upstream Adoption Plan - 2026-05-03](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-adoption-plan-phase58-2026-05-03.md)
  - [Phase 56 Follow-up Decisions - 2026-04-25](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-followups-phase56-2026-04-25.md)
  - [Phase 58 Follow-up Decisions - 2026-05-03](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-followups-phase58-2026-05-03.md)
  - [Claude Code / Codex upstream snapshot - 2026-04-21](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-update-snapshot-2026-04-21.md)
  - [Claude Code / Codex upstream snapshot - 2026-04-23](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-update-snapshot-2026-04-23.md)
  - [Claude Code / Codex upstream snapshot - 2026-04-25](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-update-snapshot-2026-04-25.md)
  - [Claude Code / Codex upstream snapshot - 2026-05-03](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-update-snapshot-2026-05-03.md)
  - [Claude Code upstream snapshot - 2026-05-07](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-update-snapshot-2026-05-07.md)
  - [Codex upstream snapshot - 2026-05-10](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-update-snapshot-2026-05-10.md)
  - [Claude Code upstream snapshot - 2026-05-15](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-update-snapshot-2026-05-15.md)
  - [Upstream snapshot - 2026-05-27 (Phase 80)](/lib/09-harness/claude-code-harness-chachamaru/docs-upstream-update-snapshot-2026-05-27.md)
  - [Weak-Supervision Elicitation Snapshot - 2026-05-06](/lib/09-harness/claude-code-harness-chachamaru/docs-weak-supervision-elicitation-snapshot-2026-05-06.md)
  - **architecture**
    - [Hokage Core Cross-Harness Architecture](/lib/09-harness/claude-code-harness-chachamaru/docs-architecture-hokage-core.md)
    - [Review Calibration](/lib/09-harness/claude-code-harness-chachamaru/docs-architecture-review-calibration.md)
  - **evidence**
    - [Dependabot Alerts Snapshot - 2026-05-27](/lib/09-harness/claude-code-harness-chachamaru/docs-evidence-dependabot-alerts-2026-05-27.md)
    - [Scorecard Code Scanning Snapshot - 2026-05-27](/lib/09-harness/claude-code-harness-chachamaru/docs-evidence-scorecard-alerts-2026-05-27.md)
  - **onboarding**
    - [Host Admission (N+1)](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-host-admission.md)
    - [N+1 dry-run: examplehost (stub)](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-host-examplehost-stub.md)
    - [Live CLI smoke — コピペだけ版](/lib/09-harness/claude-code-harness-chachamaru/docs-onboarding-host-live-cli-smoke.md)
  - **更新计划**
    - [Optional Briefs and Skill Manifest](/lib/09-harness/claude-code-harness-chachamaru/docs-plans-briefs-manifest.md)
    - [Named Plans Registry](/lib/09-harness/claude-code-harness-chachamaru/docs-plans-named-plans.md)
    - [Phase 110: Post-v5.0.0 Operator Closeout](/lib/09-harness/claude-code-harness-chachamaru/docs-plans-phase-110-post-v5-operator-closeout.md)
    - [Phase 111 — Multi-host Public supported + N+1 Host Registry](/lib/09-harness/claude-code-harness-chachamaru/docs-plans-phase-111-multi-host-supported.md)
    - [Project Spec And Plans SSOT Workflow](/lib/09-harness/claude-code-harness-chachamaru/docs-plans-spec-ssot.md)
    - [Team Mode and Issue Bridge](/lib/09-harness/claude-code-harness-chachamaru/docs-plans-team-mode.md)
    - [v5.1.0 Integration Goal Runbook — Phase 114/115 完遂オーケストレーション](/lib/09-harness/claude-code-harness-chachamaru/docs-plans-v5.1.0-integration-runbook.md)
  - **release**
    - [S5 Acceptance Ledger — redesign 線 区切りリリース (2026-07-08)](/lib/09-harness/claude-code-harness-chachamaru/docs-release-s5-acceptance-2026-07.md)
  - **rules**
    - [Active Watching Test Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-rules-active-watching-test-policy.md)
    - [CC アップデート追従ポリシー](/lib/09-harness/claude-code-harness-chachamaru/docs-rules-cc-update-policy.md)
    - [Cross-Repo Handoff Workflow (claude-code-harness ↔ harness-mem)](/lib/09-harness/claude-code-harness-chachamaru/docs-rules-cross-repo-handoff.md)
    - [Governance Rules — Rationale ("なぜこのルールが必要か")](/lib/09-harness/claude-code-harness-chachamaru/docs-rules-governance-rationale.md)
    - [Migration Residue Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-rules-migration-policy.md)
    - [Retired Alias Policy](/lib/09-harness/claude-code-harness-chachamaru/docs-rules-retired-alias-policy.md)
    - [Skill Editing — Templates & Command Migration Reference](/lib/09-harness/claude-code-harness-chachamaru/docs-rules-skill-editing-templates.md)
    - [Version Drift Detection](/lib/09-harness/claude-code-harness-chachamaru/docs-rules-version-drift.md)
  - **spec**
    - [Spec Sub-Spec: breezing-and-bridge](/lib/09-harness/claude-code-harness-chachamaru/docs-spec-breezing-and-bridge.md)
    - [Spec Sub-Spec: decision-card-surface](/lib/09-harness/claude-code-harness-chachamaru/docs-spec-decision-card-surface.md)
    - [Spec Sub-Spec: execution-backends-and-distribution](/lib/09-harness/claude-code-harness-chachamaru/docs-spec-execution-backends-and-distribution.md)
    - [Spec Sub-Spec: operations-memory-and-collaboration](/lib/09-harness/claude-code-harness-chachamaru/docs-spec-operations-memory-and-collaboration.md)
    - [Spec Sub-Spec: planning-and-host-adapter](/lib/09-harness/claude-code-harness-chachamaru/docs-spec-planning-and-host-adapter.md)
    - [Spec Sub-Spec: workflow-review-and-release](/lib/09-harness/claude-code-harness-chachamaru/docs-spec-workflow-review-and-release.md)
- **hooks**
  - [Hooks Best Practices](/lib/09-harness/claude-code-harness-chachamaru/hooks-BEST_PRACTICES.md)

开始学习 → [Advisor Agent](agents-advisor.md)
