import Vector2 from "./math/vector2";

class Mass {
	constructor(target, node) {
		this.pos = new Vector2();
		this.old = new Vector2();
		this.vel = new Vector2(0, 0);
		this.drawPos = new Vector2(0, 0);
		this.radius = 10;
		this.friction = 0;
		this.parent = node;
		this.collide = true;
		this.contact = false;
		this.scene = node.scene;
		this.pos.equ(target);
		this.old.equ(target);
	}

	drive(x, y) {
		const { friction } = this;
		const resolutionScale = -(x * this.vel.x + y * this.vel.y) * friction;
		x *= resolutionScale;
		y *= resolutionScale;
		this.pos.x += x;
		this.pos.y += y;
		this.contact = true;
	}

	update() {
		const args = this.vel;
		args.inc(this.parent.gravity);
		const pt = this.parent.gravity;
		if (pt.x != 0 || pt.y != 0) {
			args.x *= 0.99;
			args.y *= 0.99;
		}
		this.pos.inc(this.vel);
		this.contact = false;
		if (this.collide) {
			this.scene.track.collide(this);
		}
		args.x = this.pos.x - this.old.x;
		args.y = this.pos.y - this.old.y;
		this.old.equ(this.pos);
	}

	draw() {
		const obj = this.pos.toScreen(this.scene);
		const ctx = this.scene.game.canvas.getContext("2d");
		const SCALE = this.scene.camera.zoom;
		ctx.beginPath();
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.arc(obj.x, obj.y, this.radius * SCALE, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}
}

export default Mass;
