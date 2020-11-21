import Powerup from "../../powerup";

function AntiGravity(x, data, obj) {
	this.x = x;
	this.y = data;
	this.init(obj);
}
const options = {
	canvas: document.createElement("canvas"),
	dirty: true,
	width: 25,
	height: 25,
};
AntiGravity.prototype = new Powerup();
const me = AntiGravity.prototype;
me.x = 0;
me.y = 0;
me.name = "antigravity";
me.getCode = function () {
	return `A ${this.x.toString(32)} ${this.y.toString(32)}`;
};
me.recache = function (scale) {
	options.dirty = false;
	const canvas = options.canvas;
	canvas.width = options.width * scale;
	canvas.height = options.height * scale;
	const ctx = canvas.getContext("2d");
	const m = canvas.width / 2;
	const uboard = canvas.height / 2;
	this.drawPowerup(m, uboard, scale, ctx);
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
me.draw = function (color, x, r, b) {
	if (options.dirty) {
		this.recache(r);
	}
	const w = options.width * r;
	const d = options.height * r;
	const halfWidth = w / 2;
	const h = d / 2;
	const c = color;
	const y = x;
	b.translate(c, y);
	b.drawImage(options.canvas, -halfWidth, -h, w, d);
	b.translate(-c, -y);
};
me.drawPowerup = function (strategy, e, size, ctx) {
	size = size * 0.5;
	ctx.save();
	ctx.beginPath();
	ctx.scale(size, size);
	ctx.moveTo(0, 0);
	ctx.lineTo(50, 0);
	ctx.lineTo(50, 50);
	ctx.lineTo(0, 50);
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
	ctx.translate(-726, -131);
	ctx.save();
	ctx.translate(726, 131);
	ctx.save();
	ctx.fillStyle = "#08faf3";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(25, 36);
	ctx.bezierCurveTo(18.9251591, 36, 14, 31.0751824, 14, 25);
	ctx.bezierCurveTo(14, 18.9248176, 18.9251591, 14, 25, 14);
	ctx.bezierCurveTo(31.0751824, 14, 36, 18.9248176, 36, 25);
	ctx.bezierCurveTo(36, 31.0751824, 31.0751824, 36, 25, 36);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(25, 35);
	ctx.bezierCurveTo(30.5228976, 35, 35, 30.5228976, 35, 25);
	ctx.bezierCurveTo(35, 19.4771024, 30.5228976, 15, 25, 15);
	ctx.bezierCurveTo(19.4773211, 15, 15, 19.4772251, 15, 25);
	ctx.bezierCurveTo(15, 30.5227749, 19.4773211, 35, 25, 35);
	ctx.closePath();
	ctx.moveTo(25, 37);
	ctx.bezierCurveTo(18.3727612, 37, 13, 31.627354, 13, 25);
	ctx.bezierCurveTo(13, 18.372646, 18.3727612, 13, 25, 13);
	ctx.bezierCurveTo(31.6274671, 13, 37, 18.3725329, 37, 25);
	ctx.bezierCurveTo(37, 31.6274671, 31.6274671, 37, 25, 37);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(1.0370609, 29.702878);
	ctx.lineTo(0.571767448, 27.3196417);
	ctx.lineTo(10.8190136, 27.3196417);
	ctx.lineTo(11.2235626, 28.7886215);
	ctx.bezierCurveTo(
		12.5553335,
		33.6244869,
		16.3752072,
		37.4442862,
		21.2110994,
		38.7761385
	);
	ctx.lineTo(22.6800518, 39.1807024);
	ctx.lineTo(22.6800518, 49.4279421);
	ctx.lineTo(20.2968028, 48.9626301);
	ctx.bezierCurveTo(
		10.5816525,
		47.0658182,
		2.93381735,
		39.4180779,
		1.0370609,
		29.702878
	);
	ctx.closePath();
	ctx.moveTo(48.9629391, 20.297122);
	ctx.lineTo(49.4282326, 22.6803583);
	ctx.lineTo(39.1809639, 22.6803583);
	ctx.lineTo(38.7764299, 21.2113511);
	ctx.bezierCurveTo(
		37.4446547,
		16.3752014,
		33.624798,
		12.5554192,
		28.7886215,
		11.2235626
	);
	ctx.lineTo(27.3196417, 10.8190136);
	ctx.lineTo(27.3196417, 0.571783441);
	ctx.lineTo(29.7028653, 1.03705842);
	ctx.bezierCurveTo(
		39.418382,
		2.93381152,
		47.0661305,
		10.5816549,
		48.9629391,
		20.297122
	);
	ctx.closePath();
	ctx.moveTo(11.2235701, 21.2113511);
	ctx.lineTo(10.8190361, 22.6803583);
	ctx.lineTo(0.571767448, 22.6803583);
	ctx.lineTo(1.0370609, 20.297122);
	ctx.bezierCurveTo(
		2.93380373,
		10.5819918,
		10.5815702,
		2.93422536,
		20.2967378,
		1.03707606
	);
	ctx.lineTo(22.6800518, 0.571669532);
	ctx.lineTo(22.6800518, 10.8189911);
	ctx.lineTo(21.2110994, 11.223555);
	ctx.bezierCurveTo(
		16.3751604,
		12.5554202,
		12.5553324,
		16.3752482,
		11.2235701,
		21.2113511
	);
	ctx.closePath();
	ctx.moveTo(29.7028653, 48.9626351);
	ctx.lineTo(27.3196417, 49.4279101);
	ctx.lineTo(27.3196417, 39.1806799);
	ctx.lineTo(28.7886215, 38.7761309);
	ctx.bezierCurveTo(
		33.6247513,
		37.4442873,
		37.4446537,
		33.6245336,
		38.7764374,
		28.7886215
	);
	ctx.lineTo(39.1809864, 27.3196417);
	ctx.lineTo(49.4282326, 27.3196417);
	ctx.lineTo(48.9629391, 29.702878);
	ctx.bezierCurveTo(
		47.0661446,
		39.4182726,
		39.4184545,
		47.0658678,
		29.7028653,
		48.9626351
	);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.save();
	ctx.fillStyle = "#08faf3";
	ctx.beginPath();
	ctx.moveTo(3, 29.3196417);
	ctx.bezierCurveTo(
		4.74079001,
		38.2359804,
		11.7640196,
		45.2589035,
		20.6800518,
		46.9996935
	);
	ctx.lineTo(20.6800518, 40.7043471);
	ctx.bezierCurveTo(
		15.1649961,
		39.1854465,
		10.814247,
		34.8350039,
		9.29534642,
		29.3196417
	);
	ctx.lineTo(3, 29.3196417);
	ctx.closePath();
	ctx.moveTo(47, 20.6803583);
	ctx.bezierCurveTo(
		45.25921,
		11.7640196,
		38.2362869,
		4.74079001,
		29.3196417,
		3
	);
	ctx.lineTo(29.3196417, 9.29534642);
	ctx.bezierCurveTo(
		34.8350039,
		10.814247,
		39.185753,
		15.1646897,
		40.7046536,
		20.6803583
	);
	ctx.lineTo(47, 20.6803583);
	ctx.closePath();
	ctx.moveTo(9.29534642, 20.6803583);
	ctx.bezierCurveTo(
		10.814247,
		15.1646897,
		15.1649961,
		10.814247,
		20.6800518,
		9.29534642
	);
	ctx.lineTo(20.6800518, 3);
	ctx.bezierCurveTo(
		11.7640196,
		4.74109649,
		4.74079001,
		11.7640196,
		3,
		20.6803583
	);
	ctx.lineTo(9.29534642, 20.6803583);
	ctx.closePath();
	ctx.moveTo(29.3196417, 46.9996935);
	ctx.bezierCurveTo(
		38.2362869,
		45.2589035,
		45.25921,
		38.2359804,
		47,
		29.3196417
	);
	ctx.lineTo(40.7046536, 29.3196417);
	ctx.bezierCurveTo(
		39.185753,
		34.8350039,
		34.8350039,
		39.1854465,
		29.3196417,
		40.7043471
	);
	ctx.lineTo(29.3196417, 46.9996935);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
	ctx.restore();
	ctx.restore();
	ctx.restore();
};
me.collide = function (other) {
	const e = other.parent;
	const target = e.player;
	const dx = other.position.x - this.x;
	const dy = other.position.y - this.y;
	const o = dx ** 2 + dy ** 2;
	if (o < 1000 && target.isAlive()) {
		if (target.isGhost() === false) {
			if (e.gravity.x != 0 || e.gravity.y != 0) {
				this.scene.sound.play("antigravity_sound", 0.3);
			}
			this.scene.message.show("Antigravity Engaged", 50, "#08faf3");
		}
		e.gravity.x = 0;
		e.gravity.y = 0;
	}
};
export default AntiGravity;
