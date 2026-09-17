---
title: "Instinct Status Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/instinct-status.md"
sourceRel: "commands/instinct-status.md"
rawUrl: "/raw/09-harness/ecc/commands/instinct-status.md"
sourceSha256: "4c6dfbea0a0a9105121410391b05983f71f4317ccf166a52955fc5972600fcce"
pageSha256: "4c6dfbea0a0a9105121410391b05983f71f4317ccf166a52955fc5972600fcce"
contentMode: "local-full"
zh: ""
---

# Instinct Status Command

Shows learned instincts for the current project plus global instincts, grouped by domain.

## Implementation

Run the instinct CLI, resolving the active ECC plugin root the same way
`hooks/hooks.json` and the other slash commands (`/sessions`, `/skill-health`)
do — env var → standard install → known plugin roots → plugin cache → fallback.
This avoids the divergence that happens when `CLAUDE_PLUGIN_ROOT` is unset
while a legacy `~/.claude/skills/continuous-learning-v2/` directory still
exists (#2037).

```bash
ECC_ROOT="${CLAUDE_PLUGIN_ROOT:-$(node -e "var r=(function(){var p=require('path'),f=require('fs'),o=require('os');var e=process.env.CLAUDE_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var d=p.join(o.homedir(),'.claude');function L(x){try{return require(p.join(x,'scripts','lib','resolve-ecc-root')).resolveEccRoot()}catch(_){return null}}var r=L(d);if(r)return r;var s=['ecc','ecc@ecc','marketplaces/ecc','everything-claude-code','everything-claude-code@everything-claude-code','marketplaces/everything-claude-code'];for(var i=0;i<s.length;i++){r=L(p.join(d,'plugins',s[i]));if(r)return r}try{var g=['ecc','everything-claude-code'];for(var j=0;j<g.length;j++){var c=p.join(d,'plugins','cache',g[j]);var O=f.readdirSync(c);for(var k=0;k<O.length;k++){var q=p.join(c,O[k]);var V=f.readdirSync(q);for(var m=0;m<V.length;m++){r=L(p.join(q,V[m]));if(r)return r}}}}catch(_){}return d})();console.log(r)")}"
python3 "$ECC_ROOT/skills/continuous-learning-v2/scripts/instinct-cli.py" status
```

## Usage

```
/instinct-status
```

## What to Do

1. Detect current project context (git remote/path hash)
