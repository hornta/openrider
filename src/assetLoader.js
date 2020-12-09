import EventEmitter from "eventemitter3";

class AssetLoader extends EventEmitter {
	constructor() {
		super();

		this.assets = new Map();
	}

	load() {}

	getAsset(id) {
		return this.assets.get(id);
	}
}

export default AssetLoader;
