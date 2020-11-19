import Teleport from "../../sector/powerups/teleport";
import Tool from "../tool";
import Vector2 from "../../math/vector2";

const PI = Math.PI;
const atan2 = Math.atan2;
const msqrt = Math.sqrt;
const max = Math.max;
const updateScrollEvents = (Math.min, Math.abs);
const TeleportTool = function (data) {
	this.toolInit(data);
	this.powerup = new Teleport(0, 0, data.scene.track);
	this.p1 = new Vector2(0, 0);
	this.p2 = new Vector2(0, 0);
	this.active = false;
};
TeleportTool.prototype = new Tool();
const self = TeleportTool.prototype;
self.toolInit = self.init;
self.toolUpdate = self.update;
self.powerup = null;
self.portal1 = null;
self.name = "teleport";
self.p1 = null;
self.p2 = null;
self.active = false;
self.press = function () {
	const node = this.mouse.touch;
	const d = node.real;
	const ctx = (this.scene.screen, this.scene.track);
	this.p1.x = d.x;
	this.p1.y = d.y;
	this.portal1 = new Teleport(this.p1.x, this.p1.y, ctx);
	this.active = true;
};
self.hold = function () {
	const node = this.mouse.touch;
	const d = node.real;
	this.p2.x = d.x;
	this.p2.y = d.y;
};
self.release = function () {
	const lfReceivedUnread = updateScrollEvents(this.p2.x - this.p1.x);
	const lfReceivedRead = updateScrollEvents(this.p2.y - this.p1.y);
	if (lfReceivedUnread > 40 || lfReceivedRead > 40) {
		const obj = this.scene.track;
		this.portal2 = new Teleport(this.p2.x, this.p2.y, obj);
		this.portal1.addOtherPortalRef(this.portal2);
		this.portal2.addOtherPortalRef(this.portal1);
		obj.addPowerup(this.portal1);
		obj.addPowerup(this.portal2);
		this.toolhandler.addActionToTimeline({
			type: "add",
			objects: [this.portal1, this.portal2],
		});
		this.active = false;
	} else {
		this.active = false;
		this.portal1 = null;
	}
};
self.draw = function (x) {
	const node = this.mouse.touch;
	const r = (node.pos, this.camera.zoom);
	const camera = this.scene.screen;
	const device = this.scene.settings.device;
	if (this.active === true) {
		const a = camera.realToScreen(this.p1.x, "x");
		const val = camera.realToScreen(this.p1.y, "y");
		const test = camera.realToScreen(this.p2.x, "x");
		const g = camera.realToScreen(this.p2.y, "y");
		const p1 = this.p1;
		const p2 = this.p2;
		const c = p1.y - p2.y;
		const d = p1.x - p2.x;
		let angle = atan2(p1.y - p2.y, p1.x - p2.x);
		if (d === 0 && c === 0) {
			angle = PI - PI / 2;
		}
		if (angle < 0) {
			angle = angle + 2 * PI;
		}
		this.drawPathToMouse(x, angle);
		this.portal1.draw(a, val, r, x);
		this.powerup.draw(test, g, r, x);
	} else if (device === "desktop") {
		x.globalAlpha = 0.8;
		const g = camera.realToScreen(node.real.x, "x");
		const y = camera.realToScreen(node.real.y, "y");
		this.powerup.draw(g, y, r, x);
		x.globalAlpha = 1;
	}
};
self.drawPathToMouse = function (g) {
	const v1 = this.p1;
	const p2 = this.p2;
	const assert = this.scene.screen;
	const enemyGold = this.scene.camera.zoom;
	const p = assert.realToScreen(v1.x, "x");
	const y = assert.realToScreen(v1.y, "y");
	const t = assert.realToScreen(p2.x, "x");
	const n = assert.realToScreen(p2.y, "y");
	let potential = msqrt((t - p) ** 2 + (n - y) ** 2);
	if (30 * enemyGold > potential) {
		potential = 30 * enemyGold;
	}
	g.strokeStyle = "#dd45ec";
	g.lineWidth = max(1, 2 * enemyGold);
	g.beginPath();
	g.moveTo(p, y);
	g.lineTo(t, n);
	g.stroke();
	g.closePath();
};
export default TeleportTool;
