---
title: "Playwright Core Testing"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/playwright/core/SKILL.md"
sourceRel: "skills/playwright/core/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/playwright/core/SKILL.md"
sourceSha256: "552bc243a63d686f5057196af166f1691b7fdfe292b33d7792b8d20f09ad1278"
pageSha256: "552bc243a63d686f5057196af166f1691b7fdfe292b33d7792b8d20f09ad1278"
contentMode: "local-full"
zh: ""
---

# Playwright Core Testing

> Opinionated, production-tested Playwright guidance — every pattern includes when (and when _not_) to use it.

**46 reference guides** covering the full Playwright testing surface: selectors, assertions, fixtures, network mocking, auth, visual regression, accessibility, API testing, debugging, and more — with TypeScript and JavaScript examples throughout.

## Golden Rules

1. **`getByRole()` over CSS/XPath** — resilient to markup changes, mirrors how users see the page
2. **Never `page.waitForTimeout()`** — use `expect(locator).toBeVisible()` or `page.waitForURL()`
3. **Web-first assertions** — `expect(locator)` auto-retries; `expect(await locator.textContent())` does not
4. **Isolate every test** — no shared state, no execution-order dependencies
5. **`baseURL` in config** — zero hardcoded URLs in tests
6. **Retries: `2` in CI, `0` locally** — surface flakiness where it matters
7. **Traces: `'on-first-retry'`** — rich debugging artifacts without CI slowdown
8. **Fixtures over globals** — share state via `test.extend()`, not module-level variables
9. **One behavior per test** — multiple related `expect()` calls are fine
10. **Mock external services only** — never mock your own app; mock third-party APIs, payment gateways, email

## Guide Index

### Writing Tests

| What you're doing          | Guide                                                  | Deep dive                                          |
| -------------------------- | ------------------------------------------------------ | -------------------------------------------------- |
| Choosing selectors         | [locators.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-locators)                             | [locator-strategy.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-locator-strategy)         |
| Assertions & waiting       | [assertions-and-waiting.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-assertions-and-waiting) |                                                    |
| Organizing test suites     | [test-organization.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-test-organization)           | [test-architecture.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-test-architecture)       |
| Playwright config          | [configuration.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-configuration)                   |                                                    |
| Fixtures & hooks           | [fixtures-and-hooks.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-fixtures-and-hooks)         |                                                    |
| Test data                  | [test-data-management.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-test-data-management)     |                                                    |
| Auth & login               | [authentication.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-authentication)                 | [auth-flows.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-auth-flows)                     |
| API testing (REST/GraphQL) | [api-testing.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-api-testing)                       |                                                    |
| Visual regression          | [visual-regression.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-visual-regression)           |                                                    |
| Accessibility              | [accessibility.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-accessibility)                   |                                                    |
| Mobile & responsive        | [mobile-and-responsive.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-mobile-and-responsive)   |                                                    |
| Component testing          | [component-testing.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-component-testing)           |                                                    |
| Network mocking            | [network-mocking.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-network-mocking)               | [when-to-mock.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-when-to-mock)                 |
| Forms & validation         | [forms-and-validation.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-forms-and-validation)     |                                                    |
| File uploads/downloads     | [file-operations.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-file-operations)               | [file-upload-download.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-file-upload-download) |
| Error & edge cases         | [error-and-edge-cases.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-error-and-edge-cases)     |                                                    |
| CRUD flows                 | [crud-testing.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-crud-testing)                     |                                                    |
| Drag and drop              | [drag-and-drop.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-drag-and-drop)                   |                                                    |
| Search & filter UI         | [search-and-filter.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-search-and-filter)           |                                                    |

### Debugging & Fixing

| Problem                    | Guide                                    |
| -------------------------- | ---------------------------------------- |
| General debugging workflow | [debugging.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-debugging)             |
| Specific error message     | [error-index.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-error-)         |
| Flaky / intermittent tests | [flaky-tests.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-flaky-tests)         |
| Common beginner mistakes   | [common-pitfalls.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-common-pitfalls) |

### Framework Recipes

| Framework                           | Guide                    |
| ----------------------------------- | ------------------------ |
| Next.js (App Router + Pages Router) | [nextjs.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-nextjs)   |
| React (CRA, Vite)                   | [react.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-react)     |
| Vue 3 / Nuxt                        | [vue.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-vue)         |
| Angular                             | [angular.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-angular) |

### Specialized Topics

| Topic                                      | Guide                                                              |
| ------------------------------------------ | ------------------------------------------------------------------ |
| Multi-user & collaboration                 | [multi-user-and-collaboration.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-multi-user-and-collaboration) |
| WebSockets & real-time                     | [websockets-and-realtime.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-websockets-and-realtime)           |
| Browser APIs (geo, clipboard, permissions) | [browser-apis.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-browser-apis)                                 |
| iframes & Shadow DOM                       | [iframes-and-shadow-dom.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-iframes-and-shadow-dom)             |
| Canvas & WebGL                             | [canvas-and-webgl.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-canvas-and-webgl)                         |
| Service workers & PWA                      | [service-workers-and-pwa.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-service-workers-and-pwa)           |
| Electron apps                              | [electron-testing.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-electron-testing)                         |
| Browser extensions                         | [browser-extensions.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-browser-extensions)                     |
| Security testing                           | [security-testing.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-security-testing)                         |
| Performance & benchmarks                   | [performance-testing.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-performance-testing)                   |
| i18n & localization                        | [i18n-and-localization.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-i18n-and-localization)               |
| Multi-tab & popups                         | [multi-context-and-popups.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-multi-context-and-popups)         |
| Clock & time mocking                       | [clock-and-time-mocking.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-clock-and-time-mocking)             |
| Third-party integrations                   | [third-party-integrations.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-third-party-integrations)         |

### Architecture Decisions

| Question                 | Guide                                        |
| ------------------------ | -------------------------------------------- |
| Which locator strategy?  | [locator-strategy.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-locator-strategy)   |
| E2E vs component vs API? | [test-architecture.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-test-architecture) |
| Mock vs real services?   | [when-to-mock.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-when-to-mock)           |
