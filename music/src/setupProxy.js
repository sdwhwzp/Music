const proxy = require("http-proxy-middleware");
module.exports = function (app) {
    console.log(1111111);
    app.use("/qq",proxy({
        target:"https://c.y.qq.com",
        changeOrigin:true,
        pathRewrite:{
            "^/qq":""
        }
    }))

}