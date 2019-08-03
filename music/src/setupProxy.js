const proxy = require("http-proxy-middleware");
module.exports = function (app) {
    console.log(1111111);
    app.use("/list",proxy({
        target:"https://c.y.qq.com/v8/fcg-bin/",
        changeOrigin:true,
        pathRewrite:{
            "^/list":""
        }
    }))
    // app.get("/xixi",function (req,res) {
    //     console.log(2222222222);
    //     res.json({
    //         ok:1
    //     })
    // })
}