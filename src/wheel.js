import Mass from "./mass";

class Wheel extends Mass {
	constructor(element, id) {
		super(element, id);
		this.motor = 0;
		this.brake = false;
		this.angle = 0;
		this.speed = 0;
		this.rotationSpeed = 0;
	}

	drive(amount, size) {
		const { position } = this;
		const width = this.motor * this.parent.dir;
		const x = width * amount;
		const yOffset = width * size;
		position.x += x;
		position.y += yOffset;
		if (this.brake) {
			const scale = 0.3 * -(amount * this.velocity.x + size * this.velocity.y);
			const count = amount * scale;
			const lineHeight = size * scale;
			position.x += count;
			position.y += lineHeight;
		}
		this.speed =
			(amount * this.velocity.x + size * this.velocity.y) / this.radius;
		this.rotationSpeed = this.speed;
		this.angle += this.speed;
		this.contact = true;
	}

	update() {
		const rect = this.parent.gravity;
		const { position } = this;
		const offset = this.velocity;
		offset.x += rect.x;
		offset.y += rect.y;
		if (rect.x != 0 || rect.y != 0) {
			offset.x *= 0.99;
			offset.y *= 0.99;
		}
		position.x += offset.x;
		position.y += offset.y;
		this.contact = false;
		if (this.collide) {
			this.scene.track.collide(this);
		}
		offset.x = position.x - this.prevPosition.x;
		offset.y = position.y - this.prevPosition.y;
		this.prevPosition.equ(this.position);
		this.rotationSpeed *= 0.999;
	}
}

export default Wheel;
