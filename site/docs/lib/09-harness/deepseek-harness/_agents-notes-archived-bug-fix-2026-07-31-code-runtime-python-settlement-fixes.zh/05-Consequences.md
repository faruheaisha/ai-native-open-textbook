---
title: "DeepSeek Harness"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-07-31-code-runtime-python-settlement-fixes.zh.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-07-31-code-runtime-python-settlement-fixes.zh.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-07-31-code-runtime-python-settlement-fixes.zh.md"
sourceSha256: "1710e99d570eac525c0a22930d85796c11485de254830cee4c1b86ca13e4725d"
pageSha256: "def14ffe557b8a8667eae745415847cf2e91946b0004504d0ea8bf73c623f744"
contentMode: "local-full"
zh: ""
---

## Consequences

解释器误配置会在服务发布前失败，每次运行都使用加载期选定的可执行文件，并且子进程只接收 `TMPDIR`，从而消除 macOS 启动噪声而不暴露宿主凭证。私有提供方仍不进入已发布 profile，同时由一个 keyless 真实 Loader 快照固定其源码检出 PTC 组合。

seam 的"只 resolve、不 reject"契约在引导写入路径和同步 spawn 失败路径上都得以成立，两者的覆盖率都是被度量的，且两者都不会遗留一个暂存目录。日志捕获是线程安全的，代价是每次写入和 flush 都要获取一次可重入锁，并且散逸的原生输出由它自己的换行符来分隔，而不是由传输分片来分隔。fd-3 残余数据的内存受实际保留的字节数约束，并且两个帧读取器都以一次而非平方级的方式扫描一个不断累积的帧。输出上限放行一个帧所能承载的每一个值，并在加载期拒绝一个非整数的预算。dispose 面对同进程组存活者是真正完全停稳的（以 `graceMs + 2 * CLOSE_REAP_MARGIN_MS` 为界，在进程组已为空时代价为零，并且一旦进程组清空就清除 SIGKILL 定时器，从而一次滞留的 kill 无法击中一个被回收的 pgid），RLIMIT 强制在 soft 和 hard 两者上都保持配置值与继承值中的最严格者（并且 SIGXCPU 诊断不再把一个宿主无法保证的预算说出来），并且从模型创建的线程调用的绑定会完成而不是超时，而且握手帧读取器不再在一个大程序上烧掉 CPU 预算。每处行为修复都附带一个在缺少它时会失败的测试，除了 Problem 一节点出的那十一处——分块读取帧（一处系统调用次数的改进）、确认为空后的收尾（它唯一透过 seam 可观测的效应会在信号投递时冻结，而修复前的代码也会产生同样的结果）、共享的 stdout／stderr 预算（它唯一透过 seam 可观测的差异取决于不确定的跨管道到达时机），`flush_line` 重排序（它降低后的峰值仍落在 12× 门本就放行的范围内，因此没有配置会有不同表现）、节流 binding 回复（32.0 MiB → 0.0 MiB 的峰值降幅位于宿主 fd-3 可写缓冲内部、透过 seam 不可度量），在快照之前丢弃迟到的 binding 解析（它的三条断言在修复前同样成立，因此不是一处缺代码即变红的用例），完成值的 TOCTOU 预编码（它的并发变异竞态无法透过 seam 确定性构造，而 daemon 变异回归的唯一断言是概率性的），stray UTF-8 预算冲刷的扣留（落在多字节边界上的预算冲刷无法透过 seam 调度——v8-ignored），以及结算后到达的迟到拒绝的 settled 先查（结算之后才到达的拒绝无法从 seam 确定性构造），以及日志分片封存（其 25 M 规模的 OOM 无法在 CI 中确定性构造），以及 unknown-binding 预览上限（其完整 target 的 `JSON.stringify` 峰值是回复路径内的一次瞬时分配，无法透过 seam 度量）——因此其余各处未来若发生回归都会变红。
