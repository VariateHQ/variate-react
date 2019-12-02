var path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'variate-react.min.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx"],
  },
  externals: {
    'react': 'commonjs react' 
  }
};