var babel = require("@babel/core");
const fs = require('fs');
const path = require('path')

const out = path.resolve(__dirname, '../out')
const processFilesDirectory = __dirname + '/../originals';
const dirEntries = fs.readdirSync(processFilesDirectory, { withFileTypes: true });
const jsFiles = dirEntries.filter(d => d.isFile() && d.name.endsWith('.js'))

for(const entry of jsFiles) {
	const code = fs.readFileSync(path.resolve(processFilesDirectory, entry.name))
	babel.transform(code, {
		plugins: ['transform-amd-to-commonjs']
	}, function(err, result) {
		if(err) {
			throw new Error(err)
		}
		// console.log(result)
		// result; // => { code, map, ast }
		fs.writeFileSync(path.resolve(out, entry.name), result.code)
	});
}
