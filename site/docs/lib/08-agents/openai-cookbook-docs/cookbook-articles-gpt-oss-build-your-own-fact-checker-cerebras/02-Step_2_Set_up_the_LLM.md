---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/articles/gpt-oss/build-your-own-fact-checker-cerebras.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/articles/gpt-oss/build-your-own-fact-checker-cerebras.md"
sourceSha256: "c23ee72ef44cd43583465f3b05986ec7af53affda1156cc299c50330f84b3efc"
pageSha256: "73f6b36faeaa6e53708adfcd55383d16992bf05767145077c047a068a5684a8e"
contentMode: "local-full"
zh: ""
---

### **Step 2: Set up the LLM**

Now, with the environment ready, create the function that will call the LLM.

```python
def call_cerebras_chat(
    user_content: str,
    system_content: str | None = None,
    model: str = CEREBRAS_MODEL_NAME,
    temperature: float = 1.0,
    top_p= 1.0,
    max_tokens: int = 4096,
    reasoning_effort: str = "medium"
):
    """
    Calls the Cerebras chat completion API.

    Args:
        user_content (str): The user's message.
        system_content (str | None): Optional system message to guide the LLM.
        model (str): The Cerebras model to use.
        temperature (float): Controls the randomness of the output.
        max_tokens (int): The maximum number of tokens in the response.

    Returns:
        str: The content of the LLM's response.
    """
    messages = []
    # Add a system message to guide the model's behavior
    if system_content:
        messages.append({"role": "system", "content": system_content})

    messages.append({"role": "user", "content": user_content})

    # Make the API call to Cerebras chat completions
    resp = cerebras_client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        top_p=top_p,
        max_tokens=max_tokens,
        reasoning_effort=reasoning_effort,
    )
    return resp.choices[0].message.content
```
