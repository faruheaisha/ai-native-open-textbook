---
title: "Remotion Video Toolkit"
sourceId: "04-work/qwenwork-guide"
sourceTitle: "千问办公绿皮书（QwenWorkGuide）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "04-work"
sourceUrl: "https://github.com/wangxiaoshuai1998/QwenWorkGuide"
entryUrl: "https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/09-Remotion视频工具包.md"
sourceRel: "docs/public/skills/10-内容创作/09-Remotion视频工具包.md"
rawUrl: "/raw/04-work/qwenwork-guide/docs/public/skills/10-内容创作/09-Remotion视频工具包.md"
sourceSha256: "140a3e508a447954d2a87777dcca8216fb425d7a99c5d54d632506d79cb31714"
pageSha256: "140a3e508a447954d2a87777dcca8216fb425d7a99c5d54d632506d79cb31714"
contentMode: "local-full"
zh: ""
---

# Remotion Video Toolkit

Write React components, get real MP4 videos. This skill teaches your AI agent how to build with Remotion — from a first animation to a production rendering pipeline.

29 rules. Every major Remotion feature covered.

---

## What you can build with this

**Personalized video at scale**
Feed user data as JSON props, render a unique video per user. Think Spotify Wrapped, GitHub Unwrapped, onboarding walkthroughs — one template, thousands of outputs.

**Automated social media clips**
Pull live data (stats, leaderboards, product metrics) and render daily or weekly video posts without anyone touching a timeline editor.

**Dynamic ads and marketing videos**
Swap in customer name, product image, pricing. Same template, infinite variations. Render server-side via API or Lambda.

**Animated data visualizations**
Turn dashboards and KPI reports into shareable video clips with animated charts and transitions.

**TikTok and Reels captions**
Transcribe audio, display word-by-word highlighted subtitles, export ready for upload.

**Product showcase videos**
Auto-generate from your database — images, specs, pricing — straight to MP4.

**Educational and explainer content**
Animated course materials, certificate videos, step-by-step walkthroughs — all driven by code.

**Video generation as a service**
Expose rendering as an HTTP endpoint. Your app sends JSON, gets back a video file.

---

## Requirements

- **Node.js** 18+
- **React** 18+ (Remotion renders React components frame-by-frame)
- **Remotion** — scaffold with `npx create-video@latest`
- **FFmpeg** — ships with `@remotion/renderer`, no separate install needed
- For serverless rendering: **AWS** account (Lambda) or **GCP** account (Cloud Run)

---

## What's inside

### Core

| Rule | Description |
|------|-------------|
| [Compositions](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/compositions.md) | Define videos, stills, folders, default props, dynamic metadata |
| [Rendering](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/rendering.md) | CLI, Node.js API, AWS Lambda, Cloud Run, Express server patterns |
| [Calculate metadata](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/calculate-metadata.md) | Set duration, dimensions, and props dynamically at render time |

### Animation and timing

| Rule | Description |
|------|-------------|
| [Animations](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/animations.md) | Fade, scale, rotate, slide |
| [Timing](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/timing.md) | Interpolation curves, easing, spring physics |
| [Sequencing](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/sequencing.md) | Delay, chain, and orchestrate scenes |
| [Transitions](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/transitions.md) | Scene-to-scene transitions |
| [Trimming](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/trimming.md) | Cut the start or end of any animation |

### Text and typography

| Rule | Description |
|------|-------------|
| [Text animations](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/text-animations.md) | Typewriter, word highlight, reveal effects |
| [Fonts](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/fonts.md) | Google Fonts and local font loading |
| [Measuring text](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/measuring-text.md) | Fit text to containers, detect overflow |

### Media

| Rule | Description |
|------|-------------|
| [Videos](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/videos.md) | Embed, trim, speed, volume, loop, pitch shift |
| [Audio](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/audio.md) | Import, trim, fade, volume and speed control |
| [Images](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/images.md) | The Img component |
| [GIFs](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/gifs.md) | Timeline-synced GIF playback |
| [Assets](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/assets.md) | Importing any media into compositions |
| [Decode check](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/can-decode.md) | Validate browser compatibility |

### Captions and subtitles

| Rule | Description |
|------|-------------|
| [Transcribe captions](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/transcribe-captions.md) | Audio to captions via Whisper, Deepgram, or AssemblyAI |
| [Display captions](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/display-captions.md) | TikTok-style word-by-word highlighting |
| [Import SRT](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/import-srt-captions.md) | Load existing .srt files |

### Data visualization

| Rule | Description |
|------|-------------|
| [Charts](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/charts.md) | Animated bar charts, line graphs, data-driven visuals |

### Advanced

| Rule | Description |
|------|-------------|
| [3D content](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/3d.md) | Three.js and React Three Fiber |
| [Lottie](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/lottie.md) | After Effects animations via Lottie |
| [TailwindCSS](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/tailwind.md) | Style compositions with Tailwind |
| [DOM measurement](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/measuring-dom-nodes.md) | Measure element dimensions at render time |

### Media utilities

| Rule | Description |
|------|-------------|
| [Video duration](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/get-video-duration.md) | Get length in seconds |
| [Video dimensions](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/get-video-dimensions.md) | Get width and height |
| [Audio duration](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/get-audio-duration.md) | Get audio length |
| [Extract frames](https://github.com/wangxiaoshuai1998/QwenWorkGuide/blob/002f698a68b69d3635acf6be0d6e27db69069071/docs/public/skills/10-内容创作/rules/extract-frames.md) | Pull frames at specific timestamps |

---

## Quick start

```bash
# Scaffold a project
npx create-video@latest my-video

# Preview in browser
cd my-video && npm start

# Render to MP4
npx remotion render src/index.ts MyComposition out/video.mp4

# Pass dynamic data
npx remotion render src/index.ts MyComposition out.mp4 --props '{"title": "Hello"}'
```

---

## Contribute

**Source:** [github.com/shreefentsar/remotion-video-toolkit](https://github.com/shreefentsar/remotion-video-toolkit)

Missing something? Found a better approach? Open a PR — new rules, improved examples, bug fixes all welcome.

Built by [Zone 99](https://99.zone)
