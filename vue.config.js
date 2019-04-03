module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://192.168.1.88/",
                pathRewrite: {"^/api" : ""}
            }
        }
    }
}