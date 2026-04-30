import Link from 'next/link'

const primaryStyle = {
  background: 'var(--blue)',
  color: '#fff',
  boxShadow: '0 0 0 1px rgba(255,255,255,.06) inset, 0 0 32px rgba(55,138,221,.55), 0 6px 24px rgba(55,138,221,.35)',
  border: '1px solid transparent',
}

const ghostStyle = {
  background: 'transparent',
  color: '#cfe5ff',
  border: '1px solid rgba(255,255,255,.18)',
}

export default function HeroButtons() {
  return (
    <div className="flex gap-[14px] flex-wrap justify-center">
      <Link
        href="/benchmark"
        className="inline-flex items-center gap-[10px] font-semibold text-[15px] px-[26px] py-[14px] rounded-full transition-all duration-200 hover:-translate-y-px no-underline"
        style={primaryStyle}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2 4 14h6l-2 8 11-13h-6l2-7z" />
        </svg>
        Run the Benchmark
      </Link>

      <Link
        href="/architecture"
        className="inline-flex items-center gap-[10px] font-semibold text-[15px] px-[26px] py-[14px] rounded-full transition-all duration-200 hover:bg-white/[.03] no-underline"
        style={ghostStyle}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Explore the Architecture
      </Link>
    </div>
  )
}
