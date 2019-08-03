const proxy = require("http-proxy-middleware");
module.exports = function (app) {
    app.use("/qq",proxy({
        target:"https://c.y.qq.com",
        changeOrigin:true,
        pathRewrite:{
            "^/qq":""
        }
    }))
}