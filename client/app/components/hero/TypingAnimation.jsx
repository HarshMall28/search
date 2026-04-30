'use client'

import { useTypingAnimation } from '../../hooks/useTypingAnimation'

export default function TypingAnimation() {
  const { displayText } = useTypingAnimation()

  return (
    <h1
      className="font-bold text-center"
      style={{
        fontSize: 'clamp(34px, 5.4vw, 72px)',
        lineHeight: 1.05,
        letterSpacing: '-0.025em',
        maxWidth: '1100px',
        margin: '0 0 28px',
        minHeight: '2.2em',
        textWrap: 'balance',
      }}
    >
      <span style={{ color: 'var(--ink)' }}>{displayText}</span>
      <span
        style={{
          display: 'inline-block',
          width: '0.55ch',
          height: '0.95em',
          background: 'var(--blue)',
          marginLeft: '6px',
          verticalAlign: '-0.12em',
          borderRadius: '1px',
          boxShadow: '0 0 14px var(--blue)',
          animation: 'blink 1s ease-in-out infinite',
        }}
      />
    </h1>
  )
}
