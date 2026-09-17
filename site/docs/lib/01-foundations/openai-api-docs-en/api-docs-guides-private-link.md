---
title: "Private Link"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/private-link.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/private-link.md"
sourceSha256: "17d8c77b67499a3f44fde7bd9907f859e9db9310c5b9c2aeebdcabb5f3950dd7"
pageSha256: "17d8c77b67499a3f44fde7bd9907f859e9db9310c5b9c2aeebdcabb5f3950dd7"
contentMode: "local-full"
zh: ""
---

# Private Link

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

OpenAI Private Link lets Azure workloads reach regional OpenAI API endpoints through Azure Private Link instead of connecting directly to public API endpoints. Create a private endpoint for each OpenAI-provided regional Private Link Service, map its regional host name in private DNS, and send normal authenticated API requests to that host name.

Use Private Link when your organization has strict requirements to keep traffic on Azure private networking. If you don't have private-network requirements, OpenAI's public endpoints are simpler to set up and operate. Private Link isn't compatible with IP allowlist controls or mutual TLS (mTLS); contact OpenAI if you need help choosing the right enterprise network controls.

Private Link is currently not self-service. Work with your OpenAI contact or
  [contact sales](https://openai.com/contact-sales/) to request access and
  receive the regional Private Link Service aliases or resource identifiers you
  need.

## Understand how Private Link works

Some customers have been using the legacy Private Link solution (v1), which connects each Private Endpoint to a specific OpenAI API cluster. The current regional solution differs in these ways:

|                       | Legacy Private Link (v1)                                                    | Regional Private Link                                                                    |
| --------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Host name             | Cluster-specific, such as `privatelink.enterprise.unified-1.api.openai.com` | Regional, such as `southcentralus.privatelink.api.openai.com`                            |
| OpenAI routing        | Pinned to one OpenAI API cluster                                            | Regional private-edge gateway that can route to more than one backing OpenAI API cluster |
| Customer health check | Older v1 health check paths                                                 | `GET /v2/privatelink_healthcheck`                                                        |

A request follows this path:

1. Your application resolves a regional Private Link host name through your private DNS.
2. The host name resolves to an Azure Private Endpoint in your virtual network.
3. The Private Endpoint connects to the regional OpenAI Private Link Service.
4. The Private Link Service sends the request to OpenAI's regional private-edge gateway.
5. The gateway routes the request to an enterprise-enabled backing OpenAI API cluster for that regional rail.

Within a regional rail, Private Link can route around an unavailable backing cluster and OpenAI can add backing clusters without requiring you to reconfigure your Private Endpoints. It doesn't automatically move traffic from the regional host name you selected to a different regional Private Endpoint. Don't assume that Private Link inherits OpenAI's public endpoint routing behavior; configure how your application fails over between regions.

## Choose regional endpoints

OpenAI provides the exact Private Link Service alias or resource identifier during onboarding. The current production regional host names are:

| Region label       | Customer host name                          |
| ------------------ | ------------------------------------------- |
| South Central US   | `southcentralus.privatelink.api.openai.com` |
| West US            | `westus.privatelink.api.openai.com`         |
| East US 2          | `eastus2.privatelink.api.openai.com`        |
| Spain Central / EU | `spaincentral.privatelink.api.openai.com`   |

The Spain Central / EU host name can route to backing clusters in other EU regions, such as North Europe.

## Set up Private Link

### 1. Provide onboarding information

Send OpenAI:

- The Azure subscription IDs that need access to the OpenAI Private Link Services.
- Your OpenAI organization ID.
- The regions you need.
- Operational contacts for maintenance and regional traffic-switching notices.

OpenAI grants the subscriptions visibility and approval for the appropriate regional Private Link Services, then provides the Private Link Service aliases or resource identifiers.

### 2. Create private endpoints

Create one Private Endpoint for each selected region. Azure requires a Private Endpoint to share the region of the customer virtual network. Set `--location` to that region, which might differ from the OpenAI Private Link Service region.

The following command uses an OpenAI-provided Private Link Service resource identifier:

```bash
az network private-endpoint create \
  --name openai-privatelink-southcentralus \
