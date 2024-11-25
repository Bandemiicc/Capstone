import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar' // Navbar Component
import Dashboard from './components/Dashboard'; // Dashboard as the home page
import AddSong from './components/AddSong'; // Add Song Component
import AddPlaylist from './components/AddPlaylist'; // Add Playlist Component
import SongList from './components/SongList';
import Dashboard2 from './components/Dashboard2';
import PlaylistSong from './components/PlaylistSong';

const App = () => {
  return (
      <Router>
          <Navbar />
          <Routes>
              {/* Home page (Dashboard) */}
              <Route path="/dashboard" element={<Dashboard2 />} />

              <Route path="/song-list" element= {<SongList />} />

              {/* Route for adding a song */}
              <Route path="/playlist/:id/" element={<AddSong />} />

              {/* Route for creating a new playlist */}
              <Route path="/create-playlist" element={<AddPlaylist />} />

              <Route path="/playlist/:id/songs" element={<PlaylistSong />} />
          </Routes>
      </Router>
  );
};

export default App;
