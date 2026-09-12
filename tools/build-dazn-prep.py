#!/usr/bin/env python
"""Compile the DAZN Round-1 prep pack (interview-prep/*.md) into one PDF."""
import os, glob, re, html as ihtml, markdown
from xhtml2pdf import pisa
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping
from xhtml2pdf.default import DEFAULT_FONT

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BASE = os.path.abspath(os.path.join(REPO, ".."))
SRC = os.path.join(REPO, "interview-prep")
OUT = os.path.join(BASE, "DAZN-Round1-Prep.pdf")

def font_dir():
    import matplotlib
    return os.path.join(os.path.dirname(matplotlib.__file__), "mpl-data", "fonts", "ttf")
FD = font_dir(); fp = lambda n: os.path.join(FD, n)
pdfmetrics.registerFont(TTFont("DV", fp("DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("DV-b", fp("DejaVuSans-Bold.ttf")))
pdfmetrics.registerFont(TTFont("DV-i", fp("DejaVuSans-Oblique.ttf")))
pdfmetrics.registerFont(TTFont("DV-bi", fp("DejaVuSans-BoldOblique.ttf")))
pdfmetrics.registerFont(TTFont("DVM", fp("DejaVuSansMono.ttf")))
addMapping("DV",0,0,"DV"); addMapping("DV",1,0,"DV-b"); addMapping("DV",0,1,"DV-i"); addMapping("DV",1,1,"DV-bi"); addMapping("DVM",0,0,"DVM")
DEFAULT_FONT["dv"]="DV"; DEFAULT_FONT["dvm"]="DVM"

DOCS = [
    ("01-js-implement-utils.md", "JS Implement-This Utilities"),
    ("02-event-loop-puzzles.md", "Event Loop & Output Puzzles"),
    ("03-react-drills.md", "React Coding Drills"),
    ("04-ts-quickhits.md", "TypeScript Quick-Hits"),
    ("05-html-css-quickhits.md", "HTML5 & CSS3 Quick-Hits"),
    ("06-node-quickhits.md", "Node.js Quick-Hits"),
    ("07-ds-patterns.md", "Data Structures & Problem-Solving"),
    ("08-dazn-notes.md", "DAZN Angles & Session Plan"),
]

CSS = """
@page { size: A4; margin: 2cm 1.6cm; @frame footer { -pdf-frame-content: footerContent; bottom: 1cm; height: 1cm; } }
body { font-family: "dv"; font-size: 9.5pt; line-height: 1.4; color: #1a1a1a; }
h1 { font-size: 19pt; color: #0b3d5c; border-bottom: 2pt solid #0b3d5c; padding-bottom: 4pt; }
h2 { font-size: 13pt; color: #0b3d5c; margin-top: 12pt; border-bottom: 1pt solid #ccc; }
h3 { font-size: 11pt; color: #145a86; margin-top: 9pt; }
code { font-family: "dvm"; font-size: 8.5pt; background: #f0f0f0; }
pre { font-family: "dvm"; font-size: 7.5pt; background: #f5f5f5; border: 1pt solid #ddd; padding: 6pt; }
table { width: 100%; font-size: 8.5pt; margin: 6pt 0; }
th, td { border: 1pt solid #bbb; padding: 3pt 5pt; text-align: left; }
th { background: #e8eef2; }
a { color: #145a86; text-decoration: none; }
.doc { page-break-before: always; }
.cover { text-align: center; }
.cover h1 { font-size: 26pt; margin-top: 30%; border: none; }
.cover p { color: #555; font-size: 11pt; }
.toc .doc-line { margin-left: 8pt; font-size: 10pt; }
"""

def md2html(t):
    return markdown.markdown(t, extensions=["tables","fenced_code","sane_lists"])

toc = ['<div class="toc"><h1>Contents</h1>']
docs = []
for i,(f,title) in enumerate(DOCS):
    a=f"d{i}"
    toc.append(f'<div class="doc-line"><a href="#{a}">{ihtml.escape(title)}</a></div>')
    docs.append(f'<div class="doc" id="{a}">{md2html(open(os.path.join(SRC,f),encoding="utf-8").read())}</div>')
toc.append("</div>")

cover=('<div class="cover"><h1>DAZN Round-1<br/>Technical Prep</h1>'
       '<p>Advanced JS/TS | HTML5 & CSS3 | React | Node | DS & Problem Solving | Coding Exercise</p>'
       '<p>&nbsp;</p><p>Implement-this utils, event-loop puzzles, React drills, DS patterns</p></div>')
footer='<div id="footerContent" style="text-align:center;color:#999;font-size:7pt;">DAZN Round-1 Technical Prep - <pdf:pagenumber></div>'
full=f"<html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{footer}{cover}{''.join(toc)}{''.join(docs)}</body></html>"
with open(OUT,"wb") as o:
    r=pisa.CreatePDF(full,dest=o,encoding="utf-8")
print("errors:",r.err,"->",OUT)
