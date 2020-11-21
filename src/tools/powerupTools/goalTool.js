import Target from "../../sector/powerups/target";
import Tool from "../tool";
import Vector2 from "../../math/vector2";

const GoalTool = function (action) {
	this.toolInit(action);
	this.powerup = new Target(0, 0, action.scene.track);
	this.p1 = new Vector2(0, 0);
	this.p2 = new Vector2(0, 0);
	this.active = false;
};
GoalTool.prototype = new Tool();
const self = GoalTool.prototype;
self.toolInit = self.init;
self.toolUpdate = self.update;
self.powerup = null;
self.name = "goal";
self.p1 = null;
self.p2 = null;
self.active = false;
self.draw = function (x) {
	const node = this.mouse.touch;
	const r = this.camera.zoom;
	const device = this.scene.settings.device;
	const camera = this.scene.screen;
	if (this.active === true) {
		const p = camera.realToScreen(this.p1.x, "x");
		const o = camera.realToScreen(this.p1.y, "y");
		x.globalAlpha = 0.4;
		this.powerup.draw(p, o, r, x);
		x.globalAlpha = 1;
	} else if (device === "desktop") {
		const p = camera.realToScreen(node.real.x, "x");
		const o = camera.realToScreen(node.real.y, "y");
		x.globalAlpha = 0.8;
		this.powerup.draw(p, o, r, x);
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
	const graph = (this.scene.screen, this.scene.track);
	const rect = new Target(this.p1.x, this.p1.y, graph);
	graph.addTarget(rect);
	graph.addPowerup(rect);
	this.active = false;
	this.toolhandler.addActionToTimeline({
		type: "add",
		objects: [rect],
	});
};

export default GoalTool;
