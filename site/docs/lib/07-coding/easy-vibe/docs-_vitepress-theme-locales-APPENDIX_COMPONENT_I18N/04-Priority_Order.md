---
title: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/.vitepress/theme/locales/APPENDIX_COMPONENT_I18N.md"
sourceRel: "docs/.vitepress/theme/locales/APPENDIX_COMPONENT_I18N.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/.vitepress/theme/locales/APPENDIX_COMPONENT_I18N.md"
sourceSha256: "b575400433becabe3cf02c238ffed3399f36877b7a692547afaec774b3733ab5"
pageSha256: "32d0b7bf8403f514e96687cd8c3562ae101ed75a42f32eca7f7552a01b83aa43"
contentMode: "local-full"
zh: ""
---

## Priority Order

1. Migrate remaining high-volume appendix sections next:
   `llm-intro`, `api-design`, `tracking-design`, and
   `backend-layered-architecture`.
2. For each section, create a section locale folder and keep component arrays
   in the dictionary instead of hardcoding labels in Vue files.
3. Treat `llm-intro` as a dedicated migration batch. It contains long teaching
   copy, code examples, token data, and multi-step animation state, so migrate
   it component by component rather than as a quick static-array pass.
4. Add real `ja-jp`, `ko-kr`, `es-es`, `fr-fr`, `de-de`, `ar-sa`, `vi-vn`, and
   `zh-tw` dictionaries only after the English fallback is structurally stable.
