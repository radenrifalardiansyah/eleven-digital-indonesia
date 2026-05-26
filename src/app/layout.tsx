import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300','400','500','600','700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Eleven Digital Creative',
  description: 'Eleven Digital Creative - We create on transformation disruptive solution. Digital agency in West Jakarta, Indonesia.',
  keywords: 'digital agency, web development, mobile app, UI/UX, graphic design, digital marketing, Jakarta, Indonesia',
  openGraph: {
    title: 'Eleven Digital Creative',
    description: 'We create on transformation disruptive solution',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable}`}>{children}</body>
    </html>
  )
}
