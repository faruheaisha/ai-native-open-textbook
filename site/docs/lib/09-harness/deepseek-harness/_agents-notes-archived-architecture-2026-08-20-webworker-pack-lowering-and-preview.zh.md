---
title: "Agent Note: pack 期 lowering 与单构建 preview"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-08-20-webworker-pack-lowering-and-preview.zh.md"
sourceRel: ".agents/notes/archived/architecture/2026-08-20-webworker-pack-lowering-and-preview.zh.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-08-20-webworker-pack-lowering-and-preview.zh.md"
sourceSha256: "0a6251659d813abde21bc1f95af568e20cc07e80a505513cb958f2ac5f0a073f"
pageSha256: "0a6251659d813abde21bc1f95af568e20cc07e80a505513cb958f2ac5f0a073f"
contentMode: "local-full"
zh: ""
---

# Agent Note: pack 期 lowering 与单构建 preview

Status: implemented
Archived: 2026-09-04

[English](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-08-20-webworker-pack-lowering-and-preview) | 中文

## 问题

浏览器 worker 既不能在装载期编译模块，也不能由产品 webserver 提供页面：每个模块体必须以可直接运行的形态到达，页面必须是静态产物。两个面早期都发生过漂移。装载器曾携带一个兜底编译器，于是收集器的缺口表现为「启动变慢」而不是「镜像坏了」——而且 `acorn` 经包 barrel 混进了 `lib/worker.js`，一个只包装预 lowered 模块体的运行时根本不需要解析器。preview 曾是服务页面旁的第二份 HTML 模板，一个 served index 可以悄悄漂离的页面。

## 决定

**Lowering 只发生在 pack 期。** `@deepseek-ai/dsh-experimental-webworker-packer` 组合 profile、物化闭包、lower 每个 JavaScript 模块体；`LOWERING_VERSION` 与 `WRAPPER_PARAMS` 是 pack↔worker 的契约，与镜像布局的其余部分一起放在 `src/image-layout.ts`。装载器完全按镜像持有的形态包装模块体：仍带模块语法的模块体是一次点名镜像的拒绝，且 `startWorkerHost` 在挂载任何模块之前要求 manifest 的 `lowered` 等于本构建的契约。`lowerModuleSource` 是转换器唯一的面、packer 是它唯一的调用方；同一次解析会把具名静态 import、re-export 与动态 import、经 `require` 发起的调用，以及通过 `node:module` 或 `module` 具名导入在模块作用域直接发起的 `createRequire(import.meta.url)('pkg')` 调用送入可达性遍历。保存下来的结果、经 CommonJS 获取的 `createRequire`、计算得到的请求名称与其他基准只在运行时解析；只能通过这些形式触达的目标需要镜像入口种子。worker 图内部的 import 一律指向拥有该值的模块——绝不指向包 barrel，那正是把解析器偷运进来的那条边。源码目录排除只用于运行期使用已构建 `lib/` 的 workspace 与 vendored 包；已安装第三方包会保留 `src/` 和 `dist/` 下的 JavaScript，因为其发布入口可能解析到这些位置。

**preview 就是服务页面加一个标签。** 一次 Vite 构建产出共享全部 chunk 的 `dist/index.html` 与 `dist/preview.html`；唯一差异是前插的一个引导入口，其模块负责连接 worker host。启动随之汇于一个协议：应用注入表的一方 settle `__DSH_BOOT_READY__` deferred——served 渲染器在渲染完的行之后用尾部脚本 resolve，worker 引导段在首个 await 之前安装、末行生效后 settle——client 入口在读取任何注入状态前 await 它，因此从标准入口起的链路逐字就是 served 链路。插件 combo 脚本与 map 都通过 tunnel；页面侧 loader 会在执行脚本 Blob 前，把每个仅 tunnel 可达的 map 内嵌为 Base64 data URL，从而不依赖另一条 object URL 的生命周期，并在 DevTools 中保留 indexed map 的组件名称。构建使用相对 base，产物可挂载于任意静态目录；served 形态在 serve 期渲染 `<base href="/">` 锚定深层 SPA fallback 路径，磁盘上的两个页面保持字节共享。
