import { Canvas } from '@react-three/fiber'


export default function Page7() {
  
    return (
      
      <div id="canvas-container">
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="blue" position={[0, 0, 5]} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
        
      </div>
    )
  }
  