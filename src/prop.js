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
		let args = this.vel;
		const zoom = this.angle;
		const pos = this.pos;
		const a = this.old;
		const zoomRatio = this.motor;
		args.y += 0;
		args.inc(zoom.factor(2 * zoomRatio));
		args = args.factor(0.99);
		pos.inc(args);
		this.contact = false;
		if (this.collide) {
			this.scene.track.collide(this);
		}
		this.vel = pos.sub(a);
		a.equ(pos);
	}
}

export default Prop;
