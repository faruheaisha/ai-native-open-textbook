---
title: "Weather Fetcher Skill"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/skills/weather-fetcher/SKILL.md"
sourceRel: ".claude/skills/weather-fetcher/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/skills/weather-fetcher/SKILL.md"
sourceSha256: "4350c64fd975416da3a1ed34c6f1add622b28413edc377994f4a320263cf661e"
pageSha256: "4350c64fd975416da3a1ed34c6f1add622b28413edc377994f4a320263cf661e"
contentMode: "local-full"
zh: ""
---

# Weather Fetcher Skill

This skill provides instructions for fetching current weather data.

## Task

Fetch the current temperature for Dubai, UAE in the requested unit (Celsius or Fahrenheit).

## Instructions

1. **Fetch Weather Data**: Use the WebFetch tool to get current weather data for Dubai from the Open-Meteo API.

   For **Celsius**:
   - URL: `https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=celsius`

   For **Fahrenheit**:
   - URL: `https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=fahrenheit`

2. **Extract Temperature**: From the JSON response, extract the current temperature:
   - Field: `current.temperature_2m`
   - Unit label is in: `current_units.temperature_2m`

3. **Return Result**: Return the temperature value and unit clearly.

## Expected Output

After completing this skill's instructions:
```
Current Dubai Temperature: [X]°[C/F]
Unit: [Celsius/Fahrenheit]
```

## Notes

- Only fetch the temperature, do not perform any transformations or write any files
- Open-Meteo is free, requires no API key, and uses coordinate-based lookups for reliability
- Dubai coordinates: latitude 25.2048, longitude 55.2708
- Return the numeric temperature value and unit clearly
- Support both Celsius and Fahrenheit based on the caller's request
