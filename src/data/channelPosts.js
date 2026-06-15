// Channel "posts" — Threads layout. Each post is a top-level message with
// an optional subject and a list of replies. Keyed by channel contact id.
// Posts are in chronological order (oldest first), matching how chat messages
// are rendered — scrolling down shows newer activity.
//
// Shape:
//   { id, senderId, time, subject?, text, reactions?, replies: [ {id, senderId, text, time, reactions?} ] }
//
// Replies mirror MessageRow's shape (senderId of 'me' = current user = Alex Chen).

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
        "• Maria covering Brea General clinical escalations this week\n" +
        "• Pacific Northwest transition is complete — Alex Chen now owns the sub-region. Coverage details in the Transitions Watch group\n\n" +
        "Quiet week otherwise. Leadership review next Monday Jun 15.",
      reactions: [{ emoji: '👋', count: 3 }],
      replies: [
        {
          id: 'p25-1-r1',
          senderId: 200,
          text: 'noted. i\'ll be on for Brea — ping me direct if anything urgent.',
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
        "Maria's Brea-flag story already in the queue.",
      reactions: [{ emoji: '🎤', count: 4 }],
      replies: [
        {
          id: 'p25-2-r1',
          senderId: 201,
          text: 'will post my account-handoff story in the feedback channel today. it\'s a good one — TIP caught a stack-risk i missed.',
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
        "Watching Brea General's CTSO volume trend closely — it's climbed for 3 weeks running but hasn't crossed threshold. No flag yet.",
      reactions: [{ emoji: '📈', count: 4 }],
      replies: [
        {
          id: 'p26-1-r1',
          senderId: 200,
          text: 'the brea CTSO trend is the one i\'d keep eyes on. that AU5800 line has been noisy since the last calibration cycle.',
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
        "New flag this week — Brea General Hospital crossed into High overnight (win prob 54%, no L1 relationship on file, CTSO at 180% of baseline for 31 days, unplanned AU5800 service visit). " +
        "Alex now owns the account after the Pacific Northwest transition. Renewal in 112 days. Intervention sequence is built — Lee → Walsh → Okafor. " +
        "Cascadia and Pacific Coast stable. As requested last week: renewal proximity column added.",
      reactions: [{ emoji: '⚠️', count: 5 }, { emoji: '👀', count: 6 }],
      replies: [
        {
          id: 'p26-2-r1',
          senderId: 202,
          text:
            'tagging this thread for the leadership review today. alex + maria — i want a written read on whether walsh has agreed to pre-frame okafor by thursday. do not contact okafor before then.',
          time: 'Mon Jun 15 7:18 AM',
          reactions: [{ emoji: '👍', count: 3 }],
        },
        {
          id: 'p26-2-r2',
          senderId: 200,
          text:
            'on it. i\'ll open with lee on the calibration issue this week — he\'s in trouble mode, needs to feel heard before anything else. walsh brief follows.',
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
        "• Brea General Hospital — renewing in 112 days, currently High severity flag\n" +
        "• Cascadia Regional — renewing 11 months out, healthy\n\n" +
        "Per-account readiness cards in the linked drawer. Account owners: please confirm your renewal kickoff timing by Wednesday.",
      reactions: [{ emoji: '📅', count: 4 }],
      replies: [
        {
          id: 'p27-tip-1-r1',
          senderId: 'me',
          text: 'brea kickoff is gated on the intervention sequence — lee, then walsh, then okafor. i don\'t want a renewal ask in front of okafor until walsh has pre-framed. tom, agree?',
          time: 'Mon Jun 15 7:48 AM',
        },
        {
          id: 'p27-tip-1-r2',
          senderId: 201,
          text: 'agree. resolve the service issue first, let walsh do the framing, then we bring the renewal conversation to okafor with TCO data in hand. not before.',
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
          text: 'good progress. let\'s spotlight the brea save (assuming it lands) in the jun 15 readout — that\'s the story leadership wants to hear, not the adoption metrics.',
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
      senderId: 200,
      time: 'Thu Jun 11 4:20 PM',
      subject: 'Real-world test: brea general flag was on the money',
      text:
        "Posting because i was skeptical at the start of the pilot. " +
        "TIP flagged brea general at high severity the morning alex took over the territory. Three signals firing simultaneously — i'd have caught the CTSO trend on my own eventually, but not the missing L1 relationship, and definitely not the link back to the 2019 CFO profile. " +
        "The intervention playbook it generated sequenced the three contacts for me — Lee, then Walsh, then Okafor. Usable as-is. Will report back after the Lee conversation lands.",
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
          senderId: 200,
          text: 'go for it. happy to do it live if it helps.',
          time: 'Thu Jun 11 4:38 PM',
          reactions: [{ emoji: '🙏', count: 2 }],
        },
      ],
    },
    {
      id: 'p29-tip-2',
      senderId: 201,
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
