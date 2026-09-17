---
title: "Chapter 13 Intelligent Travel Assistant"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/Chapter13-Intelligent-Travel-Assistant.md"
sourceRel: "docs/chapter13/Chapter13-Intelligent-Travel-Assistant.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter13/Chapter13-Intelligent-Travel-Assistant.md"
sourceSha256: "6cb1b817ea94b1d89b95d65dda98e938ca87bd26b934547d164a26c94f7b2a56"
pageSha256: "2b3467c2b37459726e1e011175fbe8e03473f26b67642e734a3b4275d24d7ca0"
contentMode: "local-full"
zh: ""
---

# Chapter 13 Intelligent Travel Assistant

In previous chapters, we built the HelloAgents framework from scratch, implementing core functionalities including various agent paradigms, tool systems, memory mechanisms, protocol communication, and performance evaluation. Starting from this chapter, we will enter a completely new phase: **integrating all learned knowledge to build complete practical applications.**

Do you remember the first agent we built in Chapter 1? It was a simple intelligent travel assistant that demonstrated the basic principles of the `Thought-Action-Observation` loop. The intelligent travel assistant in this chapter will be a complete project, including the following core functions:

**(1) Intelligent Itinerary Planning**: Users input destination, dates, preferences and other information, and the system automatically generates a complete itinerary plan including attractions, dining, and hotels.

**(2) Map Visualization**: Mark attraction locations on the map and draw tour routes, making the itinerary clear at a glance.

**(3) Budget Calculation**: Automatically calculate ticket, hotel, dining, and transportation costs, displaying budget details.

**(4) Itinerary Editing**: Support adding, deleting, and adjusting attractions, updating the map in real-time.

**(5) Export Function**: Support exporting as PDF or image, convenient for saving and sharing.

## 本篇目录

- [13.1 Project Overview and Architecture Design](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/01-13.1_Project_Overview_and_Architecture_D.md)
- [13.2 Data Model Design](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/02-13.2_Data_Model_Design.md)
- [13.3 Multi-Agent Collaboration Design](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/03-13.3_Multi-Agent_Collaboration_Design.md)
- [13.4 MCP Tool Integration Details](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/04-13.4_MCP_Tool_Integration_Details.md)
- [13.5 Front-End Development Details](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/05-13.5_Front-End_Development_Details.md)
- [13.6 Feature Implementation Details](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/06-13.6_Feature_Implementation_Details.md)
- [13.7 Conclusion](https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter13/07-13.7_Conclusion.md)
