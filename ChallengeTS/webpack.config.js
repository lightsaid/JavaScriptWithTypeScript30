const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		hello: "./src/challenge/hello-world/index.ts",
		challenge01: "./src/challenge/01 - JavaScript Drum Kit/index.ts"
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/challenge/hello-world/index.html",
			filename: 'challenge/hello.html',
			chunks: ['hello'], // chunks 引入的 js ,对应上面 entry 的key
		}),
		new HtmlWebpackPlugin({
			template: "./src/challenge/01 - JavaScript Drum Kit/index.html",
			filename: 'challenge/01.html',
			chunks: ['challenge01'],
		}),
	],
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				include: [path.resolve(__dirname, 'src')],
			},
			{
				test: /\.(css|less)$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env'), require('autoprefixer')],
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|wav)$/i,
				type: "asset/resource",
				generator: {
					filename: "images/[contenthash][ext]"
				}
			}
		],
	},
}
