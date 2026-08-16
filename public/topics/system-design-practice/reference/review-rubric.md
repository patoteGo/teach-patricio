# Review Rubric — LLM grading for your practice rounds

> The reusable asset for the dojo. Record a round → feed it to Gemini via
> `fetch_content` with the rubric below → save the markdown. Same prompt every
> run, so scores are comparable round over round.

## The loop (one line)

`record video → fetch_content(video, rubric) → save learning-records/round-NN.md → compare with last round`

## 1 · Record

Capture **drawing + talking together** — that's the skill, and only video has both.

- **Easiest:** phone propped on the desk filming paper / a whiteboard, mic on. ~25 min.
- **Cleaner drawing:** screen-record [tldraw](https://tldraw.com) or Excalidraw with system audio + mic (macOS: `Cmd-Shift-5`).
- Drop the file somewhere stable, e.g. `~/movies/practice-rate-limiter-r1.mp4`.

## 2 · Review on pi — `fetch_content` video mode

pi's `fetch_content` ingests a **local video** through Gemini and answers a prompt
about it. One call, no upload step:

```text
fetch_content(
  url   = "file:///Users/patote/movies/practice-rate-limiter-r1.mp4",
  mode  = "answer",
  prompt= <RUBRIC PROMPT BELOW, with the prompt-you-were-solving filled in>,
  model = "gemini-3.6-flash"   # default; omit unless you want a different one
)
```

What each param does:

| param | value | why |
|---|---|---|
| `url` | `file:///` + absolute path | `file://` scheme + absolute path is what pi accepts for local video *(verified: the call runs to the Gemini stage on this form)* |
| `mode` | `"answer"` | "answer the prompt using only the fetched video" — as opposed to `readable`/`raw` (text extraction) |
| `prompt` | the rubric | the grading instructions (below) |
| `model` | `"gemini-3.6-flash"` (default) | Gemini is the only path pi uses for video analysis; Flash is fast/cheap. Omit unless you want Pro. |

> **Note on `frames` / `timestamp`:** leave them out. Those *sample still
> frames* at moments; for grading you want the **whole clip** ingested (Gemini
> watches + listens). Use `timestamp` only if you want a sanity check of one
> moment ("what did I draw at 12:30?").

## 3 · The one prerequisite — Gemini access

`fetch_content` video mode needs Gemini. Either:

1. **Free:** sign into [gemini.google.com](https://gemini.google.com) in Chrome
   (pi uses the cookie) — no API key, no cost.
2. **API key (headless / repeatable):** get a key from
   [Google AI Studio](https://aistudio.google.com/apikey) (free tier covers
   plenty of practice rounds), then create the file:

   ```json
   // /Users/patote/.pi/web-search.json
   { "geminiApiKey": "AIza…" }
   ```

   *(the field is **camelCase `geminiApiKey`** — verified from the `pi-web-access`
   README. This file already exists now with a placeholder — just paste your key.)*

No `yt-dlp` needed for local video (only for YouTube URLs). `ffmpeg` is already
installed — required for local video, already present.

## 4 · The rubric prompt (paste verbatim, fill the prompt line)

```
You are a senior staff engineer grading a system-design interview.
Watch the video: the candidate is drawing an architecture and narrating aloud.

Prompt they were solving: <PASTE, e.g. "design a rate limiter">

Score each dimension 0–3 (0=absent, 1=weak, 2=solid, 3=excellent):
1. Requirements — clarified scope, users, core flows; functional vs non-functional before drawing?
2. Estimation — rough numbers on it (QPS, storage, bandwidth)?
3. High-level design — happy-path diagram coherent and minimal?
4. Deep dive — picked ONE component and went deep (data model, algo, scale)?
5. Failure & tradeoffs — named a failure mode + a real tradeoff with a justification (not a buzzword)?
6. Communication — thinking aloud, narrating each box, pacing, not freezing?

Output, in markdown:
- one-line verdict (pass / borderline / fail)
- table: dimension | score | evidence (cite what they did/drew and roughly when)
- TOP 1 FIX: the single highest-leverage change before the next round
- ONE good decision to keep doing
```

The `TOP 1 FIX` line is the point — one actionable improvement per round beats
a dozen vague notes.

## 5 · Save the result

Paste Gemini's markdown into:

```text
topics/system-design-practice/learning-records/round-01-rate-limiter.md
```

Template for the file header:

```markdown
# Round 01 — Rate limiter
- date: 2025-__
- recording: ~/movies/practice-rate-limiter-r1.mp4
- prompt: design a rate limiter

<paste Gemini's verdict table + TOP 1 FIX here>
```

## 6 · The real feedback loop

Next round → open `round-01`, **re-attempt the same prompt**, review again, save
as `round-02-…`. Compare the dimension scores. That delta — not any single
verdict — is the signal that practice is working.
