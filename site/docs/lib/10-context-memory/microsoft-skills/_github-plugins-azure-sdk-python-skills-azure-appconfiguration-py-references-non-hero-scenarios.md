---
title: "azure-appconfiguration-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-appconfiguration-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-appconfiguration-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-appconfiguration-py/references/non-hero-scenarios.md"
sourceSha256: "b3f8c49acab1f099f06da52684490aec1eef6921bcfded032c443c83ee277343"
pageSha256: "b3f8c49acab1f099f06da52684490aec1eef6921bcfded032c443c83ee277343"
contentMode: "local-full"
zh: ""
---

# azure-appconfiguration-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Snapshots

### Create Snapshot

```python
from azure.appconfiguration import ConfigurationSnapshot, ConfigurationSettingsFilter

snapshot = ConfigurationSnapshot(
    filters=[
        ConfigurationSettingsFilter(key="app:*", label="production")
    ]
)

created = client.begin_create_snapshot(
    name="v1-snapshot",
    snapshot=snapshot
).result()
```

### List Snapshot Settings

```python
settings = client.list_configuration_settings(
    snapshot_name="v1-snapshot"
)
```

## Async Client

```python
from azure.appconfiguration.aio import AzureAppConfigurationClient
from azure.identity.aio import DefaultAzureCredential

async def main():
    async with DefaultAzureCredential() as credential:
        async with AzureAppConfigurationClient(
            base_url=endpoint,
            credential=credential
        ) as client:
            setting = await client.get_configuration_setting(key="app:message")
            print(setting.value)
```

## Client Operations

| Operation | Description |
|-----------|-------------|
| `get_configuration_setting` | Get single setting |
| `set_configuration_setting` | Create or update setting |
| `delete_configuration_setting` | Delete setting |
| `list_configuration_settings` | List with filters |
| `set_read_only` | Lock/unlock setting |
| `begin_create_snapshot` | Create point-in-time snapshot |
| `list_snapshots` | List all snapshots |
