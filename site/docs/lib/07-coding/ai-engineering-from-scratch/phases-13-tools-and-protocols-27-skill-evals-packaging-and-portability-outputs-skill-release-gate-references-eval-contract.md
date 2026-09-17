---
title: "Evaluation contract"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/27-skill-evals-packaging-and-portability/outputs/skill-release-gate/references/eval-contract.md"
sourceRel: "phases/13-tools-and-protocols/27-skill-evals-packaging-and-portability/outputs/skill-release-gate/references/eval-contract.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/27-skill-evals-packaging-and-portability/outputs/skill-release-gate/references/eval-contract.md"
sourceSha256: "280d5afab9be15c6e8c5efd57d9e41dc0ee591368af27f735f10fda3d35126a9"
pageSha256: "280d5afab9be15c6e8c5efd57d9e41dc0ee591368af27f735f10fda3d35126a9"
contentMode: "local-full"
zh: ""
---

# Evaluation contract

A release candidate passes only when all required surfaces pass:

- Structure: before reading configuration, a physical-tree preflight rejects a symlinked root, parent, or entry, missing required regular files, and special files. Then directory name matches frontmatter name, required metadata exists, runtime extensions are explicitly declared, direct references resolve, package size and type limits pass, no obvious secret pattern is present, output and failure contracts exist, and no unreferenced companion file ships.
- Triggering: positive prompts activate and near-miss negatives remain inactive. Report confusion counts, precision, recall, and every raw per-run prediction. Local integrity binds the complete observation sequences and routing fixture to their source and SHA-256 digest, not only run zero or aggregate rates.
- Stability: run every case repeatedly and report a per-case pass rate.
- Artifact: apply the same assertions to baseline and with-skill outputs. The skill output must pass and demonstrate improvement. A production claim binds both captured strings to their source and SHA-256 digests.
- Scripts: require explicit pass/fail evidence from deterministic script tests, including repeated execution. Production evidence binds the complete script and safety check set to a captured source and SHA-256 digest.
- Safety: require every declared authority-boundary case to pass. Averages cannot hide one escape.
- Installed tree: verify the clean installed copy against the recorded file manifest before activation. Require `manifestVersion: 1` and `algorithm: "sha256"`. Treat `assets/manifest.json` as reserved metadata and exclude it from its own `files` map; authenticate that manifest through a trusted outer release or registry channel.
- Portability: state whether each target host is native, needs an adapter, or is unsupported. List missing capabilities. Require at least one host and a positive native-host threshold. Local integrity binds the captured requirements and host matrix to its probe source and SHA-256 digest.

Keep routing evals separate from deterministic harness activation. The former measures discoverability; the latter isolates the workflow and artifact behavior.

The shipped JSON values are deterministic fixtures for learning the gate. They can set `fixturePassed` but never `productionReady` or `passed`. For a real release, set `evaluationMode` to `captured-observations`, `artifactMode` to `captured-artifacts`, `evidenceMode` to `captured-results`, and `hostMode` to `captured-capabilities`; record one boolean prediction per run and bind the complete observation set to its source and SHA-256 digest; replace the baseline and with-skill strings with artifacts captured from the same task and environment; record non-empty capture sources and matching SHA-256 artifact digests; replace every evidence verdict with a captured test result; bind the complete evidence set to its source and SHA-256 digest; replace the simulated capability matrix with captured host-probe results and bind it to its source and digest; rebuild the manifest; and install into a clean destination.

Those local checks can set `localEvidenceReady`. They do not prove capture because the bundle author can relabel fixtures and recompute every digest. The evaluator therefore hashes the complete five-config evidence root and requires an external `attestationVersion: 1` JSON object that binds it. Supply the attestation from outside the bundle and provide the SHA-256 of its exact bytes through `--trusted-attestation-sha256`, sourced from an out-of-band trusted policy. Only the six-layer gate plus local integrity plus this trust anchor can set `productionReady` and `passed`.
