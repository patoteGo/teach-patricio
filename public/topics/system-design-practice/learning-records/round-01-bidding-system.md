# Round 01 — Bidding system

- date: 2026-08-12
- recording: ~/Desktop/system_design/bidding_system.mov
- prompt: design a bidding system
- reviewer: Gemini (video analysis), rubric from reference/review-rubric.md

## Verdict: **Fail**

The candidate jumped directly into drawing a flow without establishing
scale/latency targets, missed the core concurrency/race-condition mechanics
required for a real-time auction, and proposed a confused architecture
(e.g., DB directly publishing to a message broker).

## Scores

| Dimension | Score | Evidence / Timestamps |
| :--- | :---: | :--- |
| **1. Requirements** | **1** | 00:15–02:13: Parroted basic functional requirements into a mind map ("manage the bids", "10–15 sec duration", "only one winner"). Missed non-functional requirements (latency SLA, QPS, scale, consistency). |
| **2. Estimation** | **0** | None: No back-of-the-envelope calculation at any point. |
| **3. High-Level Design** | **1** | 02:14–04:55: Drew `DB metadata` directly publishing events (`publishBid`) to a Message Broker (SQS/Kafka), bypassing service logic. The ingress path for incoming bids during the 10–15s window was never clearly separated from outgoing notifications. |
| **4. Deep Dive** | **1** | 05:08–07:10: Data model for `BID` (`bid_id`, array of `bidders [{id, amount}]`, `status`). Storing all bids in an append-array inside a single DB row creates massive write contention / race conditions during the high-frequency bidding window — unaddressed. |
| **5. Failure & Tradeoffs** | **0** | None: No discussion of network latency, race conditions between simultaneous highest bids at auction close, server timer drift, or single-point-of-failure. |
| **6. Communication** | **2** | Continuous: steady narrative flow, voiced thoughts while drawing. Self-doubt at times ("I don't know if that's correct..." ~05:30), but kept moving without freezing. |

## TOP 1 FIX (highest leverage)

**Define the concurrency-control mechanism for bid ingestion first.**

For a fast 10–15s auction window, storing bids in a SQL array or DB table
causes fatal lock contention. Instead:

- in-memory store, e.g. Redis `ZADD` with a timestamp score, or an atomic
  `Lua` script / counter for concurrent bid submission;
- a distributed lock or single atomic state machine to guarantee **exactly one
  winner** at auction closure.

## ONE good decision to keep doing

**Structured mind-mapping before drawing components.** Outlining requirements on
the canvas before placing architecture blocks is a great habit — keep it, but
expand the mind map to explicitly cover non-functional metrics (QPS, latency
SLA, consistency vs availability) before the HLD.
