const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
    {
        name: 'development',
        entry: path.join(__dirname, "./src/index.js"),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: "babel-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
            ]
        },
        resolve: {
            extensions: [".js", ".jsx"]
        },
        devServer: {
            port: 3001
        }
    },
    {
        name: 'bundlize',
        entry: {
            'app': [
                path.resolve(__dirname, 'dist/index.js'),
                path.resolve(__dirname, 'dist/components/TrelloButton.js'),
                path.resolve(__dirname, 'dist/components/TrelloButton.css')
            ]
        },
        output: {
            filename: 'react-trello-client.bundle.min.js',
            path: path.resolve(__dirname, 'bundle'),
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin(),
                new OptimizeCSSAssetsPlugin({
                    assetNameRegExp: /\.min\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorPluginOptions: {
                        preset: ['default', { discardComments: { removeAll: true } }],
                    },
                    canPrint: true
                })
            ],
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader"
                    ]
                },
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    exclude: /(node_modules|bower_components|\.spec\.js)/,
                    use: [
                        {
                            loader: 'webpack-strip-block',
                        }
                    ]
                }
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: `react-trello-client.bundle.min.css`
            }),
        ]
    }
];