class Tool {
	constructor(options) {
		this.name = "";
		this.toolhandler = options;
		this.scene = options.scene;
		this.game = options.scene.game;
		this.camera = options.scene.camera;
		this.mouse = options.scene.mouse;
		this.gamepad = options.gamepad;
	}

	update() {
		const node = this.mouse;
		const t = node.touch;
		const cur = node.secondaryTouch;
		const aggregator = this.toolhandler.gamepad;
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
			if (t.press && this.press) {
				this.press();
			}
			if (t.old.down) {
				this.hold();
			}
			if (t.release && this.release) {
				this.release();
			}
		}
		if (
			node.mousewheel !== false &&
			aggregator.isButtonDown("shift") === false
		) {
			this.mousewheel(node.mousewheel);
		}
	}

	moveCamera() {
		const e = this.mouse.secondaryTouch;
		const start = e.position;
		const camera = this.camera;
		const i = e.old.position.subtract(start).multiply(1 / camera.zoom);
		camera.position.inc(i);
	}

	mousewheel(factor) {
		const options = this.scene.settings;
		const scale = this.scene.game.pixelRatio;
		const step = options.cameraSensitivity;
		const zoom = options.cameraZoomMin;
		const z = options.cameraZoomMax;
		const newScale = zoom * scale;
		const z2 = z * scale;
		const self = this.camera;
		const org = this.mouse.touch;
		let value = self.desiredZoom;
		value += factor * step;
		self.setZoom(value / scale, org.position);
		if (self.desiredZoom < newScale) {
			self.setZoom(zoom, org.position);
		} else if (self.desiredZoom > z2) {
			self.setZoom(z, org.position);
		}
	}

	checkKeys() {
		const player = this.gamepad;
		const type = this.name.toLowerCase();
		const self = this.toolhandler;
		if (player.isButtonDown(type)) {
			self.setTool(type);
			player.setButtonUp(type);
		}
	}
}

export default Tool;
