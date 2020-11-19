import _ from "lodash";

function GamePad(data) {
	this.scene = data;
	this.tickDownButtons = {};
	this.previousTickDownButtons = {};
	this.downButtons = {};
	this.keymap = {};
	this.records = {};
	this.numberOfKeysDown = 0;
	this.tickNumberOfKeysDown = 0;
}
GamePad.prototype = {
	tickDownButtons: null,
	previousTickDownButtons: null,
	downButtons: null,
	paused: false,
	keymap: null,
	records: null,
	keysToRecord: null,
	keysToPlay: null,
	recording: false,
	playback: null,
	numberOfKeysDown: 0,
	tickNumberOfKeysDown: 0,
	replaying: false,
	listen() {
		document.onkeydown = this.handleButtonDown.bind(this);
		document.onkeyup = this.handleButtonUp.bind(this);
	},
	unlisten() {
		this.downButtons = {};
		document.onkeydown = function () {};
		document.onkeyup = function () {};
	},
	pause() {
		this.paused = true;
	},
	unpause() {
		this.paused = false;
	},
	recordKeys(canCreateDiscussions) {
		this.keysToRecord = canCreateDiscussions;
		this.recording = true;
	},
	loadPlayback(index, eachIndex) {
		this.keysToPlay = eachIndex;
		this.playback = index;
		this.replaying = true;
	},
	setKeyMap(array) {
		const keys = {};

		for (const i in array) {
			if (array[i] instanceof Array) {
				for (const key in array[i]) {
					keys[array[i][key]] = i;
				}
			} else {
				keys[array[i]] = i;
			}
		}
		this.keymap = keys;
	},
	handleButtonDown(event) {
		const code = this.getInternalCode(event.keyCode);
		if (typeof code == "string") {
			event.preventDefault();
		}
		this.setButtonDown(code);
	},
	handleButtonUp(event) {
		const code = this.getInternalCode(event.keyCode);
		if (typeof code == "string") {
			event.preventDefault();
		}
		this.setButtonUp(code);
	},
	getInternalCode(name) {
		const attrToProp = this.keymap;
		return attrToProp[name] || name;
	},
	setButtonsDown(array) {
		let i = 0;
		const length = array.length;
		for (; length > i; i++) {
			this.setButtonDown(array[i]);
		}
	},
	setButtonUp(code) {
		if (this.downButtons[code]) {
			if (this.onButtonUp) {
				this.onButtonUp(code);
			}
			this.downButtons[code] = false;
			this.numberOfKeysDown--;
		}
	},
	setButtonDown(code, f) {
		if (!this.downButtons[code]) {
			if (this.onButtonDown) {
				this.onButtonDown(code);
			}
			this.downButtons[code] = f ? f : true;
			this.numberOfKeysDown++;
		}
	},
	isButtonDown(key) {
		let e = false;
		const i = this.tickDownButtons[key];
		(i > 0 || i == 1) && (e = true);
		return e;
	},
	getButtonDownOccurances(key) {
		let entryToSend = 0;
		if (this.isButtonDown(key)) {
			entryToSend = 1;
			const entry = this.tickDownButtons[key];
			if (entry !== true) {
				entryToSend = entry;
			}
		}
		return entryToSend;
	},
	getDownButtons() {
		const btns = [];

		for (const move in this.tickDownButtons) {
			if (this.tickDownButtons[move]) {
				btns.push(move);
			}
		}
		return btns;
	},
	reset(noalert) {
		if (this.replaying || noalert) {
			this.downButtons = {};
		}
		this.tickDownButtons = {};
		this.previousTickDownButtons = {};
		this.records = {};
	},
	update() {
		if (this.replaying) {
			this.updatePlayback();
		}
		this.previousTickDownButtons = _.merge({}, this.tickDownButtons);
		this.tickDownButtons = _.merge({}, this.downButtons);
		this.tickNumberOfKeysDown = this.numberOfKeysDown;
		if (this.recording) {
			this.updateRecording();
		}
	},
	areKeysDown() {
		for (const n in this.downButtons) {
			if (this.downButtons[n] === true) {
				return true;
			}
		}
		return false;
	},
	updatePlayback() {
		const indices = this.keysToPlay;
		const res = this.playback;
		const id = this.scene.ticks;

		for (const i in indices) {
			const code = indices[i];
			const path = `${code}_up`;
			const dataType = `${code}_down`;
			if (
				typeof res[dataType] != "undefined" &&
				typeof res[dataType][id] != "undefined"
			) {
				const smoothFunc = res[dataType][id];
				this.setButtonDown(code, smoothFunc);
			}
			if (
				typeof res[path] != "undefined" &&
				typeof res[path][id] != "undefined"
			) {
				this.setButtonUp(code);
			}
		}
	},
	updateRecording() {
		let s = this.scene.ticks;
		const result = this.records;
		const propertiesOrder = (this.keymap, this.keysToRecord);
		const pods = this.tickDownButtons;
		const edges = this.previousTickDownButtons;
		for (const i in propertiesOrder) {
			const key = propertiesOrder[i];
			if (typeof pods[key] != "undefined") {
				const answer = pods[key];
				let n = false;
				if (
					(typeof edges[key] != "undefined" && (n = edges[key]), answer !== n)
				) {
					const k = `${key}_up`;
					const g = `${key}_down`;
					let j = k;
					if (answer) {
						j = g;
					}
					if (!result[j]) {
						result[j] = [];
					}
					if (!answer) {
						if (result[g] && result[g].indexOf(s) !== -1) {
							s += 1;
						}
					}
					result[j].push(s);
				}
			}
		}
	},
	buttonWasRecentlyDown(animation) {
		let result = this.records;
		if (this.replaying) {
			result = this.playback;
		}
		const name = `${animation}_down`;
		let s = false;
		if (result[name]) {
			const meshes = this.scene.ticks;
			const chars = meshes;
			const e = result[name];
			let a = -1;
			a = this.replaying ? typeof e[chars] != "undefined" : e.indexOf(chars);
			if (a !== -1) {
				s = true;
			}
		}
		return s;
	},
	getReplayString() {
		return JSON.stringify(this.records);
	},
	encodeReplayString(importedPages) {
		const o = this.scene.settings;
		const markupClasses = {
			version: o.replayVersion,
		};
		for (const importedPageName in importedPages) {
			const list = importedPages[importedPageName];
			markupClasses[importedPageName] = "";
			for (const id in list) {
				const dd = list[id];
				markupClasses[importedPageName] += `${dd.toString(32)} `;
			}
		}
		return markupClasses;
	},
	close() {
		this.unlisten();
		this.handleButtonUp = null;
		this.handleButtonDown = null;
		this.onButtonDown = null;
		this.onButtonUp = null;
		this.scene = null;
		this.tickDownButtons = null;
		this.downButtons = null;
		this.keymap = null;
		this.records = null;
		this.keysToRecord = null;
	},
};
export default GamePad;
