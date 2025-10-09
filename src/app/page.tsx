import Moodboard from '@/components/Moodboard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center w-full">Mood Board Generator</h1>
      </div>

      <div className="w-full mt-8">
        <Moodboard />
      </div>
    </main>
  )
}
