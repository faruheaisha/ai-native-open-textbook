---
title: "构建你的第一个 LangGraph"
sourceId: "08-agents/huggingface-agents-course"
sourceTitle: "Hugging Face Agents Course（智能体课程）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/huggingface/agents-course"
entryUrl: "https://github.com/huggingface/agents-course/blob/b3946b1d09d29c65736e219d48a8a736a2c52154/units/zh-CN/unit2/langgraph/first_graph.mdx"
sourceRel: "units/zh-CN/unit2/langgraph/first_graph.mdx"
rawUrl: "/raw/08-agents/huggingface-agents-course/units/zh-CN/unit2/langgraph/first_graph.mdx"
sourceSha256: "ed8d8234a0d3399b2fd929d4a73e192eeb25f4f0eff209d1cb23971aa19f556d"
pageSha256: "ed8d8234a0d3399b2fd929d4a73e192eeb25f4f0eff209d1cb23971aa19f556d"
contentMode: "local-full"
zh: ""
---

# 构建你的第一个 LangGraph

现在我们已经理解了基本构建模块，让我们通过构建第一个功能图来实践。我们将实现 Alfred 的邮件处理系统，他需要：

1. 阅读 incoming emails
2. 将其分类为 spam 或 legitimate
3. 为 legitimate 邮件起草初步响应
4. 当邮件合法时向 Mr. Wayne 发送信息（仅打印）

这个示例演示了如何使用 LangGraph 构建涉及基于 LLM 决策的工作流程结构。虽然这不能算是真正的 Agent（因为没有涉及工具），但本节更侧重于学习 LangGraph 框架而非 Agents。

> [!TIP]
> 你可以在 <a href="https://huggingface.co/agents-course/notebooks/resolve/main/unit2/langgraph/mail_sorting.ipynb" target="_blank">这个 notebook</a> 中查看完整代码，并通过 Google Colab 运行。

## 工作流程
这是我们将要构建的工作流程：
<img src="https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/LangGraph/first_graph.png" alt="First LangGraph"/>

## 环境设置

首先安装必要的包：

```python
%pip install langgraph langchain_openai
```

接下来，让我们导入必要的模块：

```python
import os
from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage
```

## 步骤 1：定义我们的状态

让我们定义 Alfred 在电子邮件处理工作流程中需要跟踪哪些信息：

```python
class EmailState(TypedDict):
    # 正在处理的电子邮件
    email: Dict[str, Any]  # 包含主题、发件人、正文等。
    
    # 分析与决策
    is_spam: Optional[bool]
    
    # 响应生成
    draft_response: Optional[str]
    
    # 处理元数据
    messages: List[Dict[str, Any]]  # 跟踪与 LLM 的对话以进行分析
```

> 💡 **提示：**让您的状态足够全面，以跟踪所有重要信息，但避免用不必要的细节使其变得臃肿。

## 第 2 步：定义我们的节点

现在，让我们创建将形成我们节点的处理函数：

```python
# Initialize our LLM
model = ChatOpenAI(temperature=0)

def read_email(state: EmailState):
    """Alfred reads and logs the incoming email"""
    email = state["email"]
    
    # 在这里我们可能会做一些初步的预处理
    print(f"Alfred is processing an email from \{email['sender']\} with subject: \{email['subject']\}")
    
    # 这里不需要更改状态
    return \{\}

def classify_email(state: EmailState):
    """Alfred uses an LLM to determine if the email is spam or legitimate"""
    email = state["email"]
    
    # 为 LLM 准备提示
    prompt = f"""
    As Alfred the butler, analyze this email and determine if it is spam or legitimate.
    
    Email:
    From: \{email['sender']\}
    Subject: \{email['subject']\}
    Body: \{email['body']\}
    
    First, determine if this email is spam. If it is spam, explain why.
    If it is legitimate, categorize it (inquiry, complaint, thank you, etc.).
    """
    
    # Call the LLM
    messages = [HumanMessage(content=prompt)]
    response = model.invoke(messages)
    
    # 解析响应的简单逻辑（在实际应用中，您需要更强大的解析）
    response_text = response.content.lower()
    is_spam = "spam" in response_text and "not spam" not in response_text
    
    # 如果是垃圾邮件，请提取原因
    spam_reason = None
    if is_spam and "reason:" in response_text:
        spam_reason = response_text.split("reason:")[1].strip()
    
    # 确定类别是否合法
    email_category = None
    if not is_spam:
        categories = ["inquiry", "complaint", "thank you", "request", "information"]
        for category in categories:
            if category in response_text:
                email_category = category
                break
    
    # 更新消息以进行追踪
    new_messages = state.get("messages", []) + [
        \{"role": "user", "content": prompt\},
        \{"role": "assistant", "content": response.content\}
    ]
    
    # 返回状态更新
    return \{
        "is_spam": is_spam,
        "spam_reason": spam_reason,
        "email_category": email_category,
        "messages": new_messages
    \}

def handle_spam(state: EmailState):
    """Alfred discards spam email with a note"""
    print(f"Alfred has marked the email as spam. Reason: \{state['spam_reason']\}")
    print("The email has been moved to the spam folder.")
    
    # 我们已处理完这封电子邮件
    return \{\}

def draft_response(state: EmailState):
    """Alfred drafts a preliminary response for legitimate emails"""
    email = state["email"]
    category = state["email_category"] or "general"
    
    # 为 LLM 准备提示词
    prompt = f"""
    As Alfred the butler, draft a polite preliminary response to this email.
    
    Email:
    From: \{email['sender']\}
    Subject: \{email['subject']\}
    Body: \{email['body']\}
    
    This email has been categorized as: \{category\}
    
    Draft a brief, professional response that Mr. Hugg can review and personalize before sending.
    """
    
    # Call the LLM
    messages = [HumanMessage(content=prompt)]
    response = model.invoke(messages)
    
    # 更新消息以进行追踪
    new_messages = state.get("messages", []) + [
        \{"role": "user", "content": prompt\},
        \{"role": "assistant", "content": response.content\}
    ]
    
    # 返回状态更新
    return \{
        "draft_response": response.content,
        "messages": new_messages
    \}

def notify_mr_hugg(state: EmailState):
    """Alfred notifies Mr. Hugg about the email and presents the draft response"""
    email = state["email"]
    
    print("\n" + "="*50)
    print(f"Sir, you've received an email from \{email['sender']\}.")
    print(f"Subject: \{email['subject']\}")
    print(f"Category: \{state['email_category']\}")
    print("\nI've prepared a draft response for your review:")
    print("-"*50)
    print(state["draft_response"])
    print("="*50 + "\n")
    
    # 我们已处理完这封电子邮件
    return \{\}
```

## 步骤 3：定义我们的路由逻辑

我们需要一个函数来确定分类后要采取哪条路径：

```python
def route_email(state: EmailState) -> str:
    """Determine the next step based on spam classification"""
    if state["is_spam"]:
        return "spam"
    else:
        return "legitimate"
```

> 💡 **注意：** LangGraph 调用此路由函数来确定在分类节点之后要跟随哪条边。返回值必须与我们的条件边映射中的一个键匹配。

## 步骤 4：创建 StateGraph 并定义边

现在我们将所有内容连接在一起：

```python
# 创建 graph
email_graph = StateGraph(EmailState)

# 添加 nodes
email_graph.add_node("read_email", read_email)
email_graph.add_node("classify_email", classify_email)
email_graph.add_node("handle_spam", handle_spam)
email_graph.add_node("draft_response", draft_response)
email_graph.add_node("notify_mr_hugg", notify_mr_hugg)

# 添加 edges - 定义流程
email_graph.add_edge("read_email", "classify_email")

# 从 classify_email 添加条件分支
email_graph.add_conditional_edges(
    "classify_email",
    route_email,
    \{
        "spam": "handle_spam",
        "legitimate": "draft_response"
    \}
)

# 添加最后的 edges
email_graph.add_edge("handle_spam", END)
email_graph.add_edge("draft_response", "notify_mr_hugg")
email_graph.add_edge("notify_mr_hugg", END)

# 编译 graph
compiled_graph = email_graph.compile()
```

注意我们如何使用 LangGraph 提供的特殊“END”节点。这表示工作流完成的终端状态。

## 步骤 5：运行应用程序

让我们用一封合法的电子邮件和一封垃圾邮件来测试我们的图表：

```python
# 合法电子邮件示例
legitimate_email = \{
    "sender": "john.smith@example.com",
    "subject": "Question about your services",
    "body": "Dear Mr. Hugg, I was referred to you by a colleague and I'm interested in learning more about your consulting services. Could we schedule a call next week? Best regards, John Smith"
\}

# 垃圾邮件示例
spam_email = \{
    "sender": "winner@lottery-intl.com",
    "subject": "YOU HAVE WON $5,000,000!!!",
    "body": "CONGRATULATIONS! You have been selected as the winner of our international lottery! To claim your $5,000,000 prize, please send us your bank details and a processing fee of $100."
\}

# 处理合法电子邮件
print("\nProcessing legitimate email...")
legitimate_result = compiled_graph.invoke(\{
    "email": legitimate_email,
    "is_spam": None,
    "spam_reason": None,
    "email_category": None,
    "draft_response": None,
    "messages": []
\})

# 处理垃圾邮件
print("\nProcessing spam email...")
spam_result = compiled_graph.invoke(\{
    "email": spam_email,
    "is_spam": None,
    "spam_reason": None,
    "email_category": None,
    "draft_response": None,
    "messages": []
\})
```

## 第 6 步：使用 Langfuse 检查我们的邮件分类智能体 📡

随着 Alfred 对主分类智能体进行微调，他越来越厌倦调试其运行。智能体本质上是不可预测的，难以检查。但由于他的目标是构建终极垃圾邮件检测智能体并将其部署到生产中，因此他需要强大的可追溯性以供将来监控和分析。

为此，Alfred 可以使用可观察性工具（例如 [Langfuse](https://langfuse.com/)）来跟踪和监控智能体。

首先，我们 pip install Langfuse：
```python
%pip install -q langfuse
```

接下来，我们将 Langfuse API 密钥和主机地址添加为环境变量。您可以通过注册 [Langfuse Cloud](https://cloud.langfuse.com) 或 [self-host Langfuse](https://langfuse.com/self-hosting) 获取 Langfuse 凭据。

```python
import os
 
# Get keys for your project from the project settings page: https://cloud.langfuse.com
os.environ["LANGFUSE_PUBLIC_KEY"] = "pk-lf-..." 
os.environ["LANGFUSE_SECRET_KEY"] = "sk-lf-..."
os.environ["LANGFUSE_HOST"] = "https://cloud.langfuse.com" # 🇪🇺 EU region
# os.environ["LANGFUSE_HOST"] = "https://us.cloud.langfuse.com" # 🇺🇸 US region
```

然后，我们配置 [Langfuse `callback_handler`](https://langfuse.com/docs/integrations/langchain/tracing#add-langfuse-to-your-langchain-application)，并通过将 `langfuse_callback` 添加到图的调用来检测智能体：`config=\{"callbacks": [langfuse_handler]\}`。

```python   
from langfuse.langchain import CallbackHandler

# 为 LangGraph/Langchain 初始化 Langfuse CallbackHandler（跟踪）
langfuse_handler = CallbackHandler()

# 处理合法电子邮件
legitimate_result = compiled_graph.invoke(
    input=\{"email": legitimate_email, "is_spam": None, "spam_reason": None, "email_category": None, "draft_response": None, "messages": []\},
    config=\{"callbacks": [langfuse_handler]\}
)
```

Alfred 现已连接 🔌！LangGraph 的运行记录在 Langfuse 中，使他能够全面了解智能体的行为。通过此设置，他可以重新查看之前的运行并进一步完善他的邮件分类智能体。

![Langfuse 中的示例跟踪](https://langfuse.com/images/cookbook/huggingface-agent-course/langgraph-trace-legit.png)

_[带有合法电子邮件的跟踪的公共链接](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/f5d6d72e-20af-4357-b232-af44c3728a7b?timestamp=2025-03-17T10%3A13%3A28.413Z&observation=6997ba69-043f-4f77-9445-700a033afba1)_

## 可视化我们的图表

LangGraph 允许我们可视化我们的工作流程，以便更好地理解和调试其结构：

```python
compiled_graph.get_graph().draw_mermaid_png()
```
<img src="https://huggingface.co/datasets/agents-course/course-images/resolve/main/en/unit2/LangGraph/mail_flow.png" alt="Mail LangGraph"/>

这会产生一个可视化表示，显示我们的节点如何连接以及可以采取的条件路径。

## 我们构建了什么

我们创建了一个完整的电子邮件处理工作流程：

1. 接收传入的电子邮件
2. 使用 LLM 将其分类为垃圾邮件或合法邮件
3. 通过丢弃垃圾邮件来处理垃圾邮件
4. 对于合法电子邮件，起草回复并通知 Mr. Hugg

这展示了 LangGraph 使用 LLM 编排复杂工作流程同时保持清晰、结构化流程的强大功能。

## 关键要点

- **状态管理**：我们定义了全面的状态来跟踪电子邮件处理的所有方面
- **节点实现**：我们创建了与 LLM 交互的功能节点
- **条件路由**：我们根据电子邮件分类实现了分支逻辑
- **终端状态**：我们使用 END 节点标记工作流程中的完成点

## 下一步是什么？

在下一部分中，我们将探索 LangGraph 的更多高级功能，包括处理工作流中的人机交互以及根据多种条件实现更复杂的分支逻辑。
