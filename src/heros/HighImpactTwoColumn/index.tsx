'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  RichTextTypingAnimations,
  ScrollReveal,
  FloatingAnimation,
} from '@/components/Animations'
import { motion } from 'motion/react'

export const HighImpactTwoColumn: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  mediaTwo,
  enableAnimation,
  'text-animation': textAnimation,
  'image-animation': imageAnimation,
  'card-animation': cardAnimation,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [headerHeight, setHeaderHeight] = useState<string>('10.4rem')

  useEffect(() => {
    setHeaderTheme('dark')
  })

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.getElementById('header')
      if (header) {
        const height = window.getComputedStyle(header).height
        setHeaderHeight(`${Number.parseFloat(height) + 64}px`)
      }
    }

    updateHeaderHeight()

    const observer = new MutationObserver(updateHeaderHeight)
    const header = document.getElementById('header')
    if (header) {
      observer.observe(header, { attributes: true, childList: true, subtree: true })
    }

    return () => {
      observer.disconnect()
    }
  }, [setHeaderHeight])

  const AnimationWrapper: React.FC<{
    children: React.ReactNode
    delayMultiplier?: number
    animationType?: 'text' | 'image' | 'card'
  }> = ({ children, delayMultiplier = 1, animationType = 'text' }) => {
    if (!enableAnimation) {
      return <>{children}</>
    }

    const getAnimationConfig = () => {
      switch (animationType) {
        case 'image':
          return imageAnimation
        case 'card':
          return cardAnimation
        case 'text':
        default:
          return textAnimation
      }
    }

    const animationConfig = getAnimationConfig()
    if (!animationConfig) {
      return <>{children}</>
    }

    const currentAnimationType = (() => {
      if (animationType === 'image' && imageAnimation) {
        return imageAnimation['image-animation']
      }
      if (animationType === 'card' && cardAnimation) {
        return cardAnimation['card-animation']
      }
      if (textAnimation) {
        return textAnimation['text-animation']
      }
      return null
    })()

    const duration = (() => {
      if (animationType === 'image' && imageAnimation) {
        return imageAnimation['image-animation-duration'] || 600
      }
      if (animationType === 'card' && cardAnimation) {
        return cardAnimation['card-animation-duration'] || 600
      }
      if (textAnimation) {
        return textAnimation['text-animation-duration'] || 600
      }
      return 600
    })()

    const baseDelay = (() => {
      if (animationType === 'image' && imageAnimation) {
        return imageAnimation['image-animation-delay'] || 0
      }
      if (animationType === 'card' && cardAnimation) {
        return cardAnimation['card-animation-delay'] || 0
      }
      if (textAnimation) {
        return textAnimation['text-animation-delay'] || 0
      }
      return 0
    })()

    const delay = baseDelay + delayMultiplier * 200

    switch (currentAnimationType) {
      case 'fade-in':
        return (
          <FadeIn duration={duration / 1000} delay={delay}>
            {children}
          </FadeIn>
        )
      case 'slide-in':
        return (
          <SlideIn direction="up" duration={duration / 1000} delay={delay}>
            {children}
          </SlideIn>
        )
      case 'zoom-in':
        return (
          <ScaleIn duration={duration / 1000} delay={delay}>
            {children}
          </ScaleIn>
        )
      case 'bounce':
        return (
          <SlideIn direction="down" duration={duration / 1000} delay={delay} distance={100}>
            {children}
          </SlideIn>
        )
      default:
        return <>{children}</>
    }
  }

  const renderRichTextWithAnimation = () => {
    if (!enableAnimation || !textAnimation || !richText) {
      return richText && <RichText className="mb-6" data={richText} enableGutter={false} />
    }

    const animationType = textAnimation['text-animation']

    if (animationType === 'typewriter') {
      const speed = textAnimation['text-animation-duration']
        ? Math.max(20, textAnimation['text-animation-duration'] / 10)
        : 40
      const delay = textAnimation['text-animation-delay'] || 0

      return (
        <div className="mb-6">
          <RichTextTypingAnimations
            content={<RichText data={richText} enableGutter={false} />}
            typingSpeed={speed}
            startDelay={delay}
          />
        </div>
      )
    }

    const duration = textAnimation['text-animation-duration'] || 600
    const delay = textAnimation['text-animation-delay'] || 0

    const getAnimationProps = () => {
      switch (animationType) {
        case 'fade-in':
          return {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: duration / 1000, delay: delay / 1000 },
          }
        case 'slide-in':
          return {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: duration / 1000, delay: delay / 1000 },
          }
        case 'zoom-in':
          return {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: duration / 1000, delay: delay / 1000 },
          }
        case 'bounce':
          return {
            initial: { opacity: 0, y: -100 },
            animate: { opacity: 1, y: 0 },
            transition: {
              duration: duration / 1000,
              delay: delay / 1000,
              type: 'spring' as const,
              bounce: 0.4,
            },
          }
        default:
          return {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: duration / 1000, delay: delay / 1000 },
          }
      }
    }

    const MotionDiv = motion.div

    return (
      <MotionDiv className="mb-6" {...getAnimationProps()}>
        <RichText data={richText} enableGutter={false} />
      </MotionDiv>
    )
  }

  return (
    <div
      className="relative flex items-center justify-center text-foreground pt-16 lg:pt-0 md:pt-40"
      data-theme="dark"
      style={{ marginTop: `-${headerHeight}` }}
    >
      <section className="container mb-8 z-10 relative grid gap-8 xl:gap-0 lg:grid-cols-12">
        <ScrollReveal
          className="me-auto place-self-center lg:col-span-7 w-full block"
          threshold={0.1}
          triggerOnce
        >
          {renderRichTextWithAnimation()}
          {Array.isArray(links) && links.length > 0 && (
            <StaggerContainer className="flex gap-4" staggerDelay={0.1}>
              {links.map(({ link }, i) => {
                return (
                  <AnimationWrapper key={i} delayMultiplier={i + 1} animationType="card">
                    <li className="max-sm:basis-full list-none">
                      <CMSLink {...link} className="w-full" />
                    </li>
                  </AnimationWrapper>
                )
              })}
            </StaggerContainer>
          )}
        </ScrollReveal>

        {mediaTwo && typeof mediaTwo === 'object' && (
          <ScrollReveal className="lg:col-span-5 block" threshold={0.1} triggerOnce>
            <FloatingAnimation intensity="light" speed="slow">
              <AnimationWrapper delayMultiplier={2} animationType="image">
                <div>
                  <Media resource={mediaTwo} />
                </div>
              </AnimationWrapper>
            </FloatingAnimation>
          </ScrollReveal>
        )}
      </section>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="-z-10 object-cover"
            videoClassName="absolute inset-0 -z-10 h-full w-full object-cover"
            priority
            resource={media}
          />
        )}
      </div>
    </div>
  )
}
