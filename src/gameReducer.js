import { toggleFullscreen, togglePaused } from "./actions";
import { createReducer } from "@reduxjs/toolkit";

const gameReducer = createReducer(
	{
		fullscreen: false,
		paused: false,
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
	}
);

export default gameReducer;
