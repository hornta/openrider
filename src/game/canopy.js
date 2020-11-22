import { use60 } from "./gameSettings";
import Mass from "./mass";
import Vector2 from "./math/vector2";

function Canopy(name, target, id) {
	this.init(new Vector2(name, target), id);
	this.radius = 10;
	this.collide = true;
	this.wind = true;
}
Canopy.prototype = Object.create(Mass.prototype);
Canopy.prototype.drive = function (uv1u, uv1v) {
	const pos = this.position;
	const xhair = this.velocity;
	pos.x += 0.05 * uv1u * -uv1u * (uv1u * xhair.x + uv1v * xhair.y);
	this.contact = true;
};
Canopy.prototype.update = function () {
	const outerPos = this.velocity;
	const position = this.position;
	const sprite = this.prevPosition;
	const pt = this.parent.gravity;
	const editor = this.parent.gamepad;
	const result = editor.isButtonDown("up");
	const leftExp = editor.isButtonDown("left");
	const isRightArray = editor.isButtonDown("right");
	if (pt.x !== 0 || pt.y !== 0) {
		outerPos.x *= use60 ? 0.912966 : 0.9;
		outerPos.y *= use60 ? 0.994987 : 0.99;
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
	// Contact = false; TODO: investigate
	if (this.collide) {
		this.scene.track.collide(this);
	}
	if (pt.x !== 0 || pt.y !== 0) {
		outerPos.x = position.x - sprite.x;
		outerPos.y = position.y - sprite.y;
	}
	sprite.x = position.x;
	sprite.y = position.y;
};
Canopy.prototype.draw = function (context) {
	const res = this.parent.scene;
	const obj = this.position.toScreen(res);
	const radius = this.radius * res.camera.zoom;
	context.beginPath();
	context.fillStyle = "#000000";
	context.arc(obj.x, obj.y, radius, 0, 2 * Math.PI, false);
	context.closePath();
	context.fill();
};

export default Canopy;
