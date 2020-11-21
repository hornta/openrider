import Canopy from "./canopy";
import Mass from "./mass";
import Spring from "./spring";
import Vector2 from "./math/vector2";
import Vehicle from "./vehicle";

class Balloon extends Vehicle {
	constructor(e, a) {
		super(e);

		this.vehicleName = "BALLOON";
		this.head = null;
		this.basket = null;
		this.masses = null;
		this.springs = null;
		this.slow = false;
		this.crashed = false;

		this.createMasses(a);
		this.createSprings();
		this.stopSounds();
		this.focalPoint = this.head;
	}

	createMasses(position) {
		this.masses = [];
		const t = new Canopy(position.x, position.y - 10, this);
		t.radius = 30;
		const o = new Mass(new Vector2(position.x, position.y + 35), this);
		o.friction = 0.1;
		this.masses.push(t);
		this.masses.push(o);
		this.head = this.masses[0];
		this.basket = this.masses[1];
		this.head.drive = () => {
			this.explode();
		};
		this.masses[0].drive = this.head.drive;
	}

	createSprings() {
		this.springs = [];
		const idx = new Spring(this.head, this.basket, this);
		idx.springConstant = 0.2;
		idx.dampConstant = 0.2;
		idx.leff = 45;
		idx.lrest = idx.leff;
		this.springs.push(idx);
	}

	update() {
		if (this.crashed === false) {
			this.updateSound();
		}
		if (this.explosion) {
			this.explosion.update();
		} else {
			this.head.wind = !this.basket.contact;
			this.slow = false;
			const springs = this.springs;
			const numClasses = springs.length;
			let i = numClasses - 1;
			for (; i >= 0; i--) {
				springs[i].update();
			}
			const _volumes = this.masses;
			const len = _volumes.length;
			let j = len - 1;
			for (; j >= 0; j--) {
				_volumes[j].update();
			}
			i = numClasses - 1;
			for (; i >= 0; i--) {
				springs[i].update();
			}
			j = len - 1;
			for (; j >= 0; j--) {
				_volumes[j].update();
			}
		}
	}

	updateSound() {
		if (this.player.isInFocus()) {
			const sound = this.scene.sound;
			const player = this.gamepad;
			if (player.isButtonDown("up")) {
				sound.play("balloon_on", 0.6);
			} else if (!player.isButtonDown("up")) {
				sound.stop("balloon_on");
			}
		}
	}

	stopSounds() {
		const sound = this.scene.sound;
		sound.stop("balloon_on");
	}

	draw() {
		if (this.explosion) {
			this.explosion.draw(1);
		} else {
			const context = this.scene.game.canvas.getContext("2d");
			if (this.settings.developerMode) {
				const s = this.masses;
				const i = s.length;
				let l = i - 1;
				for (; l >= 0; l--) {
					s[l].draw();
				}
			}
			context.globalAlpha = this.player._opacity;
			this.drawBalloon(context);
			context.globalAlpha = 1;
		}
	}

	drawBalloon(ctx) {
		const s = this.scene;
		const style = this.basket.position.toScreen(s);
		const center = this.head.position.toScreen(s);
		const zoom = s.camera.zoom;
		const width = center.x - style.x;
		const dy = center.y - style.y;
		const dx = -dy;
		const r = width;
		ctx.save();
		ctx.strokeStyle = "#999999";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(style.x + 0.1 * dx, style.y + 0.1 * r);
		ctx.lineTo(style.x + 0.5 * width + 0.4 * dx, style.y + 0.5 * dy + 0.4 * r);
		ctx.moveTo(style.x - 0.1 * dx, style.y - 0.1 * r);
		ctx.lineTo(style.x + 0.5 * width - 0.4 * dx, style.y + 0.5 * dy - 0.4 * r);
		ctx.moveTo(style.x + 0.1 * dx, style.y + 0.1 * r);
		ctx.lineTo(
			style.x + 0.36 * width + 0.2 * dx,
			style.y + 0.36 * dy + 0.2 * r
		);
		ctx.moveTo(style.x - 0.1 * dx, style.y - 0.1 * r);
		ctx.lineTo(
			style.x + 0.36 * width - 0.2 * dx,
			style.y + 0.36 * dy - 0.2 * r
		);
		ctx.closePath();
		ctx.stroke();
		this.head.draw(ctx);
		if (this.gamepad.isButtonDown("up")) {
			ctx.beginPath();
			ctx.strokeStyle = "#FFFF00";
			ctx.lineWidth = 8 * zoom;
			ctx.moveTo(style.x, style.y);
			ctx.lineTo(style.x + 0.1 * width, style.y + 0.1 * dy);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "#FFAA00";
			ctx.lineWidth = 3 * zoom;
			ctx.moveTo(style.x, style.y);
			ctx.lineTo(style.x + 0.1 * width, style.y + 0.1 * dy);
			ctx.closePath();
			ctx.stroke();
		}
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.moveTo(style.x + 0.1 * dx, style.y + 0.1 * r);
		ctx.lineTo(style.x - 0.1 * dx, style.y - 0.1 * r);
		ctx.lineTo(
			style.x - 0.22 * width - 0.1 * dx,
			style.y - 0.22 * dy - 0.1 * r
		);
		ctx.lineTo(
			style.x - 0.22 * width + 0.1 * dx,
			style.y - 0.22 * dy + 0.1 * r
		);
		ctx.lineTo(style.x + 0.1 * dx, style.y + 0.1 * r);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
}

export default Balloon;
