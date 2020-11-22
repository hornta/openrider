import BalloonTool from "./vehiclepoweruptools/balloonTool";
import BlobTool from "./vehiclepoweruptools/blobTool";
import HelicopterTool from "./vehiclepoweruptools/helicopterTool";
import Tool from "./tool";
import TruckTool from "./vehiclepoweruptools/truckTool";

class VehiclePowerupTool extends Tool {
	constructor(a) {
		super(a);
		this.name = "vehiclepowerup";
		this.powerupTools = {};
		this.options = a.scene.settings.vehiclePowerup;
		this.registerPowerupTools();
	}

	registerPowerupTools() {
		this.registerTool(new HelicopterTool(this, this.toolhandler));
		this.registerTool(new TruckTool(this, this.toolhandler));
		this.registerTool(new BalloonTool(this, this.toolhandler));
		this.registerTool(new BlobTool(this, this.toolhandler));
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

export default VehiclePowerupTool;
