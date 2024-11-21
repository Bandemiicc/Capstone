import { useState, useEffect } from "react";
import axios from "axios";


const [song, setSong] = usestate [{ title: '', artist: '', album: ''}];

const handleChange = (e) => {
    setSong({...song, [e.target.name]: e.target.value});
}

const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:4000/songs', song);
        alert('Song added to plaulist!');
    } catch (err) {
        console.error(err)
        alert('Failed to add song.')
    };
}

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

        </form>
   </div> 
)