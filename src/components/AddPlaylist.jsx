import { useState } from "react";
import axios from "axios";
import { Input } from "./ui/input"; // ShadCN Input Component
import { Button } from "./ui/button"; // ShadCN Button Component
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"; // ShadCN Card Components

const AddPlaylist = () => {
  const [playlist, setPlaylist] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    setPlaylist({ ...playlist, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/playlists', playlist);
      alert('Playlist Created!');
      setPlaylist({ name: '', description: '' });
      console.log('Created playlist:', response.data);
    } catch (err) {
      console.error('Error creating playlist:', err);
      alert('Failed to create playlist.');
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <h2>Create Playlist</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name" // Match the state property
              placeholder="Playlist name"
              value={playlist.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="description" // Match the state property
              placeholder="Description"
              value={playlist.description}
              onChange={handleChange}
            />
            <Button type="submit">Create Playlist</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPlaylist;
