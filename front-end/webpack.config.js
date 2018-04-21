module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
  {
    test: /\.css$/,  
    include: /node_modules/,  
    loaders: ['style-loader', 'css-loader']
  }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    headers: {
      'Access-Control-Allow-Origin': 'http://54.151.54.81:8080',
      // 'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Credentials': "omit"
    }
  }
};
