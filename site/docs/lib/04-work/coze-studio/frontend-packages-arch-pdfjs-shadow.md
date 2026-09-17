---
title: "@coze-arch/pdfjs-shadow"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/frontend/packages/arch/pdfjs-shadow/README.md"
sourceRel: "frontend/packages/arch/pdfjs-shadow/README.md"
rawUrl: "/raw/04-work/coze-studio/frontend/packages/arch/pdfjs-shadow/README.md"
sourceSha256: "0abac0d4adb8a55d0114ec4aa470f461bcc5aabb2b03f38aca43cd7a79681dda"
pageSha256: "0abac0d4adb8a55d0114ec4aa470f461bcc5aabb2b03f38aca43cd7a79681dda"
contentMode: "local-full"
zh: ""
---

# @coze-arch/pdfjs-shadow

## Description

原始的 pdfjs-dist 包兼容性过低，需要重新编译，增加 polyfill 之后才能正常运行，因此设计该 package，主要作用：

1. 收敛 pdfjs-dist 调用，避免 bot 环境中多出定义 pdfjs-dist 版本；
2. 收敛 worker src url 的计算逻辑。

注意，该 package 仅供 coze 消费。
