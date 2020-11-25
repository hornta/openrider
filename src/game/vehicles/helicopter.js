import Mass from "./mass";
import Prop from "./prop";
import Spring from "./spring";
import Vector2 from "../math/vector2";
import Vehicle from "./vehicle";
import inventoryManager from "../inventoryManager";

class Helicopter extends Vehicle {
	constructor(a, e, i) {
		super(a);
		this.vehicleName = "Helicopter";
		this.masses = null;
		this.springs = null;
		this.slow = false;
		this.swapped = false;

		this.createMasses(e);
		this.createSprings();
		this.createCockpit();
		this.stopSounds();
		if (i === -1) {
			this.swap();
		}
	}

	createCockpit() {
		const textedCanvas = document.createElement("canvas");
		this.canvasCockpit = textedCanvas;
	}

	drawCockpit() {
		const imgDataCanvas = this.canvasCockpit;
		const points = this.masses;
		const s = this.scene;
		const scale = s.camera.zoom;
		const radius = points[0].radius * scale * 0.9;
		const w = 50 * scale;
		const h = 50 * scale;
		imgDataCanvas.width = w;
		imgDataCanvas.height = h;
		const x = 0;
		const r = 0;
		const centerLineWidth = Math.max(2 * scale, 1);
		const ctx = imgDataCanvas.getContext("2d");
		ctx.save();
		ctx.translate(w / 2, h / 2);
		ctx.scale(1.3, 1);
		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, 1.5 * Math.PI, false);
		ctx.lineTo(x, r);
		ctx.lineTo(x + radius, r);
		ctx.closePath();
		ctx.restore();
		ctx.fillStyle = "#000000";
		ctx.fill();
		ctx.lineWidth = centerLineWidth;
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.save();
		ctx.translate(w / 2, h / 2);
		ctx.scale(1.3, 1);
		ctx.beginPath();
		ctx.arc(x, r, radius, 0, 1.5 * Math.PI, true);
		ctx.restore();
		ctx.lineWidth = centerLineWidth;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}

	createMasses(b) {
		const obj = [];
		obj.push(new Prop(new Vector2(b.x + 0, b.y + 18), this));
		const service = new Mass(new Vector2(b.x + -17, b.y + 42), this);
		const r = new Mass(new Vector2(b.x + 17, b.y + 42), this);
		const field = new Mass(new Vector2(b.x + -40, b.y + 15), this);
		const h = new Mass(new Vector2(b.x + 40, b.y + 15), this);
		obj.push(service);
		obj.push(r);
		obj.push(field);
		obj.push(h);
		obj[0].radius = 18;
		obj[1].radius = 8;
		obj[2].radius = 8;
		obj[3].grav = false;
		obj[4].collide = false;
		obj[4].grav = obj[4].collide;
		obj[1].friction = 0.2;
		obj[2].friction = 0.2;
		this.head = obj[0];
		this.mass2 = obj[1];
		this.mass3 = obj[2];
		this.mass4 = obj[3];
		this.rotor = 0;
		this.rotor2 = 0;
		this.dir = 1;
		this.head.drive = () => {
			this.explode();
		};
		obj[3].drive = this.head.drive;
		this.focalPoint = obj[0];
		this.masses = obj;
	}

	createSprings() {
		const clr = this.masses;
		const pixels = [];
		pixels.push(new Spring(clr[0], clr[1], this));
		pixels.push(new Spring(clr[2], clr[0], this));
		pixels.push(new Spring(clr[2], clr[1], this));
		pixels.push(new Spring(clr[0], clr[3], this));
		pixels.push(new Spring(clr[1], clr[3], this));
		pixels.push(new Spring(clr[0], clr[4], this));
		pixels.push(new Spring(clr[2], clr[4], this));
		this.spring1 = pixels[0];
		this.spring2 = pixels[1];
		this.spring3 = pixels[2];
		this.spring4 = pixels[3];
		this.spring5 = pixels[4];
		this.spring6 = pixels[5];
		this.spring7 = pixels[6];
		pixels[4].lrest = 30;
		pixels[4].lrest = 30;
		pixels[4].lrest = 35;
		pixels[4].lrest = 35;
		pixels[4].lrest = 35;
		pixels[0].leff = pixels[4].lrest;
		pixels[1].leff = pixels[4].lrest;
		pixels[2].leff = pixels[4].lrest;
		pixels[4].leff = pixels[4].lrest;
		pixels[6].leff = pixels[4].lrest;

		for (const i in pixels) {
			pixels[i].dampConstant = 0.4;
		}
		for (const i in pixels) {
			pixels[i].springConstant = 0.5;
		}
		this.springs = pixels;
	}

	update() {
		if (
			(this.crashed === false && (this.updateSound(), this.control()),
			this.explosion)
		) {
			this.explosion.update();
		} else {
			const springs = this.springs;
			const numClasses = springs.length;
			let i = numClasses - 1;
			for (; i >= 0; i--) {
				springs[i].update();
			}
			const _volumes = this.masses;
			const len = _volumes.length;
			let j = len - 1;
			for (; j >= 0; j--) {
				_volumes[j].update();
			}
			if (
				((this.masses[1].contact || this.masses[2].contact) &&
					(this.slow = false),
				this.slow === false)
			) {
				if (this.crashed === false) {
					this.control();
				}
				i = numClasses - 1;
				for (; i >= 0; i--) {
					springs[i].update();
				}
				j = len - 1;
				for (; j >= 0; j--) {
					_volumes[j].update();
				}
			}
			this.updateCockpitAngle();
		}
	}

	updateSound() {
		if (this.player.isInFocus()) {
			const sound = this.scene.sound;
			const fn = Math.min(this.head.motor, 1);
			sound.play("helicopter", fn);
		}
	}

	stopSounds() {
		const sound = this.scene.sound;
		sound.stop("helicopter");
	}

	swap() {
		let dir = this.dir;
		const springs = this.springs;
		const d = this.masses;
		dir *= -1;
		springs[2].swap();
		const target = new Vector2(0, 0);
		const r = new Vector2(0, 0);
		const v = new Vector2(0, 0);
		target.equ(d[3].position);
		r.equ(d[3].prevPosition);
		v.equ(d[3].velocity);
		d[3].position.equ(d[4].position);
		d[3].prevPosition.equ(d[4].prevPosition);
		d[3].velocity.equ(d[4].velocity);
		d[4].position.equ(target);
		d[4].prevPosition.equ(r);
		d[4].velocity.equ(v);
		this.dir = dir;
	}

	control() {
		const assert = this.player.getGamepad();
		const result = assert.isButtonDown("up");
		const i = (assert.isButtonDown("down"), assert.isButtonDown("back"));
		const left = assert.isButtonDown("left");
		const isRightArray = assert.isButtonDown("right");
		const flagZ = assert.isButtonDown("z");
		const list = this.masses;
		const pos = this.springs;
		if (flagZ && !this.swapped) {
			this.swap();
			this.swapped = true;
		}
		if (!flagZ) {
			this.swapped = false;
		}
		let b = Vector2.add(list[1].position, list[2].position).multiply(0.5);
		b = list[0].position.subtract(b);
		b = b.multiply(1 / b.length());
		list[0].angle.equ(b);
		const method = result ? 1 : 0;
		list[0].motor += (method - list[0].motor) / 10;
		let angle = left ? 1 : 0;
		angle += isRightArray ? -1 : 0;
		pos[2].rotate(angle / 6);
		if (i) {
			this.scene.restartTrack = true;
		}
	}

	updateCockpitAngle() {
		const t = this.masses;
		const pos = t[0].position;
		const xy = t[3].position;
		const p = pos.x;
		const offset = pos.y;
		const x = xy.x;
		const y = xy.y;
		const a = p - x;
		const ratio = offset - y;
		this.cockpitAngle = -(Math.atan2(a, ratio) - Math.PI / 2);
	}

	draw() {
		if (this.explosion) {
			this.explosion.draw(1);
		} else {
			const ctx = this.scene.game.canvas.getContext("2d");
			ctx.imageSmoothingEnabled = true;
			ctx.webkitImageSmoothingEnabled = true;
			ctx.mozImageSmoothingEnabled = true;
			ctx.globalAlpha = this.player._opacity;
			const shapes = this.masses;
			const y = this.dir;
			let argpp = this.rotor;
			let theta = this.rotor2;
			const s = this.scene;
			const scale = s.camera.zoom;
			let size = Vector2.add(shapes[1].position, shapes[2].position).multiply(
				0.5
			);
			size = shapes[0].position.subtract(size).multiply(scale);
			const slopeV = new Vector2(-size.y * y, size.x * y);
			const line = shapes[0].position.toScreen(s);
			argpp += 0.5 * shapes[0].motor + 0.05;
			if (argpp > 6.2831) {
				argpp -= 6.2831;
			}
			theta += 0.5;
			if (theta > 6.2831) {
				theta -= 6.2831;
			}
			this.rotor = argpp;
			this.rotor2 = theta;
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 5 * scale;
			ctx.beginPath();
			ctx.moveTo(line.x + 0.5 * size.x, line.y + 0.5 * size.y);
			ctx.lineTo(line.x + 0.8 * size.x, line.y + 0.8 * size.y);
			ctx.stroke();
			ctx.lineWidth = 3 * scale;
			ctx.beginPath();
			const aMag = 0.9 * Math.cos(argpp);
			ctx.moveTo(
				line.x + 0.9 * size.x + slopeV.x * aMag,
				line.y + 0.8 * size.y + slopeV.y * aMag
			);
			ctx.lineTo(
				line.x + 0.9 * size.x - slopeV.x * aMag,
				line.y + 0.8 * size.y - slopeV.y * aMag
			);
			ctx.stroke();
			const parse = shapes[1].position.toScreen(s);
			const r = shapes[2].position.toScreen(s);
			ctx.lineWidth = 4 * scale;
			ctx.stokeStyle = "#666666";
			ctx.beginPath();
			ctx.moveTo(
				parse.x - 0.2 * slopeV.x - 0.1 * size.x,
				parse.y - 0.2 * slopeV.y - 0.1 * size.y
			);
			ctx.lineTo(parse.x - 0.25 * size.x, parse.y - 0.25 * size.y);
			ctx.lineTo(r.x - 0.25 * size.x, r.y - 0.25 * size.y);
			ctx.lineTo(
				r.x + 0.2 * slopeV.x - 0.1 * size.x,
				r.y + 0.2 * slopeV.y - 0.1 * size.y
			);
			ctx.stroke();
			ctx.lineWidth = 3 * scale;
			ctx.beginPath();
			ctx.moveTo(parse.x - 0.2 * size.x, parse.y - 0.2 * size.y);
			ctx.lineTo(line.x, line.y);
			ctx.lineTo(r.x - 0.2 * size.x, r.y - 0.2 * size.y);
			ctx.stroke();
			ctx.lineWidth = 6 * scale;
			ctx.stokeStyle = "#000000";
			ctx.beginPath();
			const data = shapes[3].position.toScreen(s);
			ctx.moveTo(line.x, line.y);
			ctx.lineTo(data.x, data.y);
			ctx.lineTo(line.x - 0.1 * size.x, line.y - 0.3 * size.y);
			ctx.stroke();
			ctx.lineWidth = 2 * scale;
			ctx.stokeStyle = "#000000";
			ctx.beginPath();
			const v = 7 * scale;
			const e = new Vector2(v * Math.sin(-theta), v * Math.cos(-theta));
			ctx.moveTo(data.x + e.x, data.y + e.y);
			ctx.lineTo(data.x - e.x, data.y - e.y);
			ctx.moveTo(data.x - e.y, data.y + e.x);
			ctx.lineTo(data.x + e.y, data.y - e.x);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = 2 * scale;
			ctx.arc(data.x, data.y, shapes[3].radius * scale, 0, 2 * Math.PI, false);
			ctx.stroke();

			this.drawCockpit();
			const gradientImage = this.canvasCockpit;
			const w = gradientImage.width;
			const h = gradientImage.height;
			const x = line.x + 5 * scale * this.dir;
			const height = line.y + 2 * scale;
			const i = 0;
			const wh = 0;
			const width = w;
			const oh = h;
			const imageOffsetX = i * scale - width / 2;
			const imageOffsetY = wh * scale - oh / 2;
			const rotation = this.cockpitAngle;
			const isVertical = y === -1;
			const to = this.cosmetics;
			const context = inventoryManager.getItem(to.head);
			const callback = this.cockpitAngle;
			context.draw(
				ctx,
				x + 5 * scale * y,
				height - 5 * scale,
				callback,
				0.7 * scale,
				y
			);
			ctx.translate(x, height);
			ctx.rotate(rotation);
			if (isVertical) {
				ctx.scale(1, -1);
			}
			ctx.drawImage(gradientImage, imageOffsetX, imageOffsetY, width, oh);
			if (isVertical) {
				ctx.scale(1, -1);
			}
			ctx.rotate(-rotation);
			ctx.translate(-x, -height);
			ctx.globalAlpha = 1;
		}
	}
}

export default Helicopter;
