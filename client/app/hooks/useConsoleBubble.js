import { useRef, useCallback } from 'react'
import { gsap } from 'gsap'

export function useConsoleBubble() {
  const bubbleRef = useRef(null)
  const timelineRef = useRef(null)

  const trigger = useCallback(() => {
    if (!bubbleRef.current) return
    if (timelineRef.current) timelineRef.current.kill()

    const bubble = bubbleRef.current
    const lines = bubble.querySelectorAll('.console-line')

    const tl = gsap.timeline()
    timelineRef.current = tl

    tl.set(lines, { opacity: 0 })
    tl.to(bubble, { scale: 1, duration: 0.35, ease: 'back.out(1.7)' })

    lines.forEach((_, i) => {
      tl.to(lines[i], { opacity: 1, duration: 0.15 }, `+=${i === 0 ? 0.05 : 0.2}`)
    })

    tl.to(bubble, { opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=2.8')
    tl.set(bubble, { scale: 0, opacity: 1 })
  }, [])

  return { bubbleRef, trigger }
}
