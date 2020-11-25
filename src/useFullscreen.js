import { useDispatch, useSelector } from "react-redux";
import { toggleFullscreen } from "./actions";
import { useEffect } from "react";

const useFullscreen = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const onKeyDown = (e) => {
			if (e.code === "KeyF") {
				dispatch(toggleFullscreen());
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	});

	return useSelector((state) => state.game.fullscreen);
};

export default useFullscreen;
