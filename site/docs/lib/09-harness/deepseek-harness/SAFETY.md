---
title: "Safety"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/SAFETY.md"
sourceRel: "SAFETY.md"
rawUrl: "/raw/09-harness/deepseek-harness/SAFETY.md"
sourceSha256: "62075bb51e0f7790441e7722ff12063107b4866019332e71ef01b63b6f880fee"
pageSha256: "62075bb51e0f7790441e7722ff12063107b4866019332e71ef01b63b6f880fee"
contentMode: "local-full"
zh: ""
---

# Safety

English | [中文](/lib/09-harness/deepseek-harness/SAFETY.zh)

## Experimental status

DeepSeek Harness is experimental developer-preview software. It has not undergone a security audit and must not be treated as secure or production-ready.

The project can execute model-generated code and commands, load third-party plugins, and access the network, processes, credentials, and files made available to it. Incorrect model output, defects, misconfiguration, malicious input, or untrusted plugins may damage the host computer, modify or delete files, disclose data or credentials, or cause other unintended effects.

## Sandbox limitations

Sandboxing, approval prompts, and permission controls can reduce risk, but they do not guarantee isolation or prevent damage. Even correctly enforced restrictions cannot protect resources that the project is allowed to access.

Do not rely on DeepSeek Harness as the sole security control for untrusted workloads.

## Responsible use

- Run the project with the least privileges and access required.
- Prefer a disposable virtual machine, container, or dedicated environment.
- Keep backups of files that the project can access.
- Do not expose sensitive credentials or data unless you accept the risk.
- Review plugins, configuration, and proposed commands before allowing them to run.

## No warranty or liability

Use DeepSeek Harness at your own risk. The software is provided without warranty under the [MIT License](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/LICENSE/README.md). To the maximum extent permitted by applicable law, the authors and copyright holders are not responsible for damage to computers, loss or disclosure of data, loss of files, or other harm arising from use of the project.
