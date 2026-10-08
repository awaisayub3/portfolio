import { T } from './tokens'

const EDU = [
  { years: '2013 — 2017', title: 'BS Computer Science', org: 'University of the Punjab, Lahore', note: 'Focus on human-computer interaction and web technologies.' },
  { years: '2012 — 2013', title: 'Intermediate, Pre-Engineering', org: 'Government College, Lahore', note: '' },
]

const CERTS = [
  { year: '2023', title: 'Google UX Design Professional Certificate', org: 'Coursera' },
  { year: '2022', title: 'UX Certification', org: 'Nielsen Norman Group' },
  { year: '2021', title: 'Design Systems with Figma', org: 'Interaction Design Foundation' },
  { year: '2020', title: 'Accessibility Fundamentals (WCAG)', org: 'Deque University' },
]

const TILES = [
  ...EDU.map((e) => ({ kind: 'Education', when: e.years, title: e.title, org: e.org, note: e.note })),
  ...CERTS.map((c) => ({ kind: 'Certificate', when: c.year, title: c.title, org: c.org, note: '' })),
]

export default function Education() {
  return (
    <section id="education" data-reveal className="r-wrap r-pad r-edu" style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 48px 128px', scrollMarginTop: 80 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.18em', color: T.lime, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 28, height: 1, background: T.lime }} />
        Education &amp; certifications
      </div>

      <div className="r-edu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: T.border, border: `1px solid ${T.border}` }}>
        {TILES.map((t, i) => {
          const edu = t.kind === 'Education'
          return (
            <article key={t.title} className="r-edu-tile" style={{ aspectRatio: '1 / 1', background: edu ? 'var(--surface)' : T.bg, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: edu ? T.lime : T.textMute }}>{t.kind}</span>
                <span style={{ fontSize: 12, color: T.textFaint, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div>
                <div style={{ fontSize: 13, color: T.textMute, fontVariantNumeric: 'tabular-nums', marginBottom: 10 }}>{t.when}</div>
                <div style={{ fontSize: 'clamp(19px, 1.8vw, 24px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.22, color: T.text }}>{t.title}</div>
                <div style={{ fontSize: 14, color: T.textSub, marginTop: 8 }}>{t.org}</div>
                {t.note && <p className="r-edu-note" style={{ margin: '10px 0 0', fontSize: 13, lineHeight: 1.55, color: T.textMute }}>{t.note}</p>}
              </div>
            </article>
          )
        })}
        <article className="r-edu-tile r-edu-lime" style={{ aspectRatio: '1 / 1', background: T.lime, color: T.onLime, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ fontSize: 'clamp(19px, 1.8vw, 24px)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2 }}>Always learning.</div>
          <div style={{ fontSize: 13, marginTop: 8, opacity: 0.8 }}>Next up: advanced motion design</div>
        </article>
        <div className="r-edu-tile r-edu-blank" aria-hidden style={{ aspectRatio: '1 / 1', background: T.bg, backgroundImage: `repeating-linear-gradient(45deg, transparent 0 15px, ${T.border} 15px 16px)` }} />
      </div>
    </section>
  )
}
