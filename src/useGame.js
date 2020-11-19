import GameContext from "./GameContext";
import { useContext } from "react";

const useGame = () => {
	const game = useContext(GameContext);
	return game;
};

export default useGame;
