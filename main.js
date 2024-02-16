import * as THREE from "three"
import "./style.css"
import { OrbitControls } from "https://unpkg.com/three@0.161.0/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "https://unpkg.com/three@0.161.0/examples/jsm/loaders/GLTFLoader.js"

//Scene
const scene = new THREE.Scene()

// Set background color to white
scene.background = new THREE.Color(0xffffff)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 1000, 100)
light.position.set(10, 0, 10)
light.intensity = 1000
scene.add(light)

const light2 = new THREE.PointLight(0xffffff, 500, 100);
light2.position.set(-20, 0, -20)
light2.intensity = 100
scene.add(light2)


//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 25
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(1)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//Ändra till true senare, vill ha :)
controls.enablePan = true
controls.enableZoom = true
controls.autoRotate = true

//Resize
window.addEventListener('resize', () => {
  
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  
  //Update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

// Load glTF model
const loader = new GLTFLoader()
loader.load(
  'https://cdn.glitch.global/d40fc26e-4b55-4da6-ba8d-81a605ff070e/vending%20test.glb?v=1708081943477',
  (gltf) => {
    const model = gltf.scene
    // Calculate the center of the object
    const boundingBox = new THREE.Box3().setFromObject(model)
    const center = new THREE.Vector3()
    boundingBox.getCenter(center)
    // Set the pivot point of the object to its center
    model.position.sub(center)
    scene.add(model)
  },
  undefined,
  (error) => {
    console.error('Error loading glTF model', error)
  }
)

//Loop
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
