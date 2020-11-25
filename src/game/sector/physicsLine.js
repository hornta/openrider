import Vector2 from "../math/vector2";

class PhysicsLine {
	constructor(value, data, options, name) {
		const u = new Vector2(value, data);
		const t = new Vector2(options, name);
		const b = t.subtract(u);
		this.p1 = u;
		this.p2 = t;
		this.pp = b;
		this.len = b.length();
		this.sectors = [];
		this.collided = false;
		this.remove = false;
		this.highlight = false;
		this.recorded = false;
	}

	getCode(e) {
		this.recorded = true;
		const p = this.p2;
		let msg = ` ${p.x.toString(32)} ${p.y.toString(32)}`;
		const x = this.checkForConnectedLine(e, p);
		if (x) {
			msg += x.getCode(e);
		}
		return msg;
	}

	checkForConnectedLine(c, e) {
		const h = c.settings.physicsSectorSize;
		const HuffTab = c.sectors.physicsSectors;
		const i = Math.floor(e.x / h);
		const j = Math.floor(e.y / h);
		return HuffTab[i][j].searchForLine("physicsLines", e);
	}

	addSectorReference(t) {
		this.sectors.push(t);
	}

	removeAllReferences() {
		this.remove = true;
		const objects = this.sectors;
		const l = objects.length;
		let i = 0;
		for (; l > i; i++) {
			objects[i].drawn = false;
			objects[i].dirty = true;
		}
		this.sectors = [];
	}

	erase(s, start) {
		let instance = false;
		if (!this.remove) {
			const p1 = this.p1;
			const p2 = this.p2;
			const d = s;
			const tca = start;
			const u = p2.subtract(p1);
			const v1 = p1.subtract(d);
			const a = u.dot(u);
			const roundDistance = 2 * v1.dot(u);
			const sampleWidth = v1.dot(v1) - tca * tca;
			let e = roundDistance * roundDistance - 4 * a * sampleWidth;
			if (e > 0) {
				e = Math.sqrt(e);
				const f = (-roundDistance - e) / (2 * a);
				const v = (-roundDistance + e) / (2 * a);
				if (f >= 0 && f <= 1) {
					instance = true;
					this.removeAllReferences();
				}
				if (v >= 0 && v <= 1) {
					instance = true;
					this.removeAllReferences();
				}
			}
			if (this.intersects(this.p1.x, this.p1.y, s.x, s.y, start)) {
				instance = true;
				this.removeAllReferences();
			} else if (this.intersects(this.p2.x, this.p2.y, s.x, s.y, start)) {
				instance = true;
				this.removeAllReferences();
			}
		}
		return instance;
	}

	intersects(height, top, width, y, left) {
		const lightI = height - width;
		const lightJ = top - y;
		return left * left >= lightI * lightI + lightJ * lightJ;
	}

	collide(obj) {
		if (!this.collided) {
			this.collided = true;
			const pos = obj.position;
			const scale = obj.velocity;
			const h = obj.radius;
			let x = 0;
			let y = 0;
			let w = 0;
			const p1 = this.p1;
			const p2 = this.p2;
			const width = pos.x - p1.x;
			const height = pos.y - p1.y;
			const me = this.pp;
			const n = this.len;
			const value = (width * me.x + height * me.y) / n / n;
			if (value >= 0 && value <= 1) {
				const z =
					(width * me.y - height * me.x) *
						((width - scale.x) * me.y - (height - scale.y) * me.x) <
					0
						? -1
						: 1;
				x = width - me.x * value;
				y = height - me.y * value;
				if (
					((w = Math.sqrt(x ** 2 + y ** 2)), w === 0 && (w = 1), h > w || z < 0)
				) {
					const ratio = (h * z - w) / w;
					pos.x += x * ratio;
					pos.y += y * ratio;
					obj.drive(-y / w, x / w);
					return;
				}
			}
			if (!(-h > value * n || value * n > n + h)) {
				const p = value > 0 ? p2 : p1;
				if (
					((x = pos.x - p.x),
					(y = pos.y - p.y),
					(w = Math.sqrt(x ** 2 + y ** 2)),
					w === 0 && (w = 1),
					h > w)
				) {
					const ratio = (h - w) / w;

					pos.x += x * ratio;
					pos.y += y * ratio;
					obj.drive(-y / w, x / w);
				}
			}
		}
	}
}

export default PhysicsLine;
