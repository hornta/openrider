import inventoryManager from "../../inventoryManager";

function HeadClass() {}
const me = HeadClass.prototype;
me.createVersion = function () {
	const prefixes = this.colors;
	const versions = this.getVersions();
	let name = "";
	let p;
	for (p in prefixes) {
		if (prefixes.hasOwnProperty(p)) {
			name = name + prefixes[p];
		}
	}
	this.versionName = name;
	if (!versions[name]) {
		versions[name] = {
			dirty: true,
			canvas: document.createElement("canvas"),
		};
	}
};
me.draw = function (ctx, x, y, a, value, css) {
	const data = this.getCache(value);
	const unitValue = this.getBaseWidth();
	const rescaleSlope = this.getBaseHeight();
	const factor = this.getScale();
	const i = this.getDrawOffsetX();
	const yy = this.getDrawOffsetY();
	const width = unitValue * value * factor;
	const height = rescaleSlope * value * factor;
	const imageOffsetX = i * value - width / 2;
	const imageOffsetY = yy * value - height / 2;
	const isCSS = css === -1;
	ctx.translate(x, y);
	ctx.rotate(a);
	if (isCSS) {
		ctx.scale(1, -1);
	}
	ctx.drawImage(data, imageOffsetX, imageOffsetY, width, height);
	if (isCSS) {
		ctx.scale(1, -1);
	}
	ctx.rotate(-a);
	ctx.translate(-x, -y);
};
me.getCache = function (options) {
	const objects = this.getVersions();
	return (
		objects[this.versionName].dirty && this.cache(options),
		objects[this.versionName].canvas
	);
};
me.setDirty = function () {
	const lines = this.getVersions();
	lines[this.versionName].dirty = true;
};

export default HeadClass;
if (inventoryManager) {
	inventoryManager.HeadClass = HeadClass;
}
