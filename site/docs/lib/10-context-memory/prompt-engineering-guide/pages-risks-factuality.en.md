---
title: "Factuality"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/risks/factuality.en.mdx"
sourceRel: "pages/risks/factuality.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/risks/factuality.en.mdx"
sourceSha256: "1d10349421a442bfb5175ced48e910b6db99404ab3f1c514c7d765fcdbeff9e7"
pageSha256: "1d10349421a442bfb5175ced48e910b6db99404ab3f1c514c7d765fcdbeff9e7"
contentMode: "local-full"
zh: ""
---

# Factuality

LLMs have a tendency to generate responses that sounds coherent and convincing but can sometimes be made up. Improving prompts can help improve the model to generate more accurate/factual responses and reduce the likelihood to generate inconsistent and made up responses. 

Some solutions might include:
- provide ground truth (e.g., related article paragraph or Wikipedia entry) as part of context to reduce the likelihood of the model producing made up text.
- configure the model to produce less diverse responses by decreasing the probability parameters and instructing it to admit (e.g., "I don't know") when it doesn't know the answer. 
- provide in the prompt a combination of examples of questions and responses that it might know about and not know about

Let's look at a simple example:

*Prompt:*
```
Q: What is an atom? 
A: An atom is a tiny particle that makes up everything. 

Q: Who is Alvan Muntz? 
A: ? 

Q: What is Kozar-09? 
A: ? 

Q: How many moons does Mars have? 
A: Two, Phobos and Deimos. 

Q: Who is Neto Beto Roberto? 
```

*Output:*
```
A: ?
```

I made up the name "Neto Beto Roberto" so the model is correct in this instance. Try to change the question a bit and see if you can get it to work. There are different ways you can improve this further based on all that you have learned so far.
