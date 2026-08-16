#!/usr/bin/env python3
"""One-shot converter: repertoire.html -> Astro pilot files.

Splits the 6k-line monolith into src/pages/.../repertoire.astro + 15 pattern
components, converting every adjacent <span data-lang="pt">/<span data-lang="en">
pair into a <T pt=`...` en=`...` /> call. All variable content travels inside
backtick template literals (props / set:html), so nothing inside it is parsed by
Astro. Every structural assumption is asserted -- if the source deviates, this
dies loudly instead of dropping content silently.

Usage: python3 tools/convert_repertoire.py [source.html]
"""

import os
import re
import sys

SRC = sys.argv[1] if len(sys.argv) > 1 else "tools/repertoire.original.html"
OUT_PAGE = "src/pages/topics/system-design-practice/reference/repertoire.astro"
OUT_PATTERNS = "src/components/patterns"
RELPAGE = "../../../../"  # from OUT_PAGE dir to src/
BT = "`"

# ---------- pair machinery: find adjacent pt/en span pairs ----------
PT_OPEN = re.compile(r'<span\s+data-lang="pt"\s*>')
EN_OPEN = re.compile(r'\s*<span\s+data-lang="en"\s*>')
TAG = re.compile(
    r"<span\b[^>]*>|</span\b[^>]*>"
)  # tspan does not match (needs literal "<span")


def span_end(src, start):
    """start: index just inside a span. -> (inner_html, index after </span>)."""
    depth, pos = 1, start
    while True:
        m = TAG.search(src, pos)
        if not m:
            raise ValueError("unbalanced <span>")
        if m.group(0).startswith("</"):
            depth -= 1
            if depth == 0:
                return src[start : m.start()], m.end()
        else:
            depth += 1
        pos = m.end()


def next_pair(src, from_=0):
    m = PT_OPEN.search(src, from_)
    if not m:
        return None
    pt, e1 = span_end(src, m.end())
    m2 = EN_OPEN.match(src, e1)
    if not m2:
        raise ValueError(f"pt span at {m.start()} not followed by adjacent en span")
    en, e2 = span_end(src, m2.end())
    return m.start(), e2, pt, en


def esc(x):
    """Escape content destined for a JS backtick template literal."""
    return x.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def tl(x):
    """Wrap in backticks for an Astro/JS template-literal expression."""
    return BT + esc(x) + BT


def dedent(x):
    lines = x.split("\n")
    indents = [len(ln) - len(ln.lstrip()) for ln in lines if ln.strip()]
    cut = min(indents) if indents else 0
    return "\n".join(ln[cut:] if ln.strip() else "" for ln in lines)


def t_split(src):
    """Split an html chunk into alternating ('raw', html) and ('T', pt, en) parts."""
    parts, pos = [], 0
    while True:
        p = next_pair(src, pos)
        if not p:
            break
        start, end, pt, en = p
        if src[pos:start].strip():
            parts.append(("raw", src[pos:start]))
        parts.append(("T", pt.strip(), en.strip()))
        pos = end
    if src[pos:].strip():
        parts.append(("raw", src[pos:]))
    return parts


def emit_chunk(src, indent="  "):
    """Render a chunk as Fragment/T markup lines for an Astro template."""
    out = []
    for part in t_split(src):
        if part[0] == "raw":
            out.append(
                indent + "<Fragment set:html={" + tl(dedent(part[1]).strip()) + "} />"
            )
        else:
            out.append(
                indent + "<T pt={" + tl(part[1]) + "} en={" + tl(part[2]) + "} />"
            )
    return "\n".join(out)


def require(pattern, src, what, flags=re.S):
    found = re.findall(pattern, src, flags)
    assert len(found) == 1, f"expected exactly 1 {what}, found {len(found)}"
    return found[0]


def main():
    with (
        open(SRC, encoding="utf-8") as fh
    ):  # pi-lens-ignore: ast-grep:unchecked-throwing-call-js (guarded in __main__)
        s = fh.read()

    # house rule: no emojis -- swap for Phosphor icons (font loaded by the layout)
    for emoji, icon in {
        "\u2b21": '<i class="ph ph-hexagon"></i>',
        "\U0001f5e3\ufe0f": '<i class="ph ph-chat-circle-dots"></i>',
        "\U0001f648": '<i class="ph ph-eye-slash"></i>',
        "\U0001f441": '<i class="ph ph-eye"></i>',
    }.items():
        s = s.replace(emoji, icon)
    s = s.replace("\ufe0f", "")

    # ---------- extract the page ----------
    tm = re.search(
        r'<title\s+data-pt="([^"]*)"\s+data-en="([^"]*)"[^>]*>([^<]*)</title>', s
    )
    assert tm, "no head <title> with data-pt/data-en"
    title_pt, title_en, title_fallback = tm.group(1), tm.group(2), tm.group(3)

    body = require(r"<article[^>]*>(.*)</article>", s, "article body")

    part1 = body[: body.index("<!-- ============ P1")]  # hero + toolkit + map
    tail = body[body.rindex("</section>") + len("</section>") :]  # after P15

    sections = re.findall(
        r'<section class="pattern" id="(p\d+)">(.*?)</section>', body, re.S
    )
    assert len(sections) == 15, f"expected 15 pattern sections, found {len(sections)}"

    # ---------- per-pattern extraction ----------
    patterns = []
    for pid, sec in sections:
        extract_pattern(patterns, pid, sec)

    # ---------- emit pattern components ----------
    os.makedirs(
        OUT_PATTERNS, exist_ok=True
    )  # pi-lens-ignore: ast-grep:unchecked-throwing-call-js
    imports = []
    for p in patterns:
        fname = p["pid"] + "-" + p["slug"] + ".astro"
        imports.append((fname, p["num"]))
        lines = [
            "---",
            'import Pattern from "../Pattern.astro";',
            'import T from "../T.astro";',
            "---",
            "",
            "<!-- " + p["num"] + " \u00b7 " + p["te"] + " (L" + str(p["lvl"]) + ") -->",
            "<Pattern",
            '  id="' + p["pid"] + '"',
            '  num="' + p["num"] + '"',
            "  lvl={" + str(p["lvl"]) + "}",
            "  titlePt={" + tl(p["tp"]) + "}",
            "  titleEn={" + tl(p["te"]) + "}",
            "  kickerPt={" + tl(p["kp"]) + "}",
            "  kickerEn={" + tl(p["ke"]) + "}",
            "  tipPt={" + tl(p["tip_pt"]) + "}",
            "  tipEn={" + tl(p["tip_en"]) + "}",
        ]
        if p["why_pt"] is not None:
            lines.append("  whyPt={" + tl(p["why_pt"]) + "}")
            lines.append("  whyEn={" + tl(p["why_en"]) + "}")
        if p["warn_pt"] is not None:
            lines.append("  warnPt={" + tl(p["warn_pt"]) + "}")
            lines.append("  warnEn={" + tl(p["warn_en"]) + "}")
        lines.append(">")
        lines.append('  <Fragment slot="dia" set:html={' + tl(p["svg"]) + "} />")
        lines.append('  <ol slot="order">')
        lines.append(emit_chunk(p["ol"], indent="    "))
        lines.append("  </ol>")
        if p["extra"]:
            lines.append(
                '  <Fragment slot="extra" set:html={' + tl(p["extra"]) + "} />"
            )
        if p["cite"]:
            lines.append(
                '  <p class="cite" slot="cite" set:html={' + tl(p["cite"]) + "} />"
            )
        lines.append("</Pattern>")
        with open(
            os.path.join(OUT_PATTERNS, fname), "w", encoding="utf-8"
        ) as fh:  # pi-lens-ignore: ast-grep:unchecked-throwing-call-js
            fh.write("\n".join(lines) + "\n")

    # ---------- emit the page ----------
    os.makedirs(
        os.path.dirname(OUT_PAGE), exist_ok=True
    )  # pi-lens-ignore: ast-grep:unchecked-throwing-call-js
    page_lines = [
        "---",
        'import Reference from "' + RELPAGE + 'layouts/Reference.astro";',
        'import T from "' + RELPAGE + 'components/T.astro";',
        "---",
        "<Reference",
        '  titlePt="' + title_pt.replace('"', "&quot;") + '"',
        '  titleEn="' + title_en.replace('"', "&quot;") + '"',
        '  titleFallback="' + title_fallback.strip() + '"',
        ">",
        "",
    ]
    page_lines.append(emit_chunk(re.sub(r'href="#(p\d+)"', r'href="\1.html"', part1)))
    page_lines.append("")
    page_lines.append(emit_chunk(tail))
    page_lines.append("</Reference>")
    with open(
        OUT_PAGE, "w", encoding="utf-8"
    ) as fh:  # pi-lens-ignore: ast-grep:unchecked-throwing-call-js
        fh.write("\n".join(page_lines) + "\n")

    # ---------- emit the per-pattern route: p1.html .. p15.html ----------
    route = OUT_PAGE.replace("repertoire.astro", "[pattern].astro")
    rimp = "\n".join(
        "import " + num + ' from "' + RELPAGE + "components/patterns/" + fname + '";'
        for fname, num in imports
    )
    entries = ",\n".join(
        '  { slug: "'
        + p["pid"]
        + '", num: "'
        + p["num"]
        + '", C: '
        + p["num"]
        + ", titlePt: "
        + tl(p["tp"])
        + ", titleEn: "
        + tl(p["te"])
        + " }"
        for p in patterns
    )
    route_src = (
        "---\n"
        'import Reference from "' + RELPAGE + 'layouts/Reference.astro";\n'
        'import T from "' + RELPAGE + 'components/T.astro";\n'
        + rimp
        + "\n\n"
        + "const PATTERNS = [\n"
        + entries
        + ",\n];\n\n"
        + "export function getStaticPaths() {\n"
        + "  // self-contained: getStaticPaths runs in an isolated scope (no module consts)\n"
        + "  return [\"p1\",\"p2\",\"p3\",\"p4\",\"p5\",\"p6\",\"p7\",\"p8\",\"p9\",\"p10\",\"p11\",\"p12\",\"p13\",\"p14\",\"p15\"].map((s) => ({ params: { pattern: s }, props: { i: parseInt(s.slice(1)) - 1 } }));\n"
        + "}\n"
        + "const { i } = Astro.props;\n"
        + "const p = PATTERNS[i];\n"
        + "const prev = PATTERNS[i - 1];\n"
        + "const next = PATTERNS[i + 1];\n"
        + "const Pattern = p.C;\n"
        + "---\n"
        "<Reference\n"
        "  titlePt={`${p.num} \u00b7 ${p.titlePt} \u2014 Repert\u00f3rio`}\n"
        "  titleEn={`${p.num} \u00b7 ${p.titleEn} \u2014 Repertoire`}\n"
        "  titleFallback={p.num}\n"
        ">\n"
        '  <nav class="pattern-nav">\n'
        '    <a href="repertoire.html"><i class="ph ph-arrow-left"></i>&nbsp;<T pt="Repert\u00f3rio" en="Repertoire" /></a>\n'
        "    <span>\n"
        '      {prev && <a href={prev.slug + ".html"}><i class="ph ph-caret-left"></i>&nbsp;{prev.num}</a>}\n'
        '      {next && <a href={next.slug + ".html"}>{next.num}&nbsp;<i class="ph ph-caret-right"></i></a>}\n'
        "    </span>\n"
        "  </nav>\n"
        "  <Pattern />\n"
        "</Reference>\n"
        "<style is:inline>\n"
        "  .pattern-nav { display: flex; justify-content: space-between; gap: 12px; align-items: center;\n"
        '    font: 600 12px/1 "Space Grotesk"; letter-spacing: 0.04em; margin: 0 0 10px; }\n'
        "  .pattern-nav a { color: #9ea2b8; text-decoration: none; }\n"
        "  .pattern-nav a:hover { color: #eceef6; }\n"
        "  .pattern-nav .ph { vertical-align: -0.15em; }\n"
        "</style>\n"
    )
    with open(
        route, "w", encoding="utf-8"
    ) as fh:  # pi-lens-ignore: ast-grep:unchecked-throwing-call-js
        fh.write(route_src)

    print(
        "OK: wrote "
        + OUT_PAGE
        + " + [pattern].astro + "
        + str(len(patterns))
        + " pattern components"
    )
    for p in patterns:
        print(
            "  %s-%s.astro  (L%d, cite=%s, why=%s)"
            % (
                p["pid"],
                p["slug"],
                p["lvl"],
                "y" if p["cite"] else "n",
                "y" if p["why_pt"] else "n",
            )
        )


def grab(pattern, src, what):
    """Assert-exactly-one search -> (full_match, group1)."""
    m = re.search(pattern, src, re.S)
    assert m, f"missing {what}"
    return m.group(0), (m.group(1) if m.groups() else None)


def extract_pattern(patterns, pid, sec):
    h2, _ = grab(r"<h2\b.*?</h2\s*>", sec, pid + " h2")
    num = require(r'<span class="num">(P\d+)</span>', sec, pid + " num")
    lvl_m = re.search(r'<span class="lvl( l5)?">L(\d)</span>', sec)
    assert lvl_m, f"{pid}: no lvl badge"
    # pi-lens-ignore: ast-grep:unchecked-throwing-call-js (group asserted above)
    lvl = int(lvl_m.group(2))
    assert (lvl == 5) == bool(lvl_m.group(1)), f"{pid}: lvl/class mismatch"

    kicker_full, kicker = grab(r'<p class="kicker">(.*?)</p\s*>', sec, pid + " kicker")
    kicker_parts = t_split(kicker)
    assert len(kicker_parts) == 1 and kicker_parts[0][0] == "T", (
        f"{pid}: kicker is not a single pair"
    )

    svg = require(r"(<svg\b.*?</svg>)", sec, pid + " svg")
    assert sec.count("<svg") == 1 and sec.count('class="dia"') == 1, (
        f"{pid}: svg/dia count"
    )

    order_full, order = grab(
        r"<h3\s*>.*?</h3\s*>\s*<ol\s*>(.*?)</ol\s*>", sec, pid + " draw-order ol"
    )
    assert sec.count("<ol>") == 1, f"{pid}: more than one <ol>"

    callouts = re.findall(
        r'<div class="callout (\w+)">\s*<p\s*>(.*?)</p\s*>\s*</div\s*>', sec, re.S
    )
    kinds = [k for k, _ in callouts]
    assert kinds and kinds[0] == "tip", (
        pid + ": first callout is not tip: " + str(kinds)
    )
    assert set(kinds) <= {"tip", "info", "warn"}, (
        pid + ": unknown callout kinds " + str(kinds)
    )
    assert len(kinds) == len(set(kinds)), pid + ": duplicate callout kind"
    assert kinds == sorted(kinds, key=lambda k: ["tip", "info", "warn"].index(k)), (
        pid + ": callout order " + str(kinds)
    )

    def callout_pair(kind):
        for k, inner in callouts:
            if k == kind:
                parts = t_split(inner)
                assert len(parts) == 1 and parts[0][0] == "T", (
                    f"{pid}: {kind} callout is not a single pair"
                )
                return parts[0][1], parts[0][2]
        return None, None

    tip_pt, tip_en = callout_pair("tip")
    why_pt, why_en = callout_pair("info")
    warn_pt, warn_en = callout_pair("warn")

    # optional block between </ol> and first callout (P7: h3 + comparison table)
    m_extra = re.search(r"</ol\s*>\s*(.*?)\s*<div class=\"callout", sec, re.S)
    extra = m_extra.group(1) if m_extra and m_extra.group(1).strip() else None
    if extra is not None:
        # ponytail: shape check is loose (P7's table-wrap is unclosed in the source);
        # the DOM comparator in tools/verify_pilot.py is the real referee.
        assert extra.lstrip().startswith("<h3") and "<table" in extra, (
            pid + ": unexpected extra block shape: " + extra[:200]
        )

    cite_m = re.search(r'<p class="cite">(.*?)</p\s*>\s*$', sec.rstrip(), re.S)
    cite = cite_m.group(1) if cite_m else None

    # residue check: every structural element must be accounted for above
    residue = sec
    for chunk in [h2, kicker_full, order_full, svg]:
        residue = residue.replace(chunk, "", 1)
    for cfull in re.findall(r'<div class="callout \w+">.*?</div\s*>', sec, re.S):
        residue = residue.replace(cfull, "", 1)
    if extra is not None:
        residue = residue.replace(extra, "", 1)
    if cite_m:
        residue = residue.replace(cite_m.group(0), "", 1)
    residue = re.sub(r"<!--.*?-->", "", residue, flags=re.S)
    dia_wrap = re.sub(
        r'<div class="dia">\s*<div class="scroll-x"[^>]*>\s*</div\s*>\s*</div\s*>',
        "",
        residue,
        count=1,
    )
    assert dia_wrap != residue, pid + ": unexpected .dia wrapper shape"
    residue = dia_wrap
    bad = [
        t for t in re.findall(r"<(\w+)", residue) if t not in ("input", "label", "span", "i")
    ]
    assert not bad, f"{pid}: unaccounted elements {bad}\nresidue: {residue[:400]}"

    title_parts = t_split(h2)
    tp = [p for p in title_parts if p[0] == "T"]
    assert len(tp) == 1, f"{pid}: title is not a single pair"

    slug = re.sub(r"[^a-z0-9]+", "-", tp[0][2].lower()).strip("-")[:30]
    patterns.append(
        {
            "pid": pid,
            "num": num,
            "lvl": lvl,
            "slug": slug,
            "tp": tp[0][1],
            "te": tp[0][2],
            "kp": kicker_parts[0][1],
            "ke": kicker_parts[0][2],
            "svg": dedent(svg).strip(),
            "ol": dedent(order).strip(),
            "tip_pt": tip_pt,
            "tip_en": tip_en,
            "why_pt": why_pt,
            "why_en": why_en,
            "warn_pt": warn_pt,
            "warn_en": warn_en,
            "extra": dedent(extra).strip() if extra else None,
            "cite": dedent(cite).strip() if cite else None,
        }
    )


if __name__ == "__main__":
    try:
        main()
    except (AssertionError, ValueError, OSError) as e:
        print(f"convert failed: {e}", file=sys.stderr)
        sys.exit(1)
