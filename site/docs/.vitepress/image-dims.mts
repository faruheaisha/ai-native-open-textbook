// 正文插图的统一加工：读真实像素尺寸、补 loading/decoding。
//
// 为什么需要：
//   1. 一页正文常挂十几张图（最多的那页有 222 张）。默认全部同时开下载，
//      跨境链路下视口里那张只能分到带宽的十几分之一，读者盯着空白等很久。
//      loading="lazy" 让浏览器只先取视口内的。
//   2. 图片陆续到达时会把下面的文字顶下去，页面一直跳。
//      提前把 width/height 写进标签，浏览器就能按真实比例先把位置占好。
//
// 尺寸直接从 public 下的真实文件头里读，不进仓库、不需要额外产物。

import fs from 'node:fs'
import path from 'node:path'

export type Dim = [number, number]

function pngSize(b: Buffer): Dim | null {
  if (b.length < 24) return null
  if (b.readUInt32BE(0) !== 0x89504e47) return null
  return [b.readUInt32BE(16), b.readUInt32BE(20)]
}

function gifSize(b: Buffer): Dim | null {
  if (b.length < 10) return null
  if (b.readUInt16BE(0) !== 0x4749) return null
  return [b.readUInt16LE(6), b.readUInt16LE(8)]
}

function jpegSize(b: Buffer): Dim | null {
  let i = 2
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) {
      i += 1
      continue
    }
    const marker = b[i + 1]
    // SOF0..SOF15，排除 DHT(c4) / JPG(c8) / DAC(cc)
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2
      continue
    }
    i += 2 + b.readUInt16BE(i + 2)
  }
  return null
}

// WebP 有三种块，尺寸分别藏在不同的位置。
// VP8X / VP8L 存的是「宽高各减一」，VP8 在帧头里。
function webpSize(b: Buffer): Dim | null {
  if (b.length < 30) return null
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null
  const fourcc = b.toString('ascii', 12, 16)
  const p = b.subarray(20)
  if (fourcc === 'VP8X') {
    const w = p[4] | (p[5] << 8) | (p[6] << 16)
    const h = p[7] | (p[8] << 8) | (p[9] << 16)
    return [w + 1, h + 1]
  }
  if (fourcc === 'VP8L') {
    const bits = p[1] | (p[2] << 8) | (p[3] << 16) | (p[4] << 24)
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]
  }
  if (fourcc === 'VP8 ') {
    const w = (p[6] | (p[7] << 8)) & 0x3fff
    const h = (p[8] | (p[9] << 8)) & 0x3fff
    return [w, h]
  }
  return null
}

// 站内 SVG 基本都是 shields.io 那种徽章，开头就写着 width/height。
// 这里要求数字后面紧跟引号，所以 width="100%" 这类百分比不会被误当成像素。
function svgSize(b: Buffer): Dim | null {
  const s = b.toString('utf8')
  const w = /\bwidth="([\d.]+)"/.exec(s)
  const h = /\bheight="([\d.]+)"/.exec(s)
  if (w && h) return [Math.round(Number(w[1])), Math.round(Number(h[1]))]
  const vb = /viewBox="\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)/.exec(s)
  if (vb) return [Math.round(Number(vb[1])), Math.round(Number(vb[2]))]
  return null
}

const cache = new Map<string, Dim | null>()

function readSize(abs: string): Dim | null {
  if (cache.has(abs)) return cache.get(abs)!
  let dim: Dim | null = null
  try {
    const fd = fs.openSync(abs, 'r')
    try {
      // SVG 的 <svg ...> 开标签偶尔拖得比较长，多读一点。
      const head = Buffer.alloc(1024)
      const n = fs.readSync(fd, head, 0, head.length, 0)
      const b = head.subarray(0, n)
      const ext = path.extname(abs).toLowerCase()
      if (ext === '.png') dim = pngSize(b)
      else if (ext === '.webp') dim = webpSize(b)
      else if (ext === '.jpg' || ext === '.jpeg') dim = jpegSize(b)
      else if (ext === '.gif') dim = gifSize(b)
      else if (ext === '.svg') dim = svgSize(b)
    } finally {
      fs.closeSync(fd)
    }
  } catch {
    dim = null
  }
  cache.set(abs, dim)
  return dim
}

let PUBLIC_DIR = ''
export function setPublicDir(dir: string) {
  PUBLIC_DIR = dir
}

// 只认站内真实存在的文件。外链、走加速通道的地址一律返回 null，
// 这样标签上不会出现对不上的尺寸。
export function sizeFor(src: string): Dim | null {
  if (!src || !PUBLIC_DIR) return null
  if (!src.startsWith('/') || src.startsWith('//')) return null
  let rel = src.split('#')[0].split('?')[0]
  try {
    rel = decodeURIComponent(rel)
  } catch {
    /* 解不开就用原样 */
  }
  if (!rel.startsWith('/')) return null
  return readSize(path.join(PUBLIC_DIR, rel.slice(1)))
}

export function decorateImgTag(tag: string): string {
  return tag.replace(/<img\b([^>]*)>/gi, (whole, attrs: string) => {
    if (/\bloading\s*=/i.test(attrs)) return whole
    // 上游的 <img> 有一多半写成自闭合的 <img ... />。
    // 新属性必须插在结尾那个 / 的前面，否则会拼出
    // "<img src=x / loading=lazy>"，Vue 模板编译直接报 Illegal '/' in tags。
    const selfClose = /\/\s*$/.test(attrs)
    const body = selfClose ? attrs.replace(/\/\s*$/, '') : attrs

    const srcMatch = /\bsrc\s*=\s*["']?([^"'\s>]+)/i.exec(body)
    const dim = srcMatch ? sizeFor(srcMatch[1]) : null
    // 数字后面必须是引号收尾或空白/标签结束，否则 width="90%" 会被误判成像素宽度 90。
    const wAttr = /\bwidth\s*=\s*["']?(\d+)["']?(?=[\s/>]|$)/i.exec(body)
    const hAttr = /\bheight\s*=\s*["']?(\d+)["']?/i.exec(body)
    const anyWidth = /\bwidth\s*=/i.test(body)
    const anyHeight = /\bheight\s*=/i.test(body)

    let extra = ' loading="lazy" decoding="async"'
    if (dim) {
      if (!anyWidth && !anyHeight) {
        extra = ' width="' + dim[0] + '" height="' + dim[1] + '"' + extra
      } else if (wAttr && !anyHeight && dim[0] > 0) {
        // 作者只写死了像素宽度（width="600"），高度得按原图比例补上，
        // 否则浏览器在图片到达前不知道要多高，正文会被顶下去。
        // 不是纯数字的宽度（width="90%"）说明宽度是弹性的，这时补像素高度会把图压变形，只能作罢。
        extra = ' height="' + Math.round((Number(wAttr[1]) * dim[1]) / dim[0]) + '"' + extra
      }
    }
    return '<img' + body + extra + (selfClose ? ' />' : '>')
  })
}

export function decorateHtml(html: string): string {
  if (!html || html.indexOf('<img') === -1) return html
  return decorateImgTag(html)
}
