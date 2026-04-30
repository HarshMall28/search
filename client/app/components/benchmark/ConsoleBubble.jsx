const bubbleStyle = {
  position: 'absolute',
  width: '340px',
  background: '#08090b',
  border: '1px solid rgba(55,138,221,.5)',
  borderRadius: '12px',
  padding: '14px 16px',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '12px',
  color: '#cfe5ff',
  zIndex: 30,
  boxShadow: '0 20px 50px rgba(0,0,0,.6), 0 0 30px rgba(55,138,221,.4)',
  transform: 'scale(0)',
  transformOrigin: 'top left',
  pointerEvents: 'none',
  top: '100%',
  left: 0,
  marginTop: '8px',
}

const DOT_COLORS = ['#ff5f56', '#ffbd2e', '#27c93f']

export default function ConsoleBubble({ bubbleRef, meiliTime }) {
  const lines = [
    { key: 'Query received', val: null },
    { key: 'Lucene index hit', val: null },
    { key: 'Edit distance scoring applied', val: null },
    { key: '10 results', val: meiliTime ? `${meiliTime}ms` : null },
  ]

  return (
    <div ref={bubbleRef} style={bubbleStyle}>
      <div
        style={{
          position: 'absolute', left: '36px', top: '-7px',
          width: '12px', height: '12px', background: '#08090b',
          borderLeft: '1px solid rgba(55,138,221,.5)',
          borderTop: '1px solid rgba(55,138,221,.5)',
          transform: 'rotate(45deg)',
        }}
      />

      <div
        className="flex items-center gap-[6px] mb-[10px] pb-[10px] mono text-[11px] uppercase tracking-[.08em]"
        style={{ borderBottom: '1px solid #1a1f28', color: 'var(--ink-faint)' }}
      >
        <span className="flex gap-1">
          {DOT_COLORS.map(c => (
            <i key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'block' }} />
          ))}
        </span>
        <span className="ml-2">atlas-search · query-log</span>
      </div>

      {lines.map((line, i) => (
        <div key={i} className="console-line flex gap-2 leading-[1.7]" style={{ opacity: 0 }}>
          <span style={{ color: 'var(--teal-2)' }}>✓</span>
          <span style={{ color: '#7ec0ff' }}>{line.key}</span>
          {line.val && <span style={{ color: 'var(--amber-2)' }}> — {line.val}</span>}
        </div>
      ))}
    </div>
  )
}
