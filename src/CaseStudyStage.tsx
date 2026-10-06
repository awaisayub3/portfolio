import { useEffect, useRef, useState } from 'react'
import { T, DISCIPLINE_COLORS } from './tokens'
import type { Work } from './tokens'
import { CASES } from './caseStudies'

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (t: number) => t * t * (3 - 2 * t)

export default function CaseStudyStage({ works, onOpen }: { works: Work[]; onOpen: (w: Work) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(0)
  const n = works.length

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      setPos(n > 1 && total > 0 ? clamp(-rect.top / total) * (n - 1) : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [n])

  const goTo = (i: number) => {
    const el = ref.current
    if (!el || n < 2) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const total = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + (i / (n - 1)) * total, behavior: 'smooth' })
  }

  const active = Math.round(pos)

  return (
    <section id="case-studies" ref={ref} style={{ height: n > 1 ? `${n * 85}vh` : '100vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div className="r-stage-top" style={{ position: 'absolute', top: 100, left: 48, right: 48, display: 'flex', justifyContent: 'space-between', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.textMute, zIndex: 3 }}>
          <span>Case studies</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            <span style={{ color: T.lime }}>{String(active + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}
          </span>
        </div>

        {works.map((w, i) => {
          const d = pos - i
          const ad = Math.abs(d)
          const o = ad >= 0.5 ? 0 : smooth(clamp(1 - (ad - 0.12) / 0.38))
          const c = CASES[w.id]
          const dc = DISCIPLINE_COLORS[w.discipline] ?? { bg: T.limeDim, text: T.lime }
          return (
            <div
              key={w.id}
              aria-hidden={i !== active}
              className="r-stage-item grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-16 items-center content-center"
              style={{
                position: 'absolute',
                inset: 0,
                padding: '132px 48px 72px',
                maxWidth: 1400,
                margin: '0 auto',
                opacity: o,
                transform: `translateY(${clamp(d, -1, 1) * -18}px) scale(${1 - ad * 0.03})`,
                filter: `blur(${(1 - o) * 8}px)`,
                pointerEvents: i === active ? 'auto' : 'none',
                willChange: 'opacity, transform',
              }}
            >
              <div className="r-stage-text" style={{ gridArea: 'text' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', color: T.lime }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 2, background: dc.bg, color: dc.text }}>{w.discipline}</span>
                  <span style={{ fontSize: 12, color: T.textMute }}>{w.year}</span>
                </div>
                <h3 className="r-stage-h" style={{ margin: 0, fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1, color: T.text }}>{w.title}</h3>
                <p className="r-stage-p" style={{ margin: '20px 0 28px', fontSize: 18, lineHeight: 1.55, color: T.textSub, maxWidth: 480 }}>{c.tagline}</p>
                <div className="r-stage-stats" style={{ display: 'flex', gap: 32, marginBottom: 36, flexWrap: 'wrap' }}>
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', color: T.lime }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: T.textMute, marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="r-stage-img" style={{ gridArea: 'img', position: 'relative', aspectRatio: '4 / 3', maxHeight: '58vh', width: '100%', borderRadius: 6, overflow: 'hidden', border: `1px solid ${T.border}` }}>
                <img src={w.img} alt={w.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 55%, rgba(8,8,8,0.7))` }} />
                <div className="r-stage-tags" style={{ position: 'absolute', left: 16, bottom: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {w.tags.map((t) => (
                    <span key={t} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: 'rgba(8,8,8,0.6)', color: '#f2ede6', backdropFilter: 'blur(8px)' }}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="r-stage-cta" style={{ gridArea: 'cta' }}>
                <button
                  onClick={() => onOpen(w)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: T.lime, color: T.onLime, border: 'none', borderRadius: 999, padding: '14px 26px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}
                >
                  Read case study <span aria-hidden>→</span>
                </button>
                <a href={w.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 20, color: T.textSub, fontSize: 14, textDecoration: 'none', borderBottom: `1px solid ${T.border}`, paddingBottom: 2, whiteSpace: 'nowrap' }}>
                  Visit live <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          )
        })}

        {n > 1 && (
          <div className="r-stage-rail" style={{ position: 'absolute', left: 0, right: 0, bottom: 20, display: 'flex', justifyContent: 'center', gap: 4, zIndex: 3 }}>
            {works.map((w, i) => (
              <button
                key={w.id}
                onClick={() => goTo(i)}
                aria-label={`Go to ${w.title}`}
                aria-current={i === active}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 6px', fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', fontVariantNumeric: 'tabular-nums', color: i === active ? T.lime : T.textFaint, transition: 'color 0.3s', position: 'relative' }}
              >
                {String(i + 1).padStart(2, '0')}
                <span style={{ position: 'absolute', left: 6, right: 6, bottom: 2, height: 2, borderRadius: 2, background: T.lime, transform: `scaleX(${i === active ? 1 : 0})`, transition: 'transform 0.3s' }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
