import Powerup from "../powerup";

const options = {
	canvas: document.createElement("canvas"),
	dirty: true,
	width: 20,
	height: 32,
};
class Checkpoint extends Powerup {
	constructor(x, data, obj) {
		super(obj);
		this.x = x;
		this.y = data;
		this.id = Math.random().toString(36).slice(2);
		this.name = "checkpoint";
	}

	getCode() {
		return `C ${this.x.toString(32)} ${this.y.toString(32)}`;
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
		if (options.dirty) {
			this.recache(scale);
		}
		const w = options.width * scale;
		const height = options.height * scale;
		const radius = w / 2;
		const top = height / 2;
		context.save();
		if (this.hit) {
			context.globalAlpha = 0.3;
		}
		context.drawImage(options.canvas, x - radius, y - top, w, height);
		context.restore();
	}

	drawCircle(e, r, scale, ctx) {
		scale = scale * 0.15;
		ctx.save();
		ctx.translate(1, 1);
		ctx.beginPath();
		ctx.moveTo(0 * scale, 0 * scale);
		ctx.lineTo(112 * scale, 0 * scale);
		ctx.lineTo(112 * scale, 95 * scale);
		ctx.lineTo(0 * scale, 95 * scale);
		ctx.closePath();
		ctx.fillStyle = "#826cdc";
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 8 * scale;
		ctx.beginPath();
		ctx.moveTo(3 * scale, 10 * scale);
		ctx.bezierCurveTo(
			3 * scale,
			10 * scale,
			33.5 * scale,
			27 * scale,
			55 * scale,
			10 * scale
		);
		ctx.bezierCurveTo(
			76 * scale,
			-6 * scale,
			108 * scale,
			10 * scale,
			108 * scale,
			10 * scale
		);
		ctx.lineTo(109 * scale, 86 * scale);
		ctx.bezierCurveTo(
			109 * scale,
			86 * scale,
			74 * scale,
			73.5 * scale,
			56.5 * scale,
			86 * scale
		);
		ctx.bezierCurveTo(
			40 * scale,
			98 * scale,
			3 * scale,
			88.5 * scale,
			3 * scale,
			88.5 * scale
		);
		ctx.lineTo(3 * scale, 10 * scale);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 15 * scale;
		ctx.moveTo(3 * scale, 10 * scale);
		ctx.lineTo(3 * scale, 180 * scale);
		ctx.stroke();
		ctx.restore();
	}

	collide(target) {
		const resolved = target.parent;
		const player = resolved.player;
		const x = target.position.x - this.x;
		const y = target.position.y - this.y;
		const sqrt8 = Math.sqrt(x ** 2 + y ** 2);
		const nodesOnScreen = player._powerupsConsumed.checkpoints;
		if (sqrt8 < 26 && player.isAlive() && !nodesOnScreen.includes(this.id)) {
			nodesOnScreen.push(this.id);
			player.setCheckpointOnUpdate();
			if (player.isGhost() === false) {
				this.hit = true;
				this.sector.powerupCanvasDrawn = false;
				this.scene.message.show("Checkpoint Saved", 50, "#826cdc", "#FFFFFF");
				this.scene.sound.play("checkpoint_sound");
			}
		}
	}
}

export default Checkpoint;
