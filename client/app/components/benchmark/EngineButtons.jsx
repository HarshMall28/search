const mongoTagStyle = {
  flex: 1, borderLeft: '3px solid #EF9F27',
  background: 'rgba(239,159,39,.05)', borderRadius: '10px',
  padding: '14px 18px', display: 'flex', alignItems: 'center',
  gap: '12px', pointerEvents: 'none', userSelect: 'none',
}

const atlasTagStyle = {
  flex: 1, borderLeft: '3px solid #378ADD',
  background: 'rgba(55,138,221,.05)', borderRadius: '10px',
  padding: '14px 18px', display: 'flex', alignItems: 'center',
  gap: '12px', pointerEvents: 'none', userSelect: 'none',
}

const mongoIconStyle = {
  width: 32, height: 32, borderRadius: 8,
  background: 'rgba(239,159,39,.12)', color: '#f7c87a',
  display: 'grid', placeItems: 'center', flexShrink: 0,
}

const atlasIconStyle = {
  width: 32, height: 32, borderRadius: 8,
  background: 'rgba(55,138,221,.15)', color: '#7ec0ff',
  display: 'grid', placeItems: 'center', flexShrink: 0,
}

export default function EngineButtons() {
  return (
    <div className="flex gap-3 mt-[14px] flex-col sm:flex-row">
      <div style={mongoTagStyle}>
        <span style={mongoIconStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12c0-3.3 3.6-6 8-6s8 2.7 8 6c0 1.7-1 3-3 3-2.3 0-3-2-5-2s-2.5 2-5 2c-1.7 0-3-1.3-3-3z" />
          </svg>
        </span>
        <span className="flex flex-col gap-[3px]">
          <span className="font-semibold" style={{ fontSize: '14px', color: '#f7c87a' }}>🐌 MongoDB $regex</span>
          <small className="mono" style={{ fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '0.02em' }}>Full collection scan</small>
        </span>
      </div>

      <div style={atlasTagStyle}>
        <span style={atlasIconStyle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2 4 14h6l-2 8 11-13h-6l2-7z" />
          </svg>
        </span>
        <span className="flex flex-col gap-[3px]">
          <span className="font-semibold" style={{ fontSize: '14px', color: '#7ec0ff' }}>⚡ Atlas Search</span>
          <small className="mono" style={{ fontSize: '11px', color: 'var(--ink-faint)', letterSpacing: '0.02em' }}>Lucene inverted index</small>
        </span>
      </div>
    </div>
  )
}
