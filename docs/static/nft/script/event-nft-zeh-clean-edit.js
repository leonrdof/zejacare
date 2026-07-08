function screenupdt(){  
  var height = $(window).height();
  var width = $(window).width();
  return {
    xwidth: width,
    yheight: height
  }
}

window.addEventListener('arjs-nft-loaded', function (){
  console.log("screen when nft loaded largura " + screenupdt().xwidth);
  console.log("screen when nft loaded altura " + screenupdt().yheight);

  document.querySelector('#abertura').play();

  console.log(document.querySelector('#abertura').duration);
  console.log(document.querySelector('#abertura').currentTime);
});
AFRAME.registerComponent('listen-marker', {
    init: function (e) {
      
      const marker = document.querySelector('#nft-marker');
      const popup = document.querySelector('#popup-entity');

      function foundmarker(){
        console.log('marker found');
        var cont = document.querySelector('#abertura');
        console.log(cont.duration);
        var starttime = (cont.duration-cont.currentTime);
        if (cont.currentTime == cont.duration) {
          var starttime = 500;
        } else {
          var starttime = (cont.duration-cont.currentTime);
        }
        console.log(starttime);
        if (!(document.querySelector('#bg-entity').object3D.visible)){
          setTimeout(emit, starttime);
        } else{
          marker.object3D.visible = false;
        }

        function emit(){
          console.log('past timer');

          if (marker.object3D.visible){
            popup.setAttribute('class','clickable');        
            var widthpopup = screenupdt().xwidth*0.75;
            var heightpopup = widthpopup*1.45;
            var poswidth = (screenupdt().yheight*1.1)*(-1);
            popup.object3D.position.set(0,0,poswidth);            
            popup.object3D.scale.set(widthpopup,heightpopup,1);

            console.log("popup dimensions w h pos "+widthpopup+" "+heightpopup+" "+poswidth);
            
            popup.object3D.visible = true;
            marker.object3D.visible = true;

            handleclicks();

          } else{
            popup.removeAttribute('class');
            popup.object3D.visible = false;
            marker.object3D.visible = false;     
          }
        }
      }

      marker.addEventListener('markerFound', foundmarker);

      marker.addEventListener('markerLost', function() {
        popup.removeAttribute('class');
        popup.object3D.visible = false;
      });
    }
});

function handleclicks(){
    const marker = document.querySelector('#nft-marker');
    const videoEntity = document.querySelector('#long-video');
    const popup = document.querySelector('#popup-entity');
    const video = document.querySelector("#video");
    const backg = document.querySelector('#bg-entity');   

    console.log('iniciou o log popup');
    console.log("background is active "+backg.getAttribute('visible'));
    console.log("popup when marker found is "+ popup.getAttribute('class'));
    
    //listen only background clicks
    backg.addEventListener('click', function (){

      //set clickable elements
      backg.removeAttribute('class');

      //run click event
      //clean screen
      video.pause();
      videoEntity.object3D.visible = false;
      backg.object3D.visible = false;
      setTimeOut(function(){marker.object3D.visible = true;},500)        
      popup.object3D.visible = false;
      video.currentTime = 0;       
      
    });
    
    //listen only popup clicks
    popup.addEventListener('click', function(){
           
      console.log('clicou ') ;
      console.log(backg.getAttribute('class') + " background");
      console.log(popup.getAttribute('class') + " popup");
      console.log(videoEntity.getAttribute('class') + " videostream");
      
      //set clickable elements
      popup.removeAttribute('class');
      backg.setAttribute('class','clickable');

      //construct elements size and position
      backg.setAttribute('height', screenupdt().yheight);
      backg.setAttribute('width', screenupdt().xwidth);
      videoEntity.object3D.position.set(0,0,(screenupdt().yheight*(-1)));  
      const aspect = 720/960;     
      var videowidth = (screenupdt().xwidth)-150;  
    
      console.log(videowidth + " ratio");
      console.log(screenupdt().yheight + " pos");
      
      videoEntity.setAttribute('height', Math.ceil(videowidth*aspect));
      videoEntity.setAttribute('width',videowidth);      
      videoEntity.object3D.position.set(0,0,(screenupdt().yheight*(-1)));
      
      console.log('updated dimentions');     

      console.log(backg.getAttribute('visible') + " background visibility");
      console.log('play');
      
      //make elements visible on screen and autoplay
      marker.object3D.visible = false;  
      popup.object3D.visible = false;
      backg.object3D.visible = true;
      videoEntity.object3D.visible = true;
      video.play();                           

      console.log(backg.getAttribute('class') + " background");
      console.log(popup.getAttribute('class') + " popup");
      console.log(videoEntity.getAttribute('class') + " videostream");

    });  
  }
   
