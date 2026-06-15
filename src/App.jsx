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
          subtitle="The alert opens the door. The story explains why it matters."
          onDismiss={dismissFre}
          dismissLabel="See it in action"
        >
          <h3 className="fre-section-title">The setup</h3>
          <p>
            One protagonist. One account. One platform. Four moments. Alex
            Chen is a new rep — day one in the Pacific Northwest sub-region.
            Brea General Hospital is an 11-year, must-keep account with a
            renewal four months out. Before Alex has typed a single word, a
            Teams notification fires: TIP has already been working overnight.
          </p>

          <h3 className="fre-section-title">Why it matters</h3>
          <p>
            Every time a rep moves, years of institutional knowledge move
            with them — which lab director needs a personal call, why an
            account almost left in 2019 and what saved it, who the real
            decision-makers are and how each of them decides. At-risk
            accounts are sending signals — falling win probability, rising
            CTSO volume, an unplanned service visit — that nobody is reading
            in time. And the Korn Ferry investment lives in a binder, not in
            the live selling moment.
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

          <h3 className="fre-section-title">The demo — four moments</h3>
          <ol className="fre-list">
            <li>
              <strong>Open.</strong> An overnight risk alert on Brea General
              is already waiting. Alex sees it — but needs context first.
            </li>
            <li>
              <strong>Day-one briefing.</strong> The territory briefing
              surfaces the predecessor's note: "Call her personally. Do not
              send an email first."
            </li>
            <li>
              <strong>Account history + influence map.</strong> The 2019
              near-loss CFO and the 2024 CFO share a buyer profile. The
              platform connected those two dots. Alex didn't have to.
            </li>
            <li>
              <strong>Back to the alert.</strong> A Korn Ferry-tailored
              playbook, sequenced to the people in the building: Lee → Walsh
              → Okafor. In that order. Not simultaneously.
            </li>
          </ol>

          <h3 className="fre-section-title">What this delivers</h3>
          <p>
            That is one new rep, one account, one morning. The platform
            preserved the knowledge the previous rep left behind, built the
            context Alex needed to walk in already knowing the room, and
            flagged the risk — with a playbook tailored to the specific
            people in that account — before Alex made a single call. Built
            on tools you already own. Running in Teams. Starting on day one.
          </p>
        </FreModal>
      )}
    </div>
  )
}
