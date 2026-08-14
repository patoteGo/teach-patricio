---
name: design-system-video-review
description: Reviews local video recordings of design-system exercises with Gemini, scores them consistently, and maintains a self-contained HTML progress history. Use when the user shares a local exercise video, asks to assess design-system practice, score a UI/design-system exercise, or update their design-system progress report.
---

# Design-system video review

## Quick start

When given a local video path, analyse it with Gemini:

```text
fetch_content({
  url: "/absolute/path/to/exercise.mp4",
  prompt: "Review this design-system exercise. Return the structured review required below.",
  model: "gemini-3.6-flash"
})
```

Do not invent observations. State when the recording does not show enough detail to score a category.

## Review workflow

1. Ask for the exercise name and target brief only if they are not supplied. The video path is required.
2. Call `fetch_content` with the local video path, the prompt below, and `model: "gemini-3.6-flash"`.
3. Turn the evidence into one JSON record conforming to `record-template.json`. Score each category from 0–10; overall is their rounded arithmetic mean.
4. Save it as `design-system-progress/records/<YYYY-MM-DD>-<slug>.json`.
5. Regenerate `design-system-progress/index.html`:

```sh
python3 .pi/skills/design-system-video-review/scripts/render_progress.py \
  --records design-system-progress/records \
  --out design-system-progress/index.html
```

1. Tell the user the score, one strongest improvement, and the report path. Never overwrite or remove a previous record.

## Gemini prompt

Use this exact scoring rubric, adapting the brief placeholder:

```text
You are an exacting design-system reviewer. Review this video of a design-system exercise.
Target brief: <brief or "not supplied">.

Only make claims supported by the visible recording. Return:
- a 1–2 sentence summary;
- scores 0–10 (integers) for: tokens, component API and composition, consistency, states and accessibility, and visual polish;
- evidence for every score, naming what appears on screen;
- one highest-leverage next exercise;
- up to three concrete improvements;
- limitations: what the video does not let you assess.

Prefer reusable primitives, semantic tokens, composable APIs, and visible interactive states. Do not infer source-code quality from the UI alone.
```

## Records

Use the JSON shape in [record-template.json](record-template.json). Dates use `YYYY-MM-DD`; preserve the absolute video path only when the user agrees, otherwise use its filename. `slug` identifies the exercise. Scores must be integers 0–10.

The HTML is intentionally static and local: it needs no framework, server, or dependency. Add richer charts only if the user asks.
