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
pageSha256: "bce904cc107dc463f6b7e51945a4489e5cc7404497583de4337ac04378f24613"
contentMode: "local-full"
zh: ""
---

### **Step 5 – Find the claims to verify**

Next, identify the specific statements in the text to verify. Rather than analyzing an entire article at once, the LLM should break it into multiple clear, stand-alone claims that can be judged verbatim.

For example, from a short paragraph like: “The unemployment rate fell to 3.5% in March 2024, and Company X announced a $10B merger the same week.”

The LLM should extract individual factual statements such as:

*  “The unemployment rate fell to 3.5% in March 2024.”
*  “Company X announced a $10 billion merger.”

Each one can then be checked independently, which makes the entire fact-checking process precise and reliable.

````python
import json
import re
import time

def extract_claims_from_text(text: str, max_claims: int = 8) -> list[str]:
    """
    Use Cerebras LLM to extract atomic factual claims from text.
    Output format (strict JSON):
    {
      "claims": ["...", "."...]
    }
    """
    # Instruct the LLM to extract factual claims
    system_prompt_content = (
        "You are an information extraction assistant.\n"
        "From the user's text, extract up to {max_claims} atomic factual claims.\n"
        "Each claim should:\n"
        "- Be checkable against external sources (dates, numbers, named entities)\n"
        "- Be concrete and not an opinion.\n\n"
        "Return STRICT JSON:\n"
        "{{\n"
        '  "claims": ["...", "..."]\n'
        "}}\n"
    ).format(max_claims=max_claims)

    # Prompt the LLM for claim extraction
    user_prompt_content = f"Text:\n\n{text}\n\nExtract up to {max_claims} factual claims."

    messages = [
        {"role": "system", "content": system_prompt_content},
        {"role": "user", "content": user_prompt_content}
    ]

    start_time = time.time()
    # Call Cerebras LLM (gpt-oss-120B) for claim extraction
    resp = cerebras_client.chat.completions.create(
        model=CEREBRAS_MODEL_NAME,
        messages=messages,
        temperature=1.0,
        top_p=1.0,
        max_tokens=4096,
        reasoning_effort="medium",
    )
    raw = resp.choices[0].message.content.strip()
    end_time = time.time()
    print(f"Cerebras LLM claim extraction took {end_time - start_time:.2f} seconds")

    # Clean up the raw JSON output
    raw = re.sub(r"^\s*```(?:json)?\s*", "", raw, flags=re.IGNORECASE)
    raw = re.sub(r"\s*```\s*$", "", raw)

    try:
        data = json.loads(raw)
        claims = data.get("claims", [])
        claims = [c.strip() for c in claims if isinstance(c, str) and c.strip()]
        return claims[:max_claims]
    except Exception as e:
        print("Error parsing claims JSON:", e)
        print("Raw model output:\n", raw)
        return []

print("Claim extraction ready")
````

```text
Claim extraction ready
```
