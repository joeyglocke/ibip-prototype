# Persona: Alex Chen

Reference this file whenever generating new content for the prototype (messages, session titles, chat names, canned agent responses, seeded data). The goal is for every piece of text to read like it came from a real person's Teams — not generic placeholder copy.

This persona is fictional and used for an internal pitch prototype. The demo audience is Beckman Coulter Sales Leadership, but the persona itself is invented.

## Role

- **Alex Chen** — a sales rep at Beckman Coulter diagnostics, day one on the **Pacific Northwest sub-region**, just inherited from a rep who retired after 9 years on the territory's flagship account.
- The narrative protagonist of the TIP (Topline Intelligence Platform) live demo. The prototype IS the demo.
- Based in the US Pacific time zone.

## The platform: TIP

- **TIP — Topline Intelligence Platform.** Three components: institutional memory engine, account risk flagging engine, Korn Ferry integration layer. Built on Microsoft 365 + Salesforce.
- TIP appears as an AI agent in Teams (contact id 100, logo key `tip`). It writes confident, specific responses — quotes signal counts, dollar amounts, dates, and Korn Ferry buyer profiles. Footers cite the source.

## The demo account: Brea General Hospital

- 11-year account · $420K ACV · must-keep in region · renewal in 4 months (112 days).
- **The overnight alert:** 3 of 8 risk parameters firing — win probability 54%, CTSO call volume 180% of baseline for 31 days, an unplanned AU5800 calibration service visit.
- **2019 near-loss:** CFO initiated a cost review, Roche submitted a competitive proposal; saved by Dr. Walsh advocacy + an $18K reagent concession.
- **Competitors referenced:** Sysmex (2014, lost to us on morphology), Roche (2019 proposal), Siemens (Q3 hematology outreach, no formal eval yet).
- **Equipment:** DxH 800 / DxH 900 (hematology), AU5800 (chemistry).

## Buying influence map (Korn Ferry profiles)

- **Dr. Patricia Walsh** — Lab Director. Technical (T) · High influence · Growth mode · +4. Active **Coach** (meets all 3 KF criteria). Engage first; she pre-frames the CFO.
- **James Okafor** — CFO, new (6 months in role). Economic (E) · High · Even Keel · +1. Same buyer profile as the 2019 near-loss CFO. Lead with TCO, not relationship. Do not contact until Walsh has briefed him.
- **Dr. Marcus Lee** — Hematology Medical Director. User (U) · Medium · Trouble mode · +2. Feeling operational pain (the calibration issue). Assign HSE for a clinical deep-dive first.
- **Intervention sequence:** Lee → Walsh → Okafor. In that order. Not simultaneously.

## Other top accounts (supporting)

- **Cascadia Regional Medical** — $210K ACV, renewing in 11 months, healthy.
- **Pacific Coast Health System** — $180K ACV, renewing in 8 months, monitor.

## The internal team (group/channel cast)

Reuse these names rather than invent new ones:

- **Maria Santos** (id 200) — HSE, West region. Leads clinical deep-dives; takes the Lee conversation.
- **Tom Hayes** (id 201) — Regional Sales Manager, Pacific. Covers the RSM side of joint responses.
- **Linda Park** (id 202) — Area Director, West. Alex's leadership; sets escalation and guards the Okafor sequence.
- **Greg Tanaka** (id 203) — KAM, top accounts.

## Communication style

- Alex: direct, lowercase in chats, asks TIP for specifics. Invokes the bot with **@TIP** when delegating an action.
- Domain shorthand: `HSE`, `RSM`, `KAM`, `VOC`, `L1`, `CTSO`, `ACV`, `must-keep`, `Coach`.
- Korn Ferry vocabulary: Technical / Economic / User buyer types; Growth / Even Keel / Trouble modes; +/- ratings; Coach criteria.

## Influences on generated content

- **Time zone:** US Pacific. Demo narrative anchors to a Monday morning (Alex's first day), mid-June 2026.
- **Tools referenced naturally:** Teams, Salesforce, SharePoint, Power BI, Outlook, Copilot — Beckman's Microsoft 365 + Salesforce stack.
- **Avoid:** the word "dossier" (use "brief" / "briefing"); always "CTSO" never "CTS"; generic placeholder writing; edgy/snarky tone. Competitor mentions are factual context, never disparaging.
- **Tone safety:** every message demo-safe. The prototype is published publicly for the pitch readout at joeyglocke.github.io/ibip-prototype (the repo/URL name stays `ibip-prototype` even though the agent is now TIP).
