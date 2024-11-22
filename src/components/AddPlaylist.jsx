import { useState, useEffect } from "react";
import axios from "axios";


const [createPlaylist, setCreatePlaylist] = useState({ name: '', description: '' });

const handleChange = (e) => {
}

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:4000/playlists', playlist);
    alert('Playlist Created!');
    setCreatePlaylist({ name: '', description: "" })
  } catch (err) {
    console.error(err)
    alert('Failed to add song.')
  };
}

return (
  <div>
    <form onSubmit={handleSubmit}>
      <input type="text"
        name="Playlist"
        placeholder="Playlist name"
        onChange={handleChange}
      />
      <input type="text"
        name="artist"
        placeholder="description..."
        onChange={handleChange}
      />

    </form>
  </div>
)

export default AddPlaylist; 