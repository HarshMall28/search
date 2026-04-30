const CATEGORY_COLORS = {
  phones:  { bg: 'rgba(55,138,221,.12)',  color: '#7ec0ff',        border: 'rgba(55,138,221,.25)' },
  laptops: { bg: 'rgba(180,90,220,.12)',  color: '#d49bff',        border: 'rgba(180,90,220,.25)' },
  audio:   { bg: 'rgba(29,158,117,.12)',  color: 'var(--teal-2)',  border: 'rgba(29,158,117,.3)' },
  tablets: { bg: 'rgba(239,159,39,.12)', color: 'var(--amber-2)', border: 'rgba(239,159,39,.25)' },
  watches: { bg: 'rgba(216,90,48,.12)',  color: '#ff8a5c',        border: 'rgba(216,90,48,.3)' },
}

function getCategoryStyle(category = '') {
  const key = category.toLowerCase().replace(/\s+/g, '')
  return CATEGORY_COLORS[key] ?? { bg: 'rgba(255,255,255,.06)', color: 'var(--ink-dim)', border: 'rgba(255,255,255,.12)' }
}

function StarRating({ rating }) {
  const full = Math.floor(rating ?? 0)
  return (
    <span className="text-[11px]" style={{ color: 'var(--amber-2)' }}>
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      <span className="ml-1 mono" style={{ color: 'var(--ink-faint)', fontSize: '10px' }}>
        {rating?.toFixed(1)}
      </span>
    </span>
  )
}

export default function ProductCard({ product, isFast }) {
  const { title, description, category, price, image, rating } = product
  const catStyle = getCategoryStyle(category)

  const cardStyle = isFast
    ? { background: 'linear-gradient(180deg,#131820,#101317)', border: '1px solid rgba(55,138,221,.18)' }
    : { background: '#141414', border: '1px solid var(--line-2)' }

  function handleImgError(e) {
    e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(title)}/64/64`
  }

  return (
    <div
      className="flex gap-[14px] p-3 rounded-[12px] transition-transform duration-200 hover:-translate-y-px"
      style={cardStyle}
    >
      <div className="w-16 h-16 rounded-[10px] shrink-0 overflow-hidden" style={{ background: '#1a1a1a' }}>
        {image ? (
          <img src={image} alt={title} onError={handleImgError} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0 6px,transparent 6px 12px)' }} />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-[5px]">
        <div className="text-[14px] font-semibold truncate" style={{ color: 'var(--ink)', letterSpacing: '-0.005em' }}>
          {title}
        </div>
        <div className="text-[12.5px] truncate" style={{ color: 'var(--ink-dim)' }}>
          {description}
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span
            className="mono text-[10.5px] font-semibold tracking-[.04em] px-2 py-[3px] rounded-full"
            style={{ background: catStyle.bg, color: catStyle.color, border: `1px solid ${catStyle.border}` }}
          >
            {category}
          </span>
          <StarRating rating={rating} />
          <span className="ml-auto mono text-[12.5px] font-bold" style={{ color: '#cfe5ff' }}>
            ${price?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
