import Mass from "./mass";
import Vector2 from "./math/vector2";

function Prop(a, b) {
	this.init(a, b);
	this.motor = 0;
	this.angle = new Vector2(0, 0);
	this.radius = 10;
	this.speed = 0;
}

Prop.prototype = new Mass();
const o = Prop.prototype;
o.motor = 0;
o.angle = 0;
o.speed = 0;
o.update = function () {
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
};
export default Prop;
