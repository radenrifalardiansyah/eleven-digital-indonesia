'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true)
      document.body.style.overflow = 'auto'
    }, 2200)

    // Fallback
    const fallback = setTimeout(() => {
      setHidden(true)
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <div id="loading-screen" className={`loading-screen${hidden ? ' hidden' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo nav-logo">
          <div className="logo-wordmark">
            <span className="logo-text">eleven</span><span className="logo-dot">.</span>
          </div>
          <span className="logo-bar"></span>
        </div>
        <div className="loading-bar">
          <div className="loading-bar-fill"></div>
        </div>
        <p className="loading-text">Crafting your experience...</p>
      </div>
    </div>
  )
}
