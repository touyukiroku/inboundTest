function checkQRCode(id) {
  const video = document.querySelector("video");
  const canv = document.createElement("canvas");
  const ctx = canv.getContext("2d");

  ctx.drawImage(video, 0, 0, canv.width, canv.height);
  const imageData = ctx.getImageData(0, 0, canv.width, canv.height);
  const code = jsQR(imageData.data, canv.width, canv.height);

  if (code) {
    canv.style.display = 'block';
    video.style.display = 'none';
    video.pause();

    let s = Encoding.codeToString(Encoding.convert(code.binaryData, {to:'UNICODE', from:'SJIS'}));
    alert(s);
  } else {
    setTimeout( () => {
      checkQRCode(id);
    }, 300);
  }
}

navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
  getUserMedia: function(c) {
   return new Promise(function(y, n) {
     (navigator.mozGetUserMedia ||
      navigator.webkitGetUserMedia).call(navigator, c, y, n);
   });
  }
} : null);
if (!navigator.mediaDevices) {
  console.log("getUserMedia() not supported.");
  return;
}

const video = document.querySelector("video");
const canv = document.createElement("canvas");
canv.height = this.height;
canv.width = this.width;
const ctx = canv.getContext("2d");

const constraints = { audio: false, video: { /*width: 300, height: 200, facingMode: "user"*/facingMode: "environment" } };
navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {
  video.srcObject = stream;
  video.onloadedmetadata = (e) => {
    video.play();
    checkQRCode(id);
  };
})
.catch((err) => {
  console.log(err.name + ": " + err.message);
  //msg('', 'すみません。カメラが見つからないか、アクセス権限がありません。'+err.name + ": " + err.message);
});
