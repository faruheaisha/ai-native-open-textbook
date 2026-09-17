---
title: "Coze Studio 源码研读"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/workflow/fabric-canvas/src/share/README.md"
sourceRel: "frontend/packages/workflow/fabric-canvas/src/share/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/workflow/fabric-canvas/src/share/README.md"
sourceSha256: "f9123bd4b77e85cfbc8e62be64f58801b56b8fed6b43e663127d49550659c536"
pageSha256: "f9123bd4b77e85cfbc8e62be64f58801b56b8fed6b43e663127d49550659c536"
contentMode: "local-full"
zh: ""
---

# Coze Studio 源码研读

这个目录放置了一些和 @flow-workflow/fabric-canvas-node-render 可以共用的函数、类型、常量...

因为 @flow-workflow/fabric-canvas-node-render 是一个 node 工程，要注意 share 中不要出现 tsx 文件，否则会导致 node 工程无法编译。
