const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  webpack: cfg => {
    cfg.plugins.push(
      new webpack.DefinePlugin({
        'process.env.REACT_APP_GITHUB_TOKEN': JSON.stringify(process.env.REACT_APP_GITHUB_TOKEN),
      }),
    );

    return cfg;
  },
};
