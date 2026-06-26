import { useState, useCallback } from 'react'
import { agentSessions as initialSessions, activityEvents as seedActivityEvents } from './data'
import NavRail from './components/NavRail'
import ChatList from './components/ChatList'
import ChatView from './components/ChatView'
import ActivityList from './components/ActivityList'
import TitleBar from './components/TitleBar'
import { FreModal } from './components/common'
import './App.css'

export default function App() {
  const [activeView, setActiveView] = useState('chat') // 'chat' | 'activity'
  const [activeChatId, setActiveChatId] = useState(100) // TIP — primary surface for the demo
  const [readChatIds, setReadChatIds] = useState(() => new Set([100]))
  const [sessions, setSessions] = useState(initialSessions)
  const [dynamicSessionMessages, setDynamicSessionMessages] = useState({})
  // Activity feed: persist which events the user has opened so unread decorations clear.
  const [activityEvents, setActivityEvents] = useState(seedActivityEvents)
  const [activeActivityId, setActiveActivityId] = useState(null)
  // When navigating to a chat, optionally tell ChatView to open a specific
  // session (sessions rail), open a specific channel thread, or flash a
  // specific message so the user can see where a notification landed.
  const [navIntent, setNavIntent] = useState(null)
  // FRE shows on every load while iterating on the prototype — dismiss only
  // hides it for the current session. Swap to localStorage gating later if a
  // real first-run-only behavior is needed.
  const [showFre, setShowFre] = useState(true)

  const dismissFre = useCallback(() => setShowFre(false), [])

  const selectChat = useCallback((chatId) => {
    setActiveChatId(chatId)
    setReadChatIds(prev => (prev.has(chatId) ? prev : new Set(prev).add(chatId)))
  }, [])

  const navigateToChat = useCallback((chatId, { showSessions, sessionId } = {}) => {
    selectChat(chatId)
    if (showSessions) setNavIntent({ chatId, sessionId: sessionId || null })
  }, [selectChat])

  const clearNavIntent = useCallback(() => setNavIntent(null), [])

  const addSession = useCallback((agentId, session, messages) => {
    setSessions(prev => ({
      ...prev,
      [agentId]: [session, ...(prev[agentId] || [])],
    }))
    if (messages) {
      setDynamicSessionMessages(prev => ({ ...prev, [session.id]: messages }))
    }
  }, [])

  const updateSession = useCallback((agentId, sessionId, updates) => {
    setSessions(prev => ({
      ...prev,
      [agentId]: (prev[agentId] || []).map(s =>
        s.id === sessionId ? { ...s, ...updates } : s
      ),
    }))
  }, [])

  const updateSessionMessages = useCallback((sessionId, messages) => {
    setDynamicSessionMessages(prev => ({ ...prev, [sessionId]: messages }))
  }, [])

  const selectActivity = useCallback((event) => {
    setActiveActivityId(event.id)
    setActivityEvents(prev =>
      prev.map(e => (e.id === event.id && e.unread ? { ...e, unread: false } : e))
    )
    setActiveChatId(event.chatId)
    setReadChatIds(prev => (prev.has(event.chatId) ? prev : new Set(prev).add(event.chatId)))
    setNavIntent({
      chatId: event.chatId,
      channelThreadPostId: event.postId || null,
      highlightMessageId: event.messageId || null,
    })
  }, [])

  const activityUnreadCount = activityEvents.reduce((n, e) => n + (e.unread ? 1 : 0), 0)

  return (
    <div className="app">
      <TitleBar onShowFre={() => setShowFre(true)} />
      <div className="app-body">
        <NavRail
          activeView={activeView}
          onSelectView={setActiveView}
          activityUnreadCount={activityUnreadCount}
        />
        {activeView === 'activity' ? (
          <ActivityList
            events={activityEvents}
            activeEventId={activeActivityId}
            onSelectEvent={selectActivity}
          />
        ) : (
          <ChatList
            activeChatId={activeChatId}
            onSelectChat={selectChat}
            readChatIds={readChatIds}
          />
        )}
        <ChatView
          activeChatId={activeChatId}
          onSelectChat={navigateToChat}
          sessions={sessions}
          addSession={addSession}
          updateSession={updateSession}
          updateSessionMessages={updateSessionMessages}
          dynamicSessionMessages={dynamicSessionMessages}
          navIntent={navIntent}
          clearNavIntent={clearNavIntent}
        />
      </div>
      {showFre && (
        <FreModal
          title="TIP — Topline Intelligence Platform"
          subtitle="New rep. Getting their bearings. Then the flag fires."
          onDismiss={dismissFre}
          dismissLabel="See it in action"
        >
          <h3 className="fre-section-title">The setup</h3>
          <p>
            Devon Glocke is a KAM, two weeks into the Pacific Northwest
            sub-region. The previous KAM retired; the RSM covered Brea
            General Hospital for three months and is making introductions
            next week. Devon isn't walking in cold — but they haven't built
            any relationships of their own yet. They open Teams to prep for
            that meeting. While they're prepping, the platform flags a HIGH
            SEVERITY risk on the same account.
          </p>

          <h3 className="fre-section-title">Why it matters</h3>
          <p>
            A seasoned KAM would know what to do — who to call, in what
            order, that the heme lead is already frustrated and walking in
            without addressing it makes everything worse. They'd know it from
            experience. Devon has two weeks. The eleven years of relationship
            intelligence lived in one person's head, and when they retired it
            was gone. At-risk accounts send signals — falling win
            probability, rising CTSO volume, an unplanned service visit with
            no follow-up — that nobody is reading in time.
          </p>

          <h3 className="fre-section-title">The platform</h3>
          <p>TIP is one platform built on three components:</p>
          <ol className="fre-list">
            <li>
              <strong>Institutional memory engine</strong> — preserves what
              every rep knows before they leave, and makes it searchable on
              demand.
            </li>
            <li>
              <strong>Account risk flagging engine</strong> — surfaces
              at-risk accounts automatically using Beckman Coulter's own
              risk parameters.
            </li>
            <li>
              <strong>Korn Ferry integration layer</strong> — tailors every
              intervention to the buyer's decision style, so the right
              message reaches the right person in the right way.
            </li>
          </ol>

          <h3 className="fre-section-title">The demo — three queries</h3>
          <ol className="fre-list">
            <li>
              <strong>The briefing.</strong> Eleven years of history, the
              three people Devon will meet and how each decides, and the
              predecessor's note: "Ask her about skiing. Do not send an email
              first."
            </li>
            <li>
              <strong>The pivot.</strong> That evening, an overnight alert
              fires on the same account — HIGH SEVERITY. A seasoned KAM would
              know what to do. Devon has two weeks.
            </li>
            <li>
              <strong>The playbook.</strong> A coordinated RSM + PSE + KAM
              response, sequenced to the people in the building: Park →
              Estergreen → Bailey. In that order. Before next week's meeting.
            </li>
          </ol>

          <h3 className="fre-section-title">What this delivers</h3>
          <p>
            Two weeks in a new territory, one intro meeting on the calendar —
            and before that meeting even happens, the platform preserved
            eleven years of account knowledge, surfaced a risk the new KAM
            wouldn't have caught, and built a coordinated response plan
            tailored to every person in that account. Built on tools you
            already own. Running in Teams.
          </p>
        </FreModal>
      )}
    </div>
  )
}
