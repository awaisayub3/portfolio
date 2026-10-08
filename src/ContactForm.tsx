import { useState } from 'react'

const TO = 'awais@design.work'
type Status = 'idle' | 'sending' | 'sent' | 'error'
type Tab = 'message' | 'slot'

const SLOTS = ['Mon · 10:00', 'Mon · 15:00', 'Tue · 11:00', 'Wed · 16:00', 'Thu · 10:00', 'Fri · 14:00']
const INK = '#1a1a18'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const field: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box', background: '#fff', border: '1px solid #e3dfd5', color: INK,
  fontFamily: "'Outfit', sans-serif", fontSize: 16, padding: '17px 20px', outline: 'none', borderRadius: 14,
  transition: 'border-color 0.2s, box-shadow 0.2s',
}
const focus = (e: React.FocusEvent<HTMLElement>) => { e.currentTarget.style.borderColor = 'var(--lime)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--lime-rgb),0.18)' }
const blur = (e: React.FocusEvent<HTMLElement>) => { e.currentTarget.style.borderColor = '#e3dfd5'; e.currentTarget.style.boxShadow = 'none' }

export default function ContactForm() {
  const [tab, setTab] = useState<Tab>('message')
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [slot, setSlot] = useState('')

  const valid = name.trim().length > 1 && EMAIL_RE.test(email) && (tab === 'message' ? message.trim().length > 4 : !!slot)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!valid || status === 'sending') return
    if (new FormData(e.currentTarget).get('website')) return
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${TO}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name, email, type: tab === 'slot' ? 'Call booking request' : 'Message',
          ...(tab === 'slot' ? { preferred_slot: slot } : {}), message,
          _subject: `${tab === 'slot' ? 'Call request' : 'Portfolio enquiry'} from ${name}`, _replyto: email, _template: 'table',
        }),
      })
      if (!res.ok) throw new Error()
      setName(''); setEmail(''); setMessage(''); setSlot('')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const tabBtn = (id: Tab, label: string) => {
    const on = tab === id
    return (
      <button
        type="button" role="tab" aria-selected={on}
        onClick={() => { setTab(id); setStatus('idle') }}
        style={{
          border: 'none', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 500,
          padding: '17px 26px', whiteSpace: 'nowrap', borderRadius: '16px 16px 0 0', marginBottom: -1,
          background: on ? 'var(--paper)' : 'var(--surface2)', opacity: on ? 1 : 0.9, color: on ? INK : 'var(--text-mute)',
          transition: 'padding 0.25s, background 0.25s, color 0.25s', position: 'relative', zIndex: on ? 2 : 1,
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, justifyContent: 'flex-start' }} role="tablist">
        {tabBtn('message', 'Send a message')}
        {tabBtn('slot', 'Book a slot')}
        <span className="r-reply" style={{ marginLeft: 'auto', fontFamily: "'Caveat', cursive", fontSize: 24, color: 'var(--text-sub)', paddingBottom: 14, paddingRight: 8, whiteSpace: 'nowrap' }}>
          I reply within a day
        </span>
      </div>

      <form onSubmit={submit} className="r-paper" style={{ position: 'relative', background: 'var(--paper)', color: INK, borderRadius: '0 26px 26px 26px', padding: '34px 30px 30px', boxShadow: '0 30px 60px -30px rgba(0,0,0,0.45)' }}>
        <span aria-hidden className="r-paper-fold" />
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: 'absolute', left: '-9999px', opacity: 0 }} />

        <div style={{ display: 'grid', gap: 14 }}>
          <input aria-label="Your name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" style={field} onFocus={focus} onBlur={blur} />
          <input aria-label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" style={field} onFocus={focus} onBlur={blur} />

          {tab === 'slot' && (
            <div role="radiogroup" aria-label="Preferred time" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(118px, 1fr))', gap: 10 }}>
              {SLOTS.map((s) => {
                const on = slot === s
                return (
                  <button key={s} type="button" role="radio" aria-checked={on} onClick={() => setSlot(s)}
                    style={{ cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, padding: '13px 10px', borderRadius: 12, border: `1px solid ${on ? 'var(--lime)' : '#e3dfd5'}`, background: on ? 'var(--lime)' : '#fff', color: on ? 'var(--on-lime)' : INK, transition: 'all 0.2s' }}>
                    {s}
                  </button>
                )
              })}
            </div>
          )}

          <textarea aria-label={tab === 'slot' ? 'What would you like to discuss? (optional)' : 'Your message'} value={message} onChange={(e) => setMessage(e.target.value)} rows={tab === 'slot' ? 3 : 5}
            placeholder={tab === 'slot' ? 'What would you like to discuss? (optional)' : 'Your message'} style={{ ...field, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
        </div>

        <button type="submit" disabled={!valid || status === 'sending'} style={{
          width: '100%', marginTop: 20, padding: '19px 24px', border: 'none', borderRadius: 14, fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600,
          background: valid ? 'var(--lime)' : '#8a8884', color: valid ? 'var(--on-lime)' : '#fff', cursor: valid ? 'pointer' : 'not-allowed', transition: 'background 0.25s, transform 0.2s',
        }}>
          {status === 'sending' ? 'Sending…' : tab === 'slot' ? 'Request this slot' : 'Send it'}
        </button>

        <p role="status" style={{ margin: '14px 0 0', fontSize: 13, lineHeight: 1.5, minHeight: 20, color: status === 'error' ? '#c0392b' : status === 'sent' ? '#2f6b00' : '#6d675f' }}>
          {status === 'sent' && 'Thanks — your message is on its way.'}
          {status === 'error' && `Couldn't send. Please email ${TO} directly.`}
          {(status === 'idle' || status === 'sending') && (valid ? 'Looks good — ready to send.' : tab === 'slot' ? 'Add your name, a valid email and pick a slot to continue.' : 'Add your name, a valid email, and your message to continue.')}
        </p>
      </form>
    </div>
  )
}
