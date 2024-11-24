import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from './ui/card'; 
import { Button } from './ui/button'; 

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [updatedSong, setUpdatedSong] = useState({
    title: '',
    artist: '',
    album: '',
  });
  const [editingSongId, setEditingSongId] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/songs');
        setSongs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSongs();
  }, []);

  const deleteSong = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/songs/${id}`);
      setSongs(songs.filter((song) => song._id !== id));
      alert('Song deleted!');
    } catch (error) {
      console.error(error);
      alert('Failed to delete song.');
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
      setUpdatedSong({ title: '', artist: '', album: '' });
      setEditingSongId(null);
      alert('Song updated!');
    } catch (error) {
      console.error('Failed to update song:', error);
      alert('Failed to update song.');
    }
  };

  return (
    <div className="mt-6 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Song List</h2>
      <div className="space-y-4">
        {songs.map((song) => (
          <Card key={song._id} className="shadow-md">
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-gray-600">{song.artist}</p>
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="destructive"
                  onClick={() => deleteSong(song._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditingSongId(song._id);
                    setUpdatedSong({
                      title: song.title,
                      artist: song.artist,
                      album: song.album,
                    });
                  }}
                >
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {editingSongId && (
        <Card className="mt-6">
          <CardContent>
            <h3 className="text-lg font-medium mb-4">Update Song</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={updatedSong.title}
                onChange={handleUpdateInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
              <input
                type="text"
                name="artist"
                placeholder="Artist"
                value={updatedSong.artist}
                onChange={handleUpdateInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
              <input
                type="text"
                name="album"
                placeholder="Album"
                value={updatedSong.album}
                onChange={handleUpdateInputChange}
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
              <div className="flex justify-end space-x-4">
                <Button
                  variant="secondary"
                  onClick={() => setEditingSongId(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  onClick={() => updateSong(editingSongId)}
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
