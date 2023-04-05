const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@src': path.join(__dirname, '../'),
    }
  },
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: 'js/bundle.js'
  },
  devServer: {
    port: 3030,
    contentBase: './public', // 本地服务器加载的页面所在目录
    historyApiFallback: true, // 不跳转
    inline: true // 实时更新
  },
  module: {
    rules: [
      { // 能够编译js和jsx
        test: /\.js|jsx$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env'
          ]
        }
      },
      { // 能够编译css
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      { // 能够编译静态资源
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              esModule: false,
              name: 'assets/[name].[ext]'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      "React": "react"
    })
  ]
}
