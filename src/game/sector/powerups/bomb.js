import Powerup from "../powerup";

const options = {
	canvas: document.createElement("canvas"),
	dirty: true,
	width: 26,
	height: 26,
};
class Bomb extends Powerup {
	constructor(x, data, obj) {
		super(obj);
		this.x = x;
		this.y = data;
		this.hit = false;
		this.name = "bomb";
	}

	getCode() {
		return `O ${this.x.toString(32)} ${this.y.toString(32)}`;
	}

	recache(scale) {
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

	drawCircle(e, r, scale, ctx) {
		scale = scale * 0.2;
		ctx.fillStyle = "#000";
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 8 * scale;
		ctx.beginPath();
		ctx.moveTo(53 * scale, 105 * scale);
		ctx.lineTo(41.5 * scale, 115 * scale);
		ctx.lineTo(43 * scale, 100 * scale);
		ctx.bezierCurveTo(
			35.5 * scale,
			95 * scale,
			30 * scale,
			88.5 * scale,
			26.5 * scale,
			80 * scale
		);
		ctx.lineTo(11 * scale, 78 * scale);
		ctx.lineTo(24 * scale, 69.5 * scale);
		ctx.bezierCurveTo(
			24 * scale,
			68 * scale,
			24 * scale,
			67 * scale,
			24 * scale,
			66 * scale
		);
		ctx.bezierCurveTo(
			24 * scale,
			58.5 * scale,
			26 * scale,
			51 * scale,
			30 * scale,
			45 * scale
		);
		ctx.lineTo(22 * scale, 31.5 * scale);
		ctx.lineTo(37.5 * scale, 36 * scale);
		ctx.bezierCurveTo(
			43.5 * scale,
			31 * scale,
			51 * scale,
			27.5 * scale,
			60 * scale,
			26 * scale
		);
		ctx.lineTo(66 * scale, 11 * scale);
		ctx.lineTo(72 * scale, 26.5 * scale);
		ctx.bezierCurveTo(
			80.5 * scale,
			27.5 * scale,
			88 * scale,
			31 * scale,
			93.5 * scale,
			36.5 * scale
		);
		ctx.lineTo(110 * scale, 31.5 * scale);
		ctx.lineTo(101.5 * scale, 46 * scale);
		ctx.bezierCurveTo(
			105 * scale,
			52 * scale,
			107 * scale,
			59 * scale,
			107 * scale,
			66 * scale
		);
		ctx.bezierCurveTo(
			107 * scale,
			67 * scale,
			107 * scale,
			68 * scale,
			107 * scale,
			69 * scale
		);
		ctx.lineTo(121 * scale, 78 * scale);
		ctx.lineTo(104.5 * scale, 80.5 * scale);
		ctx.bezierCurveTo(
			101.5 * scale,
			88 * scale,
			96 * scale,
			95 * scale,
			89 * scale,
			99.5 * scale
		);
		ctx.lineTo(90.5 * scale, 115 * scale);
		ctx.lineTo(78.5 * scale, 104.5 * scale);
		ctx.bezierCurveTo(
			74.5 * scale,
			106 * scale,
			70 * scale,
			107 * scale,
			65.5 * scale,
			107 * scale
		);
		ctx.bezierCurveTo(
			61 * scale,
			107 * scale,
			57 * scale,
			106 * scale,
			53 * scale,
			105 * scale
		);
		ctx.lineTo(53 * scale, 105 * scale);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(66 * scale, 66 * scale, 40 * scale, 0 * scale, 2 * Math.PI, true);
		ctx.lineWidth = 2 * scale;
		ctx.fillStyle = "#d12929";
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(66 * scale, 66 * scale, 8 * scale, 0 * scale, 2 * Math.PI, true);
		ctx.lineWidth = 2 * scale;
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.stroke();
	}

	collide(other) {
		const e = other.parent;
		const target = e.player;
		const dx = other.position.x - this.x;
		const dy = other.position.y - this.y;
		const sqrt8 = Math.sqrt(dx ** 2 + dy ** 2);
		if (sqrt8 < 20 && target.isAlive()) {
			e.explode();
			if (target.isGhost() === false) {
				this.hit = true;
				this.sector.powerupCanvasDrawn = false;
			}
		}
	}
}

export default Bomb;
