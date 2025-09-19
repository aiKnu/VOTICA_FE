import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'VOTICA',
  description: 'Innovation Through Design',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="bg-black">
      <body className="bg-black text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}