
var path = require("path");
var webpack = require('webpack');


var compile_mode = process.argv
// var compile_mode = process.env.npm_lifecycle_event;

// var compile_mode = (process.env.npm_lifecycle_script.split(' ')[3]).replace('--', '')
// console.log('** Compile mode = ' + compile_mode + " **\n")
// const args = process.argv[2];

// var compile_mode = (process.env.npm_lifecycle_script.split(3)[1]).replace('--', '')
// if (MOCK) {
//   console.log('using mock');
//
// }
// else {
//   console.log('using api');
//
// }
const webpack_env = new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }})
console.log('** Compile mode = ' + process.env.NODE_ENV + " **\n")
// var debug = (webpack_env !== 'production')
// switch (webpack_env) {
//   case 'mock': break;
//   case 'local': break;
//   case 'development': break;
//   case 'production': break;
//   default: throw new Error("You must set first command-line argument as --mock, --local, --development or --production"); break;
// }






module.exports = {
    cache: true,
    entry: "./src/components/app.jsx",
    // output: {
    //     // publicPath: "/dist/",
    //     path: path.resolve(__dirname,  "dist"),
    //     filename: "app.js"
    // },
    entry: path.resolve(__dirname,"src/components/app.jsx"),
    output: {
      path: path.resolve(__dirname,"dist"),
      filename: "js/app.js"
    },
    devServer: {
       disableHostCheck: true,   // That solved it
      historyApiFallback: true,
      watchOptions: {
          ignored: /node_modules/
        },
        contentBase: "dist",
        hot: true
    },
    module: {
        loaders: [
          {
          test: /\.js|\.jsx?$/,
          exclude:'/node_modules/',
          loader: 'babel-loader',
          exclude: '/node_modules/',
          query: {
            presets: ["react", "es2015"]
          },
        },
        { test: /\.css$/, loader: "style!css" },
        {
          test: /\.scss$/,
          use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {minimize: true}
            },
            {
              loader: "sass-loader",
              options: {
                  includePaths: ["absolute/path/a", "absolute/path/b"]
              }
          }]
        },
        {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      }
        ]
    },

     plugins:
    //  process.env.NODE_ENV == 'mock' ?
     [ webpack_env, new webpack.optimize.UglifyJsPlugin({minimize: true}) ],
    //  :
    //  [webpack_env],
    //  plugins:
    //  process.env.NODE_ENV == 'mock' ? [ webpack_env, new webpack.optimize.UglifyJsPlugin({minimize: true}) ]:
    //  [webpack_env],
    devtool: 'cheap-module-source-map'

};
