'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function SearchBar({ value, onChange, onSearch }) {
  const inputRef = useRef(null)
  const sendBtnRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  const hasText = value.trim().length > 0
  const canSearch = value.trim().length >= 2

  useEffect(() => {
    function handleKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && canSearch) onSearch(value)
  }

  function handleSend() {
    if (canSearch) onSearch(value)
  }

  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { text-shadow: none; }
          50% { text-shadow: 0 0 8px rgba(55,138,221,0.8); }
        }
      `}</style>
      <div
        className={`relative flex items-center gap-3 rounded-[14px] bg-[#0a0a0a] px-[18px] py-[14px] transition-all duration-200 ${isFocused ? 'border border-[#378ADD] shadow-[0_0_0_4px_rgba(55,138,221,.12),0_0_24px_rgba(55,138,221,.25)]' : 'border border-[#2A2A2A]'}`}
      >
        <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-faint)' }}>
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search products, articles, topics…"
          className="flex-1 bg-transparent border-none outline-none text-[16px]"
          style={{ color: 'var(--ink)', fontFamily: 'inherit', letterSpacing: '-0.005em' }}
        />

        {!hasText && isFocused && (
          <span className="shrink-0 mono text-[11px] select-none" style={{ color: '#888' }}>
            Press Enter{' '}
            <span style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}>↵</span>
          </span>
        )}

        {hasText && (
          <button
            ref={sendBtnRef}
            onClick={handleSend}
            className="shrink-0 grid place-items-center rounded-[6px]"
            style={{ width: 28, height: 28, background: '#378ADD', border: 'none', cursor: 'pointer', color: '#fff', padding: 0 }}
            onMouseEnter={() => gsap.to(sendBtnRef.current, { scale: 1.05, duration: 0.15, ease: 'power2.out' })}
            onMouseLeave={() => gsap.to(sendBtnRef.current, { scale: 1, duration: 0.15, ease: 'power2.out' })}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        )}
      </div>
    </>
  )
}
