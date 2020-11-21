import EventEmitter from "eventemitter3";
import Vector2 from "./math/vector2";
import _ from "lodash";

function getTouchObject() {
	const data = {
		id: null,
		down: false,
		press: false,
		release: false,
		position: new Vector2(0, 0),
		real: new Vector2(0, 0),
		type: 1,
	};
	return data;
}
class MouseHandler extends EventEmitter {
	constructor(data) {
		super();

		this.touches = [];
		this.wheel = false;
		this.mousewheel = false;
		this.mouseMoveListener = null;
		this.mouseUpListener = null;
		this.mouseDownListener = null;
		this.throttledMouseWheel = null;
		this.analytics = null;
		this.scene = data;
		this.enabled = true;
		this.touch = getTouchObject();
		this.touch.old = getTouchObject();
		this.secondaryTouch = getTouchObject();
		this.secondaryTouch.old = getTouchObject();
		this.initAnalytics();
		this.bindToMouseEvents();
		this.updateCallback = false;
	}

	initAnalytics() {
		this.analytics = {
			clicks: 0,
		};
	}

	bindToMouseEvents() {
		const stage = this.scene.game.stage;
		const canvas = this.scene.game.canvas;
		const onMove = this.onMouseMove.bind(this);
		const resizeHandler = this.onMouseDown.bind(this);
		const bound = this.onMouseUp.bind(this);
		stage.addEventListener("stagemousemove", onMove);
		stage.addEventListener("stagemousedown", resizeHandler);
		stage.addEventListener("stagemouseup", bound);
		this.mouseMoveListener = onMove;
		this.mouseDownListener = resizeHandler;
		this.mouseUpListener = bound;
		const boundOnMouseWheel = _.throttle(this.onMouseWheel, 0);
		canvas.addEventListener("mousewheel", boundOnMouseWheel.bind(this));
		canvas.addEventListener("wheel", boundOnMouseWheel.bind(this));
		canvas.addEventListener("DOMMouseScroll", boundOnMouseWheel.bind(this));
		this.mouseWheelListener = boundOnMouseWheel;
	}

	onMouseDown(e) {
		this.analytics.clicks++;
		if (e.nativeEvent.button === 2) {
			if (this.secondaryTouch.down === false) {
				this.updatePosition(e, this.secondaryTouch);
				this.secondaryTouch.down = true;
			}
		} else if (this.touch.down === false) {
			this.updatePosition(e, this.touch);
			this.touch.down = true;
		}
	}

	disableContextMenu() {
		this.scene.game.canvas.addEventListener("contextmenu", function () {
			return false;
		});
	}

	onMouseUp(e) {
		if (e.nativeEvent.button === 2) {
			if (this.secondaryTouch.down === true) {
				this.updatePosition(e, this.secondaryTouch);
				this.secondaryTouch.down = false;
			}
		} else if (this.touch.down === true) {
			this.updatePosition(e, this.touch);
			this.touch.down = false;
		}
	}

	updatePosition(event, e) {
		e.id = event.pointerID;
		e.type = event.nativeEvent.button;
		const p = e.position;
		p.x = event.stageX;
		p.y = event.stageY;
		this.updateRealPosition(e);
	}

	updateRealPosition(item) {
		const b = item.position;
		const options = item.real;
		const game = this.scene;
		let s = game.screen;
		const camera = game.camera;
		const c = s.center;
		const position = camera.position;
		const r = (b.x - c.x) / camera.zoom + position.x;
		const arg = (b.y - c.y) / camera.zoom + position.y;
		options.x = Math.round(r);
		options.y = Math.round(arg);
		const app = this.scene.settings;
		if (this.scene.toolHandler.options.grid) {
			s = app.toolHandler.gridSize;
			options.x = Math.round(options.x / s) * s;
			options.y = Math.round(options.y / s) * s;
		}
	}

	onMouseWheel(e) {
		e = window.event || e;
		e.preventDefault();
		e.stopPropagation();
		let event = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
		return (
			event == 0 && (event = Math.max(-1, Math.min(1, e.deltaX || -e.detail))),
			(this.wheel = -event),
			false
		);
	}

	onMouseMove(e) {
		this.updatePosition(e, this.touch);
		this.updatePosition(e, this.secondaryTouch);
	}

	update() {
		if (this.enabled) {
			this.updateTouch(this.touch);
			this.updateTouch(this.secondaryTouch);
			this.updateWheel();
		}
	}

	updateTouch(data) {
		const self = data.old;
		const position = data.position;
		const b = data.real;
		const payload = data.down;
		self.position.x = position.x;
		self.position.y = position.y;
		self.real.x = b.x;
		self.real.y = b.y;
		if (!self.down && payload) {
			data.press = true;
		}
		if (self.down && !payload) {
			data.release = true;
		}
		if (self.press) {
			data.press = false;
		}
		if (self.release) {
			data.release = false;
		}
		this.updateRealPosition(data);
		self.down = data.down;
		self.press = data.press;
		self.release = data.release;
	}

	updateWheel() {
		this.mousewheel = this.wheel;
		this.wheel = false;
	}

	close() {
		const self = this.scene.game.stage;
		const el = this.scene.game.canvas;
		self.removeAllEventListeners();
		el.removeEventListener("mousewheel", this.mouseWheelListener);
		el.removeEventListener("DOMMouseScroll", this.mouseWheelListener);
		this.touches = null;
		this.touch = null;
		this.scene = null;
		this.wheel = null;
		this.mouseMoveListener = null;
		this.mouseDownListener = null;
		this.mouseUpListener = null;
	}
}

export default MouseHandler;
