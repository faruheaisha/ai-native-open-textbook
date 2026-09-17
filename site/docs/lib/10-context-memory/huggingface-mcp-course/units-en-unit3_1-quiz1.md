---
title: "Quiz 1: MCP Server Implementation"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit3_1/quiz1.mdx"
sourceRel: "units/en/unit3_1/quiz1.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit3_1/quiz1.mdx"
sourceSha256: "aa99c6c598de215b4847257f67e940173e2317fd3b3d66e89d595de7d8c09dfb"
pageSha256: "aa99c6c598de215b4847257f67e940173e2317fd3b3d66e89d595de7d8c09dfb"
contentMode: "local-full"
zh: "on"
---

# Quiz 1: MCP Server Implementation

Test your knowledge of MCP server concepts and implementation for the Pull Request Agent.

<div class="tb-zh"><p>检测你对 Pull Request Agent 所涉及的 MCP 服务端概念与实现的理解。</p></div>

### Q1: What is the primary role of an MCP Server in the Pull Request Agent architecture?

**选项**

- A. To host the user interface for the application
- B. To expose tools and resources that the AI agent can use to interact with GitHub
- C. To expose tools for reading and updating model repository tags on the Hugging Face Hub
- D. To train the AI model on pull request data

<div class="tb-zh"><p>A. 为应用托管用户界面；B. 暴露 AI 智能体可用于与 GitHub 交互的工具和资源；C. 暴露用于读取和更新 Hugging Face Hub 上模型仓库标签的工具；D. 用 PR 数据训练 AI 模型</p></div>

**答案解析**

- **A** — The MCP Server provides backend capabilities, not the user interface.
- **B** — Close, but this project focuses on the Hugging Face Hub, not GitHub.
- **C（正确答案）** — Correct! The MCP Server provides get_current_tags and add_new_tag tools for Hub interactions.
- **D** — MCP Servers provide runtime capabilities, not model training functionality.

<div class="tb-zh"><p>A — MCP 服务端提供的是后端能力，不是用户界面；B — 接近了，但本项目聚焦的是 Hugging Face Hub，而不是 GitHub；C（正确答案）— 正确！该 MCP 服务端提供 get_current_tags 与 add_new_tag 两个工具用于与 Hub 交互；D — MCP 服务端提供的是运行期能力，不负责模型训练。</p></div>

### Q2: In the FastMCP implementation, why must all MCP tool functions return strings instead of Python objects?

**选项**

- A. To improve performance by reducing memory usage
- B. To ensure reliable data exchange between the MCP server and client
- C. To make the code easier to debug
- D. To comply with Hugging Face Hub API requirements

<div class="tb-zh"><p>A. 通过减少内存占用提升性能；B. 确保 MCP 服务端与客户端之间可靠地交换数据；C. 让代码更容易调试；D. 满足 Hugging Face Hub 的 API 要求</p></div>

**答案解析**

- **A** — While strings might be more memory efficient, this is not the primary reason.
- **B（正确答案）** — Correct! MCP protocol requires string responses, so we use json.dumps() to serialize data.
- **C** — While JSON strings are readable, this is not the primary technical requirement.
- **D** — This is an MCP protocol requirement, not specific to the Hub API.

<div class="tb-zh"><p>A — 字符串也许更省内存，但这并不是主要原因；B（正确答案）— 正确！MCP 协议要求返回字符串，所以我们用 json.dumps() 把数据序列化；C — JSON 字符串确实可读，但这不是主要的技术要求；D — 这是 MCP 协议的要求，与 Hub API 无关。</p></div>

### Q3: When implementing the `add_new_tag` tool, what is the purpose of checking if a tag already exists before creating a pull request?

**选项**

- A. To reduce API calls and improve performance
- B. To prevent creating duplicate pull requests and provide better user feedback
- C. To comply with Hugging Face Hub rate limits
- D. To ensure the tag format is valid

<div class="tb-zh"><p>A. 减少 API 调用、提升性能；B. 避免创建重复的 PR，并给用户更明确的反馈；C. 满足 Hugging Face Hub 的调用频率限制；D. 确保标签格式合法</p></div>

**答案解析**

- **A** — While this helps performance, it's not the primary reason for the check.
- **B（正确答案）** — Correct! This validation prevents unnecessary PRs and returns meaningful status messages.
- **C** — While avoiding unnecessary calls helps with rate limits, this is not the primary purpose.
- **D** — Tag validation is separate from checking if it already exists.

<div class="tb-zh"><p>A — 这确实有助于性能，但不是做这项检查的主要原因；B（正确答案）— 正确！这层校验能避免无谓的 PR，并返回有意义的状态信息；C — 避免多余调用对频率限制有帮助，但不是主要目的；D — 标签格式校验与「标签是否已存在」的检查是两件事。</p></div>

### Q4: In the MCP server implementation, what happens when a model repository doesn't have an existing README.md file?

**选项**

- A. The add_new_tag tool will fail with an error
- B. The tool creates a new ModelCard with ModelCardData and proceeds with the tag addition
- C. The tool skips adding the tag and returns a warning
- D. The tool automatically creates a default README with placeholder content

<div class="tb-zh"><p>A. add_new_tag 工具会报错失败；B. 工具会用 ModelCardData 新建一个 ModelCard，然后继续添加标签；C. 工具会跳过添加并返回一条警告；D. 工具会自动创建一个带占位内容的默认 README</p></div>

**答案解析**

- **A** — The implementation handles this case gracefully.
- **B（正确答案）** — Correct! The code handles HfHubHTTPError and creates a new model card when none exists.
- **C** — The tool doesn't skip the operation - it creates what's needed.
- **D** — It creates a minimal model card structure, not placeholder content.

<div class="tb-zh"><p>A — 实现里对这种情况做了妥善处理；B（正确答案）— 正确！代码捕获了 HfHubHTTPError，并在没有模型卡时新建一个；C — 工具不会跳过操作，而是把缺的东西补上；D — 它创建的是最小可用的模型卡结构，而不是占位内容。</p></div>

### Q5: What is the significance of using `create_pr=True` in the `hf_api.create_commit()` function call?

**选项**

- A. It makes the commit directly to the main branch
- B. It automatically creates a pull request instead of committing directly to the main branch
- C. It creates a private branch that only the repository owner can see
- D. It validates the commit before creating it

<div class="tb-zh"><p>A. 它直接向主分支提交；B. 它自动创建 PR，而不是直接向主分支提交；C. 它创建一个只有仓库所有者可见的私有分支；D. 它在提交前先做校验</p></div>

**答案解析**

- **A** — Setting create_pr=True creates a pull request, not a direct commit to main.
- **B（正确答案）** — Correct! This enables the review workflow and follows repository governance practices.
- **C** — Pull requests are visible to repository collaborators and can be public.
- **D** — Validation happens regardless of the create_pr parameter.

<div class="tb-zh"><p>A — 设置 create_pr=True 会创建 PR，而不是直接提交到主分支；B（正确答案）— 正确！这样才形成可评审的工作流，也符合仓库的治理实践；C — PR 对仓库协作者可见，也可以公开；D — 无论 create_pr 取值如何，校验都会进行。</p></div>

### Q6: Why does the MCP server implementation use extensive logging with emojis throughout the code?

**选项**

- A. To make the code more fun and engaging for developers
- B. To help with debugging and monitoring when the server runs autonomously in response to Hub events
- C. To comply with FastMCP logging requirements
- D. To reduce the amount of text in log files

<div class="tb-zh"><p>A. 让代码对开发者更有趣、更吸引人；B. 当服务端因 Hub 事件而自动运行时，便于调试与监控；C. 满足 FastMCP 的日志要求；D. 减少日志文件中的文本量</p></div>

**答案解析**

- **A** — While emojis are visually appealing, there's a more practical reason.
- **B（正确答案）** — Correct! Since the agent responds to webhooks automatically, detailed logs are crucial for troubleshooting.
- **C** — FastMCP doesn't require specific logging formats or emojis.
- **D** — Emojis don't significantly reduce log file size and this isn't the primary goal.

<div class="tb-zh"><p>A — emoji 确实醒目，但还有更实际的原因；B（正确答案）— 正确！由于智能体会自动响应 webhook，详细的日志对排查问题至关重要；C — FastMCP 并不要求特定的日志格式或 emoji；D — emoji 并不会显著缩小日志体积，这也不是主要目的。</p></div>

Congrats on finishing this Quiz 🥳! If you need to review any elements, take the time to revisit the chapter to reinforce your knowledge.

<div class="tb-zh"><p>恭喜你完成这份自测 🥳！如果需要回顾某些内容，不妨花点时间重读该章，巩固所学。</p></div>
