import "./index.css";
import App from "./app.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.querySelector("#root")
);

if (import.meta.hot) {
	import.meta.hot.accept();
}
