function curvedDivision(props, a, val) {
	function b(x, y, key, e, xml, data) {
		result.push(x, y);
		callback(x, y, key, e, xml, data, 0);
		result.push(xml, data);
	}
	function callback(d, start, f, value, e, v, r) {
		if (!(r > MIN_HEIGHT)) {
			const root = (d + f) / 2;
			let p = (start + value) / 2;
			const files = (f + e) / 2;
			const result = (value + v) / 2;
			const x = (root + files) / 2;
			const i = (p + result) / 2;
			let a2 = e - d;
			let b2 = v - start;
			const rr = Math.abs((f - e) * b2 - (value - v) * a2);
			// MAX_INT32
			if (rr > Number.EPSILON) {
				if (PCdotN * (a2 * a2 + b2 * b2) >= rr * rr) {
					if (mY > pY) {
						result.push(x, i);
						return;
					}
					p = Math.abs(
						Math.atan2(v - value, e - f) - Math.atan2(value - start, f - d)
					);
					if ((p >= Math.PI && (p = 2 * Math.PI - p), pY > p)) {
						result.push(x, i);
						return;
					}
				}
			} else if (
				((a2 = x - (d + e) / 2),
				(b2 = i - (start + v) / 2),
				PCdotN >= a2 * a2 + b2 * b2)
			) {
				result.push(x, i);
				return;
			}
			callback(d, start, root, p, x, i, r + 1);
			callback(x, i, files, result, e, v, r + 1);
		}
	}
	const value = props.x;
	const n = props.y;
	const x2 = a.x;
	const y2 = a.y;
	const x = val.x;
	const y = val.y;
	const result = [];
	const PCdotN = 0.25;
	const MIN_HEIGHT = 10;
	// const MAX_INT32 = 1e-30;
	const pY = 0;
	const mY = 0.01;
	b(value, n, x2, y2, x, y);
	return result;
}

export default curvedDivision;
