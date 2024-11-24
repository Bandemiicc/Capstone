import { useState, useEffect } from "react";
import axios from "axios";

const AddSong = () => {
    const [song, setSong] = useState({ title: '', artist: '', album: '' });
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    // Fetch playlists on component mount
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get('http://localhost:4000/playlists');
                setPlaylists(response.data);
            } catch (err) {
                console.error('Error fetching playlists:', err);
            }
        };
        fetchPlaylists();
    }, []);

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
            const songWithPlaylist = { ...song, playlistId: selectedPlaylist };
            const response = await axios.post('http://localhost:4000/songs', songWithPlaylist);

            alert('Song added to playlist!');
            setSong({ title: '', artist: '', album: '' });
            setSelectedPlaylist('');
        } catch (err) {
            console.error(err);
            alert('Failed to add song.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Song Title:
                    <input
                        type="text"
                        name="title"
                        placeholder="Song Title"
                        value={song.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Artist:
                    <input
                        type="text"
                        name="artist"
                        placeholder="Artist"
                        value={song.artist}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Album:
                    <input
                        type="text"
                        name="album"
                        placeholder="Album"
                        value={song.album}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Playlist:
                    <select value={selectedPlaylist} onChange={handlePlaylistChange} required>
                        <option value="" disabled>
                            Select a Playlist
                        </option>
                        {playlists.map((playlist) => (
                            <option key={playlist.id} value={playlist.id}>
                                {playlist.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add Song</button>
            </form>
        </div>
    );
};

export default AddSong;
