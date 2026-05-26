export default function ClientsSection() {
  return (
    <section className="clients-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Trusted By</span>
          <h2 className="section-title">Our <span className="gradient-text">Clients</span></h2>
        </div>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          <div className="marquee-item">
            <div className="client-logo-card"><span>Freeport</span><small>Indonesia</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Kementerian</span><small>Keuangan</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Kementerian</span><small>PUPR</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Toyota</span><small>Manufaktur Indonesia</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Frisian</span><small>Flag</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Kawasaki</span><small>Ninja</small></div>
          </div>
          {/* Duplicate for seamless loop */}
          <div className="marquee-item">
            <div className="client-logo-card"><span>Freeport</span><small>Indonesia</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Kementerian</span><small>Keuangan</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Kementerian</span><small>PUPR</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Toyota</span><small>Manufaktur Indonesia</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Frisian</span><small>Flag</small></div>
          </div>
          <div className="marquee-item">
            <div className="client-logo-card"><span>Kawasaki</span><small>Ninja</small></div>
          </div>
        </div>
      </div>
    </section>
  )
}
