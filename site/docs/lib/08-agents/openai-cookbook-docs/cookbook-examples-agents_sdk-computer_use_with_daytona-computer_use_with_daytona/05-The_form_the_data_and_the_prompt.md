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
sourceRel: "cookbook/examples/agents_sdk/computer_use_with_daytona/computer_use_with_daytona.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/computer_use_with_daytona/computer_use_with_daytona.md"
sourceSha256: "a94c68575973ef4c95f8c051e8a957e937b7c2d59e117cba4310a5cb7d7b5595"
pageSha256: "7819ceeedfef422ca67ac9714be6702ce172b798974024a3cf0ce37cba252787"
contentMode: "local-full"
zh: ""
---

## The form, the data, and the prompt

The form we'll fill lives in `form.html` in this folder. It is a single-page HTML registration form with five fieldsets: personal info, professional details, conference preferences, travel/accommodation, and additional info. The fields cover text inputs, emails, phone, dates, `<select>` dropdowns, radio groups, multi-select checkbox groups with a maximum limit, and a textarea. It also includes client-side validation and a confirmation view, so we can visually tell the run succeeded.

We tell the agent what to do in three parts:

- `APPLICANT_DATA`: the facts the agent must enter, loaded from `fake_applicant_data.txt` in this folder.
- `INSTRUCTIONS`: the system prompt, guidance on filling the form.
- `TASK`: the short user turn that kicks off the run.

We also pin the sandbox snapshot and the server port here. The snapshot `daytonaio/sandbox:0.6.0` is the Daytona-published image with a desktop environment and a browser preinstalled.

```python
# Desktop snapshot that ships with a browser and a desktop environment.
_DESKTOP_SNAPSHOT = "daytonaio/sandbox:0.6.0"

# Where the form lives inside the sandbox, and the port we serve it on.
_FORM_DIR = "/home/daytona/form"
_SERVER_PORT = 8080

# The applicant facts the agent must enter.
APPLICANT_DATA = Path("fake_applicant_data.txt").read_text()

INSTRUCTIONS = """\
You control a remote Linux desktop via mouse, keyboard, and screenshots.
A conference registration form is being served at http://localhost:8080.

When asked to fill the form:
1. Open a browser (look for one in the taskbar or application menu).
2. Navigate to http://localhost:8080.
3. Fill every field using the applicant data the user provides. The form
   spans multiple sections, so scroll down to see them all.
4. Click "Complete Registration".
5. When you see the "Registration Complete!" confirmation, take a screenshot
   and say DONE.
"""

TASK = f"Fill the conference registration form with this applicant data:\n\n{APPLICANT_DATA}"
```
