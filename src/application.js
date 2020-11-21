import $ from "jquery";

const E = function (input, val, name) {
	let a = "_sub";
	let seconds = false;
	// eslint-disable-next-line consistent-this
	let self = this;
	if (typeof name == "string") {
		a = name;
	} else if (typeof val == "string") {
		a = val;
	} else if (typeof input == "string") {
		a = input;
	}
	if (typeof val == "boolean") {
		seconds = val;
	} else if (typeof input == "boolean") {
		seconds = input;
	}
	if (typeof input == "object" || typeof input == "function") {
		self = input;
	}
	const obj = {};
	obj[a] = [];

	const s = function (item, event) {
		let i = 0;
		for (; i < item[a].length; i++) {
			if (undefined === event || event === null || item[a][i] === event) {
				item[a].splice(i, 1);
				i--;
			}
		}
	};

	const callback = function (data, e) {
		for (const sub in data) {
			if (
				typeof data[sub] == "object" &&
				sub !== a &&
				// eslint-disable-next-line no-prototype-builtins
				data.hasOwnProperty(sub)
			) {
				callback(data[sub], e);
			}
		}
		s(data, e);
	};

	self.publish = function (name2, value) {
		let b;
		b =
			arguments.length > 2
				? Array.prototype.slice.apply(arguments, [1])
				: value
				? value
				: [];
		if (undefined === b.length) {
			b = [b];
		}
		let ab = obj;
		const l = [];
		name2 = name2 || "";
		const split = name2.split(".");
		if (seconds) {
			b.push(split);
		}
		l.push(ab);
		let i = 0;
		for (
			;
			i < split.length && split[i] !== "" && undefined !== ab[split[i]];
			i++
		) {
			ab = ab[split[i]];
			l.push(ab);
		}
		let gVerts;
		let h = false;
		for (; (gVerts = l.pop()); ) {
			let j = 0;
			for (; j < gVerts[ab].length; j++) {
				if (gVerts[ab][j].apply(this, b) === false) {
					h = true;
				}
			}
			if (h) {
				break;
			}
		}
		return self;
	};

	self.subscribe = function (to, value) {
		let data = obj;
		to = to || "";
		const values = to.split(".");
		let i = 0;
		for (; i < values.length && values[i] !== ""; i++) {
			if (!data[values[i]]) {
				data[values[i]] = {};
				data[values[i]][a] = [];
			}
			data = data[values[i]];
		}
		data[a].push(value);
		return self;
	};

	self.unsubscribe = function (name2, e, n) {
		let expected = obj;
		if (((name2 = name2 || ""), name2 != "")) {
			const expectedKeys = name2.split(".");
			let i = 0;
			for (; i < expectedKeys.length && expectedKeys[i] !== ""; i++) {
				if (undefined === expected[expectedKeys[i]]) {
					return;
				}
				expected = expected[expectedKeys[i]];
			}
		}
		if (typeof e == "boolean") {
			n = e;
		}
		e = null;
		if (n) {
			callback(expected, e);
		} else {
			s(expected, e);
		}
	};
};

const n = {
	developerMode: !0,
	events: new E(),
	init() {},
	proxy(e, t) {
		// eslint-disable-next-line consistent-return
		return () => {
			if (n.developerMode !== !1) {
				return e.apply(t, arguments);
			}
			try {
				return e.apply(t, arguments);
			} catch {
				//
			}
		};
	},
	createCookie(name, r, t) {
		let i = "";
		if (t) {
			const e = new Date();
			e.setTime(e.getTime() + 24 * t * 60 * 60 * 1000);
			i = `; expires=${e.toGMTString()}`;
		} else {
			i = "";
		}
		document.cookie = `${name}=${r}${i}; path=/`;
	},
	getCookie(name) {
		if (document.cookie.length > 0) {
			let e = document.cookie.indexOf(`${name}=`);
			if (e != -1) {
				e = e + name.length + 1;
				let t = document.cookie.indexOf(";", e);
				return (
					t == -1 && (t = document.cookie.length),
					// eslint-disable-next-line unicorn/prefer-string-slice
					unescape(document.cookie.substring(e, t))
				);
			}
		}
		return "";
	},
	getParentUrl() {
		const t = window.parent !== window;
		let e = null;
		if (t) {
			e = document.referrer;
		}
		return e;
	},
};
window.Application = $.extend(n, window.Application);
window.t = $.noop;
