---
title: "Harness Engineering 文集"
sourceId: "09-harness/harness-engineering-anthology"
sourceTitle: "Harness Engineering 文集"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/lopopolo/harness-engineering"
entryUrl: "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/sources/raw/hyperbola/robot-vacuum-canary-tailscale.mdx"
sourceRel: "sources/raw/hyperbola/robot-vacuum-canary-tailscale.mdx"
rawUrl: "/raw/09-harness/harness-engineering-anthology/sources/raw/hyperbola/robot-vacuum-canary-tailscale.mdx"
sourceSha256: "e114c5bf845a8f677b89c372ebb6033234cfa3c0cd707e99d5dbdd08a41b631f"
pageSha256: "e114c5bf845a8f677b89c372ebb6033234cfa3c0cd707e99d5dbdd08a41b631f"
contentMode: "local-full"
zh: ""
---

# Harness Engineering 文集

import \{ Image \} from "astro:assets";

import MermaidDiagram from "~/components/mermaid-diagram.astro";

import deployRunbookDiagram from "./deploy-runbook.mmd?raw";
import figure from "./robot-vacuum-maintenance.png?url";

I have a Valetudo robot vacuum named Loki that runs a custom Tailscale binary to
safely expose the web interface for a home camera with wheels to my LAN. That
setup works great until it becomes maintenance debt: upgrading the access path
can also break the access path.

[Codex.app][codex-app] upgraded Loki’s Tailscale binary from `v1.90.8` to
`v1.96.4`. More importantly, it changed the upgrade from replacing the
production binary over the production connection to a canary identity, a
checked-in runbook, and two explicit approvals from me.

<div class="mb-3 rounded-sm">
  &lt;Image
    class="mx-auto img-fluid d-block rounded-sm"
    height="500"
    width="500"
    src=\{figure\}
    alt="A cute white maintenance robot services a docked robot vacuum in a precision charging cradle, holding a screwdriver and a replacement module to suggest supervised software maintenance and staged deployment."
  />
</div>

The background here is David Anderson’s excellent [Tailscale
sucks][tailscale-sucks] post, which walks through jailbreaking a robot vacuum,
installing [Valetudo][valetudo], and running Tailscale on the small Linux system
inside the appliance. That post covers the initial setup. My problem was
maintenance. Once the vacuum is a little Linux host on the tailnet, somebody
still has to keep its access path patched without losing the only remote path
into the device.

Enabling Codex to do this upgrade is a small, real example of [harness
engineering][harness-engineering]. What I want to keep from it is not the canary
by itself, but the machinery Codex built around a maintenance job I historically
avoided, and sometimes did unsafely.

Here was [the tweet I posted during the canary run][canary-tweet]:

> the hard part is verification so Codex proposed giving my vacuum a canary
> tailscale identity so new extra small tailscale builds can be deployed AND
> TESTED before doing a cutover to an upgraded version. after 3 hours of
> cooking, it seems to work?

I cared about verification because this path had already failed in concrete
ways. Several prior Tailscale upgrades forced me to adjust build tags as
upstream added more `ts_omit_*` switches and `--extra-small` stopped carrying
behavior Loki depends on: Tailscale SSH, userspace networking, exit-node
support, and the bundled CLI. Twice I broke Tailscale SSH and had to recover
with the SSH key I had baked into the Valetudo image.

The old cutover path made that failure mode worse. It used the production
identity to replace the production binary. If `/data/tailscaled` disappeared
while the deploy was connected through it, the deploy could strand itself.

## Automation structure

There is a repo convention behind this automation: the Codex.app job is not the
task definition. The app provides the schedule, workspace, model, automation
memory, and inbox item[^inbox]. The repo carries the durable instructions.

The actual Codex.app prompt is just the pointer:

> Run the homelab Valetudo Tailscale upgrade assessment. Read
> `docs/automations/README.md` and
> `docs/automations/valetudo-tailscale-upgrades.md`, follow their guardrails,
> and open an inbox item with the required summary.

[^inbox]:
    https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/sources/raw/hyperbola/In/README.md Codex.app, an inbox item is the notification/work item the automation
    sends back to me when a run needs attention or has a summary I should read.

I learned that convention earlier the same day. I had asked Codex to make a
daily docs deploy job, and it put too much of the task body into the Codex.app
prompt. I pushed back and made the structure legible to all future agent runs by
putting it in the repository: scheduled automation behavior belongs in
`docs/automations/`, while the harness prompt stays slim and points back to the
repo doc.

That puts automations in the same category as skills. They can be versioned in
git, reviewed in PRs, changed by anyone working in the repo, and reused by the
next agent without copying a long prompt through the app UI. A PR can update the
automation contract next to the code and runbook it depends on. Over time, these
docs become points of shared leverage instead of private state attached to one
scheduled job.

The Valetudo Tailscale automation follows the same split. The scheduled run can
read release notes, inspect upstream source, compare build tags, build a local
`linux/arm64` candidate, open a PR, update automation memory, and open an inbox
item. It cannot deploy to Loki. I wanted that boundary because a bad deploy can
remove the access path the deploy itself is using.

The deploy path lives in a different place. Codex had already built a repo-local
Go tool under `hld/valetudotailscale/`, then reworked it into the repo’s
`hld`[^hld] pattern. The tool gives the runbook a narrow command surface for the
risky parts of the deploy, and the runbook says when those commands are allowed
to run.

[^hld]:
    https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/sources/raw/hyperbola/In/README.md this repo, `hld` means homelab local development tooling. It is the place
    for small checked-in programs that make agents do less free-form work: parse
    the repo, generate the command, test the scary shell snippet, and keep
    device layout as durable task memory. Code is free! the harness does not
    have to live only as prose.

The canary came out of that work. In the original discussion, I asked whether we
could stage a new build and test SSH before the destructive cutover. Codex laid
out the tradeoff: the same Loki identity cannot run two `tailscaled` daemons
against the same state at once, but a second Tailscale node can show whether the
new binary can boot, join the tailnet, and accept Tailscale SSH. I picked
`loki-canary`, then sketched the phases: build, copy into a canary slot over the
production identity, boot canary with separate state, test canary SSH, back up
production, promote over the canary identity, verify production, then stop the
isolated canary daemon.

That became a small command set that orchestrates each step in the deploy. The
first canary attempt also improved the tool. OpenSSH `scp` tried SFTP, legacy
`scp` did not exit cleanly against Loki, and the tool ended up streaming the
binary over SSH into the canary slot. Codex also added the Tailscale
`--accept-risk=lose-ssh` flag required for the canary auth flow and isolated
known-hosts handling for the new canary identity.

## Checked-in docs

Inside the repo, the automation doc lives at
`docs/automations/valetudo-tailscale-upgrades.md`, and the deploy runbook lives
at `docs/valetudo-tailscale-deploy-runbook.md`.

Here is the automation doc itself, with the private tailnet hostname redacted:


<summary>Automation doc at docs/automations/valetudo-tailscale-upgrades.md.</summary>

> **Valetudo Tailscale Upgrades Automation**
>
> The Valetudo Tailscale upgrades automation evaluates whether the custom
> Tailscale binary used on Valetudo-managed robot vacuums should move to a newer
> Tailscale release. Its canonical task definition lives in this file; the Codex
> harness automation should stay slim and should point back here instead of
> duplicating this runbook.
>
> The automation must read `docs/automations/README.md` before running and
> follow the repository-wide automation conventions there.
>
> **Schedule**
>
> Run once per week against the homelab repository.
>
> **Scope**
>
> This automation owns only the custom Valetudo Tailscale binary maintained by
> `hld/valetudotailscale/` and exposed through
> `go run ./hld/cmd/valetudo-tailscale-deploy`.
>
> The manual deploy process is documented in
> `docs/valetudo-tailscale-deploy-runbook.md`.
>
> The dependency sweep automation must not update this pin. If another
> automation or Dependabot proposes a Valetudo Tailscale version change, treat
> that pull request as out of scope for dependency auto-merge and require human
> review.
>
> **Current Behavior**
>
> The current default command builds Tailscale `v1.90.8` for `linux/arm64` using
> `./build_dist.sh tailscale.com/cmd/tailscaled` and deploys it to the
> production Loki tailnet identity at `/data/tailscaled`.
>
> The build is intentionally small, but it must preserve:
>
> - Tailscale SSH for root access to the vacuum over the tailnet;
> - userspace networking behavior needed by the vacuum environment;
> - exit-node behavior, including the code paths needed for routing and
>   advertising/serving exit-node traffic;
> - the bundled CLI path enabled by `ts_include_cli`, which keeps local
>   operational inspection possible on a constrained device.
>
> **Candidate Selection**
>
> 1. Fetch origin and inspect the latest `origin/trunk`.
> 2. Read `docs/automations/README.md` and this file.
> 3. Identify the current Tailscale tag in
>    `hld/valetudotailscale/build/source.go`.
> 4. Find the latest stable upstream Tailscale release from authoritative
>    Tailscale sources.
> 5. Read the release notes for every release between the current tag and the
>    candidate tag.
> 6. Inspect upstream build-tag behavior for the candidate release, including
>    `build_dist.sh` and source files that define or consume `ts_omit_*` tags.
> 7. Compare the current and candidate upstream extra-small omit sets. Generate
>    each set from the matching upstream checkout with
>    `go run ./cmd/featuretags --min --add=osrouter`, which is the feature-tag
>    basis for `build_dist.sh --extra-small`.
> 8. Identify every omit tag added or removed from that extra-small baseline
>    between the current and candidate tags.
>
> Skip the update and report why if release notes are missing, upstream tag
> semantics are unclear, the candidate has known regressions for Linux ARM64,
> userspace networking, SSH, or exit nodes, or the candidate is a major behavior
> change rather than a routine Tailscale update.
>
> **Build-Tag Safety**
>
> Before proposing an update, reason explicitly about the omit tags in
> `hld/valetudotailscale/build/tags.go`.
>
> The build must keep `ts_include_cli`.
>
> The custom omit list should preserve the original extra-small intent wherever
> it is safe to do so. When upstream adds new extra-small omit tags, add them to
> `hld/valetudotailscale/build/tags.go` unless the tag removes, or appears to
> remove, behavior required by this runbook. If a new extra-small omit tag is
> not taken, the run summary must say why.
>
> Do not add omit tags that contain or imply any of these feature areas:
>
> - `ssh`;
> - `netstack`;
> - `route` or `router`;
> - `exit`.
>
> If upstream renames build tags, removes a tag, adds a new default omission, or
> changes how SSH, userspace networking, routing, or exit-node behavior is
> built, stop and open an inbox item instead of making a pull request.
>
> Do not rely on the local validator alone for this decision. The validator
> checks tag names, but the automation must also read upstream feature
> descriptions and source references for new omit tags to catch renamed or
> indirect feature areas.
>
> Compile success alone is not enough to prove the update is safe. The
> automation must connect the release-note and source-code review to the feature
> requirements above.
>
> **Build-Only Check**
>
> For a candidate version, run a local build-only check:
>
> ```text
