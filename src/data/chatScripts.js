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
            'BREA GENERAL HOSPITAL — Pre-meeting briefing. Eleven years of account history, the three people you\'re meeting and how each of them decides, and the note your predecessor left behind.',
          cards: [
            {
              accentColor: '#0B5394',
              iconType: 'teams',
              title: 'Brea General Hospital — Pre-meeting briefing',
              subtitle: '11-year account · $420K ACV · Renewal in 4 months · Must-keep in region',
              badge: { text: 'Pre-meeting briefing', tone: 'purple' },
              sections: [
                {
                  heading: 'Account overview',
                  bullets: [
                    '11-year Beckman Coulter account · $420K ACV · Renewal: 4 months · Must-keep in region',
                    'Instruments: DxH 900 (Hematology) + AU5800 + UA (Chemistry / Urinalysis)',
                  ],
                },
                {
                  heading: 'Account history',
                  bullets: [
                    '2016 — Initial DxH placement. Displaced Sysmex XE on morphology performance and service model.',
                    '2020 — Near-loss. Finance initiated a lab cost review; Roche submitted a chemistry proposal. Saved by Dr. Estergreen advocacy + an $18K reagent concession. Prior KAM: "Estergreen went to bat for us. Without her we lose this account."',
                    '2023 — DxH upgraded to DxH 900, UA microscopy added to Velocity, AU5800 installed on the chemistry side. Strong clinical reception.',
                    '2023 — ⚠ Reagent strip shortage (Q3). Brea impacted for 3 months. Gina Park (Heme Technical Lead) escalated repeatedly to RSM and AD. Chemistry renewal nearly at risk — Sandra Ortega flagged vendor reliability. Resolved with a supply commitment letter + an executive call. Distrust from the heme team remains.',
                    '2025 — RSM covered the account after the KAM retirement. Relationships maintained, not grown.',
                    '2026 — You inherit the territory. Renewal due Q3.',
                  ],
                },
                {
                  heading: 'Who you\'re meeting — Dr. Joanne Estergreen (Lab Director)',
                  bullets: [
                    'KF: Technical (T) · High influence · Growth mode · +4 · Active Coach (meets all 3 criteria)',
                    'Personal: Avid skier. Mentioning the mountains is a genuine connection point.',
                    '▶ She\'ll advocate for you. The RSM has the relationship. Your job is to earn it.',
                  ],
                },
                {
                  heading: 'Gina Park (Hematology Technical Lead)',
                  bullets: [
                    'KF: User (U) · Medium influence · Trouble mode · +2',
                    '⚠ Still carrying frustration from the 2023 reagent shortage. She will bring it up.',
                    '⚠ Several heme techs moonlight at Pacific General across town — a Sysmex site. PLT-F is a talking point, and Sysmex is using it to plant doubt.',
                    '▶ Acknowledge the shortage before she does. Have your PSE engage on PLT-F clinical data before the meeting.',
                  ],
                },
                {
                  heading: 'Sandra Ortega (Supply Chain Manager — reports to CFO)',
                  bullets: [
                    'KF: Economic (E) influence · High influence · Even Keel · +1',
                    '⚠ The 2023 shortage is still on her radar. Vendor reliability is her primary lens.',
                    '▶ Lead with supply chain commitments and contract protections, not product features. She has no relationship with us yet — earn trust with data. The RSM has met her once.',
                  ],
                },
                {
                  heading: 'Predecessor note (retiring KAM — summarized by TIP)',
                  text:
                    '"Estergreen is the anchor of this account. She trusts people, not companies. When you meet her, ask about skiing — she\'ll talk your ear off and she\'ll remember you. Do not send an email first. Call her. That\'s how she knows you\'re serious."',
                },
              ],
              footer:
                'Compiled from 11 years of logged interactions · predecessor relationship notes preserved',
              actions: ['Open the influence map', 'Add contacts to my calendar'],
            },
          ],
          chainOfThought: [
            'Reconstructed the 11-year account timeline, including the 2020 near-loss and 2023 reagent shortage',
            'Mapped the 3 meeting contacts to Korn Ferry profiles (type, mode, rating, Coach status)',
            'Surfaced competitive intel: Sysmex moonlighting techs at Pacific General and the PLT-F talking point',
            'Extracted the predecessor\'s verbatim relationship note on Dr. Estergreen — including the skiing detail',
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
                    '3 risk parameters triggered overnight. This is the same account — your #1 in the territory — and it can\'t wait for next week\'s introductory meeting.',
                },
              ],
              footer: 'Detected overnight by TIP · Action required',
              actions: ['Show the risk detail', 'Mute for 24h'],
            },
          ],
          typingMs: 1600,
        },
      ],
      nextDraft:
        'IBIP just flagged Brea General as high severity overnight. I\'m two weeks into this territory and the introductory meeting isn\'t until next week. What are the risk signals and how urgent is this?',
    },

    // ── Beat 2: risk flag detail (risk flagging engine) ───────────────
    {
      userText:
        'IBIP just flagged Brea General as high severity overnight. I\'m two weeks into this territory and the introductory meeting isn\'t until next week. What are the risk signals and how urgent is this?',
      responses: [
        {
          senderId: 100,
          text:
            'BREA GENERAL HOSPITAL — Risk flag detail. Three parameters triggered on an account already carrying 2023 distrust. Here is why it can\'t wait for next week.',
          cards: [
            {
              accentColor: '#C4571A',
              iconType: 'teams',
              title: 'Brea General Hospital — Risk flag detail',
              subtitle: 'HIGH SEVERITY · Health score 34/100 (Critical) · Renewal 112 days',
              badge: { text: 'Immediate action', tone: 'amber' },
              metrics: [
                { value: '40%', label: 'Win probability', delta: '↓ from 60%', deltaTone: 'amber' },
                { value: '180%', label: 'CTSO vs baseline', delta: '31 days running', deltaTone: 'amber' },
                { value: '34', label: 'Health score', delta: 'Critical', deltaTone: 'amber' },
              ],
              sections: [
                {
                  heading: '3 risk parameters triggered (of 8 monitored)',
                  bullets: [
                    'Win probability dropped from 60% to 40% — no Voice of Customer trigger initiated. On a must-keep with renewal in 112 days, this cannot wait.',
                    'CTSO call volume at 180% of 90-day baseline for 31 consecutive days. Elevated support contact correlates with operational frustration — and given the 2023 shortage history, it carries extra weight. Sysmex is aware of this account. This is the window they use.',
                    'Unplanned field service visit logged yesterday — DxH 900 offline 3 hours, hematology downtime. Gina Park was on shift. No rep or KAM contact made post-visit.',
                  ],
                },
                {
                  heading: 'Competitive context',
                  bullets: [
                    'Sysmex has been active with the hematology department.',
                    'Multiple heme techs moonlight at Pacific General across town — a Sysmex site.',
                    'PLT-F (platelet flagging) is a known talking point among the team.',
                    'No formal Sysmex evaluation initiated — but the groundwork is being laid.',
                  ],
                },
                {
                  heading: 'What this means',
                  text:
                    'Three signals on an account already carrying 2023 distrust. Instrument downtime with no follow-up contact is exactly the trigger that accelerates a competitive conversation. This requires active response this week — do not wait for next week\'s introductory meeting.',
                },
              ],
              footer: 'Risk flagging engine · 3 of 8 parameters firing',
              actions: ['Build the response plan', 'Initiate VOC trigger'],
            },
          ],
          chainOfThought: [
            'Correlated 3 of 8 risk parameters firing simultaneously on one must-keep account',
            'Weighted the CTSO spike against the 2023 reagent-shortage history',
            'Flagged the unplanned DxH 900 downtime with no post-visit contact as the acute trigger',
            'Cross-referenced competitive signals: Sysmex site moonlighting + PLT-F chatter',
          ],
          typingMs: 2600,
        },
      ],
      nextDraft:
        'My RSM has the relationships here but I need to help coordinate the response. Given the risk signals and the KF profiles I have on file, tell me exactly who to involve, in what order, and what each conversation needs to accomplish.',
    },

    // ── Beat 3: KF-tailored intervention playbook (risk + KF) ─────────
    {
      userText:
        'My RSM has the relationships here but I need to help coordinate the response. Given the risk signals and the KF profiles I have on file, tell me exactly who to involve, in what order, and what each conversation needs to accomplish.',
      responses: [
        {
          senderId: 100,
          text:
            'BREA GENERAL — KF-tailored intervention playbook. RSM + PSE + you, sequenced to the people in the building. Run it before next week\'s meeting — not instead of it.',
          cards: [
            {
              accentColor: '#7E3FAF',
              iconType: 'teams',
              title: 'Brea General — KF-tailored intervention playbook',
              subtitle: 'Response team: RSM + PSE + KAM (you) · Target: within 4 business days',
              badge: { text: 'Act within 4 days', tone: 'amber' },
              sections: [
                {
                  text:
                    'Do not wait for next week\'s introductory meeting. The window is closing.',
                },
                {
                  heading: '▶ Step 1 — Gina Park (User · Trouble · +2)',
                  text:
                    'She was on shift when the instrument went down. No one called her after. She is in Trouble mode — feeling pain, carrying distrust from 2023. Have your PSE and service manager contact her directly about the DxH downtime — a technical credibility conversation, not a commercial one. PSE opens by naming the downtime event specifically; acknowledge it before she does. Address the 2023 shortage proactively: the supply commitment, updated inventory protocols, and reagent-consistency data. On PLT-F, have the PSE ready with a head-to-head comparison — the Pacific General techs are talking about it and Park is hearing it, so raise it first. Do NOT open with renewal or account status — she needs to feel heard first. (Resolving heme builds the bridge into the chemistry opportunity.)',
                },
                {
                  heading: '▶ Step 2 — Dr. Joanne Estergreen (Technical · Growth · +4 · Coach)',
                  text:
                    'The RSM calls Joanne — this is the RSM\'s relationship, not yours yet. She is in Growth mode and will advocate if given a reason. RSM briefs her on the service event and the response plan, and asks her to pre-frame the situation with Sandra Ortega before the formal meeting — Joanne has credibility with Ortega that our commercial team does not have yet. This is also your opening: the RSM introduces you on this call. Lead with something personal — ask about skiing. Joanne will remember that more than any product discussion.',
                },
                {
                  heading: '▶ Step 3 — Sandra Ortega (Economic · Even Keel · +1)',
                  text:
                    'RSM + you together. Do NOT go to Ortega before Joanne has briefed her. She is Even Keel — no strong position, no urgency; vendor reliability is her lens. Introducing a service issue before a resolution plan is in hand moves her negative. Lead with supply chain commitments: updated inventory protocol, escalation path, executive contact — something she can document for the CFO. Do not lead with product or relationship. Data and process first; relationship follows.',
                },
                {
                  heading: '✓ Sequence',
                  text:
                    'Gina Park (PSE) → Estergreen (RSM + intro you) → Ortega (RSM + you). In that order. Before next week\'s meeting — not instead of it.',
                },
              ],
              footer: 'KF-tailored to each contact\'s profile and emotional state · Generated by TIP',
              actions: ['Assign the response team', 'Initiate VOC trigger', 'Add to renewal plan'],
            },
          ],
          chainOfThought: [
            'Sequenced the response against each contact\'s Korn Ferry mode and current state',
            'Routed Park to the PSE (technical credibility) rather than a commercial KAM call',
            'Kept Ortega out of the sequence until Estergreen can pre-frame — Even Keel risk',
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
