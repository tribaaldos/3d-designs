import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/NavBar.css';

export default function NavBar() {
    const [dropDown, setDropDown] = useState(false);

    const toggleDropDown = () => {
        setDropDown(!dropDown);
    };

    return (
        <nav>
            <ul>
                <li className="dropdown">
                    <button className="dropdown-btn" onClick={toggleDropDown}>3d Basics</button>
                    {dropDown && (
                        <ul className="dropdown-menu">                <li><Link to="/page1">Animations</Link></li>
                        <li><Link to="/page2">Cameras</Link></li>
                        <li><Link to="/page3">FullScreen</Link></li>
                        <li><Link to="/page4">Geometry</Link></li>
                        <li><Link to="/page5">Textures</Link></li>
                        <li><Link to="/page6">Materials</Link></li>
                        <li><Link to="/page7">3dText</Link></li>
                        <li><Link to="/page8">TicTacToeGame</Link></li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}
