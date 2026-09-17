---
title: "Coze Loop 源码研读"
landing: true
tier: 3
sourceId: "04-work/coze-loop"
sourceTitle: "Coze Loop 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-loop"
entryUrl: "https://github.com/coze-dev/coze-loop/blob/5f1e4c234fc110c1bf674e882a6fd02109e1e1e6/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# Coze Loop 源码研读

English | [中文](/lib/04-work/coze-loop/README.cn)

## 课时

- **.github**
  - [PULL REQUEST TEMPLATE](/lib/04-work/coze-loop/_github-PULL_REQUEST_TEMPLATE.md)
- [ARCHITECTURE.md — Coze Loop](/lib/04-work/coze-loop/ARCHITECTURE.md)
- **backend**
  - **modules**
    - **evaluation**
      - **infra**
        - **runtime**
          - [Runtime 模块重构说明](/lib/04-work/coze-loop/backend-modules-evaluation-infra-runtime.md)
  - **script**
    - **errorx**
      - [Error Code Generation](/lib/04-work/coze-loop/backend-script-errorx.md)
- **docs**
  - **guidance**
    - [部署与环境配置指南](/lib/04-work/coze-loop/docs-guidance-deployment-guide.md)
    - [IDL 变更与代码生成流程](/lib/04-work/coze-loop/docs-guidance-idl-codegen-guide.md)
  - **reference**
    - [后端 DDD 模块与 API 参考](/lib/04-work/coze-loop/docs-reference-backend-modules-api.md)
    - [前端 Rush.js 包结构与分层参考](/lib/04-work/coze-loop/docs-reference-frontend-packages.md)
- **frontend**
  - **apps**
    - **cozeloop**
      - [CozeLoop](/lib/04-work/coze-loop/frontend-apps-cozeloop.md)
  - **config**
    - **eslint-config**
      - [@coze-arch/eslint-config](/lib/04-work/coze-loop/frontend-config-eslint-config.md)
    - **postcss-config**
      - [@coze-arch/postcss-config](/lib/04-work/coze-loop/frontend-config-postcss-config.md)
    - **stylelint-config**
      - [@coze-arch/stylelint-config](/lib/04-work/coze-loop/frontend-config-stylelint-config.md)
    - **tailwind-config**
      - [@coze-arch/tailwind-config](/lib/04-work/coze-loop/frontend-config-tailwind-config.md)
    - **ts-config**
      - [@coze-arch/ts-config](/lib/04-work/coze-loop/frontend-config-ts-config.md)
    - **vitest-config**
      - [@coze-arch/vitest-config](/lib/04-work/coze-loop/frontend-config-vitest-config.md)
  - **infra**
    - **eslint-plugin**
      - [@coze-arch/eslint-plugin](/lib/04-work/coze-loop/frontend-infra-eslint-plugin.md)
    - **idl**
      - **idl-parser**
        - [@coze-arch/idl-parser](/lib/04-work/coze-loop/frontend-infra-idl-idl-parser.md)
      - **idl2ts-cli**
        - [@coze-arch/idl2ts-cli](/lib/04-work/coze-loop/frontend-infra-idl-idl2ts-cli.md)
      - **idl2ts-generator**
        - [@coze-arch/idl2ts-generator](/lib/04-work/coze-loop/frontend-infra-idl-idl2ts-generator.md)
      - **idl2ts-helper**
        - [@coze-arch/idl2ts-helper](/lib/04-work/coze-loop/frontend-infra-idl-idl2ts-helper.md)
      - **idl2ts-plugin**
        - [@coze-arch/idl2ts-plugin](/lib/04-work/coze-loop/frontend-infra-idl-idl2ts-plugin.md)
      - **idl2ts-runtime**
        - [@coze-arch/idl2ts-runtime](/lib/04-work/coze-loop/frontend-infra-idl-idl2ts-runtime.md)
    - **plugins**
      - **pkg-root-webpack-plugin**
        - [@coze-arch/pkg-root-webpack-plugin](/lib/04-work/coze-loop/frontend-infra-plugins-pkg-root-webpack-plugin.md)
      - **postcss-plugin**
        - [@coze-arch/postcss-plugin](/lib/04-work/coze-loop/frontend-infra-plugins-postcss-plugin.md)
    - **utils**
      - **monorepo-kits**
        - [@coze-arch/monorepo-kits](/lib/04-work/coze-loop/frontend-infra-utils-monorepo-kits.md)
      - **rush-logger**
        - [@coze-arch/rush-logger](/lib/04-work/coze-loop/frontend-infra-utils-rush-logger.md)
  - **packages**
    - **loop-base**
      - **account**
        - [@cozeloop/account](/lib/04-work/coze-loop/frontend-packages-loop-base-account.md)
      - **api-schema**
        - [@cozeloop/api-schema](/lib/04-work/coze-loop/frontend-packages-loop-base-api-schema.md)
      - **base-hooks**
        - [@cozeloop/hooks](/lib/04-work/coze-loop/frontend-packages-loop-base-base-hooks.md)
      - **bot-env-adapter**
        - [@coze-studio/bot-env-adapter](/lib/04-work/coze-loop/frontend-packages-loop-base-bot-env-adapter.md)
      - **bot-env**
        - [@coze-arch/bot-env](/lib/04-work/coze-loop/frontend-packages-loop-base-bot-env.md)
      - **bot-flags**
        - [@coze-arch/bot-flags](/lib/04-work/coze-loop/frontend-packages-loop-base-bot-flags.md)
      - **bot-md-box-adapter**
        - [@coze-arch/bot-md-box-adapter](/lib/04-work/coze-loop/frontend-packages-loop-base-bot-md-box-adapter.md)
      - **bot-typings**
        - [@coze-arch/bot-typings](/lib/04-work/coze-loop/frontend-packages-loop-base-bot-typings.md)
      - **components**
        - [@cozeloop/components](/lib/04-work/coze-loop/frontend-packages-loop-base-components.md)
      - **env**
        - [@cozeloop/env-adapter](/lib/04-work/coze-loop/frontend-packages-loop-base-env.md)
      - **fetch-stream**
        - [@coze-arch/fetch-stream](/lib/04-work/coze-loop/frontend-packages-loop-base-fetch-stream.md)
      - **guard**
        - [@cozeloop/guard](/lib/04-work/coze-loop/frontend-packages-loop-base-guard.md)
      - **i18n**
        - [@cozeloop/i18n-adapter](/lib/04-work/coze-loop/frontend-packages-loop-base-i18n.md)
      - **logger**
        - [@coze-arch/logger](/lib/04-work/coze-loop/frontend-packages-loop-base-logger.md)
      - **loop-lng**
        - [@cozeloop/loop-lng](/lib/04-work/coze-loop/frontend-packages-loop-base-loop-lng.md)
      - **route**
        - [@cozeloop/biz-hooks-adapter](/lib/04-work/coze-loop/frontend-packages-loop-base-route.md)
      - **stores**
        - [@cozeloop/stores](/lib/04-work/coze-loop/frontend-packages-loop-base-stores.md)
      - **tea**
        - [@cozeloop/tea-adapter](/lib/04-work/coze-loop/frontend-packages-loop-base-tea.md)
      - **toolkit**
        - [@cozeloop/toolkit](/lib/04-work/coze-loop/frontend-packages-loop-base-toolkit.md)
    - **loop-components**
      - **adapter-interfaces**
        - [@cozeloop/adapter-interfaces](/lib/04-work/coze-loop/frontend-packages-loop-components-adapter-interfaces.md)
      - **biz-components**
        - [@cozeloop/upload-toolkit-adapter](/lib/04-work/coze-loop/frontend-packages-loop-components-biz-components.md)
      - **biz-config**
        - [@cozeloop/biz-config-adapter](/lib/04-work/coze-loop/frontend-packages-loop-components-biz-config.md)
      - **evaluate-components**
        - [@cozeloop/evaluate-components](/lib/04-work/coze-loop/frontend-packages-loop-components-evaluate-components.md)
      - **observation-components**
        - **src**
          - **i18n**
            - [I18n Implementation for Observation Components](/lib/04-work/coze-loop/frontend-packages-loop-components-observation-components-src-i18n.md)
      - **prompt-components-v2**
        - [@cozeloop/prompt-components](/lib/04-work/coze-loop/frontend-packages-loop-components-prompt-components-v2.md)
      - **tag-components**
        - [@cozeloop/tag-components](/lib/04-work/coze-loop/frontend-packages-loop-components-tag-components.md)
    - **loop-config**
      - **rsbuild-config**
        - [@cozeloop/rsbuild-config](/lib/04-work/coze-loop/frontend-packages-loop-config-rsbuild-config.md)
      - **tailwind-config**
        - [@cozeloop/tailwind-config](/lib/04-work/coze-loop/frontend-packages-loop-config-tailwind-config.md)
      - **tailwind-plugin**
        - [@cozeloop/tailwind-plugin](/lib/04-work/coze-loop/frontend-packages-loop-config-tailwind-plugin.md)
    - **loop-modules**
      - **evaluate**
        - [@cozeloop/evaluate-components](/lib/04-work/coze-loop/frontend-packages-loop-modules-evaluate.md)
    - **loop-pages**
      - **auth-pages**
        - [@cozeloop/auth-pages](/lib/04-work/coze-loop/frontend-packages-loop-pages-auth-pages.md)
      - **evaluate-pages**
        - [@cozeloop/evaluate-pages](/lib/04-work/coze-loop/frontend-packages-loop-pages-evaluate-pages.md)
      - **observation-pages**
        - [@cozeloop/observation-pages](/lib/04-work/coze-loop/frontend-packages-loop-pages-observation-pages.md)
      - **prompt-pages**
        - [@cozeloop/prompt-pages](/lib/04-work/coze-loop/frontend-packages-loop-pages-prompt-pages.md)
      - **tag-pages**
        - [@cozeloop/tag-pages](/lib/04-work/coze-loop/frontend-packages-loop-pages-tag-pages.md)
  - [🧭 Cozeloop Frontend](/lib/04-work/coze-loop/frontend.md)
  - [🧭 扣子罗盘前端](/lib/04-work/coze-loop/frontend-README.zh-CN.md)
- [README.cn](/lib/04-work/coze-loop/README.cn.md)

开始学习 → [Coze Loop 源码研读](_github-PULL_REQUEST_TEMPLATE.md)
