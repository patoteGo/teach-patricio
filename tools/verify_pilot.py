#!/usr/bin/env python3
"""Pilot check: split repertoire (hub + p1..p15 pages) is DOM-equivalent to the
original monolith.

- hub body == original body minus the 15 <section class="pattern"> event ranges
- each pN.html body contains its original section's event sequence, in order
  (subsequence match -- pattern pages add only the prev/next nav)
- normalization: emoji chars in original text are the Phosphor <i> icons in the
  build (dropped from both sides); original anchors #pN are pN.html in the build

Usage: python3 tools/verify_pilot.py [original.html] [dist reference dir]
"""

import os
import sys
from html.parser import HTMLParser

A = sys.argv[1] if len(sys.argv) > 1 else "tools/repertoire.original.html"
DIR = (
    sys.argv[2] if len(sys.argv) > 2 else "dist/topics/system-design-practice/reference"
)

EMOJIS = "\u2b21\U0001f5e3\U0001f648\U0001f441\ufe0f"
VOID = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}


class Events(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.events = []

    def handle_starttag(self, tag, attrs):
        self.events.append(("tag", tag, tuple(sorted(attrs))))

    def handle_startendtag(self, tag, attrs):
        self.events.append(("tag", tag, tuple(sorted(attrs))))
        if tag not in VOID:
            self.events.append(("/tag", tag))

    def handle_endtag(self, tag):
        self.events.append(("/tag", tag))

    def handle_data(self, data):
        collapsed = " ".join(data.split())
        if collapsed:
            self.events.append(("text", collapsed))


def load(path):
    with open(
        path, encoding="utf-8"
    ) as fh:  # pi-lens-ignore: ast-grep:unchecked-throwing-call-js
        p = Events()
        p.feed(fh.read())
        p.close()
        return p.events


def norm_orig(evts):
    """Original side: strip emoji chars, rewrite #pN anchors to pN.html."""
    out = []
    for e in evts:
        if e[0] == "text":
            t = e[1]
            for ch in EMOJIS:
                t = t.replace(ch, "")
            t = " ".join(t.split())
            if not t:
                continue
            out.append(("text", t))
        elif e[0] == "tag" and e[1] == "a":
            attrs = tuple(
                (k, (v[1:] + ".html" if k == "href" and v.startswith("#p") else v))
                for k, v in e[2]
            )
            out.append(("tag", "a", attrs))
        else:
            out.append(e)
    return out


def norm_built(evts):
    """Built side: drop Phosphor <i> icon events (font glyphs, no text)."""
    out, skip_i = [], False
    for e in evts:
        if (
            e[0] == "tag"
            and e[1] == "i"
            and any(c[1].startswith("ph") for c in e[2] if c[0] == "class")
        ):
            skip_i = True
            continue
        if skip_i and e[0] == "/tag" and e[1] == "i":
            skip_i = False
            continue
        out.append(e)
    return out


def body_from(evts):
    for i, e in enumerate(evts):
        if e[0] == "tag" and e[1] == "body":
            return evts[i + 1 :]
    return evts


def section_ranges(body):
    """[(start, end) inclusive] for each pattern section, by id attr."""
    ranges, start = [], None
    for i, e in enumerate(body):
        if (
            e[0] == "tag"
            and e[1] == "section"
            and any(
                k == "id" and v.startswith("p") and v[1:].isdigit() for k, v in e[2]
            )
        ):
            start = i
        elif e[0] == "/tag" and e[1] == "section" and start is not None:
            ranges.append((start, i))
            start = None
    return ranges


def is_subseq(needle, hay):
    it = iter(hay)
    return all(any(x == y for y in it) for x in needle)


orig = norm_orig(load(A))
obody = body_from(orig)
ranges = section_ranges(obody)
assert len(ranges) == 15, f"expected 15 sections in original, found {len(ranges)}"

fail = 0

# --- hub: original minus sections, exact ---
hub_expected = [
    e for i, e in enumerate(obody) if not any(s <= i <= t for s, t in ranges)
]
hub_built = norm_built(body_from(load(os.path.join(DIR, "repertoire.html"))))
if hub_expected != hub_built:
    for i, (x, y) in enumerate(zip(hub_expected, hub_built)):  # noqa: zip-strict (py3.9)
        if x != y:
            print(f"HUB DIVERGENCE at {i}:\n  expected: {x}\n  built:   {y}")
            break
    else:
        longer = hub_expected if len(hub_expected) > len(hub_built) else hub_built
        print(
            f"HUB LENGTH MISMATCH {len(hub_expected)} vs {len(hub_built)}; tail: {longer[min(len(hub_expected), len(hub_built)) :][:5]}"
        )
    fail += 1
else:
    print(f"hub OK ({len(hub_expected)} events)")

# --- each pattern page: its section is a subsequence ---
for n, (s, t) in enumerate(ranges, 1):
    sec = obody[s : t + 1]
    page = os.path.join(DIR, f"p{n}.html")
    if not os.path.exists(page):
        print(f"p{n}.html MISSING")
        fail += 1
        continue
    pb = norm_built(body_from(load(page)))
    if is_subseq(sec, pb):
        print(f"p{n}.html OK ({len(sec)} section events in {len(pb)})")
    else:
        print(f"p{n}.html FAIL: section not found in order")
        fail += 1

# --- required head assets on hub + one pattern page ---
need = [
    ("link", "style.css"),
    ("link", "dark.css"),
    ("link", "i18n.css"),
    ("link", "exercises.css"),
    ("script", "i18n.js"),
    ("script", "nav.js"),
    ("script", "exercises.js"),
    ("script", "phosphor"),
]
for page in ["repertoire.html", "p1.html"]:
    head = load(os.path.join(DIR, page))
    have = {
        (e[1], v)
        for e in head
        if e[0] == "tag"
        for _, v in e[2]
        if _ == "src" or _ == "href"
    }
    for tag, marker in need:
        if not any(marker in h[1] for h in have if h[0] == tag):
            print(f"{page}: missing {tag} ~ {marker}")
            fail += 1
print("head assets OK" if not fail else "")

# stray emoji check across everything we generate
stray = []
for f in [
    os.path.join(DIR, x)
    for x in ["repertoire.html"] + [f"p{n}.html" for n in range(1, 16)]
]:
    with open(
        f, encoding="utf-8"
    ) as fh:  # pi-lens-ignore: ast-grep:unchecked-throwing-call-js
        s = fh.read()
    for ch in "\U0001f648\U0001f441\u2b21\U0001f5e3\ufe0f":
        if ch in s:
            stray.append((os.path.basename(f), ch))
if stray:
    print("STRAY EMOJIS:", stray)
    fail += 1
else:
    print("no emojis in built pages")

sys.exit(1 if fail else 0)
