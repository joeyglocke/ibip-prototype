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
  const [activeChatId, setActiveChatId] = useState(100) // IBIP — primary surface for the demo
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
          title="IBIP — Install Base Intelligence Platform"
          subtitle="Never lose another account because we lost the knowledge."
          onDismiss={dismissFre}
          dismissLabel="See it in action"
        >
          <h3 className="fre-section-title">Today</h3>
          <p>
            People are moving all across our organization — tenured reps are
            retiring, HSEs are leaving for outside opportunities, and
            internal promotions are creating open territories faster than we
            can fill them. Every time someone moves, fifteen years of
            institutional knowledge moves with them. Which lab director needs
            a personal call before a price increase hits. Why a flagship
            account almost left in 2019 and what it took to save them. How
            to read the room at Regional Medical Center before a renewal.
            None of that is in Salesforce. None of it ever was.
          </p>

          <h3 className="fre-section-title">Problem</h3>
          <p>
            Three failures compound. Institutional tribal knowledge walks
            out the door with every rep transition. At-risk accounts are
            sending signals — falling win probability, missing L1
            relationships, rising CTSO volume — that nobody is reading in
            time. And our Korn Ferry investment lives in a binder, not in
            the live selling moment.
          </p>

          <h3 className="fre-section-title">Solution</h3>
          <p>IBIP is one platform built on three components:</p>
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
          <p>This demo walks through it in three beats:</p>
          <ol className="fre-list">
            <li>
              You are a new rep who just inherited the Pacific Northwest
              sub-region — IBIP hands you the day-one territory briefing.
            </li>
            <li>
              You pull the full 11-year account history on Brea General
              Hospital so you walk in already knowing the room.
            </li>
            <li>
              Days later you log in and IBIP has flagged Brea General
              overnight — High severity. You get a Korn Ferry-tailored
              intervention playbook ready for the HSE to take into the
              call.
            </li>
          </ol>

          <h3 className="fre-section-title">What this unlocks</h3>
          <p>
            $2M in transition-risk protection. $2.25M in early-intervention
            retention. $2.4M in leadership and rep productivity. $6.7M in
            Year 1, $20.1M cumulative over three years. Payback in under two
            weeks of protected revenue.
          </p>
          <p>
            We cannot afford to keep losing institutional knowledge every
            time we lose a person. This platform makes sure we never have to
            again.
          </p>
        </FreModal>
      )}
    </div>
  )
}
