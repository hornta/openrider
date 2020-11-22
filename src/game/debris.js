import Mass from "./mass";

const p = [1, 0.7, 0.8, 0.9, 0.5, 1, 0.7, 1];
class Debris extends Mass {
	constructor(obj, arg, data) {
		super(obj, arg);

		this.color = data;
		this.position.x = obj.x + 5 * (Math.random() - Math.random());
		this.position.y = obj.y + 5 * (Math.random() - Math.random());
		this.prevPosition.x = this.position.x;
		this.prevPosition.y = this.position.y;
		this.velocity.y = 11 * (Math.random() - Math.random());
		this.velocity.x = 11 * (Math.random() - Math.random());
		this.radius = 2 * Math.random() * 5;
		this.angle = 6.2 * Math.random();
		this.speed = Number(Math.random()) - Number(Math.random());
		this.friction = 0.05;
	}

	drive(x, y) {
		const intrinsicDim = this.velocity;
		const { position } = this;
		this.speed = (x * intrinsicDim.x + y * intrinsicDim.y) / this.radius;
		this.angle += this.speed;
		const speed = -(x * intrinsicDim.x + y * intrinsicDim.y) * this.friction;
		position.x += x * speed;
		position.y += y * speed;
		const scale = Math.sqrt(x ** 2 + y ** 2);
		if (scale > 0) {
			const width = -y / scale;
			const height = x / scale;
			const delta = 0.8 * (width * intrinsicDim.x + height * intrinsicDim.y);
			this.prevPosition.x += width * delta;
			this.prevPosition.y += height * delta;
		}
	}

	update() {
		this.angle += this.speed;
		super.update();
	}

	draw() {
		const point = this.scene.screen;
		const { camera } = this.scene;
		const x = point.realToScreen(this.position.x, "x");
		const y = point.realToScreen(this.position.y, "y");
		let minidx = 0;
		const { zoom } = camera;
		const { angle } = this;
		let r = p[0] * zoom * this.radius;
		let right = x + r * Math.cos(angle);
		let top = y + r * Math.sin(angle);
		const ctx = this.scene.game.canvas.getContext("2d");
		ctx.lineWidth = Number(zoom);
		ctx.strokeStyle = "#000000";
		ctx.beginPath();
		ctx.moveTo(right, top);
		ctx.fillStyle = this.color;
		for (; minidx++ < 8; ) {
			r = p[minidx - 1] * zoom * this.radius;
			right = x + r * Math.cos(angle + (6.283 * minidx) / 8);
			top = y + r * Math.sin(angle + (6.283 * minidx) / 8);
			ctx.lineTo(right, top);
		}
		ctx.fill();
		ctx.stroke();
	}
}

export default Debris;
