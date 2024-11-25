import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function PlaylistSong() {
    const [songs, setSongs] = useState([])
    const {id} = useParams()


    const fetchSongs = async ()=> {
       
        const response = await axios.get(`http://localhost:4000/songs`, {params: {playlistId: id}}) 
       setSongs(response.data)
    }
console.log(id)
    useEffect(()=>{
        fetchSongs()
    }, [])
  return (
    <div>
      {songs ? songs.map (s => <div>
        <h1>{s.name}</h1>
        <h1>{s.artist}</h1>
        <h1>{s.album}</h1>
        </div>) : 
        <h1>Is Loading...</h1>} 
    </div>
  )
}
