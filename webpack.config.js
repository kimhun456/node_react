var path = require('path');

module.exports = {
    entry: [
        './src/index.js',
        './src/style.css'
    ],


    resolve: {
            root: path.resolve('./src')
        }
    ,
 
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
 
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader'
            }
        ]
    }
};