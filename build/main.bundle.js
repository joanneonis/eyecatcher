"use strict";

var _cocoSsd = require("@tensorflow-models/coco-ssd");

var cocoSsd = _interopRequireWildcard(_cocoSsd);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

console.log(cocoSsd);

var image = document.getElementById("image");

cocoSsd.load().then(function (model) {
	return model.detect(image);
}).then(function (predictions) {
	return console.log(predictions);
});
