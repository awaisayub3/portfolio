// Colours resolve through CSS variables (see index.css) so the theme can switch at runtime
export const DISCIPLINE_COLORS: Record<string, { bg: string; text: string }> = {
  Mobile: { bg: 'rgba(var(--lime-rgb),0.14)', text: 'var(--c-mobile)' },
  Web:    { bg: 'rgba(var(--c-web-rgb),0.14)', text: 'var(--c-web)' },
  Brand:  { bg: 'rgba(var(--c-brand-rgb),0.14)', text: 'var(--c-brand)' },
  Print:  { bg: 'rgba(var(--c-print-rgb),0.14)', text: 'var(--c-print)' },
}

export const T = {
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  border: 'var(--border)',
  text: 'var(--text)',
  textSub: 'var(--text-sub)',
  textMute: 'var(--text-mute)',
  textFaint: 'var(--text-faint)',
  lime: 'var(--lime)',
  limeHover: 'var(--lime-hover)',
  limeDim: 'rgba(var(--lime-rgb),0.15)',
  onLime: 'var(--on-lime)',
}

export type Theme = 'light' | 'dark'
const KEY = 'portfolio-theme'

export function getTheme(): Theme {
  const saved = localStorage.getItem(KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.dataset.theme = theme
  if (persist) localStorage.setItem(KEY, theme)
}

applyTheme(getTheme(), false)

export type Work = {
  id: number
  title: string
  year: string
  discipline: string
  tags: string[]
  img: string
  alt: string
  span: string
  url: string
}
