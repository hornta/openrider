class LoadingCircle {
	constructor(scene) {
		this.pixelRatio = 1;
		this.scene = scene;
		this.screen = scene.screen;
		this.context = scene.game.canvas.getContext("2d");
		this.clockwise = false;
		this.settings = {
			radius: 10,
			color: "#1884cf",
		};
	}

	draw() {
		const ctx = this.context;
		const available = this.screen;
		const options = this.settings;
		const scale = this.scene.game.pixelRatio;
		const radius = options.radius;
		const isArray = this.clockwise;
		let item = ((this.scene.game.tickCount % 25) / 25) * 2 * Math.PI;
		if (item === 0) {
			if (this.clockwise) {
				item = 2 * Math.PI;
			}
			this.clockwise = !this.clockwise;
		}
		const start = isArray ? 0 : item;
		const a = isArray ? item : 0;
		const indicatorX = available.width - 25 * scale;
		const y = available.height - 25 * scale;
		const fill = false;
		ctx.beginPath();
		ctx.arc(indicatorX, y, radius * scale, start, a, fill);
		ctx.lineWidth = 3 * scale;
		ctx.strokeStyle = options.color;
		ctx.stroke();
	}
}

export default LoadingCircle;
