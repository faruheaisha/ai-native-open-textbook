---
title: "Weather SVG Creator — Examples"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/skills/weather-svg-creator/examples.md"
sourceRel: ".claude/skills/weather-svg-creator/examples.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/skills/weather-svg-creator/examples.md"
sourceSha256: "33c25099150c2e2884b7b0487f725b522185521bf2be2808ecd2a624b3267500"
pageSha256: "33c25099150c2e2884b7b0487f725b522185521bf2be2808ecd2a624b3267500"
contentMode: "local-full"
zh: ""
---

# Weather SVG Creator — Examples

## Example 1: Celsius

### Input

```
Temperature: 26.2°C
Unit: Celsius
```

### SVG Output (`orchestration-workflow/weather.svg`)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160" width="300" height="160">
  <rect width="300" height="160" rx="12" fill="#1a1a2e"/>
  <text x="150" y="45" text-anchor="middle" fill="#8892b0" font-family="system-ui" font-size="14">Unit: Celsius</text>
  <text x="150" y="100" text-anchor="middle" fill="#ccd6f6" font-family="system-ui" font-size="42" font-weight="bold">26.2°C</text>
  <text x="150" y="140" text-anchor="middle" fill="#64ffda" font-family="system-ui" font-size="16">Dubai, UAE</text>
</svg>
```

### Markdown Output (`orchestration-workflow/output.md`)

```markdown
# Weather Result

## Temperature
26.2°C

## Location
Dubai, UAE

## Unit
Celsius

## SVG Card
![Weather Card](weather.svg)
```

---

## Example 2: Fahrenheit

### Input

```
Temperature: 79.2°F
Unit: Fahrenheit
```

### SVG Output (`orchestration-workflow/weather.svg`)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160" width="300" height="160">
  <rect width="300" height="160" rx="12" fill="#1a1a2e"/>
  <text x="150" y="45" text-anchor="middle" fill="#8892b0" font-family="system-ui" font-size="14">Unit: Fahrenheit</text>
  <text x="150" y="100" text-anchor="middle" fill="#ccd6f6" font-family="system-ui" font-size="42" font-weight="bold">79.2°F</text>
  <text x="150" y="140" text-anchor="middle" fill="#64ffda" font-family="system-ui" font-size="16">Dubai, UAE</text>
</svg>
```

### Markdown Output (`orchestration-workflow/output.md`)

```markdown
# Weather Result

## Temperature
79.2°F

## Location
Dubai, UAE

## Unit
Fahrenheit

## SVG Card
![Weather Card](weather.svg)
```
