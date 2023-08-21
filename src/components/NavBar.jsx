import { Link } from 'react-router-dom';
import '../components/NavBar.css';

export default function NavBar() {
    return (
        <nav className="navbar">
            <a href="#home">Home</a>

            <div className="dropdown">
                <button className="dropbtn">Dropdown</button>
                <div className="dropdown-content">
                    <Link to="/page1">Animations</Link>
                    <Link to="/page2">Cameras</Link>
                    <Link to="/page3">FullScreen</Link>
                    <Link to="/page4">Geometry</Link>
                    <Link to="/page5">Textures</Link>
                    <Link to="/page6">Materials</Link>
                    <Link to="/page7">3dText</Link>
                    <Link to="/page8">TicTacToeGame</Link>
                </div>
            </div> 
            <div className="dropdown">
                <button className="dropbtn">Lesson 2</button>
                <div className="dropdown-content">
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Lesson 2</button>
                <div className="dropdown-content">
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Lesson 2</button>
                <div className="dropdown-content">
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Lesson 2</button>
                <div className="dropdown-content">
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                    <Link to="">1</Link>
                </div>
            </div>
        </nav>
    );
}
