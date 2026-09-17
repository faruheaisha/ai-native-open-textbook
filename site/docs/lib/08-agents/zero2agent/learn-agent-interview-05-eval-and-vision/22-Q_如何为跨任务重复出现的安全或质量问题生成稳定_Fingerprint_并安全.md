---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/05-eval-and-vision/index.md"
sourceRel: "learn-agent-interview/05-eval-and-vision/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/05-eval-and-vision/index.md"
sourceSha256: "17c863430bb6ecbc29d9475eb7480d07c54a45774e643f928d23fd755ef5d444"
pageSha256: "cb1d1bd8a8cc2ae58ea1fd5b4a7a044fa69e8be7243b7ef8dfda0715588e0e29"
contentMode: "local-full"
zh: ""
---

## Q：如何为跨任务重复出现的安全或质量问题生成稳定 Fingerprint，并安全接入自动修复 Agent？

> 来源：[元石科技后端/Agent 一面](https://www.nowcoder.com/discuss/921742843704549376)

**新手答**：“把错误文本做 Embedding，相似的聚成一类，然后让 Agent 自动修复。”

**高手答**：

原始错误文本不稳定：请求 ID、路径、时间、堆栈行号、组件版本和模型措辞都会变化。Fingerprint 应由**稳定根因特征**组成，例如责任层、规范化异常类型、失败操作、工具/规则 ID、关键堆栈帧、违反的不变量和脱敏后的资源类型；自由文本向量只用于候选召回，不能单独决定同簇。组件版本属于簇的适用范围和检索过滤条件，不应默认进入稳定签名，否则同一根因会被版本号机械拆散。

入簇采用“检索 + 验证”两阶段：先召回相近问题簇，再检查根因、适用版本和修复是否可共享。匹配不确定时进入人工待审，不要为了降低簇数量强行合并。簇本身带 `cluster_id、signature_version、owner、first/last_seen、affected_versions、reproducer、fix_ref、status`；规则变化时重新计算并保留旧新映射，支持误合并后拆簇。

观测字段可以借鉴 OpenTelemetry 稳定的 [异常语义约定](https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-logs/)，但 `exception.message` 可能含敏感信息，入库前必须脱敏。跨 Agent 失败还要记录首错节点和证据引用，不能把最终报错的组件当成根因。

问题簇不能直接触发生产修复。自动修复 Agent 先从簇中取得最小复现、允许修改范围和验收标准，在隔离环境生成候选补丁；依次通过静态检查、专项用例、全局回归和安全门禁，再 shadow/灰度发布。修复不得改金标、删断言或放宽安全阈值来制造通过；高风险、低置信或不可回滚变更必须转人工。

指标要同时看聚类纯度、新问题误归旧簇率、重复簇率、自动复现率、修复通过率、回归逃逸率和回滚率。簇越少不是目标，稳定地把相同根因转成可复现回归才是目标。

**差距在哪**：新手只做文本聚类。高手把 Fingerprint 建成版本化根因契约，用检索后验证控制误归，并让自动修复经过独立复现、回归和发布门禁。
