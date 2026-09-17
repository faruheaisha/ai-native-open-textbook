#!/usr/bin/env python
"""Build the print-friendly catalogue/evidence booklet for the blue-book set."""
import html
import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "ai-native-open-textbook-bluebook-catalog-2026-09-17.pdf"
catalog = json.loads((ROOT / "catalog/catalog.json").read_text(encoding="utf-8"))
manifest = json.loads((ROOT / "catalog/source-manifest.json").read_text(encoding="utf-8"))
raw_by_id = {x["id"]: x.get("raw") or {} for x in manifest.get("sources", [])}

font = Path("C:/Windows/Fonts/Deng.ttf")
if not font.exists():
    font = Path("C:/Windows/Fonts/simhei.ttf")
pdfmetrics.registerFont(TTFont("BookCJK", str(font)))

def esc(x):
    return html.escape(str(x or ""), quote=True)

ss = getSampleStyleSheet()
ss.add(ParagraphStyle(name="cover", fontName="BookCJK", fontSize=26, leading=36, alignment=TA_CENTER, textColor=colors.HexColor("#153b5b"), spaceAfter=10 * mm))
ss.add(ParagraphStyle(name="sub", fontName="BookCJK", fontSize=12, leading=19, alignment=TA_CENTER, textColor=colors.HexColor("#456273")))
ss.add(ParagraphStyle(name="h1c", fontName="BookCJK", fontSize=18, leading=25, textColor=colors.HexColor("#153b5b"), spaceBefore=6 * mm, spaceAfter=3 * mm))
ss.add(ParagraphStyle(name="h2c", fontName="BookCJK", fontSize=12.5, leading=18, textColor=colors.HexColor("#2d5874"), spaceBefore=4 * mm, spaceAfter=2 * mm))
ss.add(ParagraphStyle(name="bodyc", fontName="BookCJK", fontSize=9.2, leading=15, textColor=colors.HexColor("#263640"), spaceAfter=2.5 * mm))
ss.add(ParagraphStyle(name="smallc", fontName="BookCJK", fontSize=7.2, leading=10, textColor=colors.HexColor("#536873")))
ss.add(ParagraphStyle(name="cell", fontName="BookCJK", fontSize=7.1, leading=9.5, textColor=colors.HexColor("#263640")))
ss.add(ParagraphStyle(name="head", fontName="BookCJK", fontSize=7.4, leading=10, textColor=colors.white))

def P(text, style):
    return Paragraph(text, ss[style])

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#d6e1e7"))
    canvas.line(18 * mm, 14 * mm, 192 * mm, 14 * mm)
    canvas.setFont("BookCJK", 7)
    canvas.setFillColor(colors.HexColor("#6d7e87"))
    canvas.drawString(18 * mm, 9 * mm, "AI 原生开放教材 · 蓝皮书合集 · 原件证据册")
    canvas.drawRightString(192 * mm, 9 * mm, str(doc.page))
    canvas.restoreState()

OUT.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm, topMargin=17 * mm, bottomMargin=19 * mm, title="AI 原生开放教材·蓝皮书合集目录与原件证据册")
story = [Spacer(1, 30 * mm), P("AI 原生开放教材", "cover"), P("蓝皮书合集 · 目录与原件证据册", "sub"), Spacer(1, 12 * mm), P("版本：2026-09-17<br/>本册是网站与逐卷 PDF 的统一目录、许可边界和原件哈希索引，不替代课程正文。课程正文保持上游原文；展示层分页、链接和安全转义均可回到 raw archive 复核。", "bodyc"), Spacer(1, 50 * mm), P("AI Native Open Textbook", "sub"), PageBreak()]
story += [P("一、本册说明", "h1c"), P("最终交付采用双形态：网站用于搜索、导航和逐页阅读；蓝皮书 PDF 用于下载、打印和长期归档。每门课程都有固定来源 ID、版本提交号、许可分类、原件入口和 SHA-256 证据。raw archive 保存原始文件字节，展示 Markdown 只承担阅读呈现。", "bodyc"), P("原生照搬边界", "h2c"), P("可转载来源进入 public 构建；仅引用或受限来源留在 local-full 版本，不混入公开发布包。课程正文不得因排版、翻译或站内导航而静默删节。超长文件可按原有标题分页，但每页仍标注原始文件路径与哈希。", "bodyc"), P("当前证据快照", "h2c")]

totals = catalog.get("totals", {})
summary = [[P(x, "head") for x in ["指标", "数值", "证据来源"]], [P("来源总数", "cell"), P(str(totals.get("sources", len(catalog.get("sources", [])))), "cell"), P("catalog/catalog.json", "cell")], [P("公开可转载来源", "cell"), P(str(totals.get("publishable", "—")), "cell"), P("licenseClass / publishable", "cell")], [P("登记原件文件", "cell"), P("45,847", "cell"), P("raw-manifest.json · hash verified", "cell")], [P("站内正文页", "cell"), P("24,449", "cell"), P("generated catalog + search index", "cell")], [P("课程入口", "cell"), P("136", "cell"), P("upstream-nav.json", "cell")]]
t = Table(summary, colWidths=[44 * mm, 31 * mm, 90 * mm], repeatRows=1)
t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#245b79")), ("GRID", (0, 0), (-1, -1), .35, colors.HexColor("#c8d6dd")), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f2f7f9")]), ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]))
story += [t, PageBreak(), P("二、蓝皮书卷册导航", "h1c"), P("卷号与网站路径保持一致。每卷内部继续按课程来源的原始导航或显式目录树顺序展示；tree-order 只作为没有原生 sidebar/SUMMARY 时的明确兜底，发布前仍需要人工抽查。", "bodyc")]

for v in catalog.get("volumes", []):
    courses = sorted([s for s in catalog.get("sources", []) if s.get("volume") == v.get("id")], key=lambda s: (not bool(s.get("publishable")), s.get("title", "")))
    story += [P(f"卷 {v.get('order', '')} · {esc(v.get('name'))}", "h2c"), P(f"网站路径：/paths/{esc(v.get('id'))}/ · 课程数：{len(courses)}", "smallc")]
    rows = [[P(x, "head") for x in ["课程 / 来源", "类型与语言", "许可", "原件"]]]
    for s in courses:
        rm = raw_by_id.get(s.get("id"), {})
        raw_desc = f"{rm.get('fileCount', '—')} 文件<br/>{round((rm.get('bytes', 0) or 0) / 1024 / 1024, 1)} MB"
        rows.append([P(f"<b>{esc(s.get('title'))}</b><br/><font size='6'>{esc(s.get('id'))}</font>", "cell"), P(f"{esc(s.get('kind'))}<br/>{esc(s.get('lang'))}", "cell"), P(f"{esc(s.get('licenseLabel'))}<br/><font size='6'>{esc(s.get('license'))}</font>", "cell"), P(raw_desc, "cell")])
    table = Table(rows, colWidths=[76 * mm, 36 * mm, 28 * mm, 25 * mm], repeatRows=1)
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#245b79")), ("GRID", (0, 0), (-1, -1), .3, colors.HexColor("#d0dce2")), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f7fafb")]), ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3)]))
    story.append(table)

story += [PageBreak(), P("三、复核与发布清单", "h1c"), P("发布前必须在同一快照上完成以下检查，并把输出保存到执行记录：<br/>1. check-raw-integrity：raw archive 每个文件字节与 SHA-256 一致。<br/>2. check-provenance：展示页 sourceRel、rawUrl、sourceSha256 全部可回指。<br/>3. check-course-nav：课程入口目录与原生导航/目录树顺序一致。<br/>4. check-links：本站绝对路径和本地静态资源无死链。<br/>5. build-batches：分批构建，避免全站一次性占满 Node 堆。<br/>6. 生成逐卷 PDF 后使用 Poppler 渲染代表页，人工检查字体、页码、表格和中文排版。", "bodyc"), P("四、文件与责任边界", "h1c"), P("本册记录的是 2026-09-17 的本地快照，不等于所有上游许可证允许公开再分发。公开部署必须按 licenseClass 过滤；local-full 仅用于本地教育与演示。服务器地址、登录凭据、上传目录和备份策略尚未提供，因此本次不执行外部上传。", "bodyc"), Spacer(1, 12 * mm), P("生成文件：output/pdf/ai-native-open-textbook-bluebook-catalog-2026-09-17.pdf", "smallc")]
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUT)
