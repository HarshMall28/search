const panelStyle = {
  background: 'linear-gradient(180deg,#101012,#0c0c0d)',
  border: '1px solid var(--line)',
  borderRadius: '18px',
  padding: '30px 32px',
  display: 'grid',
  gridTemplateColumns: '1.1fr .9fr',
  gap: '32px',
  minHeight: '280px',
}

export default function StepDetail({ step }) {
  if (!step) return null
  const { title, stepTag, sub, body, rightContent } = step

  return (
    <div style={panelStyle} className="max-sm:!grid-cols-1">
      <div>
        <h3
          className="text-[24px] m-0 mb-[6px] font-bold flex items-center gap-[14px]"
          style={{ letterSpacing: '-0.02em' }}
        >
          {title}
          {stepTag && (
            <span
              className="mono text-[11px] font-bold px-[10px] py-1 rounded-[6px] tracking-[.08em]"
              style={{ background: 'rgba(55,138,221,.12)', color: '#7ec0ff', border: '1px solid rgba(55,138,221,.3)' }}
            >
              {stepTag}
            </span>
          )}
        </h3>
        {sub && (
          <p className="m-0 mb-5 text-[14px] leading-[1.5]" style={{ color: 'var(--ink-dim)' }}>{sub}</p>
        )}
        <p className="m-0 text-[15px] leading-[1.65]" style={{ color: '#cfcfcf', textWrap: 'pretty' }}>
          {body}
        </p>
      </div>

      <div className="flex flex-col gap-[14px]">
        {rightContent}
      </div>
    </div>
  )
}
