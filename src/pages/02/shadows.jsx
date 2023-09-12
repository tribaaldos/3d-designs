import React, { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
// import { Material } from 'three';


export default function Shadows() {
    useEffect(() => {

        THREE.ColorManagement.enabled = false

        /**
         * Base
         */

        // Textures 
        const textureLoader = new THREE.TextureLoader();
        // const bakedShadow = textureLoader.load('/static/textures/shadows/bakedShadow.jpg')
        const simpleShadow = textureLoader.load('/static/textures/shadows/simpleShadow.jpg')
        // Debug
        const gui = new dat.GUI()

        // Canvas
        const canvas = document.querySelector('canvas.webgl')

        // Scene
        const scene = new THREE.Scene()

        /**
         * Lights
         */
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
        scene.add(ambientLight)

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
        directionalLight.position.set(2, 2, - 1)
        // gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
        // gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
        // gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
        // gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
        directionalLight.castShadow = true
        scene.add(directionalLight)
        // console.log(directionalLight.shadow)
        directionalLight.shadow.mapSize.with = 1024
        directionalLight.shadow.mapSize.height = 1024
        directionalLight.shadow.camera.top = 2
        directionalLight.shadow.camera.right = 2
        directionalLight.shadow.camera.bottom = -2
        directionalLight.shadow.camera.left = -2
        directionalLight.shadow.camera.near = 1
        directionalLight.shadow.camera.far = 6
        directionalLight.shadow.radius = 10

        const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
        directionalLightCameraHelper.visible = false;
        scene.add(directionalLightCameraHelper)

        // SpotLight
        const spotLight = new THREE.SpotLight(0xffffff, 2, 10, Math.PI * 0.3)
        spotLight.castShadow = false
        spotLight.position.set(0, 2, 2)
        spotLight.shadow.mapSize.width = 1024
        spotLight.shadow.mapSize.height = 1024
        spotLight.shadow.camera.fov = 30
        spotLight.shadow.camera.near = 1
        spotLight.shadow.camera.far = 6

        scene.add(spotLight)
        scene.add(spotLight.target)

        const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
        spotLightCameraHelper.visible = false
        scene.add(spotLightCameraHelper)

        // Point Light 
        const pointLight = new THREE.PointLight(0xffffff, 2)

        pointLight.castShadow = false 
        pointLight.position.set(-1 , 1, 0)
        pointLight.shadow.mapSize.width = 1024
        pointLight.shadow.mapSize.height = 1024
        pointLight.shadow.camera.near = 0.1
        pointLight.shadow.camera.far = 5
        scene.add(pointLight)

        const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
        pointLightCameraHelper.visible = false
        scene.add(pointLightCameraHelper)

        /**
         * Materials
         */
        const material = new THREE.MeshStandardMaterial()
        material.roughness = 0.7
        gui.add(material, 'metalness').min(0).max(1).step(0.001)
        gui.add(material, 'roughness').min(0).max(1).step(0.001)

        /**
         * Objects
         */
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32),
            material
        )
        sphere.castShadow = true

        const sphere1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32), material
        )
        sphere1.castShadow = true
        sphere1.position.set(0, 0, 5)
        scene.add(sphere1)

        const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
        cube.position.set(0, 0, 0)
        cube.castShadow = true
        scene.add(cube)
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), material)
        plane.receiveShadow = true
        plane.rotation.x = - Math.PI * 0.5
        plane.position.y = - 0.5

        scene.add(sphere, plane)

        const sphereShadow = new THREE.Mesh(
            new THREE.PlaneGeometry(1.5, 1.5), 
            new THREE.MeshBasicMaterial({ color: 'blue', alphaMap: simpleShadow, transparent: true })
        )
        sphereShadow.rotation.x = - Math.PI * 0.5
        sphereShadow.position.y = plane.position.y + 0.01
        scene.add(sphereShadow)

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

            renderer.shadowMap.type = THREE.PCFSoftShadowMap();
        })

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 1
        camera.position.y = 2
        camera.position.z = 5
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

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()

            // update the sphere
            sphere.position.x = Math.cos(elapsedTime) * 1.5
            sphere.position.z = Math.sin(elapsedTime) * 1.5
            sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

            sphere1.position.x = Math.cos(elapsedTime)
            sphere1.position.z = Math.sin(elapsedTime)
            sphere1.position.y = 0.5 + Math.abs(Math.sin(elapsedTime))
            // update the shadow
            sphereShadow.position.x = sphere.position.x
            sphereShadow.position.z = sphere.position.z
            sphereShadow.material.opacity = 1 - sphere.position.y
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