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
            Every year, a veteran rep retires, an HSE moves on, or an RSM
            transitions out — and fifteen years of institutional knowledge
            walks out the door with them. Which lab director needs a personal
            call before a price increase hits. Why a flagship account almost
            left in 2019 and what it took to save them. How to read the room
            at Regional Medical Center before a renewal. None of that is in
            Salesforce. None of it ever was.
          </p>

          <h3 className="fre-section-title">Problem</h3>
          <p>
            Three failures compound. Institutional knowledge walks out the
            door with every rep transition. At-risk accounts are sending
            signals — falling win probability, missing L1 relationships,
            rising CTS volume — that nobody is reading in time. And our Korn
            Ferry investment lives in a binder, not in the live selling
            moment.
          </p>

          <h3 className="fre-section-title">Solution</h3>
          <p>
            IBIP is one platform with three components. An institutional
            memory engine that preserves what every rep knows before they
            leave. A risk flagging engine that surfaces at-risk accounts
            automatically using Beckman Coulter's own risk parameters. And a
            Korn Ferry layer that tailors every intervention to the buyer's
            decision style — so the right message reaches the right person
            in the right way.
          </p>
          <p>
            Watch this demo in three beats: a proactive risk alert on Brea
            General Hospital, a queryable predecessor pulling 11 years of
            account history on demand, and a Korn Ferry-tailored intervention
            playbook ready for the HSE to take into the room. All on
            infrastructure Beckman Coulter already owns.
          </p>

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
