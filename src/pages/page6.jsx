import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import React, { useEffect } from 'react';
import * as dat from 'dat.gui'
// import { Material } from 'three';
// import { CubeTextureLoader } from 'three';

export default function Page6() {
  useEffect(() => {

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// debug
const gui = new dat.GUI()
// TEXTURES
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
// const colorTexture = textureLoader.load('/static/textures/door/color.jpg')
// const alphaTexture = textureLoader.load('/static/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/static/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/static/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/static/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/static/textures/door/metalness.jpg')
// const roughness = textureLoader.load('/static/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/static/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/static/textures/gradients/3.png')
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false 

const environmentMapTexture = cubeTextureLoader.load([
  '/static/textures/environmentMaps/0/px.jpg',
  '/static/textures/environmentMaps/0/nx.jpg',
  '/static/textures/environmentMaps/0/py.jpg',
  '/static/textures/environmentMaps/0/ny.jpg',
  '/static/textures/environmentMaps/0/pz.jpg',
  '/static/textures/environmentMaps/0/nz.jpg',
  
])
const environmentMapTexture1 = cubeTextureLoader.load([
  '/static/textures/environmentMaps/1/px.jpg',
  '/static/textures/environmentMaps/1/py.jpg',
  '/static/textures/environmentMaps/1/ny.jpg',
  '/static/textures/environmentMaps/1/pz.jpg',
  '/static/textures/environmentMaps/1/nx.jpg',
  '/static/textures/environmentMaps/1/nz.jpg',
  
])
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//lights 
const ambientLight = new THREE.AmbientLight(0xffffff, 5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Objects

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('#ff0000')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide
// material.flatShading = true

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// gradientTexture.generateMipmaps = false
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

// const material3 = new THREE.MeshStandardMaterial()
// material.metalness = 0
// material.roughness = 1
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = heightTexture
// material.displacementScale = 0.05
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughness
// material.normalMap = normalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = alphaTexture

const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 0
material.envMap = environmentMapTexture
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const material1 = new THREE.MeshStandardMaterial()
material1.metalness = 1
material1.roughness = 0
material1.envMap = environmentMapTexture1

const materialBasic = new THREE.MeshStandardMaterial()
materialBasic.color = new THREE.Color('blue')
// materialBasic.map = matcapTexture
materialBasic.wireframe = true

const materialMatcap = new THREE.MeshMatcapMaterial()
materialMatcap.matcap = matcapTexture

const materialLambert = new THREE.MeshLambertMaterial()


//3D MODELS

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64),material)
sphere.position.set(-1.5, 0, 0)
const sphere1 = new THREE.Mesh( new THREE.SphereGeometry(0.5, 64, 64), material1)
sphere1.position.set(-1.5, 1, 0)

const sphere2 = new THREE.Mesh( new THREE.SphereGeometry(0.5, 64, 64), materialBasic)
sphere2.position.set(-1.5, 2, 0)

const sphere3 = new THREE.Mesh( new THREE.SphereGeometry(0.5, 64, 64), materialMatcap)
sphere3.position.set(-1.5, -1, 0)

const sphere4 = new THREE.Mesh( new THREE.SphereGeometry(0.5, 64, 64), materialLambert)
sphere4.position.set(-1.5, -2, 0)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const plane1 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const plane3 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const plane4 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const plane5 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const plane6 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const plane7 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
const plane8 = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)




const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128),material)
torus.position.set(1.5, 1, 0 )

const torus1 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128),material)
torus1.position.set(1.5, 2, 0 )

const torus2 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128),material)
torus2.position.set(1.5, -1, 0 )

const torus3 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128),material)
torus3.position.set(1.5, -2, 0 )

const torus4 = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128),material)
torus4.position.set(1.5, 0, 0 )

const box = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1), material)
box.position.set(-1.5, 0, 1.5)

const box1 = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1), material)
box1.position.set(1.5, 0, -1.5)

const box2 = new THREE.Mesh ( new THREE.BoxGeometry(1,5,1), material)
box2.position.set(1.5, 0, 1.5)

const box3 = new THREE.Mesh (new THREE.BoxGeometry(1, 5, 1), material)
box3.position.set(-1.5, 0, -1.5)

const box4 = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 1), material)
box4.position.set(0, 0, 0)
scene.add(sphere, sphere1, sphere2, sphere3, sphere4, plane, torus, torus1, torus2, torus3, torus4)
scene.add(box, box1, box2, box3, box4)
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
  