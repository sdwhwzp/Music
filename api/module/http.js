const axios =require('axios')
module.exports.detail=function(disstid,cb){
	axios.get("https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&format=json&g_tk=5381&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0",
		{   params:{
				disstid
			},
			headers:{
				referer:"https://y.qq.com/portal/playlist.html",
				origin:"https://y.qq.com/portal/playlist.html"
			}
		})
		.then(({data})=>{

			cb(data)
		})
}
module.exports.singList=function(cb){
	axios.get('https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.03126265150060159&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&categoryId=10000000&sortId=1&sin=0&ein=19',{

		headers:{
		referer:"https://y.qq.com/portal/playlist.html",
			origin:"https://y.qq.com/portal/playlist.html"
	}
	})
		.then(({data})=>{
			cb(data)
		})
}
module.exports.singListtwo=function(cb){
	axios.get('https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.6416251527976065&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&categoryId=10000000&sortId=2&sin=0&ein=19',{

		headers:{
			referer:"https://y.qq.com/portal/playlist.html",
			origin:"https://y.qq.com/portal/playlist.html"
		}
	})
		.then(({data})=>{
			cb(data)
		})
}
