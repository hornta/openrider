import store from "../../store";

class SoundManager {
	constructor(data) {
		this.scene = data;
		this.sounds = {};
		this.muted = false;
	}

	update() {
		const scene = this.scene;
		const ss = scene.settings;
		createjs.Sound.muted = Boolean(
			store.getState().game.paused || ss.soundsEnabled === false
		);
	}

	setVolume(sound, vol) {
		if (this.sounds[sound]) {
			this.sounds[sound].volume = vol;
		}
	}

	mute_all() {
		const sounds = this.sounds;
		let i;
		for (i in sounds) {
			if (sounds.hasOwnProperty(i)) {
				sounds[i].volume = 0;
			}
		}
		this.muted = true;
	}

	stop_all() {
		const sounds = this.sounds;
		let i;
		for (i in sounds) {
			if (sounds.hasOwnProperty(i)) {
				sounds[i].volume = 0;
				sounds[i].stop();
			}
		}
	}

	play(name, value) {
		if (
			((value === null || typeof value == "undefined") && (value = 1),
			this.sounds[name])
		) {
			this.sounds[name].volume = value;
		} else if (this.scene.settings.soundsEnabled) {
			const sound = createjs.Sound.play(name, {
				volume: value,
			});
			sound.addEventListener("complete", () => {
				this.sounds[name] = null;
			});
			this.sounds[name] = sound;
		}
	}

	stop(id) {
		if (this.sounds[id]) {
			this.sounds[id].stop();
			this.sounds[id] = null;
		}
	}

	close() {
		this.sounds = null;
	}
}

export default SoundManager;
