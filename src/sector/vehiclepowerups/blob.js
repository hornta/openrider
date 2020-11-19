import Powerup from "../../powerup";

function Blob(value, i, b, a) {
	this.x = value;
	this.y = i;
	this.time = b;
	this.id = Math.random().toString(36).slice(2);
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
Blob.prototype = new Powerup();
const me = Blob.prototype;
me.x = 0;
me.y = 0;
me.name = "blob";
me.getCode = function () {
	return `V ${this.x.toString(32)} ${this.y.toString(
		32
	)} 4 ${this.time.toString(32)}`;
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
me.drawIcon = function (iconIndex, x, size, ctx) {
	size = Number(size);
	ctx.lineCap = "butt";
	ctx.lineJoin = "miter";
	ctx.miterLimit = 4 * size;
	ctx.save();
	ctx.scale(size, size);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(24, 0);
	ctx.lineTo(24, 22);
	ctx.lineTo(0, 22);
	ctx.closePath();
	ctx.clip();
	ctx.translate(0, 0);
	ctx.translate(0, 0);
	ctx.scale(1, 1);
	ctx.translate(0, 0);
	ctx.strokeStyle = "rgba(0,0,0,0)";
	ctx.lineCap = "butt";
	ctx.lineJoin = "miter";
	ctx.miterLimit = 4;
	ctx.save();
	ctx.restore();
	ctx.save();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "rgba(0, 0, 0, 0)";
	ctx.strokeStyle = "rgba(0, 0, 0, 0)";
	ctx.lineWidth = 1;
	ctx.translate(-1320, -491);
	ctx.save();
	ctx.translate(251, 28);
	ctx.save();
	ctx.translate(1056, 265);
	ctx.save();
	ctx.translate(3, 187);
	ctx.save();
	ctx.translate(10, 11);
	ctx.save();
	ctx.save();
	ctx.fillStyle = "#a784c5";
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(4, 0);
	ctx.lineTo(20, 0);
	ctx.quadraticCurveTo(24, 0, 24, 4);
	ctx.lineTo(24, 18);
	ctx.quadraticCurveTo(24, 22, 20, 22);
	ctx.lineTo(4, 22);
	ctx.quadraticCurveTo(0, 22, 0, 18);
	ctx.lineTo(0, 4);
	ctx.quadraticCurveTo(0, 0, 4, 0);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.restore();
	ctx.save();
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(5, 1);
	ctx.lineTo(19, 1);
	ctx.quadraticCurveTo(23, 1, 23, 5);
	ctx.lineTo(23, 17);
	ctx.quadraticCurveTo(23, 21, 19, 21);
	ctx.lineTo(5, 21);
	ctx.quadraticCurveTo(1, 21, 1, 17);
	ctx.lineTo(1, 5);
	ctx.quadraticCurveTo(1, 1, 5, 1);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.restore();
	ctx.restore();
	ctx.restore();
	ctx.restore();
	ctx.restore();
	ctx.restore();
	ctx.restore();
};
me.collide = function (other) {
	const e = other.parent;
	const self = e.player;
	const x = other.pos.x - this.x;
	const y = other.pos.y - this.y;
	const sqrt8 = sqrt(x ** 2 + y ** 2);
	const nodesOnScreen = self._powerupsConsumed.misc;
	const scene = this.scene;
	if (sqrt8 < 30 && self.isAlive() && !nodesOnScreen.includes(this.id)) {
		nodesOnScreen.push(this.id);
		const next = this.time * scene.settings.drawFPS;
		self.setTempVehicle(
			"BLOB",
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
			this.scene.message.show("Blob Powerup!", 50, "#A784C5", false);
		}
	}
};
export default Blob;
