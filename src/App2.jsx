// App.jsx
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await fetch('http://localhost:5000/liked_songs')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setArtists(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchLikedSongs()
  }, [])

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Most Listened Artists</h1>
      <div className="grid gap-4">
        {artists.map(([artist, count], index) => (
          <div 
            key={artist} 
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-700 w-8">
                  {index + 1}.
                </span>
                <span className="text-xl font-medium">{artist}</span>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {count} songs
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App