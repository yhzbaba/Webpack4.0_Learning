const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webapack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    yhz: "./src/index.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: "./dist", //服务器根路径
    open: true, //开启服务器时自动打开浏览器访问服务地址
    proxy: {
      "/api": "http://localhost:3000"
    },
    port: 8090,
    hot: true,
    hotOnly: true
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            outputPath: "images/",
            //placeholder 占位符
            name: "[name].[ext]",
            limit: 2 * 1024
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin.CleanWebpackPlugin(),
    new webapack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
};
