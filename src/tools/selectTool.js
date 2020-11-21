import Path from "../path";
import PhysicsLine from "../physicsLine";
import SceneryLine from "../sceneryLine";
import Tool from "./tool";
import Vector2 from "../math/vector2";

const SelectTool = function (obj) {
	this.toolInit(obj);
	this.p1 = new Vector2(0, 0);
	this.p2 = new Vector2(0, 0);
	this.selectedElements = [];
	this.dashOffset = 0;
};
SelectTool.prototype = new Tool();
const self = SelectTool.prototype;
self.toolInit = self.init;
self.name = "Select";
self.passive = false;
self.active = false;
self.p1 = null;
self.p2 = null;
self.selectedElements = [];
self.dashOffset = 0;
self.selectedSectors = [];
self.press = function () {
	const b = this.mouse.touch.real;
	this.passive = false;
	this.active = true;
	this.p1.x = b.x;
	this.p1.y = b.y;
	this.p2.x = b.x;
	this.p2.y = b.y;
};
self.hold = function () {
	const b = this.mouse.touch.real;
	this.p2.x = b.x;
	this.p2.y = b.y;
};
self.unselectElements = function () {
	const manifest = this.selectedElements;
	const l = manifest.length;
	let i = 0;
	for (; l > i; i++) {
		const view = manifest[i];
		if (view instanceof PhysicsLine) {
			view.highlightLine(false);
		}
		if (view instanceof SceneryLine) {
			view.highlightLine(false);
		}
	}
};
self.release = function () {
	this.unselectElements();
	const pathSizes =
		(performance.now(), this.scene.track.select(this.p1, this.p2));
	const pathCount = pathSizes.length;
	const colorDist = [];
	let pathId = 0;
	for (; pathCount > pathId; pathId++) {
		const n = pathSizes[pathId];
		if (this.intersectsLine(n.p1, n.p2)) {
			n.removeAllReferences();
			colorDist.push(n);
		}
	}
	this.selectedElements = colorDist;
	this.active = false;
	this.passive = true;
};
self.buildPaths = function (item) {
	const _posPoints = [];
	for (; item.length > 0; ) {
		const o = new Path();
		o.build(item);
		_posPoints.push(o);
	}
};
self.intersectsLine = function (start, end) {
	const h = Math.min(this.p1.y, this.p2.y);
	const minX = Math.min(this.p1.x, this.p2.x);
	const v = Math.max(this.p1.y, this.p2.y);
	const maxX = Math.max(this.p1.x, this.p2.x);
	const r = Math.abs(maxX - minX);
	const g = Math.abs(h - v);
	let i = start.x;
	let x = end.x;
	if (
		(start.x > end.x && ((i = end.x), (x = start.x)),
		x > minX + r && (x = minX + r),
		minX > i && (i = minX),
		i > x)
	) {
		return false;
	}
	let ch = start.y;
	let a = end.y;
	const factor = end.x - start.x;
	if (Math.abs(factor) > 1e-7) {
		const m = (end.y - start.y) / factor;
		const b = start.y - m * start.x;
		ch = m * i + b;
		a = m * x + b;
	}
	if (ch > a) {
		const s = a;
		a = ch;
		ch = s;
	}
	if (a > h + g) {
		a = h + g;
	}
	if (h > ch) {
		ch = h;
	}
	return !(ch > a);
};
self.toScreen = function (width, i) {
	const camera = this.scene.camera;
	const screen = this.scene.screen;
	return (width - camera.position[i]) * camera.zoom + screen.center[i];
};
self.draw = function () {
	const scene = this.scene;
	const ctx = (scene.game.canvas, scene.game.canvas.getContext("2d"));
	if ((this.drawText(ctx), this.active || this.passive)) {
		const p = this.p1.toScreen(this.scene);
		const drop = this.p2.toScreen(this.scene);
		const width = drop.x - p.x;
		const height = drop.y - p.y;
		ctx.save();
		if (ctx.setLineDash) {
			ctx.setLineDash([6]);
			ctx.lineDashOffset = this.dashOffset;
		}
		if (this.active) {
			ctx.beginPath();
			ctx.rect(p.x, p.y, width, height);
			ctx.fillStyle = "rgba(24, 132, 207, 0.3)";
			ctx.fill();
			ctx.lineWidth = 2;
			ctx.strokeStyle = "rgba(24, 132, 207, 0.7)";
			ctx.stroke();
		} else if (this.passive) {
			ctx.strokeStyle = "rgba(24, 132, 207, 0.7)";
			ctx.lineWidth = 2;
			ctx.strokeRect(p.x, p.y, width, height);
		}
		ctx.restore();
		if (this.dashOffset > 22) {
			this.dashOffset = 0;
		}
		this.dashOffset++;
	}
};
self.reset = function () {
	this.p1.x = 0;
	this.p1.y = 0;
	this.p2.x = 0;
	this.p2.y = 0;
	this.active = false;
	this.passive = false;
	this.unselectElements();
};
self.drawSectors = function () {
	const scene = this.scene;
	const camera = scene.camera;
	const canvas = scene.screen;
	const context = scene.game.canvas.getContext("2d");
	const zoom = camera.zoom;
	const position = camera.position;
	const currentCenter = scene.screen.center;
	const scale = this.settings.drawSectorSize * zoom;
	const y = (position.x * zoom) / scale;
	const minValue = (position.y * zoom) / scale;
	let i = canvas.width / scale;
	const translateX = canvas.height / scale;
	const baseName = translateX / 2;
	const offset = i / 2;
	const scaledMargin = y - offset - 1;
	const initialValue = minValue - baseName - 1;
	const j = y + offset;
	const middlePathName = minValue + baseName;
	const a = this.totalSectors;
	const x = a.length;
	let key = 0;
	for (; x > key; key++) {
		const me = a[key];
		const maxValue = me.row;
		i = me.column;
		if (
			i >= scaledMargin &&
			j >= i &&
			maxValue >= initialValue &&
			middlePathName >= maxValue
		) {
			if (me.drawn === false && me.image === false) {
				me.draw();
			}
			let placex = i * scale - y * scale + currentCenter.x;
			let textureY = maxValue * scale - minValue * scale + currentCenter.y;
			placex = 0 | placex;
			textureY = 0 | textureY;
			if (me.image) {
				context.drawImage(me.image, placex, textureY);
			} else {
				context.drawImage(me.canvas, placex, textureY);
			}
		} else if (me.drawn) {
			me.clear();
		}
	}
};
self.drawText = function (ctx) {
	const name = this.name;
	const dpr = this.game.pixelRatio;
	ctx.save();
	ctx.fillStyle = "#000000";
	ctx.font = `${12 * dpr}pt arial`;
	ctx.fillText(name, 10 * dpr, 20 * dpr);
	ctx.font = `${8 * dpr}pt arial`;
};
self.close = function () {
	this.dashOffset = 0;
	this.selectedElements = [];
	this.mouse = null;
	this.camera = null;
	this.scene = null;
	this.toolHandler = null;
	this.p2 = null;
	this.p1 = null;
	this.active = false;
	this.passive = false;
};

export default SelectTool;
