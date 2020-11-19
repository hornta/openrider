import Mass from "./mass";
import Spring from "./spring";
import Vector2 from "./math/vector2";
import Vehicle from "./vehicle";
import Wheel from "./wheel";

function Blob(e, a) {
	this.vehicleInit(e);
	this.createMasses(a);
	this.createSprings();
	this.stopSounds();
}

Blob.prototype = new Vehicle();
const self = Blob.prototype;
self.vehicleName = "Blob";
self.vehicleInit = self.init;
self.vehicleUpdate = self.update;
self.vehicleDraw = self.draw;
self.masses = null;
self.springs = null;
self.slow = false;
self.createMasses = function (b) {
	const colList = [];
	colList.push(new Wheel(new Vector2(b.x + 15, b.y + 40), this));
	colList.push(new Wheel(new Vector2(b.x + -15, b.y + 40), this));
	colList.push(new Wheel(new Vector2(b.x + -15, b.y + 10), this));
	colList.push(new Wheel(new Vector2(b.x + 15, b.y + 10), this));
	const mass = new Mass();
	mass.init(new Vector2(0, 0), this);
	mass.vel = new Vector2(0, 0);
	this.m0 = colList[0];
	this.m1 = colList[1];
	this.m2 = colList[2];
	this.m3 = colList[3];
	this.head = mass;
	this.masses = colList;
	this.focalPoint = this.head;
};
self.createSprings = function () {
	let parts = this.masses;
	let value = [];
	parts = this.masses;
	value = [];
	this.spring0 = new Spring(parts[0], parts[1], this);
	this.spring1 = new Spring(parts[1], parts[2], this);
	this.spring2 = new Spring(parts[2], parts[3], this);
	this.spring3 = new Spring(parts[3], parts[0], this);
	this.spring4 = new Spring(parts[0], parts[2], this);
	this.spring5 = new Spring(parts[1], parts[3], this);
	const n = this.spring0;
	const h = this.spring1;
	const o = this.spring2;
	const r = this.spring3;
	const index = this.spring4;
	const task = this.spring5;
	value.push(n);
	value.push(h);
	value.push(o);
	value.push(r);
	value.push(index);
	value.push(task);
	for (const classKey in value) {
		value[classKey].springConstant = 0.2;
		value[classKey].dampConstant = 0.2;
	}
	this.springs = value;
};
self.update = function () {
	if (
		(this.crashed === false && (this.updateSound(), this.control()),
		this.explosion)
	) {
		this.explosion.update();
	} else {
		const positions = this.masses;
		const n = positions.length;
		const group = this.springs;
		const start = group.length;
		let s = start - 1;
		for (; s >= 0; s--) {
			group[s].update();
		}
		let m = n - 1;
		for (; m >= 0; m--) {
			positions[m].update();
		}
		if (
			((positions[0].contact ||
				positions[1].contact ||
				positions[2].contact ||
				positions[3].contact) &&
				(this.slow = false),
			!this.slow)
		) {
			this.control();
			s = start - 1;
			for (; s >= 0; s--) {
				group[s].update();
			}
			m = n - 1;
			for (; m >= 0; m--) {
				positions[m].update();
			}
		}
		let tw = 0;
		let i = 0;
		m = 0;
		for (; m < n; m++) {
			tw += positions[m].pos.x;
			i += positions[m].pos.y;
		}
		const curr = this.head;
		curr.pos.x = 0.25 * tw;
		curr.pos.y = 0.25 * i;
		curr.vel = positions[0].vel;
	}
};
self.updateSound = function () {
	if (this.player.isInFocus()) {
		const sound = this.scene.sound;
		sound.play("blob_sound", 0.4);
	}
};
self.stopSounds = function () {
	const sound = this.scene.sound;
	sound.stop("blob_sound");
};
self.updateCameraFocalPoint = function () {};
self.control = function () {
	// Let trapId;
	const vec3 = this.player.getGamepad();
	const result = vec3.isButtonDown("up");
	const brake = vec3.isButtonDown("down");
	const left = vec3.isButtonDown("left");
	const anchor = vec3.isButtonDown("right");
	const e = vec3.isButtonDown("z");
	const onCompleteBindings = this.masses;
	const attempts = this.springs;
	const len = onCompleteBindings.length;
	const attemptsLength = attempts.length;
	let dir = this.dir;
	dir = anchor ? 1 : -1;
	let prevOffset = anchor || left ? 1 : 0;
	if (brake) {
		prevOffset = 0;
	}
	let i = len - 1;
	for (; i >= 0; i--) {
		onCompleteBindings[i].motor +=
			(prevOffset * dir * 1 - onCompleteBindings[i].motor) / 10;
		if (prevOffset == 0) {
			onCompleteBindings[i].motor = 0;
		}
		onCompleteBindings[i].brake = brake;
	}
	let angle = left ? 1 : 0;
	if (
		((angle += anchor ? -1 : 0),
		attempts[4].rotate(angle / 9),
		attempts[5].rotate(angle / 9),
		e || result)
	) {
		let trapId = attemptsLength - 1;
		for (; trapId >= 0; trapId--) {
			attempts[trapId].contract(30, 10);
		}
	} else {
		let trapId = attemptsLength - 1;
		for (; trapId >= 0; trapId--) {
			attempts[trapId].contract(0, 1.5);
		}
	}
};
self.draw = function () {
	if (this.explosion) {
		this.explosion.draw(1);
	} else {
		const context = this.scene.game.canvas.getContext("2d");
		const curPosAndNor = this.masses;
		const s = this.scene;
		const zoom = s.camera.zoom;
		const r = curPosAndNor[0].pos.toScreen(s);
		const p2 = curPosAndNor[1].pos.toScreen(s);
		const line = curPosAndNor[2].pos.toScreen(s);
		const center = curPosAndNor[3].pos.toScreen(s);
		context.globalAlpha = this.player._opacity;
		context.beginPath();
		context.strokeStyle = "#000000";
		context.fillStyle = "#000000";
		context.lineWidth = 20 * zoom;
		context.lineCap = "round";
		context.moveTo(r.x, r.y);
		context.lineTo(p2.x, p2.y);
		context.lineTo(line.x, line.y);
		context.lineTo(center.x, center.y);
		context.lineTo(r.x, r.y);
		context.fill();
		context.stroke();
		context.globalAlpha = 1;
	}
};

export default Blob;
