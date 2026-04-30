import LatencyBadge from '../shared/LatencyBadge'
import ProductCard from './ProductCard'

const panelBase = {
  background: 'linear-gradient(180deg,#101010,#0c0c0c)',
  border: '1px solid var(--line)',
  borderRadius: '16px',
  padding: '18px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '480px',
  position: 'relative',
  overflow: 'hidden',
}

function SkeletonCard() {
  return (
    <div className="flex gap-[14px] p-3 rounded-[12px]" style={{ background: '#141414', border: '1px solid var(--line-2)' }}>
      <div className="w-16 h-16 rounded-[10px] shrink-0 animate-pulse" style={{ background: '#1f1f1f' }} />
      <div className="flex-1 flex flex-col gap-2 pt-1">
        <div className="h-3 rounded animate-pulse" style={{ background: '#1f1f1f', width: '70%' }} />
        <div className="h-2 rounded animate-pulse" style={{ background: '#1a1a1a', width: '90%' }} />
        <div className="h-2 rounded animate-pulse" style={{ background: '#1a1a1a', width: '50%' }} />
      </div>
    </div>
  )
}

function EmptyState({ hasSearched }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12" style={{ color: 'var(--ink-faint)' }}>
      <div className="text-[32px] opacity-30">{hasSearched ? '∅' : '⚡'}</div>
      <p className="text-[13px] text-center mono">
        {hasSearched ? 'No results — try exact spelling' : 'Run a search to see results'}
      </p>
    </div>
  )
}

export default function ResultsPanel({ title, dotColor, results, timeMs, isFast, isLoading, hasSearched }) {
  return (
    <div style={panelBase}>
      {isFast && (
        <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg,transparent,var(--blue),transparent)', boxShadow: '0 0 14px var(--blue)' }} />
      )}

      <div className="flex items-center justify-between mb-[14px] pb-[14px]" style={{ borderBottom: '1px solid var(--line-2)' }}>
        <div className="flex items-center gap-[10px] text-[14px] font-semibold">
          <span className="w-2 h-2 rounded-full" style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}` }} />
          {title}
          <small className="mono text-[11px] uppercase tracking-[.08em]" style={{ color: 'var(--ink-faint)', fontWeight: 500 }}>
            {isFast ? 'atlas search' : 'mongodb $regex'}
          </small>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {isFast && results?.length > 0 && (
            <span className="inline-flex items-center gap-[6px] px-[10px] py-[5px] rounded-[6px] mono text-[10.5px] font-semibold tracking-[.02em]"
              style={{ background: 'rgba(38,200,147,.1)', color: 'var(--teal-2)', border: '1px solid rgba(38,200,147,.35)' }}>
              ◈ Fuzzy match active
            </span>
          )}
          <LatencyBadge timeMs={timeMs} variant={isFast ? 'fast' : 'slow'} />
        </div>
      </div>

      <div className="flex flex-col gap-[10px] flex-1">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : results?.length > 0
            ? results.map(product => <ProductCard key={product.id} product={product} isFast={isFast} />)
            : <EmptyState hasSearched={hasSearched} />
        }
      </div>
    </div>
  )
}
