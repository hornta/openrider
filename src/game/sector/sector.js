import PhysicsLine from "./physicsLine";
import SceneryLine from "./sceneryLine";

class Sector {
	constructor(x, y, options) {
		this.image = false;
		this.canvas = null;
		this.powerupCanvas = null;
		this.powerupCanvasOffset = 30;
		this.powerupCanvasDrawn = false;
		this.track = options;
		this.scene = options.scene;
		this.settings = options.settings;
		this.drawSectorSize = this.settings.drawSectorSize;
		this.row = y;
		this.column = x;
		this.camera = options.camera;
		this.zoom = options.camera.zoom;
		this.canvasPool = options.canvasPool;
		this.x = x * this.drawSectorSize;
		this.y = y * this.drawSectorSize;
		this.realX = this.x * this.zoom;
		this.realY = this.y * this.zoom;
		this.lineCount = 0;
		this.powerupsCount = 0;
		this.drawn = false;
		this.dirty = false;
		this.physicsLines = [];
		this.sceneryLines = [];
		this.hasPowerups = false;
		this.powerups = {
			all: [],
			goals: [],
			gravitys: [],
			boosts: [],
			slowmos: [],
			checkpoints: [],
			bombs: [],
			antigravitys: [],
			teleports: [],
			helicopters: [],
			trucks: [],
			balloons: [],
			blobs: [],
		};
	}

	addLine(value) {
		if (value instanceof PhysicsLine) {
			this.physicsLines.push(value);
		}
		if (value instanceof SceneryLine) {
			this.sceneryLines.push(value);
		}
		this.lineCount++;
		this.drawn = false;
	}

	searchForLine(name, head) {
		const result = this[name];
		let longestMatchedRule = false;
		let type;
		for (type in result) {
			const r = result[type];
			if (
				r.p1.x === head.x &&
				r.p1.y === head.y &&
				r.recorded === false &&
				r.remove === false
			) {
				longestMatchedRule = r;
			}
		}
		return longestMatchedRule;
	}

	addPowerup(type) {
		const $scope = this.powerups;
		let _ref = null;
		switch (type.name) {
			case "goal":
				_ref = $scope.goals;
				break;
			case "gravity":
				_ref = $scope.gravitys;
				break;
			case "slowmo":
				_ref = $scope.slowmos;
				break;
			case "boost":
				_ref = $scope.boosts;
				break;
			case "checkpoint":
				_ref = $scope.checkpoints;
				break;
			case "bomb":
				_ref = $scope.bombs;
				break;
			case "antigravity":
				_ref = $scope.antigravitys;
				break;
			case "teleport":
				_ref = $scope.teleports;
				break;
			case "helicopter":
				_ref = $scope.helicopters;
				break;
			case "truck":
				_ref = $scope.trucks;
				break;
			case "balloon":
				_ref = $scope.balloons;
				break;
			case "blob":
				_ref = $scope.blobs;
				break;
			default:
		}
		$scope.all.push(type);
		_ref.push(type);
		this.powerupsCount++;
		this.hasPowerups = true;
		this.powerupCanvasDrawn = false;
	}

	erase(id, index, prop) {
		const thato = [];
		if (prop.physics === true) {
			const values = this.physicsLines;
			const l = values.length;
			let i = l - 1;
			for (; i >= 0; i--) {
				const html = values[i];
				if (html.erase(id, index)) {
					thato.push(html);
				}
			}
		}
		if (prop.scenery === true) {
			const activeUniformsList = this.sceneryLines;
			const l = activeUniformsList.length;
			let i = l - 1;
			for (; i >= 0; i--) {
				const u = activeUniformsList[i];
				if (u.erase(id, index)) {
					thato.push(u);
				}
			}
		}
		if (prop.powerups === true) {
			const p = this.powerups.all;
			const plen = p.length;
			let i = plen - 1;
			for (; i >= 0; i--) {
				const s = p[i];
				const titleDiv = s.erase(id, index);
				if (titleDiv !== false) {
					thato.push(...titleDiv);
				}
			}
		}
		return thato;
	}

	cleanSector() {
		this.cleanSectorType("physicsLines");
		this.cleanSectorType("sceneryLines");
		this.cleanSectorType("powerups", "all");
		if (this.powerups.all.length === 0) {
			this.hasPowerups = false;
			if (this.powerupCanvas) {
				this.canvasPool.releaseCanvas(this.powerupCanvas);
				this.powerupCanvas = null;
			}
		} else {
			this.hasPowerups = true;
		}
		this.dirty = false;
	}

	cleanSectorType(repeaterId, type) {
		let data = this[repeaterId];
		if (type) {
			data = data[type];
		}
		const dataSize = data.length;
		let i = dataSize - 1;
		for (; i >= 0; i--) {
			const o = data[i];
			if (o.remove) {
				data.splice(i, 1);
			}
		}
	}

	draw() {
		const {
			scene,
			drawSectorSize,
			sceneryLines,
			physicsLines,
			canvasPool,
			settings,
		} = this;
		const camera = scene.camera;
		const zoom = camera.zoom;
		const newEdges = physicsLines;
		const c = sceneryLines;
		const size = Math.trunc(drawSectorSize * zoom);
		const canvas = canvasPool.getCanvas();
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const lineWidth = 2 * zoom > 0.5 ? 2 * zoom : 0.5;
		const sceneryLineColor = "#AAA";
		const physicsLineColor = "#000";
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.lineCap = "round";
		ctx.strokeStyle = sceneryLineColor;
		this.drawLines(c, zoom, ctx);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.lineCap = "round";
		ctx.strokeStyle = physicsLineColor;
		this.drawLines(newEdges, zoom, ctx);
		ctx.stroke();
		if (settings.developerMode) {
			ctx.beginPath();
			ctx.strokeStyle = "blue";
			ctx.rect(0, 0, size, size);
			ctx.stroke();
		}
		this.canvas = canvas;
		this.drawn = true;
	}

	drawLine(line, text) {
		let canvas = this.canvas;
		const camera = this.scene.camera;
		const ratio = camera.zoom;
		const centerLineWidth = 2 * ratio > 0.5 ? 2 * ratio : 0.5;
		let ctx = false;
		const x = this.x;
		const y = this.y;
		if (!canvas) {
			const widthHeight = Math.trunc(this.drawSectorSize * ratio);
			canvas = this.canvasPool.getCanvas();
			canvas.width = widthHeight;
			canvas.height = widthHeight;
			ctx = canvas.getContext("2d");
		}
		if (!ctx) {
			ctx = canvas.getContext("2d");
		}
		const position = line.p1;
		const lastPoint = line.p2;
		const value = (position.x - x) * ratio;
		const h = (position.y - y) * ratio;
		const dx = (lastPoint.x - x) * ratio;
		const height = (lastPoint.y - y) * ratio;
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = centerLineWidth;
		ctx.lineCap = "round";
		ctx.strokeStyle = text;
		ctx.moveTo(value, h);
		ctx.lineTo(dx, height);
		ctx.stroke();
	}

	cachePowerupSector() {
		this.powerupCanvasDrawn = true;
		const allItems = this.powerups.all;
		if (allItems.length > 0) {
			const camera = this.scene.camera;
			const zoom = camera.zoom;
			const value = Math.trunc(this.drawSectorSize * zoom);
			const top = this.powerupCanvasOffset;
			const element = this.canvasPool.getCanvas();
			element.width = value + top * zoom;
			element.height = value + top * zoom;
			const ctx = element.getContext("2d");
			ctx.clearRect(0, 0, element.width, element.height);
			this.drawPowerups(this.powerups.slowmos, zoom, ctx);
			this.drawPowerups(this.powerups.checkpoints, zoom, ctx);
			this.drawPowerups(this.powerups.boosts, zoom, ctx);
			this.drawPowerups(this.powerups.gravitys, zoom, ctx);
			this.drawPowerups(this.powerups.bombs, zoom, ctx);
			this.drawPowerups(this.powerups.goals, zoom, ctx);
			this.drawPowerups(this.powerups.antigravitys, zoom, ctx);
			this.drawPowerups(this.powerups.teleports, zoom, ctx);
			this.drawPowerups(this.powerups.helicopters, zoom, ctx);
			this.drawPowerups(this.powerups.trucks, zoom, ctx);
			this.drawPowerups(this.powerups.balloons, zoom, ctx);
			this.drawPowerups(this.powerups.blobs, zoom, ctx);
			this.powerupCanvas = element;
			if (this.settings.developerMode) {
				ctx.beginPath();
				ctx.strokeStyle = "red";
				ctx.rect(0, 0, element.width, element.height);
				ctx.stroke();
			}
		}
	}

	update() {
		const zoom = this.camera.zoom;
		this.realX = Math.trunc(this.x * zoom);
		this.realY = Math.trunc(this.y * zoom);
		this.zoom = zoom;
	}

	resetCollided() {
		const tempActivities = this.physicsLines;
		const numActivities = tempActivities.length;
		let i = numActivities - 1;
		for (; i >= 0; i--) {
			if (tempActivities[i]) {
				tempActivities[i].collided = false;
			}
		}
	}

	collide(a) {
		const p = a.parent;
		const checks = this.physicsLines;
		const len = checks.length;
		let i = len - 1;
		for (; i >= 0; i--) {
			if (checks[i]) {
				const check = checks[i];
				if (check.remove) {
					checks.splice(i, 1);
				} else {
					check.collide(a);
				}
			}
		}
		if (p.powerupsEnabled) {
			const layers = this.powerups.all;
			const count = layers.length;
			i = count - 1;
			for (; i >= 0; i--) {
				const layer = layers[i];
				if (layer.remove) {
					layers.splice(i, 1);
				} else {
					layers[i].collide(a);
				}
			}
		}
	}

	drawLines(c, width, ctx) {
		let value;
		let step;
		let size;
		let d;
		let e;
		let options;
		let position;
		const x = this.x;
		const y = this.y;
		const i = c.length;
		let len = i - 1;
		for (; len >= 0; len--) {
			e = c[len];
			if (e.remove) {
				c.splice(len, 1);
			} else {
				options = e.p1;
				position = e.p2;
				value = (options.x - x) * width;
				step = (options.y - y) * width;
				size = (position.x - x) * width;
				d = (position.y - y) * width;
				ctx.moveTo(value, step);
				ctx.lineTo(size, d);
			}
		}
	}

	drawPowerups(obj, val, callback) {
		const prev = obj.length;
		const x = this.x;
		const y = this.y;
		const bytes = (this.powerupCanvasOffset * val) / 2;
		let z = prev - 1;
		for (; z >= 0; z--) {
			const self = obj[z];
			if (self.remove) {
				obj.splice(z, 1);
			} else {
				const url = (self.x - x) * val + bytes;
				const offset = (self.y - y) * val + bytes;
				self.draw(url, offset, val, callback);
			}
		}
	}

	drawBackground(ctx, color, canvas) {
		const width = Math.trunc(this.drawSectorSize * color);
		ctx.beginPath();
		ctx.rect(0, 0, width, width);
		ctx.fillStyle = canvas;
		ctx.fill();
	}

	clear() {
		this.drawn = false;
		this.powerupCanvasDrawn = false;
		if (this.canvas) {
			this.canvas = null;
			this.canvasPool.releaseCanvas(this.canvas);
		}
		if (this.powerupCanvas) {
			this.canvasPool.releaseCanvas(this.powerupCanvas);
			this.powerupCanvas = null;
		}
	}

	close() {
		this.track = null;
		this.scene = null;
		this.settings = null;
		this.drawSectorSize = null;
		this.row = null;
		this.column = null;
		this.camera = null;
		this.zoom = null;
		this.canvasPool = null;
		this.x = null;
		this.y = null;
		this.realX = null;
		this.realY = null;
		this.lineCount = null;
		this.drawn = null;
		this.physicsLines = null;
		this.sceneryLines = null;
		this.canvas = null;
	}
}

export default Sector;
