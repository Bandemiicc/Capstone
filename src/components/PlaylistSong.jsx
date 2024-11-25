import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Card, CardContent } from './ui/card';

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
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-6">
          <h2 className="text-2xl font-semibold mb-6 text-white">Songs in Playlist</h2>
          {songs.length > 0 ? (
            <div className="space-y-4 w-full max-w-4xl">
              {songs.map((song) => (
                <Card
                  key={song._id}
                  className="bg-gray-800 shadow-md border border-gray-700"
                >
                  <CardContent className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">{song.name}</h3>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                      <p className="text-sm text-gray-500">{song.album}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No songs found. Add songs to this playlist!</p>
          )}
        </div>
      );
    }