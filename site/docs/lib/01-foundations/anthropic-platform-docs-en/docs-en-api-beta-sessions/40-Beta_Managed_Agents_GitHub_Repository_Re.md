---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/sessions.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions.md"
sourceSha256: "e4a8446bb6d4b0344d7f996b22b5ecbd47536df1d7800ee2865d8dc67a16abc2"
pageSha256: "d9109eb4948a2a1f2d0d38508fd84d259ce4900aa1dd3182e4a22811b0d1a04f"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents GitHub Repository Resource Params

- `BetaManagedAgentsGitHubRepositoryResourceParams object`

  Mount a GitHub repository into the session's container.

  - `type: "github_repository"`

  - `url: string`

    Github URL of the repository

    minLength: 1, maxLength: 2048

  - `authorization_token: optional string`

    GitHub authorization token used to clone the repository. Required for private repositories; optional for public ones.

    minLength: 1, maxLength: 4096

  - `checkout: optional BetaManagedAgentsBranchCheckout or BetaManagedAgentsCommitCheckout or null`

    Branch or commit to check out. Defaults to the repository's default branch.

    - `BetaManagedAgentsBranchCheckout object`

      - `type: "branch"`

      - `name: string`

        Branch name to check out.

        minLength: 1, maxLength: 255

    - `BetaManagedAgentsCommitCheckout object`

      - `type: "commit"`

      - `sha: string`

        Full commit SHA to check out.

        minLength: 7, maxLength: 64

  - `mount_path: optional string or null`
