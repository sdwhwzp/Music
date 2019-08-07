const proxy = require("http-proxy-middleware");
module.exports = function (app) {
	app.use("/music",proxy({
		target:"http://127.0.0.1",
		changeOrigin:true,
		pathRewrite:{
			"^/music":""
		}
	}))


    app.use("/qq", proxy({
        target: "https://c.y.qq.com",
        changeOrigin: true,
        pathRewrite: {
            "^/qq": ""
        }
    }))
	app.use("/music",proxy({
		target:"http://127.0.0.1",
		changeOrigin:true,
		pathRewrite:{
			"^/music":""
		}
	}))



}