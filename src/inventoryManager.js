import gameManager from "./gameManager";

function InventoryManager() {}
const classes = {};
const sounds = {};
const utilReqPaths = {};
const self = InventoryManager.prototype;
self.getItem = function (options) {
	let name = options.classname;
	const url = options.script;
	let obj = options.options;
	const feedType = options.type;
	if (!classes[name]) {
		if (feedType === "1") {
			name = "forward_cap";
			obj = {
				back: "white",
			};
		}
		if (!utilReqPaths[url]) {
			utilReqPaths[url] = true;
			gameManager.loadFile(url);
		}
	}
	const key = this.generateID(feedType, name, obj);
	sounds[key] = new classes[name](obj);
	return sounds[key];
};
self.redraw = function () {
	for (const i in sounds) {
		if (sounds.hasOwnProperty(i)) {
			sounds[i].setDirty();
		}
	}
};
self.generateID = function (prefix, str, key) {
	str = prefix + str;
	if (key) {
		for (const name in key) {
			if (key.hasOwnProperty(name)) {
				str += key[name];
			}
		}
	}
	return str;
};
self.register = function (type, obj) {
	classes[type] = obj;
};
self.clear = function () {};

const inventoryManager = new InventoryManager();

export default inventoryManager;
