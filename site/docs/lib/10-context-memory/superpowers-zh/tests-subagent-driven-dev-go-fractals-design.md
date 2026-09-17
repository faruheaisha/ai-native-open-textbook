---
title: "Go Fractals CLI - Design"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/tests/subagent-driven-dev/go-fractals/design.md"
sourceRel: "tests/subagent-driven-dev/go-fractals/design.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/tests/subagent-driven-dev/go-fractals/design.md"
sourceSha256: "a78c95627d801c1b3e1cad71c13dc56de2fb4584b29f9886b7fdcfd32feaebeb"
pageSha256: "a78c95627d801c1b3e1cad71c13dc56de2fb4584b29f9886b7fdcfd32feaebeb"
contentMode: "local-full"
zh: ""
---

# Go Fractals CLI - Design

## Overview

A command-line tool that generates ASCII art fractals. Supports two fractal types with configurable output.

## Usage

```bash
# Sierpinski triangle
fractals sierpinski --size 32 --depth 5

# Mandelbrot set
fractals mandelbrot --width 80 --height 24 --iterations 100

# Custom character
fractals sierpinski --size 16 --char '#'

# Help
fractals --help
fractals sierpinski --help
```

## Commands

### `sierpinski`

Generates a Sierpinski triangle using recursive subdivision.

Flags:
- `--size` (default: 32) - Width of the triangle base in characters
- `--depth` (default: 5) - Recursion depth
- `--char` (default: '*') - Character to use for filled points

Output: Triangle printed to stdout, one line per row.

### `mandelbrot`

Renders the Mandelbrot set as ASCII art. Maps iteration count to characters.

Flags:
- `--width` (default: 80) - Output width in characters
- `--height` (default: 24) - Output height in characters
- `--iterations` (default: 100) - Maximum iterations for escape calculation
- `--char` (default: gradient) - Single character, or omit for gradient " .:-=+*#%@"

Output: Rectangle printed to stdout.

## Architecture

```
cmd/
  fractals/
    main.go           # Entry point, CLI setup
internal/
  sierpinski/
    sierpinski.go     # Algorithm
    sierpinski_test.go
  mandelbrot/
    mandelbrot.go     # Algorithm
    mandelbrot_test.go
  cli/
    root.go           # Root command, help
    sierpinski.go     # Sierpinski subcommand
    mandelbrot.go     # Mandelbrot subcommand
```

## Dependencies

- Go 1.21+
- `github.com/spf13/cobra` for CLI

## Acceptance Criteria

1. `fractals --help` shows usage
2. `fractals sierpinski` outputs a recognizable triangle
3. `fractals mandelbrot` outputs a recognizable Mandelbrot set
4. `--size`, `--width`, `--height`, `--depth`, `--iterations` flags work
5. `--char` customizes output character
6. Invalid inputs produce clear error messages
7. All tests pass
