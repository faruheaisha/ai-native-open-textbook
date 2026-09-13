---
title: "Cloudflare VibeSDK"
sourceId: "07-coding/cloudflare-vibesdk"
sourceTitle: "Cloudflare VibeSDK"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/cloudflare/vibesdk"
entryUrl: "https://github.com/cloudflare/vibesdk/blob/9da158d82c597a0e8f4bf033cdccd1053fb6fb15/README.md"
zh: ""
---

# Cloudflare VibeSDK

## SDK tests

### Unit tests
Run SDK unit tests (no env required):

- `bun run test`

### Integration tests (local platform)
The integration tests hit a real VibeSDK dev server and require an API key.

1. Start the platform dev server:
   - `npm run dev`

2. Create an API key in Settings → API Keys.

3. Run the integration test with the key:

- `VIBESDK_INTEGRATION_API_KEY="..." bun run test:integration`

Optional:
- `VIBESDK_INTEGRATION_BASE_URL="http://localhost:5173"`
- `VIBESDK_INTEGRATION_RUN_PREVIEW=1` (runs preview deployment test; slower)

Notes:
- Integration tests can take 5–10 minutes for real builds; the runner uses `bun test --timeout 600000`.
- The integration tests fail fast if `VIBESDK_INTEGRATION_API_KEY` is missing.
- The key is treated as sensitive; prefer exporting it in your shell rather than committing it.
