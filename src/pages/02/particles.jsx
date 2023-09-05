import React, { useEffect } from "react"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'


export default function Particles() {
    
    useEffect(() => {
        
        THREE.ColorManagement.enabled = false
        
        /**
         * Base
         */
        // Debug
        // const gui = new dat.GUI()
        
        const canvas = document.querySelector('canvas.webgl')
        const scene = new THREE.Scene()

        const textureLoader = new THREE.TextureLoader()
        const particleTexture = textureLoader.load('/static/textures/particles/fire_02.png')
        // particles
        //geometry
        const particlesGeometry = new THREE.BufferGeometry(1, 32, 32)
        const count = 20000
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for(let i = 0; i < count * 3; i++){
            positions[i] = (Math.random() - 0.5) * 10
            colors[i] = Math.random()
        }

        particlesGeometry.setAttribute(
            'position', new THREE.BufferAttribute(positions, 3)
        )
        particlesGeometry.setAttribute(
            'color', new THREE.BufferAttribute(colors, 3)
        )
        //material
        const particlesMaterial = new THREE.PointsMaterial()
        particlesMaterial.size = 0.1
        particlesMaterial.sizeAttenuation = true
        // particlesMaterial.color = new THREE.Color('#ff88cc')
        particlesMaterial.alphaMap = particleTexture 
        particlesMaterial.transparent = true
        // particlesMaterial.alphaTest = 0.001
        // particlesMaterial.depthTest = false
        particlesMaterial.depthWrite = false
        particlesMaterial.blending = THREE.AdditiveBlending
        particlesMaterial.vertexColors = true 

        // points
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particles)

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        
        window.addEventListener('resize', () =>
        {
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
        
        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 3
        scene.add(camera)
        
        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        
        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        })
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        
        /**
         * Animate
         */
        const clock = new THREE.Clock()
        
        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()
            // updates particles 
            // particles.position.y = - elapsedTime * 0.2
            for(let i = 0; i < count; i++){

                const i3 = i * 3
                const x = Math.cos(particlesGeometry.attributes.position.array[i3 + 0])
                particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
                
                // console.log(particlesGeometry.attributes.position.array)
            }
            particlesGeometry.attributes.position.needsUpdate = true
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
        <div id="canvascontainer">
            <canvas className="webgl"></canvas>
        </div>
    )
}