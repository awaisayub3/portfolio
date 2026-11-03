import { useEffect, useRef, useState } from 'react'
import { T, DISCIPLINE_COLORS } from './tokens'
import ThemeToggle from './ThemeToggle'
import type { Work } from './tokens'
import { CASES } from './caseStudies'
import { DETAILS } from './caseDetails'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Goals & constraints' },
  { id: 'research', label: 'Research' },
  { id: 'problem', label: 'The problem' },
  { id: 'approach', label: 'The approach' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'iterations', label: 'Iterations' },
  { id: 'solution', label: 'The solution' },
  { id: 'quote', label: 'Principle' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'learnings', label: 'Learnings' },
]

const eyebrow = { fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: T.lime, marginBottom: 16 }
const h2 = { margin: '0 0 20px', fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, color: T.text }
const sec = { paddingBottom: 96, scrollMarginTop: 96 }
const body = { margin: '0 0 18px', fontSize: 17, lineHeight: 1.7, color: T.textSub }

export default function CaseStudy({ work, next, onClose, onNext }: { work: Work; next: Work; onClose: () => void; onNext: () => void }) {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState('overview')
  const [progress, setProgress] = useState(0)
  const c = CASES[work.id]
  const d = DETAILS[work.id]
  const dc = DISCIPLINE_COLORS[work.discipline] ?? { bg: T.limeDim, text: T.lime }

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  useEffect(() => {
    const root = scroller.current
    if (!root) return
    root.scrollTo({ top: 0 })
    const onScroll = () => setProgress(root.scrollTop / (root.scrollHeight - root.clientHeight || 1))
    root.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { root, rootMargin: '-30% 0px -60% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = root.querySelector('#' + s.id)
      if (el) io.observe(el)
    })
    return () => {
      root.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [work.id])

  const jump = (id: string) => scroller.current?.querySelector('#' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div
      ref={scroller}
      data-lenis-prevent
      style={{ position: 'fixed', inset: 0, zIndex: 500, overflowY: 'auto', background: T.bg, color: T.text, fontFamily: "'Outfit', sans-serif", animation: 'csIn 0.5s ease both' }}
    >
      <style>{`@keyframes csIn { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }`}</style>
      <div style={{ position: 'sticky', top: 0, height: 3, zIndex: 20, marginBottom: -3 }}>
        <div style={{ height: '100%', width: `${progress * 100}%`, background: T.lime }} />
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--nav-bg)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${T.border}` }}>
        <div className="r-cs-pad" style={{ maxWidth: 1240, margin: '0 auto', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onClose} aria-label="Back to work" style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 999, padding: '8px 16px', color: T.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0, whiteSpace: 'nowrap' }}>
            <span aria-hidden>←</span> Back<span className="r-cs-back-long">&nbsp;to work</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span className="r-cs-name" style={{ fontSize: 14, fontWeight: 500, color: T.textMute }}>Muhammad Awais Ayub</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="r-cs-pad" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px' }}>
        <section className="r-cs-hero" style={{ padding: '72px 0 48px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 2, background: dc.bg, color: dc.text }}>{work.discipline}</span>
            <span style={{ fontSize: 13, color: T.textMute }}>Case study · {work.year}</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(56px, 11vw, 150px)', fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 0.95 }}>
            {work.title}<span style={{ color: T.lime }}>.</span>
          </h1>
          <p style={{ margin: '28px 0 0', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.5, color: T.textSub, maxWidth: 760 }}>{c.lede}</p>

          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ margin: '48px 0 0', paddingTop: 28, borderTop: `1px solid ${T.border}` }}>
            {[['Role', c.role], ['Client', c.client], ['Year', work.year], ['Focus', c.focus]].map(([k, v]) => (
              <div key={k}>
                <dt style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.textMute, marginBottom: 6 }}>{k}</dt>
                <dd style={{ margin: 0, fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: `1px solid ${T.border}` }} className="r-cs-img">
          <img src={work.img} alt={work.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(8,8,8,0.6))' }} />
        </div>
        <p style={{ fontSize: 13, color: T.textMute, margin: '14px 0 0' }}>Mock visuals. Names, data, and results are illustrative.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 r-cs-stats" style={{ margin: '72px 0', border: `1px solid ${T.border}`, borderRadius: 8, overflow: 'hidden' }}>
          {c.stats.map((s, i) => (
            <div key={s.label} className={i ? 'r-cs-stat' : ''} style={{ padding: '32px 28px', background: T.surface }}>
              <div style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 600, letterSpacing: '-0.04em', color: T.lime, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 14, color: T.textSub, marginTop: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">
          <nav className="hidden lg:block" style={{ position: 'sticky', top: 96, alignSelf: 'start' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.textMute, marginBottom: 16 }}>On this page</div>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => jump(s.id)}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', borderLeft: `2px solid ${active === s.id ? T.lime : T.border}`, padding: '8px 14px', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', color: active === s.id ? T.text : T.textMute, transition: 'color 0.2s, border-color 0.2s' }}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <article style={{ maxWidth: 780 }}>
            <section id="overview" className="r-cs-sec" style={sec}>
              <div style={eyebrow}>01 · Overview</div>
              <h2 style={h2}>{c.tagline}.</h2>
              {c.overview.map((p) => <p key={p} style={body}>{p}</p>)}
              <div style={{ marginTop: 32, padding: '22px 26px', borderRadius: 6, background: T.limeDim, border: '1px solid rgba(var(--lime-rgb),0.3)' }}>
                <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.lime, marginBottom: 8 }}>The project in one sentence</div>
                <div style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.4 }}>Find what gets in the way, remove it, and prove the result with real numbers.</div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ margin: '32px 0 0', paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
                {[['Timeline', [d.timeline]], ['Team', d.team], ['Tools', d.tools]].map(([k, v]) => (
                  <div key={k as string}>
                    <dt style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.textMute, marginBottom: 8 }}>{k as string}</dt>
                    <dd style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: T.textSub }}>{(v as string[]).map((x) => <div key={x}>{x}</div>)}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="context" className="r-cs-sec" style={sec}>
              <div style={eyebrow}>02 · Goals &amp; constraints</div>
              <h2 style={h2}>What success meant, and what stood in the way.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginTop: 28 }}>
                {[['Goals', d.goals, true], ['Constraints', d.constraints, false]].map(([k, list, lime]) => (
                  <div key={k as string} style={{ padding: 24, border: `1px solid ${T.border}`, borderRadius: 6, background: T.surface }}>
                    <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: lime ? T.lime : T.textMute, marginBottom: 14, fontWeight: 600 }}>{k as string}</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
                      {(list as string[]).map((x) => <li key={x} style={{ fontSize: 15, lineHeight: 1.55, color: T.textSub, display: 'flex', gap: 10 }}><span aria-hidden style={{ color: T.lime }}>—</span>{x}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section id="research" className="r-cs-sec" style={sec}>
              <div style={eyebrow}>03 · Research</div>
              <h2 style={h2}>Listening before drawing.</h2>
              <div style={{ display: 'grid', gap: 0, marginTop: 24, borderTop: `1px solid ${T.border}` }}>
                {d.research.map((r) => (
                  <div key={r.method} className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8" style={{ padding: '22px 0', borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{r.method}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.65, color: T.textSub }}>{r.text}</div>
                  </div>
                ))}
              </div>
              <figure style={{ margin: '32px 0 0', padding: '24px 28px', borderLeft: `3px solid ${T.lime}`, background: T.surface, borderRadius: '0 6px 6px 0' }}>
                <blockquote style={{ margin: 0, fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.45, fontWeight: 500, letterSpacing: '-0.01em' }}>“{d.persona.quote}”</blockquote>
                <figcaption style={{ marginTop: 12, fontSize: 13, color: T.textMute }}>{d.persona.who}</figcaption>
              </figure>
              <div style={{ marginTop: 32, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.textMute, fontWeight: 600, marginBottom: 12 }}>Key insights</div>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
                {d.insights.map((x, i) => (
                  <li key={x} style={{ display: 'flex', gap: 14, fontSize: 16, lineHeight: 1.6, color: T.textSub }}>
                    <span style={{ color: T.lime, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>{x}
                  </li>
                ))}
              </ol>
            </section>

            <section id="problem" className="r-cs-sec" style={sec}>
              <div style={eyebrow}>04 · The problem</div>
              <h2 style={h2}>{c.problemTitle}</h2>
              <p style={body}>{c.problem}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginTop: 28 }}>
                {c.gaps.map((g) => (
                  <div key={g.title} style={{ padding: 24, border: `1px solid ${T.border}`, borderRadius: 6, background: T.surface }}>
                    <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{g.title}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.6, color: T.textSub }}>{g.text}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="approach" className="r-cs-sec" style={sec}>
              <div style={eyebrow}>05 · The approach</div>
              <h2 style={h2}>{c.approachTitle}</h2>
              <p style={body}>{c.approach}</p>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ listStyle: 'none', padding: 0, margin: '28px 0 0' }}>
                {c.steps.map((s, i) => (
                  <li key={s.title} style={{ padding: 24, border: `1px solid ${T.border}`, borderRadius: 6, background: T.surface }}>
                    <div style={{ fontSize: 12, color: T.lime, fontWeight: 500, letterSpacing: '0.08em', marginBottom: 14 }}>{String(i + 1).padStart(2, '0')}</div>
                    <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 6 }}>{s.title}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.6, color: T.textSub }}>{s.text}</div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="decisions" className="r-cs-sec" style={sec}>
              <div style={eyebrow}>06 · Key decisions</div>
              <h2 style={h2}>The calls that shaped the product.</h2>
              <div style={{ display: 'grid', gap: 16, marginTop: 28 }}>
                {d.decisions.map((x, i) => (
                  <div key={x.title} className="r-cs-card" style={{ padding: 28, border: `1px solid ${T.border}`, borderRadius: 6, background: T.surface }}>
                    <div style={{ fontSize: 12, color: T.lime, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 10 }}>DECISION {String(i + 1).padStart(2, '0')}</div>
                    <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 18 }}>{x.title}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {[['Problem', x.problem], ['Decision', x.decision], ['Trade-off', x.tradeoff]].map(([k, v]) => (
                        <div key={k}>
                          <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.textMute, marginBottom: 6 }}>{k}</div>
                          <div style={{ fontSize: 15, lineHeight: 1.6, color: T.textSub }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="iterations" className="r-cs-sec" style={sec}>
              <div style={eyebrow}>07 · Iterations</div>
              <h2 style={h2}>What changed between version one and shipped.</h2>
              <div style={{ display: 'grid', gap: 16, marginTop: 28 }}>
                {d.iterations.map((x) => (
                  <div key={x.label}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>{x.label}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div style={{ padding: 22, border: `1px dashed ${T.border}`, borderRadius: 6 }}>
                        <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.textMute, marginBottom: 8 }}>Before</div>
                        <div style={{ fontSize: 15, lineHeight: 1.6, color: T.textSub }}>{x.before}</div>
                      </div>
                      <div style={{ padding: 22, borderRadius: 6, background: T.limeDim, border: '1px solid rgba(var(--lime-rgb),0.3)' }}>
                        <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.lime, marginBottom: 8 }}>After</div>
                        <div style={{ fontSize: 15, lineHeight: 1.6, color: T.text }}>{x.after}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="solution" className="r-cs-sec" style={sec}>
              <div style={eyebrow}>08 · The solution</div>
              <h2 style={h2}>What shipped.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginTop: 28 }}>
                {d.solution.map((x) => (
                  <figure key={x.title} style={{ margin: 0 }}>
                    <div style={{ aspectRatio: '4 / 5', borderRadius: 6, overflow: 'hidden', border: `1px solid ${T.border}` }}>
                      <img src={work.img} alt={`${work.title}: ${x.title}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: x.pos, transform: 'scale(1.6)', transformOrigin: x.pos, display: 'block' }} />
                    </div>
                    <figcaption style={{ marginTop: 14 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{x.title}</div>
                      <div style={{ fontSize: 14, lineHeight: 1.55, color: T.textMute }}>{x.text}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section id="quote" className="r-cs-sec" style={sec}>
              <blockquote style={{ margin: 0, padding: 'clamp(28px, 4vw, 48px)', borderRadius: 8, background: T.surface, border: `1px solid ${T.border}`, position: 'relative' }}>
                <div aria-hidden style={{ fontSize: 96, lineHeight: 0.6, color: T.lime, fontWeight: 700, height: 44 }}>“</div>
                <p style={{ margin: 0, fontSize: 'clamp(22px, 2.6vw, 32px)', fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.02em' }}>{c.quote}</p>
                <footer style={{ marginTop: 20, fontSize: 13, color: T.textMute }}>Design principle · {work.title}</footer>
              </blockquote>
            </section>

            <section id="outcome" className="r-cs-sec" style={sec}>
              <div style={eyebrow}>09 · Outcome</div>
              <h2 style={h2}>{c.outcomeTitle}</h2>
              <p style={body}>{c.outcome}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginTop: 28 }}>
                {c.results.map((r) => (
                  <div key={r.label} style={{ padding: 24, borderRadius: 6, background: T.limeDim, border: '1px solid rgba(var(--lime-rgb),0.25)' }}>
                    <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', color: T.lime }}>{r.value}</div>
                    <div style={{ fontSize: 14, color: T.textSub, marginTop: 4 }}>{r.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, border: `1px solid ${T.border}`, borderRadius: 6, overflow: 'hidden' }}>
                <div className="hidden sm:grid" style={{ gridTemplateColumns: '1.6fr 1fr 1fr', padding: '12px 24px', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.textMute, background: T.surface }}>
                  <span>Metric</span><span>Before</span><span>After</span>
                </div>
                {d.metrics.map((m) => (
                  <div key={m.label} className="grid grid-cols-3 sm:grid-cols-[1.6fr_1fr_1fr] gap-2" style={{ padding: '18px 24px', borderTop: `1px solid ${T.border}`, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 15, color: T.textSub }}>{m.label}</span>
                    <span style={{ fontSize: 18, color: T.textMute, fontVariantNumeric: 'tabular-nums' }}>{m.before}</span>
                    <span style={{ fontSize: 22, fontWeight: 600, color: T.lime, fontVariantNumeric: 'tabular-nums' }}>{m.after}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="learnings" className="r-cs-sec r-cs-sec-last" style={{ ...sec, paddingBottom: 72 }}>
              <div style={eyebrow}>10 · Learnings</div>
              <h2 style={h2}>What I would carry into the next project.</h2>
              <ul style={{ margin: '24px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
                {d.learnings.map((x) => (
                  <li key={x} style={{ display: 'flex', gap: 12, fontSize: 17, lineHeight: 1.65, color: T.textSub }}><span aria-hidden style={{ color: T.lime }}>→</span>{x}</li>
                ))}
              </ul>
              <div style={{ marginTop: 40, padding: 24, border: `1px solid ${T.border}`, borderRadius: 6, background: T.surface }}>
                <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.lime, fontWeight: 600, marginBottom: 14 }}>What is next</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {d.next.map((x) => <span key={x} style={{ fontSize: 14, padding: '7px 14px', borderRadius: 999, border: `1px solid ${T.border}`, color: T.textSub }}>{x}</span>)}
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>

      <button
        onClick={onNext}
        style={{ display: 'block', width: '100%', textAlign: 'left', background: T.surface, border: 'none', borderTop: `1px solid ${T.border}`, padding: '64px 0', cursor: 'pointer', fontFamily: 'inherit', color: T.text }}
      >
        <div className="r-cs-pad" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.textMute, marginBottom: 12 }}>Next case study</div>
            <div style={{ fontSize: 'clamp(32px, 6vw, 72px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1 }}>{next.title}</div>
          </div>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: T.lime, color: T.onLime, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>→</div>
        </div>
      </button>
    </div>
  )
}
