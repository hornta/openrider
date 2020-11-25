import Mass from "./mass";
import Vector2 from "../math/vector2";

class Canopy extends Mass {
	constructor(name, target, id) {
		super(new Vector2(name, target), id);
		this.radius = 10;
		this.collide = true;
		this.wind = true;
	}

	drive(uv1u, uv1v) {
		const pos = this.position;
		const xhair = this.velocity;
		pos.x += 0.05 * uv1u * -uv1u * (uv1u * xhair.x + uv1v * xhair.y);
		this.contact = true;
	}

	update() {
		const outerPos = this.velocity;
		const position = this.position;
		const sprite = this.prevPosition;
		const pt = this.parent.gravity;
		const editor = this.parent.gamepad;
		const result = editor.isButtonDown("up");
		const leftExp = editor.isButtonDown("left");
		const isRightArray = editor.isButtonDown("right");
		if (pt.x !== 0 || pt.y !== 0) {
			outerPos.x *= 0.9;
			outerPos.y *= 0.99;
		}
		if (leftExp) {
			position.x += -0.05;
		}
		if (isRightArray) {
			position.x += 0.05;
		}
		if (pt.x !== 0 || pt.y !== 0) {
			position.y += -0.1;
		}
		if (result) {
			position.y += -0.5;
		}
		if (this.wind) {
			position.x += 0.3;
		}
		position.x += outerPos.x;
		position.y += outerPos.y;
		if (this.collide) {
			this.scene.track.collide(this);
		}
		if (pt.x !== 0 || pt.y !== 0) {
			outerPos.x = position.x - sprite.x;
			outerPos.y = position.y - sprite.y;
		}
		sprite.x = position.x;
		sprite.y = position.y;
	}

	draw(context) {
		const res = this.parent.scene;
		const obj = this.position.toScreen(res);
		const radius = this.radius * res.camera.zoom;
		context.beginPath();
		context.fillStyle = "#000000";
		context.arc(obj.x, obj.y, radius, 0, 2 * Math.PI, false);
		context.closePath();
		context.fill();
	}
}

export default Canopy;
