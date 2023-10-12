import { Canvas } from '@react-three/fiber'

export default function FirstReactFiber() {

    return (
        <>
        <Canvas>

                <mesh scale={ [3, 2, 1]}>
                    <sphereGeometry args={ [ 2, 32, 32 ] }/>
                    <meshBasicMaterial color="mediumpurple" wireframe />
                </mesh>

        </Canvas>
        </>
    )
}