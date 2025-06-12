import React, { useState } from 'react';

const TABS = [
  { id: 'genre-playlists', title: 'Genre Playlists' },
  { id: 'top-artists', title: 'Top Artists' },
  { id: 'top-albums', title: 'Top Albums' },
  { id: 'music-stats', title: 'Music Stats' },
];

const SneakPeekTabs = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 mb-12 px-4">
      <div className="mb-4 border-b border-gray-700 flex flex-wrap justify-center">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 font-medium text-sm focus:outline-none transition-colors duration-150 ease-in-out
              ${
                activeTab === tab.id
                  ? 'border-b-2 border-green-500 text-green-400'
                  : 'text-gray-400 hover:text-gray-200'
              }
            `}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div>
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={activeTab === tab.id ? 'block' : 'hidden'}
          >
            {/* Placeholder content for each tab */}
            <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-lg text-center">
              <h3 className="text-2xl font-semibold text-white mb-3">{tab.title}</h3>
              <p className="text-gray-300 mb-4">
                Detailed preview for {tab.title} will appear here. 
                Imagine a cool screenshot or a brief description of this feature!
              </p>
              <div className="bg-gray-700 h-48 w-full rounded flex items-center justify-center">
                <span className="text-gray-500">Image/Snippet Placeholder</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SneakPeekTabs; 