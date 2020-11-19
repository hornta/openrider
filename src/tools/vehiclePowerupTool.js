import BalloonTool from "./vehiclepoweruptools/balloonTool";
import BlobTool from "./vehiclepoweruptools/blobTool";
import HelicopterTool from "./vehiclepoweruptools/helicopterTool";
import Tool from "./tool";
import TruckTool from "./vehiclepoweruptools/truckTool";

const VehiclePowerupTool = function (a) {
	this.toolInit(a);
	this.powerupTools = {};
	this.options = a.scene.settings.vehiclePowerup;
	this.registerPowerupTools();
};
VehiclePowerupTool.prototype = new Tool();
const self = VehiclePowerupTool.prototype;
self.toolInit = self.init;
self.toolUpdate = self.update;
self.name = "vehiclepowerup";
self.powerupTools = null;
self.registerPowerupTools = function () {
	this.registerTool(new HelicopterTool(this, this.toolhandler));
	this.registerTool(new TruckTool(this, this.toolhandler));
	this.registerTool(new BalloonTool(this, this.toolhandler));
	this.registerTool(new BlobTool(this, this.toolhandler));
};
self.registerTool = function (type) {
	this.powerupTools[type.name] = type;
};
self.setOption = function (key, value) {
	this.options[key] = value;
};
self.getOptions = function () {
	return this.options;
};
self.update = function () {
	this.toolUpdate();
};
self.press = function () {
	const i = this.options.selected;
	this.powerupTools[i].press();
};
self.hold = function () {
	const i = this.options.selected;
	this.powerupTools[i].hold();
};
self.release = function () {
	const i = this.options.selected;
	this.powerupTools[i].release();
};
self.draw = function () {
	const scene = this.scene;
	const o = (scene.game.canvas, scene.game.canvas.getContext("2d"));
	const opt = this.options;
	this.powerupTools[opt.selected].draw(o);
};
export default VehiclePowerupTool;
