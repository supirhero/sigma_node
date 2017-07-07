var path = require("path");

module.exports = {
    entry: "./src/components/app.jsx",
    output: {
        filename: "./src/js/app.js"
    },

    module: {
        loaders: [
          {
          test: /\.js|\.jsx?$/,
          loader: 'babel-loader',
          query: {
            presets: ["react", "es2015"]
          }
        },
        { test: /\.css$/, loader: "style!css" },
        {
          test: /\.scss$/,
          use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            },
            {
              loader: "sass-loader",
              options: {
                  includePaths: ["absolute/path/a", "absolute/path/b"]
              }
          }]
        }
        ]
    }
};
