---
title: "Chapter 10: Localhost and Public Access"
sourceId: "07-coding/vibe-vibe"
sourceTitle: "Vibe Vibe —— 人人都能学会的 AI 编程（Vibe Coding）指南"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/vibe-vibe"
entryUrl: "https://github.com/datawhalechina/vibe-vibe/blob/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/en/Advanced/10-localhost-public-access/index.md"
sourceRel: "docs/en/Advanced/10-localhost-public-access/index.md"
rawUrl: "/raw/07-coding/vibe-vibe/docs/en/Advanced/10-localhost-public-access/index.md"
sourceSha256: "8c407cdd838e2deb8af244265c55f71a45d8ffc1666e4b644815de73138dc8dc"
pageSha256: "8c407cdd838e2deb8af244265c55f71a45d8ffc1666e4b644815de73138dc8dc"
contentMode: "local-full"
zh: ""
---

# Chapter 10: Localhost and Public Access

![img](https://gh-proxy.com/https://raw.githubusercontent.com/datawhalechina/vibe-vibe/f2e121d9b6c689c0e682921df60d73e279c5e316/docs/public/images/Advanced/mll05kjk-61c547a6df466500.jpg)

## Preface

Xiaoming’s tests were all green. The rating feature was stable, search hadn’t been accidentally broken, and the detail page opened normally—Chapter 9’s safety net had caught everything. Eager to show off the results to a friend, he casually copied `http://localhost:3000` from the browser’s address bar into WeChat.

A minute later, his friend replied with a question mark: "It won’t open?"

Xiaoming stared at the screen, confused. It works perfectly fine on my computer, doesn’t it?

The seasoned mentor walked by, glanced at the chat history, and smiled. "Only you can access localhost. Sending that to your friend is basically telling them to access their own computer—and your project isn’t running on their machine."

"Then how can I let them see it?"

"First understand how networks are layered, and then you’ll know what to do."

---

This chapter starts with Xiaoming’s awkward moment and helps you understand what localhost really is, the three layers of networking, and how to temporarily let a friend view your project.

## Sections in This Chapter

| Section | Content |
|------|------|
| [10.1 From Localhost to the Internet](/lib/07-coding/vibe-vibe/docs-en-Advanced-10-localhost-public-access-01-network-layers) | localhost loopback address, LAN real-device debugging, firewall troubleshooting, and why deployment is necessary |
| [10.2 Intranet Tunneling: Let Friends Take a Quick Look](/lib/07-coding/vibe-vibe/docs-en-Advanced-10-localhost-public-access-02-tunneling) | tunneling principles, hands-on with Cloudflare Tunnel, alternative options, and security considerations |

---

**Previous Chapter**: [Chapter 9: Feature Testing and Automation](/lib/07-coding/vibe-vibe/docs-en-Advanced-09-testing-automation)

**Next Chapter**: [Chapter 11: Git Version Control and Cross-Platform Collaboration](/lib/07-coding/vibe-vibe/docs-en-Advanced-11-git-collaboration)
