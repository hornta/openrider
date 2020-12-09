import store from "../../store";

const selectIsMuted = (state) => state.game.muted || state.game.paused;

class SoundManager {
	constructor(assets) {
		this.audioCtx = new AudioContext();
		this.masterGain = this.audioCtx.createGain();
		this.masterGain.connect(this.audioCtx.destination);
		this.buffers = new Map();
		this.activeSounds = new Map();
		this.assets = assets;

		this.isMuted = selectIsMuted(store.getState());
		store.subscribe(() => {
			const previousMuted = this.isMuted;
			const currentMuted = selectIsMuted(store.getState());
			if (previousMuted !== currentMuted) {
				this.isMuted = currentMuted;
				if (this.isMuted) {
					this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
				} else {
					this.masterGain.gain.setValueAtTime(1, this.audioCtx.currentTime);
				}
			}
		});
	}

	async loadBuffer(asset) {
		const response = await fetch(asset.url);
		const arrayBuffer = await response.arrayBuffer();
		return this.audioCtx.decodeAudioData(arrayBuffer);
	}

	async load() {
		const loadBufferPromises = [];
		for (const asset of this.assets) {
			loadBufferPromises.push(this.loadBuffer(asset));
		}

		const decodedData = await Promise.all(loadBufferPromises);
		for (const [index, data] of decodedData.entries()) {
			this.buffers.set(this.assets[index].id, data);
		}
	}

	play(id, volume = 1) {
		if (this.activeSounds.has(id)) {
			const { gain } = this.activeSounds.get(id);
			gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
			return;
		}
		const gain = this.audioCtx.createGain();
		gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
		gain.connect(this.masterGain);
		const buffer = this.buffers.get(id);
		const source = this.audioCtx.createBufferSource();
		source.buffer = buffer;
		source.connect(gain);
		source.start(0);
		this.activeSounds.set(id, { source, gain });
		source.addEventListener("ended", () => {
			this.activeSounds.delete(id);
			source.disconnect(gain);
			gain.disconnect(this.masterGain);
		});
	}

	stop(id) {
		if (this.activeSounds.has(id)) {
			this.activeSounds.get(id).source.stop();
		}
	}

	close() {
		this.sounds = null;
	}
}

export default SoundManager;
