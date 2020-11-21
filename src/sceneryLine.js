import Vector2 from "./math/vector2";

class SceneryLine {
	constructor(x1, y1, x2, y2) {
		this.collided = false;
		this.remove = false;
		this.recorded = false;
		this.p1 = new Vector2(x1, y1);
		this.p2 = new Vector2(x2, y2);
		this.pp = this.p2.subtract(this.p1);
		this.len = this.pp.length();
		this.sectors = [];
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

	// eslint-disable-next-line class-methods-use-this
	checkForConnectedLine(c, e) {
		const h = c.settings.drawSectorSize;
		const HuffTab = c.sectors.drawSectors;
		const i = Math.floor(e.x / h);
		const j = Math.floor(e.y / h);
		return HuffTab[i][j].searchForLine("sceneryLines", e);
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

	// eslint-disable-next-line class-methods-use-this
	intersects(height, top, width, y, left) {
		const lightI = height - width;
		const lightJ = top - y;
		return left * left >= lightI * lightI + lightJ * lightJ;
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
}

export default SceneryLine;
