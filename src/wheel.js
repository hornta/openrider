import { use60 } from "./gameSettings";
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
		position.x += x * (use60 ? 0.5 : 1);
		position.y += yOffset * (use60 ? 0.5 : 1);
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
		this.angle += this.speed * use60 ? 0.5 : 1;
		this.contact = true;
	}

	update() {
		const rect = this.parent.gravity;
		const { position } = this;
		const velocity = this.velocity;
		velocity.x += rect.x;
		velocity.y += rect.y;
		if (rect.x != 0 || rect.y != 0) {
			velocity.x *= use60 ? 0.994987 : 0.99;
			velocity.y *= use60 ? 0.994987 : 0.99;
		}
		position.x += velocity.x;
		position.y += velocity.y;
		this.contact = false;
		if (this.collide) {
			this.scene.track.collide(this);
		}
		velocity.x = position.x - this.prevPosition.x;
		velocity.y = position.y - this.prevPosition.y;
		this.prevPosition.equ(this.position);
		this.rotationSpeed *= use60 ? 0.9995 : 0.999;
	}
}

export default Wheel;
