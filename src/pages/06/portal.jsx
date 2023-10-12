import React, { useEffect } from 'react';
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import firefliesVertexShader from "../../shaders/fireflies/vertex.glsl"
import firefliesFragmentShader from "../../shaders/fireflies/fragment.glsl"

console.log(firefliesVertexShader)
console.log(firefliesFragmentShader)
export default function Portal() {
    useEffect(() => {

        /**
         * Base
         */
        // Debug

        const debugObject = {}
        const gui = new dat.GUI({
            width: 400
        })

        // Canvas
        const canvas = document.querySelector('canvas.webgl')

        // Scene
        const scene = new THREE.Scene()

        /**
         * Loaders
         */
        // Texture loader
        const textureLoader = new THREE.TextureLoader()

        // Draco loader
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('draco/')

        // GLTF loader
        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        // textures

        const bakedTexture = textureLoader.load('/static/blender/portal/baked.jpg')

        // materials
        //baked material
        const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })
        bakedTexture.flipY = false
        bakedTexture.colorSpace = THREE.SRGBColorSpace

        // portal light materialç
        const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
        // pol Light material
        const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

        //model

        gltfLoader.load(
            '/static/blender/portal/portal.glb',
            // Get each object
            (gltf) => 
            {
                gltf.scene.traverse((child) => {
                    child.material = bakedMaterial
                })
                scene.add(gltf.scene)
                
                const portalLightMesh = gltf.scene.children.find((child) => child.name === 'Circle')
                const poleLightAMesh = gltf.scene.children.find((child) => child.name === 'Cube011')
                const poleLightBMesh = gltf.scene.children.find((child) => child.name === 'Cube014')

                // Apply materials
                portalLightMesh.material = portalLightMaterial
                poleLightAMesh.material = poleLightMaterial
                poleLightBMesh.material = poleLightMaterial
            }
        )
        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer

            renderer.setSize(sizes.width, sizes.height)

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        })

        //FireFlies
        //geometry
        const firefliesGeometry = new THREE.BufferGeometry()
        const firefliesCount = 300
        const positionArray = new Float32Array(firefliesCount * 3)

        for(let i = 0; i < firefliesCount; i ++) {
            positionArray[i + 3 + 0] = (Math.random() - 0.5) * 4
            positionArray[i + 3 + 1] = Math.random() * 1.5
            positionArray[i + 3 + 2] = (Math.random() - 0.5) * 4
        }
        firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
        //material
        const firefliesMaterial = new THREE.ShaderMaterial({
            vertexShader: firefliesVertexShader,
            fragmentShader: firefliesFragmentShader
        })
        // points
        const fireflies =new THREE.Points(firefliesGeometry, firefliesMaterial)
        scene.add(fireflies)

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 4
        camera.position.y = 2
        camera.position.z = 4
        scene.add(camera)

        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true

        /**
         * Renderer
         * 
         */
        const renderer = new THREE.WebGLRenderer({


            canvas: canvas,
            antialias: true
        })
        renderer.setSize(sizes.width, sizes.height)

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


        debugObject.clearColor = '#1d075'
        renderer.setClearColor(debugObject.clearColor)

        gui.addColor(debugObject, 'clearColor').onChange(() => {
            renderer.setClearColor(debugObject.clearColor)

        })
        /**
         * Animate
         */
        const clock = new THREE.Clock()

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update controls
            controls.update()

            // Render
            renderer.render(scene, camera)


            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    })
    return (
        <div id="canvas-container">
            <canvas className="webgl"></canvas>
            <h1></h1>
        </div>
    )
}