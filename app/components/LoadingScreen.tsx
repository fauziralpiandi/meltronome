// components/LoadingScreen.tsx
import React from 'react'

const LoadingScreen = ({ progress }: { progress: number }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="loader" />
      <p>Loading songs... {progress.toFixed(0)}%</p>
    </div>
  </div>
)

export default LoadingScreen
