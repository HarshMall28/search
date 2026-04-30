const TYPO_CHIPS = ['iphane', 'iphome', 'samsng', 'macbok']

const chipBase = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '12px',
  padding: '5px 11px',
  borderRadius: '999px',
  background: '#1A1A1A',
  border: '1px solid #2A2A2A',
  color: '#888',
  cursor: 'pointer',
  transition: 'all .2s',
  fontWeight: 500,
}

function Chip({ label, onClick }) {
  function handleEnter(e) {
    Object.assign(e.currentTarget.style, {
      color: '#bfdcff',
      borderColor: 'rgba(55,138,221,.55)',
      boxShadow: '0 0 12px rgba(55,138,221,.25), inset 0 0 8px rgba(55,138,221,.06)',
    })
  }
  function handleLeave(e) {
    Object.assign(e.currentTarget.style, { color: '#888', borderColor: '#2A2A2A', boxShadow: 'none' })
  }

  return (
    <button
      onClick={() => onClick(label)}
      style={chipBase}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {label}
    </button>
  )
}

export default function FuzzyHints({ onChipClick }) {
  return (
    <div className="flex items-center justify-between gap-[14px] mt-[10px] px-1 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[12px] italic" style={{ color: '#888' }}>Try a typo:</span>
        {TYPO_CHIPS.map(chip => (
          <Chip key={chip} label={chip} onClick={onChipClick} />
        ))}
      </div>

      <div
        className="inline-flex items-center gap-[7px] mono text-[11px] font-semibold tracking-[.04em]"
        style={{ color: 'var(--teal)' }}
      >
        <span
          className="w-[7px] h-[7px] rounded-full"
          style={{ background: 'var(--teal)', boxShadow: '0 0 8px var(--teal)', animation: 'heartbeat 1.6s ease-in-out infinite' }}
        />
        Fuzzy matching active
      </div>
    </div>
  )
}
