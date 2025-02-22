import { SOUND_GOAL } from "../../utils/sounds";
import Powerup from "../powerup";

const options = {
	canvas: document.createElement("canvas"),
	width: 35,
	height: 35,
};
const params = {
	canvas: document.createElement("canvas"),
	width: 35,
	height: 35,
};
let hashCacheState = true;

class Target extends Powerup {
	constructor(x, data, obj) {
		super(obj);
		this.x = x;
		this.y = data;
		this.hit = false;
		this.id = Math.random().toString(36).slice(2);
		this.name = "goal";
		this.hit = false;
	}

	getCode() {
		return `T ${this.x.toString(32)} ${this.y.toString(32)}`;
	}

	recache(scale) {
		hashCacheState = false;
		this.cacheStar(scale);
		this.cacheEmptyStar(scale);
	}

	cacheStar(scale) {
		const canvas = options.canvas;
		canvas.width = options.width * scale;
		canvas.height = options.height * scale;
		const ctx = canvas.getContext("2d");
		const position = canvas.width / 2;
		const charsetBitSize = canvas.height / 2;
		this.drawStar(position, charsetBitSize, 5, 10, 5, true, scale, ctx);
		if (this.settings.developerMode) {
			ctx.beginPath();
			ctx.rect(0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = "red";
			ctx.strokeWidth = Number(scale);
			ctx.stroke();
		}
	}

	cacheEmptyStar(scale) {
		const c = params.canvas;
		c.width = params.width * scale;
		c.height = params.height * scale;
		const ctx = c.getContext("2d");
		const position = c.width / 2;
		const charsetBitSize = c.height / 2;
		this.drawStar(position, charsetBitSize, 5, 10, 5, false, scale, ctx);
		if (this.settings.developerMode) {
			ctx.beginPath();
			ctx.rect(0, 0, c.width, c.height);
			ctx.strokeStyle = "red";
			ctx.strokeWidth = Number(scale);
			ctx.stroke();
		}
	}

	setDirty(state) {
		hashCacheState = state;
	}

	draw(x, y, scale, context) {
		if (this.hit) {
			const w = params.width * scale;
			const width = params.height * scale;
			const r = w / 2;
			const radius = width / 2;
			context.drawImage(params.canvas, x - r, y - radius, w, width);
		} else {
			if (hashCacheState) {
				this.recache(scale);
			}
			const w = options.width * scale;
			const width = options.height * scale;
			const r = w / 2;
			const radius = width / 2;
			context.drawImage(options.canvas, x - r, y - radius, w, width);
		}
	}

	drawStar(x, y, theta, r, i, color, scale, ctx) {
		let angle = (Math.PI / 2) * 3;
		let dx = x;
		let top = y;
		const pi2 = Math.PI / theta;
		r *= scale;
		i *= scale;
		ctx.strokeSyle = "#000";
		ctx.beginPath();
		ctx.moveTo(x, y - r);
		let twoPI = 0;
		for (; theta > twoPI; twoPI++) {
			dx = x + Math.cos(angle) * r;
			top = y + Math.sin(angle) * r;
			ctx.lineTo(dx, top);
			angle += pi2;
			dx = x + Math.cos(angle) * i;
			top = y + Math.sin(angle) * i;
			ctx.lineTo(dx, top);
			angle += pi2;
		}
		ctx.lineTo(x, y - r);
		ctx.closePath();
		ctx.lineWidth = Math.max(2 * scale, 1);
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.fillStyle = color ? "#FAE335" : "#FFFFFF";
		ctx.fill();
	}

	collide(target) {
		const resolved = target.parent;
		const player = resolved.player;
		const x = target.position.x - this.x;
		const y = target.position.y - this.y;
		const sqrt8 = Math.sqrt(x ** 2 + y ** 2);
		const targets = player._powerupsConsumed.targets;
		const scene = this.scene;
		if (sqrt8 < 26 && player.isAlive() && !targets.includes(this.id)) {
			targets.push(this.id);
			const l = targets.length;
			const r = scene.track.targetCount;
			if (player.isGhost() === false) {
				this.hit = true;
				this.sector.powerupCanvasDrawn = false;
				scene.soundManager.play(SOUND_GOAL);
				scene.message.show(`${l} of ${r} Stars`, 50, "#FAE335", "#666666");
			}
			if (l >= r) {
				player.complete = true;
			}
		}
	}
}

export default Target;
