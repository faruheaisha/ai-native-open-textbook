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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/ccguide/log-ebook-dl.md"
sourceRel: ".agents/skills/ccguide/log-ebook-dl.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/ccguide/log-ebook-dl.md"
sourceSha256: "03d99167b6f949a57e21aee9a04c605459f2b5444c04bf83ab70ffa0ff69120f"
pageSha256: "03d99167b6f949a57e21aee9a04c605459f2b5444c04bf83ab70ffa0ff69120f"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

Look at the screenshot provided (or the context given) and extract:
- **date**: download date (format YYYY-MM-DD, use today if not visible)
- **prenom**: recipient's first name
- **email**: recipient's email address
- **ebook**: guide/ebook name (e.g. "Prompts Efficaces", "Introduction à l'IA", etc.)
- **langue**: FR or EN based on the ebook name/content
- **notes**: any relevant context (leave empty if nothing notable)

Then append a new line to:
`/Users/florianbruniaux/Sites/perso/claude-code-ultimate-guide/claudedocs/ebook-downloads.csv`

Use this exact CSV format (no quotes unless the field contains a comma):
```
YYYY-MM-DD,Prenom,email@example.com,Ebook Name,FR,notes
```

After writing, confirm: "Logged: [Prenom] — [email] — [ebook] ([date])"

$ARGUMENTS
