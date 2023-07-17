const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    hello: './src/hello.ts',
    'games/bouncing_balls/main': './src/games/bouncing_balls/main.ts',
    'games/breakout/main': './src/games/breakout/main.ts',
    'games/tetris_basic/main': './src/games/tetris_basic/main.ts',
    'games/tetris_demo_play/main': './src/games/tetris_demo_play/main.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '!dist/.gitkeep'
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/games/tetris_demo_play/images/', to: 'games/tetris_demo_play/images/'}
      ]
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['hello'],
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/games/bouncing_balls/index.html',
      filename: 'games/bouncing_balls/index.html',
      chunks: ['games/bouncing_balls/main'],
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/games/breakout/index.html',
      filename: 'games/breakout/index.html',
      chunks: ['games/breakout/main'],
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/games/tetris_basic/index.html',
      filename: 'games/tetris_basic/index.html',
      chunks: ['games/tetris_basic/main'],
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/games/tetris_demo_play/index.html',
      filename: 'games/tetris_demo_play/index.html',
      chunks: ['games/tetris_demo_play/main'],
      inject: false
    }),
  ],
  devServer: {
    static: "dist",
    open: false,
    liveReload: true
  }
}