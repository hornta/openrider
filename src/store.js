import { combineReducers, configureStore } from "@reduxjs/toolkit";
import editorReducer from "./editorReducer";
import gameReducer from "./gameReducer";

const store = configureStore({
	reducer: combineReducers({
		game: gameReducer,
		editor: editorReducer,
	}),
});

export default store;
