---
title: "Publishing a release"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/.github/RELEASING.md"
sourceRel: ".github/RELEASING.md"
rawUrl: "/raw/08-agents/openai-agents-python/.github/RELEASING.md"
sourceSha256: "2a10c97b30a0471e0657057514a42d5e7a81de19778ada31252a240f24def18c"
pageSha256: "2a10c97b30a0471e0657057514a42d5e7a81de19778ada31252a240f24def18c"
contentMode: "local-full"
zh: ""
---

# Publishing a release

Release tags are created manually by authorized maintainers. Merging a release pull request does not create a tag.

1. Merge the reviewed release pull request and record its actual merged commit SHA.
2. As an authorized maintainer, check that commit and its version before creating the tag. Replace the placeholders below:

   ```bash
   RELEASE_VERSION="<version>"
