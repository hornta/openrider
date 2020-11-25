class Powerup {
	constructor(node) {
		this.angle = 0;
		this.x = 0;
		this.y = 0;
		this.name = null;
		this.sector = null;
		this.game = node.scene.game;
		this.scene = node.scene;
		this.settings = this.game.settings;
		this.remove = false;
	}

	erase(obj, start) {
		let instance = false;
		if (!this.remove) {
			const len = Math.sqrt((obj.x - this.x) ** 2 + (obj.y - this.y) ** 2);
			if (start >= len) {
				instance = [this];
				this.removeAllReferences();
			}
		}
		return instance;
	}

	removeAllReferences() {
		this.remove = true;
		if (this.sector) {
			this.sector.powerupCanvasDrawn = false;
			this.sector.dirty = true;
			this.sector = null;
		}
		this.scene.track.cleanPowerups();
	}

	collide(other) {
		const dx = other.position.x - this.x;
		const dy = other.position.y - this.y;
		const expected = Math.sqrt(dx ** 2 + dy ** 2);
		if (!this.hit && expected < 26) {
			this.hit = true;
			this.sector.powerupCanvasDrawn = false;
		}
	}

	addSectorReference(sector) {
		this.sector = sector;
	}
}

export default Powerup;
