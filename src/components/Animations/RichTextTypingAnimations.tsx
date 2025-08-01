import React, { useEffect, useRef, useState } from 'react'

type RichTextTypingAnimationsProps = {
  content: React.ReactNode
  typingSpeed?: number // ms per character
  className?: string
  startDelay?: number // initial delay before starting animation
  onComplete?: () => void
}

function getTextNodes(node: React.ReactNode): string[] {
  const result: string[] = []
  function traverse(node: React.ReactNode) {
    if (typeof node === 'string') {
      result.push(node)
    } else if (Array.isArray(node)) {
      node.forEach(traverse)
    } else if (
      React.isValidElement<{
        children?: React.ReactNode
      }>(node)
    ) {
      if (node.props && node.props.children) {
        traverse(node.props.children)
      }
    }
  }
  traverse(node)
  return result
}

function splitRichText(node: React.ReactNode, visibleCount: number): React.ReactNode {
  let count = 0
  function traverse(node: React.ReactNode): React.ReactNode {
    if (typeof node === 'string') {
      if (count >= visibleCount) return ''
      const remaining = visibleCount - count
      const toShow = node.slice(0, remaining)
      count += toShow.length
      return toShow
    } else if (Array.isArray(node)) {
      return node.map(traverse)
    } else if (
      React.isValidElement<{
        children?: React.ReactNode
      }>(node)
    ) {
      return React.cloneElement(node, node.props, traverse(node.props.children))
    }
    return null
  }
  return traverse(node)
}

const RichTextTypingAnimations: React.FC<RichTextTypingAnimationsProps> = ({
  content,
  typingSpeed = 40,
  className,
  startDelay = 0,
  onComplete,
}) => {
  const [visibleChars, setVisibleChars] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const textNodes = useRef(getTextNodes(content))
  const totalChars = useRef(textNodes.current.join('').length)

  useEffect(() => {
    setVisibleChars(0)
    setHasStarted(false)
    textNodes.current = getTextNodes(content)
    totalChars.current = textNodes.current.join('').length

    // Start delay
    const startTimeout = setTimeout(() => {
      setHasStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [content, startDelay])

  useEffect(() => {
    if (!hasStarted) return

    let timeout: NodeJS.Timeout
    function type() {
      setVisibleChars((prev) => {
        if (prev < totalChars.current) {
          timeout = setTimeout(type, typingSpeed)
          return prev + 1
        } else {
          // Animation complete
          if (onComplete) {
            setTimeout(onComplete, 500) // Small delay before calling onComplete
          }
          return prev
        }
      })
    }
    type()
    return () => clearTimeout(timeout)
  }, [hasStarted, typingSpeed, onComplete])

  const showCursor = hasStarted && visibleChars < totalChars.current

  return (
    <span className={className} aria-live="polite">
      {splitRichText(content, visibleChars)}
      {showCursor && (
        <span
          className="typing-cursor animate-pulse"
          style={{ display: 'inline-block', width: '1ch' }}
        >
          |
        </span>
      )}
    </span>
  )
}

export default RichTextTypingAnimations
