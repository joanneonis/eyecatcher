const artyom = new Artyom();

artyom.initialize({
	continuous:true,
	lang:"nl-NL",
	executionKeyword: "and do it now",
	listen:true,
	debug:true
});


(function() {
const videoRef = document.getElementById("videoRef");
const canvasRef = document.getElementById("canvasRef");

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
			detectFrame(videoRef, values[0]);
			console.log('the model', values[0]);
		})
		.catch(error => {
			console.error(error);
		});
}

function detectFrame(video, model) {
	model.detect(video).then(predictions => {
		renderPredictions(predictions);
		requestAnimationFrame(() => {
			detectFrame(video, model);
		});
	});
};

function renderPredictions(predictions) {
	const ctx = canvasRef.getContext("2d");
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	// Font options.
	const font = "16px sans-serif";
	ctx.font = font;
	ctx.textBaseline = "top";
	predictions.forEach(prediction => {
		const x = prediction.bbox[0];
		const y = prediction.bbox[1];
		const width = prediction.bbox[2];
		const height = prediction.bbox[3];
		// Draw the bounding box.
		ctx.strokeStyle = "#00FFFF";
		ctx.lineWidth = 4;
		ctx.strokeRect(x, y, width, height);
		// Draw the label background.
		ctx.fillStyle = "#00FFFF";
		const textWidth = ctx.measureText(prediction.class).width;
		const textHeight = parseInt(font, 10); // base 10
		ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
	});

	console.log(predictions, predictions.length);

	predictions.forEach(prediction => {
		const x = prediction.bbox[0];
		const y = prediction.bbox[1];
		// Draw the text last to ensure it's on top.
		ctx.fillStyle = "#000000";
		ctx.fillText(prediction.class, x, y);

		// prepareWord(prediction);
	});
};

let oldWord;

function prepareWord(prediction) {
	// console.log(prediction.class, prediction.score);

	// if () {

	// }

	// sayWord(word);
}

function sayWord(word) {
	artyom.say(word,{
		onStart:function(){
				console.log("Start tekst voorlezen");
		},
		onEnd:function(){
				console.log("Tekst gelezen!");
		}
	});
}
})();