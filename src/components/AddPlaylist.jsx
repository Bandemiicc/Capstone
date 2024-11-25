import { useState } from "react";
import axios from "axios";
import { Input } from "./ui/input"; // ShadCN Input Component
import { Button } from "./ui/button"; // ShadCN Button Component
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"; // ShadCN Card Components

const AddPlaylist = () => {
  const [playlist, setPlaylist] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    setPlaylist({ ...playlist, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/playlists", playlist);
      alert("Playlist Created!");
      setPlaylist({ name: "", description: "" });
      console.log("Created playlist:", response.data);
    } catch (err) {
      console.error("Error creating playlist:", err);
      alert("Failed to create playlist.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800 text-white shadow-lg rounded-lg">
        <CardHeader className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-center">Create Playlist</h2>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Playlist Name
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Playlist name"
                value={playlist.name}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-gray-500 focus:border-gray-500 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <Input
                id="description"
                type="text"
                name="description"
                placeholder="Description"
                value={playlist.description}
                onChange={handleChange}
                required
                className="mt-1 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-gray-500 focus:border-gray-500 rounded-md"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Create Playlist
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center py-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Manage your playlists easily and create custom ones to organize your songs.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddPlaylist;