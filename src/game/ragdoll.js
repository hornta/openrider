import Mass from "./mass";
import Spring from "./spring";
import Vector2 from "./math/vector2";
import inventoryManager from "./inventoryManager";

class Ragdoll {
	constructor(val, data) {
		this.parent = data;
		const obj = [];
		const root = [];
		const error = new Vector2(0, 0);
		const c = new Mass(error, data);
		const a = new Mass(error, data);
		const x = new Mass(error, data);
		const img = new Mass(error, data);
		const self = new Mass(error, data);
		const result = new Mass(error, data);
		const key = new Mass(error, data);
		const b = new Mass(error, data);
		const value = new Mass(error, data);
		const f = new Mass(error, data);
		obj.push(c);
		obj.push(a);
		obj.push(x);
		obj.push(img);
		obj.push(self);
		obj.push(result);
		obj.push(key);
		obj.push(b);
		obj.push(value);
		obj.push(f);
		root.push(new Spring(c, a, this));
		root.push(new Spring(c, x, this));
		root.push(new Spring(x, self, this));
		root.push(new Spring(c, img, this));
		root.push(new Spring(img, result, this));
		root.push(new Spring(a, key, this));
		root.push(new Spring(key, value, this));
		root.push(new Spring(a, b, this));
		root.push(new Spring(b, f, this));
		for (const i in obj) {
			obj[i].radius = 3;
		}
		for (const i in obj) {
			obj[i].friction = 0.05;
		}
		a.radius = 8;
		c.radius = a.radius;
		for (const i in root) {
			root[i].springConstant = 0.4;
		}
		for (const i in root) {
			root[i].dampConstant = 0.7;
		}
		this.masses = obj;
		this.springs = root;
		this.head = c;
		this.waist = a;
		this.lElbow = x;
		this.rElbow = img;
		this.rHand = result;
		this.lHand = self;
		this.lKnee = key;
		this.rKnee = b;
		this.lFoot = value;
		this.rFoot = f;
		for (const i in val) {
			this[i].position.equ(val[i]);
		}
	}

	zero(v, a) {
		v = v.multiply(0.7);
		a = a.multiply(0.7);
		const newEventHandlers = this.springs;
		const teleports = this.masses;
		for (const i in newEventHandlers) {
			const r = newEventHandlers[i].mass2.position
				.subtract(newEventHandlers[i].mass1.position)
				.length();
			newEventHandlers[i].lrest = r;
			newEventHandlers[i].leff = r;
		}
		for (let i = 1; i <= 4; i++) {
			newEventHandlers[i].lrest = 13;
			newEventHandlers[i].leff = 13;
		}
		for (const i in newEventHandlers) {
			if (newEventHandlers[i].leff > 20) {
				newEventHandlers[i].lrest = 20;
				newEventHandlers[i].leff = 20;
			}
		}
		const gamestate = [
			this.head,
			this.lElbow,
			this.rElbow,
			this.lHand,
			this.rHand,
		];
		const d = [this.waist, this.lKnee, this.rKnee, this.lFoot, this.rFoot];
		for (const i in gamestate) {
			gamestate[i].prevPosition = gamestate[i].position.subtract(v);
		}
		for (const i in d) {
			d[i].prevPosition = d[i].position.subtract(a);
		}
		for (const i in teleports) {
			teleports[i].velocity.equ(
				teleports[i].position.subtract(teleports[i].prevPosition)
			);
			teleports[i].velocity.x += 1 * (Math.random() - Math.random());
			teleports[i].velocity.y += 1 * (Math.random() - Math.random());
		}
	}

	draw() {
		const node = this.head;
		const edge = this.waist;
		const precomps = this.lElbow;
		const subsynset = this.rElbow;
		const xCumPos = this.rHand;
		const healthBorderBtn = this.lHand;
		const settings = this.lKnee;
		const self = this.rKnee;
		const resultbm = this.lFoot;
		const body = this.rFoot;
		const data = this.parent.scene;
		const config = data.camera;
		const dpr = config.zoom;
		const ctx = data.game.canvas.getContext("2d");
		const f = (this.dir, this.parent.alpha);
		ctx.strokeStyle = `rgba(0,0,0,${f})`;
		ctx.lineWidth = 5 * dpr;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		const point = node.position.toScreen(data);
		ctx.beginPath();
		ctx.moveTo(point.x, point.y);
		const dest = precomps.position.toScreen(data);
		ctx.lineTo(dest.x, dest.y);
		const b = healthBorderBtn.position.toScreen(data);
		ctx.lineTo(b.x, b.y);
		ctx.stroke();
		ctx.strokeStyle = `rgba(0,0,0,${0.5 * f})`;
		ctx.beginPath();
		ctx.moveTo(point.x, point.y);
		const xMax2d = subsynset.position.toScreen(data);
		ctx.lineTo(xMax2d.x, xMax2d.y);
		const buttFrom = xCumPos.position.toScreen(data);
		ctx.lineTo(buttFrom.x, buttFrom.y);
		ctx.stroke();
		ctx.strokeStyle = `rgba(0,0,0,${f})`;
		ctx.lineWidth = 8 * dpr;
		ctx.beginPath();
		ctx.moveTo(point.x, point.y);
		const center = edge.position.toScreen(data);
		ctx.lineTo(center.x, center.y);
		ctx.stroke();
		ctx.lineWidth = 5 * dpr;
		ctx.beginPath();
		ctx.moveTo(center.x, center.y);
		const buttTo = settings.position.toScreen(data);
		ctx.lineTo(buttTo.x, buttTo.y);
		const item = resultbm.position.toScreen(data);
		ctx.lineTo(item.x, item.y);
		let opt = settings.position.subtract(edge.position).normalize();
		opt = Vector2.add(opt.multiply(4), resultbm.position);
		const to = opt.toScreen(data);
		ctx.lineTo(to.x, to.y);
		ctx.stroke();
		ctx.strokeStyle = `rgba(0,0,0,${0.5 * f})`;
		ctx.lineWidth = 5 * dpr;
		ctx.beginPath();
		ctx.moveTo(center.x, center.y);
		const ip = self.position.toScreen(data);
		ctx.lineTo(ip.x, ip.y);
		let options = self.position.subtract(edge.position).normalize();
		options = Vector2.add(options.multiply(4), body.position);
		const code = body.position.toScreen(data);
		ctx.lineTo(code.x, code.y);
		const p1 = options.toScreen(data);
		ctx.lineTo(p1.x, p1.y);
		ctx.stroke();
		point.inc(point.subtract(center).multiply(0.25));
		ctx.lineWidth = Number(dpr);
		ctx.strokeStyle = `rgba(0,0,0,${f})`;
		ctx.fillStyle = `rgba(255,255,255,${f})`;
		ctx.beginPath();
		ctx.arc(point.x, point.y, 5 * dpr, 0, 1.99999 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
		ctx.strokeStyle = `rgba(0,0,0,${f})`;
		ctx.lineWidth = 0.5 * dpr;
		ctx.beginPath();
		const obj = this.parent.cosmetics;
		const child = inventoryManager.getItem(obj.head);
		const callback = this.drawHeadAngle;
		child.draw(ctx, point.x, point.y, callback, dpr, this.dir, 1);
	}

	update() {
		let i = (this.springs, this.masses, this.springs.length - 1);
		for (; i >= 0; i--) {
			this.springs[i].update();
		}
		let type = this.masses.length - 1;
		for (; type >= 0; type--) {
			this.masses[type].update();
		}
		this.updateDrawHeadAngle();
	}

	updateDrawHeadAngle() {
		let s = "";
		let pos = "";
		if (this.dir < 0) {
			pos = this.head.position;
			s = this.waist.position;
		} else {
			s = this.head.position;
			pos = this.waist.position;
		}
		const p = s.x;
		const cy = s.y;
		const left = pos.x;
		const r = pos.y;
		const x = p - left;
		const y = cy - r;
		this.drawHeadAngle = -(Math.atan2(x, y) + Math.PI);
	}
}

export default Ragdoll;
