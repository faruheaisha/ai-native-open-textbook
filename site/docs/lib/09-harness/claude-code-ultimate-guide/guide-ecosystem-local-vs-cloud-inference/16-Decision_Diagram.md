---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/local-vs-cloud-inference.md"
sourceRel: "guide/ecosystem/local-vs-cloud-inference.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/local-vs-cloud-inference.md"
sourceSha256: "00496bd48f05d6c0aec914f5f08a661c246e97789034e76fdb1c297813f7a5d6"
pageSha256: "947ede00dabdd3d1ae1b424161cec264a7cd1ec48173052d299ff66bf1d6c1ea"
contentMode: "local-full"
zh: ""
---

## Decision Diagram

```mermaid
flowchart TD
    A([Need to run a large LLM]) --> B{Data must stay on hardware you own?}

    B -->|Yes| C{Need over 70B or max quality?}
    B -->|No| D{Usage pattern?}

    C -->|Yes, up to 405B| E([Buy local: Mac Studio M5 Ultra or dual RTX PRO 6000])
    C -->|No, 70B fits| F([Buy local: RTX PRO 6000 or MacBook Pro M5 Max])

    D -->|Light or bursty| G([License a managed API: Claude or GPT-5.6])
    D -->|Sustained, 4-8h/day| H([Benchmark local purchase against GPU rental])
    D -->|Heavy, 24/7| I([Compare purchase, dedicated rental, and elastic cloud])

    style A fill:#F5E6D3,color:#333
    style B fill:#E87E2F,color:#fff
    style C fill:#E87E2F,color:#fff
    style D fill:#E87E2F,color:#fff
    style E fill:#7BC47F,color:#333
    style F fill:#7BC47F,color:#333
    style G fill:#6DB3F2,color:#fff
    style H fill:#6DB3F2,color:#fff
    style I fill:#6DB3F2,color:#fff

    click B href "#decision-framework" "Data sovereignty requirement"
    click C href "#what-actually-fits-named-models" "Model size vs quality"
    click D href "#one-year-cost-projections" "Usage pattern"
    click E href "#fourteen-comparable-hardware-configurations" "Buy: large local hardware"
    click F href "#fourteen-comparable-hardware-configurations" "Buy: single-GPU local hardware"
    click G href "#cloud-api-throughput-claude-vs-gpt-56" "License: managed API"
    click H href "#benchmark-protocol-before-you-buy" "Benchmark before deciding"
    click I href "#one-year-cost-projections" "Compare total cost"
```


<summary>ASCII version</summary>

```
Need to run a large LLM
└─ Data must stay on hardware you own?
   ├─ Yes → Need over 70B or max quality?
   │        ├─ Yes, up to 405B → BUY: Mac Studio M5 Ultra or dual RTX PRO 6000
   │        └─ No, 70B fits    → BUY: RTX PRO 6000 or MacBook Pro M5 Max
   └─ No  → Usage pattern?
            ├─ Light or bursty     → LICENSE: managed API (Claude or GPT-5.6)
            ├─ Sustained, 4-8h/day → BENCHMARK: local purchase against GPU rental
            └─ Heavy, 24/7         → COMPARE: purchase, dedicated rental, elastic cloud
```


