'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/benchmark', label: 'Benchmark' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/about', label: 'About' },
]

const navStyle = {
  background: 'linear-gradient(180deg, rgba(10,10,10,.85), rgba(10,10,10,.55))',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  borderBottom: '1px solid var(--line-2)',
}

const logoMarkStyle = {
  background: 'linear-gradient(135deg,#1a3656,#0e1c2c)',
  border: '1px solid #2a4a72',
  boxShadow: '0 0 14px rgba(55,138,221,.35), inset 0 0 10px rgba(55,138,221,.2)',
}

const ctaStyle = {
  background: 'rgba(55,138,221,.08)',
  border: '1px solid rgba(55,138,221,.55)',
  boxShadow: '0 0 18px rgba(55,138,221,.25), inset 0 0 12px rgba(55,138,221,.15)',
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef(null)
  const linksRef = useRef(null)
  const indicatorRef = useRef(null)
  const linkRefs = useRef([])
  const isFirstIndicatorMount = useRef(true)
  const dotRefs = useRef([])
  const arrowRef = useRef(null)
  const arrowBounce = useRef(null)

  useEffect(() => {
    gsap.to(navRef.current, { y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 })
  }, [])

  useEffect(() => {
    const activeIdx = NAV_LINKS.findIndex(l => l.href === pathname)
    const linkEl = linkRefs.current[activeIdx]
    const containerEl = linksRef.current
    const indicatorEl = indicatorRef.current
    if (!linkEl || !containerEl || !indicatorEl) return

    const linkRect = linkEl.getBoundingClientRect()
    const containerRect = containerEl.getBoundingClientRect()
    const x = linkRect.left - containerRect.left
    const w = linkRect.width

    if (isFirstIndicatorMount.current) {
      isFirstIndicatorMount.current = false
      gsap.set(indicatorEl, { x, width: w, opacity: 1 })
    } else {
      gsap.to(indicatorEl, { x, width: w, duration: 0.4, ease: 'power3.inOut' })
    }
  }, [pathname])

  useEffect(() => {
    const activeIdx = NAV_LINKS.findIndex(l => l.href === pathname)
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return
      if (i === activeIdx) {
        gsap.to(dot, { scale: 1.4, duration: 0.3, ease: 'back.out(2)' })
      } else {
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    })
  }, [pathname])

  useEffect(() => {
    const el = arrowRef.current
    if (!el) return
    arrowBounce.current = gsap.to(el, { y: -6, duration: 0.8, ease: 'power1.inOut', yoyo: true, repeat: -1 })
    return () => arrowBounce.current?.kill()
  }, [])

  const currentIdx = NAV_LINKS.findIndex(l => l.href === pathname)
  const nextHref = currentIdx < NAV_LINKS.length - 1 ? NAV_LINKS[currentIdx + 1].href : null

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-9 py-[18px]"
        style={{ ...navStyle, transform: 'translateY(-100%)' }}
      >
        <Link href="/" className="flex items-center gap-[10px] font-bold text-[18px] tracking-tight no-underline text-[var(--ink)]">
          <span className="w-7 h-7 rounded-[8px] grid place-items-center" style={logoMarkStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" style={{ fill: '#7ec0ff', filter: 'drop-shadow(0 0 6px #378ADD)' }}>
              <path d="M13 2 4 14h6l-2 8 11-13h-6l2-7z" />
            </svg>
          </span>
          Sensei<span style={{ color: '#9bbef0' }}>Search</span>
        </Link>

        <div ref={linksRef} className="hidden md:flex gap-7 text-sm relative">
          <span
            ref={indicatorRef}
            className="absolute rounded-sm pointer-events-none"
            style={{ bottom: '-4px', height: '2px', background: '#378ADD', boxShadow: '0 0 8px rgba(55,138,221,.6)', opacity: 0, left: 0 }}
          />
          {NAV_LINKS.map(({ href, label }, i) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                ref={el => { linkRefs.current[i] = el }}
                className="relative px-0.5 py-1.5 no-underline transition-colors duration-200"
                style={{ color: isActive ? '#378ADD' : '#888888' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#FFFFFF' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#888888' }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        <Link
          href="/benchmark"
          className="px-[18px] py-[9px] rounded-full font-semibold text-[13.5px] tracking-wide text-[#cfe5ff] transition-all duration-200 hover:bg-[rgba(55,138,221,.18)]"
          style={ctaStyle}
        >
          Try It Live →
        </Link>
      </nav>

      {/* Mobile dot nav */}
      <div
        className="md:hidden fixed z-50 flex items-center gap-[10px] px-4 py-[10px] rounded-full"
        style={{ bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(20,20,20,.8)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '0.5px solid #2A2A2A' }}
      >
        {NAV_LINKS.map(({ href }, i) => {
          const isActive = pathname === href
          return (
            <button
              key={href}
              ref={el => { dotRefs.current[i] = el }}
              onClick={() => router.push(href)}
              style={{ width: 8, height: 8, borderRadius: '50%', background: isActive ? '#378ADD' : '#2A2A2A', boxShadow: isActive ? '0 0 8px rgba(55,138,221,.8)' : 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, display: 'block' }}
            />
          )
        })}
      </div>

      {/* Mobile next-section arrow */}
      <button
        ref={arrowRef}
        className="md:hidden fixed z-50 grid place-items-center rounded-full"
        style={{ bottom: '70px', right: '20px', width: 44, height: 44, background: 'rgba(55,138,221,.15)', border: '1px solid #378ADD', cursor: 'pointer', color: '#378ADD', padding: 0 }}
        onClick={() => {
          if (nextHref) {
            router.push(nextHref)
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        onMouseEnter={() => gsap.to(arrowRef.current, { scale: 1.1, duration: 0.2, ease: 'back.out(1.7)' })}
        onMouseLeave={() => gsap.to(arrowRef.current, { scale: 1, duration: 0.2 })}
      >
        {nextHref ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        )}
      </button>
    </>
  )
}
