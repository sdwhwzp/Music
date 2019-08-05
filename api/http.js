var https = require('https');
var option={
	hostname:'v.qq.com',
	path:'c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',

	headers:{
		'Accept':'*/*',
		'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Host':'v.qq.com',
		'Referer':'https://y.qq.com/portal/playlist.html'

	}
};
https.get(option,function(res){
	var chunks = [];
	res.on('data',function(chunk){
		chunks.push(chunk);
	})
	res.on('end',function(){
		console.log(Buffer.concat(chunks).toString());
	})
})