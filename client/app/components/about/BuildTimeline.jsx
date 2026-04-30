const MILESTONES = [
  'Schema design',
  'MongoDB seeding',
  'Atlas Search index',
  'GraphQL API',
  'DataLoader',
  'React frontend',
  'GSAP animations',
  'Live benchmark',
]

const checkStyle = {
  width: '16px', height: '16px', borderRadius: '50%',
  background: 'rgba(38,200,147,.15)', color: 'var(--teal-2)',
  display: 'grid', placeItems: 'center', flexShrink: 0,
}

export default function BuildTimeline() {
  return (
    <div className="mt-9 rounded-[14px] p-6" style={{ background: '#0c0c0d', border: '1px solid var(--line)' }}>
      <p className="mono text-[11px] uppercase tracking-[.12em] mb-[14px] m-0" style={{ color: 'var(--ink-faint)' }}>
        Build order
      </p>
      <div className="flex items-center flex-wrap gap-y-[14px]">
        {MILESTONES.map((label, i) => (
          <div key={label} className="flex items-center">
            <span
              className="inline-flex items-center gap-2 px-[14px] py-2 rounded-full text-[13px] font-semibold"
              style={{ background: '#141415', border: '1px solid var(--line)', color: 'var(--ink)' }}
            >
              <span style={checkStyle}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {label}
            </span>
            {i < MILESTONES.length - 1 && (
              <span
                className="shrink-0"
                style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line),var(--line-2))', minWidth: '14px', margin: '0 6px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
