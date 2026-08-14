#!/usr/bin/env python3
"""Render a local, dependency-free design-system exercise progress page."""

import argparse
import html
import json
from pathlib import Path

CATEGORIES = (
    ("tokens", "Tokens"),
    ("component_api_and_composition", "Component API & composition"),
    ("consistency", "Consistency"),
    ("states_and_accessibility", "States & accessibility"),
    ("visual_polish", "Visual polish"),
)


def text(value):
    return html.escape(str(value or "—"))


def list_items(values):
    return "".join(f"<li>{text(value)}</li>" for value in values) or "<li>—</li>"


def load_records(directory):
    records = []
    for path in Path(directory).glob("*.json"):
        try:
            record = json.loads(path.read_text())
            scores = record["scores"]
            values = [scores[key] for key, _ in CATEGORIES]
            if not all(isinstance(value, int) and 0 <= value <= 10 for value in values):
                raise ValueError("scores must be integers from 0 to 10")
            record["overall"] = round(sum(values) / len(values))
            records.append(record)
        except (json.JSONDecodeError, KeyError, ValueError) as error:
            print(f"Skipping {path}: {error}")
    return sorted(
        records, key=lambda record: (record.get("date", ""), record.get("slug", ""))
    )


def card(record, previous):
    overall = record["overall"]
    delta = "" if previous is None else f" ({overall - previous:+d} vs previous)"
    score_rows = "".join(
        f"<dt>{label}</dt><dd>{record['scores'][key]}/10</dd>"
        for key, label in CATEGORIES
    )
    evidence = "".join(
        f"<li><b>{label}:</b> {text(record.get('evidence', {}).get(key))}</li>"
        for key, label in CATEGORIES
    )
    return f"""<article>
<h2>{text(record.get("exercise"))}</h2><p class=meta>{text(record.get("date"))} · {text(record.get("brief"))}</p>
<p class=score>{overall}/10<span>{text(delta)}</span></p><p>{text(record.get("summary"))}</p>
<dl>{score_rows}</dl><h3>Evidence</h3><ul>{evidence}</ul>
<h3>Improve next</h3><ul>{list_items(record.get("improvements", []))}</ul>
<p><b>Next exercise:</b> {text(record.get("next_exercise"))}</p><p><b>Limits:</b> {text("; ".join(record.get("limitations", [])))}</p>
</article>"""


def render(records):
    averages = (
        "No completed exercises yet."
        if not records
        else f"{sum(record['overall'] for record in records) / len(records):.1f}/10 average across {len(records)} exercise(s)."
    )
    cards, previous = [], None
    for record in records:
        cards.append(card(record, previous))
        previous = record["overall"]
    return f"""<!doctype html><html lang=en><meta charset=utf-8><meta name=viewport content=width=device-width,initial-scale=1>
<title>Design-system progress</title><style>
body{{font:16px/1.5 system-ui,sans-serif;max-width:850px;margin:3rem auto;padding:0 1rem;background:#fafafa;color:#171717}}article{{background:#fff;border:1px solid #ddd;border-radius:12px;margin:1rem 0;padding:1.25rem}}h1,h2,h3,p{{margin-top:0}}.meta{{color:#555}}.score{{font-size:2rem;font-weight:700}}.score span{{font-size:1rem;font-weight:400;color:#555}}dl{{display:grid;grid-template-columns:1fr auto;gap:.25rem 1rem}}dt,dd{{margin:0}}ul{{padding-left:1.25rem}}</style>
<h1>Design-system progress</h1><p>{averages}</p>{"".join(reversed(cards))}</html>"""


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--records", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    output = Path(args.out)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(render(load_records(args.records)))


if __name__ == "__main__":
    main()
