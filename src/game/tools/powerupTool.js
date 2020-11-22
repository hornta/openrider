import AntiGravityTool from "./powerupTools/antiGravityTool";
import BombTool from "./powerupTools/bombTool";
import BoostTool from "./powerupTools/boostTool";
import CheckpointTool from "./powerupTools/checkpointTool";
import GoalTool from "./powerupTools/goalTool";
import GravityTool from "./powerupTools/gravityTool";
import SlowmoTool from "./powerupTools/slowmoTool";
import TeleportTool from "./powerupTools/teleportTool";
import Tool from "./tool";

class PowerupTool extends Tool {
	constructor(obj) {
		super(obj);
		this.name = "Powerup";
		this.powerupTools = {};
		this.registerPowerupTools();
		this.options = {
			selected: "goal",
		};
	}

	registerPowerupTools() {
		this.registerTool(new GoalTool(this.toolhandler));
		this.registerTool(new BoostTool(this.toolhandler));
		this.registerTool(new GravityTool(this.toolhandler));
		this.registerTool(new SlowmoTool(this.toolhandler));
		this.registerTool(new BombTool(this.toolhandler));
		this.registerTool(new CheckpointTool(this.toolhandler));
		this.registerTool(new AntiGravityTool(this.toolhandler));
		this.registerTool(new TeleportTool(this.toolhandler));
	}

	registerTool(type) {
		this.powerupTools[type.name] = type;
	}

	setOption(key, value) {
		this.options[key] = value;
	}

	getOptions() {
		return this.options;
	}

	update() {
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
		super.update();
	}

	press() {
		const i = this.options.selected;
		this.powerupTools[i].press();
	}

	hold() {
		const i = this.options.selected;
		this.powerupTools[i].hold();
	}

	release() {
		const i = this.options.selected;
		this.powerupTools[i].release();
	}

	draw() {
		const scene = this.scene;
		const o = (scene.game.canvas, scene.game.canvas.getContext("2d"));
		const opt = this.options;
		this.powerupTools[opt.selected].draw(o);
	}
}

export default PowerupTool;
