---
title: "openai-codex-docs-official"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/codex-manual.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/codex-manual.md"
sourceSha256: "4aa7febb59952bea88e45b8d207b2796fdac17f9611159045456124f4834c300"
pageSha256: "4fab0119212ea553cf43f1f4ddd52edc932e207f38b2ab1c3baaf0e5b6b4019a"
contentMode: "local-full"
zh: ""
---

## Customization, Skills, Rules, MCP, and Integrations

How to shape Codex behavior with instructions, skills, prompts, MCP, and external integrations.

### Add UI to your MCP server

Source: [Add UI to your MCP server](https://developers.openai.com/plugins/build/chatgpt-ui.md)

#### Overview

Custom UI is optional. Add it when a plugin use case requires people to
inspect, compare, edit, confirm, or navigate structured information. Keep the
MCP tools useful without a component so ChatGPT and Codex can complete the
workflow without UI.

The MCP server returns UI resources for selected tools. Components run inside
an iframe in ChatGPT, communicate with the host through the MCP Apps bridge
(JSON-RPC over `postMessage`), and render alongside the conversation. The open
MCP Apps standard lets the UI run across compatible hosts.

#### Start with MCP Apps

ChatGPT implements the open [MCP Apps
standard](https://modelcontextprotocol.io/docs/extensions/apps) for UI returned
by an MCP server. MCP Apps defines how your server associates tools with UI
resources and how the iframe communicates with its host.

For new UI:

1. Declare the UI resource with `_meta.ui.resourceUri`.
2. Use the `ui/*` JSON-RPC bridge over `postMessage` for initialization,
   notifications, tool calls, messages, and model-visible context.
3. Keep tools useful without UI so the model can complete the workflow in
   clients that do not render components.

This standards-first foundation lets the same UI run in ChatGPT and other
compatible MCP Apps hosts.

When you're ready to implement the standard, use the [MCP Apps
specification](https://modelcontextprotocol.io/docs/extensions/apps).

#### Layer on ChatGPT extensions

After the MCP Apps flow works, use `window.openai` only for capabilities that
the shared specification does not cover. These optional extensions can improve
the experience in ChatGPT without making them part of the portable UI
foundation.

#### Prefer shared fields and methods

Use the MCP Apps field or method whenever the shared specification covers the
capability:

| Goal                         | MCP Apps standard                               | ChatGPT compatibility alias         |
| ---------------------------- | ----------------------------------------------- | ----------------------------------- |
| Link a tool to a UI resource | `_meta.ui.resourceUri`                          | `_meta["openai/outputTemplate"]`    |
| Receive tool input           | `ui/initialize` + `ui/notifications/tool-input` | `window.openai.toolInput`           |
| Receive tool results         | `ui/notifications/tool-result`                  | `window.openai.toolOutput`          |
| Call a tool from the UI      | `tools/call`                                    | `window.openai.callTool`            |
| Send a follow-up message     | `ui/message`                                    | `window.openai.sendFollowUpMessage` |

The compatibility aliases remain available for existing integrations. New UI
should use the shared fields and bridge methods in the middle column.

Examples include:

- Instant Checkout with `window.openai.requestCheckout`.
- ChatGPT file handling with `window.openai.uploadFile`,
  `window.openai.selectFiles`, and `window.openai.getFileDownloadUrl`.
- Host-controlled modals with `window.openai.requestModal`.
- Widget-state persistence with `window.openai.widgetState` and
  `window.openai.setWidgetState`.

Feature-detect each extension and provide a fallback when practical:

```js
const openai = typeof window !== "undefined" ? window.openai : undefined;

if (openai?.requestModal) {
  await openai.requestModal({
    /* ... */
  });
} else {
  // Fallback behavior for hosts without this extension.
}
```

Avoid branching on a host or product name. Test for the capability your UI
needs.

For extension signatures and examples, see the [`window.openai` component
bridge reference](https://developers.openai.com/plugins/reference#windowopenai-component-bridge).

#### Optional OpenAI component library

The
[`@openai/apps-sdk-ui`](https://openai.github.io/apps-sdk-ui/) component
library provides ready-made buttons, cards, input controls, and layout
primitives that match ChatGPT's container. Use it when you want consistent
styling without rebuilding base components.

You can also explore the [UI examples repository on
GitHub](https://github.com/openai/openai-apps-sdk-examples).

#### Choose a presentation

Start with inline UI and request more space only when the workflow needs it.
Choose the smallest presentation that lets people understand the result or
complete the task.

#### Inline card

Use an inline card for a focused result, confirmation, or small set of actions.
Keep it self-contained and avoid deep navigation.

#### Inline carousel

Use an inline carousel when people need to scan and choose from a small set of
similar, visually rich options.

#### fullscreen

Use fullscreen for rich tasks that need more room, such as maps, editing
canvases, or detailed browsing. Design the experience to work with ChatGPT's
composer, which remains available in fullscreen.

#### Picture-in-picture

Use picture-in-picture for an ongoing activity that should remain visible while
the conversation continues, such as a live session, game, or video.

For detailed layout, interaction, visual design, and accessibility guidance,
see [UI guidelines](https://developers.openai.com/plugins/concepts/ui-guidelines).

#### Separate data processing from UI rendering

#### Decoupled pattern

If you attach a widget template to every tool call, ChatGPT can re-render your
iframe too often. A better pattern is to separate data-processing tools from
render tools:

- **Data tools** fetch, compute, or mutate data and return only tool results.
- **Render tools** take final data and return the widget template.

This allows the model to apply its intelligence to data it fetched before
choosing to render UI to the user, making it much more likely that it will
accomplish the user's specific expressed goal.

This pattern is part of the MCP Apps architecture.

In practice, many UI integrations use this split:

- **Search/fetch tools (data-first):** Return IDs plus metadata with no widget
  template attached.
- **Render tools (for example, `render_listings_widget`):** Take a prepared list
  of IDs and render the widget.

Only the render tool should include `_meta.ui.resourceUri`.

#### Decoupled call flow

Recommended call flow:

1. The model calls the data tool (for example, `roll_dice`).
2. The model receives `structuredContent` from the data tool.
3. The model calls the render tool with that data.
4. The widget renders once with final, model-checked context.

#### Example: Real estate follow-up queries

Suppose your plugin shows listing cards and a map, but your server-side `search` tool
only supports broad filters (city, price, beds, baths) and cannot filter by
school zone.

If a user asks, “Which of these are in the Richmond Primary School zone?”
decoupling helps:

1. `search` runs broadly and returns candidate listing IDs plus metadata.
2. The model refines that candidate set for the follow-up question.
3. The model calls `render_listings_widget` with only the filtered IDs.
4. The widget renders the final filtered set.

Best practices:

- Keep data tools reusable. Return complete `structuredContent` for chaining.
- Keep render tools focused on presentation. Don't mix business logic into the
  render handler.
- State the dependency in the render tool description (for example, “Always
  call `roll_dice` first”).
- Keep reruns intentional. Let the UI call data tools directly for local
  interactions like “Re-roll,” without remounting the widget.

#### Decoupled example

Example (decoupled dice tools):

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";

const TEMPLATE_URI = "ui://widget/dice.html";

const server = new McpServer(
  { name: "Decoupled dice", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// The widget only renders the latest tool result.
// Re-roll calls the data tool directly to avoid remounting the widget.
const widgetHtml = `
  <div style="font-family: system-ui; padding: 8px;">
    <div style="font-size: 20px; margin-bottom: 6px;">
      Result: <span id="out">—</span>
    </div>
    <button id="reroll">Re-roll</button>
  </div>

  
`.trim();

server.registerResource("dice-widget", TEMPLATE_URI, {}, async () => ({
  contents: [
    {
      uri: TEMPLATE_URI,
      mimeType: "text/html;profile=mcp-app",
      text: widgetHtml,
      _meta: { ui: { prefersBorder: true } },
    },
  ],
}));

// 1) Data tool: no output template, returns chainable structuredContent.
server.registerTool(
  "roll_dice",
  {
    title: "Roll dice",
    description: "Roll an N-sided die and return { sides, value }.",
    inputSchema: { sides: z.number().int().min(2) },
    outputSchema: {
      sides: z.number().int().min(2),
      value: z.number().int().min(1),
    },
    _meta: {
      "openai/toolInvocation/invoking": "Rolling…",
      "openai/toolInvocation/invoked": "Rolled.",
    },
  },
  async ({ sides }) => {
    const value = 1 + Math.floor(Math.random() * sides);
    return {
      structuredContent: { sides, value },
      content: [{ type: "text", text: `Rolled ${value} on ${sides} sides.` }],
    };
  }
);

// 2) Render tool: owns the template and requires data from roll_dice.
server.registerTool(
  "render_dice_widget",
  {
    title: "Render dice widget",
    description:
      "Render the dice widget from roll data. First call roll_dice, then pass its sides and value to this tool.",
    inputSchema: {
      sides: z.number().int().min(2),
      value: z.number().int().min(1),
    },
    outputSchema: {
      sides: z.number().int().min(2),
      value: z.number().int().min(1),
    },
    _meta: {
      ui: { resourceUri: TEMPLATE_URI },
      "openai/toolInvocation/invoking": "Rendering…",
      "openai/toolInvocation/invoked": "Rendered.",
    },
  },
  async ({ sides, value }) => ({
    structuredContent: { sides, value },
    content: [
      {
        type: "text",
        text: `Showing a ${sides}-sided roll: ${value}.`,
      },
    ],
  })
);

export default server;
```

#### Manage state

UI from an MCP server works with three kinds of state:

| State type                        | Owner                          | Lifetime                             | Examples                                 |
| --------------------------------- | ------------------------------ | ------------------------------------ | ---------------------------------------- |
| **Business data (authoritative)** | MCP server or external service | Long-lived                           | Tasks, tickets, documents                |
| **UI state (ephemeral)**          | UI instance                    | Active UI instance                   | Selected row, expanded panel, sort order |
| **Cross-session state (durable)** | Storage you control            | Cross-session and cross-conversation | Saved filters, view mode, workspace      |

Keep each value with the system that owns it. The UI should render
authoritative data from tool results and layer temporary presentation state on
top.

```text
MCP server or external service
│
├── Authoritative business data
│
▼
UI
│
├── Ephemeral presentation state
│
└── Rendered view = business data + UI state
```

#### Keep business data on the server

Business data is the source of truth. Do not store it only in the UI. When a
user takes an action:

1. The UI calls an MCP tool.
2. The server validates the request and updates the data.
3. The server returns the updated authoritative snapshot.
4. The UI renders the snapshot while preserving compatible presentation
   state.

Return enough structured content for both the model and UI to understand the
new state. This also lets the conversation remain useful if the UI cannot
load.

#### Keep temporary UI state in the UI

Use framework state for values that only affect presentation, such as a
selected item, open panel, or draft filter. Each rendered UI instance has its
own state.

When the model needs to know about a selection or staged edit, send that
information through `ui/update-model-context`. This is the portable MCP Apps
mechanism for updating model-visible context.

ChatGPT also provides optional widget-scoped persistence:

- Read the current snapshot from `window.openai.widgetState`.
- Write a new snapshot with `window.openai.setWidgetState(state)`.

`setWidgetState` is synchronous. Call it after each meaningful UI-state change;
there is nothing to `await`.

```tsx
import { useState } from "react";

export function TaskList({ tasks }) {
  const [state, setState] = useState(
    window.openai?.widgetState ?? { selectedId: null }
  );

  function selectTask(selectedId) {
    const nextState = { ...state, selectedId };
    setState(nextState);
    window.openai?.setWidgetState?.(nextState);
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <button
            type="button"
            aria-pressed={state.selectedId === task.id}
            onClick={() => selectTask(task.id)}
          >
            {task.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

Widget state belongs to one rendered UI instance. Do not use it as the source
of truth for business data or as durable storage.

#### Make images visible to the model

For UI that works with images, use the structured widget-state shape:

- `modelContent`: Text or JSON the model should see.
- `privateContent`: UI-only state the model should not see.
- `imageIds`: File IDs the model should receive on later turns.

```tsx
window.openai.setWidgetState({
  modelContent: "Review the currently selected images.",
  privateContent: {
    currentView: "image-viewer",
    filters: ["crop", "sharpen"],
  },
  imageIds: ["file_123", "file_456"],
});
```

Only include file IDs uploaded with `window.openai.uploadFile`, selected with
`window.openai.selectFiles`, received through tool input file parameters, or
returned through tool result file references.

#### Store cross-session state on your server

Store preferences and data that must survive across conversations, devices, or
sessions in storage you control. Authenticate the user so the MCP server can
map each request to the correct account.

When you add durable storage:

- Keep latency low enough for interactive UI.
- Protect private data with server-side authorization.
- Plan for data residency and compliance requirements.
- Apply rate limits to traffic from retries or concurrent UI instances.
- Version stored objects so you can migrate them without breaking existing
  conversations.

Avoid `localStorage` for core state. UI runs in an isolated iframe, and browser
storage does not provide a reliable cross-device or cross-session data layer.

#### Scaffold the component project

Now that you understand the MCP Apps bridge (and optional ChatGPT extensions),
it’s time to scaffold your component project.

As best practice, keep the component code separate from your server logic. A common layout is:

```
plugin-ui/
  server/            # MCP server (Python or Node)
  web/               # Component bundle source
    package.json
    tsconfig.json
    src/component.tsx
    dist/component.js   # Build output
```

Create the project and install dependencies (Node 18+ recommended):

```bash
cd plugin-ui/web
npm init -y
npm install react@^18 react-dom@^18
npm install -D typescript esbuild
```

If your component requires drag-and-drop, charts, or other libraries, add them now. Keep the dependency set lean to reduce bundle size.

#### Author the React component

Your entry file should mount a component into a `root` element and render from
the latest tool result delivered over the MCP Apps bridge (for example,
`ui/notifications/tool-result`).

The [examples page](https://developers.openai.com/plugins/build/examples) includes sample UI, such as the Pizzaz list of
pizza restaurants.

#### Explore the Pizzaz component gallery

The [UI examples](https://developers.openai.com/plugins/build/examples) include example components. Treat them as blueprints when shaping your own UI:

- **Pizzaz List:** Ranked card list with favorites and call-to-action buttons.

- **Pizzaz Carousel:** Embla-powered horizontal scroller that demonstrates media-heavy layouts.

- **Pizzaz Map:** Mapbox integration with fullscreen inspector and host state sync.

- **Pizzaz Album:** Stacked gallery view built for deep dives on a single place.

- **Pizzaz Video:** Scripted player with overlays and fullscreen controls.

Each example shows how to bundle assets, wire host APIs, and structure state for real conversations. Copy the one closest to your use case and adapt the data layer for your tool responses.

#### React helper hooks

A small helper to subscribe to `ui/notifications/tool-result`:

```tsx
type ToolResult = { structuredContent?: unknown } | null;

export function useToolResult() {
  const [toolResult, setToolResult] = useState<ToolResult>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent) return;
      const message = event.data;
      if (!message || message.jsonrpc !== "2.0") return;
      if (message.method !== "ui/notifications/tool-result") return;
      setToolResult(message.params ?? null);
    };

    window.addEventListener("message", onMessage, { passive: true });
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return toolResult;
}
```

Render from `toolResult?.structuredContent`, and treat it as untrusted input.

#### Widget localization

The host mirrors the locale to `document.documentElement.lang`. Use that locale
to load translations and format dates/numbers. A common pattern with
`react-intl`:

```tsx
import { IntlProvider } from "react-intl";
import en from "./locales/en-US.json";
import es from "./locales/es-ES.json";

const messages: Record<string, Record<string, string>> = {
  "en-US": en,
  "es-ES": es,
};

export function PluginUI() {
  const locale = document.documentElement.lang || "en-US";
  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale] ?? messages["en-US"]}
    >
      {/* Render UI with <FormattedMessage> or useIntl() */}
  );
}
```

#### Bundle for the iframe

Once you finish writing your React component, you can build it into a single JavaScript module that the server can inline:

```json
// package.json
{
  "scripts": {
    "build": "esbuild src/component.tsx --bundle --format=esm --outfile=dist/component.js"
  }
}
```

Run `npm run build` to produce `dist/component.js`. If esbuild complains about missing dependencies, confirm you ran `npm install` in the `web/` directory and that your imports match installed package names (for example, `@react-dnd/html5-server-side` vs `react-dnd-html5-server-side`).

#### Embed the component in the server response

Expose the component as an MCP resource with the MCP Apps UI MIME type
(`text/html;profile=mcp-app`). If you use
`@modelcontextprotocol/ext-apps/server`, prefer `RESOURCE_MIME_TYPE` instead of
embedding the string:

```ts
import {
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { readFileSync } from "node:fs";

const component = readFileSync("web/dist/component.js", "utf8");

registerAppResource(
  server,
  "project-board",
  "ui://project-board/v1.html",
  {},
  async () => ({
    contents: [
      {
        uri: "ui://project-board/v1.html",
        mimeType: RESOURCE_MIME_TYPE,
        text: `<div id="root"></div>`,
        _meta: {
          ui: {
            prefersBorder: true,
            domain: "https://example.com",
            csp: {
              connectDomains: ["https://api.example.com"],
              resourceDomains: ["https://static.example.com"],
            },
          },
        },
      },
    ],
  })
);
```

Associate the resource URI with only the tools that should render the
component. For broader MCP Apps compatibility, use `_meta.ui.resourceUri`.
ChatGPT also honors `_meta["openai/outputTemplate"]` as a compatibility alias.

Treat the resource URI as a cache key. When you make a breaking change to the
HTML, JavaScript, or CSS, publish a new URI and update every tool that
references it.

#### Content security policy (CSP)

Declare the exact domains the component connects to or loads resources from:

- `connectDomains` for API requests.
- `resourceDomains` for scripts, styles, images, and other assets.
- `frameDomains` only when the component must embed specific iframe origins.

Nested frames are blocked by default. Keep each allowlist as narrow as possible.
The plugin review process checks the declared policy against the UI behavior.

Component UI templates are the recommended path for production.

During development you can rebuild the component bundle whenever your React code changes and hot-reload the server.

#### Offer checkout in your UI

If you want to offer users the ability to check out through your plugin's UI
flows, use the component to present products, prices, terms, and payment choices
before confirmation. Keep the underlying catalog and order tools useful without
UI, then choose an external checkout flow or, when available, an embedded
payment option.

#### Use external checkout by default

External checkout is the recommended and generally available approach. Link
from the component to a merchant-hosted checkout flow on your own domain,
where you handle:

- Pricing and payment collection.
- Taxes, discounts, and fees.
- Shipping and fulfillment.
- Refunds, support, and compliance.

Current approval is limited to plugins for physical-goods purchases. Do not
offer other commerce categories unless OpenAI has explicitly enabled them for
your plugin.

#### Use saved payment methods

For eligible physical-goods purchases, optional UI can let customers select a
payment method they previously saved with your service. This flow can display
eligible saved methods but cannot collect new payment credentials. Your MCP
server processes the purchase and returns the authoritative order result.

#### Use the ChatGPT payment sheet

Embedded checkout with the ChatGPT payment sheet is in private beta for select
marketplaces and is not available to all developers or users.

For enabled integrations, `window.openai.requestCheckout` opens the ChatGPT
payment sheet:

```tsx
const order = await window.openai.requestCheckout(checkoutSession);
```

The checkout flow has four parts:

1. An MCP tool returns a checkout session in `structuredContent`.
2. The component displays the line items, totals, terms, and fulfillment
   choices.
3. The component calls `requestCheckout(checkoutSession)` after the user
   chooses to pay.
4. ChatGPT sends the selected payment token to the MCP server's
   `complete_checkout` tool, which charges the payment method and returns the
   completed order.

The checkout session must include:

- A unique session ID.
- Line items and quantities.
- Totals in integer minor currency units.
- Payment-provider and merchant metadata.
- Required legal, privacy, refund, and support links.

Treat the server as the source of truth for prices and order status. Verify the
payment token, make the operation idempotent, persist the order, and return an
authoritative receipt. Never trust totals calculated only in the component.

Use `payment_mode: "test"` to exercise the end-to-end flow without moving real
funds. Handle cancellation, declined payments, and payment-provider errors in
the component.

For complete checkout-session fields, payment-provider behavior, the
`complete_checkout` result shape, and delegated-payment requirements, see the
[checkout API reference](https://developers.openai.com/plugins/build/monetization).

### Authentication

Source: [Authentication](https://developers.openai.com/plugins/build/auth.md)

#### Authenticate your users

Many plugin MCP servers can operate in a read-only, anonymous mode, but
anything that exposes customer-specific data or write actions should
authenticate users.

Published plugins can run in ChatGPT and Codex. The MCP authorization contract
applies across both products; this guide calls out ChatGPT-specific client
details when a callback, metadata document, or linking interface differs by
surface.

You can integrate with your own authorization server when you need to connect
to an existing server-side application or share data between users.

#### Custom auth with OAuth 2.1

For an authenticated MCP server, you are expected to implement an OAuth 2.1 flow that conforms to the [MCP authorization spec](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization).

#### Components

- **Resource server:** Your MCP server, which exposes tools and verifies access tokens on each request.
- **Authorization server:** Your identity provider or custom implementation that issues tokens and publishes discovery metadata.
- **Client:** The OpenAI host, such as ChatGPT or Codex, acting on behalf of the
  user. Supported clients use Client ID Metadata Documents (CIMD), dynamic
  client registration (DCR), predefined OAuth clients, and PKCE.

#### MCP authorization spec requirements

- Host protected resource metadata on your MCP server
- Publish OAuth metadata from your authorization server
- Echo the `resource` parameter throughout the OAuth flow
- Choose how the OpenAI host identifies or registers its OAuth client: CIMD,
  DCR, or a predefined OAuth client
- Publish the token endpoint authentication methods your authorization server accepts

Here is what the spec expects, in plain language.

#### Host protected resource metadata on your MCP server

- You need an HTTPS endpoint such as `GET https://your-mcp.example.com/.well-known/oauth-protected-resource` (or advertise the same URL in a `WWW-Authenticate` header on `401 Unauthorized` responses) so ChatGPT knows where to fetch your metadata.
- That endpoint returns a JSON document describing the resource server and its available authorization servers:

```json
{
  "resource": "https://your-mcp.example.com",
  "authorization_servers": ["https://auth.yourcompany.com"],
  "scopes_supported": ["files:read", "files:write"],
  "resource_documentation": "https://yourcompany.com/docs/mcp"
}
```

- Key fields you must populate:
  - `resource`: the canonical HTTPS identifier for your MCP server. ChatGPT sends this exact value as the `resource` query parameter during OAuth.
  - `authorization_servers`: one or more issuer base URLs that point to your identity provider. ChatGPT will try each to find OAuth metadata.
  - `scopes_supported`: optional list that helps ChatGPT explain the permissions it is going to ask the user for.
  - Optional extras from [RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728) such as `resource_documentation`, `resource_policy_uri`, or `resource_tos_uri` make it easier for clients and admins to understand your setup.

When you block a request because it is unauthenticated, return a challenge like:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://your-mcp.example.com/.well-known/oauth-protected-resource",
                         scope="files:read"
```

That single header lets ChatGPT discover the metadata URL even if it has not seen it before.

#### Publish OAuth metadata from your authorization server

- Your identity provider must expose one of the well-known discovery documents so ChatGPT can read its configuration:
  - OAuth 2.0 metadata at `https://auth.yourcompany.com/.well-known/oauth-authorization-server`
  - OpenID Connect metadata at `https://auth.yourcompany.com/.well-known/openid-configuration`
- Each document answers three big questions for the OpenAI host: where to send
  the user, how to exchange codes, and how to identify itself. A typical
  response looks like:

```json
{
  "issuer": "https://auth.yourcompany.com",
  "authorization_response_iss_parameter_supported": true,
  "authorization_endpoint": "https://auth.yourcompany.com/oauth2/v1/authorize",
  "token_endpoint": "https://auth.yourcompany.com/oauth2/v1/token",
  "client_id_metadata_document_supported": true,
  "token_endpoint_auth_methods_supported": ["none", "private_key_jwt"],
  "registration_endpoint": "https://auth.yourcompany.com/oauth2/v1/register",
  "code_challenge_methods_supported": ["S256"],
  "scopes_supported": ["files:read", "files:write"]
}
```

- Fields that must be correct:
  - `issuer`: the canonical authorization server identifier. Use this exact
    value in the protected resource metadata `authorization_servers` list.
  - `authorization_response_iss_parameter_supported`: set this to `true`
    only when your authorization server returns an `iss` parameter in every
    authorization response, including error responses.
  - `authorization_endpoint`, `token_endpoint`: the URLs ChatGPT needs to run the OAuth authorization-code + PKCE flow end to end.
  - `client_id_metadata_document_supported`: set to `true` when you want ChatGPT to use CIMD for client registration. ChatGPT prioritizes CIMD when it is available, but the plugin builder can choose DCR when both CIMD and DCR are available.
  - `token_endpoint_auth_methods_supported`: include the token endpoint authentication methods your authorization server accepts. This applies to CIMD, DCR, and predefined OAuth clients. For CIMD, ChatGPT supports `none` for public-client token exchange and `private_key_jwt` for signed client assertion token exchange. Other OAuth clients commonly use `none`, `client_secret_post`, or `client_secret_basic`.
  - `registration_endpoint`: include this when you support dynamic client registration (DCR), which lets ChatGPT create and reuse a dedicated `client_id` for the MCP server connection.
  - `code_challenge_methods_supported`: must include `S256`. MCP servers are
    unsupported when their authorization server metadata omits this field or
    does not advertise `S256`, as required by the
    [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization#authorization-code-protection).
  - Optional fields follow [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414) / [OpenID Discovery](https://openid.net/specs/openid-connect-discovery-1_0.html); include whatever helps your administrators configure policies.

#### OIDC scopes

- If your provider advertises OIDC scopes (for example, `openid`, `email`, `profile`) in `scopes_supported` of its `.well-known/oauth-authorization-server` or `.well-known/openid-configuration` document, ChatGPT requests those scopes by default during the OAuth flow.
- Some identity providers may not enable advertised OIDC scopes by default. Check your provider's configuration settings and make sure every advertised scope is enabled for the OAuth client, whether it uses CIMD, was created manually, or was created through DCR.

#### Support workspace domain restrictions

ChatGPT Enterprise workspaces can verify ownership of email domains. When an
OAuth-linked plugin provides the user's verified email address, ChatGPT can use
the email domain to prevent that corporate identity from linking the plugin in
a personal workspace or another workspace outside the organization.

To support this protection, configure your authorization server to:

- Publish OpenID Connect discovery metadata.
- Advertise and enable the `openid` and `email` scopes.
- Advertise a UserInfo Endpoint that returns the user's `email` claim and
  `email_verified: true`.

You can also return these claims in an ID token during the OAuth flow, but the
UserInfo Endpoint is required for workspace domain restrictions.

The Enterprise workspace must also verify its domain. Your authorization server
provides the user identity that ChatGPT compares with verified domains
configured for the workspace; it does not verify workspace ownership of a
domain.

#### Preserve login context during reauthorization

When ChatGPT reauthorizes an existing link, including to request additional OAuth scopes, it may include the prior OIDC ID token in the authorization request as the standard `id_token_hint` parameter. To let users grant additional scopes without starting login from scratch, configure your authorization server to issue an ID token during the original OAuth flow and honor `id_token_hint` during authorization.

This optimization is optional. Reauthorization still works when an ID token is unavailable or your authorization server does not use the hint.

#### Protect callbacks with issuer identification

OpenAI hosts use [RFC 9207 issuer
identification](https://www.rfc-editor.org/rfc/rfc9207#section-2.4) to protect
OAuth callbacks against authorization server mix-up attacks. To let ChatGPT
and Codex use a stable redirect URI when creating an eligible OAuth client:

- Set `authorization_response_iss_parameter_supported: true` in your
  [authorization server
  metadata](https://www.rfc-editor.org/rfc/rfc9207#section-3).
- Use the same exact issuer identifier in the metadata `issuer` field and
  the protected resource metadata `authorization_servers` list.
- Return `iss` in every successful and error authorization response. Its value
  must exactly match the metadata `issuer`; clients use exact string
  comparison and do not normalize trailing slashes, paths, ports, or casing.

ChatGPT and Codex record the selected metadata `issuer` before redirecting
the user and check the returned `iss` before exchanging the authorization
code. If the server advertises issuer identification but omits `iss` or
returns a mismatch, ChatGPT and Codex reject the response. These requirements
follow the [MCP authorization response validation
rules](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization#authorization-response-validation).

#### Redirect URL

Copy the exact production redirect URI shown in the MCP server's management page into
your authorization server's allowlist.

- If your authorization server does not meet the issuer identification
  requirements above, ChatGPT uses the callback-ID-specific redirect URI
  `https://chatgpt.com/connector/oauth/\{callback_id\}`.
- If your authorization server meets those requirements, ChatGPT uses the
  stable redirect URI
  `https://chatgpt.com/connector_platform_oauth_redirect`.

MCP servers published before ChatGPT introduced callback-ID-specific redirects also
continue to use the stable redirect URI.

#### Echo the `resource` parameter throughout the OAuth flow

- Expect ChatGPT to append `resource=https%3A%2F%2Fyour-mcp.example.com` to both the authorization and token requests. This ties the token back to the protected resource metadata shown above.
- Configure your authorization server to copy that value into the access token (commonly the `aud` claim) so your MCP server can verify the token was minted for it and nobody else.
- If a token arrives without the expected audience or scopes, reject it and rely on the `WWW-Authenticate` challenge to prompt ChatGPT to re-authorize with the correct parameters.

#### Support the authorization-code flow

- ChatGPT, acting as the MCP client, performs the authorization-code flow with PKCE using the `S256` code challenge so intercepted authorization codes cannot be replayed by an attacker.
- Your authorization server must publish `code_challenge_methods_supported` with `S256` so clients can confirm PKCE support from metadata.

#### OAuth flow

Provided that you have implemented the MCP authorization spec delineated above, the OAuth flow will be as follows:

1. ChatGPT queries your MCP server for protected resource metadata.

2. ChatGPT identifies itself as the OAuth client. When the MCP server uses CIMD, ChatGPT skips dynamic client registration and sends a CIMD document URL as the `client_id`. For authorization servers that meet the issuer identification requirements above, ChatGPT uses the stable `https://chatgpt.com/oauth/client.json`; for other servers, it uses the callback-ID-specific `https://chatgpt.com/oauth/\{callback_id\}/client.json`. The MCP server's management page shows the exact client metadata document and redirect URI for the connection's callback mode. When the MCP server uses DCR, ChatGPT calls your authorization server's `registration_endpoint` once for the MCP server connection, receives a generated `client_id`, and reuses that client for the connection.

When using CIMD, there is no client registration step. The following screen shows the DCR path:

3. When the user first invokes a tool, the ChatGPT client launches the OAuth authorization code + PKCE flow. The user authenticates and consents to the requested scopes.

4. ChatGPT exchanges the authorization code for an access token and attaches it to subsequent MCP requests (`Authorization: Bearer `).

5. Your server verifies the token on each request (issuer, audience, expiration, scopes) before executing the tool.

#### Client registration

Use [Client ID Metadata Documents (CIMD)](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization#client-id-metadata-documents) as the preferred client registration method when your authorization server supports it and the plugin builder chooses it. With CIMD, ChatGPT uses an HTTPS metadata document URL as its `client_id`. Your authorization server fetches that document, validates the published client metadata and redirect resource identifiers, and treats the URL as ChatGPT's stable client identity.

If you support CIMD, set `client_id_metadata_document_supported: true` in your authorization server metadata. This lets ChatGPT use one stable client identity for MCP servers that choose CIMD, which your authorization server can use for redirect URI allowlists, rate limits, and other policies.

ChatGPT is adopting the CIMD transition proposed in
[MCP SEP-3149](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3149).
Its production CIMD document publishes
`token_endpoint_auth_methods_supported` as an array of methods that ChatGPT
can use, with no preference order. During the transition, it also publishes
the legacy singular `token_endpoint_auth_method` as a preference:

```json
{
  "token_endpoint_auth_methods_supported": ["none", "private_key_jwt"],
  "token_endpoint_auth_method": "private_key_jwt"
}
```

The plural field has different perspectives in the two documents:
authorization server metadata lists the methods your token endpoint accepts,
while ChatGPT's CIMD document lists the methods ChatGPT can use. ChatGPT
selects a method from the intersection of those sets. When the singular legacy
preference is in the intersection, ChatGPT uses it for compatibility with
authorization servers that still treat the singular field as binding.
Otherwise, ChatGPT can use another method in the intersection.

Authorization servers that read the plural CIMD field should accept any method
in the intersection unless local security policy disallows that method for the
client. They must reject methods outside the intersection. The `client_id` URL
stays stable and does not use query parameters to select a method-specific
document.

The supported methods are:

- `none`: use this public-client flow when your token endpoint supports PKCE-based authorization-code exchange without client authentication. ChatGPT does not store a per-client secret.
- `private_key_jwt`: use this signed client assertion flow when your token endpoint requires client authentication. ChatGPT publishes a public JWKS URL in its CIMD metadata. The JWKS is served from `/oauth/jwks.json` on the metadata origin. ChatGPT signs token requests server-side with a managed private key and `kid`; your authorization server verifies the assertion against the public JWKS.

DCR is still supported. If you include `registration_endpoint`, ChatGPT can register dynamically when the plugin builder chooses DCR or CIMD is not available. ChatGPT runs DCR once per MCP server connection, then keeps and reuses the registered OAuth client for that connection. DCR can still create many registered clients across many separate connections, so CIMD is usually easier to administer at scale.

Keep the registered OAuth client and any client secret valid while the MCP server connection is in use. If your authorization server expires, deletes, or replaces either credential, users and reviewers may receive an `invalid_client` error when they connect. Access and refresh tokens can still expire or rotate normally.

#### Client identification

A frequent question is how your MCP server can confirm that a request actually comes from ChatGPT. ChatGPT presents an OpenAI-managed client certificate when connecting to MCP servers, so you can verify the client at the transport layer with mTLS. You can also allowlist ChatGPT’s [published egress IP ranges](https://developers.openai.com/api/docs/guides/ip-addresses). ChatGPT does **not** support machine-to-machine OAuth grants such as client credentials, service accounts, or JWT bearer assertions, nor can it present custom API keys or customer-provided mTLS certificates.

CIMD further strengthens client identification by giving your authorization server a stable, HTTPS-hosted declaration of ChatGPT’s identity. When you use `private_key_jwt`, verify ChatGPT's token endpoint client assertion against the public JWKS published in the CIMD metadata.

#### Mutual TLS (mTLS)

ChatGPT now presents an OpenAI-managed client certificate when establishing TLS connections to MCP servers. If your application validates client certificates, configure it to trust the OpenAI certificate chain below.

- Download OpenAI Root CA

- Download OpenAI Connectors mTLS intermediate CA

To validate the client certificate when establishing the TLS connection to your MCP server:

- Verify a leaf certificate is present and chains to the OpenAI Connectors mTLS intermediate CA.
- Verify the leaf certificate is valid for client authentication.
- Verify the leaf certificate’s SAN `dnsName` is `mtls.prod.connectors.openai.com`.
- Avoid pinning a leaf certificate fingerprint; OpenAI may rotate the leaf certificate while keeping it under the published CA chain.

Use mTLS to authenticate ChatGPT as the MCP client. Continue to use OAuth 2.1 to authenticate the end user and authorize tool access.

#### Choosing an identity provider

Most OAuth 2.1 identity providers can satisfy the MCP authorization requirements once they expose a discovery document, support CIMD with `none` or `private_key_jwt`, support DCR when needed, and echo the `resource` parameter into issued tokens. Prefer providers that support CIMD for client registration.

We _strongly_ recommend that you use an existing established identity provider rather than implementing authentication from scratch yourself.

Here are instructions for some popular identity providers.

#### Auth0

Auth0 enables MCP clients to securely connect to MCP servers by providing metadata discovery, CIMD registration, API security, and token exchange for first- and third-party tool calls.

- [Guide to configuring Auth0 for MCP authorization](https://github.com/openai/openai-mcpkit/blob/main/python-authenticated-mcp-server-scaffold/README.md#2-configure-auth0-authentication)
- [Auth0 securing MCP servers overview](https://auth0.com/ai/docs/mcp/intro/overview)
- [Auth0 securing MCP servers quickstart guides](https://auth0.com/ai/docs/mcp/get-started/overview)

#### Hosted provider example

- [Provider guide to MCP authorization](https://stytch.com/docs/guides/connected-apps/mcp-server-overview)
- [MCP authorization overview](https://stytch.com/blog/MCP-authentication-and-authorization-guide/)
- [Authentication guide for ChatGPT UI](https://stytch.com/blog/guide-to-authentication-for-the-openai-apps-sdk/)

#### Implementing token verification

When the OAuth flow finishes, ChatGPT directly attaches the access token it received to subsequent MCP requests (`Authorization: Bearer …`). Once a request reaches your MCP server you must assume the token is untrusted and perform the full set of resource-server checks yourself—signature validation, issuer and audience matching, expiry, replay considerations, and scope enforcement. That responsibility sits with you, not with ChatGPT.

In practice you should:

- Fetch the signing keys published by your authorization server (usually via JWKS) and verify the token’s signature and `iss`.
- Deny tokens that have expired or have not yet become valid (`exp`/`nbf`).
- Confirm the token was minted for your server (`aud` or the `resource` claim) and contains the scopes you marked as required.
- Run any server-specific policy checks, then either attach the resolved identity to the request context or return a `401` with a `WWW-Authenticate` challenge.

If verification fails, respond with `401 Unauthorized` and a `WWW-Authenticate` header that points back to your protected-resource metadata. This tells the client to run the OAuth flow again.

#### SDK token verification primitives

Both Python and TypeScript MCP software development kits include helpers so you do not have to wire this from scratch.

- [Python](https://github.com/modelcontextprotocol/python-sdk?tab=readme-ov-file#authentication)
- [TypeScript](https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#proxy-authorization-requests-upstream)

#### Testing and rollout

- **Local testing:** Start with a development tenant that issues short-lived tokens so you can iterate quickly.
- **Dogfood:** Once authentication works, gate access to trusted testers before rolling out broadly. You can require linking for specific tools or the entire MCP server.
- **Rotation:** Plan for token revocation, refresh, and scope changes. Your server should treat missing or stale tokens as unauthenticated and return a helpful error message.
- **OAuth debugging:** Use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) Auth settings to walk through each OAuth step and pinpoint where the flow breaks before you ship.

With authentication in place, you can expose user-specific data and write
actions to ChatGPT and Codex users.

#### Triggering authentication UI

ChatGPT only surfaces its OAuth linking UI when your MCP server signals that OAuth is available or necessary.

Triggering the tool-level OAuth flow requires both metadata (`securitySchemes` and the resource metadata document) **and** runtime errors that carry `_meta["mcp/www_authenticate"]`. Without both halves ChatGPT will not show the linking UI for that tool.

1. **Publish resource metadata.** The MCP server must expose its OAuth configuration at a well-known URL such as `https://your-mcp.example.com/.well-known/oauth-protected-resource`.

2. **Describe each tool’s auth policy with `securitySchemes`.** Declaring `securitySchemes` per tool tells ChatGPT which tools require OAuth versus which can run anonymously. Stick to per-tool declarations even if the entire server uses the same policy; server-level defaults make it difficult to evolve individual tools later.

   Two scheme types are available today, and you can list more than one to express optional auth:
   - `noauth`: The tool is callable anonymously; ChatGPT can run it immediately.
   - `oauth2`: The tool needs an OAuth 2.0 access token; include the scopes you will request so the consent screen is accurate.

   If you omit the array entirely, the tool inherits whatever default the server advertises. Declaring both `noauth` and `oauth2` tells ChatGPT it can start with anonymous calls but that linking unlocks privileged behavior. Regardless of what you signal to the client, your server must still verify the token, scopes, and audience on every invocation.

   Example (public + optional auth)—TypeScript SDK

   ```ts
   import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
   import { z } from "zod";

   declare const server: McpServer;

   server.registerTool(
     "search",
     {
       title: "Public Search",
       description: "Search public documents.",
       inputSchema: {
         q: z.string(),
       },
       outputSchema: {},
       securitySchemes: [
         { type: "noauth" },
         { type: "oauth2", scopes: ["search.read"] },
       ],
     },
     async ({ q }) => {
       return {
         content: [{ type: "text", text: `Results for ${q}` }],
         structuredContent: {},
       };
     }
   );
   ```

   Example (auth required)—TypeScript SDK

   ```ts
   import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
   import { z } from "zod";

   declare const server: McpServer;

   server.registerTool(
     "create_doc",
     {
       title: "Create Document",
       description: "Make a new doc in your account.",
       inputSchema: {
         title: z.string(),
       },
       outputSchema: {},
       securitySchemes: [{ type: "oauth2", scopes: ["docs.write"] }],
     },
     async ({ title }) => {
       return {
         content: [{ type: "text", text: `Created doc: ${title}` }],
         structuredContent: {},
       };
     }
   );
   ```

3. **Check tokens inside the tool handler and emit `_meta["mcp/www_authenticate"]`** when you want ChatGPT to trigger the authentication UI. Inspect the token and verify issuer, audience, expiry, and scopes. If no valid token is present, return an error result that includes `_meta["mcp/www_authenticate"]` and make sure the value contains both an `error` and `error_description` parameter. This `WWW-Authenticate` payload is what actually triggers the tool-level OAuth UI once steps 1 and 2 are in place. When a challenge prompts reauthorization, your provider can [preserve the user's existing login context](#preserve-login-context-during-reauthorization) during that flow.

   Example

   ```json
   {
     "jsonrpc": "2.0",
     "id": 4,
     "result": {
       "content": [
         {
           "type": "text",
           "text": "Authentication required: no access token provided."
         }
       ],
       "_meta": {
         "mcp/www_authenticate": [
           "'Bearer resource_metadata=\"https://your-mcp.example.com/.well-known/oauth-protected-resource\", error=\"insufficient_scope\", error_description=\"You need to login to continue\"'"
         ]
       },
       "isError": true
     }
   }
   ```

### Brainstorm plugin use cases

Source: [Brainstorm plugin use cases](https://developers.openai.com/plugins/plan/use-case.md)

Start by listing the things people will expect your plugin to do. The plugin's
name, description, skills, tools, and connection to an existing product all
create expectations. Your implementation should cover those expectations or
have a deliberate reason not to.

This work determines what belongs in the plugin:

- Add a **skill** when instructions, examples, or bundled resources can guide
  the model through the workflow.
- Add an **MCP server** when the workflow needs live data, authentication,
  controlled tools, or code that runs on infrastructure you operate.
- Add **UI to the MCP server** only when visual interaction materially improves
  part of the workflow.

#### Start from user expectations

Imagine that a person has installed your plugin but has not read its
documentation. What would they reasonably ask it to do?

Gather likely requests from:

- Tasks people already complete in your product or service.
- User interviews, support requests, search queries, and feature requests.
- Common terms people use for your product, data, and workflows.
- Existing workarounds that require copying data between tools.
- The plugin name, listing, screenshots, and starter prompts.

Include direct requests that name your plugin and indirect requests that state
the goal. For example, a project-management plugin might need to handle both
“Show my Acme launch board” and “What is blocking the launch?”

Do not limit the brainstorm to workflows that fit your current API. First
capture what people will expect. Then compare those expectations with what you
can support safely and reliably.

#### Build a use-case inventory

For each use case, record:

| Field             | Question to answer                                                         |
| ----------------- | -------------------------------------------------------------------------- |
| User goal         | What is the person trying to accomplish?                                   |
| Example requests  | How might they ask directly or indirectly?                                 |
| Expected result   | What would make the interaction successful?                                |
| Required context  | What information, account access, or prior state is needed?                |
| Plugin capability | Can a skill handle it, or does it need an MCP tool?                        |
| Safety boundary   | Could it expose data, change state, spend money, or affect another person? |
| Support decision  | Will the first version support it, defer it, or intentionally exclude it?  |

Group requests that share the same goal. “List my open tasks,” “What do I need
to do today?” and “Show overdue work” may belong to one task-review use case
with different filters rather than three unrelated features.

#### Check coverage

Review every expectation against the proposed plugin capabilities:

1. Confirm that each supported use case has a complete path from request to
   useful result.
2. Identify missing skills, tools, data, permissions, or error states.
3. Look for tools that expose technical operations without completing a
   recognizable user goal.
4. Verify that write actions include appropriate authorization and confirmation.
5. Check that the plugin can explain what it cannot do and offer a useful next
   step.

A plugin should not imply broad capability while supporting only a narrow
slice of the expected workflow. If users can create projects but cannot list,
inspect, or update them, either add the missing coverage or narrow the plugin's
positioning.

#### Document intentional exclusions

You do not need to implement every imaginable request. You should have a good
reason for each important exclusion, such as:

- The action would create unacceptable safety or privacy risk.
- The underlying product or API does not support it reliably.
- The workflow requires permissions that the plugin cannot verify.
- The result would be misleading without information the plugin cannot access.
- The use case is out of scope for the first release and the plugin's listing
  sets that expectation.

Record these decisions. They should inform skill boundaries, tool
descriptions, refusal behavior, test cases, and public listing copy.

#### Turn use cases into build decisions

For each supported use case, choose the smallest implementation that can
complete it:

- [Build a skill](https://developers.openai.com/plugins/build/skills) for repeatable instructions and
  resources.
- [Build an MCP server](https://developers.openai.com/plugins/build/mcp-server) for live data and
  controlled actions.
- [Add UI to the MCP server](https://developers.openai.com/plugins/build/chatgpt-ui) when people need to
  inspect, compare, edit, confirm, or navigate structured information.

Keep the use-case inventory as a test plan. Add representative direct,
indirect, edge-case, and out-of-scope requests, then verify that the finished
plugin behaves as intended for each one.

If the plugin needs live data or controlled actions, continue with
[Define tools](https://developers.openai.com/plugins/plan/tools).

### Build an MCP server

Source: [Build an MCP server](https://developers.openai.com/plugins/build/mcp-server.md)

Add an MCP server when a plugin use case needs live data, authentication,
controlled actions, or code that runs on infrastructure you operate. The
server defines the tools available to ChatGPT and Codex. It does not need to
return custom UI.

Start from the supported goals in your
[use-case inventory](https://developers.openai.com/plugins/plan/use-case). Each tool should help complete a
recognizable user goal and should expose only the data and actions required for
that goal.

Build the tools first. After the server works without custom UI, you can [add
UI to the MCP server](https://developers.openai.com/plugins/build/chatgpt-ui) for workflows that need
visual interaction.

#### Choose an MCP software development kit

The official software development kits provide schema helpers, server scaffolding, and streamable
HTTP transport:

- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk),
  published as `@modelcontextprotocol/sdk`.
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk), published
  as `mcp`.

Install the SDK that matches your server stack:

```bash
# TypeScript
npm install @modelcontextprotocol/sdk zod

# Python
pip install mcp
```

#### Create the server

Create an MCP server with a stable name and version:

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "acme-projects",
  version: "1.0.0",
});
```

MCP servers can also return an
[`instructions` field](https://modelcontextprotocol.io/specification/2025-06-18/basic/lifecycle#initialization)
during initialization. ChatGPT and Codex use these instructions alongside tool
metadata.

Use server instructions for guidance that applies across tools, such as
required tool sequences or shared rate limits. Keep the most important details
in the first 512 characters. Do not repeat every tool description or try to
change the model's personality.

```ts
const server = new McpServer(
  { name: "acme-projects", version: "1.0.0" },
  {
    instructions:
      "Before updating a project, call get_project to confirm its ID and current status.",
  }
);
```

#### Define tools from user goals

Create one tool for each distinct action the plugin must support. Prefer
focused operations such as `list_projects`, `get_project`, and
`update_project` over one tool with many unrelated modes.

Each tool needs:

- An action-oriented name and human-readable title.
- A description that explains when to use it.
- An explicit input schema.
- An output schema when the tool returns structured data.
- Accurate safety annotations.
- A handler that authorizes the request and performs the operation.

The model uses this metadata to decide whether and how to call the tool. Treat
names, descriptions, schemas, and annotations as part of the plugin's
user-facing behavior.

```ts
import { z } from "zod";

server.registerTool(
  "list_projects",
  {
    title: "List projects",
    description:
      "Use this when the user wants to find or review projects in their Acme workspace.",
    inputSchema: {
      status: z.enum(["active", "archived"]).optional(),
    },
    outputSchema: {
      projects: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          status: z.string(),
        })
      ),
    },
    annotations: {
      readOnlyHint: true,
      openWorldHint: false,
      destructiveHint: false,
    },
  },
  async ({ status }) => {
    const projects = await listProjects({ status });

    return {
      structuredContent: { projects },
      content: [
        {
          type: "text",
          text: `Found ${projects.length} projects.`,
        },
      ],
    };
  }
);
```

#### Return useful results without UI

A tool result can include:

- `structuredContent`: concise data the model can inspect and use in later
  calls.
- `content`: text or other MCP content that helps the model answer the user.
- `_meta`: client-specific data hidden from the model.

Return enough information for the model to complete the workflow without a
component. Use stable identifiers in structured results so later tools can
refer to the same records.

Do not put secrets, access tokens, or unnecessary personal data in tool
results. Treat `_meta` as hidden from the model, not as a substitute for
authorization or secure storage.

#### Import skills from the MCP server

Configure the MCP server to supply skills when you want to version and deploy
their instructions and supporting files with the server. During plugin
submission, **Scan Tools** imports a static snapshot of those skills into the
draft.

OpenAI currently supports a bounded, static subset of the
[draft SEP-2640 Skills extension](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2640).
This proposal is not yet part of the stable MCP specification.

#### Advertise the extension

Declare `io.modelcontextprotocol/skills` in the server's initialization
capabilities:

```json
{
  "capabilities": {
    "extensions": {
      "io.modelcontextprotocol/skills": {}
    }
  }
}
```

The declaration must be under `capabilities.extensions`. OpenAI does not
recognize the earlier `experimental` declaration.

#### List the skills and their resources

Support the paginated `skills/list` method. Each entry must include:

- A `uri` that points to the skill's `SKILL.md`.
- `frontmatter` containing every entry from the parsed `SKILL.md` front matter.
  Include the `name` and `description` entries.
- A complete `resources` list containing `SKILL.md` and every supporting file.
- A SHA-256 digest for each resource in the form
  `sha256:<64 lowercase hexadecimal characters>`.

Use the `skill://` URI convention. The directory containing `SKILL.md` must
match the skill name. For example:

```json
{
  "skills": [
    {
      "uri": "skill://dice-roller/tabletop-dice/SKILL.md",
      "frontmatter": {
        "name": "tabletop-dice",
        "description": "Roll one or more dice and report each result and the total."
      },
      "resources": [
        {
          "uri": "skill://dice-roller/tabletop-dice/SKILL.md",
          "digest": "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
        },
        {
          "uri": "skill://dice-roller/tabletop-dice/references/notation.md",
          "digest": "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789"
        }
      ]
    }
  ],
  "nextCursor": "optional-next-page-cursor"
}
```

The example digests show the required format. For a text resource, hash the
UTF-8 bytes of `content.text`. For a blob resource, base64-decode
`content.blob`, then hash the decoded bytes.

Also support `skills/get` for each listed `SKILL.md` URI. Return a `skill` object
with the same complete entry shape as `skills/list`.

Use these request parameters:

- For the first `skills/list` request, accept an empty object (`\{\}`).
- For each later `skills/list` request, accept the returned cursor, such as
  `\{ "cursor": "next-page-cursor" \}`.
- For `skills/get`, accept the catalog URI, such as
  `\{ "uri": "skill://dice-roller/tabletop-dice/SKILL.md" \}`.

#### Return every listed resource

Support `resources/read` for every URI in the manifest. Return exactly one
content item whose URI matches the request. OpenAI accepts UTF-8 text or a
base64-encoded blob.

During import, OpenAI verifies that:

- OpenAI can fetch every listed resource and confirm its digest.
- The fetched `SKILL.md` front matter exactly matches the catalog entry.
- Resource paths are safe, unique, and free of normalization conflicts.
- The complete skill fits the import limits.

The importer accepts up to five uniquely named skills across 10 catalog pages.
Each skill can contain up to 100 files, with these size limits:

| Content                               | Limit   |
| ------------------------------------- | ------- |
| `SKILL.md`                            | 256 KiB |
| Each supporting file                  | 1 MiB   |
| All resources for one skill           | 5 MiB   |
| Generated skill archives for one scan | 8 MiB   |

The combined archive limit includes ZIP packaging overhead.

If any entry fails validation or exceeds a limit, **Scan Tools** still returns
the server's tools but does not update the draft's imported skills. Fix the
server and scan again.

Skills imported from MCP are submission-time snapshots, not live runtime
resources. After changing a skill, run **Scan Tools** again, review the imported
skills, and submit a new plugin version. See
[Submit plugins](https://developers.openai.com/plugins/deploy/submission#mcp) for the complete flow.

#### Authenticate and authorize requests

Add authentication when a tool reads private data or takes action for a user.
Enforce authorization in the MCP server for every request; never rely on the
model to decide whether a user has access.

See [Authenticate users](https://developers.openai.com/plugins/build/auth) for OAuth discovery, security
schemes, and authorization challenges.

#### Tool annotations and elicitation

Set annotations according to actual behavior:

- `readOnlyHint`: `true` only when the tool cannot change state.
- `destructiveHint`: `true` when a tool can cause irreversible or difficult to
  reverse outcomes.
- `openWorldHint`: `true` when a tool accesses the public internet or open-ended
  external entities, including through read-only actions such as web search.
  A tool limited to a bounded private account or workspace can set this to
  `false`, even when that service is externally hosted.

Annotations help ChatGPT and Codex choose appropriate confirmation and safety
behavior. They do not replace authorization, validation, or confirmation in
your server.

Use MCP elicitation when the server needs structured information that was not
provided in the original tool call. Keep elicitation focused on information
the user can reasonably supply. Do not use it to collect secrets or bypass
normal authentication.

#### Company knowledge compatibility

Company knowledge can use read-only tools from your MCP server. To make a
plugin eligible as a company knowledge source, implement the standard
`search` and `fetch` tool input schemas and mark other read-only tools with
`readOnlyHint: true`.

Return absolute, user-openable URLs for sources that the model should cite. Keep
internal document identifiers in the result's `id` field. For the required
schemas and result shapes, see
[Building MCP servers for ChatGPT and API integrations](https://platform.openai.com/docs/mcp).

#### Run and test locally

Expose a streamable HTTP endpoint, typically at `/mcp`, then inspect it with
[MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector):

```bash
npx @modelcontextprotocol/inspector
```

In the Inspector UI, select **Streamable HTTP** and enter
`http://localhost:3000/mcp`.

Use the inspector to:

1. Confirm that initialization succeeds.
2. Review server instructions and the advertised tool list.
3. Call every tool with representative and invalid inputs.
4. Verify schemas, results, errors, and annotations.
5. Confirm that authorization is enforced for private data and write actions.

Then connect the server to ChatGPT in
[developer mode](https://developers.openai.com/plugins/deploy/connect-chatgpt) and run the direct,
indirect, edge-case, and out-of-scope requests from your use-case inventory.

#### Deploy the endpoint

For public plugin submission, deploy the MCP server at a stable, publicly
reachable HTTPS endpoint. [Secure MCP Tunnel](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels)
can connect a private MCP server in developer mode, but it does not satisfy
public submission requirements.

The production endpoint must:

- Support the MCP streamable HTTP transport.
- Respond at a stable URL, typically ending in `/mcp`.
- Meet the latency and availability needs of the plugin's workflows.
- Reach required services and data stores.
- Preserve authentication and authorization boundaries.
- Produce logs and metrics for failed initialization and tool calls.

If the MCP server must remain private, deploy a public HTTPS proxy that forwards
MCP requests to the private server. Use
[OpenAI-managed mTLS](https://developers.openai.com/plugins/build/auth#mutual-tls-mtls) to authenticate
ChatGPT as the MCP client, and use [OAuth 2.1](https://developers.openai.com/plugins/build/auth) when your
plugin requires user authentication. If your network requires an IP allowlist,
use the published [ChatGPT connectors IP ranges](https://developers.openai.com/api/docs/guides/ip-addresses)
and update the allowlist automatically. An IP allowlist does not replace
authentication or authorization.

The public endpoint must remain reachable for plugin review and
[domain verification](https://developers.openai.com/plugins/deploy/submission#domain-verification). Do not
use Secure MCP Tunnel alone, a temporary tunnel, or a local endpoint for public
submission.

#### Choose infrastructure

You can deploy the MCP server to serverless, container, edge, or traditional
application infrastructure. Choose a platform based on:

- Runtime and dependency support.
- Streaming response behavior.
- Cold-start and request latency.
- Network access to required services.
- Data residency and compliance requirements.
- Secret management.
- Logging, tracing, and alerting.
- Rollback and versioning support.

If the server also hosts optional UI assets, deploy those assets at stable
origins allowed by the component's
[content security policy](https://developers.openai.com/plugins/build/chatgpt-ui#content-security-policy-csp).

#### Configure the production endpoint

Before deployment:

1. Set production credentials through the host's secret-management system.
2. Configure the authorization server and allowed redirect behavior.
3. Apply timeouts and rate limits to expensive or externally visible tools.
4. Remove debug responses and unnecessary personal data.
5. Confirm that logs do not contain access tokens or sensitive tool results.

After deployment, call the production endpoint with
[MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector). Verify
initialization, server instructions, tools, schemas, annotations,
authentication, results, and errors.

#### Plan for updates

Keep published tool names and schemas backward compatible. Add fields or tools
without breaking existing contracts. If metadata changes, refresh the
developer-mode connection and rerun the evaluation set before submission.

For optional UI, version resource identifiers when HTML, JavaScript, or CSS
changes in a way that could break a cached component.

#### Add optional UI

After tools work end to end, decide whether any use case needs visual
interaction. A table, map, editable schedule, or comparison view may benefit
from UI. A lookup, status check, or background action often does not.

Continue with [Add UI to your MCP server](https://developers.openai.com/plugins/build/chatgpt-ui) to
register an MCP Apps resource and associate it with selected tools.

#### Security reminders

- Treat every tool input as untrusted.
- Validate parameters and enforce authorization on the server.
- Require confirmation for consequential write actions.
- Keep secrets and sensitive data out of tool metadata and results.
- Log enough context to investigate failures without logging credentials or
  unnecessary personal data.
- Rate-limit expensive or externally visible actions.

### Build plugins

Source: [Build plugins](https://learn.chatgpt.com/docs/build-plugins.md)

To build or submit a plugin, use the complete
[builder documentation on developers.openai.com](https://developers.openai.com/plugins).

Build and submit a plugin

This page provides a brief introduction. A plugin is an installable package
that can include skills, an MCP server, or both. An MCP server can also return
optional UI.

ChatGPT and Codex share one universal plugin directory. Publish a public plugin
once to make the same listing discoverable from supported surfaces in both
products. During development, use a local marketplace to test the package
before submitting it to the universal directory.

For workspace distribution through GitHub, see
[Plugin management](https://learn.chatgpt.com/docs/enterprise/plugin-management).

Start with a skill when you are still iterating on one personal workflow.
Build a plugin when you want to share that workflow, package related skills,
connect to an external service, or distribute a stable capability to a team.

#### Create a plugin with `@plugin-creator`

For the fastest setup, use the built-in `@plugin-creator` skill in ChatGPT Work
mode or `$plugin-creator` in Codex.

Describe the outcome, the skills or MCP server to include, and whether you want
a local marketplace entry for testing. For example:

```text
@plugin-creator Create a plugin named meeting-follow-up.
Include a skill that turns meeting notes into decisions, owners, and next steps.
Add it to a personal marketplace so I can test it locally.
```

The skill creates a supported `.codex-plugin/plugin.json` compatibility
manifest, organizes the plugin folder, and can add the plugin to a local
marketplace. This scaffold differs from the portable root `plugin.json` format
used in the manual example. See the [scaffold layout](https://developers.openai.com/plugins/build/plugins#plugin-creator-output)
for optional files and directories.

After it finishes:

1. Review `.codex-plugin/plugin.json`.
2. Check each bundled skill under `skills/` against the
   [instruction-following guidance](https://developers.openai.com/plugins/build/skills#review-instruction-following).
3. Refresh ChatGPT or Codex and install the plugin from its local marketplace
   source.
4. Test the plugin in a new conversation with representative requests.

If the plugin includes an MCP server, first build and test that server, then
give `@plugin-creator` the registered connection details. Follow the complete
[MCP server workflow](https://developers.openai.com/plugins/build/mcp-server)
for tools, authentication, deployment, and testing.

#### Create a skills-only plugin manually

A minimal portable Agent Plugins package contains a root manifest and at least
one skill:

```text
meeting-follow-up/
├── plugin.json
└── skills/
    └── meeting-follow-up/
        └── SKILL.md
```

Create `plugin.json` at the plugin root:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "meeting-follow-up",
  "version": "1.0.0",
  "description": "Turn meeting notes into decisions and next steps"
}
```

Portable packages discover skills in `skills/` automatically. Add
`skills/meeting-follow-up/SKILL.md`:

```md
---
name: meeting-follow-up
description: Extract decisions, owners, and next steps from meeting notes.
---

Review the meeting notes. Return:

1. Decisions
2. Action items with owners
3. Open questions
```

Use a stable plugin name in kebab case. Keep the skill description specific
enough for ChatGPT and Codex to recognize when the workflow applies.

Use `@plugin-creator` to add the folder to a local marketplace, then install and
test it before sharing it.

#### Continue with the builder documentation

For complete builder documentation, use the
[Plugins documentation](https://developers.openai.com/plugins/). It covers:

- [Plugin architecture](https://developers.openai.com/plugins/concepts/plugins)
- [Building skills](https://developers.openai.com/plugins/build/skills)
- [Building an MCP server](https://developers.openai.com/plugins/build/mcp-server)
- [Adding optional UI](https://developers.openai.com/plugins/build/chatgpt-ui)
- [Packaging a plugin](https://developers.openai.com/plugins/build/plugins)
- [Testing a plugin](https://developers.openai.com/plugins/deploy/connect-chatgpt)
- [Submitting and publishing](https://developers.openai.com/plugins/deploy/submission)

To browse, install, enable, or remove plugins, see [Use
plugins](https://learn.chatgpt.com/docs/plugins).

### Build skills

Source: [Build skills](https://learn.chatgpt.com/docs/build-skills.md)

Use agent skills to extend ChatGPT and Codex with task-specific capabilities. A
skill packages instructions, resources, and optional scripts so either product
can follow a workflow reliably. Skills build on the
[open agent skills standard](https://agentskills.io).

Skills are the authoring format for reusable workflows. Plugins distribute
reusable skills and connectors through the universal plugin directory shared
by ChatGPT and Codex. Plugins work in Chat and Work across ChatGPT on the web,
desktop, and mobile, in Codex in the ChatGPT desktop app, and through Codex
CLI. Use skills to design the workflow itself, then package it as a
[plugin](https://developers.openai.com/plugins/build/plugins) when you want
other people to install it.

Standalone skills are available in the ChatGPT desktop app, Codex CLI, and IDE
extension. Skills bundled in plugins are also available in Chat and Work across
ChatGPT on the web, desktop, and mobile.

In the ChatGPT desktop app, open **Skills** in the sidebar to view and explore skills
created across your projects.

Skills use **progressive disclosure** to manage context efficiently. ChatGPT and
Codex start with each skill's name and description, then load the full
`SKILL.md` instructions when they decide to use that skill.

In Codex, the initial list also includes each skill's file path. To avoid
crowding out the rest of the prompt, this list uses at most 2% of the model's
context window, or 8,000 characters when the context window is unknown. If many
skills are installed, Codex shortens skill descriptions first. For large skill
sets, Codex may omit some skills from the initial list and show a warning.

This budget applies only to the initial skills list. When Codex selects a skill, it still reads the full SKILL.md instructions for that skill.

A skill is a directory with a `SKILL.md` file plus optional scripts and references. The `SKILL.md` file must include `name` and `description`.

#### How ChatGPT and Codex use skills

ChatGPT and Codex can activate skills in two ways:

1. **Explicit invocation:** Include the skill directly in your prompt. In
   ChatGPT, type `@` to select a skill. In Codex CLI or the IDE extension, run
   `/skills` or type `$` to mention a skill.
2. **Implicit invocation:** ChatGPT or Codex can choose a skill when your task
   matches the skill `description`.

Because implicit matching depends on `description`, write concise descriptions
with clear scope and boundaries. Front-load the key use case and trigger words
so a host can still match the skill if descriptions are shortened.

#### Create a skill

If you already know the workflow and it's easier to show than describe, use
[Record & Replay](https://learn.chatgpt.com/docs/extend/record-and-replay). The recorder captures the
workflow, inspects the steps, and drafts a reusable skill from the
demonstration.

If you want to describe the skill instead, use the built-in creator. In ChatGPT
Work, invoke it as `@skill-creator`. In Codex, invoke it as:

```text
$skill-creator
```

The creator asks what the skill does, when it should trigger, and whether it should stay instruction-only or include scripts. Instruction-only is the default.

You can also create a skill manually by creating a folder with a `SKILL.md` file:

```md
---
name: skill-name
description: Explain exactly when this skill should and should not trigger.
---

Skill instructions for ChatGPT or Codex to follow.
```

Codex detects skill changes automatically. If an update doesn't appear, restart Codex.

#### Where Codex loads local skills

Codex reads skills from repository, user, admin, and system locations. For repositories, Codex scans `.agents/skills` in every directory from your current working directory up to the repository root. If two skills share the same `name`, Codex doesn't merge them; both can appear in skill selectors.

| Skill Scope                                                                    | Location                                                                                                                                                                                             | Suggested use                                                                                                                      |
| :----------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `REPO`                                                                         | `$CWD/.agents/skills`                                                                                                                                                                                |
| Current working directory: where you launch Codex.                             | If you're in a repository or code environment, teams can check in skills relevant to a working folder. For example, skills only relevant to a microservice or a module.                              |
| `REPO`                                                                         | `$CWD/../.agents/skills`                                                                                                                                                                             |
| A folder above CWD when you launch Codex inside a Git repository.              | If you're in a repository with nested folders, organizations can check in skills relevant to a shared area in a parent folder.                                                                       |
| `REPO`                                                                         | `$REPO_ROOT/.agents/skills`                                                                                                                                                                          |
| The topmost root folder when you launch Codex inside a Git repository.         | If you're in a repository with nested folders, organizations can check in skills relevant to everyone using the repository. These serve as root skills available to any subfolder in the repository. |
| `USER`                                                                         | `$HOME/.agents/skills`                                                                                                                                                                               |
| Any skills checked into the user's personal folder.                            | Use to curate skills relevant to a user that apply to any repository the user may work in.                                                                                                           |
| `ADMIN`                                                                        | `/etc/codex/skills`                                                                                                                                                                                  |
| Any skills checked into the machine or container in a shared, system location. | Use for SDK scripts, automation, and for checking in default admin skills available to each user on the machine.                                                                                     |
| `SYSTEM`                                                                       | Bundled with Codex by OpenAI.                                                                                                                                                                        | Useful skills relevant to a broad audience such as the skill-creator and plan skills. Available to everyone when they start Codex. |

Codex supports symlinked skill folders and follows the symlink target when scanning these locations.

These locations are for authoring and local discovery. When you want to
distribute reusable skills beyond a single repo, or optionally bundle them with
connectors, use [plugins](https://developers.openai.com/plugins/build/plugins).

#### Distribute skills with plugins

Direct skill folders are best for local authoring and repo-scoped workflows. If
you want to distribute a reusable skill, bundle two or more skills together, or
ship a skill alongside a connector, package them as a
[plugin](https://developers.openai.com/plugins/build/plugins).

Plugins can include one or more skills. They can also optionally bundle
registered MCP server connections, bundled MCP server configuration, and
presentation assets in a single package.

#### Install curated skills for local use

To add curated skills beyond the built-ins for your own local Codex setup, use `$skill-installer`. For example, to install the `$linear` skill:

```bash
$skill-installer linear
```

You can also prompt the installer to download skills from other repositories.
Codex detects newly installed skills automatically; if one doesn't appear,
restart Codex.

Use this for local setup and experimentation. For reusable distribution of your
own skills, prefer plugins.

#### Enable or disable local Codex skills

Use `[[skills.config]]` entries in `~/.codex/config.toml` to disable a skill without deleting it:

```toml
[[skills.config]]
path = "/path/to/skill/SKILL.md"
enabled = false
```

Restart Codex after changing `~/.codex/config.toml`.

#### Optional metadata

Add `agents/openai.yaml` to configure UI metadata in the [ChatGPT desktop app](https://learn.chatgpt.com/docs/app), to set invocation policy, and to declare tool dependencies for a more seamless experience with using the skill.

```yaml
interface:
  display_name: "Optional user-facing name"
  short_description: "Optional user-facing description"
  icon_small: "./assets/small-logo.svg"
  icon_large: "./assets/large-logo.png"
  brand_color: "#3B82F6"
  default_prompt: "Optional surrounding prompt to use the skill with"

policy:
  allow_implicit_invocation: false

dependencies:
  tools:
    - type: "mcp"
      value: "openaiDeveloperDocs"
      description: "OpenAI Docs MCP server"
      transport: "streamable_http"
      url: "https://developers.openai.com/mcp"
```

`allow_implicit_invocation` (default: `true`): When `false`, Codex won't implicitly invoke the skill based on user prompt; explicit `$skill` invocation still works.

#### Best practices

- Keep each skill focused on one job.
- Prefer instructions over scripts unless you need deterministic behavior or external tooling.
- Write imperative steps with explicit inputs and outputs.
- Test prompts against the skill description to confirm the right trigger behavior.

For more examples, see
[GitHub CI repair](https://github.com/openai/skills/tree/main/skills/.curated/gh-fix-ci),
[PDF](https://github.com/openai/skills/tree/main/skills/.curated/pdf),
[Linear](https://github.com/openai/skills/tree/main/skills/.curated/linear),
[openai/skills](https://github.com/openai/skills), and the
[agent skills specification](https://agentskills.io/specification). For
installable distribution, prefer [plugins](https://developers.openai.com/plugins/build/plugins).

### Build skills

Source: [Build skills](https://developers.openai.com/plugins/build/skills.md)

A skill complements your MCP server by teaching ChatGPT and Codex how to use
its tools in a repeatable workflow. Use the server for live data,
authentication, authorization, and controlled actions. Use the skill for tool
sequences, decision points, output requirements, examples, templates, and
other reusable guidance.

A plugin can contain one skill or a group of related skills. Keep every skill
focused on a recognizable user goal from your
[use-case inventory](https://developers.openai.com/plugins/plan/use-case). A skill can also work without an
MCP server when the workflow needs only packaged instructions and resources.

#### Create a skill

The fastest way to start is with the built-in skill creator. Describe the user
goal and the MCP tools that support it:

```text
@skill-creator Create a skill named tabletop-dice that understands dice
notation such as 3d6, calls roll_dice once for each die, and reports every
roll and the total.
```

In Codex, invoke the same creator as `$skill-creator`.

You can also create the files manually. Each skill lives in its own directory
and requires a `SKILL.md` file:

#### Write `SKILL.md`

Start the file with a name and a description, followed by the instructions:

```md
---
name: tabletop-dice
description: Roll one or more dice for tabletop games and report each result and the total.
---

Use this skill when the user asks to roll dice.

1. Parse requests written as `NdS` as N dice with S sides. For example, `3d6`
   means three six-sided dice.
2. Call `roll_dice` once for each requested die and pass S as `sides`.
3. Report each tool result in order.
4. When the user requests multiple dice, add the results and report the total.

Do not invent, replace, or reroll a result unless the user asks you to.
```

The description determines when the model considers the skill. State the
workflow and the conditions that should trigger it. Put detailed procedure,
format, and safety instructions in the body.

#### Define the workflow boundary

Connect every skill to one or more use cases. The instructions should make the
following clear:

- What input the workflow expects.
- Which steps the model should follow.
- What output the user should receive.
- Which facts the model must not infer.
- When the workflow should ask a question, stop, or decline.
- Which supporting files the model should consult.

Prefer one focused skill over a large collection of loosely related
instructions. Split workflows when they have different triggers, inputs, or
success criteria.

#### Review instruction following

When writing or importing skills for GPT-6 Astra, review the instruction-following guidance.
Audit skills and supporting files for unclear or conflicting instructions, and
make the priority of explicit user instructions over skill guidelines clear.

#### Add supporting resources

Keep `SKILL.md` concise and place detailed material next to it:

- Use `references/` for policies, schemas, examples, and background material.
- Use `assets/` for templates or files the workflow should copy or transform.
- Use `scripts/` when the workflow needs deterministic computation or file
  processing.

Reference supporting files from `SKILL.md` and explain when to load or run
them. Do not add a script when instructions and existing tools can complete the
task reliably.

#### Connect skills to MCP tools

A skill can guide the model through tools exposed by the plugin's MCP server.
Use the skill for workflow instructions and the server for live data,
authorization, and controlled actions.

If a skill requires an MCP server, declare the dependency in
`agents/openai.yaml`:

```yaml
dependencies:
  tools:
    - type: "mcp"
      value: "dice-roller"
      description: "Roll an N-sided die"
      transport: "streamable_http"
      url: "https://tinymcp.dev/api/moldy-aloof-zettabyte/mcp"
```

A dependency makes the required tool available; it does not replace clear
workflow instructions. Tell the model which tools to use, in what order, and
how to handle missing or ambiguous results.

#### Import a skill from MCP

You can upload a packaged skill during submission or import it from the
plugin's MCP server. The MCP option keeps the skill's instructions and
supporting files with the server deployment.

OpenAI imports skills from MCP when you select **Scan Tools** in the plugin
submission portal. The imported files become a snapshot in the draft; ChatGPT
and Codex do not fetch them from your MCP server at runtime. After changing the
skill, deploy the server and scan it again before submitting a new plugin
version.

For the capability declaration, discovery methods, resource manifest, and
import limits, see
[Import skills from the MCP server](https://developers.openai.com/plugins/build/mcp-server#import-skills-from-the-mcp-server).

#### Test the skill

Test with representative requests from the use-case inventory:

1. Direct requests that should activate the skill.
2. Indirect requests that express the same goal.
3. Incomplete inputs that should trigger a follow-up question.
4. Requests that should not activate the skill.
5. Edge cases where the skill must avoid inventing information or taking an
   unsupported action.

Review both activation and output quality. Refine the description when the
skill activates at the wrong time. Refine the instructions when it chooses the
right workflow but produces an inconsistent result.

#### Package the skill

Point the plugin manifest at the skills directory:

```json
{
  "name": "dice-roller",
  "version": "1.0.0",
  "description": "Roll dice for tabletop games",
  "skills": "./skills/",
  "apps": "./.app.json"
}
```

See [Package your plugin](https://developers.openai.com/plugins/build/plugins) for the complete manifest,
MCP server mapping, local testing, and distribution flow.

### Computer History

Source: [Computer History](https://learn.chatgpt.com/docs/customization/computer-history.md)

Computer History is **off by default** for ChatGPT Pro, Business, and
Enterprise users in the ChatGPT desktop app on macOS. Pro users can choose to
turn it on. For Business and Enterprise workspaces, an administrator must
explicitly grant access before each member can choose to turn it on. Computer
History also requires [Memories](https://learn.chatgpt.com/docs/customization/memories) and is not
available with an API key or Amazon Bedrock. It's available in supported
regions, including the European Economic Area (EEA), Switzerland, and the
United Kingdom.

Computer History turns your activity across apps and websites into memories and
a timeline that ChatGPT and Codex can reference. You can ask natural questions
about recent work, pick up where you left off, understand patterns in how you
work, and turn repeated workflows into skills or automations.

Your history starts only after you choose to turn it on. You control which apps
and websites contribute, can see and pause collection from the macOS menu bar,
and can inspect or delete your history at any time.

Computer History replaces the earlier Chronicle research preview, but it is a
rebuilt system rather than a rename. It uses interaction events, along with
text and other context available through macOS accessibility features, to
create summaries you can review and delete. It does not include screenshots in
your history or record audio, and private-mode web browsing activity is never
included.

#### How Computer History helps

Computer History supplies recent activity as context. When a file, Slack
conversation, Google Doc, or another source is better for the task, ChatGPT and
Codex can use the history to identify that source and then read it directly.

#### Pick up where you left off

Ask what you were doing before a break without reconstructing every open app,
document, and next step.

#### Find recent work

Refer to a document, conversation, or task the way you remember it. Computer
History can use the activity timeline to identify the source you mean.

#### Reuse workflows

When Computer History notices repeatable work, a timeline entry can suggest a
skill or automation. Review the suggestion, then ask Codex to create it from the
recorded workflow.

#### How Computer History works

Computer History creates an interaction-event stream from allowed apps and
websites. Events can include clicks, typing, keyboard shortcuts, app switches,
and context that macOS exposes through its accessibility system. Computer
History periodically turns these events into text summaries and local memory
files.

Computer History does not include screenshots in your history or record
microphone input or system audio. Private-mode web browsing activity is never
included.

In **Settings > Computer history > History**, the timeline groups summaries by
day and time. Each item can show:

- A title and text summary of the activity.
- The apps that contributed to the summary.
- A suggested skill or automation when ChatGPT identifies repeatable work.
- Actions to reveal the memory file in Finder or delete the item.

Select **Ask about your history** to start a chat with Computer History, or use
prompts such as:

- “What was I working on before my last break?”
- “Where can I find the proposal document I was looking for earlier today?”
- “Give me a list of tasks I’ve worked on today and their status.”
- “Prepare a summary of what I did yesterday for standup.”

#### Permissions and access

Computer History uses separate controls for workspace access, personal opt-in,
memories, and the apps or websites included in your history:

- **Workspace access:** Computer History is off by default in Business and
  Enterprise workspaces and is unavailable until an administrator
  explicitly grants access. Enterprise administrators can use **Enable Computer
  History** in [**Workspace Settings > Permissions & roles**](https://chatgpt.com/admin/settings)
  to grant access to the appropriate workspace roles.
- **Personal opt-in:** Granting workspace access only lets a member choose to
  turn on Computer History. It does not turn on the feature for anyone. Each
  person must opt in individually, including ChatGPT Pro users.
- **Memories:** Computer History also requires [Memories](https://learn.chatgpt.com/docs/customization/memories).
  Use `/memories` to control whether an individual chat can use local memories
  or contribute to future memories.
- **Apps and websites:** Your app and website permissions determine which
  sources can contribute interaction events. You can allow only specific
  sources or exclude apps and website URLs you do not want included.

If your workspace role does not have access, changing local settings cannot
enable Computer History.

#### Turn on Computer History

Computer History is off by default. If you use a Business or Enterprise
workspace, ask your administrator to grant you access before turning it on.
Administrator approval does not opt you in.

1. Open the ChatGPT desktop app on macOS.
2. In Settings, under **Integrations**, select **Computer history**.
3. Select **Turn on** and review the privacy, permissions, and local-storage
   information.
4. If prompted, turn on **Memories**. Computer History requires Memories so it
   can use activity context across chats and tasks.
5. Choose which apps and websites can contribute to your history, then follow
   any macOS permission prompts.

Computer History does not require Screen Recording permission. If the setting
does not appear, confirm that your plan supports Computer History and that your
workspace administrator has enabled it, if applicable.

#### Control what is included

You control which apps and websites contribute to future history and whether
Computer History is actively collecting interaction events.

#### Choose apps and websites

Under **Settings > Computer history > Permissions**, choose which apps and
websites Computer History can include:

- **Exclude these apps** and **Exclude these websites** block the apps or URLs
  you specify while allowing other supported sources.
- **Include only these apps** and **Include only these websites** allow only the
  sources you explicitly choose.

You can also select an app icon in a history timeline item to exclude that app
from future history. You can include it again later.

Private-mode web browsing activity is never included. Changing app or website
permissions affects future history. To remove existing items, delete or clear
them.

#### Pause, resume, or stop collection

Use the Computer History settings or macOS menu bar to control when the feature
collects activity:

- Select the ChatGPT icon in the macOS menu bar and expand the Computer History
  menu to see what activity it captures and access its controls.
- Select **Pause** to stop collecting new interaction events, or select
  **Resume** when you are ready to start again.
- Turn off Computer History to stop future activity collection.

Computer History can include interaction events from communication apps and
websites. Turn it off during communications with other people unless you have
their prior express consent. Consider pausing it or excluding apps that contain
sensitive health, financial, or personal information.

#### Review and clear history

Open **Settings > Computer history > History** to inspect what Computer History
has summarized. You can reveal a summary’s local memory file in Finder, delete
an individual timeline item, or clear the last 10 minutes, last hour, last day,
or all history. The macOS menu bar also lets you clear the last session for a
recent app.

Clearing history deletes the relevant interaction events and any memories
created from them. This cannot be undone.

#### Privacy and local storage

Computer History stores the interaction-event stream temporarily on your Mac so
ChatGPT and Codex can generate memories and build suggested workflows. The
stream can include activity such as clicks and typing, along with text and other
context available through macOS accessibility features. Computer History does
not include screenshots in your history or record microphone input or system
audio. Private-mode web browsing activity is never included.

Temporary event files are retained for up to 48 hours. Generated memory files
remain on your filesystem until you delete or clear them, and you can reveal
those files from the History timeline.

#### Where does Computer History store my data?

Computer History saves interaction events temporarily on your Mac. The event
files are isolated within the ChatGPT
[App Group](https://developer.apple.com/documentation/xcode/protecting-local-app-data-using-containers),
which prevents other apps from accessing them without explicit permission.
ChatGPT and Codex delete these event files after 48 hours.

Computer History generates the same kind of local memories as Codex: plain-text
Markdown files that you can read and modify. Those files are stored
under `$CODEX_HOME/memories/extensions/skysight/`, which typically resolves to
`~/.codex/memories/extensions/skysight/`.

#### What data gets shared with OpenAI?

Computer History captures interaction events locally, then periodically starts
an ephemeral Codex session with access to the interaction-event stream to
summarize your activity into memories.

OpenAI processes temporary event files on its servers to generate memories,
which are then stored locally on your Mac. OpenAI does not retain those event
files after processing unless required by law and does not use them for
training.

When ChatGPT or Codex uses a memory in a future chat, relevant memory contents
and interaction events may be included as context. This chat content may be
used to improve OpenAI models if allowed by your
[ChatGPT data controls](https://help.openai.com/en/articles/7730893-data-controls-faq).
Memories also follow the same
[chat-level controls as other Codex memories](https://learn.chatgpt.com/docs/customization/memories#control-memories-per-chat).

#### Prompt injection risk

Computer History increases the risk of prompt injection from content in apps
and websites. For example, if you visit a website containing malicious
instructions, ChatGPT or Codex might follow those instructions.

#### Token usage

Computer History uses tokens while it summarizes activity and creates memories.

#### Troubleshooting

If Computer History is available but does not start:

1. Confirm that **Memories** is on.
2. Open **Settings > Computer history** and select **Finish setup**, **Resume**,
   or **Try again**, depending on the status shown.
3. Quit and reopen the ChatGPT desktop app if the setting remains unavailable.

### Connect and test your plugin

Source: [Connect and test your plugin](https://developers.openai.com/plugins/deploy/connect-chatgpt.md)

Test each capability before testing the complete installed plugin. If the
plugin includes an MCP server, start by connecting and evaluating the server in
developer mode. Then package the plugin with its skills and test the complete
experience. Skills-only plugins can skip the first section.

Keep your evaluation prompts and results throughout development so you can
compare behavior across releases.

#### Test an MCP server (optional)

#### Prepare the endpoint

Confirm that:

- The MCP server is reachable through a public HTTPS endpoint or
  [Secure MCP Tunnel](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels).
- A public endpoint supports streamable HTTP, typically at `/mcp`, or the
  tunnel can reach its configured stdio or HTTP MCP server.
- Tool names, descriptions, schemas, and annotations are present.
- Authentication discovery works for tools that require an account.

Use Secure MCP Tunnel to connect a private MCP server in developer mode without
exposing the server to the public internet. A development tunnel or another
HTTPS forwarding service can also provide an endpoint for local testing. These
testing options do not replace the public HTTPS endpoint required for
[plugin submission](https://developers.openai.com/plugins/build/mcp-server#deploy-the-endpoint).

#### Inspect the MCP server

Use [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) to
list and call tools directly:

```bash
npx @modelcontextprotocol/inspector@latest
```

Exercise each tool with representative inputs, edge cases, missing identifiers,
and empty results. Verify schema validation, authentication errors, annotations,
confirmation behavior, and the model-readable result.

#### Enable developer mode

In ChatGPT:

1. Open **Settings**.
2. Select **Security and login**.
3. Turn on **Developer mode**.

Developer mode availability can depend on account and workspace policy.

#### Add the MCP server

1. Go to [ChatGPT Plugins](https://chatgpt.com/plugins).
2. Select the plus button.
3. Enter a user-facing name and description.
4. Under **Connection**, choose the connection method:
   - For a public endpoint, enter the MCP server URL, including the `/mcp` path.
   - For Secure MCP Tunnel, select **Tunnel**, then choose an available tunnel
     or enter its `tunnel_id`.
5. Create the connection.
6. Review the tools and metadata discovered from the server.

If ChatGPT cannot connect, verify the public HTTPS endpoint with MCP Inspector,
or check the tunnel's workspace association and `tunnel-client` status. Resolve
transport, initialization, schema, or authentication errors before continuing.

#### Check tool selection

Start a new conversation and add the MCP connection from the tools menu. Create
an evaluation set that includes:

- Direct requests that should call a specific tool.
- Indirect requests that express the same goal.
- Follow-up requests that reuse identifiers from earlier results.
- Write actions that require authorization or confirmation.
- Unsupported requests that shouldn't call a tool.

For each request, record the selected tool, arguments, result, errors, and
confirmation behavior. Rerun the set whenever you change tool names,
descriptions, schemas, or annotations.

If the server returns optional UI, test both the component and the
model-readable result.

#### Test through the API Playground

For raw request and response logs, open the
[API Playground](https://platform.openai.com/playground):

1. Choose **Tools → Add → MCP Server**.
2. Enter the HTTPS endpoint and connect.
3. Run test prompts and inspect the request and response data.

#### Refresh metadata

After changing tool names, descriptions, schemas, annotations, authentication,
or UI resources:

1. Deploy or restart the MCP server.
2. Open the connection at [ChatGPT Plugins](https://chatgpt.com/plugins).
3. Select **Refresh**.
4. Confirm that the advertised metadata changed.
5. Start a new conversation and rerun the affected tests.

This refresh flow applies to MCP servers connected in developer mode.
Published plugins with MCP use reviewed
[metadata snapshots](https://developers.openai.com/plugins/deploy/submission#how-published-mcp-metadata-versions-work).
To update published metadata, scan the server, submit a new version, and
publish the approved version.

Before packaging the plugin, confirm that:

- The tool list matches the documented capabilities.
- Structured results match each tool's declared output schema.
- Authentication failures return useful errors.
- Positive prompts select the expected tools and negative prompts don't.
- Optional UI renders without console errors and restores state correctly.

#### Test the complete plugin

After the MCP server works—or immediately for a skills-only plugin—package and
install the complete plugin from a local source:

1. [Package the plugin](https://developers.openai.com/plugins/build/plugins) with its skills, manifest, and
   MCP server connection when applicable.
2. Add the plugin to a local marketplace and install it from the Plugins
   Directory.
3. Start a new conversation with the plugin enabled.
4. Run representative requests from the plugin's use-case inventory.

Create an evaluation set that includes:

- Direct requests that should use a skill.
- Indirect requests that express the same goal.
- Follow-up requests that depend on an earlier result.
- Negative requests that shouldn't use the plugin.
- Boundary cases that the plugin intentionally doesn't support.

For each request, check that the plugin follows the skill instructions, uses
the expected resources, completes every required step, and produces a useful
result. Record any missing steps, unnecessary activations, or inconsistent
results.

For plugins with an MCP server, also confirm that skills invoke the right tools,
tool results return to the workflow, authentication works after installation,
and users can complete each combined workflow from start to finish.

Before submission, confirm that:

- Each skill activates for the intended requests.
- Similar phrasing produces consistent behavior.
- Unsupported requests don't activate the plugin.
- Bundled files and references resolve after installation.
- The plugin's starter prompts represent workflows it can complete.
- For plugins with an MCP server, bundled skills and tools work together as
  intended.

### Custom Code Review rules for Codex

Source: [Custom Code Review rules for Codex](https://developers.openai.com/blog/custom-code-review-rules-for-codex.md)

When doing code reviews with Codex, some comments keep coming back. It could be about preserving an older API contract, keeping customer data out of logs, or avoiding a rename that would break another service. These checks are important, but they are easy to miss when the context lives with a handful of reviewers.

Codex Code Review can now use custom repository rules in `AGENTS.md` to catch those issues and point authors to the guidance behind a finding. If you already use `AGENTS.md` to guide coding tasks, the same file can help guide reviews, too. This is especially useful when contributors or coding agents are working in an unfamiliar part of a repository and may not know its history yet. In this post, we'll show where repository rules fit and how to write them well, including what we learned while testing them.

#### Shipping more code

Coding agents can take on larger changes and work over longer horizons, helping teams move more of their ideas into code. At OpenAI, weekly PR volume has more than doubled since Q4, and we're seeing similar trends for many of our customers. More code is good: it helps teams ship new features and solve more problems. It also means more pull requests waiting for someone who knows what to look for, and code review can quickly become the bottleneck.

Review gets harder when several changes arrive at once. A diff can look completely reasonable and still break an older client or cross a boundary the author did not know about. Someone has to remember that context and share it while the author can still act on it.

#### The review bottleneck

When more pull requests land, reviewers have less time to work out what each change is trying to do and gather the relevant context before leaving feedback. Once an author moves on to something else, even a small revision can take longer. Fast feedback helps teams make the most of faster development without asking people to become the bottleneck.

Some issues are also hard to spot from the diff alone. Renaming a response field might look like routine cleanup, but it can break clients that still depend on the existing contract. An experienced reviewer may remember why that field needs to stay; a new contributor or an agent working in the service for the first time probably won't.

#### Rules as an interface

So how do you give a coding agent the context your team normally picks up over time? The new repository-rules interface lets you put concise, scoped review guidance in `AGENTS.md`. Codex Code Review can apply the rules that matter to a change and cite them in a finding. Instead of repeating the same explanation in every pull request, you can keep it close to the code it applies to.

As coding models become more steerable, a short, well-scoped instruction can help focus a long review on the things your team actually cares about. The [Codex repository itself keeps Code Review rules in `AGENTS.md`](https://github.com/openai/codex/blob/5c18cc0acc3734f0e78e422a7fd94ea4a2be652e/AGENTS.md#L85-L110), covering concerns such as model-visible context and breaking changes.

Here's a real example:

The Codex app-server emits an internal notification named `rawResponseItem/completed`. It is marked experimental, but Codex Cloud already consumes it. The repository's [breaking-change review rule](https://github.com/openai/codex/blob/5c18cc0acc3734f0e78e422a7fd94ea4a2be652e/AGENTS.md#L102-L110) explicitly calls out `rawResponseItem/*` as an integration surface that reviewers should preserve, even while experimental.

The [existing wire name is defined in the app-server protocol](https://github.com/openai/codex/blob/5c18cc0acc3734f0e78e422a7fd94ea4a2be652e/codex-rs/app-server-protocol/src/protocol/common.rs#L1665-L1670). Imagine a cleanup changed one line:

```diff
-RawResponseItemCompleted => "rawResponseItem/completed"
+RawResponseItemCompleted => "rawResponseItem/done"
```

The change compiles, but clients listening for the existing notification would stop receiving it. The relevant repository-rule excerpt is concise:

```md
## Code Review Rules

### Breaking changes

Search for breaking changes in external integration surfaces:

- raw response item events (`rawResponseItem/*`), even while experimental
```

For that illustrative diff, a Code Review finding could read:

> **Keep the existing `rawResponseItem/completed` notification.** Codex Cloud consumers listen for this wire name, so renaming it will break them even though the event is experimental. Keep the existing name or add a backward-compatible event, as described in `AGENTS.md`.

The Codex team [added this rule specifically to protect Codex Cloud consumers](https://github.com/openai/codex/pull/29086). Keep repository-wide rules at the root and service-specific rules in the relevant directory. During review, Codex can apply the guidance that covers the changed files and point authors to the relevant rule; an unrelated change does not need app-server context.

Rules sit alongside the other tools teams already rely on. Tests and linters work well for checks you can express deterministically; repository rules help capture the judgment that is harder to encode. Compatibility requirements and data boundaries are good places to start. Authors do not need to know every past incident or local convention before they make a change; the relevant guidance is already there.

#### Writing rules that hold up

We tested how well Code Review could use repository guidance with an eval suite that included known rule violations and safe counterexamples. In the primary suite, rule-guided variants recovered 98% of the required custom findings, compared with 58.3% in the baseline control.

Finding a rule violation is only part of the job. We also wanted to know what happens when several rules compete for attention or a pull request is already busy. We tested both consequential violations and changes that should be left alone, then organized the results around four questions:

    What we evaluated

      Coverage

        Can Codex surface intended violations when diffs are busy and rules
        compete for attention?

      Restraint

        Do clean changes and valid exceptions avoid unnecessary findings?

      Retention

        Does Code Review continue to catch ordinary bugs outside the repository
        rules?

      Actionability

        Does each finding identify the relevant guidance, location, and
        priority?

We also tried familiar ways of writing guidance, from short bullet lists to sections owned by a specific team.

We found the same pattern while using rules in internal repositories. Codex could find and cite local guidance that a default review might miss, but broad instructions could easily create noise. Small, scoped sets with an explicit safe path helped Codex focus on what was most useful without applying a rule to every nearby change.

**Start with a consequential, non-obvious invariant.** Encode a check reviewers repeatedly explain, such as a compatibility requirement or data boundary. If removing a rule would not change the review, leave it out.

**Scope rules to the code they govern.** Put repository-wide guidance at the root and service-specific guidance in a nested `AGENTS.md`. Narrow scope keeps unrelated instructions from competing for attention and makes ownership clear.

**State the invariant and the safe path.** The `rawResponseItem/*` rule identifies the compatibility risk. “Keep the existing name or add a backward-compatible event” gives authors a clear alternative.

**Keep rules durable and current.** Describe outcomes, not function names that may change. Review updates to the rules and narrow or remove guidance that repeatedly produces noise.

Keep formatting and other mechanical checks in CI. Save repository rules for the questions a reviewer would otherwise have to ask again.

#### Getting started

If your repository already has Codex Code Review enabled, add two or three rules to the applicable `AGENTS.md` file and open a representative pull request. If you are new to Code Review, the [Code Review quickstart](https://learn.chatgpt.com/docs/third-party/github) explains how to turn it on for a GitHub repository. You can also request a review directly with `@codex review`.

Start with an explanation reviewers keep repeating or a repository-specific mistake that would be consequential to miss. Try one change that should trigger the rule, one safe counterexample, and one unrelated change. Check that the first produces a useful finding and the others do not create noise, then refine the guidance from what you see.

Codex Code Review is still an additional reviewer; tests, branch protections, and required approvals continue to provide hard enforcement.

If you find yourself spending more time reviewing changes than writing them, start with one check your team keeps repeating. Add it to `AGENTS.md` and try Codex Code Review on your next pull request.

### Custom instructions with AGENTS.md

Source: [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md)

Codex reads `AGENTS.md` files before doing any work. By layering global guidance with project-specific overrides, you can start each task with consistent expectations, no matter which repository you open.

#### How Codex discovers guidance

Codex builds an instruction chain when it starts (once per run; in the TUI this usually means once per launched session). Discovery follows this precedence order:

1. **Global scope:** In your Codex home directory (defaults to `~/.codex`, unless you set `CODEX_HOME`), Codex reads `AGENTS.override.md` if it exists. Otherwise, Codex reads `AGENTS.md`. Codex uses only the first non-empty file at this level.
2. **Project scope:** Starting at the project root (typically the Git root), Codex walks down to your current working directory. If Codex cannot find a project root, it only checks the current directory. In each directory along the path, it checks for `AGENTS.override.md`, then `AGENTS.md`, then any fallback names in `project_doc_fallback_filenames`. Codex includes at most one file per directory.
3. **Merge order:** Codex concatenates files from the root down, joining them with blank lines. Files closer to your current directory override earlier guidance because they appear later in the combined prompt.

Codex skips empty files and stops adding files once the combined size reaches the limit defined by `project_doc_max_bytes` (32 KiB by default). For details on these knobs, see [Project instructions discovery](https://learn.chatgpt.com/docs/config-file/config-advanced#project-instructions-discovery). Raise the limit or split instructions across nested directories when you hit the cap.

#### Create global guidance

Create persistent defaults in your Codex home directory so every repository inherits your working agreements.

1. Ensure the directory exists:

   ```bash
   mkdir -p ~/.codex
   ```

2. Create `~/.codex/AGENTS.md` with reusable preferences:

   ```md
   # ~/.codex/AGENTS.md

   ## Working agreements

   - Always run `npm test` after modifying JavaScript files.
   - Prefer `pnpm` when installing dependencies.
   - Ask for confirmation before adding new production dependencies.
   ```

3. Run Codex anywhere to confirm it loads the file:

   ```bash
   codex --ask-for-approval never "Summarize the current instructions."
   ```

   Expected: Codex quotes the items from `~/.codex/AGENTS.md` before proposing work.

Use `~/.codex/AGENTS.override.md` when you need a temporary global override without deleting the base file. Remove the override to restore the shared guidance.

#### Layer project instructions

Repository-level files keep Codex aware of project norms while still inheriting your global defaults.

1. In your repository root, add an `AGENTS.md` that covers basic setup:

   ```md
   # AGENTS.md

   ## Repository expectations

   - Run `npm run lint` before opening a pull request.
   - Document public utilities in `docs/` when you change behavior.
   ```

2. Add overrides in nested directories when specific teams need different rules. For example, inside `services/payments/` create `AGENTS.override.md`:

   ```md
   # services/payments/AGENTS.override.md

   ## Payments service rules

   - Use `make test-payments` instead of `npm test`.
   - Never rotate API keys without notifying the security channel.
   ```

3. Start Codex from the payments directory:

   ```bash
   codex --cd services/payments --ask-for-approval never "List the instruction sources you loaded."
   ```

   Expected: Codex reports the global file first, the repository root `AGENTS.md` second, and the payments override last.

Codex stops searching once it reaches your current directory, so place overrides as close to specialized work as possible.

Here is a sample repository after you add a global file and a payments-specific override:

#### Add code review rules

For [Codex code review in GitHub](https://learn.chatgpt.com/docs/third-party/github#customize-what-codex-reviews),
add a `## Code Review Rules` section to the `AGENTS.md` closest to the code the
rules govern. Put repository-wide checks at the root and service-specific
checks in a nested file.

```md
## Code Review Rules

### Experiment cohorts

- Do not filter treatment comparisons on post-exposure behavior, including conversion or retention.
  Safe path: build cohorts from assignment or exposure; report conversion as an outcome.
```

Keep rules concise, explain the behavior to flag and any safe path or
exception, and reserve formatting and lint checks for CI. See [Customize what
Codex reviews](https://learn.chatgpt.com/docs/third-party/github#customize-what-codex-reviews) for
setup and rule-writing guidance.

#### Customize fallback filenames

If your repository already uses a different filename (for example `TEAM_GUIDE.md`), add it to the fallback list so Codex treats it like an instructions file.

1. Edit your Codex configuration:

   ```toml
   # ~/.codex/config.toml
   project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
   project_doc_max_bytes = 65536
   ```

2. Restart Codex or run a new command so the updated configuration loads.

Now Codex checks each directory in this order: `AGENTS.override.md`, `AGENTS.md`, `TEAM_GUIDE.md`, `.agents.md`. Filenames not on this list are ignored for instruction discovery. The larger byte limit allows more combined guidance before truncation.

With the fallback list in place, Codex treats the alternate files as instructions:

Set the `CODEX_HOME` environment variable when you want a different profile, such as a project-specific automation user:

```bash
CODEX_HOME=$(pwd)/.codex codex exec "List active instruction sources"
```

Expected: The output lists files relative to the custom `.codex` directory.

#### Verify your setup

- Run `codex --ask-for-approval never "Summarize the current instructions."` from a repository root. Codex should echo guidance from global and project files in precedence order.
- Use `codex --cd subdir --ask-for-approval never "Show which instruction files are active."` to confirm nested overrides replace broader rules.
- To audit which instruction files Codex loaded, opt into a plaintext TUI log with `codex -c log_dir=./.codex-log` and check `./.codex-log/codex-tui.log`, or inspect the most recent `session-*.jsonl` file if you enabled session logging.
- If instructions look stale, restart Codex in the target directory. Codex rebuilds the instruction chain on every run (and at the start of each TUI session), so there is no cache to clear manually.

#### Troubleshoot discovery issues

- **Nothing loads:** Verify you are in the intended repository and that `codex status` reports the workspace root you expect. Ensure instruction files contain content; Codex ignores empty files.
- **Wrong guidance appears:** Look for an `AGENTS.override.md` higher in the directory tree or under your Codex home. Rename or remove the override to fall back to the regular file.
- **Codex ignores fallback names:** Confirm you listed the names in `project_doc_fallback_filenames` without typos, then restart Codex so the updated configuration takes effect.
- **Instructions truncated:** Raise `project_doc_max_bytes` or split large files across nested directories to keep critical guidance intact.
- **Profile confusion:** Run `echo $CODEX_HOME` before launching Codex. A non-default value points Codex at a different home directory than the one you edited.

#### Next steps

- Visit the official [AGENTS.md](https://agents.md) website for more information.
- Review [Prompting Codex](https://learn.chatgpt.com/docs/prompting) for conversational patterns that pair well with persistent guidance.

### Custom Prompts

Source: [Custom Prompts](https://learn.chatgpt.com/docs/custom-prompts.md)

Custom prompts are deprecated. Use [skills](https://learn.chatgpt.com/docs/build-skills) for reusable
instructions that Codex can invoke explicitly or implicitly.

Custom prompts (deprecated) let you turn Markdown files into reusable prompts that you can invoke as slash commands in both the Codex CLI and the Codex IDE extension.

Custom prompts require explicit invocation and live in your local Codex home directory (for example, `~/.codex`), so they're not shared through your repository. If you want to share a prompt (or want Codex to implicitly invoke it), [use skills](https://learn.chatgpt.com/docs/build-skills).

1. Create the prompts directory:

   ```bash
   mkdir -p ~/.codex/prompts
   ```

2. Create `~/.codex/prompts/draftpr.md` with reusable guidance:

   ```markdown
   ---
   description: Prep a branch, commit, and open a draft PR
   argument-hint: [FILES=<paths>] [PR_TITLE="<title>"]
   ---

   Create a branch named `dev/<feature_name>` for this work.
   If files are specified, stage them first: $FILES.
   Commit the staged changes with a clear message.
   Open a draft PR on the same branch. Use $PR_TITLE when supplied; otherwise write a concise summary yourself.
   ```

3. Restart Codex so it loads the new prompt (restart your CLI session, and reload the IDE extension if you are using it).

Expected: Typing `/prompts:draftpr` in the slash command menu shows your custom command with the description from the front matter and hints that files and a PR title are optional.

#### Add metadata and arguments

Codex reads prompt metadata and resolves placeholders the next time the session starts.

- **Description:** Shown under the command name in the popup. Set it in YAML front matter as `description:`.
- **Argument hint:** Document expected parameters with `argument-hint: KEY=`.
- **Positional placeholders:** `$1` through `$9` expand from space-separated arguments you provide after the command. `$ARGUMENTS` includes them all.
- **Named placeholders:** Use uppercase names like `$FILE` or `$TICKET_ID` and supply values as `KEY=value`. Quote values with spaces (for example, `FOCUS="loading state"`).
- **Literal dollar signs:** Write `$$` to emit a single `$` in the expanded prompt.

After editing prompt files, restart Codex or open a new chat so the updates load. Codex ignores non-Markdown files in the prompts directory.

#### Invoke and manage custom commands

1. In Codex (CLI or IDE extension), type `/` to open the slash command menu.
2. Enter `prompts:` or the prompt name, for example `/prompts:draftpr`.
3. Supply required arguments:

   ```text
   /prompts:draftpr FILES="src/pages/index.astro src/lib/api.ts" PR_TITLE="Add hero animation"
   ```

4. Press Enter to send the expanded instructions (skip either argument when you don't need it).

Expected: Codex expands the content of `draftpr.md`, replacing placeholders with the arguments you supplied, then sends the result as a message.

Manage prompts by editing or deleting files under `~/.codex/prompts/`. Codex scans only the top-level Markdown files in that folder, so place each custom prompt directly under `~/.codex/prompts/` rather than in subdirectories.

### Customization

Source: [Customization](https://learn.chatgpt.com/docs/customization/overview.md)

Customization is how you make Codex work the way your team works.

In Codex, customization comes from a few layers that work together:

- **Project guidance (`AGENTS.md`)** for persistent instructions
- **[Memories](https://learn.chatgpt.com/docs/customization/memories)** for useful context learned from prior work
- **Skills** for reusable workflows and domain expertise
- **[MCP](https://learn.chatgpt.com/docs/extend/mcp)** for access to external tools and shared systems
- **[Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)** for delegating work to specialized subagents

These are complementary, not competing. `AGENTS.md` shapes behavior, memories
carry local context forward, skills package repeatable processes, and
[MCP](https://learn.chatgpt.com/docs/extend/mcp) connects Codex to systems outside the local workspace.

#### AGENTS Guidance

`AGENTS.md` gives Codex durable project guidance that travels with your repository and applies before the agent starts work. Keep it small.

Use it for the rules you want Codex to follow every time in a repo, such as:

- Build and test commands
- Review expectations
- repo-specific conventions
- Directory-specific instructions

When the agent makes incorrect assumptions about your codebase, correct them in `AGENTS.md` and ask the agent to update `AGENTS.md` so the fix persists. Treat it as a feedback loop.

**Updating `AGENTS.md`:** Start with only the instructions that matter. Codify recurring review feedback, put guidance in the closest directory where it applies, and tell the agent to update `AGENTS.md` when you correct something so future sessions inherit the fix.

#### When to update `AGENTS.md`

- **Repeated mistakes**: If the agent makes the same mistake repeatedly, add a rule.
- **Too much reading**: If it finds the right files but reads too many documents, add routing guidance (which directories/files to prioritize).
- **Recurring PR feedback**: If you leave the same feedback more than once, codify it.
- **In GitHub**: In a pull request comment, tag `@codex` with a request (for example, `@codex add this to AGENTS.md`) to delegate the update to a cloud chat.
- **Automate drift checks**: Use [scheduled tasks](https://learn.chatgpt.com/docs/automations) to run recurring checks (for example, daily) that look for guidance gaps and suggest what to add to `AGENTS.md`.

Pair `AGENTS.md` with infrastructure that enforces those rules: pre-commit hooks, linters, and type checkers catch issues before you see them, so the system gets smarter about preventing recurring mistakes.

Codex can load guidance from multiple locations: a global file in your Codex home directory (for you as a developer) and repo-specific files that teams can check in. Files closer to the working directory take precedence.
Use the global file to shape how Codex communicates with you (for example, review style, verbosity, and defaults), and keep repo files focused on team and codebase rules.

[Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)

#### Skills

Skills give Codex reusable capabilities for repeatable workflows.
Skills are often the best fit for reusable workflows because they support richer instructions, scripts, and references while staying reusable across tasks.
Skills are loaded and visible to the agent (at least their metadata), so Codex can discover and choose them implicitly. This keeps rich workflows available without bloating context up front.

Use skill folders to author and iterate on workflows locally. If a plugin
already exists for the workflow, install it first to reuse a proven setup. When
you want to distribute your own workflow across teams or bundle it with
connectors, package it as a [plugin](https://learn.chatgpt.com/docs/build-plugins). Skills remain the
authoring format; plugins are the installable distribution unit.

A skill is typically a `SKILL.md` file plus optional scripts, references, and assets.

The skill directory can include a `scripts/` folder with CLI scripts that Codex invokes as part of the workflow (for example, seed data or run validations). When the workflow needs external systems (issue trackers, design tools, docs servers), pair the skill with [MCP](https://learn.chatgpt.com/docs/extend/mcp).

Example `SKILL.md`:

```md
---
name: commit
description: Stage and commit changes in semantic groups. Use when the user wants to commit, organize commits, or clean up a branch before pushing.
---

1. Do not run `git add .`. Stage files in logical groups by purpose.
2. Group into separate commits: feat → test → docs → refactor → chore.
3. Write concise commit messages that match the change scope.
4. Keep each commit focused and reviewable.
```

Use skills for:

- Repeatable workflows (release steps, review routines, docs updates)
- Team-specific expertise
- Procedures that need examples, references, or helper scripts

Skills can be global (in your user directory, for you as a developer) or repo-specific (checked into `.agents/skills`, for your team). Put repo skills in `.agents/skills` when the workflow applies to that project; use your user directory for skills you want across all repos.

| Layer  | Global               | repo                                           |
| :----- | :------------------- | :--------------------------------------------- |
| AGENTS | `~/.codex/AGENTS.md` | `AGENTS.md` in repo root or nested directories |
| Skills | `~/.agents/skills`   | `.agents/skills` in repo                       |

Codex uses progressive disclosure for skills:

- It starts with metadata (`name`, `description`) for discovery
- It loads `SKILL.md` only when a skill is chosen
- It reads references or runs scripts only when needed

Skills can be invoked explicitly, and Codex can also choose them implicitly when the task matches the skill description. Clear skill descriptions improve triggering reliability.

[Build skills](https://learn.chatgpt.com/docs/build-skills)

#### MCP

MCP (Model Context Protocol) is the standard way to connect Codex to external tools and context providers.
It's especially useful for remotely hosted systems such as Figma, Linear, GitHub, or internal knowledge services your team depends on.

Use MCP when Codex needs capabilities that live outside the local repo, such as issue trackers, design tools, browsers, or shared documentation systems.

One way to think about it:

- **Host**: Codex
- **Client**: the MCP connection inside Codex
- **Server**: the external tool or context provider

MCP servers can expose:

- **Tools** (actions)
- **Resources** (readable data)
- **Prompts** (reusable prompt templates)

This separation helps you reason about trust and capability boundaries. Some servers mainly provide context, while others expose powerful actions.

In practice, MCP is often most useful when paired with skills:

- A skill defines the workflow and names the MCP tools to use

[Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)

#### Subagents

You can create different agents with different roles and prompt them to use tools differently. For example, one agent might run specific testing commands and configurations, while another has MCP servers that fetch production logs for debugging. Each subagent stays focused and uses the right tools for its job.

[Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)

#### Skills + MCP together

Skills plus MCP is where it all comes together: skills define repeatable workflows, and MCP connects them to external tools and systems.
If a skill depends on MCP, declare that dependency in `agents/openai.yaml` so Codex can install and wire it automatically (see [Build skills](https://learn.chatgpt.com/docs/build-skills)).

#### Next step

Build in this order:

1. [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) so Codex follows your repo conventions. Add pre-commit hooks and linters to enforce those rules.
2. Install a [plugin](https://learn.chatgpt.com/docs/plugins) when a reusable workflow already exists. Otherwise, create a [skill](https://learn.chatgpt.com/docs/build-skills) and package it as a plugin when you want to share it.
3. [MCP](https://learn.chatgpt.com/docs/extend/mcp) when workflows need external systems (Linear, GitHub, docs servers, design tools).
4. [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) when you're ready to delegate noisy or specialized tasks to subagents.

### Define tools

Source: [Define tools](https://developers.openai.com/plugins/plan/tools.md)

Tools are the actions and data that a plugin's MCP server exposes to ChatGPT
and Codex. Define them after you
[brainstorm use cases](https://developers.openai.com/plugins/plan/use-case) and before you implement the
server.

Every tool should help complete a user goal. Do not mirror an internal API
without considering how people will ask for and use the capability.

#### Map use cases to tools

For each supported use case:

1. Write the outcome the user expects.
2. List the information required to produce that outcome.
3. Identify the reads, writes, or external actions the server must perform.
4. Group operations that represent one coherent action.
5. Split operations when they have different permissions, safety risks, or
   confirmation requirements.

For example, a project plugin might expose:

- `list_projects` to find projects.
- `get_project` to inspect one project.
- `create_project` to create a project.
- `update_project` to change project details.
- `archive_project` to perform a consequential state change.

Separate read and write behavior so the model and user can distinguish
information retrieval from actions that change state.

#### Define each contract

Record the following for every proposed tool:

| Field            | What to define                                                       |
| ---------------- | -------------------------------------------------------------------- |
| Name             | A stable, action-oriented identifier.                                |
| Title            | A concise human-readable action.                                     |
| Description      | The user goal and conditions that should trigger the tool.           |
| Input schema     | Required and optional parameters, types, allowed values, and limits. |
| Output schema    | Structured fields the model can inspect and reuse.                   |
| Authorization    | The account, role, or resource access the server must verify.        |
| Side effects     | Data or external state the tool can change.                          |
| Failure behavior | Errors the model can explain or recover from.                        |

Use explicit inputs. Do not depend on the model guessing identifiers, account
scope, or other values that are required for correctness.

Return stable identifiers and enough structured information for follow-up
calls. Keep secrets, access tokens, internal diagnostics, and unnecessary
personal data out of results.

#### Write descriptions for selection

The model uses tool descriptions to decide when a tool fits a request. Describe
the user intent, not the implementation.

Good descriptions:

- State what the tool does.
- Explain when to use it.
- Distinguish it from similar tools.
- Call out important limits or prerequisites.

Avoid descriptions that only restate the tool name or expose internal service
terminology that users do not know.

#### Plan safety annotations

Assign annotations based on actual behavior. See the MCP
[`ToolAnnotations`
schema](https://modelcontextprotocol.io/specification/2025-11-25/schema#toolannotations)
for the canonical definitions, defaults, and interactions between these hints:

- `readOnlyHint` is `true` only when the tool cannot change state.
- `destructiveHint` is `true` when the tool can cause irreversible or difficult
  to reverse outcomes.
- `openWorldHint` is `true` when the tool accesses the public internet or
  open-ended external entities, including through read-only actions such as
  web search. A bounded private account or workspace isn't open-world solely
  because it is externally hosted.

Annotations do not replace server-side authorization, input validation, or
confirmation for consequential actions.

#### Check coverage and boundaries

Compare the proposed tools with the complete use-case inventory:

1. Confirm that every supported use case has a path to a useful result.
2. Identify tools that do not serve a documented use case.
3. Look for missing reads that users need before taking a write action.
4. Verify that unsupported requests produce an understandable limitation
   instead of an unsafe approximation.
5. Test whether two similar tools have overlapping descriptions that could
   confuse selection.

Keep the resulting tool plan as an implementation and evaluation checklist.
Then [build the MCP server](https://developers.openai.com/plugins/build/mcp-server) and test each contract
with representative, invalid, and unauthorized inputs.

### Docs MCP

Source: [Docs MCP](https://developers.openai.com/learn/docs-mcp.md)

OpenAI hosts a public Model Context Protocol (MCP) server for documentation on `developers.openai.com`, `platform.openai.com`, and `learn.chatgpt.com`.

**Server URL (streamable HTTP):** `https://developers.openai.com/mcp`

#### What it provides

- Read-only access to OpenAI developer documentation (search + page content).
- A way to pull documentation into your agent's context while you work.

This MCP server is documentation-only. It does not call the OpenAI API on your
behalf.

#### Quickstart

You can connect Codex to [MCP servers](https://learn.chatgpt.com/docs/extend/mcp) in the [CLI](https://learn.chatgpt.com/docs/codex/cli) or [IDE extension](https://learn.chatgpt.com/docs/codex/ide). The configuration is shared between both so you only have to set it up once.

    Add the server using the Codex CLI:

```bash
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
```

    Verify it's configured:

```bash
codex mcp list
```

    Alternatively, you can add it in `~/.codex/config.toml` directly:

```toml
[mcp_servers.openaiDeveloperDocs]
url = "https://developers.openai.com/mcp"
```

    To have Codex reliably use the MCP server, add this snippet to your `AGENTS.md`:

```
Always use the OpenAI developer documentation MCP server if you need to work with the OpenAI API, plugins, ChatGPT, Codex,… without me having to explicitly ask.
```

    VS Code supports MCP servers when using GitHub Copilot in Agent mode.

    Click the following link to add the Docs MCP to VS Code:

    [Install in VS Code](https://learn.chatgpt.com/docs)

    Alternatively, you can manually add a `.vscode/mcp.json` in your project root:

```json
{
  "servers": {
    "openaiDeveloperDocs": {
      "type": "http",
      "url": "https://developers.openai.com/mcp"
    }
  }
}
```

    To have VS Code reliably use the MCP server, add this snippet to your `AGENTS.md`:

```
Always use the OpenAI developer documentation MCP server if you need to work with the OpenAI API, plugins, ChatGPT, Codex,… without me having to explicitly ask.
```

    Open Copilot Chat, switch to **Agent** mode, enable the server in the tools picker, and ask an OpenAI-related question like:

> Look up the request schema for Responses API tools in the OpenAI developer docs and summarize the required fields.

    Cursor has native MCP support and reads configuration from `mcp.json`.

    Install with Cursor:

    [Install in Cursor](https://cursor.com/en-US/install-mcp?name=openaiDeveloperDocs&config=eyJ1cmwiOiAiaHR0cHM6Ly9kZXZlbG9wZXJzLm9wZW5haS5jb20vbWNwIn0%3D)

    Alternatively, create a `~/.cursor/mcp.json` (macOS/Linux) and add:

```json
{
  "mcpServers": {
    "openaiDeveloperDocs": {
      "url": "https://developers.openai.com/mcp"
    }
  }
}
```

    To have Cursor reliably use the MCP server, add this snippet to your `AGENTS.md`:

```
Always use the OpenAI developer documentation MCP server if you need to work with the OpenAI API, plugins, ChatGPT, Codex,… without me having to explicitly ask.
```

    Restart Cursor and ask Cursor's agent an OpenAI-related question like:

> Look up the request schema for Responses API tools in the OpenAI developer docs and summarize the required fields.

    Claude Code supports remote HTTP MCP servers through the `claude mcp` CLI.

    Add the Docs MCP server from the project where you use Claude Code:

```bash
claude mcp add --transport http openaiDeveloperDocs https://developers.openai.com/mcp
```

    Verify it's configured:

```bash
claude mcp list
```

    To make the server available across all Claude Code projects on your machine, add it with user scope:

```bash
claude mcp add --transport http --scope user openaiDeveloperDocs https://developers.openai.com/mcp
```

    In Claude Code, run `/mcp` to confirm the server is connected. Then ask an OpenAI-related question like:

> Look up the request schema for Responses API tools in the OpenAI developer docs and summarize the required fields.

#### Tips

- If you don't have the snippet in the AGENTS.md file, you need to explicitly tell your agent to consult the Docs MCP server for the answer.
- If you have more than one MCP server, keep server names short and descriptive to aid the agent in selecting the server.

#### OpenAI Docs Skill

If you use skills in your AI tooling, pair this MCP server with the
[OpenAI Docs Skill](https://github.com/openai/skills/blob/main/skills/.curated/openai-docs/SKILL.md).
It tells the agent to use Docs MCP tools first for OpenAI questions, then fall back to official OpenAI domains.

1. Install the skill from the [OpenAI skills repository](https://github.com/openai/skills).
2. Confirm you configured this Docs MCP server at `https://developers.openai.com/mcp`.
3. Enable the skill for your project or session in your agent tooling.
4. Ask OpenAI product/API questions and request citations so answers stay traceable to docs sources.

### Examples

Source: [Examples](https://developers.openai.com/plugins/build/examples.md)

#### Overview

The Pizzaz demo bundles several UI components so you can see the full tool
surface area end to end. The following sections walk through the MCP server and
the component implementations that power those tools.
You can find Pizzaz and other examples in our
[examples repository on GitHub](https://github.com/openai/openai-apps-sdk-examples).

Use these examples as blueprints when you assemble your plugin's MCP server and
optional UI.

### Hooks

Source: [Hooks](https://learn.chatgpt.com/docs/hooks.md)

Hooks are an extensibility framework for Codex. They let you run scripts or MCP
tools during the agentic loop, enabling features such as:

- Send the chat to a custom logging/analytics engine
- Scan your team's prompts to block accidentally pasting API keys
- Summarize chats to create persistent memories automatically
- Run a custom validation check when a chat turn stops, enforcing standards
- Customize prompting when in a certain directory

Runtime behavior to keep in mind:

- Matching hooks from multiple files all run.
- Multiple matching command hooks for the same event are launched concurrently,
  so one hook can't prevent another matching hook from starting.
- Non-managed hooks must be reviewed and trusted before they run.

Hooks run at different points in a conversation:

| When                              | Hooks                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| During a turn                     | `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `UserPromptSubmit`, `SubagentStop`, `Stop` |
| When you interrupt an active turn | `Interrupt` (doesn't run for subagents)                                                                                   |
| When a session or subagent starts | `SessionStart`, `SubagentStart`                                                                                           |
| When the main thread ends         | `SessionEnd` (doesn't run for subagents)                                                                                  |

#### Where Codex looks for hooks

Codex discovers hooks next to active config layers in either of these forms:

- `hooks.json`
- inline `[hooks]` tables inside `config.toml`

Installed plugins can also bundle lifecycle config through their plugin
manifest or a default `hooks/hooks.json` file. See [Build
plugins](https://developers.openai.com/plugins/build/plugins#bundled-mcp-servers-and-lifecycle-hooks) for the
plugin packaging rules.

In practice, the four most useful locations are:

- `~/.codex/hooks.json`
- `~/.codex/config.toml`
- `/.codex/hooks.json`
- `/.codex/config.toml`

If more than one hook source exists, Codex loads all matching hooks.
Higher-precedence config layers don't replace lower-precedence hooks.
If a single layer contains both `hooks.json` and inline `[hooks]`, Codex
merges them and warns at startup. Prefer one representation per layer.

Codex can also discover hooks bundled with enabled plugins. Plugin-bundled
hooks load alongside other hook sources and use the same trust-review flow as
other non-managed hooks.

Project-local hooks load only when the project `.codex/` layer is trusted. In
untrusted projects, Codex still loads user and system hooks from their own
active config layers.

#### Review and trust hooks

Codex lists configured hooks before deciding which ones can run. Before a
non-managed hook can run, Codex requires you to review and trust the exact hook
definition. Codex records trust against the hook's current hash, so new or
changed hooks are marked for review and skipped until trusted.

Use `/hooks` in the CLI to inspect hook sources, review new or changed hooks,
trust hooks, or disable individual non-managed hooks. If hooks need review at
startup, Codex prints a warning that tells you to open `/hooks`.

Managed hooks from system, MDM, cloud, or `requirements.toml` sources are marked
as managed, trusted by policy, and can't be disabled from the user hook browser.

For one-off automation that already vets hook sources outside Codex, pass
`--dangerously-bypass-hook-trust` to run enabled hooks without requiring
persisted hook trust for that invocation.

#### Config shape

Hooks are organized in three levels:

- A hook event such as `PreToolUse`, `PostToolUse`, `PreCompact`,
  `SubagentStart`, or `Stop`
- A matcher group that decides when that event matches
- One or more hook handlers that run when the matcher group matches

```json
{
  "description": "Optional lifecycle hooks for this workspace.",
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.codex/hooks/session_start.py",
            "statusMessage": "Loading session notes",
            "additionalContextLimit": 5000
          }
        ]
      }
    ],
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.codex/hooks/session_end.py",
            "timeout": 3
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "/usr/bin/python3 \"$(git rev-parse --show-toplevel)/.codex/hooks/pre_tool_use_policy.py\"",
            "statusMessage": "Checking Bash command"
          }
        ]
      }
    ],
    "PermissionRequest": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "/usr/bin/python3 \"$(git rev-parse --show-toplevel)/.codex/hooks/permission_request.py\"",
            "statusMessage": "Checking approval request"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "/usr/bin/python3 \"$(git rev-parse --show-toplevel)/.codex/hooks/post_tool_use_review.py\"",
            "statusMessage": "Reviewing Bash output"
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/usr/bin/python3 \"$(git rev-parse --show-toplevel)/.codex/hooks/user_prompt_submit_data_flywheel.py\""
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/usr/bin/python3 \"$(git rev-parse --show-toplevel)/.codex/hooks/stop_continue.py\"",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

Notes:

- `description` is optional top-level metadata for a `hooks.json` file. It
  doesn't change which hooks run.
- `timeout` is in seconds.
- If `timeout` is omitted, Codex uses `600` seconds for most hooks.
  - `SessionEnd` and `Interrupt` use `1` second by default and support up to `3` seconds.
- `statusMessage` is optional.
- `additionalContextLimit` sets how much `additionalContext` a command hook can
  send to the model before Codex saves the full text to disk and sends a shorter
  preview instead. See [Large hook output](#large-hook-output).
- `commandWindows` is an optional Windows-only command override. In TOML, use
  `command_windows` or `commandWindows`.
- Set `async` to `true` to [run a command hook in the
  background](#run-hooks-in-the-background).
- `command` and `mcp_tool` handlers are supported. `prompt` and `agent`
  handlers are parsed but skipped.
- Commands run with the session `cwd` as their working directory.
- For repo-local hooks, prefer resolving from the git root instead of using a
  relative path such as `.codex/hooks/...`. Codex may be started from a
  subdirectory, and a git-root-based path keeps the hook location stable.

Equivalent inline TOML in `config.toml`:

```toml
[[hooks.SessionStart]]
matcher = "^compact$"

[[hooks.SessionStart.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/session_start.py"'
additionalContextLimit = 5000

[[hooks.PreToolUse]]
matcher = "^Bash$"

[[hooks.PreToolUse.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/pre_tool_use_policy.py"'
timeout = 30
statusMessage = "Checking Bash command"

[[hooks.PostToolUse]]
matcher = "^Bash$"

[[hooks.PostToolUse.hooks]]
type = "command"
command = '/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/post_tool_use_review.py"'
timeout = 30
statusMessage = "Reviewing Bash output"
```

#### MCP tool hooks

An MCP tool hook lets a lifecycle event call a tool on an already-connected MCP
server. It sends structured arguments directly to the tool and uses the same
trust review and output contract as a command hook.

#### Configure an MCP tool hook

This hook asks the `scanner` MCP server to scan each patch after Codex writes or
edits files:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "mcp_tool",
            "server": "scanner",
            "tool": "scan_patch",
            "input": { "patch": "${tool_input.command}" },
            "timeout": 30,
            "statusMessage": "Scanning edited files"
          }
        ]
      }
    ]
  }
}
```

| Field           | Meaning                                                          |
| --------------- | ---------------------------------------------------------------- |
| `type`          | Must be `mcp_tool`.                                              |
| `server`        | Required name of an already-connected MCP server.                |
| `tool`          | Required name of a tool exposed by that server.                  |
| `input`         | Optional JSON object of argument templates. Defaults to `\{\}`.    |
| `timeout`       | Optional active execution timeout in seconds. Defaults to `600`. |
| `statusMessage` | Optional message shown while the hook runs.                      |

#### Expand arguments from the hook event

Use `$\{field.nested\}` to read a dotted field from the hook event. A placeholder
that fills an entire value keeps its JSON type. A placeholder inside a larger
string is rendered as text. Codex expands objects and arrays recursively.

For an event containing <code v-pre>\{"tool_input":\{"file_path":"src/main.rs","count":3}}</code>,
this argument template:

```json
{
  "path": "${tool_input.file_path}",
  "count": "${tool_input.count}",
  "message": "Scanning ${tool_input.file_path}"
}
```

becomes:

```json
{
  "path": "src/main.rs",
  "count": 3,
  "message": "Scanning src/main.rs"
}
```

#### Execution and lifecycle

- Hooks use an existing MCP connection. They don't start or reconnect servers.
- A hook can block an operation when the tool returns a blocking decision.
  Errors, missing servers, and unavailable tools don't block the operation.
- MCP tool hooks run synchronously. They don't request tool approval or trigger
  other hooks.
- The shorter hook or server timeout applies. Time spent waiting for an MCP
  elicitation response doesn't count against the timeout.
- `SessionStart` hooks can run before an MCP server is ready. If that happens,
  they don't block the session.
- `SessionEnd` doesn't support MCP tool hooks.

#### Turn hooks off

Hooks are enabled by default. To turn them off in `config.toml`, set:

```toml
[features]
hooks = false
```

Use `hooks` as the canonical feature key. `codex_hooks` still works as a
deprecated alias. Admins can force hooks off the same way in
`requirements.toml` with `[features].hooks = false`.

#### Managed hooks from `requirements.toml`

Enterprise-managed requirements can also define hooks inline under `[hooks]`.
This is useful when admins want to enforce the hook configuration while
delivering the actual scripts through MDM or another device-management system.
To enforce managed hooks even for users who disabled hooks locally, pin
`[features].hooks = true` in `requirements.toml` alongside `[hooks]`. To ignore
user, project, session, and plugin hooks while still allowing administrator
managed hooks, set `allow_managed_hooks_only = true`.

```toml
allow_managed_hooks_only = true

[features]
hooks = true

[hooks]
managed_dir = "/enterprise/hooks"
windows_managed_dir = 'C:\enterprise\hooks'

[[hooks.PreToolUse]]
matcher = "^Bash$"

[[hooks.PreToolUse.hooks]]
type = "command"
command = "python3 /enterprise/hooks/pre_tool_use_policy.py"
command_windows = 'py -3 C:\enterprise\hooks\pre_tool_use_policy.py'
timeout = 30
statusMessage = "Checking managed Bash command"
```

Notes for managed hooks:

- `managed_dir` is used on macOS and Linux.
- `windows_managed_dir` is used on Windows.
- Codex doesn't distribute the scripts in `managed_dir`; your enterprise
  tooling must install and update them separately.
- Managed hook commands should use absolute script paths under the configured
  managed directory.
- `allow_managed_hooks_only = true` skips hooks from user, project, session, and
  plugin sources, but still loads managed hooks from `requirements.toml` and
  other managed config layers.

#### Plugin-bundled hooks

When a plugin is enabled, Codex can load lifecycle hooks from that plugin
alongside user, project, and managed hooks.

By default, Codex looks for `hooks/hooks.json` inside the plugin root. A plugin
manifest can override that default with a `hooks` entry in
`.codex-plugin/plugin.json`. The manifest entry can be a `./`-prefixed path, an
array of `./`-prefixed paths, an inline hooks object, or an array of inline
hooks objects.

```json
{
  "name": "repo-policy",
  "hooks": "./hooks/hooks.json"
}
```

Manifest hook paths are resolved relative to the plugin root and must stay
inside that root. If a manifest defines `hooks`, Codex uses those manifest
entries instead of the default `hooks/hooks.json`.

Plugin hook commands receive these environment variables:

- `PLUGIN_ROOT` is a Codex-specific extension that points to the installed
  plugin root.
- `PLUGIN_DATA` is a Codex-specific extension that points to the plugin's
  writable data directory.
- Codex also sets `CLAUDE_PLUGIN_ROOT` and `CLAUDE_PLUGIN_DATA` for
  compatibility with existing plugin hooks.

Plugin hooks use the same event schema as other hooks. Installing or enabling a
plugin doesn't automatically trust its hooks; Codex skips plugin-bundled hooks
until you review and trust the current hook definition.

#### Matcher patterns

The `matcher` field is a regex string that filters when hooks fire. Use `"*"`,
`""`, or omit `matcher` entirely to match every occurrence of a supported
event.

Only some current Codex events honor `matcher`:

| Event               | What `matcher` filters | Notes                                                        |
| ------------------- | ---------------------- | ------------------------------------------------------------ |
| `PermissionRequest` | tool name              | Support includes `Bash`, `apply_patch`\*, and MCP tool names |
| `PostToolUse`       | tool name              | See [Tool coverage](#tool-coverage)                          |
| `PostCompact`       | compaction trigger     | Values are `manual` or `auto`                                |
| `PreCompact`        | compaction trigger     | Values are `manual` or `auto`                                |
| `PreToolUse`        | tool name              | See [Tool coverage](#tool-coverage)                          |
| `SessionEnd`        | end reason             | Currently only `other`                                       |
| `SessionStart`      | start source           | Values are `startup`, `resume`, `clear`, and `compact`       |
| `SubagentStart`     | subagent type          | Values depend on the subagent that starts                    |
| `SubagentStop`      | subagent type          | Values depend on the subagent that stops                     |
| `UserPromptSubmit`  | not supported          | Any configured `matcher` is ignored for this event           |
| `Stop`              | not supported          | Any configured `matcher` is ignored for this event           |
| `Interrupt`         | not supported          | Any configured `matcher` is ignored for this event           |

\*For `apply_patch`, `matcher` values can also use `Edit` or `Write`.

Examples:

- `Bash`
- `^apply_patch$`
- `Edit|Write`
- `mcp__filesystem__read_file`
- `mcp__filesystem__.*`
- `startup|resume|clear|compact`
- `manual|auto`

#### Tool coverage

`PreToolUse` and `PostToolUse` can observe more than shell and MCP calls. Most
local function tools use the same hook path, so you can match their tool name,
inspect their JSON arguments, and, for `PreToolUse`, block or rewrite the call.

| Tool path                         | `PreToolUse` | `PostToolUse` | Notes                                                                                                                    |
| --------------------------------- | ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Shell commands                    | Yes          | Yes           | Match as `Bash`.                                                                                                         |
| Unified exec (`exec_command`)     | Yes          | Yes           | Match as `Bash`. A later `write_stdin` poll can deliver the original command's `PostToolUse` when that command finishes. |
| `apply_patch`                     | Yes          | Yes           | Match as `apply_patch`, `Edit`, or `Write`.                                                                              |
| MCP tools                         | Yes          | Yes           | Match the MCP tool name, such as `mcp__filesystem__read_file`.                                                           |
| Other local function tools        | Yes          | Yes           | Match the function tool name, such as `update_plan`. `spawn_agent` also matches `Agent`.                                 |
| Hosted tools, such as `WebSearch` | No           | No            | These don't use the local function-tool hook path.                                                                       |

`write_stdin` is transport for an existing unified-exec session. It doesn't run
`PreToolUse` again when it sends input or polls a command that already passed
`PreToolUse`.

Some specialized tool paths can opt out of the default hook path. Treat tool
hooks as a useful guardrail, not a complete enforcement boundary.

#### Common input fields

Every command hook receives one JSON object on `stdin`.

These are the shared fields you will usually use:

| Field             | Type             | Meaning                                                             |
| ----------------- | ---------------- | ------------------------------------------------------------------- |
| `session_id`      | `string`         | Current Codex session id. Subagent hooks use the parent session id. |
| `transcript_path` | `string \| null` | Path to the session transcript file, if any                         |
| `cwd`             | `string`         | Working directory for the session                                   |
| `hook_event_name` | `string`         | Current hook event name                                             |
| `model`           | `string`         | Codex-specific extension. Active model slug                         |

Turn-scoped hooks list `turn_id` as a Codex-specific extension in their
event-specific tables.

`SessionStart`, `PreToolUse`, `PermissionRequest`, `PostToolUse`,
`UserPromptSubmit`, `SubagentStart`, `SubagentStop`, `Stop`, and `Interrupt` also include
`permission_mode`, which describes the current permission mode as `default`,
`acceptEdits`, `plan`, `dontAsk`, or `bypassPermissions`.

`transcript_path` points to a chat transcript for convenience, but the
transcript format isn't a stable interface for hooks and may change over time.

If you need the full wire format, see [Schemas](#schemas).

#### Common output fields

`SessionStart`, `PreCompact`, `PostCompact`, `UserPromptSubmit`,
`SubagentStop`, and `Stop` support these shared JSON fields. `SubagentStart`
accepts the same shape for `systemMessage` and hook-specific context, but
`continue: false` doesn't stop the subagent:

```json
{
  "continue": true,
  "stopReason": "optional",
  "systemMessage": "optional",
  "suppressOutput": false
}
```

| Field            | Effect                                          |
| ---------------- | ----------------------------------------------- |
| `continue`       | If `false`, marks that hook run as stopped      |
| `stopReason`     | Recorded as the reason for stopping             |
| `systemMessage`  | Surfaced as a warning in the UI or event stream |
| `suppressOutput` | Parsed today but not yet implemented            |

Exit `0` with no output is treated as success and Codex continues.

`PreToolUse` and `PermissionRequest` support `systemMessage`, but `continue`,
`stopReason`, and `suppressOutput` aren't currently supported for those events.
If a `PreToolUse` hook returns one of those unsupported fields, Codex marks
that hook run as failed, reports the error, and continues the tool call.

`PostToolUse` supports `systemMessage`, `continue: false`, and `stopReason`.
`suppressOutput` is parsed but not currently supported for that event.

#### Large hook output

By default, Codex limits each model-visible hook-output message to roughly
2,500 tokens. If a hook returns more, Codex saves the full text under
`/hook_outputs//.txt` and gives the model a
head-and-tail preview with the saved-file path. This behavior is called
**spilling**: Codex stores oversized output on disk and replaces it with a
shorter, model-visible preview. If the file can't be written, the model still
receives a truncated preview.

Keep hook and plugin context concise. Context from multiple hooks and plugins
adds up and can degrade model performance. Raising `additionalContextLimit`
increases that risk. Avoid setting the limit to `0` unless the hook enforces a
strict output cap; otherwise, a single hook can consume the entire context
window.

For any command hook that returns `additionalContext`, set
`additionalContextLimit` on the handler to customize the approximate token
threshold:

```json
{
  "type": "command",
  "command": "python3 ~/.codex/hooks/session_start.py",
  "additionalContextLimit": 5000
}
```

Omit `additionalContextLimit` to use the default `2500`-token threshold. Use a
positive integer to select a different threshold, or `0` to pass the handler's
complete additional context directly to the model. Codex evaluates each
matching handler independently. For events that can't produce additional
context, Codex ignores `additionalContextLimit` and reports a configuration
warning.

The setting applies only to `additionalContext`. Tool feedback and continuation
prompts keep the default limit.

Because oversized output can be written to disk, avoid returning secrets or
other sensitive data in hook output.

#### Run hooks in the background

By default, Codex waits for a command hook to finish before continuing the
operation that triggered it. Set `async` to `true` to run a command hook in the
background while Codex continues.

#### Configure a background hook

Add `"async": true` to a command handler in `hooks.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.codex/hooks/post_tool_use.py",
            "async": true,
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

For an inline hook in `config.toml`, set `async = true`:

```toml
[[hooks.PostToolUse]]
matcher = "Bash"

[[hooks.PostToolUse.hooks]]
type = "command"
command = "python3 ~/.codex/hooks/post_tool_use.py"
async = true
timeout = 120
```

Background hooks use the same input, matcher, trust review, timeout, and
[large-output handling](#large-hook-output) as synchronous command hooks. As
with other command hooks, `timeout` is measured in seconds and defaults to
`600`. `Interrupt` hooks use a one-second default and a three-second maximum,
including when they run in the background.

#### How background hooks run

When a background hook finishes, Codex delivers supported informational output
at the next safe point in the conversation:

- If a turn is active, Codex waits for the current model request and tool calls
  to finish, then makes the output available to the next model request in that
  turn.
- If no turn is active, Codex waits until the next user turn. Finishing a
  background hook doesn't start a new turn.

Use the same event-specific JSON output as a synchronous hook. Codex adds
`additionalContext` to the model's context and surfaces `systemMessage` as a
warning.

Background hooks can't block, approve, rewrite, or otherwise control the
operation that triggered them. Use synchronous hooks for tool policies,
permission decisions, prompt rejection, or turn continuation.

#### Limitations

- Codex runs up to eight background hooks concurrently per session. Additional
  hooks wait until a running hook finishes.
- Each matching invocation runs independently, and background hooks can finish
  in a different order than they started.
- When the session ends, Codex cancels unfinished background hooks and discards
  output that hasn't been delivered.
- `SessionEnd` hooks always run synchronously.

#### SessionStart

`matcher` is applied to `source` for this event.

Fields in addition to [Common input fields](#common-input-fields):

| Field    | Type     | Meaning                                                             |
| -------- | -------- | ------------------------------------------------------------------- |
| `source` | `string` | How the session started: `startup`, `resume`, `clear`, or `compact` |

Plain text on `stdout` is added as extra developer context.

JSON on `stdout` supports [Common output fields](#common-output-fields) and this
hook-specific shape:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Load the workspace conventions before editing."
  }
}
```

That `additionalContext` text is added as extra developer context.

After Codex compacts a root session, `SessionStart` hooks that match
`source: "compact"` run before the next model request. This also applies when
automatic compaction happens in the middle of a turn: Codex delivers the hook's
additional context to the immediate continuation instead of waiting for a
later user turn. If the hook returns `continue: false`, Codex ends the turn
without sending another model request.

#### SessionEnd

`SessionEnd` lets you run a command when a session ends, such as saving final
notes or cleaning up files. It runs for the main thread when you archive or
delete a conversation that's still open, when Codex closes normally, or after a
conversation has been idle and isn't open in any connected client for 30
minutes. It won't run for subagents.

Switching away from a conversation or calling `thread/unsubscribe` doesn't end
the session right away, so it won't immediately run `SessionEnd`. Your hook can
still read the session transcript while it runs.

`matcher` filters `reason` for this event. For now, `reason` is always `other`.
You can omit `matcher` or use `other` to run on every `SessionEnd` event.

Fields in addition to [Common input fields](#common-input-fields):

| Field    | Type     | Meaning                        |
| -------- | -------- | ------------------------------ |
| `reason` | `string` | Why the session ended: `other` |

For example, a `SessionEnd` command receives:

```json
{
  "session_id": "thr_123",
  "transcript_path": "/workspace/.codex/rollout.jsonl",
  "cwd": "/workspace",
  "hook_event_name": "SessionEnd",
  "reason": "other"
}
```

`SessionEnd` hooks always run synchronously, even when `async` is `true`. They
are advisory, so their output won't steer Codex or keep the thread open. If a
command times out or exits with an error, Codex reports it as a hook failure.

#### SubagentStart

`matcher` is applied to `agent_type` for this event.

Fields in addition to [Common input fields](#common-input-fields):

| Field             | Type     | Meaning                                        |
| ----------------- | -------- | ---------------------------------------------- |
| `turn_id`         | `string` | Codex-specific extension. Active Codex turn id |
| `agent_id`        | `string` | Identifier for the subagent                    |
| `agent_type`      | `string` | Subagent type or profile                       |
| `permission_mode` | `string` | Current permission mode                        |

Plain text on `stdout` is added as extra developer context for the subagent.

JSON on `stdout` supports `systemMessage` and this hook-specific shape:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SubagentStart",
    "additionalContext": "Review the repository test conventions first."
  }
}
```

That `additionalContext` text is added as extra developer context for the
subagent. `continue: false` is parsed for compatibility, but it doesn't stop the
subagent from starting.

#### PreToolUse

`PreToolUse` can intercept Bash, file edits performed through `apply_patch`,
MCP tool calls, and other local function tools. See [Tool
coverage](#tool-coverage) for the supported paths and exceptions.

`matcher` is applied to `tool_name` and matcher aliases. For file edits through
`apply_patch`, `matcher` values can use `apply_patch`, `Edit`, or `Write`; hook input
still reports `tool_name: "apply_patch"`.

Fields in addition to [Common input fields](#common-input-fields):

| Field         | Type         | Meaning                                                                                                                          |
| ------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `turn_id`     | `string`     | Codex-specific extension. Active Codex turn id                                                                                   |
| `tool_name`   | `string`     | Canonical hook tool name, such as `Bash`, `apply_patch`, or an MCP name like `mcp__fs__read`                                     |
| `tool_use_id` | `string`     | Tool-call id for this invocation                                                                                                 |
| `tool_input`  | `JSON value` | Tool-specific input. `Bash` and `apply_patch` use `tool_input.command`. MCP and other local function tools send their arguments. |

Plain text on `stdout` is ignored.

JSON on `stdout` can use `systemMessage`. To deny a supported tool call, return
this hook-specific shape:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Destructive command blocked by hook."
  }
}
```

Codex also accepts this older block shape:

```json
{
  "decision": "block",
  "reason": "Destructive command blocked by hook."
}
```

You can also use exit code `2` and write the blocking reason to `stderr`.

To add model-visible context without blocking, return
`hookSpecificOutput.additionalContext`:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "additionalContext": "The pending command touches generated files."
  }
}
```

To rewrite a supported tool call without blocking, return
`permissionDecision: "allow"` with `updatedInput`:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "updatedInput": {
      "command": "echo rewritten"
    }
  }
}
```

For Bash commands and `apply_patch`, `updatedInput` must include a string
`command` field. For MCP and other local function tools, `updatedInput` is the
replacement arguments object. Return `updatedInput` only with
`permissionDecision: "allow"`; other `updatedInput` shapes are reported as
errors.

`permissionDecision: "ask"`, legacy `decision: "approve"`, `continue: false`,
`stopReason`, and `suppressOutput` are parsed but not supported yet. Codex marks
the hook run as failed, reports the error, and continues the tool call.

#### PermissionRequest

`PermissionRequest` runs when Codex is about to ask for approval, such as a
shell escalation or managed-network approval. It can allow the request, deny
the request, or decline to decide and let the normal approval prompt continue.
It doesn't run for commands that don't need approval.

`matcher` is applied to `tool_name` and matcher aliases. Current canonical
values include `Bash`, `apply_patch`, and MCP tool names such as
`mcp__server__tool`; `apply_patch` also matches `Edit` and `Write`.

Fields in addition to [Common input fields](#common-input-fields):

| Field                    | Type             | Meaning                                                                                                        |
| ------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------- |
| `turn_id`                | `string`         | Codex-specific extension. Active Codex turn id                                                                 |
| `tool_name`              | `string`         | Canonical hook tool name, such as `Bash`, `apply_patch`, or an MCP name like `mcp__fs__read`                   |
| `tool_input`             | `JSON value`     | Tool-specific input. `Bash` and `apply_patch` use `tool_input.command` while MCP tools send all the arguments. |
| `tool_input.description` | `string \| null` | Human-readable approval reason, when Codex has one                                                             |

Plain text on `stdout` is ignored.

Some tool inputs may include a human-readable description, but don't rely on a
`tool_input.description` field for every tool.

To approve the request, return:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "allow"
    }
  }
}
```

To deny the request, return:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "deny",
      "message": "Blocked by repository policy."
    }
  }
}
```

If multiple matching hooks return decisions, any `deny` wins. Otherwise, an
`allow` lets the request proceed without surfacing the approval prompt. If no
matching hook decides, Codex uses the normal approval flow.

Don't return `updatedInput`, `updatedPermissions`, or `interrupt` for
`PermissionRequest`; those fields are reserved for future behavior and fail
closed today.

#### PostToolUse

`PostToolUse` runs after supported tools produce output, including Bash,
`apply_patch`, MCP tool calls, and other local function tools. For Bash, it
also runs after commands that exit with a non-zero status. It can't undo side
effects from a tool that already ran. See [Tool coverage](#tool-coverage) for
the supported paths and exceptions.

`matcher` is applied to `tool_name` and matcher aliases. For file edits through
`apply_patch`, `matcher` values can use `apply_patch`, `Edit`, or `Write`; hook input
still reports `tool_name: "apply_patch"`.

Fields in addition to [Common input fields](#common-input-fields):

| Field           | Type         | Meaning                                                                                                                          |
| --------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `turn_id`       | `string`     | Codex-specific extension. Active Codex turn id                                                                                   |
| `tool_name`     | `string`     | Canonical hook tool name, such as `Bash`, `apply_patch`, or an MCP name like `mcp__fs__read`                                     |
| `tool_use_id`   | `string`     | Tool-call id for this invocation                                                                                                 |
| `tool_input`    | `JSON value` | Tool-specific input. `Bash` and `apply_patch` use `tool_input.command`. MCP and other local function tools send their arguments. |
| `tool_response` | `JSON value` | Tool-specific output. MCP tools send the MCP call result. Other local function tools normally send their model-facing output.    |

Plain text on `stdout` is ignored.

JSON on `stdout` can use `systemMessage` and this hook-specific shape:

```json
{
  "decision": "block",
  "reason": "The Bash output needs review before continuing.",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "The command updated generated files."
  }
}
```

That `additionalContext` text is added as extra developer context.

For this event, `decision: "block"` doesn't undo the completed Bash command.
Instead, Codex records the feedback, replaces the tool result with that
feedback, and continues the model from the hook-provided message.

You can also use exit code `2` and write the feedback reason to `stderr`.

To stop normal processing of the original tool result after the command has
already run, return `continue: false`. Codex will replace the tool result with
your feedback or stop text and continue from there.

`updatedMCPToolOutput` and `suppressOutput` are parsed but not supported yet.
Codex marks the hook run as failed, reports the error, and continues normal
processing of the tool result.

#### Tool calls from code mode

When a model uses code mode to call a tool from JavaScript, hook decisions apply
to that nested call. `PreToolUse` can stop the tool before it runs or rewrite
its input. A blocking `PostToolUse` can't undo the tool's side effects, but it
can keep the original result from reaching the running script.

| Hook result                                                      | What code mode sees                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `PreToolUse` blocks                                              | The tool promise rejects before the tool runs.                                                         |
| `PreToolUse` returns `updatedInput`                              | The tool runs with the rewritten input and the promise resolves with that result.                      |
| `PostToolUse` returns `decision: "block"` or exits with code `2` | The tool runs, then the promise rejects with the hook reason.                                          |
| `PostToolUse` returns `continue: false`                          | Codex uses the hook feedback for the model-visible result, but doesn't reject the nested tool promise. |

#### PreCompact

`PreCompact` runs before Codex compacts the chat. `matcher` is applied
to `trigger`, whose values are `manual` and `auto`.

Fields in addition to [Common input fields](#common-input-fields):

| Field     | Type     | Meaning                                        |
| --------- | -------- | ---------------------------------------------- |
| `turn_id` | `string` | Codex-specific extension. Active Codex turn id |
| `trigger` | `string` | What triggered compaction: `manual` or `auto`  |

Plain text on `stdout` is ignored.

JSON on `stdout` supports [Common output fields](#common-output-fields). If a
matching `PreCompact` hook returns `continue: false`, Codex stops before
compacting.

#### PostCompact

`PostCompact` runs after Codex compacts the chat. `matcher` is applied
to `trigger`, whose values are `manual` and `auto`.

Fields in addition to [Common input fields](#common-input-fields):

| Field     | Type     | Meaning                                        |
| --------- | -------- | ---------------------------------------------- |
| `turn_id` | `string` | Codex-specific extension. Active Codex turn id |
| `trigger` | `string` | What triggered compaction: `manual` or `auto`  |

Plain text on `stdout` is ignored.

JSON on `stdout` supports [Common output fields](#common-output-fields). If a
matching `PostCompact` hook returns `continue: false`, Codex stops after
compacting.

#### UserPromptSubmit

`matcher` isn't currently used for this event.

Fields in addition to [Common input fields](#common-input-fields):

| Field     | Type     | Meaning                                        |
| --------- | -------- | ---------------------------------------------- |
| `turn_id` | `string` | Codex-specific extension. Active Codex turn id |
| `prompt`  | `string` | User prompt that's about to be sent            |

Plain text on `stdout` is added as extra developer context.

JSON on `stdout` supports [Common output fields](#common-output-fields) and
this hook-specific shape:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "Ask for a clearer reproduction before editing files."
  }
}
```

That `additionalContext` text is added as extra developer context.

To block the prompt, return:

```json
{
  "decision": "block",
  "reason": "Ask for confirmation before doing that."
}
```

You can also use exit code `2` and write the blocking reason to `stderr`.

#### SubagentStop

`matcher` is applied to `agent_type` for this event.

Fields in addition to [Common input fields](#common-input-fields):

| Field                    | Type             | Meaning                                         |
| ------------------------ | ---------------- | ----------------------------------------------- |
| `turn_id`                | `string`         | Codex-specific extension. Active Codex turn id  |
| `agent_id`               | `string`         | Identifier for the subagent                     |
| `agent_type`             | `string`         | Subagent type or profile                        |
| `agent_transcript_path`  | `string \| null` | Path to the subagent transcript file, if any    |
| `stop_hook_active`       | `boolean`        | Whether this subagent was already continued     |
| `last_assistant_message` | `string \| null` | Latest subagent assistant message, if available |

`SubagentStop` expects JSON on `stdout` when it exits `0`. Plain text output is
invalid for this event.

JSON on `stdout` supports [Common output fields](#common-output-fields). To ask
Codex to continue the subagent flow, return:

```json
{
  "decision": "block",
  "reason": "Run one more focused pass inside the subagent."
}
```

You can also use exit code `2` and write the continuation reason to `stderr`.

If any matching `SubagentStop` hook returns `continue: false`, that takes
precedence over continuation decisions from other matching `SubagentStop`
hooks.

#### Stop

`matcher` isn't currently used for this event.

Fields in addition to [Common input fields](#common-input-fields):

| Field                    | Type             | Meaning                                           |
| ------------------------ | ---------------- | ------------------------------------------------- |
| `turn_id`                | `string`         | Codex-specific extension. Active Codex turn id    |
| `stop_hook_active`       | `boolean`        | Whether this turn was already continued by `Stop` |
| `last_assistant_message` | `string \| null` | Latest assistant message text, if available       |

`Stop` expects JSON on `stdout` when it exits `0`. Plain text output is invalid
for this event.

JSON on `stdout` supports [Common output fields](#common-output-fields). To keep
Codex going, return:

```json
{
  "decision": "block",
  "reason": "Run one more pass over the failing tests."
}
```

You can also use exit code `2` and write the continuation reason to `stderr`.

For this event, `decision: "block"` doesn't reject the turn. Instead, it tells
Codex to continue and automatically creates a new continuation prompt that acts
as a new user prompt, using your `reason` as that prompt text.

If any matching `Stop` hook returns `continue: false`, that takes precedence
over continuation decisions from other matching `Stop` hooks.

#### Interrupt

`Interrupt` runs when you interrupt an active turn on the main thread. Use it
to record the interruption or clean up work started by a hook. It doesn't run
for idle threads or subagents, and any configured `matcher` is ignored.

In addition to [Common input fields](#common-input-fields), the event includes
`turn_id`, the interrupted turn's id, and `permission_mode`.

Command hooks default to a one-second timeout. Configured timeouts are
limited to one through three seconds. Hook output can't prevent the
interruption or restart the turn. Exit `0` with no output, or return JSON with
an optional `systemMessage` to surface a warning. Plain text output is invalid
for this event.

```json
{ "systemMessage": "Saved the interrupted turn to the local audit log." }
```

#### Schemas

The linked `main` branch schemas may include hook fields that are not in the
current release. Use this page as the release behavior reference.

If you need the exact current wire format, see the generated schemas in the
[Codex GitHub repository](https://github.com/openai/codex/tree/main/codex-rs/hooks/schema/generated).

### MCP server

Source: [MCP server](https://developers.openai.com/plugins/concepts/mcp-server.md)

The [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) is an open
specification for connecting AI clients to external tools and data. A plugin
can include an MCP server when it needs to read live information, take actions,
or integrate with another service.

The MCP server is optional. A plugin that only provides instructions and
resources can consist of [skills](https://developers.openai.com/plugins/concepts/skills) alone.

#### What an MCP server provides

An MCP server can expose:

- **Tools:** Functions the model can call with structured inputs.
- **Resources:** Data or content the client can read.
- **Prompts:** Reusable prompt templates.
- **Instructions:** Server-wide guidance for using its capabilities.

Plugins primarily use tools. Each tool has a name, description, input schema,
and optional output schema. These fields help the model decide when to call the
tool and how to use its result.

#### How tool calls work

When a user asks for something that matches a tool:

1. The client discovers the tools exposed by the MCP server.
2. The model selects a tool and supplies arguments that match its input schema.
3. The server validates the request, performs the operation, and returns a
   result.
4. The model uses the result to continue the conversation.

Tool results should work without custom UI. Return concise text or structured
content that gives the model enough information to answer the user. An MCP
server can also return an optional UI resource for clients that support
[MCP Apps](https://developers.openai.com/plugins/build/chatgpt-ui#start-with-mcp-apps).

#### Transport and authorization

Deploy production MCP servers at stable HTTPS endpoints using the streamable
HTTP transport. If tools access private data or perform actions for a user,
protect the server with the authorization flow defined by the MCP
specification.

For protocol details, see the
[MCP specification](https://modelcontextprotocol.io/specification). The
[Python](https://github.com/modelcontextprotocol/python-sdk) and
[TypeScript](https://github.com/modelcontextprotocol/typescript-sdk) software
development kits provide server implementations and helpers.

#### Next step

After defining the tools your plugin needs,
[build the MCP server](https://developers.openai.com/plugins/build/mcp-server).

### MCP server and UI quickstart

Source: [MCP server and UI quickstart](https://developers.openai.com/plugins/build/app-quickstart.md)

#### Introduction

Plugins use the [Model Context Protocol
(MCP)](https://developers.openai.com/plugins/concepts/mcp-server) to expose server-backed capabilities to
ChatGPT and Codex. This tutorial uses:

1. An MCP server that defines tools and exposes them to ChatGPT and Codex.
2. An optional web component, rendered in an iframe inside ChatGPT.

ChatGPT implements the open MCP Apps UI standard so you can build your UI once
and run it across MCP Apps-compatible hosts.

In this quickstart, we'll build a basic to-do workflow with UI contained in a
single HTML file that keeps the markup, CSS, and JavaScript together.

To see more advanced examples using React, see the [examples repository on GitHub](https://github.com/openai/openai-apps-sdk-examples).

#### Build a web component

This step is optional. If you only need tools and no ChatGPT UI, skip to
[Build an MCP server](#build-an-mcp-server) and do not register a UI resource.

Start by creating a file called `public/todo-widget.html` in a new directory.
ChatGPT will render this UI when the associated MCP tool returns it.
This file will contain the web component that will be rendered in the ChatGPT interface.

Add the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Todo list</title>
    
  </head>
  <body>
    <main>
      <h2>Todo list</h2>
      <form id="add-form" autocomplete="off">
        <input id="todo-input" name="title" placeholder="Add a task" />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list"></ul>
    </main>

    
  </body>
</html>
```

#### Use MCP Apps in your web component

For new UI, use the MCP Apps host bridge: JSON-RPC over `postMessage`
with `ui/*` notifications and methods such as `tools/call`.

After the shared MCP Apps flow works, add optional ChatGPT extensions through
`window.openai` only when you need capabilities the standard does not cover.
For details, see [Add UI to your MCP
server](https://developers.openai.com/plugins/build/chatgpt-ui#layer-on-chatgpt-extensions).

#### Build an MCP server

Install the official Python or Node MCP SDK to create a server and expose a `/mcp` endpoint.

In this quickstart, we'll use the [Node SDK](https://github.com/modelcontextprotocol/typescript-sdk).

If you're using Python, refer to our [examples repository on GitHub](https://github.com/openai/openai-apps-sdk-examples) to see an example MCP server with the Python SDK.

Install the Node SDK, MCP Apps helpers, and the `zod` package with:

```bash
npm install @modelcontextprotocol/sdk @modelcontextprotocol/ext-apps zod
```

#### MCP server with UI resources

Register a resource for your component bundle and the tools the model can call (for example, `add_todo` and `complete_todo`) so ChatGPT can drive the UI.

Create a file named `server.js` and paste the following example that uses the Node SDK:

```js
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const todoHtml = readFileSync("public/todo-widget.html", "utf8");

const addTodoInputSchema = {
  title: z.string().min(1),
};

const completeTodoInputSchema = {
  id: z.string().min(1),
};

const todoOutputSchema = {
  tasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      completed: z.boolean(),
    })
  ),
};

let todos = [];
let nextId = 1;

const replyWithTodos = (message) => ({
  content: message ? [{ type: "text", text: message }] : [],
  structuredContent: { tasks: todos },
});

function createTodoServer() {
  const server = new McpServer({
    name: "todo-plugin-server",
    version: "0.1.0",
  });

  registerAppResource(
    server,
    "todo-widget",
    "ui://widget/todo.html",
    {},
    async () => ({
      contents: [
        {
          uri: "ui://widget/todo.html",
          mimeType: RESOURCE_MIME_TYPE,
          text: todoHtml,
        },
      ],
    })
  );

  registerAppTool(
    server,
    "add_todo",
    {
      title: "Add todo",
      description: "Creates a todo item with the given title.",
      inputSchema: addTodoInputSchema,
      outputSchema: todoOutputSchema,
      _meta: {
        ui: { resourceUri: "ui://widget/todo.html" },
      },
    },
    async (args) => {
      const title = args?.title?.trim?.() ?? "";
      if (!title) return replyWithTodos("Missing title.");
      const todo = { id: `todo-${nextId++}`, title, completed: false };
      todos = [...todos, todo];
      return replyWithTodos(`Added "${todo.title}".`);
    }
  );

  registerAppTool(
    server,
    "complete_todo",
    {
      title: "Complete todo",
      description: "Marks a todo as done by id.",
      inputSchema: completeTodoInputSchema,
      outputSchema: todoOutputSchema,
      _meta: {
        ui: { resourceUri: "ui://widget/todo.html" },
      },
    },
    async (args) => {
      const id = args?.id;
      if (!id) return replyWithTodos("Missing todo id.");
      const todo = todos.find((task) => task.id === id);
      if (!todo) {
        return replyWithTodos(`Todo ${id} was not found.`);
      }

      todos = todos.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      );

      return replyWithTodos(`Completed "${todo.title}".`);
    }
  );

  return server;
}

const port = Number(process.env.PORT ?? 8787);
const MCP_PATH = "/mcp";

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS" && url.pathname === MCP_PATH) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain" }).end("Todo MCP server");
    return;
  }

  const MCP_METHODS = new Set(["POST", "GET", "DELETE"]);
  if (url.pathname === MCP_PATH && req.method && MCP_METHODS.has(req.method)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");

    const server = createTodoServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless mode
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.writeHead(500).end("Internal server error");
      }
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.listen(port, () => {
  console.log(
    `Todo MCP server listening on http://localhost:${port}${MCP_PATH}`
  );
});
```

This snippet also responds to `GET /` for health checks, handles CORS preflight for `/mcp`, and returns `404 Not Found` for OAuth discovery routes you are not using yet. That keeps ChatGPT from surfacing 502 errors while you iterate without authentication.

#### Run locally

If you're using a web framework like React, build your component into static assets so the HTML template can inline them.
Usually, you can run a build command such as `npm run build` to produce a `dist` directory with your compiled assets.

In this quickstart, since we're using vanilla HTML, no build step is required.

Start the MCP server on `http://localhost:/mcp` from the directory that contains `server.js` (or `server.ts`).

Make sure you have `"type": "module"` in your `package.json` file:

```json
{
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.20.2",
    "@modelcontextprotocol/ext-apps": "^1.0.1",
    "zod": "^3.25.76"
  }
}
```

Then run the server with the following command:

```bash
node server.js
```

The server should print `Todo MCP server listening on http://localhost:8787/mcp` once it is ready.

#### Test with MCP Inspector

You can use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) to test your server locally.

```bash
npx @modelcontextprotocol/inspector@latest
```

This opens the MCP Inspector interface. Select **Streamable HTTP**, enter
`http://localhost:8787/mcp`, and connect to test your server and inspect its
tool responses.

#### Expose your server to the public internet

For ChatGPT to access your server during development, you need to expose it to the public internet. You can use a tool such as [ngrok](https://ngrok.com/) to open a tunnel to your local server.

```bash
ngrok http <port>
```

This will give you a public URL like `https://.ngrok.app` that you can use to access your server from ChatGPT.

When you connect your MCP server in developer mode, provide the public URL with
the `/mcp` path (for example, `https://.ngrok.app/mcp`).

#### Connect your MCP server in ChatGPT

Once your MCP server and web component work locally, connect the server in
ChatGPT:

1. In [ChatGPT](https://chatgpt.com), open **Settings → Security and login** and turn on **Developer mode**.
2. Go to [ChatGPT Plugins](https://chatgpt.com/plugins) and select the plus button.
3. Paste the HTTPS + `/mcp` URL from your tunnel or deployment (for example, `https://.ngrok.app/mcp`), name the connection, provide a short description, and click **Create**.

4. Open a new chat, select the plugin from the **More** menu (accessible after clicking the **+** button), and prompt the model (for example, “Add a new task to read my book”). ChatGPT will stream tool payloads so you can confirm inputs and outputs.

#### Next steps

From there, you can iterate on the UI/UX, prompts, tool metadata, and the overall experience.

Refresh the plugin connection after each change to the MCP server (tools,
metadata, and related configuration). You can do this from the detail page at
chatgpt.com/plugins.

When you're preparing for public distribution, review
[Submit plugins](https://developers.openai.com/plugins/deploy/submission), the
[Plugin guidelines](https://developers.openai.com/plugins/app-guidelines), and
[Brainstorm plugin use cases](https://developers.openai.com/plugins/plan/use-case). If you're building a UI, you
can also review the [UI guidelines](https://developers.openai.com/plugins/concepts/ui-guidelines).

Once you understand the basics, you can
[build richer UI](https://developers.openai.com/plugins/build/chatgpt-ui), [authenticate
users](https://developers.openai.com/plugins/build/auth) when needed, and
[manage state](https://developers.openai.com/plugins/build/chatgpt-ui#manage-state).

### Memories

Source: [Memories](https://learn.chatgpt.com/docs/customization/memories.md)

Memories let ChatGPT and Codex carry useful context from earlier work into
future work.
ChatGPT web uses ChatGPT memory, while local Codex clients use a separate local
memory store and controls.

Keep required team guidance in `AGENTS.md` or checked-in documentation. Treat
memories as a helpful recall layer, not as the only source for rules that must
always apply.

In the ChatGPT desktop app, use `/memories` to choose whether a chat can use
local memories or contribute to future memories. Manage the feature from
**Settings > Personalization** when you need to turn it on or off.

Manage ChatGPT memory from **Settings > Personalization**. ChatGPT Work uses
the memory settings available to your account and workspace; it doesn't use a
local Codex memory store or local memory controls.

In Codex CLI, use `/memories` in an interactive session to control whether the
current chat can use existing local memories or become an input for future
memories. See [Configure local memories](#configure-local-memories) if the
command isn't available.

The IDE extension uses the connected Codex host's local memory store. When
memories are enabled for that host, use the same chat-level controls as Codex
CLI.

[Computer History](https://learn.chatgpt.com/docs/customization/computer-history) is a macOS desktop
feature that turns activity across allowed apps and websites into memories and
a timeline that ChatGPT and Codex can reference.

#### How local Codex memories work

After you enable memories, Codex can turn useful context from eligible prior
chats into local memory files. Codex skips active or short-lived sessions,
redacts secrets from generated memory fields, and updates memories in the
background instead of immediately at the end of every chat.

Memories may not update right away when a chat ends. Codex waits until a
chat has been idle long enough to avoid summarizing work that's still in
progress.

Memory generation can also skip a background pass when your Codex rate-limit
remaining percentage is below the configured threshold, so Codex doesn't spend
quota when you're near a limit.

#### Local memory storage

Codex stores memories under your Codex home directory. By default, that's
`~/.codex`. See [Config and state locations](https://learn.chatgpt.com/docs/config-file/config-advanced#config-and-state-locations)
for how Codex uses `CODEX_HOME`.

The main memory files live under `~/.codex/memories/` and include summaries,
durable entries, recent inputs, and supporting evidence from prior chats.

Treat these files as generated state. You can inspect them when troubleshooting
or before sharing your Codex home directory, but don't rely on editing them by
hand as your primary control surface.

#### Control local memories per chat

In the ChatGPT desktop app and Codex TUI, use `/memories` to control memory behavior for
the current chat. Chat-level choices let you decide whether the current
chat can use existing memories and whether Codex can use the chat to
generate future memories.

Chat-level choices don't change your global memory settings.

#### Review local memories

Don't store secrets in memories. Codex redacts secrets from generated memory
fields, but you should still review memory files before sharing your Codex home
directory or generated memory artifacts.

#### Configure local memories

Local Codex memories are off by default. In the ChatGPT desktop app, open
**Settings > Personalization** and turn on **Enable memories**.

For config-based setup, add the feature flag to `config.toml`:

```toml
[features]
memories = true
```

For config file locations and the full list of memory-related settings, see
[Config basics](https://learn.chatgpt.com/docs/config-file/config-basic) and the [configuration
reference](https://learn.chatgpt.com/docs/config-file/config-reference).

Common memory-specific settings include:

- `memories.generate_memories`: controls whether newly created chats can be
  stored as memory-generation inputs.
- `memories.use_memories`: controls whether Codex injects existing memories into
  future sessions.
- `memories.disable_on_external_context`: when `true`, keeps chats that used
  external context such as MCP tool calls, web search, or tool search out of
  memory generation. The older `memories.no_memories_if_mcp_or_web_search` key
  is still accepted as an alias.
- `memories.min_rate_limit_remaining_percent`: controls the minimum remaining
  Codex rate-limit percentage required before memory generation starts.
- `memories.extract_model`: overrides the model used for per-chat memory
  extraction.
- `memories.consolidation_model`: overrides the model used for global memory
  consolidation.

### Model Context Protocol

Source: [Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp.md)

Model Context Protocol (MCP) connects models to tools and context. Use it to
give ChatGPT or Codex access to third-party documentation, or to let it
interact with developer tools like your browser or Figma.

ChatGPT web can use remote MCP-backed tools supplied by plugins. Local Codex
clients can also connect directly to MCP servers and share their configuration.

The ChatGPT desktop app, Codex CLI, and IDE extension support MCP servers and
share MCP configuration for the same Codex host.

The supported server features below apply to MCP servers configured on a Codex
host. Hosted plugin tools can have different capabilities.

#### Supported MCP features

- **STDIO servers**: Servers that run as a local process (started by a command).
  - Environment variables
- **Streamable HTTP servers**: Servers that you access at an address.
  - Bearer token authentication
  - OAuth authentication, including Client ID Metadata Documents (CIMD) and
    Dynamic Client Registration (DCR)
  - ChatGPT session authentication for trusted first-party servers
- **Server instructions**: Codex reads the MCP `instructions` field returned during initialization and uses it as server-wide guidance alongside the server's tools.

If you build or maintain an MCP server for Codex, use `instructions` for cross-tool workflows, constraints, and rate limits that apply across the server. Keep the first 512 characters self-contained so the most important guidance is available when Codex is deciding how to use the server.

#### Connect Codex to an MCP server

Codex stores MCP configuration in `config.toml` alongside other Codex configuration settings. By default this is `~/.codex/config.toml`, but you can also scope MCP servers to a project with `.codex/config.toml` (trusted projects only).

The ChatGPT desktop app, Codex CLI, and IDE extension share this configuration.
Once you configure your MCP servers, you can switch among those clients without
redoing setup.

#### Configure in the ChatGPT desktop app

1. Open **Settings**, then select **MCP servers**.
2. Select **Add server**.
3. Enter a name, choose **STDIO** or **Streamable HTTP**, and provide the
   server's command or URL.
4. Save the server, then select **Restart**.

The server list shows which servers are enabled and which require OAuth. Select
**Authenticate** when an OAuth server requires sign-in. In the composer, type `/mcp`
to view connected servers.

#### Use MCP-backed tools in ChatGPT web

In a hosted ChatGPT Work chat, install a [plugin](https://learn.chatgpt.com/docs/plugins) to use its
bundled connectors and remote MCP tools. After installation, Chat and Work can
use those tools. Workspace administrators can control which plugins and tools
are available.

ChatGPT web doesn't read local Codex configuration files or expose the local
Codex command menu. Open the **Plugins** tab to browse and manage available
tools.

#### Configure with the CLI

#### Add an MCP server

```bash
