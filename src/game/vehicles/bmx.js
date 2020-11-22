import Mass from "../mass";
import Ragdoll from "../ragdoll";
import Spring from "../spring";
import Vector2 from "../math/vector2";
import Vehicle from "../vehicle";
import Wheel from "../wheel";
import inventoryManager from "../inventoryManager";

class BMX extends Vehicle {
	constructor(player, i, e, s) {
		super(player);

		this.player = player;
		this.vehicleName = "BMX";
		this.masses = null;
		this.springs = null;
		this.slow = false;
		this.pedala = 0;
		this.cosmeticHead = null;
		this.cosmeticRearWheel = null;
		this.cosmeticFrontWheel = null;
		this.swapped = false;
		this.ragdoll = null;

		this.createMasses(i, s);
		this.createSprings();
		this.updateCameraFocalPoint();
		this.stopSounds();
		if (e === -1) {
			this.swap();
		}
		this.ticks = 0;
	}

	createMasses(d, e) {
		this.masses = [];
		const head = new Mass(new Vector2(d.x, d.y - 36), this);
		const frontWheel = new Wheel(new Vector2(d.x + 21, d.y + 3), this);
		const rearWheel = new Wheel(new Vector2(d.x + -21, d.y + 3), this);
		head.drive = this.createRagdoll.bind(this);
		rearWheel.radius = 11.7;
		frontWheel.radius = 11.7;
		head.radius = 14;
		head.velocity.equ(e);
		rearWheel.velocity.equ(e);
		frontWheel.velocity.equ(e);
		this.masses.push(rearWheel);
		this.masses.push(frontWheel);
		this.masses.push(head);
		this.head = head;
		this.frontWheel = frontWheel;
		this.rearWheel = rearWheel;
	}

	createSprings() {
		this.springs = [];
		const obj = new Spring(this.head, this.rearWheel, this);
		const options = new Spring(this.rearWheel, this.frontWheel, this);
		const items = new Spring(this.frontWheel, this.head, this);
		options.lrest = 42;
		options.leff = 42;
		options.springConstant = 0.35;
		options.dampConstant = 0.3;
		obj.lrest = 45;
		obj.leff = 45;
		obj.springConstant = 0.35;
		obj.dampConstant = 0.3;
		items.lrest = 45;
		items.leff = 45;
		items.springConstant = 0.35;
		items.dampConstant = 0.3;
		this.springs.push(obj);
		this.springs.push(options);
		this.springs.push(items);
		this.rearSpring = obj;
		this.chasse = options;
		this.frontSpring = items;
	}

	createRagdoll() {
		this.ragdoll = new Ragdoll(this.getStickMan(), this);
		this.ragdoll.zero(this.head.velocity, this.rearWheel.velocity);
		this.ragdoll.dir = this.dir;
		this.rearWheel.motor = 0;
		this.rearWheel.brake = false;
		this.frontWheel.brake = false;
		this.head.collide = false;
		this.updateCameraFocalPoint();
		if (this.player.isInFocus()) {
			this.playBailSound();
		}
		this.dead();
	}

	stopSounds() {
		const sound = this.scene.sound;
		sound.stop("bike_air");
		sound.stop("bike_ground");
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
		const t = world.position.subtract(particle.position);
		const instructionInfo = e.position.subtract(
			Vector2.add(world.position, particle.position).multiply(0.5)
		);
		const p = new Vector2(t.y * s, -t.x * s);
		const stickMan = {};
		stickMan.head = Vector2.add3(
			particle.position,
			t.multiply(0.35),
			instructionInfo.multiply(1.2)
		);
		stickMan.rHand = Vector2.add3(
			particle.position,
			t.multiply(0.8),
			p.multiply(0.68)
		);
		stickMan.lHand = stickMan.rHand;
		let a = stickMan.head.subtract(stickMan.lHand);
		a = new Vector2(a.y * s, -a.x * s);
		stickMan.rElbow = Vector2.add(
			Vector2.add(stickMan.head, stickMan.lHand).multiply(0.5),
			a.multiply(130 / a.lenSqr())
		);
		stickMan.lElbow = stickMan.rElbow;
		stickMan.waist = Vector2.add3(
			particle.position,
			t.multiply(0.2),
			p.multiply(0.5)
		);
		const position = new Vector2(
			6 * Math.cos(bearingRad),
			6 * Math.sin(bearingRad)
		);
		return (
			(stickMan.lFoot = particle.position
				.add(t.multiply(0.4))
				.add(p.multiply(0.05))
				.add(position)),
			(a = stickMan.waist.subtract(stickMan.lFoot)),
			(a = new Vector2(-a.y * s, a.x * s)),
			(stickMan.lKnee = stickMan.waist
				.add(stickMan.lFoot)
				.multiply(0.5)
				.add(a.multiply(160 / a.lenSqr()))),
			(stickMan.rFoot = particle.position
				.add(t.multiply(0.4))
				.add(p.multiply(0.05))
				.subtract(position)),
			(a = stickMan.waist.subtract(stickMan.rFoot)),
			(a = new Vector2(-a.y * s, a.x * s)),
			(stickMan.rKnee = stickMan.waist
				.add(stickMan.rFoot)
				.multiply(0.5)
				.add(a.multiply(160 / a.lenSqr()))),
			stickMan
		);
	}

	update() {
		this.ticks += 1;
		if (!this.crashed) {
			this.updateSound();
			this.control();
		}
		if (this.explosion) {
			this.explosion.update();
		} else {
			for (let i = this.springs.length - 1; i >= 0; i--) {
				this.springs[i].update();
			}
			for (let i = this.masses.length - 1; i >= 0; i--) {
				this.masses[i].update();
			}
			if (this.rearWheel.contact && this.frontWheel.contact) {
				this.slow = false;
			}
			if (!this.slow) {
				if (!this.crashed) {
					this.control();
				}
				for (let i = this.springs.length - 1; i >= 0; i--) {
					this.springs[i].update();
				}
				for (let i = this.masses.length - 1; i >= 0; i--) {
					this.masses[i].update();
				}
			}
			if (this.ragdoll) {
				this.ragdoll.update();
			} else {
				this.updateDrawHeadAngle();
			}
		}
		this.updateCameraFocalPoint();

		if (this.ticks < 10) {
			console.log(this.ticks, this.masses[0].velocity.y);
		}
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

	swap() {
		this.dir *= -1;
		this.chasse.swap();
		const t = this.rearSpring.leff;
		this.rearSpring.leff = this.frontSpring.leff;
		this.frontSpring.leff = t;
	}

	control() {
		const assert = this.gamepad;
		const result = assert.isButtonDown("up");
		const down = assert.isButtonDown("down");
		const isBigEndian =
			(assert.isButtonDown("back"), assert.isButtonDown("left"));
		const up = assert.isButtonDown("right");
		const flagZ = assert.isButtonDown("z");
		const newPos = result ? 1 : 0;

		this.rearWheel.motor += (newPos - this.rearWheel.motor) / 10;
		if (flagZ && !this.swapped) {
			this.swap();
			this.swapped = true;
		}
		if (!flagZ) {
			this.swapped = false;
		}
		if (result) {
			this.pedala += this.rearWheel.speed / 5;
		}
		this.rearWheel.brake = down;
		if (down) {
			this.frontSpring.contract(-10, 10);
		}
		this.frontWheel.brake =
			this.dir > 0 && up && down
				? true
				: Boolean(this.dir < 0 && isBigEndian && down);
		let iInteger = isBigEndian ? 1 : 0;
		iInteger += up ? -1 : 0;
		this.rearSpring.contract(5 * iInteger * this.dir, 5);
		this.frontSpring.contract(5 * -iInteger * this.dir, 5);
		this.chasse.rotate(iInteger / 6);
		if (!iInteger && result) {
			this.rearSpring.contract(-7, 5);
			this.frontSpring.contract(7, 5);
		}
	}

	draw() {
		if (this.explosion) {
			this.explosion.draw();
		} else {
			const ctx2 = this.scene.game.canvas.getContext("2d");
			ctx2.imageSmoothingEnabled = true;
			ctx2.webkitImageSmoothingEnabled = true;
			ctx2.mozImageSmoothingEnabled = true;
			if (this.settings.developerMode) {
				for (const mass of this.masses) {
					mass.draw();
				}
			}
			this.drawBikeFrame();
		}
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

	drawBikeFrame() {
		const point = this.rearWheel.position.toScreen(this.scene);
		const center = this.frontWheel.position.toScreen(this.scene);
		const n = this.head.position.toScreen(this.scene);
		const OVERLAY_ALPHA = (this.scene.game.pixelRatio, this.player._opacity);
		let a = center.subtract(point);
		let position = new Vector2(
			(center.y - point.y) * this.dir,
			(point.x - center.x) * this.dir
		);
		const bearingRad = this.pedala;
		const s = this.dir;
		const scale = this.scene.camera.zoom;
		const ctx = this.scene.game.canvas.getContext("2d");
		ctx.globalAlpha = OVERLAY_ALPHA;
		ctx.strokeStyle = "rgba(0,0,0,1)";
		ctx.lineWidth = 3 * scale;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.beginPath();
		ctx.fillStyle = "rgba(200,200, 200, 0.2)";
		ctx.arc(center.x, center.y, 10.5 * scale, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(point.x, point.y, 10.5 * scale, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		const r1 = point.add(a.multiply(0.3)).add(position.multiply(0.25));
		const pos = point.add(a.multiply(0.4)).add(position.multiply(0.05));
		const outerPosition = point
			.add(a.multiply(0.84))
			.add(position.multiply(0.42));
		const currentVM = point.add(a.multiply(0.84)).add(position.multiply(0.37));
		ctx.beginPath();
		ctx.strokeStyle = "rgba(0,0,0,1)";
		ctx.moveTo(point.x, point.y);
		ctx.lineTo(r1.x, r1.y);
		ctx.lineTo(outerPosition.x, outerPosition.y);
		ctx.moveTo(currentVM.x, currentVM.y);
		ctx.lineTo(pos.x, pos.y);
		ctx.lineTo(point.x, point.y);
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "rgba(0,0,0,1)";
		ctx.lineWidth = Math.max(Number(scale), 0.5);
		ctx.arc(pos.x, pos.y, 3 * scale, 0, 2 * Math.PI, false);
		ctx.stroke();
		let p = new Vector2(
			6 * Math.cos(bearingRad) * scale,
			6 * Math.sin(bearingRad) * scale
		);
		const m = pos.add(p);
		const p1 = pos.subtract(p);
		ctx.beginPath();
		ctx.moveTo(m.x, m.y);
		ctx.lineTo(p1.x, p1.y);
		ctx.stroke();
		let p2coord = point.add(a.multiply(0.25)).add(position.multiply(0.4));
		const tempLook = point.add(a.multiply(0.17)).add(position.multiply(0.38));
		let p3coord = point.add(a.multiply(0.3)).add(position.multiply(0.45));
		ctx.beginPath();
		ctx.strokeStyle = "rgba(0,0,0,1)";
		ctx.lineWidth = 3 * scale;
		ctx.moveTo(tempLook.x, tempLook.y);
		ctx.lineTo(p3coord.x, p3coord.y);
		ctx.moveTo(pos.x, pos.y);
		ctx.lineTo(p2coord.x, p2coord.y);
		const mouthStart = point.add(a.multiply(1)).add(position.multiply(0));
		let p4coord = point.add(a.multiply(0.97)).add(position.multiply(0));
		let p1coord = point.add(a.multiply(0.8)).add(position.multiply(0.48));
		ctx.moveTo(mouthStart.x, mouthStart.y);
		ctx.lineTo(p4coord.x, p4coord.y);
		ctx.lineTo(p1coord.x, p1coord.y);
		let arrowEnd = point.add(a.multiply(0.86)).add(position.multiply(0.5));
		const endT = point.add(a.multiply(0.82)).add(position.multiply(0.65));
		const end = point.add(a.multiply(0.78)).add(position.multiply(0.67));
		if (
			(ctx.moveTo(p1coord.x, p1coord.y),
			ctx.lineTo(arrowEnd.x, arrowEnd.y),
			ctx.lineTo(endT.x, endT.y),
			ctx.lineTo(end.x, end.y),
			ctx.stroke(),
			this.crashed)
		) {
			if (this.ragdoll) {
				this.ragdoll.draw();
			}
		} else {
			position = n.subtract(point.add(a.multiply(0.5)));
			const e = r1.add(a.multiply(-0.1)).add(position.multiply(0.3));
			p = m.subtract(e);
			let offset = new Vector2(p.y * s, -p.x * s);
			offset = offset.multiply(scale * scale);
			p1coord = e.add(p.multiply(0.5)).add(offset.multiply(200 / p.lenSqr()));
			p2coord = m.add(p.multiply(0.12)).add(offset.multiply(50 / p.lenSqr()));
			p = p1.subtract(e);
			offset = new Vector2(p.y * s, -p.x * s);
			offset = offset.multiply(scale * scale);
			p3coord = e.add(p.multiply(0.5)).add(offset.multiply(200 / p.lenSqr()));
			p4coord = p1.add(p.multiply(0.12)).add(offset.multiply(50 / p.lenSqr()));
			ctx.strokeStyle = "rgba(0,0,0,0.5)";
			ctx.lineWidth = 6 * scale;
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p3coord.x, p3coord.y);
			ctx.lineTo(e.x, e.y);
			ctx.stroke();
			ctx.lineWidth = 4 * scale;
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p4coord.x, p4coord.y);
			ctx.stroke();
			ctx.lineWidth = 6 * scale;
			ctx.strokeStyle = "rgba(0,0,0,1)";
			ctx.beginPath();
			ctx.moveTo(m.x, m.y);
			ctx.lineTo(p1coord.x, p1coord.y);
			ctx.lineTo(e.x, e.y);
			ctx.stroke();
			ctx.lineWidth = 6 * scale;
			ctx.beginPath();
			ctx.moveTo(m.x, m.y);
			ctx.lineTo(p2coord.x, p2coord.y);
			ctx.stroke();
			const code = r1.add(a.multiply(0.05)).add(position.multiply(0.9));
			ctx.lineWidth = 8 * scale;
			ctx.beginPath();
			ctx.moveTo(e.x, e.y);
			ctx.lineTo(code.x, code.y);
			ctx.stroke();
			const item = r1.add(a.multiply(0.15)).add(position.multiply(1.05));
			a = code.subtract(end);
			position = new Vector2(a.y * s, -a.x * s);
			position = position.multiply(scale * scale);
			arrowEnd = end
				.add(a.multiply(0.4))
				.add(position.multiply(130 / a.lenSqr()));
			ctx.lineWidth = 5 * scale;
			ctx.beginPath();
			ctx.moveTo(code.x, code.y);
			ctx.lineTo(arrowEnd.x, arrowEnd.y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();
			const to = this.cosmetics;
			const headItem = inventoryManager.getItem(to.head);
			const callback = this.drawHeadAngle;
			headItem.draw(ctx, item.x, item.y, callback, scale, this.dir);
			ctx.globalAlpha = 1;
		}
	}
}

export default BMX;
