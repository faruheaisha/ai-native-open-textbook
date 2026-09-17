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
pageSha256: "0ec0e53cac6f31bf382765f59553623109281131289dd131cb74d3ac6e0a8ac3"
contentMode: "local-full"
zh: ""
---

## Verification

For a component batch:

```bash
npx eslint docs/.vitepress/theme/components/appendix/<section>/*.vue docs/.vitepress/theme/locales/<section>/*.js
node scripts/scan-appendix-component-i18n.mjs --details
```

For the completed `development-tools` section:

```bash
node --check docs/.vitepress/theme/locales/development-tools/zh-cn.js
node --check docs/.vitepress/theme/locales/development-tools/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/development-tools/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/development-tools/*.vue docs/.vitepress/theme/locales/development-tools/*.js
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

For the completed `context-engineering` section:

```bash
node --check docs/.vitepress/theme/locales/context-engineering/zh-cn.js
node --check docs/.vitepress/theme/locales/context-engineering/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/context-engineering/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/context-engineering/*.vue docs/.vitepress/theme/locales/context-engineering/*.js
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

For the completed `framework-nature` section:

```bash
node --check docs/.vitepress/theme/locales/framework-nature/zh-cn.js
node --check docs/.vitepress/theme/locales/framework-nature/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/framework-nature/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/framework-nature/*.vue docs/.vitepress/theme/locales/framework-nature/*.js
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

For the completed `vlm-intro` section:

```bash
node --check docs/.vitepress/theme/locales/vlm-intro/zh-cn.js
node --check docs/.vitepress/theme/locales/vlm-intro/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/vlm-intro/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/vlm-intro/*.vue docs/.vitepress/theme/locales/vlm-intro/*.js
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

For the completed `embedding-vector` section:

```bash
node --check docs/.vitepress/theme/locales/embedding-vector/zh-cn.js
node --check docs/.vitepress/theme/locales/embedding-vector/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/embedding-vector/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/embedding-vector/*.vue docs/.vitepress/theme/locales/embedding-vector/*.js
node scripts/scan-appendix-component-i18n.mjs --json
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

The section should report:

```json
{
  "section": "embedding-vector",
  "total": 5,
  "withChinese": 0,
  "withI18n": 5,
  "chineseWithoutI18n": 0
}
```

For the completed `api-design` section, the currently verified component set is:

- `ApiRequestDemo.vue`
- `ApiStyleCompare.vue`
- `StatusCodeDemo.vue`
- `ErrorHandlingDemo.vue`
- `ResponseStructureDemo.vue`
- `DataFieldDesignDemo.vue`
- `ErrorResponseDesignDemo.vue`

Current source-level check:

```bash
node --check docs/.vitepress/theme/locales/api-design/zh-cn.js
node --check docs/.vitepress/theme/locales/api-design/en.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/api-design/*.vue || true
npx eslint docs/.vitepress/theme/components/appendix/api-design/*.vue docs/.vitepress/theme/locales/api-design/*.js docs/.vitepress/theme/index.js
node scripts/scan-appendix-component-i18n.mjs --json
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

The section currently reports:

```json
{
  "section": "api-design",
  "total": 7,
  "withChinese": 0,
  "withI18n": 7,
  "chineseWithoutI18n": 0
}
```

The previous `api-design` residue also included unused legacy component code.
The 3 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `ApiVersioningDemo.vue`
- `RestfulApiFlow.vue`
- `RestfulUrlDemo.vue`

For the completed `api-intro` section, the current verified source-level check
is:

```bash
node --check docs/.vitepress/theme/locales/api-intro/zh-cn.js
node --check docs/.vitepress/theme/locales/api-intro/en.js
npx eslint docs/.vitepress/theme/components/appendix/api-intro/*.vue docs/.vitepress/theme/locales/api-intro/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/api-intro/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "api-intro",
  "total": 7,
  "withChinese": 0,
  "withI18n": 7,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "Function API vs HTTP API|API Playground|How to Read Different Doc Types" docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/api-intro.html
git checkout -- docs/public/sitemap.xml
```

For the completed `cache-design` section, the current verified source-level
check is:

```bash
node --check docs/.vitepress/theme/locales/cache-design/zh-cn.js
node --check docs/.vitepress/theme/locales/cache-design/en.js
npx eslint docs/.vitepress/theme/components/appendix/cache-design/*.vue docs/.vitepress/theme/locales/cache-design/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/cache-design/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "cache-design",
  "total": 5,
  "withChinese": 0,
  "withI18n": 5,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "Cache Lifecycle Demo|Three Common Cache Problems|E-commerce Cache Architecture Demo" docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/caching.html
git checkout -- docs/public/sitemap.xml
```

For the completed `image-gen-intro` section, the current verified source-level
check is:

```bash
node --check docs/.vitepress/theme/locales/image-gen-intro/zh-cn.js
node --check docs/.vitepress/theme/locales/image-gen-intro/en.js
npx eslint docs/.vitepress/theme/components/appendix/image-gen-intro/*.vue docs/.vitepress/theme/locales/image-gen-intro/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/image-gen-intro/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "image-gen-intro",
  "total": 1,
  "withChinese": 0,
  "withI18n": 1,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "Start denoising|Focus:" docs/.vitepress/dist/ko-kr/appendix/8-artificial-intelligence/image-generation.html
git checkout -- docs/public/sitemap.xml
```

For the completed `javascript-intro` section, the current verified source-level
check is:

```bash
node --check docs/.vitepress/theme/locales/javascript-intro/zh-cn.js
node --check docs/.vitepress/theme/locales/javascript-intro/en.js
npx eslint docs/.vitepress/theme/components/appendix/javascript-intro/*.vue docs/.vitepress/theme/locales/javascript-intro/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/javascript-intro/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "javascript-intro",
  "total": 4,
  "withChinese": 0,
  "withI18n": 4,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "Variables Are Named Boxes|Scope: where variables are visible|DOM Tree: the Webpage JavaScript Sees|Event Loop: How JavaScript Executes Code" docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/javascript-deep-dive.html docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/browser-as-os-rendering.html docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/concurrency-async.html
git checkout -- docs/public/sitemap.xml
```

For `ai-native-app`, the current verified source-level check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/ai-native-app/*.vue docs/.vitepress/theme/locales/ai-native-app/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/ai-native-app || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "ai-native-app",
  "total": 5,
  "withChinese": 0,
  "withI18n": 5,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/8-artificial-intelligence/ai-native-app-design.html',
  'utf8'
)
const present = [
  'Traditional Apps vs AI-Native Apps',
  'AI-Native Design Principles',
  'Prompt Engineering Lab',
  'AI-Native Interaction Patterns',
  'AI Application Request Flow'
]
const absent = [
  '传统应用 vs AI 原生应用',
  'AI 原生设计原则',
  'Prompt 工程实验室',
  'AI 原生交互模式',
  'AI 应用请求处理流程'
]
let ok = true
for (const s of present) ok = html.includes(s) && ok
for (const s of absent) ok = !html.includes(s) && ok
process.exit(ok ? 0 : 1)
NODE
git checkout -- docs/public/sitemap.xml
```

For the `web-basics` network components used by
`computer-networks.html`, the current verified source-level check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/web-basics/UrlParserDemo.vue docs/.vitepress/theme/components/appendix/web-basics/DnsLookupDemo.vue docs/.vitepress/theme/components/appendix/web-basics/TcpHandshakeDemo.vue docs/.vitepress/theme/components/appendix/web-basics/HttpExchangeDemo.vue docs/.vitepress/theme/components/appendix/web-basics/BrowserRenderingDemo.vue docs/.vitepress/theme/locales/web-basics/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/web-basics/UrlParserDemo.vue docs/.vitepress/theme/components/appendix/web-basics/DnsLookupDemo.vue docs/.vitepress/theme/components/appendix/web-basics/TcpHandshakeDemo.vue docs/.vitepress/theme/components/appendix/web-basics/HttpExchangeDemo.vue docs/.vitepress/theme/components/appendix/web-basics/BrowserRenderingDemo.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The page-level fallback check is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/computer-networks.html',
  'utf8'
)
const present = [
  'URL Parsing -- Translating human text into structured information',
  'DNS Lookup -- Finding coordinates in the address book',
  'TCP Three-Way Handshake -- Establishing a reliable channel',
  'HTTP Request and Response -- Sending a note to buy a package',
  'Browser Rendering -- Turning plain text into a polished page'
]
const absent = [
  'URL 解析 -- 把人类文字翻译成结构化信息',
  'DNS 解析 -- 查地址簿找坐标',
  'TCP 三次握手 -- 建立可靠通话渠道',
  'HTTP 请求与响应 -- 寄纸条买包裹',
  '浏览器渲染 -- 干瘪文字拆解组装变成精美画面'
]
let ok = true
for (const s of present) ok = html.includes(s) && ok
for (const s of absent) ok = !html.includes(s) && ok
process.exit(ok ? 0 : 1)
NODE
git checkout -- docs/public/sitemap.xml
```

For the completed `web-basics` section, the current verified source-level check
is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/web-basics/*.vue docs/.vitepress/theme/locales/web-basics/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/web-basics/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "web-basics",
  "total": 17,
  "withChinese": 0,
  "withI18n": 15,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check for `html-css-layout.html` and
`frontend-frameworks.html` is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const checks = [
  {
    file: 'docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/html-css-layout.html',
    present: ['CSS Box Model', 'Flexbox Layout', 'DOM Manipulation Demo', 'HTML / CSS / JavaScript Collaboration'],
    absent: ['CSS 盒模型', 'Flexbox 布局', 'DOM 操作演示', 'HTML / CSS / JavaScript 协作演示']
  },
  {
    file: 'docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/frontend-frameworks.html',
    present: ['Imperative vs Declarative', 'What is jQuery? Understand it with a cart count', 'Rendering Strategies: CSR / SSR / SSG', 'Responsive Layout: one codebase, many screens', 'Routing Mode: full-page reload vs partial switch', 'Image slicing era: more requests means slower loading'],
    absent: ['命令式 vs 声明式', '什么是 jQuery？用“购物车数量”秒懂', '渲染策略：CSR / SSR / SSG', '响应式布局：一套代码，多种屏幕', '路由方式：整页刷新 vs 局部切换', '切图时代：请求数越多越慢']
  }
]
let ok = true
for (const check of checks) {
  const html = fs.readFileSync(check.file, 'utf8')
  for (const text of check.present) ok = html.includes(text) && ok
  for (const text of check.absent) ok = !html.includes(text) && ok
}
process.exit(ok ? 0 : 1)
NODE
git checkout -- docs/public/sitemap.xml
```

For the active `cloud-services` components used by
`cloud-platforms.html`, the current verified source-level check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/cloud-services/CloudServicesOverview.vue docs/.vitepress/theme/components/appendix/cloud-services/ComputeInstanceDemo.vue docs/.vitepress/theme/components/appendix/cloud-services/DeployWorkflowDemo.vue docs/.vitepress/theme/components/appendix/cloud-services/PricingCalculator.vue docs/.vitepress/theme/components/appendix/cloud-services/StorageTypeDemo.vue docs/.vitepress/theme/locales/cloud-services/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/cloud-services/CloudServicesOverview.vue docs/.vitepress/theme/components/appendix/cloud-services/ComputeInstanceDemo.vue docs/.vitepress/theme/components/appendix/cloud-services/DeployWorkflowDemo.vue docs/.vitepress/theme/components/appendix/cloud-services/PricingCalculator.vue docs/.vitepress/theme/components/appendix/cloud-services/StorageTypeDemo.vue || true
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
git checkout -- docs/public/sitemap.xml
```

`cloud-platforms.md` currently references only these five components across
locales:

- `CloudServicesOverview`
- `ComputeInstanceDemo`
- `StorageTypeDemo`
- `PricingCalculator`
- `DeployWorkflowDemo`

The previous `cloud-services` residue came from unused legacy component code.
The 14 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `ApiCallDemo.vue`
- `AwsVsAliyunDemo.vue`
- `CloudHistoryDemo.vue`
- `CloudServicesMapDemo.vue`
- `ComputeServicesDemo.vue`
- `DatabaseServicesDemo.vue`
- `K8sServicesDemo.vue`
- `NetworkServicesDemo.vue`
- `PricingModelDemo.vue`
- `ProviderComparison.vue`
- `RegionLatencyDemo.vue`
- `SecurityServicesDemo.vue`
- `ServiceSelectionDemo.vue`
- `StorageServicesDemo.vue`

For the completed `backend-evolution` section, the current verified
source-level check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/backend-evolution/*.vue docs/.vitepress/theme/locales/backend-evolution/*.js docs/.vitepress/theme/index.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/backend-evolution/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "backend-evolution",
  "total": 9,
  "withChinese": 0,
  "withI18n": 9,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check for `web-frameworks.html` is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/web-frameworks.html',
  'utf8'
)
const present = [
  'Backend Architecture Evolution',
  'Physical Server Era Demo',
  'Monolithic Architecture Demo',
  'Docker Containerization Demo',
  'Microservices Architecture Demo',
  'Kubernetes Orchestration Demo',
  'Serverless Architecture Demo',
  'Architecture Evolution Comparison',
  'Technology Stack Evolution Timeline'
]
const absent = [
  '后端架构进化之旅',
  '物理服务器时代演示',
  '单体架构演示',
  'Docker 容器化演示',
  '微服务架构演示',
  'Kubernetes 编排演示',
  'Serverless 架构演示',
  '架构演进对比',
  '技术栈演进时间线'
]
let ok = true
for (const text of present) ok = html.includes(text) && ok
for (const text of absent) ok = !html.includes(text) && ok
process.exit(ok ? 0 : 1)
NODE
git checkout -- docs/public/sitemap.xml
```

The previous `backend-evolution` residue came from unused legacy component code.
The 10 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `BackendEvolutionDemo.vue`
- `BackendQuickStartDemo.vue`
- `CacheHitRatioDemo.vue`
- `CgiQueueDemo.vue`
- `DeploymentFlowDemo.vue`
- `MicroserviceLatencyDemo.vue`
- `MonolithReleaseRiskDemo.vue`
- `MonolithVsMicroserviceDemo.vue`
- `ScalingStrategyDemo.vue`
- `ServerlessCostAutoScaleDemo.vue`

For the completed `queue-design` section, the current verified source-level
check is:

```bash
npx eslint docs/.vitepress/theme/components/appendix/queue-design/*.vue docs/.vitepress/theme/locales/queue-design/*.js
rg -n "[\p{Han}]" docs/.vitepress/theme/components/appendix/queue-design/*.vue || true
node scripts/scan-appendix-component-i18n.mjs --json
```

The section should report:

```json
{
  "section": "queue-design",
  "total": 4,
  "withChinese": 0,
  "withI18n": 4,
  "chineseWithoutI18n": 0
}
```

The page-level fallback check for `message-queues.html` is:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "System Decoupling Demo|Peak Shaving: flatten traffic spikes|Message Reliability Demo|Idempotence Demo|系统解耦演示|削峰填谷：把高峰|消息可靠性演示|幂等性演示" docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/message-queues.html
git checkout -- docs/public/sitemap.xml
```

For the small migrated sections, the current verified page-level check covers
`docker-containers`, `kubernetes`, `search-engines`, `data-visualization`,
`data-governance`, `distributed-systems`, `high-availability`,
`system-design-methodology`, `file-storage`, `neural-networks`, `linux-basics`,
`rate-limiting`, `async-task-queues`, `git-intro`, `typescript-intro`,
`ide-intro`, and the two `server-backend` pages:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const checks = [
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/7-infrastructure-and-operations/docker-containers.html',
    present: ['Virtual Machines vs Containers', 'Docker Lifecycle', 'Common commands', 'Shared host OS kernel'],
    absent: ['虚拟机 vs 容器', 'Docker 生命周期', '常用命令', '共享宿主 OS 内核']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/7-infrastructure-and-operations/kubernetes.html',
    present: ['Kubernetes Architecture', 'K8s Core Resources', 'YAML example', 'Smallest scheduling unit'],
    absent: ['Kubernetes 架构', 'K8s 核心资源', 'YAML 示例', '最小调度单元']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/search-engines.html',
    present: ['Inverted Index', 'Type a search term to see how an inverted index works', 'Source documents', 'Inverted index table'],
    absent: ['倒排索引表', '原始文档', '试试搜索：苹果', '命中文档']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/5-data/data-visualization.html',
    present: ['Chart Type Selector', 'Dashboard Layout Patterns', 'Recommended charts', 'Use cases:'],
    absent: ['图表类型选择器', '仪表盘布局模式', '推荐图表', '适用场景']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/5-data/data-governance.html',
    present: ['Data Quality Checker', 'Data Governance Framework', 'Data Lineage Tracing', 'Problem data', 'After governance', 'Data sources'],
    absent: ['数据质量检测器', '数据治理框架', '数据血缘追踪', '问题数据', '治理后', '数据源']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/6-architecture-and-system-design/distributed-systems.html',
    present: ['CAP Theorem Interactive Demo', 'Consistency Model Comparison', 'Eight Challenges in Distributed Systems', 'Typical systems:', 'Trade-off:', 'Scenario:'],
    absent: ['CAP 定理交互演示', '一致性模型对比', '分布式系统八大挑战', '典型系统', '权衡', '场景举例']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/6-architecture-and-system-design/high-availability.html',
    present: ['Availability Level Calculator', 'Failover Strategy Comparison', 'Yearly downtime', 'Typical scenarios:'],
    absent: ['可用性等级计算器', '故障转移策略对比', '每年停机', '典型场景']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/6-architecture-and-system-design/system-design-methodology.html',
    present: ['Four-Step System Design Method', 'Back-of-the-Envelope Estimator', 'Daily requests', 'Common estimation references'],
    absent: ['系统设计四步法', '信封背面估算器', '日请求量', '常用估算参考值']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/http-protocol.html',
    present: ['HTTP Protocol Demo', 'HTTP request', 'TCP connection', 'Version comparison'],
    absent: ['HTTP 协议演示', 'HTTP 请求', 'TCP 连接', '版本对比']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/serialization.html',
    present: ['Serialization Demo', 'In-memory object', 'Start serialization', 'Format comparison'],
    absent: ['序列化演示', '内存对象', '开始序列化', '格式对比']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/file-storage.html',
    present: ['Storage Type Comparison', 'File Upload Method Comparison', 'How CDN Acceleration Works', 'Access method', 'Server proxy', 'With CDN'],
    absent: ['存储类型对比', '文件上传方式对比', 'CDN 加速原理', '访问方式', '服务端中转', '有 CDN']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/8-artificial-intelligence/neural-networks.html',
    present: ['How a Neuron Works', 'Common Neural Network Layer Types', 'Common Neural Network Architectures', 'Input × Weight', 'Core parameters:', 'Network structure'],
    absent: ['神经元工作原理', '神经网络常见层类型', '常见神经网络架构', '输入 × 权重', '核心参数：', '网络结构']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/7-infrastructure-and-operations/linux-basics.html',
    present: ['Linux Filesystem Hierarchy', 'Linux Command Cheat Sheet', 'Linux Permission Decoder', 'Root directory', 'File operations', 'Permission number, such as 755'],
    absent: ['Linux 文件系统层级', 'Linux 命令速查', 'Linux 权限解读器', '根目录', '文件操作', '权限数字（如 755）']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/rate-limiting-backpressure.html',
    present: ['Rate Limiting Algorithm Comparison', 'Backpressure Control', 'Send request', 'Burst 10 requests', 'Token bucket', 'Produce rate:'],
    absent: ['限流算法对比', '背压控制 (Backpressure)', '发送请求', '突发 10 个请求', '令牌桶', '生产速率：']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/4-server-and-backend/async-task-queues.html',
    present: ['Popular Async Task Frameworks', 'Synchronous vs Asynchronous Processing', 'Task Retry and Backoff Strategies', 'Worker Pool Model', 'Submit order', 'Core features:'],
    absent: ['主流异步任务框架对比', '同步 vs 异步处理对比', '任务重试与退避策略', 'Worker 工作池模型', '提交订单', '核心特性：']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/2-development-tools/git-version-control.html',
    present: ['Local repository', 'Remote repository', 'Click the command buttons below in order'],
    absent: ['本地仓库', '远程仓库', '点击下方命令按钮，按顺序执行', '重置']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/3-browser-and-frontend/typescript.html',
    present: ['TypeScript Type Annotation Demo', 'Interface Demo', 'Generics Demo', 'Type Inference Demo', 'Change name (valid)', 'User Interface Definition', 'Generic Function Definition', 'Choose an example to see how type inference works:'],
    absent: ['TypeScript 类型注解演示', 'Interface 接口演示', '泛型 (Generics) 演示', '类型推断演示', '修改 name (正确)', 'User Interface 定义', '泛型函数定义', '选择一个示例看看类型推断是如何工作的：']
  },
  {
    page: 'docs/.vitepress/dist/ko-kr/appendix/2-development-tools/ide-basics.html',
    present: ['Demo: how do you ask AI about code you do not understand?'],
    absent: ['演示：遇到代码不懂怎么问 AI？', 'IDE 核心机制模拟器', '虚拟 IDE 交互演示', '开始自动导览', '悬停查看功能说明', 'VS Code 徽标：主菜单']
  }
]
let ok = true
for (const c of checks) {
  const html = fs.readFileSync(c.page, 'utf8')
  for (const s of c.present) ok = html.includes(s) && ok
  for (const s of c.absent) ok = !html.includes(s) && ok
}
process.exit(ok ? 0 : 1)
NODE
```

For the `transistor-to-cpu` Korean page:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
rg -n "cpuArchitecture\\.alu|行波进位加法器|完整加法器演示|加法器级联|半加器|全加器|多位加法器|核心思想|计算过程|本位|进位|溢出" docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/transistor-to-cpu.html
```

The `rg` command should produce no matches for component-origin Chinese text or
raw i18n keys. After any build, discard generated sitemap timestamp churn unless
the sitemap content itself is intentionally changed:

For `operating-systems`, use targeted checks for component-origin keys and
expected English fallback text:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/operating-systems.html',
  'utf8'
)
const needles = [
  'operatingSystems.',
  'Operating System',
  'The CPU switches tasks so fast',
  'Memory as the program sees it',
  'The file you see vs fragments on disk',
  'What is the computer doing after you double-click an icon?'
]
for (const needle of needles) {
  console.log(`${needle}: ${html.includes(needle) ? 'yes' : 'no'}`)
}
NODE
```

For `algorithm-thinking`, full HTML still includes Chinese navigation data from
VitePress, so verify raw keys and expected English fallback labels:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/algorithm-thinking.html',
  'utf8'
)
const checks = [
  'algorithmThinking.',
  'Algorithmic Thinking',
  'Search Algorithms',
  'Sorting Algorithms',
  'Recursive Thinking',
  'Greedy Algorithms',
  'Algorithm Design Paradigms'
]
for (const needle of checks) {
  console.log(`${needle}: ${html.includes(needle) ? 'yes' : 'no'}`)
}
NODE
```

For `data-structures`, verify all seven page components resolve through English
fallback on non-Chinese locales:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/data-structures.html',
  'utf8'
)
const bad = [
  '数据结构全景图',
  '线性结构的四种形态',
  '哈希表：超快的查找',
  '树形结构：层级关系的表示',
  '图结构：复杂关系的表示',
  '数据结构：数据的"容器"',
  '如何选择合适的数据结构？'
]
const good = [
  'Data Structure Overview',
  'Four Forms of Linear Structures',
  'Hash Tables: Super-Fast Lookup',
  'Tree Structures: Representing Hierarchies',
  'Graph Structures: Representing Complex Relationships',
  'Data Structures: Containers for Data',
  'How Do You Choose the Right Data Structure?'
]
for (const needle of bad) if (html.includes(needle)) console.log('BAD', needle)
for (const needle of good) if (!html.includes(needle)) console.log('MISSING', needle)
const raw = [...html.matchAll(/[>\s]dataStructures\.[^<\s]*/g)].map(m => m[0])
console.log('raw-like matches', raw.length)
NODE
```

For `computer-organization`, verify all fourteen page components resolve through
English fallback on non-Chinese locales:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/computer-organization.html',
  'utf8'
)
const checks = [
  ['has English code-to-instruction title', /From Code to Instructions/.test(html)],
  ['has English cache title', /Cache Principles/.test(html)],
  ['has English io title', /I\/O Method Comparison/.test(html)],
  ['has English controller title', /How the Controller Works/.test(html)],
  ['no original Chinese code title', !/从代码到指令/.test(html)],
  ['no original Chinese cache title', !/缓存 \(Cache\) 原理/.test(html)],
  ['no original Chinese io title', !/I\/O 方式对比/.test(html)],
  ['no raw keys', !/computerOrganization\./.test(html)]
]
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`)
process.exit(checks.every(([, ok]) => ok) ? 0 : 1)
NODE
```

For `vibe-coding-fullstack`, verify all twelve page components resolve through
English fallback on non-Chinese locales:

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/vibe-coding-fullstack.html',
  'utf8'
)
const checks = [
  ['has English skill shift title', /Changing Skill Importance/.test(html)],
  ['has English field map title', /Computer Field Map/.test(html)],
  ['has English framework title', /Frontend Framework Evolution/.test(html)],
  ['has English learning strategy title', /Vibe Coding Learning Strategy/.test(html)],
  ['no original Chinese field map title', !/计算机领域全景图/.test(html)],
  ['no original Chinese skill title', !/能力重要性变化/.test(html)],
  ['no original Chinese strategy title', !/Vibe Coding 学习策略/.test(html)],
  ['no raw keys', !/vibeCodingFullstack\./.test(html)]
]
for (const [name, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'} ${name}`)
process.exit(checks.every(([, ok]) => ok) ? 0 : 1)
NODE
```

For `programming-languages`, inspect only the component fragment. The full HTML
contains embedded VitePress site data for every locale, so searching the whole
file produces unrelated Chinese matches from navigation, metadata, and footer
configuration.

```bash
VITEPRESS_BUILD_LOCALES=ko-kr BUILD_LOCALE_GROUP_SIZE=1 npm run build:locales
node - <<'NODE'
const fs = require('fs')
const html = fs.readFileSync(
  'docs/.vitepress/dist/ko-kr/appendix/1-computer-fundamentals/programming-languages.html',
  'utf8'
)
const start = html.indexOf('class="language-map-demo"')
const end = html.indexOf('</div></div><div class="tip custom-block"', start)
const chunk = html.slice(Math.max(0, start - 200), end > start ? end : start + 20000)
const needles = [
  '编程语言图谱',
  '演化历程',
  '编程范式',
  '语言对比',
  '如何选择',
  '核心思想',
  'languageMap.'
]
for (const needle of needles) {
  if (chunk.includes(needle)) console.log(`MATCH ${needle}`)
}
NODE
```

```bash
git checkout -- docs/public/sitemap.xml
```
