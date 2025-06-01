// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Music, LogOut } from 'lucide-react';

// const Dashboard = () => {
//   const [artists, setArtists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const fetchLikedSongs = async () => {
//       try {
//         const response = await fetch('https://deadmousse.pythonanywhere.com/liked_songs', {
//           credentials: 'include'
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setArtists(data);
//         console.log("Aaaartists ", artists)
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchLikedSongs();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black">
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-black text-white">
//         <div className="container mx-auto px-4 py-8">
//           <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-center">
//             <p className="text-red-500">Error: {error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navigation */}
//       <nav className="bg-gray-900 border-b border-gray-800">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-2">
//               <Music className="h-6 w-6 text-green-500" />
//               <span className="text-xl font-bold">Spotigee</span>
//             </div>
//             <button
//               onClick={logout}
//               className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
//             >
//               <LogOut className="h-4 w-4" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">Your Top Artists</h1>
        
//         <div className="grid gap-4">
//           {artists.map(([artist, count], index) => (
//             <div 
//               key={artist}
//               className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-900/70 transition-colors"
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <span className="text-lg font-semibold text-gray-400 w-8">
//                     {index + 1}.
//                   </span>
//                   <span className="text-xl font-medium">{artist}</span>
//                 </div>
//                 <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-medium">
//                   {count} songs
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Music, LogOut, Disc } from 'lucide-react';

// const Dashboard = () => {
//   const [artists, setArtists] = useState([]);
//   const [albums, setAlbums] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { logout } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch top artists
//         const artistsResponse = await fetch('https://deadmousse.pythonanywhere.com/top_artists', {
//           credentials: 'include'
//         });
        
//         console.log("Top artists", artistsResponse)
//         // Fetch top albums
//         const albumsResponse = await fetch('https://deadmousse.pythonanywhere.com/top_albums', {
//           credentials: 'include'
//         });
//         console.log("Top albums", artistsResponse)

//         if (!artistsResponse.ok || !albumsResponse.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const artistsData = await artistsResponse.json();
//         const albumsData = await albumsResponse.json();

//         setArtists(artistsData);
//         setAlbums(albumsData);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

const Dashboard = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout, fetchWithToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch top artists
        const artistsData = await fetchWithToken('https://deadmousse.pythonanywhere.com/top_artists');
        setArtists(artistsData);
        
        // Fetch top albums
        const albumsData = await fetchWithToken('https://deadmousse.pythonanywhere.com/top_albums');
        setAlbums(albumsData);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchWithToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Music className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold">Spotigee</span>
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Top Artists Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Your Top Artists</h2>
          <div className="grid gap-4">
            {artists.map(([artist, count], index) => (
              <div 
                key={artist}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-900/70 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-gray-400 w-8">
                      {index + 1}.
                    </span>
                    <span className="text-xl font-medium">{artist}</span>
                  </div>
                  <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-medium">
                    {count} songs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Albums Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Your Top Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map(([albumKey, album]) => {
              const [albumName, albumId] = albumKey.split("____");
              return (
                <div 
                  key={albumId}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-900/70 transition-colors"
                >
                  <div className="flex gap-4">
                    <img 
                      src={album.album_art} 
                      alt={albumName}
                      className="w-24 h-24 rounded-md"
                    />
                    <div>
                      <h3 className="font-medium text-lg mb-1">{albumName}</h3>
                      <p className="text-gray-400 text-sm mb-2">{album.artists.join(", ")}</p>
                      <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs font-medium">
                        {album.saved_track_count} of {album.total_tracks} tracks
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;