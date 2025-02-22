import Tool from "./tool";
import Vector2 from "../math/vector2";
import _ from "lodash";

class EraserTool extends Tool {
	constructor(data) {
		super(data);

		this.name = "Eraser";
		const options = data.scene.settings.eraser;
		this.options = options;
		this.eraserPoint = new Vector2();
		this.erasedObjects = [];
	}

	reset() {
		this.recordActionsToToolhandler();
	}

	press() {
		this.recordActionsToToolhandler();
	}

	recordActionsToToolhandler() {
		if (this.erasedObjects.length > 0) {
			this.toolhandler.addActionToTimeline({
				type: "remove",
				objects: _.flatten(this.erasedObjects),
			});
		}
		this.erasedObjects = [];
	}

	release() {
		this.recordActionsToToolhandler();
	}

	hold() {
		const target = this.mouse.touch;
		const p1 = target.position;
		const obj = this.scene.track;
		const arc = this.scene.screen;
		const camera = this.scene.camera;
		const circle = arc.center;
		const position = camera.position;
		const r = (p1.x - circle.x) / camera.zoom + position.x;
		const y = (p1.y - circle.y) / camera.zoom + position.y;
		this.eraserPoint.x = Math.round(r);
		this.eraserPoint.y = Math.round(y);
		const c = obj.erase(
			this.eraserPoint,
			this.options.radius / this.scene.camera.zoom,
			this.options.types
		);
		if (c.length > 0) {
			this.erasedObjects.push(c);
		}
	}

	draw() {
		const scene = this.scene;
		const newOperators =
			(scene.game.canvas, scene.game.canvas.getContext("2d"));
		this.drawEraser(newOperators);
	}

	drawEraser(ctx) {
		const node = this.mouse.touch;
		const c = node.position;
		ctx.beginPath();
		ctx.arc(c.x, c.y, this.options.radius, 0, 2 * Math.PI, false);
		ctx.lineWidth = 1;
		ctx.fillStyle = "rgba(255,255,255,0.8)";
		ctx.fill();
		ctx.strokeStyle = "#000000";
		ctx.stroke();
	}

	setOption(key, value) {
		this.options[key] = value;
	}

	getOptions() {
		return this.options;
	}

	update() {
		const aggregator = this.toolhandler.gamepad;
		const mouse = this.mouse;
		if (aggregator.isButtonDown("shift") && mouse.mousewheel !== false) {
			this.adjustRadius(mouse.mousewheel);
		}
		super.update();
	}

	adjustRadius(p) {
		let returnValue = this.options.radius;
		const x = this.options.radiusSizeSensitivity;
		const instance = this.options.maxRadius;
		const subDirectoryReturnValue = this.options.minRadius;
		const superior = p > 0 ? x : -x;
		returnValue = returnValue + superior;
		if (subDirectoryReturnValue > returnValue) {
			returnValue = subDirectoryReturnValue;
		} else if (returnValue > instance) {
			returnValue = instance;
		}
		this.setOption("radius", returnValue);
	}
}

export default EraserTool;
