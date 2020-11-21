import Tool from "../tool";
import Truck from "../../sector/vehiclepowerups/truck";
import Vector2 from "../../math/vector2";

const TruckTool = function (obj, target) {
	this.toolInit(target);
	this.powerup = new Truck(0, 0, 0, target.scene.track);
	this.p1 = new Vector2(0, 0);
	this.p2 = new Vector2(0, 0);
	this.options = obj.options;
	this.active = false;
};
TruckTool.prototype = new Tool();
const self = TruckTool.prototype;
self.toolInit = self.init;
self.toolUpdate = self.update;
self.powerup = null;
self.name = "truck";
self.p1 = null;
self.p2 = null;
self.active = false;
self.draw = function (x) {
	const node = this.mouse.touch;
	const c = node.position;
	const y = this.camera.zoom;
	const device = this.scene.settings.device;
	if (
		((device === "desktop" || this.active) &&
			((x.globalAlpha = 0.8),
			this.powerup.draw(c.x, c.y, y, x),
			(x.globalAlpha = 1)),
		this.active === true)
	) {
		const camera = this.scene.screen;
		const o = camera.realToScreen(this.p1.x, "x");
		const g = camera.realToScreen(this.p1.y, "y");
		x.globalAlpha = 0.4;
		this.powerup.draw(o, g, y, x);
		x.globalAlpha = 1;
	}
};
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
	const t = (this.scene.screen, this.scene.track);
	const o = new Truck(this.p1.x, this.p1.y, this.options.time, t);
	t.addPowerup(o);
	this.active = false;
	this.toolhandler.addActionToTimeline({
		type: "add",
		objects: [o],
	});
};
export default TruckTool;
