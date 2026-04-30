const STYLES = {
  slow: {
    background: 'rgba(216,90,48,.12)',
    color: '#ff8a5c',
    border: '1px solid rgba(216,90,48,.4)',
  },
  fast: {
    background: 'rgba(29,158,117,.12)',
    color: 'var(--teal-2)',
    border: '1px solid rgba(29,158,117,.4)',
  },
}

const PIP_STYLES = {
  slow: { background: '#ff8a5c', animation: 'slowpulse 1.6s ease-in-out infinite' },
  fast: { background: 'var(--teal-2)' },
}

export default function LatencyBadge({ timeMs, variant = 'fast' }) {
  if (timeMs === null || timeMs === undefined) return null

  return (
    <span
      className="inline-flex items-center gap-[6px] px-[10px] py-[5px] rounded-[6px] mono text-[12px] font-bold tracking-[.02em]"
      style={STYLES[variant]}
    >
      <span className="w-[6px] h-[6px] rounded-full" style={PIP_STYLES[variant]} />
      {timeMs}ms
    </span>
  )
}
