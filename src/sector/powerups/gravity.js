import Powerup from "../../powerup";

function Gravity(x, y, config, key) {
	this.x = x;
	this.y = y;
	this.angle = config - 180;
	this.realAngle = config;
	const bearingRad = (this.angle / 360) * 2 * Math.PI;
	this.directionX = (-0.3 * Math.sin(bearingRad)).toFixed(15) / 1;
	this.directionY = (0.3 * Math.cos(bearingRad)).toFixed(15) / 1;
	this.init(key);
}
const options = {
	canvas: document.createElement("canvas"),
	dirty: true,
	width: 20,
	height: 20,
};
Gravity.prototype = new Powerup();
const self = Gravity.prototype;
self.x = 0;
self.y = 0;
self.angle = 0;
self.realAngle = 0;
self.name = "gravity";
self.recache = function (scale) {
	options.dirty = false;
	const canvas = options.canvas;
	canvas.width = options.width * scale;
	canvas.height = options.height * scale;
	const ctx = canvas.getContext("2d");
	const expectedPackagePath = canvas.width / 2;
	const blobStagingPath = canvas.height / 2;
	this.drawArrow(expectedPackagePath, blobStagingPath, scale, ctx);
	if (this.settings.developerMode) {
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "red";
		ctx.strokeWidth = 3 * scale;
		ctx.stroke();
	}
};
self.getCode = function () {
	return `G ${this.x.toString(32)} ${this.y.toString(
		32
	)} ${this.realAngle.toString(32)}`;
};
self.setDirty = function (value) {
	options.dirty = value;
};
self.draw = function (key, str, scale, context) {
	if (options.dirty) {
		this.recache(scale);
	}
	const w = options.width * scale;
	const r = options.height * scale;
	const x = w / 2;
	const h = r / 2;
	const s = key;
	const y = str;
	const rotation = (this.angle + 90) * (Math.PI / 180);
	context.translate(s, y);
	context.rotate(rotation);
	context.drawImage(options.canvas, -x, -h, w, r);
	context.rotate(-rotation);
	context.translate(-s, -y);
};
self.drawArrow = function (to, path, scale, ctx) {
	scale = scale * 0.2;
	ctx.beginPath();
	ctx.moveTo(0 * scale, 0 * scale);
	ctx.lineTo(97 * scale, 0 * scale);
	ctx.lineTo(97 * scale, 96 * scale);
	ctx.lineTo(0 * scale, 96 * scale);
	ctx.closePath();
	ctx.clip();
	ctx.fillStyle = "rgba(0, 0, 0, 0)";
	ctx.strokeStyle = "rgba(0, 0, 0, 0)";
	ctx.lineWidth = Math.max(6 * scale, 1);
	ctx.save();
	ctx.fillStyle = "#376eb7";
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(41 * scale, 70 * scale);
	ctx.lineTo(41 * scale, 95 * scale);
	ctx.lineTo(97 * scale, 48 * scale);
	ctx.lineTo(41 * scale, Number(scale));
	ctx.lineTo(41 * scale, 25 * scale);
	ctx.lineTo(Number(scale), 25 * scale);
	ctx.lineTo(Number(scale), 70 * scale);
	ctx.lineTo(41 * scale, 70 * scale);
	ctx.closePath();
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
};
self.collide = function (other) {
	const e = other.parent;
	const target = e.player;
	const dx = other.pos.x - this.x;
	const dy = other.pos.y - this.y;
	const o = dx ** 2 + dy ** 2;
	const allKids = e.masses;
	const xSpeedIncrease = (allKids.length, this.directionX);
	const defaultYPos = this.directionY;
	if (o < 1e3 && target.isAlive()) {
		e.gravity.x = xSpeedIncrease;
		e.gravity.y = defaultYPos;
		if (target.isGhost() === false) {
			this.scene.message.show("Gravity Changed", 50, "#1F80C3", "#FFFFFF");
			this.scene.sound.play("gravity_down_sound");
		}
	}
};

export default Gravity;
