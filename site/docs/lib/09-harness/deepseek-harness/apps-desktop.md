---
title: "DeepSeek Harness Desktop"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/apps/desktop/README.md"
sourceRel: "apps/desktop/README.md"
rawUrl: "/raw/09-harness/deepseek-harness/apps/desktop/README.md"
sourceSha256: "aeaa9c647df70128f3c4e6f2437af86c811f5fbe7e40133e5e2c21aa5c17d51f"
pageSha256: "aeaa9c647df70128f3c4e6f2437af86c811f5fbe7e40133e5e2c21aa5c17d51f"
contentMode: "local-full"
zh: ""
---

# DeepSeek Harness Desktop

English | [中文](/lib/09-harness/deepseek-harness/apps-desktop-README.zh)

The desktop application is an Electron shell around the dsh Web UI. It opens no listening port: a bundled upstream Node.js child boots the installed dsh project, versioned framed byte pipes carry Fetch requests and streaming responses without an outer Base64 envelope, Node IPC carries lifecycle control, and `dsh-app://` serves the matching client assets.

## Key technical decisions

| Decision | Why | Direct consequence |
|---|---|---|
| Release identity | The shell API, Web client, backend, and plugin graph are qualified as one combination; independent versions would create untested combinations and ambiguous update availability. | Electron and `@deepseek-ai/dsh` always have the same exact version. A dsh upgrade is a Desktop release, even when the shell code is unchanged. |
| Runtime | Electron's Node.js carries Electron patches, fuses, ABI, and lifecycle constraints, while system runtimes and package-manager state are uncontrolled. | dsh runs under the bundled upstream Node.js and every package operation uses the bundled pnpm. Electron's Node.js, system Node.js, system pnpm, and user package-manager configuration are outside the execution path. |
| Package sources | Core installation at startup adds work even when offline. | `extraResources/dsh` carries a complete production dependency tree; the profile installs only external plugins. |
| Shared modules | Host APIs can depend on module identity. | Desktop links every bundled first-party package into the profile using directory symlinks, or Windows junctions; ordinary plugin dependencies remain local. |
| State ownership | Sharing executable dependency graphs would let CLI and Desktop change each other's dsh, Cordis, plugin, or native-module versions, while two desktop processes could race on the same profile. | Electron acquires its process-lifetime single-instance lock before any profile access and exclusively owns `$DSH_HOME/profiles/desktop` plus its package-manager state. CLI and Desktop share supported product data under `$DSH_HOME`, but never executable packages, plugin activation, lockfiles, or `node_modules`. |
| Transport | A listening Web service adds port ownership, authentication, CORS, and exposure concerns; Electron and upstream Node.js also need an explicit cross-process protocol. | The application opens no Web port. `dsh-app://` carries Web assets and Fetch traffic; framed byte pipes carry bounded request and response chunks with backpressure, while Node IPC carries only child lifecycle control. |
| Plugin changes | Package installation and Host startup can fail. | Desktop stops the Host and modifies the current profile directly. Failures retain partial changes for explicit repair; there is no automatic profile rollback. |
| Updates | Independent shell and dsh updates would recreate version splits, while unchanged shell blocks should not require a complete transfer. | The Electron shell, matching dsh runtime, Node.js, and pnpm form one signed update unit. Platform update artifacts may reuse unchanged blocks, but runtime version selection never splits from the Desktop release. |

The [Electron packaging and update Agent Note](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/implemented/architecture/2026-08-25-electron-desktop-packaging-and-updates.md) owns the rationale, alternatives, security constraints, and release qualification requirements behind these decisions.

## Installation ownership

Electron owns `$DSH_HOME/profiles/desktop`. Its `dependencies` contains only installed external plugins at exact versions; `dsh.profile.bundles` contains the built-in bundles followed by enabled plugins. The signed application supplies dsh, the private Desktop Host, and their production packages from `resources/dsh`. Shared package links resolve to those actual directories. Both host and plugins execute in the same bundled upstream Node process, with normal realpath resolution; Desktop does not enable `--preserve-symlinks`. The CLI cannot boot or mutate this profile.

The local startup page exposes startup status and available recovery actions; the loaded dsh renderer receives only the desktop protocol marker. The separate plugin window receives structured list, install, remove, update, and update-check operations; neither renderer receives filesystem access, raw Electron IPC, a shell, or arbitrary pnpm arguments.

Electron chooses typed English or Chinese shell copy from its application locale and falls back to English. Menus, native dialogs, the startup page, and the plugin-management renderer use the same locale payload; the repository Client UI i18n gate checks these desktop sources.

### Runtime and plugin activation

The signed `resources/dsh/desktop-runtime.json` binds the shell version, bundled Node version, platform, architecture, shared package versions, and final file inventory. Startup reads the metadata and checks shared package records. Release schema, shell version, target compatibility, and file integrity are verified during packaging. Core packages are never copied into profile storage or installed by pnpm at first launch.

1. The main window displays a local loading page before profile preparation or backend startup. A fresh profile creates its manifest and shared package links while preserving unrelated files, then starts the actual backend once. Unchanged startups reuse the profile without scanning installed plugin manifests.
2. A compatible application upgrade refreshes shared links in the current profile and checks enabled plugins’ peer requirements. Plugin files, configuration, versions, and lockfile remain in place; pnpm does not run.
3. A changed bundled Node version, platform, or architecture reinstalls the locked plugin graph with scripts disabled, validates and links host packages, then runs approved pending builds and validates again.
4. Plugin add, update, and remove operations use bundled pnpm and Desktop-owned package-manager state. Reserved host packages must be peers; nested copies and aliases of shared packages fail validation. Ordinary plugin dependencies must resolve inside the profile.
5. Plugin changes stop the backend before modifying the current profile. Successful preparation starts the Host. Package or Host startup failures retain modified files and report the error. Unfinished package operations retain a marker so the next launch retries the locked installation and pending builds. Desktop creates no staging directories, activation journals, or rollback copies.

The loading page does not depend on the Host. Errors offer restart and reinstallation guidance. Disabling plugins and resetting Desktop are offered only when packaged application resources support profile recovery; development and early initialization failures expose restart alone. The plugin manager remains available through the application menu. Runtime identity is checked before any backend starts; plugin changes have no automatic rollback.

Reset deletes every entry in `$DSH_HOME/profiles/desktop` except the held transaction lock, then initializes the built-in profile. It removes Desktop configuration and installed third-party packages without a backup. Shared tasks, settings, and the Harness-home `.env` are untouched. Shell resource and preload failures use a self-contained document with the available recovery actions and diagnostics; its controls do not require preload.

Package transactions hold `$DSH_HOME/profiles/desktop/lock` exclusively through pnpm process exit. Reset preserves the directory and its lock until initialization and Host startup finish. Shared links use directory symlinks on macOS/Linux and junctions on Windows; cleanup removes links without deleting their targets. Canonical filesystem paths identify shared packages, so Windows path casing alone does not trigger profile activation. Native builds follow the profile’s reviewed `allowBuilds` list; installing a new build-requiring package without approval in that list fails the transaction.

## Develop

`dev:desktop` builds the current Host, client bundles, Web frontend, and Electron shell, projects the built CLI and private Desktop Host packages with their workspace dependencies into a disposable desktop npm project, and launches Electron without downloading the packaged Node.js runtime or resolving dsh from npm:

```sh
pnpm run dev:desktop
```

Development Harness state defaults to `apps/desktop/.desktop-build/development/home`, the disposable npm project lives at `apps/desktop/.desktop-build/development/project`, and Electron browser data lives at `apps/desktop/.desktop-build/development/electron-user-data`. Sessions, settings, credentials, package links, and browser data therefore stay out of the user's normal Harness home. An explicit `DSH_HOME` replaces only the development Harness home. Renderer DevTools opens automatically; Main, Renderer, and dsh Host debugging listen on ports 9229, 9222, and 9230. `DSH_DESKTOP_MAIN_INSPECT_PORT`, `DSH_DESKTOP_RENDERER_DEBUG_PORT`, and `DSH_DESKTOP_HOST_INSPECT_PORT` replace those ports, while `DSH_DESKTOP_OPEN_DEVTOOLS=0` keeps the detached Renderer tools closed.

After an explicit build, `start:desktop` reconstructs the disposable project and launches the existing artifacts without building again:

```sh
pnpm run start:desktop
```

Workspace development runs the current CLI and private Desktop Host packages under the invoking Node.js and disables desktop package mutations. Its explicitly linked disposable profile is the only mode allowed to resolve bundles outside its own directory. Use an unpacked application to exercise the bundled Node.js, bundled pnpm, bundled dsh resources, plugin installation and repair paths.

## Package

The normal packaging path is one complete command. It performs release preparation before creating the host platform's installers and update metadata. Every target requires a reverse-DNS `DSH_DESKTOP_APP_ID`. macOS targets additionally require the electron-builder certificate qualifier in `DSH_DESKTOP_MACOS_SIGNING_IDENTITY`, its 10-character Apple Team ID in `DSH_DESKTOP_MACOS_TEAM_ID`, and one complete notarytool credential strategy. The App Store Connect API-key strategy uses these variables:

```sh
export DSH_DESKTOP_APP_ID='<reverse-DNS application ID>'
export DSH_DESKTOP_MACOS_SIGNING_IDENTITY='<certificate name without the Developer ID Application prefix>'
export DSH_DESKTOP_MACOS_TEAM_ID='<10-character Apple Team ID>'
export APPLE_API_KEY='<absolute path to the .p8 file>'
export APPLE_API_KEY_ID='<App Store Connect API Key ID>'
export APPLE_API_ISSUER='<App Store Connect issuer UUID>'
```

`prepare:desktop` is not a prerequisite:

```sh
pnpm run package:desktop
```

Release automation uses fixed target commands so runtime preparation, dsh preparation, and electron-builder receive the same platform and architecture:

```sh
pnpm run package:desktop:mac:arm64
pnpm run package:desktop:mac:x64
pnpm run package:desktop:win:x64
```

The macOS arm64 command requires Apple Silicon. The macOS x64 command runs on Intel macOS or Apple Silicon with Rosetta. The Windows x64 command requires Windows x64. Linux is not a supported Desktop release target.

Each target owns its packed package inputs, prepared runtime, package set, dsh tree, pnpm preparation state, unpacked application, update metadata, and final artifacts under `apps/desktop/.desktop-build/targets/<target>/`. The Node.js archive cache remains shared under `.desktop-build/downloads` because every archive name includes its version, platform, and architecture and is verified before extraction. A target build never consumes another target's mutable preparation state.

### Runtime file selection

Production packages first pass through npm's publication rules and dependency installation. [Desktop's file policy](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/apps/desktop/scripts/runtime-file-policy.ts) then filters the immutable `resources/dsh/node_modules` copy before signing and integrity sealing. It omits TypeScript declarations, recognized JavaScript/CSS/TypeScript source maps, TypeScript build caches, Domino's test directory, selected native compiler outputs, and node-pty prebuilds for other platforms. It preserves runtime JavaScript, native modules and their DLL/EXE helpers, WASM, unknown assets, licenses, and notices. The policy does not alter npm tarballs, the bundled package manager, or user-installed plugin files.

The packaged application runs compiled JavaScript and pre-generated Typert metadata; it does not compile TypeScript plugins. Source-level debugger navigation and editor declarations remain available in development packages. [Copy-policy tests](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/apps/desktop/tests/runtime-file-policy.spec.ts) cover exclusions and retained assets; `prepare:dsh` runs the [payload smoke](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/apps/desktop/tests/fixtures/runtime-payload-smoke.mjs) under the bundled Node before the Host smoke and final inventory verification.

Windows release qualification also runs [native cleanup and replacement checks](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/apps/desktop/scripts/smoke-windows.ps1) manually after the Desktop build. Set `$Electron` to the prepared Electron executable and `$Makensis`, `$SevenZip`, and `$PluginDir` to the pinned builder’s NSIS compiler, 7-Zip executable, and x86-unicode NSIS plugin directory. From the repository root, run the command below. It verifies Electron junction cleanup, installer scratch cleanup, and both locked-file replacement modes; it is not part of the unit-test lane.

```powershell
pwsh -NoProfile -File apps/desktop/scripts/smoke-windows.ps1 -Electron $Electron -Makensis $Makensis -SevenZip $SevenZip -PluginDir $PluginDir
```

### Upload updates

`DSH_DESKTOP_AUTO_UPDATE_ENV` selects `test` or `production` for both the URL embedded during packaging and the later COS upload; an absent value selects `test`. Test packaging requires its HTTPS origin in `DOWNLOAD_TEST_ORIGIN`, while the production origin remains `https://download.deepseek.com`. Upload additionally requires the selected deployment's COS bucket in `DOWNLOAD_TEST_COS_BUCKET` or `DOWNLOAD_PROD_COS_BUCKET`. The target path is `_/harness/desktop/stable/<target>/`, where `target` is `mac-arm64`, `mac-x64`, or `win-x64`.

The update destination and upload credentials follow the selected deployment:

| Environment | Public origin | COS bucket | COS credentials |
|---|---|---|---|
| `test` or unset | `DOWNLOAD_TEST_ORIGIN` | `DOWNLOAD_TEST_COS_BUCKET` | `DOWNLOAD_TEST_COS_SECRET_ID`, `DOWNLOAD_TEST_COS_SECRET_KEY` |
| `production` | `https://download.deepseek.com` | `DOWNLOAD_PROD_COS_BUCKET` | `DOWNLOAD_PROD_COS_SECRET_ID`, `DOWNLOAD_PROD_COS_SECRET_KEY` |

Package and upload one target under the same environment. For example, the default test deployment uses:

```sh
export DOWNLOAD_TEST_ORIGIN='https://desktop-updates.example.com'
pnpm run package:desktop:mac:arm64

export DOWNLOAD_TEST_COS_BUCKET='<test COS bucket>'
export DOWNLOAD_TEST_COS_SECRET_ID='<test COS SecretId>'
export DOWNLOAD_TEST_COS_SECRET_KEY='<test COS SecretKey>'
pnpm run upload:mac:arm64
```

Set `DSH_DESKTOP_AUTO_UPDATE_ENV=production` before packaging, then provide `DOWNLOAD_PROD_COS_BUCKET` and the production credential pair before running `upload:mac:arm64`, `upload:mac:x64`, or `upload:win:x64`. Packaging does not require a COS bucket or credentials. It explicitly disables electron-builder publishing, strips all four COS credential fields from its subprocesses, and writes a target completion record only after electron-builder and every signing or notarization hook succeeds. Upload requires that record to match the selected environment, target, public URL, and current dsh version; it also requires the root dsh version, Desktop version, channel metadata version, artifact names, sizes, and SHA-512 values to agree before it reads the selected COS credential pair. It uploads only that target's immutable versioned artifacts, uploads the version-derived channel metadata last with `no-cache`, and never deletes historical objects. Stable releases use `latest-mac.yml` or `latest.yml`; a prerelease such as `alpha` uses `alpha-mac.yml` or `alpha.yml`, matching electron-builder's emitted filename.
