---
title: "Phase 0 · 脚手架与主题"
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
pageSha256: "c7e04c77e2ef44971c66405eb60aea9e6c726f5b6dec29e7d083628bcf1164f8"
contentMode: "local-full"
zh: ""
---

# Phase 0 · 脚手架与主题

---

### Task 1: 初始化 Next.js 14 项目

**Files:**
- Create: 整个 `nanoclaw-dashboard-v2/` 项目结构（除 docs/ 已存在）

- [ ] **Step 1：在已有目录里 init Next.js**

注意 `docs/` 已存在，不能用 create-next-app 创建新目录覆盖。先在临时目录生成再合并：

```bash
cd /tmp
pnpm dlx create-next-app@14 nanoclaw-tmp \
  --typescript --tailwind --app --eslint --use-pnpm \
  --src-dir false --import-alias "@/*" --no-turbo
rsync -a --exclude='.git' /tmp/nanoclaw-tmp/ /Users/muyu/projects/nanoclaw-dashboard-v2/
rm -rf /tmp/nanoclaw-tmp
cd /Users/muyu/projects/nanoclaw-dashboard-v2
```

- [ ] **Step 2：固定端口 4000，启用 strict TS**

修改 `package.json` scripts：
```json
"dev": "next dev -p 4000",
"start": "next start -p 4000",
```

修改 `tsconfig.json`：确保 `"strict": true`、`"noUncheckedIndexedAccess": true`。

- [ ] **Step 3：验证启动**

```bash
pnpm dev
# 浏览器开 http://127.0.0.1:4000，看到默认 Next.js 页面
# Ctrl+C 关掉
```

- [ ] **Step 4：commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 14 + TS + Tailwind on port 4000"
```

---

### Task 2: 注入雏形颜色 token 到 tailwind.config.ts

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1：覆写 theme.extend.colors**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        card: { DEFAULT: "#161616", hover: "#1c1c1c" },
        border: { DEFAULT: "#262626", hover: "#3a3a3a" },
        text: { DEFAULT: "#f5f5f5", sub: "#a1a1a1", weak: "#737373" },
        accent: { DEFAULT: "#ff8c1a", dim: "rgba(255,140,26,0.15)" },
        green: { DEFAULT: "#22c55e", dim: "rgba(34,197,94,0.15)" },
        red: { DEFAULT: "#ef4444", dim: "rgba(239,68,68,0.15)" },
        purple: { DEFAULT: "#a855f7", dim: "rgba(168,85,247,0.15)" },
        blue: { DEFAULT: "#3b82f6", dim: "rgba(59,130,246,0.15)" },
        yellow: "#eab308",
      },
      borderRadius: { card: "12px", btn: "8px", badge: "6px" },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.3)",
        "accent-glow": "0 0 12px rgba(255,140,26,0.35)",
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', '"PingFang SC"', '"Microsoft YaHei"', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
};
export default config;
```

- [ ] **Step 2：commit**

```bash
git add tailwind.config.ts
git commit -m "feat(theme): inject prototype color tokens"
```

---

### Task 3: 注入字体/全局基样式到 globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1：覆写 globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html, body { @apply h-full; overflow: hidden; }
  body {
    @apply bg-bg text-text font-sans;
    font-size: 14px;
    line-height: 1.5;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: #444; }
}
```

- [ ] **Step 2：手动验证**

```bash
pnpm dev
# 浏览器开 http://127.0.0.1:4000，确认背景是纯黑、文字是浅灰
```

- [ ] **Step 3：commit**

```bash
git add app/globals.css
git commit -m "feat(theme): inject base typography and scrollbar"
```

---

### Task 4: 装 shadcn-ui + vitest + lib 初始化

**Files:**
- Create: `lib/utils.ts`, `lib/brand.ts`, `vitest.config.ts`, `components/ui/.gitkeep`
- Modify: `package.json`

- [ ] **Step 1：装 shadcn 和测试相关依赖**

```bash
pnpm dlx shadcn@latest init -d --base-color neutral
# 默认会问，全部按推荐 → new-york style, CSS variables yes, neutral
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
pnpm add zod
```

- [ ] **Step 2：装基础 shadcn 原子组件**

```bash
pnpm dlx shadcn@latest add button input textarea badge separator tooltip
```

- [ ] **Step 3：写 lib/utils.ts**

shadcn init 应该已经生成 `cn()`，确认存在：

```ts
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4：写 lib/brand.ts**

```ts
// lib/brand.ts
export const BRAND = {
  name: "NanoClaw",
  version: "v2.0.33",
  logo: "🐾",
  agentDefault: "Andy",
  greeting: "你好！我是 Andy，有什么我可以帮你的吗？😊",
} as const;
```

- [ ] **Step 5：配置 vitest**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

```ts
// tests/setup.ts
import "@testing-library/jest-dom/vitest";
```

```json
// package.json scripts 增加
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6：跑空测试确认 vitest 工作**

```bash
mkdir -p tests
cat > tests/smoke.test.ts << 'EOF'
import { describe, it, expect } from "vitest";
describe("smoke", () => { it("works", () => { expect(1 + 1).toBe(2); }); });
EOF
pnpm test
# 期望：1 passed
```

- [ ] **Step 7：commit + tag v0.1.0**

```bash
git add -A
git commit -m "chore: install shadcn, vitest, zod, base lib"
git tag v0.1.0
```
