import { createAction } from "@reduxjs/toolkit";

export const toggleFullscreen = createAction("toggleFullscreen");
export const togglePaused = createAction("togglePaused");
export const changePrimaryEditorTool = createAction("changePrimaryEditorTool");
export const changeSecondaryEditorTool = createAction(
	"changeSecondaryEditorTool"
);
