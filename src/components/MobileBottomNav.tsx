'use client'

import { useEffect, useState } from 'react'

const sections = ['home', 'services', 'portfolio', 'stories', 'contact']

export default function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.3 })

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    const offset = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '60',
      10
    )
    window.scrollTo({ top: (target as HTMLElement).offsetTop - offset, behavior: 'smooth' })
  }

  return (
    <nav className="mobile-bottom-nav" id="mobileBottomNav" aria-label="Mobile navigation">
      <a
        href="#home"
        className={`mob-nav-item${activeSection === 'home' ? ' active' : ''}`}
        data-section="home"
        onClick={e => handleClick(e, '#home')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
        <span>Home</span>
      </a>
      <a
        href="#services"
        className={`mob-nav-item${activeSection === 'services' ? ' active' : ''}`}
        data-section="services"
        onClick={e => handleClick(e, '#services')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <rect x="2" y="3" width="6" height="6" rx="1"/><rect x="9" y="3" width="6" height="6" rx="1"/><rect x="16" y="3" width="6" height="6" rx="1"/><rect x="2" y="10" width="6" height="6" rx="1"/><rect x="9" y="10" width="6" height="6" rx="1"/><rect x="16" y="10" width="6" height="6" rx="1"/>
        </svg>
        <span>Services</span>
      </a>
      <a
        href="#portfolio"
        className={`mob-nav-item mob-nav-center${activeSection === 'portfolio' ? ' active' : ''}`}
        data-section="portfolio"
        onClick={e => handleClick(e, '#portfolio')}
      >
        <div className="mob-nav-center-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            <rect x="2" y="2" width="20" height="20" rx="3"/><path d="M2 9h20"/>
          </svg>
        </div>
        <span>Portfolio</span>
      </a>
      <a
        href="#stories"
        className={`mob-nav-item${activeSection === 'stories' ? ' active' : ''}`}
        data-section="stories"
        onClick={e => handleClick(e, '#stories')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span>Stories</span>
      </a>
      <a
        href="#contact"
        className={`mob-nav-item${activeSection === 'contact' ? ' active' : ''}`}
        data-section="contact"
        onClick={e => handleClick(e, '#contact')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.63 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 14 15.91l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span>Contact</span>
      </a>
    </nav>
  )
}
