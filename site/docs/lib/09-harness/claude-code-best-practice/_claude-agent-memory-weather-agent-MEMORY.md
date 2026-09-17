---
title: "Weather Agent Memory"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/agent-memory/weather-agent/MEMORY.md"
sourceRel: ".claude/agent-memory/weather-agent/MEMORY.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/agent-memory/weather-agent/MEMORY.md"
sourceSha256: "d845fc66e620392fe9cee94a35459434d6fbdb8a9e715c0f41fefcf243caeaa7"
pageSha256: "d845fc66e620392fe9cee94a35459434d6fbdb8a9e715c0f41fefcf243caeaa7"
contentMode: "local-full"
zh: ""
---

# Weather Agent Memory

## API Configuration
- Provider: Open-Meteo (free, no API key required)
- Dubai coordinates: latitude 25.2048, longitude 55.2708
- Celsius URL: `https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=celsius`
- Fahrenheit URL: `https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=fahrenheit`
- Temperature field: `current.temperature_2m`

## Recent Readings

| Date | Temperature | Unit |
|------|-------------|------|
| 2026-03-06 | 22.3 | Celsius |
| 2026-03-06 | 22.5 | Celsius |
| 2026-03-07 | 25.7 | Celsius |
| 2026-03-11 | 26.2 | Celsius |
| 2026-03-11 | 26.2 | Celsius |
| 2026-04-16 | 23.8 | Celsius |
| 2026-04-16 | 23.8 | Celsius |
