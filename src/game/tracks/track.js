import AntiGravity from "../sector/powerups/antiGravity";
import Balloon from "../sector/vehiclepowerups/balloon";
import Blob from "../sector/vehiclepowerups/blob";
import Bomb from "../sector/powerups/bomb";
import Boost from "../sector/powerups/boost";
import CanvasPool from "../utils/canvasPool";
import Checkpoint from "../sector/powerups/checkpoint";
import Gravity from "../sector/powerups/gravity";
import Helicopter from "../sector/vehiclepowerups/helicopter";
import PhysicsLine from "../physicsLine";
import SceneryLine from "../sceneryLine";
import Sector from "../sector/sector";
import Slowmo from "../sector/powerups/slowmo";
import Target from "../sector/powerups/target";
import Teleport from "../sector/powerups/teleport";
import Truck from "../sector/vehiclepowerups/truck";
import Vector2 from "../math/vector2";
import _ from "lodash";
import bresenham from "../math/bresenham";

const floor = Math.floor;
const $ = Math.max;
const replace = Math.min;
const sqrt = Math.sqrt;
const round = Math.round;
const character = {
	LINE: 1,
	POWERUPS: 2,
};
const self = [];

function recachePowerups(edgeLength) {
	let functor;
	for (functor in self) {
		self[functor].recache(edgeLength);
	}
}

class Track {
	constructor(data) {
		this.defaultLine = {
			p1: new Vector2(-40, 50),
			p2: new Vector2(40, 50),
		};
		this.canvas = null;
		this.canvasPool = null;
		this.targetCount = 0;
		this.dirty = false;
		this.scene = data;
		this.game = data.game;
		this.settings = data.game.settings;
		this.camera = data.camera;
		this.sectors = {
			scenerySectors: [],
			physicsSectors: [],
		};
		this.totalSectors = [];
		this.powerups = [];
		this.powerupsLookupTable = {};
		this.physicsLines = [];
		this.sceneryLines = [];
		this.targets = [];
		this.allowedVehicles = ["MTB", "BMX"];
		this.canvasPool = new CanvasPool(data);
		this.createPowerupCache();
	}

	createPowerupCache() {
		self.push(new Boost(0, 0, 0, this));
		self.push(new Slowmo(0, 0, this));
		self.push(new Bomb(0, 0, this));
		self.push(new Gravity(0, 0, 0, this));
		self.push(new Checkpoint(0, 0, this));
		self.push(new Target(0, 0, this));
		self.push(new AntiGravity(0, 0, this));
		self.push(new Teleport(0, 0, this));
		self.push(new Helicopter(0, 0, 0, this));
		self.push(new Truck(0, 0, 0, this));
		self.push(new Balloon(0, 0, 0, this));
		self.push(new Blob(0, 0, 0, this));
	}

	read(type) {
		const e = type.split("#");
		const fogsArray = e[0].split(",");
		let linesAry = [];
		let nameArguments = [];
		if (e.length > 2) {
			linesAry = e[1].split(",");
			nameArguments = e[2].split(",");
		} else if (e.length > 1) {
			nameArguments = e[1].split(",");
		}
		this.addLines(fogsArray, this.addPhysicsLine);
		this.addLines(linesAry, this.addSceneryLine);
		this.addPowerups(nameArguments);
	}

	addPowerups(t) {
		const count = t.length;
		let parts = [];
		let s = (new Date().getTime(), 0);
		for (; count > s; s++) {
			if (((parts = t[s].split(" ")), parts.length >= 2)) {
				const result = [];
				let n = parts.length;
				let index = 1;
				for (; n > index; index++) {
					const a = Number.parseInt(parts[index], 32);
					result.push(a);
				}
				const name = round(result[0]);
				const options = round(result[1]);
				let p = null;
				switch (parts[0]) {
					case "B":
						p = new Boost(name, options, result[2], this);
						this.addPowerup(p);
						break;
					case "S":
						p = new Slowmo(name, options, this);
						this.addPowerup(p);
						break;
					case "O":
						p = new Bomb(name, options, this);
						this.addPowerup(p);
						break;
					case "G":
						p = new Gravity(name, options, result[2], this);
						this.addPowerup(p);
						break;
					case "C":
						p = new Checkpoint(name, options, this);
						this.addPowerup(p);
						break;
					case "T":
						p = new Target(name, options, this);
						this.addTarget(p);
						this.addPowerup(p);
						break;
					case "A":
						p = new AntiGravity(name, options, this);
						this.addPowerup(p);
						break;
					case "V": {
						const testMeshes = result[2];
						let desc = result[3];
						const comment = this.settings.vehiclePowerup.minTime;
						const x = this.settings.vehiclePowerup.maxTime;
						desc = desc || comment;
						desc = replace(desc, x);
						desc = $(desc, comment);
						switch (testMeshes) {
							case 1:
								p = new Helicopter(name, options, desc, this);
								break;
							case 2:
								p = new Truck(name, options, desc, this);
								break;
							case 3:
								p = new Balloon(name, options, desc, this);
								break;
							case 4:
								p = new Blob(name, options, desc, this);
								break;
							default:
								continue;
						}
						this.addPowerup(p);
						break;
					}
					case "W": {
						const data = result[0];
						const y = result[1];
						const buffer = result[2];
						const message = result[3];
						n = new Teleport(data, y, this);
						const test = new Teleport(buffer, message, this);
						n.addOtherPortalRef(test);
						test.addOtherPortalRef(n);
						this.addPowerup(n);
						this.addPowerup(test);
						break;
					}
					default:
				}
			}
		}
	}

	addTarget(target) {
		this.dirty = true;
		this.targetCount++;
		this.targets.push(target);
	}

	addPowerup(x) {
		const scenerySectors = this.sectors.scenerySectors;
		const physicsSectors = this.sectors.physicsSectors;
		const p = x.x;
		const n = x.y;
		const bannerHidden = this.settings.drawSectorSize;
		const bannedWords = this.settings.physicsSectorSize;
		this.addRef(p, n, x, character.POWERUPS, physicsSectors, bannedWords);
		const a = this.addRef(
			p,
			n,
			x,
			character.POWERUPS,
			scenerySectors,
			bannerHidden
		);
		return (
			a !== false && this.totalSectors.push(a),
			x !== null &&
				(this.powerups.push(x), x.id && (this.powerupsLookupTable[x.id] = x)),
			x
		);
	}

	addLines(lines, callback) {
		for (const line of lines) {
			const parts = line.split(" ");
			if (parts.length > 3) {
				for (let index = 0; parts.length - 2 > index; index += 2) {
					const a = Number.parseInt(parts[index], 32);
					const c = Number.parseInt(parts[index + 1], 32);
					const b = Number.parseInt(parts[index + 2], 32);
					const dg = Number.parseInt(parts[index + 3], 32);
					const res = a + c + b + dg;
					if (!Number.isNaN(res)) {
						callback.call(this, a, c, b, dg);
					}
				}
			}
		}
	}

	addPhysicsLine(t, x, y, w) {
		t = round(t);
		x = round(x);
		y = round(y);
		w = round(w);
		const base = y - t;
		const height = w - x;
		const sqrt8 = sqrt(base ** 2 + height ** 2);

		if (sqrt8 >= 2) {
			const line = new PhysicsLine(t, x, y, w);
			this.addPhysicsLineToTrack(line);
		}
	}

	addPhysicsLineToTrack(node) {
		const height = this.settings.drawSectorSize;
		const p1 = node.p1;
		const p2 = node.p2;
		const x = p1.x;
		const y1 = p1.y;
		const x2 = p2.x;
		const y2 = p2.y;
		const g = bresenham(x, y1, x2, y2, height);
		const detail = this.sectors.scenerySectors;
		const length = g.length;
		let index = 0;
		for (; length > index; index = index + 2) {
			const n = g[index];
			const f = g[index + 1];
			const e = this.addRef(n, f, node, character.LINE, detail, height);
			if (e !== false) {
				this.totalSectors.push(e);
			}
		}
		const s = this.settings.physicsSectorSize;
		const m = bresenham(x, y1, x2, y2, s);
		const isCreditCard1 = this.sectors.physicsSectors;
		const l = m.length;
		index = 0;
		for (; l > index; index = index + 2) {
			const n = m[index];
			const f = m[index + 1];
			this.addRef(n, f, node, character.LINE, isCreditCard1, s);
		}
		this.physicsLines.push(node);
		return node;
	}

	addSceneryLine(index, x, y, w) {
		index = round(index);
		x = round(x);
		y = round(y);
		w = round(w);
		const base = y - index;
		const height = w - x;
		const sqrt8 = sqrt(base ** 2 + height ** 2);

		if (sqrt8 >= 2) {
			const line = new SceneryLine(index, x, y, w);
			this.addSceneryLineToTrack(line);
		}
	}

	addSceneryLineToTrack(node) {
		const height = this.settings.drawSectorSize;
		const p1 = node.p1;
		const p2 = node.p2;
		const x = p1.x;
		const y = p1.y;
		const x2 = p2.x;
		const y2 = p2.y;
		const g = bresenham(x, y, x2, y2, height);
		const detail = this.sectors.scenerySectors;
		const l = g.length;

		for (let index = 0; l > index; index += 2) {
			const p = g[index];
			const n = g[index + 1];
			const e = this.addRef(p, n, node, character.LINE, detail, height);
			if (e !== false) {
				this.totalSectors.push(e);
			}
		}
		this.sceneryLines.push(node);
		return node;
	}

	addRef(e, r, s, name, x, n) {
		const url = floor(e / n);
		const index = floor(r / n);
		let eo1 = false;
		if (undefined === x[url]) {
			x[url] = [];
		}
		if (undefined === x[url][index]) {
			const sector = new Sector(url, index, this);
			x[url][index] = sector;
			eo1 = sector;
		}
		switch (name) {
			case character.LINE:
				x[url][index].addLine(s);
				s.addSectorReference(x[url][index]);
				break;
			case character.POWERUPS:
				x[url][index].addPowerup(s);
				s.addSectorReference(x[url][index]);
				break;
			default:
		}
		this.dirty = true;
		return eo1;
	}

	cleanTrack() {
		this.cleanLines();
		this.cleanPowerups();
	}

	cleanLines() {
		const commonBlockProperties = this.physicsLines;
		const result = this.sceneryLines;
		const length_ = commonBlockProperties.length;
		const rows = result.length;
		let index = length_ - 1;
		for (; index >= 0; index--) {
			if (commonBlockProperties[index].remove) {
				commonBlockProperties.splice(index, 1);
			}
		}
		let index_ = rows - 1;
		for (; index_ >= 0; index_--) {
			if (result[index_].remove) {
				result.splice(index_, 1);
			}
		}
	}

	cleanPowerups() {
		const controls = this.powerups;
		const _tooltips = this.targets;
		const l = this.targets.length;
		const distance = controls.length;
		let id = (this.powerupsLookupTable, distance - 1);
		for (; id >= 0; id--) {
			if (controls[id].remove) {
				controls.splice(id, 1);
			}
		}
		let index = l - 1;
		for (; index >= 0; index--) {
			if (_tooltips[index].remove) {
				_tooltips.splice(index, 1);
			}
		}
		this.targetCount = _tooltips.length;
	}

	updatePowerupState(value) {
		const e = value._powerupsConsumed;
		this.resetPowerups();
		const targets = e.targets;
		const psNode = e.checkpoints;
		const backwardNode = e.misc;
		this.setPowerupStates(targets);
		this.setPowerupStates(psNode);
		this.setPowerupStates(backwardNode);
	}

	setPowerupStates(e) {
		const messageObject = this.powerupsLookupTable;
		let t;
		for (t in e) {
			const target = e[t];
			const parameters = messageObject[target];
			if (parameters.remove && parameters.id) {
				delete messageObject[target];
				delete e[target];
			}
			parameters.hit = true;
			parameters.sector.powerupCanvasDrawn = false;
		}
	}

	getCode() {
		this.cleanTrack();
		const reactions = this.powerups;
		const stdout = this.physicsLines;
		const delta = this.sceneryLines;
		let result = "";
		const l = stdout.length;
		const deltaSize = delta.length;
		const count = reactions.length;
		if (l > 0) {
			let index;
			for (index in stdout) {
				const chunk = stdout[index];
				if (!chunk.recorded) {
					result = `${result}${chunk.p1.x.toString(32)} ${chunk.p1.y.toString(
						32
					)}${chunk.getCode(this)},`;
				}
			}
			result = result.slice(0, -1);
			for (index in stdout) {
				stdout[index].recorded = false;
			}
		}
		if (((result = `${result}#`), deltaSize > 0)) {
			let index;
			for (index in delta) {
				const chunk = delta[index];
				if (!chunk.recorded) {
					result = `${result}${chunk.p1.x.toString(32)} ${chunk.p1.y.toString(
						32
					)}${chunk.getCode(this)},`;
				}
			}
			result = result.slice(0, -1);
			for (index in delta) {
				delta[index].recorded = false;
			}
		}
		if (((result = `${result}#`), count > 0)) {
			let reactionId;
			for (reactionId in reactions) {
				const reaction = reactions[reactionId];
				const bondType = reaction.getCode();
				if (bondType) {
					result = `${result}${bondType},`;
				}
			}
			result = result.slice(0, -1);
		}
		return result;
	}

	resetPowerups() {
		const targets = this.powerups;
		let index;
		for (index in targets) {
			const target = targets[index];
			if (target.hit && !target.remove) {
				target.hit = false;
				target.sector.powerupCanvasDrawn = false;
			}
		}
	}

	addDefaultLine() {
		const input = this.defaultLine;
		const p1 = input.p1;
		const p2 = input.p2;
		this.addPhysicsLine(p1.x, p1.y, p2.x, p2.y);
	}

	erase(x, index_, id) {
		this.dirty = true;
		const scope = x.x - index_;
		const n = x.y - index_;
		const text = x.x + index_;
		const e = x.y + index_;
		const height = $(scope, text);
		const index = replace(scope, text);
		const k = $(n, e);
		const f = replace(n, e);
		const width = this.settings.drawSectorSize;
		const mid = floor(height / width);
		const metersPerLine = floor(index / width);
		const randomLineNumber = floor(k / width);
		const y = floor(f / width);
		const MODULE_NOTICES = this.sectors.scenerySectors;
		const data = [];
		let moduleSlug = metersPerLine;
		for (; mid >= moduleSlug; moduleSlug++) {
			let type = y;
			for (; randomLineNumber >= type; type++) {
				if (MODULE_NOTICES[moduleSlug] && MODULE_NOTICES[moduleSlug][type]) {
					data.push(MODULE_NOTICES[moduleSlug][type].erase(x, index_, id));
				}
			}
		}
		return _.flatten(data);
	}

	undraw() {
		const yscales = (performance.now(), this.totalSectors);
		let scaleid;
		for (scaleid in yscales) {
			const yscale = yscales[scaleid];
			if (yscale.drawn) {
				yscale.clear(true);
			}
		}
		const zoom = this.camera.zoom;
		recachePowerups(Math.max(zoom, 1));
		this.canvasPool.update();
	}

	collide(a) {
		const moduleV2 = this.settings.physicsSectorSize;
		const index = Math.floor(a.position.x / moduleV2 - 0.5);
		const index_ = Math.floor(a.position.y / moduleV2 - 0.5);
		const matrix = this.sectors.physicsSectors;
		if (matrix[index] && matrix[index][index_]) {
			matrix[index][index_].resetCollided();
		}
		if (matrix[index + 1] && matrix[index + 1][index_]) {
			matrix[index + 1][index_].resetCollided();
		}
		if (matrix[index + 1] && matrix[index + 1][index_ + 1]) {
			matrix[index + 1][index_ + 1].resetCollided();
		}
		if (matrix[index] && matrix[index][index_ + 1]) {
			matrix[index][index_ + 1].resetCollided();
		}
		if (matrix[index] && matrix[index][index_]) {
			matrix[index][index_].collide(a);
		}
		if (matrix[index + 1] && matrix[index + 1][index_]) {
			matrix[index + 1][index_].collide(a);
		}
		if (matrix[index + 1] && matrix[index + 1][index_ + 1]) {
			matrix[index + 1][index_ + 1].collide(a);
		}
		if (matrix[index] && matrix[index][index_ + 1]) {
			matrix[index][index_ + 1].collide(a);
		}
	}

	getDrawSector(delta, index) {
		const width = this.settings.drawSectorSize;
		const mid = floor(delta / width);
		const m0 = floor(index / width);
		const MPermMove = this.sectors.scenerySectors;
		let flipx = false;
		return (
			typeof MPermMove[mid] != "undefined" &&
				typeof MPermMove[mid][m0] != "undefined" &&
				(flipx = MPermMove[mid][m0]),
			flipx
		);
	}

	draw() {
		const scene = this.scene;
		const camera = scene.camera;
		const canvas = scene.screen;
		const context = scene.game.canvas.getContext("2d");
		const scale = camera.zoom;
		const position = camera.position;
		const currentCenter = scene.screen.center;
		const width = this.settings.drawSectorSize * scale;
		const radius = (position.x * scale) / width;
		const windowHeight = (position.y * scale) / width;
		const widthProportions = canvas.width / width;
		const propertiesWidth = canvas.height / width;
		const scrollTop = propertiesWidth / 2;
		let w = widthProportions / 2;
		const maxX = radius - w - 1;
		const levelBegin = windowHeight - scrollTop - 1;
		const x2 = radius + w;
		const t = windowHeight + scrollTop;
		context.imageSmoothingEnabled = false;
		context.mozImageSmoothingEnabled = false;
		context.oImageSmoothingEnabled = false;
		context.webkitImageSmoothingEnabled = false;
		const y = radius * width - currentCenter.x;
		const h = windowHeight * width - currentCenter.y;
		for (const sector of this.totalSectors) {
			const row = sector.row;
			const column = sector.column;
			if (
				(sector.dirty && sector.cleanSector(),
				column >= maxX && x2 >= column && row >= levelBegin && t >= row)
			) {
				if (sector.drawn === false) {
					sector.draw();
				}
				if (sector.hasPowerups) {
					if (!sector.powerupCanvasDrawn) {
						sector.cachePowerupSector();
					}
				}
				let scrollX = column * width - y;
				let top = row * width - h;
				if (
					((scrollX = 0 | scrollX),
					(top = 0 | top),
					context.drawImage(sector.canvas, scrollX, top, width, width),
					sector.hasPowerups && sector.powerupCanvasDrawn)
				) {
					w = sector.powerupCanvasOffset * scale;
					context.drawImage(
						sector.powerupCanvas,
						scrollX - w / 2,
						top - w / 2,
						width + w,
						width + w
					);
				}
			} else if (sector.drawn) {
				sector.clear();
			}
		}
	}

	closeSectors() {
		const conns = this.totalSectors;
		const l = conns.length;
		let index = 0;
		for (; l > index; index++) {
			conns[index].close();
		}
	}

	close() {
		this.scene = null;
		this.closeSectors();
		this.totalSectors = null;
		this.canvasPool = null;
		this.sectors = null;
		this.physicsLines = null;
		this.sceneryLines = null;
		this.powerups = null;
		this.camera = null;
	}
}

export default Track;
