#!/usr/bin/env bash
# 单课构建+推送（参数：课程 id），8GB 堆，结束时目录还原由调用方负责
set -uo pipefail
ROOT="/mnt/e/claude code/开发者第一课"
cd "$ROOT"
export PATH="$HOME/.local/bin:$PATH"
KEY="$HOME/.ssh/deploy_key"
REMOTE="root@168.144.137.102"
DEST=/var/www/ai-native-textbook
DIST_UNIX="/mnt/e/claude code/开发者第一课/tmp/dist-one"
DIST_WIN='E:\claude code\开发者第一课\tmp\dist-one'
SSH_OPTS=(-i "$KEY" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15
  -o ServerAliveInterval=15 -o ServerAliveCountMax=8)
R() { rsync -az -e "ssh ${SSH_OPTS[*]}" "$@"; }
NODE_EXE=/mnt/d/node.exe
C="$1"

export WSLENV="TB_COURSES:TB_DIST:TB_SKIP_MIRROR:TB_MIRROR_JUNCTION:DOCS_HOST:TB_NODE_OPTIONS"
export TB_NODE_OPTIONS="--max-old-space-size=8192"
export TB_SKIP_MIRROR=1 TB_MIRROR_JUNCTION=1 DOCS_HOST=aibook.faruheaisha.me TB_DIST="$DIST_WIN"

node tmp/swap-catalog.mjs on
rm -rf "$DIST_UNIX"
export TB_COURSES="$C"
echo "== BUILD $C start $(date +%T)"
if "$NODE_EXE" scripts/deploy/build-batches.mjs > "tmp/build-one-$(echo "$C" | tr '/' '_').log" 2>&1; then
  R "$DIST_UNIX/lib/$C/" "$REMOTE:$DEST/lib/$C/"
  R "$DIST_UNIX/assets/" "$REMOTE:$DEST/assets/"
  ssh "${SSH_OPTS[@]}" "$REMOTE" "cat '$DEST/hashmap.json'" > /tmp/server-hashmap.json
  node tmp/merge-hashmap.mjs /tmp/server-hashmap.json "$DIST_UNIX/hashmap.json" /tmp/hashmap-merged.json
  R /tmp/hashmap-merged.json "$REMOTE:$DEST/hashmap.json"
  echo "== OK $C $(date +%T)"
else
  echo "== FAIL $C $(date +%T)"
fi
rm -rf "$DIST_UNIX"
node tmp/swap-catalog.mjs off
echo "== ONE DONE $(date +%T)"
