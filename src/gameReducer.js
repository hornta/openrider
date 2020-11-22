import { createReducer } from "@reduxjs/toolkit";
import { toggleFullscreen } from "./actions";

const gameReducer = createReducer(
	{
		fullscreen: false,
	},
	(builder) => {
		builder.addCase(toggleFullscreen, (state) => {
			state.fullscreen = !state.fullscreen;
		});
	}
);

export default gameReducer;
