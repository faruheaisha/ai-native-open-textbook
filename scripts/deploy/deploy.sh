#!/usr/bin/env bash
# AI 原生开放教材 · 静态产物部署
#
# 在 WSL 里跑：
#   bash "/mnt/e/claude code/开发者第一课/scripts/deploy/deploy.sh"
#
# 为什么要分两条通道：
#   正文 + JS/CSS 只有几十 MB，走 rsync 增量最省事；
#   第三方图片镜像有 570MB，从国内往新加坡推太慢，
#   而服务器在新加坡拉 GitHub 是本地速度 —— 让它自己去下。
set -euo pipefail

ROOT="${ROOT:-/mnt/e/claude code/开发者第一课}"
SRC="${SRC:-$ROOT/site/docs/.vitepress/dist}"
HOST="${HOST:-168.144.137.102}"
REMOTE_USER="${REMOTE_USER:-root}"
DEST="${DEST:-/var/www/ai-native-textbook}"
# 清单和取图脚本是部署用的工具，不能落在网站根目录里，否则会被公开下载。
WORKER_DIR="${WORKER_DIR:-/var/lib/ai-textbook-deploy}"
KEY="${KEY:-$HOME/.ssh/deploy_key}"
# ServerAlive* 是必要的：上传两百多兆要几分钟，中间链路一空闲就会被掐断
# （表现为 rsync: Broken pipe），加上保活心跳后长传才稳。
SSH_OPTS=(-i "$KEY" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15
  -o ServerAliveInterval=15 -o ServerAliveCountMax=8)
SSH=(ssh "${SSH_OPTS[@]}" "$REMOTE_USER@$HOST")

step() { printf '\n\033[1m== %s\033[0m\n' "$1"; }

step "0/4 检查构建产物"
[ -d "$SRC" ] || { echo "产物目录不存在：$SRC" >&2; exit 1; }
[ -f "$SRC/index.html" ] || { echo "产物里没有 index.html，像是没构建完" >&2; exit 1; }
echo "产物：$SRC"
du -sh "$SRC" | awk '{print "体积："$1}'

step "1/4 准备目标目录"
"${SSH[@]}" "mkdir -p '$DEST' '$WORKER_DIR'"

step "2/4 同步正文与前端产物（排除 /mirror）"
# 镜像目录单独处理，这里先跳过。
# --delete 让服务器与本地产物严格一致：删掉的课程不会在站上赖着不走。
rsync -a --delete --info=stats1 --exclude '/mirror/' \
  -e "ssh ${SSH_OPTS[*]}" \
  "$SRC/" "$REMOTE_USER@$HOST:$DEST/"

step "3/4 服务器直连 GitHub 补齐图片镜像"
if [ -f "$ROOT/scripts/deploy/mirror-manifest.tsv" ]; then
  # 只把清单和取图脚本推过去，图片本体让服务器自己下 —— 省掉 570MB 的跨境上传。
  rsync -a -e "ssh ${SSH_OPTS[*]}" \
    "$ROOT/scripts/deploy/mirror-manifest.tsv" \
    "$REMOTE_USER@$HOST:$WORKER_DIR/mirror-manifest.tsv"
  rsync -a -e "ssh ${SSH_OPTS[*]}" \
    "$ROOT/scripts/deploy/fetch-mirror.mjs" \
    "$REMOTE_USER@$HOST:$WORKER_DIR/fetch-mirror.mjs"
  # 图片按清单里的「站内路径」落进站点目录；清单本身留在网站根目录之外。
  "${SSH[@]}" "MIRROR_MANIFEST='$WORKER_DIR/mirror-manifest.tsv' node '$WORKER_DIR/fetch-mirror.mjs' '$DEST'"
else
  echo "（没有 mirror-manifest.tsv，跳过。图片将走加速通道）"
fi

step "4/4 重载 nginx"
"${SSH[@]}" "nginx -t && systemctl reload nginx && echo 'nginx 已重载'"

printf '\n\033[1;32m部署完成\033[0m\n'