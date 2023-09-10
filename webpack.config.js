import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { dirname, resolve, join } from "path";
import TerserWebpackPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { docsData } from "./docs/data.js";
import { HtmlAddAssetWebpackPlugin } from "html-add-asset-webpack-plugin";

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


export default (env) => {
	const prod = !env.dev;
	// convenience variable to use ?? instead of ?: in strings
	const dev = prod ? null : "";

	return [
		{
			name: "docs",
			context: resolve(__dirname, "docs"),
			mode: prod ? "production" : "development",
			entry: "./index.ts",
			devServer: {
				static: {
					directory: join(__dirname, "dist"),
				},
				https: true,
				port: 8080,
			},
			devtool: prod ? false : "inline-source-map",
			stats: {
				errorDetails: true,
				warnings: false,
			},
			resolve: {
				modules: ["node_modules"],
				extensions: [".js", ".ts", ".ejs"]
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						use: "babel-loader",
						exclude: /node_modules/,
					},
					{
						test: /\.ts$/,
						use: [
							{ loader: "babel-loader", options: babelOptions },
							{ loader: "ts-loader" }
						],
						exclude: /node_modules|\.d\.ts$/,
					},
					{
						test: /\.d\.ts$/,
						loader: "ignore-loader"
					},
					{
						test: /\.ejs$/i,
						use: [
							{ loader: "html-loader", options: { minimize: false } },
							{
								loader: "template-ejs-loader",
								options: {
									rmWhitespace: false,
									data: docsData
								}
							}
						],
					},
				]
			},
			output: {
				path: resolve(__dirname, "dist", "docs"),
				// clean: true,
				publicPath: prod ? "https://static.bexcool.com/fwf/docs/" : "/",
			},
			plugins: [
				new HtmlWebpackPlugin({
					// base: `${dev ?? "https://static.bexcool.com/fwf"}/docs/`,
					publicPath: `${dev ?? "https://static.bexcool.com/fwf"}/docs/`,
					filename: "index.html",
					template: "./index.ejs",
					scriptLoading: "blocking",
					tags: [
						`${dev ?? "/fwf"}/fluent.min.css`,
						`${dev ?? "/fwf"}/fluent.min.js`,
						{
							tagName: "meta",
							attributes: {
								name: "shortcut icon",
								src: `${dev ?? "/fwf"}/img/application_window.ico`
							}
						},
					],
					options: {
						minify: {
							collapseWhitespace: false,
							//conservativeCollapse: true,
							quoteCharacter: "\"",
							removeAttributeQuotes: true,
							minifyJS: false,
						},
					},
					hash: true,
				}),
				new HtmlAddAssetWebpackPlugin(),
				new CopyWebpackPlugin({
					patterns: [
						{ from: "redirect.html", to: "../index.html" },
						{ from: "../tmp/icons.tar.br", to: "icons.tar.br" },
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
			mode: prod ? "production" : "development",
			resolve: {
				modules: ["node_modules"],
				extensions: [".js", ".ts"]
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
							{
								loader: MiniCssExtractPlugin.loader,
								options: {
									esModule: false,
								}
							},
							"css-loader",
							"sass-loader"
						]
					},
					{
						test: /\.svg$/,
						loader: "svg-inline-loader",
						options: {
							removeSVGTagAttrs: false
						}
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
								passes: prod ? 3 : 0,
							}
						}
					})
				]
			},
			output: {
				filename: "[name].min.js",
				path: resolve(__dirname, "dist"),
				clean: true,
				publicPath: prod ? "https://static.bexcool.com/fwf/" : "/",
			},
			plugins: [
				new MiniCssExtractPlugin({
					filename: "[name].min.css"
				}),
				new CopyWebpackPlugin({
					patterns: [
						{ from: "../img", to: "img" },
					]
				}),
			],
		}
	];
};
