import React from "react";
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="p-4 bg-indigo-600 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">Song App</h1>
            <div className="space-x-4">
                <Link to="/">
                    <Button className="bg-white text-indigo-600">Song List</Button>
                </Link>
                <Link to="/add">
                    <Button className="bg-white text-indigo-600">Add Song</Button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;