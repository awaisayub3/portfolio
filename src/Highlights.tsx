import { T } from './tokens'

// All figures and names below come from the resume.
const RESULTS = [
  { value: '45%', label: 'Conversion lift after the e-commerce redesign', where: 'Gourmet Pakistan' },
  { value: '150+', label: 'Components in the company’s first design system', where: 'Gourmet Pakistan' },
  { value: '55%', label: 'Better task completion on the cloud dashboard', where: 'Sync-Clouds' },
  { value: '200+', label: 'Users in the first quarter at 4.7/5 satisfaction', where: 'SHIZA' },
]

const TOOLS = [
  { group: 'Design', items: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'Framer'] },
  { group: 'Build', items: ['HTML/CSS', 'Tailwind CSS', 'Git'] },
  { group: 'Research', items: ['Maze', 'UserTesting', 'Hotjar', 'Google Analytics'] },
]

const PROJECTS = ['Tree Tracker Pro', 'SHIZA.AI', 'G-Foods', 'gBSS', 'Truck Adda', 'G-Dukan']

export default function Highlights() {
  return (
    <section id="highlights" data-reveal className="r-wrap r-pad r-hl" style={{ maxWidth: 1400, margin: '0 auto', padding: '96px 48px 24px', scrollMarginTop: 80 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.18em', color: T.lime, textTransform: 'uppercase', fontWeight: 600, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 28, height: 1, background: T.lime }} />
        At a glance
      </div>

      <div className="r-hl-results" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: `1px solid ${T.border}` }}>
        {RESULTS.map((r, i) => (
          <div key={r.label} className="r-hl-cell" style={{ padding: '32px 28px', borderLeft: i ? `1px solid ${T.border}` : 'none', background: T.surface }}>
            <div style={{ fontSize: 'clamp(40px, 4.6vw, 64px)', fontWeight: 600, letterSpacing: '-0.04em', color: T.lime, lineHeight: 1 }}>{r.value}</div>
            <div style={{ fontSize: 15, lineHeight: 1.5, color: T.textSub, marginTop: 14 }}>{r.label}</div>
            <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.textMute, marginTop: 12 }}>{r.where}</div>
          </div>
        ))}
      </div>

      <div className="r-hl-cols" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, marginTop: 56 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.textMute, fontWeight: 600, paddingBottom: 14, borderBottom: `1px solid ${T.border}`, marginBottom: 6 }}>Tools I work with</div>
          {TOOLS.map((g) => (
            <div key={g.group} className="r-hl-tool" style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16, padding: '16px 0', borderBottom: `1px solid ${T.border}`, alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, color: T.textMute }}>{g.group}</span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {g.items.map((t) => (
                  <span key={t} style={{ fontSize: 14, padding: '6px 12px', borderRadius: 999, border: `1px solid ${T.border}`, color: T.textSub }}>{t}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.textMute, fontWeight: 600, paddingBottom: 14, borderBottom: `1px solid ${T.border}`, marginBottom: 6 }}>Notable projects</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {PROJECTS.map((p, i) => (
              <li key={p} style={{ display: 'flex', gap: 16, alignItems: 'baseline', padding: '14px 0', borderBottom: `1px solid ${T.border}`, fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em', color: T.text }}>
                <span style={{ fontSize: 12, color: T.textFaint, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>
                {p}
              </li>
            ))}
          </ul>
          <p style={{ margin: '16px 0 0', fontSize: 13, lineHeight: 1.6, color: T.textMute }}>Full case studies and design samples are available on request due to NDAs.</p>
        </div>
      </div>
    </section>
  )
}
