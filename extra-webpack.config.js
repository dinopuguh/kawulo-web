const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        KAWULO_API_URL: JSON.stringify(process.env.KAWULO_API_URL),
      },
    }),
  ],
};
