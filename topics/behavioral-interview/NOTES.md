# Teaching Notes — Behavioral Interview

## Learner profile

- Senior fullstack developer. **Behavioral interview tomorrow** (urgent).
- Wants to sound **natural, not scripted** — explicitly rejected a memorized-script approach.

## Key technique decision (confirmed with the user)

- **Framework combo: BLUF + STAR.**
  - **BLUF** (Bottom Line Up Front — U.S. military comms doctrine): lead with the headline/impact in 1–2 sentences. Makes answers sound clear, senior, and respectful of time.
  - **STAR** (Situation → Task → Action → Result): the *proof* underneath the headline.
  - Integration: **BLUF = the first 1–2 sentences; STAR = the evidence that follows.**
- The user supplied their own worked example (a **SendGrid email-statistics bug**: duplicated message IDs inflated campaign metrics → investigated logs → deduplication + observability → correct numbers + faster future diagnosis). **USE IT as the anchor example** — it's their real experience and it's a great senior signal (ownership, observability, trust in data).
- Companion for gaps: the **Bridge** (acknowledge → bridge → land) for questions with no ready story.
- **Correction log:** the user first asked for a "Bluff technique." Verified (search + source_check) there is **no reputable method by that name**; literal bluffing is dangerous under senior probing. User clarified they meant **BLUF** — a real, citable technique. (Recorded so future sessions don't reintroduce "Bluff.")

## Approach (urgent — due tomorrow)

- Optimize for tonight:
  - **Lesson 1** = BLUF + STAR (the knowledge + "sound natural" technique).
  - **Reference** = question bank (categorized, filterable — the "revisited often" doc).
  - **Lesson 2 / Dojo** = interactive practice tool: random question + BLUF/STAR structured input + timer + saved story library (`localStorage`).
- **Practice-first:** every artifact pushes "rehearse aloud from bullet points," never "memorize a script." The agent is the **live feedback loop** — invite the user to paste a draft answer for coaching.

## Preferences (carried over from the Pi topic)

- Graphical HTML, self-contained, portable, no absolute local paths baked in.

## Session log

- Session 1: Confirmed BLUF (not "Bluff"). Scaffolded topic. Shipping Lesson 1 (BLUF+STAR), the question-bank reference, and the interactive Dojo.

- Session (post-interview debrief): user felt the "proudest project, architecturally" answer didn't land in a real interview (Cencosud ingest). Diagnosis: STAR pitch only covers the *impact* rubric — interviewers also score decision justification, mechanics depth, and team judgment. Shipped Lesson 5 (`0005-architecture-grill.html`, English-only — interview practice language): upgraded architecture pitch (names the 3 decisions upfront as an invitation) + 21-probe grill deck (SQS mechanics, Postgres/data, scale/K8s, architecture tradeoffs, team/org) with reveal + self-rating in localStorage, AWS-docs-cited. **Action for user:** pin real numbers (partner count, batch size, event volume) before drilling — flagged inside the lesson.
