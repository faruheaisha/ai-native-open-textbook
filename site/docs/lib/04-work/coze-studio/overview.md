---
title: "Coze Studio 源码研读"
sourceId: "04-work/coze-studio"
sourceTitle: "Coze Studio 源码研读"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/coze-dev/coze-studio"
entryUrl: "https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/README.md"
zh: ""
---

![Image](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/943f576df3424fa98580c2ad18946719~tplv-goo7wpa0wc-image.image)

<div align="center"><p>
<a href="#what-is-coze-studio">Coze Studio</a> •
<a href="#feature-list">Feature list</a> •
<a href="#quickstart">Quickstart</a> •
[Developer Guide](#developer-guide)
</p>
<p>
  
  
</p>

English | [中文](https://github.com/coze-dev/coze-studio/blob/fefb05ff27be1da939612fbf9faf5db62583b8ae/README.zh_CN.md)

</div>

## What is Coze Studio?

[Coze Studio](https://www.coze.cn/home) is an all-in-one AI agent development tool. Providing the latest large models and tools, various development modes and frameworks, Coze Studio offers the most convenient AI agent development environment, from development to deployment. 

* **Provides all core technologies needed for AI agent development**: prompt, RAG, plugin, workflow, enabling developers to focus on creating the core value of AI.
* **Ready to use for professional AI agent development at the lowest cost**: Coze Studio provides developers with complete app templates and build frameworks, allowing you to quickly construct various AI agents and turn creative ideas into reality.

Coze Studio, derived from the "Coze Development Platform" which has served tens of thousands of enterprises and millions of developers, we have made its core engine completely open. It is a one-stop visual development tool for AI Agents that makes creating, debugging, and deploying AI Agents unprecedentedly simple. Through Coze Studio's visual design and build tools, developers can quickly create and debug agents, apps, and workflows using no-code or low-code approaches, enabling powerful AI app development and more customized business logic. It's an ideal choice for building low-code AI products tailored . Coze Studio aims to lower the threshold for AI agent development and application, encouraging community co-construction and sharing for deeper exploration and practice in the AI field.

The backend of Coze Studio is developed using Golang, the frontend uses React + TypeScript, and the overall architecture is based on microservices and built following domain-driven design (DDD) principles. Provide developers with a high-performance, highly scalable, and easy-to-customize underlying framework to help them address complex business needs.
## Feature list
| **Module** | **Feature** |
| --- | --- |
| Model service | Manage the model list, integrate services such as OpenAI and Volcengine |
| Build agent | * Build, publish, and manage agent <br> * Support configuring workflows, knowledge bases, and other resources |
| Build apps | * Create and publish apps <br> * Build business logic through workflows |
| Build a workflow | Create, modify, publish, and delete workflows |
| Develop resources | Support creating and managing the following resources: <br> * Plugins <br> * Knowledge bases <br> * Databases <br> * Prompts |
| API and SDK | * Create conversations, initiate chats, and other OpenAPI <br> * Integrate agents or apps into your own app through Chat SDK |

## Quickstart
Learn how to obtain and deploy the open-source version of Coze Studio, quickly build projects, and experience Coze Studio's open-source version.

Environment requirements:

* Before installing Coze Studio, please ensure that your machine meets the following minimum system requirements: 2 Core、4 GB
* Pre-install Docker and Docker Compose, and start the Docker service.

Deployment steps:

1. Retrieve the source code.
   ```Bash
   # Clone code
   git clone https://github.com/coze-dev/coze-studio.git
   ```
2. Deploy and start the service. When deploying and starting Coze Studio for the first time, it may take a while to retrieve images and build local images. Please be patient. If you see the message "Container coze-server Started," it means the Coze Studio service has started successfully.

   ```Bash
   cd coze-studio
   # start service
   # for macOS or Linux
   make web  
   # for windows
   cp ./docker/.env.example ./docker/.env
   docker compose -f ./docker/docker-compose.yml up
   ```

   For common startup failure issues, **please refer to the [FAQ](https://github.com/coze-dev/coze-studio/wiki/9.-FAQ)**.
3.	Register an account by visiting `http://localhost:8888/sign`, entering your username and password, and clicking the Register button.
4.	Configure the model at `http://localhost:8888/admin/#model-management` by adding a new model. (The image version must be greater than or equal to 0.5.0.)
5.	Visit Coze Studio at `http://localhost:8888/`.

> [!WARNING]
> If you want to deploy Coze Studio in a public network environment, it is recommended to assess security risks before you begin, and take corresponding protection measures. Possible security risks include account registration functions, Python execution environments in workflow code nodes, Coze Server listening address configurations, SSRF (Server - Side Request Forgery), and some horizontal privilege escalations in APIs.  For more details, refer to [Quickstart](https://github.com/coze-dev/coze-studio/wiki/2.-Quickstart#security-risks-in-public-networks).

## Developer Guide

* **Project Configuration**:
   * [Model Configuration](https://github.com/coze-dev/coze-studio/wiki/3.-Model-configuration): Before deploying the open-source version of Coze Studio, you must configure the model service. Otherwise, you cannot select models when building agents, workflows, and apps.
   * [Plugin Configuration](https://github.com/coze-dev/coze-studio/wiki/4.-Plugin-Configuration): To use official plugins from the plugin store, you must first configure the plugins and add the authentication keys for third-party services.
   * [Basic Component Configuration](https://github.com/coze-dev/coze-studio/wiki/5.-Basic-component-configuration): Learn how to configure components such as image uploaders to use functions like image uploading in Coze Studio .
* [API Reference](https://github.com/coze-dev/coze-studio/wiki/6.-API-Reference): The Coze Studio Community Edition API and Chat SDK are authenticated using Personal Access Token, providing APIs for conversations and workflows.
* [Development Guidelines](https://github.com/coze-dev/coze-studio/wiki/7.-Development-Standards):
   * [Project Architecture](https://github.com/coze-dev/coze-studio/wiki/7.-Development-Standards#project-architecture): Learn about the technical architecture and core components of the open-source version of Coze Studio.
   * [Code Development and Testing](https://github.com/coze-dev/coze-studio/wiki/7.-Development-Standards#code-development-and-testing): Learn how to perform secondary development and testing based on the open-source version of Coze Studio.
   * [Troubleshooting](https://github.com/coze-dev/coze-studio/wiki/7.-Development-Standards#troubleshooting): Learn how to view container states and system logs.

## Using the open-source version of Coze Studio
> Regarding how to use Coze Studio, refer to the [Coze Development Platform Official Documentation Center](https://www.coze.cn/open/docs) for more information. Please note that certain features, such as tone customization, are limited to the commercial version. Differences between the open-source and commercial versions can be found in the **Feature List**.

* [Quick Start](https://www.coze.cn/open/docs/guides/quickstart): Quickly build an AI assistant agent with Coze Studio.
* [Developing Agents](https://www.coze.cn/open/docs/guides/agent_overview): Learn how to create, build, publish, and manage agents. You can use functions such as knowledge, plugins, etc., to resolve model hallucination and lack of expertise in professional fields. In addition, Coze Studio provides rich memory features that enable agents to generate more accurate responses based on a personal user's historical conversations during interactions.
* [Develop workflows](https://www.coze.cn/open/docs/guides/workflow): A workflow is a set of executable instructions used to implement business logic or complete specific tasks. It structures data flow and task processing for apps or agents. Coze Studio provides a visual canvas where you can quickly build workflows by dragging and dropping nodes.
* [Resources such as plugins](https://www.coze.cn/open/docs/guides/plugin): In Coze Studio, workflows, plugins, databases, knowledge bases, and variables are collectively referred to as resources.
* **API & SDK**: Coze Studio supports [API related to chat and workflows](https://github.com/coze-dev/coze-studio/wiki/6.-API-Reference), and you can also integrate agents or apps with local business systems through [Chat SDK](https://www.coze.cn/open/docs/developer_guides/web_sdk_overview).
* [Tutorials for practice](https://www.coze.cn/open/docs/tutorial/chat_sdk_web_online_customer_service): Learn how to use Coze Studio to implement various AI scenarios, such as building web-based online customer service using Chat SDK.
