class CanvasPool {
	constructor(options) {
		this.options = options;
		this.canvasPool = [];
		this.poolCap = 5000;
		this.setToScreen = true;
		if (options.screen) {
			this.setToScreen = true;
			this.update();
		}
		if (options.cap) {
			this.setToScreen = false;
			this.poolCap = options.cap;
		}
	}

	update() {
		if (this.setToScreen) {
			this.getPoolCapFromScreen();
			this.cleanPool();
		}
	}

	getPoolCapFromScreen() {
		const options = this.options;
		const o = options.settings;
		const screen = options.screen;
		const x = (this.options.width, this.options.height, screen.width);
		const length = screen.height;
		const camera = options.camera;
		const zoom = camera.zoom;
		const width = Math.floor(o.drawSectorSize * zoom);
		const i = Math.ceil(x / width);
		const r = Math.ceil(length / width);
		this.poolCap = i * r + i + r;
	}

	getCanvas() {
		let canvas = this.canvasPool.pop();
		if (!canvas) {
			canvas = document.createElement("canvas");
		}
		return canvas;
	}

	releaseCanvas(canvas) {
		if (this.canvasPool.length < this.poolCap) {
			this.canvasPool.push(canvas);
		}
	}

	cleanPool() {
		if (this.canvasPool.length > this.poolCap) {
			this.canvasPool = this.canvasPool.slice(0, this.poolCap + 1);
		}
	}
}

export default CanvasPool;
