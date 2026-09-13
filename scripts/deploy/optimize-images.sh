#!/usr/bin/env bash
# 把站内镜像目录里的 PNG / JPG / GIF 统一转成 WebP，并把超过 1600px 宽的图缩到 1600px。
#
# 为什么需要这一步：
#   第三方课程里的截图动辄 200KB~8MB。实测本机到服务器的跨境链路只有 30~90 KB/s，
#   一页正文挂几张大图就要几十秒才能看完。
#   而正文栏宽 47rem（752px），2x 屏也只要 1504 设备像素，
#   原图 2752px / 3010px 属于纯浪费——浏览器反正还要自己缩一遍。
#   实测最大那张 8.29MB -> 172KB，SSIM 0.979，肉眼无差别。
#
# 用法（必须在 WSL 里跑，因为依赖 ffmpeg 的 libwebp）：
#   bash scripts/deploy/optimize-images.sh              # 正式转换
#   DRY_RUN=1 bash scripts/deploy/optimize-images.sh    # 只统计，不改动文件
#   LIMIT=50 bash scripts/deploy/optimize-images.sh     # 只处理前 50 个（试跑用）
#
# 转换完成后必须接着跑：node scripts/deploy/rewrite-mirror-ext.mjs
# 把 mirror-index.json 里的扩展名同步过来，否则站内引用会全部 404。

set -uo pipefail

REPO="${REPO:-/mnt/e/claude code/开发者第一课}"
# 默认覆盖两处：第三方截图镜像，以及手动导入的那批插图。
# 仓库路径里带空格，所以用冒号分隔再切成数组，不能直接按空格拆。
if [ -n "${ASSET_DIRS:-}" ]; then
  IFS=':' read -r -a DIRS <<< "$ASSET_DIRS"
else
  DIRS=("$REPO/site/docs/public/mirror" "$REPO/site/docs/public/workbuddy-harness")
fi
MAX_W="${MAX_W:-1600}"
QUALITY="${QUALITY:-82}"
GIF_QUALITY="${GIF_QUALITY:-70}"
GIF_MAX_W="${GIF_MAX_W:-1200}"
JOBS="${JOBS:-8}"
DRY_RUN="${DRY_RUN:-0}"
LIMIT="${LIMIT:-0}"
FORCE="${FORCE:-0}"

for d in "${DIRS[@]}"; do
  if [ ! -d "$d" ]; then echo "找不到资源目录：$d" >&2; exit 1; fi
done
command -v ffmpeg >/dev/null || { echo "需要 ffmpeg（WSL: apt install ffmpeg）" >&2; exit 1; }

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
: > "$WORK/done.tsv"
: > "$WORK/skipped.tsv"
: > "$WORK/failed.txt"

convert_one() {
  local src="$1"
  local dir base ext stem dst
  dir="$(dirname "$src")"
  base="$(basename "$src")"
  ext="${base##*.}"
  stem="${base%.*}"
  ext="$(echo "$ext" | tr 'A-Z' 'a-z')"

  case "$ext" in
    png|jpg|jpeg|gif) ;;
    *) return 0 ;;
  esac

  dst="$dir/$stem.webp"
  if [ -f "$dst" ] && [ "$FORCE" != "1" ]; then return 0; fi
  rm -f "$dst"

  local tmp="$WORK/$stem.webp"
  local orig_size new_size frames
  orig_size="$(stat -c%s "$src")"
  frames=1
  if [ "$ext" = "gif" ]; then
    frames="$(ffprobe -v quiet -select_streams v:0 -count_frames -show_entries stream=nb_read_frames -of csv=p=0 "$src" 2>/dev/null)"
    [ -z "$frames" ] && frames=1
  fi

  local scale="scale='min(iw,$MAX_W)':-2:flags=lanczos"
  local gscale="scale='min(iw,$GIF_MAX_W)':-2:flags=lanczos"
  if [ "$frames" -gt 1 ] 2>/dev/null; then
    ffmpeg -nostdin -y -v error -i "$src" -c:v libwebp_anim -loop 0 -quality "$GIF_QUALITY" -compression_level 6 -vf "$gscale" "$tmp" 2>/dev/null
  else
    ffmpeg -nostdin -y -v error -i "$src" -c:v libwebp -quality "$QUALITY" -preset picture -compression_level 6 -vf "$scale" "$tmp" 2>/dev/null
  fi

  if [ ! -s "$tmp" ]; then
    echo "FAIL $src" >> "$WORK/failed.txt"
    return 0
  fi
  new_size="$(stat -c%s "$tmp")"

  if [ "$new_size" -ge "$orig_size" ]; then
    printf '%s\t%s\t%s\tkept\n' "$orig_size" "$new_size" "$src" >> "$WORK/skipped.tsv"
    rm -f "$tmp"
    return 0
  fi

  if [ "$DRY_RUN" = "1" ]; then
    printf '%s\t%s\t%s\twould\n' "$orig_size" "$new_size" "$src" >> "$WORK/done.tsv"
    rm -f "$tmp"
    return 0
  fi

  mv -f "$tmp" "$dst" && rm -f "$src"
  printf '%s\t%s\t%s\tok\n' "$orig_size" "$new_size" "$src" >> "$WORK/done.tsv"
}
export -f convert_one
export WORK MAX_W QUALITY GIF_QUALITY GIF_MAX_W DRY_RUN FORCE

echo "资源目录：${DIRS[*]}"
echo "参数：MAX_W=$MAX_W  QUALITY=$QUALITY  GIF_MAX_W=$GIF_MAX_W  GIF_QUALITY=$GIF_QUALITY  JOBS=$JOBS  DRY_RUN=$DRY_RUN  FORCE=$FORCE"
echo

LIST="$WORK/list.0"
: > "$LIST"
for d in "${DIRS[@]}"; do
  find "$d" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.gif' \) -print0 >> "$LIST"
done
if [ "$LIMIT" -gt 0 ]; then
  tr '\0' '\n' < "$LIST" | head -n "$LIMIT" | tr '\n' '\0' > "$WORK/list.txt"
  LIST="$WORK/list.txt"
fi
total="$(tr -cd '\0' < "$LIST" | wc -c)"
echo "待处理：$total 个文件"
echo

xargs -0 -a "$LIST" -n 1 -P "$JOBS" bash -c 'convert_one "$0"' 2>/dev/null

echo
echo "================ 汇总 ================"
done_n=$(wc -l < "$WORK/done.tsv" 2>/dev/null || true); done_n=${done_n:-0}
skip_n=$(wc -l < "$WORK/skipped.tsv" 2>/dev/null || true); skip_n=${skip_n:-0}
fail_n=$(wc -l < "$WORK/failed.txt" 2>/dev/null || true); fail_n=${fail_n:-0}
echo "已转换：$done_n   保留原格式(未变小)：$skip_n   失败：$fail_n"
if [ -s "$WORK/done.tsv" ]; then
  awk -F'\t' '{o+=$1; n+=$2} END { printf "转换前：%.1f MB\n转换后：%.1f MB\n压缩比：%.1f 倍（省 %.1f%%）\n", o/1048576, n/1048576, (n>0? o/n : 0), (o>0? (1-n/o)*100 : 0) }' "$WORK/done.tsv"
fi
if [ -s "$WORK/failed.txt" ]; then
  echo "---- 失败清单（前 10 个）----"
  head -10 "$WORK/failed.txt"
fi
