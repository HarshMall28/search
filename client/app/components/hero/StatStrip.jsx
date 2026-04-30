const STATS = [
  { value: '4ms', label: 'P50 INDEXED', color: 'var(--blue-2)' },
  { value: '312ms', label: 'P50 REGEX', color: 'var(--amber-2)' },
  { value: '71×', label: 'FASTER', color: 'var(--teal-2)' },
  { value: '1.2M', label: 'DOCS INDEXED', color: 'var(--ink)' },
]

export default function StatStrip() {
  return (
    <div className="flex gap-12 mt-[90px] flex-wrap justify-center">
      {STATS.map(({ value, label, color }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <div
            className="text-2xl font-bold"
            style={{ letterSpacing: '-0.02em', color }}
          >
            {value}
          </div>
          <div
            className="text-[11px] uppercase tracking-widest mono"
            style={{ color: 'var(--ink-faint)' }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
