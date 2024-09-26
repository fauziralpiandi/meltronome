import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const LoadingScreen = ({ message }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex items-center text-center animate-pulse mb-2">
      <div className="loader" />
      <span className="mr-2 font-semibold text-xl">Loading</span>
      <FaSpinner className="animate-spin text-xl" />
    </div>
    <div className="text-center text-sm text-neutral-500">{message}</div>
  </div>
)

export default LoadingScreen
