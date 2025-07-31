'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/utilities/ui'
import type { ParallaxContainerProps } from './types'

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  className,
  speed = 0.5,
  direction = 'up',
}) => {
  const { scrollY } = useScroll()
  const multiplier = speed * 100

  // Create transforms for different directions
  const yTransform = useTransform(
    scrollY,
    [0, 1000],
    direction === 'down' ? [0, multiplier] : [0, -multiplier],
  )

  const xTransform = useTransform(
    scrollY,
    [0, 1000],
    direction === 'right' ? [0, -multiplier] : [0, multiplier],
  )

  const getMotionStyle = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return { x: xTransform }
      default:
        return { y: yTransform }
    }
  }

  return (
    <motion.div className={cn('will-change-transform', className)} style={getMotionStyle()}>
      {children}
    </motion.div>
  )
}
