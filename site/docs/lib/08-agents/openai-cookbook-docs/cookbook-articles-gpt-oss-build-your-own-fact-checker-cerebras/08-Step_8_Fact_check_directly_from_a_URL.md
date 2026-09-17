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
pageSha256: "597dc10a5d585ef9f48970c84c692c20f092552d9307f15a4e1d034c69e48f79"
contentMode: "local-full"
zh: ""
---

### **Step 8: Fact check directly from a URL**
Finally, to make the fact-checker even easier, add a function that accepts a URL directly.

```python
import requests
from bs4 import BeautifulSoup

def extract_claims_from_url(url: str, max_claims: int = 8) -> list[str]:
    """
    Extracts atomic factual claims from the main content of a given URL.
    Fetches content using requests/BeautifulSoup and uses Cerebras LLM for claim extraction.
    """
    print(f"Fetching content from URL: {url}")
    try:
        # Fetch the content of the URL
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Attempt to find the main content by looking for 'article' or 'main' tags
        main_content_div = soup.find('article') or soup.find('main')
        if main_content_div:
            main_text = ' '.join([p.get_text() for p in main_content_div.find_all('p')])
        else:
            main_text_elements = soup.find_all(['p', 'h1', 'h2', 'h3'])
            main_text = ' '.join([elem.get_text() for elem in main_text_elements])

        # Check if enough text was extracted
        if not main_text or len(main_text.strip()) < 100:
            print(f"Warning: Not enough main text found for URL: {url}")
            return []

        print(f"Extracted {len(main_text)} characters from the URL. Now extracting claims...")
        # Use the LLM to extract claims from the cleaned text
        claims = extract_claims_from_text(main_text, max_claims=max_claims)
        return claims
    except requests.exceptions.RequestException as e:
        print(f"Error fetching content from URL {url}: {e}")
        return []
    except Exception as e:
        print(f"Error processing URL {url}: {e}")
        return []

print("URL claim extraction function ready")
```

```text
URL claim extraction function ready
```
