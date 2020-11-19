const SoundManager = function (data) {
	this.scene = data;
	this.sounds = {};
};
SoundManager.prototype = {
	sounds: null,
	update() {
		const s = this.scene;
		const ss = s.settings;
		createjs.Sound.muted = Boolean(
			s.state.paused || ss.soundsEnabled === false
		);
	},
	setVolume(sound, vol) {
		if (this.sounds[sound]) {
			this.sounds[sound].volume = vol;
		}
	},
	muted: false,
	mute_all() {
		const sounds = this.sounds;
		let i;
		for (i in sounds) {
			if (sounds.hasOwnProperty(i)) {
				sounds[i].volume = 0;
			}
		}
		this.muted = true;
	},
	stop_all() {
		const sounds = this.sounds;
		let i;
		for (i in sounds) {
			if (sounds.hasOwnProperty(i)) {
				sounds[i].volume = 0;
				sounds[i].stop();
			}
		}
	},
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
	},
	stop(id) {
		if (this.sounds[id]) {
			this.sounds[id].stop();
			this.sounds[id] = null;
		}
	},
	close() {
		this.sounds = null;
	},
};
export default SoundManager;
