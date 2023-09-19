import React, { useEffect } from "react"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CANNON from 'cannon'
import * as dat from 'lil-gui'
import './physics.css'


export default function Physics() {

    useEffect(() => {
        //DEbug
    
        const gui = new dat.GUI();

          
        const debugObject = {}
        debugObject.createSphere = () => {
            createSphere(
                Math.random() * 0.5,
                {
                    x: (Math.random() - 0.5) * 3,
                    y: 3,
                    z: (Math.random() - 0.5) * 3
                }
            )
        }
        gui.add(debugObject, 'createSphere')

        debugObject.createBox = () => {
            createBox(
                Math.random(),
                Math.random(),
                Math.random(),
                {
                    x: (Math.random() - 0.5) * 3,
                    y: 3,
                    z: (Math.random() - 0.5) * 3
                }
            )
        }

        gui.add(debugObject, 'createBox')
        // Reset
        debugObject.reset = () => {
            for (const object of objectsToUpdate) {
                // Remove body
                object.body.removeEventListener('collide', playHitSound)
                world.removeBody(object.body)

                // Remove mesh
                scene.remove(object.mesh)
            }

            objectsToUpdate.splice(0, objectsToUpdate.length)
        }
        gui.add(debugObject, 'reset')
        THREE.ColorManagement.enabled = false

        const canvas = document.querySelector('canvas.webgl')


        const scene = new THREE.Scene()


        // sounds
        const hitSound = new Audio('/static/sounds/hit.mp3')
        const playHitSound = (collision) => {
            const impactStrength = collision.contact.getImpactVelocityAlongNormal()
            if (impactStrength > 1.5) {
                hitSound.volume = Math.random()
                hitSound.currentTime = 0
                hitSound.play()
            }
        }

        // const textureLoader = new THREE.TextureLoader()
        const cubeTextureLoader = new THREE.CubeTextureLoader()

        const environmentMapTexture = cubeTextureLoader.load([
            'static/textures/environmentMaps/0/px.png',
            'static/textures/environmentMaps/0/nx.png',
            'static/textures/environmentMaps/0/py.png',
            'static/textures/environmentMaps/0/ny.png',
            'static/textures/environmentMaps/0/pz.png',
            'static/textures/environmentMaps/0/nz.png'
        ])

        // physics
        const world = new CANNON.World();
        world.broadphase = new CANNON.SAPBroadphase(world)
        world.allowSleep = true
        world.gravity.set(0, - 9.82, 0)
        // materials
        // const concreteMaterial = new CANNON.Material('concrete')
        // const plasticMaterial = new CANNON.Material('palstic')
        const defaultMaterial = new CANNON.Material('default')
        const defaultContactMaterial = new CANNON.ContactMaterial(
            defaultMaterial,
            defaultMaterial,
            {
                friction: 0.1,
                restitution: 0.5
            }
        )
        world.addContactMaterial(defaultContactMaterial)
        world.defaultContactMaterial = defaultContactMaterial

        // const sphereShape = new CANNON.Sphere(0.5)
        // const sphereBody = new CANNON.Body({
        //     mass: 1,
        //     position: new CANNON.Vec3(0, 3, 0),
        //     shape: sphereShape,
        //     // material: defaultMateriall,
        // })
        // sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))
        // world.addBody(sphereBody)

        const floorShape = new CANNON.Plane()
        const floorBody = new CANNON.Body()
        // floorBody.material = defaultMaterial
        floorBody.mass = 0
        floorBody.addShape(floorShape)
        floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)

        world.addBody(floorBody)
        // /**
        //  * Test sphere
        //  */
        // const sphere = new THREE.Mesh(
        //     new THREE.SphereGeometry(0.5, 32, 32),
        //     new THREE.MeshStandardMaterial({
        //         metalness: 0.3,
        //         roughness: 0.4,
        //         envMap: environmentMapTexture,
        //         envMapIntensity: 0.5
        //     })
        // )
        // sphere.castShadow = true
        // sphere.position.y = 0.5
        // scene.add(sphere)

        /**
         * Floor
         */
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({
                color: '#777777',
                metalness: 0.3,
                roughness: 0.4,
                envMap: environmentMapTexture,
                envMapIntensity: 0.5
            })
        )
        floor.receiveShadow = true
        floor.rotation.x = - Math.PI * 0.5
        scene.add(floor)

        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 1)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.set(1024, 1024)
        directionalLight.shadow.camera.far = 15
        directionalLight.shadow.camera.left = - 7
        directionalLight.shadow.camera.top = 7
        directionalLight.shadow.camera.right = 7
        directionalLight.shadow.camera.bottom = - 7
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)

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

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.set(- 3, 3, 3)
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
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        //sphere
        const objectsToUpdate = []
        const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
        const sphereMaterial = new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.4, envMap: environmentMapTexture })
        const createSphere = (radius, position) => {
            // three.js mesh
            const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
            mesh.scale.set(radius, radius, radius)
            mesh.castShadow = true
            mesh.position.copy(position)
            scene.add(mesh)
            // cannon js. body
            const shape = new CANNON.Sphere(radius)
            const body = new CANNON.Body({
                mass: 1,
                position: new CANNON.Vec3(0, 3, 0),
                shape: shape,
                material: defaultMaterial,
            })
            body.position.copy(position)
            body.addEventListener('collide', playHitSound)
            world.addBody(body)
            // save in object to update
            objectsToUpdate.push({
                mesh: mesh,
                body: body
            })
        }
        createSphere(0.5, { x: 0, y: 3, z: 0 });

        // Box
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.4, envMap: environmentMapTexture })
        const createBox = (width, height, depth, position) => {
            // three.js mesh
            const mesh = new THREE.Mesh(boxGeometry, boxMaterial)
            mesh.scale.set(width, height, depth)
            mesh.castShadow = true
            mesh.position.copy(position)
            scene.add(mesh)
            // cannon js. body
            const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
            const body = new CANNON.Body({
                mass: 1,
                position: new CANNON.Vec3(0, 3, 0),
                shape: shape,
                material: defaultMaterial,
            })
            body.position.copy(position)
            body.addEventListener('collide', playHitSound)
            world.addBody(body)
            // save in object to update
            objectsToUpdate.push({
                mesh: mesh,
                body: body
            })
        }

        /**
         * Animate
         */
        const clock = new THREE.Clock()
        let oldElapsedTime = 0

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - oldElapsedTime
            oldElapsedTime = elapsedTime


            // update physics world
            // sphereBody.applyForce(new CANNON.Vec3(- 0.5, 0, 0), sphereBody.position)
            world.step(1 / 60, deltaTime, 3)
            for (const object of objectsToUpdate) {
                object.mesh.position.copy(object.body.position)
                object.mesh.quaternion.copy(object.body.quaternion)
            }
            // sphere.position.x = sphereBody.position.x
            // sphere.position.x = sphereBody.position.y
            // sphere.position.x = sphereBody.position.z

            // sphere.position.copy(sphereBody.position)
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
        <div id="canvascontainer" >
            <canvas className="webgl"></canvas>
        </div>
    )
}