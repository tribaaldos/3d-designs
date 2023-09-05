import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import React, {useEffect} from 'react'

export default function GalaxyGenerator(){
    useEffect(() => {
        THREE.ColorManagement.enabled = false

        /**
         * Base
         */
        // Debug
        const gui = new dat.GUI()
        
        // Canvas
        const canvas = document.querySelector('canvas.webgl')
        
        // Scene
        const scene = new THREE.Scene()

        //lights


        const pointLight = new THREE.PointLight('white', 555)
        pointLight.position.set(1, 5, 0)
        pointLight.castShadow = true
        pointLight.shadow.mapSize.width = 1024
        pointLight.shadow.mapSize.height = 1024
        scene.add(pointLight)
        //cube test
        const cubo = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 'red'}))
        scene.add(cubo)
        cubo.position.y = 2
        cubo.castShadow = true
        // floor
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({
            color: 'blue'
        }))
        floor.receiveShadow = true
        floor.position.set(0, 0, 0)
        floor.rotation.x = - Math.PI * 0.5

        scene.add(floor)
        /**
         * Galaxy
         */
        const parameters = {}
        parameters.count = 100000
        parameters.size = 0.01
        parameters.radius = 5
        parameters.branches = 3
        parameters.spin = 1
        parameters.randomness = 0.2
        parameters.randomnessPower = 3
        parameters.insideColor = '#ff6030'
        parameters.outsideColor = '#1b3984'
        
        let geometry = null
        let material = null
        let points = null
        
        const generateGalaxy = () =>
        {
            // Destroy old galaxy
            if(points !== null)
            {
                geometry.dispose()
                material.dispose()
                scene.remove(points)
            }
        
            /**
             * Geometry
             */
            geometry = new THREE.BufferGeometry()
        
            const positions = new Float32Array(parameters.count * 3)
            const colors = new Float32Array(parameters.count * 3)
        
            const colorInside = new THREE.Color(parameters.insideColor)
            const colorOutside = new THREE.Color(parameters.outsideColor)

            for(let i = 0; i < parameters.count; i++)
            {
                // Position
                const i3 = i * 3
        
                const radius = Math.random() * parameters.radius
        
                const spinAngle = radius * parameters.spin
                const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
                
                const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
                const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
                const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        
                positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
                positions[i3 + 1] = 2 + Math.max(randomY - parameters.radius, 0);
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
                
                // Color
                const mixedColor = colorInside.clone()
                mixedColor.lerp(colorOutside, radius / parameters.radius)
                
                colors[i3    ] = mixedColor.r
                colors[i3 + 1] = mixedColor.g
                colors[i3 + 2] = mixedColor.b
            }
                //             // Add this code to your generateGalaxy function
                // const galaxyMaterial = new THREE.MeshStandardMaterial({
                //     color: 'white', // Color of the points (can be any color you like)
                //     roughness: 0.7,
                //     metalness: 0.2,
                //     transparent: true, // Enable transparency for the spheres
                //     opacity: 0.5, // Adjust opacity as needed
                //     side: THREE.DoubleSide, // Render both sides of the spheres
                // });
                
                // const sphereGeometry = new THREE.SphereGeometry(parameters.size, 32, 32);
                
                // const galaxy = new THREE.InstancedMesh(
                //     sphereGeometry,
                //     galaxyMaterial,
                //     parameters.count
                // );
                // galaxy.castShadow = true; // Enable shadow casting for the spheres
                // galaxy.receiveShadow = false; // Points don't receive shadows
                // scene.add(galaxy);
        
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        
            /**
             * Material
             */
            material = new THREE.PointsMaterial({
                size: parameters.size,
                sizeAttenuation: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true,
            })
        
            /**
             * Points
             */
            points = new THREE.Points(geometry, material)
            scene.add(points)
        }
        
        gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
        gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
        gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
        gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
        gui.add(parameters, 'spin').min(- 5).max(5).step(0.001).onFinishChange(generateGalaxy)
        gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
        gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
        gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
        gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)
        
        generateGalaxy()


  
        
        /**
         * Sizes
         */
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
        camera.position.x = 0
        camera.position.y = 5
        camera.position.z = 10
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
        renderer.shadowMap.enabled = true
        /**
         * Animate
         */
        const clock = new THREE.Clock()
        
        const tick = () =>
        {
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
    return(
        <div id="canvascontainer">
            <canvas className="webgl"></canvas>
        </div>
    )
}
