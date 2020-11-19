import Mass from "./mass";

// 86
function Wheel(element, id) {
	this.init(element, id);
	this.motor = 0;
	this.brake = false;
	this.angle = 0;
	this.speed = 0;
	this.rotationSpeed = 0;
}

Wheel.prototype = new Mass();
Wheel.prototype.motor = 0;
Wheel.prototype.brake = false;
Wheel.prototype.angle = 0;
Wheel.prototype.speed = 0;
Wheel.prototype.drive = function (amount, size) {
	const { pos } = this;
	const width = this.motor * this.parent.dir;
	const x = width * amount;
	const yOffset = width * size;
	if (((pos.x += x), (pos.y += yOffset), this.brake)) {
		const scale = 0.3 * -(amount * this.vel.x + size * this.vel.y);
		const count = amount * scale;
		const lineHeight = size * scale;
		pos.x += count;
		pos.y += lineHeight;
	}
	this.speed = (amount * this.vel.x + size * this.vel.y) / this.radius;
	this.rotationSpeed = this.speed;
	this.angle += this.speed;
	this.contact = true;
};
Wheel.prototype.massUpdate = Wheel.prototype.update;
Wheel.prototype.update = function () {
	const rect = this.parent.gravity;
	const { pos } = this;
	const elpos = this.old;
	const offset = this.vel;
	offset.x += rect.x;
	offset.y += rect.y;
	if (rect.x != 0 || rect.y != 0) {
		offset.x *= 0.99;
		offset.y *= 0.99;
	}
	pos.x += offset.x;
	pos.y += offset.y;
	this.contact = false;
	if (this.collide) {
		this.scene.track.collide(this);
	}
	offset.x = pos.x - elpos.x;
	offset.y = pos.y - elpos.y;
	this.old.equ(this.pos);
	this.rotationSpeed *= 0.999;
};

export default Wheel;
