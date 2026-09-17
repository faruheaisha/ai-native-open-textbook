---
title: "Ed Donner：AI Agents 实战课"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/discord_over_pushover/README.md"
sourceRel: "1_foundations/community_contributions/discord_over_pushover/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/discord_over_pushover/README.md"
sourceSha256: "edc814486571eff57fcf27c910fb9ec79ee04762b92a427af262e44b4df7ae93"
pageSha256: "edc814486571eff57fcf27c910fb9ec79ee04762b92a427af262e44b4df7ae93"
contentMode: "local-full"
zh: ""
---

# Ed Donner：AI Agents 实战课

## Reason

I wanted to receive notifications even after 30 days. That's why I decided to use discord webhooks instead of pushover. The code is not much different.

Steps:

1. Open discord and create a new channel in the server you want to do this in.
2. Go to `Edit Channel (gear icon)` -> `Integrations` -> `Create Webhook`.
3. Create a new webhook and give it a name.
4. Copy the webhook URL.
5. Replace pushover environment variables with `DISCORD_WEBHOOK_URL`.

Just instead of 
```py
requests.post(
        "https://api.pushover.net/1/messages.json",
        data={
            "token": os.getenv("PUSHOVER_TOKEN"),
            "user": os.getenv("PUSHOVER_USER"),
            "message": text,
        }
    )
```

We use 
```py
discord_webhook_url = os.getenv("DISCORD_WEBHOOK_URL")

if discord_webhook_url:
    print(f"Discord webhook URL found and starts with {discord_webhook_url[0]}")
else:
    print("Discord webhook URL not found")

def push(message):
    print(f"Discord: {message}")
    payload = {"content": message}
    requests.post(discord_webhook_url, data=payload)
```
