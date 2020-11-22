import Powerup from "../../powerup";

function Slowmo(x, data, obj) {
	this.x = x;
	this.y = data;
	this.init(obj);
}
const sqrt = Math.sqrt;
const options = {
	canvas: document.createElement("canvas"),
	dirty: true,
	width: 24,
	height: 24,
};
Slowmo.prototype = new Powerup();
const me = Slowmo.prototype;
me.x = 0;
me.y = 0;
me.name = "slowmo";
me.recache = function (scale) {
	options.dirty = false;
	const canvas = options.canvas;
	canvas.width = options.width * scale;
	canvas.height = options.height * scale;
	const ctx = canvas.getContext("2d");
	const x2 = canvas.width / 2;
	const y = canvas.height / 2;
	this.drawCircle(x2, y, scale, ctx);
	if (this.settings.developerMode) {
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "red";
		ctx.strokeWidth = Number(scale);
		ctx.stroke();
	}
};
me.setDirty = function (value) {
	options.dirty = value;
};
me.getCode = function () {
	return `S ${this.x.toString(32)} ${this.y.toString(32)}`;
};
me.draw = function (x, y, scale, context) {
	if (options.dirty) {
		this.recache(scale);
	}
	const w = options.width * scale;
	const height = options.height * scale;
	const radius = w / 2;
	const top = height / 2;
	context.drawImage(options.canvas, x - radius, y - top, w, height);
};
me.collide = function (other) {
	const parent = other.parent;
	const player = parent.player;
	const x = other.position.x - this.x;
	const y = other.position.y - this.y;
	const sqrt8 = sqrt(x ** 2 + y ** 2);
	if (!this.hit && sqrt8 < 26 && player.isAlive()) {
		parent.slow = true;
		if (player.isGhost() === false) {
			this.scene.sound.play("slowmo_sound");
			this.scene.message.show("Slow Motion", 50, "#FFFFFF", "#000000");
		}
	}
};
me.drawCircle = function (e, r, scale, ctx) {
	ctx.save();
	ctx.beginPath();
	scale = scale * 0.2;
	ctx.moveTo(0 * scale, 0 * scale);
	ctx.lineTo(116 * scale, 0 * scale);
	ctx.lineTo(116 * scale, 114 * scale);
	ctx.lineTo(0 * scale, 114 * scale);
	ctx.closePath();
	ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = Math.max(3 * scale, 0.5);
	ctx.beginPath();
	ctx.moveTo(58 * scale, 111 * scale);
	ctx.bezierCurveTo(
		89 * scale,
		111 * scale,
		114 * scale,
		87 * scale,
		114 * scale,
		56 * scale
	);
	ctx.bezierCurveTo(
		114 * scale,
		26 * scale,
		89 * scale,
		2 * scale,
		58 * scale,
		2 * scale
	);
	ctx.bezierCurveTo(
		27.1748289 * scale,
		2 * scale,
		2 * scale,
		26 * scale,
		2 * scale,
		56 * scale
	);
	ctx.bezierCurveTo(
		2 * scale,
		87 * scale,
		27.1748289 * scale,
		111 * scale,
		58 * scale,
		111 * scale
	);
	ctx.closePath();
	ctx.moveTo(58 * scale, 103 * scale);
	ctx.bezierCurveTo(
		84 * scale,
		103 * scale,
		106 * scale,
		82 * scale,
		106 * scale,
		56 * scale
	);
	ctx.bezierCurveTo(
		106 * scale,
		30 * scale,
		84 * scale,
		9 * scale,
		58 * scale,
		9 * scale
	);
	ctx.bezierCurveTo(
		31 * scale,
		9 * scale,
		10 * scale,
		30 * scale,
		10 * scale,
		56 * scale
	);
	ctx.bezierCurveTo(
		10 * scale,
		82 * scale,
		31 * scale,
		103 * scale,
		58 * scale,
		103 * scale
	);
	ctx.closePath();
	ctx.moveTo(58 * scale, 55 * scale);
	ctx.lineTo(37 * scale, 23 * scale);
	ctx.lineTo(35 * scale, 25 * scale);
	ctx.lineTo(56 * scale, 57 * scale);
	ctx.lineTo(58 * scale, 55 * scale);
	ctx.closePath();
	ctx.moveTo(58.5 * scale, 59 * scale);
	ctx.lineTo(81.5 * scale, 59 * scale);
	ctx.lineTo(81.5 * scale, 56 * scale);
	ctx.lineTo(58.5 * scale, 56 * scale);
	ctx.lineTo(58.5 * scale, 59 * scale);
	ctx.closePath();
	ctx.moveTo(98.5 * scale, 59 * scale);
	ctx.lineTo(105.5 * scale, 59 * scale);
	ctx.lineTo(105.5 * scale, 56 * scale);
	ctx.lineTo(98.5 * scale, 56 * scale);
	ctx.lineTo(98.5 * scale, 59 * scale);
	ctx.closePath();
	ctx.moveTo(11.5 * scale, 59 * scale);
	ctx.lineTo(18.5 * scale, 59 * scale);
	ctx.lineTo(18.5 * scale, 56 * scale);
	ctx.lineTo(11.5 * scale, 56 * scale);
	ctx.lineTo(11.5 * scale, 59 * scale);
	ctx.closePath();
	ctx.moveTo(57 * scale, 96 * scale);
	ctx.lineTo(57 * scale, 101.5 * scale);
	ctx.lineTo(60 * scale, 101.5 * scale);
	ctx.lineTo(60 * scale, 96 * scale);
	ctx.lineTo(57 * scale, 96 * scale);
	ctx.closePath();
	ctx.moveTo(57 * scale, 12 * scale);
	ctx.lineTo(57 * scale, 17.5 * scale);
	ctx.lineTo(60 * scale, 17.5 * scale);
	ctx.lineTo(60 * scale, 12 * scale);
	ctx.lineTo(57 * scale, 12 * scale);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
};
export default Slowmo;
