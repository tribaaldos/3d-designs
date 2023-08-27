
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Animations from './pages/01/animations'
import Camera from './pages/01/camera'
import Fullscreen from './pages/01/fullscreen'
import Geometry from './pages/01/geometry'
import Materials from './pages/01/materials'
import Textures from './pages/01/textures'
import Text3d from './pages/01/3dtext'
import TicTacToe from './pages/01/tictactoe'
import Lights from './pages/02/lights'
import BlenderModels from './pages/04/blenderModels'
import Shadows from './pages/02/shadows'

import NavBar from './components/NavBar'
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar />
    <Routes>
      
      <Route path="/"></Route>
      <Route path="/animations" element={<Animations />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/fullscreen" element={<Fullscreen />} />
      <Route path="/geometry" element={<Geometry />} />
      <Route path="/materials" element={<Materials />} />
      <Route path="/textures" element={<Textures />} />
      <Route path="/text3d" element={<Text3d />} />
      <Route path="/page8" element={<TicTacToe />} />

      <Route path="/lights" element={<Lights />} />
      <Route path="/shadows" element={<Shadows />} />

      <Route path="/blender-models" element={<BlenderModels />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

// createRoot(document.getElementById('root')).render(<App />)