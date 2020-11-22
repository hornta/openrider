import inventoryManager from "../../inventoryManager";

function ForwardCap(value) {
	this.drawAngle = 0;
	this.colors = value;
	this.createVersion();
}
const m = Math.max;
const elements = {};
const h = 2.2;
const l = 1;
const value = 115;
const height = 112;
const dx = 0.17;
ForwardCap.prototype = new inventoryManager.HeadClass();
const self = ForwardCap.prototype;
self.versionName = "";
self.dirty = true;
self.getVersions = function () {
	return elements;
};
self.cache = function (c) {
	const obj = elements[this.versionName];
	obj.dirty = false;
	c = m(c, 1);
	const tempW = value * c * dx;
	const _rulerThickness = height * c * dx;
	const canvas = obj.canvas;
	canvas.width = tempW;
	canvas.height = _rulerThickness;
	const context = canvas.getContext("2d");
	const x = dx * c;
	const s = this.colors;
	context.save();
	context.scale(x, x);
	context.translate(0, 0);
	context.beginPath();
	context.strokeStyle = "rgba(0,0,0,0)";
	context.lineCap = "butt";
	context.lineJoin = "miter";
	context.miterLimit = 4;
	context.save();
	context.fillStyle = "#ffffff";
	context.beginPath();
	context.arc(42.4, 52.5, 30.3, 0, 6.283185307179586, true);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
	context.save();
	context.fillStyle = s.back;
	context.beginPath();
	context.moveTo(71.624, 44.496);
	context.bezierCurveTo(68.112, 31.647, 56.363, 22.2, 42.4, 22.2);
	context.bezierCurveTo(
		25.665999999999997,
		22.2,
		12.099999999999998,
		35.765,
		12.099999999999998,
		52.5
	);
	context.bezierCurveTo(
		12.099999999999998,
		55.771,
		12.623999999999999,
		58.916,
		13.582999999999998,
		61.867000000000004
	);
	context.lineTo(71.624, 44.496);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
	if (s.front) {
		context.save();
		context.beginPath();
		context.moveTo(76.917, 38.393);
		context.bezierCurveTo(
			71.677,
			25.617,
			59.54900000000001,
			16.371000000000002,
			45.172,
			15.309000000000001
		);
		context.bezierCurveTo(
			47.57899999999999,
			22.559,
			50.918,
			33.862,
			52.501,
			44.894999999999996
		);
		context.bezierCurveTo(60.643, 42.731, 68.775, 40.566, 76.917, 38.393);
		context.closePath();
		context.fillStyle = s.front;
		context.fill();
		context.stroke();
		context.restore();
	}
	context.save();
	context.beginPath();
	context.moveTo(42.4, 22.2);
	context.bezierCurveTo(59.134, 22.2, 72.7, 35.765, 72.7, 52.5);
	context.bezierCurveTo(72.7, 69.235, 59.135, 82.8, 42.4, 82.8);
	context.bezierCurveTo(25.665, 82.8, 12.1, 69.234, 12.1, 52.5);
	context.bezierCurveTo(12.1, 35.766000000000005, 25.666, 22.2, 42.4, 22.2);
	context.moveTo(42.4, 15.2);
	context.bezierCurveTo(
		21.833,
		15.2,
		5.100000000000001,
		31.932,
		5.100000000000001,
		52.5
	);
	context.bezierCurveTo(5.100000000000001, 73.068, 21.832, 89.8, 42.4, 89.8);
	context.bezierCurveTo(
		62.967999999999996,
		89.8,
		79.69999999999999,
		73.068,
		79.69999999999999,
		52.5
	);
	context.bezierCurveTo(
		79.69999999999999,
		31.932000000000002,
		62.968,
		15.2,
		42.4,
		15.2
	);
	context.lineTo(42.4, 15.2);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
	context.save();
	context.beginPath();
	context.moveTo(16.3, 66.85);
	context.bezierCurveTo(
		41.8,
		60.148999999999994,
		67.2,
		53.449999999999996,
		92.601,
		46.648999999999994
	);
	context.bezierCurveTo(
		96.201,
		45.648999999999994,
		99.8,
		44.748999999999995,
		103.5,
		43.748999999999995
	);
	context.bezierCurveTo(
		111,
		41.748999999999995,
		107.8,
		30.148999999999994,
		100.3,
		32.148999999999994
	);
	context.bezierCurveTo(
		74.901,
		38.94899999999999,
		49.400999999999996,
		45.748999999999995,
		24,
		52.449
	);
	context.bezierCurveTo(20.4, 53.449, 16.8, 54.349, 13.101, 55.349);
	context.bezierCurveTo(5.7, 57.35, 8.9, 68.85, 16.3, 66.85);
	context.lineTo(16.3, 66.85);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
};
self.setDirty = function () {
	elements[this.versionName].dirty = true;
};
self.getBaseWidth = function () {
	return value;
};
self.getBaseHeight = function () {
	return height;
};
self.getDrawOffsetX = function () {
	return h;
};
self.getDrawOffsetY = function () {
	return l;
};
self.getScale = function () {
	return dx;
};
if (inventoryManager) {
	inventoryManager.register("forward_cap", ForwardCap);
}
