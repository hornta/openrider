import Tool from "./tool";

class CameraTool extends Tool {
	constructor(a) {
		super(a);
		this.name = "Camera";
	}

	hold() {
		const e = this.mouse.touch;
		const start = e.position;
		const camera = this.camera;
		const i = e.old.position.subtract(start).multiply(1 / camera.zoom);
		camera.position.inc(i);
	}

	draw() {
		const scene = this.scene;
		scene.game.canvas.getContext("2d");
	}

	drawText(ctx) {
		const name = this.name;
		const dpr = this.game.pixelRatio;

		ctx.fillStyle = "#000000";
		ctx.font = `${12 * dpr}pt arial`;
		ctx.fillText(name, 10 * dpr, 20 * dpr);
		ctx.font = `${8 * dpr}pt arial`;
	}
}

export default CameraTool;
