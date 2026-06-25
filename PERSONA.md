# Persona: Devon Glocke

Reference this file whenever generating new content for the prototype (messages, session titles, chat names, canned agent responses, seeded data). The goal is for every piece of text to read like it came from a real person's Teams — not generic placeholder copy.

This persona is fictional and used for an internal pitch prototype. The demo audience is Beckman Coulter Sales Leadership, but the persona itself is invented.

## Role

- **Devon Glocke** — a Key Account Manager (KAM) at Beckman Coulter diagnostics, **two weeks into the Pacific Northwest sub-region**.
- Context: the previous KAM retired; the RSM covered the territory for three months and is now making introductions. Devon isn't walking in cold, but hasn't built any relationships of their own yet.
- The narrative protagonist of the TIP (Topline Intelligence Platform) live demo (script v4). The prototype IS the demo.
- Based in the US Pacific time zone.

## The platform: TIP

- **TIP — Topline Intelligence Platform.** Three components: institutional memory engine, account risk flagging engine, Korn Ferry integration layer. Built on Microsoft 365 + Salesforce.
- TIP appears as an AI agent in Teams (contact id 100, logo key `tip`, an upward "topline" trend mark in a shield). It writes confident, specific responses — quotes signal counts, dollar amounts, dates, and Korn Ferry buyer profiles. Footers cite the source.

## The demo account: Brea General Hospital

- 11-year Beckman Coulter account · $420K ACV · must-keep in region · renewal in 4 months (112 days).
- Instruments: DxH 900 (Hematology) + AU5800 + UA (Chemistry / Urinalysis).
- **The overnight alert:** 3 of 8 risk parameters firing — win probability dropped 60→40%, CTSO call volume 180% of baseline for 31 days, an unplanned DxH 900 service visit (3 hrs hematology downtime, Gina Park on shift, no post-visit contact). Health score 34/100.
- **History:** 2016 initial DxH placement (displaced Sysmex XE). 2020 near-loss (finance cost review, Roche chemistry proposal; saved by Estergreen advocacy + $18K reagent concession). 2023 DxH 900 upgrade + UA microscopy + AU5800 install. 2023 Q3 reagent strip shortage (3-month impact; heme distrust remains). 2025 RSM covered after KAM retirement. 2026 Devon inherits.
- **Competitor:** Sysmex — active with the heme department; heme techs moonlight at Pacific General (a Sysmex site); **PLT-F** (platelet flagging) is a known talking point Sysmex uses to plant doubt. No formal eval yet.

## The buying influence map (Korn Ferry profiles)

- **Dr. Joanne Estergreen** — Lab Director. Technical (T) · High influence · Growth mode · +4. Active **Coach** (all 3 KF criteria). Avid skier — a genuine connection point. RSM has the relationship. Engage first; she pre-frames Ortega.
- **Gina Park** — Hematology Technical Lead. User (U) · Medium influence · Trouble mode · +2. Carrying distrust from the 2023 reagent shortage; will raise supply reliability. Route to the **PSE** (technical credibility), not a commercial KAM call. Acknowledge the downtime/shortage before she does; raise PLT-F first.
- **Sandra Ortega** — Supply Chain Manager (reports to CFO). Economic (E) influence · High influence · Even Keel · +1. Vendor reliability is her lens. No relationship with us yet. Lead with data and process, not product or relationship. Do NOT contact before Estergreen briefs her.
- **Intervention sequence:** Park (PSE) → Estergreen (RSM + intro Devon) → Ortega (RSM + Devon). In that order. Before next week's meeting — not instead of it.

## Other top accounts (supporting)

- **Cascadia Regional Medical** — $210K ACV, renewing in 11 months, healthy.
- **Pacific Coast Health System** — $180K ACV, renewing in 8 months, monitor.

## The internal team (group/channel cast)

Reuse these names rather than invent new ones:

- **Tom Hayes** (id 201) — RSM, Pacific. Holds the Brea relationships (Estergreen, Ortega); makes the introductions; bridges until Devon has footing.
- **Maria Santos** (id 200) — PSE (Product Support Engineer), West region. Takes the technical credibility call with Gina Park (DxH downtime, PLT-F, reagent protocols).
- **Linda Castellano** (id 202) — Area Director, West. Sets escalation; guards the sequence (no Ortega contact before Estergreen pre-frames). *(Renamed from "Linda Park" to avoid colliding with customer Gina Park.)*
- **Greg Tanaka** (id 203) — KAM, top accounts (peer).

## Communication style

- Devon: direct, lowercase in chats, asks TIP for specifics. Invokes the bot with **@TIP** when delegating an action.
- Domain shorthand: `KAM`, `RSM`, `PSE`, `AD`, `VOC`, `CTSO`, `ACV`, `must-keep`, `Coach`, `PLT-F`.
- Korn Ferry vocabulary: Technical / Economic / User buyer types; Growth / Even Keel / Trouble modes; +/- ratings; Coach criteria.

## Influences on generated content

- **Time zone:** US Pacific. Demo narrative anchors to a Monday morning in mid-June 2026; Devon is week 2 in the territory.
- **Tools referenced naturally:** Teams, Salesforce, SharePoint, Power BI, Outlook, Copilot — Beckman's Microsoft 365 + Salesforce stack.
- **Avoid:** the word "dossier" (use "brief" / "briefing"); always "CTSO" never "CTS"; generic placeholder writing; edgy/snarky tone. Competitor mentions are factual context, never disparaging.
- **Tone safety:** every message demo-safe. The prototype is published publicly for the pitch readout at joeyglocke.github.io/ibip-prototype (the repo/URL name stays `ibip-prototype` even though the agent is TIP).
