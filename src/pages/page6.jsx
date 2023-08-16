import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import React, { useEffect } from 'react';

export default function Page6() {
  useEffect(() => {

THREE.ColorManagement.enabled = false

/**
 * Base
 */

// TEXTURES
const textureLoader = new THREE.TextureLoader();
// const colorTexture = textureLoader.load('/static/textures/minecraft.png')
// const alphaTexture = textureLoader.load('/static/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/static/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/static/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/static/textures/door/metalness.jpg')
// const roughness = textureLoader.load('/static/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/static/textures/matcaps/1.png')
// const gradientTexture = textureLoader.load('/static/textures/gradients/3.png')
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//SPHERE
// const material = new THREE.MeshBasicMaterial()
// material.map = matcapTexture
// material.color = new THREE.Color('blue')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = alphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// // material.wireframe = true
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()
// material.matcap = matcapTexture

const material = new THREE.MeshLambertMaterial()

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
sphere.position.x = -1.5

const plane = new THREE.Mesh( new THREE.PlaneGeometry(1, 1), material  )

const torus = new THREE.Mesh ( new THREE.TorusGeometry(0.3, 0.2, 32), material)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

//lights 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
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
camera.position.x = 1
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update objects

    sphere.rotation.y =  0.1 * elapsedTime
    plane.rotation.y =  0.1 * elapsedTime
    torus.rotation.y =  0.1 * elapsedTime

    sphere.rotation.x =  0.15 * elapsedTime
    plane.rotation.x =  0.15 * elapsedTime
    torus.rotation.x =  0.15 * elapsedTime

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
      </div>
    )
  }
  