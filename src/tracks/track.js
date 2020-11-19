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

function Track(data) {
	this.scene = data;
	this.game = data.game;
	this.settings = data.game.settings;
	this.camera = data.camera;
	this.sectors = {};
	this.sectors.drawSectors = [];
	this.sectors.physicsSectors = [];
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
Track.prototype = {
	defaultLine: {
		p1: new Vector2(-40, 50),
		p2: new Vector2(40, 50),
	},
	game: null,
	scene: null,
	camera: null,
	canvas: null,
	canvasPool: null,
	settings: null,
	physicsLines: null,
	sceneryLines: null,
	powerups: null,
	targets: null,
	targetCount: 0,
	sectors: null,
	totalSectors: null,
	allowedVehicles: null,
	dirty: false,
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
	},
	recachePowerups(edgeLength) {
		let functor;
		for (functor in self) {
			self[functor].recache(edgeLength);
		}
	},
	read(type) {
		const e = type.split("#");
		const fogsArray = e[0].split(",");
		let linesAry = [];
		let nameArgs = [];
		if (e.length > 2) {
			linesAry = e[1].split(",");
			nameArgs = e[2].split(",");
		} else if (e.length > 1) {
			nameArgs = e[1].split(",");
		}
		this.addLines(fogsArray, this.addPhysicsLine);
		this.addLines(linesAry, this.addSceneryLine);
		this.addPowerups(nameArgs);
	},
	addPowerups(t) {
		const count = t.length;
		let parts = [];
		let s = (new Date().getTime(), 0);
		for (; count > s; s++) {
			if (((parts = t[s].split(" ")), parts.length >= 2)) {
				const result = [];
				let n = parts.length;
				let i = 1;
				for (; n > i; i++) {
					const a = parseInt(parts[i], 32);
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
						const index = result[1];
						const buffer = result[2];
						const msg = result[3];
						n = new Teleport(data, index, this);
						const test = new Teleport(buffer, msg, this);
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
	},
	addTarget(target) {
		this.dirty = true;
		this.targetCount++;
		this.targets.push(target);
	},
	addPowerup(x) {
		const translate = this.sectors.drawSectors;
		const isCreditCard1 = this.sectors.physicsSectors;
		const p = x.x;
		const n = x.y;
		const bannerHidden = this.settings.drawSectorSize;
		const bannedWords = this.settings.physicsSectorSize;
		this.addRef(p, n, x, character.POWERUPS, isCreditCard1, bannedWords);
		const a = this.addRef(p, n, x, character.POWERUPS, translate, bannerHidden);
		return (
			a !== false && this.totalSectors.push(a),
			x !== null &&
				(this.powerups.push(x), x.id && (this.powerupsLookupTable[x.id] = x)),
			x
		);
	},
	addLines(lines, callback) {
		const count = lines.length;
		let mid = 0;
		for (; count > mid; mid++) {
			const buf = lines[mid].split(" ");
			const l = buf.length;
			if (l > 3) {
				let i = 0;
				for (; l - 2 > i; i = i + 2) {
					const a = parseInt(buf[i], 32);
					const c = parseInt(buf[i + 1], 32);
					const b = parseInt(buf[i + 2], 32);
					const dg = parseInt(buf[i + 3], 32);
					const res = a + c + b + dg;
					if (!isNaN(res)) {
						callback.call(this, a, c, b, dg);
					}
				}
			}
		}
	},
	addPhysicsLine(t, x, y, w) {
		t = round(t);
		x = round(x);
		y = round(y);
		w = round(w);
		const base = y - t;
		const height = w - x;
		const sqrt8 = sqrt(base ** 2 + height ** 2);
		let r;
		if (sqrt8 >= 2) {
			r = new PhysicsLine(t, x, y, w);
			this.addPhysicsLineToTrack(r);
		}
		return r;
	},
	addPhysicsLineToTrack(node) {
		const height = this.settings.drawSectorSize;
		const p1 = node.p1;
		const p2 = node.p2;
		const x = p1.x;
		const y1 = p1.y;
		const x2 = p2.x;
		const y2 = p2.y;
		const g = bresenham(x, y1, x2, y2, height);
		const detail = this.sectors.drawSectors;
		const length = g.length;
		let i = 0;
		for (; length > i; i = i + 2) {
			const n = g[i];
			const f = g[i + 1];
			const e = this.addRef(n, f, node, character.LINE, detail, height);
			if (e !== false) {
				this.totalSectors.push(e);
			}
		}
		const s = this.settings.physicsSectorSize;
		const m = bresenham(x, y1, x2, y2, s);
		const isCreditCard1 = this.sectors.physicsSectors;
		const l = m.length;
		i = 0;
		for (; l > i; i = i + 2) {
			const n = m[i];
			const f = m[i + 1];
			this.addRef(n, f, node, character.LINE, isCreditCard1, s);
		}
		this.physicsLines.push(node);
		return node;
	},
	addSceneryLine(i, x, y, w) {
		i = round(i);
		x = round(x);
		y = round(y);
		w = round(w);
		const base = y - i;
		const height = w - x;
		const sqrt8 = sqrt(base ** 2 + height ** 2);
		let rect;
		if (sqrt8 >= 2) {
			rect = new SceneryLine(i, x, y, w);
			this.addSceneryLineToTrack(rect);
		}
		return rect;
	},
	addSceneryLineToTrack(node) {
		const height = this.settings.drawSectorSize;
		const p1 = node.p1;
		const p2 = node.p2;
		const x = p1.x;
		const y = p1.y;
		const x2 = p2.x;
		const y2 = p2.y;
		const g = bresenham(x, y, x2, y2, height);
		const detail = this.sectors.drawSectors;
		const l = g.length;
		let i = 0;
		for (; l > i; i = i + 2) {
			const p = g[i];
			const n = g[i + 1];
			const e = this.addRef(p, n, node, character.LINE, detail, height);
			if (e !== false) {
				this.totalSectors.push(e);
			}
		}
		this.sceneryLines.push(node);
		return node;
	},
	addRef(e, r, s, name, x, n) {
		const url = floor(e / n);
		const i = floor(r / n);
		let eo1 = false;
		undefined === x[url] && (x[url] = []);
		if (undefined === x[url][i]) {
			const u = new Sector(url, i, this);
			x[url][i] = u;
			eo1 = u;
		}
		switch (name) {
			case character.LINE:
				x[url][i].addLine(s);
				s.addSectorReference(x[url][i]);
				break;
			case character.POWERUPS:
				x[url][i].addPowerup(s);
				s.addSectorReference(x[url][i]);
				break;
			default:
		}
		this.dirty = true;
		return eo1;
	},
	cleanTrack() {
		this.cleanLines();
		this.cleanPowerups();
	},
	cleanLines() {
		const commonBlockProps = this.physicsLines;
		const result = this.sceneryLines;
		const len = commonBlockProps.length;
		const rows = result.length;
		let i = len - 1;
		for (; i >= 0; i--) {
			if (commonBlockProps[i].remove) {
				commonBlockProps.splice(i, 1);
			}
		}
		let j = rows - 1;
		for (; j >= 0; j--) {
			if (result[j].remove) {
				result.splice(j, 1);
			}
		}
	},
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
		let i = l - 1;
		for (; i >= 0; i--) {
			if (_tooltips[i].remove) {
				_tooltips.splice(i, 1);
			}
		}
		this.targetCount = _tooltips.length;
	},
	updatePowerupState(value) {
		const e = value._powerupsConsumed;
		this.resetPowerups();
		const targets = e.targets;
		const psNode = e.checkpoints;
		const backwardNode = e.misc;
		this.setPowerupStates(targets);
		this.setPowerupStates(psNode);
		this.setPowerupStates(backwardNode);
	},
	setPowerupStates(e) {
		const msgObj = this.powerupsLookupTable;
		let t;
		for (t in e) {
			const target = e[t];
			const params = msgObj[target];
			if (params.remove && params.id) {
				delete msgObj[target];
				delete e[target];
			}
			params.hit = true;
			params.sector.powerupCanvasDrawn = false;
		}
	},
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
			let i;
			for (i in stdout) {
				const chunk = stdout[i];
				if (!chunk.recorded) {
					result = `${result}${chunk.p1.x.toString(32)} ${chunk.p1.y.toString(
						32
					)}${chunk.getCode(this)},`;
				}
			}
			result = result.slice(0, -1);
			for (i in stdout) {
				stdout[i].recorded = false;
			}
		}
		if (((result = `${result}#`), deltaSize > 0)) {
			let i;
			for (i in delta) {
				const chunk = delta[i];
				if (!chunk.recorded) {
					result = `${result}${chunk.p1.x.toString(32)} ${chunk.p1.y.toString(
						32
					)}${chunk.getCode(this)},`;
				}
			}
			result = result.slice(0, -1);
			for (i in delta) {
				delta[i].recorded = false;
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
	},
	resetPowerups() {
		const targets = this.powerups;
		let i;
		for (i in targets) {
			const target = targets[i];
			if (target.hit && !target.remove) {
				target.hit = false;
				target.sector.powerupCanvasDrawn = false;
			}
		}
	},
	addDefaultLine() {
		const input = this.defaultLine;
		const p1 = input.p1;
		const p2 = input.p2;
		this.addPhysicsLine(p1.x, p1.y, p2.x, p2.y);
	},
	erase(x, i, id) {
		this.dirty = true;
		const scope = x.x - i;
		const n = x.y - i;
		const text = x.x + i;
		const e = x.y + i;
		const height = $(scope, text);
		const index = replace(scope, text);
		const k = $(n, e);
		const f = replace(n, e);
		const width = this.settings.drawSectorSize;
		const mid = floor(height / width);
		const metersPerLine = floor(index / width);
		const randomLineNumber = floor(k / width);
		const y = floor(f / width);
		const MODULE_NOTICES = this.sectors.drawSectors;
		const data = [];
		let moduleSlug = metersPerLine;
		for (; mid >= moduleSlug; moduleSlug++) {
			let type = y;
			for (; randomLineNumber >= type; type++) {
				if (MODULE_NOTICES[moduleSlug] && MODULE_NOTICES[moduleSlug][type]) {
					data.push(MODULE_NOTICES[moduleSlug][type].erase(x, i, id));
				}
			}
		}
		return _.flatten(data);
	},
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
		this.recachePowerups(Math.max(zoom, 1));
		this.canvasPool.update();
	},
	collide(a) {
		const modV2 = this.settings.physicsSectorSize;
		const i = Math.floor(a.pos.x / modV2 - 0.5);
		const j = Math.floor(a.pos.y / modV2 - 0.5);
		const matrix = this.sectors.physicsSectors;
		if (matrix[i] && matrix[i][j]) {
			matrix[i][j].resetCollided();
		}
		if (matrix[i + 1] && matrix[i + 1][j]) {
			matrix[i + 1][j].resetCollided();
		}
		if (matrix[i + 1] && matrix[i + 1][j + 1]) {
			matrix[i + 1][j + 1].resetCollided();
		}
		if (matrix[i] && matrix[i][j + 1]) {
			matrix[i][j + 1].resetCollided();
		}
		if (matrix[i] && matrix[i][j]) {
			matrix[i][j].collide(a);
		}
		if (matrix[i + 1] && matrix[i + 1][j]) {
			matrix[i + 1][j].collide(a);
		}
		if (matrix[i + 1] && matrix[i + 1][j + 1]) {
			matrix[i + 1][j + 1].collide(a);
		}
		if (matrix[i] && matrix[i][j + 1]) {
			matrix[i][j + 1].collide(a);
		}
	},
	getDrawSector(delta, index) {
		const width = this.settings.drawSectorSize;
		const mid = floor(delta / width);
		const m0 = floor(index / width);
		const MPermMove = this.sectors.drawSectors;
		let flipx = false;
		return (
			typeof MPermMove[mid] != "undefined" &&
				typeof MPermMove[mid][m0] != "undefined" &&
				(flipx = MPermMove[mid][m0]),
			flipx
		);
	},
	draw() {
		const scene = this.scene;
		const camera = scene.camera;
		const canvas = scene.screen;
		const ctx = scene.game.canvas.getContext("2d");
		const scale = camera.zoom;
		const pos = camera.position;
		const currentCenter = scene.screen.center;
		const width = this.settings.drawSectorSize * scale;
		const radius = (pos.x * scale) / width;
		const windowHeight = (pos.y * scale) / width;
		const widthProportions = canvas.width / width;
		const propsWidth = canvas.height / width;
		const scrollTop = propsWidth / 2;
		let w = widthProportions / 2;
		const maxX = radius - w - 1;
		const levelBegin = windowHeight - scrollTop - 1;
		const x2 = radius + w;
		const t = windowHeight + scrollTop;
		ctx.imageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.oImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
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
					ctx.drawImage(sector.canvas, scrollX, top, width, width),
					sector.hasPowerups && sector.powerupCanvasDrawn)
				) {
					w = sector.powerupCanvasOffset * scale;
					ctx.drawImage(
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
	},
	closeSectors() {
		const conns = this.totalSectors;
		const l = conns.length;
		let i = 0;
		for (; l > i; i++) {
			conns[i].close();
		}
	},
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
	},
};
export default Track;
