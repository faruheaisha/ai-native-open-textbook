---
title: "Hello Agents（Datawhale 智能体教程）"
sourceId: "08-agents/hello-agents"
sourceTitle: "Hello Agents（Datawhale 智能体教程）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/hello-agents"
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter5/Chapter5-Building-Agents-with-Low-Code-Platforms.md"
sourceRel: "docs/chapter5/Chapter5-Building-Agents-with-Low-Code-Platforms.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter5/Chapter5-Building-Agents-with-Low-Code-Platforms.md"
sourceSha256: "034ae7e2bf7619af8471abf022e2bf37e2b9586abda1383b2bfc524e981bd731"
pageSha256: "596e0c6725c7a24e810690724a685cc4b725aed52c16b5f301dd058ee67547dd"
contentMode: "local-full"
zh: ""
---

## Exercises

1. This chapter introduces four distinctive low-code platforms: `Coze`, `Dify`, `FastGPT`, and `n8n`. Please analyze:

   - What are the differences in core positioning and design philosophy among these four platforms? What pain points in agent development do they respectively solve?
   - Low-code platforms and pure code development each have their advantages and disadvantages. In addition, there is also a "hybrid development" mode where some functions are implemented using platforms and some using code. Think about which scenarios each of the three development modes is suitable for? Please give examples.

2. In the `Coze` case in Section 5.2, we built a "Daily AI Brief" agent. Please extend your thinking based on this case:

   > **Tip**: This is a hands-on practice question, actual operation is recommended

   - The current brief generation is passively triggered (users actively ask). How to transform this agent so that it can automatically generate briefs and push them to designated Feishu groups or WeChat official accounts at 8 AM every day?
   - The quality of the brief highly depends on prompt design. Please try to optimize the prompt in Section 5.2.2 to make the generated brief more professional, with a clearer structure, or add new functions such as "hot spot analysis" and "trend prediction."
   - `Coze` currently not supporting the `MCP` protocol is considered an important limitation (during the writing of the exercises, although `feature-mcp` is in the [`Coze Studio Q4 2025 Product Roadmap`](https://github.com/coze-dev/coze-studio/issues/2218), it has not yet been implemented). Please briefly describe what the `MCP` protocol is? Why is it important? If `Coze` supports `MCP` in the future, what new possibilities will it bring?

3. In the `Dify` case in Section 5.3, we built a fully functional "Super Agent Personal Assistant." Please analyze in depth:

   - The case uses a "question classifier" for intelligent routing, distributing different types of requests to different sub-agents. What are the advantages of this multi-agent architecture? If you don't use a classifier but let a single agent handle all tasks, what problems will you encounter?
   - The data query module needs to provide the large model with clear table structure information. If the database has 50 tables, each with 20 fields, directly putting all `DDL` statements into the prompt will cause the context to be too long. Please design a smarter solution to solve this problem.
   - `Dify` supports both local deployment and cloud deployment modes. Please compare the differences between these two modes in terms of data security, cost, performance, and maintenance difficulty, and explain the applicable scenarios for each.

4. In the `FastGPT` case in Section 5.4, we built a "Smart Investment Advisor Assistant." Please analyze in depth:

   - FastGPT's core advantage is its deep optimization of the RAG pipeline. Please compare FastGPT's knowledge base processing (file chunking, index enhancement, image recognition) with Dify's knowledge base functionality. What are the differences in design philosophy and applicable scenarios between the two?
   - The case uses MCP tools to obtain real-time stock data and generate visual charts. If FastGPT did not natively support MCP, how would you achieve the same functionality? Please propose an alternative solution.
   - The free version of FastGPT has only 100 credits and 30 QPM. For a startup team that needs to serve 1000 users, how would you design a solution that balances cost and performance?

5. In the `n8n` case in Section 5.5, we built an "Intelligent Email Assistant." Please think about the following questions:

   > **Tip**: This is a hands-on practice question, actual operation is recommended

   - The `Simple Vector Store` and `Simple Memory` used in the case are both memory-based, and data will be lost after service restart. Please consult the `n8n` documentation, try to replace them with persistent storage solutions (such as `Pinecone`, `Redis`, etc.), and explain the configuration process.
   - The current email assistant can only handle text emails. If the email sent by the user contains attachments (such as `PDF` documents, images), how would you extend this workflow to enable the agent to understand attachment content and make corresponding replies?
   - The core advantage of `n8n` lies in its "connection" capability. Please design a more complex automation scenario: when a customer places an order on an e-commerce platform, automatically trigger a series of operations (send confirmation email, update inventory database, notify logistics system, record customer information in `CRM`). Please draw the node connection diagram of the workflow and explain key configurations.

6. Prompt engineering is equally crucial in low-code platforms. This chapter shows multiple platform prompt design cases. Please analyze:

   - Compare the prompt designs in Section 5.2.2 (`Coze`), Section 5.3.2 (`Dify`), Section 5.4.2 (`FastGPT`), and Section 5.5.4 (`n8n`). What are the differences in structure, style, and focus? Are these differences related to platform characteristics?
   - In `Dify`'s "Copywriting Optimization Module," the prompt requires output "exceeding 500 words." Is this hard requirement on output length reasonable? In what situations should output length be limited, and in what situations should the model be allowed to freely express?

7. Tools and plugins are the core capability extension methods of low-code platforms. Please think:

   - `Coze` has a rich plugin store, `Dify` has a plugin market of 8000+, `FastGPT` natively supports the MCP protocol, and `n8n` has hundreds of preset nodes. If none of these four platforms have a specific tool you need (such as "connecting to the company's internal system `API`"), how would you solve it?
   - In Section 5.3.2, we used the `MCP` protocol to integrate services such as Amap and dietary recommendations. Please research and explain: What are the differences between the `MCP` protocol and traditional `RESTful API` and `Tool Calling`? Why is `MCP` called the "new standard" for agent tool invocation?
   - Suppose you want to develop a custom plugin for `Dify` to enable it to call your company's internal knowledge base system. Please consult `Dify`'s plugin development documentation and outline the development process and key technical points.

8. Platform selection is one of the key decisions for the success of agent products. Suppose you are the technical leader of a startup company, and the company plans to develop the following three AI applications. Please select the most suitable platform for each application (`Coze`, `Dify`, `FastGPT`, `n8n`, or pure code development) and explain in detail:

   **Application A**: A "AI Writing Assistant" mini-program for C-end users, needs to be launched quickly to verify market demand, with a limited budget, and the team has only 1 front-end engineer and 1 product manager.

   **Application B**: An "Intelligent Contract Review System" for enterprise customers, needs to handle sensitive legal documents, requires that data cannot leave the customer's private environment, and needs deep integration with the customer's existing OA system and document management system.

   **Application C**: An internal "R&D Efficiency Improvement Tool," needs to automate multiple R&D process links such as code review, test report generation, bug tracking, and project progress synchronization. The team has strong technical capabilities.

   For each application, please analyze from the following dimensions (including but not limited to):

   > **Tip**: Whether platform capabilities meet requirements, how quickly it can be launched, development costs, operating costs, difficulty of subsequent iterations, space for future function expansion

   - Technical feasibility
   - Development efficiency
   - Cost control
   - Maintainability
   - Scalability
   - Data security and compliance
