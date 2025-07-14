# 🚀 Watchly Benchmark Playground

> Benchmarking **Overwatch TS vs Zustand vs Redux Toolkit** in real-world React apps.

---

## The Results – Totally Unexpected!

I figured we’d see a small 5–10% edge, but 😮 the numbers blew me away!

- **Overwatch TS:** Average update time: **49.74 ms**
- **Zustand:** Average update time: **584.74 ms**
- **Redux Toolkit:** Average update time: **913.03 ms**

✨ **Overwatch TS is ~11.7× faster than Zustand (91% faster)!**  
✨ **Overwatch TS is ~18.3× faster than Redux Toolkit (95% faster)!**

---

## What is this?

A transparent, open-source playground to measure **performance, memory usage, and render efficiency** of Overwatch TS, Zustand, and Redux Toolkit using **10,000 concurrent state updates** across **1,000 subscribed React components**.

---

## Why?

State management is critical for React performance. We wanted to see how **Overwatch TS compares in real-world conditions** and the results surprised us!

---

## Try it yourself
👉 [Playground](https://watchly-benchmark.netlify.app/)

---

## 🤝 Contribute for Transparency

We believe in **transparent benchmarking**. If you spot something off, want to add tests, or extend the analysis to more libraries:

**[View & Contribute on GitHub](https://github.com/WisdomBits/State-Management-Benchmark-playground)**

---

## Tech Stack

- **Next.js + Tailwind + TypeScript**

## Tracks

- Update Cycle Time: How fast can 10,000 states update together?
- Cold Start Time: How much lag at the start?
- Memory Delta: Does it chew up memory during updates or memory leaks?
- Fastest vs. Latest Updates: Consistency across runs.

---
⚡ Happy Coding!
