import { T } from './tokens'

const GROUPS = [
  { title: 'Design', items: [['Product & UX Design', 95], ['Design Systems', 92], ['Interaction & Motion', 85], ['Visual & Brand Design', 88]] },
  { title: 'Research', items: [['User Interviews', 86], ['Usability Testing', 90], ['Journey Mapping & IA', 88], ['Accessibility (WCAG)', 84]] },
  { title: 'Tools', items: [['Figma & FigJam', 98], ['Prototyping', 92], ['HTML / CSS / React', 74], ['Jira, Notion, Linear', 88]] },
] as const

const FLOW = [
  { step: 'Brief', title: 'Clarify the requirement', desc: 'Stakeholder call, goals, constraints and success metrics written down in one page.', out: 'Scope doc', time: 'Day 1' },
  { step: 'Discover', title: 'Research & define', desc: 'Interviews, competitor audit and user flows to validate the problem before solving it.', out: 'Flows + insights', time: 'Days 2–4' },
  { step: 'Design', title: 'Wireframe to hi-fi', desc: 'Low-fidelity options, quick feedback loops, then polished screens built on a system.', out: 'Interactive prototype', time: 'Days 5–10' },
  { step: 'Validate', title: 'Test with real users', desc: 'Moderated sessions and iteration so decisions are backed by evidence, not opinion.', out: 'Test report', time: 'Days 11–12' },
  { step: 'Deliver', title: 'Handoff & support', desc: 'Annotated specs, tokens and components, plus QA with engineering through release.', out: 'Dev-ready files', time: 'Day 13+' },
]

export default function Skills() {
  return (
    <section id="skills" data-reveal className="r-wrap r-pad r-skillsec" style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 48px 40px', scrollMarginTop: 80, borderTop: `1px solid ${T.border}` }}>
      <div style={{ fontSize: 10, letterSpacing: '0.18em', color: T.lime, textTransform: 'uppercase', fontWeight: 600, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 28, height: 1, background: T.lime }} />
        Skills &amp; workflow
      </div>
      <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.05, margin: '0 0 20px', color: T.text, maxWidth: 820 }}>
        From a vague requirement to a shipped product, <span style={{ color: T.lime }}>without the chaos.</span>
      </h2>
      <p style={{ color: T.textSub, fontSize: 17, lineHeight: 1.65, maxWidth: 560, margin: '0 0 64px', fontWeight: 300 }}>
        A predictable process, clear checkpoints and no surprises. You always know what is done, what is next and what I need from you.
      </p>

      <div className="r-sk-groups" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginBottom: 96 }}>
        {GROUPS.map((g) => (
          <div key={g.title}>
            <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.textMute, fontWeight: 600, paddingBottom: 14, borderBottom: `1px solid ${T.border}`, marginBottom: 8 }}>{g.title}</div>
            {g.items.map(([name, level], i) => (
              <div key={name} style={{ padding: '16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, color: T.text, marginBottom: 10 }}>
                  <span>{name}</span>
                  <span style={{ color: T.textMute, fontVariantNumeric: 'tabular-nums', fontSize: 13 }}>{level}%</span>
                </div>
                <div style={{ height: 3, background: T.border, borderRadius: 99, overflow: 'hidden' }}>
                  <div className="r-sk-bar" style={{ height: '100%', width: `${level}%`, background: T.lime, borderRadius: 99, transitionDelay: `${i * 90}ms` }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.textMute, fontWeight: 600, marginBottom: 28 }}>
        Requirement to delivery
      </div>
      <ol className="r-flow" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', border: `1px solid ${T.border}` }}>
        {FLOW.map((f, i) => (
          <li key={f.step} className="r-flow-step" style={{ padding: 24, borderRight: i < FLOW.length - 1 ? `1px solid ${T.border}` : 'none', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: T.limeDim, color: T.lime, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>{i + 1}</span>
              <span style={{ fontSize: 12, color: T.textFaint }}>{f.time}</span>
            </div>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.lime, fontWeight: 600 }}>{f.step}</div>
            <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.25, color: T.text }}>{f.title}</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: T.textMute, fontWeight: 300 }}>{f.desc}</p>
            <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `1px dashed ${T.border}`, fontSize: 13, color: T.textSub }}>
              <span style={{ color: T.textFaint }}>Output: </span>{f.out}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
