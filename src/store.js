import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameReducer";

const store = configureStore({
	reducer: combineReducers({
		game: gameReducer,
	}),
});

export default store;
