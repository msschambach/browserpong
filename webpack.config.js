const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/ts/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'pong.js',
        path: path.resolve(__dirname, 'src/js')
    }
};