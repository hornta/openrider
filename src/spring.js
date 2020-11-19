import Vector2 from "./math/vector2";

const Spring = function (e, str, value) {
	this.m1 = e;
	this.m2 = str;
	this.parent = value;
	this.lrest = 40;
	this.leff = 40;
	this.dampConstant = 0.5;
	this.springConstant = 0.7;
};
Spring.prototype = {
	m1: null,
	m2: null,
	parent: null,
	lrest: 40,
	leff: 40,
	dampConstant: 0,
	springConstant: 0,
	swap() {
		const r = new Vector2();
		const self = this.m1;
		const obj = this.m2;
		r.equ(self.pos);
		self.pos.equ(obj.pos);
		obj.pos.equ(r);
		r.equ(self.old);
		self.old.equ(obj.old);
		obj.old.equ(r);
		r.equ(self.vel);
		self.vel.equ(obj.vel);
		obj.vel.equ(r);
		const { angle } = self;
		self.angle = obj.angle;
		obj.angle = angle;
	},
	update() {
		const attr = new Vector2(0, 0);
		const node = this.m1;
		const self = this.m2;
		const p = node.pos;
		const { pos } = self;
		const bounds = node.vel;
		const rect = self.vel;
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
	},
	rotate(i) {
		const prevLevelVitorc = this.m1;
		const owningPlayer = this.m2;
		const newMax = owningPlayer.pos.x - prevLevelVitorc.pos.x;
		const n = owningPlayer.pos.y - prevLevelVitorc.pos.y;
		const rate = -n / this.leff;
		const m = newMax / this.leff;
		prevLevelVitorc.pos.x += rate * i;
		prevLevelVitorc.pos.y += m * i;
		owningPlayer.pos.x += rate * -i;
		owningPlayer.pos.y += m * -i;
	},
	contract(value, args) {
		this.leff += (this.lrest - value - this.leff) / args;
	},
	setMasses(formatters, customFormatters) {
		this.m1 = formatters;
		this.m2 = customFormatters;
	},
};

export default Spring;
