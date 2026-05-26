export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-gradient-divider"></div>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="nav-logo">
              <div className="logo-wordmark">
                <span className="logo-text">eleven</span><span className="logo-dot">.</span>
              </div>
              <span className="logo-bar"></span>
            </a>
            <p>We create on transformation disruptive solution for your business growth. A premium digital agency based in West Jakarta, Indonesia.</p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Web Development</h4>
            <ul>
              <li><a href="#">Company Profile</a></li>
              <li><a href="#">E-Commerce</a></li>
              <li><a href="#">ERP System</a></li>
              <li><a href="#">Reservation System</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Graphic Design</h4>
            <ul>
              <li><a href="#">Branding Design</a></li>
              <li><a href="#">Wedding Invitation</a></li>
              <li><a href="#">Name Card</a></li>
              <li><a href="#">Poster &amp; Banner Design</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Digital Marketing</h4>
            <ul>
              <li><a href="#">Social Media Strategy</a></li>
              <li><a href="#">SEO Optimization</a></li>
              <li><a href="#">Advertising Banner</a></li>
              <li><a href="#">Copywriting</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Eleven Digital Creative. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
