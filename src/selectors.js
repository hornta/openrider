export const selectHasSecondaryToolsMenu = (state) => {
	let hasSubMenu = false;
	for (const p of state.editor.tools) {
		if (p.selected) {
			if (p.items.length > 0) {
				hasSubMenu = true;
				break;
			}
		}
	}
	return hasSubMenu;
};
