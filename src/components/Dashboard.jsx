import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card"; // ShadCN Card Components
import { Input } from './ui/input' // ShadCN Input
import { Button } from "./ui/button"; // ShadCN Button
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [playlists, setPlaylists] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
    const [editingPlaylistId, setEditingPlaylistId] = useState(null);
    const [editedPlaylist, setEditedPlaylist] = useState({});
    const navigate = useNavigate();

    // Fetch playlists
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get("http://localhost:4000/playlists");
                setPlaylists(response.data);
            } catch (err) {
                console.error("Error fetching playlists:", err);
            }
        };

        fetchPlaylists();
    }, []);

    // Create new playlist
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/playlists', newPlaylist);
            setPlaylists([...playlists, response.data]);
            setNewPlaylist({ name: "", description: "" });
            setIsCreating(false);
        } catch (err) {
            console.error("Error creating playlist:", err);
            alert("Failed to create playlist.");
        }
    };

    // Edit playlist
    const handleEdit = async (playlistId) => {
        try {
            const response = await axios.put(`http://localhost:4000/playlists/${playlistId}`, editedPlaylist);
            setPlaylists(playlists.map((p) => (p._id === playlistId ? response.data : p)));
            setEditingPlaylistId(null);
        } catch (err) {
            console.error("Error editing playlist:", err);
            alert("Failed to update playlist.");
        }
    };


//handle input changes 
const handleInputChange = (e, setter) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
};

return (
    <div className="dashboard-container">
        <h1 className="dashboard-title">Your Playlists</h1>
        <div className="playlist-grid">
            {/* Create Playlist Card */}
            <div
                className="create-playlist-card"
                onClick={() => setIsCreating(true)}
            >
                <h2 className="create-playlist-symbol">+</h2>
            </div>

            {/* Existing Playlists */}
            {playlists.map((playlist) => (
                <div
                    key={playlist._id}
                    className="playlist-card"
                >
                    <button
                        className="edit-button"
                        onClick={() => setEditingPlaylistId(playlist._id)}
                    >
                        *
                    </button>

                    {editingPlaylistId === playlist._id ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleEdit(playlist._id);
                            }}
                            className="edit-form"
                        >
                            <input
                                type="text"
                                name="name"
                                value={editedPlaylist.name || playlist.name}
                                onChange={(e) => handleInputChange(e, setEditedPlaylist)}
                                placeholder="Playlist Name"
                                className="edit-input"
                            />
                            <input
                                type="text"
                                name="description"
                                value={editedPlaylist.description || playlist.description}
                                onChange={(e) => handleInputChange(e, setEditedPlaylist)}
                                placeholder="Playlist Description"
                                className="edit-input"
                            />
                            <div className="button-group">
                                <button type="submit" className="save-button">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="add-songs-button"
                                    onClick={() => navigate(`/add-songs/${playlist._id}`)}
                                >
                                    Add Songs
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="playlist-header">
                                <h2 className="playlist-name">{playlist.name}</h2>
                            </div>
                            <div className="playlist-content">
                                <p className="playlist-description">{playlist.description}</p>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>

        {/* Modal for creating a new playlist */}
        {isCreating && (
            <div className="modal-overlay">
                <div className="modal-container">
                    <h2 className="modal-title">Create Playlist</h2>
                    <form onSubmit={handleCreate}>
                        <input
                            type="text"
                            name="name"
                            value={newPlaylist.name}
                            onChange={(e) => handleInputChange(e, setNewPlaylist)}
                            placeholder="Playlist Name"
                            className="modal-input"
                        />
                        <input
                            type="text"
                            name="description"
                            value={newPlaylist.description}
                            onChange={(e) => handleInputChange(e, setNewPlaylist)}
                            placeholder="Playlist Description"
                            className="modal-input"
                        />
                        <div className="modal-buttons">
                            <button type="submit" className="create-button">
                                Create
                            </button>
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setIsCreating(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
);
};

export default Dashboard;
