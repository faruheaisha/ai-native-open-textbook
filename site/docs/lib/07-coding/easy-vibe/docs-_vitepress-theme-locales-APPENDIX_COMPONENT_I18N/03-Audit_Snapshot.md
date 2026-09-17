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
pageSha256: "48dd8957b7623fdd22b426f10897420e2313cda3d978ecf26b9596d017a78573"
contentMode: "local-full"
zh: ""
---

## Audit Snapshot

Run:

```bash
node scripts/scan-appendix-component-i18n.mjs --json
```

Current scan summary:

```json
{
  "total": 575,
  "withChinese": 240,
  "withI18n": 321,
  "chineseWithoutI18n": 239,
  "computerFundamentals": {
    "total": 76,
    "withChinese": 0,
    "withI18n": 76,
    "chineseWithoutI18n": 0
  },
  "aiHistory": {
    "total": 13,
    "withChinese": 1,
    "withI18n": 11,
    "chineseWithoutI18n": 0
  },
  "monolithToMicroservices": {
    "total": 1,
    "withChinese": 0,
    "withI18n": 1,
    "chineseWithoutI18n": 0
  },
  "projectArchitecture": {
    "total": 1,
    "withChinese": 0,
    "withI18n": 1,
    "chineseWithoutI18n": 0
  },
  "dockerContainers": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "kubernetes": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "searchEngines": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "dataVisualization": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "highAvailability": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "systemDesignMethodology": {
    "total": 2,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "serverBackend": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 2,
    "chineseWithoutI18n": 0
  },
  "dataGovernance": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "distributedSystems": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "fileStorage": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "neuralNetworks": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "linuxBasics": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "rateLimiting": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "asyncTaskQueues": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "gitIntro": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "typescriptIntro": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "ideIntro": {
    "total": 3,
    "withChinese": 0,
    "withI18n": 3,
    "chineseWithoutI18n": 0
  },
  "aiNativeApp": {
    "total": 5,
    "withChinese": 0,
    "withI18n": 5,
    "chineseWithoutI18n": 0
  },
  "webBasics": {
    "total": 17,
    "withChinese": 0,
    "withI18n": 15,
    "chineseWithoutI18n": 0
  },
  "cloudServices": {
    "total": 6,
    "withChinese": 0,
    "withI18n": 5,
    "chineseWithoutI18n": 0
  },
  "backendEvolution": {
    "total": 9,
    "withChinese": 0,
    "withI18n": 9,
    "chineseWithoutI18n": 0
  },
  "queueDesign": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "agentIntro": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "audioIntro": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "engineeringExcellence": {
    "total": 14,
    "withChinese": 0,
    "withI18n": 14,
    "chineseWithoutI18n": 0
  },
  "apiIntro": {
    "total": 7,
    "withChinese": 0,
    "withI18n": 7,
    "chineseWithoutI18n": 0
  },
  "cacheDesign": {
    "total": 5,
    "withChinese": 0,
    "withI18n": 5,
    "chineseWithoutI18n": 0
  },
  "imageGenIntro": {
    "total": 1,
    "withChinese": 0,
    "withI18n": 1,
    "chineseWithoutI18n": 0
  },
  "javascriptIntro": {
    "total": 4,
    "withChinese": 0,
    "withI18n": 4,
    "chineseWithoutI18n": 0
  },
  "authDesign": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "backendLanguages": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "cloudIam": {
    "total": 10,
    "withChinese": 0,
    "withI18n": 10,
    "chineseWithoutI18n": 0
  },
  "frontendRouting": {
    "total": 9,
    "withChinese": 0,
    "withI18n": 9,
    "chineseWithoutI18n": 0
  },
  "embeddingVector": {
    "total": 5,
    "withChinese": 0,
    "withI18n": 5,
    "chineseWithoutI18n": 0
  },
  "apiDesign": {
    "total": 7,
    "withChinese": 0,
    "withI18n": 7,
    "chineseWithoutI18n": 0
  },
  "componentStateManagement": {
    "total": 8,
    "withChinese": 0,
    "withI18n": 8,
    "chineseWithoutI18n": 0
  },
  "topRemaining": [
    "llm-intro: 10/10",
    "tracking-design: 9/9",
    "backend-layered-architecture: 8/8",
    "cloud-topology: 8/8",
    "concurrency-models: 8/8",
    "data: 8/8"
  ]
}
```

The scan is intentionally conservative: it reports Vue components that still
contain Chinese text and do not yet import the component i18n layer. It is a
triage tool, not proof that every translated string is high quality.

Note: `ExpertSystemWaveDemo.vue` and `RuleBasedVsLearningDemo.vue` are registered
components but are not currently referenced by `ai-history.md`, so page HTML
cannot prove their rendered copy. Use lint, component Chinese-residue scan, and
the section scan (`ai-history.chineseWithoutI18n === 0`) as the authoritative
check for those two components.

The previous `computer-fundamentals` residue was legacy component code. The 28
files below were not found in any Markdown page under `docs/`, and have been
retired from the component directory and global registry:

- `AdderDemo.vue`
- `AlgorithmOverviewDemo.vue`
- `AppLaunchDemo.vue`
- `ApplicationLayerDemo.vue`
- `BIOSPostDemo.vue`
- `BiosUefiDemo.vue`
- `BootProcessDemo.vue`
- `DataEncodingBasicsDemo.vue`
- `DataLifecycleDemo.vue`
- `DataLinkLayerDemo.vue`
- `DesktopDemo.vue`
- `EncodingDemo.vue`
- `EncodingStorageTransmissionDemo.vue`
- `LanguageEvolutionDemo.vue`
- `LanguageScenarioDemo.vue`
- `NetworkLayers.vue`
- `NetworkLayersSimple.vue`
- `NetworkPrincipleDemo.vue`
- `PhysicalLayerDemo.vue`
- `ProgrammingLanguageComparisonDemo.vue`
- `ProgrammingParadigmDemo.vue`
- `SandToIntelligenceDemo.vue`
- `StorageDemo.vue`
- `SubnetCalculator.vue`
- `TcpUdpComparison.vue`
- `TcpUdpSimple.vue`
- `TransmissionDemo.vue`
- `TransportLayerDemo.vue`

The previous `web-basics` residue also included unused legacy component code.
The 15 files below were not found in any Markdown page under `docs/`, and have
been retired from the component directory and global registry:

- `BigFrontendScopeDemo.vue`
- `BundlerSizeDemo.vue`
- `CssCommonProperties.vue`
- `CssLayoutDemo.vue`
- `CssPlaygroundDemo.vue`
- `CssSelectorsDemo.vue`
- `DeploymentArchitecture.vue`
- `NetworkLayers.vue`
- `NetworkTroubleshooting.vue`
- `SemanticTagsDemo.vue`
- `SpaStatePreservationDemo.vue`
- `SubnetCalculator.vue`
- `TcpUdpComparison.vue`
- `UrlToBrowserDemo.vue`
- `VueReactComparisonDemo.vue`

The previous `queue-design` residue also included unused legacy component code.
The 12 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `CouplingDemo.vue`
- `DeadLetterQueueDemo.vue`
- `DelayedMessageDemo.vue`
- `MQArchitectureDemo.vue`
- `MQComparisonDemo.vue`
- `MessageQueueComparisonDemo.vue`
- `MessageQueueComponentsDemo.vue`
- `MessageQueueDemo.vue`
- `PointToPointVsPubSubDemo.vue`
- `ProducerConsumerDemo.vue`
- `PubSubDemo.vue`
- `SeckillSystemDemo.vue`

The previous `agent-intro` residue also included unused legacy component code.
The 4 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `AgentTaskFlowDemo.vue`
- `FrameworkSelectionDemo.vue`
- `AgentMultiToolPrinciple.vue`
- `AgentMemoryPrinciple.vue`

The previous `api-intro` residue also included unused legacy component code.
The 6 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `ApiQuickStartDemo.vue`
- `ApiConceptDemo.vue`
- `RequestResponseFlow.vue`
- `ApiMethodDemo.vue`
- `RealWorldApiDemo.vue`
- `FunctionApiDemo.vue`

The previous `cache-design` residue also included unused legacy component code.
The 10 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `CacheArchitectureDemo.vue`
- `LocalityPrincipleDemo.vue`
- `LocalVsDistributedCacheDemo.vue`
- `MultiLevelCacheDemo.vue`
- `CachePatternsDemo.vue`
- `ProductCacheDemo.vue`
- `CacheArchitectureOverview.vue`
- `CacheHierarchyDemo.vue`
- `CachePatternComparisonDemo.vue`
- `CacheMonitoringDashboardDemo.vue`

The previous `image-gen-intro` residue also included unused legacy component code.
The 12 files below were not found in Markdown pages or non-self code references,
and have been retired from the component directory and global registry:

- `CFGScaleDemo.vue`
- `ControlNetDemo.vue`
- `FlowMatchingDemo.vue`
- `ImageGenArchitecture.vue`
- `ImageGenQuickStartDemo.vue`
- `LatentSpaceViz.vue`
- `LoRADemo.vue`
- `PromptEngineeringDemo.vue`
- `PromptVisualizer.vue`
- `SamplerComparisonDemo.vue`
- `UNetDenoiseDemo.vue`
- `VaeEncoderDemo.vue`

The previous `javascript-intro` residue also included unused legacy component
code. The 9 files below were not found in Markdown pages or non-self code
references, and have been retired from the component directory and global
registry:

- `AsyncDemo.vue`
- `AsyncRestaurantDemo.vue`
- `ClosureDemo.vue`
- `DataTypeDemo.vue`
- `FunctionMachineDemo.vue`
- `PrototypeDemo.vue`
- `ReferenceDemo.vue`
- `ThisContextDemo.vue`
- `VariableScopeDemo.vue`

The `development-tools` section now has all 12 Markdown-referenced components
externalized through `development-tools` locale dictionaries. Unlike the earlier
interrupted audit, these components are all referenced by localized Markdown
pages and must remain registered globally:

- `EnvVarOverviewDemo.vue`
- `PathSearchDemo.vue`
- `EnvScopeDemo.vue`
- `EnvExportDemo.vue`
- `ApiKeyDangerDemo.vue`
- `DotEnvDemo.vue`
- `ServerSecretDemo.vue`
- `PackageManagerOverviewDemo.vue`
- `PackageInstallDemo.vue`
- `DependencyTreeDemo.vue`
- `SSHAuthDemo.vue`
- `RegexDemo.vue`

Latest source scan after `development-tools`:

```json
{
  "total": 578,
  "withChinese": 336,
  "withI18n": 227,
  "chineseWithoutI18n": 335,
  "developmentTools": 0
}
```

The `context-engineering` section now has all 11 Markdown-referenced components
externalized through `context-engineering` locale dictionaries:

- `AgentContextFlow.vue`
- `IntroProblemReasonSolution.vue`
- `ContextWindowVisualizer.vue`
- `KVCacheDemo.vue`
- `SlidingWindowDemo.vue`
- `LostInMiddleDemo.vue`
- `SelectiveContextDemo.vue`
- `RAGSimulationDemo.vue`
- `ContextCompressionDemo.vue`
- `MemoryPalaceDemo.vue`
- `MemoryPalaceActionDemo.vue`

Latest source scan after `context-engineering`:

```json
{
  "total": 578,
  "withChinese": 325,
  "withI18n": 238,
  "chineseWithoutI18n": 324,
  "contextEngineering": 0
}
```

The `framework-nature` section now has all 11 Markdown-referenced components
externalized through `framework-nature` locale dictionaries:

- `ComponentTreeDemo.vue`
- `DataUIGapDemo.vue`
- `DeclarativeFormulaDemo.vue`
- `DomOperationCostDemo.vue`
- `FrameworkMotivationDemo.vue`
- `FrameworkSpectrumDemo.vue`
- `ManualVsAutoSyncDemo.vue`
- `ReactivityMechanismDemo.vue`
- `VirtualDomDiffDemo.vue`
- `WhatIsDomDemo.vue`
- `WhyNoAutoSyncDemo.vue`

Latest source scan after `framework-nature`:

```json
{
  "total": 578,
  "withChinese": 314,
  "withI18n": 249,
  "chineseWithoutI18n": 313,
  "frameworkNature": 0
}
```

The `vlm-intro` section now has all 11 appendix components externalized through
`vlm-intro` locale dictionaries:

- `AttentionDemo.vue`
- `FeatureAlignmentDemo.vue`
- `LinearProjectionDemo.vue`
- `ModelArchitectureComparisonDemo.vue`
- `PatchifyDemo.vue`
- `PositionalEmbeddingDemo.vue`
- `ProjectorDemo.vue`
- `TrainingPipelineDemo.vue`
- `VLMInferenceDemo.vue`
- `ViTOutputDemo.vue`
- `VlmQuickStartDemo.vue`

Latest source scan after `vlm-intro`:

```json
{
  "total": 578,
  "withChinese": 303,
  "withI18n": 260,
  "chineseWithoutI18n": 302,
  "vlmIntro": 0
}
```
