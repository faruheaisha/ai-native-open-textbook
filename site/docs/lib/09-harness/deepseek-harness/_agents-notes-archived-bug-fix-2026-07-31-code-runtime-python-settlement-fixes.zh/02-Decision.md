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
pageSha256: "aed62fc67aa1e15d230620e01892d2f1ba7164c168a319763cfe041ec36fa044"
contentMode: "local-full"
zh: ""
---

## Decision

若干处相互独立的修正，各自位于拥有对应缺陷的包中。

### unknown-binding 预览从 1 KiB 前缀转义

unknown-binding 回复用 `JSON.stringify` 对完整的限幅 target（`global` 加 `.` 加 `name`，各最多 `maxValueBytes` 个 code unit）构造消息——在控制字符密集字段下转义形式可达输入的约 6 倍，在 `maxValueBytes` 上限附近产生数亿字节峰值，这是任何敌意对等方边界都不会放行的。预览现在从 target 的 1 KiB 前缀转义（足以辨识 binding）；`capMessage` 仍执行回复预算。

### 合并的 open 日志条目只计费一次，按片段分摊

未结束行的显式 `flush()` 发出带 `open: true` 的 `log` 帧，宿主把下一个帧追加到同一条目（`print('a', end='', flush=True); print('b')` 读回为一条 `'ab'` 条目而不是假换行）。拆分计费算术——首片段付引号加内容加分隔符、续接与闭合帧只付内容、宿主 cap `logBudget - 1`／`logBudget + 2`、低于 2 字节的 walk guard、子进程的 `_open_started` 键控——只登记一次，见 [fd-3 协议 note 的 wire-contract 段](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-07-31-code-runtime-python-fd3-protocol.zh.md)。

### Boot-write failure no longer rejects run()

在 [`src/index.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/experimental/code-runtime-python/src/index.ts) 中，fd-3 引导帧写入是 `run()` 同步初始化阶段的最后一条语句。它的 `catch` 会调用 `finish()`，而 `finish()` 读取 `wallTimer` 和 `onAbort`，并通过 `settle()` 读取 `live`。这些绑定是 `const`，且声明在引导写入之后，因此在同步写入失败时，`finish()` 会在它们处于暂时性死区（temporal dead zone）时访问它们，从而抛出一个 `ReferenceError`。该错误逃出了 Promise executor 并 reject 了 `run()`，违反了 seam 的"结果一律 resolve"契约：调用方看到的是一个被抛出的错误，而不是 catch 构造的 `worker-exit`。现在引导写入代码块被放到 `wallTimer`、`onAbort` 和 `live` 初始化之后，并且那处曾把该分支从覆盖率中隐藏的 `/* v8 ignore */` 已被移除，从而使该 catch 被纳入度量。

### Log capture is serialized against settlement

在 [`py/bootstrap.py`](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/experimental/code-runtime-python/py/bootstrap.py) 中，主协程上的结算 `flush_out()`／`flush_err()` 会读取并清空各个流的 `_pending` 列表，并修改共享的 `LogBuffer` 账本。模型代码可能启动一些 daemon 线程，其 `print`／`write` 会并发地修改同一状态。捕获绑定方法（`out_stream.flush_line`）只解决了结算调用哪个可调用对象的问题，而没有解决它在执行途中读取什么的问题：一次交错的 flush 可能拼接一个正在其下被修改的 `_pending` 列表，从而破坏账本并丢失 `done` 帧，使该次运行一直拖到墙钟超时。现在 `LogBuffer` 持有一把由两个流共享的可重入锁；`_LogStream.write` 和 `flush_line`，以及 `LogBuffer.push`，都会获取该锁，因此整个读-改-写过程在多线程间是原子的。

### Fd-3 residual is copied, not viewed

同样在 `src/index.ts` 中，在对待处理 fd-3 分片的 `Buffer.concat` 结果按换行符做循环之后，剩余的不完整行被以它被切出的 `subarray` 视图形式向前传递。视图会使整个 concat 的底层分配保持存活，因此一个大帧后面跟着一个极小的尾部片段，会钉住整整一帧大小的内存，而 `pendingBytes`（被设为该片段的长度）报告的值远小于实际保留的内存。现在，残余数据通过导出的 `detachResidual` 辅助函数被分离到一个大小恰当的新 `Buffer` 中，从而让 concat 分配得以被回收，并使 `pendingBytes` 成为一个诚实的度量值。

### Output-cap load bound is ceiling minus envelope, not divided by six

那处在加载期拒绝比单个 fd-3 帧所能承载更大的 `maxLogBytes`／`maxValueBytes` 的检查，会把帧上限除以六以应对最坏情况下的转义膨胀。但这两项预算都是以已转义的序列化字节来计量的：宿主日志账本通过 `jsonStringCostUpTo` 按序列化开销计费（它走到上限而不分配转义后的副本），`checkDoneValue` 度量的是转义后的形式，而生产侧的 `_cap_message` 同样按序列化开销设上限，因此一个在上限之内被放行的载荷在传输时最多占用 `cap + envelope`；转义已经包含在计费之内，不能再被乘一次。现在该上界为 `FRAME_PARSE_CAP_BYTES - FRAME_ENVELOPE_BYTES`（接收路径在解码前拒绝原始长度超过 64 MiB parse cap 的帧——本次运行以 worker-exit 结算——因此预算不得超过诚实子进程的帧能穿过该解析器的值），未使用的 `MAX_JSON_ESCAPE_EXPANSION` 常量已被删除。旧的上界并非不安全（它是放行不足），但它静默地禁止了合法的大上限。这同一处加载检查还会拒绝一个非整数的 `maxLogBytes`／`maxValueBytes`：子进程通过 `int(...)` 读取每一项预算，而 `int(...)` 会对浮点数向下取整，因此 `maxLogBytes: 3.5` 会在子进程侧截断在 3 字节，而宿主却把小数部分也计入——两侧因此强制着不同的公开配置。在加载期拒绝该浮点数使两侧保持一致，与 worker 后端相符。

### Same-group survivors are reaped before the fiber goes quiescent

模型程序可能在子进程自己的进程组里（没有 `setsid`，因此 `kill(-pid)` 能到达它）留下一个后代，它忽略 SIGTERM，但释放了继承而来的 stdout／stderr／fd-3 管道。随后 leader 退出，由于管道已被抽空，它的 `close` 触发，于是结算在那个后代仍存活时运行。`kill()` 在 SIGTERM 之后装设一个 `unref` 的 SIGKILL 定时器；本次修复是，当有一次升级正在进行时，`settle()` 既不立即 resolve 该次运行的 `finished` promise，也不立即把该运行从 `live` 中移除。取而代之的是，当 `killing` 被置位且进程组尚未为空时（`process.kill(-pid, 0)` 不抛出 ESRCH），它在一个 ref 的定时器上轮询该进程组，以 `graceMs + CLOSE_REAP_MARGIN_MS` 为界，仅当进程组已清空后才把该运行从 `live` 移除并 resolve `finished`。这个 ref 的轮询是承重部分：它让宿主事件循环保持存活，直到 SIGKILL 真正回收了该进程组，因此即使是一个短命的宿主（一次性的 headless 运行、一个配置子进程）也无法退出并把存活者 reparent 给 init。把 `live` 的移除推迟，正是让一个与刚返回的 `run()` 竞争的 `dispose()` 仍会 await 该存活者的原因：若在回收之前就把运行从 `live` 移除，teardown 会快照到一个空集合并在后代仍存活时返回。在正常情况下（leader 是唯一成员），第一次探测返回 ESRCH，结算以零附加延迟完成收尾。`teardown()` 会 await 每次运行的 `finished`，因此 dispose 是真正完全停稳的，与其 JSDoc 相符——包括对一个已经 resolve 的运行也是如此。

结算还会在进程组被确认为空的那一刻取消 SIGKILL 定时器（正常路径，以及轮询看到存活者已消失时）。让它继续处于装设状态会暴露一个 PID 复用隐患：一个在 leader 被回收后仍挂起长达 `graceMs` 的 `kill(-pid)`，可能在内核复用了 leader 的 pid 之后击中一个被回收（recycled）的 pgid，从而 SIGKILL 掉一个无关的进程组（`killGroup` 吞掉 ESRCH 并无帮助——危险恰恰是那次针对被复用进程组成功执行的 kill）。在空进程组探测时清除它，把复用窗口收窄到只剩真正存在存活者的情形，此时进程组不可能为空以供复用。

被清除的定时器覆盖不到的那段窗口，由 `killGroup` 内部的**身份校验**封死。它发出的每个信号都是裸 `process.kill(-child.pid, sig)`——与 `child.kill()` 不同，它没有 handle 守卫——因此在 leader 被回收到 `close` 触发之间的那段间隔里（实测有一个持有管道的后代时可达 3039 毫秒），信号会打到一个被复用的 pgid 上。所以 leader 的启动时刻在 spawn 时读取一次（`/proc/<pid>/stat` 第 22 字段），并在每次发信号前重读，有两条裁定：读数**存在且不同**意味着该数字现在属于另一个进程，于是扣下信号；读数**缺失**意味着 leader 已被回收，而这正是每次升级的常态——它的 `/proc` 条目已消失，而它曾领导的进程组仍可能持有本次 teardown 要回收的那个存活者——于是信号照常发出。缺失也是无 `/proc` 平台上的恒定读数，那里守卫处于惰性状态、保持原有行为。把缺失读作身份不符并非假想：第一版就是这样做的，它扣下了宽限期的 SIGKILL 与轮询截止分支的 SIGKILL，导致三个同组心跳用例在 Linux coverage lane 上变红，而在 Darwin 上因读取器恒返回 undefined 而通过。

回收轮询还会处理宿主事件循环被阻塞、越过两个定时器的情形。如果一次同步计算从轮询被调度之前一直占住事件循环、直到越过它的截止时间，那么当事件循环恢复时，轮询定时器和宽限窗口的 SIGKILL 定时器都已逾期，而 Node 会先运行更早调度的轮询——因此宽限窗口的 SIGKILL 可能从未触发。为此截止时间分支会自己发送 SIGKILL（若定时器已运行则该操作幂等），而不是取消尚未触发的升级，随后再额外给予一个 `CLOSE_REAP_MARGIN_MS`，并持续轮询直到进程组被确认为空，因为仅凭信号投递就收尾会在进程组仍在消亡时宣告完全停稳。因此等待的外层上界为 `graceMs + 2 * CLOSE_REAP_MARGIN_MS`。若这段额外余量耗尽而进程组仍非空，一个最终的硬性上界会收尾；该分支带有一处 `/* v8 ignore */`，因为它仅在一个被 SIGKILL 的存活者作为僵尸进程滞留且从未被 `wait()`——一个 PID 1 不回收孤儿进程的容器——时才可达，而这无法在各 CI 平台上确定性地构造出来。该 ignore 的理由陈述的是这种环境依赖性，而不是声称该分支不可能运行，并交叉引用 Alternatives 中以同样理由否决 signal-0 回收断言的那一条。

### RLIMIT clamps against the inherited soft limit, not only the hard

在 [`py/bootstrap.py`](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/experimental/code-runtime-python/py/bootstrap.py) 中，`_clamped` 仅用继承而来的 HARD 限制来约束一个请求的 `(soft, hard)` rlimit 对。一个继承了低于请求值的软限制的部署——比如继承 `(100, 200)`、请求 `(150, 160)`——会拿回 `(150, 160)`，把有效软限制从 100 抬高到 150：对 `RLIMIT_AS` 而言这放松了内存上限，对 `RLIMIT_CPU` 而言它推迟了 SIGXCPU，两者都违反了"取配置值与继承值中最严格者"。现在 `_clamped` 用每一侧各自继承而来的对应值来约束该侧（`RLIM_INFINITY` 不施加任何上限），随后把 soft 钉在 hard 之下，因此 `setrlimit` 绝不会看到一个倒置的对。结算时的 CPU 复查（`die_if_cpu_exhausted`）遵循同一规则：它把已消耗的 CPU 与实际生效的、被夹紧的 `cpu_soft` 比较，而不是与配置的 `cpuSeconds` 比较，因此一个捕获 SIGXCPU、在返回前消耗超过更严格的继承软限制的程序会被报告为 timeout，而非误判为成功。 复查会在解除程序屏蔽的 SIGXCPU（`pthread_sigmask(SIG_UNBLOCK, ...)`，import 期捕获）之前先恢复 SIG_DFL：一个既安装自定义 handler 又屏蔽信号的程序，否则会在 unblock 的瞬间让那个挂起的 handler 以模型代码身份运行（可重新屏蔽或抛出），所以信号被释放时处置必须已是 SIG_DFL；SIG_DFL 在前时，挂起的信号在内核内直接致死、无字节码窗口，而 `kill` 重投递是给从未挂起情形的兜底。SIGXCPU 诊断不再把配置的 `cpuSeconds` 说成实际生效的预算——在一个更严格的继承软限制之下那个数字是错的——而是报告 CPU 时间是在"至多配置的 N 秒"处被耗尽，这一表述无论哪个限制先触发都成立。

### 并发 binding 回复对 fd 3 做节流

`sendReply` 忽略了 `proto.write` 的 `false` 返回值，因此一个在一轮 `asyncio.gather` 中解析多个大值的程序，会把每条回复都在同一个 turn 内编码、并全部排入 fd 3 的可写缓冲。binding 回复在 seam 层没有字节上限可以约束它，而且这个失败杀掉的是**宿主进程**而不是让本次运行失败：在 highWaterMark 为 64 KiB 的管道上实测，八条 4 MiB 回复会同时缓冲 32.0 MiB。现在回复走一个队列，一次编码并写出一帧，管道写满时等待 `drain`——同样形状实测峰值为 0.0 MiB。编码放在循环内部，因此一条运行已不再需要的排队回复会被 `settled` 检查丢弃，根本不会被序列化。同一个 `settled` 谓词还在 `await fn(...)` 之后、`snapshotJsonValue` 之前守护回复回调，因此一个在结算之后才 resolve 的宽值会在走完它的宽度之前被丢弃——宿主不会为一个结果已定的 run 展开一个迟到的宽值。

节流不改变任何模型可观测的行为。子进程通过一个持续读取 fd 3 的 pump、按 id 把每条回复匹配到它自己的 `call`，因此到达顺序从来不可观测，而各 binding 本身仍然并发执行——只有宿主的峰值内存与冲刷时延改变。这也正是为什么串行化并不构成对 seam 并发契约的收窄，而那恰是最初推迟此项的理由；那个理由是错的。

### Binding replies complete on the calling loop's thread

同样在 `py/bootstrap.py` 中，一个绑定回复 Future 是在运行 `dispatch` 的那个事件循环上创建的。当模型通过 `asyncio.run(tools.x(...))` 从一个工作线程调用某个绑定时，该 Future 属于该线程的事件循环，而不是 `_pump_replies` 读取回复的主事件循环。`asyncio.Future` 不是线程安全的：从另一个线程完成它并不会唤醒它自己的事件循环，因此直接的 `set_result`／`set_exception` 会让那个正在等待的线程被搁置，该次运行退化为墙钟超时。现在每个待处理条目都会在记录 Future 的同时记录其 Future 所属的事件循环，`_pump_replies` 通过该事件循环的 `call_soon_threadsafe` 来完成它。共享的 `pending`／`next_id` 状态由一把 `threading.Lock` 保护，该锁跨越 id 认领、fd-3 写入和计数器推进这三步持有，因此并发调用方无法以违反宿主所要求的 id 顺序来交错帧。对一个已经关闭的事件循环（工作线程已结束、在回复到达前放弃了它的调用）调用 `call_soon_threadsafe` 会抛出 `RuntimeError`；该调度被包裹起来，使这个已无意义的回复被丢弃，而不是让异常终结 pump 任务并搁置此后的每一个回复。

### The blocking frame reader reads in chunks, not byte by byte

`ProtocolChannel.read_frame`（用于 `boot` 和 `run` 握手帧）过去通过在无缓冲（`buffering=0`）fd 上的 `FileIO.readline()` 读取，这会为每个字节发起一次 `os.read(1)`。`run` 帧在 `RLIMIT_CPU` 生效之后才到达，因此一个合法的数兆字节程序会在 `ast.parse` 运行之前，在数以百万计的单字节系统调用中烧掉数秒 CPU——有可能仅在读取这一步就耗尽预算。现在它以 `_READ_CHUNK_BYTES` 为单位分块读取，写入异步读取器已经使用的那同一个 `_pending` 残余缓冲区（包裹用的 `os.fdopen` 对象已被移除；两个读取器都直接调用 `os.read(self._fd, ...)`），因此读取开销微不足道，并且越过换行符的预读也为下一帧保留了下来。两个读取器都跟踪一个持续推进的扫描偏移（`find(b"\n", scanned)`），使一个跨多个分块累积起来的大帧只被扫描一次，而不是每来一个分块就从索引 0 重新扫描——分块式重扫会把逐字节的开销换成同一大帧路径上 O(N²) 的 memchr 开销。

### Synchronous spawn failure resolves worker-exit, not reject

同样在 `src/index.ts` 中，`spawn` 是在结算 Promise 的 executor 存在之前被调用的。Node 只把一组固定的 spawn errno（EACCES、EAGAIN、EMFILE、ENFILE、ENOENT）推迟为一个异步的 `error` 事件，而结算路径已经把它转成一个 `worker-exit`；其余每一个 errno 都会从 `spawn` 同步抛出。一个长度超过平台 PATH_MAX 的 `pythonBin` 能通过加载期校验（非空、无 NUL），却会让 `spawn` 在此处抛出 `ENAMETOOLONG`——在 executor 之外——因此 `run()` 会 reject 而不是 resolve，违反了"只 resolve、不 reject"，并且由于只有 `settle()` 才会移除本次运行刚物化出来的暂存目录，它会把该目录留在磁盘上。现在 `spawn` 调用和 fd-3 收窄被包裹起来：一次同步抛出会移除暂存目录，并 resolve 与异步 `error` 事件所产生的同一类 `worker-exit`（`python spawn error: …`）。

### 解释器选择与子进程环境在加载期固定

`pythonBin` 在插件加载期解析为一个可执行绝对路径，并在与运行时相同的受限环境中完成版本探测。提供方要求 CPython 3.10 或更高版本并保留该确切路径，因此后续 `PATH` 或工作目录变化不能切换解释器；不是可执行普通文件的显式路径、无法解析的裸名或不受支持的解释器都会在 `ctx.codeRuntime` 注册前失败。同步探测有固定的五秒期限，并在期限到达时发送 `SIGKILL`，因此忽略 `SIGTERM` 的包装脚本不能阻塞插件加载。每次探测与运行只接收 `TMPDIR`：macOS 系统 Python 需要它来避免向被捕获的 stderr 发出启动警告，而凭证、`PATH`、`HOME` 与其他宿主环境值均不会进入模型代码。若已校验的可执行文件在激活后消失，普通 spawn 结算仍 resolve 为 `worker-exit`。

### Stray pipe output is aggregated by line, not by transport chunk

同样在 `src/index.ts` 中，原生 stdout／stderr 字节（C 扩展写入、越过管道缓冲区的 `os.write`）过去每来一个 Node `data` 分片就被推入 `logs` 一条条目。`logs` 条目在下游（PTC mode）会用 `\n` 拼接，因此一次大于单次管道读取、且不含换行符的写入——它以若干个 `data` 分片到达——回读时会在任意传输边界处被插入模型可见的换行符。现在捕获会累积原始 `Buffer` 分片（与 fd-3 读取器同一形态，出于同样的原因：一个字符串 `+=` 累加器会为每个分片重新复制整份残余数据，而每个分片都从索引 0 扫描它则是第二重平方——在一次大的不含换行符的写入上二者都是 O(N²)），在原始的 `0x0a` 字节处切分，并为每个完整行准入一条条目。换行符绝不会出现在一个 UTF-8 多字节序列内部，因此对每个切出的行做解码无需流式解码器即可安全进行。三条相互独立的界限使残余数据不至于耗尽宿主内存，每一条都与 fd-3 读取器相对应：分片列表在越过 `MAX_PENDING_CHUNKS` 后会封存（SEAL）为已完成的块，因此一个以单字节 `os.write` 控速的程序无法累积起数以百万计的存活 Buffer 对象（其逐对象开销是任何字节计数都看不到的）；当两个管道合并（COMBINED）的持续推进序列化（SERIALIZED）开销——通过 `accrueStrayCost` 跟踪，它跨分片按结构解码 UTF-8，因此一个渲染为 U+FFFD 的字节会被计入该替换字符序列化后的三个字节——将要越过预算时，残余数据会被冲刷，因此一场控制字符或非法 UTF-8 的洪泛会在原始字节的一小部分处就冲刷，而不是先累积起满满一个预算份额的原始字节，并且 stdout 与 stderr 是合并计量的，而不是各自对照完整预算（那样会让两者同时各保留将近一个预算份额，使峰值翻倍）；而一旦账本已经截断，缓冲便停止，从而不会为永远无法被准入的输出累积任何内容。`accrueStrayCost` 按 U+FFFD 宽度对非法字节计费，正是针对一个从不作为合法序列开头的字节（0x80–0xC1、0xF5–0xFF）、一个在完成前断裂的多字节序列，或一个结构完整但非法（ILLEGAL）的序列的修复：`toString('utf8')` 会把其中每一个这样的字节都渲染为它自己的 U+FFFD（3 字节），因此它校验每个前导字节的首个后续字节范围（WHATWG：`E0`→A0-BF、`ED`→80-9F、`F0`→90-BF、`F4`→80-8F，其余为 80-BF），并对任何落在该范围之外的序列按每字节 3 计费。按原始的 1 计费会把一场 `b"\xff"` 洪泛少计三倍，而只按结构宽度计费同样廉价地把一个 CESU-8 代理项（`ED A0 80`）或过长编码（`E0 80 80`）少计三倍，让残余数据在冲刷前增长到满满一个预算份额的原始字节，并且在一个较大的 `maxLogBytes` 附近，在冲刷的 concat 加 `toString` 中膨胀到约 1 GiB 的峰值。被准入字符串的每条条目计费通过 `jsonStringCostUpTo` 按序列化开销计量，它把字符串走到上限即停止——先前的 `Buffer.byteLength(JSON.stringify(text))` 会先分配出整份转义后的形式，因此在一个较大的 `maxLogBytes` 之下，一行接近预算、控制字符密集的内容，仅仅为了度量它就可能瞬时分配超过一 GB。`jsonStringCostUpTo`（走字符串的那个函数，由一个伪造的、其文本经 `JSON.parse` 产生的 `log` 帧到达）给一个孤立（LONE）代理项计满六个转义字节（在 ES2019 良构 `JSON.stringify` 下为 `\uXXXX`），而不是 `Buffer.byteLength` 为其 U+FFFD 渲染所报告的三个字节，因此一场 `\ud800` 洪泛不会被少计一半；`accrueStrayCost` 走原始字节，从不把一个代理项当作代理项看到——一个 CESU-8 编码的代理项到达它时是三个字节，被它的逐前导字节范围检查所拒绝，每个计 3（共 9），与 `toString('utf8')` 所渲染的相符。该残余数据会在管道 `end` 时冲刷，也会在 `closeDeadline` 处理器销毁流之前被显式冲刷：一个持有管道不放的 `setsid` 逃逸者会迫使结算在没有 `end` 的情况下走那条路径，因此 leader 在退出前发出的最后一次不含换行符的 `os.write(1, …)` 否则会从 `logs` 中被丢弃。

### An incompatible output-budget/addressSpaceMb pair is rejected at load

子进程（[`py/bootstrap.py`](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/experimental/code-runtime-python/py/bootstrap.py)）在 `RLIMIT_AS` 之下构建、计费并分帧一条 `maxLogBytes` 的日志条目或一个 `maxValueBytes` 的完成值，而两个账本都是按字符计数、对照一个序列化字节预算触发的。一个星芒面字符是一个字符，但占 CPython `str` 存储的四个字节以及四个 UTF-8 字节，且最重的路径峰值时有三份这样的副本同时存活：一次 `sys.stdout.write(line + "\n")` 会持有调用方的 `text` 实参（在整个 `write` 调用期间存活，约 4 倍）、交给 `LogBuffer.push` 的行切片（约 4 倍）、以及 `_push_locked` 为计费和发送而取的 `text.encode("utf-8")` 副本（约 4 倍）——峰值约为预算的 12 倍。结算期的 `flush_line` 路径只持有两份（它的 `"".join(...)` 与那份 encode 副本——它在 push 之前先丢弃 pending 分块），因此换行路径才是起约束作用的最坏情况。当一项预算逼近 `addressSpaceMb` 时，一次合法的、接近预算的输出会在那次构建加编码期间突破地址空间，并作为 `worker-exit`（日志）而不是截断而终止，或作为 `output-limit`（值）而失败。在运行时对每次子进程写入按地址空间计量是错误的修复：热路径上一次精确的序列化开销检查，要么是一次完整的 `encode`（正是要避免的那次分配），要么是一个逐字符的 Python 循环（它会烧掉 CPU 预算——一次 10 MB 的合法写入会在 `cpuSeconds: 1` 之下触发 SIGXCPU）。两者都是拿一种资源界限换另一种。取而代之，[`src/index.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/experimental/code-runtime-python/src/index.ts) 在加载期（LOAD）拒绝这个不兼容的组合：每项预算乘以 `OUTPUT_BUDGET_WORST_CASE_ADDRESS_SPACE_MULTIPLE`（十二——换行路径三份同时存在的约 4 倍副本）必须放得进为解释器自身占用预留一份固定的 `INTERPRETER_BASELINE_BYTES` 之后剩下的地址空间，并用一个 `>=`，使得一项其最坏情况峰值恰好等于那片余量的预算也会被拒绝（该峰值加上预留的基线正好是整个地址空间，即 `RLIMIT_AS` 边界）。`flush_line` 也被改为在 push 之前先丢弃 pending 分块，与换行路径的 join-清空-push 顺序一致，使它至多只持有 join 及其 encode 副本，而非三份副本。该基线是与倍数分开（SEPARATELY）预留的，因为它是一项固定开销，而非随预算伸缩的开销：把它折进倍数会让一项恰好为 `addressSpaceMb / 12` 大小的预算被放行，而其峰值加上解释器仍会越界。`maxLogBytes` 和 `maxValueBytes` 都被对称地门控；值路径的构建加编码是同一形态。该检查在每个平台上都运行，而不仅在强制 `RLIMIT_AS` 的平台上：这种不兼容是那些配置值的属性，因此一个 Linux 部署无论由哪个宿主组装配置都会 OOM，而一致的加载期拒绝正是 fail-loud 契约（Darwin 仅跳过运行时的 `setrlimit`）。这在配置 seam 处消除了这一类问题，而不是给写入路径打补丁，因此 `_LogStream` 保留它原有的按字符计数的缓冲（一个对序列化开销有效的下界，一旦预算放进地址空间就是内存安全的）。值路径在第二处施加同样的纪律：`_check_done_value`（字节计量器）与 `_encode_json_plain`（帧编码器）都以 O(DEPTH) 而非 O(width) 遍历。每个容器只压入一个游标帧、逐个拉取子元素，而不是每个子元素一个遍历元组或栈条目——一个扁平的 `[0] * 6_000_000` 序列化后约 12 MB，但逐元素遍历会分配约 400 MB 的簿记（约为序列化尺寸的 28 倍，远超门预留的 12 倍），于是一个被计量器放行的值可能因遍历自身的帧而 OOM。改用游标后，唯一与宽度成正比的分配就是计量器已界定的输出字符串。

宿主门控是对照配置的（CONFIGURED）`addressSpaceMb` 校验的，但一个启动环境可能继承一个更严格的（STRICTER）`RLIMIT_AS`（一个低于 `addressSpaceMb` 的 `ulimit -v` 包装层），而 bootstrap 的 `_clamped` 会正确地把有效（EFFECTIVE）限制降到该值——从而让这些预算是按一个子进程永远得不到的上限来定尺寸的。因此 `bootstrap.py` 在应用该有效被夹紧的软限制之后，会对照它重新检查两项预算，镜像宿主门控的倍数与基线，并在引导期抛出（被 setrlimit 阶段的处理器捕获，并作为 `exception` 上报——与任何其他资源限制应用失败同属一类），而不是任由一次接近预算的输出在运行途中 OOM。这两个子进程侧常量与宿主侧的保持一致，靠的是共享的推理，而不是一个 wire 字段。

在此之外还一并修复了一处残余写入路径的复制，它与配置门控相互独立：`_LogStream.write` 的换行分支会在冲刷触发器能够对其设界之前，先把最后一个换行符之后整个未结束的尾部（`text[pos:]`）缓冲进 `_pending`，因此一个早出现的换行符后跟一个巨大的尾部（`"\n" + "A" * 30 MiB`）会对模型自身的字符串再做一份完整副本——正是这条路径存在所要规避的那次 `RLIMIT_AS` 死亡，而且是配置门控无法覆盖的一次，因为该尾部可能远超 `maxLogBytes`。现在该尾部被切到一个 `remaining + 4` 字符的前缀（超过 `remaining` 字符的任何内容都无法被准入，因为字符计数是序列化开销的下界），随后冲刷触发器会用标记将它拒绝。

### 完成值与错误在其校验点处预编码

在 [`py/bootstrap.py`](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/experimental/code-runtime-python/py/bootstrap.py) 中，`_done_with_value` 现在会在成功路径上把整个终止帧作为一个已预编码的 JSON 字符串返回：被准入的值在这里、在 `_run` 的 `try` 之内的校验点处恰好序列化一次，即 `'\{"type": "done", "value": ' + _encode_json_plain(value) + "\}"`。程序在返回之后仍可能从 daemon 线程或信号处理器继续变异它返回的 list／dict，因此在一个更晚的点上做第二次遍历会构成一次 TOCTOU——如果一次变异让一个并发变异的后续编码在结算处理器之外抛出，就会把一次已结算的运行在宿主侧降级成 `worker-exit`。在这里、在包裹该调用的 `try` 之内恰好序列化一次，就关上了这个窗口：如果一次并发变异导致编码抛出，异常处理器会把它如实分类为 `exception`；一旦字符串产生出来，该帧就会被逐字写走、不再触碰任何活对象。`_run` 在程序运行前把 `_done_with_value` 的入口名绑成局部（`done_with_value_bound`），而 `_done_with_value` 自身把 `_check_done_value` 与 `_encode_json_plain` 绑定为 def 期默认参数——因此模型执行后对入口名或这两个名字的 `__main__` 重绑无法把一个合法成功改写为 `exception`。日志账本（宿主 `logBudget` 与子进程 `_remaining`）从预算低 1 字节起算，预留序列化外层数组的外壳（两条括号与 n-1 个逗号，覆盖 n 条目的分隔符），因此恰好耗尽账本的结果序列化后仍在配置上限之内。 一旦账本已截断，宿主会整体清空两条 stray 管道的缓冲输出（之后的每个字节都会被 `admit` 变成 no-op，保留它只会把宿主内存花在永远无法准入的输出上）；子进程以 `-u` 运行，使 `sys.__stdout__`/`sys.__stderr__` 的写入对 stray 捕获立即可见，而结算 flush 仍在 done 帧前排空原始 std 流（防御 `sys.__stdout__ = boom` 重绑后残留的缓冲包装）。构造器拒绝低于 64 的 `maxLogBytes`（能为截断标记自身序列化形式留出一字节余量的最小预算）；`maxValueBytes` 只保留正整数要求，因为完成值可以只有一字节、且 done 帧外壳是 seam 协议成本。标记仍是 envelope，因此带已放行条目的截断运行序列化后至多为 `maxLogBytes + marker + envelope`（已记录在包 README）。但编码器到达的一个传递依赖（例如 `_dump_scalar`/`_dump_string`/`json`/`io`——非穷举清单）重绑仍可让编码抛出、把成功降级为 `exception`，这在包 README 中被登记为已接受残余。

`send_done`（`_run` 内部的一个局部函数）通过绑定的 `channel.write_encoded` 写出已预编码的字符串，并在写之前用绑定的 `_encode_json_plain` 编码一个 dict 错误帧——它绝不经 `channel.send_sync`，因为后者的函数体会在调用时刻重新解析 `self.write_encoded` 和模块级的 `_encode_json_plain`。`_encode_json_plain` 与 `channel.write_encoded` 在程序运行前就被绑定进局部变量，理由与 `flush_out`／`flush_err`／`safe_model_traceback` 被绑定相同：程序以 `__main__` 运行，因此 `import __main__; __main__.ProtocolChannel.send_sync = boom` 或 `__main__._encode_json_plain = boom` 本会在调用时刻把发送／编码重新解析成被替换的可调用对象，当该替换抛出时跳过 `done` 帧、把已结算的结论降级成宿主侧的 `worker-exit`。

### 预算触发的冲刷会扣留下一个未完成的多字节尾序列

同样在 [`src/index.ts`](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/experimental/code-runtime-python/src/index.ts) 中，`flushStray(stray, retainPartialTail)` 在预算触发的冲刷（`captureStray` 中的合并成本阈值）上会把一个未完成的多字节尾部从解码中扣留：当残余以部分 UTF-8 前导序列结束（`stray.utf8.expected > 0`）时，前导字节加上迄今已消耗的续字节（≤3 字节）会从该帧中分离出来作为新的残余，只有完整的前缀被准入并解码。当整个残余就是单个未完序列时什么都不准入，因此一个合法、未完成的字符绝不会在一个被放行、未截断的条目里被渲染成 U+FFFD，也不会推进一条虚假的空条目。被扣留的尾部会从一个全新的 `stray.utf8` 状态重新累计——若用冲刷后 `expected > 0` 的状态来计量它，会把那些被承载下来的前导字节当作非法续字节计费——从而下一个分块能正确地继续推进，且该管道在保留的尾部之上重建其成本／UTF-8 状态。`end`／`closeDeadline` 路径传入 `false`，原样解码整个残余，因为在那里一个不完整的尾序列是真实的坏输入，U+FFFD 才是如实呈现。

### 迟到的 binding 拒绝在格式化错误之前就返回

同样在 `src/index.ts` 中，binding 拒绝的 catch 分支现在会在格式化 `messageOf(error)` **之前**检查 `settled` 并返回。一次在 `maxWallMs`、abort 或 dispose 已经把该运行结算之后才到达的拒绝，本会让 `messageOf(error)` 在这之前运行敌意的 `toString`／`message` getter——为一个结局已定的运行花费宿主堆与时间——然后 `sendReply` 才去窥探 `settled`。及早丢弃这一条已分帧的回复省下了这笔开销。运行中那条本就大致线性的回复排空改用队头游标按数组下标读取、而非 `shift()` 逐项弹出，因此一大轮等待 fd 3 的 `drain` 的宽 binding 的 `asyncio.gather` 会以线性时间排空，而不是因反复切片退化成 O(n²)。

### 无换行滴灌会封存其分片；CPU 软限制保持在硬限制之下；done 帧回退到固定字面量；回复队列清空已消费槽位

在 [`py/bootstrap.py`](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/experimental/code-runtime-python/py/bootstrap.py) 中，`_LogStream` 现在会在待处理分片列表越过一个上限时封存它：无换行、每次 `write` 一个字符的滴灌会每次调用累积一个 list 槽位（以及一个 str 对象），在一个大的 `maxLogBytes` 下，25 M 次单字符洪泛会在字节预算达到之前，于其自身记账上 OOM（加上 `_push_bounded_prefix` 随后构造的同规模列表）。越过 `_PENDING_MAX_CHUNKS` 后，当前分片被 join 成一个块并移入 `_pending_blocks` 列表（字符数不变），把存活的碎片数量限制在宿主侧 `captureStray` 封存所做的同等水平；该 join 只针对 ≤cap 的当前分片，从不针对整个累积缓冲，因此大的滴灌保持 O(B)，而不是以 O(B²/cap) 次反复复制不断增长的块。宿主侧 open hold 镜像同样的封存：预算内的单字符 open 洪泛（`print('x', end='', flush=True)` 循环是诚实子进程可达路径）否则会为每帧累积一个片段数组槽位加字符串对象头——约 30× 字节计数看不到的开销，在 `maxLogBytes` 装载上限附近最高约 2 GB 宿主辅助堆。越过 `MAX_PENDING_CHUNKS` 后持有的片段并入 `openSealed`；闭合帧合并、`truncateLogs` 与 `finish` 残段都读取 sealed 加当前片段并清空封存。

`_clamped` 还会把钳制出的、与硬限制相等的 RLIMIT_CPU 软限制降低一个单位（当硬限制至少为 2 时）。`ulimit -t N` 会同时设置两者，而当 soft == hard 时，内核会在同一 tick 检查硬限制并直接 SIGKILL 一个忙循环，因此 SIGXCPU 永远不会送达——而宿主只在 `signal === 'SIGXCPU'` 时把 CPU 超限分类为超时，所以一次确定的预算耗尽会被误报为 `worker-exit`。把软限制降低一个单位给 SIGXCPU 一个触发窗口，因此超限会被报告为超时。这仅限定于 RLIMIT_CPU（在 RLIMIT_AS 上的一字节软差异只会让子进程实际应用的限制与宿主预算门失步，没有需要保留的信号）。`hard >= 2` 守卫留下了 `hard == 1` 盲区——一个 1 秒的双限制无法把软限制降到 0，因此那里的确定超限仍被报告为 `worker-exit`。

`send_done` 将其 encode+write 包进 try，任何来自被重绑的传递名（`_dump_scalar`/`os`）的抛出都会写入一条固定的预编码 done 帧，经由 `_run` 局部绑定的 `_os_write`/`_memoryview`/`_FALLBACK_DONE_FRAME`——因此一个已结算的 `exception` 判决绝不会被降级为 `worker-exit`，宿主仍会拿到一个判决。回复队列的头游标排空会清除每个已消费槽位，因此一个已写出的宽 payload 会被立即释放，把宿主内存限制在持续的 fd-3 背压下的当前积压量。结算路径各 `except` 子句所捕获的异常类同样在任何模型代码运行之前绑定：`_BaseException` 是 `_run` 的局部与 `_make_failure_reporter` 的闭包单元；`_RuntimeError`、`_BindingRejection`、`str` 与 `bool` 是 `_pump_replies` 的 def 期默认参数（函数体内的 `X = X` 绑定太晚——模型顶层语句会先于泵体首步执行）。重绑 `__main__.BaseException` 无法让程序异常逃出处理器、丢失 `done` 帧；重绑 `__main__.RuntimeError`（或 `_BindingRejection`/`str`/`bool`）无法让闭环调度失败逃出泵的捕获、把每条后续回复搁浅到墙钟超时。
