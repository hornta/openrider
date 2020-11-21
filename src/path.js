class Path {
	constructor() {
		this.start = null;
		this.end = null;
		this.verticies = [];
	}

	build(inputs) {
		let input = inputs.pop();
		this.start = input.p1;
		this.end = input.p2;
		this.verticies.push(input);
		const length = inputs.length;
		let i = length - 1;
		for (; i >= 0; i--) {
			input = inputs[i];
			const p1 = input.p1;
			const p2 = input.p2;
			if (this.start.x === p2.x && this.start.y === p2.y) {
				this.verticies.unshift(input);
				this.start = input.p1;
				inputs.splice(i, 1);
			} else if (this.end.x === p1.x && this.end.y === p1.y) {
				this.verticies.push(input);
				this.end = input.p2;
				inputs.splice(i, 1);
			}
		}
	}
}
export default Path;
