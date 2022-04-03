import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { dirname, resolve } from "path";
import TerserWebpackPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const babelOptions = {
	presets: [
		[
			"@babel/preset-env",
			{
				useBuiltIns: "entry",
				corejs: "3.21.1",
			}
		]
	]
};


export default {
	context: resolve(__dirname),
	entry: {
		fluent: "./src/js/index",
	},
	mode: "production",
	stats: {
		errorDetails: true,
	},
	resolve: {
		modules: ["node_modules"],
		extensions: [".ts"]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{ loader: "babel-loader", options: babelOptions },
					{ loader: "ts-loader" }
				],
				exclude: /node_modules/,
				include: resolve("./src/js"),
			},
			{
				test: /\.js$/,
				use: [
					{ loader: "babel-loader", options: babelOptions }
				],
				exclude: /node_modules/,
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
				test: /\.svg$/,
				type: "asset/source",
			}
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
		filename: "[name].min.js",
		path: resolve(__dirname, "dist"),
		clean: true,
		publicPath: "//cdn.spej.eu/fwf/",
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].min.css"
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "src/img", to: "img" },
				{ from: "examples", to: "" },
			]
		})
	],
};
