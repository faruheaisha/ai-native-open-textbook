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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-servers-ecosystem.md"
sourceRel: "guide/ecosystem/mcp-servers-ecosystem.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/mcp-servers-ecosystem.md"
sourceSha256: "1875888571dbb7a38db6c0267188775718596a25164159e18ffc2c8999b0a6b2"
pageSha256: "bae8d514b757406f8d24209f4996246b1fb7f8ddd8e0663b61f0190b7fb7f417"
contentMode: "local-full"
zh: ""
---

## Monthly Watch Methodology

This section documents the process for maintaining this guide with monthly ecosystem updates.

### Sources to Monitor

**Official Sources**:
- [Anthropic MCP GitHub](https://github.com/modelcontextprotocol/servers)
- [Anthropic Blog](https://www.anthropic.com/news)
- [MCP Protocol Spec](https://modelcontextprotocol.io)

**Community Sources**:
- [GitHub topic: mcp-servers](https://github.com/topics/mcp-servers) (7260+ servers)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) (91.5K stars, 2026-07-27, was 75.5K)
- [MCP Registry](https://github.blog/ai-and-ml/generative-ai/how-to-find-install-and-manage-mcp-servers-with-the-github-mcp-registry/)

**Discussions**:
- [Reddit r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/)
- [Reddit r/mcp](https://www.reddit.com/r/mcp/)
- [X/Twitter #MCPServer](https://twitter.com/search?q=%23MCPServer)

**Technical Articles**:
- [Blog Skyvia](https://blog.skyvia.com/best-mcp-servers/)
- [Builder.io Blog](https://www.builder.io/blog/best-mcp-servers-2026)
- [Cyberpress](https://cyberpress.org/best-mcp-servers/)

### Monthly Review Checklist

- [ ] **Official servers**: Check Anthropic GitHub for new releases
- [ ] **Community servers**: Review GitHub topics for trending servers (≥50 stars, <3 months release)
- [ ] **Ecosystem changes**: Monitor Anthropic blog for protocol updates
- [ ] **Server health**: Re-evaluate existing servers (releases, issues, maintenance)
- [ ] **Security**: Check for disclosed vulnerabilities (GitHub Security Advisories)
- [ ] **Deprecations**: Identify archived or unmaintained servers
- [ ] **Update guide**: Add new validated servers, remove deprecated ones

### Evaluation Template

For each candidate server:

1. **Basic Validation**:
   - GitHub stars ≥50?
   - Last release <3 months?
   - Documentation complete (README + examples + config)?
   - Tests/CI present?

2. **Quality Scoring** (see [Evaluation Framework](#evaluation-framework)):
   - Maintenance: `/10`
   - Documentation: `/10`
   - Tests: `/10`
   - Performance: `/10`
   - Adoption: `/10`
   - **Total**: `/50` → Normalized to `/10`

3. **Use Case Analysis**:
   - What gap does it fill?
   - Is it already covered by official servers?
   - What are the alternatives?

4. **Decision**:
   - **Integrate** (score ≥8): Add full section to guide
   - **Monitor** (score 6-7): Add to [Watch List](/lib/09-harness/claude-code-ultimate-guide/docs-resource-evaluations-watch-list), re-evaluate next month
   - **Reject** (score <6): Document reason in [Excluded Servers](#excluded-servers)

### Integration Workflow

When adding a new server:

1. Create section in appropriate category (Browser Automation, DevOps, etc.)
2. Include:
   - Use case description
   - Key features table
   - Setup instructions
   - Configuration examples
   - Quality score
   - Limitations & workarounds
   - Alternatives comparison
   - Resources (GitHub, docs, tutorials)
3. Update [Quick Start Stack](#quick-start-stack) if MVP-relevant
4. Update [Production Deployment](#production-deployment) checklist if security-critical
