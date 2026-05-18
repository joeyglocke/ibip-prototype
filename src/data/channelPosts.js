// Channel "posts" — Threads layout. Each post is a top-level message with
// an optional subject and a list of replies. Keyed by channel contact id.
// Posts are in chronological order (oldest first), matching how chat messages
// are rendered — scrolling down shows newer activity.
//
// Shape:
//   { id, senderId, time, subject?, text, reactions?, replies: [ {id, senderId, text, time, reactions?} ] }
//
// Replies mirror MessageRow's shape (senderId of 'me' = current user).

export const channelPostsByContact = {
  // West Region Sales • General. Day-to-day team channel — lighter posts
  // about coverage, on-call, and quick FYIs. Surfaces the broader team
  // texture without competing with the IBIP-specific channels.
  25: [
    {
      id: 'p25-1',
      senderId: 202,
      time: 'Mon May 4 8:00 AM',
      subject: 'Week ahead — quick orientation',
      text:
        "Few headlines for the week:\n\n" +
        "• Q3 renewal kickoffs begin Wednesday — see the dedicated channel\n" +
        "• Maria covering Brea + Tacoma escalations through Thursday (Greg out)\n" +
        "• Carla's retirement is Friday — say goodbye, transition coverage details in the Transitions Watch group\n\n" +
        "Quiet week otherwise. Leadership review next Thursday May 22.",
      reactions: [{ emoji: '👋', count: 3 }],
      replies: [
        {
          id: 'p25-1-r1',
          senderId: 200,
          text: 'noted. i\'ll be on for Brea/Tacoma — slack me direct if anything urgent.',
          time: 'Mon May 4 8:18 AM',
        },
      ],
    },
    {
      id: 'p25-2',
      senderId: 'me',
      time: 'Wed May 6 2:30 PM',
      subject: 'Sales leadership academy capstone — IBIP demo May 22',
      text:
        "Wrapping the capstone next Thursday in the May 22 leadership review. " +
        "If anyone has a pilot moment that hit (good or rough), drop it in the IBIP pilot-feedback channel by Monday — i'd like to ground the readout in real examples, not the metrics. " +
        "Maria's Brea-flag story already in the queue.",
      reactions: [{ emoji: '🎤', count: 4 }],
      replies: [
        {
          id: 'p25-2-r1',
          senderId: 201,
          text: 'will post my spokane SE-handoff story in the feedback channel today. it\'s a good one — IBIP caught a stack-risk i missed.',
          time: 'Wed May 6 3:02 PM',
          reactions: [{ emoji: '🙏', count: 2 }],
        },
      ],
    },
  ],

  // West Region Sales • Must-keep accounts. IBIP broadcasts the weekly
  // must-keep health digest here so the entire account-team org has the
  // same picture; replies happen in the channel thread rail.
  26: [
    {
      id: 'p26-1',
      senderId: 100,
      time: 'Mon May 4 7:00 AM',
      subject: 'Must-keep health — week of May 4',
      text:
        "Weekly health snapshot for the West Region must-keep portfolio. " +
        "32 must-keep accounts in geo · $34.8M ARR · 0 flagged High, 2 flagged Medium-High, 1 Medium. " +
        "Tightening on Tacoma Regional after the SE transition — early signs the new SE rebuilt the relationship. " +
        "Watching Brea General's CTS volume trend, no flag yet.",
      reactions: [{ emoji: '📈', count: 4 }],
      replies: [
        {
          id: 'p26-1-r1',
          senderId: 200,
          text: 'good week. spokane is still warming back up but the trajectory is right. tacoma was the read i was waiting on — relieved.',
          time: 'Mon May 4 7:31 AM',
          reactions: [{ emoji: '👍', count: 2 }],
        },
        {
          id: 'p26-1-r2',
          senderId: 'me',
          text: 'agreed. one thing for next week — can we get a per-account renewal proximity overlay on this digest? would help me triage prep time.',
          time: 'Mon May 4 7:44 AM',
        },
        {
          id: 'p26-1-r3',
          senderId: 100,
          text:
            'Adding renewal proximity as a column starting next week. Will sort the table by days-to-renewal descending so the nearest contracts surface first.',
          time: 'Mon May 4 7:45 AM',
          reactions: [{ emoji: '🙏', count: 3 }],
        },
      ],
    },
    {
      id: 'p26-2',
      senderId: 100,
      time: 'Mon May 11 7:00 AM',
      subject: 'Must-keep health — week of May 11',
      text:
        "New flag this week — Brea General Hospital crossed into High overnight (win prob 58%, no L1 relationship on file, CTS +42%). " +
        "Maria is reaching Dr. Voss with a tailored brief this week. Renewal in 84 days so the timing is tight but workable. " +
        "Tacoma, Bellevue, Spokane stable. Full per-account table in the linked card. As requested last week: renewal proximity column added.",
      reactions: [{ emoji: '⚠️', count: 5 }, { emoji: '👀', count: 6 }],
      replies: [
        {
          id: 'p26-2-r1',
          senderId: 202,
          text:
            'tagging this thread for the leadership review thursday. jordan + maria — by then i want a written read on whether voss has engaged. if she hasn\'t responded by wed eod we escalate.',
          time: 'Mon May 11 7:18 AM',
          reactions: [{ emoji: '👍', count: 3 }],
        },
        {
          id: 'p26-2-r2',
          senderId: 200,
          text:
            'voss outreach goes today 3pm. if no response by wed eod i\'ll request a 15-min slot via her assistant directly — sometimes that\'s the unlock with analytical buyers, they just need a written agenda in advance.',
          time: 'Mon May 11 7:25 AM',
        },
        {
          id: 'p26-2-r3',
          senderId: 201,
          text:
            'unrelated to brea — spokane SE settled in well. frank russo asked about the next firmware release on the AU680. is that an account question or a CTS question?',
          time: 'Mon May 11 8:02 AM',
        },
        {
          id: 'p26-2-r4',
          senderId: 100,
          text:
            'Both. I logged Frank\'s question against Spokane\'s contact record and routed a copy to CTS for the firmware roadmap response. Tom, you will see a draft reply in your queue by 10am.',
          time: 'Mon May 11 8:03 AM',
          reactions: [{ emoji: '🤖', count: 2 }],
        },
      ],
    },
  ],

  // West Region Sales • Renewals — Q3. Account-team coordination on the
  // upcoming renewal cycle, with IBIP posting renewal-readiness snapshots.
  27: [
    {
      id: 'p27-ibip-1',
      senderId: 100,
      time: 'Mon May 11 7:30 AM',
      subject: 'Q3 renewals — 90-day readiness snapshot',
      text:
        "Four contracts renewing in the next 90 days across the West Region. " +
        "Two are clean and on track (Bellevue Health, Tacoma Regional). Two carry risk that will affect close timing if unaddressed:\n\n" +
        "• Brea General Hospital — renewing 8/4, currently High severity flag\n" +
        "• Spokane County — renewing 7/18, Medium-High after the SE transition\n\n" +
        "Per-account readiness cards in the linked drawer. Account owners: please confirm your renewal kickoff timing by Wednesday.",
      reactions: [{ emoji: '📅', count: 4 }],
      replies: [
        {
          id: 'p27-ibip-1-r1',
          senderId: 'me',
          text: 'brea kickoff is in motion (the voss outreach this week). spokane I want to delay the formal kickoff until frank russo is settled — call it mid-june. tom, agree?',
          time: 'Mon May 11 7:48 AM',
        },
        {
          id: 'p27-ibip-1-r2',
          senderId: 201,
          text: 'agree. give frank 3 more weeks to bond with the new SE before we walk in with the renewal ask. mid-june works.',
          time: 'Mon May 11 7:55 AM',
          reactions: [{ emoji: '👍', count: 2 }],
        },
      ],
    },
  ],

  // IBIP Program • General. Internal program coordination for the IBIP
  // rollout — pilot status, training, governance.
  28: [
    {
      id: 'p28-ibip-1',
      senderId: 100,
      time: 'Fri May 8 9:00 AM',
      subject: 'IBIP pilot — week 4 status',
      text:
        "End of week 4 of the West Region pilot. " +
        "150 reps onboarded · 6 leadership users · 4 must-keep alerts auto-surfaced (1 confirmed save in flight: Brea General). " +
        "Korn Ferry profile completion at 38% across pilot accounts — request to RSMs: prioritize completing profiles on Tier 1 contacts before the May 22 leadership review.",
      reactions: [{ emoji: '✅', count: 5 }],
      replies: [
        {
          id: 'p28-ibip-1-r1',
          senderId: 202,
          text: 'good progress. let\'s spotlight the brea save (assuming it lands) in the may 22 readout — that\'s the story leadership wants to hear, not the adoption metrics.',
          time: 'Fri May 8 9:18 AM',
          reactions: [{ emoji: '💯', count: 3 }],
        },
      ],
    },
  ],

  // IBIP Program • Pilot feedback. Reps share what's working and what isn't.
  29: [
    {
      id: 'p29-ibip-1',
      senderId: 200,
      time: 'Thu May 7 4:20 PM',
      subject: 'Real-world test: brea general flag was on the money',
      text:
        "Posting because i was skeptical at the start of the pilot. " +
        "IBIP flagged brea general at high severity tuesday morning. The flag had three signals firing simultaneously — i would have caught the CTS trend on my own eventually, but not the missing L1 relationship piece, and definitely not in time. " +
        "The intervention brief it generated for voss was usable as-is. First time i haven't had to rewrite a recommended outreach. Will report back after the call lands.",
      reactions: [{ emoji: '🎯', count: 6 }, { emoji: '❤️', count: 2 }],
      replies: [
        {
          id: 'p29-ibip-1-r1',
          senderId: 'me',
          text: 'this is the kind of feedback we need to surface to leadership. mind if i quote you (with attribution) in the may 22 readout?',
          time: 'Thu May 7 4:35 PM',
        },
        {
          id: 'p29-ibip-1-r2',
          senderId: 200,
          text: 'go for it. happy to do it live if it helps.',
          time: 'Thu May 7 4:38 PM',
          reactions: [{ emoji: '🙏', count: 2 }],
        },
      ],
    },
    {
      id: 'p29-ibip-2',
      senderId: 201,
      time: 'Fri May 8 11:02 AM',
      subject: 'Feature request — link to korn ferry profile from any contact card',
      text:
        "Small thing but it would speed me up. When IBIP surfaces a contact, can the buyer profile be one click away instead of three? " +
        "Today i have to open the account → click into the contact → scroll to the profile section. Would prefer a popover from the contact name itself.",
      reactions: [{ emoji: '👍', count: 4 }],
      replies: [
        {
          id: 'p29-ibip-2-r1',
          senderId: 100,
          text:
            'Logged as a feature request. Adding to the post-pilot iteration list — current candidates for the hover-state popover are: buyer profile, recent risk signals, last logged interaction. Reasonable scope for the v1.1 release.',
          time: 'Fri May 8 11:10 AM',
          reactions: [{ emoji: '🚀', count: 2 }],
        },
      ],
    },
  ],
}
