import Canopy from "./canopy";
import Mass from "./mass";
import Spring from "./spring";
import Vector2 from "./math/vector2";
import Vehicle from "./vehicle";

const Balloon = function (e, a) {
	this.vehicleInit(e);
	this.createMasses(a);
	this.createSprings();
	this.stopSounds();
	this.focalPoint = this.head;
};

Balloon.prototype = new Vehicle();
const self = Balloon.prototype;
self.vehicleName = "BALLOON";
self.head = null;
self.basket = null;
self.masses = null;
self.springs = null;
self.slow = false;
self.vehicleInit = self.init;
self.crashed = false;
self.createMasses = function (pos) {
	this.masses = [];
	const t = new Canopy(pos.x, pos.y - 10, this);
	t.radius = 30;
	const o = new Mass(new Vector2(pos.x, pos.y + 35), this);
	o.friction = 0.1;
	this.masses.push(t);
	this.masses.push(o);
	this.head = this.masses[0];
	this.basket = this.masses[1];
	this.head.drive = () => {
		this.explode();
	};
	this.masses[0].drive = this.head.drive;
};
self.updateCameraFocalPoint = function () {};
self.createSprings = function () {
	this.springs = [];
	const idx = new Spring(this.head, this.basket, this);
	idx.springConstant = 0.2;
	idx.dampConstant = 0.2;
	idx.leff = 45;
	idx.lrest = idx.leff;
	this.springs.push(idx);
};
self.update = function () {
	if ((this.crashed === false && this.updateSound(), this.explosion)) {
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
};
self.updateSound = function () {
	if (this.player.isInFocus()) {
		const sound = this.scene.sound;
		const player = this.gamepad;
		if (player.isButtonDown("up")) {
			sound.play("balloon_on", 0.6);
		} else if (!player.isButtonDown("up")) {
			sound.stop("balloon_on");
		}
	}
};
self.stopSounds = function () {
	const sound = this.scene.sound;
	sound.stop("balloon_on");
};
self.draw = function () {
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
};
self.drawBalloon = function (ctx) {
	const s = this.scene;
	const style = this.basket.pos.toScreen(s);
	const center = this.head.pos.toScreen(s);
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
	ctx.lineTo(style.x + 0.36 * width + 0.2 * dx, style.y + 0.36 * dy + 0.2 * r);
	ctx.moveTo(style.x - 0.1 * dx, style.y - 0.1 * r);
	ctx.lineTo(style.x + 0.36 * width - 0.2 * dx, style.y + 0.36 * dy - 0.2 * r);
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
	ctx.lineTo(style.x - 0.22 * width - 0.1 * dx, style.y - 0.22 * dy - 0.1 * r);
	ctx.lineTo(style.x - 0.22 * width + 0.1 * dx, style.y - 0.22 * dy + 0.1 * r);
	ctx.lineTo(style.x + 0.1 * dx, style.y + 0.1 * r);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
};

export default Balloon;
