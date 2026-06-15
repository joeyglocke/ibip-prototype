import { chatScripts, ibipInitialDraft } from './chatScripts'

const base = import.meta.env.BASE_URL

// Placeholder persona for the prototype. See PERSONA.md for the full
// character sheet. Keep this fictional — the repo is published publicly.
export const currentUser = {
  name: 'Alex Chen',
  initials: 'AC',
  email: 'alex.chen@beckman.example',
  color: '#0B5394',
  status: 'available',
}

export const contacts = [
  // ── TIP — primary feature, default selected chat ──────────────────────
  {
    id: 100,
    name: 'TIP',
    initials: null,
    color: '#0B5394',
    status: null,
    isAgent: true,
    logo: 'tip',
    description: 'Topline Intelligence Platform · account history, risk signals, and Korn Ferry briefings',
  },
  { id: 1, name: 'Sarah Chen', initials: 'SC', color: '#6264A7', status: 'available', avatar: `${base}avatars/sarah-chen.jpg` },
  { id: 2, name: 'Claude', initials: null, color: '#D97757', status: null, isAgent: true, logo: 'claude', avatar: `${base}avatars/claude.png`, description: 'AI assistant by Anthropic' },
  { id: 3, name: 'Emma Larsen', initials: 'EL', color: '#E74856', status: 'away', avatar: `${base}avatars/emma-larsen.jpg` },
  { id: 4, name: 'Jira', initials: null, color: '#0052CC', status: null, isAgent: true, logo: 'jira', avatar: `${base}avatars/jira.png`, description: 'Issue tracking and project management' },
  { id: 5, name: 'Emily Watson', initials: 'EW', color: '#00B294', status: 'available', avatar: `${base}avatars/emily-watson.jpg` },
  { id: 6, name: 'Design Sprint Team', initials: 'DS', color: '#8764B8', status: null, isGroup: true },
  { id: 7, name: 'James Kim', initials: 'JK', color: '#CA5010', status: 'available', avatar: `${base}avatars/james-kim.jpg` },
  { id: 8, name: 'Frontend Guild', initials: 'FG', color: '#498205', status: null, isGroup: true },
  { id: 9, name: 'Olivia Martinez', initials: 'OM', color: '#DA3B01', status: 'busy', avatar: `${base}avatars/olivia-martinez.jpg` },
  { id: 10, name: 'David Nguyen', initials: 'DN', color: '#005B70', status: 'available', avatar: `${base}avatars/david-nguyen.jpg` },
  { id: 11, name: 'Conversational AI Team', initials: 'CA', color: '#6264A7', status: null, isGroup: true, memberCount: 12 },
  { id: 12, name: 'Rachel Thompson', initials: 'RT', color: '#7160E8', status: 'available', avatar: `${base}avatars/rachel-thompson.jpg` },
  { id: 13, name: 'Sync on slash commands', initials: 'SS', color: '#B4009E', status: null, isGroup: true },
  { id: 14, name: 'Agent Extensibility', initials: 'AE', color: '#0078D4', status: null, isGroup: true },
  { id: 15, name: 'Kevin Park', initials: 'KP', color: '#038387', status: 'away', avatar: `${base}avatars/kevin-park.jpg` },
  { id: 16, name: 'Agents Platform v2 team', initials: 'AP', color: '#CA5010', status: null, isGroup: true },
  { id: 17, name: 'Natalie Brooks', initials: 'NB', color: '#E74856', status: 'available', avatar: `${base}avatars/natalie-brooks.jpg` },
  { id: 18, name: 'Data Warehouse Support', initials: 'DW', color: '#498205', status: null, isGroup: true },
  { id: 19, name: 'Targeted Messages', initials: 'TM', color: '#DA3B01', status: null, isGroup: true },
  { id: 20, name: 'ACF', initials: 'AC', color: '#005B70', status: null, isGroup: true },
  { id: 21, name: 'Northwind Core', initials: 'NC', color: '#0078D4', status: null, isGroup: true, memberCount: 9 },
  { id: 22, name: 'Design crit', initials: 'DC', color: '#8764B8', status: null, isGroup: true, memberCount: 6 },
  { id: 23, name: 'Northwind launch', initials: 'NL', color: '#CA5010', status: null, isGroup: true, memberCount: 7 },
  { id: 24, name: 'Dogfood feedback', initials: 'DF', color: '#498205', status: null, isGroup: true, memberCount: 11 },
  // ── Channels (rounded-square avatars; threaded/posts layouts) ──
  // West Region Sales — leadership coordination for the TIP demo.
  { id: 25, name: 'General', initials: 'WS', color: '#0B5394', status: null, isChannel: true, memberCount: 42 },
  { id: 26, name: 'Must-keep accounts', initials: 'WS', color: '#0B5394', status: null, isChannel: true, memberCount: 18 },
  { id: 27, name: 'Renewals — Q3', initials: 'WS', color: '#0B5394', status: null, isChannel: true, memberCount: 14 },
  // TIP Program — internal rollout coordination.
  { id: 28, name: 'General', initials: 'TP', color: '#0B5394', status: null, isChannel: true, memberCount: 9 },
  { id: 29, name: 'Pilot feedback', initials: 'TP', color: '#0B5394', status: null, isChannel: true, memberCount: 6 },
  // Channel collaborator (used in channel replies).
  { id: 30, name: 'Taylor Reed', initials: 'TR', color: '#038387', status: 'available' },
  { id: 31, name: 'Figma', initials: null, color: '#FFFFFF', status: null, isAgent: true, logo: 'figma', avatar: `${base}avatars/figma.png`, logoInset: true, description: 'Design files and component libraries' },
  { id: 32, name: 'Cowork', initials: null, color: '#FFFFFF', status: null, isAgent: true, logo: 'cowork', avatar: `${base}avatars/cowork.png`, logoInset: true, description: 'Async collaboration and document workflows' },
  { id: 33, name: 'AC Test', initials: 'AC', color: '#5B5FC7', status: null, isGroup: true, memberCount: 5 },
  // ── Beckman Coulter sales org — adjacent context for the TIP demo ──
  { id: 200, name: 'Maria Santos', initials: 'MS', color: '#0B5394', status: 'available', description: 'HSE · West region' },
  { id: 201, name: 'Tom Hayes', initials: 'TH', color: '#1A6B3E', status: 'busy', description: 'Regional Sales Manager · Pacific' },
  { id: 202, name: 'Linda Park', initials: 'LP', color: '#7E3FAF', status: 'available', description: 'Area Director · West' },
  { id: 203, name: 'Greg Tanaka', initials: 'GT', color: '#B7472A', status: 'away', description: 'KAM · Top accounts' },
  { id: 204, name: 'West Region Leadership', initials: 'WR', color: '#0B5394', status: null, isGroup: true, memberCount: 9 },
  { id: 205, name: 'Transitions Watch', initials: 'TW', color: '#C4571A', status: null, isGroup: true, memberCount: 5 },
]

// Teams the user belongs to. Each team has a list of channels (by contact id,
// with optional `bold: true` to indicate unread content). Team icons use the
// same rounded-square treatment as channels.
export const teams = [
  {
    id: 't-west-sales',
    name: 'West Region Sales',
    initials: 'WS',
    color: '#0B5394',
    channels: [
      { id: 25, bold: true },
      { id: 26, bold: true },
      { id: 27 },
    ],
  },
  {
    id: 't-tip-program',
    name: 'TIP Program',
    initials: 'TP',
    color: '#0B5394',
    channels: [
      { id: 28, bold: true },
      { id: 29 },
    ],
  },
]

export const favorites = [
  // TIP + the two group scenarios each carry the first user query as a
  // pre-filled compose draft, so the demo driver only has to click Send
  // to advance the scripted flow. Drafts come straight from chatScripts.
  { contactId: 100, bold: true, draft: ibipInitialDraft },
  { contactId: 202 },
  { contactId: 201 },
  { contactId: 200 },
  { contactId: 204, bold: true, draft: chatScripts[204].initialDraft },
  { contactId: 205, bold: true, draft: chatScripts[205].initialDraft },
]

// Re-purposed as the "West Region" pinned cluster for the TIP demo, keeping
// the export name so the ChatList consumer stays a one-liner update.
export const projectNorthwind = [
  { contactId: 200, bold: true },
  { contactId: 201 },
  { contactId: 203, bold: true },
  { contactId: 205 },
]

export const chatList = [
  { contactId: 203, bold: true },
  { contactId: 4 },
  { contactId: 2 },
  { contactId: 32 },
  { contactId: 31 },
]

// Channels inherit their parent team's avatar — a channel in the chat list
// should visually read as "part of Team X", not get its own generic tile.
// Backfills any channel contact that doesn't already specify its own avatar.
for (const team of teams) {
  if (!team.avatar) continue
  for (const entry of team.channels) {
    const channel = contacts.find((c) => c.id === entry.id)
    if (channel && channel.isChannel && !channel.avatar) {
      channel.avatar = team.avatar
    }
  }
}
