# Notes → PDF builder

Compiles all study notes + architect cheat-sheets from the three learning repos
into one PDF (`React-Fullstack-Interview-Notes.pdf`) with a cover, table of contents,
glossary/cheat-sheet, embedded Unicode font, and first-use acronym expansion.

## Expected layout (repos as siblings)
```
<parent>/react19-topics/          (this repo)
<parent>/react19-nestjs-api/
<parent>/nestjs-microservices/
```

## Run
```bash
pip install markdown xhtml2pdf pygments matplotlib
python tools/build-notes-pdf.py
# -> <parent>/React-Fullstack-Interview-Notes.pdf
```

## Files
- `build-notes-pdf.py` — the builder (edit `PARTS` to add/reorder docs, `ABBR` for
  acronym expansions).
- `glossary.md` — the front cheat-sheet (edit to taste).

Notes live as Markdown in each repo (the source of truth); re-run to regenerate the
PDF after edits.
