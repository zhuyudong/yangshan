const { join, resolve } = require('path')
// const fs = require('fs')
// const ip = require('ip')
const _ = require('lodash')
const webpack = require('webpack')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlwebpackPlugin = require('html-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const markdownRenderer = require('react-markdown-reader').renderer
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const multipleThemesCompile = require('webpack-multiple-themes-compile')
const HtmlWebpackHandleCssInjectPlugin = require('./scripts/HtmlWebpackHandleCssInjectPlugin')
const packageJSON = require('./package.json')

const iconPath = ['./node_modules/rsuite/lib/styles'].map(relativePath =>
  resolve(__dirname, relativePath)
)
const resolveToStaticPath = relativePath => resolve(__dirname, relativePath)

const { NODE_ENV, STYLE_DEBUG, ENV_LOCALE } = process.env
const __PRO__ = NODE_ENV === 'production'

const smtp = new SpeedMeasurePlugin()
const extractLess = new ExtractTextPlugin('style.[hash:8].css')

const getStyleLoader = () => {
  const loaders = [
    { loader: 'css-loader' },
    { loader: 'postcss-loader' },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
        globalVars: {
          rootPath: '~'
          // rootPath: __PRO__ ? '~' : '../../../../'
        }
      }
    }
  ]
  return loaders.map(loader => {
    _.set(loader, 'options.sourceMap', STYLE_DEBUG === 'SOURCE')
    return loader
  })
}

const languages = [
  'javascript',
  'bash',
  'xml',
  'css',
  'less',
  'json',
  'diff',
  'typescript'
]

const themesConfig = multipleThemesCompile({
  themesConfig: {
    default: {},
    dark: {}
  },
  styleLoaders: getStyleLoader(),
  lessContent: themeName => `// Generate by Script.
@import '../index.less';
@import '../themes/${themeName}.less';
@theme-name: ${themeName};`,
  cwd: resolve(__dirname, './'), // 将相对目录修改为 webpack.config.js 所在目录
  cacheDir: './src/less/themes-cache', // 输出目录
  outputName: themeName => `resources/css/${themeName}.css`
})

const entry = {
  polyfills: './src/polyfills.js',
  app: './src/index.js',
  app_en: './src/index-en.js'
}

if (!__PRO__) {
  entry.hot = 'react-hot-loader/patch'
}
const plugins = [
  extractLess,
  new webpack.ContextReplacementPlugin(
    /highlight\.js\/lib\/languages$/,
    new RegExp(`^./(${languages.join('|')})$`)
  ),
  new webpack.DefinePlugin({
    //__RSUITE_CLASSNAME_PREFIX__: JSON.stringify('react-suite-'),
    DEPLOY_ENV: JSON.stringify(process.env.DEPLOY_ENV)
  }),
  new webpack.NamedModulesPlugin(),
  // new webpack.HotModuleReplacementPlugin(),
  new HtmlwebpackPlugin({
    version: packageJSON.version,
    title: '洋山',
    description: '图灵人工智能研究院前端基础部件与能力平台',
    chunks: ['polyfills', 'commons', 'app'],
    template: 'src/index.html',
    inject: true,
    // 排除 themes.js
    excludeChunks: ['themes']
  }),
  new HtmlwebpackPlugin({
    version: packageJSON.version,
    title: '洋山',
    description: '图灵人工智能研究院前端基础部件与能力平台',
    chunks: ['polyfills', 'commons', 'app_en'],
    filename: 'en/index.html',
    template: 'src/index.html',
    inject: true,
    // 排除 themes.js
    excludeChunks: ['themes']
  }),
  new HtmlWebpackHandleCssInjectPlugin({
    filter: () => false
  }),
  new LodashModuleReplacementPlugin({
    collections: true,
    paths: true
  })
  //new BundleAnalyzerPlugin({ openAnalyzer: false })
]
const optimization = {
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'commons',
        chunks: 'all'
      }
    }
  }
}
if (__PRO__) {
  optimization.minimize = true
  optimization.minimizer = [new TerserPlugin()]
  // plugins.push(new CompressionPlugin())
}

const config = merge(
  {
    devServer: {
      contentBase: join(__dirname, 'public'),
      disableHostCheck: true,
      historyApiFallback: {
        rewrites: [
          { from: /^\/en/, to: '/en/index.html' },
          { from: /./, to: '/index.html' }
        ]
      },
      compress: true,
      host: '0.0.0.0', // ip.address(),
      port: 8080,
      open: true
    },
    entry,
    output: {
      filename: '[name].bundle.[hash:8].js',
      path: resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    optimization,
    module: {
      unknownContextCritical: false,
      rules: [
        {
          test: /\.(less|css)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        },
        {
          test: /\.js$/,
          use: [
            //'transform-loader?brfs', // Use browserify transforms as webpack-loader.
            'babel-loader?babelrc'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader'
            },
            {
              loader: 'markdown-loader',
              options: {
                pedantic: true,
                renderer: markdownRenderer(languages)
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          //`publicPath`  only use to assign assets path in build
          use: [
            // {
            //   loader: 'url-loader',
            //   options: {
            //     limit: 8192,
            //     publicPath: '/'
            //   }
            // },
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
          include: iconPath,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 1,
                size: 16,
                hash: 'sha512',
                digest: 'hex',
                name: 'resources/[hash:8].[ext]',
                publicPath: '/'
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          exclude: iconPath,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'icon-[name]'
              }
            }
          ]
        }
      ]
    },
    plugins,
    devtool: STYLE_DEBUG === 'SOURCE' && 'source-map',
    stats: {
      warningsFilter: [/componentWillMount has been renamed/]
    }
  },
  themesConfig,
  __PRO__
    ? {
        resolve: {
          alias: {
            '@src': resolveToStaticPath('./src')
          }
        }
      }
    : {
        resolve: {
          alias: {
            '@src': resolveToStaticPath('./src')
            // 'react-dom': '@hot-loader/react-dom'
          }
        }
      }
)

module.exports = process.env.SPEED_MEASURE ? smtp.wrap(config) : config
