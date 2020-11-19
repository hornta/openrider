import Explosion from "./explosion";
import Vector2 from "./math/vector2";

class Vehicle {
	constructor(player) {
		this.player = player;
		this.scene = player._scene;
		this.gamepad = player.gamepad;
		this.settings = player._settings;
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
	}

	explode() {
		this.scene.sound.play("bomb_sound", 1);
		this.explosion = new Explosion(this.masses[0].pos, this.scene)();
		this.dead();
	}

	createCosmetics() {
		const result = this.player._user;
		const persistedDto = result.cosmetics;
		this.cosmetics = persistedDto;
	}

	updateSpeed() {
		this.speed = Math.abs(
			Math.round(this.focalPoint.vel.x + this.focalPoint.vel.y)
		);
	}

	close() {
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
	}

	dead() {
		this.player.dead();
		this.crashed = true;
		this.alive = false;
	}

	moveVehicle(left, top) {
		const d = this.masses;
		const numActivities = d.length;
		let i = numActivities - 1;
		for (; i >= 0; i--) {
			d[i].pos.x += left;
			d[i].pos.y += top;
			d[i].old.x += left;
			d[i].old.y += top;
		}
	}
}

export default Vehicle;
