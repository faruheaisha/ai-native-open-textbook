---
title: "From Databases to Supabase"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/stage-2/backend/database-supabase/index.md"
sourceRel: "docs/en/stage-2/backend/database-supabase/index.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/stage-2/backend/database-supabase/index.md"
sourceSha256: "9c00af675f779ec2931d8ad8360d507359aca7692969a37bf3336f25d49cddca"
pageSha256: "b00aa532115ad08a0c61a2d293c90753a1b9467a6e3109b86d52882f1a54c6be"
contentMode: "local-full"
zh: ""
---

# From Databases to Supabase

In the previous lesson, we learned the basics of UI design tools Mastergo and Figma, how to use GitHub for code management and version control, and how to deploy websites via Zeabur to make our applications accessible to more users.

To help you better connect with what you've already learned, before we dive into the new content about design tools and deployment in this lesson, let's quickly review the core knowledge points from the previous lesson with a few simple questions:

1. What are frontend design tools, and what are the definitions and usage of Figma and MasterGo?
2. The basic methods for converting design mockups into code.
3. What is GitHub, how to configure SSH, and how to create your first repository.
4. What does deployment mean, how to use Zeabur, and how to deploy code from GitHub or locally to the public internet for others to access.

If any of the above questions still feel unclear, we recommend reviewing the previous lesson's documentation and lecture notes. Feel free to ask questions in the WeChat study group at any time.

In this lesson, we will learn how to take an APP/website from "just running" to something closer to a real online product: in addition to using a database to manage various data changes during program execution, we also need a complete user system (registration, login, permissions, etc.) and other key backend capabilities. We will use Supabase as the main backend service platform, first implementing the two foundational features of "database + user system" with it, and then using Supabase's components as a reference to further understand the core modules typically included in modern cloud service backends, as well as the specific functions and logic of each module.
