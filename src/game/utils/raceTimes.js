import formatNumber from "./formatNumber";

class RaceTimes {
	constructor(data) {
		this.container = null;
		this.raceList = [];
		this.raceCount = 0;
		this.highlightedRace = null;
		this.raceOpacity = 0.3;
		this.raceYOffset = 50;
		this.mobileRaceXOffset = 180;
		this.scene = data;
		this.maxRaces = this.scene.settings.mobile ? 3 : 10;
		this.createContainer();
	}

	createContainer() {
		const self = this.scene.game;
		const trigger = self.settings;
		const ratio = self.pixelRatio;
		const scale = ratio / 2.5;
		const block = new createjs.Container();
		block.scaleY = scale;
		block.scaleX = block.scaleY;
		block.y = 80 * scale;
		block.x = 15 * scale;
		if (trigger.isCampaign) {
			block.y += 55 * scale;
		}
		this.container = block;
		self.stage.addChild(block);
	}

	clear() {
		this.container.removeAllChildren();
		this.raceList = [];
		this.raceCount = 0;
	}

	centerContainer() {
		const scene = this.scene;
		const canvas = scene.screen;
		const c = this.container;
		const foodIconDefinition = c.getBounds();
		const ratio = this.scene.game.pixelRatio;
		c.x = canvas.width / 2 - (foodIconDefinition.width / 2) * c.scaleY;
		const top = 40;
		if (scene.settings.isCampaign) {
			c.visible = false;
		}
		c.y = top * ratio;
	}

	addRace(options2, x) {
		if (this.raceCount < this.maxRaces) {
			const self = this.scene;
			const attrs = options2.user;
			const z = options2.race;
			const o = self.settings;
			const fps = o.drawFPS;
			const color = attrs.color;
			const group = new createjs.Container();
			const shape = new createjs.Shape();
			const g = shape.graphics;
			g.setStrokeStyle(4, "round");
			g.beginFill(color).drawCircle(0, 0, 20);
			shape.x = 25;
			shape.y = 25;
			const str = formatNumber((Number.parseInt(z.run_ticks, 10) / fps) * 1000);
			const b = new createjs.Text(str, `30px helsinki`, "#000000");
			b.x = 55;
			b.y = 9;
			const text = new createjs.Text(
				attrs.d_name.charAt(0),
				`25px helsinki`,
				"#000000"
			);
			text.x = 17;
			text.y = 33;
			text.textBaseline = "alphabetic";
			const container = new createjs.Container();
			container.addChild(shape);
			container.addChild(text);
			container.cache(0, 0, 50, 50);
			container.removeAllChildren();
			group.addChild(container, b);
			group.alpha = this.raceOpacity;
			if (o.mobile) {
				group.x = x * this.mobileRaceXOffset;
			} else {
				group.x = -2;
				group.y = x * this.raceYOffset;
			}
			this.raceList.push(group);
			this.container.addChild(group);
			this.raceCount++;
		}
	}

	update() {
		if (this.raceCount > 0) {
			const camera = this.scene.camera;
			if (camera.focusIndex > 0 && camera.focusIndex < this.maxRaces) {
				this.highlightRace(camera.focusIndex - 1);
			} else {
				this.unhighlightRace();
			}
			if (this.scene.settings.mobile) {
				this.centerContainer();
			}
		}
	}

	highlightRace(name) {
		if (this.highlightedRace !== this.raceList[name]) {
			this.unhighlightRace();
			const e = this.raceList[name];
			e.alpha = 1;
			this.highlightedRace = e;
		}
	}

	unhighlightRace() {
		if (this.highlightedRace) {
			this.highlightedRace.alpha = this.raceOpacity;
			this.highlightedRace = null;
		}
	}
}

export default RaceTimes;
