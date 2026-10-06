import { useEffect, useRef } from 'react'
import { T } from './tokens'

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)

export default function AboutSection() {
  const sec = useRef<HTMLElement>(null)
  const slot = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const label = useRef<HTMLDivElement>(null)
  const cur = useRef(0)
  const target = useRef(0)

  useEffect(() => {
    const apply = () => {
      const lb = label.current
      const s = sec.current, sl = slot.current, cd = card.current, tx = text.current, im = img.current
      if (!s || !sl || !cd || !tx || !im || !lb) return
      const wide = window.innerWidth >= 961 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!wide) {
        cd.style.transform = tx.style.transform = ''
        lb.style.opacity = tx.style.opacity = cd.style.opacity = '1'
        im.style.filter = 'grayscale(100%) brightness(0.9)'
        return
      }
      const vh = window.innerHeight
      const total = Math.max(1, s.offsetHeight - vh)
      const sp = cur.current
      const enter = ease(clamp((sp - vh * 0.1) / (vh * 0.6)))
      const settle = ease(clamp(sp / (vh * 0.95)))
      const move = ease(clamp((sp - vh * 0.95 - total * 0.04) / (total * 0.46)))
      const reveal = ease(clamp((sp - vh * 0.95 - total * 0.5) / (total * 0.32)))
      const sr = sl.getBoundingClientRect()
      const fullDx = window.innerWidth / 2 - (sr.left + sr.width / 2)
      const dx = fullDx * (1 - move)
      const scale = 0.82 + enter * 0.18 + (1 - move) * 0.12 * enter
      cd.style.opacity = String(enter)
      cd.style.transform = `translate3d(${dx}px, ${(1 - settle) * -0.36 * vh + (1 - enter) * 40}px, 0) scale(${scale}) rotate(${(1 - move) * -4 * enter}deg)`
      tx.style.opacity = String(reveal)
      tx.style.transform = `translate3d(${-70 * (1 - reveal)}px, 0, 0)`
      lb.style.opacity = String(reveal)
    }
    const measure = () => {
      const s = sec.current
      if (!s) return
      const r = s.getBoundingClientRect()
      target.current = Math.max(0, window.innerHeight * 0.95 - r.top)
    }
    measure()
    cur.current = target.current
    apply()
    let raf = 0
    const tick = () => {
      measure()
      const d = target.current - cur.current
      if (Math.abs(d) > 0.0002) {
        cur.current += d * 0.085
        apply()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const onResize = () => { measure(); cur.current = target.current; apply() }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="about" ref={sec} className="r-about-sec" style={{ borderTop: `1px solid ${T.border}` }}>
      <div className="r-about-sticky">
        <div className="r-wrap r-about-pad" style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 48px', width: '100%' }}>
          <div ref={label} style={{ fontSize: 10, letterSpacing: '0.18em', color: T.lime, textTransform: 'uppercase', fontWeight: 600, marginBottom: 48, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 1, background: T.lime }} />
            About
          </div>

          <div className="r-about" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 80, alignItems: 'center' }}>
            <div ref={text} className="r-about-text">
              <span style={{ fontSize: 120, lineHeight: 1, fontWeight: 700, color: T.lime, display: 'block', marginBottom: -32, marginLeft: -6, userSelect: 'none' }} aria-hidden>"</span>
              <blockquote style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 400, lineHeight: 1.4, letterSpacing: '-0.02em', color: T.text }}>
                Design is not just what it looks like. It's how it works — and how it makes people feel when it works well.
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32 }}>
                <span style={{ width: 28, height: 1, background: T.textFaint }} />
                <span style={{ fontSize: 13, color: T.textMute, fontWeight: 300, letterSpacing: '0.02em' }}>Muhammad Awais Ayub, in a client debrief</span>
              </div>
              <div className="r-about-stats" style={{ display: 'flex', gap: '24px 32px', marginTop: 52, flexWrap: 'wrap' }}>
                {[
                  { label: 'Years experience', value: '5+' },
                  { label: 'Products shipped', value: '20+' },
                  { label: 'Happy clients', value: '30+' },
                ].map((s) => (
                  <div key={s.label} style={{ borderLeft: `2px solid ${T.lime}`, paddingLeft: 16 }}>
                    <div style={{ fontSize: 28, fontWeight: 600, color: T.text, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: T.textMute, letterSpacing: '0.06em', marginTop: 5 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={slot} className="r-portrait" style={{ position: 'relative', height: 520 }}>
              <div ref={card} className="r-about-card" style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity' }}>
                <div className="r-about-frame" aria-hidden />
                <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden', background: 'var(--surface2)', border: `1px solid ${T.border}` }}>
                  <img
                    ref={img}
                    src="https://images.unsplash.com/photo-1635380240750-0d89f9c72968?w=840&h=1040&fit=crop&auto=format"
                    alt="Muhammad Awais Ayub"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) brightness(0.9)', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(var(--lime-rgb),0.14), transparent 35%)' }} />
                </div>
                <span className="r-chip r-chip-a">5+ yrs designing</span>
                <span className="r-chip r-chip-b">Lahore · PK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
