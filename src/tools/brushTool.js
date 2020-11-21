import Tool from "./tool";
import Vector2 from "../math/vector2";

const BrushTool = function (self) {
	this.toolInit(self);
	this.p1 = new Vector2(0, 0);
	this.p2 = new Vector2(0, 0);
	this.active = false;
	const ctx = self.scene.settings.brush;
	this.addedObjects = [];
	this.options = {
		breakLength: ctx.breakLength,
		maxBreakLength: ctx.maxBreakLength,
		minBreakLength: ctx.minBreakLength,
		breakLengthSensitivity: ctx.breakLengthSensitivity,
		trailSpeed: ctx.trailSpeed,
		maxTrailSpeed: ctx.maxTrailSpeed,
		minTrailSpeed: ctx.minTrailSpeed,
		trailSpeedSensitivity: ctx.trailSpeedSensitivity,
	};
};
BrushTool.prototype = new Tool();
const self = BrushTool.prototype;
self.toolInit = self.init;
self.toolUpdate = self.update;
self.name = "Brush";
self.p1 = null;
self.p2 = null;
self.active = false;
self.options = null;
self.reset = function () {
	this.recordActionsToToolhandler();
	this.active = false;
};
self.recordActionsToToolhandler = function () {
	const attempts = this.addedObjects;
	const attemptsLength = attempts.length;
	if (attemptsLength) {
		let trapId = 0;
		for (; attemptsLength > trapId; trapId++) {
			this.toolhandler.addActionToTimeline({
				type: "add",
				objects: [attempts[trapId]],
			});
		}
	}
	this.addedObjects = [];
};
self.press = function () {
	if ((this.recordActionsToToolhandler(), !this.active)) {
		const b = this.mouse.touch.real;
		this.p1.x = b.x;
		this.p1.y = b.y;
		this.p2.x = b.x;
		this.p2.y = b.y;
		this.active = true;
	}
};
self.hold = function () {
	const r = this.mouse.touch.real;
	const p1 = this.p1;
	const p2 = this.p2;
	const value = this.options.trailSpeed;
	const scale = this.options.breakLength;
	p2.inc(r.subtract(p2).multiply(value));
	let stemHeight = window.screen.height + r.subtract(p2).length();
	if (((stemHeight *= scale), p2.subtract(p1).lenSqr() > stemHeight)) {
		const geometrizeRasterizerRasterizer = this.scene.track;
		let a = false;
		a =
			this.toolhandler.options.lineType === "physics"
				? geometrizeRasterizerRasterizer.addPhysicsLine(p1.x, p1.y, p2.x, p2.y)
				: geometrizeRasterizerRasterizer.addSceneryLine(p1.x, p1.y, p2.x, p2.y);
		if (a) {
			this.addedObjects.push(a);
		}
		p1.equ(p2);
		this.toolhandler.snapPoint.x = p2.x;
		this.toolhandler.snapPoint.y = p2.y;
	}
	this.toolhandler.moveCameraTowardsMouse();
};
self.release = function () {
	const p1 = this.p1;
	const p2 = this.p2;
	const geometrizeRasterizerRasterizer = this.scene.track;
	let s = false;
	s =
		this.toolhandler.options.lineType === "physics"
			? geometrizeRasterizerRasterizer.addPhysicsLine(p1.x, p1.y, p2.x, p2.y)
			: geometrizeRasterizerRasterizer.addSceneryLine(p1.x, p1.y, p2.x, p2.y);
	if (s) {
		this.addedObjects.push(s);
	}
	this.recordActionsToToolhandler();
	const p = this.toolhandler.snapPoint;
	p.x = p2.x;
	p.y = p2.y;
	this.active = false;
};
self.update = function () {
	const eKeys = this.toolhandler.gamepad;
	const root = this.mouse;
	if (eKeys.isButtonDown("alt")) {
		if (root.mousewheel !== false) {
			this.adjustTrailSpeed(root.mousewheel);
		}
	} else if (eKeys.isButtonDown("shift") && root.mousewheel !== false) {
		this.adjustBreakLength(root.mousewheel);
	}
	if (this.toolhandler.options.snap) {
		this.active = true;
		this.p1.x = this.toolhandler.snapPoint.x;
		this.p1.y = this.toolhandler.snapPoint.y;
		this.p2.x = root.touch.real.x;
		this.p2.y = root.touch.real.y;
	}
	this.toolUpdate();
};
self.adjustTrailSpeed = function (canCreateDiscussions) {
	let size = this.options.trailSpeed;
	const position = this.options.trailSpeedSensitivity;
	const max = this.options.maxTrailSpeed;
	const len = this.options.minTrailSpeed;
	if (canCreateDiscussions > 0) {
		size += position;
		if (size > max) {
			size = max;
		}
	} else {
		size -= position;
		if (len > size) {
			size = len;
		}
	}
	this.setOption("trailSpeed", size);
};
self.adjustBreakLength = function (canCreateDiscussions) {
	let width = this.options.breakLength;
	const margin = this.options.breakLengthSensitivity;
	const canvasWidth = this.options.maxBreakLength;
	const height = this.options.minBreakLength;
	if (canCreateDiscussions > 0) {
		width += margin;
		if (width > canvasWidth) {
			width = canvasWidth;
		}
	} else {
		width -= margin;
		if (height > width) {
			width = height;
		}
	}
	this.setOption("breakLength", width);
};
self.setOption = function (key, value) {
	this.options[key] = value;
};
self.getOptions = function () {
	const options = this.toolhandler;
	const o = this.options;
	return (
		(o.lineType = options.options.lineType), (o.snap = options.options.snap), o
	);
};
self.draw = function () {
	const scene = this.scene;
	const node = (scene.game.canvas, scene.game.canvas.getContext("2d"));
	const camera = scene.camera;
	const zoom = camera.zoom;
	this.drawCursor(node);
	if (this.active) {
		this.drawLine(node, zoom);
		this.drawPoint(node, this.p1, zoom);
		this.drawPoint(node, this.p2, zoom);
	}
};
self.drawText = function (ctx) {
	const name = this.name;
	const max = this.options.breakLength;
	let id = this.options.trailSpeed;
	const dpr = this.game.pixelRatio;
	ctx.fillStyle = "#000000";
	ctx.font = `${12 * dpr}pt arial`;
	ctx.fillText(name, 10 * dpr, 20 * dpr);
	ctx.font = `${8 * dpr}pt arial`;
	id = Math.trunc(id);
	ctx.fillText(`Trail speed : ${id}`, 10 * dpr, 40 * dpr);
	ctx.fillText(`Break length : ${max}`, 10 * dpr, 60 * dpr);
};
self.drawCursor = function (ctx) {
	const obj = this.mouse.touch.real.toScreen(this.scene);
	const zoom = this.camera.zoom;
	const data = this.toolhandler;
	let r = (data.options.lineType, data.options.grid);
	const parBgColor = "#1884cf";
	if (r) {
		r = 5 * zoom;
		ctx.beginPath();
		ctx.moveTo(obj.x, obj.y - r);
		ctx.lineTo(obj.x, obj.y + r);
		ctx.moveTo(obj.x - r, obj.y);
		ctx.lineTo(obj.x + r, obj.y);
		ctx.lineWidth = Number(zoom);
		ctx.stroke();
	} else {
		ctx.beginPath();
		ctx.arc(obj.x, obj.y, Number(zoom), 0, 2 * Math.PI, false);
		ctx.lineWidth = 1;
		ctx.fillStyle = parBgColor;
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

export default BrushTool;
