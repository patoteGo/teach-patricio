#!/usr/bin/env python3
"""Regenerate the 'Completed lessons' table in README.md from lessons/*.html.

Idempotent — run locally or via .github/workflows/sync-lessons.yml.
A lesson file's existence == "done"; planned lessons live in the README
Roadmap section, which this script never touches.
"""
import re
import sys
from html import unescape
from pathlib import Path

# .github/scripts/sync_readme.py -> repo root
ROOT = Path(__file__).resolve().parent.parent.parent
LESSONS = ROOT / "lessons"
README = ROOT / "README.md"

START = "<!-- lessons:start -->"
END = "<!-- lessons:end -->"
PREFIX_RE = r"^Pi\s*[·•]\s*Lesson\s*\d+\s*[—–-]\s*"


def lesson_rows():
    files = sorted(LESSONS.glob("*.html"))
    if not files:
        sys.exit("no lessons found in lessons/")
    rows = []
    for f in files:
        try:  # skip a malformed lesson instead of aborting the whole sync
            html = f.read_text(encoding="utf-8", errors="replace")
            m = re.search(r"<title>(.*?)</title>", html, re.S | re.I)
            raw = unescape(m.group(1).strip()) if m else ""
            title = re.sub(PREFIX_RE, "", raw, flags=re.I).strip()
            if not title:  # fall back to a prettified filename
                title = re.sub(r"^\d+-", "", f.stem).replace("-", " ").title()
            head = f.name.split("-", 1)[0]
            num = int(head) if head.isdigit() else len(rows) + 1
            rows.append((num, title, f.name))
        except (OSError, ValueError) as e:
            print(f"skip {f.name}: {e}", file=sys.stderr)
    return rows


def build_table(rows):
    lines = ["| # | Lesson | Status |", "|---|--------|--------|"]
    for num, title, name in rows:
        link = f"./lessons/{name}"
        lines.append(f"| {num:02d} | [{title}]({link}) | ✅ Done |")
    return lines


def splice(readme, lines):
    assert START in readme and END in readme, "README lesson markers missing"
    block = START + "\n" + "\n".join(lines) + "\n" + END
    return re.sub(
        re.escape(START) + r".*?" + re.escape(END),
        lambda _m: block,
        readme,
        flags=re.S,
    )


def sync_badge(readme, count):
    readme = re.sub(
        r"lessons-\d+%20%2F%20~07",
        f"lessons-{count:02d}%20%2F%20~07",
        readme,
    )
    return re.sub(
        r'alt="lessons-\d+ / ~07"',
        f'alt="lessons-{count:02d} / ~07"',
        readme,
    )


def main():
    rows = lesson_rows()
    table = build_table(rows)
    readme = README.read_text(encoding="utf-8")
    readme = splice(readme, table)
    readme = sync_badge(readme, len(rows))
    README.write_text(readme, encoding="utf-8")
    print(f"synced {len(rows)} lesson(s)")


if __name__ == "__main__":
    main()
