---
title: "Fix and verify security findings"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/security/plugin/fix-findings.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/security/plugin/fix-findings.md"
sourceSha256: "ab8ac93a574c7f12ac2409ecb1c175f67e31634054fcbd8daba4abae2ba8d81a"
pageSha256: "ab8ac93a574c7f12ac2409ecb1c175f67e31634054fcbd8daba4abae2ba8d81a"
contentMode: "local-full"
zh: ""
---

# Fix and verify security findings

> For the complete documentation index, see [llms.txt](https://learn.chatgpt.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use Codex Security to turn an accepted security finding into a focused,
verified patch. You can work in the Security workbench or run the remediation
workflow from a prompt, the command line, or CI/CD. Codex validates the issue
and, when testing is safe and practical, adds a focused regression test that
fails before the fix and passes after it. It also checks that legitimate
behavior still works. If a regression test is unsafe or infeasible, Codex
records the proof gap and provides the strongest repeatable validation
artifact instead.

Start with one accepted finding and review the proposed patch and verification
evidence. If the workflow meets your standards, process other accepted
findings one at a time in separate Codex tasks or CI/CD jobs. Keeping each task
scoped makes its code changes and evidence easier to review.

## Fix a finding in the UI

Open an accepted finding from **Findings** or a completed scan in **Scans**.
Review its evidence, then use **Patch** to generate, review, apply, and verify
one focused fix.

1. Generate a focused patch

   Open the finding, select the **Patch** tab, and select **Generate patch**.
   Codex validates or reproduces the issue when feasible and writes a patch
   artifact without modifying the selected checkout.

2. Review the proposed diff

   Read every changed source, regression test, and validation artifact. Reject
   broad refactors, unrelated cleanup, or changes that weaken another security
   control.

3. Apply the patch locally

   Select **Apply patch** only after the diff is acceptable. Codex applies the
   exact generated patch to the working tree and records that state. Review the
   working-tree diff before continuing.

4. Verify the fix

   Select **Verify fix**. Codex reruns the original reproducer or the strongest
   available exploit check. If a regression test is safe and practical, Codex
   checks that it fails before the fix and passes after it. If the test is
   unsafe or infeasible, Codex records the proof gap and provides the
   strongest repeatable validation artifact instead. It also checks
   legitimate behavior, nearby bypasses, and relevant repository tests.

5. Close the finding deliberately

   Verification doesn't automatically close a finding. Review the commands,
   results, and remaining proof gap, then close the finding with an accurate
   reason or keep it open for more work.

<figure className="not-prose my-8">
  &lt;CodexScreenshot
    alt="Native Codex Security workbench showing the generated patch for an accepted finding"
    lightSrc=\{fixFindingPatch.src\}
    darkSrc=\{fixFindingPatchDark.src\}
    maxHeight="460px"
  />
  <figcaption className="mt-3 text-sm text-secondary">
    Review the generated security fix before applying it to your checkout.
  </figcaption>
</figure>

## Fix a finding from the CLI

Use the Codex CLI for an accepted finding from a scan, ticket, advisory,
disclosure, security assessment, or internal review.

Install Codex Security in the `CODEX_HOME` that `codex exec` uses before you
run these commands. A fresh CI runner doesn't include marketplace plugins by
default.

```text
