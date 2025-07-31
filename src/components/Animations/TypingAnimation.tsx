'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/utilities/ui'
import type { TypingAnimationProps } from './types'

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  speed = 50,
  className,
  onComplete,
  cursor = true,
  cursorChar = '|',
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  useEffect(() => {
    if (cursor && currentIndex < text.length) {
      const cursorTimer = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)

      return () => clearInterval(cursorTimer)
    } else {
      setShowCursor(false)
    }
  }, [currentIndex, cursor, text.length])

  return (
    <span className={cn('inline-block', className)}>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {displayText}
      </motion.span>
      {cursor && (
        <AnimatePresence>
          {showCursor && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="inline-block ml-0.5"
            >
              {cursorChar}
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </span>
  )
}
