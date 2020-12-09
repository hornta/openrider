import { SOUND_BOOST } from "../../utils/sounds";
import Powerup from "../powerup";

const options = {
	canvas: document.createElement("canvas"),
	dirty: true,
	width: 24,
	height: 16,
};
class Boost extends Powerup {
	constructor(v, c, r, x) {
		super(x);
		this.x = v;
		this.y = c;
		this.angle = r;
		this.realAngle = r;
		const n = ((r - 180) / 360) * 2 * Math.PI;
		this.directionX = (-Math.sin(n)).toFixed(15) / 1;
		this.directionY = Math.cos(n).toFixed(15) / 1;
		this.name = "boost";
	}

	getCode() {
		return `B ${this.x.toString(32)} ${this.y.toString(
			32
		)} ${this.realAngle.toString(32)}`;
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

	draw(key, str, scale, context) {
		if (options.dirty) {
			this.recache(scale);
		}
		const w = options.width * scale;
		const r = options.height * scale;
		const x = w / 2;
		const h = r / 2;
		const s = key;
		const y = str;
		const rotation = (this.angle - 90) * (Math.PI / 180);
		context.translate(s, y);
		context.rotate(rotation);
		context.drawImage(options.canvas, -x, -h, w, r);
		context.rotate(-rotation);
		context.translate(-s, -y);
	}

	drawCircle(x, r, scale, ctx) {
		ctx.save();
		ctx.strokeStyle = "rgba(0,0,0,0)";
		ctx.lineCap = "round";
		ctx.fillStyle = "#8ac832";
		ctx.strokeStyle = "#000000";
		scale = scale * 0.2;
		ctx.lineWidth = Math.max(8 * scale, 1);
		ctx.beginPath();
		ctx.moveTo(0 * scale, 0 * scale);
		ctx.lineTo(118 * scale, 0 * scale);
		ctx.lineTo(118 * scale, 81 * scale);
		ctx.lineTo(0 * scale, 81 * scale);
		ctx.closePath();
		ctx.beginPath();
		ctx.moveTo(3 * scale, 1.5 * scale);
		ctx.lineTo(35 * scale, 1.7 * scale);
		ctx.lineTo(66 * scale, 40 * scale);
		ctx.lineTo(34 * scale, 78 * scale);
		ctx.lineTo(4 * scale, 78 * scale);
		ctx.lineTo(36 * scale, 39 * scale);
		ctx.lineTo(3 * scale, 1.5 * scale);
		ctx.closePath();
		ctx.moveTo(53 * scale, 1.5 * scale);
		ctx.lineTo(85 * scale, 1.7 * scale);
		ctx.lineTo(116 * scale, 40 * scale);
		ctx.lineTo(84 * scale, 78 * scale);
		ctx.lineTo(54 * scale, 78 * scale);
		ctx.lineTo(85 * scale, 39 * scale);
		ctx.lineTo(53 * scale, 1.5 * scale);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	collide(other) {
		const context = other.parent;
		const player = context.player;
		const dx = other.position.x - this.x;
		const dy = other.position.y - this.y;
		const o = dx ** 2 + dy ** 2;
		const attributes = context.masses;
		const length = attributes.length;
		const shiftX = this.directionX;
		const shiftY = this.directionY;
		if (o < 1000 && player.isAlive()) {
			let i = length - 1;
			for (; i >= 0; i--) {
				const p = attributes[i].position;
				p.x += shiftX;
				p.y += shiftY;
			}
			if (player.isGhost() === false) {
				this.scene.soundManager.play(SOUND_BOOST);
				this.scene.message.show("Boost Engaged", 50, "#8ac832");
			}
		}
	}
}

export default Boost;
