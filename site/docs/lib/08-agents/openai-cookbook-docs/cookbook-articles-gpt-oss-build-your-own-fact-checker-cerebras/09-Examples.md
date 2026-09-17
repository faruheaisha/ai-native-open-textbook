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
pageSha256: "03e9088be2586eb01f99af0d0398a3a60fc79a25b0b6eba5558c53cbc78b3edc"
contentMode: "local-full"
zh: ""
---

### **Examples**

Start with a short sample text first.

```python
sample_text = """\nThe Earth is flat and the moon is made of cheese. Humans landed on Mars in 1969. Albert Einstein was born in Germany in 1879.\n"""

print("Fact-checking the following text:\n")
print(sample_text)

fact_check_results = fact_check_text(sample_text)

display(fact_check_results)
```

```text
Fact-checking the following text:

The Earth is flat and the moon is made of cheese. Humans landed on Mars in 1969. Albert Einstein was born in Germany in 1879.

Cerebras LLM claim extraction took 0.34 seconds
Extracted 5 claims:
  1. The Earth is flat.
  2. The moon is made of cheese.
  3. Humans landed on Mars in 1969.
  4. Albert Einstein was born in Germany.
  5. Albert Einstein was born in 1879.

==================================================
Fact-checking Claim 1 of 5: 'The Earth is flat.'

Fact-checking claim: The Earth is flat.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.39 seconds
Verdict: FALSE
Reason: The provided sources explain that scientific evidence demonstrates the Earth is a sphere and that flat‑Earth beliefs are a debunked conspiracy, directly contradicting the claim.
Sources:
  • https://pursuit.unimelb.edu.au/articles/why-do-some-people-believe-the-earth-is-flat
==================================================

==================================================
Fact-checking Claim 2 of 5: 'The moon is made of cheese.'

Fact-checking claim: The moon is made of cheese.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.30 seconds
Verdict: FALSE
Reason: NASA scientific sources describe the Moon's composition as layered rock, iron, silicon, magnesium, etc., with no indication of cheese, directly contradicting the claim.
Sources:
  • https://science.nasa.gov/moon/composition/
==================================================

==================================================
Fact-checking Claim 3 of 5: 'Humans landed on Mars in 1969.'

Fact-checking claim: Humans landed on Mars in 1969.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.48 seconds
Verdict: FALSE
Reason: The evidence shows that in 1969 NASA conducted unmanned Mars flyby missions (Mariner 6 and 7) and a manned Moon landing, with no indication of humans landing on Mars.
Sources:
  • https://www.facebook.com/groups/jameswebbtelescopecosmicexplorations/posts/762176293540444/
  • https://www.jpl.nasa.gov/missions/mariner-7/
==================================================

==================================================
Fact-checking Claim 4 of 5: 'Albert Einstein was born in Germany.'

Fact-checking claim: Albert Einstein was born in Germany.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.80 seconds
Verdict: TRUE
Reason: Wikipedia describes Einstein as a German-born theoretical physicist, confirming he was born in Germany.
Sources:
  • https://en.wikipedia.org/wiki/Albert_Einstein
  • https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/
==================================================

==================================================
Fact-checking Claim 5 of 5: 'Albert Einstein was born in 1879.'

Fact-checking claim: Albert Einstein was born in 1879.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.27 seconds
Verdict: TRUE
Reason: The Wikipedia entry lists Einstein's birthdate as 14 March 1879, confirming the claim.
Sources:
  • https://en.wikipedia.org/wiki/Albert_Einstein
==================================================

--- Summary of All Fact-Checking Results ---

Claim: The Earth is flat.
Verdict: FALSE
Reason: The provided sources explain that scientific evidence demonstrates the Earth is a sphere and that flat‑Earth beliefs are a debunked conspiracy, directly contradicting the claim.
Sources:
  • https://pursuit.unimelb.edu.au/articles/why-do-some-people-believe-the-earth-is-flat

--------------------------------------------------

Claim: The moon is made of cheese.
Verdict: FALSE
Reason: NASA scientific sources describe the Moon's composition as layered rock, iron, silicon, magnesium, etc., with no indication of cheese, directly contradicting the claim.
Sources:
  • https://science.nasa.gov/moon/composition/

--------------------------------------------------

Claim: Humans landed on Mars in 1969.
Verdict: FALSE
Reason: The evidence shows that in 1969 NASA conducted unmanned Mars flyby missions (Mariner 6 and 7) and a manned Moon landing, with no indication of humans landing on Mars.
Sources:
  • https://www.facebook.com/groups/jameswebbtelescopecosmicexplorations/posts/762176293540444/
  • https://www.jpl.nasa.gov/missions/mariner-7/

--------------------------------------------------

Claim: Albert Einstein was born in Germany.
Verdict: TRUE
Reason: Wikipedia describes Einstein as a German-born theoretical physicist, confirming he was born in Germany.
Sources:
  • https://en.wikipedia.org/wiki/Albert_Einstein
  • https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/

--------------------------------------------------

Claim: Albert Einstein was born in 1879.
Verdict: TRUE
Reason: The Wikipedia entry lists Einstein's birthdate as 14 March 1879, confirming the claim.
Sources:
  • https://en.wikipedia.org/wiki/Albert_Einstein

--------------------------------------------------
```

```text
[{'claim': 'The Earth is flat.',
  'verdict': 'false',
  'reason': 'The provided sources explain that scientific evidence demonstrates the Earth is a sphere and that flat‑Earth beliefs are a debunked conspiracy, directly contradicting the claim.',
  'sources': ['https://pursuit.unimelb.edu.au/articles/why-do-some-people-believe-the-earth-is-flat']},
 {'claim': 'The moon is made of cheese.',
  'verdict': 'false',
  'reason': "NASA scientific sources describe the Moon's composition as layered rock, iron, silicon, magnesium, etc., with no indication of cheese, directly contradicting the claim.",
  'sources': ['https://science.nasa.gov/moon/composition/']},
 {'claim': 'Humans landed on Mars in 1969.',
  'verdict': 'false',
  'reason': 'The evidence shows that in 1969 NASA conducted unmanned Mars flyby missions (Mariner 6 and 7) and a manned Moon landing, with no indication of humans landing on Mars.',
  'sources': ['https://www.facebook.com/groups/jameswebbtelescopecosmicexplorations/posts/762176293540444/',
   'https://www.jpl.nasa.gov/missions/mariner-7/']},
 {'claim': 'Albert Einstein was born in Germany.',
  'verdict': 'true',
  'reason': 'Wikipedia describes Einstein as a German-born theoretical physicist, confirming he was born in Germany.',
  'sources': ['https://en.wikipedia.org/wiki/Albert_Einstein',
   'https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/']},
 {'claim': 'Albert Einstein was born in 1879.',
  'verdict': 'true',
  'reason': "The Wikipedia entry lists Einstein's birthdate as 14 March 1879, confirming the claim.",
  'sources': ['https://en.wikipedia.org/wiki/Albert_Einstein']}]
```

Now, paste in a 400-word statement and see what the fact-checker says. 

[Note: this is a composite text example designed to verify the content fact-checker. It contains plausible but fabricated claims.]

```python
long_sample_text = """
In recent months, a number of widely shared posts and articles have circulated online making bold claims about technology, science, and public health. One viral thread asserted that Apple released the world’s first smartphone in 1992, long before the launch of the iPhone. The post claimed the device had a touchscreen, mobile internet capabilities, and even early forms of voice control. In reality, Apple did not release a smartphone in 1992, and the first widely recognized smartphone, the IBM Simon, was introduced in 1994 with far more limited features. The iPhone, launched in 2007, is credited with defining the modern smartphone era.

Another widely repeated claim stated that Mount Everest has shrunk by more than 500 meters due to rapid climate change. Several posts argued that melting ice and tectonic shifts had dramatically reduced the mountain’s height, supposedly confirmed by new satellite imagery. Geologists and survey data contradict this, showing that Everest’s height has changed only minimally over time. Recent revisions to Everest’s official height reflect improved measurement technology—not catastrophic geological change or the environmental collapse suggested online.

A sensational article suggested that NASA announced Earth will experience 15 days of complete darkness in November 2025 because of a rare planetary alignment. This claim resurfaces every few years in slightly different forms, yet NASA has consistently debunked every version of it. Astronomers explain that no known configuration of planets could block sunlight from reaching Earth for even a single day, let alone two weeks.

Another persistent piece of misinformation claimed that COVID-19 vaccines contain microchips designed for government tracking. Public health organizations worldwide have addressed this rumor repeatedly, stating unequivocally that no such technology exists in vaccines and that microelectronics cannot function or survive in biological environments in the way conspiracy theories suggest. Despite extensive scientific communication, this claim continues to spread across certain corners of the internet.

More recently, a trending health blog claimed that drinking eight cups of coffee per day reduces the risk of heart disease by 70%. While moderate coffee consumption has been studied for potential health benefits, no reputable research supports the exaggerated 70% figure promoted in the article. Excessive caffeine intake can create health concerns for many individuals, including increased heart rate, anxiety, and disrupted sleep.

In the tech sector, several posts gained traction by asserting that electric vehicles routinely explode in temperatures above 80 degrees Fahrenheit. Critics use this claim to argue that EVs pose unique safety threats. However, investigations by fire departments, insurance groups, and automotive engineers show no evidence of spontaneous combustion linked to moderate ambient temperatures. Vehicle fires—when they do occur—typically result from accidents, mechanical failures, or battery punctures, not temperature alone.

Another claim circulating widely suggests that major tech companies are secretly restricting home Wi-Fi speeds to force consumers into new subscription tiers. Internet service providers and independent network analysts have found no support for this, noting that slowdowns are far more commonly caused by outdated hardware, overcrowded networks, or poor signal placement within the home.

"""

print("Fact-checking the following longer text:\n")
print(long_sample_text[:500] + ('...' if len(long_sample_text) > 500 else ''))

long_fact_check_results = fact_check_text(long_sample_text)

display(long_fact_check_results)
```

```text
Fact-checking the following longer text:

In recent months, a number of widely shared posts and articles have circulated online making bold claims about technology, science, and public health. One viral thread asserted that Apple released the world’s first smartphone in 1992, long before the launch of the iPhone. The post claimed the device had a touchscreen, mobile internet capabilities, and even early forms of voice control. In reality, Apple did not release a smartphone in 1992, and the first widely recognized smartphone, the IBM Si...
Cerebras LLM claim extraction took 0.56 seconds
Extracted 6 claims:
  1. Apple did not release a smartphone in 1992; the first widely recognized smartphone, the IBM Simon, was introduced in 1994.
  2. The iPhone was launched in 2007 and is credited with defining the modern smartphone era.
  3. Mount Everest has not shrunk by more than 500 meters; its height has changed only minimally and recent revisions reflect improved measurement technology.
  4. NASA has debunked claims that Earth will experience 15 days of complete darkness in November 2025 due to a planetary alignment, stating no known configuration can block sunlight for that duration.
  5. COVID‑19 vaccines do not contain microchips for government tracking; no such microelectronics are present in any authorized vaccine.
  6. Drinking eight cups of coffee per day does not reduce the risk of heart disease by 70%; no reputable research supports that specific reduction figure.

==================================================
Fact-checking Claim 1 of 6: 'Apple did not release a smartphone in 1992; the first widely recognized smartphone, the IBM Simon, was introduced in 1994.'

Fact-checking claim: Apple did not release a smartphone in 1992; the first widely recognized smartphone, the IBM Simon, was introduced in 1994.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.40 seconds
Verdict: UNCERTAIN
Reason: The evidence clearly shows IBM Simon was first released in 1994, supporting that part of the claim. However, there is no explicit evidence provided about Apple not releasing a smartphone in 1992, so the claim cannot be fully verified.
Sources:
  • https://en.wikipedia.org/wiki/IBM_Simon
  • https://en.wikipedia.org/wiki/Smartphone
==================================================

==================================================
Fact-checking Claim 2 of 6: 'The iPhone was launched in 2007 and is credited with defining the modern smartphone era.'

Fact-checking claim: The iPhone was launched in 2007 and is credited with defining the modern smartphone era.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.35 seconds
Verdict: TRUE
Reason: The evidence confirms the iPhone was first released on June 29 2007 and describes it as a revolutionary device that "reinvented" the phone, indicating it is widely credited with defining the modern smartphone era.
Sources:
  • https://en.wikipedia.org/wiki/IPhone_(1st_generation)
  • https://theprint.in/features/brandma/iphone-1-a-revolutionary-smartphone-that-debuted-at-the-2007-oscars/889755/
==================================================

==================================================
Fact-checking Claim 3 of 6: 'Mount Everest has not shrunk by more than 500 meters; its height has changed only minimally and recent revisions reflect improved measurement technology.'

Fact-checking claim: Mount Everest has not shrunk by more than 500 meters; its height has changed only minimally and recent revisions reflect improved measurement technology.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.38 seconds
Verdict: TRUE
Reason: The sources state that Everest’s height is now 8,848.86 m, noting only slight adjustments from earlier measurements due to better technology and minor natural effects, with no indication of a shrinkage anywhere near 500 m.
Sources:
  • https://www.himalayanrecreation.com/blog/the-height-of-mount-everest
  • https://www.britannica.com/place/Mount-Everest
==================================================

==================================================
Fact-checking Claim 4 of 6: 'NASA has debunked claims that Earth will experience 15 days of complete darkness in November 2025 due to a planetary alignment, stating no known configuration can block sunlight for that duration.'

Fact-checking claim: NASA has debunked claims that Earth will experience 15 days of complete darkness in November 2025 due to a planetary alignment, stating no known configuration can block sunlight for that duration.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.47 seconds
Verdict: UNCERTAIN
Reason: The provided sources debunk similar 15‑day darkness hoaxes for 2015/2017 and state NASA never confirmed such an event, but none specifically address a claimed November 2025 event, so the claim is not directly supported or contradicted.
Sources:
  • https://www.snopes.com/fact-check/15-days-darkness-november/
  • https://www.space.com/31118-earth-darkness-hoax-debunked.html
==================================================

==================================================
Fact-checking Claim 5 of 6: 'COVID‑19 vaccines do not contain microchips for government tracking; no such microelectronics are present in any authorized vaccine.'

Fact-checking claim: COVID‑19 vaccines do not contain microchips for government tracking; no such microelectronics are present in any authorized vaccine.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.44 seconds
Verdict: TRUE
Reason: Multiple reputable sources explicitly state that COVID‑19 vaccines contain no microchips or any tracking hardware, directly confirming the claim.
Sources:
  • https://revealnews.org/article/where-did-the-microchip-vaccine-conspiracy-theory-come-from-anyway/
  • https://www.mayoclinic.org/diseases-conditions/coronavirus/in
==================================================

==================================================
Fact-checking Claim 6 of 6: 'Drinking eight cups of coffee per day does not reduce the risk of heart disease by 70%; no reputable research supports that specific reduction figure.'

Fact-checking claim: Drinking eight cups of coffee per day does not reduce the risk of heart disease by 70%; no reputable research supports that specific reduction figure.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.45 seconds
Verdict: TRUE
Reason: The cited review shows mixed or even increased risk with heavy coffee consumption and does not report a 70% reduction in heart disease risk for eight cups per day, indicating no reputable research supports that specific figure.
Sources:
  • https://pmc.ncbi.nlm.nih.gov/articles/PMC10262944/
  • https://www.escardio.org/The-ESC/Press-Office/Press-releases/morning-coffee-may-protect-the-heart-better-than-all-day-coffee-drinking
==================================================

--- Summary of All Fact-Checking Results ---

Claim: Apple did not release a smartphone in 1992; the first widely recognized smartphone, the IBM Simon, was introduced in 1994.
Verdict: UNCERTAIN
Reason: The evidence clearly shows IBM Simon was first released in 1994, supporting that part of the claim. However, there is no explicit evidence provided about Apple not releasing a smartphone in 1992, so the claim cannot be fully verified.
Sources:
  • https://en.wikipedia.org/wiki/IBM_Simon
  • https://en.wikipedia.org/wiki/Smartphone

--------------------------------------------------

Claim: The iPhone was launched in 2007 and is credited with defining the modern smartphone era.
Verdict: TRUE
Reason: The evidence confirms the iPhone was first released on June 29 2007 and describes it as a revolutionary device that "reinvented" the phone, indicating it is widely credited with defining the modern smartphone era.
Sources:
  • https://en.wikipedia.org/wiki/IPhone_(1st_generation)
  • https://theprint.in/features/brandma/iphone-1-a-revolutionary-smartphone-that-debuted-at-the-2007-oscars/889755/

--------------------------------------------------

Claim: Mount Everest has not shrunk by more than 500 meters; its height has changed only minimally and recent revisions reflect improved measurement technology.
Verdict: TRUE
Reason: The sources state that Everest’s height is now 8,848.86 m, noting only slight adjustments from earlier measurements due to better technology and minor natural effects, with no indication of a shrinkage anywhere near 500 m.
Sources:
  • https://www.himalayanrecreation.com/blog/the-height-of-mount-everest
  • https://www.britannica.com/place/Mount-Everest

--------------------------------------------------

Claim: NASA has debunked claims that Earth will experience 15 days of complete darkness in November 2025 due to a planetary alignment, stating no known configuration can block sunlight for that duration.
Verdict: UNCERTAIN
Reason: The provided sources debunk similar 15‑day darkness hoaxes for 2015/2017 and state NASA never confirmed such an event, but none specifically address a claimed November 2025 event, so the claim is not directly supported or contradicted.
Sources:
  • https://www.snopes.com/fact-check/15-days-darkness-november/
  • https://www.space.com/31118-earth-darkness-hoax-debunked.html

--------------------------------------------------

Claim: COVID‑19 vaccines do not contain microchips for government tracking; no such microelectronics are present in any authorized vaccine.
Verdict: TRUE
Reason: Multiple reputable sources explicitly state that COVID‑19 vaccines contain no microchips or any tracking hardware, directly confirming the claim.
Sources:
  • https://revealnews.org/article/where-did-the-microchip-vaccine-conspiracy-theory-come-from-anyway/
  • https://www.mayoclinic.org/diseases-conditions/coronavirus/in

--------------------------------------------------

Claim: Drinking eight cups of coffee per day does not reduce the risk of heart disease by 70%; no reputable research supports that specific reduction figure.
Verdict: TRUE
Reason: The cited review shows mixed or even increased risk with heavy coffee consumption and does not report a 70% reduction in heart disease risk for eight cups per day, indicating no reputable research supports that specific figure.
Sources:
  • https://pmc.ncbi.nlm.nih.gov/articles/PMC10262944/
  • https://www.escardio.org/The-ESC/Press-Office/Press-releases/morning-coffee-may-protect-the-heart-better-than-all-day-coffee-drinking

--------------------------------------------------
```

```text
[{'claim': 'Apple did not release a smartphone in 1992; the first widely recognized smartphone, the IBM Simon, was introduced in 1994.',
  'verdict': 'uncertain',
  'reason': 'The evidence clearly shows IBM Simon was first released in 1994, supporting that part of the claim. However, there is no explicit evidence provided about Apple not releasing a smartphone in 1992, so the claim cannot be fully verified.',
  'sources': ['https://en.wikipedia.org/wiki/IBM_Simon',
   'https://en.wikipedia.org/wiki/Smartphone']},
 {'claim': 'The iPhone was launched in 2007 and is credited with defining the modern smartphone era.',
  'verdict': 'true',
  'reason': 'The evidence confirms the iPhone was first released on June\u202f29\u202f2007 and describes it as a revolutionary device that "reinvented" the phone, indicating it is widely credited with defining the modern smartphone era.',
  'sources': ['https://en.wikipedia.org/wiki/IPhone_(1st_generation)',
   'https://theprint.in/features/brandma/iphone-1-a-revolutionary-smartphone-that-debuted-at-the-2007-oscars/889755/']},
 {'claim': 'Mount Everest has not shrunk by more than 500\u202fmeters; its height has changed only minimally and recent revisions reflect improved measurement technology.',
  'verdict': 'true',
  'reason': 'The sources state that Everest’s height is now 8,848.86\u202fm, noting only slight adjustments from earlier measurements due to better technology and minor natural effects, with no indication of a shrinkage anywhere near 500\u202fm.',
  'sources': ['https://www.himalayanrecreation.com/blog/the-height-of-mount-everest',
   'https://www.britannica.com/place/Mount-Everest']},
 {'claim': 'NASA has debunked claims that Earth will experience 15\u202fdays of complete darkness in November\u202f2025 due to a planetary alignment, stating no known configuration can block sunlight for that duration.',
  'verdict': 'uncertain',
  'reason': 'The provided sources debunk similar 15‑day darkness hoaxes for 2015/2017 and state NASA never confirmed such an event, but none specifically address a claimed November\u202f2025 event, so the claim is not directly supported or contradicted.',
  'sources': ['https://www.snopes.com/fact-check/15-days-darkness-november/',
   'https://www.space.com/31118-earth-darkness-hoax-debunked.html']},
 {'claim': 'COVID‑19 vaccines do not contain microchips for government tracking; no such microelectronics are present in any authorized vaccine.',
  'verdict': 'true',
  'reason': 'Multiple reputable sources explicitly state that COVID‑19 vaccines contain no microchips or any tracking hardware, directly confirming the claim.',
  'sources': ['https://revealnews.org/article/where-did-the-microchip-vaccine-conspiracy-theory-come-from-anyway/',
   'https://www.mayoclinic.org/diseases-conditions/coronavirus/in']},
 {'claim': 'Drinking eight cups of coffee per day does not reduce the risk of heart disease by 70%; no reputable research supports that specific reduction figure.',
  'verdict': 'true',
  'reason': 'The cited review shows mixed or even increased risk with heavy coffee consumption and does not report a 70% reduction in heart disease risk for eight cups per day, indicating no reputable research supports that specific figure.',
  'sources': ['https://pmc.ncbi.nlm.nih.gov/articles/PMC10262944/',
   'https://www.escardio.org/The-ESC/Press-Office/Press-releases/morning-coffee-may-protect-the-heart-better-than-all-day-coffee-drinking']}]
```

Paste a URL link directly.

```python
current_doc_url = "https://www.snopes.com/fact-check/drinking-at-disney-world/"
print(f"Extracting and fact-checking claims from: {current_doc_url}")

url_extracted_claims = extract_claims_from_url(current_doc_url)

if url_extracted_claims:
    print(f"\nSuccessfully extracted {len(url_extracted_claims)} claims from the URL. Now fact-checking them...")
    claims_text_for_fact_check = "\n".join(url_extracted_claims)
    url_fact_check_results = fact_check_text(claims_text_for_fact_check)
    display(url_fact_check_results)
else:
    print("Could not extract claims from the URL to fact-check.")
```

```text
Extracting and fact-checking claims from: https://www.snopes.com/fact-check/drinking-at-disney-world/
Fetching content from URL: https://www.snopes.com/fact-check/drinking-at-disney-world/
Extracted 1820 characters from the URL. Now extracting claims...
Cerebras LLM claim extraction took 0.57 seconds

Successfully extracted 8 claims from the URL. Now fact-checking them...
Cerebras LLM claim extraction took 0.67 seconds
Extracted 6 claims:
  1. On September 9, 2023, Mouse Trap News published an article claiming that the Walt Disney World Resort had officially removed the drinking age.
  2. The TikTok video posted by @mousetrapnews had 8.8 million views at the time of this check.
  3. Mouse Trap News states on its About page that every story on its website is fake and that it is a satire site.
  4. The Pensacola News Journal reported that Disney World was still allowed to sell alcohol only to adults aged 21 or older at the time of the writing.
  5. Mouse Trap News previously made a claim that Disney World was supposedly lobbying to lower the drinking age at the resort to 18.
  6. Disney World’s policy permits the sale of alcohol only to guests who are 21 years of age or older.

==================================================
Fact-checking Claim 1 of 6: 'On September 9, 2023, Mouse Trap News published an article claiming that the Walt Disney World Resort had officially removed the drinking age.'

Fact-checking claim: On September 9, 2023, Mouse Trap News published an article claiming that the Walt Disney World Resort had officially removed the drinking age.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 2.21 seconds
Verdict: UNCERTAIN
Reason: The available sources discuss rumors about Disney lowering its drinking age and debunk them, but they do not directly confirm that Mouse Trap News published an article on September 9, 2023 making that claim.
Sources:
  • https://www.pnj.com/story/news/2023/09/11/disney-world-remove-legal-drinking-age-requirement-florida-debunked/70822543007/
  • https://www.aol.com/news/fact-fiction-disney-world-lobbying-040148528.html
==================================================

==================================================
Fact-checking Claim 2 of 6: 'The TikTok video posted by @mousetrapnews had 8.8 million views at the time of this check.'

Fact-checking claim: The TikTok video posted by @mousetrapnews had 8.8 million views at the time of this check.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.34 seconds
Verdict: UNCERTAIN
Reason: The provided excerpts do not include any view count for the specific TikTok video, so they neither confirm nor refute the claim of 8.8 million views.
Sources:
  • https://www.tiktok.com/@mousetrapnews/video/7590889191806995743
  • https://www.tiktok.com/@mousetrapnews/video/7485897545890336046
==================================================

==================================================
Fact-checking Claim 3 of 6: 'Mouse Trap News states on its About page that every story on its website is fake and that it is a satire site.'

Fact-checking claim: Mouse Trap News states on its About page that every story on its website is fake and that it is a satire site.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.35 seconds
Verdict: TRUE
Reason: The About page explicitly describes Mouse Trap News as a satire/parody site and states that its stories are made‑up and not true, confirming that the site claims all its content is fake. A Facebook post also refers to it as a satirical site.
Sources:
  • https://mousetrapnews.com/about/
  • https://www.facebook.com/groups/276199024736470/posts/358951296461242/
==================================================

==================================================
Fact-checking Claim 4 of 6: 'The Pensacola News Journal reported that Disney World was still allowed to sell alcohol only to adults aged 21 or older at the time of the writing.'

Fact-checking claim: The Pensacola News Journal reported that Disney World was still allowed to sell alcohol only to adults aged 21 or older at the time of the writing.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.32 seconds
Verdict: TRUE
Reason: The Pensacola News Journal article explicitly states Disney World’s alcohol policy limits sales to guests 21 years old or older, confirming the claim.
Sources:
  • https://www.pnj.com/story/news/2023/09/11/disney-world-remove-legal-drinking-age-requirement-florida-debunked/70822543007/
  • https://disneyworld.disney.go.com/faq/restaurants/required-id-for-alcohol/
==================================================

==================================================
Fact-checking Claim 5 of 6: 'Mouse Trap News previously made a claim that Disney World was supposedly lobbying to lower the drinking age at the resort to 18.'

Fact-checking claim: Mouse Trap News previously made a claim that Disney World was supposedly lobbying to lower the drinking age at the resort to 18.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.44 seconds
Verdict: TRUE
Reason: The Mouse Trap News article titled “Drinking Age at Disney World May be Lowered to 18” explicitly states that Disney World is lobbying to lower the drinking age, confirming that Mouse Trap News made this claim.
Sources:
  • https://mousetrapnews.com/drinking-age-at-disney-world-may-be-lowered-to-18/
  • https://www.10news.com/news/fact-or-fiction/fact-or-fiction-disney-world-lobbying-to-lower-drinking-age-on-florida-property
==================================================

==================================================
Fact-checking Claim 6 of 6: 'Disney World’s policy permits the sale of alcohol only to guests who are 21 years of age or older.'

Fact-checking claim: Disney World’s policy permits the sale of alcohol only to guests who are 21 years of age or older.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.30 seconds
Verdict: TRUE
Reason: Official Disney World FAQ states alcoholic beverages can be purchased only by guests 21 years or older, confirming the policy.
Sources:
  • https://disneyworld.disney.go.com/faq/restaurants/required-id-for-alcohol/
  • https://www.disneyfoodblog.com/2023/10/08/the-one-rule-about-drinking-in-disney-world-you-need-to-know/
==================================================

--- Summary of All Fact-Checking Results ---

Claim: On September 9, 2023, Mouse Trap News published an article claiming that the Walt Disney World Resort had officially removed the drinking age.
Verdict: UNCERTAIN
Reason: The available sources discuss rumors about Disney lowering its drinking age and debunk them, but they do not directly confirm that Mouse Trap News published an article on September 9, 2023 making that claim.
Sources:
  • https://www.pnj.com/story/news/2023/09/11/disney-world-remove-legal-drinking-age-requirement-florida-debunked/70822543007/
  • https://www.aol.com/news/fact-fiction-disney-world-lobbying-040148528.html

--------------------------------------------------

Claim: The TikTok video posted by @mousetrapnews had 8.8 million views at the time of this check.
Verdict: UNCERTAIN
Reason: The provided excerpts do not include any view count for the specific TikTok video, so they neither confirm nor refute the claim of 8.8 million views.
Sources:
  • https://www.tiktok.com/@mousetrapnews/video/7590889191806995743
  • https://www.tiktok.com/@mousetrapnews/video/7485897545890336046

--------------------------------------------------

Claim: Mouse Trap News states on its About page that every story on its website is fake and that it is a satire site.
Verdict: TRUE
Reason: The About page explicitly describes Mouse Trap News as a satire/parody site and states that its stories are made‑up and not true, confirming that the site claims all its content is fake. A Facebook post also refers to it as a satirical site.
Sources:
  • https://mousetrapnews.com/about/
  • https://www.facebook.com/groups/276199024736470/posts/358951296461242/

--------------------------------------------------

Claim: The Pensacola News Journal reported that Disney World was still allowed to sell alcohol only to adults aged 21 or older at the time of the writing.
Verdict: TRUE
Reason: The Pensacola News Journal article explicitly states Disney World’s alcohol policy limits sales to guests 21 years old or older, confirming the claim.
Sources:
  • https://www.pnj.com/story/news/2023/09/11/disney-world-remove-legal-drinking-age-requirement-florida-debunked/70822543007/
  • https://disneyworld.disney.go.com/faq/restaurants/required-id-for-alcohol/

--------------------------------------------------

Claim: Mouse Trap News previously made a claim that Disney World was supposedly lobbying to lower the drinking age at the resort to 18.
Verdict: TRUE
Reason: The Mouse Trap News article titled “Drinking Age at Disney World May be Lowered to 18” explicitly states that Disney World is lobbying to lower the drinking age, confirming that Mouse Trap News made this claim.
Sources:
  • https://mousetrapnews.com/drinking-age-at-disney-world-may-be-lowered-to-18/
  • https://www.10news.com/news/fact-or-fiction/fact-or-fiction-disney-world-lobbying-to-lower-drinking-age-on-florida-property

--------------------------------------------------

Claim: Disney World’s policy permits the sale of alcohol only to guests who are 21 years of age or older.
Verdict: TRUE
Reason: Official Disney World FAQ states alcoholic beverages can be purchased only by guests 21 years or older, confirming the policy.
Sources:
  • https://disneyworld.disney.go.com/faq/restaurants/required-id-for-alcohol/
  • https://www.disneyfoodblog.com/2023/10/08/the-one-rule-about-drinking-in-disney-world-you-need-to-know/

--------------------------------------------------
```

```text
[{'claim': 'On September 9, 2023, Mouse Trap News published an article claiming that the Walt Disney World Resort had officially removed the drinking age.',
  'verdict': 'uncertain',
  'reason': 'The available sources discuss rumors about Disney lowering its drinking age and debunk them, but they do not directly confirm that Mouse Trap News published an article on September 9, 2023 making that claim.',
  'sources': ['https://www.pnj.com/story/news/2023/09/11/disney-world-remove-legal-drinking-age-requirement-florida-debunked/70822543007/',
   'https://www.aol.com/news/fact-fiction-disney-world-lobbying-040148528.html']},
 {'claim': 'The TikTok video posted by @mousetrapnews had 8.8 million views at the time of this check.',
  'verdict': 'uncertain',
  'reason': 'The provided excerpts do not include any view count for the specific TikTok video, so they neither confirm nor refute the claim of 8.8\u202fmillion views.',
  'sources': ['https://www.tiktok.com/@mousetrapnews/video/7590889191806995743',
   'https://www.tiktok.com/@mousetrapnews/video/7485897545890336046']},
 {'claim': 'Mouse Trap News states on its About page that every story on its website is fake and that it is a satire site.',
  'verdict': 'true',
  'reason': 'The About page explicitly describes Mouse Trap News as a satire/parody site and states that its stories are made‑up and not true, confirming that the site claims all its content is fake. A Facebook post also refers to it as a satirical site.',
  'sources': ['https://mousetrapnews.com/about/',
   'https://www.facebook.com/groups/276199024736470/posts/358951296461242/']},
 {'claim': 'The Pensacola News Journal reported that Disney World was still allowed to sell alcohol only to adults aged 21 or older at the time of the writing.',
  'verdict': 'true',
  'reason': 'The Pensacola News Journal article explicitly states Disney World’s alcohol policy limits sales to guests 21 years old or older, confirming the claim.',
  'sources': ['https://www.pnj.com/story/news/2023/09/11/disney-world-remove-legal-drinking-age-requirement-florida-debunked/70822543007/',
   'https://disneyworld.disney.go.com/faq/restaurants/required-id-for-alcohol/']},
 {'claim': 'Mouse Trap News previously made a claim that Disney World was supposedly lobbying to lower the drinking age at the resort to 18.',
  'verdict': 'true',
  'reason': 'The Mouse Trap News article titled “Drinking Age at Disney World May be Lowered to 18” explicitly states that Disney World is lobbying to lower the drinking age, confirming that Mouse Trap News made this claim.',
  'sources': ['https://mousetrapnews.com/drinking-age-at-disney-world-may-be-lowered-to-18/',
   'https://www.10news.com/news/fact-or-fiction/fact-or-fiction-disney-world-lobbying-to-lower-drinking-age-on-florida-property']},
 {'claim': 'Disney World’s policy permits the sale of alcohol only to guests who are 21 years of age or older.',
  'verdict': 'true',
  'reason': 'Official Disney World FAQ states alcoholic beverages can be purchased only by guests 21\u202fyears or older, confirming the policy.',
  'sources': ['https://disneyworld.disney.go.com/faq/restaurants/required-id-for-alcohol/',
   'https://www.disneyfoodblog.com/2023/10/08/the-one-rule-about-drinking-in-disney-world-you-need-to-know/']}]
```

Here's another with a URL example.

```python
article_url = "https://theonion.com/shedeur-sanders-confident-he-can-deliver-everything-browns-fans-have-come-to-expect/"

print(f"Extracting and fact-checking claims from: {article_url}")

claims_from_url = extract_claims_from_url(article_url)

if claims_from_url:
    print(f"\nSuccessfully extracted {len(claims_from_url)} claims from the URL. Now fact-checking them...")

    claims_text_for_fact_check = "\n".join(claims_from_url)

    fact_check_results = fact_check_text(claims_text_for_fact_check)

    display(fact_check_results)
else:
    print("Could not extract claims from the URL to fact-check.")
```

```text
Extracting and fact-checking claims from: https://theonion.com/shedeur-sanders-confident-he-can-deliver-everything-browns-fans-have-come-to-expect/
Fetching content from URL: https://theonion.com/shedeur-sanders-confident-he-can-deliver-everything-browns-fans-have-come-to-expect/
Extracted 1224 characters from the URL. Now extracting claims...
Cerebras LLM claim extraction took 0.45 seconds

Successfully extracted 8 claims from the URL. Now fact-checking them...
Cerebras LLM claim extraction took 0.28 seconds
Extracted 6 claims:
  1. Shedeur Sanders is a rookie quarterback for the Cleveland Browns.
  2. Shedeur Sanders was selected in the fifth round of the NFL Draft.
  3. He is the 42nd starting quarterback for the Browns since 1999.
  4. The Browns had a 2–8 record at the time of the interview.
  5. Dillon Gabriel previously started as quarterback for the Browns.
  6. Shedeur Sanders expects to lose the starting quarterback job to Bailey Zappe after two weeks.

==================================================
Fact-checking Claim 1 of 6: 'Shedeur Sanders is a rookie quarterback for the Cleveland Browns.'

Fact-checking claim: Shedeur Sanders is a rookie quarterback for the Cleveland Browns.
Retrieved 5 evidence sources
Cerebras LLM judgment for this claim took 0.42 seconds
Verdict: TRUE
Reason: The Browns roster page lists Shedeur Sanders with experience marked as 'R' (rookie) and notes he was drafted in 2025, confirming he is a rookie quarterback for Cleveland.
Sources:
  • https://www.clevelandbrowns.com/team/players-roster/shedeur-sanders/
==================================================

==================================================
Fact-checking Claim 2 of 6: 'Shedeur Sanders was selected in the fifth round of the NFL Draft.'

Fact-checking claim: Shedeur Sanders was selected in the fifth round of the NFL Draft.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.84 seconds
Verdict: TRUE
Reason: Both sources state Shedeur Sanders was chosen with the 144th overall pick, which corresponds to the fifth round of the 2025 NFL Draft.
Sources:
  • https://www.clevelandbrowns.com/video/browns-select-shedeur-sanders-with-no-144-pick-in-2025-draft
  • https://www.clevelandbrowns.com/news/browns-select-qb-shedeur-sanders-with-the-no-144-pick-in-the-2025-nfl-draft
==================================================

==================================================
Fact-checking Claim 3 of 6: 'He is the 42nd starting quarterback for the Browns since 1999.'

Fact-checking claim: He is the 42nd starting quarterback for the Browns since 1999.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.37 seconds
Verdict: TRUE
Reason: The Wikipedia article states that from 1999 through mid‑2025 the Browns have had 42 players start at quarterback, confirming that the most recent starter is indeed the 42nd.
Sources:
  • https://en.wikipedia.org/wiki/List_of_Cleveland_Browns_starting_quarterbacks
==================================================

==================================================
Fact-checking Claim 4 of 6: 'The Browns had a 2–8 record at the time of the interview.'

Fact-checking claim: The Browns had a 2–8 record at the time of the interview.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.43 seconds
Verdict: TRUE
Reason: A news article from November 22, 2015 explicitly states the Browns were 2‑8 at that time, which aligns with the claim about the interview timing.
Sources:
  • https://www.tribtoday.com/uncategorized/2015/11/browns-2-8-record-has-been-a-team-effort/
==================================================

==================================================
Fact-checking Claim 5 of 6: 'Dillon Gabriel previously started as quarterback for the Browns.'

Fact-checking claim: Dillon Gabriel previously started as quarterback for the Browns.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.37 seconds
Verdict: TRUE
Reason: The evidence shows Gabriel was named the Browns' starter for a game on October 5, 2025, indicating he has previously started as quarterback for Cleveland.
Sources:
  • https://en.wikipedia.org/wiki/Dillon_Gabriel
  • https://www.sports-reference.com/cfb/players/dillon-gabriel-1.html
==================================================

==================================================
Fact-checking Claim 6 of 6: 'Shedeur Sanders expects to lose the starting quarterback job to Bailey Zappe after two weeks.'

Fact-checking claim: Shedeur Sanders expects to lose the starting quarterback job to Bailey Zappe after two weeks.
Retrieved 6 evidence sources
Cerebras LLM judgment for this claim took 0.49 seconds
Verdict: UNCERTAIN
Reason: The provided sources show Bailey Zappe being elevated as a backup to Shedeur Sanders and discuss uncertainty about Sanders' future, but none mention Sanders expecting to lose his starting job within two weeks.
Sources:
  • https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/browns-elevate-bailey-zappe-to-back-up-shedeur-sanders
  • https://sports.yahoo.com/nfl/article/what-does-browns-firing-kevin-stefanski-mean-for-shedeur-sanders-062323054.html
==================================================

--- Summary of All Fact-Checking Results ---

Claim: Shedeur Sanders is a rookie quarterback for the Cleveland Browns.
Verdict: TRUE
Reason: The Browns roster page lists Shedeur Sanders with experience marked as 'R' (rookie) and notes he was drafted in 2025, confirming he is a rookie quarterback for Cleveland.
Sources:
  • https://www.clevelandbrowns.com/team/players-roster/shedeur-sanders/

--------------------------------------------------

Claim: Shedeur Sanders was selected in the fifth round of the NFL Draft.
Verdict: TRUE
Reason: Both sources state Shedeur Sanders was chosen with the 144th overall pick, which corresponds to the fifth round of the 2025 NFL Draft.
Sources:
  • https://www.clevelandbrowns.com/video/browns-select-shedeur-sanders-with-no-144-pick-in-2025-draft
  • https://www.clevelandbrowns.com/news/browns-select-qb-shedeur-sanders-with-the-no-144-pick-in-the-2025-nfl-draft

--------------------------------------------------

Claim: He is the 42nd starting quarterback for the Browns since 1999.
Verdict: TRUE
Reason: The Wikipedia article states that from 1999 through mid‑2025 the Browns have had 42 players start at quarterback, confirming that the most recent starter is indeed the 42nd.
Sources:
  • https://en.wikipedia.org/wiki/List_of_Cleveland_Browns_starting_quarterbacks

--------------------------------------------------

Claim: The Browns had a 2–8 record at the time of the interview.
Verdict: TRUE
Reason: A news article from November 22, 2015 explicitly states the Browns were 2‑8 at that time, which aligns with the claim about the interview timing.
Sources:
  • https://www.tribtoday.com/uncategorized/2015/11/browns-2-8-record-has-been-a-team-effort/

--------------------------------------------------

Claim: Dillon Gabriel previously started as quarterback for the Browns.
Verdict: TRUE
Reason: The evidence shows Gabriel was named the Browns' starter for a game on October 5, 2025, indicating he has previously started as quarterback for Cleveland.
Sources:
  • https://en.wikipedia.org/wiki/Dillon_Gabriel
  • https://www.sports-reference.com/cfb/players/dillon-gabriel-1.html

--------------------------------------------------

Claim: Shedeur Sanders expects to lose the starting quarterback job to Bailey Zappe after two weeks.
Verdict: UNCERTAIN
Reason: The provided sources show Bailey Zappe being elevated as a backup to Shedeur Sanders and discuss uncertainty about Sanders' future, but none mention Sanders expecting to lose his starting job within two weeks.
Sources:
  • https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/browns-elevate-bailey-zappe-to-back-up-shedeur-sanders
  • https://sports.yahoo.com/nfl/article/what-does-browns-firing-kevin-stefanski-mean-for-shedeur-sanders-062323054.html

--------------------------------------------------
```

```text
[{'claim': 'Shedeur Sanders is a rookie quarterback for the Cleveland Browns.',
  'verdict': 'true',
  'reason': "The Browns roster page lists Shedeur Sanders with experience marked as 'R' (rookie) and notes he was drafted in 2025, confirming he is a rookie quarterback for Cleveland.",
  'sources': ['https://www.clevelandbrowns.com/team/players-roster/shedeur-sanders/']},
 {'claim': 'Shedeur Sanders was selected in the fifth round of the NFL Draft.',
  'verdict': 'true',
  'reason': 'Both sources state Shedeur Sanders was chosen with the 144th overall pick, which corresponds to the fifth round of the 2025 NFL Draft.',
  'sources': ['https://www.clevelandbrowns.com/video/browns-select-shedeur-sanders-with-no-144-pick-in-2025-draft',
   'https://www.clevelandbrowns.com/news/browns-select-qb-shedeur-sanders-with-the-no-144-pick-in-the-2025-nfl-draft']},
 {'claim': 'He is the 42nd starting quarterback for the Browns since 1999.',
  'verdict': 'true',
  'reason': 'The Wikipedia article states that from 1999 through mid‑2025 the Browns have had 42 players start at quarterback, confirming that the most recent starter is indeed the 42nd.',
  'sources': ['https://en.wikipedia.org/wiki/List_of_Cleveland_Browns_starting_quarterbacks']},
 {'claim': 'The Browns had a 2–8 record at the time of the interview.',
  'verdict': 'true',
  'reason': 'A news article from November 22, 2015 explicitly states the Browns were 2‑8 at that time, which aligns with the claim about the interview timing.',
  'sources': ['https://www.tribtoday.com/uncategorized/2015/11/browns-2-8-record-has-been-a-team-effort/']},
 {'claim': 'Dillon Gabriel previously started as quarterback for the Browns.',
  'verdict': 'true',
  'reason': "The evidence shows Gabriel was named the Browns' starter for a game on October 5, 2025, indicating he has previously started as quarterback for Cleveland.",
  'sources': ['https://en.wikipedia.org/wiki/Dillon_Gabriel',
   'https://www.sports-reference.com/cfb/players/dillon-gabriel-1.html']},
 {'claim': 'Shedeur Sanders expects to lose the starting quarterback job to Bailey Zappe after two weeks.',
  'verdict': 'uncertain',
  'reason': "The provided sources show Bailey Zappe being elevated as a backup to Shedeur Sanders and discuss uncertainty about Sanders' future, but none mention Sanders expecting to lose his starting job within two weeks.",
  'sources': ['https://www.nbcsports.com/nfl/profootballtalk/rumor-mill/news/browns-elevate-bailey-zappe-to-back-up-shedeur-sanders',
   'https://sports.yahoo.com/nfl/article/what-does-browns-firing-kevin-stefanski-mean-for-shedeur-sanders-062323054.html']}]
```

And with that, you've successfully built a fact-checker using gpt-oss-120B, Cerebras, and Parallel!

**⚠️ Disclaimer:**

This guide is meant purely as an educational starting point. To keep things simple, the code here skips over several production concerns like prompt injection, input sanitation, and stricter output validation. If you decide to turn this into a real app, add those protections. 

**Contributors**

This guide serves as a joint collaboration effort between OpenAI, [Cerebras Systems](https://www.cerebras.ai/), and [Parallel Web Systems](https://parallel.ai/), with attributions to the following for their valuable feedback and support. 

- Vaibhav Srivastav
- Dominik Kundel
- Sarah Chieng
- Sebastian Duerr
- Matt Harris 
- Lukas Levert
- Joyce Er
- Kevin Taylor
- Khushi Shelat
