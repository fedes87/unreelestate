import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AriaWidget.module.css'

const API_URL =
  import.meta.env.VITE_ARIA_API_URL ||
  'https://app.unreelestate.com/api/public-concierge'

const SESSION_STORAGE_KEY = 'aria_session_id'

function ensureSessionId() {
  try {
    let id = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!id) {
      id = `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
      localStorage.setItem(SESSION_STORAGE_KEY, id)
    }
    return id
  } catch {
    // localStorage blocked (privacy mode) — fall back to per-tab id
    return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
  }
}

function SparkleIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z" />
    </svg>
  )
}

function SendIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  )
}

export default function AriaWidget() {
  const { t, i18n } = useTranslation()

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [showLead, setShowLead] = useState(false)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [rateLimited, setRateLimited] = useState(false)
  const [entered, setEntered] = useState(false)

  const sessionId = useRef(ensureSessionId())
  const scrollRef = useRef(null)
  const textareaRef = useRef(null)
  const triggerRef = useRef(null)

  const chips = (() => {
    const raw = t('aria.chips', { returnObjects: true })
    return Array.isArray(raw) ? raw : []
  })()

  // Bounce-in the bubble 6s after mount
  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 6000)
    return () => clearTimeout(id)
  }, [])

  // Greeting when opening for the first time
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { id: 'greeting', role: 'aria', content: t('aria.greeting') },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Refresh greeting text if language changes mid-session (only if empty convo)
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'greeting') {
      setMessages([
        { id: 'greeting', role: 'aria', content: t('aria.greeting') },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  // Autoscroll on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, thinking, showLead])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  // Focus input on open
  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 250)
    }
  }, [open])

  const sendMessage = useCallback(
    async (raw) => {
      const content = (raw ?? draft).trim()
      if (!content || thinking || rateLimited) return

      setError(null)
      const userMsg = {
        id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        role: 'user',
        content,
      }
      // Build history for API: skip the auto-greeting so Aria sees a clean start
      const history = messages
        .filter((m) => m.id !== 'greeting')
        .map((m) => ({ role: m.role, content: m.content }))
      setMessages((prev) => [...prev, userMsg])
      setDraft('')
      setThinking(true)

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionId.current,
            message: content,
            history,
            locale: (i18n.language || 'en').split('-')[0],
          }),
        })

        if (res.status === 429) {
          setRateLimited(true)
          setError(t('aria.errorRate'))
          setThinking(false)
          return
        }
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const data = await res.json()
        const ariaMsg = {
          id: `a_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          role: 'aria',
          content: data.reply,
        }
        setMessages((prev) => [...prev, ariaMsg])

        if (data.leadCaptured) {
          setLeadSubmitted(true)
          setShowLead(false)
        } else if (data.suggestLead && !leadSubmitted) {
          // Surface the lead card after Aria's reply settles
          setTimeout(() => setShowLead(true), 600)
        }
      } catch (e) {
        console.error('[AriaWidget] send error', e)
        setError(t('aria.errorGeneric'))
      } finally {
        setThinking(false)
      }
    },
    [draft, thinking, rateLimited, messages, leadSubmitted, i18n.language, t]
  )

  const submitLead = async () => {
    const v = leadEmail.trim()
    if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return
    setLeadSubmitted(true)
    setShowLead(false)
    // Send as a regular message so backend regex captures + persists
    await sendMessage(`My email is ${v}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Trigger bubble */}
      {!open && (
        <button
          ref={triggerRef}
          type="button"
          className={`${styles.bubble} ${entered ? styles.bubbleEntered : ''}`}
          onClick={() => setOpen(true)}
          aria-label={t('aria.openLabel')}
        >
          <span className={styles.bubbleDot} aria-hidden="true" />
          <span className={styles.bubbleIcon}>
            <SparkleIcon size={22} />
          </span>
          <span className={styles.bubbleTooltip}>{t('aria.bubbleTooltip')}</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className={styles.panel}
          role="dialog"
          aria-modal="false"
          aria-label={t('aria.header')}
        >
          <header className={styles.header}>
            <div className={styles.headerAv} aria-hidden="true">
              <SparkleIcon size={15} />
            </div>
            <div className={styles.headerInfo}>
              <div className={styles.headerTitle}>{t('aria.header')}</div>
              <div className={styles.headerSub}>
                <span className={styles.onlineDot} aria-hidden="true" />
                {t('aria.subheader')}
              </div>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label={t('aria.closeLabel')}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className={styles.messages} ref={scrollRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.msg} ${
                  m.role === 'aria' ? styles.msgAria : styles.msgUser
                }`}
              >
                {m.role === 'aria' && (
                  <div className={styles.msgAv} aria-hidden="true">
                    <SparkleIcon size={12} />
                  </div>
                )}
                <div className={styles.msgBody}>
                  {m.content.split('\n').map((line, i) => (
                    <p key={i} className={styles.msgLine}>
                      {line || '\u00A0'}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {thinking && (
              <div className={`${styles.msg} ${styles.msgAria}`}>
                <div className={styles.msgAv} aria-hidden="true">
                  <SparkleIcon size={12} />
                </div>
                <div className={styles.msgBody}>
                  <span className={styles.typing} aria-label={t('aria.thinking')}>
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}

            {/* Suggestion chips — only before any user message */}
            {messages.length <= 1 && !thinking && chips.length > 0 && (
              <div className={styles.chips}>
                {chips.map((c) => (
                  <button
                    type="button"
                    key={c}
                    className={styles.chip}
                    onClick={() => sendMessage(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* Lead-capture card */}
            {showLead && !leadSubmitted && (
              <div className={styles.leadCard}>
                <div className={styles.leadTitle}>{t('aria.leadTitle')}</div>
                <div className={styles.leadDesc}>{t('aria.leadDesc')}</div>
                <div className={styles.leadRow}>
                  <input
                    type="email"
                    className={styles.leadInput}
                    placeholder={t('aria.leadPlaceholder')}
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') submitLead()
                    }}
                  />
                  <button
                    type="button"
                    className={styles.leadSubmit}
                    onClick={submitLead}
                  >
                    {t('aria.leadSubmit')}
                  </button>
                </div>
                <button
                  type="button"
                  className={styles.leadSkip}
                  onClick={() => setShowLead(false)}
                >
                  {t('aria.leadSkip')}
                </button>
              </div>
            )}

            {leadSubmitted && (
              <div className={styles.leadSuccess}>
                ✓ {t('aria.leadSuccess')}
              </div>
            )}

            {error && <div className={styles.errorBanner}>{error}</div>}
          </div>

          <div className={styles.composer}>
            <textarea
              ref={textareaRef}
              className={styles.input}
              placeholder={t('aria.placeholder')}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={thinking || rateLimited}
              rows={1}
              maxLength={2000}
            />
            <button
              type="button"
              className={styles.sendBtn}
              onClick={() => sendMessage()}
              disabled={!draft.trim() || thinking || rateLimited}
              aria-label={t('aria.send')}
            >
              <SendIcon size={15} />
            </button>
          </div>

          <div className={styles.footer}>{t('aria.poweredBy')}</div>
        </div>
      )}
    </>
  )
}
