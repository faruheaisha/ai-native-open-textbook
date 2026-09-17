---
title: "Post-deploy message to the user"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/python-appservice-deploy/references/post-deploy-message.md"
sourceRel: ".github/plugins/azure-skills/skills/python-appservice-deploy/references/post-deploy-message.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/python-appservice-deploy/references/post-deploy-message.md"
sourceSha256: "f01c28c96a9ebe975d95bf0c526ebceeaab0fb21d0466e25c74d875b8643fc40"
pageSha256: "f01c28c96a9ebe975d95bf0c526ebceeaab0fb21d0466e25c74d875b8643fc40"
contentMode: "local-full"
zh: ""
---

# Post-deploy message to the user

After `az webapp deploy` / `azd deploy` returns successfully, **the skill is done**. Do not run any further verification commands.

## Hard rules

- ⛔ Never run `az webapp log tail` as a "confirm startup" step — logs are often quiet for 1–2 min during build/warm-up; silence is not a failure signal.
- ⛔ Never run `curl`, `Invoke-WebRequest`, `wget`, or any HTTP request against the deployed URL — first request often 502s or times out on a healthy deploy.
- ⛔ Never present an early 5xx or quiet log stream as a deploy failure — the deploy succeeded; the platform just isn't warm yet.
- ✅ Always give the user the URL, the wait expectation, and the log command, then **stop**.

## Message template — standard (Flask / Django / FastAPI)

Use this when Step 2 detected a known framework (`flask`, `django`, or `fastapi`). Print exactly this (substituting the real values) as the final output of the skill, then end the turn:

```
✅ Deployment complete.

🌐 App URL: https://<app>.azurewebsites.net
   It can take 2–3 minutes for the site to be reachable while App Service finishes
   warming up the container. Open it in your browser after a short wait.

📜 If you want to watch live logs:
   az webapp log config -n <app> -g <rg> --application-logging filesystem --level information
   az webapp log tail -n <app> -g <rg>
   (The first command is a one-time prereq on a fresh app — without it the stream stays empty.)
```

## Message template — unknown framework

Use this when Step 2 detected `wsgi-generic`, `asgi-generic`, or `unknown` (i.e. **not** Flask, Django, or FastAPI). The code is already deployed and `SCM_DO_BUILD_DURING_DEPLOYMENT=true` is set, but Oryx will not know how to start the app until the user sets a startup command. Print this instead:

```
✅ Code deployed — but framework not detected.

🌐 App URL: https://<app>.azurewebsites.net
   It can take 2–3 minutes for App Service to finish building and start the
   container. The site will likely return an error page until you set a
   startup command (next step).

⚠️  We could not detect Flask, Django, or FastAPI in your project, so no
   startup command was set automatically. Set one with:

   az webapp config set -n <app> -g <rg> \
