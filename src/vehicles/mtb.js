import Mass from "../mass";
import Ragdoll from "../ragdoll";
import Spring from "../spring";
import Vector2 from "../math/vector2";
import Vehicle from "../vehicle";
import Wheel from "../wheel";
import inventoryManager from "../inventoryManager";
// eslint-disable-next-line sort-imports
import "../cosmetics/heads/head";
import "../cosmetics/heads/forwardCap";

class MTB extends Vehicle {
	constructor(player, position, facing, velocity) {
		super(player);

		this.player = player;
		this.vehicleName = "MTB";
		this.masses = null;
		this.springs = null;
		this.slow = false;
		this.pedala = 0;
		this.swapped = false;
		this.ragdoll = null;
		this.crashed = false;
		this.color = "rgba(0,0,0,1)";
		this.createMasses(position, velocity);
		this.createSprings();
		this.updateCameraFocalPoint();
		this.stopSounds();
		if (facing === -1) {
			this.swap();
		}
	}

	createMasses({ x, y }, velocity) {
		this.masses = [];
		const obj = new Mass(new Vector2(x + 2, y + -38), this);
		const frontWheel = new Wheel(new Vector2(x + 23, y), this);
		const rearWheel = new Wheel(new Vector2(x + -23, y), this);
		obj.drive = this.createRagdoll.bind(this);
		rearWheel.radius = 14;
		frontWheel.radius = 14;
		obj.radius = 14;
		obj.velocity.equ(velocity);
		rearWheel.velocity.equ(velocity);
		frontWheel.velocity.equ(velocity);
		this.masses.push(obj);
		this.masses.push(rearWheel);
		this.masses.push(frontWheel);
		this.head = obj;
		this.frontWheel = frontWheel;
		this.rearWheel = rearWheel;
	}

	createSprings() {
		this.springs = [];
		const obj = new Spring(this.head, this.rearWheel, this);
		const items = new Spring(this.rearWheel, this.frontWheel, this);
		const options = new Spring(this.frontWheel, this.head, this);
		items.lrest = 45;
		items.leff = 45;
		items.springConstant = 0.2;
		items.dampConstant = 0.3;
		obj.lrest = 47;
		obj.leff = 47;
		obj.springConstant = 0.2;
		obj.dampConstant = 0.3;
		options.lrest = 45;
		options.leff = 45;
		options.springConstant = 0.2;
		options.dampConstant = 0.3;
		this.springs.push(obj);
		this.springs.push(items);
		this.springs.push(options);
		this.rearSpring = obj;
		this.chasse = items;
		this.frontSpring = options;
	}

	createRagdoll() {
		this.ragdoll = new Ragdoll(this.getStickMan(), this);
		this.ragdoll.zero(this.head.velocity, this.rearWheel.velocity);
		this.ragdoll.dir = this.dir;
		this.rearWheel.motor = 0;
		this.rearWheel.brake = false;
		this.frontWheel.brake = false;
		this.head.collide = false;
		if (this.player.isInFocus()) {
			this.playBailSound();
		}
		this.dead();
	}

	playBailSound() {
		const sound = this.scene.sound;
		const offset = Math.min(this.speed / 50, 1);
		const i = Math.floor(3 * Math.random()) + 1;
		switch (i) {
			case 1:
				sound.play("bike_fall_1", offset);
				break;
			case 2:
				sound.play("bike_fall_2", offset);
				break;
			case 3:
				sound.play("bike_fall_3", offset);
				break;
			default:
		}
	}

	updateCameraFocalPoint() {
		this.focalPoint = this.ragdoll ? this.ragdoll.head : this.head;
	}

	getStickMan() {
		const s = this.dir;
		const e = this.head;
		const world = this.frontWheel;
		const particle = this.rearWheel;
		const bearingRad = this.pedala;
		const a = world.position.subtract(particle.position);
		const furthestExtent = e.position.subtract(
			world.position.add(particle.position).multiply(0.5)
		);
		const offset = new Vector2(a.y * s, -a.x * s);
		const stickMan = {};
		stickMan.head = particle.position
			.add(a.multiply(0.35))
			.add(furthestExtent.multiply(1.2));
		stickMan.rHand = particle.position
			.add(a.multiply(0.8))
			.add(offset.multiply(0.68));
		stickMan.lHand = stickMan.rHand;
		let p = stickMan.head.subtract(stickMan.lHand);
		p = new Vector2(p.y * s, -p.x * s);
		stickMan.rElbow = stickMan.head
			.add(stickMan.lHand)
			.multiply(0.5)
			.add(p.multiply(130 / p.lenSqr()));
		stickMan.lElbow = stickMan.rElbow;
		stickMan.waist = particle.position
			.add(a.multiply(0.2))
			.add(offset.multiply(0.5));
		const end = new Vector2(6 * Math.cos(bearingRad), 6 * Math.sin(bearingRad));
		return (
			(stickMan.lFoot = particle.position
				.add(a.multiply(0.4))
				.add(offset.multiply(0.05))
				.add(end)),
			(p = stickMan.waist.subtract(stickMan.lFoot)),
			(p = new Vector2(-p.y * s, p.x * s)),
			(stickMan.lKnee = stickMan.waist
				.add(stickMan.lFoot)
				.multiply(0.5)
				.add(p.multiply(160 / p.lenSqr()))),
			(stickMan.rFoot = particle.position
				.add(a.multiply(0.4))
				.add(offset.multiply(0.05))
				.subtract(end)),
			(p = stickMan.waist.subtract(stickMan.rFoot)),
			(p = new Vector2(-p.y * s, p.x * s)),
			(stickMan.rKnee = stickMan.waist
				.add(stickMan.rFoot)
				.multiply(0.5)
				.add(p.multiply(160 / p.lenSqr()))),
			stickMan
		);
	}

	update() {
		if (this.crashed === false) {
			this.updateSound();
		}
		this.control();
		if (this.explosion) {
			this.explosion.update();
		} else {
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
			if (this.rearWheel.contact && this.frontWheel.contact) {
				this.slow = false;
			}
			if (this.slow === false) {
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
			if (this.ragdoll) {
				this.ragdoll.update();
			} else {
				this.updateDrawHeadAngle();
			}
		}
		this.updateCameraFocalPoint();
	}

	updateSound() {
		if (this.player.isInFocus()) {
			this.updateSpeed();
			const offset = Math.min(this.speed / 50, 1);
			const sound = this.scene.sound;
			if (this.rearWheel.contact || this.frontWheel.contact) {
				sound.play("bike_ground", offset);
				sound.stop("bike_air");
			} else {
				sound.play("bike_air", offset);
				sound.stop("bike_ground");
			}
		}
	}

	stopSounds() {
		const sound = this.scene.sound;
		sound.stop("bike_air");
		sound.stop("bike_ground");
	}

	updateDrawHeadAngle() {
		const o = this.frontWheel.position;
		const position = this.rearWheel.position;
		const i = o.x;
		const size = o.y;
		const length = position.x;
		const row = position.y;
		const start = i - length;
		const end = size - row;
		this.drawHeadAngle = -(Math.atan2(start, end) - Math.PI / 2);
	}

	swap() {
		this.dir *= -1;
		this.chasse.swap();
		const t = this.rearSpring.leff;
		this.rearSpring.leff = this.frontSpring.leff;
		this.frontSpring.leff = t;
	}

	control() {
		const gamePad = this.gamepad;
		const holdUp = gamePad.isButtonDown("up");
		const holdDown = gamePad.isButtonDown("down");
		const leanBack = gamePad.isButtonDown("left");
		const leanForward = gamePad.isButtonDown("right");
		const swap = gamePad.isButtonDown("z");
		const newPos = holdUp ? 1 : 0;
		this.rearWheel.motor += (newPos - this.rearWheel.motor) / 10;
		if (swap && !this.swapped) {
			this.swap();
			this.swapped = true;
		}
		if (!swap) {
			this.swapped = false;
		}
		if (holdUp) {
			this.pedala += this.rearWheel.speed / 5;
		}
		this.rearWheel.brake = holdDown;
		this.frontWheel.brake =
			this.dir > 0 && leanForward && holdDown
				? true
				: Boolean(this.dir < 0 && leanBack && holdDown);
		let iInteger = leanBack ? 1 : 0;
		iInteger += leanForward ? -1 : 0;
		this.rearSpring.contract(5 * iInteger * this.dir, 5);
		this.frontSpring.contract(5 * -iInteger * this.dir, 5);
		this.chasse.rotate(iInteger / 8);
		if (!iInteger && holdUp) {
			this.rearSpring.contract(-7, 5);
			this.frontSpring.contract(7, 5);
		}
	}

	draw() {
		if (this.explosion) {
			this.explosion.draw(1);
		} else {
			const ctx = this.scene.game.canvas.getContext("2d");
			ctx.imageSmoothingEnabled = true;
			ctx.mozImageSmoothingEnabled = true;
			ctx.oImageSmoothingEnabled = true;
			ctx.webkitImageSmoothingEnabled = true;
			if (this.settings.developerMode) {
				for (const mass of this.masses) {
					mass.draw();
				}
			}
			this.drawBikeFrame();
		}
	}

	drawBikeFrame() {
		const e = this.scene;
		let d = this.frontWheel.position.toScreen(e);
		const self2 = this.rearWheel.position.toScreen(e);
		const md = this.head.position.toScreen(e);
		const scale = (e.game.pixelRatio, e.camera.zoom);
		const ctx = e.game.canvas.getContext("2d");
		const opacity = this.player._opacity;
		const result = d.subtract(self2);
		const origin = new Vector2(
			(d.y - self2.y) * this.dir,
			(self2.x - d.x) * this.dir
		);
		const projection = result.multiply(0.5);
		self2.addOut(projection, projection);
		md.subOut(projection, projection);
		ctx.globalAlpha = opacity;
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 3 * scale;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.beginPath();
		ctx.fillStyle = "rgba(200,200, 200,0.2)";
		ctx.arc(d.x, d.y, 12.5 * scale, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(self2.x, self2.y, 12.5 * scale, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.strokeStyle = "rgba(153, 153, 153,1)";
		ctx.fillStyle = "rgba(204, 204, 204,1)";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(d.x, d.y, 6 * scale, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(self2.x, self2.y, 6 * scale, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 5 * scale;
		ctx.moveTo(self2.x, self2.y);
		ctx.lineTo(
			self2.x + 0.4 * result.x + 0.05 * origin.x,
			self2.y + 0.4 * result.y + 0.05 * origin.y
		);
		ctx.moveTo(
			self2.x + 0.72 * result.x + 0.64 * projection.x,
			self2.y + 0.72 * result.y + 0.64 * projection.y
		);
		ctx.lineTo(
			self2.x + 0.46 * result.x + 0.4 * projection.x,
			self2.y + 0.46 * result.y + 0.4 * projection.y
		);
		ctx.lineTo(
			self2.x + 0.4 * result.x + 0.05 * origin.x,
			self2.y + 0.4 * result.y + 0.05 * origin.y
		);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 2 * scale;
		ctx.strokeStyle = "#000000";
		ctx.moveTo(
			self2.x + 0.72 * result.x + 0.64 * projection.x,
			self2.y + 0.72 * result.y + 0.64 * projection.y
		);
		ctx.lineTo(
			self2.x + 0.43 * result.x + 0.05 * origin.x,
			self2.y + 0.43 * result.y + 0.05 * origin.y
		);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = Number(scale);
		ctx.moveTo(
			self2.x + 0.46 * result.x + 0.4 * projection.x,
			self2.y + 0.46 * result.y + 0.4 * projection.y
		);
		ctx.lineTo(
			self2.x + 0.28 * result.x + 0.5 * projection.x,
			self2.y + 0.28 * result.y + 0.5 * projection.y
		);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 2 * scale;
		ctx.moveTo(
			self2.x + 0.45 * result.x + 0.3 * projection.x,
			self2.y + 0.45 * result.y + 0.3 * projection.y
		);
		ctx.lineTo(
			self2.x + 0.3 * result.x + 0.4 * projection.x,
			self2.y + 0.3 * result.y + 0.4 * projection.y
		);
		ctx.lineTo(
			self2.x + 0.25 * result.x + 0.6 * projection.x,
			self2.y + 0.25 * result.y + 0.6 * projection.y
		);
		ctx.moveTo(
			self2.x + 0.17 * result.x + 0.6 * projection.x,
			self2.y + 0.17 * result.y + 0.6 * projection.y
		);
		ctx.lineTo(
			self2.x + 0.3 * result.x + 0.6 * projection.x,
			self2.y + 0.3 * result.y + 0.6 * projection.y
		);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 3 * scale;
		ctx.moveTo(d.x, d.y);
		ctx.lineTo(
			self2.x + 0.71 * result.x + 0.73 * projection.x,
			self2.y + 0.71 * result.y + 0.73 * projection.y
		);
		ctx.lineTo(
			self2.x + 0.73 * result.x + 0.77 * projection.x,
			self2.y + 0.73 * result.y + 0.77 * projection.y
		);
		ctx.lineTo(
			self2.x + 0.7 * result.x + 0.8 * projection.x,
			self2.y + 0.7 * result.y + 0.8 * projection.y
		);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = Number(scale);
		const offset = new Vector2(
			6 * Math.cos(this.pedala) * scale,
			6 * Math.sin(this.pedala) * scale
		);
		if (
			(ctx.moveTo(
				self2.x + 0.43 * result.x + 0.05 * origin.x + offset.x,
				self2.y + 0.43 * result.y + 0.05 * origin.y + offset.y
			),
			ctx.lineTo(
				self2.x + 0.43 * result.x + 0.05 * origin.x - offset.x,
				self2.y + 0.43 * result.y + 0.05 * origin.y - offset.y
			),
			ctx.stroke(),
			this.crashed)
		) {
			if (this.ragdoll) {
				this.ragdoll.draw();
			}
		} else {
			result.factorOut(0.5, origin);
			self2.addOut(origin, origin);
			md.subOut(origin, origin);
			const line = result.multiply(0.3);
			line.x = self2.x + line.x + 0.25 * origin.x;
			line.y = self2.y + line.y + 0.25 * origin.y;
			d = result.multiply(0.4);
			d.x = self2.x + d.x + 0.05 * origin.x;
			d.y = self2.y + d.y + 0.05 * origin.y;
			const a = d.add(offset);
			const position = d.subtract(offset);
			const c = result.multiply(0.67);
			c.x = self2.x + c.x + 0.8 * origin.x;
			c.y = self2.y + c.y + 0.8 * origin.y;
			const point = result.multiply(-0.05);
			point.x = line.x + point.x + 0.42 * origin.x;
			point.y = line.y + point.y + 0.42 * origin.y;
			const t = a.subtract(point);
			let steps = t.lenSqr();
			projection.x = t.y * this.dir;
			projection.y = -t.x * this.dir;
			projection.factorSelf(scale * scale);
			const bounds = t.multiply(0.5);
			bounds.x = point.x + bounds.x + projection.x * (200 / t.lenSqr());
			bounds.y = point.y + bounds.y + projection.y * (200 / t.lenSqr());
			const b = t.multiply(0.12);
			b.x = a.x + b.x + projection.x * (50 / steps);
			b.y = a.y + b.y + projection.y * (50 / steps);
			position.subOut(point, t);
			steps = t.lenSqr();
			projection.x = t.y * this.dir;
			projection.y = -t.x * this.dir;
			projection.factorSelf(scale * scale);
			const nextPoint = t.multiply(0.5);
			nextPoint.x = point.x + nextPoint.x + projection.x * (200 / steps);
			nextPoint.y = point.y + nextPoint.y + projection.y * (200 / steps);
			const opt = t.multiply(0.12);
			opt.x = position.x + opt.x + projection.x * (50 / steps);
			opt.y = position.y + opt.y + projection.y * (50 / steps);
			ctx.strokeStyle = `rgba(0,0,0,${0.5 * opacity})`;
			ctx.lineWidth = 6 * scale;
			ctx.beginPath();
			ctx.moveTo(position.x, position.y);
			ctx.lineTo(nextPoint.x, nextPoint.y);
			ctx.lineTo(point.x, point.y);
			ctx.stroke();
			ctx.lineWidth = 4 * scale;
			ctx.beginPath();
			ctx.moveTo(position.x, position.y);
			ctx.lineTo(opt.x, opt.y);
			ctx.stroke();
			ctx.lineWidth = 6 * scale;
			ctx.strokeStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(a.x, a.y);
			ctx.lineTo(bounds.x, bounds.y);
			ctx.lineTo(point.x, point.y);
			ctx.stroke();
			ctx.lineWidth = 4 * scale;
			ctx.beginPath();
			ctx.moveTo(a.x, a.y);
			ctx.lineTo(b.x, b.y);
			ctx.stroke();
			const options = result.multiply(0.1);
			options.x = line.x + options.x + 0.95 * origin.x;
			options.y = line.y + options.y + 0.95 * origin.y;
			ctx.lineWidth = 8 * scale;
			ctx.beginPath();
			ctx.moveTo(point.x, point.y);
			ctx.lineTo(options.x, options.y);
			ctx.stroke();
			const p = result.multiply(0.2);
			p.x = line.x + p.x + 1.09 * origin.x;
			p.y = line.y + p.y + 1.09 * origin.y;
			ctx.beginPath();
			ctx.lineWidth = 2 * scale;
			options.subOut(c, result);
			const ze = result.lenSqr();
			origin.x = result.y * this.dir;
			origin.y = -result.x * this.dir;
			origin.factorSelf(scale * scale);
			const shadow = result.multiply(0.3);
			shadow.x = c.x + shadow.x + origin.x * (80 / ze);
			shadow.y = c.y + shadow.y + origin.y * (80 / ze);
			ctx.lineWidth = 5 * scale;
			ctx.beginPath();
			ctx.moveTo(options.x, options.y);
			ctx.lineTo(shadow.x, shadow.y);
			ctx.lineTo(c.x, c.y);
			ctx.stroke();
			const to = this.cosmetics;
			const s = inventoryManager.getItem(to.head);
			const data = this.drawHeadAngle;
			s.draw(ctx, p.x, p.y, data, scale, this.dir);
			ctx.globalAlpha = 1;
		}
	}
}

export default MTB;
