import path, { dirname } from "path";
import { fileURLToPath } from "url";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
	context: path.resolve(__dirname, "src"),
	entry: "./js/index",
	module: {
		rules: [{
			test: /\.ts?$/,
			use: "ts-loader",
			exclude: /node_modules/
		},
		{
			test: /\.css$/,
			use: [
				"style-loader",
				MiniCssExtractPlugin.loader,
				"css-loader"
			]
		},
		{
			test: /\.scss$/,
			use: [
				"style-loader",
				MiniCssExtractPlugin.loader,
				"css-loader",
				"sass-loader"
			]
		}
		]
	},
	output: {
		filename: "fluent-bundle.min.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	resolve: {
		extensions: [".ts"]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "fluent-bundle.min.css"
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: "img", to: "img" }]
		})
	],
};
