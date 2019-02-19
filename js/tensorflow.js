/**
 * Tensorflow stuff
 */

const videoRef = document.getElementById("videoRef");
const canvasRef = document.getElementById("canvasRef");
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
      this.prepareWords(predictions);
  
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
  
    predictions.forEach(prediction => {
      let big = false;
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      const size = width + height;


      // only keeps track of the biggest one yet. 
      // TODO empty bigfish?
      if (biggestFish === undefined || biggestFish === null) {
        biggestFish = {...prediction, size: size};
        big = true;
      } else if (size > biggestFish.size) {
        biggestFish = {...prediction, size: size};
        big = true;
      } else {
        big = false;
      }
  
      // bounding box.
      ctx.strokeStyle = big ? "#ffa500" : "#00FFFF";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, width, height);
  
      // label
      ctx.fillStyle = big ? "#ffa500" : "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10); 
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class + prediction.score, x, y);
    });

    console.log(biggestFish);
  },

  prepareWords(predictions) {

  }
};

tensorflow.init();
