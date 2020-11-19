function EventEmitter() {
	this._events = this._events || {};
	this._maxListeners = this._maxListeners || undefined;
}
function isFunction(arg) {
	return typeof arg == "function";
}
function isNumber(val) {
	return typeof val == "number";
}
function isObject(arg) {
	return typeof arg == "object" && arg !== null;
}
function isUndefined(val) {
	return undefined === val;
}
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;
EventEmitter.defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function (n) {
	if (!isNumber(n) || n < 0 || isNaN(n)) {
		throw new TypeError("n must be a positive number");
	}
	this._maxListeners = n;
	return this;
};
EventEmitter.prototype.emit = function (type) {
	let er;
	let handler;
	let length;
	let args;
	let i;
	let namedListeners;
	if (
		(this._events || (this._events = {}),
		type === "error" &&
			(!this._events.error ||
				(isObject(this._events.error) && !this._events.error.length)))
	) {
		if (((er = arguments[1]), er instanceof Error)) {
			throw er;
		}
		throw new TypeError('Uncaught, unspecified "error" event.');
	}
	if (((handler = this._events[type]), isUndefined(handler))) {
		return false;
	}
	if (isFunction(handler)) {
		switch (arguments.length) {
			case 1:
				handler.call(this);
				break;
			case 2:
				handler.call(this, arguments[1]);
				break;
			case 3:
				handler.call(this, arguments[1], arguments[2]);
				break;
			default:
				length = arguments.length;
				args = new Array(length - 1);
				i = 1;
				for (; length > i; i++) {
					args[i - 1] = arguments[i];
				}
				handler.apply(this, args);
		}
	} else if (isObject(handler)) {
		length = arguments.length;
		args = new Array(length - 1);
		i = 1;
		for (; length > i; i++) {
			args[i - 1] = arguments[i];
		}
		namedListeners = handler.slice();
		length = namedListeners.length;
		i = 0;
		for (; length > i; i++) {
			namedListeners[i].apply(this, args);
		}
	}
	return true;
};
EventEmitter.prototype.addListener = function (type, listener) {
	let m;
	if (!isFunction(listener)) {
		throw new TypeError("listener must be a function");
	}
	if (
		(this._events || (this._events = {}),
		this._events.newListener &&
			this.emit(
				"newListener",
				type,
				isFunction(listener.listener) ? listener.listener : listener
			),
		this._events[type]
			? isObject(this._events[type])
				? this._events[type].push(listener)
				: (this._events[type] = [this._events[type], listener])
			: (this._events[type] = listener),
		isObject(this._events[type]) && !this._events[type].warned)
	) {
		m = isUndefined(this._maxListeners)
			? EventEmitter.defaultMaxListeners
			: this._maxListeners;
		if (m && m > 0 && this._events[type].length > m) {
			this._events[type].warned = true;
		}
	}
	return this;
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.once = function (type, listener) {
	let i = false;
	function g() {
		// eslint-disable-next-line no-invalid-this
		this.removeListener(type, g);
		if (!i) {
			i = true;
			// eslint-disable-next-line no-invalid-this
			listener.apply(this, arguments);
		}
	}
	if (!isFunction(listener)) {
		throw new TypeError("listener must be a function");
	}
	g.listener = listener;
	this.on(type, g);
	return this;
};
EventEmitter.prototype.removeListener = function (type, listener) {
	if (!isFunction(listener)) {
		throw new TypeError("listener must be a function");
	}
	if (!this._events || !this._events[type]) {
		return this;
	}
	const list = this._events[type];
	const { length } = list;
	let key = -1;
	if (
		list === listener ||
		(isFunction(list.listener) && list.listener === listener)
	) {
		delete this._events[type];
		if (this._events.removeListener) {
			this.emit("removeListener", type, listener);
		}
	} else if (isObject(list)) {
		let i = length;
		for (; i-- > 0; ) {
			if (
				list[i] === listener ||
				(list[i].listener && list[i].listener === listener)
			) {
				key = i;
				break;
			}
		}
		if (key < 0) {
			return this;
		}
		if (list.length === 1) {
			list.length = 0;
			delete this._events[type];
		} else {
			list.splice(key, 1);
		}
		if (this._events.removeListener) {
			this.emit("removeListener", type, listener);
		}
	}
	return this;
};
EventEmitter.prototype.removeAllListeners = function (type) {
	if (!this._events) {
		return this;
	}
	if (!this._events.removeListener) {
		return (
			arguments.length === 0
				? (this._events = {})
				: this._events[type] && delete this._events[type],
			this
		);
	}
	if (arguments.length === 0) {
		for (const key in this._events) {
			if (key !== "removeListener") {
				this.removeAllListeners(key);
			}
		}
		this.removeAllListeners("removeListener");
		this._events = {};
		return this;
	}
	const listeners = this._events[type];
	if (isFunction(listeners)) {
		this.removeListener(type, listeners);
	} else {
		for (; listeners.length; ) {
			this.removeListener(type, listeners[listeners.length - 1]);
		}
	}
	delete this._events[type];
	return this;
};
EventEmitter.prototype.listeners = function (type) {
	let t = [];
	if (this._events && this._events[type]) {
		if (isFunction(this._events[type])) {
			t = [this._events[type]];
		} else {
			t = this._events[type].slice();
		}
	} else {
		t = [];
	}
	return t;
};
EventEmitter.listenerCount = function (emitter, type) {
	let s = 0;
	if (emitter._events && emitter._events[type]) {
		if (isFunction(emitter._events[type])) {
			s = 1;
		} else {
			s = emitter._events[type].length;
		}
	} else {
		s = 0;
	}

	return s;
};

export default EventEmitter;
