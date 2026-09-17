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
pageSha256: "0cb3f92ffeaf3b3e5c48ea387fcdc13d2024d56ceeca819e6a5e0acecc34c010"
contentMode: "local-full"
zh: ""
---

### **Step 7 - Fact-check an entire text**

This final step brings everything together. Here, take any piece of text and run each one through the full fact-checking process you built.

```python
def fact_check_text(text: str, max_claims: int = 6):
    # First, extract factual claims from the input text
    claims = extract_claims_from_text(text, max_claims=max_claims)

    print(f"Extracted {len(claims)} claims:")
    for i, c in enumerate(claims, 1):
        print(f"  {i}. {c}")

    all_results = []
    # Iterate through each extracted claim and perform a single fact-check
    for i, claim in enumerate(claims):
        print(f"\n{'='*50}\nFact-checking Claim {i+1} of {len(claims)}: '{claim}'")
        single_claim_result = fact_check_single_claim(claim)
        all_results.append(single_claim_result)
        print(f"{'='*50}")

    # After all claims are checked, print a summary of all results
    print("\n\n--- Summary of All Fact-Checking Results ---\n")
    for result in all_results:
        print(f"Claim: {result['claim']}")
        print(f"Verdict: {result['verdict'].upper()}")
        print(f"Reason: {result['reason']}")
        if result['sources']:
            print("Sources:")
            for s in result['sources']:
                print(f"  • {s}")
        print("\n" + "-"*50 + "\n")

    return all_results

print("Full fact-checking pipeline ready")
```

```text
Full fact-checking pipeline ready
```
