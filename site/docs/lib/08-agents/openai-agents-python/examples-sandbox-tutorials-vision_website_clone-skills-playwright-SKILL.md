---
title: "Playwright"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/tutorials/vision_website_clone/skills/playwright/SKILL.md"
sourceRel: "examples/sandbox/tutorials/vision_website_clone/skills/playwright/SKILL.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/tutorials/vision_website_clone/skills/playwright/SKILL.md"
sourceSha256: "5a29f3f79c5d603f2dd78c9ab2db080c9c5c1f715d5ed0709785d94ab68b235c"
pageSha256: "5a29f3f79c5d603f2dd78c9ab2db080c9c5c1f715d5ed0709785d94ab68b235c"
contentMode: "local-full"
zh: ""
---

# Playwright

Use Playwright to capture the static site directly. Do not start a server for this example.

```sh
mkdir -p output/screenshots output/playwright/.tmp
export TMPDIR="$PWD/output/playwright/.tmp"
export TEMP="$TMPDIR"
export TMP="$TMPDIR"
npx --yes --package playwright@1.50.0 playwright install chromium
npx --yes --package playwright@1.50.0 playwright screenshot \
  --browser=chromium \
  --viewport-size=2048,1152 \
  "file://$PWD/output/site/index.html" \
  output/screenshots/draft-1.png
```

Change the final path to `output/screenshots/draft-2.png` for the second pass.
