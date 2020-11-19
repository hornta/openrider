import EventEmitter from "./eventEmitter";
import Vector2 from "./math/vector2";
import _ from "lodash";

const round = Math.round;
const MouseHandler = function (data) {
	this.scene = data;
	this.enabled = true;
	this.touch = this.getTouchObject();
	this.touch.old = this.getTouchObject();
	this.secondaryTouch = this.getTouchObject();
	this.secondaryTouch.old = this.getTouchObject();
	this.initAnalytics();
	this.bindToMouseEvents();
	this.updateCallback = false;
};
MouseHandler.prototype = new EventEmitter();
const _this = MouseHandler.prototype;
_this.scene = null;
_this.touch = null;
_this.touches = [];
_this.wheel = false;
_this.mousewheel = false;
_this.mouseMoveListener = null;
_this.mouseUpListener = null;
_this.mouseDownListener = null;
_this.throttledMouseWheel = null;
_this.analytics = null;
_this.contextMenuHandler = function (e) {
	e.stopPropagation();
	e.preventDefault();
	return false;
};
_this.initAnalytics = function () {
	this.analytics = {
		clicks: 0,
	};
};
_this.getTouchObject = function () {
	const data = {
		id: null,
		down: false,
		press: false,
		release: false,
		pos: new Vector2(0, 0),
		real: new Vector2(0, 0),
		type: 1,
	};
	return data;
};
_this.bindToMouseEvents = function () {
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
};
_this.onMouseDown = function (e) {
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
};
_this.disableContextMenu = function () {
	this.scene.game.canvas.oncontextmenu = function () {
		return false;
	};
};
_this.onMouseUp = function (e) {
	if (e.nativeEvent.button === 2) {
		if (this.secondaryTouch.down === true) {
			this.updatePosition(e, this.secondaryTouch);
			this.secondaryTouch.down = false;
		}
	} else if (this.touch.down === true) {
		this.updatePosition(e, this.touch);
		this.touch.down = false;
	}
};
_this.updatePosition = function (event, e) {
	e.id = event.pointerID;
	e.type = event.nativeEvent.button;
	const p = e.pos;
	p.x = event.stageX;
	p.y = event.stageY;
	this.updateRealPosition(e);
};
_this.updateRealPosition = function (item) {
	const b = (item.old, item.pos);
	const options = item.real;
	const game = (item.down, this.scene);
	let s = game.screen;
	const camera = game.camera;
	const c = s.center;
	const pos = camera.position;
	const r = (b.x - c.x) / camera.zoom + pos.x;
	const arg = (b.y - c.y) / camera.zoom + pos.y;
	options.x = round(r);
	options.y = round(arg);
	const app = this.scene.settings;
	if (this.scene.toolHandler.options.grid) {
		s = app.toolHandler.gridSize;
		options.x = round(options.x / s) * s;
		options.y = round(options.y / s) * s;
	}
};
_this.onMouseWheel = function (e) {
	e = window.event || e;
	e.preventDefault();
	e.stopPropagation();
	let event = Math.max(-1, Math.min(1, e.deltaY || -e.detail));
	return (
		event == 0 && (event = Math.max(-1, Math.min(1, e.deltaX || -e.detail))),
		(this.wheel = -event),
		false
	);
};
_this.onMouseMove = function (e) {
	this.updatePosition(e, this.touch);
	this.updatePosition(e, this.secondaryTouch);
};
_this.update = function () {
	if (this.enabled) {
		this.updateTouch(this.touch);
		this.updateTouch(this.secondaryTouch);
		this.updateWheel();
	}
};
_this.updateTouch = function (data) {
	const self = data.old;
	const position = data.pos;
	const b = data.real;
	const payload = data.down;
	self.pos.x = position.x;
	self.pos.y = position.y;
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
};
_this.updateWheel = function () {
	this.mousewheel = this.wheel;
	this.wheel = false;
};
_this.close = function () {
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
};

export default MouseHandler;
