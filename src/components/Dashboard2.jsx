import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"; // ShadCN Card Components
import { Input } from "./ui/input"; // ShadCN Input
import { Button } from "./ui/button"; // ShadCN Button
import { useNavigate } from "react-router-dom";

const Dashboard2 = () => {
    const [playlists, setPlaylists] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
    const [editingPlaylistId, setEditingPlaylistId] = useState(null);
    const [editedPlaylist, setEditedPlaylist] = useState({ name: "", description: "" });
    const navigate = useNavigate();
    const fetchPlaylists = async () => {
        try {
            const response = await axios.get("http://localhost:4000/playlists");
            setPlaylists(response.data);
        } catch (err) {
            console.error("Error fetching playlists:", err);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/playlists", newPlaylist);
            setPlaylists([...playlists, response.data]);
            setNewPlaylist({ name: "", description: "" });
            setIsCreating(false);
            alert("Created playlist!")
        } catch (err) {
            console.error("Error creating playlist:", err);
            alert("Failed to create playlist.");
        }
    };

    const handleEdit = async (playlistId) => {
        try {

            const response = await axios.put(
                `http://localhost:4000/playlists/${playlistId}`,
                editedPlaylist
            );
            setPlaylists(playlists.map((p) => (p._id === playlistId ? response.data : p)));
            setEditingPlaylistId(null);
        } catch (err) {
            console.error("Error editing playlist:", err);
            alert("Failed to update playlist.");
        }
    };

    const handleInputChange = (e, setter) => {
        setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <div className="dashboard-container p-6 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-100">My Playlists</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Create Playlist Card */}
                    <Card
                        className="flex flex-col justify-center items-center p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                        onClick={() => setIsCreating(true)}
                    >
                        <h2 className="text-6xl font-light text-gray-500">+</h2>
                        <p className="text-sm text-gray-400">Create New Playlist</p>
                    </Card>

                    {/* Existing Playlists */}
                    {playlists.map((playlist) => (
                        <Card
                            key={playlist._id}
                            className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            {editingPlaylistId === playlist._id ? (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleEdit(playlist._id);
                                    }}
                                >
                                    <Input
                                        name="name"
                                        value={editedPlaylist.name || playlist.name}
                                        onChange={(e) => handleInputChange(e, setEditedPlaylist)}
                                        placeholder="Playlist Name"
                                        className="mb-3 text-white"
                                    />
                                    <Input
                                        name="description"
                                        value={editedPlaylist.description || playlist.description}
                                        onChange={(e) => handleInputChange(e, setEditedPlaylist)}
                                        placeholder="Playlist Description"
                                        className="mb-3 text-white"
                                    />
                                    <div className="flex gap-3">
                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                                            Save
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => navigate(`/add-songs/${playlist._id}`)}
                                            className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                                        >
                                            Add Songs
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <CardHeader>
                                        <h2 className="text-xl font-semibold text-gray-100">
                                            {playlist.name}
                                        </h2>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-400">{playlist.description}</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between items-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setEditingPlaylistId(playlist._id)}
                                            className="bg-gray-700 hover:bg-gray-600 text-white"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/playlist/${playlist._id}/songs`)}
                                            className="bg-gray-700 hover:bg-gray-600 text-white"
                                        >View Songs
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigate(`/playlist/${playlist._id}`)}
                                            className="bg-gray-700 hover:bg-gray-600 text-white"
                                        >
                                            Add Songs
                                        </Button>
                                    </CardFooter>
                                </>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Modal for creating a new playlist */}
                {isCreating && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-gray-800 w-full max-w-md p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-100 mb-4">
                                Create New Playlist
                            </h2>
                            <form onSubmit={handleCreate}>
                                <Input
                                    name="name"
                                    value={newPlaylist.name}
                                    onChange={(e) => handleInputChange(e, setNewPlaylist)}
                                    placeholder="Playlist Name"
                                    className="mb-4 text-white"
                                />
                                <Input
                                    name="description"
                                    value={newPlaylist.description}
                                    onChange={(e) => handleInputChange(e, setNewPlaylist)}
                                    placeholder="Playlist Description"
                                    className="mb-4 text-white"
                                />
                                <div className="flex gap-3">
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                                        Create
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsCreating(false)}
                                        className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard2;
