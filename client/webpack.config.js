const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const dotenv = require("dotenv");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";
  const isProduction = argv.mode === "production";

  // Parse .env files for dynamic build  and production variables
  const currentPath = path.resolve(__dirname);
  const basePath = currentPath + "/.env";
  const envPath = basePath + "." + argv.mode;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: isDevelopment
        ? "static/js/[name].bundle.js"
        : "static/js/[name].[chunkhash].bundle.js",
      chunkFilename: isDevelopment
        ? "static/js/[name].bundle.js"
        : "static/js/[name].[chunkhash].bundle.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader"
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDevelopment,
                reloadAll: true
              }
            },
            "css-loader"
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ],
      splitChunks: {
        chunks: "all"
      }
    },
    plugins: [
      // Makes html great again
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: isProduction && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      // Makes CSS great again
      new OptimizeCSSAssetsPlugin({}),
      // Clean build folder between builds
      isProduction && new CleanWebpackPlugin(),
      // Makes separate folder for css files
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
      }),
      // Sets env variables for our client
      new webpack.DefinePlugin(envKeys)
      // Removes falsy entries from array
    ].filter(Boolean),
    devServer: {
      compress: true,
      port: 3000,
      quiet: false,
      noInfo: false,
      stats: {
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        timings: false,
        version: false
      }
    }
  };
};
