// Scripted send-by-send flows. Each entry is keyed by chat id and drives
// the interactive demo: only the TIP-initiated message(s) are seeded into
// `messagesByContact`. Everything else — the user's reply (pre-loaded as
// a compose draft) and the chained team/agent responses — plays out when
// the user clicks Send.
//
// The 1:1 TIP flow (id 100) follows the v4 Live Demo Script:
//   Beat 1  — pre-meeting briefing (institutional memory)
//   PIVOT   — the overnight alert "arrives" (a pivot step: userText:null,
//             fires on an empty Send so the presenter reveals it on cue)
//   Beat 2  — risk flag detail (risk flagging engine)
//   Beat 3  — KF-tailored intervention playbook (risk + Korn Ferry)
//
// Step shape:
//   {
//     userText: string | null,        // null = pivot (no user bubble; empty Send)
//     responses: [
//       { senderId, text, cards?, chainOfThought?, typingMs?, gapMs? },
//       ...
//     ],
//     nextDraft?: string,             // chain into compose after responses
//   }

// ── TIP 1:1 chat (id 100) ────────────────────────────────────────────────
const tip1on1 = {
  initialDraft:
    'I have an intro meeting at Brea General Hospital next week — my RSM is making the introductions. I\'m two weeks into this territory. Give me the full account history and everything I need to know about the people I\'m going to meet.',
  steps: [
    // ── Beat 1: pre-meeting briefing (institutional memory) ───────────
    {
      userText:
        'I have an intro meeting at Brea General Hospital next week — my RSM is making the introductions. I\'m two weeks into this territory. Give me the full account history and everything I need to know about the people I\'m going to meet.',
      responses: [
        {
          senderId: 100,
          text:
            'BREA GENERAL HOSPITAL — Pre-meeting briefing. Eleven years of history, the three people you\'re meeting, and the note your predecessor left behind.',
          cards: [
            {
              accentColor: '#0B5394',
              iconType: 'teams',
              title: 'Brea General Hospital — Pre-meeting briefing',
              subtitle: '11-year account · $420K ACV · Renewal in 4 months · Must-keep in region',
              badge: { text: 'Pre-meeting briefing', tone: 'purple' },
              sections: [
                {
                  heading: 'Instruments',
                  text: 'DxH 900 (Heme) + AU5800 + UA (Chem / Urinalysis)',
                },
                {
                  heading: 'Account history',
                  bullets: [
                    '2016 — DxH placement, displaced Sysmex XE on morphology.',
                    '2020 — Near-loss (finance cost review, Roche proposal). Saved by Dr. Estergreen + an $18K concession. Prior KAM: "Without her we lose this account."',
                    '2023 — DxH 900 upgrade + AU5800 chemistry install. Strong reception.',
                    '2023 — ⚠ Q3 reagent shortage, 3-month impact. Gina Park escalated hard; distrust in heme remains.',
                    '2025 — RSM covered after the KAM retired. 2026 — you inherit; renewal due Q3.',
                  ],
                },
                {
                  heading: 'Dr. Joanne Estergreen — Lab Director',
                  bullets: [
                    'Technical · High · Growth · +4 · Active Coach',
                    'Avid skier — a genuine connection point.',
                    '▶ She\'ll advocate for you. RSM has the relationship; your job is to earn it.',
                  ],
                },
                {
                  heading: 'Gina Park — Hematology Technical Lead',
                  bullets: [
                    'User · Medium · Trouble · +2',
                    '⚠ Still angry about the 2023 shortage — she\'ll raise it.',
                    '⚠ Heme techs moonlight at Pacific General (a Sysmex site); PLT-F is their talking point.',
                    '▶ Acknowledge the shortage before she does. PSE engages on PLT-F before the meeting.',
                  ],
                },
                {
                  heading: 'Sandra Ortega — Supply Chain (reports to CFO)',
                  bullets: [
                    'Economic · High · Even Keel · +1',
                    '⚠ Vendor reliability is her lens after 2023.',
                    '▶ Lead with supply commitments, not features. No relationship yet — earn it with data.',
                  ],
                },
                {
                  heading: 'Predecessor note (retiring KAM — summarized by TIP)',
                  text:
                    '"Estergreen is the anchor of this account. She trusts people, not companies. Ask her about skiing — she\'ll remember you. Do not send an email first. Call her."',
                },
              ],
              footer: 'Compiled from 11 years of logged interactions',
              actions: ['Open the influence map', 'Add contacts to my calendar'],
            },
          ],
          chainOfThought: [
            'Reconstructed the 11-year timeline, including the 2020 near-loss and 2023 shortage',
            'Mapped the 3 contacts to Korn Ferry profiles and ran the Coach criteria on Estergreen',
            'Surfaced the Sysmex moonlighting + PLT-F competitive intel',
            'Pulled the predecessor\'s verbatim relationship note — including the skiing detail',
          ],
          typingMs: 2400,
        },
      ],
      // Compose clears — the presenter clicks Send once more (empty box) to
      // fire the overnight alert pivot on cue.
      nextDraft: '',
    },

    // ── PIVOT: the overnight alert arrives (empty-Send reveal) ────────
    {
      userText: null,
      responses: [
        {
          senderId: 100,
          text:
            'This just came in. Overnight — on the same account you\'re prepping for next week.',
          cards: [
            {
              accentColor: '#C4571A',
              iconType: 'teams',
              title: '⚠ Overnight alert — Brea General Hospital',
              subtitle: 'HIGH SEVERITY · Must-keep in region · Renewal in 112 days',
              badge: { text: 'Action required', tone: 'amber' },
              sections: [
                {
                  text:
                    '3 risk parameters triggered overnight — on your #1 account. This can\'t wait for next week\'s meeting.',
                },
              ],
              footer: 'Detected overnight by TIP',
              // The first action drives the demo forward — clicking it injects
              // Devon's question and opens the risk detail (compose stays blank).
              actions: [{ label: 'Show the risk detail', advance: true }, 'Mute for 24h'],
            },
          ],
          typingMs: 1600,
        },
      ],
      // Blank — the "Show the risk detail" button carries Beat 2 forward, so
      // the compose box stays empty after the alert.
      nextDraft: '',
    },

    // ── Beat 2: risk flag detail (risk flagging engine) ───────────────
    //    Advanced by the alert's "Show the risk detail" button: clicking it
    //    injects this userText and reveals the card. Compose stays blank.
    {
      userText:
        'I\'m two weeks into this territory and the introductory meeting isn\'t until next week. How urgent is this?',
      responses: [
        {
          senderId: 100,
          text:
            'BREA GENERAL — Risk flag detail. Three signals on an account already carrying 2023 distrust.',
          cards: [
            {
              accentColor: '#C4571A',
              iconType: 'teams',
              title: 'Brea General Hospital — Risk flag detail',
              subtitle: 'HIGH SEVERITY · Health score 34/100 · Renewal 112 days',
              badge: { text: 'Immediate action', tone: 'amber' },
              metrics: [
                { value: '40%', label: 'Win probability', delta: '↓ from 60%', deltaTone: 'amber' },
                { value: '180%', label: 'CTSO vs baseline', delta: '31 days', deltaTone: 'amber' },
                { value: '34', label: 'Health score', delta: 'Critical', deltaTone: 'amber' },
              ],
              sections: [
                {
                  heading: '3 risk parameters triggered (of 8 monitored)',
                  bullets: [
                    'Win probability 60% → 40% — no VOC trigger. Renewal in 112 days; can\'t wait.',
                    'CTSO at 180% of baseline for 31 days. After 2023, that\'s a loud signal — and Sysmex knows this account.',
                    'Unplanned DxH 900 service visit yesterday — 3 hrs down, Gina Park on shift. No one called her after.',
                  ],
                },
                {
                  heading: 'Competitive context',
                  bullets: [
                    'Heme techs moonlight at Pacific General — a Sysmex site.',
                    'PLT-F is a known talking point on the team.',
                    'No formal Sysmex eval yet — but the groundwork is being laid.',
                  ],
                },
                {
                  heading: 'What this means',
                  text:
                    'Downtime with no follow-up is exactly what accelerates a competitive switch. Act this week — don\'t wait for the meeting.',
                },
              ],
              footer: 'Risk flagging engine · 3 of 8 parameters firing',
              // Advance to the intervention playbook (Beat 3).
              actions: [{ label: 'Build the response plan', advance: true }, 'Initiate VOC trigger'],
            },
          ],
          chainOfThought: [
            'Correlated 3 of 8 risk parameters firing at once on one must-keep account',
            'Weighted the CTSO spike against the 2023 reagent-shortage history',
            'Flagged the DxH 900 downtime with no post-visit contact as the acute trigger',
            'Cross-referenced the Sysmex / PLT-F competitive signals',
          ],
          typingMs: 2600,
        },
      ],
      // Blank — "Build the response plan" carries Beat 3 forward.
      nextDraft: '',
    },

    // ── Beat 3: KF-tailored intervention playbook (risk + KF) ─────────
    //    Advanced by the risk card's "Build the response plan" button.
    {
      userText:
        'My RSM has been covering the account, but I want to help coordinate the response. Given the risk signals and the blue sheets I have on file, tell me exactly who to involve, in what order, and what each conversation needs to accomplish.',
      responses: [
        {
          senderId: 100,
          text:
            'BREA GENERAL — KF-tailored intervention playbook. RSM + PSE + you, sequenced to the people in the building.',
          cards: [
            {
              accentColor: '#7E3FAF',
              iconType: 'teams',
              title: 'Brea General — KF-tailored intervention playbook',
              subtitle: 'Response team: RSM + PSE + KAM (you) · Within 4 business days',
              badge: { text: 'Act within 4 days', tone: 'amber' },
              sections: [
                {
                  heading: '✓ Sequence',
                  text:
                    'Gina Park (PSE) → Estergreen (RSM + intro you) → Ortega (RSM + you). In that order. Before next week\'s meeting — not instead of it.',
                },
                {
                  heading: '▶ Step 1 — Gina Park (User · Trouble · +2)',
                  text:
                    'Send the PSE, not a KAM — technical credibility, not a pitch. Open by naming the DxH downtime; acknowledge it before she does. Address 2023 head-on (supply commitment, new protocols, reagent data). Raise PLT-F first — don\'t wait for her to. Do NOT lead with renewal; she needs to feel heard.',
                },
                {
                  heading: '▶ Step 2 — Dr. Joanne Estergreen (Technical · Growth · +4 · Coach)',
                  text:
                    'RSM\'s relationship, not yours yet. RSM briefs her and asks her to pre-frame Ortega before the meeting — she has credibility there that we don\'t. RSM introduces you on the call; lead with skiing. She\'ll remember that more than any pitch.',
                },
                {
                  heading: '▶ Step 3 — Sandra Ortega (Economic · Even Keel · +1)',
                  text:
                    'RSM + you. Do NOT reach her before Estergreen has. Even Keel — a service issue with no fix in hand turns her negative. Lead with supply commitments and process she can take to the CFO. Data first; relationship follows.',
                },
              ],
              footer: 'KF-tailored to each contact · Generated by TIP',
              actions: ['Assign the response team', 'Initiate VOC trigger', 'Add to renewal plan'],
            },
          ],
          chainOfThought: [
            'Sequenced the response against each contact\'s Korn Ferry mode and state',
            'Routed Park to the PSE (technical credibility), not a commercial KAM call',
            'Held Ortega until Estergreen can pre-frame — Even Keel risk',
            'Built the RSM-led intro path so Devon can start earning the relationships',
          ],
          typingMs: 2600,
        },
      ],
      // No nextDraft — the demo concludes on the sequence.
    },
  ],
}

// ── West Region Leadership group (id 204) ────────────────────────────────
// TIP posts the Monday digest (seeded statically). Devon opens the huddle to
// coordinate the Brea response; the team and TIP chain responses.
const leadershipGroup = {
  initialDraft:
    'team — brea flagged High overnight, two weeks into my territory and the intro meeting isn\'t until next week. @TIP gave me the sequence: park first (PSE), then estergreen (RSM), then ortega. tom, can you take the estergreen + ortega calls since you have the relationships?',
  steps: [
    {
      userText:
        'team — brea flagged High overnight, two weeks into my territory and the intro meeting isn\'t until next week. @TIP gave me the sequence: park first (PSE), then estergreen (RSM), then ortega. tom, can you take the estergreen + ortega calls since you have the relationships?',
      responses: [
        {
          senderId: 201, // Tom Hayes (RSM)
          text:
            'yes. i\'ll call joanne first — she\'s in growth mode and she\'ll advocate. i\'ll have her pre-frame ortega before we go anywhere near a contract conversation. and i\'ll introduce you on the estergreen call. ask her about skiing.',
          typingMs: 1500,
        },
        {
          senderId: 200, // Maria Santos (PSE)
          text:
            'i\'ll take park directly — technical, not commercial. opening with the DxH downtime, not the renewal. i\'ll bring the PLT-F head-to-head and the updated reagent protocols so the 2023 shortage is addressed before she raises it.',
          typingMs: 1600,
        },
        {
          senderId: 202, // Linda Castellano (Area Director)
          text:
            'good. hard rule: nobody contacts ortega before estergreen has briefed her. a service issue in front of an even-keel buyer with no resolution in hand moves her negative. i want a written read by thursday.',
          typingMs: 1500,
        },
        {
          senderId: 100, // TIP
          text:
            'Noted. I\'ll hold Ortega off the outreach list until Estergreen\'s pre-brief is logged, and alert this thread the moment any Brea signal moves. The 4-business-day response clock starts today.',
          typingMs: 1700,
        },
      ],
      nextDraft:
        '@TIP push the VOC trigger on brea now — i want structured feedback captured before maria\'s call with park.',
    },
    {
      userText:
        '@TIP push the VOC trigger on brea now — i want structured feedback captured before maria\'s call with park.',
      responses: [
        {
          senderId: 100,
          text:
            'VOC trigger initiated. Routed structured capture to Maria with prompts tuned to each contact. Results feed back into the risk model and improve future flag accuracy.',
          cards: [
            {
              accentColor: '#5B5FC7',
              iconType: 'teams',
              title: 'VOC trigger — Brea General · armed',
              subtitle: 'Routed to Maria Santos (PSE) · 3 structured prompts · Live now',
              badge: { text: 'Active', tone: 'green' },
              sections: [
                {
                  heading: 'Prompts in scope',
                  bullets: [
                    'Gina Park — severity and impact of the DxH 900 downtime; residual concerns from the 2023 shortage',
                    'Reagent supply — confidence in the updated inventory protocol and escalation path',
                    'Competitive — any Sysmex / PLT-F conversation surfacing in the heme team',
                  ],
                },
              ],
              footer: 'Auto-closes after the Park conversation lands · Results in next digest',
            },
          ],
          typingMs: 2000,
        },
        {
          senderId: 202,
          text: 'good. exactly the kind of pre-positioning we never did at scale before.',
          typingMs: 1100,
        },
      ],
    },
  ],
}

// ── Transitions Watch group (id 205) ─────────────────────────────────────
// TIP posts the transition alert (seeded statically). Devon confirms the
// hand-off, leadership arms the watch and distributes coverage.
const transitionsGroup = {
  initialDraft:
    'confirmed — i\'ve got the pacific northwest sub-region now (two weeks in). @TIP use this thread for any signal you raise on the inherited accounts during the 90-day window.',
  steps: [
    {
      userText:
        'confirmed — i\'ve got the pacific northwest sub-region now (two weeks in). @TIP use this thread for any signal you raise on the inherited accounts during the 90-day window.',
      responses: [
        {
          senderId: 202, // Linda Castellano
          text:
            'agree. @TIP arm a continuity watch on the top accounts. high alerting on brea — it\'s already flagged and devon hasn\'t built relationships there yet.',
          typingMs: 1500,
        },
        {
          senderId: 100,
          text:
            'Armed. 90-day post-transition risk window now active on Brea General, Cascadia Regional, and Pacific Coast Health. I\'ll surface any signal change in this thread within minutes of detection.',
          cards: [
            {
              accentColor: '#0B5394',
              iconType: 'teams',
              title: '90-day continuity watch — armed',
              subtitle: '3 accounts · Real-time alerts · Brea on high alerting',
              badge: { text: 'Monitoring', tone: 'green' },
              sections: [
                {
                  heading: 'What I am watching',
                  bullets: [
                    'CTSO call volume vs trailing 90d baseline (per account)',
                    'Unplanned field service visits and unresolved tickets',
                    'Win probability deltas > 10 points',
                    'Any contact note logged that hints at competitor activity (Sysmex)',
                  ],
                },
              ],
              footer: 'First scheduled check-in: next Monday 7:00 AM PT digest in this thread',
            },
          ],
          typingMs: 2000,
        },
        {
          senderId: 201, // Tom Hayes (RSM)
          text:
            'i\'ll keep bridging the brea relationships until devon has their own footing — estergreen and ortega especially. flagging any handoff moment here so we don\'t drop a thread mid-transition.',
          typingMs: 1500,
        },
      ],
      nextDraft:
        '@TIP if brea moves before the next digest, ping me here directly. don\'t wait for the scheduled check-in.',
    },
    {
      userText:
        '@TIP if brea moves before the next digest, ping me here directly. don\'t wait for the scheduled check-in.',
      responses: [
        {
          senderId: 100,
          text:
            'Configured. Brea General now has real-time alerting on this thread for any signal change above Medium severity. Default cadence (Monday digest) stays in place for everything else.',
          typingMs: 1500,
        },
        {
          senderId: 202,
          text: 'good. let\'s see what week one looks like.',
          typingMs: 1000,
        },
      ],
    },
  ],
}

export const chatScripts = {
  100: tip1on1,
  204: leadershipGroup,
  205: transitionsGroup,
}

// Compose draft pre-loaded on first load — used by the contacts data file
// to set the `draft` on the TIP chatList entry without importing the whole
// scripts map upstream.
export const ibipInitialDraft = tip1on1.initialDraft
