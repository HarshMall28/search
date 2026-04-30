const COLOR_MAP = {
  default: { border: 'rgba(55,138,221,.6)',   bg: 'rgba(55,138,221,.1)',  color: '#bfdcff',        shadow: '0 0 0 4px rgba(55,138,221,.1), 0 0 32px rgba(55,138,221,.45)', numBg: 'var(--blue)',    numColor: '#fff' },
  amber:   { border: 'rgba(239,159,39,.55)',  bg: 'rgba(239,159,39,.08)', color: 'var(--amber-2)', shadow: '0 0 0 4px rgba(239,159,39,.1), 0 0 32px rgba(239,159,39,.4)',  numBg: 'var(--amber)',   numColor: '#1a1100' },
  teal:    { border: 'rgba(38,200,147,.55)',  bg: 'rgba(38,200,147,.08)', color: 'var(--teal-2)',  shadow: '0 0 0 4px rgba(38,200,147,.1), 0 0 32px rgba(38,200,147,.4)',  numBg: 'var(--teal-2)', numColor: '#001f14' },
}

export default function StepNode({ step, isActive, isDone, onClick }) {
  const { num, label, icon, colorKey = 'default' } = step
  const active = COLOR_MAP[colorKey]

  const bubbleStyle = isActive
    ? { border: `1px solid ${active.border}`, color: active.color, background: active.bg, boxShadow: active.shadow, transform: 'scale(1.08)' }
    : isDone
      ? { border: '1px solid rgba(29,158,117,.45)', color: 'var(--teal-2)', background: 'rgba(29,158,117,.06)', boxShadow: '0 0 18px rgba(29,158,117,.18)' }
      : { border: '1px solid var(--line)', color: 'var(--ink-faint)', background: '#0c0c0d' }

  const numStyle = isActive
    ? { background: active.numBg, borderColor: active.numBg, color: active.numColor }
    : isDone
      ? { background: 'rgba(29,158,117,.15)', borderColor: 'rgba(29,158,117,.4)', color: 'var(--teal-2)' }
      : { background: '#1a1a1a', borderColor: 'var(--line)', color: 'var(--ink-dim)' }

  return (
    <div className="relative z-10 flex flex-col items-center gap-[10px] cursor-pointer" onClick={onClick}>
      <div
        className="w-24 h-24 rounded-full grid place-items-center relative transition-all duration-300"
        style={{ ...bubbleStyle, transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
      >
        <span style={{ width: 36, height: 36 }}>{icon}</span>
        <span
          className="absolute -top-[6px] -right-[6px] w-[22px] h-[22px] rounded-full grid place-items-center mono text-[11px] font-bold border"
          style={numStyle}
        >
          {num}
        </span>
      </div>
      <span
        className="text-[12.5px] font-semibold text-center leading-[1.35] max-w-[160px]"
        style={{ color: isActive ? 'var(--ink)' : isDone ? '#bfd8ce' : 'var(--ink-dim)', letterSpacing: '-0.005em' }}
      >
        {label}
      </span>
    </div>
  )
}
