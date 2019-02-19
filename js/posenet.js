/**
 * Tensorflow stuff
 */

import * as posenet from '@tensorflow-models/posenet';

const videoRef = document.getElementById("videoRef");
const canvasRef = document.getElementById("canvasRef");

const posenetTest = {
  init() {
    document.addEventListener('DOMContentLoaded', () => {
			// this.webcam();
			this.poseImageTest();
		});
	},
	poseImageTest() {
		const imageScaleFactor = 0.50;
		const flipHorizontal = false;
		const outputStride = 16;
		// get up to 5 poses
		const maxPoseDetections = 5;
		// minimum confidence of the root part of a pose
		const scoreThreshold = 0.5;
		// minimum distance in pixels between the root parts of poses
		const nmsRadius = 20;
		const imageElement = document.getElementById('cat');
		// load posenet
		const net = await posenet.load();
		const poses = await net.estimateMultiplePoses(
			imageElement, imageScaleFactor, flipHorizontal, outputStride,    
			maxPoseDetections, scoreThreshold, nmsRadius);

		console.log("test", poses);
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
      const modelPromise = posenet.load();
    
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(videoRef, values[0]);
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
};

posenetTest.init();
