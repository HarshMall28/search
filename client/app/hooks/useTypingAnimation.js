import { useState, useEffect, useRef } from 'react'

const PHRASES = [
  'Search that actually understands you.',
  'Fuzzy matching. Zero tolerance for slow.',
  'From regex to relevance. Watch the difference.',
  'Index-first. Always.',
  '71× faster. No compromises.',
]

const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_AFTER_TYPE = 2500
const PAUSE_AFTER_DELETE = 600

export function useTypingAnimation() {
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone] = useState(false)

  const phraseIndex = useRef(0)
  const isDeleting = useRef(false)
  const currentText = useRef('')
  const timeoutRef = useRef(null)

  useEffect(() => {
    function tick() {
      const phrase = PHRASES[phraseIndex.current]

      if (!isDeleting.current) {
        const next = phrase.slice(0, currentText.current.length + 1)
        currentText.current = next
        setDisplayText(next)

        if (next === phrase) {
          setIsDone(true)
          timeoutRef.current = setTimeout(() => {
            setIsDone(false)
            isDeleting.current = true
            tick()
          }, PAUSE_AFTER_TYPE)
        } else {
          timeoutRef.current = setTimeout(tick, TYPE_SPEED)
        }
      } else {
        const next = currentText.current.slice(0, -1)
        currentText.current = next
        setDisplayText(next)

        if (next === '') {
          isDeleting.current = false
          phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE)
        } else {
          timeoutRef.current = setTimeout(tick, DELETE_SPEED)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, TYPE_SPEED)
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return { displayText, isTyping: !isDeleting.current && !isDone, isDone }
}
