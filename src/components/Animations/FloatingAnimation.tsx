'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'

interface FloatingAnimationProps {
  children: React.ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
  speed?: 'slow' | 'medium' | 'fast'
  direction?: 'vertical' | 'horizontal' | 'diagonal'
}

export const FloatingAnimation: React.FC<FloatingAnimationProps> = ({
  children,
  className,
  intensity = 'medium',
  speed = 'medium',
  direction = 'vertical',
}) => {
  const getIntensityValues = () => {
    switch (intensity) {
      case 'light':
        return { distance: 5, scale: 1.02 }
      case 'strong':
        return { distance: 15, scale: 1.08 }
      default:
        return { distance: 10, scale: 1.05 }
    }
  }

  const getDuration = () => {
    switch (speed) {
      case 'slow':
        return 4
      case 'fast':
        return 2
      default:
        return 3
    }
  }

  const { distance, scale } = getIntensityValues()
  const duration = getDuration()

  const getAnimateProps = () => {
    switch (direction) {
      case 'horizontal':
        return {
          x: [-distance, distance, -distance],
        }
      case 'diagonal':
        return {
          x: [-distance / 2, distance / 2, -distance / 2],
          y: [-distance / 2, distance / 2, -distance / 2],
        }
      default: // vertical
        return {
          y: [-distance, distance, -distance],
        }
    }
  }

  return (
    <motion.div
      className={cn('cursor-pointer', className)}
      animate={getAnimateProps()}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}
