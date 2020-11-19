import Explosion from "./explosion";
import Vector2 from "./math/vector2";

const Vehicle = function () {};
Vehicle.prototype.init = function (obj) {
	this.player = obj;
	this.scene = obj._scene;
	this.gamepad = obj.gamepad;
	this.settings = obj._settings;
	this.gravity = new Vector2(0, 0.3);
	this.complete = false;
	this.alive = true;
	this.crashed = false;
	this.dir = 1;
	this.ghost = false;
	this.ragdoll = false;
	this.explosion = false;
	this.speed = 0;
	this.powerupsEnabled = true;
	this.createCosmetics();
};
Vehicle.prototype.explode = function () {
	this.scene.sound.play("bomb_sound", 1);
	this.explosion = new Explosion(this.masses[0].pos, this.scene)();
	this.dead();
};
Vehicle.prototype.createCosmetics = function () {
	const result = this.player._user;
	const persistedDto = result.cosmetics;
	this.cosmetics = persistedDto;
};
Vehicle.prototype.updateSpeed = function () {
	this.speed = Math.abs(
		Math.round(this.focalPoint.vel.x + this.focalPoint.vel.y)
	);
};
Vehicle.prototype.close = function () {
	this.scene = null;
	this.settings = null;
	this.gravity = null;
	this.speed = null;
	this.cosmetics = null;
	this.explosion = null;
	this.ragdoll = null;
	this.ghost = null;
	this.crashed = null;
	this.alive = null;
	this.gamepad = null;
};
Vehicle.prototype.dead = function () {
	this.stopSounds();
	this.player.dead();
	this.crashed = true;
	this.alive = false;
};
Vehicle.prototype.moveVehicle = function (left, top) {
	const d = this.masses;
	const numActivities = d.length;
	let i = numActivities - 1;
	for (; i >= 0; i--) {
		d[i].pos.x += left;
		d[i].pos.y += top;
		d[i].old.x += left;
		d[i].old.y += top;
	}
};
Vehicle.prototype.stopSounds = function () {};

export default Vehicle;
