function formatNumber(n) {
	n = parseInt(n, 10);
	const m = Math.floor(n / 6e4);
	let value = (n - 6e4 * m) / 1e3;
	value = value.toFixed(2);
	value < 10 && (value = `0${value}`);
	return `${m}:${value}`;
}
export default formatNumber;
