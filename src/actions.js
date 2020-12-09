import { createAction } from "@reduxjs/toolkit";

export const toggleFullscreen = createAction("toggleFullscreen");
export const togglePaused = createAction("togglePaused");
export const changePrimaryEditorTool = createAction("changePrimaryEditorTool");
export const changeSecondaryEditorTool = createAction(
	"changeSecondaryEditorTool"
);
export const toggleMuted = createAction("toggleMute");
export const focus = createAction("focus");
export const blur = createAction("blur");
