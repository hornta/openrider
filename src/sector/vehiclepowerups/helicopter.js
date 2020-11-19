import Powerup from "../../powerup";

function Helicopter(value, i, b, a) {
	this.x = value;
	this.y = i;
	this.time = b;
	this.id = Math.random().toString(36).substr(2);
	this.hit = false;
	this.init(a);
}
const options = {
	canvas: document.createElement("canvas"),
	dirty: true,
	width: 32,
	height: 42,
};
const sqrt = Math.sqrt;
Helicopter.prototype = new Powerup();
const me = Helicopter.prototype;
me.x = 0;
me.y = 0;
me.name = "helicopter";
me.getCode = function () {
	return `V ${this.x.toString(32)} ${this.y.toString(
		32
	)} 1 ${this.time.toString(32)}`;
};
me.recache = function (scale) {
	options.dirty = false;
	const canvas = options.canvas;
	canvas.width = options.width * scale;
	canvas.height = options.height * scale;
	const newOperators = canvas.getContext("2d");
	const iconIndex = canvas.width / 2;
	const item = canvas.height / 2;
	this.drawIcon(iconIndex, item, scale, newOperators);
};
me.setDirty = function (value) {
	options.dirty = value;
};
me.draw = function (x, y, scale, context) {
	if (!this.hit) {
		if (options.dirty) {
			this.recache(scale);
		}
		const w = options.width * scale;
		const height = options.height * scale;
		const radius = w / 2;
		const top = height / 2;
		context.drawImage(options.canvas, x - radius, y - top, w, height);
	}
};
me.drawIcon = function (iconIndex, x, scale, ctx) {
	scale = Number(scale);
	ctx.lineCap = "butt";
	ctx.lineJoin = "miter";
	ctx.miterLimit = 4 * scale;
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(15 * scale, 4.5 * scale);
	ctx.lineTo(15 * scale, 2.5 * scale);
	ctx.bezierCurveTo(
		15 * scale,
		1.4 * scale,
		14.1 * scale,
		0.5 * scale,
		13 * scale,
		0.5 * scale
	);
	ctx.bezierCurveTo(
		11.9 * scale,
		0.5 * scale,
		11 * scale,
		1.4 * scale,
		11 * scale,
		2.5 * scale
	);
	ctx.lineTo(11 * scale, 4.5 * scale);
	ctx.bezierCurveTo(
		11 * scale,
		5.6 * scale,
		11.9 * scale,
		6.5 * scale,
		13 * scale,
		6.5 * scale
	);
	ctx.bezierCurveTo(
		14.1 * scale,
		6.5 * scale,
		15 * scale,
		5.6 * scale,
		15 * scale,
		4.5 * scale
	);
	ctx.lineTo(15 * scale, 4.5 * scale);
	ctx.closePath();
	ctx.fill();
	ctx.beginPath();
	ctx.lineCap = "round";
	ctx.lineWidth = 2 * scale;
	ctx.moveTo(Number(scale), 3 * scale);
	ctx.lineTo(25 * scale, 3 * scale);
	ctx.stroke();
	ctx.lineCap = "butt";
	ctx.lineWidth = Number(scale);
	ctx.beginPath();
	ctx.moveTo(6.1 * scale, 26.9 * scale);
	ctx.lineTo(4.1 * scale, 31.9 * scale);
	ctx.bezierCurveTo(
		3.8 * scale,
		32.7 * scale,
		4.2 * scale,
		33.6 * scale,
		4.9 * scale,
		33.9 * scale
	);
	ctx.bezierCurveTo(
		5.7 * scale,
		34.2 * scale,
		6.6 * scale,
		33.8 * scale,
		6.9 * scale,
		33 * scale
	);
	ctx.lineTo(8.9 * scale, 28 * scale);
	ctx.bezierCurveTo(
		9.2 * scale,
		27.3 * scale,
		8.8 * scale,
		26.4 * scale,
		8 * scale,
		26.1 * scale
	);
	ctx.bezierCurveTo(
		7.3 * scale,
		25.8 * scale,
		6.4 * scale,
		26.1 * scale,
		6.1 * scale,
		26.9 * scale
	);
	ctx.lineTo(6.1 * scale, 26.9 * scale);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(17 * scale, 28 * scale);
	ctx.lineTo(19 * scale, 33 * scale);
	ctx.bezierCurveTo(
		19.4 * scale,
		33.8 * scale,
		20.3 * scale,
		34.2 * scale,
		21 * scale,
		33.9 * scale
	);
	ctx.bezierCurveTo(
		21.8 * scale,
		33.6 * scale,
		22.2 * scale,
		32.7 * scale,
		21.9 * scale,
		31.9 * scale
	);
	ctx.lineTo(19.9 * scale, 26.9 * scale);
	ctx.bezierCurveTo(
		19.6 * scale,
		26.2 * scale,
		18.7 * scale,
		25.8 * scale,
		17.9 * scale,
		26.1 * scale
	);
	ctx.bezierCurveTo(
		17.2 * scale,
		26.4 * scale,
		16.8 * scale,
		27.3 * scale,
		17.1 * scale,
		28 * scale
	);
	ctx.lineTo(17 * scale, 28 * scale);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "#f59423";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2 * scale;
	ctx.beginPath();
	ctx.arc(13 * scale, 17 * scale, 11 * scale, 0 * scale, 2 * Math.PI, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(21 * scale, 17 * scale);
	ctx.bezierCurveTo(
		21 * scale,
		12.6 * scale,
		17.4 * scale,
		9 * scale,
		13 * scale,
		9 * scale
	);
	ctx.bezierCurveTo(
		8.6 * scale,
		9 * scale,
		5 * scale,
		12.6 * scale,
		5 * scale,
		17 * scale
	);
	ctx.lineTo(21 * scale, 17 * scale);
	ctx.closePath();
	ctx.fill();
};
me.collide = function (other) {
	const e = other.parent;
	const self = e.player;
	const x = other.pos.x - this.x;
	const y = other.pos.y - this.y;
	const sqrt8 = sqrt(x ** 2 + y ** 2);
	const nodesOnScreen = self._powerupsConsumed.misc;
	const scene = this.scene;
	if (sqrt8 < 30 && self.isAlive() && nodesOnScreen.indexOf(this.id) === -1) {
		nodesOnScreen.push(this.id);
		const next = this.time * scene.settings.drawFPS;
		self.setTempVehicle(
			"HELI",
			next,
			{
				x: this.x,
				y: this.y,
			},
			e.dir
		);
		if (scene.camera.playerFocus === self) {
			scene.camera.focusOnPlayer();
			scene.vehicleTimer.playerAddedTime(self);
		}
		if (self.isGhost() === false) {
			this.hit = true;
			this.sector.powerupCanvasDrawn = false;
			this.scene.message.show("Helicopter Powerup!", 50, "#F2902E", false);
		}
	}
};
export default Helicopter;
