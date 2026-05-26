'use client'

import { useEffect, useRef, useState } from 'react'

const slides = [
  {
    text: "Eleven Digital transformed our entire online presence. Their web development team delivered a stunning corporate portal that exceeded our expectations. The project was delivered on time and the quality was outstanding.",
    avatarStyle: { background: 'linear-gradient(135deg, #667eea, #764ba2)' },
    initials: 'RP',
    name: 'Robert Pratama',
    role: 'IT Director, Freeport Indonesia',
  },
  {
    text: "The UI/UX redesign done by Eleven Digital significantly improved our portal's accessibility. User engagement increased by 40% within the first month. Highly professional team with great attention to detail.",
    avatarStyle: { background: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    initials: 'SA',
    name: 'Siti Amalia',
    role: 'Head of Digital, Kementerian Keuangan',
  },
  {
    text: "Our mobile app built by Eleven Digital has streamlined our manufacturing operations dramatically. Real-time tracking and intuitive interface made adoption easy for our entire team. Excellent work!",
    avatarStyle: { background: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    initials: 'BW',
    name: 'Budi Wijaya',
    role: 'Operations Manager, Toyota Manufaktur Indonesia',
  },
  {
    text: "The digital marketing strategy from Eleven Digital boosted our social media following by 300% in just 3 months. Their team understands the Indonesian market and delivered exceptional results for our brand.",
    avatarStyle: { background: 'linear-gradient(135deg, #fa709a, #fee140)' },
    initials: 'DL',
    name: 'Diana Lestari',
    role: 'Marketing Director, Frisian Flag Indonesia',
  },
]

export default function StoriesSection() {
  const [current, setCurrent] = useState(0)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const goTo = (index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length)
  }

  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(next, 5000)
  }

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 5000)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [])

  // Touch swipe
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    let startX = 0
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) {
        if (diff > 0) { next(); resetAutoPlay() }
        else { prev(); resetAutoPlay() }
      }
    }

    wrapper.addEventListener('touchstart', onTouchStart, { passive: true })
    wrapper.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      wrapper.removeEventListener('touchstart', onTouchStart)
      wrapper.removeEventListener('touchend', onTouchEnd)
    }
  })

  // Keyboard support
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { prev(); resetAutoPlay() }
      if (e.key === 'ArrowRight') { next(); resetAutoPlay() }
    }

    wrapper.addEventListener('keydown', onKeyDown)
    return () => wrapper.removeEventListener('keydown', onKeyDown)
  })

  // Scroll reveal
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    if (!revealEls.length) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' })

    revealEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stories" id="stories">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">Our <span className="gradient-text">Stories</span></h2>
          <p className="section-subtitle">What our clients say about working with Eleven Digital Creative.</p>
        </div>
        <div className="testimonials-wrapper reveal" ref={wrapperRef}>
          <div className="testimonials-slider" id="testimonialsSlider">
            {slides.map((slide, i) => (
              <div key={i} className={`testimonial-slide${current === i ? ' active' : ''}`}>
                <div className="testimonial-card">
                  <div className="testimonial-quote">&quot;</div>
                  <p className="testimonial-text">{slide.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar" style={slide.avatarStyle}>
                      <span>{slide.initials}</span>
                    </div>
                    <div className="author-info">
                      <strong>{slide.name}</strong>
                      <span>{slide.role}</span>
                    </div>
                    <div className="testimonial-stars">★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button
              className="slider-btn prev"
              id="sliderPrev"
              aria-label="Previous testimonial"
              onClick={() => { prev(); resetAutoPlay() }}
            >
              &#8592;
            </button>
            <div className="slider-dots" id="sliderDots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`dot${current === i ? ' active' : ''}`}
                  data-index={i}
                  onClick={() => { goTo(i); resetAutoPlay() }}
                ></button>
              ))}
            </div>
            <button
              className="slider-btn next"
              id="sliderNext"
              aria-label="Next testimonial"
              onClick={() => { next(); resetAutoPlay() }}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
