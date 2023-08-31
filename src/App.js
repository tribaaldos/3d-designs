
import './App.css'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import { BrowserRouter } from 'react-router-dom';
//01
import Animations from './pages/01/animations';
import Camera from './pages/01/camera';
import Fullscreen from './pages/01/fullscreen';
import Geometry from './pages/01/geometry';
import Materials from './pages/01/materials';
import Textures from './pages/01/textures';
import Text3d from './pages/01/3dtext';
import TicTacToe from './pages/01/tictactoe';
//02
import Lights from './pages/02/lights';
import Shadows from './pages/02/shadows';
import HauntedHouse from './pages/02/hauntedHouse';
import Particles from './pages/02/particles';
import GalaxyGenerator from './pages/02/galaxyGenerator';
import ScrollBasedAnimation from './pages/02/scrollBasedAnimation';
//03
import Physics from './pages/03/physics';
import BlenderModels from './pages/03/blenderModels';
import Raycaster from './pages/03/raycaster';
import ImportedModels from './pages/03/importedModels';
import EnvironmentMap from './pages/03/environmentMap';
import RealisticRender from './pages/03/realisticRender';
import CodeStructure from './pages/03/codeStructure';
//04
import Shaders from './pages/04/shaders';
import ShaderPatterns from './pages/04/shaderPatterns';
import RagingSea from './pages/04/ragingsea';
import AnimatedGalaxy from './pages/04/animatedGalaxy';
import ModifiedMaterials from './pages/04/modifiedMaterials';


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
          <Route path="/haunted-house" element={<HauntedHouse />} />
          <Route path="/particles" element={<Particles />} />
          <Route path="/galaxy-generator" element={<GalaxyGenerator />} />
          <Route path="/scroll-based-animation" element={<ScrollBasedAnimation />} />


          <Route path="/physics" element={<Physics />}></Route>
          <Route path="/imported-models" element={<ImportedModels />}></Route>
          <Route path="/raycaster" element={<Raycaster />}></Route>
          <Route path="/blender-models" element={<BlenderModels />}></Route>
          <Route path="/environment-map" element={<EnvironmentMap />}></Route>
          <Route path="/realistic-render" element={<RealisticRender />}></Route>
          <Route path="/code-structure" element={<CodeStructure />}></Route>

          <Route path="/shaders" element={<Shaders />}></Route>
          <Route path="/shader-patterns" element={<ShaderPatterns />}></Route>
          <Route path="/raging-sea" element={<RagingSea />}></Route>
          <Route path="/animated-galaxy" element={<AnimatedGalaxy />}></Route>
          <Route path="/modified-materials" element={<ModifiedMaterials />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

// createRoot(document.getElementById('root')).render(<App />)