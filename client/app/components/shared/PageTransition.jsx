'use client'

import { useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'

gsap.ticker.lagSmoothing(0)

const NAV_ORDER = { '/': 0, '/benchmark': 1, '/architecture': 2, '/about': 3 }
const NAV_PATHS = ['/', '/benchmark', '/architecture', '/about']

export default function PageTransition({ children }) {
  const ref = useRef(null)
  const pathname = usePathname()
  const router = useRouter()
  const prevPathname = useRef(null)
  const touchStartX = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prev = prevPathname.current
    prevPathname.current = pathname

    gsap.killTweensOf(el)

    if (prev === null) {
      gsap.set(el, { opacity: 0, y: 16, scale: 1 })
      gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' })
      return
    }

    const prevIdx = NAV_ORDER[prev] ?? 0
    const newIdx = NAV_ORDER[pathname] ?? 0
    const forward = newIdx >= prevIdx
    const inX = forward ? 80 : -80

    gsap.set(el, { x: inX, opacity: 0, scale: 1.02 })
    gsap.to(el, { x: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out', delay: 0.05 })
  }, [pathname])

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    touchStartX.current = null

    const currentIdx = NAV_ORDER[pathname] ?? 0
    if (delta > 60 && currentIdx < NAV_PATHS.length - 1) {
      router.push(NAV_PATHS[currentIdx + 1])
    } else if (delta < -60 && currentIdx > 0) {
      router.push(NAV_PATHS[currentIdx - 1])
    }
  }

  return (
    <div
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        opacity: 0,
        willChange: 'transform, opacity',
        width: '100%',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  )
}
