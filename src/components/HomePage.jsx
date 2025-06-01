import React from 'react';
import { Music, ListMusic, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const HomePage = () => {

  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
  }
  
  const handleLogin = () => {
    window.location.href = 'https://deadmousse.pythonanywhere.com/login';
  };

  return (
    <div className="min-h-screen relative">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/api/placeholder/1920/1080')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-2">
              <ListMusic className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-white">Melophiliacs</span>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text animate-fade-in">
              Welcome to Melophiliacs
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Learn more about your music taste and categorize your music into genre specific playlists
            </p>
            
            <button
              onClick={login}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Music className="h-5 w-5" />
              Login with Spotify
            </button>

            {/* <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Music className="h-5 w-5" />
              Login with Spotify
            </button> */}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Discover Your Taste</h3>
              <p className="text-gray-300">Learn more about your music preferences. </p>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ListMusic className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Smart Playlists</h3>
              <p className="text-gray-300">Categorize your music into genre-specific playlists for better organization.</p>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
              <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Music className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Music Stats</h3>
              <p className="text-gray-300">View detailed statistics about your listening habits and favorite artists.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;