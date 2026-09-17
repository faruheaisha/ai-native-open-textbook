---
title: "Fix: 403 Forbidden Error on Windows/Docker (Clock Skew)"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/fix_windows_docker_403_forbidden_clerk.md"
sourceRel: "community_contributions/fix_windows_docker_403_forbidden_clerk.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/fix_windows_docker_403_forbidden_clerk.md"
sourceSha256: "d53b95075a3bbb40fbfc0460257067ac350cbdee50045d41cdce9fda98e4b64e"
pageSha256: "d53b95075a3bbb40fbfc0460257067ac350cbdee50045d41cdce9fda98e4b64e"
contentMode: "local-full"
zh: ""
---

# Fix: 403 Forbidden Error on Windows/Docker (Clock Skew)

## Description

While deploying the Day 5 (Part 5: Build and Test Locally) Healthcare App on **Windows (WSL2)**, I encountered a persistent `403 Forbidden` error when the Frontend tried to connect to the Backend API, despite all environment variables being correct.

This turned out to be a **Clock Skew (Time Drift)** issue between the Windows host and the Docker container running in WSL2. The Clerk token generated on Windows appeared "expired" or "from the future" to the Docker container.

## The Solution

To fix this across the board for Windows users, we can adjust the Clerk configuration in `api/server.py` to be more tolerant of time differences.

### Code Change

In `api/server.py`, update the `ClerkConfig` as follows:

```python
# Clerk authentication setup
clerk_config = ClerkConfig(
    jwks_url=os.getenv("CLERK_JWKS_URL"),
    # 1. Disable 'issued at' check to prevent "token from future" errors
    verify_iat=False,
    # 2. Add leeway (tolerance window) to account for clock drift
    # 30.0 seconds is safe for local/dev environments
    leeway=30.0,
)
clerk_guard = ClerkHTTPBearer(clerk_config)
```

# Important Note / Security Implication

The `leeway` parameter is a trade-off between **Convenience** and **Security**.

- **For Development/Learning:** Setting `leeway=30.0` is safe and recommended to prevent WSL2 clock sync issues from blocking your progress.

- **For Production:** In a real production environment (like AWS), servers are usually synchronized. You should keep leeway minimal (e.g., 5-10s) to prevent **Replay Attacks**, or use logic to apply this setting only in development mode.

After applying this change, you **must rebuild** your Docker image
