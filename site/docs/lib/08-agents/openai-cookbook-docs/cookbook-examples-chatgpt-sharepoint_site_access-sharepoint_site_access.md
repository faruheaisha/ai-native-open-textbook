---
title: "Manage SharePoint site access with the ChatGPT Admin API"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/chatgpt/sharepoint_site_access/sharepoint_site_access.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/chatgpt/sharepoint_site_access/sharepoint_site_access.md"
sourceSha256: "4243ba2f35287324155cfd0212f075c93c134d1adca76524a8fa13e6e210b235"
pageSha256: "4243ba2f35287324155cfd0212f075c93c134d1adca76524a8fa13e6e210b235"
contentMode: "local-full"
zh: ""
---

# Manage SharePoint site access with the ChatGPT Admin API

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

ChatGPT workspace administrators can restrict the SharePoint app to approved
SharePoint site collections. This example resolves ordinary SharePoint URLs into
Microsoft Graph site-collection identifiers, previews changes, and manages the
workspace allowlist through the ChatGPT Admin API.

The accompanying [administration script](https://developers.openai.com/cookbook/examples/chatgpt/sharepoint_site_access/sharepoint_site_access_admin.py) uses
only the Python standard library. It accepts multiple URLs or a CSV/text file,
deduplicates site collections, preserves existing allowlist entries when adding
new collections, supports optional idempotency keys, and requires explicit
confirmation before clearing a policy.

> An empty allowlist permits access to all SharePoint sites that the individual
> user can access. Clearing the allowlist removes the site restriction; it does
> not block every site. Personal OneDrive access is controlled separately and is
> not automatically restricted by the SharePoint site-collection allowlist.

## Prerequisites

- Python 3.10 or later.
- A ChatGPT workspace ID.
- A ChatGPT workspace Admin API key with the `chatgpt.enterprise.apps.write`
  permission.
- A Microsoft Graph access token that can resolve the relevant SharePoint sites,
  typically with the `Sites.Read.All` permission.
- SharePoint site-access controls and the Admin API enabled for your workspace.

A Microsoft Graph token is necessary only for commands that resolve SharePoint
URLs. Reading or clearing an existing allowlist requires only the ChatGPT
workspace Admin API key.

### Create a workspace Admin API key

1. Open the ChatGPT Admin Console and select your workspace.
2. Navigate to **Credentials** and select the **Admin keys** tab.
3. Create a key with **Restricted** permissions and set **Apps** to **Write**.
4. Store the key securely. Use it as the `CHATGPT_ADMIN_TOKEN` environment
   variable.

The required permission is `chatgpt.enterprise.apps.write`. An OpenAI API
Platform key and a Microsoft Graph token are different credentials and cannot
replace the ChatGPT workspace Admin API key.

In a Bash shell, prompt for each credential without writing its value into the
command or shell history:

```bash
read -r -s -p "ChatGPT workspace admin key: " CHATGPT_ADMIN_TOKEN
echo
export CHATGPT_ADMIN_TOKEN

read -r -s -p "Microsoft Graph access token: " MICROSOFT_GRAPH_TOKEN
echo
export MICROSOFT_GRAPH_TOKEN
```

Do not commit tokens, include them in screenshots, or copy them into shared
documents.

## Understand SharePoint site identifiers

Microsoft Graph resolves a SharePoint URL into an identifier containing three
comma-separated components:

```text
hostname,site-collection-GUID,site-GUID
```

For example, a request for `https://contoso.sharepoint.com/sites/Finance`
returns an identifier such as:

```json
{
  "id": "contoso.sharepoint.com,da60e844-ba1d-49bc-b4d4-d5e36bae9019,712a596e-90a1-49e3-9b48-bfa80bee8740",
  "webUrl": "https://contoso.sharepoint.com/sites/Finance"
}
```

The allowlist accepts the middle value:
`da60e844-ba1d-49bc-b4d4-d5e36bae9019`. This GUID identifies the entire
SharePoint site collection, so all sites or webs within that collection are
included. Different URLs can resolve to the same collection GUID. The allowlist
does not restrict individual subsites, folders, or files.

## Inspect SharePoint URLs

From the directory containing `sharepoint_site_access_admin.py`, run:

```bash
python3 sharepoint_site_access_admin.py inspect \
  --site-url https://contoso.sharepoint.com/sites/Finance \
  --site-url https://contoso.sharepoint.com/sites/Research
```

This command calls Microsoft Graph and prints each resolved site identifier and
the deduplicated collection GUIDs. It does not read or modify the ChatGPT
workspace allowlist. Tenant-root URLs and percent-encoded paths, such as
`https://contoso.sharepoint.com/sites/Finance%20Team`, are both supported.

## Prepare a list of sites

For larger updates, create a CSV file named `sites.csv` with a `site_url` or
`url` column:

```csv
site_url
https://contoso.sharepoint.com/sites/Finance
https://contoso.sharepoint.com/sites/Research
https://contoso.sharepoint.com/sites/Operations
```

A text file containing one URL per line also works. Blank lines and lines
starting with `#` are ignored, as are CSV rows without a site URL. Each request
supports up to 10,000 unique site collections.

## Read the existing allowlist
