function Powerup() {}
const c = Powerup.prototype;
c.init = function (node) {
	this.game = node.scene.game;
	this.scene = node.scene;
	this.settings = this.game.settings;
	this.remove = false;
};
c.scene = null;
c.angle = 0;
c.x = 0;
c.y = 0;
c.name = null;
c.sector = null;
c.settings = null;
c.remove = false;
c.getCode = function () {};
c.draw = function () {};
c.erase = function (obj, start) {
	let instance = false;
	if (!this.remove) {
		const len = Math.sqrt((obj.x - this.x) ** 2 + (obj.y - this.y) ** 2);
		if (start >= len) {
			instance = [this];
			this.removeAllReferences();
		}
	}
	return instance;
};
c.removeAllReferences = function () {
	this.remove = true;
	if (this.sector) {
		this.sector.powerupCanvasDrawn = false;
		this.sector.dirty = true;
		this.sector = null;
	}
	this.scene.track.cleanPowerups();
};
c.collide = function (other) {
	const dx = other.pos.x - this.x;
	const dy = other.pos.y - this.y;
	const expected = Math.sqrt(dx ** 2 + dy ** 2);
	if (!this.hit && expected < 26) {
		this.hit = true;
		this.sector.powerupCanvasDrawn = false;
	}
};
c.addSectorReference = function (sector) {
	this.sector = sector;
};

export default Powerup;
