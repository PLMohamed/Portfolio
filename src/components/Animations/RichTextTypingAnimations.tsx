import React, { useEffect, useRef, useState } from 'react'

type RichTextTypingAnimationsProps = {
  content: React.ReactNode
  typingSpeed?: number // ms per character
  className?: string
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
}) => {
  const [visibleChars, setVisibleChars] = useState(0)
  const textNodes = useRef(getTextNodes(content))
  const totalChars = useRef(textNodes.current.join('').length)

  useEffect(() => {
    setVisibleChars(0)
    textNodes.current = getTextNodes(content)
    totalChars.current = textNodes.current.join('').length
    let timeout: NodeJS.Timeout
    function type() {
      setVisibleChars((prev) => {
        if (prev < totalChars.current) {
          timeout = setTimeout(type, typingSpeed)
          return prev + 1
        }
        return prev
      })
    }
    type()
    return () => clearTimeout(timeout)
  }, [content, typingSpeed])

  return (
    <span className={className} aria-live="polite">
      {splitRichText(content, visibleChars)}
      <span className="typing-cursor" style={{ display: 'inline-block', width: '1ch' }}>
        |
      </span>
    </span>
  )
}

export default RichTextTypingAnimations
