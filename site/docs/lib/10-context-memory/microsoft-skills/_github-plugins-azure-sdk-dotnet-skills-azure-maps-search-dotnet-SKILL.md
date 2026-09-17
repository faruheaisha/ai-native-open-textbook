---
title: "Azure Maps (.NET)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-dotnet/skills/azure-maps-search-dotnet/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-dotnet/skills/azure-maps-search-dotnet/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-dotnet/skills/azure-maps-search-dotnet/SKILL.md"
sourceSha256: "81c4043ecf3d0b86a31468de4d37ee5109052cd58ca757bf3c035c493118b869"
pageSha256: "81c4043ecf3d0b86a31468de4d37ee5109052cd58ca757bf3c035c493118b869"
contentMode: "local-full"
zh: ""
---

# Azure Maps (.NET)

Azure Maps SDK for .NET providing location-based services: geocoding, routing, rendering, geolocation, and weather.

## Installation

```bash
# Search (geocoding, reverse geocoding)
dotnet add package Azure.Maps.Search --prerelease

# Routing (directions, route matrix)
dotnet add package Azure.Maps.Routing --prerelease

# Rendering (map tiles, static images)
dotnet add package Azure.Maps.Rendering --prerelease

# Geolocation (IP to location)
dotnet add package Azure.Maps.Geolocation --prerelease

# Weather
dotnet add package Azure.Maps.Weather --prerelease

# Resource Management (account management, SAS tokens)
dotnet add package Azure.ResourceManager.Maps --prerelease

# Required for authentication
dotnet add package Azure.Identity
```

**Current Versions**:
- `Azure.Maps.Search`: v2.0.0-beta.5
- `Azure.Maps.Routing`: v1.0.0-beta.4
- `Azure.Maps.Rendering`: v2.0.0-beta.1
- `Azure.Maps.Geolocation`: v1.0.0-beta.3
- `Azure.ResourceManager.Maps`: v1.1.0-beta.2

## Environment Variables

```bash
