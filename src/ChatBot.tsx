import { useEffect, useRef, useState } from 'react'
import { T } from './tokens'

// Edit these details to keep the assistant accurate
const PROFILE = {
  name: 'Muhammad Awais Ayub',
  role: 'UI/UX Designer',
  experience: '5+ years',
  email: 'awais@design.work',
  phone: '+92 300 0000000',
  location: 'Pakistan (open to remote work worldwide)',
  availability: 'Currently available for new projects',
  skills: 'Product Design, Design Systems, Interaction Design, Mobile Design, UX Research, Prototyping, Visual Design, Brand Identity',
  projects: 'Veridian Health, Opus Finance, Kova Identity, Tempo Music, Meridian Analytics, Forma Editorial, Helix Onboarding and Studio Geom',
}

type Msg = { from: 'bot' | 'user'; text: string; href?: string; hrefLabel?: string }

const SUGGESTIONS = ['Email', 'Phone number', 'Availability', 'Skills', 'Projects']

function answer(q: string): Msg {
  const t = q.toLowerCase()
  const has = (...k: string[]) => k.some((w) => t.includes(w))
  if (has('email', 'mail')) return { from: 'bot', text: `You can email ${PROFILE.name.split(' ')[0]} at ${PROFILE.email}.`, href: `mailto:${PROFILE.email}`, hrefLabel: 'Send an email' }
  if (has('phone', 'number', 'call', 'whatsapp', 'mobile', 'contact')) {
    if (has('contact') && !has('phone', 'number', 'call', 'whatsapp', 'mobile'))
      return { from: 'bot', text: `Email: ${PROFILE.email}\nPhone: ${PROFILE.phone}`, href: `mailto:${PROFILE.email}`, hrefLabel: 'Send an email' }
    return { from: 'bot', text: `Phone / WhatsApp: ${PROFILE.phone}`, href: `tel:${PROFILE.phone.replace(/\s/g, '')}`, hrefLabel: 'Call now' }
  }
  if (has('available', 'hire', 'freelance', 'work with', 'open')) return { from: 'bot', text: `${PROFILE.availability}. Email ${PROFILE.email} to start a conversation.` }
  if (has('where', 'location', 'based', 'live', 'country', 'city')) return { from: 'bot', text: `Based in ${PROFILE.location}.` }
  if (has('experience', 'years', 'how long')) return { from: 'bot', text: `${PROFILE.name} has ${PROFILE.experience} of experience designing digital products across fintech, healthtech and consumer apps.` }
  if (has('skill', 'service', 'offer', 'do you do', 'expertise')) return { from: 'bot', text: `Skills: ${PROFILE.skills}.` }
  if (has('project', 'work', 'portfolio', 'case')) return { from: 'bot', text: `Featured work: ${PROFILE.projects}. Scroll to the case studies section to explore them.` }
  if (has('who', 'about', 'name', 'yourself', 'you')) return { from: 'bot', text: `${PROFILE.name} is a ${PROFILE.role} with ${PROFILE.experience} of experience, turning complex ideas into products people enjoy using.` }
  if (has('hi', 'hello', 'salam', 'hey', 'assalam')) return { from: 'bot', text: 'Wa alaikum assalam! Ask me for contact details, skills, projects or availability.' }
  if (has('thank')) return { from: 'bot', text: 'You are welcome. Happy to help anytime.' }
  return { from: 'bot', text: `I can share ${PROFILE.name.split(' ')[0]}'s email, phone, location, skills, projects and availability. Try one of the suggestions below.` }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: `Assalam o Alaikum! I am the assistant for ${PROFILE.name}. Ask me for contact details or basic info.` },
  ])
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [msgs, typing, open])

  const send = (text: string) => {
    const q = text.trim()
    if (!q || typing) return
    setMsgs((m) => [...m, { from: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMsgs((m) => [...m, answer(q)])
      setTyping(false)
    }, 650)
  }

  return (
    <div className="r-chat" style={{ position: 'fixed', right: 24, bottom: 72, zIndex: 600, fontFamily: "'Outfit', sans-serif" }}>
      {open && (
        <div
          role="dialog"
          aria-label="Chat assistant"
          style={{
            position: 'absolute', right: 0, bottom: 72, width: 'min(360px, calc(100vw - 32px))', height: 'min(520px, 70vh)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 16,
            background: T.surface, border: `1px solid ${T.border}`, boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
            animation: 'chatIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          <style>{`@keyframes chatIn { from { opacity: 0; transform: translateY(14px) scale(0.97) } to { opacity: 1; transform: none } } @keyframes chatDot { 0%, 80%, 100% { opacity: 0.25 } 40% { opacity: 1 } }`}</style>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: T.lime, color: T.onLime, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>MA</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>Ask about Awais</div>
              <div style={{ fontSize: 12, color: T.lime, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.lime }} /> Online
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: 'none', border: 'none', color: T.textMute, fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
          </div>

          <div data-lenis-prevent style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <div style={{
                  padding: '10px 14px', borderRadius: 14, fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-line',
                  background: m.from === 'user' ? T.lime : 'var(--surface2)',
                  color: m.from === 'user' ? T.onLime : T.text,
                  borderBottomRightRadius: m.from === 'user' ? 4 : 14, borderBottomLeftRadius: m.from === 'bot' ? 4 : 14,
                }}>
                  {m.text}
                </div>
                {m.href && (
                  <a href={m.href} style={{ display: 'inline-block', marginTop: 6, fontSize: 13, fontWeight: 500, color: T.lime, textDecoration: 'none' }}>
                    {m.hrefLabel} →
                  </a>
                )}
              </div>
            ))}
            {typing && (
              <div style={{ alignSelf: 'flex-start', padding: '12px 14px', borderRadius: 14, background: 'var(--surface2)', display: 'flex', gap: 4 }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: T.textSub, animation: `chatDot 1s ${d * 0.15}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={end} />
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 16px 10px' }}>
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 999, border: `1px solid ${T.border}`, background: 'transparent', color: T.textSub, cursor: 'pointer', fontFamily: 'inherit' }}>
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input) }} style={{ display: 'flex', gap: 8, padding: 12, borderTop: `1px solid ${T.border}` }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              aria-label="Your message"
              style={{ flex: 1, minWidth: 0, padding: '10px 14px', borderRadius: 999, border: `1px solid ${T.border}`, background: T.bg, color: T.text, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
            />
            <button type="submit" aria-label="Send" style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: T.lime, color: T.onLime, cursor: 'pointer', fontSize: 16 }}>↑</button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        style={{ width: 58, height: 58, borderRadius: '50%', border: 'none', cursor: 'pointer', background: T.lime, color: T.onLime, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.25s' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
        )}
      </button>
    </div>
  )
}
