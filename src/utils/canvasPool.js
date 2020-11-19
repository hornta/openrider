function CanvasPool(options) {
	this.options = options;
	this.canvasPool = [];
	if (options.screen) {
		this.setToScreen = true;
		this.update();
	}
	if (options.cap) {
		this.setToScreen = false;
		this.poolCap = options.cap;
	}
}
const floor = Math.floor;
const ceil = Math.ceil;
CanvasPool.prototype = {
	canvasPool: null,
	poolCap: 5e3,
	setToScreen: true,
	options: null,
	update() {
		if (this.setToScreen) {
			this.getPoolCapFromScreen();
			this.cleanPool();
		}
	},
	getPoolCapFromScreen() {
		const options = this.options;
		const o = options.settings;
		const screen = options.screen;
		const x = (this.options.width, this.options.height, screen.width);
		const length = screen.height;
		const camera = options.camera;
		const zoom = camera.zoom;
		const width = floor(o.drawSectorSize * zoom);
		const i = ceil(x / width);
		const r = ceil(length / width);
		this.poolCap = i * r + i + r;
	},
	getCanvas() {
		let canvas = this.canvasPool.pop();
		if (!canvas) {
			canvas = document.createElement("canvas");
		}
		return canvas;
	},
	releaseCanvas(canvas) {
		if (this.canvasPool.length < this.poolCap) {
			this.canvasPool.push(canvas);
		}
	},
	cleanPool() {
		if (this.canvasPool.length > this.poolCap) {
			this.canvasPool = this.canvasPool.slice(0, this.poolCap + 1);
		}
	},
};
export default CanvasPool;
