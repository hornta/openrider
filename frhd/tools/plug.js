module.exports = function({ types: t }) {
  return {
    visitor: {
      AssignmentExpression(path) {
				if(path.node.left && path.node.left.name === 'require') {
					const p = path.get('right');
					if(path.node.right) {
						path.replaceWith(t.objectExpression(path.node.right.arguments[0].properties))
					}
					// const objectOfFiles = path.node.right.arguments[0];
					// const parent = objectOfFiles.parentPath.replaceWith(
					// 	objectOfFiles
					// );
					// console.log(objectOfFiles.properties)
				}
			}
    }
  };
}
