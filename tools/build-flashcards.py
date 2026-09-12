#!/usr/bin/env python
"""
Generate Anki flashcards from the notes:
  - every glossary row  (Term -> Meaning)
  - every "Quick Q" / rapid-fire Q->A bullet across all note files

Outputs (in the parent folder, next to the PDF):
  React-Fullstack-Flashcards.apkg   (import into Anki directly)
  React-Fullstack-Flashcards.csv    (front,back,tags — universal fallback)

Run:  pip install genanki ; python tools/build-flashcards.py
"""
import os, re, csv, glob, html, genanki

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TOOLS = os.path.dirname(__file__)
APKG = os.path.join(BASE, "React-Fullstack-Flashcards.apkg")
CSVP = os.path.join(BASE, "React-Fullstack-Flashcards.csv")

cards = []  # (front, back, tag)

# 1) Glossary tables -> cards
gloss = open(os.path.join(TOOLS, "glossary.md"), encoding="utf-8").read()
section = "glossary"
for line in gloss.split("\n"):
    h = re.match(r"##\s+(.*)", line)
    if h:
        section = re.sub(r"[^a-z0-9]+", "-", h.group(1).lower()).strip("-"); continue
    m = re.match(r"\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$", line)
    if m:
        a, b = m.group(1).strip(), m.group(2).strip()
        if a.lower() in ("term", "question") or set(a) <= set("-: "):
            continue
        cards.append((a, b, section))

# 2) Q->A bullets across all note files
REPOS = ["react19-topics", "react19-nestjs-api", "nestjs-microservices"]
files = []
for r in REPOS:
    files += glob.glob(os.path.join(BASE, r, "docs", "**", "*.md"), recursive=True)
    files += glob.glob(os.path.join(BASE, r, "src", "**", "*.notes.md"), recursive=True)

def strip_md(s):
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)   # bold
    s = re.sub(r"`(.+?)`", r"\1", s)          # inline code
    return s.strip(" -*")

seen = set()
for f in files:
    if os.path.basename(f).lower() == "readme.md":
        continue
    tag = os.path.splitext(os.path.basename(f))[0]
    for line in open(f, encoding="utf-8").read().split("\n"):
        s = line.strip()
        if not s.startswith("-"):
            continue
        body = s[1:].strip()
        # split on an arrow if a question precedes it
        arrow = re.split(r"\s*(?:→|->)\s*", body, maxsplit=1)
        if len(arrow) == 2 and "?" in arrow[0]:
            front, back = strip_md(arrow[0]), strip_md(arrow[1])
        else:
            # bold-question rapid-fire: - **What is X?** answer
            m = re.match(r"\*\*(.+?\?)\*\*\s*(.+)", body)
            if not m:
                continue
            front, back = strip_md(m.group(1)), strip_md(m.group(2))
        if len(front) < 4 or len(back) < 2:
            continue
        key = front.lower()
        if key in seen:
            continue
        seen.add(key)
        cards.append((front, back, tag))

# ---- write CSV ----
with open(CSVP, "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    for front, back, tag in cards:
        w.writerow([front, back, tag])

# ---- write .apkg ----
model = genanki.Model(
    1607392319, "Basic QA",
    fields=[{"name": "Front"}, {"name": "Back"}],
    templates=[{"name": "Card 1",
                "qfmt": "{{Front}}",
                "afmt": '{{FrontSide}}<hr id="answer">{{Back}}'}],
    css=".card{font-family:Arial;font-size:16px;color:#222;background:#fff;text-align:left;padding:16px;}"
        "hr{border:0;border-top:1px solid #ccc;margin:10px 0;}",
)
deck = genanki.Deck(2059400110, "React Full-Stack Interview")
for front, back, tag in cards:
    deck.add_note(genanki.Note(model=model, fields=[html.escape(front), html.escape(back)], tags=[tag]))
genanki.Package(deck).write_to_file(APKG)

print(f"cards: {len(cards)}")
print("csv :", CSVP)
print("apkg:", APKG)
