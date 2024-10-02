'use client'

import clsx from 'clsx'
import { AiOutlineCheck } from 'react-icons/ai'
import { useEffect, useState } from 'react'

const bannerBaseClasses =
  'banner z-10 fixed bottom-4 left-1/2 transform -translate-x-1/2 p-6 w-11/12 max-w-xl text-neutral-50 bg-black bg-opacity-80 border border-gray-500 rounded-lg shadow-lg backdrop-filter backdrop-blur-md transition-opacity duration-500'

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
          className={clsx(bannerBaseClasses, {
            'opacity-100': fade,
            'opacity-0': !fade,
          })}
        >
          <div className="flex flex-col items-center">
            <p className="text-sm font-medium text-center text-neutral-300">
              This website provides important information. Please make sure to
              review it.
            </p>
            <div className="mt-6 w-full flex justify-center">
              <button
                onClick={handleDismiss}
                className="flex items-center px-4 py-2 font-medium text-sm rounded-full bg-neutral-100 border border-neutral-500 text-neutral-900 hover:bg-neutral-400 transition-colors duration-200"
              >
                <AiOutlineCheck className="mr-2" /> Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
