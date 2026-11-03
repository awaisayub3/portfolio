import { T, DISCIPLINE_COLORS } from './tokens'
import type { Work } from './tokens'
import { CASES } from './caseStudies'

export type WorkView = 'stage' | 'grid' | 'list'

export function ViewSwitch({ view, onChange }: { view: WorkView; onChange: (v: WorkView) => void }) {
  const opts: { id: WorkView; label: string; icon: string }[] = [
    { id: 'stage', label: 'Showcase', icon: 'M3 5h18v10H3zM8 19h8' },
    { id: 'grid', label: 'Grid', icon: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z' },
    { id: 'list', label: 'List', icon: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01' },
  ]
  return (
    <div role="radiogroup" aria-label="Case study view" className="r-viewsw" style={{ display: 'inline-flex', padding: 3, gap: 2, border: `1px solid ${T.border}`, borderRadius: 999, background: T.surface }}>
      {opts.map((o) => {
        const on = view === o.id
        return (
          <button key={o.id} role="radio" aria-checked={on} aria-label={`${o.label} view`} title={`${o.label} view`} onClick={() => onChange(o.id)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 500, background: on ? T.lime : 'transparent', color: on ? T.onLime : T.textMute, transition: 'background 0.2s, color 0.2s' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={o.icon} /></svg>
            <span className="r-viewsw-label">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function CaseStudyGrid({ works, mode, onOpen }: { works: Work[]; mode: 'grid' | 'list'; onOpen: (w: Work) => void }) {
  return (
    <section id="case-studies" className="r-wrap r-pad r-cgrid" style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 48px 96px', scrollMarginTop: 80 }}>
      {mode === 'grid' ? (
        <div className="r-cg-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
          {works.map((w, i) => {
            const dc = DISCIPLINE_COLORS[w.discipline] ?? { bg: T.limeDim, text: T.lime }
            return (
              <button key={w.id} onClick={() => onOpen(w)} className="r-cg-card" aria-label={`Open case study: ${w.title}`}
                style={{ textAlign: 'left', padding: 0, border: `1px solid ${T.border}`, borderRadius: 8, overflow: 'hidden', background: T.surface, color: T.text, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column' }}>
                <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', position: 'relative' }}>
                  <img src={w.img} alt={w.alt} loading="lazy" className="r-cg-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 2, background: 'var(--bg)', color: dc.text }}>{w.discipline}</span>
                  <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 12, color: '#fff', fontVariantNumeric: 'tabular-nums', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                    <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.025em' }}>{w.title}</span>
                    <span style={{ fontSize: 13, color: T.textMute }}>{w.year}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: T.textSub }}>{CASES[w.id].tagline}</p>
                  <span style={{ marginTop: 'auto', paddingTop: 10, fontSize: 13, color: T.lime, fontWeight: 500 }}>Read case study →</span>
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        <div style={{ borderTop: `1px solid ${T.border}` }}>
          {works.map((w, i) => (
            <button key={w.id} onClick={() => onOpen(w)} className="r-cl-row" aria-label={`Open case study: ${w.title}`}
              style={{ display: 'grid', gridTemplateColumns: '48px 1.2fr 2fr 120px 90px 24px', alignItems: 'center', gap: 20, width: '100%', textAlign: 'left', padding: '22px 8px', background: 'none', border: 'none', borderBottom: `1px solid ${T.border}`, color: T.text, cursor: 'pointer', fontFamily: 'inherit' }}>
              <span style={{ fontSize: 13, color: T.textFaint, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 'clamp(18px, 2vw, 26px)', fontWeight: 500, letterSpacing: '-0.025em' }}>{w.title}</span>
              <span className="r-cl-tag" style={{ fontSize: 14, color: T.textMute }}>{CASES[w.id].tagline}</span>
              <span className="r-cl-disc" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: (DISCIPLINE_COLORS[w.discipline] ?? { text: T.lime }).text, fontWeight: 600 }}>{w.discipline}</span>
              <span className="r-cl-year" style={{ fontSize: 13, color: T.textMute }}>{w.year}</span>
              <span aria-hidden className="r-cl-arrow" style={{ color: T.lime }}>→</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
