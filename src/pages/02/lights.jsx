import React, { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

export default function Lights() {
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
        
        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight('green', 0.2)
        gui.add(ambientLight, 'intensity').name('ambient-light').min(0).max(3).step(0.1)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight('blue', 2)
        directionalLight.position.set(1, 0.25, 0)
        gui.add(directionalLight, 'intensity').name('directionalLight').min(0).max(3).step(0.1)
        scene.add(directionalLight)

        const hemisphereLight = new THREE.HemisphereLight('red', 'purple', 0.1)
        hemisphereLight.position.set(1, 5, 0)
        gui.add(hemisphereLight, 'intensity').name('hemisphereLight').min(0).max(5).step(0.1)
        scene.add(hemisphereLight)

        const pointLight = new THREE.PointLight('green', 1)
        pointLight.position.set(1, 0.5, 0.5)
        gui.add(pointLight, 'intensity').name('pointLight').min(0).max(5).step(0.1)
        scene.add(pointLight)

        const rectAreaLight = new THREE.RectAreaLight('brown', 0.2, 10, 10)
        rectAreaLight.position.set(0, -2, 1)
        gui.add(rectAreaLight, 'intensity').name('reactarealight').min(0).max(5).step(0.1)
        scene.add(rectAreaLight)
        
        const spotLight = new THREE.SpotLight('yellow', 5, 10, Math.PI * 0.1, 0.25, 1)
        spotLight.position.set(0, 2, 3)
        gui.add(spotLight, 'intensity').name('spotlight').min(0).max(10).step(0.1)
        spotLight.target.position.x = -1
        scene.add(spotLight.target)
        scene.add(spotLight)
        // cont spotLight = new THREE.SpotLight(   )
        /**
         * Objects
         */
        // Material
        const material = new THREE.MeshStandardMaterial()
        material.roughness = 0.4
        
        const redMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
        const greenMaterial = new THREE.MeshStandardMaterial({ color: 'green'});
        const blueMaterial = new THREE.MeshStandardMaterial({ color: 'blue'});
        // Objects
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 32, 32),
            material
        )
        sphere.position.x = - 1.5

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(0.75, 0.75, 0.75),
            material
        )
        const cuborojo = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), redMaterial)
        cuborojo.position.set(-1.5, 1.5, 0)
        const torus = new THREE.Mesh(
            new THREE.TorusGeometry(0.3, 0.2, 32, 64),
            material
        )
        const greencube = new THREE.Mesh (new THREE.BoxGeometry(0.75, 0.75, 0.75), greenMaterial)
        greencube.position.set(-0.75, 1.5, 0)

        const bluecube = new THREE.Mesh (new THREE.BoxGeometry(0.75, 0.75, 0.75), blueMaterial)
        bluecube.position.set(0, 1.5, 0)
        torus.position.x = 1.5

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 5),
            material
        )
        plane.rotation.x = - Math.PI * 0.5
        plane.position.y = - 0.65

        scene.add(sphere, cube, torus, plane, cuborojo, greencube, bluecube)

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
        camera.position.y = 1
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


        // Raycaster
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleMouseClick = () => {
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects([cuborojo]);
        const intersects1 = raycaster.intersectObjects([greencube]);
        const intersects2 = raycaster.intersectObjects([bluecube]);

        if (intersects.length > 0) {
            // const randomColor = Math.random() * 0xffffff;
            ambientLight.color.set(0xfc390f);
            pointLight.color.set(0xfc390f);
          } else if (intersects1.length > 0) {
            ambientLight.color.set(0x68fc0f);
            pointLight.color.set(0x68fc0f);
          } else if (intersects2.length > 0) {
            ambientLight.color.set('blue');
            pointLight.intensity = 5;
            pointLight.color.set('blue')
          }
          
        }

        

        const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        mouse.x = (clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('click', handleMouseClick);
        window.addEventListener('mousemove', handleMouseMove);
        /**
         * Animate
         */
        const clock = new THREE.Clock()

        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()

            // Update objects
            sphere.rotation.y = 0.1 * elapsedTime
            cube.rotation.y = 0.1 * elapsedTime
            torus.rotation.y = 0.1 * elapsedTime

            sphere.rotation.x = 0.15 * elapsedTime
            cube.rotation.x = 0.15 * elapsedTime
            torus.rotation.x = 0.15 * elapsedTime

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