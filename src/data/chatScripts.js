// Scripted send-by-send flows. Each entry is keyed by chat id and drives
// the interactive demo: only the IBIP-initiated message(s) are seeded into
// `messagesByContact`. Everything else — the user's reply (pre-loaded as
// a compose draft) and the chained team/agent responses — plays out when
// the user clicks Send.
//
// Shape:
//   {
//     initialDraft: string,           // compose pre-fill on first load
//     steps: [
//       {
//         userText: string,           // the user message that gets sent
//         responses: [
//           {
//             senderId,               // contact id (or 100 = IBIP)
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

// ── IBIP 1:1 chat (id 100) ───────────────────────────────────────────────
// Narrative arc:
//   • You just inherited the Pacific Northwest sub-region from Carla.
//   • You ask IBIP to brief you on Brea General — your most exposed must-keep.
//   • A few days pass; you log in and IBIP has flagged Brea overnight.
//   • You ask for the Korn Ferry-tailored intervention brief.
const ibip1on1 = {
  initialDraft:
    'i want to dig into brea general — it is a must-keep and i do not know the room yet. pull the full history including the 2019 near-loss.',
  steps: [
    // ── Beat 1: full account history pull ─────────────────────────────
    {
      userText:
        'i want to dig into brea general — it is a must-keep and i do not know the room yet. pull the full history including the 2019 near-loss.',
      responses: [
        {
          senderId: 100,
          text:
            'Pulling 11 years of account history. Two near-loss events on file (2019, 2022) plus current state. Summary below — say the word and I will expand any section.',
          cards: [
            {
              accentColor: '#0B5394',
              iconType: 'teams',
              title: 'Brea General Hospital — Account history',
              subtitle:
                '11 yrs as a Beckman customer · 4 prior reps · 2 near-loss events recovered',
              badge: { text: 'Living memory', tone: 'purple' },
              sections: [
                {
                  heading: '2019 near-loss — what happened',
                  text:
                    'Sysmex pitched a full-system replacement after a 6-week period of CTSO-flagged reagent inconsistencies. Then-rep David Halpern (retired Q1-2024) saved the account by escalating to Area Director Linda Park and personally walking Dr. Marcus Lee (then-CMO, since departed) through the QA improvement plan. Halpern noted: "Lee makes decisions over coffee, not in conference rooms — Sysmex made the mistake of presenting in a boardroom."',
                },
                {
                  heading: '2022 — coverage gap, brief vulnerability',
                  text:
                    'HSE turnover left the account uncovered for 11 weeks. Maria Santos picked it up and re-grounded the relationship through Dr. Voss\'s predecessor. No competitor activity surfaced but Voss arrived during that window and never received an executive intro from us. That gap is the one to close now.',
                },
                {
                  heading: 'What every prior rep emphasized',
                  bullets: [
                    'Voss is decisive, analytical, prefers written context before meetings',
                    'The lab supervisor (Ana Reyes, on file) is the daily relationship — never bypass her',
                    'Pricing conversations land better in March/April when their fiscal year resets',
                    'Never lead with technology — Brea cares about turnaround time and downtime, full stop',
                  ],
                },
              ],
              footer:
                'Compiled from 247 logged interactions, 12 CTSO tickets, 3 field-service notes',
              actions: ['Show full 2019 timeline', 'Ask a follow-up'],
            },
          ],
          chainOfThought: [
            'Pulled all 247 logged account interactions from 2014 to present',
            'Cross-referenced 12 CTSO ticket threads and 3 field-service notes',
            'Identified 2 documented near-loss events and recovery narratives',
            'Surfaced retired rep David Halpern\'s qualitative notes from the 2019 save',
            'Mapped current contacts (Voss, Reyes) to relationship state',
          ],
          typingMs: 2200,
        },
      ],
      nextDraft: 'good context. what is on my plate this morning?',
    },

    // ── Beat 2: morning check-in surfaces the overnight risk flag ────
    {
      userText: 'good context. what is on my plate this morning?',
      responses: [
        {
          senderId: 100,
          text:
            'Good morning. While you were heads-down on the territory transition, Brea General crossed two risk thresholds overnight. This is the account you were just briefing yourself on — and now it needs you.',
          cards: [
            {
              accentColor: '#C4571A',
              iconType: 'teams',
              title: 'Brea General Hospital — Risk flag raised',
              subtitle: 'Tier 1 · Must-keep in geo · $2.1M ARR · Renewal in 84 days',
              badge: { text: 'High severity', tone: 'amber' },
              metrics: [
                { value: '58%', label: 'Win probability', delta: '↓ 19 pts (90d)', deltaTone: 'amber' },
                { value: '2', label: 'Risk signals firing', delta: 'L1 + CTSO', deltaTone: 'amber' },
                { value: '0', label: 'L1 relationships on file', delta: 'gap', deltaTone: 'amber' },
              ],
              sections: [
                {
                  heading: 'Signals firing now',
                  bullets: [
                    'Win probability dropped below 60% threshold — no VOC trigger initiated yet',
                    'No documented relationship with Dr. Patricia Voss (CMO, L1 decision-maker)',
                    'CTSO call volume +42% vs trailing 90-day baseline — sample-handling issue trending',
                    'Unplanned field service visit logged 4/29 on the DxH 900 line',
                  ],
                },
                {
                  heading: 'What I would do',
                  text:
                    'HSE Maria Santos reaches Dr. Voss this week with a written executive brief in advance — Voss is an Analytical buyer (see her Korn Ferry profile). I have a tailored playbook ready when you want it.',
                },
              ],
              footer: 'Flagged overnight · Auto-routed to you because you own the account as of Friday',
              actions: ['Open intervention playbook', 'Initiate VOC trigger', 'Mute for 24h'],
            },
          ],
          typingMs: 2400,
        },
      ],
      nextDraft:
        'give me the intervention playbook tailored to voss specifically — i want to brief maria before she reaches out.',
    },

    // ── Beat 3: Korn Ferry-tailored intervention playbook ────────────
    {
      userText:
        'give me the intervention playbook tailored to voss specifically — i want to brief maria before she reaches out.',
      responses: [
        {
          senderId: 100,
          text:
            'Tailored to Dr. Voss\'s buyer profile (Analytical — evidence before conversation). Maria can take this into a 15-minute call and not have to translate it.',
          cards: [
            {
              accentColor: '#7E3FAF',
              iconType: 'teams',
              title: 'Intervention playbook — Dr. Patricia Voss',
              subtitle: 'CMO, Brea General · Analytical decision style (Korn Ferry)',
              badge: { text: 'Recommended this week', tone: 'green' },
              sections: [
                {
                  heading: 'Buyer profile snapshot',
                  bullets: [
                    'Decision style: Analytical — wants evidence in writing before any verbal pitch',
                    'Pace: Deliberate. Will not be rushed. Push for a same-week ask and lose her',
                    'Trust drivers: Reproducible data, peer benchmarks, named clinical references',
                    'Avoid: Relationship-first openers, generic capability slides, anything that sounds like a sales pitch',
                  ],
                },
                {
                  heading: 'Recommended opener (paste into email)',
                  text:
                    '"Dr. Voss — ahead of our renewal conversation, attaching a 2-page utilization summary covering downtime, turnaround time, and cost-per-test on the DxH 900 line over the last 18 months. Includes the side-by-side against the 3 most relevant peer institutions in our reference base. Available for a 30-minute conversation any time after you have had a chance to review."',
                },
                {
                  heading: 'What to lead with on the call',
                  bullets: [
                    'Utilization benchmark vs peer hospitals (have the PDF open, not slides)',
                    'Cost-per-test trend with the unplanned-service event isolated and explained',
                    'A specific commitment on the CTSO-flagged reagent issue with a named owner and date',
                    'Stay quiet after presenting each data point — let her process',
                  ],
                },
                {
                  heading: 'What to avoid',
                  bullets: [
                    'Do not open with "how have you been" or any rapport-building preamble — she reads it as wasted time',
                    'No bundled "platform vision" talk track — she wants the specific account, not the strategy',
                    'Do not commit to anything verbally you cannot put in writing in the same call',
                  ],
                },
              ],
              footer:
                'Korn Ferry profile populated by David Halpern (2019), updated by Maria Santos (2024)',
              actions: ['Send brief to Maria', 'Generate the utilization PDF', 'Schedule the call'],
            },
          ],
          typingMs: 2400,
        },
      ],
      // No nextDraft — demo concludes. The audience can ask freeform if they want.
    },
  ],
}

// ── West Region Leadership group (id 204) ────────────────────────────────
// IBIP posts the Monday digest (seeded statically). Then the user kicks off
// the team huddle and four responses chain — Maria, Linda, Tom, IBIP.
const leadershipGroup = {
  initialDraft:
    'team — brea is the priority this week. maria, are we still on track for the voss outreach today?',
  steps: [
    {
      userText:
        'team — brea is the priority this week. maria, are we still on track for the voss outreach today?',
      responses: [
        {
          senderId: 200, // Maria Santos
          text:
            'voss outreach goes today 3pm pt. brief is genuinely tailored to her — first time i have not had to rewrite an ibip draft. will report back in this thread once she responds.',
          typingMs: 1400,
        },
        {
          senderId: 202, // Linda Park
          text:
            'good. tagging this thread for the leadership review thursday. jordan + maria — by then i want a written read on whether voss has engaged. if she has not responded by wed eod we escalate.',
          typingMs: 1500,
        },
        {
          senderId: 201, // Tom Hayes
          text:
            'unrelated to brea — spokane SE settled in well. frank russo is asking about the next firmware release on the AU680. is that an account question or a CTSO question?',
          typingMs: 1200,
        },
        {
          senderId: 100, // IBIP
          text:
            'Both. I logged Frank\'s question against Spokane\'s contact record and routed a copy to CTSO for the firmware roadmap response. Tom, you will see a draft reply in your queue by 10am.',
          typingMs: 1600,
        },
      ],
      nextDraft:
        'ibip — push the brea voc trigger now. i want it in motion before maria\'s call lands today.',
    },
    {
      userText:
        'ibip — push the brea voc trigger now. i want it in motion before maria\'s call lands today.',
      responses: [
        {
          senderId: 100,
          text:
            'VOC trigger initiated. Routed structured capture to Maria with three prompts tuned to Dr. Voss\'s profile — utilization, downtime sensitivity, peer comparison. Results feed back into the risk model and improve future flag accuracy.',
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
                    'Utilization trend over 18 months vs peer reference base',
                    'Sensitivity to downtime on the DxH 900 line — what threshold matters?',
                    'How does cost-per-test compare to the two most relevant peer institutions?',
                  ],
                },
              ],
              footer: 'Auto-closes after Voss conversation lands · Results in next digest',
            },
          ],
          typingMs: 2000,
        },
        {
          senderId: 202,
          text: 'good. exactly the kind of pre-positioning we never used to do at scale.',
          typingMs: 1100,
        },
      ],
    },
  ],
}

// ── Transitions Watch group (id 205) ─────────────────────────────────────
// IBIP posts the retirement alert (seeded statically). User confirms
// inheritance, leadership distributes the work, IBIP arms the watch.
const transitionsGroup = {
  initialDraft:
    'confirmed — i pick up the full pacific NW sub-region monday. let us use this thread for any signal ibip raises during the 90-day window.',
  steps: [
    {
      userText:
        'confirmed — i pick up the full pacific NW sub-region monday. let us use this thread for any signal ibip raises during the 90-day window.',
      responses: [
        {
          senderId: 202, // Linda Park
          text:
            'agree. ibip — set up an automatic continuity watch on the 4 must-keep accounts. tier 1 alerting on each, surfaced here the moment anything moves.',
          typingMs: 1500,
        },
        {
          senderId: 100,
          text:
            'Armed. 90-day post-transition risk window now active on Brea General, Tacoma Regional, Bellevue Health, and Spokane County. I will surface any signal change in this thread within minutes of detection.',
          cards: [
            {
              accentColor: '#0B5394',
              iconType: 'teams',
              title: '90-day continuity watch — armed',
              subtitle: '4 accounts · Active May 16 → Aug 14 · Real-time alerts',
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
              footer: 'First scheduled check-in: Mon May 18, 7:00 AM PT digest in this thread',
            },
          ],
          typingMs: 2000,
        },
        {
          senderId: 200, // Maria Santos
          text:
            'i can bridge the intro calls for tacoma + bellevue this week — carla and i will do them together so jordan walks into a warm room next week. spokane jordan should do solo, frank prefers one new face at a time.',
          typingMs: 1500,
        },
      ],
      nextDraft:
        'works. one ask — if brea moves before next monday\'s digest, ping me here directly. do not wait for the scheduled check-in.',
    },
    {
      userText:
        'works. one ask — if brea moves before next monday\'s digest, ping me here directly. do not wait for the scheduled check-in.',
      responses: [
        {
          senderId: 100,
          text:
            'Configured. Brea General now has real-time alerting on this thread for any signal change above Medium severity. Default cadence (Monday digest) stays in place for everything else.',
          typingMs: 1500,
        },
        {
          senderId: 202,
          text: 'good. let us see what week one looks like.',
          typingMs: 1000,
        },
      ],
    },
  ],
}

export const chatScripts = {
  100: ibip1on1,
  204: leadershipGroup,
  205: transitionsGroup,
}

// Compose draft pre-loaded on first load — used by the contacts data file
// to set the `draft` on the IBIP chatList entry without importing the whole
// scripts map upstream.
export const ibipInitialDraft = ibip1on1.initialDraft
