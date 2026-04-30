import TechGrid from '../components/about/TechGrid'
import BuildTimeline from '../components/about/BuildTimeline'
import StatCards from '../components/about/StatCards'

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="mb-[38px]">
      <p className="mono text-[11px] uppercase tracking-[.12em] mb-[10px] m-0" style={{ color: 'var(--ink-faint)' }}>
        {eyebrow}
      </p>
      <h2 className="m-0 mb-[10px] font-bold" style={{ fontSize: 'clamp(24px,3vw,36px)', letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      {sub && (
        <p className="m-0 text-[15px] leading-[1.6]" style={{ color: 'var(--ink-dim)', maxWidth: '640px' }}>
          {sub}
        </p>
      )}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="pt-[90px] min-h-screen" style={{ background: 'var(--bg)' }}>
      <div
        className="max-w-[1320px] mx-auto pb-24"
        style={{ padding: '0 clamp(18px,3vw,36px) 96px' }}
      >
        <div className="mt-[14px] mb-[56px] text-center">
          <h1
            className="m-0 mb-[10px] font-bold"
            style={{ fontSize: 'clamp(30px,4.5vw,52px)', letterSpacing: '-0.025em' }}
          >
            About <span style={{ color: 'var(--blue-2)' }}>SenseiSearch</span>
          </h1>
          <p className="m-0 text-[16px]" style={{ color: 'var(--ink-dim)', maxWidth: '580px', margin: '0 auto' }}>
            A live performance case study — built to show exactly why full-text search infrastructure matters at scale.
          </p>
        </div>

        <section className="mb-[64px]">
          <SectionHeader
            eyebrow="Stack"
            title="Technology Choices"
            sub="Every dependency was chosen for a specific reason. No filler, no vanity libraries."
          />
          <TechGrid />
        </section>

        <section className="mb-[64px]">
          <SectionHeader
            eyebrow="Production stats"
            title="By The Numbers"
            sub="Real benchmark results measured against a 1.2M-document MongoDB Atlas collection."
          />
          <StatCards />
        </section>

        <section className="mb-[64px]">
          <SectionHeader
            eyebrow="Development"
            title="How It Was Built"
          />
          <BuildTimeline />
        </section>

        <div
          className="rounded-[20px] p-10 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0d1a2a,#0a1520)', border: '1px solid rgba(55,138,221,.2)' }}
        >
          <span
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%,rgba(55,138,221,.08),transparent)' }}
          />
          <p
            className="m-0 mb-4 font-bold relative"
            style={{ fontSize: 'clamp(18px,2.5vw,26px)', letterSpacing: '-0.02em', color: 'var(--blue-2)' }}
          >
            "The right index makes 70× the difference."
          </p>
          <p className="m-0 text-[14px] relative" style={{ color: 'var(--ink-dim)' }}>
            Atlas Search · Lucene · BM25 · Fuzzy matching — all included.
          </p>
        </div>

        <footer className="mt-[48px] pt-[24px] flex items-center justify-between flex-wrap gap-4" style={{ borderTop: '1px solid var(--line)' }}>
          <span className="mono text-[12px]" style={{ color: 'var(--ink-faint)' }}>
            SenseiSearch — Search, Decoded
          </span>
          <span className="mono text-[12px]" style={{ color: 'var(--ink-faint)' }}>
            Built with Next.js · MongoDB Atlas · GraphQL
          </span>
        </footer>
      </div>
    </main>
  )
}
