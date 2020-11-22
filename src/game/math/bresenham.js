function bresenham(t, c, v, b, s) {
	const lines = [];
	let i = t;
	let g = c;
	const a = (b - c) / (v - t);
	const startHour = v > t ? 1 : -1;
	const strokeSize = b > c ? 1 : -1;
	let d = 0;
	lines.push(t, c);
	do {
		const reverseIsSingle = Math.floor(i / s) == Math.floor(v / s);
		const reverseValue = Math.floor(g / s) == Math.floor(b / s);
		if (reverseIsSingle && reverseValue) {
			break;
		}
		let y = 0;
		let p = 0;
		y = Math.round(Math.floor(i / s + startHour) * s);
		if (startHour < 0) {
			y = Math.round(Math.ceil((i + 1) / s + startHour) * s) - 1;
		}
		p = Math.round(c + (y - t) * a);
		let w = 0;
		let x = 0;
		x = Math.round(Math.floor(g / s + strokeSize) * s);
		if (strokeSize < 0) {
			x = Math.round(Math.ceil((g + 1) / s + strokeSize) * s) - 1;
		}
		w = Math.round(t + (x - c) / a);
		if ((y - t) ** 2 + (p - c) ** 2 < (w - t) ** 2 + (x - c) ** 2) {
			i = y;
			g = p;
			lines.push(y, p);
		} else {
			i = w;
			g = x;
			lines.push(w, x);
		}
	} while (d++ < 5e3);
	return lines;
}

export default bresenham;
