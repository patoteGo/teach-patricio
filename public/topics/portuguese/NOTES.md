# Teaching Notes — Português

## Learner profile

- Native Spanish speaker, lives in Brazil, advanced fluency (B2+/C1-ish):
  high comprehension, functional speech, but interference errors from Spanish.
- Communicates with the agent in a relaxed EN/PT/ES mix.
- The gap is **accuracy**, not vocabulary: false friends, false cognates,
  phonetic habits, and structures Spanish makes "feel right".

## Stated preferences

- Mission framed as: native-like fluency; Spanish interference is the enemy.
- Brazilian Portuguese only.

## Key teaching insight (from research)

- Living in Brazil does NOT fix interference: Brazilians understand portuñol
  and accommodate instead of correcting ("acomodação consentida" — Rojas/UnB
  2006). Errors fossilize. Lessons must create the correction loop that daily
  life refuses to provide: targeted contrast + retrieval + real-world task.

## Interactive lesson contract

- Reuse the repo's shared components: bilingual `data-lang` spans, `.quiz`
  blocks with `data-correct`/`data-fb-pt`/`data-fb-en`, `<details>` recall
  cards, `h2.section` checkpoints.
- Quiz answers: same word count, no formatting clues, exactly one correct.
- Every lesson ends with: primary source link, reference link, ask-the-agent
  reminder.
- No emojis in lesson/reference HTML (repo rule) — ⬡, arrows, Phosphor icons.

## Session log

- Session 1: Created topic. Lesson 0001 (falsos amigos traiçoeiros) + falsos
  amigos reference table (FSI public-domain data, verified). Resources:
  Tá Falado (COERLL), FSI From Spanish to Portuguese, Tradulex glossary.
- Session 2: Lesson 0002 — sotaque (5 giveaway markers: vowel reduction,
  t/d palatalization, nasals, initial R, avó/avô) + copy-paste ChatGPT
  voice-mode tutor prompt (immediate correction protocol). Also fixed the
  README catalog CI (was scanning a pre-migration `topics/` path; now scans
  `src/pages/topics` .astro frontmatter — all 10 topics list again).
  Next candidates: gerúndio/pronoun-placement grammar interference, or
  falsos amigos tier 2 from the ChatGPT session reports.
