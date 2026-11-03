import { useState } from 'react'
import { T } from './tokens'

const JOBS = [
  { years: '2024 — now', company: 'Gourmet Pakistan', role: 'Senior UI/UX Designer', story: 'Led the complete redesign of the e-commerce platform, lifting conversions by 45% and cutting cart abandonment by 32%. Built the company’s first design system with 150+ components, reducing design-to-dev time by 60%, and drove WCAG 2.1 AA compliance across all products.', now: true },
  { years: '2023 — 2025', company: 'SHIZA (Part-Time)', role: 'UI/UX & Product Designer', story: 'Designed and launched a SaaS platform that gained 200+ users in its first quarter with a 4.7/5 satisfaction rating. Created interactive prototypes and user journey maps that sped up product development by 40%, working closely with engineering and product.' },
  { years: '2022 — 2023', company: 'Sync-Clouds', role: 'UI/UX & Product Designer', story: 'Redesigned the cloud management dashboard, improving task completion by 55% through better navigation. Produced wireframes and prototypes for 20+ features, cutting design revisions by 50%, and ran usability tests that led to 30% fewer support tickets.' },
  { years: '2021', company: 'Programmers Force', role: 'UI/UX Designer', story: 'A focused three-month engagement (Jul — Sep 2021) designing user interfaces and prototypes alongside the development team.' },
  { years: '2021 — 2022', company: 'Xoho-Tech', role: 'UI/UX & Product Designer', story: 'Designed interfaces for 4+ client projects across fintech, healthcare and e-commerce, with a mobile-first approach that increased mobile engagement by 35%.' },
  { years: '2020', company: 'Systems Ltd', role: 'Frontend Developer Intern', story: 'Where the engineering side began — hands-on frontend development that still shapes how I design for handoff today.' },
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
