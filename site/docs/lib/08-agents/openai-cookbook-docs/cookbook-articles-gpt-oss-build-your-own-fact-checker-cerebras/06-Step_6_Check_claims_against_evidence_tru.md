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
pageSha256: "dac757a02b9c8130f648c4f39f963c739a94d54e9988c7af434e308696ef77ea"
contentMode: "local-full"
zh: ""
---

### **Step 6 – Check claims against evidence (true / false / uncertain)**

After collecting the claims and extracting them into independent factual claims, the LLM can now evaluate each claim for a verdict. The process has two steps:

1) **Retrieve evidence with Parallel:**
First, use Parallel to query authoritative sources related to the claim.

2) **Judge the claim with Cerebras:**
Then, send the evidence and the original claims to Cerebras for evaluation. Here's where Cerebras's ultra-fast inference becomes crucial, where the LLM can analyze multiple pieces of evidence, weigh contradictions, and generate a verdict. 

The model will return one of three structured verdicts:
- **True** — Evidence supports the claim
- **False** — Evidence contradicts the claim
- **Uncertain** — Not enough evidence, or sources conflict

Each verdict comes with an explanation and cited URLs, so the model's reasoning is transparent.

````python
from typing import Dict, Any
import textwrap
import re
import time

def fact_check_single_claim(claim: str) -> Dict[str, Any]:
    """
    Fact-check a single claim using:
      - Parallel Search for evidence
      - Cerebras LLM for verdict

    Args:
        claim (str): The factual claim to be checked.

    Returns:
        Dict[str, Any]: A dictionary containing the claim, verdict, reason, and sources.
        {
          "claim": str,
          "verdict": "true" | "false" | "uncertain",
          "reason": str,
          "sources": [url, ...]
        }
    """
    print(f"\nFact-checking claim: {claim}")

    # Search the web for evidence relevant to the claim
    results = search_web(query=claim, num=6, mode="one-shot")
    print(f"Retrieved {len(results)} evidence sources")

    # Compile the search results into a clean, readable context for the LLM
    evidence_context = build_evidence_context(results)

    # Define the system prompt to instruct the Cerebras LLM (gpt-oss-120B) on how to evaluate each claim
    system_prompt_content = (
        "You are a careful, skeptical fact-checking assistant.\n"
        "You get a factual claim and web search excerpts.\n"
        "Decide if the evidence supports, contradicts, or does not clearly resolve the claim.\n\n"
        "Respond with STRICT JSON:\n"
        "{\n"
        '  "verdict": "true" | "false" | "uncertain",\n'
        '  "reason": "short explanation",\n'
        '  "top_sources": ["url1", "url2", ...]\n'
        "}\n"
        "Use 'true' only when the evidence strongly supports the claim.\n"
        "Use 'false' only when it clearly contradicts the claim.\n"
        "Otherwise use 'uncertain'."
    )

    # Construct the user prompt
    user_prompt_content = textwrap.dedent(f"""
    Claim:
    {claim}

    Evidence (web search excerpts):
    {evidence_context}
    """)

    messages = [
        {"role": "system", "content": system_prompt_content},
        {"role": "user", "content": user_prompt_content}
    ]

    start_time = time.time()
    # Call the Cerebras LLM (gpt-oss-120B) to get a structured verdict
    resp = cerebras_client.chat.completions.create(
        model=CEREBRAS_MODEL_NAME,
        messages=messages,
        temperature=1.0,
        top_p=1.0,
        max_tokens=4096,    
        reasoning_effort="medium"
    )
    raw = resp.choices[0].message.content.strip()
    end_time = time.time()
    print(f"Cerebras LLM judgment for this claim took {end_time - start_time:.2f} seconds")

    # Clean up the raw JSON output from the LLM
    raw = re.sub(r"^\s*```(?:json)?\s*", "", raw, flags=re.IGNORECASE)
    raw = re.sub(r"\s*```\s*$", "", raw)

    try:
        data = json.loads(raw)
    except Exception as e:
        print("Error parsing judgment JSON:", e)
        print("Raw model output:\n", raw)
        data = {
            "verdict": "uncertain",
            "reason": "Could not parse model output.",
            "top_sources": [],
        }

    # Extract and normalize the verdict (true, false, or uncertain)
    verdict = str(data.get("verdict", "uncertain")).lower()
    if verdict not in {"true", "false", "uncertain"}:
        verdict = "uncertain"

    # Extract and format the top sources cited by the LLM
    top_sources = data.get("top_sources") or []
    if not isinstance(top_sources, list):
        top_sources = [str(top_sources)]
    top_sources = [str(u) for u in top_sources][:5]

    # Consolidate all the fact-checking results into a single dictionary
    result = {
        "claim": claim,
        "verdict": verdict,
        "reason": data.get("reason", ""),
        "sources": top_sources,
    }

    # Print the detailed fact-checking result for clarity
    print("Verdict:", result["verdict"].upper())
    print("Reason:", result["reason"])
    if result["sources"]:
        print("Sources:")
        for s in result["sources"]:
            print("  •", s)

    return result

print("Single-claim fact-checker ready")
````

```text
Single-claim fact checker ready
```
