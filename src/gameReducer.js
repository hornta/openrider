import {
	blur,
	focus,
	toggleFullscreen,
	toggleMuted,
	togglePaused,
} from "./actions";
import { createReducer } from "@reduxjs/toolkit";

const gameReducer = createReducer(
	{
		fullscreen: false,
		paused: false,
		muted: false,
		focused: true,
	},
	(builder) => {
		builder.addCase(toggleFullscreen, (state) => {
			state.fullscreen = !state.fullscreen;
		});

		builder.addCase(togglePaused, (state, action) => {
			if (action.payload === undefined) {
				state.paused = !state.paused;
			} else {
				state.paused = action.payload;
			}
		});

		builder.addCase(toggleMuted, (state) => {
			state.muted = !state.muted;
		});

		builder.addCase(focus, (state) => {
			state.focused = true;
		});

		builder.addCase(blur, (state) => {
			state.focused = false;
		});
	}
);

export default gameReducer;
