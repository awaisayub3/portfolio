import { useEffect, useRef, useState } from 'react'

const GREETINGS = [
  { text: 'Hello', color: '#c8f53e' },
  { text: 'Hola', color: '#ffb547' },
  { text: 'Bonjour', color: '#b48cff' },
  { text: 'Ciao', color: '#ff7a59' },
  { text: 'नमस्ते', color: '#4dffb0' },
  { text: 'こんにちは', color: '#ffe14d' },
  { text: 'Hallo', color: '#5ee7ff' },
  { text: 'Salam', color: '#ff6b9d' },
  { text: 'السلام علیکم', color: '#c8f53e', sub: 'Assalam o Alaikum' },
]
const LAST = GREETINGS.length - 1
const URDU_FONT = "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif"
const STEP = 650

const DURATION = 6200

export default function Loader() {
  const [percent, setPercent] = useState(1)
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(document.readyState === 'complete')
  const loadedRef = useRef(loaded)
  loadedRef.current = loaded
  const [exiting, setExiting] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (loaded) return
    const onLoad = () => setLoaded(true)
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [loaded])

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => Math.min(i + 1, LAST)), STEP)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      let next = 1 + Math.floor(99 * eased)
      if (!loadedRef.current) next = Math.min(next, 99)
      setPercent((p) => Math.max(p, next))
      if (next < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (percent < 100) return
    const t1 = setTimeout(() => setExiting(true), 1900)
    const t2 = setTimeout(() => setGone(true), 2700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [percent])

  useEffect(() => {
    if (gone) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [gone])

  useEffect(() => {
    if (gone) window.dispatchEvent(new Event('loader-done'))
  }, [gone])

  if (gone) return null

  const g = GREETINGS[index]
  const isUrdu = index === LAST
  const p = Math.min(percent, 100)

  return (
    <div
      aria-live="polite"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#080808',
        fontFamily: "'Outfit', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: g.color,
          opacity: 0.12,
          filter: 'blur(120px)',
          transition: 'background 0.4s ease',
        }}
      />

      <div style={{ position: 'absolute', top: 32, left: 32, color: '#6b6560', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Muhammad Awais Ayub
      </div>

      <h1
        key={index}
        dir="auto"
        style={{
          position: 'relative',
          margin: 0,
          fontSize: isUrdu ? 'clamp(40px, 9vw, 112px)' : 'clamp(48px, 10vw, 132px)',
          fontWeight: isUrdu ? 700 : 600,
          fontFamily: isUrdu ? URDU_FONT : undefined,
          lineHeight: isUrdu ? 1.9 : undefined,
          letterSpacing: isUrdu ? 0 : '-0.03em',
          textAlign: 'center',
          color: g.color,
          display: 'flex',
          alignItems: 'center',
          gap: '0.25em',
          animation: `${index === LAST ? 'loaderFinal' : 'loaderGreet'} 0.7s cubic-bezier(0.22, 1, 0.36, 1) both`,
        }}
      >
        {!isUrdu && <span style={{ width: '0.18em', height: '0.18em', borderRadius: '50%', background: g.color, display: 'inline-block' }} />}
        {g.text}
      </h1>
      {'sub' in g && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(50% + clamp(48px, 9vw, 110px))', textAlign: 'center', color: g.color, fontSize: 'clamp(14px, 2vw, 22px)', letterSpacing: '0.3em', textTransform: 'uppercase', animation: 'loaderFinal 0.9s 0.4s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
          {g.sub}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          right: 32,
          bottom: 28,
          fontSize: 'clamp(56px, 12vw, 160px)',
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: g.color,
          fontVariantNumeric: 'tabular-nums',
          transition: 'color 0.4s ease',
        }}
      >
        {p}
        <span style={{ fontSize: '0.4em', color: '#6b6560', marginLeft: 6 }}>%</span>
      </div>

      <div style={{ position: 'absolute', left: 0, bottom: 0, height: 4, width: `${p}%`, borderRadius: 4, background: g.color, transition: 'width 0.1s linear, background 0.4s ease' }} />

      <style>{`@keyframes loaderFinal { from { opacity: 0; transform: translateY(28px); filter: blur(12px) } to { opacity: 1; transform: translateY(0); filter: blur(0) } } @keyframes loaderGreet { 0% { opacity: 0; transform: translateY(28px); filter: blur(12px) } 25% { opacity: 1; transform: translateY(0); filter: blur(0) } 75% { opacity: 1; transform: translateY(0); filter: blur(0) } 100% { opacity: 0; transform: translateY(-28px); filter: blur(12px) } }`}</style>
    </div>
  )
}
