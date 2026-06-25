import { useState } from 'react'
import { agentLogos } from '../shared/agentLogos'
import { contacts, currentUser } from '../data/contacts'
import { Avatar, LinkCard, PrivateDisclaimer, Check, ChainOfThought, ChevronDown } from './common'
import MessageActions from './MessageActions'

// Office-app icon tiles for adaptive cards that represent generated artifacts.
// Letter + brand color is enough at this scale; swap in real Fluent app glyphs
// later if needed.
const CARD_ICONS = {
  word:       { letter: 'W', bg: '#2B579A' },
  excel:      { letter: 'X', bg: '#217346' },
  powerpoint: { letter: 'P', bg: '#B7472A' },
  outlook:    { letter: 'O', bg: '#0078D4' },
  teams:      { letter: 'T', bg: '#5B5FC7' },
}

function CardIcon({ type }) {
  const cfg = CARD_ICONS[type]
  if (!cfg) return null
  return <div className="card-icon" style={{ background: cfg.bg }}>{cfg.letter}</div>
}

// File extensions per type, used to suffix the displayed filename so it
// reads "Brief.docx" but the stored `name` stays clean.
const FILE_EXTENSIONS = {
  word: '.docx',
  excel: '.xlsx',
  powerpoint: '.pptx',
}

const base = import.meta.env.BASE_URL

// Teams-style file artifact card: app logo + filename / visibility subtitle.
// Compact horizontal layout that mirrors `LinkCard` (Figma/Jira/GitHub) so
// shared files and shared links read as the same family of attachment.
function FileCard({ card }) {
  const ext = FILE_EXTENSIONS[card.fileType] || ''
  return (
    <div className={`file-card file-card-${card.fileType}`}>
      <img
        className="file-card-logo"
        src={`${base}file-icons/${card.fileType}.png`}
        alt=""
      />
      <div className="file-card-text">
        <div className="file-card-title">{card.name}{ext}</div>
        <div className="file-card-subtitle">{card.subtitle}</div>
      </div>
    </div>
  )
}

function CardBadge({ text, tone = 'neutral' }) {
  return <span className={`card-badge card-badge-${tone}`}>{text}</span>
}

function CardSteps({ steps }) {
  return (
    <ol className="card-steps">
      {steps.map((step, i) => (
        <li key={i} className={`card-step card-step-${step.status || 'pending'}`}>
          <span className="card-step-marker" aria-hidden="true">
            {step.status === 'done' ? <Check size={11} /> : i + 1}
          </span>
          <span className="card-step-text">{step.text}</span>
        </li>
      ))}
    </ol>
  )
}

function CardFacts({ facts }) {
  return (
    <div className="card-facts">
      {facts.map((fact, j) => (
        <span key={j} className="card-fact">
          <span className="card-fact-label">{fact.label}:</span> {fact.value}
        </span>
      ))}
    </div>
  )
}

function CardMetrics({ metrics }) {
  return (
    <div className="card-metrics">
      {metrics.map((m, j) => (
        <div key={j} className="card-metric">
          <div className="card-metric-value">{m.value}</div>
          <div className="card-metric-label">{m.label}</div>
          {m.delta && (
            <div className={`card-metric-delta card-metric-delta-${m.deltaTone || 'neutral'}`}>
              {m.delta}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function CardBars({ bars }) {
  const max = bars.reduce((acc, b) => Math.max(acc, b.value), 0) || 1
  return (
    <div className="card-bars">
      {bars.map((bar, j) => (
        <div key={j} className="card-bar-row">
          <div className="card-bar-label">{bar.label}</div>
          <div className="card-bar-track">
            <div
              className="card-bar-fill"
              style={{ width: `${(bar.value / max) * 100}%`, background: bar.color || undefined }}
            />
          </div>
          <div className="card-bar-value">{bar.valueLabel || bar.value}</div>
        </div>
      ))}
    </div>
  )
}

function CardSections({ sections }) {
  return (
    <div className="card-sections">
      {sections.map((section, j) => (
        <div key={j} className="card-section">
          {section.heading && <div className="card-section-heading">{section.heading}</div>}
          {section.text && <div className="card-section-text">{section.text}</div>}
          {section.facts && <CardFacts facts={section.facts} />}
          {section.bullets && (
            <ul className="card-bullets">
              {section.bullets.map((b, k) => <li key={k}>{b}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

// A single adaptive card. Owns its own `expanded` (inline accordion) and
// `advanceUsed` (one-shot advance guard) state, so it lives in its own
// component rather than inline in MessageRow's card map.
//
// Action shapes:
//   'string'                       — decorative button
//   { label, advance: true }       — drives the scripted demo forward (onAdvance)
//   { label, expand: true,         — toggles `card.expand` open inline, posting
//     collapseLabel? }               no message; relabels to collapseLabel when open
function AdaptiveCard({ card, onAdvance }) {
  const [expanded, setExpanded] = useState(false)
  const [advanceUsed, setAdvanceUsed] = useState(false)

  const renderActions = (actions) => (
    <div className="card-actions">
      {actions.map((action, j) => {
        const isObj = typeof action === 'object'
        const advances = isObj && action.advance
        const expands = isObj && action.expand
        const label = isObj ? action.label : action
        const shownLabel = expands && expanded ? (action.collapseLabel || label) : label
        return (
          <button
            key={j}
            className={`card-action-btn${advances ? ' card-action-btn-advance' : ''}${expands ? ' card-action-btn-expand' : ''}`}
            disabled={advances && advanceUsed}
            onClick={
              expands
                ? () => setExpanded((v) => !v)
                : advances && onAdvance
                  ? () => { if (advanceUsed) return; setAdvanceUsed(true); onAdvance() }
                  : undefined
            }
          >
            {shownLabel}
            {expands && (
              <span className={`card-expand-chevron${expanded ? ' card-expand-chevron-open' : ''}`}>
                <ChevronDown size={12} />
              </span>
            )}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="adaptive-card" style={{ borderLeftColor: card.accentColor }}>
      {/* Header: optional icon + title/subtitle row + optional badge. */}
      <div className="card-header">
        {card.iconType && <CardIcon type={card.iconType} />}
        <div className="card-header-text">
          <div className="card-title-row">
            <span className="card-title">{card.title}</span>
            {card.badge && <CardBadge {...card.badge} />}
          </div>
          {card.subtitle && <div className="card-subtitle">{card.subtitle}</div>}
        </div>
      </div>

      {card.steps && <CardSteps steps={card.steps} />}
      {card.metrics && <CardMetrics metrics={card.metrics} />}
      {card.bars && <CardBars bars={card.bars} />}
      {card.sections && <CardSections sections={card.sections} />}
      {card.facts && <CardFacts facts={card.facts} />}
      {card.footer && <div className="card-footer">{card.footer}</div>}
      {card.actions && renderActions(card.actions)}

      {/* Inline expansion — drops open when an `expand` action is toggled.
          Carries its own metrics / sections / actions (e.g. the risk detail
          revealed from the overnight alert). */}
      {card.expand && expanded && (
        <div className="card-expand">
          {card.expand.metrics && <CardMetrics metrics={card.expand.metrics} />}
          {card.expand.sections && <CardSections sections={card.expand.sections} />}
          {card.expand.footer && <div className="card-footer">{card.expand.footer}</div>}
          {card.expand.actions && renderActions(card.expand.actions)}
        </div>
      )}
    </div>
  )
}

// Combine seeded-in-data reactions with the current user's reactions into an
// ordered list of pills. `byMe: true` → purple outline in the UI.
function buildReactionList(baseReactions, myEmojis) {
  const map = new Map()
  for (const r of baseReactions || []) {
    map.set(r.emoji, { emoji: r.emoji, count: r.count, byMe: false })
  }
  for (const emoji of myEmojis) {
    const existing = map.get(emoji)
    if (existing) {
      map.set(emoji, { ...existing, count: existing.count + 1, byMe: true })
    } else {
      map.set(emoji, { emoji, count: 1, byMe: true })
    }
  }
  return [...map.values()]
}

function ThreadReplyBadge({ reply, onClick }) {
  const ids = reply.participantIds || (reply.agentId ? [reply.agentId] : [])
  const participants = ids
    .map((id) => (id === 'me' ? currentUser : contacts.find((c) => c.id === id)))
    .filter(Boolean)
  if (!participants.length) return null
  const label = reply.count === 1 ? '1 reply' : `${reply.count} replies`
  return (
    <button type="button" className="message-thread-replies" onClick={onClick}>
      <span className="message-thread-replies-avatars">
        {participants.map((p, i) => (
          <span
            key={i}
            className="message-thread-replies-avatar"
            style={{ background: p.avatar ? 'transparent' : p.color || '#6264A7' }}
          >
            {p.avatar ? (
              <img src={p.avatar} alt="" />
            ) : p.isAgent ? (
              agentLogos[p.logo](10)
            ) : (
              p.initials
            )}
          </span>
        ))}
      </span>
      <span className="message-thread-replies-label">{label}</span>
    </button>
  )
}

export default function MessageRow({ message, activeContact, onOpenThread, onAdvance }) {
  const isMe = message.senderId === 'me'
  const isMultiParty = activeContact.isGroup || activeContact.isChannel
  const sender = isMe
    ? currentUser
    : isMultiParty
      ? contacts.find(c => c.id === message.senderId)
      : activeContact

  const [myReactions, setMyReactions] = useState(() => new Set())
  const toggleReaction = (emoji) => {
    setMyReactions(prev => {
      const next = new Set(prev)
      if (next.has(emoji)) next.delete(emoji)
      else next.add(emoji)
      return next
    })
  }
  const reactions = buildReactionList(message.reactions, myReactions)

  return (
    <div
      className={`message-row ${isMe ? 'message-mine' : ''}`}
      data-message-id={message.id}
    >
      {!isMe && (
        <div className="message-avatar-col">
          <Avatar contact={sender} size={32} />
        </div>
      )}
      <div className="message-content-wrap">
        <div className="message-meta">
          {!isMe && <span className="message-sender-name">{sender.name}</span>}
          <span className="message-timestamp">{message.time}</span>
        </div>
        <div className={`message-bubble ${message.isPrivate ? 'message-bubble-private' : ''}`}>
          <MessageActions onReact={toggleReaction} />
          {message.isPrivate && <PrivateDisclaimer />}
          {message.forwardedFrom && (
            <div className="forwarded-message">
              <div className="forwarded-sender">{message.forwardedFrom.sender}</div>
              <div className="forwarded-text">{message.forwardedFrom.text}</div>
            </div>
          )}
          {message.subject && <div className="message-subject">{message.subject}</div>}
          {Array.isArray(message.text)
            ? message.text.map((part, i) =>
                typeof part === 'string' ? part : <span key={i} className="mention">@{part.name}</span>
              )
            : message.text}
          {message.link && <LinkCard link={message.link} />}
          {message.cards && (
            <div className="message-cards">
              {message.cards.map((card, i) => card.type === 'file' ? (
                <FileCard key={i} card={card} />
              ) : (
                <AdaptiveCard key={i} card={card} onAdvance={onAdvance} />
              ))}
            </div>
          )}
          {message.chainOfThought && (
            <ChainOfThought steps={message.chainOfThought} />
          )}
        </div>
        {reactions.length > 0 && (
          <div className="message-reactions-bar">
            {reactions.map((r) => (
              <button
                key={r.emoji}
                type="button"
                className={`reaction-pill ${r.byMe ? 'reaction-pill-mine' : ''}`}
                onClick={() => toggleReaction(r.emoji)}
                aria-label={`${r.byMe ? 'Remove' : 'Add'} reaction ${r.emoji}`}
              >
                <span aria-hidden="true">{r.emoji}</span>
                {r.count > 1 && <span className="reaction-pill-count">{r.count}</span>}
              </button>
            ))}
          </div>
        )}
        {message.threadReply && (
          <ThreadReplyBadge
            reply={message.threadReply}
            onClick={() => onOpenThread?.(message)}
          />
        )}
      </div>
      {isMe && isMultiParty && (
        <div className="message-avatar-col">
          <Avatar contact={currentUser} size={32} />
        </div>
      )}
    </div>
  )
}
