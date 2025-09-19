'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'

const VoiceChat = dynamic(() => import('@/components/VoiceChat'), {
  ssr: false,
  loading: () => <div className="text-center py-20">로딩 중...</div>
})

export default function VoiceChatPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <main className="pt-20">
        <VoiceChat />
      </main>
    </div>
  )
}