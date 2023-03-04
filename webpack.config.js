import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { dirname, resolve } from "path";
import TerserWebpackPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { docsData } from "./docs/data.js";

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


export default [
	{
		name: "docs",
		context: resolve(__dirname, "docs"),
		mode: "production",
		entry: "./docs.js",
		stats: {
			errorDetails: true,
		},
		resolve: {
			modules: ["node_modules"]
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: "babel-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.ejs$/i,
					use: [
						{ loader: "html-loader", options: { minimize: false } },
						{ loader: "template-ejs-loader", options: { data: docsData } }
					],
				},
			]
		},
		output: {
			path: resolve(__dirname, "dist", "docs"),
			// clean: true,
			publicPath: "https://resources.bexcool.com/fwf/docs/",
		},
		plugins: [
			new HtmlWebpackPlugin({
				base: "https://resources.bexcool.com/fwf/docs/",
				filename: "index.html",
				template: "./index.ejs",
				options: {
					minify: {
						quoteCharacter: "\"",
						removeAttributeQuotes: true,
						minifyJS: false,
					}
				},
			}),
			new CopyWebpackPlugin({
				patterns: [
					{ from: "redirect.html", to: "../index.html" },
				]
			}),
		],
		dependencies: ["fluent"],
		experiments: {
			futureDefaults: true,
		},
	},
	{
		name: "fluent",
		context: resolve(__dirname, "src", "js"),
		entry: {
			fluent: "./index",
		},
		mode: "production",
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
				},
			]
		},
		optimization: {
			realContentHash: false,
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
			publicPath: "https://resources.bexcool.com/fwf/",
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "[name].min.css"
			}),
			new CopyWebpackPlugin({
				patterns: [
					{ from: "../img", to: "img" },
					{ from: "../../icons.tar.br", to: "docs/icons.tar.br" },
				]
			}),
		],
	}
];
