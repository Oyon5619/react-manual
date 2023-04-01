const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: './public', // 本地服务器加载的页面所在目录
    historyApiFallback: true, // 不跳转
    inline: true // 实时更新
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      filename: 'index.html'
    })
  ]
}