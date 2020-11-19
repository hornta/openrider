import Tool from "./tool";
import Vector2 from "../math/vector2";

const StraightLineTool = function (self) {
	this.game = self.scene.game;
	this.toolInit(self);
	this.p1 = new Vector2(0, 0);
	this.p2 = new Vector2(0, 0);
	this.active = false;
	this.shouldDrawMetadata = false;
	this.options = {};
};

StraightLineTool.prototype = new Tool();
const self = StraightLineTool.prototype;
self.toolInit = self.init;
self.toolUpdate = self.update;
self.toolDraw = self.draw;
self.name = "StraightLine";
self.p1 = null;
self.p2 = null;
self.active = false;
self.reset = function () {
	this.active = false;
};
self.press = function () {
	if (!this.active) {
		const b = this.mouse.touch.real;
		this.p1.x = b.x;
		this.p1.y = b.y;
		this.active = true;
	}
};
self.getOptions = function () {
	const options = this.toolhandler;
	const o = this.options;
	return (
		(o.lineType = options.options.lineType), (o.snap = options.options.snap), o
	);
};
self.hold = function () {
	const b = this.mouse.touch.real;
	this.p2.x = b.x;
	this.p2.y = b.y;
	this.toolhandler.moveCameraTowardsMouse();
};
self.release = function () {
	const p1 = this.p1;
	const p2 = this.p2;
	const geometrizeRasterizerRasterizer = this.scene.track;
	const el = this.toolhandler;
	let inFolder = false;
	inFolder =
		el.options.lineType === "physics"
			? geometrizeRasterizerRasterizer.addPhysicsLine(p1.x, p1.y, p2.x, p2.y)
			: geometrizeRasterizerRasterizer.addSceneryLine(p1.x, p1.y, p2.x, p2.y);
	if (inFolder) {
		el.addActionToTimeline({
			type: "add",
			objects: [inFolder],
		});
	}
	const p = el.snapPoint;
	p.x = p2.x;
	p.y = p2.y;
	this.active = false;
};
self.update = function () {
	this.toolUpdate();
	const mouse = this.toolhandler.gamepad;
	if (this.toolhandler.options.snap) {
		this.active = true;
		this.p1 = this.toolhandler.snapPoint;
		this.hold();
	}
	this.shouldDrawMetadata = Boolean(mouse.isButtonDown("ctrl"));
};
self.draw = function () {
	const scene = this.scene;
	const node = (scene.game.canvas, scene.game.canvas.getContext("2d"));
	const camera = scene.camera;
	const zoom = camera.zoom;
	node.save();
	this.drawCursor(node);
	if (this.active) {
		this.drawLine(node, zoom);
		this.drawPoint(node, this.p1, zoom);
		this.drawPoint(node, this.p2, zoom);
		this.drawPointData(node, this.p2, zoom);
	}
	node.restore();
};
self.drawCursor = function (ctx) {
	const obj = this.mouse.touch.real.toScreen(this.scene);
	const zoom = this.camera.zoom;
	const data = this.toolhandler;
	let r = data.options.grid;
	const parBgColor = "#1884cf";
	if (r) {
		r = 5 * zoom;
		ctx.beginPath();
		ctx.moveTo(obj.x, obj.y - r);
		ctx.lineTo(obj.x, obj.y + r);
		ctx.moveTo(obj.x - r, obj.y);
		ctx.lineTo(obj.x + r, obj.y);
		ctx.lineWidth = Number(zoom);
		ctx.closePath();
		ctx.stroke();
	} else {
		ctx.lineWidth = 1;
		ctx.fillStyle = parBgColor;
		ctx.beginPath();
		ctx.arc(obj.x, obj.y, Number(zoom), 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
	}
};
self.drawPoint = function (ctx, text, size) {
	const obj = text.toScreen(this.scene);
	ctx.beginPath();
	ctx.arc(obj.x, obj.y, Number(size), 0, 2 * Math.PI, false);
	ctx.lineWidth = 1;
	ctx.fillStyle = "#1884cf";
	ctx.fill();
};
self.drawPointData = function (ctx, options) {
	const intersect = options.toScreen(this.scene);
	if (this.shouldDrawMetadata) {
		let s = this.p1.getAngleInDegrees(this.p2);
		s = s.toFixed(2);
		const targets = this.game.pixelRatio;
		ctx.fillStyle = "#000000";
		ctx.font = `${8 * targets}pt arial`;
		ctx.fillText(`${String(s)}\u00b0`, intersect.x + 10, intersect.y + 10);
		ctx.strokeText(`${String(s)}\u00b0`, intersect.x + 10, intersect.y + 10);
	}
};
self.drawLine = function (context, props) {
	const scene = this.scene;
	const buttonStrokeSize =
		(scene.game.canvas, 2 * props > 0.5 ? 2 * props : 0.5);
	const options = this.toolhandler;
	const lineType = options.options.lineType;
	const color = lineType === "physics" ? "#000" : "#AAA";
	context.beginPath();
	context.lineWidth = buttonStrokeSize;
	context.lineCap = "round";
	context.strokeStyle = color;
	const obj = this.p1.toScreen(this.scene);
	const thumbPoint = this.p2.toScreen(this.scene);
	context.moveTo(obj.x, obj.y);
	context.lineTo(thumbPoint.x, thumbPoint.y);
	context.stroke();
};

export default StraightLineTool;
