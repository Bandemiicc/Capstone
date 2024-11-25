import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navbar = () => {
    return (
        <nav className="p-4 bg-indigo-600 text-white flex justify-between items-center">
            <Link to="/dashboard">
                <Button className="text-2xl font-bold"><h1>Song App</h1></Button>
            </Link>
            <div className="space-x-4">
                <Link to="/song-list">
                    <Button className="bg-white text-indigo-600">Song List</Button>
                </Link>
                <Link to="/create-playlist">
                    <Button className="bg-white text-indigo-600">Create Playlist</Button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
