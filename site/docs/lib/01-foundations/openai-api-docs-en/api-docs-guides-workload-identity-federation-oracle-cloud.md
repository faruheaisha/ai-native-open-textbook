---
title: "Configuring workload identity federation for Oracle Cloud Infrastructure"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/workload-identity-federation/oracle-cloud.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/workload-identity-federation/oracle-cloud.md"
sourceSha256: "90d22c23ab22453a805b0d11b7fe98e5d0131d295712e44bf4f464315535d809"
pageSha256: "90d22c23ab22453a805b0d11b7fe98e5d0131d295712e44bf4f464315535d809"
contentMode: "local-full"
zh: ""
---

# Configuring workload identity federation for Oracle Cloud Infrastructure

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Use Oracle Cloud Infrastructure (OCI) as a Workload Identity Provider by exchanging an Oracle Identity Cloud Service (IDCS) access token for a short-lived OpenAI access token. An OCI instance principal signs a token exchange request to an identity domain in the same tenancy. OpenAI validates the resulting token and authorizes the OCI workload to act as a mapped OpenAI service account.

For Codex, use this page to get and inspect the Oracle token. Then [configure Codex workload identity](https://developers.openai.com/codex/enterprise/workload-identity) to write that token to a file and point Codex to it. The service-account mapping and SDK examples on this page apply to the OpenAI API.

This setup does not require an OpenAI API key, a custom Oracle OAuth resource application, or dynamic group grants to a custom application.

## Set up the OCI workload

Run your workload on an OCI Compute instance with an instance principal. For Oracle Kubernetes Engine (OKE), confirm which identity signs the request: the standard instance principal signer typically identifies the worker node, not an individual Kubernetes pod.

The signer obtains credentials from the [OCI instance metadata service](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/gettingmetadata.htm). Verify the workload can reach the link-local metadata endpoint:

```bash
curl --fail --silent \
  --header "Authorization: Bearer Oracle" \
  http://169.254.169.254/opc/v2/instance/id
```

The workload must also be able to make outbound HTTPS requests to the identity domain in its tenancy. The metadata endpoint itself does not require a NAT gateway or an internet connection.

### Request an Oracle identity token

Use `InstancePrincipalsSecurityTokenSigner` from the OCI Python SDK to sign an OAuth token exchange request to your identity domain:

```text
