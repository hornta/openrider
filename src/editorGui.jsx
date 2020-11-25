import "tippy.js/dist/tippy.css";
import Dialog from "./dialog";
import PropTypes from "prop-types";
import React from "react";
import Tippy from "@tippyjs/react";
import { useDispatch, useSelector } from "react-redux";
import { changePrimaryEditorTool, changeSecondaryEditorTool } from "./actions";
import { selectHasSecondaryToolsMenu } from "./selectors";

const EditorGui = ({
	onClear,
	onZoomIn,
	onZoomOut,
	onResetZoom,
	onToggleFullscreen,
}) => {
	const dispatch = useDispatch();
	const tools = useSelector((state) => state.editor.tools);
	const hasSubMenu = useSelector(selectHasSecondaryToolsMenu);
	return (
		<>
			<div
				className={`flex h-12 absolute left-0 right-0 ${
					hasSubMenu ? "ml-24" : "ml-12"
				}`}
			>
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
				{tools.map(({ icon, name, description, selected }) => {
					return (
						<Tippy key={name} content={description} placement="right">
							<button
								className={`flex justify-center items-center focus:outline-none ${
									selected ? "bg-green-500" : "hover:bg-green-300"
								}`}
								onClick={() => dispatch(changePrimaryEditorTool(name))}
							>
								<div className={`icon icon-44x44 ${icon}`}></div>
							</button>
						</Tippy>
					);
				})}
			</div>
			{tools.map((tool) => {
				if (tool.selected && tool.items.length > 0) {
					return (
						<div
							key={tool.name}
							className="flex flex-col bg-green-100 w-12 absolute h-full justify-center ml-12"
						>
							{tool.items.map(
								({ icon, name, description, selected, selectedIcon }) => {
									return (
										<Tippy key={name} content={description} placement="right">
											<button
												className={`flex justify-center items-center justify-center items-center focus:outline-none ${
													selected ? "bg-green-500" : "hover:bg-green-300"
												}`}
												onClick={() =>
													dispatch(
														changeSecondaryEditorTool({
															primaryTool: tool.name,
															tool: name,
														})
													)
												}
											>
												<div
													className={`icon icon-44x44 ${
														selectedIcon
															? selected
																? selectedIcon
																: icon
															: icon
													}`}
												></div>
											</button>
										</Tippy>
									);
								}
							)}
						</div>
					);
				}
				return null;
			})}
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
