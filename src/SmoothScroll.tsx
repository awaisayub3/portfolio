import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const scan = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    let lenis: Lenis | null = null
    let raf = 0
    if (!reduce) {
      lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), anchors: true })
      const loading = document.body.style.overflow === 'hidden'
      if (loading) lenis.stop()
      const start = () => lenis?.start()
      window.addEventListener('loader-done', start)
      const loop = (time: number) => {
        lenis?.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      return () => {
        window.removeEventListener('loader-done', start)
        cancelAnimationFrame(raf)
        lenis?.destroy()
        io.disconnect()
        mo.disconnect()
      }
    }
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
