import { useEffect, useLayoutEffect, useRef } from 'react'
import { IconButton, Send } from './common'
import { copilotLogo } from '../shared/assets'
import './Compose.css'

// Main-canvas compose input. Sits below the chat messages. Handles a few
// specifics on top of a plain textarea:
//   • Auto-grows vertically with the typed content up to a max height, then
//     scrolls — matches the real Teams compose behavior so long messages
//     wrap instead of being clipped behind the inline action buttons.
//   • Enter sends; Shift+Enter inserts a newline (Teams convention).
//   • When a `/mention` is present (e.g. "/Jira …"), it's rendered as a
//     purple pill in front of the input; Backspace on an empty input clears it.
//   • Channels use "Start a new post" placeholder instead of "Type a message".
//
// All action buttons except Send are placeholder styling — wire them up
// when you need them for a prototype.
const COMPOSE_MAX_HEIGHT = 200 // px — about 9 lines at 14/1.5

export default function Compose({
  value,
  mention,
  onChange,
  onClearMention,
  onSend,
  isChannel,
}) {
  const textareaRef = useRef(null)

  // Resize the textarea to fit its content. Capped at COMPOSE_MAX_HEIGHT so
  // very long drafts scroll inside the box instead of pushing the compose
  // bar up off the screen. useLayoutEffect runs before paint so the height
  // updates synchronously with the value change — no visual flicker when
  // the script chains in a long pre-filled draft.
  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const next = Math.min(el.scrollHeight, COMPOSE_MAX_HEIGHT)
    el.style.height = `${next}px`
  }, [value])

  // When the value clears (after a send), make sure the textarea collapses
  // back to one line even if the layout effect missed an edge case.
  useEffect(() => {
    if (value === '' && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value])

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && value === '' && mention) {
      e.preventDefault()
      onClearMention()
      return
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
    // Shift+Enter falls through and inserts a newline naturally.
  }

  const placeholder = mention
    ? ''
    : isChannel ? 'Start a new post' : 'Type a message'

  return (
    <div className="chat-compose">
      <div className="compose-box-wrap">
        <div className="compose-box">
          {mention && (
            <span className="mention compose-mention">/{mention}</span>
          )}
          <textarea
            ref={textareaRef}
            rows={1}
            className="compose-input"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="compose-actions">
            <button className="compose-btn" aria-label="Format">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 15l3-10 3 10M8 12h4"/>
                <path d="M15 5l2 2"/>
              </svg>
            </button>
            <button className="compose-btn" aria-label="Emoji">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10" cy="10" r="8"/>
                <path d="M6.5 11.5s1.5 2 3.5 2 3.5-2 3.5-2"/>
                <circle cx="7.5" cy="7.5" r=".75" fill="currentColor" stroke="none"/>
                <circle cx="12.5" cy="7.5" r=".75" fill="currentColor" stroke="none"/>
              </svg>
            </button>
            <button className="compose-btn" aria-label="Attach">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 10.5l-5 5a3.54 3.54 0 0 1-5-5l7-7a2.36 2.36 0 0 1 3.33 3.33l-7 7a1.18 1.18 0 0 1-1.67-1.67l5-5"/>
              </svg>
            </button>
            <button className="compose-btn" aria-label="Copilot">
              <img src={copilotLogo} alt="Copilot" className="copilot-logo-img-sm" />
            </button>
            <button className="compose-btn" aria-label="More apps">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3z"/>
              </svg>
            </button>
            <div className="compose-divider" />
            <IconButton label="Send" className="send-btn" onClick={onSend}>
              <Send />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}
