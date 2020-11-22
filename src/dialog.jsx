import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Dialog = ({ title, children, isOpen = false, onRequestClose }) => {
	useEffect(() => {
		const onKeyDown = (e) => {
			if (e.code === "Escape") {
				onRequestClose();
			}
		};
		if (isOpen) {
			document.addEventListener("keydown", onKeyDown);
		}
		return () => {
			if (isOpen) {
				document.removeEventListener("keydown", onKeyDown);
			}
		};
	}, [isOpen, onRequestClose]);

	if (!isOpen) {
		return null;
	}
	return (
		<div className="absolute left-0 right-0 bottom-0 top-0 bg-black bg-opacity-75 flex items-center">
			<div className="lg:w-6/12 w-3/4 mx-auto bg-white space-y-3 rounded-md shadow-xl">
				<div className="flex items-center p-3 pb-0">
					<h1 className="text-xl flex-grow font-bold">{title}</h1>
					<button
						className="focus:outline-none text-3xl w-8"
						onClick={onRequestClose}
					>
						×
					</button>
				</div>
				<div className="px-3">{children}</div>
				<div className="flex justify-end space-x-4 pb-2 pr-2">
					<button
						className="focus:outline-none bg-gray-700 hover:bg-gray-900 rounded-full text-white p-1 px-6"
						onClick={onRequestClose}
					>
						Cancel
					</button>
					<button className="focus:outline-none hover:bg-green-700 bg-green-500 rounded-full text-white p-1 px-6">
						Clear
					</button>
				</div>
			</div>
		</div>
	);
};

Dialog.propTypes = {
	title: PropTypes.string,
	children: PropTypes.any,
	onRequestClose: PropTypes.func,
	isOpen: PropTypes.bool,
};

export default Dialog;
