import { useEffect, useRef, useState } from 'react'
import { buildFooterArt } from './footerArt'
import css from './footer.generated.css?inline'

const PIN = 'M12 2C8 2 5 5 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-4-3-7-7-7z'
const FLAG = (
  <svg width="24" height="16" viewBox="0 0 28 19" aria-hidden="true">
    <rect width="28" height="19" rx="2.5" fill="#01411C" />
    <rect width="7" height="19" rx="2" fill="#fff" />
    <circle cx="18" cy="9.5" r="5" fill="#fff" />
    <circle cx="19.7" cy="8.6" r="4.3" fill="#01411C" />
    <path d="M21.5 5.2l.8 1.9 2 .1-1.6 1.3.6 2-1.8-1.2-1.8 1.2.6-2-1.6-1.3 2-.1z" fill="#fff" />
  </svg>
)

const LAYOUT = `
.lf{--cream:#FFE9C7;--glow:#FFC766;position:relative;width:100%;background:#070b1f;color:#fff;overflow:hidden;font-family:'Outfit',system-ui,sans-serif}
.lf::before{content:"";position:absolute;left:0;right:0;top:0;height:clamp(70px,16vw,150px);z-index:8;pointer-events:none;background:linear-gradient(var(--bg) 0%,color-mix(in srgb,var(--bg) 70%,transparent) 30%,color-mix(in srgb,var(--bg) 25%,transparent) 65%,transparent 100%)}
.lf .lf-frame{position:relative;width:100%;max-width:2000px;margin:0 auto;overflow:hidden}
.lf #name,.lf #role,.lf #chip,.lf #urdu,.lf #tag{font-family:'Outfit',system-ui,sans-serif}
.lf #urdu{font-family:"Noto Nastaliq Urdu",serif}
.lf .lf-copy{display:none;padding:28px 20px 40px;text-align:center;flex-direction:column;align-items:center;gap:10px}
.lf .lf-copy .n{font-size:26px;font-weight:700;letter-spacing:-0.02em}
.lf .lf-copy .r{font-size:15px;color:var(--cream)}
.lf .lf-copy .u{font-family:"Noto Nastaliq Urdu",serif;font-size:40px;line-height:1.9;color:rgba(255,236,200,.96)}
.lf .lf-copy .t{font-size:16px;font-weight:600;line-height:1.4;color:var(--cream)}
.lf .lf-copy .c{display:inline-flex;align-items:center;gap:8px;padding:6px 14px 6px 10px;border-radius:22px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.25);font-size:14px;font-weight:600}
.lf .lf-copy > *{opacity:0;transform:translateY(8px)}
.lf.lf-on .lf-copy > *{animation:lfUp .7s ease forwards;animation-delay:var(--d)}
@keyframes lfUp{to{opacity:1;transform:none}}
@keyframes lfSwap{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.lf .lf-replay{position:absolute;right:12px;bottom:10px;z-index:9;font:600 12px 'Outfit',sans-serif;border:0;border-radius:16px;padding:6px 12px;background:rgba(255,255,255,.9);color:#1F2E34;cursor:pointer}
@media (max-width: 899px){
  .lf{background:var(--bg);color:var(--text)}
  .lf::before{display:none}
  .lf .lf-frame{display:none}
  .lf .lf-copy{display:flex;padding:56px 24px 64px;gap:12px;border-top:1px solid var(--border)}
  .lf .lf-copy .n{color:var(--text)}
  .lf .lf-copy .r{color:var(--text-sub)}
  .lf .lf-copy .u{color:var(--lime);font-size:44px}
  .lf .lf-copy .c{background:var(--surface);border-color:var(--border);color:var(--text)}
  .lf .lf-copy .t{color:var(--text);min-height:2.8em;display:flex;align-items:center;justify-content:center;text-align:center;animation:lfSwap .6s ease both}
  .lf.lf-on .lf-copy > .t{animation:lfSwap .6s ease both}
}
`

const PHRASES = ['Designed in Lahore.', 'Built for the world.', 'Crafted with care, pixel by pixel.', 'Let\u2019s make something good.']

export default function OutroScene() {
  const [phrase, setPhrase] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setPhrase((p) => (p + 1) % PHRASES.length), 3500)
    return () => clearInterval(id)
  }, [])
  const root = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const el = root.current!
    const fr = frame.current!
    const st = stage.current!
    buildFooterArt(st)

    const fit = () => {
      const w = fr.clientWidth
      if (w >= 900) {
        const k = w / 1600
        fr.style.height = `${360 * k}px`
        st.style.transform = `scale(${k})`
      } else {
        const h = w < 520 ? 200 : 260
        const k = h / 360
        fr.style.height = `${h}px`
        st.style.transform = `translateX(${w / 2 - 850 * k}px) scale(${k})`
      }
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(fr)

    const play = () => {
      timers.current.forEach(clearTimeout)
      st.classList.remove('play')
      el.classList.remove('lf-on')
      void st.offsetWidth
      st.classList.add('play')
      el.classList.add('lf-on')
    }
    ;(el as unknown as { replay: () => void }).replay = play

    let started = false
    const io = new IntersectionObserver(
      (entries) => {
        if (!started && entries.some((e) => e.isIntersecting)) {
          started = true
          play()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      ro.disconnect()
      timers.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <div ref={root} className="lf">
      <style>{css + LAYOUT}</style>
      <div ref={frame} className="lf-frame">
        <div
          id="stage"
          ref={stage}
          role="img"
          aria-label="Animated sunrise over Badshahi Mosque and Minar-e-Pakistan in Lahore, with people walking on the lawn of Greater Iqbal Park. Muhammad Awais Ayub, Product Designer, Lahore, Pakistan. Designed in Lahore. Built for the world."
        >
          <div className="layer" id="night" />
          <div className="layer" id="dawn" />
          <svg className="layer" id="stars" viewBox="0 0 1600 360" width="1600" height="360" />
          <div id="haze" />
          <div id="sun" />
          <div className="cloud" style={{ left: 560, top: 70, width: 300, height: 30 }} />
          <div className="cloud" style={{ left: 1100, top: 110, width: 240, height: 26 }} />
          <div className="cloud" style={{ left: 200, top: 40, width: 220, height: 22 }} />
          {[
            { top: 120, dur: '11s', d: '3.2s', w: 22, h: 10, sw: 2.2 },
            { top: 150, dur: '12s', d: '3.9s', w: 16, h: 8, sw: 2.4 },
            { top: 96, dur: '10s', d: '4.5s', w: 19, h: 9, sw: 2.3 },
          ].map((b, i) => (
            <div key={i} className="bird" style={{ top: b.top, ['--dur' as string]: b.dur, ['--d' as string]: b.d }}>
              <svg width={b.w} height={b.h} viewBox="0 0 26 12" fill="none" stroke="#2a1420" strokeWidth={b.sw} strokeLinecap="round">
                <path d="M1 10Q7 0 13 9Q19 0 25 10" />
              </svg>
            </div>
          ))}
          <div id="ground" />
          <svg className="bld" id="lawn" viewBox="0 0 1600 360" />
          <svg className="bld" id="mosque" viewBox="0 0 1600 360" />
          <svg className="bld" id="minar" viewBox="0 0 1600 360" />
          <div className="walkers" id="walkers" />

          <div className="txt" id="name"><span className="wipe" style={{ ['--d' as string]: '4.6s' }}>Muhammad Awais Ayub</span></div>
          <div className="txt" id="role"><span className="wipe" style={{ ['--d' as string]: '5.3s' }}>Product Designer · UI/UX</span></div>
          <div className="txt pop" id="chip" style={{ ['--d' as string]: '5.9s' }}>
            <svg className="pin" viewBox="0 0 24 24"><path d={PIN} fill="#FFC766" /><circle cx="12" cy="9" r="2.8" fill="#3a1a2a" /></svg>
            {FLAG}
            <span>Lahore, Pakistan</span>
          </div>
          <div className="txt pop" id="urdu" style={{ ['--d' as string]: '6.4s' }}>لاہور</div>
          <div className="txt pop" id="tag" style={{ ['--d' as string]: '7s' }}>Designed in Lahore.<br />Built for the world.</div>
        </div>
        <button className="lf-replay" onClick={() => (root.current as unknown as { replay: () => void }).replay()}>
          Replay
        </button>
      </div>

      <div className="lf-copy">
        <div className="u" style={{ ['--d' as string]: '0.4s' }}>لاہور</div>
        <div className="n" style={{ ['--d' as string]: '0.6s' }}>Muhammad Awais Ayub</div>
        <div className="r" style={{ ['--d' as string]: '0.8s' }}>Product Designer · UI/UX</div>
        <div className="c" style={{ ['--d' as string]: '1s' }}>{FLAG}<span>Lahore, Pakistan</span></div>
        <div className="t" key={phrase} aria-live="polite">{PHRASES[phrase]}</div>
      </div>
    </div>
  )
}
