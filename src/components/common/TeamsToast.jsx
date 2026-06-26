import Avatar from './Avatar'
import './TeamsToast.css'

// Teams-style desktop notification (toast) that slides in at the bottom-right
// of the screen when a message "arrives" unprompted — e.g. the overnight risk
// alert in the TIP demo. Position is fixed to the viewport, so it can be
// rendered anywhere in the tree.
//
// Props:
//   contact  — the sender (drives the avatar)
//   title    — bold sender/app line (e.g. "TIP")
//   body     — the notification snippet
//   onClose  — dismiss handler (also auto-dismissed by the caller on a timer)
export default function TeamsToast({ contact, title, body, onClose }) {
  return (
    <div className="teams-toast" role="alert" aria-live="polite">
      <div className="teams-toast-header">
        <span className="teams-toast-app">Microsoft Teams</span>
        <button
          type="button"
          className="teams-toast-close"
          aria-label="Dismiss notification"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="teams-toast-content">
        {contact && <Avatar contact={contact} size={36} hideStatus />}
        <div className="teams-toast-text">
          <div className="teams-toast-title">{title}</div>
          <div className="teams-toast-body">{body}</div>
        </div>
      </div>
    </div>
  )
}
