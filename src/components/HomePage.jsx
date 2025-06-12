import React from 'react';
import { Music, ListMusic } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import SneakPeekTabs from './SneakPeekTabs';

const HomePage = () => {
  const { isAuthenticated, login } = useAuth();

  console.log("isAuthenticated", isAuthenticated);
  if (isAuthenticated) {
    console.log("isAuthenticated", isAuthenticated);
    return <Navigate to="/dashboard" />;
  }

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      </div>

      {/* Content Wrapper: Centering all content vertically and horizontally */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="container mx-auto flex flex-col items-center text-center w-full max-w-3xl">
          
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 md:mb-12">
            <ListMusic className="h-10 w-10 text-green-500" />
            <span className="text-3xl md:text-4xl font-bold text-white">Melophiliacs</span>
          </div>

          {/* Hero Section (Login, Text) */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text animate-fade-in">
            Welcome to Melophiliacs
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-10">
            Learn more about your music taste and categorize your music into genre specific playlists.
          </p>
          <button
            onClick={login}
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-base md:text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Music className="h-5 w-5" />
            Login with Spotify
          </button>

          {/* Sneak Peek Tabs - Directly below the hero content */}
          <div className="w-full mt-12 md:mt-16">
            <SneakPeekTabs />
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;