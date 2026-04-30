'use client'

import { useState, useCallback } from 'react'
import { useLazyQuery } from '@apollo/client/react'
import { SEARCH_QUERY } from '../lib/queries'

const RESULT_LIMIT = 10

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const [runSearch, { data, loading, error }] = useLazyQuery(SEARCH_QUERY)

  const triggerSearch = useCallback((term) => {
    const trimmed = term.trim()
    if (!trimmed || trimmed.length < 2) return
    setHasSearched(true)
    runSearch({ variables: { term: trimmed, limit: RESULT_LIMIT } })
  }, [runSearch])

  const mongoResults = data?.search?.mongoResults ?? []
  const meiliResults = data?.search?.meiliResults ?? []
  const mongoTime = data?.search?.mongoTime ?? null
  const meiliTime = data?.search?.meiliTime ?? null
  const speedMultiplier = data?.search?.speedMultiplier ?? null

  return {
    searchTerm,
    setSearchTerm,
    triggerSearch,
    loading,
    error,
    hasSearched,
    mongoResults,
    meiliResults,
    mongoTime,
    meiliTime,
    speedMultiplier,
  }
}
