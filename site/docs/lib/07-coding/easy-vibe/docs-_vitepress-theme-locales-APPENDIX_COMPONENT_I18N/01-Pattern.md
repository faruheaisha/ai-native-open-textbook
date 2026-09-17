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
pageSha256: "1a16792d377a54a2b450f1cfba31dd688dd043d67b60dc573b9b0f48e5b1984e"
contentMode: "local-full"
zh: ""
---

## Pattern

- Component code imports `useI18n` and the section locale index.
- Locale lookup falls back in this order: current locale, `en`, `zh-cn`.
- Components use `t('section.key')` for scalar labels and `messages.section`
  for structured arrays such as tabs, terms, diagrams, and summary flows.
- Interpolated labels use braces, for example `t('adderChain.bitButton', \{ bit \})`.

Example:

```js
import { useI18n } from '../../../composables/useI18n.js'
import { computerFundamentalsLocale } from '../../../locales/computer-fundamentals/index.js'

const { t, messages } = useI18n(computerFundamentalsLocale)
```
