import React, { useEffect, useRef, useState } from "react";
import Dialog from "./dialog.jsx";
import EditorGui from "./editorGui.jsx";
import GameManager from "./game/gameManager";
import GameSettings from "./game/gameSettings";
import { useDispatch, useSelector } from "react-redux";
import { toggleFullscreen } from "./actions.js";

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

	useEffect(() => {
		gameManager.current = new GameManager();
		gameManager.current.addListener("stateChange", (e) => {
			console.log(e);
		});
		gameManager.current.init("Editor", GameSettings);
		const onResize = () => {
			gameManager.current.resize();
		};
		window.addEventListener("resize", onResize);

		return () => {
			gameManager.current.close();
			gameManager.current = null;
			window.removeEventListener("resize", onResize);
		};
	}, []);

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

	const fullscreen = useSelector((state) => state.game.fullscreen);

	const gameContainer = useRef();
	useEffect(() => {
		const classList = gameContainer.current.classList;
		if (fullscreen) {
			classList.add("fixed", "left-0", "right-0", "bottom-0", "top-0");
			classList.remove("relative");
		} else {
			classList.remove("fixed", "left-0", "right-0", "bottom-0", "top-0");
			classList.add("relative");
		}
		gameManager.current.resize();
	}, [fullscreen]);

	return (
		<div className="relative" ref={gameContainer}>
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
			<div className="app ml-12 pt-12 bg-white" id="canvas"></div>
		</div>
	);
};

export default Editor;
