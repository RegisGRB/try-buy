import * as THREE from "three";
import Configurator from "./Configurator"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
export default class Canvas {
  constructor() {
    if (
      document.querySelector("main") &&
      !document.body.classList.contains("loaded")
    ) {
      this.createRender();
      this.createCamera();
      this.createScene();
      this.onResize();
      this.mouse = new THREE.Vector2();
      this.clock = new THREE.Clock();
      this.action = null;
      this.createControle()
      this.createLight()
      this.addEventListeners()
      this.CreateOutline()
      this.update()
    
      this.CreateLoader()
    
      document.body.classList.add("loaded");
    }

  }
CreateOutline = () =>{
       this.composer = new EffectComposer( this.renderer );

        this.renderPass = new RenderPass( this.scene, this.camera );
				this.composer.addPass( this.renderPass );

				this.outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), this.scene, this.camera );
        this.outlinePass.visibleEdgeColor = new THREE.Color("#3f0a5c")
        this.outlinePass.edgeStrength = 9
        this.outlinePass.pulsePeriod = 6
        this.outlinePass.hiddenEdgeColor =""
				this.composer.addPass( this.outlinePass );

}

  CreateLoader(){
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/"); // assembly draco is better/faster like that (draco folder in public folder)
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      "./shoe.gltf",
      (gltf) => {
        console.log("success");
        console.log(gltf);
        this.obj=gltf.scene
        this.createGroup()
      },
      (progress) => {
        console.log("progress");
        console.log(progress);
      },
      (error) => {
        console.log("error");
        console.log(error);
      }
    );
  }
  createControle() {

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.update();
    this.controls.maxPolarAngle= Math.PI / 2
    // this.controls.minPolarAngle= Math.PI / 2
   this.controls.minDistance  = 2
   this.controls.maxDistance  = 3
  }

  createRender() {
    let pixelRatio = window.devicePixelRatio;
    let AA = true;
    if (pixelRatio > 1) {
      AA = false;
    }
    this.canvas = document.querySelector("#CanvasConfiguration");
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: AA , canvas:this.canvas });
   
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  createScene() {
    this.scene = new THREE.Scene();
  }
  createCamera() {
    this.camera = new THREE.PerspectiveCamera();
    this.camera.position.z =3;
  }
  createLight(){
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);
  }
  
  destroy() {}

  createAction(action) {
    this.action = (e) => {
      action(e);
    };
  }
  destroyAction() {
    this.action = null;
  }
  addGroup(group) {
    this.scene.add(group);
  }
  removeGroup(group) {
    this.scene.remove(group);
  }
  getSizes() {
  
  }
  /*---------------------------------------------
|           3D GROUP
-----------------------------------------------*/
  createGroup() {
   
    this.currentGroup = new Configurator(this.scene, this.sizes, this.camera,this.obj,  this.canvas,this.outlinePass)
    this.currentGroup.create()
  }




  /*---------------------------------------------
|           Events
-----------------------------------------------*/
  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const fov = this.camera.fov * (Math.PI / 180);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.sizes = {
      height,
      width,
      caspect: this.camera.aspect,
    };
    if (this.currentGroup && this.currentGroup.onResize) {
      this.currentGroup.onResize(this.sizes);
    }
  }
  onTouchDown(event) {
    if (this.currentGroup) {
      this.currentGroup.onTouchDown(event);
    }
  }

  onTouchMove(event) {
    if (this.currentGroup) {
      this.currentGroup.onTouchMove(event);
    }
  }

  onTouchUp(event) {
    if (this.currentGroup) {
      this.currentGroup.onTouchUp(event);
    }
  }

  onWheel(event) {
    if (this.currentGroup && this.currentGroup.onWheel) {
      this.currentGroup.onWheel(event);
    }
  }


  update() {
    this.clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime =  this.clock.getElapsedTime();
      this.controls.update();
      if (this.currentGroup && this.currentGroup.update) {
        this.currentGroup.update(elapsedTime);
      }
      this.composer.render()
      window.requestAnimationFrame(tick);
    };
    tick();
    // if (this.currentGroup && this.currentGroup.update) {
    //   this.currentGroup.update();
    // }
    // this.controls.update();
    // this.renderer.render(this.scene, this.camera);
  }

  addEventListeners() {

    window.addEventListener("mousedown", this.onTouchDown.bind(this));
    window.addEventListener("mousemove", this.onTouchMove.bind(this));
    window.addEventListener("mouseup", this.onTouchUp.bind(this));

    window.addEventListener("touchstart", this.onTouchDown.bind(this));
    window.addEventListener("touchmove", this.onTouchMove.bind(this));
    window.addEventListener("touchend", this.onTouchUp.bind(this));


    window.addEventListener("resize", this.onResize.bind(this));
  }
}
