'use client'

import { useGSAPScrollFade } from '../../hooks/useGSAP'

const CARDS = [
  {
    key: 'fuzzy',
    accent: 'var(--teal-2)',
    accentRgb: '38,200,147',
    title: 'Fuzzy Matching',
    body: 'Handles typos automatically using edit-distance scoring. Search for',
    code: 'iphane',
    suffix: 'and still find iPhone.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  },
  {
    key: 'relevance',
    accent: '#7ec0ff',
    accentRgb: '126,192,255',
    title: 'Relevance Scoring',
    body: 'Lucene BM25 ranks by importance, not insertion order. Every result scored with',
    code: 'O(log n)',
    suffix: 'lookups.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    key: 'scale',
    accent: 'var(--amber-2)',
    accentRgb: '246,184,90',
    title: 'O(1) at Any Scale',
    body: 'Index lookups stay constant regardless of dataset size. From',
    code: '1K → 1B docs',
    suffix: ', same speed.',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h6l-2 8 11-13h-6l2-7z"/></svg>,
  },
]

function AdvCard({ card }) {
  const { accent, accentRgb, title, body, code, suffix, icon } = card
  return (
    <div
      className="adv-card p-4 rounded-[10px] flex flex-col gap-2 transition-all duration-200"
      style={{ background: '#141414', border: '1px solid #2A2A2A' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accent
        e.currentTarget.style.boxShadow = `0 0 24px rgba(${accentRgb},.18), inset 0 0 0 1px rgba(${accentRgb},.15)`
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#2A2A2A'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <span style={{ color: accent }}>{icon}</span>
      <div className="text-[13px] font-medium" style={{ color: '#fff' }}>{title}</div>
      <p className="text-[12px] leading-[1.6] m-0" style={{ color: '#888' }}>
        {body}{' '}
        <em style={{
          color: accent, fontStyle: 'normal',
          fontFamily: "'JetBrains Mono',monospace", fontSize: '11px',
          padding: '1px 5px', borderRadius: '4px',
          background: `rgba(${accentRgb},.08)`,
          border: `1px solid rgba(${accentRgb},.2)`,
        }}>{code}</em>
        {' '}{suffix}
      </p>
    </div>
  )
}

export default function AdvantagesStrip() {
  const containerRef = useGSAPScrollFade('.adv-card')

  return (
    <div ref={containerRef} className="mt-6">
      <p className="text-[13px] font-medium m-0 mb-3" style={{ color: '#888', letterSpacing: '.02em' }}>
        Why Atlas Search wins every time
      </p>
      <div className="grid gap-[14px]" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {CARDS.map(card => <AdvCard key={card.key} card={card} />)}
      </div>
    </div>
  )
}
