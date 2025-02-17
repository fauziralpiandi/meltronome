'use client'

import { useState } from 'react'

import App from '~/App'

export default function Home() {
  const [currentCover, setCurrentCover] = useState<string | null>(null)

  const handleCoverChange = (cover: string) => {
    setCurrentCover(cover)
  }

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {currentCover && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{
            backgroundColor: `${currentCover}`,
          }}
        ></div>
      )}

      <div className="absolute inset-0 z-5 bg-mono-50 opacity-50"></div>

      <div className="relative z-10 w-full mx-auto max-w-lg animate-in">
        <App onCoverChange={handleCoverChange} />
      </div>
    </div>
  )
}
