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

// Animated Aria avatar — renders a looping video clip based on state, with
// SparkleIcon fallback if the video fails to load or clips aren't deployed.
// Available states: 'idle' | 'thinking' | 'greeting' | 'typing' | 'caught' | 'looking' | 'selfie'
const CLIP_BASE = '/aria/clips'
function AriaVideoAvatar({ state = 'idle', size = 40, loop = true, fallbackSize = 16 }) {
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v || failed) return
    try {
      v.currentTime = 0
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } catch {
      /* autoplay blocked — user gesture will resume */
    }
  }, [state, failed])

  if (failed) {
    return (
      <div
        className={styles.avatarFallback}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <SparkleIcon size={fallbackSize} />
      </div>
    )
  }

  return (
    <div
      className={styles.videoAvatar}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        key={state}
        autoPlay
        loop={loop}
        muted
        playsInline
        preload={state === 'idle' ? 'auto' : 'metadata'}
        onError={() => setFailed(true)}
      >
        <source src={`${CLIP_BASE}/aria_${state}.webm`} type="video/webm" />
        <source src={`${CLIP_BASE}/aria_${state}.mp4`} type="video/mp4" />
      </video>
    </div>
  )
}

export default function AriaWidget() {
  const { t, i18n } = useTranslation()

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [streamingMsgId, setStreamingMsgId] = useState(null)
  const [showLead, setShowLead] = useState(false)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [rateLimited, setRateLimited] = useState(false)
  const [entered, setEntered] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [greetingPlaying, setGreetingPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 640
  )

  const sessionId = useRef(ensureSessionId())
  const panelRef = useRef(null)
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

  // Nudge badge — trigger "caught" animation after 30s idle if user hasn't opened
  useEffect(() => {
    if (open || messages.length > 0) {
      setShowBadge(false)
      return
    }
    const id = setTimeout(() => setShowBadge(true), 30000)
    return () => clearTimeout(id)
  }, [open, messages.length])

  // Responsive detection (mobile ≤ 640px gets fullscreen overlay)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Outside-click close (desktop only — mobile is full-screen modal)
  useEffect(() => {
    if (!open || isMobile) return
    const onClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !triggerRef.current?.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    // Delay so the opening click doesn't immediately close
    const t0 = setTimeout(() => document.addEventListener('mousedown', onClick), 100)
    return () => {
      clearTimeout(t0)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open, isMobile])

  // Play greeting animation once when opening the panel
  useEffect(() => {
    if (!open) return
    setGreetingPlaying(true)
    const id = setTimeout(() => setGreetingPlaying(false), 3200)
    return () => clearTimeout(id)
  }, [open])

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
      if (!content || thinking || streamingMsgId || rateLimited) return

      setError(null)
      const userMsg = {
        id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        role: 'user',
        content,
      }
      const ariaMsgId = `a_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
      const emptyAriaMsg = { id: ariaMsgId, role: 'aria', content: '' }

      // Build history for API: skip the auto-greeting so Aria sees a clean start
      const history = messages
        .filter((m) => m.id !== 'greeting')
        .map((m) => ({ role: m.role, content: m.content }))

      // Append user bubble + empty aria bubble (typing dots will render inside)
      setMessages((prev) => [...prev, userMsg, emptyAriaMsg])
      setDraft('')
      setThinking(true)
      setStreamingMsgId(ariaMsgId)

      // ── Typewriter buffer ──────────────────────────────────────────
      // Gemini streams in big multi-word chunks. To make Aria feel like she's
      // actually TYPING (matching the animated avatar), we queue incoming
      // text and reveal it char-by-char at a human-ish pace, with adaptive
      // catch-up if the buffer grows too fast.
      const tw = {
        target: '',        // full text received from stream
        displayed: 0,      // chars revealed to state so far
        intervalId: null,
        streamEnded: false,
        pendingDone: null, // callback fired once typewriter catches up
      }

      const tick = () => {
        const remaining = tw.target.length - tw.displayed
        if (remaining <= 0) {
          if (tw.intervalId != null) {
            clearInterval(tw.intervalId)
            tw.intervalId = null
          }
          if (tw.streamEnded && tw.pendingDone) {
            const cb = tw.pendingDone
            tw.pendingDone = null
            cb()
          }
          return
        }
        // Adaptive step — baseline 1 char / tick (~55 chars/sec at 18ms),
        // scales up when Gemini dumps a big chunk so latency stays bounded.
        const step =
          remaining > 250 ? 5 : remaining > 120 ? 3 : remaining > 40 ? 2 : 1
        tw.displayed = Math.min(tw.target.length, tw.displayed + step)
        const display = tw.target.slice(0, tw.displayed)
        setMessages((prev) =>
          prev.map((m) => (m.id === ariaMsgId ? { ...m, content: display } : m))
        )
      }

      const ensureTicking = () => {
        if (tw.intervalId == null) {
          tw.intervalId = setInterval(tick, 18)
        }
      }

      const waitForTypewriter = () =>
        new Promise((resolve) => {
          const check = () => {
            if (tw.displayed >= tw.target.length && tw.intervalId == null) {
              resolve()
            } else {
              setTimeout(check, 30)
            }
          }
          check()
        })

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
          setMessages((prev) => prev.filter((m) => m.id !== ariaMsgId))
          return
        }
        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`)
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let sawAnyText = false
        let streamFinished = false

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const events = buffer.split('\n\n')
          buffer = events.pop() ?? ''
          for (const evt of events) {
            if (!evt.startsWith('data: ')) continue
            const json = evt.slice(6).trim()
            if (!json) continue
            let parsed
            try {
              parsed = JSON.parse(json)
            } catch {
              continue
            }

            if (parsed.type === 'delta' && parsed.text) {
              if (!sawAnyText) {
                setThinking(false)
                sawAnyText = true
              }
              tw.target += parsed.text
              ensureTicking()
            } else if (parsed.type === 'reset' && typeof parsed.text === 'string') {
              // Safety bailout / empty fallback — restart the typewriter cleanly
              setThinking(false)
              sawAnyText = true
              tw.target = parsed.text
              tw.displayed = 0
              ensureTicking()
            } else if (parsed.type === 'done') {
              streamFinished = true
              const handleDone = () => {
                if (parsed.leadCaptured) {
                  setLeadSubmitted(true)
                  setShowLead(false)
                } else if (parsed.suggestLead && !leadSubmitted) {
                  setTimeout(() => setShowLead(true), 600)
                }
              }
              // Fire metadata ONLY after typewriter catches up,
              // so the lead card doesn't appear mid-typing.
              if (tw.displayed >= tw.target.length && tw.intervalId == null) {
                handleDone()
              } else {
                tw.streamEnded = true
                tw.pendingDone = handleDone
              }
            } else if (parsed.type === 'error') {
              setError(t('aria.errorGeneric'))
              // Keep whatever partial text we have but stop the cursor
            }
          }
        }

        tw.streamEnded = true
        // Wait for the typewriter to drain before clearing the cursor.
        await waitForTypewriter()

        // If the stream closed without a 'done' event and we have no text, show fallback
        if (!sawAnyText && !streamFinished) {
          setMessages((prev) =>
            prev.map((m) => (m.id === ariaMsgId ? { ...m, content: t('aria.errorGeneric') } : m))
          )
        }
      } catch (e) {
        console.error('[AriaWidget] stream error', e)
        setError(t('aria.errorGeneric'))
        // Remove the empty aria bubble if nothing streamed
        setMessages((prev) =>
          prev.filter((m) => !(m.id === ariaMsgId && !m.content))
        )
      } finally {
        if (tw.intervalId != null) clearInterval(tw.intervalId)
        setThinking(false)
        setStreamingMsgId(null)
      }
    },
    [draft, thinking, streamingMsgId, rateLimited, messages, leadSubmitted, i18n.language, t]
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
          className={`${styles.bubble} ${entered ? styles.bubbleEntered : ''} ${showBadge ? styles.bubbleBadged : ''}`}
          onClick={() => setOpen(true)}
          aria-label={t('aria.openLabel')}
        >
          <span className={styles.bubbleDot} aria-hidden="true" />
          <span className={styles.bubbleAvatar}>
            <AriaVideoAvatar
              state={showBadge ? 'caught' : 'idle'}
              size={isMobile ? 62 : 72}
              loop={!showBadge}
              fallbackSize={28}
            />
          </span>
          {showBadge && <span className={styles.bubbleBadge} aria-hidden="true">1</span>}
          <span className={styles.bubbleTooltip}>{t('aria.bubbleTooltip')}</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className={`${styles.panel} ${isMobile ? styles.panelMobile : ''}`}
          role="dialog"
          aria-modal={isMobile ? 'true' : 'false'}
          aria-label={t('aria.header')}
        >
          <header className={styles.header}>
            <div className={styles.headerAv} aria-hidden="true">
              <AriaVideoAvatar
                state={
                  thinking || streamingMsgId
                    ? 'typing'
                    : greetingPlaying
                    ? 'greeting'
                    : 'idle'
                }
                size={52}
                loop={!greetingPlaying}
                fallbackSize={22}
              />
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
            {messages.map((m) => {
              const isStreaming = m.id === streamingMsgId
              const isEmpty = !m.content
              // Empty streaming aria message → show typing dots inside the bubble
              const showDots = isStreaming && isEmpty
              const lines = isEmpty ? [] : m.content.split('\n')
              return (
                <div
                  key={m.id}
                  className={`${styles.msg} ${
                    m.role === 'aria' ? styles.msgAria : styles.msgUser
                  } ${isStreaming ? styles.msgStreaming : ''}`}
                >
                  {m.role === 'aria' && (
                    <div className={styles.msgAv} aria-hidden="true">
                      <SparkleIcon size={12} />
                    </div>
                  )}
                  <div className={styles.msgBody}>
                    {showDots ? (
                      <span className={styles.typing} aria-label={t('aria.thinking')}>
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : (
                      lines.map((line, i) => (
                        <p key={i} className={styles.msgLine}>
                          {line || '\u00A0'}
                          {isStreaming && i === lines.length - 1 && (
                            <span className={styles.cursor} aria-hidden="true" />
                          )}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              )
            })}

            {/* Suggestion chips — only before any user message, not while streaming */}
            {messages.length <= 1 && !thinking && !streamingMsgId && chips.length > 0 && (
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
              disabled={thinking || !!streamingMsgId || rateLimited}
              rows={1}
              maxLength={2000}
            />
            <button
              type="button"
              className={styles.sendBtn}
              onClick={() => sendMessage()}
              disabled={!draft.trim() || thinking || !!streamingMsgId || rateLimited}
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
