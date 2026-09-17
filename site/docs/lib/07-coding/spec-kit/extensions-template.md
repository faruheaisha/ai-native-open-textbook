---
title: "Extension Template"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/template/README.md"
sourceRel: "extensions/template/README.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/template/README.md"
sourceSha256: "9276583c3adfb17dd4e33f6d11e4118bfc478a5e51f086ee933ecf853bec2d5b"
pageSha256: "9276583c3adfb17dd4e33f6d11e4118bfc478a5e51f086ee933ecf853bec2d5b"
contentMode: "local-full"
zh: ""
---

# Extension Template

Starter template for creating a Spec Kit extension.

## Quick Start

1. **Copy this template**:

   ```bash
   cp -r extensions/template my-extension
   cd my-extension
   ```

2. **Customize `extension.yml`**:
   - Change extension ID, name, description
   - Update author and repository
   - Define your commands

3. **Create commands**:
   - Add command files in `commands/` directory
   - Use Markdown format with YAML frontmatter

4. **Create config template**:
   - Define configuration options
   - Document all settings

5. **Write documentation**:
   - Update README.md with usage instructions
   - Add examples

6. **Test locally**:

   ```bash
   cd /path/to/spec-kit-project
   specify extension add --dev /path/to/my-extension
   ```

7. **Publish** (optional):
   - Create GitHub repository
   - Create release
   - Submit to catalog (see EXTENSION-PUBLISHING-GUIDE.md)

## Files in This Template

- `extension.yml` - Extension manifest (CUSTOMIZE THIS)
- `config-template.yml` - Configuration template (CUSTOMIZE THIS)
- `commands/example.md` - Example command (REPLACE THIS)
- `README.md` - Extension documentation (REPLACE THIS)
- `LICENSE` - MIT License (REVIEW THIS)
- `CHANGELOG.md` - Version history (UPDATE THIS)
- `.gitignore` - Git ignore rules

## Customization Checklist

- [ ] Update `extension.yml` with your extension details
- [ ] Change extension ID to your extension name
- [ ] Update author information
- [ ] Define your commands
- [ ] Create command files in `commands/`
- [ ] Update config template
- [ ] Write README with usage instructions
- [ ] Add examples
- [ ] Update LICENSE if needed
- [ ] Test extension locally
- [ ] Create git repository
- [ ] Create first release

## Need Help?

- **Development Guide**: See EXTENSION-DEVELOPMENT-GUIDE.md
- **API Reference**: See EXTENSION-API-REFERENCE.md
- **Publishing Guide**: See EXTENSION-PUBLISHING-GUIDE.md
- **User Guide**: See EXTENSION-USER-GUIDE.md

## Template Version

- Version: 1.0.0
- Last Updated: 2026-01-28
- Compatible with Spec Kit: >=0.1.0
