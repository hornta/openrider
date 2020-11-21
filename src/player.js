import BMX from "./vehicles/bmx";
import Balloon from "./balloon";
import Explosion from "./explosion";
import GamePad from "./gamePad";
import Helicopter from "./helicopter";
import MTB from "./vehicles/mtb";
import Truck from "./truck";
import Vector2 from "./math/vector2";

let nextProfileItemId = 0;

function vehicleStringifyReplacer(key, value) {
	switch (key) {
		case "parent":
		case "player":
		case "scene":
		case "settings":
		case "masses":
		case "springs":
		case "focalPoint":
		case "gamepad":
			// eslint-disable-next-line unicorn/no-useless-undefined
			return undefined;
		case "explosion":
			return false;
		default:
			return value;
	}
}

class Player {
	constructor(options, value) {
		this.id = nextProfileItemId++;
		this._scene = options;
		this._game = options.game;
		this._user = value;
		this._settings = options.settings;
		let vehicles = options.settings.startVehicle;
		if (options.settings.track) {
			vehicles = options.settings.track.vehicle;
		}
		this._baseVehicleType = vehicles;
		this.gamepad = new GamePad(options);
		this._ghost = false;
		this._color = value.color ? value.color : "#000000";
		this.setDefaults();
		this.createBaseVehicle(new Vector2(0, 35), 1, new Vector2(0, 0));
	}

	getCheckpointCount() {
		return this._checkpoints.length;
	}

	setDefaults() {
		this._baseVehicle = false;
		this._tempVehicleType = null;
		this._tempVehicle = false;
		this._tempVehicleTicks = 0;
		this._tempVehicleOptions = null;
		this._addCheckpoint = false;
		this._checkpoints = [];
		this._crashed = false;
		this.explosion = false;
		this.explosionTicks = 0;
		this._opacity = 1;
		this.complete = false;
		this._powerupsConsumed = {
			checkpoints: [],
			targets: [],
			misc: [],
		};
	}

	hasCheckpoints() {
		return this._checkpoints.length > 0;
	}

	setColor(value) {
		this._color = value;
	}

	dead() {
		if (((this._crashed = true), this._ghost === false)) {
			const e = this._scene;
			const settings = e.settings;
			const description = e.message;
			e.state.playerAlive = this.isAlive();
			if (this._checkpoints.length > 0) {
				if (settings.mobile) {
					description.show(
						"Tap to go to checkpoint!",
						false,
						"#000000",
						"#FFFFFF"
					);
				} else {
					description.show(
						"Press Enter For Checkpoint",
						false,
						"#000000",
						"#FFFFFF"
					);
				}
			} else if (settings.mobile) {
				description.show("Tap to Restart!", false, "#000000", "#FFFFFF");
			} else {
				description.show("Press Enter To Restart", false, "#000000", "#FFFFFF");
			}
		}
	}

	setAsGhost() {
		this._ghost = true;
	}

	isGhost() {
		return this._ghost;
	}

	isAlive() {
		return !this._crashed;
	}

	getTargetsHit() {
		return this._powerupsConsumed.targets.length;
	}

	getGamepad() {
		return this.gamepad;
	}

	setBaseVehicle(p2) {
		this._baseVehicleType = p2;
		this.reset();
	}

	createBaseVehicle(clickRepeater, e, islongclick) {
		if (this._tempVehicle) {
			this._tempVehicle.stopSounds();
		}
		this._baseVehicle = new types[this._baseVehicleType](
			this,
			clickRepeater,
			e,
			islongclick
		);
		this._tempVehicle = false;
		this._tempVehicleType = false;
		this._tempVehicleTicks = 0;
	}

	setTempVehicle(NAME, next, i, val) {
		if (this._tempVehicleOptions && this._tempVehicleOptions.type === NAME) {
			next = this._tempVehicleOptions.ticks + next;
		}
		this._tempVehicleOptions = {
			type: NAME,
			ticks: next,
			position: i,
			direction: val,
		};
	}

	createTempVehicle(type, end, base, filter) {
		if (this._tempVehicleOptions) {
			const options = this._tempVehicleOptions;
			type = options.type;
			end = options.ticks;
			base = options.position;
			filter = options.direction;
			this._tempVehicleOptions = null;
		}
		if (this._tempVehicleType === type) {
			this._tempVehicleTicks += end;
		} else {
			this.getActiveVehicle().stopSounds();
			this.explosion = new Explosion(base, this._scene);
			this.explosionTicks = 45;
			this._tempVehicleType = type;
			this._tempVehicle = new types[type](this, base, filter);
			this._tempVehicleTicks = end;
		}
	}

	update() {
		if (this.complete === false) {
			let prevPageButtonSprite = this._baseVehicle;
			if (this._tempVehicleOptions) {
				this.createTempVehicle();
			}
			if (this._tempVehicleTicks > 0) {
				prevPageButtonSprite = this._tempVehicle;
				if (this._crashed === false) {
					this._tempVehicleTicks--;
				}
				if (this._tempVehicleTicks <= 0 && this._crashed === false) {
					this.explosionTicks = 45;
					this.explosion = new Explosion(
						this._tempVehicle.focalPoint.pos,
						this._scene
					);
					this.createBaseVehicle(
						this._tempVehicle.focalPoint.pos,
						this._tempVehicle.dir,
						this._tempVehicle.masses[0].velocity
					);
					prevPageButtonSprite = this._baseVehicle;
				}
			}
			if (this.explosionTicks > 0) {
				this.explosionTicks--;
				this.explosion.update();
			}
			prevPageButtonSprite.update();
			if (this._addCheckpoint) {
				this._createCheckpoint();
				this._addCheckpoint = false;
			}
		}
	}

	isInFocus() {
		const camera = this._scene.camera;
		let e = false;
		camera.playerFocus && camera.playerFocus === this && (e = true);
		return e;
	}

	updateOpacity() {
		let opacity = 1;
		const camera = this._scene.camera;
		if (camera.playerFocus && camera.playerFocus !== this) {
			const flatnessDb = this.getDistanceBetweenPlayers(camera.playerFocus);
			if (flatnessDb < 1200) {
				opacity = Math.min(flatnessDb / 500, 1);
			}
		}
		this._opacity = opacity;
	}

	drawName() {
		const s = this._scene;
		const parBgColor = (s.settings, this._color);
		const tempPathText = this._user.d_name;
		const base = s.game;
		const zoom = s.camera.zoom;
		const p = base.pixelRatio;
		const canvas = base.canvas;
		const ctx = canvas.getContext("2d");
		const opacity = this._opacity;
		const model = this.getActiveVehicle();
		const center = model.focalPoint.pos.toScreen(s);
		ctx.globalAlpha = opacity;
		ctx.beginPath();
		ctx.fillStyle = parBgColor;
		ctx.moveTo(center.x, center.y - 40 * zoom);
		ctx.lineTo(center.x - 5 * zoom, center.y - 50 * zoom);
		ctx.lineTo(center.x + 5 * zoom, center.y - 50 * zoom);
		ctx.lineTo(center.x, center.y - 40 * zoom);
		ctx.fill();
		const textsize = 9 * p * Math.max(zoom, 1);
		ctx.font = `${textsize}pt helsinki`;
		ctx.textAlign = "center";
		ctx.fillStyle = parBgColor;
		ctx.fillText(tempPathText, center.x, center.y - 60 * zoom);
		ctx.globalAlpha = 1;
	}

	draw() {
		this.updateOpacity();
		let barline = this._baseVehicle;
		if (this._tempVehicleTicks > 0) {
			barline = this._tempVehicle;
		}
		if (this.explosionTicks > 0) {
			this.explosion.draw(this.explosionTicks / 100);
		}
		barline.draw();
		if (this.isGhost()) {
			this.drawName();
		}
	}

	checkKeys() {
		const self = this.gamepad;
		const e = this._ghost;
		const scene = this._scene;
		if (
			(e === false &&
				(self.areKeysDown() && !this._crashed && scene.play(),
				self.isButtonDown("restart") &&
					((scene.restartTrack = true), self.setButtonUp("restart")),
				(self.isButtonDown("up") ||
					self.isButtonDown("down") ||
					self.isButtonDown("left") ||
					self.isButtonDown("right")) &&
					scene.camera.focusOnMainPlayer()),
			self.isButtonDown("enter") &&
				(this.gotoCheckpoint(), self.setButtonUp("enter")),
			self.isButtonDown("backspace"))
		) {
			const backspace = self.getButtonDownOccurances("backspace");
			this.removeCheckpoint(backspace);
			self.setButtonUp("backspace");
		}
	}

	getDistanceBetweenPlayers(posnum) {
		const childCard = posnum.getActiveVehicle();
		const model = this.getActiveVehicle();
		const base = childCard.focalPoint.pos.x - model.focalPoint.pos.x;
		const height = childCard.focalPoint.pos.y - model.focalPoint.pos.y;
		return Math.sqrt(base ** 2 + height ** 2);
	}

	getActiveVehicle() {
		let t = this._baseVehicle;
		this._tempVehicleTicks > 0 && (t = this._tempVehicle);
		return t;
	}

	_createCheckpoint() {
		const t = {};
		if (this._tempVehicleTicks > 0) {
			t._tempVehicleType = this._tempVehicleType;
			t._tempVehicle = JSON.stringify(
				this._tempVehicle,
				vehicleStringifyReplacer
			);
			t._tempVehicleTicks = this._tempVehicleTicks;
		} else {
			t._baseVehicleType = this._baseVehicleType;
			t._baseVehicle = JSON.stringify(
				this._baseVehicle,
				vehicleStringifyReplacer
			);
		}
		t._powerupsConsumed = JSON.stringify(this._powerupsConsumed);
		t._crashed = this._crashed;
		this._checkpoints.push(t);
	}

	setCheckpointOnUpdate() {
		this._addCheckpoint = true;
	}

	crashed() {
		this._crashed = true;
	}

	gotoCheckpoint() {
		const snapshot = this.gamepad;
		const nodes = snapshot.replaying;
		const self = this._scene;
		if (this._checkpoints.length > 0) {
			const requestV1 = this._checkpoints[this._checkpoints.length - 1];
			if (requestV1._tempVehicle) {
				this._baseVehicle.stopSounds();
				let input = this._tempVehicle;
				if (this._tempVehicleType !== requestV1._tempVehicleType) {
					input = new types[requestV1._tempVehicleType](this, {
						x: 0,
						y: 0,
					});
				}
				const size = JSON.parse(requestV1._tempVehicle);
				googleImageSize(input, size);
				this._tempVehicle = input;
				this._tempVehicleType = requestV1._tempVehicleType;
				this._tempVehicleTicks = requestV1._tempVehicleTicks;
				input.updateCameraFocalPoint();
			} else {
				const input = this._baseVehicle;
				const size = JSON.parse(requestV1._baseVehicle);
				googleImageSize(input, size);
				if (this._tempVehicle) {
					this._tempVehicle.stopSounds();
				}
				this._baseVehicle = input;
				this._tempVehicleTicks = 0;
				this._tempVehicleType = false;
				input.updateCameraFocalPoint();
			}
			if (
				((this._powerupsConsumed = JSON.parse(requestV1._powerupsConsumed)),
				(this._crashed = requestV1._crashed),
				nodes === false)
			) {
				const o = self.settings;
				self.state.playerAlive = this.isAlive();
				if (self.settings.mobile) {
					self.message.show("Tap to resume", 5, "#826cdc", "#FFFFFF");
				} else {
					self.message.show(
						"Press Backspace To Go Back Further",
						5,
						"#826cdc",
						"#FFFFFF"
					);
				}
				self.track.updatePowerupState(this);
				if (o.waitAtCheckpoints) {
					self.state.playing = false;
				}
				self.camera.focusOnMainPlayer();
			}
			if (self.camera.playerFocus === this) {
				self.camera.fastforward();
			}
		} else if (nodes === false) {
			this.restartScene();
		}
	}

	restartScene() {
		const snapshot = this.gamepad;
		const nodes = snapshot.replaying;
		if (nodes === false) {
			this._scene.restartTrack = true;
		}
	}

	removeCheckpoint(name) {
		if (this._checkpoints.length > 1) {
			let MODULE_NAME = 0;
			for (; name > MODULE_NAME; MODULE_NAME++) {
				this._checkpoints.pop();
			}
			this.gotoCheckpoint();
		} else {
			this.restartScene();
		}
	}

	close() {
		this.id = null;
		this._scene = null;
		this._game = null;
		this._user = null;
		this._settings = null;
		this._baseVehicleType = null;
		this.gamepad.close();
		this.gamepad = null;
		this._baseVehicle = null;
		this._tempVehicleType = null;
		this._tempVehicle = null;
		this._tempVehicleTicks = null;
		this._addCheckpoint = null;
		this._checkpoints = null;
		this._crashed = null;
		this.explosion = null;
		this.explosionTicks = null;
		this._powerupsConsumed = null;
	}

	reset() {
		if (this._tempVehicle) {
			this._tempVehicle.stopSounds();
		}
		this._baseVehicle.stopSounds();
		this.setDefaults();
		this.createBaseVehicle(new Vector2(0, 35), 1, new Vector2(0, 0));
		this.gamepad.reset();
		this._scene.state.playerAlive = this.isAlive();
	}
}

const types = {};
types.BMX = BMX;
types.MTB = MTB;
types.HELI = Helicopter;
types.TRUCK = Truck;
types.BALLOON = Balloon;
types.BLOB = Blob;
function equals(result, value) {
	for (const name in value) {
		try {
			result[name] =
				value[name].constructor == Object
					? equals(result[name], value[name])
					: value[name];
		} catch {
			result[name] = value[name];
		}
	}
	return result;
}
const googleImageSize = equals;

export default Player;
