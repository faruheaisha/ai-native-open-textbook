---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/remote-control.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/remote-control.md"
sourceSha256: "24ef9e60eeae3360065480ea2b2ba103f3bef9e6e470ada18c41fcd2be67bbbe"
pageSha256: "f574d480f5a67dd27c0b66d105608917b6327de3ef2684ad67dd2e428218050b"
contentMode: "local-full"
zh: ""
---

## Trusted Devices

  Trusted Devices is currently in beta. Features and functionality may evolve as the experience is refined.

  Trusted Devices is available on Team and Enterprise plans. It is off by default until an Owner enables it.

Trusted Devices is an organization-wide setting that requires members to verify their device before they can view or steer Remote Control sessions from claude.ai, the Claude mobile apps, or Claude Desktop. It ties Remote Control access to a known device and a recent authentication, not just a signed-in account.

When the setting is on, interacting with a Remote Control session requires both of the following:

* **An enrolled device**: each browser, phone, or desktop app a member uses for Remote Control enrolls its own credential. Enrollment is only offered shortly after a full sign-in, so a device joins the trusted list as part of a real authentication rather than silently in the background.
* **A recent sign-in**: the member's sign-in must be no more than 18 hours old. Instead of signing in again each day, members confirm presence with Face ID, Touch ID, Windows Hello, or a passkey. This biometric step-up refreshes the session immediately.

Biometric checks run on the device through the operating system or browser, the same mechanism as passkey sign-in. Anthropic never receives or stores fingerprints, face data, or any other biometric information. Only the device's public key and basic metadata such as display name, platform, and enrollment time are stored.

The setting applies only to Remote Control. Regular Claude chat, Claude Code in the terminal, and API usage are unaffected.

### Enable Trusted Devices for your organization

An Owner enables the setting from the Claude Code admin console.

    Go to [claude.ai/admin-settings/claude-code](https://claude.ai/admin-settings/claude-code). The **Require trusted devices** toggle appears under the Remote Control setting.

    The setting applies to every member of the organization and to Remote Control sessions started after you enable it. Sessions that were already running before the toggle was turned on are not retroactively protected and continue without the device requirement until they end. Per-team or per-project scoping is not available.

    The first time a member views or steers a new Remote Control session from a browser, phone, or desktop app after the setting is enabled, they are prompted to enroll that device. Letting them know ahead of time avoids confusion.

### What members see

Enrollment is a one-time step per device. After that, the only visible change is an occasional biometric prompt.

* **First use on each device**: the member is asked to enroll. If their sign-in is not recent, they sign in first through your normal flow, including SSO if configured, then confirm enrollment.
* **Day to day**: members with an enrolled device and a recent sign-in see no prompts. When the sign-in ages past 18 hours, the next Remote Control interaction shows a single Face ID, Touch ID, Windows Hello, or passkey prompt.
* **Unenrolled devices**: Remote Control sessions cannot be viewed or steered until the device is enrolled. Regular Claude chat on that device is unaffected.
* **No platform authenticator**: members on a machine without Face ID, Touch ID, or Windows Hello can use a hardware security key, or sign in again instead of stepping up.
* **In the terminal**: the machine running Claude Code receives its own credential automatically when the developer signs in to the CLI. There is no separate enrollment step in the terminal.

### Manage enrolled devices

Members can review and revoke their own devices from account settings.

Open [claude.ai/settings/account](https://claude.ai/settings/account#trusted-devices) and find the **Trusted devices** section to see every enrolled device with its name, platform, and enrollment date. Removing a device revokes its credential immediately, and the device can re-enroll later after a fresh sign-in. Credentials also expire on their own if not renewed, so an unused device drops off the trusted list automatically.

For a lost or stolen device, the member removes it from this page. If the member cannot sign in, an admin can use **Sign out everywhere** in the admin console to revoke every session and enrolled device for that member, after which the member re-enrolls the devices they still hold.
