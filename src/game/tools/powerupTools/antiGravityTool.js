import AntiGravity from "../../sector/powerups/antiGravity";
import Tool from "../tool";
import Vector2 from "../../math/vector2";

class AntiGravityTool extends Tool {
	constructor(action) {
		super(action);
		this.name = "antigravity";
		this.powerup = new AntiGravity(0, 0, action.scene.track);
		this.p1 = new Vector2(0, 0);
		this.p2 = new Vector2(0, 0);
		this.active = false;
	}

	draw(x) {
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
	}

	press() {
		const node = this.mouse.touch;
		const d = node.real;
		this.p1.x = d.x;
		this.p1.y = d.y;
		const w = this.scene.track;
		const rect = new AntiGravity(this.p1.x, this.p1.y, w);
		w.addPowerup(rect);
		this.toolhandler.addActionToTimeline({
			type: "add",
			objects: [rect],
		});
	}
}

export default AntiGravityTool;
