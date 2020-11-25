import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameManager from "./game/gameManager";
import PropTypes from "prop-types";
import gameSettings from "./game/gameSettings";
import { selectHasSecondaryToolsMenu } from "./selectors";
import { togglePaused } from "./actions";
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
	return (
		<div className="relative" ref={gameContainer}>
			{children}
			<div
				className={`app bg-white${
					containerClassName ? ` ${containerClassName}` : ""
				}`}
			>
				<div className="h-full" id="canvas" />
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
