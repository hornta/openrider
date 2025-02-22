import Mass from "./mass";
import Spring from "./spring";
import Vector2 from "../math/vector2";
import Vehicle from "./vehicle";
import Wheel from "./wheel";
import inventoryManager from "../inventoryManager";
import { SOUND_TRUCK } from "../utils/sounds";

function drawTire(ctx, radius, y, offset, scale, position) {
	ctx.beginPath();
	ctx.arc(radius, y, 10 * scale, 0, 2 * Math.PI, false);
	ctx.fillStyle = "#888888";
	ctx.fill();
	ctx.lineWidth = 5.9 * scale;
	ctx.strokeStyle = "#000000";
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.lineWidth = 2 * scale;
	ctx.strokeStyle = "0x000000";

	offset += 3 * scale;
	for (let a = 0; a++ < 8; ) {
		ctx.moveTo(
			radius + offset * Math.cos(position + (6.283 * a) / 8),
			y + offset * Math.sin(position + (6.283 * a) / 8)
		);
		ctx.lineTo(
			radius + offset * Math.cos(position + (6.283 * (a + 0.5)) / 8),
			y + offset * Math.sin(position + (6.283 * (a + 0.5)) / 8)
		);
	}
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.lineWidth = 2 * scale;
	ctx.strokeStyle = "0x000000";
	offset += -9 * scale;
	for (let a = 0; a++ < 5; ) {
		ctx.moveTo(
			radius + offset * Math.cos(position + (6.283 * a) / 5),
			y + offset * Math.sin(position + (6.283 * a) / 5)
		);
		ctx.lineTo(
			radius + offset * Math.cos(position + (6.283 * (a + 0.2)) / 5),
			y + offset * Math.sin(position + (6.283 * (a + 0.2)) / 5)
		);
	}
	ctx.closePath();
	ctx.stroke();
}

class Truck extends Vehicle {
	constructor(a, e, i) {
		super(a);

		this.vehicleName = "TRUCK";
		this.masses = null;
		this.springs = null;
		this.slow = false;
		this.pedala = 0;
		this.swapped = false;
		this.crashed = false;
		this.createMasses(e);
		this.createSprings();
		this.stopSounds();
		this.updateCameraFocalPoint();
		if (i === -1) {
			this.swap();
		}
	}

	createMasses(b) {
		this.masses = [];
		this.masses.push(new Mass(new Vector2(b.x - 15, b.y + 7), this));
		this.masses.push(new Mass(new Vector2(b.x + 15, b.y + 7), this));
		this.masses[0].friction = 0.1;
		this.masses[1].friction = 0.1;
		this.masses.push(new Wheel(new Vector2(b.x - 20, b.y + 35), this));
		this.masses.push(new Wheel(new Vector2(b.x + 20, b.y + 35), this));
		this.masses[3].radius = 14;
		this.masses[1].radius = 7;
		this.masses[2].radius = this.masses[3].radius;
		this.masses[0].radius = this.masses[1].radius;
		const [head, backMass, rearWheel, frontWheel] = this.masses;
		this.head = head;
		this.backMass = backMass;
		this.rearWheel = rearWheel;
		this.frontWheel = frontWheel;
	}

	createSprings() {
		this.springs = [];
		const clr = this.masses;
		this.springs.push(new Spring(clr[0], clr[1], this));
		this.springs.push(new Spring(clr[0], clr[2], this));
		this.springs.push(new Spring(clr[1], clr[3], this));
		this.springs.push(new Spring(clr[0], clr[3], this));
		this.springs.push(new Spring(clr[1], clr[2], this));
		this.springs.push(new Spring(clr[2], clr[3], this));
		this.springs[0].lrest = 30;
		this.springs[1].lrest = 30;
		this.springs[2].lrest = 30;
		this.springs[3].lrest = 45;
		this.springs[4].lrest = 45;
		this.springs[0].leff = this.springs[0].lrest;
		this.springs[1].leff = this.springs[1].lrest;
		this.springs[2].leff = this.springs[2].lrest;
		this.springs[3].leff = this.springs[3].lrest;
		this.springs[4].leff = this.springs[4].lrest;
		for (const i in this.springs) {
			this.springs[i].springConstant = 0.3;
		}
	}

	update() {
		if (
			(this.crashed === false && (this.updateSound(), this.control()),
			this.explosion)
		) {
			this.explosion.update();
		} else {
			const { springs } = this;
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
			if (
				(this.rearWheel.contact &&
					this.frontWheel.contact &&
					(this.slow = false),
				this.slow === false)
			) {
				if (this.crashed === false) {
					this.control();
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
			this.updateDrawHeadAngle();
			this.updateCameraFocalPoint();
		}
	}

	updateSound() {
		if (this.player.isInFocus()) {
			const { soundManager } = this.scene;
			if (this.rearWheel.contact) {
				const end = Math.min(this.rearWheel.motor, 1);
				soundManager.play(SOUND_TRUCK, end);
			} else if (this.frontWheel.contact) {
				const end = Math.min(this.frontWheel.motor, 1);
				soundManager.play(SOUND_TRUCK, end);
			} else {
				soundManager.stop(SOUND_TRUCK);
			}
		}
	}

	updateCameraFocalPoint() {
		this.focalPoint = this.dir === 1 ? this.head : this.backMass;
	}

	stopSounds() {
		const { sound } = this.scene;
		sound.stop(SOUND_TRUCK);
	}

	updateDrawHeadAngle() {
		const { position } = this.frontWheel;
		const left = this.rearWheel.position;
		const { x } = position;
		const start = position.y;
		const a = left.x;
		const max = left.y;
		const t = x - a;
		const n = start - max;
		this.drawHeadAngle = -(Math.atan2(t, n) - Math.PI / 2);
	}

	swap() {
		this.dir *= -1;
		this.springs[0].swap();
		this.springs[5].swap();
	}

	control() {
		const vec3 = this.gamepad;
		const baseView = vec3.isButtonDown("up");
		const down = vec3.isButtonDown("down");
		const left = vec3.isButtonDown("left");
		const isRightArray = vec3.isButtonDown("right");
		const flagZ = vec3.isButtonDown("z");
		if (flagZ && !this.swapped) {
			this.swap();
			this.swapped = true;
		}
		if (!flagZ) {
			this.swapped = false;
		}
		const zoomLevel = baseView ? 1 : 0;
		const o = this.rearWheel;
		o.motor += (0.8 * zoomLevel - o.motor) / 10;
		this.frontWheel.motor += (0.8 * zoomLevel - this.frontWheel.motor) / 10;
		o.brake = down;
		this.frontWheel.brake = down;
		let angle = left ? 1 : 0;
		angle += isRightArray ? -1 : 0;
		const pos = this.springs;
		pos[0].rotate(angle / 8);
		pos[5].rotate(angle / 8);
	}

	draw() {
		if (this.explosion) {
			this.explosion.draw(1);
		} else {
			const context = this.scene.game.canvas.getContext("2d");
			if (
				((context.imageSmoothingEnabled = true),
				(context.mozImageSmoothingEnabled = true),
				(context.oImageSmoothingEnabled = true),
				(context.webkitImageSmoothingEnabled = true),
				this.settings.developerMode)
			) {
				const i = this.masses.length;
				let l = i - 1;
				for (; l >= 0; l--) {
					this.masses[l].draw();
				}
			}
			context.globalAlpha = this.player._opacity;
			this.drawTruck(context);
			context.globalAlpha = 1;
		}
	}

	drawTruck(ctx) {
		const e = this.scene;
		const z = e.camera.zoom;
		const to = this.cosmetics;
		const layer = inventoryManager.getItem(to.head);
		const callback = this.drawHeadAngle;
		const h = this.dir;
		const pointerAbs = this.frontWheel.position.toScreen(e);
		const absoluteMousePosition = this.rearWheel.position.toScreen(e);
		const p = this.head.position.toScreen(e);
		const drop = this.backMass.position.toScreen(e);
		const i = (this.masses[1].position.x - this.masses[0].position.x) * z;
		const ratio = (this.masses[1].position.y - this.masses[0].position.y) * z;
		const Z =
			(0.5 * (this.masses[0].position.x + this.masses[1].position.x) -
				0.5 * (this.masses[2].position.x + this.masses[3].position.x)) *
			z;
		const z2 =
			(0.5 * (this.masses[0].position.y + this.masses[1].position.y) -
				0.5 * (this.masses[2].position.y + this.masses[3].position.y)) *
			z;
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 3 * z;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		const base = drop.x - p.x;
		const height = drop.y - p.y;
		const width = Math.sqrt(base ** 2 + height ** 2);
		const x = base / width;
		const s = height / width;
		layer.draw(
			ctx,
			drop.x - 0.5 * x * z * 20,
			drop.y - s * z * 20 * 0.5,
			callback,
			0.45 * z,
			h
		);
		ctx.strokeStyle = "#444444";
		ctx.beginPath();
		ctx.moveTo(p.x - 0.4 * i - 0.9 * Z, p.y - 0.4 * ratio - 0.9 * z2);
		ctx.lineTo(p.x + 0.8 * i - 0.9 * Z, p.y + 0.8 * ratio - 0.9 * z2);
		ctx.stroke();
		ctx.closePath();
		ctx.save();
		ctx.fillStyle = "#777777";
		ctx.beginPath();
		ctx.moveTo(p.x - 0.4 * i - 0.7 * Z, p.y - 0.4 * ratio - 0.7 * z2);
		ctx.lineTo(p.x - 0.4 * i - 0.7 * Z, p.y - 0.4 * ratio - 0.7 * z2);
		ctx.lineTo(p.x + 1.4 * i - 0.7 * Z, p.y + 1.4 * ratio - 0.7 * z2);
		ctx.lineTo(p.x + 1.35 * i - 0.2 * Z, p.y + 1.35 * ratio - 0.2 * z2);
		ctx.lineTo(p.x + 0.9 * i - 0.1 * Z, p.y + 0.9 * ratio - 0.1 * z2);
		ctx.lineTo(p.x + 0.5 * i - 0.1 * Z, p.y + 0.5 * ratio - 0.1 * z2);
		ctx.lineTo(p.x + 0.5 * i + 0.2 * Z, p.y + 0.5 * ratio + 0.2 * z2);
		ctx.lineTo(p.x - 0.35 * i + 0.2 * Z, p.y - 0.35 * ratio + 0.2 * z2);
		ctx.closePath();
		ctx.fill();
		ctx.save();
		ctx.lineWidth = 2 * z;
		ctx.strokeStyle = "#444444";
		ctx.beginPath();
		ctx.moveTo(p.x - 0.4 * i - 0.7 * Z, p.y - 0.4 * ratio - 0.7 * z2);
		ctx.lineTo(p.x - 0.35 * i + 0.2 * Z, p.y - 0.35 * ratio + 0.2 * z2);
		ctx.lineTo(p.x + 0.8 * i + 0.2 * Z, p.y + 0.8 * ratio + 0.2 * z2);
		ctx.lineTo(p.x + 0.9 * i - 0.1 * Z, p.y + 0.9 * ratio - 0.1 * z2);
		ctx.lineTo(p.x + 1.35 * i - 0.2 * Z, p.y + 1.35 * ratio - 0.2 * z2);
		ctx.lineTo(p.x + 1.4 * i - 0.7 * Z, p.y + 1.4 * ratio - 0.7 * z2);
		ctx.lineTo(p.x - 0.4 * i - 0.7 * Z, p.y - 0.4 * ratio - 0.7 * z2);
		ctx.closePath();
		ctx.stroke();
		ctx.strokeStyle = "#444444";
		ctx.lineWidth = z;
		ctx.beginPath();
		ctx.moveTo(p.x + 0.5 * i - 0.1 * Z, p.y + 0.5 * ratio - 0.1 * z2);
		ctx.lineTo(p.x + 0.9 * i - 0.1 * Z, p.y + 0.9 * ratio - 0.1 * z2);
		ctx.lineTo(p.x + 0.8 * i + 0.2 * Z, p.y + 0.8 * ratio + 0.2 * z2);
		ctx.lineTo(p.x + 0.5 * i + 0.2 * Z, p.y + 0.5 * ratio + 0.2 * z2);
		ctx.lineTo(p.x + 0.5 * i - 0.1 * Z, p.y + 0.5 * ratio - 0.1 * z2);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		drawTire(
			ctx,
			absoluteMousePosition.x,
			absoluteMousePosition.y,
			10 * z,
			z,
			this.rearWheel.angle
		);
		ctx.closePath();
		ctx.beginPath();
		drawTire(ctx, pointerAbs.x, pointerAbs.y, 10 * z, z, this.frontWheel.angle);
		ctx.closePath();
		ctx.restore();
	}
}

export default Truck;
