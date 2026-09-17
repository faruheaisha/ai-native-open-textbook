---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "8d7d8d2a86533a66e39c124f0aa4e516eb7df48cd3d7743065a0b31794bf9465"
contentMode: "local-full"
zh: ""
---

#### Working with Images and Screenshots

Claude Code supports **direct image input** for visual analysis, mockup implementation, and design feedback.

**How to use images**:

1. **Paste directly in terminal** (macOS/Linux/Windows with modern terminal):
   - Copy screenshot or image to clipboard (`Cmd+Shift+4` on macOS, `Win+Shift+S` on Windows)
   - In Claude Code session, paste with `Cmd+V` / `Ctrl+V`
   - Claude receives the image and can analyze it

2. **Drag and drop** (some terminals):
   - Drag image file into terminal window
   - Claude loads and processes the image

3. **Reference with path**:
   ```bash
   Analyze this mockup: /path/to/design.png
   ```

**Common use cases**:

```bash
# Implement UI from mockup
You: [Paste screenshot of Figma design]
Implement this login screen in React with Tailwind CSS

# Debug visual issues
You: [Paste screenshot of broken layout]
The button is misaligned. Fix the CSS.

# Analyze diagrams
You: [Paste architecture diagram]
Explain this system architecture and identify potential bottlenecks

# Code from whiteboard
You: [Paste photo of whiteboard algorithm]
Convert this algorithm to Python code

# Accessibility audit
You: [Paste screenshot of UI]
Review this interface for WCAG 2.1 compliance issues
```

**Supported formats**: PNG, JPG, JPEG, WebP, GIF (static)

**Best practices**:
- **High contrast**: Ensure text/diagrams are clearly visible
- **Crop relevantly**: Remove unnecessary UI elements for focused analysis
- **Annotate when needed**: Circle/highlight specific areas you want Claude to focus on
- **Combine with text**: "Focus on the header section" provides additional context

**Example workflow**:
```
You: [Paste screenshot of error message in browser console]
This error appears when users click the submit button. Debug it.

Claude: I can see the error "TypeError: Cannot read property 'value' of null".
This suggests the form field reference is incorrect. Let me check your form handling code...
[Reads relevant files and proposes fix]
```

**Limitations**:
- Images consume significant context tokens (equivalent to ~1000-2000 words of text)
- Use `/status` to monitor context usage after pasting images
- Consider describing complex diagrams textually if context is tight
- Some terminals may not support clipboard image pasting (fallback: save and reference file path)

> **💡 Pro tip**: Take screenshots of error messages, design mockups, and documentation instead of describing them textually. Visual input is often faster and more precise than written descriptions.

##### Wireframing Tools for AI Development

When designing UI before implementation, low-fidelity wireframes help Claude understand intent without over-constraining the output. Here are recommended tools that work well with Claude Code:

| Tool | Type | Price | MCP Support | Best For |
|------|------|-------|-------------|----------|
| **Excalidraw** | Hand-drawn style | Free | ✓ Community | Quick wireframes, architecture diagrams |
| **tldraw** | Minimalist canvas | Free | Emerging | Real-time collaboration, custom integrations |
| **Pencil** | IDE-native canvas | Free* | ✓ Native | Claude Code integrated, AI agents, git-based |
| **Frame0** | Low-fi + AI | Free | ✓ | Modern Balsamiq alternative, AI-assisted |
| **Paper sketch** | Physical | Free | N/A | Fastest iteration, zero setup |

**Excalidraw** (excalidraw.com):
- Open-source, hand-drawn aesthetic reduces over-specification
- MCP available: `github.com/yctimlin/mcp_excalidraw`
- Export: PNG recommended (1000-1200px), also SVG/JSON
- Best for: Architecture diagrams, quick UI sketches

**tldraw** (tldraw.com):
- Infinite canvas with minimal UI, excellent SDK for custom apps
- Agent starter kit available for building AI-integrated tools
- Export: JSON native, PNG via screenshot
- Best for: Collaborative wireframing, embedding in custom tools

**Frame0** (frame0.app):
- Modern Balsamiq alternative (2025), offline-first desktop app
- Built-in AI: text-to-wireframe, screenshot-to-wireframe conversion
- Native MCP integration for Claude workflows
- Best for: Teams wanting low-fi wireframes with AI assistance

**Pencil** (pencil.dev):
- IDE-native infinite canvas (Cursor/VSCode/Claude Code)
- AI multiplayer agents running in parallel for collaborative design
- Format: `.pen` JSON, git-versionnable with branch/merge support
- MCP: Bi-directional read+write access to design files
- Founded by Tom Krcha (ex-Adobe XD), funded a16z Speedrun
- Export: .pen JSON native, PNG via screenshot, Figma import (copy-paste)
- Best for: Engineer-designers wanting design-as-code paradigm, teams on Cursor/Claude Code workflows

**⚠️ Note**: Launched January 2026, strong traction (1M+ views, FAANG adoption) but still maturing. Currently free; pricing model TBD. Recommended for early adopters comfortable with rapid iteration.

**Paper + Photo**:
- Seriously, this works extremely well
- Snap a photo with your smartphone → paste directly in Claude Code
- Tips: Good lighting, tight crop, avoid reflections/shadows
- Claude handles rotations and hand-drawn artifacts well

**Recommended export settings**: PNG format, 1000-1200px on longest side, high contrast

##### Figma MCP Integration

Figma provides an **official MCP server** (announced 2025) that gives Claude direct access to your design files, dramatically reducing token usage compared to screenshots alone.

**Setup options**:

```bash
# Remote MCP (all Figma plans, any machine)
claude mcp add --transport http figma https://mcp.figma.com/mcp

# Desktop MCP (requires Figma desktop app with Dev Mode)
claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp
```

**Available tools via Figma MCP**:

| Tool | Purpose | Tokens |
|------|---------|--------|
| `get_design_context` | Extracts React+Tailwind structure from frames | Low |
| `get_variable_defs` | Retrieves design tokens (colors, spacing, typography) | Very low |
| `get_code_connect_map` | Maps Figma components → your codebase | Low |
| `get_screenshot` | Captures visual screenshot of frame | High |
| `get_metadata` | Returns node properties, IDs, positions | Very low |

**Why use Figma MCP over screenshots?**
- **3-10x fewer tokens**: Structured data vs. image analysis
- **Direct token access**: Colors, spacing values are extracted, not interpreted
- **Component mapping**: Code Connect links Figma → actual code files
- **Iterative workflow**: Small changes don't require new screenshots

**Recommended workflow**:
```
1. get_metadata          → Understand overall structure
2. get_design_context    → Get component hierarchy for specific frames
3. get_variable_defs     → Extract design tokens once per project
4. get_screenshot        → Only when visual reference needed
```

**Example session**:
```bash
You: Implement the dashboard header from Figma
Claude: [Calls get_design_context for header frame]
→ Returns: React structure with Tailwind classes, exact spacing
Claude: [Calls get_variable_defs]
→ Returns: --color-primary: #3B82F6, --spacing-md: 16px
Claude: [Implements component matching Figma exactly]
```

**Prerequisites**:
- Figma account (Free tier works for remote MCP)
- Dev Mode seat for desktop MCP features
- Design file must be accessible to your account

**MCP config file** (`examples/mcp-configs/figma.json`):
```json
{
  "mcpServers": {
    "figma": {
      "transport": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

##### Image Optimization for Claude Vision

Understanding Claude's image processing helps optimize for speed and accuracy.

**Resolution guidelines**:

| Range | Effect |
|-------|--------|
| **< 200px** | Loss of precision, text unreadable |
| **200-1000px** | Sweet spot for most wireframes |
| **1000-1568px** | Optimal quality/token balance |
| **1568-8000px** | Auto-downscaled (wastes upload time) |
| **> 8000px** | Rejected by API |

**Token calculation**: `(width × height) / 750 ≈ tokens consumed`

| Image Size | Approximate Tokens |
|------------|-------------------|
| 200×200 | ~54 tokens |
| 500×500 | ~334 tokens |
| 1000×1000 | ~1,334 tokens |
| 1568×1568 | ~3,279 tokens |

**Format recommendations**:

| Format | Use When |
|--------|----------|
| **PNG** | Wireframes, diagrams, text, sharp lines |
| **WebP** | General screenshots, good compression |
| **JPEG** | Photos only, compression artifacts harm line detection |
| **GIF** | Avoid (static only, poor quality) |

**Optimization checklist**:
- [ ] Crop to relevant area only
- [ ] Resize to 1000-1200px if larger
- [ ] Use PNG for wireframes/diagrams
- [ ] Check `/status` after pasting to monitor context usage
- [ ] Consider text description if context is >70%

> **💡 Token tip**: A 1000×1000 wireframe uses ~1,334 tokens. The same information as structured text (via Figma MCP) might use 200-400 tokens. Use screenshots for visual context, structured data for implementation.
