import { useState } from 'react'
import type React from 'react'
import { T, applyTheme, getTheme } from './tokens'
import type { Theme } from './tokens'

const OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: 'light',
    label: 'Light',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
]

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getTheme)

  const choose = (t: Theme) => {
    setTheme(t)
    applyTheme(t)
  }

  return (
    <div role="radiogroup" aria-label="Colour theme" className="r-tt" style={{ display: 'inline-flex', padding: 3, gap: 2, flexShrink: 0, borderRadius: 999, border: `1px solid ${T.border}`, background: T.surface }}>
      {OPTIONS.map((o) => {
        const on = theme === o.value
        return (
          <button
            key={o.value}
            role="radio"
            aria-checked={on}
            aria-label={`${o.label} theme`}
            title={`${o.label} theme`}
            onClick={() => choose(o.value)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none', cursor: 'pointer',
              borderRadius: 999, padding: '0 12px', height: 32, justifyContent: 'center', whiteSpace: 'nowrap', fontSize: 12, fontWeight: 500, lineHeight: 1, fontFamily: "'Outfit', sans-serif",
              background: on ? T.lime : 'transparent', color: on ? T.onLime : T.textMute,
              transition: 'background 0.25s, color 0.25s',
            }}
          >
            {o.icon}
            <span className="r-tt-label">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}
