'use client'

import { useEffect } from 'react'

export default function ServicesSection() {
  useEffect(() => {
    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal')
    if (!revealEls.length) return

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' })

    revealEls.forEach(el => revealObserver.observe(el))

    // Tilt effect
    const cards = document.querySelectorAll<HTMLElement>('[data-tilt]')
    const MAX_TILT = 8

    const handlers: { card: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }[] = []

    cards.forEach(card => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (rect.width / 2)
        const dy = (e.clientY - cy) / (rect.height / 2)
        const tiltX = dy * MAX_TILT
        const tiltY = -dx * MAX_TILT
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`
        card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease'
      }
      const onLeave = () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)'
        card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'
      }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      handlers.push({ card, move: onMove, leave: onLeave })
    })

    return () => {
      revealObserver.disconnect()
      handlers.forEach(({ card, move, leave }) => {
        card.removeEventListener('mousemove', move)
        card.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">What We Do</span>
          <h2 className="section-title">Our <span className="gradient-text">Services</span></h2>
          <p className="section-subtitle">Comprehensive digital solutions tailored to elevate your brand and drive measurable business results.</p>
        </div>
        <div className="services-grid">
          <div className="service-card reveal delay-1" data-tilt="">
            <div className="service-icon-wrap">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                </svg>
              </div>
              <div className="icon-glow"></div>
            </div>
            <h3>Web Development</h3>
            <p>Custom, high-performance websites and web applications built with modern technologies for seamless user experiences.</p>
            <ul className="service-features">
              <li>Company Profile</li>
              <li>E-Commerce</li>
              <li>ERP System</li>
              <li>Reservation System</li>
            </ul>
            <a href="#contact" className="service-link">Learn More <span>→</span></a>
            <div className="card-border-glow"></div>
          </div>

          <div className="service-card reveal delay-2" data-tilt="">
            <div className="service-icon-wrap">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 6.364 2.636M12 21a9 9 0 0 1-6.364-2.636M3 12h18"/>
                </svg>
              </div>
              <div className="icon-glow"></div>
            </div>
            <h3>Graphic Design</h3>
            <p>Stunning visual identities and creative assets that communicate your brand&apos;s essence and captivate your audience.</p>
            <ul className="service-features">
              <li>Branding Design</li>
              <li>Wedding Invitation</li>
              <li>Name Card</li>
              <li>Poster &amp; Banner</li>
            </ul>
            <a href="#contact" className="service-link">Learn More <span>→</span></a>
            <div className="card-border-glow"></div>
          </div>

          <div className="service-card reveal delay-3" data-tilt="">
            <div className="service-icon-wrap">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 18h.01"/>
                </svg>
              </div>
              <div className="icon-glow"></div>
            </div>
            <h3>Mobile Applications</h3>
            <p>Native and cross-platform mobile apps that deliver exceptional performance and intuitive user experiences across devices.</p>
            <ul className="service-features">
              <li>iOS Development</li>
              <li>Android Development</li>
              <li>Cross-Platform</li>
              <li>App Maintenance</li>
            </ul>
            <a href="#contact" className="service-link">Learn More <span>→</span></a>
            <div className="card-border-glow"></div>
          </div>

          <div className="service-card reveal delay-4" data-tilt="">
            <div className="service-icon-wrap">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <div className="icon-glow"></div>
            </div>
            <h3>UI/UX Design</h3>
            <p>Research-driven design processes that create intuitive interfaces, delightful interactions, and meaningful user journeys.</p>
            <ul className="service-features">
              <li>User Research</li>
              <li>Wireframing</li>
              <li>Prototyping</li>
              <li>Usability Testing</li>
            </ul>
            <a href="#contact" className="service-link">Learn More <span>→</span></a>
            <div className="card-border-glow"></div>
          </div>

          <div className="service-card reveal delay-5" data-tilt="">
            <div className="service-icon-wrap">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div className="icon-glow"></div>
            </div>
            <h3>Social Media</h3>
            <p>Strategic social media management that builds community, increases engagement, and amplifies your brand voice.</p>
            <ul className="service-features">
              <li>Content Strategy</li>
              <li>Community Management</li>
              <li>Social Analytics</li>
              <li>Influencer Marketing</li>
            </ul>
            <a href="#contact" className="service-link">Learn More <span>→</span></a>
            <div className="card-border-glow"></div>
          </div>

          <div className="service-card reveal delay-6" data-tilt="">
            <div className="service-icon-wrap">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                </svg>
              </div>
              <div className="icon-glow"></div>
            </div>
            <h3>Digital Marketing</h3>
            <p>Data-driven digital marketing strategies that drive traffic, generate leads, and maximize your return on investment.</p>
            <ul className="service-features">
              <li>Social Media Strategy</li>
              <li>SEO Optimization</li>
              <li>Advertising Banner</li>
              <li>Copywriting</li>
            </ul>
            <a href="#contact" className="service-link">Learn More <span>→</span></a>
            <div className="card-border-glow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
