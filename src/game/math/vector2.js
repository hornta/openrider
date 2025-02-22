class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static add(v1, v2) {
		return new Vector2(v1.x + v2.x, v1.y + v2.y);
	}

	static add3(v1, v2, v3) {
		return new Vector2(v1.x + v2.x + v3.x, v1.y + v2.y + v3.y);
	}

	toReal(game) {
		const camera = game.camera;
		const screen = game.screen;
		const vertexCount =
			(this.x - screen.center.x) / camera.zoom + camera.position.x;
		const y = (this.y - screen.center.y) / camera.zoom + camera.position.y;
		return new Vector2(vertexCount, y);
	}

	toScreen(options) {
		const camera = options.camera;
		const screen = options.screen;
		const vertexCount =
			(this.x - camera.position.x) * camera.zoom + screen.center.x;
		const y = (this.y - camera.position.y) * camera.zoom + screen.center.y;
		return new Vector2(vertexCount, y);
	}

	lenSqr() {
		return this.x ** 2 + this.y ** 2;
	}

	length() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	dot(v) {
		return this.x * v.x + this.y * v.y;
	}

	multiply(s) {
		return new Vector2(this.x * s, this.y * s);
	}

	factorSelf(s) {
		this.x *= s;
		this.y *= s;
	}

	factorOut(scalar, dst) {
		dst.x = this.x * scalar;
		dst.y = this.y * scalar;
	}

	add(value) {
		return new Vector2(this.x + value.x, this.y + value.y);
	}

	inc(v) {
		this.x += v.x;
		this.y += v.y;
	}

	addOut(obj, source) {
		source.x = this.x + obj.x;
		source.y = this.y + obj.y;
	}

	subtract(b) {
		return new Vector2(this.x - b.x, this.y - b.y);
	}

	subOut(value, result) {
		result.x = this.x - value.x;
		result.y = this.y - value.y;
	}

	subSelf(a) {
		this.x -= a.x;
		this.y -= a.y;
	}

	equ(val) {
		this.x = val.x;
		this.y = val.y;
	}

	normalize() {
		const m = Math.sqrt(this.x ** 2 + this.y ** 2);
		return new Vector2(this.x / m, this.y / m);
	}

	getAngleInDegrees(towardsPos) {
		const current = towardsPos.subtract(this);
		const blockWidth = Math.atan2(current.x, -current.y);
		let entryX = blockWidth * (180 / Math.PI);
		if (entryX < 0) {
			entryX += 360;
		}
		return entryX;
	}
}

export default Vector2;
