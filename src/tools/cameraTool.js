import Tool from "./tool";

const CameraTool = function (a) {
	this.toolInit(a);
};
CameraTool.prototype = new Tool();
const self = CameraTool.prototype;
self.toolInit = self.init;
self.toolDraw = self.draw;
self.name = "Camera";
self.hold = function () {
	const e = this.mouse.touch;
	const start = e.position;
	const camera = this.camera;
	const i = e.old.position.subtract(start).multiply(1 / camera.zoom);
	camera.position.inc(i);
};
self.draw = function () {
	const scene = this.scene;
	scene.game.canvas.getContext("2d");
};
self.drawText = function (ctx) {
	const name = this.name;
	const dpr = this.game.pixelRatio;

	ctx.fillStyle = "#000000";
	ctx.font = `${12 * dpr}pt arial`;
	ctx.fillText(name, 10 * dpr, 20 * dpr);
	ctx.font = `${8 * dpr}pt arial`;
};

export default CameraTool;
