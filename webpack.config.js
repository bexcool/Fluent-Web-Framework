import path, { dirname } from "path";
import { fileURLToPath } from "url";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
	context: path.resolve(__dirname, "src"),
	entry: "./js/index",
	mode: "production",
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
		},
		{
			test: /\.html$/i,
			loader: "html-loader",
		},
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin({
				terserOptions: {
					mangle: {
						keep_classnames: true,
						keep_fnames: true,
					},
					compress: {
						inline: 0,
						passes: 3,
					}
				}
			})
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
