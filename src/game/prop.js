import { use60 } from "./gameSettings";
import Mass from "./mass";
import Vector2 from "./math/vector2";

class Prop extends Mass {
	constructor(a, b) {
		super(a, b);

		this.motor = 0;
		this.angle = new Vector2(0, 0);
		this.radius = 10;
		this.speed = 0;
	}

	update() {
		let args = this.velocity;
		const zoom = this.angle;
		const position = this.position;
		const a = this.prevPosition;
		const zoomRatio = this.motor;
		args.y += 0;
		args.inc(zoom.multiply(2 * zoomRatio));
		args = args.multiply(use60 ? 0.994987 : 0.99);
		position.inc(args);
		this.contact = false;
		if (this.collide) {
			this.scene.track.collide(this);
		}
		this.velocity = position.subtract(a);
		a.equ(position);
	}
}

export default Prop;
