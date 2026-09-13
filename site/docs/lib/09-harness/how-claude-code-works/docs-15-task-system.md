---
title: "第 11 章：任务管理系统"
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

# 第 11 章：任务管理系统

> **一句话总结**：Claude Code 的任务系统（TodoV2）用文件级存储加锁机制，实现了一个支持多 Agent 并发的轻量任务管理器，让 AI Agent 能拆解复杂工作、追踪进度、在团队里协调分工。

## 为什么需要任务系统？

想象一个场景：你要求 Claude Code「重构整个认证模块」。这涉及十几个步骤——修改数据模型、更新 API 端点、调整前端组件、写测试、更新文档……如果没有任务管理，Agent 很可能丢失上下文、遗漏步骤，或者做了一半忘记还有什么没做。

任务系统解决的核心问题：

1. 复杂任务拆解——单个 Agent 把大任务分解为可追踪的小步骤
2. 进度可见性——用户在终端 UI 里实时看到每个步骤的状态
3. 多 Agent 协调——团队里的多个 Agent 共享任务列表、认领工作、避免重复

### 从 TodoV1 到 TodoV2 的演进

早期的 `TodoWriteTool` 是一个简单的单一 JSON 文件方案——所有待办事项写在一个列表里。这在单 Agent 场景下够用，但当多个 Agent 同时读写同一个 JSON 文件时，就会出现竞争条件和数据丢失。

TodoV2 做了一个关键的架构决策：**每个任务一个独立文件**。这让锁粒度从「整个列表」细化到了「单个任务」，是支撑多 Agent 并发的基础。

## 11.1 四个核心工具

任务系统通过四个工具暴露给模型，分工明确：

| 工具 | 职责 | 只读 |
|------|------|------|
| **TaskCreate** | 创建新任务 | 否 |
| **TaskGet** | 获取单个任务的完整信息 | 是 |
| **TaskList** | 列出所有任务摘要 | 是 |
| **TaskUpdate** | 更新状态、owner、依赖等 | 否 |

### 参数设计的巧思

```typescript
// TaskCreate 的输入参数
{
  subject: string       // "Fix authentication bug in login flow"
  description: string   // 详细描述
  activeForm?: string   // "Fixing authentication bug" — 用于 spinner 显示
  metadata?: Record<string, unknown>  // 可扩展的元数据
}
```

几处设计值得留意：

- subject 要求用命令式（"Fix bug" 而不是 "Fixing bug"）：系统提示词明确引导 LLM 用这种格式，因为它更适合当标题显示
- activeForm 是可选的进行时形式：任务正在执行时，终端 spinner 显示 "Fixing authentication bug" 而不是 "Fix authentication bug"，这一字之差让 UI 的状态感更自然
- metadata 支持 `_internal` 标记：设置了 `metadata._internal = true` 的任务不会出现在 TaskList 结果中，系统可以借此创建用户看不见的内部任务

### 状态机

任务的生命周期是一个简单的状态机：

```
pending ──→ in_progress ──→ completed
   │             │              │
   └─────────────┼──────────────┘
                 ↓
              deleted   (特殊动作：任意状态都可直接删文件)
```

- `pending`：刚创建，等待认领
- `in_progress`：正在执行
- `completed`：已完成
- `deleted`：不是真正的状态——调用 `deleteTask()` 直接删除文件，并清理其他任务中对它的引用

### 依赖追踪：blocks / blockedBy

任务间可以声明依赖关系：

```typescript
// "任务 2 被任务 1 阻塞" — 即必须先完成任务 1
TaskUpdate({ taskId: "2", addBlockedBy: ["1"] })
```

这在底层是一次双向更新（`blockTask` 函数）：

```typescript
// src/utils/tasks.ts
export async function blockTask(taskListId, fromTaskId, toTaskId) {
  // A blocks B → 同时更新两端
  // fromTask.blocks 加入 toTaskId
  // toTask.blockedBy 加入 fromTaskId
}
```

为什么要双向维护？因为 `TaskList` 判断一个任务能不能被认领，看的是 `blockedBy` 是否为空；`TaskGet` 展示一个任务阻塞了哪些下游任务，看的是 `blocks`。两头各存一份，就省得每次遍历全部任务去算关系。

`TaskList` 还会自动过滤已经完成的 blocker：如果任务 1 已经 completed，任务 2 的 `blockedBy` 在显示时就不再包含它，免得误导模型以为它仍然被阻塞。

## 11.2 文件级存储：为并发而生

这是任务系统里最核心的设计决策，下面拆开细看。

### 存储结构

```
~/.claude/tasks/
  └── {taskListId}/        # 每个会话/团队一个目录
      ├── .lock            # 目录级锁文件
      ├── .highwatermark   # 最高 ID 记录
      ├── 1.json           # 任务 1
      ├── 2.json           # 任务 2
      └── 3.json           # 任务 3
```

每个任务文件的内容：

```json
{
  "id": "1",
  "subject": "Fix authentication bug",
  "description": "The login endpoint returns 500...",
  "status": "in_progress",
  "owner": "teammate-1",
  "blocks": ["3"],
  "blockedBy": [],
  "metadata": {}
}
```

### 为什么一个文件一个任务？

这是对比 TodoV1 的关键改进。考虑多 Agent 场景：

先看单文件方案的毛病。Agent A 读取 `tasks.json`，Agent B 也读取 `tasks.json`。A 改了任务 1 写回，B 改了任务 2 写回，B 的写入就把 A 对任务 1 的修改覆盖掉了。要堵住这个漏洞，得对整个文件加锁，于是所有 Agent 的任务操作都被串成一条线。

换成一文件一任务就不一样了。Agent A 锁住 `1.json`，Agent B 锁住 `2.json`，两者并行操作互不干扰。只有跨任务的原子操作，比如创建新任务要分配 ID，才需要动用目录级的 `.lock` 文件。

### TaskListId：谁共享同一个任务列表？

任务列表的隔离通过 `taskListId` 实现，解析时有 5 层优先级：

```typescript
// src/utils/tasks.ts
export function getTaskListId(): string {
  // 1. 显式指定（环境变量）
  if (process.env.CLAUDE_CODE_TASK_LIST_ID) return it
  // 2. 进程内队友 → 使用 leader 的 team name
  const teammateCtx = getTeammateContext()
  if (teammateCtx) return teammateCtx.teamName
  // 3. 进程式队友 → CLAUDE_CODE_TEAM_NAME
  // 4. Leader 创建的 team name
  // 5. 兜底 → session ID（独立会话）
  return getTeamName() || leaderTeamName || getSessionId()
}
```

这个设计保证了三件事：独立会话各自隔离，用 session ID 区分；团队里的所有成员，不管在进程内还是进程间，都共享同一个任务列表，靠 team name 认定；外部工具则可以通过环境变量强制指定。

### 高水位标记：防止 ID 重用

任务 ID 是自增整数（"1", "2", "3"...），而非 UUID。这是有意的选择：

- 可读性：对话里 "#1" 比 "a7f3b2c1-..." 好引用
- 顺序性：系统提示词建议模型按 ID 顺序处理任务，因为早期任务往往为后续任务铺好上下文

但自增 ID 遇到删除时有问题：如果任务 3 被删除后创建新任务，新任务不应该再次获得 ID "3"——这会让对话中之前引用的 "#3" 产生歧义。

解决方案是 `.highwatermark` 文件：

```typescript
// 删除任务时更新高水位
export async function deleteTask(taskListId, taskId) {
  const numericId = parseInt(taskId, 10)
  const currentMark = await readHighWaterMark(taskListId)
  if (numericId > currentMark) {
    await writeHighWaterMark(taskListId, numericId)
  }
  // ... 删除文件
}

// 创建任务时同时参考文件和高水位
async function findHighestTaskId(taskListId) {
  const [fromFiles, fromMark] = await Promise.all([
    findHighestTaskIdFromFiles(taskListId),
    readHighWaterMark(taskListId),
  ])
  return Math.max(fromFiles, fromMark)
}
```

即使所有任务文件都被删除，高水位仍然记录着历史最大 ID，新任务从它之后开始编号。

### 锁策略：两种粒度

系统使用 `proper-lockfile` 库，配置了相当激进的重试策略：

```typescript
// 为 ~10+ 个并发 swarm agent 设计
const LOCK_OPTIONS = {
  retries: {
    retries: 30,       // 最多重试 30 次
    minTimeout: 5,     // 最短 5ms
    maxTimeout: 100,   // 最长 100ms
  },
}
// 总等待时间约 2.6 秒——足够处理 10 路竞争
```

两种锁粒度服务于不同场景：

| 锁粒度 | 锁对象 | 使用场景 |
|--------|--------|----------|
| **任务级** | `{taskId}.json` | 更新单个任务（如修改状态、设置 owner） |
| **目录级** | `.lock` | 需要跨任务原子操作（如创建新任务分配 ID、带忙碌检查的认领） |

这里要单独说 `claimTaskWithBusyCheck`：它用目录级锁，把「检查 agent 是否空闲 + 认领任务」这两步并成一个原子操作。若改用任务级锁，两个 agent 可能同时通过忙碌检查、然后都认领成功，破坏了「一个 agent 同时只做一件事」的约束。

## 11.3 实时 UI：三层变更检测

任务状态的变化要实时反映到终端 UI 里。Claude Code 用三层检测机制来确保不漏掉任何更新：

### 第一层：文件系统事件（fs.watch）

```typescript
// src/hooks/useTasksV2.ts
#rewatch(dir: string): void {
  this.#watcher = watch(dir, this.#debouncedFetch)
  this.#watcher.unref()  // 不阻止进程退出
}
```

最快的通知方式——操作系统的文件系统事件。加了 50ms 去抖，因为一次任务操作可能触发多个文件事件（如修改任务文件 + 更新高水位）。

它也有局限：`fs.watch` 不是 100% 可靠，不同操作系统、文件系统的行为不一致；任务目录还不存在时也没法监听。

### 第二层：进程内信号（onTasksUpdated）

```typescript
// src/utils/tasks.ts 中，每次写操作后调用
notifyTasksUpdated()

// useTasksV2.ts 中订阅
this.#unsubscribeTasksUpdated = onTasksUpdated(this.#debouncedFetch)
```

当同一个进程内的代码修改了任务（如 Agent 自己创建的任务），通过内存中的信号直接通知 UI，不依赖文件系统。

它覆盖的是同进程的即时更新，零延迟。

### 第三层：轮询兜底（5 秒间隔）

```typescript
// 只有存在未完成任务时才轮询
if (hasIncomplete) {
  this.#pollTimer = setTimeout(this.#debouncedFetch, FALLBACK_POLL_MS)
  this.#pollTimer.unref()
}
```

最后一道兜底——每 5 秒重新读一次任务列表。它主要覆盖跨进程更新，比如另一个 tmux 窗口里的 Agent 改了任务，也补上 fs.watch 不可靠的边缘情况。

这里有个优化：只在还有未完成任务时才轮询，所有任务都完成后就停下来，省掉没必要的 I/O。

### 为什么需要三层？

每一层覆盖不同的失败模式：

| 层 | 覆盖场景 | 延迟 | 可靠性 |
|----|----------|------|--------|
| fs.watch | 同机器文件变更 | ~50ms | 中（平台差异） |
| 进程内信号 | 同进程操作 | 即时 | 高 |
| 轮询 | 跨进程、fs.watch 失效 | ≤5s | 高 |

三层组合的结果是：正常情况下变更几乎即时可见，极端情况下最多延迟 5 秒。

### Singleton Store 模式

```typescript
let _store: TasksV2Store | null = null
function getStore(): TasksV2Store {
  return (_store ??= new TasksV2Store())
}
```

所有 React 组件共享同一个 `TasksV2Store` 实例。为什么不让每个组件各自创建 watcher？

源码注释里交代了原因：「Spinner mounts/unmounts every turn — per-hook watchers caused constant watch/unwatch churn.」Spinner 组件每一轮对话都要挂载、卸载，要是它自己维护 watcher，就会不停地创建、销毁文件监听——既浪费资源，又可能漏掉卸载到重新挂载之间的那些事件。

Singleton 模式让 watcher 的生命周期与「是否有人在看」解耦。REPL 组件始终挂载，保持至少一个订阅者存在，Singleton 就不会被销毁。

### 自动隐藏与重置

所有任务都完成后，系统按这几步收尾：

1. 检测到所有任务变为 `completed`
2. 等待 5 秒（`HIDE_DELAY_MS`）——给用户时间看到完成状态
3. 再次确认仍然全部完成（防止新任务在等待期间创建）
4. 调用 `resetTaskList()` 清空任务文件
5. UI 自动折叠任务面板

这个 5 秒延迟是个细节但很重要——如果任务完成后立即消失，用户无法确认是否真的都做完了。

### 任务显示优先级

终端空间有限（最多显示约 10 条任务），`TaskListV2.tsx` 用优先级排序决定哪些任务可见：

1. 最近完成的（30 秒内）——让用户看到刚做完的成果
2. 进行中的——当前正在做什么
3. 待办、未被阻塞的——接下来可以做什么
4. 待办、被阻塞的——还得等的
5. 更早完成的——优先级最低

超出显示限制的任务用摘要代替：「... +2 in progress, 3 pending, 1 completed」。

## 11.4 上下文注入：任务如何进入 LLM 视野

任务创建后存在磁盘上，但 LLM 看不到磁盘文件。任务状态是怎么进到模型输入里的？靠两条路径并行：工具调用结果，加上周期性提醒注入。

### 路径一：工具调用结果（主动获取）

当模型调用 `TaskCreate`、`TaskList`、`TaskGet`、`TaskUpdate` 时，工具执行的返回值会作为 `tool_result` 消息回注到对话上下文中。例如 `TaskList` 返回：

```
#1 [completed] Set up database schema
#2 [in_progress] Implement API endpoints (alice)
#3 [pending] Write integration tests [blocked by #2]
```

这是最直接的路径——模型主动查询，系统返回最新状态。但要是模型压根忘了任务系统的存在呢？

### 路径二：周期性提醒（被动注入）

这是更精巧的设计。Claude Code 的 Attachment 系统会在合适的时机自动向对话中注入任务提醒：

```typescript
// src/utils/attachments.ts
export const TODO_REMINDER_CONFIG = {
  TURNS_SINCE_WRITE: 10,     // 距上次 TaskCreate/TaskUpdate 10 轮
  TURNS_BETWEEN_REMINDERS: 10, // 两次提醒之间至少 10 轮
}
```

触发逻辑是这样的：系统从对话历史末尾往前扫描，数两个数——距上次用 `TaskCreate` 或 `TaskUpdate` 过了多少轮助手消息，距上次显示任务提醒又过了多少轮。两个数都满足条件（≥10 轮）时，就从磁盘加载当前任务列表，生成一条注入消息。
