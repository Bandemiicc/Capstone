import React, { useEffect, useState } from "react";
import axios from "axios";


const [songList, setSongList] = useState();

useEffect(() => {
    //Get
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
    // delete 
const deleteSongs = async (id) => {
    try {
         await axios.delete(`http://localhost:4000/songs/${id}`)

        setSongs(songs.filter((song) => song._id != id))
        alert('song deleted')
    } catch (err) {
        console.error('Failed to delete song', err)
        alert('Failed to delete song')
    }
}
    // update
const updateSong = async (id) => {
    try {
        await axios.put('http://localhost:4000/songs/${id}')
        setSongs({ title: '', artist: '', album: ''})
        
    } catch (err) {
        console.error('failed to update song', err)
    }
}