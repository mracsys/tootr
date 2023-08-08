import '@/styles/tracker.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TOoTR',
  description: 'Track Ocarina of Time Randomizer Entrances, Locations, and Items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
