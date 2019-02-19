var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');


module.exports = {
    entry: [
        path.resolve(__dirname, 'app/index.jsx')
    ],
    output: {
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('local')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                include: __dirname,
                query: {
                    presets: ['react', 'es2015','stage-0']
                }
            },
            { test: /\.woff(\?.*)?$/,  loader: 'url?name=fonts/[name].[ext]' },
            { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
            { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
            { test: /\.ttf(\?.*)?$/,   loader: 'url?name=fonts/[name].[ext]' },
            { test: /\.eot(\?.*)?$/,   loader: 'url?name=fonts/[name].[ext]' },
            { test: /\.svg(\?.*)?$/,   loader: 'url?limit=1024&name=img/[name].[ext]' },
            { test: /\.swf(\?.*)?$/,   loader: 'file?prefix=swf/&name=[path][name].[ext]&limit=10000&mimetype=application/swf'},
            { test: /\.(png|jpg|gif)$/,    loader: 'url?limit=8192&name=[name]_[hash:8].[ext]' },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    externals: {

    },
    //配置目录结构，添加目录接口import时只需要文件名，不需要目录名。
    resolve: {
        extensions: ['','.js', '.jsx','.scss']
    },
    devServer: {
        port: 8000,
        hot: true,
        quiet:true,
        historyApiFallback: {
            index: 'index.html'
        }

    }
};
