import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import Editor from "./editor.jsx";
import Game from "./game.jsx";
import Header from "./header.jsx";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<Route exact path="/" component={Game} />
				<Route path="/editor" component={Editor} />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.querySelector("#root")
);

if (import.meta.hot) {
	import.meta.hot.accept();
}
