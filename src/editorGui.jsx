import "tippy.js/dist/tippy.css";
import PropTypes from "prop-types";
import React from "react";
import Tippy from "@tippyjs/react";
import Dialog from "./dialog";

const EditorGui = ({
	onClear,
	onZoomIn,
	onZoomOut,
	onResetZoom,
	onToggleFullscreen,
}) => {
	return (
		<>
			<div className="flex h-12 absolute ml-12 left-0 right-0">
				<button
					className="focus:outline-none h-full px-3 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
					title="Clear track"
					onClick={onClear}
				>
					<div className="icon icon-32x32 icon-clear"></div>
					<div className="hidden lg:block">Clear</div>
				</button>

				<button
					className="focus:outline-none h-full px-2 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
					title="Import track"
				>
					<div className="icon icon-32x32 icon-import"></div>
					<div className="hidden lg:block">Import</div>
				</button>

				<button
					className="focus:outline-none h-full px-2 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
					title="Export track"
				>
					<div className="icon icon-32x32 icon-export"></div>
					<div className="hidden lg:block">Export</div>
				</button>

				<button
					className="focus:outline-none h-full px-2 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
					title="Upload track"
				>
					<div className="icon icon-32x32 icon-upload"></div>
					<div className="hidden lg:block">Upload</div>
				</button>

				<button
					className="focus:outline-none h-full px-2 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
					title="Hotkeys"
				>
					<div className="icon icon-32x32 icon-hotkeys"></div>
					<div className="hidden lg:block">Hotkeys</div>
				</button>

				<button
					className="focus:outline-none h-full px-2 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
					title="Controls"
				>
					<div className="icon icon-32x32 icon-controls"></div>
					<div className="hidden lg:block">Controls</div>
				</button>

				<div className="focus:outline-none flex flex-grow justify-end">
					<button
						onClick={onZoomOut}
						className="focus:outline-none h-full px-2 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
					>
						<div className="icon icon-32x32 icon-zoom-out" />
					</button>
					<button
						onClick={onResetZoom}
						className="focus:outline-none h-full px-2 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
					>
						100&nbsp;%
					</button>
					<button
						onClick={onZoomIn}
						className="focus:outline-none h-full px-2 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
					>
						<div className="icon icon-32x32 icon-zoom-in" />
					</button>
					<button
						onClick={onToggleFullscreen}
						className="focus:outline-none h-full px-2 flex items-center space-x-1 cursor-pointer hover:bg-green-200"
						title="Toggle fullscreen"
					>
						<div className="icon icon-32x32 icon-enter-fullscreen"></div>
					</button>
				</div>
			</div>
			<div className="flex flex-col bg-green-100 w-12 absolute h-full justify-center">
				<button className="focus:outline-none sideButton sideButton-top sideButton_straightLineTool">
					<div className="icon icon-44x44 icon-line"></div>
				</button>
				<button className="focus:outline-none sideButton sideButton_curvedLineTool">
					<div className="icon icon-44x44 icon-curve"></div>
				</button>
				<button className="focus:outline-none sideButton sideButton_brushTool">
					<div className="icon icon-44x44 icon-brush"></div>
				</button>
				<button className="focus:outline-none sideButton sideButton_eraserTool">
					<div className="icon icon-44x44 icon-eraser"></div>
				</button>
				<button className="focus:outline-none sideButton sideButton_powerupTool active">
					<div className="icon icon-44x44 icon-powerups"></div>
				</button>
				<button className="focus:outline-none sideButton sideButton_powerupTool">
					<div className="icon icon-44x44 icon-vehicle-swap"></div>
				</button>
				<button className="focus:outline-none sideButton sideButton-bottom sideButton_cameraTool">
					<div className="icon icon-44x44 icon-camera"></div>
				</button>
			</div>
		</>
	);
};

EditorGui.propTypes = {
	onClear: PropTypes.func,
	onZoomIn: PropTypes.func,
	onZoomOut: PropTypes.func,
	onResetZoom: PropTypes.func,
	onToggleFullscreen: PropTypes.func,
};

export default EditorGui;
