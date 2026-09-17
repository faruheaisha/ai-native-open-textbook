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
pageSha256: "89ed43b4ee435d2e1c4fa115ca532c9e6110ab16f5597cc954458f2cd1b4e312"
contentMode: "local-full"
zh: ""
---

## Problem

用于 PTC mode 的 CPython 子进程后端建立在 [fd-3 帧协议](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-07-31-code-runtime-python-fd3-protocol.zh.md)之上，把每个程序结果都 resolve 成一个 `CodeRunResult`，仅在 seam 被误用时才 reject `run()`，并且会 dispose 到完全停稳，从而没有任何留在子进程自己进程组内的子进程存活得比 fiber 更久（一个用 `setsid()` 逃出该进程组的后代是有文档记载的例外——见该包 README 的 Known Limitations）。一连串审查暴露出一些缺陷，它们以单元测试覆盖率无法捕获的方式破坏了这些契约：每一个都藏在一处 `/* v8 ignore */` 之后、一个读起来像修复但实际并非修复的捕获可调用对象之后、一处透过 seam 不可见的内存效应之后、一处重复计数的加载期上界之后、一处存活者能够熬过的进程组升级之后、一处静默死锁的跨事件循环完成之后、一处位于结算路径之外的同步抛出之后，或者一处被当作日志边界处理的传输边界之后。大多数行为修复都附带一个在缺少它时会失败的测试；有十一处没有，并被如此标注——分块读取帧（一处系统调用次数的改进，没有可跨平台确定性断言的失败）、确认为空后的收尾（它唯一透过 seam 可观测的效应，即一个冻结的心跳，会在 SIGKILL 被投递的瞬间冻结，而修复前"投递即收尾"的代码也会产生同样的结果，用于区分的探测手段是 Alternatives 以跨环境不可靠为由否决的 signal-0 检查）、共享的 stdout／stderr 预算（它唯一透过 seam 可观测的差异，是一次流中冲刷落在哪条条目边界上，而这取决于两条相互独立的 OS 管道的相对到达时机，`os.sched_yield` 并不能使其确定；它所强化的按管道计的内存界限确实由单管道洪泛测试覆盖），`flush_line` 的 join-清空-push 重排序（它把结算期冲刷的峰值从三份副本降到两份，但 12× 加载门本就覆盖了换行路径的三副本峰值，因此每个被门放行的配置在两种顺序下都落在地址空间之内、不存在透过 seam 可观测的差异——该内存效应在 Python 子进程内部，与共享预算那处一样无法透过 seam 度量），节流 binding 回复（它的树内用例只断言分帧后的回复仍能完整往返；它所移除的峰值位于宿主 fd-3 可写缓冲内部、透过 seam 不可见，因此 32.0 MiB → 0.0 MiB 的降幅只能在树外度量），以及在快照之前丢弃迟到的 binding 解析（它的三条断言在修复前同样成立，因为 `sendReply` 本就丢弃结算之后的值——只是比快照晚），完成值的 TOCTOU 预编码（与编码竞态的并发变异无法透过 seam 确定性构造——它的 daemon 变异回归只断言结果永不为 `worker-exit`，这种断言是概率性的、不具有判别力，因此按既有的"无 fail-before 测试且有理由"先例登记为无 fail-before）、stray UTF-8 预算冲刷的扣留（正好落在多字节边界上的预算冲刷无法透过 seam 调度；它被交叉标注为 v8-ignored），以及结算后到达的迟到拒绝的 settled 先查（在运行已经结算之后才到达的拒绝无法从 seam 确定性构造），以及日志分片封存（25 M 级单字符滴灌 OOM 无法在 CI 确定性构造；树内用例只断言其完成并截断），以及 unknown-binding 预览上限（完整 target 的 `JSON.stringify` 峰值是回复路径内的一次瞬时分配——它唯一透过 seam 可观测的痕迹是伪造近上限 `global`／`name` 时的峰值内存，无法透过 seam 度量；树内用例只断言运行完成）。
