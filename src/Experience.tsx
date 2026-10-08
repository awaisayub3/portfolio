import { useState } from 'react'
import { T } from './tokens'

const JOBS = [
  { years: '2017', company: 'Techleads', role: 'UI/UX and graphics', story: 'Where it started — landing pages, brand graphics and my first real product screens. Learned to ship fast and to listen to feedback.' },
  { years: '2018', company: 'IQVIS', role: 'UI/UX designer', story: 'Moved into full UX practice: research, wireframes, prototypes and handoff with engineering across web and mobile projects.' },
  { years: '2020', company: 'NETSOL Technologies', role: 'Enterprise leasing', story: 'Designed dense, data-heavy leasing workflows for enterprise users — turning complex processes into clear, calm interfaces.' },
  { years: '2021 — now', company: 'Hyly.AI', role: 'Product designer', story: 'Owning product design end to end: discovery, systems, and shipping conversational experiences used by real customers.', now: true },
  { years: '2025 — now', company: 'AI Skill Bridge', role: 'Generative AI trainer', story: 'Teaching and evaluating generative models, blending design judgment with prompt craft and quality review.', now: true },
]

export default function Experience() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="experience" data-reveal className="r-wrap r-pad r-exp" style={{ maxWidth: 1400, margin: '0 auto', padding: '128px 48px 56px', scrollMarginTop: 80 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 500, letterSpacing: '-0.03em', color: T.text }}>The long way round</h2>
        <span className="r-exp-hint" style={{ fontSize: 13, color: T.textMute }}>Hover a row for the story behind it</span>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: `1px solid ${T.border}` }} onMouseLeave={() => setOpen(null)}>
        {JOBS.map((j, i) => {
          const on = open === i
          return (
            <li key={j.company} style={{ borderBottom: `1px solid ${T.border}` }} onMouseEnter={() => setOpen(i)}>
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setOpen(on ? null : i)}
                onFocus={() => setOpen(i)}
                className="r-exp-row"
                style={{ all: 'unset', boxSizing: 'border-box', width: '100%', cursor: 'pointer', display: 'grid', gridTemplateColumns: '180px 1fr auto', alignItems: 'center', gap: 24, padding: '30px 0' }}
              >
                <span style={{ fontSize: 14, color: T.textMute, fontVariantNumeric: 'tabular-nums', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {j.now && <span aria-hidden style={{ width: 7, height: 7, borderRadius: '50%', background: T.lime, animation: 'pulse 2s ease-in-out infinite' }} />}
                  {j.years}
                </span>
                <span className="r-exp-co" style={{ fontSize: 'clamp(22px, 3.2vw, 40px)', fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.05, color: on || j.now ? T.lime : T.text, transform: on ? 'translateX(14px)' : 'none', transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), color 0.3s' }}>
                  {j.company}
                </span>
                <span className="r-exp-role" style={{ fontSize: 14, color: on ? T.text : T.textMute, transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: 10 }}>
                  {j.role}
                  <span aria-hidden style={{ display: 'inline-block', transform: on ? 'rotate(90deg)' : 'none', transition: 'transform 0.35s', color: T.lime }}>+</span>
                </span>
              </button>
              <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: 'grid-template-rows 0.45s cubic-bezier(0.22,1,0.36,1)' }}>
                <div style={{ overflow: 'hidden' }}>
                  <p className="r-exp-story" style={{ margin: 0, padding: '0 0 30px 204px', maxWidth: 760, fontSize: 16, lineHeight: 1.65, color: T.textSub, opacity: on ? 1 : 0, transition: 'opacity 0.35s' }}>
                    {j.story}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
