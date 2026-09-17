---
title: "r3f-perf for Performance Monitoring"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/r3f-best-practices/rules/perf-r3f-perf.md"
sourceRel: "skills/r3f-best-practices/rules/perf-r3f-perf.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/r3f-best-practices/rules/perf-r3f-perf.md"
sourceSha256: "408378b1095b2daec2390f1e2cb1a9385016ef16307b3e22060b6a9e4d8ca5ec"
pageSha256: "408378b1095b2daec2390f1e2cb1a9385016ef16307b3e22060b6a9e4d8ca5ec"
contentMode: "local-full"
zh: ""
---

# r3f-perf for Performance Monitoring

> Source: [100 Three.js Tips - Utsubo](https://www.utsubo.com/blog/threejs-best-practices-100-tips)

Use r3f-perf for comprehensive React Three Fiber performance monitoring.

## Installation

```bash
npm install r3f-perf
```

## Basic Usage

```jsx
import { Perf } from 'r3f-perf';

function App() {
  return (
  );
}
```

## Available Props

```jsx
<Perf
  position="top-left"     // Position: top-left, top-right, bottom-left, bottom-right
  minimal={false}         // Minimal mode (just FPS)
  showGraph={true}        // Show performance graph
  matrixUpdate={true}     // Show matrix updates
  deepAnalyze={false}     // Deep analysis (more CPU intensive)
  overClock={false}       // Over-clock mode for high refresh rate monitors
  logsPerSecond={10}      // Logs per second
/>
```

## What It Monitors

- **FPS** - Frames per second
- **MS** - Milliseconds per frame
- **CPU** - JavaScript execution time
- **GPU** - WebGL draw time (estimated)
- **Memory** - Geometries, textures, draw calls
- **Matrix Updates** - Number of matrix recalculations

## Conditional Rendering for Production

```jsx
import { Perf } from 'r3f-perf';

function App() {
  const isDev = process.env.NODE_ENV === 'development';

  return (
      {isDev && <Perf position="top-left" />}
  );
}
```

## Deep Analyze Mode

For detailed per-object analysis:

```jsx
<Perf
  deepAnalyze={true}
  className="custom-perf"
/>
```

Shows render times for individual objects but has higher CPU overhead.

## Best Practices

1. **Remove in production** - Always hide in production builds
2. **Use sparingly** - Performance monitor itself has overhead
3. **Check draw calls** - Target under 100 draw calls
4. **Monitor memory** - Watch for leaking geometries/textures
5. **Use alongside renderer.info** - For detailed WebGL stats
