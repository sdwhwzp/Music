import React from 'react'
import axios from  'axios'
export default class Recommed extends React.Component {
	componentWillMount() {
		axios.get("https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=3602407677&format=jsonp&g_tk=5381&jsonpCallback=playlistinfoCallback&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0")
			.then(({data})=>{
				console.log(data)
			})
	}

	render(){
		return(
			<div>推荐</div>
		)
	}
}