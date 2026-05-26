'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Active nav link on scroll using IntersectionObserver
    const navLinks = document.querySelectorAll('.nav-link')
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id)
          })
        }
      })
    }, { threshold: 0.4 })

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (!href || !href.startsWith('#')) return
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '80',
      10
    )
    const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: 'smooth' })
    closeMenu()
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={handleNavLinkClick}>
          <div className="logo-wordmark">
            <span className="logo-text">eleven</span><span className="logo-dot">.</span>
          </div>
          <span className="logo-bar"></span>
        </a>
        <ul className={`nav-menu${menuOpen ? ' open' : ''}`} id="navMenu">
          <li><a href="#home" className="nav-link active" onClick={handleNavLinkClick}>Home</a></li>
          <li><a href="#services" className="nav-link" onClick={handleNavLinkClick}>Services</a></li>
          <li><a href="#portfolio" className="nav-link" onClick={handleNavLinkClick}>Case Study</a></li>
          <li><a href="#stories" className="nav-link" onClick={handleNavLinkClick}>Our Stories</a></li>
          <li><a href="#contact" className="nav-link" onClick={handleNavLinkClick}>Contact Us</a></li>
        </ul>
        <a href="#contact" className="btn-nav" onClick={handleNavLinkClick}>Get Started</a>
        <div
          className={`hamburger${menuOpen ? ' open' : ''}`}
          id="hamburger"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}
