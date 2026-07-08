AFRAME.registerComponent("overlay", {
    dependencies: ['material'],
    init: function () {
    //overlay this element on top
    //will aplly to matching entities for some reason I dont understand
     this.el.sceneEl.renderer.sortObjects = true;             
     //arbitrary number of elements in the scene and overlay
     document.querySelector('#long-video').object3D.renderOrder = 100;
     this.el.components.material.material.depthTest = false; 
    }
  });