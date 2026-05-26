'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    // Build cursor trail dots
    const TRAIL_COUNT = 8
    const trail: { el: HTMLDivElement; x: number; y: number }[] = []
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement('div')
      const size = 7 - i * 0.6
      const opacity = 0.5 - i * 0.05
      el.style.cssText = `
        position:fixed;width:${size}px;height:${size}px;
        border-radius:50%;pointer-events:none;z-index:9998;
        transform:translate(-50%,-50%);
        background:rgba(0,83,255,${opacity});
        transition:opacity 0.3s;will-change:left,top;
      `
      document.body.appendChild(el)
      trail.push({ el, x: 0, y: 0 })
      trailRef.current.push(el)
    }

    let mouseX = 0, mouseY = 0
    let outX = 0, outY = 0
    let rafId: number
    let visible = false

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        outline.style.opacity = '1'
      }
    }

    function animate() {
      // Smooth outline follow
      outX += (mouseX - outX) * 0.14
      outY += (mouseY - outY) * 0.14
      if (outline) {
        outline.style.left = outX + 'px'
        outline.style.top = outY + 'px'
      }

      // Trail follow chain
      let lx = mouseX, ly = mouseY
      trail.forEach((t, i) => {
        const speed = 0.22 - i * 0.015
        t.x += (lx - t.x) * speed
        t.y += (ly - t.y) * speed
        t.el.style.left = t.x + 'px'
        t.el.style.top = t.y + 'px'
        lx = t.x
        ly = t.y
      })

      rafId = requestAnimationFrame(animate)
    }
    animate()

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0'
      outline.style.opacity = '0'
      trail.forEach(t => { t.el.style.opacity = '0' })
    })
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1'
      outline.style.opacity = '1'
      trail.forEach(t => { t.el.style.opacity = '1' })
    })

    // Hover expand on interactive elements
    const onEnterHover = () => outline.classList.add('hover-state')
    const onLeaveHover = () => outline.classList.remove('hover-state')

    const addHovers = () => {
      document.querySelectorAll(
        'a, button, .service-card, .portfolio-item, .filter-btn, .slider-btn, .dot, input, textarea, select'
      ).forEach(el => {
        el.addEventListener('mouseenter', onEnterHover)
        el.addEventListener('mouseleave', onLeaveHover)
      })
    }
    addHovers()
    // Re-run after a tick so dynamic elements (e.g. portfolio filter) are caught
    const t = setTimeout(addHovers, 1000)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t)
      document.removeEventListener('mousemove', onMove)
      trail.forEach(t => t.el.remove())
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0, transition: 'opacity 0.2s' }}
      />
      <div
        ref={outlineRef}
        className="cursor-outline"
        style={{ opacity: 0, transition: 'opacity 0.2s, width 0.3s, height 0.3s, background 0.3s' }}
      />
    </>
  )
}
