'use client'

import { useEffect, useState } from 'react'

const portfolioItems = [
  {
    category: 'web',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    placeholder: 'Freeport Indonesia',
    tag: 'Web Development',
    title: 'Freeport Indonesia',
    desc: 'Corporate portal with ERP integration and real-time dashboard analytics system.',
    delayClass: '',
  },
  {
    category: 'design',
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    placeholder: 'Kementerian Keuangan',
    tag: 'UI/UX Design',
    title: 'Kementerian Keuangan',
    desc: 'Redesigned government financial portal with improved accessibility and user experience.',
    delayClass: 'delay-1',
  },
  {
    category: 'web',
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>
      </svg>
    ),
    placeholder: 'Kementerian PUPR',
    tag: 'Web Development',
    title: 'Kementerian PUPR',
    desc: 'Infrastructure project management system with geospatial mapping integration.',
    delayClass: 'delay-2',
  },
  {
    category: 'mobile',
    bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
        <rect x="7" y="2" width="10" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
    placeholder: 'Toyota Manufaktur',
    tag: 'Mobile App',
    title: 'Toyota Manufaktur Indonesia',
    desc: 'Internal manufacturing operations tracker app for quality control and inventory management.',
    delayClass: 'delay-3',
  },
  {
    category: 'marketing',
    bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
      </svg>
    ),
    placeholder: 'Frisian Flag',
    tag: 'Digital Marketing',
    title: 'Frisian Flag Indonesia',
    desc: 'Integrated digital marketing campaign with social media strategy and SEO optimization.',
    delayClass: 'delay-4',
  },
  {
    category: 'design',
    bg: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
        <circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 6.364 2.636"/>
      </svg>
    ),
    placeholder: 'Kawasaki Ninja',
    tag: 'Branding & Design',
    title: 'Kawasaki Ninja',
    desc: 'Complete brand identity redesign and promotional materials for the Indonesian market.',
    delayClass: 'delay-5',
  },
]

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all')

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
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Our Work</span>
          <h2 className="section-title">Case <span className="gradient-text">Study</span></h2>
          <p className="section-subtitle">A showcase of our best work delivered for industry-leading clients across Indonesia.</p>
        </div>
        <div className="portfolio-filters reveal">
          {['all', 'web', 'design', 'mobile', 'marketing'].map(filter => (
            <button
              key={filter}
              className={`filter-btn${activeFilter === filter ? ' active' : ''}`}
              data-filter={filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'all' ? 'All Projects' : filter === 'web' ? 'Web Dev' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <div className="portfolio-grid" id="portfolioGrid">
          {portfolioItems.map((item, idx) => (
            <div
              key={idx}
              className={`portfolio-item reveal${item.delayClass ? ' ' + item.delayClass : ''}${activeFilter !== 'all' && activeFilter !== item.category ? ' hidden' : ''}`}
              data-category={item.category}
            >
              <div className="portfolio-inner">
                <div className="portfolio-img" style={{ background: item.bg }}>
                  <div className="portfolio-placeholder">
                    {item.icon}
                    <span>{item.placeholder}</span>
                  </div>
                </div>
                <div className="portfolio-overlay">
                  <div className="portfolio-info">
                    <span className="portfolio-tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <a href="#" className="portfolio-cta">View Project →</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
