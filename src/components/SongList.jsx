import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [updatedSong, setUpdatedSong] = useState({
    name: '',
    artist: '',
    album: '',
  });
  const [editingSongId, setEditingSongId] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/songs/allsongs');
        console.log(response.data); 
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
        alert('Failed to load songs. Please try again later.');
      }
    };
    fetchSongs();
  }, []);

  const deleteSong = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/songs/${id}`);
      setSongs(songs.filter((song) => song._id !== id));
      alert('Song deleted successfully!');
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('Failed to delete song. Please try again.');
    }
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSong((prev) => ({ ...prev, [name]: value }));
  };

  const updateSong = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/songs/${id}`,
        updatedSong
      );
      setSongs(songs.map((song) => (song._id === id ? response.data : song)));
      setEditingSongId(null);
      alert('Song updated successfully!');
    } catch (error) {
      console.error('Failed to update song:', error);
      alert('Failed to update song. Please try again.');
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-900 text-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-white mb-6">Song List</h2>
      <div className="space-y-4">
        {songs.map((song) => (
          <Card
            key={song._id}
            className="shadow-md bg-gray-800 text-white border border-gray-700 p-4"
          >
            <CardContent>
              <div className="mb-4">
                <p className="text-xl font-bold">{song.name}</p>
                <p className="text-sm text-gray-400">Artist: {song.artist}</p>
                <p className="text-sm text-gray-400">Album: {song.album}</p>
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="destructive"
                  onClick={() => deleteSong(song._id)}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditingSongId(song._id);
                    setUpdatedSong({
                      title: song.name,
                      artist: song.artist,
                      album: song.album,
                    });
                  }}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {editingSongId && (
        <Card className="mt-6 bg-gray-800 text-white border border-gray-700">
          <CardContent>
            <h3 className="text-lg font-medium mb-4">Update Song</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={updatedSong.name}
                onChange={handleUpdateInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none bg-gray-700 text-white placeholder-gray-400"
              />
              <input
                type="text"
                name="artist"
                placeholder="Artist"
                value={updatedSong.artist}
                onChange={handleUpdateInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none bg-gray-700 text-white placeholder-gray-400"
              />
              <input
                type="text"
                name="album"
                placeholder="Album"
                value={updatedSong.album}
                onChange={handleUpdateInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none bg-gray-700 text-white placeholder-gray-400"
              />
              <div className="flex justify-end space-x-4">
                <Button
                  variant="secondary"
                  onClick={() => setEditingSongId(null)}
                  className="bg-gray-600 text-white hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  onClick={() => updateSong(editingSongId)}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SongList;
