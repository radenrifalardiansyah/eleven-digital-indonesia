'use client'

import { useEffect } from 'react'

export default function WhyUsSection() {
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

    // Satisfaction bar animation
    const mainCard = document.querySelector('.main-card')
    const fill = mainCard?.querySelector<HTMLElement>('.satisfaction-fill')

    if (mainCard && fill) {
      const barObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => { fill.style.width = '98%' }, 300)
          fill.classList.add('animate')
          barObs.disconnect()
        }
      }, { threshold: 0.5 })

      barObs.observe(mainCard)
      return () => {
        revealObserver.disconnect()
        barObs.disconnect()
      }
    }

    return () => revealObserver.disconnect()
  }, [])

  return (
    <section className="why-us">
      <div className="container">
        <div className="why-us-grid">
          <div className="why-us-content reveal">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Built for <span className="gradient-text">Results</span></h2>
            <p>We combine creative excellence with technical mastery to deliver digital solutions that don&apos;t just look great — they perform exceptionally and drive real business impact.</p>
            <div className="why-points">
              <div className="why-point">
                <div className="point-icon">&#10003;</div>
                <div>
                  <strong>Strategic Approach</strong>
                  <p>Every project starts with deep research and strategic planning aligned with your business goals.</p>
                </div>
              </div>
              <div className="why-point">
                <div className="point-icon">&#10003;</div>
                <div>
                  <strong>Expert Team</strong>
                  <p>20+ skilled professionals spanning design, development, and digital marketing disciplines.</p>
                </div>
              </div>
              <div className="why-point">
                <div className="point-icon">&#10003;</div>
                <div>
                  <strong>Proven Track Record</strong>
                  <p>100+ successful projects delivered for clients from government institutions to multinational corporations.</p>
                </div>
              </div>
              <div className="why-point">
                <div className="point-icon">&#10003;</div>
                <div>
                  <strong>Ongoing Support</strong>
                  <p>We don&apos;t just deliver and disappear. We provide continuous support to ensure your success.</p>
                </div>
              </div>
            </div>
            <a href="#contact" className="btn-primary">Start Your Project →</a>
          </div>
          <div className="why-us-visual reveal delay-2">
            <div className="visual-card main-card">
              <div className="visual-icon">&#x1F3AF;</div>
              <h4>100% Client Satisfaction</h4>
              <p>We deliver quality that speaks for itself</p>
              <div className="satisfaction-bar">
                <div className="satisfaction-fill" style={{ width: '0%' }}></div>
              </div>
              <span className="satisfaction-percent">98%</span>
            </div>
            <div className="visual-card secondary-card card-top">
              <div className="visual-icon">&#x26A1;</div>
              <h4>Fast Delivery</h4>
              <p>On-time project completion</p>
            </div>
            <div className="visual-card secondary-card card-bottom">
              <div className="visual-icon">&#x1F4CA;</div>
              <h4>Data-Driven</h4>
              <p>Analytics-backed decisions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
