import AntiGravityTool from "./powerupTools/antiGravityTool";
import BombTool from "./powerupTools/bombTool";
import BoostTool from "./powerupTools/boostTool";
import CheckpointTool from "./powerupTools/checkpointTool";
import GoalTool from "./powerupTools/goalTool";
import GravityTool from "./powerupTools/gravityTool";
import SlowmoTool from "./powerupTools/slowmoTool";
import TeleportTool from "./powerupTools/teleportTool";
import Tool from "./tool";

const PowerupTool = function (obj) {
	this.toolInit(obj);
	this.powerupTools = {};
	this.registerPowerupTools();
	this.options = {
		selected: "goal",
	};
};
PowerupTool.prototype = new Tool();
const self = PowerupTool.prototype;
self.toolInit = self.init;
self.toolUpdate = self.update;
self.name = "Powerup";
self.powerupTools = null;
self.registerPowerupTools = function () {
	this.registerTool(new GoalTool(this.toolhandler));
	this.registerTool(new BoostTool(this.toolhandler));
	this.registerTool(new GravityTool(this.toolhandler));
	this.registerTool(new SlowmoTool(this.toolhandler));
	this.registerTool(new BombTool(this.toolhandler));
	this.registerTool(new CheckpointTool(this.toolhandler));
	this.registerTool(new AntiGravityTool(this.toolhandler));
	this.registerTool(new TeleportTool(this.toolhandler));
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
	const instance = this.toolhandler.gamepad;
	const options = this.options;
	if (instance.isButtonDown("opt1")) {
		options.selected = "goal";
		instance.setButtonUp("opt1");
		this.scene.stateChanged();
	}
	if (instance.isButtonDown("opt2")) {
		options.selected = "boost";
		instance.setButtonUp("opt2");
		this.scene.stateChanged();
	}
	if (instance.isButtonDown("opt3")) {
		options.selected = "gravity";
		instance.setButtonUp("opt3");
		this.scene.stateChanged();
	}
	if (instance.isButtonDown("opt4")) {
		options.selected = "slowmo";
		instance.setButtonUp("opt4");
		this.scene.stateChanged();
	}
	if (instance.isButtonDown("opt5")) {
		options.selected = "bomb";
		instance.setButtonUp("opt5");
		this.scene.stateChanged();
	}
	if (instance.isButtonDown("opt6")) {
		options.selected = "checkpoint";
		instance.setButtonUp("opt6");
		this.scene.stateChanged();
	}
	if (instance.isButtonDown("opt7")) {
		options.selected = "antigravity";
		instance.setButtonUp("opt7");
		this.scene.stateChanged();
	}
	if (instance.isButtonDown("opt8")) {
		options.selected = "teleport";
		instance.setButtonUp("opt8");
		this.scene.stateChanged();
	}
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

export default PowerupTool;
