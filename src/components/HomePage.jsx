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

          {/* API Access Notice */}
          <div className="bg-sky-950/60 border border-sky-800 backdrop-blur-sm text-sky-100 text-sm rounded-lg p-4 mb-8 max-w-xl mx-auto">
            <h4 className="font-bold mb-2 text-white">A Note on Access</h4>
            <p className="text-left text-gray-300">
              This app uses Spotify's API in "Development Mode". To use this app, you must be manually added to the user list. Please share your Spotify username and email with me, and I will add you within 24 hours.
              <br/><br/>
              You can DM me directly or email: <a href="mailto:guthijp.reddy@gmail.com" className="font-medium underline text-sky-300 hover:text-white">guthijp.reddy@gmail.com</a>.
              <br/><br/>
              I apologize for this inconvenience. Spotify has made it nearly impossible for indie developers to use their API for small-scale projects. You can read more about their recent anti-developer changes here:
              <ul className="list-disc list-inside mt-2">
                <li><a href="https://developer.spotify.com/blog/2025-04-15-updating-the-criteria-for-web-api-extended-access" target="_blank" rel="noopener noreferrer" className="underline text-sky-300 hover:text-white">Official Blog Post</a></li>
                <li><a href="https://community.spotify.com/t5/Spotify-for-Developers/Updating-the-Criteria-for-Web-API-Extended-Access/m-p/6920661#M17569" target="_blank" rel="noopener noreferrer" className="underline text-sky-300 hover:text-white">Community Discussion</a></li>
              </ul>
            </p>
          </div>

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