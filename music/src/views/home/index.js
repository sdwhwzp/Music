import React from 'react'
import axios from 'axios';
import {NavLink} from "react-router-dom";
import Components from "../../components";
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'

export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state={
			songlist:[],
			singer:[],
			pageIndex:1,
			slider:[]

		}
	}
	render(){
		console.log(this.state.slider)
		return(
			<div >
				<Components.Section></Components.Section>
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{
							this.state.slider.map((v,i)=>{
								return(
									<div className="swiper-slide" key={v.id}>
										<img width={"100%"} src={v.picUrl} alt=""/>
									</div>
								)
							})
						}
					</div>
					<div className='swiper-pagination'></div>
				</div>
				<div className={'section-four'}>
					<div className={'section-three'}>
						{
							this.state.songlist.map((item,index)=>{
								return(
									<div key={item.cur_count}>
										<h3>{item.cur_count}:{item.data.albumname}</h3>
										<span  className={'three'}>{item.data.interval}%:{item.data.albumdesc}{
											item.data.singer.map((item,index)=>{
												return(
													<div key={item.id} className={'sin'}>
														歌手：{item.name}
													</div>
												)
											})
										}
										</span>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
	getListMore(pageIndex=1){
		axios.get("/qq/v8/fcg-bin/fcg_v8_toplist_cp.fcg?pageNo="+pageIndex+"&topid=27")
			.then(({data})=>{
				this.setState({
					songlist:data.songlist
				})
			})
	}
	componentDidMount() {
		this.getListMore();
		axios.get("/qq/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=701075963&uin=0&format=json")
			.then(({data})=>{
				this.setState({
					slider:data.data.slider

				})
				var mySwiper = new Swiper('.swiper-container', {
					autoplay: true,
					loop: true,
					pagination : {
						el: '.swiper-pagination',
					}
				});
			})
		}


}
