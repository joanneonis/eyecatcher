/**
 * Tensorflow stuff
 */

const videoRef = document.getElementById("videoRef");
const canvasRef = document.getElementById("canvasRef");
const servo = document.getElementById("servo-wheel");
let biggestFish;

const tensorflow = {
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.webcam();
    });
  },
  webcam() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        })
        .then(stream => {
          window.stream = stream;
          videoRef.srcObject = stream;
          return new Promise((resolve, reject) => {
            videoRef.onloadedmetadata = () => {
              resolve();
            };
          });
        });
      const modelPromise = cocoSsd.load();
    
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(videoRef, values[0]);
          console.log('the model', values[0]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },

  detectFrame(video, model) {
    model.detect(video).then(predictions => {
      this.renderPredictions(predictions);
  
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  },

  renderPredictions(predictions) {
    biggestFish = null;
    
    const ctx = canvasRef.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    // Font options.
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";


    const testArray = [];

    for (let i = 0; i < predictions.length; i++) {
    // predictions.forEach(prediction => {

      const x = predictions[i].bbox[0];
      const y = predictions[i].bbox[1];
      const width = predictions[i].bbox[2];
      const height = predictions[i].bbox[3];
      const size = width + height;

      testArray.push(size);

      const biggest = Math.max.apply(Math, testArray);
      const biggestIndex = testArray.indexOf(biggest);
      const focus = i === biggestIndex && biggest > 500;

      // console.log(testArray, "the winner is" ,biggest);

      // bounding box.
      ctx.strokeStyle = focus ? "#ffa500" : "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
  
      // label
      ctx.fillStyle = focus ? "#ffa500" : "#00FFFF";
      const textWidth = ctx.measureText(predictions[i].class).width;
      const textHeight = parseInt(font, 10); 
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(predictions[i].class + "score:" + Math.round((predictions[i].score)*100) + "%" , x, y); //predictions[i].class + predictions[i].score // devide 5 because its 500px width
    
      if (focus) {
        servo.style.webkitTransform = "rotate("+x+"deg)";
      }
    };
  },
};

tensorflow.init();


