import Boost from "../../sector/powerups/boost";
import Tool from "../tool";
import Vector2 from "../../math/vector2";

const PI = Math.PI;
const atan2 = Math.atan2;
const rnd = Math.sqrt;
const max = Math.max;
const min = Math.min;
const BoostTool = function (data) {
	this.toolInit(data);
	this.powerup = new Boost(0, 0, 0, data.scene.track);
	this.p1 = new Vector2(0, 0);
	this.p2 = new Vector2(0, 0);
	this.active = false;
};
BoostTool.prototype = new Tool();
const self = BoostTool.prototype;
self.toolInit = self.init;
self.toolUpdate = self.update;
self.powerup = null;
self.name = "boost";
self.p1 = null;
self.p2 = null;
self.active = false;
self.press = function () {
	const node = this.mouse.touch;
	const d = node.real;
	this.p1.x = d.x;
	this.p1.y = d.y;
	this.p2.x = d.x;
	this.p2.y = d.y;
	this.active = true;
};
self.hold = function () {
	const node = this.mouse.touch;
	const d = node.real;
	this.p2.x = d.x;
	this.p2.y = d.y;
};
self.release = function () {
	const obj = this.scene.track;
	const a = new Boost(this.p1.x, this.p1.y, this.powerup.angle, obj);
	obj.addPowerup(a);
	this.active = false;
	this.toolhandler.addActionToTimeline({
		type: "add",
		objects: [a],
	});
};
self.draw = function (x) {
	const node = this.mouse.touch;
	const r = (node.pos, this.camera.zoom);
	const camera = this.scene.screen;
	const device = this.scene.settings.device;
	if (this.active === true) {
		const a = camera.realToScreen(this.p1.x, "x");
		const b = camera.realToScreen(this.p1.y, "y");
		const p1 = this.p1;
		const p2 = this.p2;
		const profName = p1.y - p2.y;
		const p = p1.x - p2.x;
		let angle = atan2(p1.y - p2.y, p1.x - p2.x);
		if (p === 0 && profName === 0) {
			angle = PI - PI / 2;
		}
		if (angle < 0) {
			angle = angle + 2 * PI;
		}
		this.drawPathToMouse(x, angle);
		this.powerup.angle = (angle * (180 / PI) - 90) | 0;
		this.powerup.draw(a, b, r, x);
	} else if (device === "desktop") {
		x.globalAlpha = 0.8;
		this.powerup.angle = 0;
		const a = camera.realToScreen(node.real.x, "x");
		const b = camera.realToScreen(node.real.y, "y");
		this.powerup.draw(a, b, r, x);
		x.globalAlpha = 1;
	}
};
self.drawPathToMouse = function (context, num) {
	const v1 = this.p1;
	const p2 = this.p2;
	const assert = this.scene.screen;
	const ratio = this.scene.camera.zoom;
	const x = assert.realToScreen(v1.x, "x");
	const t = assert.realToScreen(v1.y, "y");
	const n = assert.realToScreen(p2.x, "x");
	const y = assert.realToScreen(p2.y, "y");
	let width = rnd((n - x) ** 2 + (y - t) ** 2);
	if (30 * ratio > width) {
		width = 30 * ratio;
	}
	context.strokeStyle = "#ADCF7D";
	context.lineWidth = max(1, 2 * ratio);
	context.beginPath();
	context.moveTo(x, t);
	context.lineTo(x + width, t);
	context.stroke();
	context.beginPath();
	context.moveTo(x, t);
	context.lineTo(n, y);
	context.stroke();
	context.closePath();
	const s = num + 180 * (PI / 180);
	const a = min(width, 50 * ratio);
	context.beginPath();
	context.moveTo(x, t);
	context.arc(x, t, a, s, 0, false);
	context.moveTo(x, t);
	context.stroke();
	context.fillStyle = "rgba(173, 207, 125,0.2)";
	context.fill();
	context.closePath();
};
export default BoostTool;
