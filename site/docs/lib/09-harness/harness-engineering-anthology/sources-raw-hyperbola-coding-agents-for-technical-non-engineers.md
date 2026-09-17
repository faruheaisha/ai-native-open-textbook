---
title: "Harness Engineering 文集"
sourceId: "09-harness/harness-engineering-anthology"
sourceTitle: "Harness Engineering 文集"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/lopopolo/harness-engineering"
entryUrl: "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/sources/raw/hyperbola/coding-agents-for-technical-non-engineers.mdx"
sourceRel: "sources/raw/hyperbola/coding-agents-for-technical-non-engineers.mdx"
rawUrl: "/raw/09-harness/harness-engineering-anthology/sources/raw/hyperbola/coding-agents-for-technical-non-engineers.mdx"
sourceSha256: "be7910b9116348c67994662b5442842a5626fbe5b19f5243380c74b18a86cd62"
pageSha256: "be7910b9116348c67994662b5442842a5626fbe5b19f5243380c74b18a86cd62"
contentMode: "local-full"
zh: ""
---

# Harness Engineering 文集

import \{ Image \} from "astro:assets";

import figure from "./starter-kit-workspace-setup-3d-view.png?url";

If you lead scientists, analysts, user ops folks, or security researchers, let
them go for it with coding agents. These folks are technical enough to have
success. You need data-science-quality code, not prod.

<div class="mb-3 rounded-sm">
  &lt;Image
    class="mx-auto img-fluid d-block rounded-sm"
    height="500"
    width="500"
    src=\{figure\}
    alt="A clean white-background 3D illustration of a cream-colored organizer tray shown from a slightly top-down front-left angle. The tray holds a small open silver laptop with a blank dark screen, an open spiral notebook with a green pencil, a neat stack of printed pages, a black over-ear support headset with microphone, and a magnifying glass. The objects are spaced evenly in fitted compartments, with soft neutral lighting and a warm, minimal palette."
  />
</div>

Start with one paved lane: Python. Have IT put
[`uv`](https://docs.astral.sh/uv/) on every machine and make sure `uv`, the
Python installs it manages, and the virtualenvs it creates are peaceful with
your EDR. Then use enterprise-managed agent config to ship an `AGENTS.md` that
says `use Python`, `use uv`, and `prefer small scripts`.

Give people the boring batteries by default: `pandas`, `numpy`, and `poppler`.
That is enough to unlock useful work quickly: scientists cleaning sensor data,
analysts turning an investigation into a repeatable script, user ops folks
automating repetitive support work, and security researchers batch-processing
PDFs.

Domain experts already have the hard part. They know the data, the detection,
the investigation, or the support workflow. Coding agents help them encode that
work in code. Give them a paved lane and permission.
