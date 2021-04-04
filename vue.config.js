module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/': {
                target: "http://localhost:9090",//这个是你要访问的接口地址
                changeOrigin: false,
                pathRewrite: {
                    '/': '/'
                }
            }
        }
    }
}
