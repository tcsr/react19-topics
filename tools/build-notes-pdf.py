#!/usr/bin/env python
"""
Build one PDF from all study notes across the three learning repos.

Layout expected (the three repos are SIBLINGS under one parent folder):
    <parent>/react19-topics/        (this repo; run the script from here)
    <parent>/react19-nestjs-api/
    <parent>/nestjs-microservices/

Requirements:  pip install markdown xhtml2pdf pygments matplotlib
  (matplotlib is only used for its bundled DejaVu Unicode fonts so arrows / dashes
   / bullets render; swap FDIR for any folder holding DejaVuSans*.ttf if preferred.)

Run:  python tools/build-notes-pdf.py
Output:  <parent>/React-Fullstack-Interview-Notes.pdf
"""
import os, glob, re, sys, html as ihtml
import markdown
from xhtml2pdf import pisa
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.fonts import addMapping
from xhtml2pdf.default import DEFAULT_FONT

# BASE = parent folder that holds the three repos (two levels up from this file).
BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(BASE, "React-Fullstack-Interview-Notes.pdf")


def find_font_dir():
    candidates = glob.glob(os.path.join(os.path.expanduser("~"),
        "AppData/Roaming/Python/Python*/site-packages/matplotlib/mpl-data/fonts/ttf"))
    try:
        import matplotlib
        candidates.insert(0, os.path.join(os.path.dirname(matplotlib.__file__),
                                           "mpl-data", "fonts", "ttf"))
    except Exception:
        pass
    for c in candidates:
        if os.path.exists(os.path.join(c, "DejaVuSans.ttf")):
            return c
    sys.exit("DejaVuSans.ttf not found. Install matplotlib or point FDIR at a DejaVu folder.")


FDIR = find_font_dir()
def fp(n): return os.path.join(FDIR, n)
pdfmetrics.registerFont(TTFont("DV", fp("DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("DV-b", fp("DejaVuSans-Bold.ttf")))
pdfmetrics.registerFont(TTFont("DV-i", fp("DejaVuSans-Oblique.ttf")))
pdfmetrics.registerFont(TTFont("DV-bi", fp("DejaVuSans-BoldOblique.ttf")))
pdfmetrics.registerFont(TTFont("DVM", fp("DejaVuSansMono.ttf")))
addMapping("DV", 0, 0, "DV"); addMapping("DV", 1, 0, "DV-b")
addMapping("DV", 0, 1, "DV-i"); addMapping("DV", 1, 1, "DV-bi")
addMapping("DVM", 0, 0, "DVM")
DEFAULT_FONT["dv"] = "DV"; DEFAULT_FONT["dvm"] = "DVM"

PARTS = [
    ("Part 1 - Frontend: React 19 + React Query", "react19-topics", [
        ("docs/notes/01-core.md","Core"),("docs/notes/02-hooks.md","Hooks"),
        ("docs/notes/03-react19.md","React 19 Features"),("docs/notes/04-advanced.md","Advanced"),
        ("docs/notes/05-routing.md","Routing"),("docs/notes/06-state-management.md","State Management"),
        ("docs/notes/07-performance.md","Performance"),("docs/notes/08-typescript.md","TypeScript in React"),
        ("docs/notes/09-testing.md","Testing"),("docs/notes/10-react-query.md","React Query"),
        ("src/topics/react19/server-components/ServerComponents.notes.md","React Server Components (RSC)"),
        ("docs/architecture/rendering-strategies.md","Rendering Strategies"),
        ("docs/architecture/fiber-and-concurrency.md","Fiber & Concurrency"),
        ("docs/architecture/state-management-decision.md","State Management Decision"),
        ("docs/architecture/data-fetching-and-caching.md","Data Fetching & Caching"),
        ("docs/architecture/auth.md","Auth (Frontend)"),("docs/architecture/security.md","Security (Frontend)"),
        ("docs/architecture/api-layer.md","API Layer"),("docs/architecture/realtime.md","Real-Time"),
        ("docs/architecture/pwa-offline.md","PWA & Offline"),
        ("docs/architecture/web-vitals-performance.md","Web Vitals & Performance"),
        ("docs/architecture/styling-architecture.md","Styling Architecture"),
        ("docs/architecture/accessibility.md","Accessibility"),
        ("docs/architecture/folder-architecture.md","Folder Architecture"),
        ("docs/architecture/micro-frontends-and-monorepo.md","Micro-Frontends & Monorepo"),
        ("docs/architecture/interview-rapid-fire.md","Rapid-Fire Drill"),
    ]),
    ("Part 2 - Backend: Node, NestJS, PostgreSQL", "react19-nestjs-api", [
        ("docs/notes/node.md","Node.js"),("docs/notes/nestjs.md","NestJS"),
        ("docs/notes/prisma.md","Prisma + PostgreSQL"),("docs/notes/sql.md","PostgreSQL Queries"),
        ("docs/notes/ddd.md","Domain-Driven Design"),("docs/notes/caching-redis.md","Caching & Redis"),
        ("docs/notes/queues-bullmq.md","Async Jobs & Queues (BullMQ)"),
        ("docs/notes/auth.md","Authentication & Authorization"),("docs/notes/observability.md","Observability"),
        ("docs/architecture/postgresql.md","PostgreSQL (deep)"),
        ("docs/architecture/backend-system-design.md","Backend System Design"),
        ("docs/architecture/ddd.md","DDD (deep)"),
        ("docs/architecture/production-database-practices.md","Production Database Practices"),
    ]),
    ("Part 3 - Microservices: Kafka, Sagas, Distributed Systems", "nestjs-microservices", [
        ("docs/notes/microservices-fundamentals.md","Fundamentals"),
        ("docs/notes/communication.md","Communication"),("docs/notes/kafka.md","Apache Kafka"),
        ("docs/notes/saga.md","Sagas & Distributed Transactions"),
        ("docs/notes/patterns.md","Distributed Data Patterns"),("docs/notes/resilience.md","Resilience"),
        ("docs/notes/observability-deployment.md","Observability & Deployment"),
        ("docs/architecture/microservices-tradeoffs.md","Microservices Trade-offs"),
    ]),
]

EMOJI = {"✅":"[x] ","⚠️":"[!] ","⚠":"[!] ","❌":"[x] ","🟢":"","🔴":"","☕":"","🙏":"","🍷":"","🚀":"","🎯":"","👉":"->","💡":"","📊":"","✔":"[x]"}
def clean(t):
    for k,v in EMOJI.items(): t=t.replace(k,v)
    return t

ABBR = {
    "RSC":"React Server Components","CSR":"Client-Side Rendering","SSR":"Server-Side Rendering",
    "SSG":"Static Site Generation","ISR":"Incremental Static Regeneration","VDOM":"Virtual DOM",
    "HOC":"Higher-Order Component","CWV":"Core Web Vitals","DI":"Dependency Injection",
    "DTO":"Data Transfer Object","ORM":"Object-Relational Mapping","RBAC":"Role-Based Access Control",
    "ABAC":"Attribute-Based Access Control","JWT":"JSON Web Token","OIDC":"OpenID Connect",
    "PKCE":"Proof Key for Code Exchange","DLQ":"Dead Letter Queue",
    "CQRS":"Command Query Responsibility Segregation","MVCC":"Multi-Version Concurrency Control",
    "CTE":"Common Table Expression","ACID":"Atomicity, Consistency, Isolation, Durability",
    "CORS":"Cross-Origin Resource Sharing","XSS":"Cross-Site Scripting","CSRF":"Cross-Site Request Forgery",
    "CSP":"Content Security Policy","SLO":"Service-Level Objective","2PC":"Two-Phase Commit",
    "RPC":"Remote Procedure Call","BFF":"Backend-for-Frontend","HPA":"Horizontal Pod Autoscaler",
    "TTL":"Time To Live","KDF":"Key Derivation Function","PITR":"Point-In-Time Recovery",
    "DDD":"Domain-Driven Design","a11y":"Accessibility","i18n":"Internationalization",
    "ACL":"Anti-Corruption Layer","EOS":"Exactly-Once Semantics","IoC":"Inversion of Control",
}

def expand_abbr(text):
    seen, out, in_fence = set(), [], False
    for line in text.split("\n"):
        if line.lstrip().startswith("```"):
            in_fence = not in_fence; out.append(line); continue
        if in_fence or line.startswith("    "):
            out.append(line); continue
        for acr, full in ABBR.items():
            if acr in seen: continue
            m = re.compile(r"(?<![\w`])" + re.escape(acr) + r"(?![\w])(?!\s*\()").search(line)
            if m:
                line = line[:m.end()] + f" ({full})" + line[m.end():]
                seen.add(acr)
        out.append(line)
    return "\n".join(out)

def md2html(t, expand=True):
    t = clean(t)
    if expand: t = expand_abbr(t)
    return markdown.markdown(t, extensions=["tables","fenced_code","sane_lists"])

GLOSSARY_MD = open(os.path.join(os.path.dirname(__file__), "glossary.md"), encoding="utf-8").read()

CSS = """
@page { size: A4; margin: 2cm 1.6cm; @frame footer { -pdf-frame-content: footerContent; bottom: 1cm; height: 1cm; } }
body { font-family: "dv"; font-size: 9.5pt; line-height: 1.4; color: #1a1a1a; }
h1 { font-size: 20pt; color: #0b3d5c; border-bottom: 2pt solid #0b3d5c; padding-bottom: 4pt; }
h2 { font-size: 14pt; color: #0b3d5c; margin-top: 14pt; border-bottom: 1pt solid #ccc; padding-bottom: 2pt; }
h3 { font-size: 11.5pt; color: #145a86; margin-top: 10pt; }
h4 { font-size: 10pt; color: #145a86; }
code { font-family: "dvm"; font-size: 8.5pt; background: #f0f0f0; }
pre { font-family: "dvm"; font-size: 7.5pt; background: #f5f5f5; border: 1pt solid #ddd; padding: 6pt; }
table { width: 100%; font-size: 8.5pt; margin: 6pt 0; }
th, td { border: 1pt solid #bbb; padding: 3pt 5pt; text-align: left; }
th { background: #e8eef2; }
a { color: #145a86; text-decoration: none; }
.doc { page-break-before: always; }
.part { page-break-before: always; }
.part h1 { font-size: 24pt; margin-top: 38%; text-align: center; border: none; }
.cover { text-align: center; }
.cover h1 { font-size: 28pt; margin-top: 28%; border: none; color: #0b3d5c; }
.cover p { color: #555; font-size: 11pt; }
.toc .part-line { font-weight: bold; color: #0b3d5c; margin-top: 8pt; }
.toc .doc-line { margin-left: 14pt; font-size: 9pt; }
.toc a { color: #1a1a1a; }
"""

def build():
    parts, toc = [], ['<div class="toc"><h1>Contents</h1>']
    toc.append('<div class="doc-line"><a href="#glossary">Glossary & Quick Cheat-Sheet</a></div>')
    glossary_html = f'<div class="doc" id="glossary">{md2html(GLOSSARY_MD, expand=False)}</div>'
    for pi,(pt,repo,files) in enumerate(PARTS,1):
        toc.append(f'<div class="part-line">{ihtml.escape(pt)}</div>')
        parts.append(f'<div class="part"><h1>{ihtml.escape(pt)}</h1></div>')
        for fi,(rel,title) in enumerate(files):
            p=os.path.join(BASE,repo,rel.replace("/",os.sep)); a=f"p{pi}d{fi}"
            toc.append(f'<div class="doc-line"><a href="#{a}">{ihtml.escape(title)}</a></div>')
            if not os.path.exists(p):
                parts.append(f'<div class="doc" id="{a}"><h1>{ihtml.escape(title)}</h1><p><i>missing: {rel}</i></p></div>'); continue
            parts.append(f'<div class="doc" id="{a}">{md2html(open(p,encoding="utf-8").read())}</div>')
    toc.append("</div>")
    cover=('<div class="cover"><h1>React Full-Stack<br/>Interview Notes</h1>'
           '<p>React 19 | React Query | Node | NestJS | PostgreSQL | Prisma</p>'
           '<p>Redis | BullMQ | Auth | Observability | DDD | Kafka Microservices</p>'
           '<p>&nbsp;</p><p>Compiled study + architect-interview notes</p></div>')
    footer='<div id="footerContent" style="text-align:center;color:#999;font-size:7pt;">React Full-Stack Interview Notes - <pdf:pagenumber></div>'
    full=f"<html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{footer}{cover}{''.join(toc)}{glossary_html}{''.join(parts)}</body></html>"
    with open(OUT,"wb") as o:
        res=pisa.CreatePDF(full,dest=o,encoding="utf-8")
    print("errors:", res.err, "->", OUT)

if __name__ == "__main__":
    build()
