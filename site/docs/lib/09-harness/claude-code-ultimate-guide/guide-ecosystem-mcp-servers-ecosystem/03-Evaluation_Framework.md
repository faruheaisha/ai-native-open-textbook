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
pageSha256: "fb5f3a863902822d4f7410d1c9007e79c117c13f951b93f5e28e928f868138a4"
contentMode: "local-full"
zh: ""
---

## Evaluation Framework

All community servers are evaluated against these criteria:

| Criterion | Threshold | Justification |
|-----------|-----------|---------------|
| **GitHub Stars** | ≥50 | Minimum community validation |
| **Recent Release** | <3 months | Active maintenance |
| **Documentation** | README + examples + config | Reduces adoption friction |
| **Tests/CI** | ✅ Automated | Ensures stability |
| **Use Case** | Not covered by official servers | Avoids redundancy |
| **License** | OSS required | Sustainability and auditability |

**Quality Score Components**:
- Maintenance (10 points): Release frequency, issue response time
- Documentation (10 points): README completeness, examples, troubleshooting
- Tests (10 points): Test coverage, CI/CD automation
- Performance (10 points): Response time, resource efficiency
- Adoption (10 points): Community usage, production deployments

**Total Score**: `/50` → Normalized to `/10` for final rating.

### Usage Principles (Beyond the Evaluation Checklist)

**Keep the active tool count small.** Every tool schema exposed to the model consumes context tokens and adds decision surface. Production observations indicate that exposing large numbers of tools simultaneously increases hallucination rates: the model has more irrelevant options to confuse with the correct one. Prefer multiple focused servers (each scoped to a domain) over a single omnibus server with dozens of tools. (Zineb Bendhiba, Principal Software Engineer at Red Hat, [IFTTD ep 326 "MCP Servers"](https://www.ifttd.io/episodes/mcp-servers)). For actual token measurements across popular servers rather than the general principle, see [what MCP servers really cost in tokens](https://florian.bruniaux.com/guides/mcp-servers-token-cost/).

**Design MCP tools around complete user intents, not individual API operations.** A tool that handles a single API call forces the agent to compose five sequential calls, each introducing independent failure probability. A tool that encapsulates a full workflow ("place the order including applying the active discount") keeps the model on a single, well-defined path. (Frédéric Barthelet, engineer, [IFTTD ep 329 "Front agentique"](https://www.ifttd.io/episodes/front-agentique))

**The LLM is stateless; the client holds all routing intelligence.** The model receives tool schemas on each request but has no memory of prior server calls from earlier in the session. Claude Code (as the MCP client) is responsible for routing, retrying, and composing results. Understanding this separation prevents the common mistake of treating a remote MCP server as an intelligent collaborator rather than as a stateless API. (Zineb Bendhiba, Principal Software Engineer at Red Hat, [IFTTD ep 326 "MCP Servers"](https://www.ifttd.io/episodes/mcp-servers))

**MCP is best read as a standardized integration layer, not a new paradigm.** Rather than writing one bespoke integration per data source or tool, the protocol lets a single client speak one language to many servers. Framing it this way cuts through a lot of the hype cycle around MCP: it is the same problem system design has solved before with API gateways and service meshes, applied to how LLMs reach tools. (ByteByteGo, "MCP", 2025)

**Sizing a server for an agentic client starts from the same back-of-the-envelope formula used for any API, with one caveat.** A rough estimate: QPS equals active users times actions per user divided by 86,400 seconds in a day, with peak load usually running two to three times above that average. That peak multiplier was calibrated on human traffic patterns and is probably an underestimate for agents, which tend to hit a server in bursts rather than a smoothed-out stream throughout the day; size headroom accordingly. (ByteByteGo, "Back-of-the-Envelope Estimation," 2022, and "URL Shortener," 2025)
