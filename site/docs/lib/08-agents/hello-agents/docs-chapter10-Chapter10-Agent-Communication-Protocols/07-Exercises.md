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
entryUrl: "https://github.com/datawhalechina/hello-agents/blob/4f7682ceafe573d07cd8a7d0b89908500e83227d/docs/chapter10/Chapter10-Agent-Communication-Protocols.md"
sourceRel: "docs/chapter10/Chapter10-Agent-Communication-Protocols.md"
rawUrl: "/raw/08-agents/hello-agents/docs/chapter10/Chapter10-Agent-Communication-Protocols.md"
sourceSha256: "906d156d7d993b2e79d7015a1a6fc304b7a9307ae202c3745a68111976f1a315"
pageSha256: "32721fee77518c9151e725463db00f50fa4e3f2cfffc2ecd01039a7356593acf"
contentMode: "local-full"
zh: ""
---

## Exercises

> **Note**: Some exercises do not have standard answers. The focus is on cultivating learners' comprehensive understanding and practical ability in agent communication protocols.

1. This chapter introduced three agent communication protocols: MCP, A2A, and ANP. Please analyze:

   - Section 10.1.2 compared the design philosophies of the three protocols. Please analyze in depth: Why does MCP emphasize "context sharing", A2A emphasize "conversational collaboration", and ANP emphasize "network topology"? What core problems do these design philosophies solve respectively?
   - Suppose you want to build an "intelligent customer service system" that requires the following functions: (1) Access customer database and order system; (2) Multiple professional customer service agents collaborate to handle complex problems; (3) Support large-scale concurrent user requests. Please select the most appropriate protocol for each function and explain your reasoning.
   - Can the three protocols be used in combination? Please design a practical application scenario showing how to use MCP, A2A, and ANP simultaneously to build a complete agent system. Draw a system architecture diagram and explain the responsibilities of each protocol.

2. MCP (Model Context Protocol) is the standard protocol for agent-tool communication. Based on the content in Section 10.2, please think deeply:

   > **Note**: This is a hands-on practice question, actual operation is recommended

   - In the MCP server implementation in Section 10.2.3, we defined core methods such as `list_tools` and `call_tool`. Please extend this implementation by adding a new MCP server that provides the following tools: (1) Database query tool; (2) Data visualization tool; (3) Report generation tool. Require that tools can collaborate to complete complex data analysis tasks.
   - The MCP protocol supports two important concepts: "Resources" and "Prompts", but this chapter mainly focuses on "Tools". Please consult the MCP official documentation to understand the design purposes of Resources and Prompts, and design an application scenario showing how to use these three core concepts to build a more powerful agent system.
   - MCP uses JSON-RPC 2.0 as the underlying communication protocol and communicates between processes via stdio. Please analyze: What are the advantages and limitations of this design? If you need to support remote MCP servers (accessed via HTTP/WebSocket), how should the current implementation be extended?

3. A2A (Agent-to-Agent Protocol) supports conversational collaboration between agents. Based on the content in Section 10.3, please complete the following extended practice:

   > **Note**: This is a hands-on practice question, actual operation is recommended

   - In the "research team" case in Section 10.3.4, researchers and writers collaborate through the A2A protocol to complete paper writing. Please extend this case by adding a third agent "Reviewer", which can review paper quality and provide revision suggestions. Design the collaboration process among the three agents and implement complete code.
   - The A2A protocol defines message types such as `task` and `task_result`. Please analyze: If conflicts occur during collaboration (such as two agents having different opinions on the same issue), how should a conflict resolution mechanism be designed? Please extend the A2A protocol by adding message types such as "negotiation" and "voting".
   - Compare the A2A protocol with multi-agent frameworks such as AutoGen and CAMEL introduced in Chapter 6: What is the relationship between A2A as a standard protocol and these frameworks? Can they replace each other? Please design a solution that allows agents based on the A2A protocol to communicate with agents in the AutoGen framework.

4. ANP (Agent Network Protocol) supports large-scale agent networks. Based on the content in Section 10.4, please analyze in depth:

   - Section 10.4.2 introduced ANP's network topology design, including star, mesh, hierarchical, and other structures. Please analyze: In what scenarios should which topology structure be chosen? If the network scale expands from 10 agents to 1000 agents, how should the topology structure evolve?
   - The ANP protocol supports "routing" and "discovery" mechanisms, allowing agents to dynamically find suitable collaboration partners. Please design an "intelligent routing algorithm": automatically select the optimal message routing path based on task type, agent capabilities, network load, and other factors.
   - In the "smart city" case in Section 10.4.4, multiple agents collaborate to manage city systems. Please think: If a critical agent (such as a traffic management agent) fails, how should the entire system respond? Please design a "fault tolerance mechanism", including fault detection, backup switching, state recovery, and other functions.

5. Security and privacy protection of agent communication protocols are key issues in practical applications. Please think:

   - In the MCP client implementation in Section 10.2.4, agents can call any tool provided by the MCP server. Please analyze: What security risks does this design have? If the MCP server provides dangerous operations (such as deleting files, executing system commands), how should a permission control mechanism be designed?
   - A2A and ANP protocols involve communication between multiple agents, which may contain sensitive information (such as user privacy data, business secrets). Please design an "end-to-end encryption" solution: ensure that messages are not eavesdropped or tampered with during transmission, while supporting agent identity authentication and access control.
   - In large-scale agent networks, malicious agents may send false information, launch denial-of-service attacks, or steal data from other agents. Please design a "trust evaluation system": dynamically evaluate the trustworthiness of each agent based on historical behavior, collaboration quality, community evaluation, and other factors, and adjust communication strategies accordingly.
