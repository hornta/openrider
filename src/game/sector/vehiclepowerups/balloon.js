import Powerup from "../powerup";

const options = {
	canvas: document.createElement("canvas"),
	dirty: true,
	width: 22,
	height: 32,
};
class Balloon extends Powerup {
	constructor(value, i, b, a) {
		super(a);
		this.x = value;
		this.y = i;
		this.time = b;
		this.id = Math.random().toString(36).slice(2);
		this.hit = false;
		this.name = "balloon";
	}

	getCode() {
		return `V ${this.x.toString(32)} ${this.y.toString(
			32
		)} 3 ${this.time.toString(32)}`;
	}

	recache(scale) {
		options.dirty = false;
		const canvas = options.canvas;
		canvas.width = options.width * scale;
		canvas.height = options.height * scale;
		const newOperators = canvas.getContext("2d");
		const iconIndex = canvas.width / 2;
		const item = canvas.height / 2;
		this.drawIcon(iconIndex, item, scale, newOperators);
	}

	setDirty(value) {
		options.dirty = value;
	}

	draw(x, y, scale, context) {
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
	}

	drawIcon(iconIndex, x, size, ctx) {
		ctx.save();
		ctx.scale(size, size);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(21, 0);
		ctx.lineTo(21, 31);
		ctx.lineTo(0, 31);
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
		ctx.translate(-1322, -440);
		ctx.save();
		ctx.translate(251, 28);
		ctx.save();
		ctx.translate(1056, 265);
		ctx.save();
		ctx.translate(3, 141);
		ctx.save();
		ctx.translate(12, 6);
		ctx.save();
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.moveTo(7, 23);
		ctx.lineTo(14, 23);
		ctx.quadraticCurveTo(15, 23, 15, 24);
		ctx.lineTo(15, 30);
		ctx.quadraticCurveTo(15, 31, 14, 31);
		ctx.lineTo(7, 31);
		ctx.quadraticCurveTo(6, 31, 6, 30);
		ctx.lineTo(6, 24);
		ctx.quadraticCurveTo(6, 23, 7, 23);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.beginPath();
		ctx.moveTo(15, 19);
		ctx.lineTo(12.9375, 24.6875);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.translate(7.03125, 21.84375);
		ctx.scale(-1, 1);
		ctx.translate(-7.03125, -21.84375);
		ctx.beginPath();
		ctx.moveTo(8.0625, 19);
		ctx.lineTo(6, 24.6875);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
		ctx.save();
		ctx.save();
		ctx.fillStyle = "#f02728";
		ctx.save();
		ctx.beginPath();
		ctx.arc(10.5, 11.125, 10.5, 0, 6.283185307179586, true);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
		ctx.restore();
		ctx.save();
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(10.5, 11.125, 9.5, 0, 6.283185307179586, true);
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
	}

	collide(other) {
		const e = other.parent;
		const self = e.player;
		const x = other.position.x - this.x;
		const y = other.position.y - this.y;
		const sqrt8 = Math.sqrt(x ** 2 + y ** 2);
		const nodesOnScreen = self._powerupsConsumed.misc;
		const scene = this.scene;
		if (sqrt8 < 30 && self.isAlive() && !nodesOnScreen.includes(this.id)) {
			nodesOnScreen.push(this.id);
			const next = this.time * scene.settings.drawFPS;
			self.setTempVehicle(
				"BALLOON",
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
				this.scene.message.show("Balloon Powerup!", 50, "#f02728", false);
			}
		}
	}
}

export default Balloon;
