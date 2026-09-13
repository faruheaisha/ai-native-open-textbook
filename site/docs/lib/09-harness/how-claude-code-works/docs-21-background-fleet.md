---
title: "第 21 章：后台 Agent 舰队——脱终端常驻与 daemon 监管"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/README.md"
zh: ""
---

# 第 21 章：后台 Agent 舰队——脱终端常驻与 daemon 监管

> 前面几章给了你两根轴上的自治。[第 17 章](/lib/09-harness/how-claude-code-works/docs-17-autonomy-goal-loop)的 `/loop` 是时间轴：同一个会话隔一阵回来再干一轮。[第 19 章](/lib/09-harness/how-claude-code-works/docs-19-dynamic-workflows)的 Dynamic Workflows 是空间轴：一段脚本此刻就把几十上百个 subagent 铺出去。但这两样都还活在一个绑在终端上的会话里——你把终端关了，它就没了。这一章讲 Claude Code 怎么把这条最后的绳子也剪断：一个会话怎么从终端上脱开、关掉终端也照跑，以及当你手里同时有好几个这样的后台会话时，它们是怎么被当成一支舰队来照看的。触发它的是一条命令 `/bg`，管它的是一张表 `claude agents`。
>
> 这一章的证据分两头，而且分得很不对称。脱终端会话在会话内的那套底座——background-task UI、`AgentTool` 里的 `run_in_background`——在泄露快照（标称 v2.1.88）的源码里能逐行读到。但真正把多个后台进程当舰队来监管的那台 daemon supervisor，整个没随快照泄露：在快照里 `grep -rlF 'tengu_bg_'` 命中零个文件，它只在 2.1.202 二进制的字符串里留了痕迹。所以本章会反复说清楚一件事：哪些是源码能读到的机制，哪些是二进制字符串里近八十个事件名拼出来的功能地图，哪些是从事件名往里推的逻辑，哪些是本地进程模型、根本照不进来的盲区。

## 21.1 两条轴之外的第三件事：脱终端

先接上刚才那两根轴。`/loop` 让会话在时间上续命，Workflow 让会话在空间上分身，但它们有个共同前提没被打破：会话跟终端是一根绳上的。你的 shell 在，会话就在；shell 一退，进程组收到信号，会话跟着走。这种长任务往往要跑几十分钟到几小时，启动它的人早就该转身去忙别的，这根绳子于是很碍事——你不能为了让它接着跑，就一直守着一个终端不关。

后台舰队要解决的正是这件事，它引入的第一个动作是"脱离"。`/bg` 把当前会话从终端上摘下来、丢到后台常驻，你的终端立刻腾出来干别的，而那个会话在别处接着跑。字符串里把这层意思写得最反直觉的一句是 "Sessions keep running if you close the terminal."——会话不再是终端的附属物，你关掉终端，它照活。这跟前两根轴是正交的：`/loop` 和 Workflow 说的是"一个会话内部怎么排布工作"，脱终端说的是"会话本身怎么脱离你的在场而存活"。三样叠起来，才凑齐"无人值守"这个词的全部含义——既不用你守着看，也不用你守着连。

换个角度看，这一章讲的东西其实是前几章的底座。`/loop` 的那一轮轮续跑要有个东西替它守着别掉，Workflow fan-out 出去的一批 subagent、多 agent team 里那些并行成员，也都默认脚下有一层"进程不会平白蒸发"的地基。前面几章各讲各的编排——什么时候派、派几个、怎么收——却都没把这层地基翻开细看。这一章讲的正是它：一个脱了终端的会话，怎么在你不在场、终端也关掉的情况下，仍有一台东西盯着它的死活。子 agent 跟脱终端会话同属这片后台能力版图，只是它们到底是不是由这台 `/bg` daemon 监管，现有证据打不通这道边界（详见 21.6）——所以这一章读起来不像一个新功能，更像是把前面几章一直踩着、却没细看的地面翻开给你看。

## 21.2 `/bg`：把会话从终端上摘下来

`/bg` 这条命令的自我介绍就一句话，把该说的都说了。字符串里逐字是这样：`/bg` detaches this session to run in the background，然后 `claude agents` 会把每一个被丢到后台的会话汇进一张表，每行带一个状态色——扫一眼就知道哪个在等你，空格回一句、回车进去接管。配套的 onboarding 提示更直白：`/bg` this session, then run `claude agents` in a new terminal。一个动作把会话推到后台，另一个动作在别的终端把它捞回来看。

摘下来之后会话并不会变哑。它还在跑、还可能需要你——比如问你一个只有你能拍板的问题——只是你此刻不在它面前。所以脱终端不是"发射后不管"，而是"发射后改成异步照看"：会话继续推进，需要你的时候在那张表里亮个状态，你有空了再回去。这也解释了为什么这套东西会跟本机 CLAUDE.md 里那条手机远控串到一起——本地 `/bg` 脱离、手机上 attach 回来、进程始终由后台守着，同一个会话在本地、手机、常驻三处之间来回倒手，靠的就是"会话不绑终端"这一条。

## 21.3 `claude agents`：一张表管所有后台会话

脱终端解决了"一个会话怎么活下去"，`claude agents` 解决的是"好几个会话怎么一起看"。它在 CLI 里是一个正经的 Commander 子命令，描述逐字写着 Manage background agents。它带着一小组动作：`claude agents` 列出所有后台会话，`claude attach {id}` 把某一个在当前终端里打开接管，`claude logs {id}` 翻它最近的输出。这三条合起来就是一套朴素的舰队面板——列表看全局、attach 进单个、logs 事后翻账。

那张表的关键是那个状态色。它把"哪个会话需要你介入"压缩成一列能一眼扫过的信号——你不必挨个 attach 进去看，扫一眼就知道该先管谁。至于具体哪个颜色对应哪种状态，字符串里只写了"用状态色扫出哪些需要你"，没把颜色到状态的映射写死，本文也不替它下结论。这里还藏着一条会咬人的规则：一个会话如果已经作为后台 agent 在跑，你就没法在别处直接 `--resume` 它。字符串把话说得很清楚——它现在是个后台 agent，去 `claude agents` 里 attach 上它，或者先在那儿把它停掉，才能在这边 resume。同一个会话不允许被两处同时接管，attach 与 resume 是互斥的入口。这条约束本身透出一点：后台会话不是可随便复制的一份状态，它有唯一归属，必须被独占接管，是个活进程。

## 21.4 表面之下：一套跑在本地的进程舰队监管器

到这里为止都还是用户看得见的一层。真正撑起"关了终端也不掉、崩了还能回来"的，是二进制字符串里那近八十个以 `tengu_bg_` 打头的事件名拼出来的一台监管器。要先把话说在前头：这一节是全章证据最不对称的地方。事件名本身是 2.1.202 字符串里逐字读到的，实打实；但每个事件在什么条件下发、彼此怎么串成状态机，快照里没有一行对应源码可查（`grep -rlF 'tengu_bg_'` 命中零个文件），只能从事件名加周边压缩代码往里推。所以下面对"它在干什么"的描述，名字是硬的，逻辑是推的，我按这个分寸写。

把这些事件按名字聚一下，浮出来的是五六个子系统，各管一摊，凑起来活像一台小号的进程主管。最上面是总入口 `bg_agent_action` 和一族 `bg_dispatch`：把任务派下去，派之前先让 `bg_classify` 归个类。派的路上有一串兜底动作——`_dispatch_rescued` 把它救回来、`_stale_drop` 嫌它太旧丢掉、`_sigkill_escalate` 一路升级到 SIGKILL、`_low_mem` 和 `_fallback` 在内存紧张时走降级路。再往下是 daemon 的生死：起不来是 `_daemon_spawn_failed`，装服务是 `_daemon_install`，把僵死的重启是 `_daemon_zombie_restart`，又靠 `_zombie_false_positive` 不误杀假僵死，冷启动先问你一句是 `_daemon_cold_start_ask`；它还给 Windows 和 macOS 各铺一条路，分别叫 `_daemon_wmi_fallback` 和 `_daemon_macos_aqua_wrap`。

再往下有意思了。有一族 `spare` 事件——`_spare_spawn`、`_spare_claim`、`_spare_enable`、`_prewarm_per_sweep`——按名字推测，像是在维护一个预热好的备用 worker 池：任务还没来，就先把几个进程热在那儿，任务一到直接认领，省掉现起进程那几秒冷启动。真正 worker 的起落是另一族：`_worker_spawn`/`_exit`/`_vanished`/`_stalled`——生、正常退、莫名消失、卡住不动，各有各的事件。而最像 supervisor 的是 respawn / adopt / orphan 这一组。worker 崩了自动重生记 `_respawn`，重生前先由 `_respawn_unconfirmed_bail` 防重复；没主的进程被 `_adopt` 收养，收养时 token 丢了就走 `_adopt_token_lost_respawn` 重生；没人认领的孤儿由 `_orphan_reap` 回收。整支舰队的花名册叫 roster：孤儿被登记回来是 `_roster_orphan_adopted`，登记解析失败是 `_roster_parse_failed`。attach/detach 那一族管你接管的瞬间——首帧记 `_first_frame`、卡住重生记 `_stall_respawn`、踢一脚记 `_attach_kick`；最底下还有一层 transport，管 PTY 拿不到、认证对不上、协议不匹配、桥接被截断这些管道层的意外。

拿一个 worker 走一遍，就能感觉到这套东西的密度。它由 `_worker_spawn` 诞生，被登进那本叫 roster 的花名册；跑着跑着要是莫名没了记 `_vanished`、卡住不动记 `_stalled`；从 `_respawn` 和 `_respawn_unconfirmed_bail` 这两个名字推，监管器不会当没看见，而是判要不要重生，且重生前先确认它是真死、而非网络抖了一下，免得同一个活儿起两份。机器内存吃紧时又是另一套动作：它把占着内存又不那么要紧的 worker 退休掉，给要紧的腾地方，对应 `_retire_pinned_low_mem` 和 `_low_mem_mb`。要是监管器刚接手，发现一堆没主的进程还在跑（比如上一个 daemon 没干净地退），它会用 `_adopt`、`_orphan_reap`、`_roster_orphan_adopted` 把这些孤儿认领回来，而不是放任它们变成谁都不管的僵尸。这几条连起来，就是一台监管器该有的样子：记账、查活、崩了补、挤了退、没主的收编。

把这几摊合起来看，结论就很清楚了：`/bg` 背后不是"起个后台进程"这么轻。它是一整套带健康检查、崩溃重生、孤儿收养、内存压力退休、预热备用池的进程舰队监管，量级接近 systemd 或 pm2 的一个子集——只不过整台机器是在你本地客户端里跑的，为的是让那些脱了终端的会话，在你不看时也有台东西替你盯着死活。这台监管器是本章最硬的骨头，也是最只能靠字符串说话的部分：名字是从二进制里逐字读到的，可它们连成的这台状态机长什么样，是我照着名字和周边逻辑推的，不是从某份源码里读出来的——这个分寸得替你记着。

## 21.5 按需起、闲了退、可以一键关

你可能以为这么一台监管器是个常驻守护进程，开机就在那儿吃内存。不是。字符串里它的定位是 on-demand——用到才起。没有活儿吊着它的时候，它会说自己 nothing holding this daemon open，随即 idle-exit 退掉；下一次你敲 `claude agents` 或 `claude --bg`，再拉起一个新的。这跟第 17 章那种"常驻盯着目标"的自治是两种脾气：监管器只在真有后台会话要看的时候存在，没活就自己走，不白占资源。

按需起也带来一个要防的坑：同一时刻起了两个 daemon 怎么办。字符串里有一条很干净的让位规则——an on-demand daemon never displaces a running one，只有 transient（临时的那种）才允许被顶掉。翻过来就是：已经在正经看着一堆会话的 daemon 有优先权，一个刚按需起来的不许把它挤掉，避免两台监管器打架、把舰队的账记乱。

整套东西也留了总闸。设置项里有一条逐字写着：Disable agent view（`claude agents`、`--bg`、`/background`、还有那个 on-demand daemon 一起关），通常在托管设置里下发，等价于环境变量 `CLAUDE_CODE_DISABLE_AGENT_VIEW=1`。也就是说，脱终端加舰队监管这一整块能被一个开关整体摁掉——对不希望员工机器上冒出后台常驻进程的组织，这是一条能从上面统一关死的路。

## 21.6 同一片版图的另一层：子 agent 默认后台

到这儿要补一层跟脱终端会话并列、但证据来源完全不同的东西：子 agent 的后台化。你 `/bg` 出去的是整会话；而在一个会话内部，主会话派出去的子 agent 默认也跑在后台。这正好接回[第 8 章](/lib/09-harness/how-claude-code-works/docs-07-multi-agent)和[第 19 章](/lib/09-harness/how-claude-code-works/docs-19-dynamic-workflows)那套 `run_in_background`：在当前版本里，子 agent 默认就是后台跑的。`AgentTool` 的描述在快照源码里能读到，字符串里也留了几个措辞略有出入的变体，意思一致：Subagents run in the background by default，跑完会通知你；只有当你在往下走之前非拿到它的结果不可，才传 `run_in_background: false` 让它同步跑。schema 里 `run_in_background` 的默认值就是 true，还带一个 `isolation: 'worktree'` 字段管文件系统隔离——这份 `run_in_background` 在快照里出现在十个文件（`AgentTool`、`BashTool`、`PowerShellTool`、bundled 的 batch 等），这一层有源码可逐行读，不是从字符串往里推的。
