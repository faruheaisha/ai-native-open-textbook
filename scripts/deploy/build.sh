#!/usr/bin/env bash
# AI 原生开放教材 · 全量构建
#
# 在 WSL 里跑（也可以在 PowerShell 里逐条执行等价命令）：
#   bash "/mnt/e/claude code/开发者第一课/scripts/deploy/build.sh"
#
# 为什么要脚本化：DOCS_HOST 决定 sitemap 里的域名。
# 之前靠手敲，换域名时很容易漏掉，sitemap 就会指向一个已经不通的地址。
set -euo pipefail

ROOT="${ROOT:-/mnt/e/claude code/开发者第一课}"
# 站点正式地址。换域名只需要改这一行，然后重跑本脚本。
DOCS_HOST="${DOCS_HOST:-aibook.faruheaisha.me}"

cd "$ROOT"

step() { printf '\n\033[1m== %s\033[0m\n' "$1"; }

step "1/4 生成课程目录（只读 upstream/ 快照，不联网）"
node scripts/build-catalog.mjs

step "2/4 生成站内正文"
node scripts/build-site-content.mjs

step "3/4 生成搜索索引"
node scripts/build-search-index.mjs

step "4/4 VitePress 构建（DOCS_HOST=$DOCS_HOST）"
export NODE_OPTIONS="--max-old-space-size=8192"
export DOCS_HOST
cd site
npx vitepress build docs

printf '\n\033[1;32m构建完成\033[0m\n'