import Mass from "../mass";
import Ragdoll from "../ragdoll";
import Spring from "../spring";
import Vector2 from "../math/vector2";
import Vehicle from "../vehicle";
import Wheel from "../wheel";
import inventoryManager from "../inventoryManager";

function BMX(a, i, e, s) {
	this.vehicleInit(a);
	this.createMasses(i, s);
	this.createSprings();
	this.updateCameraFocalPoint();
	this.stopSounds();
	if (e === -1) {
		this.swap();
	}
}

BMX.prototype = new Vehicle();
const self = BMX.prototype;
self.vehicleName = "BMX";
self.vehicleInit = self.init;
self.vehicleUpdate = self.update;
self.masses = null;
self.springs = null;
self.cosmetics = null;
self.slow = false;
self.pedala = 0;
self.cosmeticHead = null;
self.cosmeticRearWheel = null;
self.cosmeticFrontWheel = null;
self.swapped = false;
self.ragdoll = null;
self.createMasses = function (d, e) {
	this.masses = [];
	const p = new Mass();
	const f = new Wheel(new Vector2(d.x + 21, d.y + 3), this);
	const obj = new Wheel(new Vector2(d.x + -21, d.y + 3), this);
	p.init(new Vector2(d.x, d.y - 36), this);
	p.drive = this.createRagdoll.bind(this);
	obj.radius = 11.7;
	f.radius = 11.7;
	p.radius = 14;
	p.vel.equ(e);
	obj.vel.equ(e);
	f.vel.equ(e);
	this.masses.push(p);
	this.masses.push(obj);
	this.masses.push(f);
	this.head = p;
	this.frontWheel = f;
	this.rearWheel = obj;
};
self.createSprings = function () {
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
};
self.createRagdoll = function () {
	this.ragdoll = new Ragdoll(this.getStickMan(), this);
	this.ragdoll.zero(this.head.vel, this.rearWheel.vel);
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
};
self.stopSounds = function () {
	const sound = this.scene.sound;
	sound.stop("bike_air");
	sound.stop("bike_ground");
};
self.playBailSound = function () {
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
};
self.updateCameraFocalPoint = function () {
	this.focalPoint = this.ragdoll ? this.ragdoll.head : this.head;
};
self.getStickMan = function () {
	const s = this.dir;
	const e = this.head;
	const world = this.frontWheel;
	const particle = this.rearWheel;
	const bearingRad = this.pedala;
	const t = world.pos.sub(particle.pos);
	const instructionInfo = e.pos.sub(world.pos.add(particle.pos).factor(0.5));
	const p = new Vector2(t.y * s, -t.x * s);
	const stickMan = {};
	stickMan.head = particle.pos
		.add(t.factor(0.35))
		.add(instructionInfo.factor(1.2));
	stickMan.rHand = particle.pos.add(t.factor(0.8)).add(p.factor(0.68));
	stickMan.lHand = stickMan.rHand;
	let a = stickMan.head.sub(stickMan.lHand);
	a = new Vector2(a.y * s, -a.x * s);
	stickMan.rElbow = stickMan.head
		.add(stickMan.lHand)
		.factor(0.5)
		.add(a.factor(130 / a.lenSqr()));
	stickMan.lElbow = stickMan.rElbow;
	stickMan.waist = particle.pos.add(t.factor(0.2)).add(p.factor(0.5));
	const pos = new Vector2(6 * Math.cos(bearingRad), 6 * Math.sin(bearingRad));
	return (
		(stickMan.lFoot = particle.pos
			.add(t.factor(0.4))
			.add(p.factor(0.05))
			.add(pos)),
		(a = stickMan.waist.sub(stickMan.lFoot)),
		(a = new Vector2(-a.y * s, a.x * s)),
		(stickMan.lKnee = stickMan.waist
			.add(stickMan.lFoot)
			.factor(0.5)
			.add(a.factor(160 / a.lenSqr()))),
		(stickMan.rFoot = particle.pos
			.add(t.factor(0.4))
			.add(p.factor(0.05))
			.sub(pos)),
		(a = stickMan.waist.sub(stickMan.rFoot)),
		(a = new Vector2(-a.y * s, a.x * s)),
		(stickMan.rKnee = stickMan.waist
			.add(stickMan.rFoot)
			.factor(0.5)
			.add(a.factor(160 / a.lenSqr()))),
		stickMan
	);
};
self.update = function () {
	if (
		(this.crashed === false && (this.updateSound(), this.control()),
		this.explosion)
	) {
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
		if (
			(this.rearWheel.contact && this.frontWheel.contact && (this.slow = false),
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
		if (this.ragdoll) {
			this.ragdoll.update();
		} else {
			this.updateDrawHeadAngle();
		}
	}
	this.updateCameraFocalPoint();
};
self.updateSound = function () {
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
};
self.stopSounds = function () {
	const sound = this.scene.sound;
	sound.stop("bike_air");
	sound.stop("bike_ground");
};
self.swap = function () {
	this.dir *= -1;
	this.chasse.swap();
	const t = this.rearSpring.leff;
	this.rearSpring.leff = this.frontSpring.leff;
	this.frontSpring.leff = t;
};
self.control = function () {
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
};
self.draw = function () {
	if (this.explosion) {
		this.explosion.draw();
	} else {
		const ctx2 = this.scene.game.canvas.getContext("2d");
		if (
			((ctx2.imageSmoothingEnabled = true),
			(ctx2.webkitImageSmoothingEnabled = true),
			(ctx2.mozImageSmoothingEnabled = true),
			this.settings.developerMode)
		) {
			const s = this.masses;
			const i = s.length;
			let l = i - 1;
			for (; l >= 0; l--) {
				s[l].draw();
			}
		}
		this.drawBikeFrame();
	}
};
self.updateDrawHeadAngle = function () {
	const o = this.frontWheel.pos;
	const pos = this.rearWheel.pos;
	const i = o.x;
	const size = o.y;
	const length = pos.x;
	const row = pos.y;
	const start = i - length;
	const end = size - row;
	this.drawHeadAngle = -(Math.atan2(start, end) - Math.PI / 2);
};
self.drawBikeFrame = function () {
	const point = this.rearWheel.pos.toScreen(this.scene);
	const center = this.frontWheel.pos.toScreen(this.scene);
	const n = this.head.pos.toScreen(this.scene);
	const OVERLAY_ALPHA = (this.scene.game.pixelRatio, this.player._opacity);
	let a = center.sub(point);
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
	const r1 = point.add(a.factor(0.3)).add(position.factor(0.25));
	const pos = point.add(a.factor(0.4)).add(position.factor(0.05));
	const outerPosition = point.add(a.factor(0.84)).add(position.factor(0.42));
	const currentVM = point.add(a.factor(0.84)).add(position.factor(0.37));
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
	const p1 = pos.sub(p);
	ctx.beginPath();
	ctx.moveTo(m.x, m.y);
	ctx.lineTo(p1.x, p1.y);
	ctx.stroke();
	let p2coord = point.add(a.factor(0.25)).add(position.factor(0.4));
	const tempLook = point.add(a.factor(0.17)).add(position.factor(0.38));
	let p3coord = point.add(a.factor(0.3)).add(position.factor(0.45));
	ctx.beginPath();
	ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.lineWidth = 3 * scale;
	ctx.moveTo(tempLook.x, tempLook.y);
	ctx.lineTo(p3coord.x, p3coord.y);
	ctx.moveTo(pos.x, pos.y);
	ctx.lineTo(p2coord.x, p2coord.y);
	const mouthStart = point.add(a.factor(1)).add(position.factor(0));
	let p4coord = point.add(a.factor(0.97)).add(position.factor(0));
	let p1coord = point.add(a.factor(0.8)).add(position.factor(0.48));
	ctx.moveTo(mouthStart.x, mouthStart.y);
	ctx.lineTo(p4coord.x, p4coord.y);
	ctx.lineTo(p1coord.x, p1coord.y);
	let arrowEnd = point.add(a.factor(0.86)).add(position.factor(0.5));
	const endT = point.add(a.factor(0.82)).add(position.factor(0.65));
	const end = point.add(a.factor(0.78)).add(position.factor(0.67));
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
		position = n.sub(point.add(a.factor(0.5)));
		const e = r1.add(a.factor(-0.1)).add(position.factor(0.3));
		p = m.sub(e);
		let offset = new Vector2(p.y * s, -p.x * s);
		offset = offset.factor(scale * scale);
		p1coord = e.add(p.factor(0.5)).add(offset.factor(200 / p.lenSqr()));
		p2coord = m.add(p.factor(0.12)).add(offset.factor(50 / p.lenSqr()));
		p = p1.sub(e);
		offset = new Vector2(p.y * s, -p.x * s);
		offset = offset.factor(scale * scale);
		p3coord = e.add(p.factor(0.5)).add(offset.factor(200 / p.lenSqr()));
		p4coord = p1.add(p.factor(0.12)).add(offset.factor(50 / p.lenSqr()));
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
		const code = r1.add(a.factor(0.05)).add(position.factor(0.9));
		ctx.lineWidth = 8 * scale;
		ctx.beginPath();
		ctx.moveTo(e.x, e.y);
		ctx.lineTo(code.x, code.y);
		ctx.stroke();
		const item = r1.add(a.factor(0.15)).add(position.factor(1.05));
		a = code.sub(end);
		position = new Vector2(a.y * s, -a.x * s);
		position = position.factor(scale * scale);
		arrowEnd = end.add(a.factor(0.4)).add(position.factor(130 / a.lenSqr()));
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
};

export default BMX;
