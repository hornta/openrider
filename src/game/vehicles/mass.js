import Vector2 from "../math/vector2";

class Mass {
	constructor(target, node) {
		this.position = new Vector2();
		this.prevPosition = new Vector2();
		this.velocity = new Vector2(0, 0);
		this.drawPos = new Vector2(0, 0);
		this.radius = 10;
		this.friction = 0;
		this.parent = node;
		this.collide = true;
		this.contact = false;
		this.scene = node.scene;
		this.position.equ(target);
		this.prevPosition.equ(target);
	}

	drive(x, y) {
		const { friction } = this;
		const resolutionScale =
			-(x * this.velocity.x + y * this.velocity.y) * friction;
		x *= resolutionScale;
		y *= resolutionScale;
		this.position.x += Number(x);
		this.position.y += Number(y);
		this.contact = true;
	}

	update() {
		const velocity = this.velocity;
		const gravity = this.parent.gravity;
		velocity.x += Number(gravity.x);
		velocity.y += Number(gravity.y);
		if (gravity.x !== 0 || gravity.y !== 0) {
			velocity.x *= 0.99;
			velocity.y *= 0.99;
		}
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.contact = false;
		if (this.collide) {
			this.scene.track.collide(this);
		}
		velocity.x = this.position.x - this.prevPosition.x;
		velocity.y = this.position.y - this.prevPosition.y;
		this.prevPosition.equ(this.position);
	}

	draw() {
		const obj = this.position.toScreen(this.scene);
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
