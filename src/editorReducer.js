import { changePrimaryEditorTool, changeSecondaryEditorTool } from "./actions";
import { createReducer } from "@reduxjs/toolkit";

const editorReducer = createReducer(
	{
		tools: [
			{
				name: "line",
				icon: "icon-line",
				description: "Line tool",
				groups: {
					1: false,
				},
				items: [
					{
						name: "physics",
						icon: "icon-physics",
						description: "Physic lines",
						group: 1,
						selected: true,
					},
					{
						name: "scenery",
						icon: "icon-scenery",
						description: "Scenery lines",
						group: 1,
					},
					{
						name: "snap",
						icon: "icon-snap-off",
						selectedIcon: "icon-snap-on",
						description: "Snap",
						group: 2,
					},
				],
			},
			{
				name: "curve",
				icon: "icon-curve",
				description: "Curve tool",
				groups: {
					1: false,
				},
				items: [
					{
						name: "physics",
						icon: "icon-physics",
						description: "Physic lines",
						group: 1,
						selected: true,
					},
					{
						name: "scenery",
						icon: "icon-scenery",
						description: "Scenery lines",
						group: 1,
					},
					{
						name: "snap",
						icon: "icon-snap-off",
						selectedIcon: "icon-snap-on",
						description: "Snap",
						group: 2,
					},
				],
			},
			{
				name: "brush",
				icon: "icon-brush",
				description: "Brush tool",
				groups: {
					1: false,
				},
				items: [
					{
						name: "physics",
						icon: "icon-physics",
						description: "Physic lines",
						group: 1,
						selected: true,
					},
					{
						name: "scenery",
						icon: "icon-scenery",
						description: "Scenery lines",
						group: 1,
					},
					{
						name: "snap",
						icon: "icon-snap-off",
						selectedIcon: "icon-snap-on",
						description: "Snap",
						group: 2,
					},
				],
			},
			{
				name: "eraser",
				icon: "icon-eraser",
				description: "Eraser",
				groups: {
					1: true,
				},
				items: [
					{
						name: "physics",
						icon: "icon-physics",
						description: "Physic lines",
						group: 1,
						selected: true,
					},
					{
						name: "scenery",
						icon: "icon-scenery",
						description: "Scenery lines",
						group: 2,
						selected: true,
					},
					{
						name: "powerups",
						icon: "icon-powerups",
						description: "Powerups",
						group: 3,
						selected: true,
					},
				],
			},
			{
				name: "powerups",
				icon: "icon-powerups",
				description: "Powerups",
				groups: {
					1: false,
				},
				items: [
					{
						name: "star",
						icon: "icon-goal",
						description: "Star",
						group: 1,
						selected: true,
					},
					{
						name: "boost",
						icon: "icon-boost",
						description: "Boost",
						group: 1,
					},
					{
						name: "gravity",
						icon: "icon-gravity",
						description: "Gravity",
						group: 1,
					},
					{
						name: "slowmo",
						icon: "icon-slowmotion",
						description: "Slow motion",
						group: 1,
					},
					{
						name: "bomb",
						icon: "icon-bomb",
						description: "Bomb",
						group: 1,
					},
					{
						name: "checkpoint",
						icon: "icon-checkpoint",
						description: "Checkpoint",
						group: 1,
					},
					{
						name: "anti-gravity",
						icon: "icon-anti-gravity",
						description: "Anti-gravity",
						group: 1,
					},
					{
						name: "portal",
						icon: "icon-portal",
						description: "Portal",
						group: 1,
					},
				],
			},
			{
				name: "vehicle-swap",
				icon: "icon-vehicle-swap",
				description: "Vehicles",
				groups: {
					1: false,
				},
				items: [
					{
						name: "helicopter",
						icon: "icon-helicopter",
						description: "Helicopter",
						group: 1,
						selected: true,
					},
					{
						name: "truck",
						icon: "icon-truck",
						description: "Truck",
						group: 1,
					},
					{
						name: "blob",
						icon: "icon-blob",
						description: "Blob",
						group: 1,
					},
					{
						name: "balloon",
						icon: "icon-balloon",
						description: "Balloon",
						group: 1,
					},
				],
			},
			{
				name: "camera",
				icon: "icon-camera",
				description: "Move tool",
				items: [],
			},
		],
	},
	(builder) => {
		builder.addCase(changePrimaryEditorTool, (state, action) => {
			for (const tool of state.tools) {
				if (tool.name === action.payload) {
					tool.selected = true;
				} else {
					tool.selected = false;
				}
			}
		});
		builder.addCase(changeSecondaryEditorTool, (state, action) => {
			const primaryTool = action.payload.primaryTool;
			for (const primary of state.tools) {
				if (primary.name === primaryTool) {
					let group;
					let toolToToggle;
					for (const tool of primary.items) {
						if (tool.name === action.payload.tool) {
							group = tool.group;
							toolToToggle = tool;
							break;
						}
					}

					for (const tool of primary.items) {
						if (tool.group === group && tool.name !== toolToToggle.name) {
							tool.selected = false;
						}
					}

					let canToggle = true;

					if (
						toolToToggle.selected &&
						primary.groups &&
						primary.groups[toolToToggle.group] !== undefined &&
						primary.groups[toolToToggle.group] === false
					) {
						canToggle = false;
					}

					if (canToggle) {
						toolToToggle.selected = !toolToToggle.selected;
					}
				}
			}
		});
	}
);

export default editorReducer;
