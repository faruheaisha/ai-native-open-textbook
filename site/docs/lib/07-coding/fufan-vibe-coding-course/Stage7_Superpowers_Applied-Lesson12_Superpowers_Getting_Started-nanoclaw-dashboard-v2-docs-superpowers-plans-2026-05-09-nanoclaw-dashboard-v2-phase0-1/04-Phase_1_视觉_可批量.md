---
title: "Phase 1 · 视觉（可批量）"
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
pageSha256: "8b6858988fbe2aa80d89aaa2b86b973d151338b7a0d7b4a75ffce0e7d1ff71d2"
contentMode: "local-full"
zh: ""
---

# Phase 1 · 视觉（可批量）

> **批量原则**：Task 13/14/15/17 每个里包含多个静态展示组件，全部纯 props 驱动、无业务逻辑分支、消费 Task 5 的 format 函数与 Task 6 的 schema 类型。每个任务结束时 `pnpm dev` 浏览器目测一次即可，无需写组件单测（visual diff 雏形截图）。

---

### Task 13: 批量 - Sidebar + Topbar + Dashboard layout

**Files:**
- Create: `components/shell/sidebar.tsx`, `components/shell/topbar.tsx`, `app/(dashboard)/layout.tsx`

- [ ] **Step 1：Sidebar**（消费 `mockNav` + `mockPlatforms`）

```tsx
// components/shell/sidebar.tsx
import Link from "next/link";
import { mockNav } from "@/lib/mock/nav";
import { mockPlatforms } from "@/lib/mock/platforms";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

const dotByStatus = {
  connected:      "bg-green shadow-[0_0_5px_#22c55e]",
  configuring:    "bg-yellow",
  not_configured: "bg-[#444]",
} as const;

export function Sidebar({ activeHref = "/" }: { activeHref?: string }) {
  return (
    <aside className="w-60 min-w-60 bg-card border-r border-border flex flex-col h-screen overflow-y-auto shrink-0">
      <div className="px-4 py-5 pb-4 border-b border-border flex items-center gap-2.5">
        <div className="w-9 h-9 bg-accent rounded-[9px] flex items-center justify-center text-xl shrink-0 shadow-accent-glow">
          {BRAND.logo}
        </div>
        <div className="flex flex-col">
          <div className="text-[15px] font-bold tracking-tight">{BRAND.name}</div>
          <div className="text-[11px] text-text-weak">{BRAND.version}</div>
        </div>
      </div>

      {mockNav.map(group => (
        <div className="px-2 pt-4 pb-1" key={group.title}>
          <div className="text-[10px] font-semibold tracking-wider uppercase text-text-weak px-2 pb-1.5">
            {group.title}
          </div>
          {group.items.map(item => (
            <Link key={item.id} href={item.href} className={cn(
              "flex items-center gap-2.5 px-2 py-1.5 rounded-btn text-[13.5px] text-text-sub hover:bg-white/5 hover:text-text transition-colors mb-px",
              activeHref === item.href && "bg-accent-dim text-accent font-medium",
            )}>
              <span className="w-4 text-center text-sm">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="ml-auto bg-accent-dim text-accent text-[10px] font-semibold px-1.5 py-px rounded-[10px]">
                  {item.badge}
                </span>
              )}
          ))}
        </div>
      ))}

      <div className="mt-auto px-2 pt-3 pb-4 border-t border-border">
        <div className="text-[10px] font-semibold tracking-wider uppercase text-text-weak px-2 pb-2">
          平台连接
        </div>
        {mockPlatforms.map(p => (
          <div key={p.id} className="flex items-center gap-2 px-2 py-1.5 text-[12.5px] text-text-sub">
            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotByStatus[p.status])} />
            <span>{p.name}</span>
            <span className="ml-auto text-[11px] text-text-weak">{p.statusLabel}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
```

- [ ] **Step 2：Topbar**

```tsx
// components/shell/topbar.tsx
export function Topbar() {
  return (
    <header className="h-15 min-h-15 bg-card border-b border-border flex items-center px-6 gap-3" style={{ height: 60, minHeight: 60 }}>
      <div className="flex-1 max-w-[420px] relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-weak text-sm">🔍</span>
        <input
          disabled
          placeholder="搜索 Agent / Skill / 日志…（Phase 2 开放）"
          className="w-full bg-bg border border-border rounded-btn py-1.5 pl-9 pr-12 text-[13px] text-text outline-none focus:border-accent"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-text-weak border border-border px-1.5 py-px rounded">⌘K</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2 text-[12px] text-text-sub">
        <span className="px-2 py-1 rounded-btn bg-green-dim text-green">● 在线</span>
      </div>
      <div className="w-9 h-9 rounded-full bg-accent-dim text-accent font-semibold flex items-center justify-center text-[13px]" title="木羽">
        MY
      </div>
    </header>
  );
}
```

- [ ] **Step 3：(dashboard)/layout.tsx**

```tsx
// app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 4：手动验证 + commit**

```bash
pnpm dev
# 浏览器开 / ，确认看到完整的 sidebar（含 9 项导航 + 平台连接）+ topbar
git add -A && git commit -m "feat(shell): add sidebar, topbar, dashboard layout"
```

---

### Task 14: 批量 - PageHeader + StatsGrid + StatCard + MiniBars

**Files:**
- Create: `components/dashboard/\{page-header,stat-card,stats-grid,mini-bars\}.tsx`

- [ ] **Step 1：写 4 个文件**

```tsx
// components/dashboard/page-header.tsx
export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="text-[22px] font-bold tracking-tight leading-tight">{title}</div>
        <div className="text-[13px] text-text-sub mt-1">{subtitle}</div>
      </div>
    </div>
  );
}
```

```tsx
// components/dashboard/mini-bars.tsx
export function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-1 h-9 mt-2">
      {values.map((v, i) => (
        <div key={i} className="w-2 rounded-sm bg-accent/60"
             style={{ height: `${Math.max(8, (v / max) * 100)}%` }} />
      ))}
    </div>
  );
}
```

```tsx
// components/dashboard/stat-card.tsx
import { cn } from "@/lib/utils";
import { MiniBars } from "./mini-bars";

export type StatCardProps = {
  label: string;
  value: string;
  sub?: React.ReactNode;
  progress?: number;
  miniBars?: number[];
  bigValue?: boolean;
};

export function StatCard({ label, value, sub, progress, miniBars, bigValue }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-card p-4 hover:border-border-hover hover:bg-card-hover transition-colors shadow-card">
      <div className="text-[13px] text-text-sub">{label}</div>
      <div className={cn("font-bold tracking-tighter mt-2", bigValue ? "text-[36px]" : "text-[28px]")}>
        {value}
      </div>
      {sub && <div className="text-[12px] text-text-sub mt-1 flex items-center gap-1">{sub}</div>}
      {progress !== undefined && (
        <div className="h-1 bg-border rounded-full overflow-hidden mt-3">
          <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
      )}
      {miniBars && <MiniBars values={miniBars} />}
    </div>
  );
}
```

```tsx
// components/dashboard/stats-grid.tsx
import { type Stats } from "@/lib/mock/schema";
import { formatCurrencyUSD, formatCount, formatDelta, formatPercent } from "@/lib/format";
import { StatCard } from "./stat-card";

export function StatsGrid({ data }: { data: Stats }) {
  const delta = formatDelta(data.todayRuns.deltaPctVsYesterday);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <StatCard label="🤖 Agent 总数" value={formatCount(data.agents.total)}
        sub={<>已激活 {data.agents.active} <span className="text-text-weak">/</span> 配置 {data.agents.configured}</>}
        progress={data.agents.progressPct} />
      <StatCard label="⚡ Skills 总数" value={formatCount(data.skills.total)}
        sub={<>{data.skills.custom} 自定义 <span className="text-text-weak">/</span> {data.skills.thirdParty} 第三方</>}
        progress={data.skills.progressPct} />
      <StatCard label="⚡ 今日执行" value={formatCount(data.todayRuns.count)}
        sub={<><span className={delta.direction === "up" ? "text-green" : delta.direction === "down" ? "text-red" : "text-text-sub"}>{delta.label}</span> 较昨日同期</>}
        progress={data.todayRuns.progressPct} />
      <StatCard label="💰 API 消耗" value={formatCurrencyUSD(data.apiCost.todayUSD)} bigValue
        sub={<span className="flex justify-between w-full">
          <span>预算 {formatCurrencyUSD(data.apiCost.budgetUSD)}</span>
          <span>{formatPercent((data.apiCost.todayUSD / data.apiCost.budgetUSD) * 100)}</span>
        </span>}
        miniBars={data.apiCost.miniBars} />
    </div>
  );
}
```

- [ ] **Step 2：commit**

```bash
git add -A && git commit -m "feat(dashboard): add page header and stats grid"
```

---

### Task 15: 批量 - PanelCard + 4 面板（AgentTable / WorkflowStatus / RecentLogs / SecurityPanel）

**Files:**
- Create: `components/dashboard/\{panel-card,agent-table,workflow-status,recent-logs,security-panel\}.tsx`

- [ ] **Step 1：PanelCard 通用外壳**

```tsx
// components/dashboard/panel-card.tsx
export function PanelCard({
  title, count, link, children,
}: {
  title: React.ReactNode; count?: string; link?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-card overflow-hidden shadow-card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="text-[14px] font-semibold tracking-tight">
          {title} {count && <span className="text-text-weak font-normal">· {count}</span>}
        </div>
        {link && <div className="text-[12px] text-accent cursor-pointer hover:underline">{link}</div>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2：AgentTable**

```tsx
// components/dashboard/agent-table.tsx
import { type AgentList } from "@/lib/mock/schema";
import { formatRunCount } from "@/lib/format";
import { cn } from "@/lib/utils";
import { PanelCard } from "./panel-card";

const statusStyles = {
  running: { dot: "bg-green shadow-[0_0_5px_#22c55e]", label: "运行中", badge: "bg-green-dim text-green" },
  pending: { dot: "bg-yellow",                          label: "待配置", badge: "bg-yellow/15 text-yellow" },
  idle:    { dot: "bg-[#444]",                          label: "未启用", badge: "bg-white/5 text-text-weak" },
} as const;

export function AgentTable({ data }: { data: AgentList }) {
  return (
      <table className="w-full text-[13px]">
        <thead className="text-[10px] uppercase tracking-wider text-text-weak">
          <tr><th className="text-left pb-3">Agent 名称</th><th className="text-left pb-3">状态</th>
              <th className="text-left pb-3">今日执行</th><th className="text-left pb-3">最后运行</th></tr>
        </thead>
        <tbody>
          {data.items.map(a => {
            const s = statusStyles[a.status];
            const dim = a.status !== "running";
            return (
              <tr key={a.id} className="border-t border-border">
                <td className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("w-7 h-7 rounded-md flex items-center justify-center text-sm shrink-0", dim ? "bg-white/5" : "bg-accent-dim")}>
                      {a.avatar}
                    </div>
                    <div>
                      <div className={cn("font-medium", dim ? "text-text-weak" : "text-text")}>{a.name}</div>
                      <div className="text-[11px] text-text-weak">{a.group}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-badge text-[11px]", s.badge)}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", s.dot)} /> {s.label}
                  </span>
                </td>
                <td className={cn("text-[13px]", dim && "text-text-weak")}>{formatRunCount(a.todayRuns)}</td>
                <td className="text-[13px] text-text-sub">{a.lastRun}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  );
}
```

- [ ] **Step 3：WorkflowStatus**

```tsx
// components/dashboard/workflow-status.tsx
import { type WorkflowStatus as WS } from "@/lib/mock/schema";
import { PanelCard } from "./panel-card";

export function WorkflowStatus({ data }: { data: WS }) {
  return (
      <div className="space-y-4">
        {/* 排队中 */}
          {data.queued.length === 0
            ? <div className="text-[12px] text-text-weak">暂无排队任务</div>
            : data.queued.map(it => <Item key={it.id} name={it.name} channel={it.channel} />)}
        <hr className="border-border" />
        {/* 执行中 */}
          {data.running.map(it => (
            <div key={it.id} className="bg-bg border border-border rounded-btn p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="text-[13px] font-medium">{it.name}</div>
                <div className="text-[11px] text-text-weak px-2 py-0.5 rounded-badge bg-white/5">{it.channel}</div>
              </div>
              {it.progressPct !== undefined && (
                <>
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${it.progressPct}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-text-sub mt-1.5">
                    <span>{it.progressLabel}</span>
                    <span className="text-accent">{it.statusLabel}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        <hr className="border-border" />
        {/* 已完成 */}
          <div className="text-[12px] text-text-sub">
            ✓&nbsp;&nbsp;今日已完成 {data.completedToday.count} 次执行，平均耗时 {data.completedToday.avgDurationLabel}
          </div>
      </div>
  );
}

function Group({ color, label, count, children }:
  { color: string; label: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 text-[12px]">
        <span className={color}>●</span>
        <span className="text-text-sub">{label}</span>
        <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded-pill text-text-weak">{count}</span>
      </div>
      <div className="space-y-2 pl-3">{children}</div>
    </div>
  );
}
function Item({ name, channel }: { name: string; channel: string }) {
  return <div className="text-[12px] text-text-sub">{name} · <span className="text-text-weak">{channel}</span></div>;
}
```

- [ ] **Step 4：RecentLogs**

```tsx
// components/dashboard/recent-logs.tsx
import { type Logs } from "@/lib/mock/schema";
import { PanelCard } from "./panel-card";
import { cn } from "@/lib/utils";

const tagStyles: Record<string, string> = {
  init:   "bg-accent-dim text-accent",
  chat:   "bg-green-dim text-green",
  verify: "bg-red-dim text-red",
  setup:  "bg-blue-dim text-blue",
  docker: "bg-purple-dim text-purple",
  git:    "bg-white/5 text-text-sub",
  error:  "bg-red-dim text-red",
};

export function RecentLogs({ data }: { data: Logs }) {
  return (
      <div className="space-y-2.5">
        {data.map((l, i) => (
          <div key={i} className="grid grid-cols-[78px_72px_1fr_auto] items-center gap-3 text-[13px]">
            <div className="text-[11px] text-text-weak font-mono">{l.time}</div>
            <div className={cn("text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-badge text-center", tagStyles[l.tag])}>
              {l.tag}
            </div>
            <div className="text-text truncate">{l.description}</div>
            <div className="text-[11px] text-text-weak">{l.duration}</div>
          </div>
        ))}
      </div>
  );
}
```

- [ ] **Step 5：SecurityPanel**

```tsx
// components/dashboard/security-panel.tsx
import { type Security } from "@/lib/mock/schema";
import { PanelCard } from "./panel-card";
import { cn } from "@/lib/utils";

const badgeStyles = {
  green:  "bg-green-dim text-green",
  purple: "bg-purple-dim text-purple",
  red:    "bg-red-dim text-red",
  yellow: "bg-yellow/15 text-yellow",
} as const;
const fillStyles = {
  green:  "bg-green",
  purple: "bg-purple",
  red:    "bg-red",
  yellow: "bg-yellow",
} as const;

export function SecurityPanel({ data }: { data: Security }) {
  return (
      <div className="space-y-3">
        {data.map(c => (
          <div key={c.id} className="bg-bg border border-border rounded-btn p-3">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[13px] font-medium">{c.icon} {c.title}</div>
              <span className={cn("text-[11px] px-2 py-0.5 rounded-badge", badgeStyles[c.badge.style])}>
                {c.badge.label}
              </span>
            </div>
            <div className="text-[12px] text-text-sub">{c.description}</div>
            {c.progress && (
              <>
                <div className="h-1 bg-border rounded-full overflow-hidden mt-2">
                  <div className={cn("h-full", fillStyles[c.progress.color])} style={{ width: `${c.progress.pct}%` }} />
                </div>
                {c.progress.label && <div className="text-[11px] text-text-weak mt-1">{c.progress.label}</div>}
              </>
            )}
          </div>
        ))}
      </div>
  );
}
```

- [ ] **Step 6：commit**

```bash
git add -A && git commit -m "feat(dashboard): add 4 panels (agents, workflows, logs, security)"
```

---

### Task 16: 装配主页 page.tsx

**Files:**
- Create: `app/(dashboard)/page.tsx`

- [ ] **Step 1：写 page.tsx**

```tsx
// app/(dashboard)/page.tsx
import { PageHeader } from "@/components/dashboard/page-header";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { AgentTable } from "@/components/dashboard/agent-table";
import { WorkflowStatus } from "@/components/dashboard/workflow-status";
import { RecentLogs } from "@/components/dashboard/recent-logs";
import { SecurityPanel } from "@/components/dashboard/security-panel";
import { mockStats } from "@/lib/mock/stats";
import { mockAgents } from "@/lib/mock/agents";
import { mockWorkflows } from "@/lib/mock/workflows";
import { mockLogs } from "@/lib/mock/logs";
import { mockSecurity } from "@/lib/mock/security";

export default function ConsolePage() {
  return (
    <>
      <PageHeader title="控制台"
        subtitle={`欢迎回来，所有系统运行正常 · 今天已处理 ${mockStats.todayRuns.count} 次对话`} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      </div>
    </>
  );
}
```

- [ ] **Step 2：手动验证**

```bash
pnpm dev
# 浏览器开 / ，并排雏形 http://127.0.0.1:7777 比对
# 确认 4 卡 + 双栏 4 面板都到位
```

- [ ] **Step 3：commit**

```bash
git add -A && git commit -m "feat(dashboard): assemble console main page"
```

---

### Task 17: 批量 - EmptyState 组件 + 8 个子页

**Files:**
- Create: `components/shell/empty-state.tsx`
- Create: 8 个 `app/(dashboard)/<route>/page.tsx`

- [ ] **Step 1：EmptyState 组件**

```tsx
// components/shell/empty-state.tsx
import { PageHeader } from "@/components/dashboard/page-header";

export function EmptyState({
  title, subtitle, icon, phase = "Phase 2",
}: {
  title: string; subtitle: string; icon: string; phase?: "Phase 2" | "Phase 3";
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <div className="text-[15px] text-text font-semibold mb-1">该功能将在 {phase} 开放</div>
        <div className="text-[13px] text-text-sub max-w-md">
          目前已在 Phase 1 中保留入口，避免空链接。下个阶段会接入真实数据并提供完整交互。
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2：8 个子页（高度雷同，逐个写）**

```tsx
// app/(dashboard)/agents/page.tsx
import { EmptyState } from "@/components/shell/empty-state";
export default function Page() {
  return <EmptyState icon="🤖" title="Agent 管理" subtitle="管理所有 agent group · 启停 · 编辑配置" phase="Phase 3" />;
}
```

```tsx
// app/(dashboard)/skills/page.tsx
import { EmptyState } from "@/components/shell/empty-state";
export default function Page() {
  return <EmptyState icon="⚡" title="Skills 市场" subtitle="浏览/启用/审核第三方 Skills" phase="Phase 3" />;
}
```

```tsx
// app/(dashboard)/workflows/page.tsx
import { EmptyState } from "@/components/shell/empty-state";
export default function Page() {
  return <EmptyState icon="⚙" title="工作流编排" subtitle="创建/编辑/触发 cron 任务" phase="Phase 3" />;
}
```

```tsx
// app/(dashboard)/logs/page.tsx
import { EmptyState } from "@/components/shell/empty-state";
export default function Page() {
  return <EmptyState icon="📋" title="运行日志" subtitle="实时查看 agent 执行日志与报错" phase="Phase 3" />;
}
```

```tsx
// app/(dashboard)/security/page.tsx
import { EmptyState } from "@/components/shell/empty-state";
export default function Page() {
  return <EmptyState icon="🛡" title="安全中心" subtitle="权限审计 · 敏感操作记录 · 成本告警" phase="Phase 3" />;
}
```

```tsx
// app/(dashboard)/settings/page.tsx
import { EmptyState } from "@/components/shell/empty-state";
export default function Page() {
  return <EmptyState icon="⚙️" title="系统设置" subtitle="API key 管理 · 模型切换 · 全局参数" phase="Phase 3" />;
}
```

```tsx
// app/(dashboard)/agents/new/page.tsx
import { EmptyState } from "@/components/shell/empty-state";
export default function Page() {
  return <EmptyState icon="➕" title="创建新 Agent" subtitle="向导式创建 agent group" phase="Phase 3" />;
}
```

```tsx
// app/(dashboard)/skills/import/page.tsx
import { EmptyState } from "@/components/shell/empty-state";
export default function Page() {
  return <EmptyState icon="⬇" title="导入 Skill" subtitle="从仓库或本地导入 skill" phase="Phase 3" />;
}
```

- [ ] **Step 3：手动验证**

```bash
pnpm dev
# 点击 sidebar 8 个非控制台入口，确认每个都有 EmptyState，无 404
```

- [ ] **Step 4：commit**

```bash
git add -A && git commit -m "feat(empty): add EmptyState component and 8 placeholder pages"
```

---

### Task 18: ChatFab + ChatPanel + ChatMessage（消费状态机）

**Files:**
- Create: `components/chat/\{chat-fab,chat-panel,chat-message\}.tsx`
- Modify: `app/(dashboard)/layout.tsx`（挂 ChatFab）

- [ ] **Step 1：ChatMessage（纯展示）**

```tsx
// components/chat/chat-message.tsx
"use client";
import { type Message } from "@/lib/chat-state";
import { cn } from "@/lib/utils";

export function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  const time = new Date(msg.timestamp).toLocaleTimeString("zh-CN", { hour12: false });
  return (
    <div className={cn("mb-3 max-w-[85%]", isUser ? "ml-auto" : "")}>
      <div className={cn(
        "rounded-btn px-3 py-2 text-[13.5px] leading-relaxed whitespace-pre-wrap break-words",
        isUser ? "bg-accent text-bg" : "bg-card border border-border text-text",
      )}>{msg.content}</div>
      <div className={cn("text-[10px] text-text-weak mt-1", isUser ? "text-right" : "")}>{time}</div>
    </div>
  );
}
```

- [ ] **Step 2：ChatPanel（消费状态机）**

```tsx
// components/chat/chat-panel.tsx
"use client";
import { useReducer, useRef, useEffect } from "react";
import { reducer, initialState, canSend, type Message } from "@/lib/chat-state";
import { BRAND } from "@/lib/brand";
import { ChatMessage } from "./chat-message";
import { cn } from "@/lib/utils";

const greetingMsg: Message = {
  id: "sys-greeting", role: "system",
  content: BRAND.greeting, timestamp: 0, status: "delivered",
};

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [state.messages, state.pending]);

  async function send() {
    if (!canSend(state)) return;
    const id = `m-${Date.now()}`;
    const content = state.inputDraft.trim();
    dispatch({ type: "SEND_INITIATED", id, content, timestamp: Date.now() });
    try {
      const resp = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });
      const data = await resp.json();
      if (resp.ok) {
        dispatch({ type: "REPLY_RECEIVED", id, content: data.reply, timestamp: Date.now() });
      } else if (resp.status === 504) {
        dispatch({ type: "REPLY_TIMED_OUT", id });
      } else {
        dispatch({ type: "REPLY_FAILED", id, reason: data.error || "未知错误" });
      }
    } catch (e) {
      dispatch({ type: "REPLY_FAILED", id, reason: (e as Error).message });
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  if (!open) return null;
  const failedPending = state.pending && state.pending.status !== "sending";

  return (
    <div className="fixed bottom-24 right-6 w-[380px] h-[560px] bg-card border border-border rounded-card shadow-2xl flex flex-col z-50 overflow-hidden">
      <header className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span>{BRAND.logo}</span>
          <span className="font-semibold text-[14px]">和 {BRAND.agentDefault} 对话</span>
          <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_5px_#22c55e]" />
        </div>
        <button onClick={onClose} className="text-text-weak hover:text-text">✕</button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
        {state.messages.map(m => <ChatMessage key={m.id} msg={m} />)}
        {state.pending?.status === "sending" && (
          <div className="text-[12px] text-text-weak italic">Andy 正在思考…</div>
        )}
        {failedPending && state.pending && (
          <div className="text-[12px] text-red bg-red-dim rounded-btn px-3 py-2 mt-2 flex justify-between items-center">
            <span>{state.pending.errorReason}</span>
            <button className="underline ml-2"
              onClick={() => dispatch({ type: "RETRY", id: state.pending!.id })}>重试</button>
          </div>
        )}
      </div>

      <div className="border-t border-border p-3">
        <textarea
          ref={taRef}
          value={state.inputDraft}
          onChange={e => dispatch({ type: "DRAFT_CHANGED", value: e.target.value })}
          onKeyDown={onKeyDown}
          placeholder="按 Enter 发送，Shift+Enter 换行"
          rows={2}
          className="w-full bg-bg border border-border rounded-btn p-2 text-[13.5px] outline-none focus:border-accent resize-none"
        />
        <div className="flex justify-end mt-2">
          <button onClick={() => void send()}
            disabled={!canSend(state)}
            className={cn("px-4 py-1.5 rounded-btn text-[13px] font-medium",
              canSend(state) ? "bg-accent text-bg" : "bg-white/5 text-text-weak cursor-not-allowed")}>
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3：ChatFab**

```tsx
// components/chat/chat-fab.tsx
"use client";
import { useState } from "react";
import { ChatPanel } from "./chat-panel";

export function ChatFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ChatPanel open={open} onClose={() => setOpen(false)} />
      <button onClick={() => setOpen(o => !o)}
        title="和 Andy 对话"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent text-bg text-2xl flex items-center justify-center shadow-accent-glow z-40 hover:scale-105 transition-transform">
        💬
      </button>
    </>
  );
}
```

- [ ] **Step 4：挂到 layout**

修改 `app/(dashboard)/layout.tsx`：
```tsx
import { ChatFab } from "@/components/chat/chat-fab";
// ...
<main className="flex-1 overflow-y-auto p-6">{children}</main>
<ChatFab />  {/* 加在 main-wrapper 末尾 */}
```

- [ ] **Step 5：手动验证**

```bash
pnpm dev
# 1. 主页右下角看到 💬 按钮
# 2. 点开浮层，发"ping"，等几秒看到 Andy 回复
# 3. 再发空消息，按钮 disabled
# 4. 关掉 NanoClaw 后端再发消息，看到失败 + 重试按钮
```

- [ ] **Step 6：commit**

```bash
git add -A && git commit -m "feat(chat): add chat fab/panel/message consuming state machine"
```
