function beizerToPolyLine(point1, point2, point3) {
	const polyline = [];
	const PCdotN = 0.25;
	const MIN_HEIGHT = 10;
	// const MAX_INT32 = 1e-30;
	const pY = 0;
	const mY = 0.01;

	function callback(p1, p2, p3, r) {
		if (!(r > MIN_HEIGHT)) {
			const root = (p1.x + p2.x) / 2;
			let p = (p1.y + p2.y) / 2;
			const files = (p2.x + p3.x) / 2;
			const rrr = (p2.y + p3.y) / 2;
			const x = (root + files) / 2;
			const i = (p + rrr) / 2;
			let a2 = p3.x - p1.x;
			let b2 = p3.y - p1.y;
			const rr = Math.abs((p2.x - p3.x) * b2 - (p2.y - p3.y) * a2);
			// MAX_INT32
			if (rr > Number.EPSILON) {
				if (PCdotN * (a2 * a2 + b2 * b2) >= rr * rr) {
					if (mY > pY) {
						polyline.push(x, i);
						return;
					}
					p = Math.abs(
						Math.atan2(p3.y - p2.y, p3.x - p2.x) -
							Math.atan2(p2.y - p1.y, p2.x - p1.x)
					);
					if (p >= Math.PI) {
						p = 2 * Math.PI - p;
					}
					if (pY > p) {
						polyline.push(x, i);
						return;
					}
				}
			} else {
				a2 = x - (p1.x + p3.x) / 2;
				b2 = i - (p1.y + p3.y) / 2;

				if (PCdotN >= a2 * a2 + b2 * b2) {
					polyline.push(x, i);
					return;
				}
			}

			callback(p1.x, p1.y, root, p, x, i, r + 1);
			callback(x, i, files, rrr, p3.x, p3.y, r + 1);
		}
	}

	polyline.push(point1.x, point1.y);
	callback(point1, point2, point3, 0);
	polyline.push(point3.x, point3.y);
	return polyline;
}

export default beizerToPolyLine;
