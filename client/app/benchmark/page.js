'use client'

import { useSearch } from '../hooks/useSearch'
import { useConsoleBubble } from '../hooks/useConsoleBubble'
import SearchBar from '../components/benchmark/SearchBar'
import FuzzyHints from '../components/benchmark/FuzzyHints'
import EngineButtons from '../components/benchmark/EngineButtons'
import ConsoleBubble from '../components/benchmark/ConsoleBubble'
import ResultsPanel from '../components/benchmark/ResultsPanel'
import ComparisonBar from '../components/benchmark/ComparisonBar'
import AdvantagesStrip from '../components/benchmark/AdvantagesStrip'

const bgStyle = {
  background: `
    radial-gradient(700px 400px at 15% 0%, rgba(239,159,39,.04), transparent 60%),
    radial-gradient(700px 400px at 85% 0%, rgba(55,138,221,.06), transparent 60%)
  `,
}

export default function BenchmarkPage() {
  const {
    searchTerm, setSearchTerm, triggerSearch, loading,
    hasSearched, mongoResults, meiliResults,
    mongoTime, meiliTime, speedMultiplier,
  } = useSearch()

  const { bubbleRef, trigger } = useConsoleBubble()

  function handleChipClick(chip) {
    setSearchTerm(chip)
    triggerSearch(chip)
    trigger()
  }

  return (
    <main className="pt-[90px] min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1320px] mx-auto px-9 pb-20 relative" style={{ paddingLeft: 'clamp(18px,3vw,36px)', paddingRight: 'clamp(18px,3vw,36px)' }}>
        <div className="absolute inset-0 pointer-events-none" style={bgStyle} />

        <div className="flex items-end justify-between mt-[14px] mb-[22px] gap-6 flex-wrap">
          <div>
            <h1 className="text-[30px] m-0 mb-[6px] font-bold" style={{ letterSpacing: '-0.02em' }}>
              Live Benchmark <span style={{ color: 'var(--blue-2)' }}>/</span>{' '}
              <span style={{ color: 'var(--ink-dim)', fontWeight: 500 }}>Side-by-side query race</span>
            </h1>
            <p className="m-0 text-[14px]" style={{ color: 'var(--ink-dim)' }}>
              Same query. Same dataset. Two engines. One winner.
            </p>
          </div>
          <div className="mono text-[12px] flex gap-[18px] items-center" style={{ color: 'var(--ink-faint)' }}>
            <span className="flex items-center gap-[6px]">
              <span className="w-[7px] h-[7px] rounded-full inline-block" style={{ background: 'var(--teal-2)', boxShadow: '0 0 8px var(--teal-2)', animation: 'dotpulse 1.4s infinite' }} />
              CONNECTED
            </span>
            <span>NODE_US-EAST-2</span>
            <span>1,243,891 DOCS</span>
          </div>
        </div>

        <div className="rounded-[18px] p-[22px] relative" style={{ background: 'linear-gradient(180deg,#121212,#0e0e0e)', border: '1px solid var(--line)' }}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} onSearch={triggerSearch} />
          <FuzzyHints onChipClick={handleChipClick} />
          <div className="relative">
            <EngineButtons />
            <ConsoleBubble bubbleRef={bubbleRef} meiliTime={meiliTime} />
          </div>
        </div>

        <div className="grid gap-5 mt-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <ResultsPanel
            title="MongoDB $regex"
            dotColor="var(--amber)"
            results={mongoResults}
            timeMs={mongoTime}
            isFast={false}
            isLoading={loading}
            hasSearched={hasSearched}
          />
          <ResultsPanel
            title="Atlas Search"
            dotColor="var(--teal-2)"
            results={meiliResults}
            timeMs={meiliTime}
            isFast={true}
            isLoading={loading}
            hasSearched={hasSearched}
          />
        </div>

        <ComparisonBar mongoTime={mongoTime} meiliTime={meiliTime} speedMultiplier={speedMultiplier} />
        <AdvantagesStrip />
      </div>
    </main>
  )
}
