/*eslint-disable */

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const dotenv = require("dotenv");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

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
      filename: isDevelopment ? "static/js/[name].bundle.js" : "static/js/[name].[chunkhash].bundle.js",
      chunkFilename: isDevelopment ? "static/js/[name].bundle.js" : "static/js/[name].[chunkhash].bundle.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: { "react-dom": "@hot-loader/react-dom" }
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.tsx$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-transform-runtime",
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "@babel/proposal-object-rest-spread",
                "react-hot-loader/babel"
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDevelopment
              }
            },
            "css-loader"
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: "static/media/[name].[hash:8].[ext]"
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack", "url-loader"]
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
      // Type checking since babel doesn't do that
      new ForkTsCheckerWebpackPlugin(),
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
        filename: "static/css/[name].css",
        chunkFilename: "static/css/[name].chunk.css"
      }),
      // Sets env variables for our client
      new webpack.DefinePlugin(envKeys),
      isDevelopment &&
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: ["Client running on localhost:3000"]
          },
          clearConsole: true
        })
      // Removes falsy entries from array
    ].filter(Boolean),
    devServer: {
      port: 3000,
      compress: true,
      hot: true,
      quiet: true,
      clientLogLevel: "silent",
      historyApiFallback: true
    }
  };
};
