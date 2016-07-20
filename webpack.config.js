module.exports = {
	entry: "./src/query-by-regex.js",
	output: {
		path: __dirname,
		filename: "/lib/query-by-regex.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	}
};
