const { merge } = require("webpack-merge");
const ModulefederationPlugin = require("webpack/lib/container/ModulefederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new ModulefederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ],

};


module.exports = merge(commonConfig, prodConfig);
