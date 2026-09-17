---
title: "Deploy Claude apps gateway on Google Cloud"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/claude-apps-gateway-on-gcp.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-on-gcp.md"
sourceSha256: "caa7e445cfbc099cddef18f5b448cb245d93c04df03ff514772a395cc1b4ba19"
pageSha256: "caa7e445cfbc099cddef18f5b448cb245d93c04df03ff514772a395cc1b4ba19"
contentMode: "local-full"
zh: ""
---

# Deploy Claude apps gateway on Google Cloud

> A worked example of running Claude apps gateway on Google Cloud: Cloud Run or GKE, Cloud SQL for PostgreSQL, Secret Manager, and service-account auth to Google Cloud's Agent Platform.

  This page walks through one way to run Claude apps gateway on Google Cloud. The configuration is a working example for customer-managed infrastructure rather than a supported production deployment; use it to see how the pieces fit together before adapting it to your own environment. For the platform-agnostic requirements, see the [deployment guide](https://code.claude.com/docs/en/claude-apps-gateway-deploy).

This example provisions Claude apps gateway on Google Cloud with Google Cloud's Agent Platform as the model upstream, using either Cloud Run or GKE for compute. Google Workspace is the example identity provider (IdP), but any OpenID Connect (OIDC) compliant IdP works; only the `oidc` block changes. See [Identity provider setup](https://code.claude.com/docs/en/claude-apps-gateway-deploy#identity-provider-setup) for per-IdP details.

## What you'll build

  <img src="https://mintcdn.com/claude-code/-uq-4JE0W_JO5Er5/images/claude-gateway-gcp-architecture.svg?fit=max&auto=format&n=-uq-4JE0W_JO5Er5&q=85&s=cb705151c69128ac0da235852d5600ab" alt="Diagram of Claude apps gateway on Google Cloud: Claude Code clients connect over HTTPS to the gateway (Cloud Run or GKE), which runs inside a VPC alongside a private-IP Cloud SQL database for session state. The gateway signs users in via OIDC against Google Workspace, reads config and secrets from Secret Manager, forwards model requests to Google Cloud's Agent Platform, and pulls its image from Artifact Registry at deploy." width="760" height="400" data-path="images/claude-gateway-gcp-architecture.svg" />

The deployment consists of:

* **Cloud Run** service or **GKE** Deployment running the gateway container
* **Artifact Registry** repository for the gateway image
* **Cloud SQL for PostgreSQL** instance, private IP only, for the gateway's [store](https://code.claude.com/docs/en/claude-apps-gateway-config#store)
* **Secret Manager** secrets for `gateway.yaml`, the JWT signing key, the OIDC client secret, and the Postgres URL
* **Service account** with `roles/aiplatform.user`, attached directly on Cloud Run or bound via Workload Identity on GKE
* **HTTPS front end** that you provide: an internal Application Load Balancer in front of Cloud Run, which this walkthrough configures the gateway for but doesn't create, or an internal **GKE Ingress** of class `gce-internal` on GKE

## Prerequisites

* A GCP project with billing enabled, and permission to create the resources above
* The `gcloud` CLI, authenticated with `gcloud auth login`, and Docker installed locally
* For the GKE track: `kubectl`, and a GKE cluster on the VPC created in the walkthrough below
* Access to the Claude models you need in Model Garden, in a region that publishes them
