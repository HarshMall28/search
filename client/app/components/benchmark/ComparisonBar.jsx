'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const cardStyle = {
  marginTop: '24px',
  background: 'linear-gradient(180deg,#0f1318,#0a0d10)',
  border: '1px solid var(--line)',
  borderRadius: '16px',
  padding: '22px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
}

const BARS = [
  {
    key: 'mongo',
    label: 'MongoDB $regex',
    bg: 'linear-gradient(90deg,var(--amber),var(--coral))',
    shadow: '0 0 12px rgba(239,159,39,.4)',
    msColor: '#ff8a5c',
  },
  {
    key: 'meili',
    label: 'Atlas Search',
    bg: 'linear-gradient(90deg,var(--blue),var(--teal-2))',
    shadow: '0 0 12px rgba(55,138,221,.4)',
    msColor: 'var(--teal-2)',
  },
]

export default function ComparisonBar({ mongoTime, meiliTime, speedMultiplier }) {
  const slowRef = useRef(null)
  const fastRef = useRef(null)

  useEffect(() => {
    if (!mongoTime || !meiliTime) return
    const fastPct = Math.max((meiliTime / mongoTime) * 100, 2)
    gsap.to(slowRef.current, { width: '100%', duration: 0.8, ease: 'power2.out' })
    gsap.to(fastRef.current, { width: `${fastPct}%`, duration: 0.8, ease: 'power2.out', delay: 0.15 })
  }, [mongoTime, meiliTime])

  if (!mongoTime || !meiliTime) return null

  const refs = [slowRef, fastRef]
  const times = [mongoTime, meiliTime]

  return (
    <div style={cardStyle}>
      <div className="flex items-center justify-between flex-wrap gap-[14px]">
        <div className="flex items-center gap-3 text-[18px] font-semibold" style={{ letterSpacing: '-0.01em' }}>
          Atlas Search was
          <span className="mono font-bold text-[22px]" style={{ color: 'var(--teal-2)', letterSpacing: '-0.02em', textShadow: '0 0 14px rgba(38,200,147,.4)' }}>
            {speedMultiplier?.toFixed(1)}×
          </span>
          faster this search
        </div>
        <span className="mono text-[12px]" style={{ color: 'var(--ink-faint)' }}>{mongoTime}ms vs {meiliTime}ms</span>
      </div>

      <div className="flex flex-col gap-[10px]">
        {BARS.map(({ key, label, bg, shadow, msColor }, i) => (
          <div key={key} className="flex items-center gap-[14px] mono text-[12px]">
            <span className="w-[140px] uppercase tracking-[.06em] text-[11px]" style={{ color: 'var(--ink-dim)' }}>{label}</span>
            <div className="flex-1 h-[10px] rounded-[5px] overflow-hidden relative" style={{ background: '#0a0a0a', border: '1px solid var(--line-2)' }}>
              <div
                ref={refs[i]}
                className="absolute left-0 top-0 bottom-0 rounded-[5px]"
                style={{ width: 0, background: bg, boxShadow: shadow }}
              />
            </div>
            <span className="w-[80px] text-right font-bold" style={{ color: msColor }}>{times[i]}ms</span>
          </div>
        ))}
      </div>
    </div>
  )
}
