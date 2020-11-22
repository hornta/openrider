import Tool from "./tool";
import Vector2 from "../math/vector2";
import curvedDivision from "../beizerToPolyLine";

class CurveTool extends Tool {
	constructor(value) {
		super(value);
		this.name = "Curve";
		this.anchoring = false;
		this.p1 = new Vector2(0, 0);
		this.p2 = new Vector2(0, 0);
		this.midpoint = new Vector2(0, 0);
		this.active = false;
		this.options = {};
	}

	getOptions() {
		const options = this.toolhandler;
		const o = this.options;
		return (
			(o.lineType = options.options.lineType),
			(o.snap = options.options.snap),
			o
		);
	}

	reset() {
		this.active = false;
		this.anchoring = false;
	}

	press() {
		if (!this.active) {
			this.active = true;
			const b = this.mouse.touch.real;
			this.p1.x = b.x;
			this.p1.y = b.y;
		}
	}

	hold() {
		const b = this.mouse.touch.real;
		this.p2.x = b.x;
		this.p2.y = b.y;
		const p1 = this.p1;
		const p2 = this.p2;
		this.midpoint.x = (p1.x + p2.x) / 2;
		this.midpoint.y = (p1.y + p2.y) / 2;
		this.toolhandler.moveCameraTowardsMouse();
	}

	release() {
		const p1 = this.p1;
		const p2 = this.p2;
		const p = this.midpoint;
		if (this.anchoring) {
			if (p.x === p2.x && p.y === p2.y) {
				const geometrizeRasterizerRasterizer = this.scene.track;
				let inFolder = false;
				inFolder =
					this.toolhandler.options.lineType === "physics"
						? geometrizeRasterizerRasterizer.addPhysicsLine(
								p1.x,
								p1.y,
								p2.x,
								p2.y
						  )
						: geometrizeRasterizerRasterizer.addSceneryLine(
								p1.x,
								p1.y,
								p2.x,
								p2.y
						  );
				if (inFolder) {
					this.toolhandler.addActionToTimeline({
						type: "add",
						objects: [inFolder],
					});
				}
				this.toolhandler.snapPoint.x = p2.x;
				this.toolhandler.snapPoint.y = p2.y;
			} else {
				this.splitAndAddCurve();
			}
			this.anchoring = false;
			this.active = false;
		} else {
			const base = p2.x - p1.x;
			const height = p2.y - p1.y;
			const sqrt8 = Math.sqrt(base ** 2 + height ** 2);
			if (sqrt8 > 0) {
				this.anchoring = true;
			} else {
				this.active = false;
			}
		}
	}

	updateAnchor() {
		const b = this.mouse.touch.real;
		this.midpoint.x = b.x;
		this.midpoint.y = b.y;
	}

	splitAndAddCurve() {
		performance.now();
		const result = curvedDivision(this.p1, this.midpoint, this.p2);
		const console = this.scene.track;
		const l = result.length;
		const serverIds = [];
		let i = 0;
		for (; l - 2 > i; i += 2) {
			const data = result[i];
			const taskTime = result[i + 1];
			const unit = result[i + 2];
			const c = result[i + 3];
			let key = false;
			key =
				this.toolhandler.options.lineType === "physics"
					? console.addPhysicsLine(data, taskTime, unit, c)
					: console.addSceneryLine(data, taskTime, unit, c);
			if (key) {
				serverIds.push(key);
			}
			this.toolhandler.snapPoint.x = unit;
			this.toolhandler.snapPoint.y = c;
		}
		if (serverIds.length > 0) {
			this.toolhandler.addActionToTimeline({
				type: "add",
				objects: serverIds,
			});
		}
	}

	update() {
		const node = this.mouse;
		const t = node.touch;
		const cur = node.secondaryTouch;
		const aggregator = this.toolhandler.gamepad;
		if (this.toolhandler.options.snap) {
			this.active = true;
			this.p1 = this.toolhandler.snapPoint;
			if (!this.anchoring) {
				this.hold();
			}
		}
		const button = this.toolhandler.options;
		let i = aggregator.isButtonDown("shift");
		if (button.rightClickMove) {
			i = cur.old.down;
		}
		if (i) {
			if (t.old.down || button.rightClickMove) {
				this.moveCamera();
			}
		} else {
			if (t.press && !this.anchoring) {
				this.press();
			}
			if (t.old.down && !this.anchoring) {
				this.hold();
			}
			if (t.release) {
				this.release();
			}
			if (this.anchoring) {
				this.updateAnchor();
			}
		}
		if (
			node.mousewheel !== false &&
			aggregator.isButtonDown("shift") === false
		) {
			this.mousewheel(node.mousewheel);
		}
	}

	draw() {
		const scene = this.scene;
		const node = (scene.game.canvas, scene.game.canvas.getContext("2d"));
		const camera = scene.camera;
		const zoom = camera.zoom;
		this.drawCursor(node, zoom);
		if (this.active) {
			this.drawLine(node, zoom);
			this.drawPoint(node, this.p1, zoom);
			this.drawPoint(node, this.p2, zoom);
		}
	}

	toScreen(width, i) {
		const camera = this.scene.camera;
		const screen = this.scene.screen;
		return (width - camera.position[i]) * camera.zoom + screen.center[i];
	}

	drawCursor(ctx, scale) {
		const obj = this.mouse.touch.real.toScreen(this.scene);
		const data = this.toolhandler;
		let r = data.options.grid;
		const parBgColor = "#1884cf";
		if (r) {
			r = 5 * scale;
			ctx.beginPath();
			ctx.moveTo(obj.x, obj.y - r);
			ctx.lineTo(obj.x, obj.y + r);
			ctx.moveTo(obj.x - r, obj.y);
			ctx.lineTo(obj.x + r, obj.y);
			ctx.lineWidth = Number(scale);
			ctx.stroke();
		} else {
			ctx.beginPath();
			ctx.arc(obj.x, obj.y, Number(scale), 0, 2 * Math.PI, false);
			ctx.lineWidth = 1;
			ctx.fillStyle = parBgColor;
			ctx.fill();
		}
	}

	drawPoint(ctx, text, size) {
		const obj = text.toScreen(this.scene);
		ctx.beginPath();
		ctx.arc(obj.x, obj.y, Number(size), 0, 2 * Math.PI, false);
		ctx.lineWidth = 1;
		ctx.fillStyle = "#1884cf";
		ctx.fill();
	}

	drawText(ctx) {
		const name = this.name;
		const dpr = this.game.pixelRatio;

		ctx.fillStyle = "#000000";
		ctx.font = `${12 * dpr}pt arial`;
		ctx.fillText(name, 10 * dpr, 20 * dpr);
		ctx.font = `${8 * dpr}pt arial`;
	}

	drawLine(ctx, type) {
		const scene = this.scene;
		const centerLineWidth =
			(scene.game.canvas, 2 * type > 0.5 ? 2 * type : 0.5);
		const options = this.toolhandler;
		const lineType = options.options.lineType;
		const color = lineType === "physics" ? "#000" : "#AAA";
		ctx.beginPath();
		ctx.lineWidth = centerLineWidth;
		ctx.lineCap = "round";
		ctx.strokeStyle = color;
		const obj = this.p1.toScreen(this.scene);
		const myEnd = this.p2.toScreen(this.scene);
		const cntrl = this.midpoint.toScreen(this.scene);
		ctx.moveTo(obj.x, obj.y);
		ctx.quadraticCurveTo(cntrl.x, cntrl.y, myEnd.x, myEnd.y);
		ctx.stroke();
	}
}

export default CurveTool;
