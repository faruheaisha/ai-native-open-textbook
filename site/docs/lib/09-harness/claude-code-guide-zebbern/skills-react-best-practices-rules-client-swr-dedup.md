---
title: "Claude Code Guide（zebbern）"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/client-swr-dedup.md"
sourceRel: "skills/react-best-practices/rules/client-swr-dedup.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/client-swr-dedup.md"
sourceSha256: "de4efbf3b0e8abf280c1f18667e88a8af14803742eefa9a5737512e70b86f31f"
pageSha256: "de4efbf3b0e8abf280c1f18667e88a8af14803742eefa9a5737512e70b86f31f"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Use SWR for Automatic Deduplication

SWR enables request deduplication, caching, and revalidation across component instances.

**Incorrect (no deduplication, each instance fetches):**

```tsx
function UserList() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then(setUsers)
  }, [])
}
```

**Correct (multiple instances share one request):**

```tsx
import useSWR from "swr"

function UserList() {
  const { data: users } = useSWR("/api/users", fetcher)
}
```

**For immutable data:**

```tsx
import { useImmutableSWR } from "@/lib/swr"

function StaticContent() {
  const { data } = useImmutableSWR("/api/config", fetcher)
}
```

**For mutations:**

```tsx
import { useSWRMutation } from "swr/mutation"

function UpdateButton() {
  const { trigger } = useSWRMutation("/api/user", updateUser)
  return <button onClick={() => trigger()}>Update</button>
}
```

Reference: [https://swr.vercel.app](https://swr.vercel.app)
