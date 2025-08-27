const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = (env) => {
  const isProd = env === 'production';
  return {
    mode: isProd ? 'production' : 'development',
    entry: "./src/index.js",
    devServer: {
      port: 3000,
      historyApiFallback: true,

    },
    output: {
      publicPath: "auto",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ]
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "host_app",
        filename: "remoteEntry.js",
        exposes: {
          "./store": "./src/redux/store/store.js",
          "./cartSlice": "./src/redux/slice/cartSlice.js",
          "./cartActions": "./src/redux/slice/cartSlice.js"

        },
        remotes: {
          "auth_app": "auth_app@https://auth-app-two-sepia.vercel.app/remoteEntry.js",
          "product_app": "product_app@https://product-app-beryl.vercel.app/remoteEntry.js",
          "checkout_app": "checkout_app@https://checkout-app-lxfv.vercel.app/remoteEntry.js"
        },
        shared: {
          react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
          'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
          '@reduxjs/toolkit': { singleton: true, eager: true },
          'react-redux': { singleton: true, eager: true }
        }
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      })
    ],
    resolve: {
      extensions: [".js", ".jsx"]
    }
  };
};