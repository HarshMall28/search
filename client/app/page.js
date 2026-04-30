import ParticleCanvas from './components/hero/ParticleCanvas'
import TypingAnimation from './components/hero/TypingAnimation'
import HeroButtons from './components/hero/HeroButtons'
import StatStrip from './components/hero/StatStrip'

const heroBgStyle = {
  background: `
    radial-gradient(900px 600px at 20% 30%, rgba(55,138,221,.08), transparent 60%),
    radial-gradient(800px 700px at 85% 70%, rgba(29,158,117,.05), transparent 55%),
    var(--bg)
  `,
}

const gridPatternStyle = {
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px)
  `,
  backgroundSize: '54px 54px',
  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
}

export default function HeroPage() {
  return (
    <main className="relative w-full min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={heroBgStyle}>
        <div className="absolute inset-[-2px]" style={gridPatternStyle} />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 420, height: 420, background: '#1a4d8a',
            top: -100, left: -80, filter: 'blur(80px)', opacity: 0.5,
            animation: 'drift 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 380, height: 380, background: '#0e5e47',
            bottom: -120, right: -60, filter: 'blur(80px)', opacity: 0.5,
            animation: 'drift 22s ease-in-out infinite reverse',
          }}
        />
        <ParticleCanvas />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-[120px] pb-[60px] text-center">
        <div
          className="inline-flex items-center gap-2 px-[14px] py-[6px] rounded-full text-[12px] text-[#a5c6ec] uppercase tracking-[.08em] mono font-medium mb-8"
          style={{ background: 'rgba(55,138,221,.06)', border: '1px solid rgba(55,138,221,.25)' }}
        >
          <span
            className="w-[6px] h-[6px] rounded-full"
            style={{ background: 'var(--blue)', boxShadow: '0 0 8px var(--blue)', animation: 'dotpulse 1.6s ease-in-out infinite' }}
          />
          v0.4 · LIVE BENCHMARK · INDEX-FIRST
        </div>

        <TypingAnimation />

        <p
          className="text-center leading-[1.55]"
          style={{ fontSize: 'clamp(15px, 1.4vw, 19px)', color: 'var(--ink-dim)', maxWidth: '680px', margin: '0 0 44px' }}
        >
          See the difference between{' '}
          <span style={{ color: '#cfe5ff', fontWeight: 500 }}>slow regex search</span> and{' '}
          <span style={{ color: '#cfe5ff', fontWeight: 500 }}>blazing-fast Atlas Search.</span>{' '}
          Live. Side by side. Down to the millisecond.
        </p>

        <HeroButtons />
        <StatStrip />
      </div>
    </main>
  )
}
