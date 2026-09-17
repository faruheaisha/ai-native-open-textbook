---
title: "Phase 1 · 纯逻辑（TDD 重点）"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-dashboard-v2/docs/superpowers/plans/2026-05-09-nanoclaw-dashboard-v2-phase0-1.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-dashboard-v2/docs/superpowers/plans/2026-05-09-nanoclaw-dashboard-v2-phase0-1.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-dashboard-v2/docs/superpowers/plans/2026-05-09-nanoclaw-dashboard-v2-phase0-1.md"
sourceSha256: "ac91c553bee6e692d448a9316f7d1454c31df6aede4e96b6de569667c2a6022a"
pageSha256: "b1df5a073544db8335ec653ce57f9c404e94d2dc8a3520c1021276eba1c2f8f9"
contentMode: "local-full"
zh: ""
---

# Phase 1 · 纯逻辑（TDD 重点）

---

### Task 5: 数字格式化 `lib/format.ts`（**重点 · TDD**）

**为什么单独成一个任务**：所有 UI 组件（StatsGrid、SecurityPanel、AgentTable）都会消费这些函数。先 TDD 透了，后面 UI 直接调，没有歧义。

**Files:**
- Create: `lib/format.ts`
- Test: `tests/format.test.ts`

- [ ] **Step 1：写完整测试（先红）**

```ts
// tests/format.test.ts
import { describe, it, expect } from "vitest";
import {
  formatCurrencyUSD,
  formatPercent,
  formatDelta,
  formatCount,
  formatDuration,
  formatRunCount,
} from "@/lib/format";

describe("formatCurrencyUSD", () => {
  it("两位小数 + $ 前缀", () => {
    expect(formatCurrencyUSD(0.04)).toBe("$0.04");
    expect(formatCurrencyUSD(10)).toBe("$10.00");
    expect(formatCurrencyUSD(0)).toBe("$0.00");
  });
  it("千位分隔", () => {
    expect(formatCurrencyUSD(1234.5)).toBe("$1,234.50");
  });
  it("负数加 -", () => {
    expect(formatCurrencyUSD(-5.5)).toBe("-$5.50");
  });
});

describe("formatPercent", () => {
  it("整数 %", () => {
    expect(formatPercent(0.4)).toBe("0.4%");
    expect(formatPercent(100)).toBe("100%");
    expect(formatPercent(35)).toBe("35%");
  });
  it("clamp [0,100]", () => {
    expect(formatPercent(150)).toBe("100%");
    expect(formatPercent(-5)).toBe("0%");
  });
  it("小数点保留 1 位（小于 1 时）", () => {
    expect(formatPercent(0.4)).toBe("0.4%");
    expect(formatPercent(0.04)).toBe("0%");  // < 0.05 round down
  });
});

describe("formatDelta", () => {
  it("正数加 ↑ +X%", () => {
    expect(formatDelta(233)).toEqual({ label: "↑ +233%", direction: "up" });
  });
  it("负数加 ↓ X%", () => {
    expect(formatDelta(-12)).toEqual({ label: "↓ 12%", direction: "down" });
  });
  it("零值 →", () => {
    expect(formatDelta(0)).toEqual({ label: "→ 0%", direction: "flat" });
  });
});

describe("formatCount", () => {
  it("整数千位分隔", () => {
    expect(formatCount(7)).toBe("7");
    expect(formatCount(1234)).toBe("1,234");
    expect(formatCount(1000000)).toBe("1,000,000");
  });
});

describe("formatRunCount", () => {
  it("加 '次' 后缀", () => {
    expect(formatRunCount(7)).toBe("7 次");
    expect(formatRunCount(0)).toBe("0 次");
    expect(formatRunCount(1234)).toBe("1,234 次");
  });
});

describe("formatDuration", () => {
  it("毫秒级 < 1s 显示 0.Xs", () => {
    expect(formatDuration(300)).toBe("0.3s");
    expect(formatDuration(50)).toBe("0.1s");  // < 0.1s clamp
  });
  it("秒级 < 60s", () => {
    expect(formatDuration(7000)).toBe("7s");
    expect(formatDuration(45000)).toBe("45s");
  });
  it("分钟级 ≥ 60s", () => {
    expect(formatDuration(60000)).toBe("1m");
    expect(formatDuration(125000)).toBe("2m 5s");
  });
  it("0 或负 → '—'", () => {
    expect(formatDuration(0)).toBe("—");
    expect(formatDuration(-1)).toBe("—");
  });
});
```

- [ ] **Step 2：跑测试确认全红**

```bash
pnpm test tests/format.test.ts
# 期望：全部 fail（模块不存在）
```

- [ ] **Step 3：实现 lib/format.ts**

```ts
// lib/format.ts
export type DeltaDirection = "up" | "down" | "flat";

export function formatCurrencyUSD(value: number): string {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `-$${formatted}` : `$${formatted}`;
}

export function formatPercent(value: number): string {
  const clamped = Math.max(0, Math.min(100, value));
  if (clamped >= 1 || clamped === 0) {
    return `${Math.round(clamped)}%`;
  }
  // 0 < x < 1：保留 1 位
  const rounded = Math.round(clamped * 10) / 10;
  if (rounded === 0) return "0%";
  return `${rounded}%`;
}

export function formatDelta(value: number): { label: string; direction: DeltaDirection } {
  if (value > 0) return { label: `↑ +${value}%`, direction: "up" };
  if (value < 0) return { label: `↓ ${Math.abs(value)}%`, direction: "down" };
  return { label: `→ 0%`, direction: "flat" };
}

export function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatRunCount(n: number): string {
  return `${formatCount(n)} 次`;
}

export function formatDuration(ms: number): string {
  if (ms <= 0) return "—";
  if (ms < 1000) {
    const sec = Math.max(0.1, Math.round(ms / 100) / 10);
    return `${sec}s`;
  }
  if (ms < 60_000) {
    return `${Math.round(ms / 1000)}s`;
  }
  const minutes = Math.floor(ms / 60_000);
  const remainSec = Math.round((ms % 60_000) / 1000);
  return remainSec === 0 ? `${minutes}m` : `${minutes}m ${remainSec}s`;
}
```

- [ ] **Step 4：跑测试确认全绿**

```bash
pnpm test tests/format.test.ts
# 期望：所有 it 全部 pass
```

- [ ] **Step 5：commit**

```bash
git add lib/format.ts tests/format.test.ts
git commit -m "feat(format): add number/currency/percent/duration formatters with TDD"
```

---

### Task 6: zod schema 全集 `lib/mock/schema.ts`

**Files:**
- Create: `lib/mock/schema.ts`
- Test: `tests/mock-schema.test.ts`

- [ ] **Step 1：写 schema**

```ts
// lib/mock/schema.ts
import { z } from "zod";

export const StatsSchema = z.object({
  agents: z.object({
    total: z.number(), active: z.number(), configured: z.number(),
    progressPct: z.number().min(0).max(100),
  }),
  skills: z.object({
    total: z.number(), custom: z.number(), thirdParty: z.number(),
    progressPct: z.number().min(0).max(100),
  }),
  todayRuns: z.object({
    count: z.number(), deltaPctVsYesterday: z.number(),
    progressPct: z.number().min(0).max(100),
  }),
  apiCost: z.object({
    todayUSD: z.number(), budgetUSD: z.number(),
    miniBars: z.array(z.number()).length(7),
  }),
});

export const AgentStatusEnum = z.enum(["running", "pending", "idle"]);
export const AgentSchema = z.object({
  id: z.string(), name: z.string(), group: z.string(), avatar: z.string(),
  status: AgentStatusEnum,
  todayRuns: z.number(),
  lastRun: z.string(),
});
export const AgentListSchema = z.object({
  total: z.number(),
  items: z.array(AgentSchema),
});

export const WorkflowItemSchema = z.object({
  id: z.string(), name: z.string(), channel: z.string(),
  progressPct: z.number().min(0).max(100).optional(),
  progressLabel: z.string().optional(),
  statusLabel: z.string().optional(),
});
export const WorkflowStatusSchema = z.object({
  queued: z.array(WorkflowItemSchema),
  running: z.array(WorkflowItemSchema),
  completedToday: z.object({
    count: z.number(),
    avgDurationLabel: z.string(),
  }),
});

export const LogTagEnum = z.enum(["init", "chat", "verify", "setup", "docker", "git", "error"]);
export const LogItemSchema = z.object({
  time: z.string(),
  tag: LogTagEnum,
  description: z.string(),
  duration: z.string(),
});
export const LogsSchema = z.array(LogItemSchema);

export const SecBadgeStyleEnum = z.enum(["green", "purple", "red", "yellow"]);
export const SecuritySubCardSchema = z.object({
  id: z.string(), icon: z.string(), title: z.string(),
  badge: z.object({ label: z.string(), style: SecBadgeStyleEnum }),
  description: z.string(),
  progress: z.object({
    pct: z.number().min(0).max(100),
    color: SecBadgeStyleEnum,
    label: z.string().optional(),
  }).optional(),
});
export const SecuritySchema = z.array(SecuritySubCardSchema);

export const PlatformStatusEnum = z.enum(["connected", "configuring", "not_configured"]);
export const PlatformSchema = z.object({
  id: z.string(), name: z.string(),
  status: PlatformStatusEnum, statusLabel: z.string(),
});
export const PlatformsSchema = z.array(PlatformSchema);

export const NavItemSchema = z.object({
  id: z.string(), label: z.string(), icon: z.string(), href: z.string(),
  badge: z.number().optional(),
});
export const NavGroupSchema = z.object({
  title: z.string(),
  items: z.array(NavItemSchema),
});
export const NavSchema = z.array(NavGroupSchema);

export type Stats = z.infer<typeof StatsSchema>;
export type Agent = z.infer<typeof AgentSchema>;
export type AgentList = z.infer<typeof AgentListSchema>;
export type WorkflowStatus = z.infer<typeof WorkflowStatusSchema>;
export type LogItem = z.infer<typeof LogItemSchema>;
export type Logs = z.infer<typeof LogsSchema>;
export type SecuritySubCard = z.infer<typeof SecuritySubCardSchema>;
export type Security = z.infer<typeof SecuritySchema>;
export type Platform = z.infer<typeof PlatformSchema>;
export type NavGroup = z.infer<typeof NavGroupSchema>;
```

- [ ] **Step 2：写 smoke test**

```ts
// tests/mock-schema.test.ts
import { describe, it, expect } from "vitest";
import * as S from "@/lib/mock/schema";

describe("schema smoke", () => {
  it("AgentStatusEnum accepts valid", () => {
    expect(S.AgentStatusEnum.parse("running")).toBe("running");
  });
  it("AgentStatusEnum rejects invalid", () => {
    expect(() => S.AgentStatusEnum.parse("zombie")).toThrow();
  });
  it("StatsSchema shape", () => {
    const s = S.StatsSchema.parse({
      agents: { total: 1, active: 1, configured: 5, progressPct: 100 },
      skills: { total: 14, custom: 0, thirdParty: 14, progressPct: 35 },
      todayRuns: { count: 7, deltaPctVsYesterday: 233, progressPct: 70 },
      apiCost: { todayUSD: 0.04, budgetUSD: 10, miniBars: [1,2,3,4,5,6,7] },
    });
    expect(s.agents.total).toBe(1);
  });
});
```

- [ ] **Step 3：跑测试**

```bash
pnpm test tests/mock-schema.test.ts
# 期望：3 pass
```

- [ ] **Step 4：commit**

```bash
git add lib/mock/schema.ts tests/mock-schema.test.ts
git commit -m "feat(mock): add zod schemas for all dashboard data"
```

---

### Task 7: mock stats

**Files:**
- Create: `lib/mock/stats.ts`
- Modify: `tests/mock-schema.test.ts` 增加一条断言

- [ ] **Step 1：写数据**

```ts
// lib/mock/stats.ts
import { StatsSchema, type Stats } from "./schema";

const data: Stats = {
  agents: { total: 1, active: 1, configured: 5, progressPct: 100 },
  skills: { total: 14, custom: 0, thirdParty: 14, progressPct: 35 },
  todayRuns: { count: 7, deltaPctVsYesterday: 233, progressPct: 70 },
  apiCost: { todayUSD: 0.04, budgetUSD: 10.0, miniBars: [12, 24, 8, 30, 18, 22, 28] },
};

export const mockStats: Stats = StatsSchema.parse(data);
```

- [ ] **Step 2：测试**

```ts
// 追加到 tests/mock-schema.test.ts
import { mockStats } from "@/lib/mock/stats";
describe("mockStats", () => {
  it("通过 schema 校验", () => {
    expect(() => S.StatsSchema.parse(mockStats)).not.toThrow();
  });
});
```

```bash
pnpm test
```

- [ ] **Step 3：commit**

```bash
git add lib/mock/stats.ts tests/mock-schema.test.ts
git commit -m "feat(mock): add stats fixture with self-validation"
```

---

### Task 8: mock agents + workflows

**Files:**
- Create: `lib/mock/agents.ts`, `lib/mock/workflows.ts`
- Modify: `tests/mock-schema.test.ts`

- [ ] **Step 1：写 agents**

```ts
// lib/mock/agents.ts
import { AgentListSchema, type AgentList } from "./schema";

const data: AgentList = {
  total: 5,
  items: [
    { id: "andy",    name: "Andy",            group: "NanoClaw 默认", avatar: "🐾",
      status: "running", todayRuns: 7, lastRun: "刚刚" },
    { id: "news",    name: "知识日报 Agent",   group: "内容生产",      avatar: "📰",
      status: "pending", todayRuns: 0, lastRun: "—" },
    { id: "writer",  name: "内容写作 Agent",   group: "创作助手",      avatar: "✍️",
      status: "idle",    todayRuns: 0, lastRun: "—" },
    { id: "analyst", name: "数据分析 Agent",   group: "数据洞察",      avatar: "📊",
      status: "idle",    todayRuns: 0, lastRun: "—" },
    { id: "monitor", name: "竞品监控 Agent",   group: "情报收集",      avatar: "🔍",
      status: "idle",    todayRuns: 0, lastRun: "—" },
  ],
};

export const mockAgents: AgentList = AgentListSchema.parse(data);
```

- [ ] **Step 2：写 workflows**

```ts
// lib/mock/workflows.ts
import { WorkflowStatusSchema, type WorkflowStatus } from "./schema";

const data: WorkflowStatus = {
  queued: [],
  running: [{
    id: "andy-cli",
    name: "🐾 Andy 对话会话",
    channel: "cli channel",
    progressPct: 60,
    progressLabel: "等待用户输入",
    statusLabel: "进行中",
  }],
  completedToday: { count: 7, avgDurationLabel: "18s" },
};

export const mockWorkflows: WorkflowStatus = WorkflowStatusSchema.parse(data);
```

- [ ] **Step 3：测试 + commit**

追加到 `tests/mock-schema.test.ts`：
```ts
import { mockAgents } from "@/lib/mock/agents";
import { mockWorkflows } from "@/lib/mock/workflows";
it("mockAgents valid", () => { expect(() => S.AgentListSchema.parse(mockAgents)).not.toThrow(); });
it("mockWorkflows valid", () => { expect(() => S.WorkflowStatusSchema.parse(mockWorkflows)).not.toThrow(); });
```

```bash
pnpm test && git add -A && git commit -m "feat(mock): add agents and workflows fixtures"
```

---

### Task 9: mock logs + security

**Files:**
- Create: `lib/mock/logs.ts`, `lib/mock/security.ts`

- [ ] **Step 1：写 logs**

```ts
// lib/mock/logs.ts
import { LogsSchema, type Logs } from "./schema";

const data: Logs = [
  { time: "13:25:33", tag: "init",   description: "创建 Andy agent group via init-cli-agent.ts", duration: "0.3s" },
  { time: "13:23:10", tag: "chat",   description: "Andy ping → pong · 首次对话验证成功",        duration: "7s"   },
  { time: "13:21:05", tag: "verify", description: "setup verify failed → Claude 诊断接管",      duration: "42s"  },
  { time: "13:18:42", tag: "setup",  description: "OneCLI vault 注入 DeepSeek-V4 凭证",         duration: "1m"   },
  { time: "13:15:00", tag: "docker", description: "Docker Desktop daemon 拉起 · nanoclaw-agent:latest", duration: "45s" },
  { time: "13:08:00", tag: "git",    description: "clone NanoClaw v2.0.33 · 建立工作目录",       duration: "12s"  },
];
export const mockLogs: Logs = LogsSchema.parse(data);
```

- [ ] **Step 2：写 security**

```ts
// lib/mock/security.ts
import { SecuritySchema, type Security } from "./schema";

const data: Security = [
  { id: "cost", icon: "💰", title: "成本控制",
    badge: { label: "正常", style: "green" },
    description: "今日消耗 $0.04 / 预算 $10.00",
    progress: { pct: 0.4, color: "green", label: "预算使用率 0.4%" }},
  { id: "skill-audit", icon: "🔒", title: "Skill 审核",
    badge: { label: "14 已审核", style: "purple" },
    description: "14 个第三方 Skills 已完成审核 · 0 个等待审核",
    progress: { pct: 100, color: "purple" }},
  { id: "manual-approval", icon: "👤", title: "人工审批",
    badge: { label: "已开启", style: "green" },
    description: "高风险操作需人工审批 · 今日拦截 0 次" },
];
export const mockSecurity: Security = SecuritySchema.parse(data);
```

- [ ] **Step 3：测试 + commit**

追加测试 + `pnpm test`，然后：
```bash
git add -A && git commit -m "feat(mock): add logs and security fixtures"
```

---

### Task 10: mock platforms + nav

**Files:**
- Create: `lib/mock/platforms.ts`, `lib/mock/nav.ts`

- [ ] **Step 1：写 platforms**

```ts
// lib/mock/platforms.ts
import { PlatformsSchema, type Platform } from "./schema";

const data: Platform[] = [
  { id: "imessage", name: "iMessage", status: "connected",      statusLabel: "已连接" },
  { id: "telegram", name: "Telegram", status: "configuring",    statusLabel: "配置中" },
  { id: "discord",  name: "Discord",  status: "not_configured", statusLabel: "未配置" },
  { id: "whatsapp", name: "WhatsApp", status: "not_configured", statusLabel: "未配置" },
];
export const mockPlatforms: Platform[] = PlatformsSchema.parse(data);
```

- [ ] **Step 2：写 nav**

```ts
// lib/mock/nav.ts
import { NavSchema, type NavGroup } from "./schema";

const data: NavGroup[] = [
  { title: "导航", items: [
    { id: "home",      label: "控制台",      icon: "⊞",   href: "/" },
    { id: "agents",    label: "Agent 管理",  icon: "🤖",  href: "/agents",    badge: 1  },
    { id: "skills",    label: "Skills 市场", icon: "⚡",  href: "/skills",    badge: 14 },
    { id: "workflows", label: "工作流编排",  icon: "⚙",   href: "/workflows" },
    { id: "logs",      label: "运行日志",    icon: "📋",  href: "/logs"      },
    { id: "security",  label: "安全中心",    icon: "🛡",  href: "/security"  },
    { id: "settings",  label: "系统设置",    icon: "⚙️",  href: "/settings"  },
  ]},
  { title: "快捷操作", items: [
    { id: "new-agent",    label: "创建新 Agent", icon: "➕", href: "/agents/new"   },
    { id: "import-skill", label: "导入 Skill",   icon: "⬇",  href: "/skills/import" },
  ]},
];
export const mockNav: NavGroup[] = NavSchema.parse(data);
```

- [ ] **Step 3：测试 + commit**

```bash
pnpm test && git add -A && git commit -m "feat(mock): add platforms and nav fixtures"
```

---

### Task 11: 消息状态机 `lib/chat-state.ts`（**重点 · TDD**）

**为什么单独成一个任务**：聊天浮层的所有交互（发送、加载、超时、错误、重试、中止、消息追加）都是状态转移。先把状态机用 reducer 写透并 TDD 全覆盖，UI 层只渲染 + dispatch action，不藏逻辑。这是整个 Phase 1 最容易写错的地方。

**Files:**
- Create: `lib/chat-state.ts`
- Test: `tests/chat-state.test.ts`

#### 状态设计

```
ConversationState = {
  messages: Message[]                  // 已确认的消息
  pending: PendingMessage | null       // 当前进行中的消息
  inputDraft: string                   // 输入框内容
  error: string | null                 // 顶层错误
}

Message = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: number
  status: "delivered"
}

PendingMessage = {
  id: string
  userMessage: Message                 // 用户已发送的消息
  status: "sending" | "success" | "error" | "timeout" | "aborted"
  errorReason?: string                 // status 为 error/timeout 时
}

Actions =
  | { type: "DRAFT_CHANGED"; value: string }
  | { type: "SEND_INITIATED"; id: string; content: string; timestamp: number }
  | { type: "REPLY_RECEIVED"; id: string; content: string; timestamp: number }
  | { type: "REPLY_FAILED"; id: string; reason: string }
  | { type: "REPLY_TIMED_OUT"; id: string }
  | { type: "REPLY_ABORTED"; id: string }
  | { type: "RETRY"; id: string }       // 把失败消息重新放回 draft
  | { type: "CLEAR_ERROR" }
  | { type: "RESET" }
```

- [ ] **Step 1：写测试（先红）**

```ts
// tests/chat-state.test.ts
import { describe, it, expect } from "vitest";
import { initialState, reducer, canSend, type State } from "@/lib/chat-state";

const t = 1700000000000;

describe("chat-state · initial", () => {
  it("初始状态干净", () => {
    expect(initialState.messages).toEqual([]);
    expect(initialState.pending).toBeNull();
    expect(initialState.inputDraft).toBe("");
    expect(initialState.error).toBeNull();
  });
});

describe("chat-state · DRAFT_CHANGED", () => {
  it("更新 inputDraft", () => {
    const s = reducer(initialState, { type: "DRAFT_CHANGED", value: "hi" });
    expect(s.inputDraft).toBe("hi");
  });
});

describe("chat-state · SEND_INITIATED", () => {
  it("把 userMessage 放进 pending，清空 draft", () => {
    const s1 = reducer(initialState, { type: "DRAFT_CHANGED", value: "ping" });
    const s2 = reducer(s1, { type: "SEND_INITIATED", id: "m1", content: "ping", timestamp: t });
    expect(s2.inputDraft).toBe("");
    expect(s2.pending).not.toBeNull();
    expect(s2.pending!.id).toBe("m1");
    expect(s2.pending!.status).toBe("sending");
    expect(s2.pending!.userMessage.content).toBe("ping");
    expect(s2.pending!.userMessage.role).toBe("user");
    expect(s2.messages).toEqual([]);
  });
  it("已有 pending 时拒绝二次发送（保持原状）", () => {
    const s1 = reducer(initialState, { type: "SEND_INITIATED", id: "m1", content: "a", timestamp: t });
    const s2 = reducer(s1, { type: "SEND_INITIATED", id: "m2", content: "b", timestamp: t + 1 });
    expect(s2.pending!.id).toBe("m1");
  });
});

describe("chat-state · REPLY_RECEIVED", () => {
  it("把 user message 和 assistant reply 一起 append 到 messages", () => {
    const s1 = reducer(initialState, { type: "SEND_INITIATED", id: "m1", content: "ping", timestamp: t });
    const s2 = reducer(s1, { type: "REPLY_RECEIVED", id: "m1", content: "pong", timestamp: t + 100 });
    expect(s2.pending).toBeNull();
    expect(s2.messages.length).toBe(2);
    expect(s2.messages[0].role).toBe("user");
    expect(s2.messages[0].content).toBe("ping");
    expect(s2.messages[1].role).toBe("assistant");
    expect(s2.messages[1].content).toBe("pong");
    expect(s2.error).toBeNull();
  });
  it("id 不匹配时忽略（防错乱）", () => {
    const s1 = reducer(initialState, { type: "SEND_INITIATED", id: "m1", content: "ping", timestamp: t });
    const s2 = reducer(s1, { type: "REPLY_RECEIVED", id: "m9", content: "stale", timestamp: t });
    expect(s2.pending!.id).toBe("m1");
    expect(s2.messages.length).toBe(0);
  });
});

describe("chat-state · REPLY_FAILED / TIMED_OUT / ABORTED", () => {
  function setup(): State {
    return reducer(initialState, { type: "SEND_INITIATED", id: "m1", content: "ping", timestamp: t });
  }
  it("FAILED 保留 user 消息 + 在 pending 标记 error", () => {
    const s = reducer(setup(), { type: "REPLY_FAILED", id: "m1", reason: "spawn err" });
    expect(s.pending!.status).toBe("error");
    expect(s.pending!.errorReason).toBe("spawn err");
    expect(s.error).toBe("spawn err");
    expect(s.messages.length).toBe(1);
    expect(s.messages[0].role).toBe("user");
  });
  it("TIMED_OUT", () => {
    const s = reducer(setup(), { type: "REPLY_TIMED_OUT", id: "m1" });
    expect(s.pending!.status).toBe("timeout");
    expect(s.error).toMatch(/超时/);
  });
  it("ABORTED", () => {
    const s = reducer(setup(), { type: "REPLY_ABORTED", id: "m1" });
    expect(s.pending!.status).toBe("aborted");
    expect(s.messages.length).toBe(1);
  });
});

describe("chat-state · RETRY", () => {
  it("把失败消息内容塞回 draft，清掉 pending 和 error", () => {
    const s1 = reducer(initialState, { type: "SEND_INITIATED", id: "m1", content: "ping", timestamp: t });
    const s2 = reducer(s1, { type: "REPLY_FAILED", id: "m1", reason: "x" });
    const s3 = reducer(s2, { type: "RETRY", id: "m1" });
    expect(s3.inputDraft).toBe("ping");
    expect(s3.pending).toBeNull();
    expect(s3.error).toBeNull();
    // user 消息应被移除（避免重复）
    expect(s3.messages.length).toBe(0);
  });
});

describe("chat-state · CLEAR_ERROR / RESET", () => {
  it("CLEAR_ERROR 仅清掉 error", () => {
    const s1 = reducer(initialState, { type: "SEND_INITIATED", id: "m1", content: "x", timestamp: t });
    const s2 = reducer(s1, { type: "REPLY_FAILED", id: "m1", reason: "boom" });
    const s3 = reducer(s2, { type: "CLEAR_ERROR" });
    expect(s3.error).toBeNull();
    expect(s3.pending).not.toBeNull();
  });
  it("RESET 回到 initialState", () => {
    const s1 = reducer(initialState, { type: "SEND_INITIATED", id: "m1", content: "x", timestamp: t });
    expect(reducer(s1, { type: "RESET" })).toEqual(initialState);
  });
});

describe("chat-state · canSend", () => {
  it("有非空 draft 且无 pending → true", () => {
    expect(canSend({ ...initialState, inputDraft: "hi" })).toBe(true);
  });
  it("draft 全空格 → false", () => {
    expect(canSend({ ...initialState, inputDraft: "   " })).toBe(false);
  });
  it("有 pending sending → false", () => {
    const s1 = reducer(initialState, { type: "DRAFT_CHANGED", value: "x" });
    const s2 = reducer(s1, { type: "SEND_INITIATED", id: "m1", content: "x", timestamp: t });
    // 此时 draft 已被清空，但模拟用户又输入
    expect(canSend({ ...s2, inputDraft: "y" })).toBe(false);
  });
});
```

- [ ] **Step 2：跑测试确认全红**

```bash
pnpm test tests/chat-state.test.ts
# 期望：全部 fail
```

- [ ] **Step 3：实现 lib/chat-state.ts**

```ts
// lib/chat-state.ts
export type Role = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  status: "delivered";
}

export type PendingStatus = "sending" | "success" | "error" | "timeout" | "aborted";

export interface PendingMessage {
  id: string;
  userMessage: Message;
  status: PendingStatus;
  errorReason?: string;
}

export interface State {
  messages: Message[];
  pending: PendingMessage | null;
  inputDraft: string;
  error: string | null;
}

export type Action =
  | { type: "DRAFT_CHANGED"; value: string }
  | { type: "SEND_INITIATED"; id: string; content: string; timestamp: number }
  | { type: "REPLY_RECEIVED"; id: string; content: string; timestamp: number }
  | { type: "REPLY_FAILED"; id: string; reason: string }
  | { type: "REPLY_TIMED_OUT"; id: string }
  | { type: "REPLY_ABORTED"; id: string }
  | { type: "RETRY"; id: string }
  | { type: "CLEAR_ERROR" }
  | { type: "RESET" };

export const initialState: State = {
  messages: [],
  pending: null,
  inputDraft: "",
  error: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "DRAFT_CHANGED":
      return { ...state, inputDraft: action.value };

    case "SEND_INITIATED": {
      if (state.pending) return state;  // 拒绝二次发送
      const userMessage: Message = {
        id: action.id,
        role: "user",
        content: action.content,
        timestamp: action.timestamp,
        status: "delivered",
      };
      return {
        ...state,
        inputDraft: "",
        pending: { id: action.id, userMessage, status: "sending" },
        error: null,
      };
    }

    case "REPLY_RECEIVED": {
      if (!state.pending || state.pending.id !== action.id) return state;
      const assistant: Message = {
        id: `${action.id}-r`,
        role: "assistant",
        content: action.content,
        timestamp: action.timestamp,
        status: "delivered",
      };
      return {
        ...state,
        messages: [...state.messages, state.pending.userMessage, assistant],
        pending: null,
        error: null,
      };
    }

    case "REPLY_FAILED":
    case "REPLY_TIMED_OUT":
    case "REPLY_ABORTED": {
      if (!state.pending || state.pending.id !== action.id) return state;
      const status: PendingStatus =
        action.type === "REPLY_FAILED" ? "error" :
        action.type === "REPLY_TIMED_OUT" ? "timeout" : "aborted";
      const reason =
        action.type === "REPLY_FAILED" ? action.reason :
        action.type === "REPLY_TIMED_OUT" ? "聊天超时（120s）" :
        "已中止";
      return {
        ...state,
        // 失败时也把 user message append（避免用户输入丢失感）
        messages: [...state.messages, state.pending.userMessage],
        pending: { ...state.pending, status, errorReason: reason },
        error: status === "aborted" ? null : reason,
      };
    }

    case "RETRY": {
      if (!state.pending || state.pending.id !== action.id) return state;
      // 把失败前的 user message 从 messages 里抽掉，内容塞回 draft
      const lastIdx = state.messages.findLastIndex(m => m.id === action.id);
      const messages = lastIdx >= 0
        ? [...state.messages.slice(0, lastIdx), ...state.messages.slice(lastIdx + 1)]
        : state.messages;
      return {
        ...state,
        inputDraft: state.pending.userMessage.content,
        messages,
        pending: null,
        error: null,
      };
    }

    case "CLEAR_ERROR":
      return { ...state, error: null };

    case "RESET":
      return initialState;
  }
}

export function canSend(state: State): boolean {
  return !state.pending && state.inputDraft.trim().length > 0;
}
```

- [ ] **Step 4：跑测试全绿**

```bash
pnpm test tests/chat-state.test.ts
# 期望：所有 it 全部 pass
```

- [ ] **Step 5：commit**

```bash
git add lib/chat-state.ts tests/chat-state.test.ts
git commit -m "feat(chat): add message state machine with TDD coverage"
```

---

### Task 12: NanoClaw contract + `/api/chat` route

**Files:**
- Create: `lib/nanoclaw/contract.ts`, `app/api/chat/route.ts`
- Test: `tests/api-chat.test.ts`

- [ ] **Step 1：写 contract（集中所有 NanoClaw 假设）**

```ts
// lib/nanoclaw/contract.ts
import path from "path";

export const NANOCLAW_ROOT =
  process.env.NANOCLAW_ROOT ||
  path.join(process.env.HOME || "", "projects", "nanoclaw-fork", "nanoclaw-v2");

export const CHAT_CMD = "pnpm";
export const CHAT_ARGS = (msg: string) => ["run", "chat", msg];
export const CHAT_TIMEOUT_MS = 120_000;

/** 过滤 pnpm/tsx 启动器输出，只保留真实 agent 回复 */
export function stripPnpmWrapper(text: string): string {
  return text
    .split("\n")
    .filter(line =>
      !/^>\s+nanoclaw@/.test(line) &&
      !/^>\s+tsx\s+/.test(line) &&
      !/^\s*$/.test(line)
    )
    .join("\n")
    .trim();
}
```

- [ ] **Step 2：写 route**

```ts
// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import {
  NANOCLAW_ROOT, CHAT_CMD, CHAT_ARGS, CHAT_TIMEOUT_MS, stripPnpmWrapper,
} from "@/lib/nanoclaw/contract";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const message = (body as { message?: unknown })?.message;
  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Missing or empty message" }, { status: 400 });
  }
  const trimmed = message.trim();

  return new Promise<NextResponse>((resolve) => {
    const proc = spawn(CHAT_CMD, CHAT_ARGS(trimmed), {
      cwd: NANOCLAW_ROOT, shell: false, env: { ...process.env },
    });
    let stdout = "", stderr = "";
    let responded = false;
    const respond = (r: NextResponse) => { if (!responded) { responded = true; resolve(r); } };

    proc.stdout.on("data", d => { stdout += d.toString(); });
    proc.stderr.on("data", d => { stderr += d.toString(); });

    proc.on("close", () => {
      const reply = stripPnpmWrapper(stdout || stderr || "") || "(Andy 没有返回内容)";
      respond(NextResponse.json({ reply }));
    });
    proc.on("error", err => {
      respond(NextResponse.json(
        { error: "Failed to spawn chat process: " + err.message },
        { status: 500 },
      ));
    });

    const timer = setTimeout(() => {
      proc.kill();
      respond(NextResponse.json(
        { error: "Chat process timed out after 120 seconds" },
        { status: 504 },
      ));
    }, CHAT_TIMEOUT_MS);
    proc.on("close", () => clearTimeout(timer));
  });
}
```

- [ ] **Step 3：写测试（mock spawn）**

```ts
// tests/api-chat.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { stripPnpmWrapper } from "@/lib/nanoclaw/contract";

describe("stripPnpmWrapper", () => {
  it("过滤 pnpm 标头和空行", () => {
    const input = `> nanoclaw@2.0.33 chat\n> tsx scripts/chat.ts\n\nHello\n`;
    expect(stripPnpmWrapper(input)).toBe("Hello");
  });
  it("不包含污染时原样返回", () => {
    expect(stripPnpmWrapper("Hi\nThere")).toBe("Hi\nThere");
  });
});

// route 端到端测试用 contract 模拟即可，spawn 的 mock 这里走 manual-fetch 路径
describe("POST /api/chat (light)", () => {
  it("空 message 应 400", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const req = new Request("http://x/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: "  " }),
    }) as any;
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
  it("非 JSON body 应 400", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const req = new Request("http://x/api/chat", {
      method: "POST", body: "not json",
    }) as any;
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
```

- [ ] **Step 4：跑测试**

```bash
pnpm test tests/api-chat.test.ts
# 期望：4 pass
```

- [ ] **Step 5：commit**

```bash
git add lib/nanoclaw/contract.ts app/api/chat/route.ts tests/api-chat.test.ts
git commit -m "feat(api): add /api/chat route with NanoClaw spawn contract"
```
