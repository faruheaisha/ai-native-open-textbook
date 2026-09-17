---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "4f1f99594a0a1a3a850e6168f34db16dbd309ef1ae6fbcfc2b85956bf2eef5b4"
contentMode: "local-full"
zh: ""
---

## Bulk editing for API frontmatter
API frontmatter metadata is stored with the API content it describes. This makes
sense in most cases, but sometimes you want to bulk edit metadata or compare
phrasing across all API references. There are 2 scripts to help with this. They
are currently written to edit the `excerpts` field, but can be adapted for other
fields.

### `extract_excerpts.sh`
This extracts the excerpt from every API reference into a single file named
`extracted_excerpts.md`.

To use:
1.  `cd` into the `_scripts/` directory.
1.  If you already have an `extracted_excerpts.md` file from a previous run,
    delete it.
1.  Run `./extract_excerpts.sh`.
1.  Open `extracted_excerpts.md` and edit the excerpts directly within the file.
    Only change the actual excerpts, not the filename or `excerpt: ` label.
    Otherwise, the next script fails.

### `insert_excerpts.sh`
This takes the edited excerpts from `extracted_excerpts.md` and updates the
original files with the new edits. A backup is created so the data is saved if
something goes horribly wrong. (If something goes wrong with the backup, you can
always also restore from git.)

To use:
1.  Save your edited `extracted_excerpts.md`.
1.  Make sure you are in the `_scripts/` directory.
1.  Run `./insert_excerpts.sh`.
1.  Run `git diff` to double-check that the update worked correctly.
1.  Delete the unnecessary backups.

===== PAGE: https://docs.tigerdata.com/navigation/index/ =====
