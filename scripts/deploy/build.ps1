# AI 原生开放教材 · 全量构建（Windows 侧）
#
# 为什么构建必须在 Windows 跑：
#   site/node_modules 是按 Windows 装的，里面是 @rollup/rollup-win32-x64-msvc。
#   在 WSL(Linux) 里跑 vitepress 会报 "Cannot find module @rollup/rollup-linux-x64-gnu"。
#   所以分工是：Windows 负责构建，WSL 只负责 rsync 上传（见 deploy.sh）。
#
# 用法：
#   powershell -ExecutionPolicy Bypass -File scripts\deploy\build.ps1
param(
  [string]$DocsHost = "aibook.faruheaisha.me"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $root

function Step($n) { Write-Host "`n== $n ==" -ForegroundColor Cyan }

Step "1/4 生成课程目录（只读 upstream/ 快照，不联网）"
node scripts/build-catalog.mjs

Step "2/4 生成站内正文"
node scripts/build-site-content.mjs

Step "3/4 生成搜索索引"
node scripts/build-search-index.mjs

Step "4/4 VitePress 构建（DOCS_HOST=$DocsHost）"
$env:NODE_OPTIONS = "--max-old-space-size=8192"
$env:DOCS_HOST = $DocsHost
Push-Location site
try { npx vitepress build docs } finally { Pop-Location }

Write-Host "`n构建完成" -ForegroundColor Green