import { Link } from 'react-router-dom';
import '../components/NavBar.css';

export default function NavBar() {
    return (
        <nav className="navbar">
            <a href="#home">Home</a>

            <div className="dropdown">
                <button className="dropbtn">Basics 3d</button>
                <div className="dropdown-content">
                    <Link to="/animations">Animations</Link>
                    <Link to="/camera">Cameras</Link>
                    <Link to="/fullscreen">FullScreen</Link>
                    <Link to="/geometry">Geometry</Link>
                    <Link to="/textures">Textures</Link>
                    <Link to="/materials">Materials</Link>
                    <Link to="/text3d">3dText</Link>
                    <Link to="/tictactoe">TicTacToeGame</Link>
                </div>
            </div> 
            <div className="dropdown">
                <button className="dropbtn">3d Design Techniques 2</button>
                <div className="dropdown-content">
                    <Link to="/lights">Lights</Link>
                    <Link to="/shadows">Shadows</Link>
                    <Link to="">Haunted House</Link>
                    <Link to="">Particles</Link>
                    <Link to="">Galaxy Generator</Link>
                    <Link to="">Scroll based animation</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Advanced Techniques</button>
                <div className="dropdown-content">
                    <Link to="">Physics</Link>
                    <Link to="">Imported Models</Link>
                    <Link to="">Raycaster and Mouse Events</Link>
                    <Link to="blender-models">Custom models with Blender</Link>
                    <Link to="">Environment map</Link>
                    <Link to="">Realistic render</Link>
                    <Link to="">Code structuring for bigger projects</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Shaders</button>
                <div className="dropdown-content">
                    <Link to="">Shaders</Link>
                    <Link to="">Shader patterns</Link>
                    <Link to="">Raging sea</Link>
                    <Link to="">Animated galaxy</Link>
                    <Link to="">Modified Materials</Link>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Freelance Projects</button>
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
