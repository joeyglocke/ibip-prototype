// Channel "posts" — Threads layout. Each post is a top-level message with
// an optional subject and a list of replies. Keyed by channel contact id.
// Posts are in chronological order (oldest first), matching how chat messages
// are rendered — scrolling down shows newer activity.
//
// Shape:
//   { id, senderId, time, subject?, text, reactions?, replies: [ {id, senderId, text, time, reactions?} ] }
//
// Replies mirror MessageRow's shape (senderId of 'me' = current user = Devon Glocke).

export const channelPostsByContact = {
  // West Region Sales • General. Day-to-day team channel — lighter posts
  // about coverage, on-call, and quick FYIs. Surfaces the broader team
  // texture without competing with the TIP-specific channels.
  25: [
    {
      id: 'p25-1',
      senderId: 202,
      time: 'Mon Jun 8 8:00 AM',
      subject: 'Week ahead — quick orientation',
      text:
        "Few headlines for the week:\n\n" +
        "• Q3 renewal kickoffs begin Wednesday — see the dedicated channel\n" +
        "• Maria (PSE) covering Brea General hematology escalations this week\n" +
        "• Pacific Northwest transition still settling — Devon Glocke owns the sub-region (week 2), Tom bridging the Brea relationships. Details in the Transitions Watch group\n\n" +
        "Quiet week otherwise. Leadership review next Monday Jun 15.",
      reactions: [{ emoji: '👋', count: 3 }],
      replies: [
        {
          id: 'p25-1-r1',
          senderId: 200,
          text: 'noted. i\'ll be on for the brea heme side — ping me direct if anything urgent on the DxH line.',
          time: 'Mon Jun 8 8:18 AM',
        },
      ],
    },
    {
      id: 'p25-2',
      senderId: 'me',
      time: 'Wed Jun 10 2:30 PM',
      subject: 'Sales leadership academy capstone — TIP demo Jun 15',
      text:
        "Wrapping the capstone Monday in the Jun 15 leadership review. " +
        "If anyone has a pilot moment that hit (good or rough), drop it in the TIP pilot-feedback channel by Friday — i'd like to ground the readout in real examples, not the metrics. " +
        "The Brea overnight-flag story is already in the queue.",
      reactions: [{ emoji: '🎤', count: 4 }],
      replies: [
        {
          id: 'p25-2-r1',
          senderId: 201,
          text: 'will post the brea handoff story in the feedback channel today. it\'s a good one — TIP caught the downtime-with-no-follow-up before any of us did.',
          time: 'Wed Jun 10 3:02 PM',
          reactions: [{ emoji: '🙏', count: 2 }],
        },
      ],
    },
  ],

  // West Region Sales • Must-keep accounts. TIP broadcasts the weekly
  // must-keep health digest here so the entire account-team org has the
  // same picture; replies happen in the channel thread rail.
  26: [
    {
      id: 'p26-1',
      senderId: 100,
      time: 'Mon Jun 8 7:00 AM',
      subject: 'Must-keep health — week of Jun 8',
      text:
        "Weekly health snapshot for the West Region must-keep portfolio. " +
        "31 must-keep accounts in geo · $33.4M ACV · 0 flagged High, 2 flagged Medium-High, 1 Medium. " +
        "Watching Brea General's CTSO volume trend closely — it's climbed for 3 weeks running on the DxH 900 line but hasn't crossed threshold. No flag yet.",
      reactions: [{ emoji: '📈', count: 4 }],
      replies: [
        {
          id: 'p26-1-r1',
          senderId: 200,
          text: 'the brea CTSO trend is the one i\'d keep eyes on. that DxH 900 has been noisy since the last calibration cycle, and gina park\'s team has a long memory after 2023.',
          time: 'Mon Jun 8 7:31 AM',
          reactions: [{ emoji: '👍', count: 2 }],
        },
        {
          id: 'p26-1-r2',
          senderId: 'me',
          text: 'agreed. one thing for next week — can we get a per-account renewal proximity overlay on this digest? would help me triage prep time.',
          time: 'Mon Jun 8 7:44 AM',
        },
        {
          id: 'p26-1-r3',
          senderId: 100,
          text:
            'Adding renewal proximity as a column starting next week. Will sort the table by days-to-renewal ascending so the nearest contracts surface first.',
          time: 'Mon Jun 8 7:45 AM',
          reactions: [{ emoji: '🙏', count: 3 }],
        },
      ],
    },
    {
      id: 'p26-2',
      senderId: 100,
      time: 'Mon Jun 15 7:00 AM',
      subject: 'Must-keep health — week of Jun 15',
      text:
        "New flag this week — Brea General Hospital crossed into High overnight (win prob 60→40%, CTSO at 180% of baseline for 31 days, unplanned DxH 900 service visit with no post-visit contact). " +
        "Devon owns the account; the RSM still holds the relationships. Contract end Q4. Intervention sequence is built — Park (PSE) → Estergreen (RSM) → Bailey. " +
        "Cascadia and Pacific Coast stable. As requested last week: renewal proximity column added.",
      reactions: [{ emoji: '⚠️', count: 5 }, { emoji: '👀', count: 6 }],
      replies: [
        {
          id: 'p26-2-r1',
          senderId: 202,
          text:
            'tagging this thread for the leadership review today. devon + tom — i want a written read by thursday. hard rule: nobody goes to bailey before estergreen has pre-framed him.',
          time: 'Mon Jun 15 7:18 AM',
          reactions: [{ emoji: '👍', count: 3 }],
        },
        {
          id: 'p26-2-r2',
          senderId: 200,
          text:
            'i\'ll open with park on the DxH downtime this week — technical, not commercial. bringing the PLT-F head-to-head and the updated reagent protocols so the 2023 shortage is addressed before she raises it.',
          time: 'Mon Jun 15 7:25 AM',
        },
        {
          id: 'p26-2-r3',
          senderId: 201,
          text:
            'unrelated to brea — cascadia\'s lab manager asked about the next firmware release on the DxH 900. is that an account question or a CTSO question?',
          time: 'Mon Jun 15 8:02 AM',
        },
        {
          id: 'p26-2-r4',
          senderId: 100,
          text:
            'Both. I logged the question against Cascadia\'s contact record and routed a copy to CTSO for the firmware roadmap response. Tom, you will see a draft reply in your queue by 10am.',
          time: 'Mon Jun 15 8:03 AM',
          reactions: [{ emoji: '🤖', count: 2 }],
        },
      ],
    },
  ],

  // West Region Sales • Renewals — Q3. Account-team coordination on the
  // upcoming renewal cycle, with TIP posting renewal-readiness snapshots.
  27: [
    {
      id: 'p27-tip-1',
      senderId: 100,
      time: 'Mon Jun 15 7:30 AM',
      subject: 'Q3 renewals — 90-day readiness snapshot',
      text:
        "Four contracts renewing in the next 90 days across the West Region. " +
        "Three are clean and on track. One carries risk that will affect close timing if unaddressed:\n\n" +
        "• Brea General Hospital — contract ending Q4, currently High severity flag\n" +
        "• Cascadia Regional — renewing 11 months out, healthy\n\n" +
        "Per-account readiness cards in the linked drawer. Account owners: please confirm your renewal kickoff timing by Wednesday.",
      reactions: [{ emoji: '📅', count: 4 }],
      replies: [
        {
          id: 'p27-tip-1-r1',
          senderId: 'me',
          text: 'brea kickoff is gated on the intervention sequence — park, then estergreen, then bailey. no renewal ask in front of bailey until estergreen has pre-framed him. tom, agree?',
          time: 'Mon Jun 15 7:48 AM',
        },
        {
          id: 'p27-tip-1-r2',
          senderId: 201,
          text: 'agree. resolve the service issue with park first, let estergreen do the framing, then we bring supply-chain commitments to bailey with data in hand. not before.',
          time: 'Mon Jun 15 7:55 AM',
          reactions: [{ emoji: '👍', count: 2 }],
        },
      ],
    },
  ],

  // TIP Program • General. Internal program coordination for the TIP
  // rollout — pilot status, training, governance.
  28: [
    {
      id: 'p28-tip-1',
      senderId: 100,
      time: 'Fri Jun 12 9:00 AM',
      subject: 'TIP pilot — week 4 status',
      text:
        "End of week 4 of the West Region pilot. " +
        "150 reps onboarded · 6 leadership users · 4 must-keep alerts auto-surfaced (1 confirmed save in flight: Brea General). " +
        "Korn Ferry profile completion at 41% across pilot accounts — request to RSMs: prioritize completing profiles on Tier 1 contacts before the Jun 15 leadership review.",
      reactions: [{ emoji: '✅', count: 5 }],
      replies: [
        {
          id: 'p28-tip-1-r1',
          senderId: 202,
          text: 'good progress. let\'s spotlight the brea save (assuming it lands) in the jun 15 readout — a new KAM two weeks in, handed a coordinated response plan. that\'s the story leadership wants to hear, not the adoption metrics.',
          time: 'Fri Jun 12 9:18 AM',
          reactions: [{ emoji: '💯', count: 3 }],
        },
      ],
    },
  ],

  // TIP Program • Pilot feedback. Reps share what's working and what isn't.
  29: [
    {
      id: 'p29-tip-1',
      senderId: 201,
      time: 'Thu Jun 11 4:20 PM',
      subject: 'Real-world test: brea general flag was on the money',
      text:
        "Posting because i was skeptical at the start of the pilot. " +
        "TIP flagged brea general at high severity overnight — three signals firing at once. The one that got me: an unplanned DxH 900 service visit with Gina Park on shift, and nobody on our side called her after it closed. I would not have connected that to the renewal in time. " +
        "The intervention playbook sequenced the response across RSM, PSE, and the new KAM — Park, then Estergreen, then Bailey. Devon's two weeks in and walked into a coordinated plan. Will report back after the Park conversation lands.",
      reactions: [{ emoji: '🎯', count: 6 }, { emoji: '❤️', count: 2 }],
      replies: [
        {
          id: 'p29-tip-1-r1',
          senderId: 'me',
          text: 'this is exactly the kind of feedback to surface to leadership. mind if i quote you (with attribution) in the jun 15 readout?',
          time: 'Thu Jun 11 4:35 PM',
        },
        {
          id: 'p29-tip-1-r2',
          senderId: 201,
          text: 'go for it. happy to do it live if it helps.',
          time: 'Thu Jun 11 4:38 PM',
          reactions: [{ emoji: '🙏', count: 2 }],
        },
      ],
    },
    {
      id: 'p29-tip-2',
      senderId: 200,
      time: 'Fri Jun 12 11:02 AM',
      subject: 'Feature request — link to korn ferry profile from any contact card',
      text:
        "Small thing but it would speed me up. When TIP surfaces a contact, can the buyer profile be one click away instead of three? " +
        "Today i have to open the account → click into the contact → scroll to the profile section. Would prefer a popover from the contact name itself.",
      reactions: [{ emoji: '👍', count: 4 }],
      replies: [
        {
          id: 'p29-tip-2-r1',
          senderId: 100,
          text:
            'Logged as a feature request. Adding to the post-pilot iteration list — current candidates for the hover-state popover are: buyer profile, recent risk signals, last logged interaction. Reasonable scope for the v1.1 release.',
          time: 'Fri Jun 12 11:10 AM',
          reactions: [{ emoji: '🚀', count: 2 }],
        },
      ],
    },
  ],
}
