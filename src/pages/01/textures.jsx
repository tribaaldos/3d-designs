// import GUI from 'lil-gui';
import React, { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'

export default function Textures() {
  useEffect(() => {
    THREE.ColorManagement.enabled = false
    
    // const gui = new dat.GUI()
    /**
     * Base
     */


    // Textures 
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {
      console.log('onStart')
    }
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const colorTexture = textureLoader.load('/static/textures/minecraft.png')
    const alphaTexture = textureLoader.load('/static/textures/matcaps/1.png')
    const heightTexture = textureLoader.load('/static/textures/door/height.jpg')
    const normalTexture = textureLoader.load('/static/textures/door/normal.jpg')
    const ambientOcclusionTexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
    const metalnessTexture = textureLoader.load('/static/textures/door/metalness.jpg')
    const roughness = textureLoader.load('/static/textures/door/roughness.jpg')
    
    colorTexture.repeat.x = 2
    colorTexture.repeat.y = 3
    colorTexture.wrapS = THREE.MirroredRepeatWrapping
    colorTexture.wrapT = THREE.MirroredRepeatWrapping

    colorTexture.offset.x = 0.5
    colorTexture.offset.y = 0.5

    colorTexture.minFilter = THREE.NearestFilter
    colorTexture.magFilter = THREE.NearestFilter

    alphaTexture.matcap = true
    
    // Canvas
    const canvas = document.querySelector('canvas.webgl')
    
    // Scene
    const scene = new THREE.Scene()

    // lights
    const pointLight1 = new THREE.PointLight('white', 555)
    pointLight1.position.set(1, 5, 0)
    pointLight1.castShadow = true
    scene.add(pointLight1)

    
    //objects
    
    
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ map: colorTexture })
    const mesh = new THREE.Mesh(geometry, material)
    const material1 = new THREE.MeshBasicMaterial({ map: alphaTexture })
    const mesh1 = new THREE.Mesh(geometry, material1)
    
    const material2 = new THREE.MeshBasicMaterial({ map: heightTexture })
    const mesh2 = new THREE.Mesh(geometry, material2)

    const material3 = new THREE.MeshBasicMaterial({ map: normalTexture })
    const mesh3 = new THREE.Mesh(geometry, material3)

    const material4 = new THREE.MeshBasicMaterial({ map: ambientOcclusionTexture })
    const mesh4 = new THREE.Mesh(geometry, material4)

    const material5 = new THREE.MeshBasicMaterial({ map: metalnessTexture })
    const mesh5 = new THREE.Mesh(geometry, material5)

    const material6 = new THREE.MeshBasicMaterial({ map: roughness })
    const mesh6 = new THREE.Mesh(geometry, material6)

    const group = new THREE.Group();
    group.add(mesh, mesh1, mesh2, mesh3, mesh4, mesh5, mesh6)
    mesh.castShadow = true
    mesh1.castShadow = true
    mesh2.castShadow = true
    mesh3.castShadow = true
    mesh4.castShadow = true
    mesh5.castShadow = true
    mesh6.castShadow = true

    // scene.add(mesh, mesh1, mesh2, mesh3, mesh4, mesh5, mesh6)
    
    //positions
    mesh.position.set(-7, 1, -4)
    mesh1.position.set(-5, 1, -4)
    mesh2.position.set(-3, 1, -4)
    mesh3.position.set(-1, 1, -4)
    mesh4.position.set(1, 1, -4)
    mesh5.position.set(3, 1, -4)
    mesh6.position.set(5, 1, -4)
    
    scene.add(group)

    // floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({
        color: 'blue'
    }))
    floor.receiveShadow = true
    floor.position.set(0, 0, 0)
    floor.rotation.x = - Math.PI * 0.5

    scene.add(floor)

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
    camera.position.x = -8.3
    camera.position.y = 1
    camera.position.z = -4.5
 
    
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
    // const clock = new THREE.Clock()
    
    const tick = () =>
    {
        // const elapsedTime = clock.getElapsedTime()
        mesh.rotation.x += 0.01
        mesh.rotation.z += 0.01
        mesh1.rotation.x += 0.01
        mesh1.rotation.z += 0.01
        mesh2.rotation.x += 0.01
        mesh2.rotation.z += 0.01
        mesh3.rotation.x += 0.01
        mesh3.rotation.z += 0.01
        mesh4.rotation.x += 0.01
        mesh4.rotation.z += 0.01
        mesh5.rotation.x += 0.01
        mesh5.rotation.z += 0.01
        mesh6.rotation.x += 0.01
        mesh6.rotation.z += 0.01
        // Update controls
        controls.update()
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    
    tick()
  }, [])
    return (
      
      <div id="canvas-container">
        <canvas className="webgl"></canvas>
      </div>
    )
  }
  