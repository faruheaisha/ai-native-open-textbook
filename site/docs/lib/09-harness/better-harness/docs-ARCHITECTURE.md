---
title: "Architecture Principles"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/ARCHITECTURE.md"
sourceRel: "docs/ARCHITECTURE.md"
rawUrl: "/raw/09-harness/better-harness/docs/ARCHITECTURE.md"
sourceSha256: "ff1a9d34bcc208f0d1f1239a58213aea2819d04412d3d7e4004fbdc77b7c7fc8"
pageSha256: "ff1a9d34bcc208f0d1f1239a58213aea2819d04412d3d7e4004fbdc77b7c7fc8"
contentMode: "local-full"
zh: "on"
---

# Architecture Principles

This file is the accepted repository-wide owner of architecture principles,
ownership boundaries, and AI-facing routing rules. Detailed decisions are
indexed in [Architecture Decision Records](/lib/09-harness/better-harness/docs-adrs). The
[directory-structure ADR](/lib/09-harness/better-harness/docs-adrs-directory-structure) owns directory status;
the [developer-experience-system ADR](/lib/09-harness/better-harness/docs-adrs-developer-experience-system/index) owns
the target journey, contract, evidence, governance, and DX-measurement system.

<div class="tb-zh"><p>本文件是全仓库公认的所有者，掌管架构原则、归属边界以及面向 AI 的路由规则。具体决策索引在架构决策记录中。目录结构 ADR 掌管目录状态；开发者体验系统 ADR 掌管目标旅程、契约、证据、治理以及 DX 度量体系。</p></div>

- Build minimum runnable atomic capabilities: each `scripts/<capability>/` should be copyable, executable, testable, and distributable.
- Put command execution in `cli.mjs`; add `index.mjs` only when other modules need a public import surface.
- The primary root CLI `scripts/better-harness.mjs` must stay a thin facade: it
  dispatches to capability-owned commands with argv arrays and must not own
  product logic, schemas, fixtures, or host adapters.
- Compose through public surfaces; do not import another capability's private helpers, fixtures, or provider modules.
- Extracted desktop capability services keep native engines outside the Studio
  Node host. OXC, ACP, and evidence services use Rust; the AgentReact linker uses
  the public Go esbuild engine with a thin Objective-C NSXPC shell on macOS and
  retains the existing WASM linker on Windows/Linux. The Go stdio adapter is a
  test harness, not their desktop backend. Keep contracts explicit and portable.
- Keep product judgment in canonical owners such as `skills/`, `scripts/`, `hooks/`, `models/`, `schemas/` (a target owner, not yet created), `templates/`, and `references/`; host shells stay thin.
- Use business-named boundaries, not generic umbrellas such as `scripts/core/`.
- Runtime behavior needs a contract plus validation evidence: fixtures, tests, smoke commands, or parser-safe output. CLI facades need help, unknown-command, and delegated-output coverage.
- Reader-facing prose produced by an AI mutation workflow stays owned by that AI.
  Deterministic writers may validate, revision-check, persist, and project the
  supplied copy, but they do not compose or translate it; host UIs render the
  persisted semantic copy instead of rebuilding it from structural metadata.
- Keep host evidence adapters separate from packaging, and keep all automation cross-platform.
- Keep Harness as Code dependencies directed `core <- adapters <- devtools`:
  the package root owns browser-safe grammar, IR, revision, and resolution;
  source locking, host execution, compare execution, and highlighting are
  explicit subpath boundaries. UI protocol layers accept injected executors.
- Bridge persisted Harness runs into Inspector through the `harness-run`
  session adapter. Harness owns revision and receipt schemas; session-analysis
  owns `NormalizedToolActivityV1`; the bridge is one-way and never merges the
  two contracts. See [ADR-0003](/lib/09-harness/better-harness/docs-adrs-harness-run-evidence-bridge).
- Keep stable host identity, display, home-option, and support-slice metadata in
  `scripts/host-support/`. Executable adapter imports and construction remain in
  capability-local registries; do not introduce a global host service locator.
- Keep source-local host artifact assembly under `scripts/packaging/`; generated
  host artifacts are validation/install outputs, not canonical product owners or
  public package or Qoder runtime inputs.

<div class="tb-zh"><p>内容为一组架构约束：构建最小可运行的原子能力，每个 scripts/&lt;capability&gt;/ 都应可复制、可执行、可测试、可分发；命令执行放在 cli.mjs 中，只有当其他模块需要公开导入面时才新增 index.mjs；根 CLI 主入口 scripts/better-harness.mjs 必须保持为一层薄门面，它以 argv 数组把请求分派给各能力自有的命令，不得承载产品逻辑、schema、fixture 或宿主适配器；通过公开面进行组合，不要导入另一个能力的私有 helper、fixture 或 provider 模块；抽离出的桌面能力服务把原生引擎保持在 Studio Node 宿主之外——OXC、ACP 与证据服务使用 Rust，AgentReact linker 使用公开的 Go esbuild 引擎（macOS 上配一层薄薄的 Objective-C NSXPC 外壳），并在 Windows/Linux 上保留既有的 WASM linker，Go stdio 适配器只是测试夹具而非它们的桌面后端，契约要保持显式且可移植；产品判断保留在规范所有者中，例如 skills/、scripts/、hooks/、models/、schemas/（目标所有者，尚未创建）、templates/ 和 references/，宿主外壳保持薄；使用以业务命名的边界，不要使用 scripts/core/ 这类泛化的大伞；运行时行为需要契约加验证证据——fixture、测试、smoke 命令或解析器安全的输出，CLI 门面还需要覆盖 help、未知命令和委托输出；由 AI 变异工作流产出的、面向读者的文案仍归该 AI 所有，确定性写入器可以校验、做修订检查、持久化并投影所供给的文案，但不得自行撰写或翻译，宿主 UI 渲染已持久化的语义文案，而不是从结构化元数据重建它；宿主证据适配器与打包保持分离，所有自动化保持跨平台；Harness as Code 的依赖方向保持为 core &lt;- adapters &lt;- devtools，包根拥有浏览器安全的语法、IR、修订与解析，源码锁定、宿主执行、compare 执行与高亮是显式的子路径边界，UI 协议层接受注入的执行器；通过 harness-run 会话适配器把持久化的 Harness 运行桥接进 Inspector——Harness 拥有修订与回执 schema，session-analysis 拥有 NormalizedToolActivityV1，这座桥是单向的，绝不合并两套契约，见 ADR-0003；把稳定的宿主身份、展示、home 选项与支持切片元数据保留在 scripts/host-support/，可执行适配器的导入与构造仍留在各能力本地的注册表中，不要引入全局的宿主服务定位器；源码本地的宿主产物组装保留在 scripts/packaging/ 下，生成的宿主产物属于验证/安装输出，不是规范的产品所有者，也不是公开包或 Qoder 运行时的输入。</p></div>

## Directory Conventions

- `scripts/` is for automation entrypoints used by hooks, Qoder, Codex, or other non-interactive workflows. Put ad-hoc debugging and preview helpers in `dev/`.
- Keep helper `.mjs` directories modular: one narrow concern, small entrypoints, and no catch-all modules.
- New analyzers, scoring signals, and hook helpers should own modules when they represent distinct concerns.
- Executable behavior belongs in business-named `scripts/<capability>/`; do not create `scripts/core/`.
- Existing `scripts/core-change-watch/` and `scripts/session-analysis/` remain live owners until a tested migration lands.
- `scripts/plugin-lifecycle/` owns read-only Better Harness lifecycle status,
  deterministic plans, and verification. It composes only the public
  `agent-customize` inventory and never executes a planned host mutation. Its
  `read-only-command.mjs` is the shared strict parser/envelope/timeout runtime
  for lifecycle and doctor commands; it is capability-scoped, not the
  repository-wide authoritative command-contract owner. Identity/digest,
  bounded runtime/path discovery, target resolution, status/verification, and
  planning live in separate private modules; `target-resolution.mjs` is the
  single owner for host, surface, and scope selection used by status and plan.
  `model.mjs` owns the shared lifecycle schema version, Better Harness plugin
  identity/version, base target, diagnostic, and assertion primitives used by
  both status and plan validation; domain modules retain only their own state
  vocabularies and invariants.
  `status-row.mjs` is the single `PluginLifecycleStatusV1` row factory and
  validator for both observed inventory and inventory-failure paths; status
  core owns only collection, ordering, aggregation, and command summaries.
  `plan-model.mjs` is the corresponding single `PluginLifecyclePlanV1`
  transition, step-materialization, digest, and validation owner; plan core
  only resolves the target, collects status, and delegates construction.
  Planned mutations are typed as external `host-plugin-state` steps, while
  post-apply verification is typed as read-only `host-observation` so consumers
  never mistake a verification command for a mutation performed by the CLI.
  `command-manifest.mjs` is the pure, read-only leaf metadata owner projected
  into the root CLI registry; `command-definitions.mjs` binds that manifest to
  lifecycle executors and `human-output.mjs` renderers. The plugin CLI performs
  generic descriptor dispatch and must not branch on leaf names.
  `index.mjs` is the only cross-capability behavioral import surface and
  contains exports rather than implementation; the root registry's direct,
  metadata-only manifest projection is the sole allowed exception so root help
  does not load lifecycle runtime owners.
- `scripts/host-support/` currently provides the validated shadow profiles used
  by plugin lifecycle. While ADR-0002 remains proposed, the adapter matrix,
  capability providers, manifests, and installation documentation remain
  authoritative for their existing slices; the new profiles may detect drift
  but do not silently replace those owners. Each host owns one module under
  `scripts/host-support/profiles/`; `profile-model.mjs` is the single local
  `HostSurfaceProfileV1` vocabulary and validation owner. Profile modules fail
  during their own construction and are deeply immutable before registry
  composition; the registry facade delegates local validation and owns only
  cross-profile host-id and alias conflicts. `profile-builders.mjs` owns typed
  construction helpers for evidence, operations, surfaces, and steps rather
  than duplicating their invariants, and `profiles.mjs` only composes the
  registry. Every provider-specific filesystem root read outside the selected
  workspace must have an explicit `inventoryHomeRoutes` entry, including state
  files, shared caches, and compatibility roots such as a user-level
  `.agents/` directory. Each primary and secondary route declares its provider
  option, an isolated path relative to `--host-home`, and a redacted safe
  fallback label; providers return the effective resolved roots so doctor can
  report them without exposing absolute user paths. Per-surface inventory,
  bundled, session-only, or desktop-cache observation semantics are profile
  data. Each surface also declares whether host discovery comes from its
  executable, a provider diagnostic, or remains unobserved; bundled and
  session-only surfaces do not read unrelated persistent inventory. Scope-
  artifact ownership and native home binding are profile data as well. A shared
  `scopeArtifactPolicy` or `nativeHomeBinding` requires versioned, traceable
  native evidence. Without an evidenced binding that can represent every
  emitted native step, an isolated-home mutation plan fails closed and omits
  unbound native verification steps. Lifecycle status must not branch on
  canonical host ids.
- `scripts/harness-doctor/` owns the bounded host/plugin diagnostic view and
  reuses plugin-lifecycle status rather than reimplementing host discovery.
- `scripts/harness-analysis/canvas-preview/` owns reusable local Canvas serving,
  runtime discovery, transforms, the Harness preview fixture, and cross-platform
  browser helpers. Keeping it below `harness-analysis/` preserves the tested
  copy/install boundary; the historical `canvas-preview-server.mjs` path is a
  thin compatibility entrypoint.
- `scripts/harness-analysis/report-source/` owns the report-source contract and
  its bounded human-review integrity chain: packet binding, episode/delivery
  normalization, and review application. Non-facade consumers import its public
  `index.mjs`; historical flat paths remain compatibility entrypoints.
- `scripts/harness-component-snapshot/` owns the versioned, read-only Qoder
  project component snapshot, validation, bounded diff, and non-authorizing
  rollback-reference contracts. It composes only allowlisted public
  `agent-customize` project collections, keeps its direct CLI capability-local,
  and does not claim runtime activation or mutation authority.
- `schemas/` is a target owner, not yet created, for versioned public runtime contracts consumed by multiple repo surfaces or packaged hosts; see the directory-structure ADR for adoption criteria. Capability-private schemas stay under `scripts/<capability>/`.

<div class="tb-zh"><p>内容为一组目录归属规则：scripts/ 用于 hooks、Qoder、Codex 或其他非交互工作流使用的自动化入口，临时的调试与预览 helper 放在 dev/；helper 类型的 .mjs 目录保持模块化——一个目录只关注一件窄事、入口要小、不要有包罗万象的模块；新的分析器、评分信号和 hook helper 只要代表彼此独立的关注点，就应当各自拥有模块；可执行行为属于以业务命名的 scripts/&lt;capability&gt;/，不要创建 scripts/core/；现有的 scripts/core-change-watch/ 和 scripts/session-analysis/ 在经受测试的迁移落地之前仍是实际所有者；scripts/plugin-lifecycle/ 掌管只读的 Better Harness 生命周期状态、确定性计划和验证，它只组合公开的 agent-customize 清单，绝不执行计划中的宿主变更，其 read-only-command.mjs 是生命周期与 doctor 命令共用的严格解析器/信封/超时运行时，作用域限于该能力，不是全仓库权威的命令契约所有者，身份/摘要、有界的运行时与路径发现、目标解析、状态/验证以及计划各自位于独立的私有模块中，target-resolution.mjs 是状态与计划共同使用的宿主、surface 和 scope 选择的唯一所有者，model.mjs 拥有状态与计划验证共用的生命周期 schema 版本、Better Harness 插件身份/版本、基础目标、诊断与断言原语，领域模块只保留各自的状态词汇表与不变式，status-row.mjs 是观测到的清单与清单失败两条路径共用的唯一 PluginLifecycleStatusV1 行工厂与校验器，status core 只负责收集、排序、聚合与命令摘要，plan-model.mjs 是对应的唯一 PluginLifecyclePlanV1 转换、步骤物化、摘要与验证所有者，plan core 只解析目标、收集状态并委托构造，计划中的变更被类型化为外部的 host-plugin-state 步骤，而应用后的验证被类型化为只读的 host-observation，以免消费者把验证命令误认为 CLI 执行的变更，command-manifest.mjs 是投影进根 CLI 注册表的纯只读叶子元数据所有者，command-definitions.mjs 把该清单绑定到生命周期执行器，human-output.mjs 绑定渲染器，插件 CLI 执行通用的描述符分派，不得按叶子名称分支，index.mjs 是唯一的跨能力行为导入面且只包含导出而非实现，根注册表对其仅元数据清单的直接投影是唯一允许的例外，这样根 help 就不会加载生命周期运行时所有者；scripts/host-support/ 目前提供插件生命周期所使用的、经过验证的影子 profile，在 ADR-0002 仍处于 proposed 状态期间，适配器矩阵、能力 provider、清单和安装文档对其现有切片仍然是权威的，新的 profile 可以检测漂移但不得静默取代那些所有者，每个宿主在 scripts/host-support/profiles/ 下拥有一个模块，profile-model.mjs 是本地唯一的 HostSurfaceProfileV1 词汇表与验证所有者，profile 模块在自身构造期间就会失败，并且在注册表组合之前即深度不可变，注册表门面把本地校验委托出去，只负责跨 profile 的 host-id 与别名冲突，profile-builders.mjs 拥有面向证据、操作、surface 与步骤的类型化构造 helper，而不是重复它们的不变式，profiles.mjs 只负责组合注册表，任何在所选工作区之外读取 provider 专属文件系统根的行为都必须有显式的 inventoryHomeRoutes 条目，包括状态文件、共享缓存以及诸如用户级 .agents/ 目录这样的兼容根，每个主路由与次路由都要声明其 provider 选项、相对于 --host-home 的隔离路径，以及一个脱敏的安全回退标签，provider 返回实际解析出的根，以便 doctor 在不暴露用户绝对路径的前提下报告它们，各 surface 的清单、内置、仅会话或桌面缓存观测语义都属于 profile 数据，每个 surface 还要声明其宿主发现来自可执行文件、来自 provider 诊断，还是保持未观测，内置与仅会话的 surface 不读取无关的持久化清单，scope 产物归属与原生 home 绑定同样是 profile 数据，共享的 scopeArtifactPolicy 或 nativeHomeBinding 需要带版本且可追溯的原生证据，如果没有能够表示每一个被发出的原生步骤的有证据绑定，隔离 home 的变更计划就会 fail closed 并省略未绑定的原生验证步骤，生命周期状态不得按规范 host id 分支；scripts/harness-doctor/ 掌管有界的宿主/插件诊断视图，并复用 plugin-lifecycle 的状态而不是重新实现宿主发现；scripts/harness-analysis/canvas-preview/ 掌管可复用的本地 Canvas 服务、运行时发现、变换、Harness 预览 fixture 以及跨平台浏览器 helper，把它放在 harness-analysis/ 之下可以保住经过测试的复制/安装边界，历史上的 canvas-preview-server.mjs 路径只是一层薄的兼容入口；scripts/harness-analysis/report-source/ 掌管 report-source 契约及其有界的人工评审完整性链条——packet 绑定、episode/delivery 规范化以及评审应用，非门面消费者导入它公开的 index.mjs，历史上的扁平路径保留为兼容入口；scripts/harness-component-snapshot/ 掌管带版本的只读 Qoder 项目组件快照、校验、有界 diff 以及非授权性的回滚引用契约，它只组合列入白名单的公开 agent-customize 项目集合，把直接 CLI 保持在该能力本地，也不宣称拥有运行时激活或变更权限；schemas/ 是目标所有者，尚未创建，用于被多个仓库面或打包宿主消费的带版本公开运行时契约，采纳标准见目录结构 ADR，能力私有的 schema 仍留在 scripts/&lt;capability&gt;/ 下。</p></div>

## AI Directory Routing

- Start from the [ADR index](/lib/09-harness/better-harness/docs-adrs). The directory-structure ADR is
  this file's detailed AI-optimized directory-status reference, while the DX
  system ADR governs cross-surface experience contracts and activation gates.
- For open-source community extensibility, start from `docs/community.md` and route intent -> owner -> contract -> evidence -> activation -> validation -> packaging before adding surfaces.
- Put shared user workflows in root `skills/`; use `.agents/skills/` only for host-local skills, generated mirrors, or wrappers.
- Use each `.agents/skills/<skill>/SKILL.md` as the host-local entrypoint; do not add mirror sidecar metadata.
- Put reusable role/persona prompts in `agent-roles/` (a target directory, not yet created; see the directory-structure ADR for adoption criteria) only when they contain no workflow steps and have a second skill/host consumer.
- Keep skill-specific evidence, artifact, output, and validation rules under `skills/<skill>/references/`.
- Treat `knowledge-base/` as a candidate directory, not yet created (see the directory-structure ADR for adoption criteria), until schema, fixtures, registry compilation, explicit consumer binding, and mapping tests pass.
- Put prose guidance in `references/`, examples and operating models in `case-studies/`, and runtime behavior in `skills/`, `scripts/`, `hooks/`, or `templates/` with tests.
- For shared reference placement, start from `references/README.md`: session
  evidence lives under `references/session-evidence/`, static project and
  delivery evidence under `references/project-harness/`, Agent asset guidance
  under `references/agent-customize/`, and repeated-work owner selection under
  `references/loop-engineering/`.
- Keep detector and signal contracts with the selected model, executable
  capability, or skill-local owner. Promote shared prose only for two visible
  workflow consumers; do not create a generic detector or signal umbrella.
- Keep `.claude-plugin/`, `.qoder-plugin/`, `.cursor-plugin/`,
  `.codex-plugin/`, `.agents/skills/`, and future host shells thin: they expose,
  wrap, mirror, or package canonical behavior; they do not own product judgment.
  The Claude Code shell owns native install/discovery metadata and exposes the
  canonical root skills; Claude configured-asset and session evidence remain
  in the capability-owned agent-customize and session-analysis providers. The Codex shell
  owns local install/discovery metadata only; Codex evidence collection remains
  in the capability-owned provider and session-analysis modules. The public npm
  package ships all seven plugin metadata roots, while the Qoder runtime bundle
  includes only `.qoder-plugin/`.

<div class="tb-zh"><p>内容为一组面向 AI 与社区的目录路由规则：从 ADR 索引入手，目录结构 ADR 是本文件面向 AI 优化的详细目录状态参考，而 DX 系统 ADR 治理跨 surface 的体验契约与激活门禁；对于开源社区扩展性，从 docs/community.md 开始，并在新增 surface 之前依次走通 意图 -&gt; 所有者 -&gt; 契约 -&gt; 证据 -&gt; 激活 -&gt; 验证 -&gt; 打包；共享的用户工作流放在根 skills/ 中，.agents/skills/ 只用于宿主本地 skill、生成的镜像或包装；把每个 .agents/skills/&lt;skill&gt;/SKILL.md 用作宿主本地入口，不要添加镜像 sidecar 元数据；只有当可复用的角色/人格提示词不含工作流步骤且存在第二个 skill 或宿主消费者时，才把它们放进 agent-roles/（目标目录，尚未创建，采纳标准见目录结构 ADR）；skill 专属的证据、产物、输出与验证规则放在 skills/&lt;skill&gt;/references/ 下；在 schema、fixture、注册表编译、显式消费者绑定与映射测试全部通过之前，把 knowledge-base/ 视为候选目录（尚未创建，采纳标准见目录结构 ADR）；散文式指引放在 references/，示例与运作模型放在 case-studies/，运行时行为连同测试放在 skills/、scripts/、hooks/ 或 templates/；共享参考的放置从 references/README.md 入手——会话证据位于 references/session-evidence/ 下，静态项目与交付证据位于 references/project-harness/ 下，Agent 资产指引位于 references/agent-customize/ 下，重复性工作的所有者选择位于 references/loop-engineering/ 下；检测器与信号的契约跟随所选模型、可执行能力或 skill 本地的所有者，只有当两个可见的工作流消费者都需要时才把共享散文提升出来，不要创建通用的检测器或信号大伞；.claude-plugin/、.qoder-plugin/、.cursor-plugin/、.codex-plugin/、.agents/skills/ 以及未来的宿主外壳都保持薄——它们暴露、包装、镜像或打包规范行为，但不拥有产品判断，Claude Code 外壳拥有原生安装/发现元数据并暴露规范的根 skills，Claude 的已配置资产与会话证据仍留在能力自有的 agent-customize 和 session-analysis provider 中，Codex 外壳只拥有本地安装/发现元数据，Codex 的证据收集仍留在能力自有的 provider 与 session-analysis 模块中，公开的 npm 包会发布全部七个插件元数据根，而 Qoder 运行时 bundle 只包含 .qoder-plugin/。</p></div>

## Developer Experience Routing

- Read the
  [Developer Experience System ADR](/lib/09-harness/better-harness/docs-adrs-developer-experience-system/index) before
  changing public product routes, Quickstarts, CLI/help/error contracts,
  Preview prerequisites, host support declarations, diagnostics, support or
  privacy behavior, release claims, or DX metrics.
- Treat the DX system as a federated control plane. Capability owners retain
  behavior and judgment; cross-surface tooling may index, validate, compare,
  and project their public declarations.
- Keep curated prose and translations author-owned. Generate or validate only
  structured facts unless an accepted spec establishes a narrower deterministic
  ownership boundary.
- Keep fixture, package, native-host, installed-application, deployed-site, and
  post-publish evidence distinct. One evidence class does not satisfy another
  class's acceptance gate.
- Do not route Better Harness's own DX governance through the runtime
  `software-fluency` report model. Changes to report-model routing require their
  own spec and validation.

<div class="tb-zh"><p>内容为一组 DX 治理规则：在改动公开产品路由、Quickstart、CLI/help/错误契约、Preview 前置条件、宿主支持声明、诊断、支持或隐私行为、发布声明或 DX 度量之前，先阅读开发者体验系统 ADR；把 DX 系统视为一个联邦式控制平面，能力所有者保留行为与判断，跨 surface 的工具可以索引、校验、比较并投影它们公开的声明；策划过的散文与翻译归作者所有，除非已采纳的 spec 确立了更窄的确定性归属边界，否则只生成或校验结构化事实；保持 fixture、package、原生宿主、已安装应用、已部署站点与发布后证据彼此区分，一类证据不能满足另一类证据的验收门禁；不要把 Better Harness 自身的 DX 治理接到运行时的 software-fluency 报告模型上，改动报告模型路由需要各自的 spec 和验证。</p></div>

## Template Boundaries

- Keep report-generation contracts under `templates/reporting/`: `routing.md` owns report/style/output selection, `report-structure.md` owns Markdown structure, and the mode files own runtime and validation contracts.
- Style templates own visual grammar, not runnable skeletons. Keep `templates/style/*.md` directive and style-specific; do not add style-specific TSX examples or shared Canvas skeletons.

<div class="tb-zh"><p>内容为两条报告生成契约：报告生成契约保留在 templates/reporting/ 下——routing.md 拥有报告/风格/输出的选择，report-structure.md 拥有 Markdown 结构，各模式文件拥有运行时与验证契约；风格模板只拥有视觉语法，不拥有可运行骨架，templates/style/*.md 保持指令式且风格专属，不要添加风格专属的 TSX 示例或共享 Canvas 骨架。</p></div>

## Agent-Friendly CLI Contracts

- Design CLI entrypoints as human-first defaults with machine-first contracts: readable help and summaries by default, plus explicit JSON, JSONL, or schema surfaces for agents and automation.
- Keep stdout parser-safe in machine modes. JSON/JSONL output must not include spinners, colors, progress text, or human diagnostics; logs, warnings, and errors belong on stderr unless they are part of a documented JSON error envelope.
- Make command surfaces discoverable without source reading. Root facades may expose command inventory and schema metadata, but delegated behavior, capability-private output schemas, fixtures, and product judgment stay under capability-owned directories.
- Classify every registered command and subcommand as `workflow`, `advanced`, or
  `maintainer`. Human help defaults to workflow routes and expands explicitly;
  machine inventory stays complete by default and reports the audience metadata.
- Preserve argv-array dispatch across platforms. Use Node and Git portability primitives such as `process.execPath`, `spawn`/`spawnSync` argument arrays, `path.join`, and `path.resolve`; avoid shell-string dispatch.
- Treat non-interactive execution as a first-class path. Agent-safe commands should support explicit flags such as `--json`, `--no-color`, `--quiet`, `--no-input`, `--dry-run`, `--yes`, `--limit`, `--output`, and `--timeout` when those modes apply.
- Separate planning from mutation. Destructive or externally visible actions need a plan/dry-run/draft phase before apply/publish, and the write phase must require explicit confirmation in non-interactive workflows.
- Keep CLI, MCP, hooks, skills, and host shells on the same core behavior. MCP exposes tools, hooks enforce lifecycle checks, skills own repeatable workflows, and the CLI remains the stable human/CI/agent command protocol.

<div class="tb-zh"><p>内容为一组 CLI 设计契约：把 CLI 入口设计成默认面向人、契约面向机器——默认提供可读的 help 与摘要，同时为 agent 和自动化提供显式的 JSON、JSONL 或 schema 面；在机器模式下保持 stdout 对解析器安全，JSON/JSONL 输出不得包含 spinner、颜色、进度文本或人类诊断信息，日志、警告与错误属于 stderr，除非它们是已文档化的 JSON 错误信封的一部分；让命令面无需读源码即可被发现，根门面可以暴露命令清单与 schema 元数据，但被委托的行为、能力私有的输出 schema、fixture 与产品判断仍留在各能力自有的目录下；把每条注册的命令和子命令分类为 workflow、advanced 或 maintainer，人类 help 默认只展示 workflow 路由并按需显式展开，机器清单默认保持完整并报告受众元数据；跨平台保持 argv 数组分派，使用 Node 与 Git 的可移植原语，例如 process.execPath、spawn/spawnSync 的参数数组、path.join 和 path.resolve，避免用 shell 字符串分派；把非交互执行当作一等路径，面向 agent 安全的命令在适用时应支持显式旗标，例如 --json、--no-color、--quiet、--no-input、--dry-run、--yes、--limit、--output 和 --timeout；把计划与变更分离，破坏性或有外部可见影响的动作在 apply/publish 之前需要 plan/dry-run/draft 阶段，并且在非交互工作流中写阶段必须要求显式确认；让 CLI、MCP、hooks、skills 与宿主外壳建立在同一套核心行为之上——MCP 暴露工具，hooks 执行生命周期检查，skills 拥有可重复的工作流，CLI 则保持为稳定的人类/CI/agent 命令协议。</p></div>
