'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import StepNode from './StepNode'
import StepDetail from './StepDetail'
import StepNavigation from './StepNavigation'

const mkIcon = (d) => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const codeBox = (children) => (
  <div className="rounded-[12px] p-[14px] mono text-[12.5px] leading-[1.55]" style={{ background: '#0a0a0b', border: '1px solid var(--line-2)', color: '#cfe5ff' }}>
    {children}
  </div>
)

const statRow = (rows) => (
  <div className="flex flex-col gap-2">
    {rows.map(([lab, val, color]) => (
      <div key={lab} className="flex items-center justify-between p-3 rounded-[10px] mono text-[12.5px]" style={{ background: '#0a0a0b', border: '1px solid var(--line-2)' }}>
        <span style={{ color: 'var(--ink-dim)' }}>{lab}</span>
        <span style={{ color, fontWeight: 700 }}>{val}</span>
      </div>
    ))}
  </div>
)

const STEPS = [
  {
    num: 1, label: 'Client Query', colorKey: 'default',
    icon: mkIcon('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'),
    title: 'Client Query', stepTag: 'STEP 01',
    sub: 'User types a search term in the React frontend',
    body: 'The search request originates in the browser. A GraphQL query is sent over HTTP to the Apollo Server with the search term and result limit. The client waits for one unified response containing both engine results.',
    rightContent: codeBox(<><span style={{color:'#c792ea'}}>query</span> <span style={{color:'#7ec0ff'}}>Search</span>($term: String!) {'{'}<br/>{'  search(term: $term) {'}<br/>{'    mongoTime meiliTime'}<br/>{'    mongoResults { id title }'}<br/>{'  }'}<br/>{'}'}</>),
  },
  {
    num: 2, label: 'Apollo Server', colorKey: 'default',
    icon: mkIcon('M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'),
    title: 'Apollo Server', stepTag: 'STEP 02',
    sub: 'GraphQL layer receives and routes the query',
    body: 'Apollo Server validates the query against the schema and invokes the search resolver. Query complexity is checked to prevent abuse. The resolver fans out to both database engines in parallel using Promise.all for minimum total latency.',
    rightContent: codeBox(<><span style={{color:'#5e5e5e'}}>// Parallel execution</span><br/><span style={{color:'var(--teal-2)'}}>const</span> [mongo, meili] = <span style={{color:'#7ec0ff'}}>await</span><br/>{'  Promise.all(['}<br/>{'    mongoSearch(term),'}<br/>{'    meiliSearch(term)'}<br/>{'])'}</>),
  },
  {
    num: 3, label: 'DataLoader', colorKey: 'default',
    icon: mkIcon('M4 7h16M4 12h16M4 17h7'),
    title: 'DataLoader Batching', stepTag: 'STEP 03',
    sub: 'Prevents N+1 query problems with request batching',
    body: 'A DataLoader instance per request batches individual product lookups into single bulk queries. This prevents the N+1 problem where 10 results would cause 10 separate database round-trips. All IDs are collected and fetched in one shot.',
    rightContent: statRow([['Batch size','10 docs','var(--teal-2)'],['Round trips','1 (not 10)','var(--teal-2)'],['Cache scope','Per request','var(--blue-2)']]),
  },
  {
    num: 4, label: 'MongoDB $regex', colorKey: 'amber',
    icon: mkIcon('M20 12V22H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z'),
    title: 'MongoDB $regex', stepTag: 'STEP 04',
    sub: 'Naive full-collection regex scan — O(n) complexity',
    body: 'MongoDB performs a linear scan of every document, testing each field against the regex pattern. With no text index, this scales linearly with collection size. At 1.2M documents this consistently takes 200–400ms.',
    rightContent: statRow([['Complexity','O(n)','var(--coral)'],['Avg latency','312ms','#ff8a5c'],['Fuzzy match','None','#ff8a5c']]),
  },
  {
    num: 5, label: 'Atlas Search', colorKey: 'teal',
    icon: mkIcon('M13 2 4 14h6l-2 8 11-13h-6l2-7z'),
    title: 'Atlas Search (Lucene)', stepTag: 'STEP 05',
    sub: 'Inverted index lookup with BM25 relevance scoring',
    body: 'Atlas Search uses an Apache Lucene inverted index. The query hits a pre-built index mapping tokens to document IDs in O(1) time. BM25 scoring ranks results by relevance. Edit-distance fuzzy matching handles typos at no extra cost.',
    rightContent: statRow([['Complexity','O(1)','var(--teal-2)'],['Avg latency','4ms','var(--teal-2)'],['Fuzzy match','Built-in','var(--teal-2)']]),
  },
  {
    num: 6, label: 'Unified Response', colorKey: 'default',
    icon: mkIcon('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'),
    title: 'Unified Response', stepTag: 'STEP 06',
    sub: 'Both results merged into one GraphQL payload',
    body: 'Apollo Server merges both engine results, timing data, and the computed speed multiplier into a single GraphQL response. The React client receives everything in one round-trip and renders both panels simultaneously.',
    rightContent: codeBox(<>{'{ search: {'}<br/>{'  '}<span style={{color:'var(--amber-2)'}}>mongoTime</span>{': 312,'}<br/>{'  '}<span style={{color:'var(--teal-2)'}}>meiliTime</span>{': 4,'}<br/>{'  '}<span style={{color:'var(--teal-2)'}}>speedMultiplier</span>{': 78,'}<br/>{'  mongoResults: [...10],'}<br/>{'  meiliResults: [...10]'}<br/>{'}}'}  </>),
  },
]

const NODE_CENTERS_PCT = [8.33, 25, 41.67, 58.33, 75, 91.67]

export default function ArchFlow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const segRefs = useRef([])

  useEffect(() => {
    segRefs.current.forEach((seg, i) => {
      if (!seg) return
      if (i < activeIndex - 1) {
        gsap.to(seg, { attr: { stroke: '#1D9E75', strokeWidth: 2 }, duration: 0.4 })
        seg.style.filter = 'drop-shadow(0 0 3px #1D9E75)'
      } else if (i === activeIndex - 1) {
        gsap.to(seg, { attr: { stroke: '#378ADD', strokeWidth: 2.5 }, duration: 0.4 })
        seg.style.filter = 'drop-shadow(0 0 6px #378ADD)'
      } else {
        gsap.to(seg, { attr: { stroke: '#2A2A2A', strokeWidth: 1.5 }, duration: 0.3 })
        seg.style.filter = 'none'
      }
    })
  }, [activeIndex])

  return (
    <div>
      <div
        className="relative rounded-[20px] pt-12 px-7 pb-9 mb-6"
        style={{ background: 'linear-gradient(180deg,#0f0f10,#0b0b0c)', border: '1px solid var(--line)' }}
      >
        <svg
          className="absolute pointer-events-none"
          style={{ left: 0, right: 0, top: '46px', width: '100%', height: '6px', overflow: 'visible' }}
          preserveAspectRatio="none"
          viewBox="0 0 100 6"
        >
          {NODE_CENTERS_PCT.slice(0, -1).map((x1, i) => (
            <line
              key={i}
              ref={el => { segRefs.current[i] = el }}
              x1={x1}
              y1="3"
              x2={NODE_CENTERS_PCT[i + 1]}
              y2="3"
              stroke="#2A2A2A"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div className="grid gap-[14px]" style={{ gridTemplateColumns: 'repeat(6,1fr)' }}>
          {STEPS.map((step, i) => (
            <StepNode
              key={step.num}
              step={step}
              isActive={i === activeIndex}
              isDone={i < activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        <StepNavigation
          activeIndex={activeIndex}
          total={STEPS.length}
          onPrev={() => setActiveIndex(i => Math.max(0, i - 1))}
          onNext={() => setActiveIndex(i => Math.min(STEPS.length - 1, i + 1))}
        />
      </div>

      <StepDetail step={STEPS[activeIndex]} />
    </div>
  )
}
