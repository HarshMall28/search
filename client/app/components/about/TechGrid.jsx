'use client'

import { useGSAPScrollFade } from '../../hooks/useGSAP'

const TECHS = [
  { name: 'Next.js 16',      why: 'App Router, RSC, and edge-ready deployment out of the box.',           icon: 'M12 2L2 19.5h20L12 2z' },
  { name: 'Apollo GraphQL',  why: 'Type-safe API with DataLoader batching and complexity limits.',          icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2z' },
  { name: 'MongoDB Atlas',   why: 'Cloud-native database with built-in Atlas Search on Lucene.',            icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
  { name: 'Atlas Search',    why: 'Lucene-powered full-text search with fuzzy matching and BM25 scoring.', icon: 'M13 2 4 14h6l-2 8 11-13h-6l2-7z' },
  { name: 'React 19',        why: 'Concurrent rendering, useTransition, and the latest Server Actions.',   icon: 'M12 10.11A1.87 1.87 0 1010.13 12 1.87 1.87 0 0012 10.11z' },
  { name: 'GSAP',            why: 'Production-grade animations: staggers, ScrollTrigger, and timelines.',  icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { name: 'Tailwind CSS 4',  why: 'Utility-first styling with zero runtime overhead.',                      icon: 'M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z' },
  { name: 'Node.js',         why: 'Event-loop server handling parallel DB calls with minimal overhead.',   icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z' },
]

function TechCard({ tech }) {
  return (
    <div
      className="tech-card rounded-[14px] p-[18px] flex flex-col gap-[10px] transition-all duration-300"
      style={{ background: 'linear-gradient(180deg,#111112,#0b0b0c)', border: '1px solid var(--line)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(55,138,221,.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(55,138,221,.1)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div className="w-11 h-11 rounded-[11px] grid place-items-center" style={{ background: 'rgba(55,138,221,.1)', border: '1px solid rgba(55,138,221,.3)', color: '#7ec0ff' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d={tech.icon} />
        </svg>
      </div>
      <div className="text-[15px] font-bold" style={{ letterSpacing: '-0.01em' }}>{tech.name}</div>
      <div className="text-[13px] leading-[1.5]" style={{ color: 'var(--ink-dim)' }}>{tech.why}</div>
    </div>
  )
}

export default function TechGrid() {
  const containerRef = useGSAPScrollFade('.tech-card')

  return (
    <div ref={containerRef} className="grid gap-[14px]" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
      {TECHS.map(tech => <TechCard key={tech.name} tech={tech} />)}
    </div>
  )
}
