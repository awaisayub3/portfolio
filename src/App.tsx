import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import Loader from './Loader'
import ThemeToggle from './ThemeToggle'
import AboutSection from './AboutSection'
import Experience from './Experience'
import Education from './Education'
import ChatBot from './ChatBot'
import OutroScene from './OutroScene'
import ContactForm from './ContactForm'
import SmoothScroll from './SmoothScroll'
import CaseStudyStage from './CaseStudyStage'
import CaseStudy from './CaseStudy'
import { T, DISCIPLINE_COLORS } from './tokens'

export const WORKS = [
  {
    id: 1,
    title: 'Veridian Health',
    year: '2024',
    discipline: 'Mobile',
    tags: ['iOS', 'Health', 'Product Design'],
    img: 'https://images.unsplash.com/photo-1627542557169-5ed71c66ed85?w=800&h=1200&fit=crop&auto=format',
    alt: 'Health tracking app screen on smartphone',
    span: 'tall',
    url: '#',
  },
  {
    id: 2,
    title: 'Opus Finance',
    year: '2024',
    discipline: 'Web',
    tags: ['Dashboard', 'Data Viz', 'B2B'],
    img: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=1200&h=800&fit=crop&auto=format',
    alt: 'Financial dashboard on laptop screen',
    span: 'wide',
    url: '#',
  },
  {
    id: 3,
    title: 'Kova Identity',
    year: '2023',
    discipline: 'Brand',
    tags: ['Branding', 'Visual Identity', 'Motion'],
    img: 'https://images.unsplash.com/photo-1781643905934-ac1fabf0a3e1?w=800&h=800&fit=crop&auto=format',
    alt: 'Abstract 3D brand identity system',
    span: 'square',
    url: '#',
  },
  {
    id: 4,
    title: 'Tempo Music',
    year: '2023',
    discipline: 'Mobile',
    tags: ['Android', 'Streaming', 'Consumer'],
    img: 'https://images.unsplash.com/photo-1558655146-6c222b05fce4?w=800&h=1200&fit=crop&auto=format',
    alt: 'Music streaming app on smartphone',
    span: 'tall',
    url: '#',
  },
  {
    id: 5,
    title: 'Meridian Analytics',
    year: '2024',
    discipline: 'Web',
    tags: ['SaaS', 'Analytics', 'Design System'],
    img: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1200&h=800&fit=crop&auto=format',
    alt: 'Analytics platform interface on MacBook',
    span: 'wide',
    url: '#',
  },
  {
    id: 6,
    title: 'Forma Editorial',
    year: '2023',
    discipline: 'Print',
    tags: ['Editorial', 'Typography', 'Print'],
    img: 'https://images.unsplash.com/photo-1770520216854-1733389f5747?w=800&h=800&fit=crop&auto=format',
    alt: 'Abstract geometric print editorial design',
    span: 'square',
    url: '#',
  },
  {
    id: 7,
    title: 'Helix Onboarding',
    year: '2022',
    discipline: 'Web',
    tags: ['UX Flow', 'Onboarding', 'B2C'],
    img: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=1200&h=800&fit=crop&auto=format',
    alt: 'Onboarding flow on MacBook',
    span: 'wide',
    url: '#',
  },
  {
    id: 8,
    title: 'Studio Geom',
    year: '2022',
    discipline: 'Brand',
    tags: ['Illustration', 'Pattern', 'System'],
    img: 'https://images.unsplash.com/photo-1746897785251-48e52e82b269?w=800&h=1000&fit=crop&auto=format',
    alt: 'Abstract geometric pattern design',
    span: 'tall',
    url: '#',
  },
]

const FILTERS = ['All', 'Mobile', 'Web', 'Brand', 'Print']

const SKILLS = [
  'Product Design',
  'Design Systems',
  'Interaction Design',
  'Mobile Design',
  'UX Research',
  'Prototyping',
  'Visual Design',
  'Brand Identity',
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [pill, setPill] = useState(false)
  const [openId, setOpenId] = useState<number | null>(null)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      setScrollProgress(scrollTop / (scrollHeight - clientHeight))
      setPill((p) => (p ? scrollTop > 30 : scrollTop > 90))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const filtered =
    activeFilter === 'All'
      ? WORKS
      : WORKS.filter((w) => w.discipline === activeFilter)

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: "'Outfit', sans-serif", minHeight: '100vh' }}>
      <Loader />
      <ChatBot />
      <SmoothScroll />

      {/* ── Navigation ── */}
      <nav aria-label="Primary" className={`r-nav${pill ? ' is-pill' : ''}`} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '22px 48px',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="r-profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <span className="r-avatar" style={{ position: 'relative', width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: T.lime, color: T.onLime, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif", border: `1px solid ${T.border}` }}>
            MA
            <img src="https://images.unsplash.com/photo-1635380240750-0d89f9c72968?w=120&h=120&fit=crop&crop=faces&auto=format" alt="" onError={(e) => (e.currentTarget.style.display = 'none')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </span>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <span className="r-brand" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em', color: T.text, whiteSpace: 'nowrap' }}>
            Muhammad Awais Ayub
          </span>
          <span className="r-role" style={{ fontSize: '13px', color: T.textMute, letterSpacing: '0.04em', fontWeight: 400 }}>
            UI/UX Designer
          </span>
          </span>
        </a>
        <button className="r-burger" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${T.border}`, background: T.surface, color: T.text, cursor: 'pointer', padding: 0, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 5 }}>
          <span style={{ width: 16, height: 1.5, background: 'currentColor', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(3.25px) rotate(45deg)' : 'none' }} />
          <span style={{ width: 16, height: 1.5, background: 'currentColor', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(-3.25px) rotate(-45deg)' : 'none' }} />
        </button>
        <div className="r-nav-right" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <ThemeToggle />
          <a
            className="r-resume"
            aria-label="Download resume"
            href="/Muhammad_Awais_Ayub_Resume.pdf"
            download="Muhammad_Awais_Ayub_Resume.pdf"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '13px', fontWeight: 500, letterSpacing: '0.02em',
              background: 'transparent', color: T.textSub, textDecoration: 'none',
              border: `1px solid ${T.border}`,
              padding: '8px 15px', borderRadius: '999px', transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = T.textMute }}
            onMouseLeave={e => { e.currentTarget.style.color = T.textSub; e.currentTarget.style.borderColor = T.border }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3v12M7 10l5 5 5-5M5 20h14" />
            </svg>
            <span className="r-resume-label">Resume</span>
          </a>
        </div>
      </nav>

      {menuOpen && (
        <div className="r-menu" style={{ position: 'fixed', inset: 0, zIndex: 49, background: T.bg, padding: '88px 24px 28px', display: 'flex', flexDirection: 'column', animation: 'menuIn 0.3s ease both' }}>
          <style>{`@keyframes menuIn { from { opacity: 0; transform: translateY(-8px) } to { opacity: 1; transform: none } }`}</style>
          {[['Work', '#work'], ['Case studies', '#case-studies'], ['About', '#about'], ['Contact', '#contact']].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: T.text, textDecoration: 'none', padding: '16px 0', borderBottom: `1px solid ${T.border}` }}>
              {label}
            </a>
          ))}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <a href="/Muhammad_Awais_Ayub_Resume.pdf" download="Muhammad_Awais_Ayub_Resume.pdf" style={{ color: T.text, fontSize: 14, textDecoration: 'none' }}>Download resume ↓</a>
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="r-wrap r-hero-sec" style={{ padding: '148px 48px 72px', maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
        {/* Lime glow blob */}
        <div style={{
          position: 'absolute', top: '80px', left: '0', width: '480px', height: '480px',
          background: 'radial-gradient(circle, rgba(var(--lime-rgb),0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="r-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'end', position: 'relative' }}>
          <div>
            <div className="r-hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '11px', letterSpacing: '0.14em', color: T.lime,
              fontWeight: 500, textTransform: 'uppercase', marginBottom: '28px',
              padding: '6px 12px', background: T.limeDim, borderRadius: '2px',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.lime }} />
              Portfolio — 2022–2024
            </div>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(56px, 8vw, 100px)',
              fontWeight: 600, lineHeight: '0.96',
              letterSpacing: '-0.03em', margin: 0, color: T.text,
            }}>
              Design<br />
              <span style={{ color: T.lime, fontWeight: 300 }}>that</span><br />
              endures.
            </h1>
          </div>
          <div style={{ paddingBottom: '8px' }}>
            <p className="r-hero-p" style={{ fontSize: '18px', lineHeight: '1.7', color: T.textSub, fontWeight: 300, maxWidth: '420px', margin: '0 0 32px' }}>
              5+ years crafting digital products across fintech, healthtech, and consumer apps — from early concepting to shipped experiences that people actually use.
            </p>
            <div className="r-skills" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {SKILLS.map(skill => (
                <span key={skill} className="skill-tag" style={{
                  fontSize: '12px', letterSpacing: '0.05em',
                  padding: '7px 14px',
                  border: `1px solid rgba(var(--lime-rgb),0.25)`,
                  color: T.textSub,
                  borderRadius: '2px', fontWeight: 400,
                  background: 'rgba(var(--lime-rgb),0.04)',
                  cursor: 'default',
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <div id="work" className="r-wrap r-pad r-filter" style={{ scrollMarginTop: 80, padding: '0 48px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="r-filter-in" style={{ display: 'flex', alignItems: 'center', gap: '2px', borderBottom: `1px solid ${T.border}` }}>
          {FILTERS.map(f => {
            const color = f === 'All' ? T.lime : (DISCIPLINE_COLORS[f]?.text ?? T.lime)
            const isActive = activeFilter === f
            return (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontSize: '13px', fontWeight: isActive ? 500 : 400,
                  letterSpacing: '0.04em',
                  padding: '12px 22px',
                  background: 'none', border: 'none',
                  borderBottom: isActive ? `2px solid ${color}` : '2px solid transparent',
                  color: isActive ? color : T.textMute,
                  cursor: 'pointer', transition: 'color 0.2s',
                  marginBottom: '-1px', fontFamily: "'Outfit', sans-serif",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = T.textSub }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = T.textMute }}
              >
                {f}
              </button>
            )
          })}
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: T.textMute, letterSpacing: '0.08em', paddingBottom: '12px', fontWeight: 400 }}>
            {filtered.length} {filtered.length === 1 ? 'PROJECT' : 'PROJECTS'}
          </span>
        </div>
      </div>


      <CaseStudyStage key={activeFilter} works={filtered} onOpen={(w) => setOpenId(w.id)} />

      {openId !== null && (
        <CaseStudy
          work={WORKS.find((w) => w.id === openId)!}
          next={WORKS[openId % WORKS.length]}
          onClose={() => setOpenId(null)}
          onNext={() => setOpenId((openId % WORKS.length) + 1)}
        />
      )}

      {/* ── About ── */}
      <AboutSection />

      {/* ── Process Strip ── */}
      <section style={{ borderTop: `1px solid ${T.border}` }}>
        <div data-reveal className="r-wrap r-process r-pad" style={{
          maxWidth: '1400px', margin: '0 auto', padding: '0 48px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { num: '01', label: 'Research & Strategy', desc: 'Understanding context before touching pixels.' },
            { num: '02', label: 'Systems Thinking',    desc: 'Designing components that scale and stay coherent.' },
            { num: '03', label: 'High-fidelity Craft', desc: 'Pixel-considered work ready for handoff.' },
            { num: '04', label: 'Collaborative Build', desc: 'Close partnership with engineering through ship.' },
          ].map((step, i) => (
            <div key={step.num} className="r-step" style={{
              padding: '48px 32px 48px 0',
              borderRight: i < 3 ? `1px solid ${T.border}` : 'none',
              paddingLeft: i > 0 ? '32px' : 0,
            }}>
              <div style={{
                fontSize: '12px', color: T.lime, letterSpacing: '0.1em',
                marginBottom: '20px', fontWeight: 600,
                fontFamily: "'Outfit', monospace",
              }}>
                {step.num}
              </div>
              <div style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '18px', fontWeight: 400,
                color: T.text, marginBottom: '10px', letterSpacing: '-0.01em',
              }}>
                {step.label}
              </div>
              <div style={{ fontSize: '14px', color: T.textMute, lineHeight: 1.65, fontWeight: 300 }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Experience />
      <Education />

      {/* ── Contact ── */}
      <section id="contact" data-reveal className="r-wrap r-contact" style={{ padding: '128px 48px 136px', maxWidth: 1400, margin: '0 auto', position: 'relative', scrollMarginTop: 80 }}>
        <div className="contact-grid" style={{ display: 'grid', alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.2em', color: T.text, textTransform: 'uppercase', fontWeight: 600, marginBottom: 48, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ width: 36, height: 2, background: T.lime }} />
              Contact
            </div>
            <h2 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 28px', color: T.text }}>
              Let's talk<span style={{ color: T.lime }}>.</span>
            </h2>
            <p style={{ color: T.textSub, fontSize: 18, lineHeight: 1.6, margin: '0 0 48px', maxWidth: 440 }}>
              Pick a time, send a note, or just message me. Whichever is least effort for you.
            </p>
            <div className="r-contact-rows">
              {[
                { label: 'WhatsApp', value: '+92 300 0000000', href: 'https://wa.me/923000000000' },
                { label: 'Email', value: 'awais@design.work', href: 'mailto:awais@design.work' },
              ].map((r, i) => (
                <a key={r.label} href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="r-contact-row"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '26px 0', borderTop: `1px solid ${T.border}`, borderBottom: i === 1 ? `1px solid ${T.border}` : 'none', textDecoration: 'none', color: T.text }}>
                  <span>
                    <span style={{ display: 'block', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.textMute, fontWeight: 500, marginBottom: 6 }}>{r.label}</span>
                    <span style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 500, letterSpacing: '-0.02em', wordBreak: 'break-word' }}>{r.value}</span>
                  </span>
                  <span className="r-contact-arrow" aria-hidden style={{ fontSize: 22, color: T.lime }}>→</span>
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer data-reveal className="r-footer r-footer-main" style={{
        borderTop: `1px solid ${T.border}`,
        padding: '32px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span className="r-foot-name" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '15px', fontWeight: 400, color: T.textMute }}>
          Muhammad Awais Ayub
        </span>
        <span style={{ fontSize: '12px', color: T.textMute, letterSpacing: '0.06em', fontWeight: 400 }}>
          © 2024
        </span>
      </footer>

      <OutroScene />

      {/* ── Scroll Progress Bar ── */}
      <div style={{ position: 'fixed', bottom: '6px', left: '24px', right: '24px', zIndex: 100, height: '3px', background: T.border, borderRadius: '99px' }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress * 100}%`,
          background: T.lime,
          borderRadius: '99px',
          transition: 'width 0.08s linear',
          boxShadow: `0 0 10px ${T.lime}90`,
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .skill-tag {
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.18s;
        }
        .skill-tag:hover {
          background: rgba(var(--lime-rgb),0.18) !important;
          color: var(--lime) !important;
          border-color: rgba(var(--lime-rgb),0.6) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}
