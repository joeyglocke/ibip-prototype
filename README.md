# IBIP — Install Base Intelligence Platform

A clickable prototype of IBIP — a Teams-resident agent built to preserve institutional knowledge before veteran reps walk out the door, surface at-risk accounts before they become lost accounts, and tailor every intervention to the buyer's Korn Ferry decision style.

Built on the [microsoft-teams-shell](https://github.com/ginobuzz/microsoft-teams-shell) UI framework so the prototype reads as a real Teams surface — the IBIP feature is what's new, not the chrome.

## What's in this demo

Open the prototype and the IBIP chat is the first thing selected. Three beats:

1. **Proactive risk alert.** IBIP opens with a flagged account — Brea General Hospital, Tier 1, must-keep in geo. Risk card surfaces the firing signals (win probability < 60%, no L1 relationship on file, CTS volume trending up) with a recommended intervention.
2. **Queryable predecessor.** Asking IBIP for the full account history pulls 11 years of relationship state, surfaces the 2019 near-loss narrative the retired rep saved verbatim, and lists what every prior rep emphasized about the lab director.
3. **Korn Ferry-tailored playbook.** The intervention brief for Dr. Patricia Voss is tuned to her Analytical decision style — written evidence first, no rapport openers, no verbal commitments outside the deck.
4. **Day-one territory hand-off.** The Pacific Northwest sub-region briefing turns 14 years of a retiring rep's logged notes into a 7-day plan for the inheriting RSM.

## Stack

React 19, Vite 5, deployed as a static bundle to GitHub Pages. No backend — every adaptive card and risk signal is mock data shaped to match the IBIP design spec.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static bundle in dist/
```

## Deployed demo

`https://joeyglocke.github.io/ibip-prototype/` once the Pages workflow finishes building on `main`.

## Project layout

```
ibip-prototype/
├── README.md
├── CLAUDE.md           Guidance for AI coding assistants
├── DESIGN_GUIDE.md     Color tokens, typography, card patterns
├── PERSONA.md          Jordan Locke — the RSM driving the demo voice
├── public/             Static assets (avatars, file icons)
└── src/
    ├── App.jsx         Layout root + FRE pitch modal
    ├── data/           Mock contacts, messages, prompt suggestions
    └── components/     Teams chrome + Adaptive Card renderer
```

## Design references

- [`PERSONA.md`](PERSONA.md) — Jordan Locke (Regional Sales Manager, West) and the Beckman Coulter cast referenced in the seeded conversation
- [`DESIGN_GUIDE.md`](DESIGN_GUIDE.md) — Teams color tokens and Adaptive Card schema used by IBIP's response cards

## Acknowledgments

Built on the [`ginobuzz/microsoft-teams-shell`](https://github.com/ginobuzz/microsoft-teams-shell) prototype starter kit.
