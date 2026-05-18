// Scripted flow for the IBIP demo. Each step is one user→agent exchange:
// the user sends `userText` (pre-loaded into compose so the demo driver just
// clicks send), then after a typing delay IBIP responds with `response` —
// a message-shaped object that gets appended to the chat canvas.
//
// `nextDraft` (when present) is the user query that gets pre-loaded into
// compose AFTER the response renders, so a one-finger demo keeps moving
// forward send-by-send.
//
// Step 0's `userText` is the draft on the IBIP chatList entry — that's how
// the very first send gets pre-loaded on page load.

export const ibipFlow = [
  {
    userText:
      'open the playbook and pull the full account history on brea general — i want to know why we almost lost them in 2019',
    response: {
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
                'Sysmex pitched a full-system replacement after a 6-week period of CTS-flagged reagent inconsistencies. Then-rep David Halpern (retired Q1-2024) saved the account by escalating to Area Director Linda Park and personally walking Dr. Marcus Lee (then-CMO, since departed) through the QA improvement plan. Halpern noted: "Lee makes decisions over coffee, not in conference rooms — Sysmex made the mistake of presenting in a boardroom."',
            },
            {
              heading: '2022 — coverage gap, brief vulnerability',
              text:
                'HSE turnover left the account uncovered for 11 weeks. Maria Santos picked it up and re-grounded the relationship through Dr. Voss\'s predecessor. No competitor activity surfaced but Voss arrived during that window and never received an executive intro from us. That gap shows up in today\'s flag.',
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
            'Compiled from 247 logged interactions, 12 CTS tickets, 3 field-service notes',
          actions: ['Show full 2019 timeline', 'Ask a follow-up'],
        },
      ],
      chainOfThought: [
        'Pulled all 247 logged account interactions from 2014 to present',
        'Cross-referenced 12 CTS ticket threads and 3 field-service notes',
        'Identified 2 documented near-loss events and recovery narratives',
        'Surfaced retired rep David Halpern\'s qualitative notes from the 2019 save',
        'Mapped current contacts (Voss, Reyes) to relationship state',
      ],
    },
    nextDraft:
      'good. now give me the intervention playbook tailored to voss specifically — i want to brief maria before she reaches out',
  },
  {
    userText:
      'good. now give me the intervention playbook tailored to voss specifically — i want to brief maria before she reaches out',
    response: {
      senderId: 100,
      text:
        'Tailored to Dr. Voss\'s buyer profile (Analytical — evidence before conversation). Maria can take this into a 15-minute call and not have to translate it.',
      cards: [
        {
          accentColor: '#7E3FAF',
          iconType: 'teams',
          title: 'Intervention playbook — Dr. Patricia Voss',
          subtitle:
            'CMO, Brea General · Analytical decision style (Korn Ferry)',
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
                'A specific commitment on the CTS-flagged reagent issue with a named owner and date',
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
    },
    nextDraft:
      'send to maria and start the utilization pdf. one more — friday i pick up the pacific northwest sub-region from carla (she retires friday). where do i start?',
  },
  {
    userText:
      'send to maria and start the utilization pdf. one more — friday i pick up the pacific northwest sub-region from carla (she retires friday). where do i start?',
    response: {
      senderId: 100,
      text:
        'Acknowledged — brief sent to Maria, PDF generating in the background. For the transition: Carla Renteria has 14 years on that sub-region. I rolled her institutional knowledge into a day-one briefing. Open it before Friday and you walk into Monday already three weeks ahead.',
      cards: [
        {
          accentColor: '#0B5394',
          iconType: 'teams',
          title: 'Pacific Northwest — Day-one territory briefing',
          subtitle:
            'Inherited from Carla Renteria · 14 yrs tenure · 38 active accounts · $42M book',
          badge: { text: 'Ready', tone: 'green' },
          metrics: [
            { value: '38', label: 'Active accounts', delta: '4 must-keep in geo', deltaTone: 'neutral' },
            { value: '6', label: 'Flagged at risk', delta: '2 need 30-day action', deltaTone: 'amber' },
            { value: '$42M', label: 'Book value', delta: 'incl. renewals Q3', deltaTone: 'neutral' },
          ],
          sections: [
            {
              heading: 'First 7 days — what I would do',
              bullets: [
                'Day 1: Read the 4 must-keep account dossiers (linked below). Each has Carla\'s relationship notes preserved verbatim.',
                'Day 2–3: Call Ana Reyes (Brea), Dr. Singh (Tacoma Regional), Karen Wu (Bellevue), and Frank Russo (Spokane). All four expect a hand-off from Carla; she has primed them.',
                'Day 4: Sit with HSE Maria Santos to align on the 2 accounts already flagged red',
                'Day 5: Review the Q3 renewal pipeline — 4 contracts within 90 days of expiry',
              ],
            },
            {
              heading: 'Top 3 accounts you need to know by name',
              bullets: [
                'Tacoma Regional Medical Center — $3.4M, renewing 9/15. Carla saved this account in 2021. Dr. Singh is a Driver — be direct, have the ask ready.',
                'Bellevue Health — $2.8M, healthy but Carla was personally close to the CFO Karen Wu. Wu is Expressive — open with acknowledgment, not data.',
                'Spokane County — $1.9M, recent SE turnover. Frank Russo (Lab Director) was unhappy with the transition. Carla smoothed it. Stay close.',
              ],
            },
            {
              heading: 'What Carla wanted you to know',
              text:
                '"The Pacific Northwest is a relationship region. Don\'t over-engineer the first 90 days. Show up in person at Tacoma and Spokane in your first month — they will notice. Karen at Bellevue will test you with a small ask early. Say yes, even if it is inconvenient."',
            },
          ],
          footer:
            'Compiled from 14 years of Carla\'s logged notes, calls, and field visits · 1,840 interactions',
          actions: ['Open all 4 must-keep dossiers', 'Add Carla\'s contacts to my calendar', 'Set up Day-1 with Maria'],
        },
      ],
      chainOfThought: [
        'Pulled Carla Renteria\'s full interaction history across all 38 accounts',
        'Identified 4 "must-keep in geo" accounts requiring immediate continuity',
        'Surfaced 6 accounts currently flagged at risk; prioritized 2 for 30-day action',
        'Extracted relationship notes and decision-style observations from logged calls',
        'Drafted a 7-day plan sequenced to maximize relationship continuity',
      ],
    },
    // No nextDraft — the demo ends here. Compose returns to empty so the
    // viewer can type freely if they want to explore further.
  },
]

// The very first draft is the first step's userText — exported separately so
// the chatList entry for IBIP can reference it without importing the whole
// flow into the contacts data file.
export const ibipInitialDraft = ibipFlow[0].userText
