'use client'

import { AiOutlineCheck, AiOutlineInfoCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react'

const bannerBaseClasses =
  'banner z-10 fixed bottom-4 left-1/2 transform -translate-x-1/2 p-6 w-11/12 max-w-xl text-mono-50 bg-black bg-opacity-80 border border-mono-500 rounded-lg shadow-lg backdrop-filter backdrop-blur-md transition-opacity duration-500'

export default function DisclaimerBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const isBannerDismissed = localStorage.getItem('disclaimerDismissed')
    if (!isBannerDismissed) {
      setShowBanner(true)
      setTimeout(() => {
        setFade(true)
      }, 10)
    }
  }, [])

  const handleDismiss = () => {
    setFade(false)
    setTimeout(() => {
      localStorage.setItem('disclaimerDismissed', 'true')
      setShowBanner(false)
    }, 500)
  }

  return (
    <div>
      {showBanner && (
        <div
          role="dialog"
          aria-label="Disclaimer Banner"
          className={`${bannerBaseClasses} ${fade ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-center">
            <AiOutlineInfoCircle className="mb-4 text-4xl text-mono-50 animate-pulse" />
            <p className="text-center text-mono-200">
              This music player presents inspired musical and visual content.
              All displayed content aims to enhance the user experience. I do
              not hold rights to this content and provide it solely for
              entertainment and non-commercial use. This content is not intended
              to claim ownership of the materials used.
            </p>
            <p className="my-8 text-center text-mono-200">
              Thank you for your regards!
            </p>
            <div className="flex justify-center w-full">
              <button
                onClick={handleDismiss}
                className="flex items-center px-4 py-2 text-sm font-medium text-mono-900 bg-mono-100 border border-mono-500 rounded-full hover:bg-mono-400 transition-colors duration-200"
              >
                <AiOutlineCheck className="mr-2" /> Let&rsquo;s go!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
