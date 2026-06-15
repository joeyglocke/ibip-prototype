// Scripted send-by-send flows. Each entry is keyed by chat id and drives
// the interactive demo: only the TIP-initiated message(s) are seeded into
// `messagesByContact`. Everything else — the user's reply (pre-loaded as
// a compose draft) and the chained team/agent responses — plays out when
// the user clicks Send.
//
// The 1:1 TIP flow (id 100) follows the v2 Live Demo Script exactly:
//   OPEN  — overnight alert seeded in messages.js (the door opens)
//   Beat 1 — day-one territory briefing (institutional memory)
//   Beat 2 — full account history + buying influence map (memory + Korn Ferry)
//   Beat 3 — return to the alert, KF-tailored intervention playbook
//
// Shape:
//   {
//     initialDraft: string,           // compose pre-fill on first load
//     steps: [
//       {
//         userText: string,           // the user message that gets sent
//         responses: [
//           {
//             senderId,               // contact id (or 100 = TIP)
//             text,
//             cards?, chainOfThought?,
//             typingMs?,              // how long to show typing for this sender
//             gapMs?,                 // pause after the message appears
//           },
//           ...
//         ],
//         nextDraft?: string,          // chain into compose after responses
//       },
//     ],
//   }

// ── TIP 1:1 chat (id 100) ────────────────────────────────────────────────
const tip1on1 = {
  initialDraft:
    'I just inherited the Pacific Northwest sub-region. Give me my day-one territory briefing.',
  steps: [
    // ── Beat 1: day-one territory briefing (institutional memory) ─────
    {
      userText:
        'I just inherited the Pacific Northwest sub-region. Give me my day-one territory briefing.',
      responses: [
        {
          senderId: 100,
          text:
            'TERRITORY BRIEFING — Pacific Northwest sub-region. Top accounts, the items that need you first, and the notes your predecessor left behind.',
          cards: [
            {
              accentColor: '#0B5394',
              iconType: 'teams',
              title: 'Territory briefing — Pacific Northwest',
              subtitle: 'Day one · 3 top accounts · inherited from a retiring rep',
              badge: { text: 'Day-one briefing', tone: 'purple' },
              sections: [
                {
                  heading: 'Top accounts by revenue + risk',
                  bullets: [
                    'Brea General Hospital — $420K ACV · Renewal in 4 months · ⚠ Must-keep in region',
                    'Cascadia Regional Medical — $210K ACV · Renewal in 11 months · Healthy',
                    'Pacific Coast Health System — $180K ACV · Renewal in 8 months · Monitor',
                  ],
                },
                {
                  heading: 'Immediate action items',
                  bullets: [
                    '⚠ Brea General: No L1 contact in 97 days. Renewal in 4 months.',
                    '⚠ Brea General: Siemens contacted hematology dept twice in Q3. No formal eval — yet.',
                    '✓ Cascadia Regional: Strong relationship. HSE engaged. No flags.',
                  ],
                },
                {
                  heading: 'Predecessor notes (retiring rep — summarized by TIP)',
                  text:
                    '"Brea General has been loyal for 11 years but the relationship lives with one person: Dr. Patricia Walsh, Lab Director. She trusts Beckman Coulter but she trusts people, not companies. Call her personally within 3 days of taking this territory. Do not send an email first."',
                },
              ],
              footer:
                'Predecessor: 9 years on this account · retired last week · 1,840 interactions preserved',
              actions: ['Open Brea General', 'View all accounts', 'Add contacts to calendar'],
            },
          ],
          chainOfThought: [
            'Pulled the retiring rep\'s full interaction history across the sub-region',
            'Ranked the top 3 accounts by revenue and current risk signals',
            'Surfaced immediate action items, including the 97-day L1 contact gap on Brea',
            'Extracted the predecessor\'s verbatim relationship note on Dr. Walsh',
          ],
          typingMs: 2200,
        },
      ],
      nextDraft:
        'Pull the full account history on Brea General Hospital and give me the buying influence map so I know how to approach each person before I walk in.',
    },

    // ── Beat 2: full history + buying influence map (memory + KF) ─────
    {
      userText:
        'Pull the full account history on Brea General Hospital and give me the buying influence map so I know how to approach each person before I walk in.',
      responses: [
        {
          senderId: 100,
          text:
            'BREA GENERAL HOSPITAL — Full history and buying influence map. Here is who is in the building and how each of them makes decisions.',
          cards: [
            {
              accentColor: '#0B5394',
              iconType: 'teams',
              title: 'Brea General Hospital — Full history + buying influence map',
              subtitle: '11-year account · $420K ACV · 3 key contacts mapped',
              badge: { text: 'Memory + Korn Ferry', tone: 'purple' },
              sections: [
                {
                  heading: '11-year account history',
                  bullets: [
                    '2014 — Initial DxH 800 placement. Won vs Sysmex on morphology performance.',
                    '2019 — Near-loss. CFO initiated cost review, Roche submitted a competitive proposal. Saved by Dr. Walsh advocacy + $18K reagent concession. Prior rep: "Walsh went to bat for us. Without her we lose this account."',
                    '2022 — AU5800 chemistry expansion. Unopposed renewal.',
                    '2024 — New CFO appointed (James Okafor, 6 months in role). No relationship established.',
                  ],
                },
                {
                  heading: 'Dr. Patricia Walsh — Lab Director',
                  bullets: [
                    'Type: Technical (T) · Influence: High · Mode: Growth · Rating: +4',
                    'Competitive pref: Buy from us · COACH STATUS: Active — meets all 3 KF criteria',
                    '▶ Approach: She wants change and will advocate for you. Engage her first. Let her shape the conversation with the CFO.',
                  ],
                },
                {
                  heading: 'James Okafor — CFO (new)',
                  bullets: [
                    'Type: Economic (E) · Influence: High · Mode: Even Keel · Rating: +1',
                    'Competitive pref: Unknown — no prior relationship data',
                    '⚠ Same buyer profile as the CFO who initiated the 2019 near-loss.',
                    '▶ Approach: Lead with TCO and cost-per-test data. Do not lead with relationship — he doesn\'t have one with you yet.',
                  ],
                },
                {
                  heading: 'Dr. Marcus Lee — Hematology Medical Director',
                  bullets: [
                    'Type: User (U) · Influence: Medium · Mode: Trouble · Rating: +2',
                    '▶ Approach: He is feeling operational pain. Assign HSE for a clinical deep-dive before any commercial conversation.',
                  ],
                },
              ],
              footer:
                'Korn Ferry profiles populated from logged interactions · 2019 CFO callback auto-linked to Okafor',
              actions: ['Open the overnight alert', 'Export the influence map'],
            },
          ],
          chainOfThought: [
            'Reconstructed the 11-year account timeline from 247 logged interactions',
            'Mapped 3 key contacts to Korn Ferry buyer profiles (type, mode, rating)',
            'Ran the 3 Coach criteria against Dr. Walsh — all met, flagged Active Coach',
            'Linked the 2019 near-loss CFO profile to the 2024 CFO Okafor automatically',
          ],
          typingMs: 2400,
        },
      ],
      nextDraft:
        'Open the Brea General overnight alert and give me the full intervention playbook.',
    },

    // ── Beat 3: return to the alert, KF-tailored playbook (risk + KF) ─
    {
      userText:
        'Open the Brea General overnight alert and give me the full intervention playbook.',
      responses: [
        {
          senderId: 100,
          text:
            'OVERNIGHT RISK ALERT — Brea General Hospital. Here it is. And now that you know who is in that building, the playbook is sequenced to them.',
          cards: [
            {
              accentColor: '#C4571A',
              iconType: 'teams',
              title: '⚠ Overnight risk alert — Brea General Hospital',
              subtitle: 'HIGH SEVERITY · Must-keep in region · Renewal: 112 days',
              badge: { text: 'High severity', tone: 'amber' },
              metrics: [
                { value: '54%', label: 'Win probability', delta: 'no VOC trigger', deltaTone: 'amber' },
                { value: '180%', label: 'CTSO vs baseline', delta: '31 days running', deltaTone: 'amber' },
                { value: '38', label: 'Health score', delta: 'Critical', deltaTone: 'amber' },
              ],
              sections: [
                {
                  heading: 'Risk signals triggered (3 of 8 active parameters)',
                  bullets: [
                    'Win probability: 54% — no VOC trigger on file',
                    'CTSO call volume: 180% of 90-day baseline for 31 consecutive days',
                    'Unplanned field service visit logged yesterday — AU5800 calibration flag',
                  ],
                },
                {
                  heading: 'Account context',
                  bullets: [
                    'Health score: 38 (Critical). Last L1 contact: CFO Okafor, 3 days ago, rating +1.',
                    'Competitive risk: Siemens hematology outreach Q3. No formal eval — yet.',
                  ],
                },
                {
                  heading: 'KF-tailored intervention playbook',
                  text: 'Assign: HSE + RSM joint response within 5 business days.',
                },
                {
                  heading: '▶ Step 1 — Dr. Marcus Lee (User · Trouble · +2)',
                  text:
                    'Open by naming the calibration issue specifically. Do NOT open with renewal or features. He is in Trouble mode — he needs to feel heard before he will hear anything else. Validate the pain. Present the resolution plan. Only then move to the broader conversation.',
                },
                {
                  heading: '▶ Step 2 — Dr. Patricia Walsh (Technical · Growth · +4 · Coach)',
                  text:
                    'Brief her before any CFO contact. She can pre-frame the service situation with Okafor so it doesn\'t land cold. She is your Coach — use her.',
                },
                {
                  heading: '▶ Step 3 — James Okafor (Economic · Even Keel · +1)',
                  text:
                    'Do NOT contact yet. He is Even Keel — a service issue without a resolution in hand moves him from neutral to negative. Wait for Walsh to brief him first. Then follow with TCO data and a formal resolution summary.',
                },
                {
                  heading: '✓ Sequence',
                  text: 'Lee → Walsh → Okafor. In that order. Not simultaneously.',
                },
              ],
              footer: 'KF-tailored to the 3 mapped contacts · Generated overnight by TIP',
              actions: ['Assign HSE + RSM', 'Initiate VOC trigger', 'Add to renewal plan'],
            },
          ],
          chainOfThought: [
            'Correlated 3 of 8 risk parameters firing simultaneously on one account',
            'Linked the unplanned AU5800 service visit to the open renewal 112 days out',
            'Sequenced the intervention against each contact\'s Korn Ferry mode and rating',
            'Held Okafor out of the sequence until Walsh can pre-frame — Even Keel risk',
          ],
          typingMs: 2600,
        },
      ],
      // No nextDraft — the demo concludes on the sequence. Presenter returns
      // to the deck.
    },
  ],
}

// ── West Region Leadership group (id 204) ────────────────────────────────
// TIP posts the Monday digest (seeded statically). The user opens the huddle
// to coordinate the Brea intervention; the team and TIP chain responses.
const leadershipGroup = {
  initialDraft:
    'team — brea flagged High the morning i took over. @TIP gave me the sequence: lee first, then walsh, then okafor. maria, can you lead the clinical deep-dive with dr. lee?',
  steps: [
    {
      userText:
        'team — brea flagged High the morning i took over. @TIP gave me the sequence: lee first, then walsh, then okafor. maria, can you lead the clinical deep-dive with dr. lee?',
      responses: [
        {
          senderId: 200, // Maria Santos (HSE)
          text:
            'yes. lee is in trouble mode over the AU5800 calibration flag — i\'ll open by naming it, not pitching. on-site this week. once he feels heard i\'ll loop you for the broader conversation.',
          typingMs: 1500,
        },
        {
          senderId: 202, // Linda Park (Area Director)
          text:
            'good. do NOT let anyone contact okafor before walsh briefs him — @TIP flagged he\'s the same profile as the CFO who nearly lost us this account in 2019. i want a written read by thursday.',
          typingMs: 1600,
        },
        {
          senderId: 201, // Tom Hayes (RSM)
          text:
            'i\'ll cover the RSM side of the joint response. free thursday/friday if alex wants a second on the walsh brief.',
          typingMs: 1200,
        },
        {
          senderId: 100, // TIP
          text:
            'Noted. I will hold Okafor off the outreach list until Walsh\'s pre-brief is logged, and alert this thread the moment any Brea signal moves. The 5-business-day response clock starts today.',
          typingMs: 1700,
        },
      ],
      nextDraft:
        '@TIP push the VOC trigger on brea now — i want structured feedback captured before the lee conversation.',
    },
    {
      userText:
        '@TIP push the VOC trigger on brea now — i want structured feedback captured before the lee conversation.',
      responses: [
        {
          senderId: 100,
          text:
            'VOC trigger initiated. Routed structured capture to Maria with prompts tuned to each contact\'s profile. Results feed back into the risk model and improve future flag accuracy.',
          cards: [
            {
              accentColor: '#5B5FC7',
              iconType: 'teams',
              title: 'VOC trigger — Brea General · armed',
              subtitle: 'Routed to Maria Santos · 3 structured prompts · Live now',
              badge: { text: 'Active', tone: 'green' },
              sections: [
                {
                  heading: 'Prompts in scope',
                  bullets: [
                    'Dr. Lee — severity and timeline of the AU5800 calibration issue',
                    'Dr. Walsh — willingness to pre-frame the service situation with Okafor',
                    'General — any Siemens contact since the Q3 hematology outreach',
                  ],
                },
              ],
              footer: 'Auto-closes after the Lee conversation lands · Results in next digest',
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
// TIP posts the transition alert (seeded statically). User confirms the
// hand-off, leadership arms the watch and distributes coverage.
const transitionsGroup = {
  initialDraft:
    'confirmed — i\'ve got the pacific northwest sub-region. @TIP use this thread for any signal you raise on the inherited accounts during the 90-day window.',
  steps: [
    {
      userText:
        'confirmed — i\'ve got the pacific northwest sub-region. @TIP use this thread for any signal you raise on the inherited accounts during the 90-day window.',
      responses: [
        {
          senderId: 202, // Linda Park
          text:
            'agree. @TIP arm a continuity watch on the 3 top accounts. high alerting on brea given it\'s already flagged.',
          typingMs: 1500,
        },
        {
          senderId: 100,
          text:
            'Armed. 90-day post-transition risk window now active on Brea General, Cascadia Regional, and Pacific Coast Health. I will surface any signal change in this thread within minutes of detection.',
          cards: [
            {
              accentColor: '#0B5394',
              iconType: 'teams',
              title: '90-day continuity watch — armed',
              subtitle: '3 accounts · Active Jun 15 → Sep 13 · Real-time alerts',
              badge: { text: 'Monitoring', tone: 'green' },
              sections: [
                {
                  heading: 'What I am watching',
                  bullets: [
                    'CTSO call volume vs trailing 90d baseline (per account)',
                    'Unplanned field service visits and unresolved tickets',
                    'Win probability deltas > 10 points',
                    'Any contact note logged that hints at competitor activity',
                  ],
                },
              ],
              footer: 'First scheduled check-in: Mon Jun 22, 7:00 AM PT digest in this thread',
            },
          ],
          typingMs: 2000,
        },
        {
          senderId: 200, // Maria Santos
          text:
            'i\'ll bridge the predecessor handoff on dr. walsh this week — she expects it. lee i\'ll take directly given the calibration issue. okafor waits per the sequence.',
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
