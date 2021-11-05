import * as THREE from "three";


import GSAP from "gsap";

export default class Configurator {
  constructor(scene, sizes, camera,obj,views,outline) {
    this.scene = scene;
    this.sizes = sizes;
    this.group = obj.children[2]
    this.camera=camera
    this.raycaster = new THREE.Raycaster();
    this.views = views
    this.outline = outline
    this.group.updateMatrixWorld();
    this.mouse = {
      x:0,
      y:0
    }
    this.selectedItem=null;
    this.colorPicker = {
      element:document.querySelector("[data-canvasColorPicker]"),
      picking:false,
      value:""
    };
    this.down =false
    this.addEventListener()
    this.title = document.querySelector("[data-canvasTitle]");
  }
  create() {
    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    // const mesh = new THREE.Mesh( geometry, material );
    // this.group.add(mesh)
    // this.group.add(this.obj)
    this.scene.add(this.group)
    console.log(this.group)

  }

  destroy() {
    this.scene.remove(this.group);
  }
  /*---------------------------------------------
|           Object
-----------------------------------------------*/

  /*---------------------------------------------
|           Events
-----------------------------------------------*/

CreateSummary =()=> {
  
}
  onResize(sizes) {
    this.sizes = sizes;
  
  }
  onTouchDown(event) {
    if(this.Obj){
      this.selectedItem = this.Obj
      this.title.innerHTML = this.selectedItem.name
      this.outline.selectedObjects = [this.Obj]
    }
    this.down = true;

  }

  onTouchMove(event) {


      const evx = event.touches ? event.touches[0].clientX : event.clientX
      const evy = event.touches ? event.touches[0].clientY : event.clientY

      this.mouse.x = ( evx / window.innerWidth ) * 2 - 1;
      this.mouse.y = - ( evy / window.innerHeight ) * 2 + 1;
    



      //MOUSE RAYCASTER
      this.raycaster.setFromCamera( this.mouse, this.camera);
    
      if(this.group){
       
      const intersects = this.raycaster.intersectObjects(
        this.group.children
      );
     
  
      if (intersects.length > 0) {
        this.Obj = intersects[0].object;
        this.outline.selectedObjects = [this.Obj];
       
        document.querySelector("html").style.cursor = "pointer";
      } else {
        this.Obj = null;
        document.querySelector("html").style.cursor = "unset";
      }
      event.OBJ = this.Obj
 
     
  

  }

  }

  onTouchUp(event) {
    this.down = false
    
    const evx = event.touches ? event.touches[0].clientX : event.clientX
    const evy = event.touches ? event.touches[0].clientY : event.clientY

    this.colorPicker.element.style.top = evy + "px"
    this.colorPicker.element.style.left = evx+ "px"
    window.setTimeout(()=>{
      this.colorPicker.element.click()
    },100)
 
  }

  onWheel({ pixelY }) {

  }

  show() {}

  hide() {
 
  }

  scrolling() {

  }

 hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  

UpdateObj(){
  let w = this.hexToRgb(this.colorPicker.value)
  let x = new THREE.Color(`rgb(${w.r}, ${w.g}, ${w.b})`);
  this.selectedItem.material.color = x

}

  addEventListener(){

    this.colorPicker.element.addEventListener("input", ()=> {
      
     this.colorPicker.value = this.colorPicker.element.value
     console.log(this.selectedItem.material)
     this.UpdateObj()
  });

  }
update(elapsedTime){
  if(this.group){

  



    this.group.rotation.z = -0.2 - (1 + Math.sin(elapsedTime / 1.5)) / 20
    this.group.rotation.x = Math.cos(elapsedTime / 4) / 8
    this.group.rotation.y = Math.sin(elapsedTime / 4) / 8
    this.group.position.y = (1 + Math.sin(elapsedTime / 1.5)) / 10
  }
}
}
