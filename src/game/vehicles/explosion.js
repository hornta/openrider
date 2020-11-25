import Debris from "./debris";
import Vector2 from "../math/vector2";

class Explosion {
	constructor(options, data) {
		this.complete = false;
		this.powerupsEnabled = false;
		this.time = 20;
		this.gravity = new Vector2(0, 0.3);
		this.scene = data;
		this.createMasses(options);
		this.positionX = options.x;
		this.positionY = options.y;
	}

	draw(value) {
		let t = this.time;
		const e = this.positionX;
		const val = this.positionY;
		const d = this.scene.camera.zoom;
		const point = this.scene.screen;
		const ctx = this.scene.game.canvas.getContext("2d");
		ctx.globalAlpha = value;
		if (t > 0) {
			t -= 10;
			const y = point.realToScreen(e, "x");
			const a = point.realToScreen(val, "y");
			let p = 0;
			const theta = 6.2 * Math.random();
			let r = t * d;
			let top = y + r * Math.cos(theta);
			let b = a + r * Math.sin(theta);
			ctx.lineWidth = 0;
			ctx.strokeStyle = "black";
			ctx.beginPath();
			ctx.moveTo(top, b);
			ctx.fillStyle = "black";
			for (; p++ < 16; ) {
				r = (t + 30 * Math.random()) * d;
				top = y + r * Math.cos(theta + (6.283 * p) / 16);
				b = a + r * Math.sin(theta + (6.283 * p) / 16);
				ctx.lineTo(top, b);
			}
			ctx.fill();
			ctx.stroke();
		}
		const dots = this.masses;
		for (const i in dots) {
			dots[i].draw();
		}
		ctx.globalAlpha = 1;
		this.time = t;
	}

	createMasses(item) {
		this.masses = [];
		this.masses.push(new Debris(item, this, "#000000"));
		this.masses.push(new Debris(item, this, "#000000"));
		this.masses.push(new Debris(item, this, "#000000"));
		this.masses.push(new Debris(item, this, "#000000"));
		this.masses.push(new Debris(item, this, "#000000"));
		this.masses.push(new Debris(item, this, "#000000"));
		this.masses.push(new Debris(item, this, "#000000"));
	}

	update() {
		for (const mass of this.masses) {
			mass.update();
		}
	}
}

export default Explosion;
