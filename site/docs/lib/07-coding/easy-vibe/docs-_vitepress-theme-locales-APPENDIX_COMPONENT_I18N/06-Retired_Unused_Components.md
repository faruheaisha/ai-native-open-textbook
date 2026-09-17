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
pageSha256: "3e484b880bbff0597e2a034b7d006bbe654d81b87e270ac7b3ffe53367657396"
contentMode: "local-full"
zh: ""
---

## Retired Unused Components

`tracking-design` previously had nine Vue demos registered globally, but they
were not referenced by any Markdown page or utility script. They were removed
instead of migrated because keeping unreferenced demos would increase component
i18n scope without affecting rendered documentation:

- `TrackingOverviewDemo.vue`
- `TrackingTypesDemo.vue`
- `TrackingMethodsComparisonDemo.vue`
- `DataModelDesignDemo.vue`
- `DataCollectionDemo.vue`
- `DataPipelineDemo.vue`
- `PrivacyComplianceDemo.vue`
- `RealWorldCaseDemo.vue`
- `ToolSelectionDemo.vue`

`cloud-topology` previously had eight Vue demos in the appendix component tree,
but none were referenced by Markdown pages or the global component registry.
They were removed as stale files instead of migrated:

- `AvailabilityZoneDemo.vue`
- `ComputeTopologyDemo.vue`
- `DisasterRecoveryDemo.vue`
- `NetworkFlowDemo.vue`
- `ResourceTopologyDemo.vue`
- `StorageTopologyDemo.vue`
- `SubnetDesignDemo.vue`
- `VpcArchitectureDemo.vue`

`scheduled-tasks` previously had eight globally registered Vue demos, but the
only remaining references were commented archive notes, not rendered docs.
They were removed from the registry and archive notes instead of migrated:

- `CronExpressionDemo.vue`
- `TaskSchedulerDemo.vue`
- `BatchProcessingDemo.vue`
- `JobQueueDemo.vue`
- `RetryMechanismDemo.vue`
- `DistributedLockDemo.vue`
- `TaskMonitoringDemo.vue`
- `SchedulingConflictDemo.vue`

The remaining unreferenced appendix demos with Chinese hard-coded copy were
also removed after confirming their component names do not appear in docs,
scripts, tools, or the global registry:

- `ai-protocols/ProtocolWorkflowDemo.vue`
- `browser-frontend/A11yScreenReaderDemo.vue`
- `browser-frontend/I18nFormatDemo.vue`
- `data/SqlDemo.vue`
- `database-intro/DatabaseEvolutionDemo.vue`
- `database-intro/DatabaseIndexDemo.vue`
- `database-intro/RelationalDataDemo.vue`
- `frontend-performance/CachingStrategyDemo.vue`
- `frontend-performance/CriticalRenderingPathDemo.vue`
- `frontend-performance/LazyLoadingDemo.vue`
- `frontend-performance/ReflowRepaintDemo.vue`
- `gateway-proxy/RoutingRulesDemo.vue`
- `llm-intro/NextTokenPrediction.vue`
- `load-balancing/MultiRegionDemo.vue`
- `load-balancing/WeightedRoutingDemo.vue`
- `terminal-intro/WebTerminal.vue`
- `transformer-attention/AttentionDecompositionDemo.vue`

`ai-protocols` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/ai-protocols/index.js`
- `docs/.vitepress/theme/locales/ai-protocols/zh-cn.js`
- `docs/.vitepress/theme/locales/ai-protocols/en.js`

Migrated:

- `ProtocolComparisonDemo.vue`
- `McpVisualDemo.vue`
- `A2AVisualDemo.vue`
- `McpDetailedDemo.vue`
- `A2ADetailedDemo.vue`

`frontend-performance` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/frontend-performance/index.js`
- `docs/.vitepress/theme/locales/frontend-performance/zh-cn.js`
- `docs/.vitepress/theme/locales/frontend-performance/en.js`

Migrated:

- `PerformanceOverviewDemo.vue`
- `PerformanceMetricsDemo.vue`
- `ImageOptimizationDemo.vue`
- `VirtualScrollingDemo.vue`

`dns-https` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/dns-https/index.js`
- `docs/.vitepress/theme/locales/dns-https/zh-cn.js`
- `docs/.vitepress/theme/locales/dns-https/en.js`

Migrated:

- `DnsResolutionDemo.vue`
- `DnsRecordTypeDemo.vue`
- `HttpsHandshakeDemo.vue`
- `CertificateChainDemo.vue`
- `DnsHttpsComparisonDemo.vue`

`incident-response` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/incident-response/index.js`
- `docs/.vitepress/theme/locales/incident-response/zh-cn.js`
- `docs/.vitepress/theme/locales/incident-response/en.js`

Migrated:

- `SeverityLevelDemo.vue`
- `IncidentTimelineDemo.vue`
- `AlertEscalationDemo.vue`
- `IncidentCommandDemo.vue`
- `PostmortemDemo.vue`

`llm-intro` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/llm-intro/index.js`
- `docs/.vitepress/theme/locales/llm-intro/zh-cn.js`
- `docs/.vitepress/theme/locales/llm-intro/en.js`

Migrated:

- `LlmQuickStartDemo.vue`
- `TokenizationDemo.vue`
- `EmbeddingDemo.vue`
- `TokenizerToMatrix.vue`
- `RNNvsTransformer.vue`
- `TrainingInferenceDemo.vue`
- `ThinkingModelDemo.vue`
- `LinearAttentionDemo.vue`
- `MoEDemo.vue`

`backend-layered-architecture` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/backend-layered-architecture/index.js`
- `docs/.vitepress/theme/locales/backend-layered-architecture/zh-cn.js`
- `docs/.vitepress/theme/locales/backend-layered-architecture/en.js`

Migrated:

- `LayeredArchitectureDemo.vue`
- `ControllerLayerDemo.vue`
- `ServiceLayerDemo.vue`
- `RepositoryLayerDemo.vue`
- `DomainModelDemo.vue`
- `DtoFlowDemo.vue`
- `DependencyDirectionDemo.vue`
- `CleanArchitectureDemo.vue`

`cloud-storage-cdn` now has a section locale scaffold:

- `docs/.vitepress/theme/locales/cloud-storage-cdn/index.js`
- `docs/.vitepress/theme/locales/cloud-storage-cdn/zh-cn.js`
- `docs/.vitepress/theme/locales/cloud-storage-cdn/en.js`

Migrated:

- `ObjectStorageDemo.vue`
- `CdnAccelerationDemo.vue`
- `EdgeNodeDistributionDemo.vue`
- `CachePolicyDemo.vue`
- `UploadProcessDemo.vue`
- `TrafficSchedulingDemo.vue`
- `HttpsOptimizationDemo.vue`
- `AccessAnalyticsDemo.vue`
