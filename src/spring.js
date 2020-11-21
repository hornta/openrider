import Vector2 from "./math/vector2";

class Spring {
	constructor(mass1, mass2, parent) {
		this.mass1 = mass1;
		this.mass2 = mass2;
		this.parent = parent;
		this.lrest = 40;
		this.leff = 40;
		this.dampConstant = 0.5;
		this.springConstant = 0.7;
	}

	swap() {
		const r = new Vector2();
		const self = this.mass1;
		const obj = this.mass2;
		r.equ(self.pos);
		self.pos.equ(obj.pos);
		obj.pos.equ(r);
		r.equ(self.old);
		self.old.equ(obj.old);
		obj.old.equ(r);
		r.equ(self.velocity);
		self.velocity.equ(obj.velocity);
		obj.velocity.equ(r);
		const { angle } = self;
		self.angle = obj.angle;
		obj.angle = angle;
	}

	update() {
		const attr = new Vector2(0, 0);
		const mass1 = this.mass1;
		const mass2 = this.mass2;
		const p = mass1.pos;
		const { pos } = mass2;
		const bounds = mass1.velocity;
		const rect = mass2.velocity;
		attr.x = pos.x - p.x;
		attr.y = pos.y - p.y;
		const sizeThreshold = attr.len();
		if (!(sizeThreshold < 1)) {
			const ratio = 1 / sizeThreshold;
			attr.x *= ratio;
			attr.y *= ratio;
			const _PTM_RATIO = (sizeThreshold - this.leff) * this.springConstant;
			const transform = {
				x: attr.x * _PTM_RATIO,
				y: attr.y * _PTM_RATIO,
			};
			const cos = rect.x - bounds.x;
			const sin = rect.y - bounds.y;
			const w = cos * attr.x + sin * attr.y;
			const radius = w * this.dampConstant;
			const tx = attr.x * radius;
			const ty = attr.y * radius;
			transform.x += tx;
			transform.y += ty;
			rect.x += -transform.x;
			rect.y += -transform.y;
			bounds.x += transform.x;
			bounds.y += transform.y;
		}
	}

	rotate(i) {
		const prevLevelVitorc = this.mass1;
		const owningPlayer = this.mass2;
		const newMax = owningPlayer.pos.x - prevLevelVitorc.pos.x;
		const n = owningPlayer.pos.y - prevLevelVitorc.pos.y;
		const rate = -n / this.leff;
		const m = newMax / this.leff;
		prevLevelVitorc.pos.x += rate * i;
		prevLevelVitorc.pos.y += m * i;
		owningPlayer.pos.x += rate * -i;
		owningPlayer.pos.y += m * -i;
	}

	contract(value, args) {
		this.leff += (this.lrest - value - this.leff) / args;
	}

	setMasses(formatters, customFormatters) {
		this.mass1 = formatters;
		this.mass2 = customFormatters;
	}
}

export default Spring;
