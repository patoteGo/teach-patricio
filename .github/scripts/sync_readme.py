#!/usr/bin/env python3
"""Regenerate the topic & lesson catalog in README.md from topics/*/.

Multi-topic layout: each directory under topics/ is one learning workspace
(MISSION.md, lessons/, …). This script discovers them, lists their lessons,
and writes a catalog block between <!-- topics:start --> and <!-- topics:end -->.

Directories starting with `_` or `.` are skipped (e.g. topics/_template).
Idempotent — safe to run locally or via .github/workflows/sync-lessons.yml.
"""

import re
import sys
from html import unescape
from pathlib import Path

# .github/scripts/sync_readme.py -> repo root
ROOT = Path(__file__).resolve().parent.parent.parent
# Lessons live as Astro pages (post-migration); they build to <slug>.html.
TOPICS = ROOT / "src" / "pages" / "topics"
SRC_BASE = "./src/pages/topics"
README = ROOT / "README.md"

START = "<!-- topics:start -->"
END = "<!-- topics:end -->"

# Strip a leading "<Anything> · Lesson N — " or bare "Lesson N — " prefix.
PREFIX_RE = re.compile(r"^.*?(?:Lesson|Lição)\s*\d+\s*[—–-]\s*", re.I)


def lesson_title(astro: str) -> str:
    # Frontmatter consts: prefer the Portuguese title (site is PT-first).
    for var in ("titlePt", "titleFallback", "titleEn"):
        m = re.search(rf'const {var} = "([^"]*)"', astro)
        if m:
            return unescape(m.group(1).strip()) or "Untitled"
    return "Untitled"


def topic_name(topic_dir: Path) -> str:
    """Display name: the H1 of the topic's MISSION.md, else the dir name."""
    mission = topic_dir / "MISSION.md"
    if mission.exists():
        for line in mission.read_text(encoding="utf-8", errors="replace").splitlines():
            line = line.strip()
            if line.startswith("# "):
                # "# Mission: Master Foo" -> "Master Foo"
                name = line[2:].strip()
                name = re.sub(r"^(mission|topic):\s*", "", name, flags=re.I).strip()
                return name or topic_dir.name
    return topic_dir.name.replace("-", " ").replace("_", " ").title()


def lesson_rows(lessons_dir: Path):
    rows = []
    for f in sorted(lessons_dir.glob("*.astro")):
        try:
            astro = f.read_text(encoding="utf-8", errors="replace")
            title = lesson_title(astro)
            fname = f.stem + ".html"
            head = f.name.split("-", 1)[0]
            num = int(head) if head.isdigit() else len(rows) + 1
            rows.append((num, title, fname))
        except OSError as e:
            print(f"skip {f}: {e}", file=sys.stderr)
    return rows


def discover_topics():
    if not TOPICS.exists():
        return []
    topics = []
    for d in sorted(TOPICS.iterdir()):
        if not d.is_dir() or d.name.startswith((".", "_")):
            continue
        lessons_dir = d / "lessons"
        if not lessons_dir.exists():
            continue
        rows = lesson_rows(lessons_dir)
        topics.append((d.name, topic_name(d), rows))
    return topics


def build_catalog(topics):
    if not topics:
        return ["_(No topics yet — copy `topics/_template/` to start one.)_"]
    lines = []
    total = 0
    for slug, name, rows in topics:
        total += len(rows)
        lines.append(f"### {name}")
        lines.append("")
        lines.append(f"`{SRC_BASE}/{slug}/` · {len(rows)} lesson(s)")
        lines.append("")
        if rows:
            lines += ["| # | Lesson |", "|---|--------|"]
            for num, title, fname in rows:
                lines.append(
                    f"| {num:02d} | [{title}]({SRC_BASE}/{slug}/lessons/{fname}) |"
                )
        else:
            lines.append("_(no lessons yet)_")
        lines.append("")
    lines.append(f"**Total: {total} lesson(s) across {len(topics)} topic(s).**")
    return lines


def main():
    if not README.exists():
        sys.exit(f"README.md not found at {README}")
    topics = discover_topics()
    catalog = build_catalog(topics)
    readme = README.read_text(encoding="utf-8")
    if START not in readme or END not in readme:
        sys.exit(
            "README.md is missing the <!-- topics:start --> / <!-- topics:end --> markers"
        )
    block = START + "\n" + "\n".join(catalog) + "\n" + END
    readme = re.sub(
        re.escape(START) + r".*?" + re.escape(END),
        lambda _m: block,
        readme,
        flags=re.S,
    )
    README.write_text(readme, encoding="utf-8")
    print(f"synced {len(topics)} topic(s)")


if __name__ == "__main__":
    main()
