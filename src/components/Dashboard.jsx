import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Music, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, fetchAuthenticatedApi } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch top artists
        const artistsData = await fetchAuthenticatedApi('/v1/artists/top');
        setArtists((artistsData || []).slice(0, 30));
        
        // Fetch top albums
        const albumsData = await fetchAuthenticatedApi('/v1/albums/top');
        setAlbums((albumsData || []).slice(0, 30));
        
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchAuthenticatedApi]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <nav className="bg-gray-900 border-b border-gray-800 fixed top-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <Music className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold">Melophiliacs</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8 pt-24 text-center">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3 text-red-400">Oops! Something went wrong.</h2>
            <p className="text-red-300">{error}</p>
            <p className="text-gray-400 mt-4 text-sm">Please ensure the backend API is running and accessible. You might need to log out and log back in.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Music className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold">Melophiliacs</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Added pt-20 for padding below fixed nav */} 
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Top Artists Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Your Top Artists</h2>
          {artists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {artists.map(([artist, count], index) => (
                <div 
                  key={artist}
                  className="bg-gray-900/50 rounded-lg p-2 hover:bg-gray-900/70 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 truncate">
                      <span className="text-sm font-medium text-gray-400 w-6 flex-shrink-0 text-right">
                        {index + 1}.
                      </span>
                      <span className="text-base font-medium truncate" title={artist}>
                        {artist}
                      </span>
                    </div>
                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                      {count} songs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No top artists data available. Try liking more songs on Spotify!</p>
          )}
        </section>

        {/* Top Albums Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Your Top Albums</h2>
          {albums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {albums.map((albumDetails, index) => {
                const albumName = albumDetails.album_name || "Unknown Album";
                const albumArt = albumDetails.album_art_url || '/api/placeholder/100/100';
                const albumArtists = albumDetails.artists ? albumDetails.artists.join(", ") : "Various Artists";

                return (
                  <div 
                    key={albumDetails.album_id}
                    className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-900/70 transition-colors"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={albumArt}
                          alt={albumName}
                          className="w-24 h-24 rounded-md object-cover"
                        />
                        <span className="absolute top-0 left-0 bg-black bg-opacity-70 text-white text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-tl-md rounded-br-md">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg mb-1 line-clamp-2">{albumName}</h3>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-1">{albumArtists}</p>
                        <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-medium">
                          {albumDetails.saved_track_count} of {albumDetails.total_tracks_in_album} tracks
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">No top albums data available. Your liked songs' albums will appear here.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;