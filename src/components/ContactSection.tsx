'use client'

import { useEffect, useState } from 'react'

const WA_NUMBER = '6287723499550'

export default function ContactSection() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')

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

  const buildMessage = () => {
    const serviceLabels: Record<string, string> = {
      'Web Development': 'Web Development',
      'Graphic Design': 'Graphic Design',
      'Mobile Applications': 'Mobile Applications',
      'UI/UX Design': 'UI/UX Design',
      'Social Media': 'Social Media',
      'Digital Marketing': 'Digital Marketing',
    }
    const serviceLabel = serviceLabels[service] || service

    let msg = `Halo Eleven Digital Creative! 👋\n\n`
    msg += `Saya ingin berkonsultasi mengenai layanan Anda.\n\n`
    msg += `━━━━━━━━━━━━━━━━━━\n`
    if (name) msg += `👤 Nama        : ${name}\n`
    if (phone) msg += `📱 No. HP      : ${phone}\n`
    if (serviceLabel) msg += `🎯 Layanan     : ${serviceLabel}\n`
    msg += `━━━━━━━━━━━━━━━━━━\n\n`
    if (message) msg += `📝 Pesan:\n${message}\n\n`
    msg += `Mohon informasinya, terima kasih! 🙏`
    return msg
  }

  const preview = buildMessage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !service.trim() || !message.trim()) {
      return
    }
    const msg = buildMessage()
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Contact <span className="gradient-text">Us</span></h2>
          <p className="section-subtitle">Ready to transform your digital presence? Let&apos;s start a conversation.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal">
            <h3>Let&apos;s Build Something <span className="gradient-text">Amazing</span></h3>
            <p>Have a project in mind? We&apos;d love to hear about it. Drop us a message and we&apos;ll get back to you within 24 hours.</p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <strong>Address</strong>
                  <p>Jl. Kebon Jeruk Indah Utama 4,<br/>West Jakarta, Indonesia</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1A16 16 0 0 0 14 16.16l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <strong>Phone</strong>
                  <p>+62 877 234 999 550</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <p>hello@eleven-digital.id</p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Twitter/X">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/>
                </svg>
              </a>
            </div>
            <div className="map-placeholder">
              <div className="map-inner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <p>Jl. Kebon Jeruk Indah Utama 4<br/>West Jakarta, Indonesia</p>
                <a href="https://maps.google.com/?q=Jl.+Kebon+Jeruk+Indah+Utama+4+West+Jakarta" target="_blank" rel="noopener noreferrer" className="map-link">Open in Google Maps →</a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap reveal delay-2">
            <div className="form-header">
              <div className="wa-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.862L.057 23.448a.5.5 0 0 0 .609.61l5.684-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.7-.497-5.27-1.45l-.378-.222-3.922 1.007 1.034-3.823-.245-.394A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Pesan via WhatsApp
              </div>
              <p className="form-hint">Isi form di bawah, pesan akan otomatis terbuka di WhatsApp Anda.</p>
            </div>

            <form className="contact-form" id="contactForm" noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="formName"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder=" "
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <label htmlFor="formName">Nama Lengkap *</label>
                <div className="form-line"></div>
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="formPhone"
                  name="phone"
                  autoComplete="tel"
                  placeholder=" "
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
                <label htmlFor="formPhone">Nomor WhatsApp / HP</label>
                <div className="form-line"></div>
              </div>
              <div className="form-group">
                <select
                  id="formService"
                  name="service"
                  required
                  value={service}
                  onChange={e => setService(e.target.value)}
                >
                  <option value="" disabled></option>
                  <option value="Web Development">Web Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Mobile Applications">Mobile Applications</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
                <label htmlFor="formService">Layanan yang Dibutuhkan *</label>
                <div className="form-line"></div>
              </div>
              <div className="form-group">
                <textarea
                  id="formMessage"
                  name="message"
                  rows={4}
                  required
                  placeholder=" "
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                ></textarea>
                <label htmlFor="formMessage">Ceritakan kebutuhan Anda *</label>
                <div className="form-line"></div>
              </div>

              <div className="msg-preview" id="msgPreview">
                <div className="msg-preview-label">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.862L.057 23.448a.5.5 0 0 0 .609.61l5.684-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.7-.497-5.27-1.45l-.378-.222-3.922 1.007 1.034-3.823-.245-.394A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Preview pesan WhatsApp
                </div>
                <div className="msg-preview-body" id="msgPreviewBody" style={{ whiteSpace: 'pre-line' }}>
                  {name || phone || service || message ? preview : 'Isi form untuk melihat preview pesan...'}
                </div>
              </div>

              <button type="submit" className="btn-wa btn-full">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.862L.057 23.448a.5.5 0 0 0 .609.61l5.684-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.7-.497-5.27-1.45l-.378-.222-3.922 1.007 1.034-3.823-.245-.394A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
