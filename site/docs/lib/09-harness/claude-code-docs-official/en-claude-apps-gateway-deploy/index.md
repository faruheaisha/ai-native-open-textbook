---
title: "Claude apps gateway deployment and operations"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/claude-apps-gateway-deploy.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-deploy.md"
sourceSha256: "09270d8f4e207724e6aae6f48b9a970996cef9e8db5702abe212c1240143bdb0"
pageSha256: "391ef73e6a0fba6d48a61d5f752f1699ce566d2aac676bbbb2e31073a75e07fa"
contentMode: "local-full"
zh: ""
---

# Claude apps gateway deployment and operations

> Register the gateway with your IdP, build the container, deploy on Kubernetes or Cloud Run, and operate it: health checks, secret rotation, upgrades, and security.

This page covers the operational side of running [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway): registering an OAuth client in your identity provider (IdP), deploying the gateway as a container, and running it day-to-day. For every option in the `gateway.yaml` file the gateway reads at boot, see the [Configuration reference](https://code.claude.com/docs/en/claude-apps-gateway-config).

A production deployment follows four steps in order, and the sections below match them. The first two are where you make choices; the second two are reference material to consult once it's running.

1. [Set up your identity provider](#identity-provider-setup): register the OAuth client and check the per-IdP notes for Okta, Entra, and Google
2. [Deploy the gateway](#deployment): build a pinned container image and run it on Kubernetes, Cloud Run, or your own platform. This section also covers cost, bypass, multiple-gateway, and serverless decisions
3. [Set up operations](#operations): logs, health probes, outage behavior, secret rotation, and upgrades. Reference for when you're setting up monitoring and runbooks
4. [Review the security posture](#security): what data flows where, the threat model, and compliance answers. Reference for a security review

If a sign-in or boot fails along the way, go straight to [Troubleshooting](#troubleshooting), which is keyed on the error you see.

  **Deploy on your private network.** Claude Code only connects to a gateway whose address is private. This is a security guard, because a trusted gateway can push settings that run commands on developer machines. Put the gateway you deploy behind an internal load balancer or VPN and give it a hostname that resolves to private IPs only.

## 本篇目录

- [Identity provider setup](https://code.claude.com/docs)
- [Deployment](https://code.claude.com/docs)
- [Operations](https://code.claude.com/docs)
- [Security](https://code.claude.com/docs)
- [Troubleshooting](https://code.claude.com/docs)
- [Related](https://code.claude.com/docs)
