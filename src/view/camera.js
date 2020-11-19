import Vector2 from "../math/vector2";

function Camera(data) {
	const { settings } = data;
	this.settings = settings;
	this.scene = data;
	this.zoom = settings.cameraStartZoom * data.game.pixelRatio;
	this.desiredZoom = settings.cameraStartZoom * data.game.pixelRatio;
	this.zooming = false;
	this.position = new Vector2(0, 0);
	this.zoomPercentage = this.getZoomAsPercentage();
	this.zoomPoint = false;
}

Camera.prototype = {
	settings: null,
	scene: null,
	zoom: 1,
	position: null,
	desiredZoom: 1,
	zoomPercentage: 0,
	focusIndex: 0,
	playerFocus: null,
	focusOnNextPlayer() {
		const t = this.scene.playerManager.getPlayerCount();
		this.focusIndex = (this.focusIndex + 1) % t;
		this.focusOnPlayer();
	},
	focusOnPlayer() {
		const self = this.scene;
		const session = self.playerManager;
		const i = session.getPlayerCount();
		if (i <= this.focusIndex) {
			this.focusIndex = 0;
		}
		const item = session.getPlayerByIndex(this.focusIndex);
		if (this.playerFocus !== item) {
			const n = this.playerFocus;
			this.playerFocus = item;
			self.vehicleTimer.setPlayer(item);
			if (n) {
				const diffVector = item.getDistanceBetweenPlayers(n);
				if (diffVector > 1500) {
					this.fastforward();
				}
			} else {
				this.fastforward();
			}
		}
	},
	focusOnMainPlayer() {
		if (!(this.focusIndex === 0 && this.playerFocus)) {
			this.focusIndex = 0;
			this.focusOnPlayer();
		}
	},
	update() {
		if (this.playerFocus) {
			const model = this.playerFocus.getActiveVehicle();
			const prevLevelVitorc = model.focalPoint;
			const bounds = this.position;
			let factor = 3;
			const base = prevLevelVitorc.pos.x - bounds.x;
			const height = prevLevelVitorc.pos.y - bounds.y;
			const sqrt8 = Math.sqrt(base ** 2 + height ** 2);
			if (sqrt8 > 1500) {
				factor = 1;
			}
			bounds.x += (prevLevelVitorc.pos.x - bounds.x) / factor;
			bounds.y += (prevLevelVitorc.pos.y - bounds.y) / factor;
		}
	},
	updateZoom() {
		const z = this.zoom;
		const currentZoom = this.desiredZoom;
		if (z !== currentZoom) {
			this.scene.loading = true;
			this._performZoom();
			if (this.zoom === this.desiredZoom) {
				this.zoomComplete();
			}
		}
	},
	zoomToPoint(pixelRatio) {
		const _ref = (this.zoom, this.scene);
		const image = _ref.screen;
		const currentPosition = this.position;
		const size = this.zoomPoint;
		const y = image.toReal(size.x, "x");
		const top = image.toReal(size.y, "y");
		const ratio = size.x / image.width;
		const gridUnit = size.y / image.height;
		const h = image.width / pixelRatio;
		const height = image.height / pixelRatio;
		currentPosition.x = y - h * ratio + h / 2;
		currentPosition.y = top - height * gridUnit + height / 2;
	},
	_performZoom() {
		const { scene } = this;
		let zoom = (scene.screen, this.position, this.zoom);
		const z = this.desiredZoom;
		const diff = z - zoom;
		const zoomOffset = diff / 3;
		zoom += zoomOffset;
		if (Math.abs(diff) < 0.05) {
			zoom = z;
		}
		if (this.zoomPoint) {
			this.zoomToPoint(zoom);
		}
		this.zoom = zoom;
	},
	zoomComplete() {
		this.scene.redraw();
		this.zooming = false;
		this.scene.loading = false;
	},
	setZoom(pZoom, pAnimation) {
		const { scene } = this;
		this.desiredZoom = Math.round(pZoom * scene.game.pixelRatio * 10) / 10;
		this.zooming = true;
		if (this.desiredZoom === this.zoom) {
			this.zooming = false;
			this.scene.state.loading = false;
		}
		this.zoomPoint = false;
		if (this.playerFocus === null && pAnimation) {
			this.zoomPoint = pAnimation;
		}
		this.zoomPercentage = this.getZoomAsPercentage();
		scene.stateChanged();
	},
	resetZoom() {
		const zoom = this.settings.cameraStartZoom;
		this.setZoom(zoom);
	},
	getZoomAsPercentage() {
		const { settings } = this.scene;
		const e =
			(this.desiredZoom /
				this.scene.game.pixelRatio /
				settings.cameraStartZoom) *
			100;
		return 0 | e;
	},
	increaseZoom() {
		const { settings } = this.scene;
		const leftGripSelector = settings.cameraSensitivity;
		const viewWidth = this.desiredZoom + 2 * leftGripSelector;
		const ratio = this.scene.game.pixelRatio;
		const zoom = settings.cameraZoomMax;
		const newWidth = zoom * ratio;
		this.setZoom(viewWidth / ratio);
		if (this.desiredZoom > newWidth) {
			this.setZoom(zoom);
		}
	},
	decreaseZoom() {
		const { settings } = this.scene;
		const leftGripSelector = settings.cameraSensitivity;
		const viewWidth = this.desiredZoom - 2 * leftGripSelector;
		const ratio = this.scene.game.pixelRatio;
		const zoom = settings.cameraZoomMin;
		const newWidth = zoom * ratio;
		this.setZoom(viewWidth / ratio);
		if (this.desiredZoom < newWidth) {
			this.setZoom(zoom);
		}
	},
	unfocus() {
		this.playerFocus = null;
		this.scene.vehicleTimer.removePlayer();
	},
	fastforward() {
		if (this.playerFocus) {
			const model = this.playerFocus.getActiveVehicle();
			const prevLevelVitorc = model.focalPoint;
			this.position.x = prevLevelVitorc.pos.x;
			this.position.y = prevLevelVitorc.pos.y;
		}
	},
	close() {
		this.zoom = null;
		this.scene = null;
		this.position = null;
		this.playerFocus = null;
	},
};

export default Camera;
