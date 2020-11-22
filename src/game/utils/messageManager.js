class MessageManager {
	constructor(data) {
		this.scene = data;
		this.message = false;
		this.timeout = false;
		this.color = "#000";
	}

	draw() {
		let text = this.message;
		const prevTimeout = this.timeout;
		let color = this.color;
		let centerLineColor = this.outline;
		if (
			(prevTimeout !== false && prevTimeout <= 0 && (text = false),
			this.scene.state.paused &&
				((color = false),
				(centerLineColor = false),
				(text = this.scene.settings.mobile
					? "Paused"
					: "Paused - Press Spacebar to Continue")),
			color === false && (color = "#333333"),
			text)
		) {
			const game = this.scene.game;
			const $scope = this.scene;
			const size = game.pixelRatio;
			const ctx2 = game.canvas.getContext("2d");
			const x = $scope.screen.center.x;
			let y = 100;
			const ss = $scope.settings;
			if (ss.controls === "phone") {
				y = 80;
			}
			ctx2.save();
			ctx2.fillStyle = color;
			ctx2.lineWidth = 4 * (size / 2);
			ctx2.font = `${12 * size}pt helsinki`;
			ctx2.textAlign = "center";
			if (centerLineColor) {
				ctx2.strokeStyle = centerLineColor;
				ctx2.strokeText(text, x, y * size);
				ctx2.strokeStyle = "#000";
			}
			ctx2.fillText(text, x, y * size);
			ctx2.restore();
		}
	}

	show(message, timeout, value, color) {
		this.message = message;
		this.timeout = timeout;
		this.color = value;
		this.outline = color;
	}

	hide() {
		this.message = false;
		this.color = false;
		this.outline = false;
	}

	update() {
		if (this.timeout !== false) {
			this.timeout--;
		}
	}
}

export default MessageManager;
