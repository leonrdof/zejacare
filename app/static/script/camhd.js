async function camhd() {
  console.log("foi aqui q tudo começou");
  // suppose we require a full HD video
  let constraints = {
    audio: false,
    video: {
      facingMode: "environment",
      width: { ideal: 1920 },
      height: { ideal: 1080 },
    },
  };

  let stream = await navigator.mediaDevices.getUserMedia(constraints);

  let stream_settings = stream.getVideoTracks();

  // actual width & height of the camera video
  let stream_width = stream_settings[0].getSettings().width;
  let stream_height = stream_settings[0].getSettings().height;
  //video.stop();
  console.log("Width: " + stream_width + "px");
  console.log("Height: " + stream_height + "px");

  // window.stream = stream; // make variable available to browser console
  //video
  //video.srcObject = stream;
}
window.onload = camhd();
