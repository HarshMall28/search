'use client'

import { useGSAPScrollFade } from '../../hooks/useGSAP'

const STATS = [
  {
    key: 'docs',
    icon: 'M4 7h16M4 12h16M4 17h7',
    num: '1.2M',
    label: 'DOCS INDEXED',
    body: 'Over 1.2 million product documents seeded into MongoDB Atlas, each with title, description, category, brand, price, and rating — ready for both engines to query.',
  },
  {
    key: 'speed',
    icon: 'M13 2 4 14h6l-2 8 11-13h-6l2-7z',
    num: '71×',
    label: 'FASTER ON AVERAGE',
    body: 'Atlas Search consistently outperforms MongoDB $regex by 70–80× on this dataset. The gap widens as the collection grows — regex is O(n), Lucene index is O(1).',
  },
  {
    key: 'latency',
    icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l4 2',
    num: '4ms',
    label: 'P50 ATLAS LATENCY',
    body: 'The median Atlas Search response time is 4ms — including network, GraphQL resolution, DataLoader batching, and serialization. Cold starts add ~20ms on the first query.',
  },
]

function StatCard({ stat }) {
  return (
    <div
      className="stat-card rounded-[18px] p-7 flex flex-col gap-[14px] relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#101011,#0a0a0b)', border: '1px solid var(--line)' }}
    >
      <span className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(55,138,221,.6),transparent)' }} />
      <div className="w-12 h-12 rounded-[12px] grid place-items-center" style={{ background: 'rgba(55,138,221,.1)', border: '1px solid rgba(55,138,221,.3)', color: '#7ec0ff' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d={stat.icon} />
        </svg>
      </div>
      <div className="font-bold leading-none" style={{ fontSize: '48px', letterSpacing: '-0.03em', color: 'var(--blue-2)', textShadow: '0 0 30px rgba(55,138,221,.35)', fontFamily: "'Space Grotesk',sans-serif" }}>
        {stat.num}
      </div>
      <div className="mono text-[13px] uppercase tracking-[.04em]" style={{ color: 'var(--ink-dim)' }}>
        {stat.label}
      </div>
      <p className="m-0 text-[14.5px] leading-[1.6]" style={{ color: '#bdbdbd', textWrap: 'pretty' }}>
        {stat.body}
      </p>
    </div>
  )
}

export default function StatCards() {
  const containerRef = useGSAPScrollFade('.stat-card')

  return (
    <div ref={containerRef} className="grid gap-[18px]" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
      {STATS.map(stat => <StatCard key={stat.key} stat={stat} />)}
    </div>
  )
}
