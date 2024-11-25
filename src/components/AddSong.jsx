import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardFooter, CardContent } from "./ui/card";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddSong = () => {
    const {id} = useParams() // extract ID from URL
    const [song, setSong] = useState({ name: "", artist: "", album: "" });
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const [name, setName] = useState('')
    const [artist, setArtist] = useState('')
    const [album, setAlbum] = useState ('')
    const navigate = useNavigate()

 
    // Handle input change for song details
    const handleChange = (e) => {
        setSong({ ...song, [e.target.name]: e.target.value });
    };

    // Handle playlist selection
    const handlePlaylistChange = (e) => {
        setSelectedPlaylist(e.target.value);
    };

    // Submit form to add a song to the playlist
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const NewSong = {
                name: name, 
                artist: artist,
                album: album,
                playlistId: id 
            }
            await axios.post("http://localhost:4000/songs", NewSong);


            alert("Song added to playlist!");
            setSong({ name: "", artist: "", album: "" });
            navigate(`/playlist/${id}/songs`)
        } catch (err) {
            console.error(err);
            alert("Failed to add song.");
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <Card className="w-full max-w-md shadow-lg border border-gray-700 bg-gray-800 text-white">
                <CardHeader className="text-center py-4">
                    <h1 className="text-2xl font-semibold">Add a Song</h1>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Song Title
                            </label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Song Title"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-2 w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-gray-500 focus:border-gray-500 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Artist
                            </label>
                            <Input
                                type="text"
                                name="artist"
                                placeholder="Artist"
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                required
                                className="mt-2 w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-gray-500 focus:border-gray-500 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Album
                            </label>
                            <Input
                                type="text"
                                name="album"
                                placeholder="Album"
                                value={album}
                                onChange={(e) => setAlbum(e.target.value)}
                                required
                                className="mt-2 w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-gray-500 focus:border-gray-500 rounded-md"
                            />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center py-4">
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-gray-700 text-white hover:bg-gray-600"
                    >
                        Add Song
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AddSong;
