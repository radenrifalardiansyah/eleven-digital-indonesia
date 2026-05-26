'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const [typingText, setTypingText] = useState('')
  const [counts, setCounts] = useState({ c0: 0, c1: 0, c2: 0, c3: 0 })
  const countedRef = useRef(false)

  // Particle system
  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctx = canvasEl.getContext('2d')
    if (!ctx) return
    const canvas = canvasEl

    let W = 0, H = 0
    let particles: Particle[] = []
    let mouseX = 0, mouseY = 0
    const PARTICLE_COUNT = 120
    const CONNECTION_DIST = 130
    let animId: number

    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    class Particle {
      x: number = 0
      y: number = 0
      vx: number = 0
      vy: number = 0
      r: number = 0
      alpha: number = 0
      hue: number = 0
      isWhite: boolean = true

      constructor() { this.reset() }

      reset() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.r = Math.random() * 2 + 0.5
        this.alpha = Math.random() * 0.6 + 0.2
        const hues = [210, 220, 0, 0, 0]
        this.hue = hues[Math.floor(Math.random() * hues.length)]
        this.isWhite = Math.random() > 0.3
      }

      update() {
        const dx = this.x - mouseX
        const dy = this.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80) {
          const force = (80 - dist) / 80
          this.vx += (dx / dist) * force * 0.6
          this.vy += (dy / dist) * force * 0.6
        }
        this.vx *= 0.98
        this.vy *= 0.98
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0) this.x = W
        if (this.x > W) this.x = 0
        if (this.y < 0) this.y = H
        if (this.y > H) this.y = 0
      }

      draw() {
        ctx!.save()
        ctx!.globalAlpha = this.alpha
        ctx!.fillStyle = this.isWhite ? 'rgba(255,255,255,0.9)' : `hsl(${this.hue}, 100%, 85%)`
        ctx!.shadowColor = this.isWhite ? 'rgba(255,255,255,0.5)' : `hsl(${this.hue}, 100%, 80%)`
        ctx!.shadowBlur = 6
        ctx!.beginPath()
        ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.restore()
      }
    }

    function createParticles() {
      particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle())
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.25
            ctx!.save()
            ctx!.globalAlpha = alpha
            ctx!.strokeStyle = 'rgba(255,255,255,0.6)'
            ctx!.lineWidth = 0.5
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
            ctx!.restore()
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, W, H)
      drawConnections()
      particles.forEach(p => { p.update(); p.draw() })
      animId = requestAnimationFrame(animate)
    }

    const handleResize = () => { resize(); createParticles() }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    resize()
    createParticles()
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  // Typing animation
  useEffect(() => {
    const words = ['Digital', 'Innovative', 'Disruptive', 'Transformative']
    let wordIdx = 0
    let charIdx = 0
    let deleting = false
    let timeoutId: ReturnType<typeof setTimeout>

    function type() {
      const current = words[wordIdx]
      if (deleting) {
        setTypingText(current.substring(0, charIdx - 1))
        charIdx--
      } else {
        setTypingText(current.substring(0, charIdx + 1))
        charIdx++
      }
      let delay = deleting ? 60 : 120
      if (!deleting && charIdx === current.length) {
        delay = 2000
        deleting = true
      } else if (deleting && charIdx === 0) {
        deleting = false
        wordIdx = (wordIdx + 1) % words.length
        delay = 400
      }
      timeoutId = setTimeout(type, delay)
    }

    const startTimer = setTimeout(type, 2400)
    return () => {
      clearTimeout(startTimer)
      clearTimeout(timeoutId)
    }
  }, [])

  // Counter animation
  useEffect(() => {
    const statsSection = document.querySelector('.hero-stats')
    if (!statsSection) return

    function easeOutQuad(t: number) { return t * (2 - t) }

    function animateCounter(targetKey: 'c0' | 'c1' | 'c2' | 'c3', target: number) {
      const duration = 2000
      const start = performance.now()
      function update(now: number) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeOutQuad(progress)
        setCounts(prev => ({ ...prev, [targetKey]: Math.floor(eased * target) }))
        if (progress < 1) requestAnimationFrame(update)
        else setCounts(prev => ({ ...prev, [targetKey]: target }))
      }
      requestAnimationFrame(update)
    }

    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countedRef.current) {
        countedRef.current = true
        animateCounter('c0', 5)
        animateCounter('c1', 100)
        animateCounter('c2', 50)
        animateCounter('c3', 20)
      }
    }, { threshold: 0.5 })

    obs.observe(statsSection)
    return () => obs.disconnect()
  }, [])

  // Floating card parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.floating-card')
      if (!cards.length) return
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      cards.forEach((card, i) => {
        const factor = (i + 1) * 8
        card.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Parallax on scroll
  useEffect(() => {
    const heroContent = heroContentRef.current
    if (!heroContent) return

    const handleScroll = () => {
      const y = window.scrollY
      if (y < window.innerHeight) {
        heroContent.style.transform = `translateY(${y * 0.25}px)`
        heroContent.style.opacity = String(1 - y / (window.innerHeight * 0.85))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gradient shift on scroll
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero')
    if (!hero) return

    const handleScroll = () => {
      const scrollRatio = Math.min(window.scrollY / window.innerHeight, 1)
      hero.style.filter = `brightness(${1 - scrollRatio * 0.3})`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero" id="home">
      <canvas id="particleCanvas" ref={canvasRef}></canvas>
      <div className="hero-content animate-fade-up" ref={heroContentRef}>
        <div className="hero-badge animate-fade-up">
          <span className="badge-dot"></span>
          <span>Digital Agency in West Jakarta</span>
        </div>
        <h1 className="hero-title animate-fade-up delay-1">
          <span className="title-line">Creative</span>
          <span className="title-line gradient-text" id="typingText">{typingText}</span>
          <span className="title-line">Solutions</span>
        </h1>
        <p className="hero-tagline animate-fade-up delay-2">
          We create on transformation <strong>disruptive solution</strong> for your business growth in the digital era.
        </p>
        <div className="hero-cta animate-fade-up delay-3">
          <a href="#services" className="btn-primary">Explore Services <span className="btn-arrow">→</span></a>
          <a href="#portfolio" className="btn-secondary">View Our Work</a>
        </div>
        <div className="hero-stats animate-fade-up delay-4">
          <div className="stat-item">
            <span className="stat-num" data-target="5">{counts.c0}</span><span className="stat-suffix">+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-num" data-target="100">{counts.c1}</span><span className="stat-suffix">+</span>
            <span className="stat-label">Projects Done</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-num" data-target="50">{counts.c2}</span><span className="stat-suffix">+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-num" data-target="20">{counts.c3}</span><span className="stat-suffix">+</span>
            <span className="stat-label">Team Members</span>
          </div>
        </div>
      </div>
      <div className="hero-floating-elements">
        <div className="floating-card card-1">
          <div className="float-icon">&#x1F4BB;</div>
          <span>Web Dev</span>
        </div>
        <div className="floating-card card-2">
          <div className="float-icon">&#x1F3A8;</div>
          <span>UI/UX Design</span>
        </div>
        <div className="floating-card card-3">
          <div className="float-icon">&#x1F4F1;</div>
          <span>Mobile Apps</span>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </section>
  )
}
