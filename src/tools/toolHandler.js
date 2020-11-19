import PhysicsLine from "../physicsLine";
import SceneryLine from "../sceneryLine";
import Target from "../sector/powerups/target";
import Vector2 from "../math/vector2";

const maxSize = 50;
const ToolHandler = function (options) {
	this.currentTool = "";
	this.scene = options;
	this.camera = options.camera;
	this.mouse = options.mouse;
	this.mouse.updateCallback = this.draw.bind(this);
	this.gamepad = options.playerManager.firstPlayer.getGamepad();
	this.tools = {};
	this.options = options.settings.toolHandler;
	this.snapPoint = new Vector2();
	this.snapPoint.equ(this.scene.track.defaultLine.p2);
	this.gridCache = false;
	this.initAnalytics();
	this.actionTimeline = [];
	this.actionTimelinePointer = 0;
};
ToolHandler.prototype = {
	currentTool: "",
	scene: null,
	camera: null,
	mouse: null,
	tools: {},
	gamepad: null,
	gridCache: false,
	gridCacheAlpha: 1,
	gridUseEnabled: false,
	snapPoint: false,
	options: null,
	initAnalytics() {
		this.analytics = {
			actions: 0,
		};
	},
	enableGridUse() {
		this.gridUseEnabled = true;
	},
	getToolOptions() {
		return this.tools[this.currentTool].getOptions();
	},
	setToolOption(key, type, name) {
		if (typeof name != "undefined" && typeof this.tools[name] != "undefined") {
			this.tools[name].setOption(key, type);
		} else {
			this.tools[this.currentTool].setOption(key, type);
		}
		this.scene.stateChanged();
	},
	registerTool(Type) {
		const type = new Type(this);
		const name = type.name.toLowerCase();
		this.tools[name] = type;
	},
	setTool(name) {
		name = name.toLowerCase();
		if (this.currentTool !== name) {
			this.resetTool();
			this.currentTool = name;
			this.scene.stateChanged();
			this.analytics.actions++;
		}
	},
	addActionToTimeline(t) {
		if (this.actionTimeline.length >= maxSize) {
			this.actionTimeline.splice(0, this.actionTimeline.length - maxSize);
			this.actionTimelinePointer = maxSize;
		}
		this.actionTimeline.splice(this.actionTimelinePointer);
		this.actionTimeline.push(t);
		this.actionTimelinePointer++;
	},
	revertAction() {
		let t = this.actionTimelinePointer;
		if (t > 0) {
			const aggs = this.actionTimeline[t - 1];
			switch ((t--, aggs.type)) {
				case "add":
					this.removeObjects(aggs.objects);
					break;
				case "remove":
					this.addObjects(aggs.objects);
					break;
				default:
			}
			this.actionTimelinePointer = t;
		}
	},
	applyAction() {
		const crossfilterableLayers = this.actionTimeline;
		let layerI = this.actionTimelinePointer;
		if (layerI < crossfilterableLayers.length) {
			const layer = this.actionTimeline[layerI];
			switch ((layerI++, layer.type)) {
				case "add":
					this.addObjects(layer.objects);
					break;
				case "remove":
					this.removeObjects(layer.objects);
					break;
				default:
			}
			this.actionTimelinePointer = layerI;
		}
	},
	removeObjects(s) {
		const l = s.length;
		let i = 0;
		for (; l > i; i++) {
			const entry = s[i];
			entry.remove = true;
			entry.removeAllReferences();
		}
		this.scene.track.cleanTrack();
	},
	addObjects(list) {
		const i = list.length;
		const t = this.scene.track;
		let l = 0;
		for (; i > l; l++) {
			const target = list[l];
			if (target instanceof PhysicsLine) {
				target.remove = false;
				t.addPhysicsLineToTrack(target);
			} else if (target instanceof SceneryLine) {
				target.remove = false;
				t.addSceneryLineToTrack(target);
			} else if (target instanceof Target) {
				target.remove = false;
				t.addTarget(target);
				t.addPowerup(target);
			} else {
				target.remove = false;
				t.addPowerup(target);
			}
		}
	},
	resetTool() {
		if (this.currentTool !== "") {
			this.tools[this.currentTool].reset();
		}
	},
	update() {
		this.checkGrid();
		if (this.mouse.enabled) {
			this.tools[this.currentTool].update();
		}
		this.checkHotkeys();
		this.checkMouse();
		this.checkSnap();
	},
	checkGrid() {
		const camera = this.scene.camera;
		if (camera.zoom !== camera.desiredZoom) {
			this.gridCache = false;
		}
	},
	checkSnap() {
		if (this.options.snapLocked) {
			this.options.snap = true;
		}
	},
	moveCameraTowardsMouse() {
		if (this.options.cameraLocked === false) {
			const container = this.scene.screen;
			const height = 100;
			const currentMin = container.height - height;
			const total = 0 + height;
			const bottom = container.width - height;
			const left = 0 + height;
			const x = this.options.cameraMoveSpeed;
			const c = container.center;
			const camera = this.camera;
			const org = this.mouse.touch;
			const right = org.pos.x;
			const max = org.pos.y;
			const meshSizeX = 0.8 * (right - c.x);
			const j = max - c.y;
			if (
				right >= bottom ||
				left >= right ||
				max >= currentMin ||
				total >= max
			) {
				camera.position.x += meshSizeX * x * (1 / camera.zoom);
				camera.position.y += j * x * (1 / camera.zoom);
			}
		}
	},
	checkMouse() {
		const touch = this.mouse.touch;
		const e = this.mouse.secondaryTouch;
		if (touch.press || e.press) {
			this.press();
		}
	},
	press() {
		this.camera.unfocus();
	},
	checkHotkeys() {
		const assert = this.gamepad;
		const celldiag = this.options.snap;
		const rdfnode = this.options.snapLocked;
		const cMethod = this.options.rightClickMove;
		let cellright = assert.isButtonDown("alt");
		if (cMethod) {
			cellright = assert.isButtonDown("shift");
		}
		if (cellright && !celldiag) {
			this.toggleQuickSnap();
		} else if (!(cellright || !celldiag || rdfnode)) {
			this.toggleQuickSnap();
		}
		if (assert.isButtonDown("ctrl") && assert.isButtonDown("z")) {
			assert.setButtonUp("z");
			this.revertAction();
		}
		if (assert.isButtonDown("ctrl") && assert.isButtonDown("y")) {
			assert.setButtonUp("y");
			this.applyAction();
		}
		const _tools = this.tools;

		for (const name in _tools) {
			const _tool = _tools[name];
			_tool.checkKeys();
		}
		if (this.gridUseEnabled && assert.isButtonDown("grid")) {
			assert.setButtonUp("grid");
			this.toggleGrid();
		}
		if (assert.isButtonDown("zoom_increase")) {
			assert.setButtonUp("zoom_increase");
			this.scene.camera.increaseZoom();
		}
		if (assert.isButtonDown("zoom_decrease")) {
			assert.setButtonUp("zoom_decrease");
			this.scene.camera.decreaseZoom();
		}
		if (assert.isButtonDown("zoom_100")) {
			assert.setButtonUp("zoom_100");
			this.scene.camera.resetZoom();
		}
		if (assert.isButtonDown("lineType")) {
			assert.setButtonUp("lineType");
			this.toggleLineType();
		}
	},
	toggleLineType() {
		const lineType = this.options.lineType;
		this.options.lineType = lineType === "physics" ? "scenery" : "physics";
		this.scene.stateChanged();
	},
	toggleGrid() {
		this.scene.state.grid = !this.options.grid;
		this.options.grid = this.scene.state.grid;
		this.scene.stateChanged();
	},
	toggleSnap() {
		this.options.snap = !this.options.snap;
		this.options.snapLocked = !this.options.snapLocked;
		this.resetTool();
		this.scene.stateChanged();
	},
	toggleQuickSnap() {
		if (!this.options.snapLocked) {
			this.options.snap = !this.options.snap;
			this.resetTool();
			this.scene.stateChanged();
		}
	},
	toggleCameraLock() {
		this.options.cameraLocked = !this.options.cameraLocked;
		this.scene.stateChanged();
	},
	draw() {
		this.scene.game.canvas.getContext("2d");
		if (this.mouse.enabled) {
			this.tools[this.currentTool].draw();
		}
	},
	drawGrid() {
		const pixelRatio = this.scene.game.pixelRatio;
		const ctxSupport = this.scene.game.canvas.getContext("2d");
		if (this.options.grid === true && this.options.visibleGrid) {
			this.drawCachedGrid(ctxSupport, pixelRatio);
		}
	},
	drawCachedGrid(context, f) {
		if (this.gridCache === false) {
			this.cacheGrid(f);
		}
		const bitmap = this.gridCache;
		const w = bitmap.width;
		const size = bitmap.height;
		const s = this.scene.screen;
		const data = s.center;
		const x = ((data.x / w) | 0) + 2;
		const width = ((data.y / size) | 0) + 2;
		const zoom = this.camera.zoom;
		const sx = (this.camera.position.x * zoom) % w;
		const height = (this.camera.position.y * zoom) % size;
		context.globalAlpha = this.gridCacheAlpha;
		let r = -x;
		for (; x > r; r++) {
			let offset = -width;
			for (; width > offset; offset++) {
				const xThumbnail = r * w - sx + data.x;
				const dy = offset * size - height + data.y;
				context.drawImage(bitmap, 0, 0, size, w, xThumbnail, dy, w, size);
			}
		}
		context.globalAlpha = 1;
	},
	cacheGrid() {
		const r = this.scene.camera.zoom;
		const size = 200 * r;
		const h = 200 * r;
		const i = this.options.gridSize;
		const s = i * r;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = h;
		const ctx = canvas.getContext("2d");
		ctx.strokeStyle = this.options.gridMinorLineColor;
		ctx.strokeWidth = 1;
		ctx.beginPath();
		let b = null;
		let a = null;
		let x = null;
		let c = null;
		b = Math.floor(size / s);
		a = 0;
		for (; b >= a; a++) {
			x = a * s;
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
			ctx.stroke();
		}
		b = Math.floor(h / s);
		a = 0;
		for (; b >= a; a++) {
			c = a * s;
			ctx.moveTo(0, c);
			ctx.lineTo(size, c);
			ctx.stroke();
		}
		ctx.beginPath();
		ctx.rect(0, 0, size, h);
		ctx.lineWidth = 2;
		ctx.strokeStyle = this.options.gridMajorLineColor;
		ctx.stroke();
		ctx.closePath();
		this.gridCache = canvas;
		this.gridCacheAlpha = Math.min(r + 0.2, 1);
	},
	resize() {
		const pixelRatio = this.scene.game.pixelRatio;
		this.cacheGrid(pixelRatio);
	},
	undo() {},
	redo() {},
	close() {
		this.actionTimeline = [];
		this.actionTimelinePointer = 0;
		this.tools = null;
		this.mouse = null;
		this.scene = null;
		this.camera = null;
		this.options.grid = false;
		this.options = null;
		this.gridCache = null;
	},
};

export default ToolHandler;
