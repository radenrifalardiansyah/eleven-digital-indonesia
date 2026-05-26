'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return
    setIsDesktop(true)

    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let mouseX = 0, mouseY = 0
    let outX = 0, outY = 0
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    function animateOutline() {
      outX += (mouseX - outX) * 0.12
      outY += (mouseY - outY) * 0.12
      if (outline) {
        outline.style.left = outX + 'px'
        outline.style.top = outY + 'px'
      }
      rafId = requestAnimationFrame(animateOutline)
    }
    animateOutline()

    document.addEventListener('mousemove', handleMouseMove)

    const handleMouseLeave = () => {
      dot.style.opacity = '0'
      outline.style.opacity = '0'
    }
    const handleMouseEnter = () => {
      dot.style.opacity = '1'
      outline.style.opacity = '1'
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Hover state on interactive elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, .service-card, .portfolio-item, .filter-btn, .slider-btn, .dot, input, textarea, select'
      )
      targets.forEach(el => {
        el.addEventListener('mouseenter', () => outline.classList.add('hover-state'))
        el.addEventListener('mouseleave', () => outline.classList.remove('hover-state'))
      })
    }
    addHoverListeners()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!isDesktop) return null

  return (
    <>
      <div className="cursor-dot" id="cursorDot" ref={dotRef}></div>
      <div className="cursor-outline" id="cursorOutline" ref={outlineRef}></div>
    </>
  )
}
