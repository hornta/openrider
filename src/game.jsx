import React, { useEffect, useRef } from "react";
import { blur, focus, togglePaused } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import GameManager from "./game/gameManager";
import PropTypes from "prop-types";
import gameSettings from "./game/gameSettings";
import { selectHasSecondaryToolsMenu } from "./selectors";
import useFullscreen from "./useFullscreen";

const Game = ({ scene, children, containerClassName }) => {
	const gameManager = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		gameManager.current = new GameManager();
		gameManager.current.init(scene, gameSettings);
		const onResize = () => {
			gameManager.current.resize();
		};
		const onKeyDown = (e) => {
			if (e.code === "Space") {
				dispatch(togglePaused());
			}
		};
		window.addEventListener("resize", onResize);
		window.addEventListener("keydown", onKeyDown);

		return () => {
			gameManager.current.close();
			gameManager.current = null;
			window.removeEventListener("resize", onResize);
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [scene, dispatch]);

	const hasSubMenu = useSelector(selectHasSecondaryToolsMenu);
	useEffect(() => {
		gameManager.current.resize();
	}, [hasSubMenu]);

	const gameContainer = useRef();
	const fullscreen = useFullscreen();
	useEffect(() => {
		const classList = gameContainer.current.classList;
		if (fullscreen) {
			classList.add("fixed", "left-0", "right-0", "bottom-0", "top-0");
			classList.remove("relative");
		} else {
			classList.remove("fixed", "left-0", "right-0", "bottom-0", "top-0");
			classList.add("relative");
			// extra resize to prevent issue with
			// width from scrollbar
			gameManager.current.resize();
		}
		gameManager.current.resize();
	}, [fullscreen]);

	const isFocused = useSelector((state) => state.game.focused);
	useEffect(() => {
		const handleDocumentClick = (e) => {
			if (gameContainer.current.contains(e.target)) {
				dispatch(focus());
			} else {
				dispatch(blur());
			}
		};
		document.addEventListener("click", handleDocumentClick);
		return () => {
			document.removeEventListener("click", handleDocumentClick);
		};
	}, [dispatch]);

	useEffect(() => {
		const handleWindowBlur = () => {
			dispatch(blur());
		};

		window.addEventListener("blur", handleWindowBlur);
		return () => {
			document.removeEventListener("blur", handleWindowBlur);
		};
	}, [dispatch]);

	return (
		<div className="relative" ref={gameContainer}>
			{children}
			<div
				className={`app bg-white${
					containerClassName ? ` ${containerClassName}` : ""
				}`}
			>
				<div className="h-full" id="canvas" />
				{!isFocused && (
					<div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-90">
						Click to resume
					</div>
				)}
			</div>
		</div>
	);
};

Game.propTypes = {
	scene: PropTypes.string,
	children: PropTypes.any,
	containerClassName: PropTypes.string,
};

export default Game;
