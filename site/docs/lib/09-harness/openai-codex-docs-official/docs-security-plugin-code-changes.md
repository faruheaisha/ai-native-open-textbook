---
title: "Review code changes for security"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/security/plugin/code-changes.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/security/plugin/code-changes.md"
sourceSha256: "852845125fe9eee5456a90d144c2376fc84e798d412ea9166e97cc3abe51da2c"
pageSha256: "852845125fe9eee5456a90d144c2376fc84e798d412ea9166e97cc3abe51da2c"
contentMode: "local-full"
zh: ""
---

# Review code changes for security

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Run a security change review to find regressions in one Git-backed change set.
Codex reviews each changed source-like file and its directly supporting code.
It doesn't expand the review into a full repository audit.

To scan an entire repository instead of a specific change, see [Run a security
scan](https://learn.chatgpt.com/docs/security/plugin/scans).

## Run a manual review

In the desktop app, open **Security**, select **Scans**, and select **+ Scan**.
Choose the repository, then select **Changes**. Review uncommitted changes, a
single commit, or a base and head revision. **Deep scan** isn't available for a
changes scan.

You can also ask Codex to review uncommitted changes in a conversation:

```text
Use $codex-security:security-diff-scan to review my current uncommitted changes for security regressions.
```

For a commit or branch range, specify both revisions when needed:

```text
Use $codex-security:security-diff-scan to review the changes from origin/main to HEAD for security regressions. Focus on authentication, authorization, input handling, filesystem access, network requests, and secrets.
```

You can also name a pull request when its base and head revisions are available
in the local checkout.

## Confirm the change in setup

1. Select **Changes**.
2. Confirm the checked-out repository, current branch, and latest commit.
3. Under **Changes to review**, choose:
   - `Uncommitted changes` for the current working tree.
   - The latest commit for a single-commit review.
   - A base and head revision for a branch or pull-request range.
4. Confirm that the summary describes the change you intended to review.
5. Select **Start scan**.

Codex doesn't check out another branch or switch the selected working tree. If
a requested revision isn't available locally, fetch it before the review or
provide a locally available base and head.

## Act on findings

After reviewing the results, [fix and verify an accepted
finding](https://learn.chatgpt.com/docs/security/plugin/fix-findings) or [export and track
findings](https://learn.chatgpt.com/docs/security/plugin/export-findings).

## Automate reviews in CI/CD

If you have access to the beta standalone CLI, see [Run Codex Security in
CI](https://learn.chatgpt.com/docs/security/cli/ci) for structured JSON, a severity policy, and SARIF
upload. Continue with this section to invoke the installed plugin skill
through `codex exec`.

Run `$codex-security:security-diff-scan` in CI when the runner can invoke the
Codex CLI without interaction. First, install the CLI without exposing the scan
credential:

```bash
npm install --global @openai/codex
```

Install the Codex Security plugin in the CLI:

```bash
codex plugin add codex-security@openai-curated
```

The install command uses the public Codex CLI plugin marketplace. Check the
[plugin changelog](https://learn.chatgpt.com/docs/security/plugin/changelog) before you depend on a
specific plugin version or feature in CI.

Next, provide an OpenAI API key from your CI secret store as
`CODEX_SECURITY_API_KEY`. Expose the credential only for the scan:

```bash
CODEX_API_KEY="$CODEX_SECURITY_API_KEY" codex exec \
  --sandbox workspace-write \
  "Use \$codex-security:security-diff-scan to review changes from $BASE_REVISION to $HEAD_REVISION for security regressions. Do not modify the checkout."
```

The writable sandbox lets the scan create temporary artifacts. The prompt
still requires Codex to leave the source checkout unchanged.

The scan writes its output to
