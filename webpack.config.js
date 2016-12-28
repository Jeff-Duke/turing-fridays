module.exports = {
  entry: {
    main: './lib/index.js',
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!resolve-url!sass?sourceMap' },
      { test: /\.png$/, loader: 'url-loader', query: { mimetype: 'image/png'} },
      { test: /\.jpg$/, loader: 'url-loader', query: { mimetype: 'image/jpg'} },
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel',
        query: { presets: ['es2015', 'react'], },
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css']
  }
};