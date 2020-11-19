import Player from "../player";

class PlayerManager {
	constructor(data) {
		this.scene = data;
		this.game = data.game;
		this.settings = data.settings;
		this.firstPlayer = null;
		this.players = [];
		this.playerLookup = {};
	}

	update() {
		const chYxis = this.players;
		const len = chYxis.length;
		let i = 0;
		for (; len > i; i++) {
			chYxis[i].update();
		}
	}

	mutePlayers() {
		for (const player of this.players) {
			player.getActiveVehicle().stopSounds();
		}
	}

	updateGamepads() {
		for (const player of this.players) {
			player.gamepad.update();
		}
	}

	createPlayer(callback, options) {
		return new Player(this.scene, options);
	}

	addPlayer(p) {
		this.players.push(p);
		this.playerLookup[p.id] = p;
	}

	checkKeys() {
		for (const player of this.players) {
			player.checkKeys();
		}
	}

	draw() {
		for (const player of this.players) {
			player.draw();
		}
	}

	getPlayerByIndex(newOwner) {
		return this.players[newOwner];
	}

	getPlayerById(playerId) {
		return this.playerLookup[playerId];
	}

	getPlayerCount() {
		return this.players.length;
	}

	reset() {
		for (const player of this.players) {
			player.reset();
		}
	}

	clear() {
		this.players = [];
		this.playerLookup = {};
		this.players.push(this.firstPlayer);
		this.playerLookup[this.firstPlayer.id] = this.firstPlayer;
	}

	_closePlayers() {
		for (const player of this.players) {
			player.close();
		}
	}

	close() {
		this._closePlayers();
		this.players = null;
		this.firstPlayer = null;
		this.playerLookup = null;
		this.scene = null;
		this.game = null;
		this.settings = null;
	}
}

export default PlayerManager;
