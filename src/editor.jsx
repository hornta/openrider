import React, { useRef, useState } from "react";
import Dialog from "./dialog.jsx";
import EditorGui from "./editorGui.jsx";
import Game from "./game.jsx";
import { toggleFullscreen } from "./actions.js";
import { useDispatch, useSelector } from "react-redux";
import { selectHasSecondaryToolsMenu } from "./selectors.js";

const dialogs = {
	clear: {
		title: "Clear track",
		component: "Are you sure you want to clear the track?",
	},
};

const Editor = () => {
	const gameManager = useRef(null);
	const [dialog, setDialog] = useState();
	const dispatch = useDispatch();

	const handleClear = () => {
		setDialog(dialogs.clear);
	};

	const handleImport = () => {
		setDialog(dialogs.import);
	};

	const handleExport = () => {
		setDialog(dialogs.export);
	};

	const handleControls = () => {
		setDialog(dialogs.controls);
	};

	const handleZoomOut = () => {
		gameManager.current.command("decrease zoom");
	};

	const handleZoomIn = () => {
		gameManager.current.command("increase zoom");
	};

	const handleResetZoomIn = () => {
		gameManager.current.command("reset zoom");
	};

	const handleToggleFullScreen = () => {
		dispatch(toggleFullscreen());
	};

	const hasSubMenu = useSelector(selectHasSecondaryToolsMenu);

	return (
		<Game
			scene="Editor"
			containerClassName={`pt-12 ${hasSubMenu ? "ml-24" : "ml-12"}`}
		>
			<EditorGui
				onClear={handleClear}
				onZoomIn={handleZoomIn}
				onZoomOut={handleZoomOut}
				onResetZoom={handleResetZoomIn}
				onToggleFullscreen={handleToggleFullScreen}
			/>
			<Dialog title="Clear track" onAccept={() => {}} onRequestClose={() => {}}>
				Are you sure you want to clear the track?
			</Dialog>
		</Game>
	);
};

export default Editor;
