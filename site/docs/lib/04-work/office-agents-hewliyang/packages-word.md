---
title: "@office-agents/word"
sourceId: "04-work/office-agents-hewliyang"
sourceTitle: "Office Agents"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/hewliyang/office-agents"
entryUrl: "https://github.com/hewliyang/office-agents/blob/95fb654491a9d394dc85ea2b8c93dee2ca4546b9/packages/word/README.md"
sourceRel: "packages/word/README.md"
rawUrl: "/raw/04-work/office-agents-hewliyang/packages/word/README.md"
sourceSha256: "19581cc7786c333716823372bd4f3e7db834fcec08d6fdc13f8e8d5e7d950e52"
pageSha256: "19581cc7786c333716823372bd4f3e7db834fcec08d6fdc13f8e8d5e7d950e52"
contentMode: "local-full"
zh: ""
---

# @office-agents/word

Word Add-in with an integrated AI chat panel. Connects to major LLM providers using your own credentials (BYOK) and can read/write documents through built-in tools, a sandboxed shell, and a virtual filesystem.

## Install

Download [`manifest.prod.xml`](https://github.com/hewliyang/office-agents/blob/95fb654491a9d394dc85ea2b8c93dee2ca4546b9/packages/word/manifest.prod.xml), then follow the instructions for your platform:

### Windows
1. **Insert** → **Add-ins** → **My Add-ins**
2. **Upload My Add-in**
3. Select `manifest.prod.xml`
4. Open the add-in from the ribbon

### macOS
1. Copy `manifest.prod.xml` to:
   `~/Library/Containers/com.microsoft.Word/Data/Documents/wef/`
2. Restart Word
3. **Insert** → **Add-ins** → **My Add-ins**
4. Select the add-in

### Word Web
1. Open [word.office.com](https://word.office.com)
2. **Insert** → **Add-ins** → **More Add-ins**
3. **Upload My Add-in**
4. Upload `manifest.prod.xml`

## Tools

| Tool | What it does |
|------|---------------|
| `get_document_text` | Read document text with paragraph indices, styles, and list info |
| `get_document_structure` | Get a structural overview of headings, tables, content controls, sections, and paragraphs |
| `get_ooxml` | Extract document OOXML, write it to the VFS, and return body-child mappings for inspection |
| `screenshot_document` | Capture a document page as an image for visual verification |
| `execute_office_js` | Run raw Office.js inside Word.run (sandboxed) |
| `read` | Read text files and images from the virtual filesystem |
| `bash` | Run commands in the sandboxed shell |

## Bash custom commands

| Command | What it does |
|---------|---------------|
| `pdf-to-text` | Extract text from PDF files |
| `pdf-to-images` | Render PDF pages to PNG images |
| `docx-to-text` | Extract text from DOCX files |
| `xlsx-to-csv` | Convert uploaded spreadsheet files to CSV |
| `web-search` | Search the web using configured provider |
| `web-fetch` | Fetch web pages/files into VFS |
| `image-search` | Search for images using the configured provider |

## Development

```bash
pnpm dev-server:word    # Start dev server (https://localhost:3002)
pnpm start:word         # Launch Word with add-in sideloaded
```
