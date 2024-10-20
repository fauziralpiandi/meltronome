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
        <footer className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="block font-semibold text-center text-sm text-mono-800 tracking-tight">
            Copyright &copy; {new Date().getFullYear()} Fauzira Alpiandi
          </div>
        </footer>
      </div>
    </div>
  )
}
