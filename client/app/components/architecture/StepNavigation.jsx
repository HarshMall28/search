const btnBase = {
  fontFamily: 'inherit', cursor: 'pointer',
  padding: '10px 18px', borderRadius: '10px',
  background: '#1a1a1a', border: '1px solid var(--line)', color: 'var(--ink)',
  fontSize: '13.5px', fontWeight: 600, letterSpacing: '-0.005em',
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  transition: 'all .2s',
}

const btnPrimary = {
  ...btnBase,
  background: 'var(--blue)', color: '#fff', borderColor: 'transparent',
  boxShadow: '0 0 24px rgba(55,138,221,.4)',
}

export default function StepNavigation({ activeIndex, total, onPrev, onNext }) {
  const isFirst = activeIndex === 0
  const isLast = activeIndex === total - 1

  return (
    <div
      className="flex items-center justify-between gap-[14px] mt-9 pt-6"
      style={{ borderTop: '1px solid var(--line-2)' }}
    >
      <button
        style={{ ...btnBase, opacity: isFirst ? 0.4 : 1, cursor: isFirst ? 'not-allowed' : 'pointer' }}
        onClick={onPrev}
        disabled={isFirst}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Previous
      </button>

      <span className="mono text-[13px] tracking-[.04em]" style={{ color: 'var(--ink-dim)' }}>
        Step <b style={{ color: 'var(--ink)' }}>{activeIndex + 1}</b> / {total}
      </span>

      <button
        style={{ ...btnPrimary, opacity: isLast ? 0.4 : 1, cursor: isLast ? 'not-allowed' : 'pointer' }}
        onClick={onNext}
        disabled={isLast}
      >
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  )
}
