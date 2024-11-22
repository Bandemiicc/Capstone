import { useState, useEffect } from "react";
import axios from "axios";


const [song, setSong] = useState({ title: '', artist: '', album: ''});
const [playlists, setPlaylists] = useState([]); 
const [selectedPlaylist, setSelectedPlaylist] = useState('');

useEffect(()=>{
    const fetchPlaylists = async (()=>{
        try {
            await = axios.get('http://localhost:4000/playlist')
        } catch (err) {
            console.error('not able to retreive playlists', err)
        }
    })
});

const handleChange = (e) => {
    setSong({...song, [e.target.name]: e.target.value});
}

const handelPlaylistChange = (e) => {
    setSelectedPlaylist(e.target.value)
}

const handleSubmit = async (e) =>{
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

return(
   <div>
        <form onSubmit={handleSubmit}>
            <input type ="text"
            name="title"
            placeholder="Song Ttitle"
            onChange={handleChange}
            />
             <input type ="text"
            name="artist"
            placeholder="Artist"
            onChange={handleChange}
            />
             <input type ="text"
            name="album"
            placeholder="Album"
            onChange={handleChange}
            />
            <input type ="text"
            name="album"
            placeholder="Album"
            onChange={handleChange}
            />

        </form>
   </div> 
)