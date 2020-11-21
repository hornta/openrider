import Powerup from "../../powerup";

function Truck(value, i, b, a) {
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
Truck.prototype = new Powerup();
const me = Truck.prototype;
me.x = 0;
me.y = 0;
me.name = "truck";
me.getCode = function () {
	return `V ${this.x.toString(32)} ${this.y.toString(
		32
	)} 2 ${this.time.toString(32)}`;
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
	ctx.save();
	ctx.scale(size, size);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(24, 0);
	ctx.lineTo(24, 26);
	ctx.lineTo(0, 26);
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
	ctx.translate(-1320, -352);
	ctx.save();
	ctx.translate(251, 28);
	ctx.save();
	ctx.translate(1056, 265);
	ctx.save();
	ctx.translate(3, 49);
	ctx.save();
	ctx.translate(10, 8);
	ctx.save();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(2, 17);
	ctx.lineTo(4, 17);
	ctx.quadraticCurveTo(6, 17, 6, 19);
	ctx.lineTo(6, 26);
	ctx.quadraticCurveTo(6, 28, 4, 28);
	ctx.lineTo(2, 28);
	ctx.quadraticCurveTo(0, 28, 0, 26);
	ctx.lineTo(0, 19);
	ctx.quadraticCurveTo(0, 17, 2, 17);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(20, 17);
	ctx.lineTo(22, 17);
	ctx.quadraticCurveTo(24, 17, 24, 19);
	ctx.lineTo(24, 26);
	ctx.quadraticCurveTo(24, 28, 22, 28);
	ctx.lineTo(20, 28);
	ctx.quadraticCurveTo(18, 28, 18, 26);
	ctx.lineTo(18, 19);
	ctx.quadraticCurveTo(18, 17, 20, 17);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2;
	ctx.lineCap = "square";
	ctx.beginPath();
	ctx.moveTo(3.5, 23);
	ctx.lineTo(20.5, 23);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.save();
	ctx.fillStyle = "#94d44e";
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(23, 11.2672237);
	ctx.bezierCurveTo(23.5979157, 11.6115707, 24, 12.2552568, 24, 12.999615);
	ctx.lineTo(24, 19.000385);
	ctx.bezierCurveTo(24, 20.1047419, 23.1029738, 21, 21.9950534, 21);
	ctx.lineTo(2.00494659, 21);
	ctx.bezierCurveTo(0.897645164, 21, 0, 20.1125667, 0, 19.000385);
	ctx.lineTo(0, 12.999615);
	ctx.bezierCurveTo(0, 12.2603805, 0.401930294, 11.6148368, 1, 11.268783);
	ctx.lineTo(1, 3.99742191);
	ctx.bezierCurveTo(1, 2.89427625, 1.88967395, 2, 2.991155, 2);
	ctx.lineTo(21.008845, 2);
	ctx.bezierCurveTo(22.1085295, 2, 23, 2.89092539, 23, 3.99742191);
	ctx.lineTo(23, 11.2672237);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.restore();
	ctx.save();
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(22.5009348, 12.1337882);
	ctx.lineTo(22, 11.8452936);
	ctx.lineTo(22, 3.99742191);
	ctx.bezierCurveTo(22, 3.44392402, 21.5569554, 3, 21.008845, 3);
	ctx.lineTo(2.991155, 3);
	ctx.bezierCurveTo(2.44342393, 3, 2, 3.44509694, 2, 3.99742191);
	ctx.lineTo(2, 11.8455);
	ctx.lineTo(1.50082265, 12.1343329);
	ctx.bezierCurveTo(1.19247839, 12.3127464, 1, 12.6390115, 1, 12.999615);
	ctx.lineTo(1, 19.000385);
	ctx.bezierCurveTo(1, 19.5563739, 1.44601448, 20, 2.00494659, 20);
	ctx.lineTo(21.9950534, 20);
	ctx.bezierCurveTo(22.5510229, 20, 23, 19.5521213, 23, 19.000385);
	ctx.lineTo(23, 12.999615);
	ctx.bezierCurveTo(
		23,
		12.6352349,
		22.8086914,
		12.311029,
		22.5009348,
		12.1337882
	);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(5, 6);
	ctx.lineTo(19, 6);
	ctx.quadraticCurveTo(19, 6, 19, 6);
	ctx.lineTo(19, 12);
	ctx.quadraticCurveTo(19, 12, 19, 12);
	ctx.lineTo(5, 12);
	ctx.quadraticCurveTo(5, 12, 5, 12);
	ctx.lineTo(5, 6);
	ctx.quadraticCurveTo(5, 6, 5, 6);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.arc(5.03571429, 16.0357143, 1.39285714, 0, 6.283185307179586, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.arc(18.9642857, 16.0357143, 1.39285714, 0, 6.283185307179586, true);
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
};
me.collide = function (other) {
	const e = other.parent;
	const self = e.player;
	const x = other.position.x - this.x;
	const y = other.position.y - this.y;
	const sqrt8 = sqrt(x ** 2 + y ** 2);
	const nodesOnScreen = self._powerupsConsumed.misc;
	const scene = this.scene;
	if (sqrt8 < 30 && self.isAlive() && !nodesOnScreen.includes(this.id)) {
		nodesOnScreen.push(this.id);
		const next = this.time * scene.settings.drawFPS;
		self.setTempVehicle(
			"TRUCK",
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
			this.scene.message.show("Truck Powerup!", 50, "#94d44e", false);
		}
	}
};
export default Truck;
