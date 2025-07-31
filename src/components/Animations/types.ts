import { Variants } from 'motion/react'

export interface AnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  variants?: Variants
}

export interface ScrollRevealProps extends AnimationProps {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

export interface SlideInProps extends AnimationProps {
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export interface TypingAnimationProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
  cursor?: boolean
  cursorChar?: string
}

export interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
  variants?: Variants
}

export interface ParallaxContainerProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}
