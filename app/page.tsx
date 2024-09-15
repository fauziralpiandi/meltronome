// app/page.tsx
import MusicPlayer from './components/App'

const HomePage = async () => {
  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-white">
      <MusicPlayer />
    </div>
  )
}

export default HomePage
