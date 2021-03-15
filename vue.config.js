module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/style/style.scss";'
            }
        }
    },
    publicPath: '/Contacts-app/',
    configureWebpack: {
        devtool: 'source-map'
    }
}